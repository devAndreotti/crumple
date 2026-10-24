// Sound: paper noises synthesized with Web Audio (filtered noise grains). Optional real samples can be
// registered with Sound.useSamples({ crumple, sheet, tear }) and are used when they load. Off by default.
import { store } from './util.js';

export const Sound = /* @__PURE__ */ (() => {
  let ac = null, master = null, noise = null, loading = null;
  let enabled = store.get('sound', false);
  let urls = {};
  const samples = {};
  const ctx = () => {
    if (!ac) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ac = new AC();
      master = ac.createGain(); master.gain.value = 0.6; master.connect(ac.destination);
      noise = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
      const d = noise.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ac.state === 'suspended') ac.resume();
    return ac;
  };
  function load() {
    if (loading || !ac) return loading;
    loading = Promise.all(Object.entries(urls).map(([n, url]) => fetch(url)
      .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(n))))
      .then((b) => ac.decodeAudioData(b))
      .then((buf) => { samples[n] = buf; })
      .catch(() => { /* without the sample: the synthesized sound stays */ })));
    return loading;
  }
  function sample(name, t, o = {}) {
    const buf = samples[name];
    if (!buf) return false;
    const s = ac.createBufferSource(); s.buffer = buf; s.playbackRate.value = o.rate || 1;
    const g = ac.createGain(); g.gain.value = o.gain ?? 1;
    s.connect(g); g.connect(master);
    s.start(t, o.offset || 0, o.dur);
    return true;
  }
  // one short band-passed noise burst
  function grain(t, dur, freq, q, gain) {
    const s = ac.createBufferSource(); s.buffer = noise;
    const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = q;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(gain, t + 0.002); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(bp); bp.connect(g); g.connect(master);
    s.start(t, Math.random() * 0.9, dur + 0.03);
  }
  // a soft noise bed sweeping from f0 to f1
  function bed(t, dur, f0, f1, gain) {
    const s = ac.createBufferSource(); s.buffer = noise; s.loop = true;
    const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 0.8;
    bp.frequency.setValueAtTime(f0, t); bp.frequency.linearRampToValueAtTime(f1, t + dur);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(gain, t + dur * 0.15); g.gain.linearRampToValueAtTime(0.0001, t + dur);
    s.connect(bp); bp.connect(g); g.connect(master);
    s.start(t); s.stop(t + dur + 0.05);
  }
  function crackles(t0, dur, density, brightness, gain, strongStart) {
    const n = Math.round(dur * density);
    for (let i = 0; i < n; i++) {
      let u = Math.random();
      if (strongStart) u = u * u;
      grain(t0 + u * dur, 0.006 + Math.random() * 0.03, 1500 + Math.random() * 4500 * brightness, 0.7 + Math.random() * 2.2, gain * (0.25 + Math.random() * 0.75));
    }
  }
  return {
    get enabled() { return enabled; },
    set(v) { enabled = !!v; store.set('sound', enabled); if (enabled && ctx()) load(); },
    // optional real recordings: { crumple, sheet, tear } (URLs)
    useSamples(map) { urls = { ...map }; loading = null; if (enabled && ac) load(); },
    // names: crumple, uncrumple, flip, tear, seal, fire, grain
    play(name, dur = 1, delay = 0) {
      if (!enabled || !ctx()) return;
      load();
      const t = ac.currentTime + delay;
      const has = (n) => !!samples[n];
      if (name === 'crumple') {
        if (has('crumple')) { const n = Math.max(2, Math.round(dur * 4)); for (let i = 0; i < n; i++) sample('crumple', t + (i / n) * dur * 0.85, { gain: 0.6 + Math.random() * 0.35, rate: 0.85 + Math.random() * 0.35 }); crackles(t, dur, 25, 1, 0.1, true); }
        else { crackles(t, dur, 90, 1, 0.32, true); bed(t, dur, 2400, 1200, 0.07); }
      } else if (name === 'uncrumple') {
        if (has('sheet')) { const n = Math.max(2, Math.round(dur * 2.5)); for (let i = 0; i < n; i++) sample(i % 2 && has('crumple') ? 'crumple' : 'sheet', t + (i / n) * dur * 0.9, { gain: 0.4 + Math.random() * 0.25, rate: 0.75 + Math.random() * 0.25 }); }
        else { crackles(t, dur, 46, 0.8, 0.26, false); bed(t, dur, 1400, 2600, 0.05); }
      } else if (name === 'flip') { if (!sample('sheet', t, { gain: 0.8, rate: 1.15 })) { bed(t, 0.38, 500, 2400, 0.16); grain(t + 0.34, 0.05, 900, 1, 0.22); } }
      else if (name === 'tear') { if (!sample('tear', t, { gain: 1 })) { bed(t, 0.45, 1800, 3600, 0.18); crackles(t, 0.45, 160, 1.2, 0.3, false); } }
      else if (name === 'seal') { if (!sample('tear', t, { gain: 0.45, rate: 1.7, dur: 0.16 })) grain(t, 0.05, 1200, 2, 0.3); if (!sample('sheet', t + 0.2, { gain: 0.5, rate: 0.9 })) bed(t + 0.2, 0.5, 700, 2200, 0.08); }
      else if (name === 'fire') { crackles(t, dur, 22, 0.45, 0.16, false); bed(t, dur, 500, 800, 0.05); }
      else if (name === 'grain') { if (!sample('crumple', t, { gain: 0.22, rate: 1.2 + Math.random() * 0.4, offset: Math.random() * 0.3, dur: 0.08 })) crackles(t, 0.06, 60, 1, 0.2, false); }
    },
  };
})();
