// Stage: a paper rendered in place inside your own canvas (no flight): crumple, unfold, flip, tear and burn it
// right there. Handy for heroes, galleries and editors.
import { clamp, smooth, linear, easeSoft, easeOpen, easeCrumple } from './util.js';
import { Renderer, FOV, D, LIGHT } from './renderer.js';
import { Sound } from './sound.js';
import { Particles } from './particles.js';
import { tween, step, compose, screenBox, emit, dragControl, lampTarget, approachLamp } from './motion.js';

const T_UNFOLD = 1.5;

// options: { flashlight = true, drag = true, fit = 0.8 (share of the canvas height the open sheet takes) }
export function Stage(canvas, options = {}) {
  const o = { flashlight: true, drag: true, fit: 0.8, ...options };
  let R;
  try { R = Renderer(canvas); } catch (e) { R = null; }
  if (!R) return null;
  let P = null, raf = 0, version = 0;
  const parts = Particles();
  const A = { p: 1, f: 0, tear: 0, tw: [], dragging: false, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 };
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
  }
  function frameState(now) {
    const vw = canvas.clientWidth, vh = canvas.clientHeight, ppu = vh / (2 * D * Math.tan(FOV / 2));
    const env = P.cfg.type === 'envelope';
    const sc = env ? Math.min(o.fit * 0.69 * vh / (P.T.body * ppu), 0.7 * vw / (P.w * ppu)) : Math.min(o.fit * vh / (P.h * ppu), (o.fit + 0.06) * vw / (P.w * ppu));
    const scLetter = P.letter ? Math.min(o.fit * vh / (P.letter.h * ppu), (o.fit + 0.06) * vw / (P.letter.w * ppu)) : sc;
    const pe = smooth(clamp(env ? A.p * 2 : A.p)), end = [0, 0, -0.02];
    return { cx: 0, cy: 0, sc, scLetter, rot: P.pose.map((a, i) => a * (1 - pe) + end[i] * pe), lift: 0, time: now / 1000, ppu, vw, vh, vhU: vh / ppu, L: LIGHT, lampPos: A.lampPos, lamp: A.lamp || 0, lampR: 0.3 * vh / ppu };
  }
  const current = (now = performance.now()) => { const b = frameState(now); return { b, scene: compose(P, A, b) }; };
  function loop(now) {
    raf = 0;
    if (!P || document.hidden) return;
    resize();
    const dt = A.resume ? 1 / 60 : Math.min(0.05, Math.max(0, (now - (A.tPrev || now)) / 1000));
    A.resume = false;
    A.tPrev = now;
    const busy = step(A, now);
    const lamp = approachLamp(A, dt);
    const { scene } = current(now);
    emit(parts, A, scene, dt);
    parts.step(dt);
    R.draw(scene.items, scene.shadow, parts);
    A.pPrev = A.p;
    if (busy || A.dragging || lamp || parts.n > 0 || scene.active.st.front > -0.5) raf = requestAnimationFrame(loop);
  }
  const kick = () => { if (!raf) { A.resume = true; raf = requestAnimationFrame(loop); } };
  function box() {
    if (!P) return null;
    const { b, scene } = current(), r = canvas.getBoundingClientRect();
    return screenBox(scene.active.P, scene.active.st, b.ppu, b.vw, b.vh, r.left, r.top);
  }
  if (o.drag) {
    canvas.style.touchAction = 'none';
    dragControl(canvas, { active: () => (P ? A : null), box, outside: () => {}, redraw: kick });
  }
  canvas.addEventListener('dblclick', () => api.flip());
  if (o.flashlight) {
    canvas.addEventListener('pointermove', (e) => {
      if (!P || A.dragging || e.pointerType === 'touch') return;
      const b = box(), r = canvas.getBoundingClientRect();
      const inside = !!b && e.clientX > b.x0 - 30 && e.clientX < b.x1 + 30 && e.clientY > b.y0 - 30 && e.clientY < b.y1 + 30;
      lampTarget(A, e.clientX - r.left, e.clientY - r.top, canvas.clientWidth, canvas.clientHeight, canvas.clientHeight / (2 * D * Math.tan(FOV / 2)), inside);
      kick();
    });
    canvas.addEventListener('pointerleave', () => { A.lampOn = 0; kick(); });
  }
  window.addEventListener('resize', kick);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(); });
  const isEnv = () => P.cfg.type === 'envelope';
  const api = {
    // builds a paper from a config and shows it (resolves with the paper, or null if a newer call replaced it)
    async set(cfg, { progress } = {}) {
      const v = ++version;
      const next = await R.build(cfg);
      if (v !== version) { R.release(next); return null; }
      if (P) R.release(P);
      P = next; A.tear = 0; P.torn = false; delete A.destroy;
      if (progress !== undefined) { A.tw = []; A.p = clamp(progress); }
      parts.clear();
      kick();
      return P;
    },
    crumple() { if (!P) return; Sound.play('crumple', 0.9); A.f = 0; tween(A, 'p', 0, isEnv() ? 1.9 : 0.9, isEnv() ? easeSoft : easeCrumple(P)); kick(); },
    uncrumple() { if (!P) return; Sound.play(isEnv() ? 'seal' : 'uncrumple', 1.5); tween(A, 'p', 1, isEnv() ? T_UNFOLD * 1.85 : T_UNFOLD, isEnv() ? easeSoft : easeOpen(P)); kick(); },
    toggle() { if (A.p > 0.5) api.crumple(); else api.uncrumple(); },
    flip() { if (!P || A.p < 0.9) return; Sound.play('flip'); tween(A, 'f', A.f < 0.5 ? 1 : 0, 0.8, linear); kick(); },
    tear() { if (!P || P.stubX === null || A.tear > 0 || A.p < 0.95) return; Sound.play('tear'); tween(A, 'tear', 1, 1.0, linear, 0, () => { P.torn = true; }); kick(); },
    restoreStub() { if (!P) return; A.tear = 0; P.torn = false; kick(); },
    burn() { if (!P || A.destroy !== undefined) return; Sound.play('fire', 2.6); const Q = P.letter || P; A.destroy = Math.max(Q.front0 > -0.5 ? Q.front0 + Q.burned : -0.06, -0.06); tween(A, 'destroy', 1.6, 2.6, linear); kick(); },
    restore() { delete A.destroy; parts.clear(); kick(); },
    setProgress(v) { A.tw = []; A.p = clamp(v); kick(); },
    // PNG of the current frame (draws and reads at once, no preserved buffer needed)
    png() { if (!P) return ''; resize(); const { scene } = current(); R.draw(scene.items, scene.shadow, null); return canvas.toDataURL('image/png'); },
    snapshot(opened, format, size) { return P ? R.snapshot(P, opened, format, size) : ''; },
    get state() { return A; },
    get paper() { return P; },
  };
  return api;
}
