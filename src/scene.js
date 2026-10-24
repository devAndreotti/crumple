// Scene: a crumpled paper sits on the page (a button with a still image); on click it flies to the center of the
// screen, unfolds into a readable sheet, and on close crumples and flies back to its spot.
import { clamp, smooth, linear, easeIO, easeOut, easeFly, easeReturn, easeSoft, easeOpen, easeCrumple, store, emitEvent } from './util.js';
import { TYPES, normalize } from './catalog.js';
import { Renderer, FOV, D, LIGHT } from './renderer.js';
import { Sound } from './sound.js';
import { Particles } from './particles.js';
import { tween, step, openAmount, extentAt, compose, screenBox, emit, dragControl, lampTarget, approachLamp } from './motion.js';

const DEFAULT_LABELS = {
  flip: '[ flip ]',
  tear: '[ tear stub ]',
  close: '[ close ]',
  hint: 'drag to unfold',
  open: 'Crumpled paper: open',
  back: 'Back:',
};

export const Scene = (() => {
  let opts = { labels: DEFAULT_LABELS, remember: false, motion: 'auto', flashlight: true, maxBuilt: 3 };
  let reduce = false;
  let R, tried = false, cv, backdrop, bar, bFlip, bTear, bClose, hint, srEl, fallback;
  const entries = [];
  const parts = Particles();
  let A = null, raf = 0;
  // pre-hop, flight, unfold start (counted from the start of the flight) and unfold duration, in seconds
  const T_PRE = 0.16, T_FLY = 0.9, T_UNF0 = 0.42, T_UNF = 1.5, T_RED = 1.0;

  function computeReduce() {
    if (opts.motion === 'full') return false;
    if (opts.motion === 'reduced') return true;
    try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
  }

  function dom() {
    if (cv) return;
    reduce = computeReduce();
    const css = document.createElement('style');
    css.textContent = `
:root{--crumple-backdrop:rgba(6,5,4,.8);--crumple-ui-bg:rgba(14,13,12,.7);--crumple-ui-fg:#ebe5d6;--crumple-ui-border:rgba(235,229,214,.4);--crumple-ui-font:12px/1 'Courier Prime',ui-monospace,monospace;--crumple-accent:#f5c266}
.crumple-scene{position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483640;pointer-events:none;display:none;transition:opacity .3s ease;touch-action:none}
.crumple-backdrop{position:fixed;inset:0;z-index:2147483630;background:transparent;pointer-events:none;transition:background .7s ease}
.crumple-backdrop.on{background:var(--crumple-backdrop)}
.crumple-bar{position:fixed;z-index:2147483645;right:18px;top:16px;display:none;gap:8px}
.crumple-bar.on{display:flex}
.crumple-bar button,.crumple-fallback button{background:var(--crumple-ui-bg);border:1px solid var(--crumple-ui-border);color:var(--crumple-ui-fg);font:var(--crumple-ui-font);letter-spacing:.18em;padding:9px 12px;cursor:pointer}
.crumple-bar button[hidden]{display:none}
.crumple-hint{position:fixed;z-index:2147483645;left:50%;bottom:8vh;transform:translateX(-50%);font:var(--crumple-ui-font);font-size:13px;letter-spacing:.2em;color:var(--crumple-ui-fg);background:var(--crumple-ui-bg);padding:8px 14px;opacity:0;transition:opacity .5s;pointer-events:none}
.crumple-hint.on{opacity:1}
.crumple-trigger{display:inline-block;width:96px;height:96px;padding:0;border:0;background:none;cursor:pointer;-webkit-tap-highlight-color:transparent}
.crumple-trigger img{width:100%;height:100%;display:block;filter:drop-shadow(2px 7px 6px rgba(0,0,0,.6))}
.crumple-trigger:hover img,.crumple-trigger:focus-visible img{animation:crumple-wiggle .75s ease}
.crumple-trigger:focus-visible{outline:2px solid var(--crumple-accent);outline-offset:4px;border-radius:50%}
.crumple-trigger.active{visibility:hidden}
.crumple-trigger.recrumple img{animation:crumple-squeeze .9s ease}
@keyframes crumple-wiggle{0%{transform:none}22%{transform:rotate(-8deg) translateY(-4px)}50%{transform:rotate(6deg) translateY(-1px)}78%{transform:rotate(-2deg)}100%{transform:none}}
@keyframes crumple-squeeze{0%{transform:scale(1.15)}30%{transform:scale(.7) rotate(-20deg)}60%{transform:scale(1.05) rotate(10deg)}100%{transform:none}}
.crumple-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.crumple-fallback{position:fixed;inset:0;z-index:2147483646;display:none;align-items:center;justify-content:center;background:var(--crumple-backdrop);padding:24px}
.crumple-fallback.on{display:flex}
.crumple-fallback .sheet{max-width:min(520px,90vw);max-height:86vh;overflow:auto;padding:36px 34px;box-shadow:0 18px 40px rgba(0,0,0,.6);white-space:pre-line;font-size:19px;line-height:1.6;color:#2a2219}
.crumple-fallback .sheet img{display:block;max-width:100%;margin:0 auto 16px}
.crumple-fallback button{position:fixed;right:18px;top:16px}
@media (prefers-reduced-motion:reduce){.crumple-trigger.recrumple img,.crumple-trigger:hover img{animation:none}}`;
    document.head.appendChild(css);
    const L = opts.labels;
    backdrop = document.createElement('div'); backdrop.className = 'crumple-backdrop';
    cv = document.createElement('canvas'); cv.className = 'crumple-scene'; cv.setAttribute('aria-hidden', 'true');
    bar = document.createElement('div'); bar.className = 'crumple-bar';
    bFlip = document.createElement('button'); bFlip.type = 'button'; bFlip.textContent = L.flip;
    bTear = document.createElement('button'); bTear.type = 'button'; bTear.textContent = L.tear; bTear.hidden = true;
    bClose = document.createElement('button'); bClose.type = 'button'; bClose.textContent = L.close;
    bar.append(bTear, bFlip, bClose);
    hint = document.createElement('div'); hint.className = 'crumple-hint'; hint.textContent = L.hint;
    srEl = document.createElement('div'); srEl.className = 'crumple-sr'; srEl.setAttribute('aria-live', 'polite');
    fallback = document.createElement('div'); fallback.className = 'crumple-fallback'; fallback.setAttribute('role', 'dialog'); fallback.setAttribute('aria-modal', 'true');
    document.body.append(backdrop, cv, bar, hint, srEl, fallback);
    bClose.addEventListener('click', close);
    bFlip.addEventListener('click', flip);
    bTear.addEventListener('click', tear);
    addEventListener('keydown', (e) => {
      if (fallback.classList.contains('on') && e.key === 'Escape') { closeFallback(); return; }
      if (!A) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'f' || e.key === 'F') flip();
    });
    addEventListener('resize', () => { if (A) { resize(); kick(); } });
    addEventListener('pointermove', (e) => {
      if (!opts.flashlight || !A || A.phase !== 'open' || A.dragging || e.pointerType === 'touch') return;
      const b = A.boxCache || box();
      const inside = !!b && e.clientX > b.x0 - 30 && e.clientX < b.x1 + 30 && e.clientY > b.y0 - 30 && e.clientY < b.y1 + 30;
      lampTarget(A, e.clientX, e.clientY, cv.clientWidth, cv.clientHeight, cv.clientHeight / (2 * D * Math.tan(FOV / 2)), inside);
      kick();
    });
    document.addEventListener('mouseout', (e) => { if (A && !e.relatedTarget) { A.lampOn = 0; kick(); } });
    document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(); });
    cv.addEventListener('dblclick', () => flip());
    dragControl(cv, {
      active: () => (A && A.phase === 'open' ? A : null),
      box,
      outside: () => close(),
      tap: (e) => { const b = stubBox(); if (b && e.clientX > b.x0 && e.clientX < b.x1 && e.clientY > b.y0 && e.clientY < b.y1) { tear(); return true; } return false; },
      redraw: () => kick(),
    });
  }

  function ensureRenderer() {
    if (tried) return R;
    tried = true;
    dom();
    try { R = Renderer(cv); } catch (e) { R = null; }
    return R;
  }

  // pixel density capped at 1.75 and ~2.4 million pixels (4K screens do not pay four times)
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(2.4e6 / Math.max(1, innerWidth * innerHeight)));
    const w = Math.round(innerWidth * dpr), h = Math.round(innerHeight * dpr);
    // touching width/height recreates the drawing buffer even with the same value
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
  }

  function frameState(now) {
    const P = A.P, vw = cv.clientWidth, vh = cv.clientHeight;
    const ppu = vh / (2 * D * Math.tan(FOV / 2));
    const fr = A.from, fx = fr.left + fr.width / 2, fy = fr.top + fr.height / 2;
    const x0 = (fx - vw / 2) / ppu, y0 = -(fy - vh / 2) / ppu;
    const s0 = 0.9 * fr.width / ((A.ext0 || P.extent) * ppu);
    const env = P.cfg.type === 'envelope';
    const s1 = env ? Math.min(0.5 * vh / (P.T.body * ppu), 0.7 * vw / (P.w * ppu)) : Math.min(0.86 * vh / (P.h * ppu), 0.9 * vw / (P.w * ppu));
    const C = P.letter;
    const scLetter = C ? Math.min(0.86 * vh / (C.h * ppu), 0.9 * vw / (C.w * ppu)) : s1;
    const tf = reduce ? 1 : A.tf;
    const pe = smooth(clamp(env ? A.p * 2 : A.p));
    // arc flight (quadratic Bézier from the spot to the center); the way back arcs higher, like a toss
    const d = Math.hypot(x0, y0), qa = (1 - tf) * (1 - tf), qb = 2 * (1 - tf) * tf, high = A.arc || 0.24;
    const cx = qa * x0 + qb * x0 * 0.5;
    let cy = qa * y0 + qb * (y0 * 0.5 + high * d);
    // spin in one direction, easing in and out (balls spin more; flat and folded sheets less)
    const F = P.F, kSpin = F.shape === 0 && F.squash > 0.5 ? 1 : F.shape === 1 || F.shape === 2 ? 0.8 : 0.45;
    const spin = reduce ? 0 : smooth(tf) * kSpin;
    const tumble = [0.55, 1.15, 0.35], end = [0, 0, -0.02];
    const rot = P.pose.map((a, i) => (a + tumble[i] * spin) * (1 - pe) + end[i] * pe);
    let sc = s0 + (s1 - s0) * Math.pow(tf, 1.25);
    // little hop before leaving, a bounce when landing back, and the sheet settling once open
    const ball = 0.9 * fr.width / ppu;
    const pre = A.pre ?? 1, bounce = A.bounce ?? 1, st = A.settle ?? 1;
    if (pre < 1) { const h = Math.sin(Math.PI * pre); sc *= 1 + 0.12 * h; cy += h * 0.16 * ball; }
    if (bounce < 1) { const damp = (1 - bounce) * (1 - bounce); cy += Math.abs(Math.sin(2 * Math.PI * bounce)) * damp * 0.4 * ball; rot[2] += 0.18 * Math.sin(2 * Math.PI * bounce) * damp; }
    const w = st < 1 ? Math.sin(Math.PI * 2.5 * st) * (1 - st) * (1 - st) : 0;
    const adjust = [0.05 * w, 0.022 * w, 0];
    for (let i = 0; i < 3; i++) rot[i] += adjust[i];
    sc *= 1 + 0.01 * w;
    return { cx, cy, sc, scLetter, rot, adjust, lift: Math.sin(Math.PI * tf), time: now / 1000, ppu, vw, vh, vhU: vh / ppu, L: LIGHT, lampPos: A.lampPos, lamp: A.lamp || 0, lampR: 0.3 * vh / ppu };
  }

  function current(now = performance.now()) { const b = frameState(now); return { b, scene: compose(A.P, A, b) }; }
  function box() {
    if (!A) return null;
    const { b, scene } = current();
    return screenBox(scene.active.P, scene.active.st, b.ppu, b.vw, b.vh);
  }
  function stubBox() {
    if (!A || A.P.stubX === null || A.P.torn || A.p < 0.95 || A.f > 0.01) return null;
    const { b, scene } = current(), st = scene.active.st, P = A.P;
    const cx = b.vw / 2 + st.cx * b.ppu, cy = b.vh / 2 - st.cy * b.ppu;
    return { x0: cx + P.stubX * st.sc * b.ppu, x1: cx + P.half[0] * st.sc * b.ppu, y0: cy - P.half[1] * st.sc * b.ppu, y1: cy + P.half[1] * st.sc * b.ppu };
  }

  function loop(now) {
    raf = 0;
    if (!A || document.hidden) return;
    // when only embers and particles move, 30 frames per second are enough
    if (!A.tw.length && !A.dragging && !A.lampMoving && !A.resume && A.tPrev && now - A.tPrev < 32) { raf = requestAnimationFrame(loop); return; }
    // when resuming after a pause, the first step is one frame long: nothing jumps
    const dt = A.resume ? 1 / 60 : Math.min(0.1, Math.max(0, (now - (A.tPrev || now)) / 1000));
    A.resume = false;
    A.tPrev = now;
    const busy = step(A, now);
    if (!A) return;
    const lamp = approachLamp(A, dt);
    A.lampMoving = lamp;
    if (A.P.burnPts && A.P.front0 > -0.5 && A.phase === 'open' && A.destroy === undefined) A.burnOpen = Math.min(0.08, (A.burnOpen || 0) + dt * 0.004);
    const { b, scene } = current(now);
    A.boxCache = screenBox(scene.active.P, scene.active.st, b.ppu, b.vw, b.vh);
    emit(parts, A, scene, dt);
    parts.step(dt);
    R.draw(scene.items, scene.shadow, parts);
    A.pPrev = A.p;
    // a singed rim is static: it does not keep the loop running
    const burning = scene.active.st.front > -0.5 && !!scene.active.P.burnPts;
    // ashes also end by time: independent of the frame rate
    if (A.ashes && (parts.n === 0 || now > A.ashesEnd)) { finish(); return; }
    if (busy || A.dragging || lamp || parts.n > 0 || burning || A.ashes) raf = requestAnimationFrame(loop);
  }
  function kick() { if (!raf && A) { A.resume = true; raf = requestAnimationFrame(loop); } }

  const remembered = (id) => opts.remember && !!store.get('opened.' + id, false);

  function open(ent) {
    if (A || !ent.P) return;
    const P = ent.P;
    resize();
    const n = store.get('opens.' + P.cfg.id, 0) + 1;
    store.set('opens.' + P.cfg.id, n);
    // redaction bars fade on every opening: redraw after the first frame
    if (P.hasRedaction) requestAnimationFrame(() => R.refreshPrint(P).then(kick));
    const p0 = ent.opened ? openAmount(P) : 0;
    A = { P, ent, from: ent.btn.getBoundingClientRect(), tf: 0, p: p0, ext0: extentAt(P, p0), f: 0, tear: 0, tw: [], phase: 'opening', dragging: false, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 };
    parts.clear();
    ent.btn.classList.add('active');
    cv.style.display = 'block';
    cv.style.pointerEvents = 'auto';
    backdrop.classList.add('on');
    bar.classList.add('on');
    bTear.hidden = P.stubX === null || P.torn;
    srEl.textContent = P.cfg.text.replace(/[#~[\]{}]/g, '') + (P.cfg.back ? ' ' + opts.labels.back + ' ' + P.cfg.back : '');
    const manual = P.cfg.open === 'drag';
    const env = P.cfg.type === 'envelope';
    const ready = () => { if (!A) return; A.phase = 'open'; if (manual && A.p < 0.5) hint.classList.add('on'); };
    if (reduce) {
      cv.style.opacity = '0'; requestAnimationFrame(() => { cv.style.opacity = '1'; });
      A.tf = 1; A.phase = 'open';
      if (!manual) { tween(A, 'p', 1, T_RED * (env ? 1.6 : 1), easeOut); Sound.play('uncrumple', T_RED); } else hint.classList.add('on');
    } else {
      // a little hop in place, the arc flight, and the unfolding starting mid-air; at the end the sheet settles
      A.pre = 0; A.arc = 0.24;
      const t0 = T_PRE * 0.55, dur = env ? T_UNF * 1.85 : T_UNF;
      tween(A, 'pre', 1, T_PRE, linear);
      tween(A, 'tf', 1, T_FLY, easeFly, t0, ready);
      if (!manual) {
        const settle = () => { if (A && A.phase !== 'closing') { A.settle = 0; tween(A, 'settle', 1, 0.9, linear); kick(); } };
        tween(A, 'p', 1, dur, env ? easeSoft : easeOpen(P), t0 + T_UNF0, settle);
        Sound.play(env ? 'seal' : 'uncrumple', dur, t0 + T_UNF0);
      }
    }
    if (P.front0 > -0.5) Sound.play('fire', 2.5, 0.6);
    if (opts.remember) store.set('opened.' + P.cfg.id, true);
    emitEvent(ent.btn, 'open', { id: P.cfg.id, openings: n });
    kick();
    // the first frame goes out right away, at the trigger's spot (which just hid): no flicker
    const { scene } = current();
    R.draw(scene.items, scene.shadow, parts);
  }

  function keepBurn() {
    if (!A || !A.burnOpen) return;
    A.P.burned = Math.min(0.2, A.P.burned + A.burnOpen);
    store.set('burned.' + A.P.cfg.id, A.P.burned);
    A.burnOpen = 0;
  }

  function close() {
    if (!A || A.phase === 'closing') return;
    if (A.P.cfg.burnAfterReading && A.p > 0.9 && A.phase === 'open') { burnAway(); return; }
    keepBurn();
    A.phase = 'closing'; A.dragging = false; A.lampOn = 0;
    A.from = A.ent.btn.getBoundingClientRect();
    backdrop.classList.remove('on'); bar.classList.remove('on'); hint.classList.remove('on');
    cv.style.pointerEvents = 'none';
    A.tw = A.tw.filter((t) => t.key !== 'settle'); A.settle = 1;
    const env = A.P.cfg.type === 'envelope';
    const pEnd = remembered(A.P.cfg.id) ? openAmount(A.P) : 0;
    if (A.tf > 0.999) A.ext0 = extentAt(A.P, pEnd);
    const tp = reduce ? 0.6 : env ? 1.9 : 0.85, dur = tp * Math.max(0.35, A.p - pEnd);
    if (A.f > 0) tween(A, 'f', 0, 0.45, easeIO);
    if (A.p > pEnd + 0.02) Sound.play('crumple', dur);
    tween(A, 'p', pEnd, dur, env ? easeSoft : easeCrumple(A.P));
    if (reduce) tween(A, 'tf', 1, tp, linear, 0, finish);
    else {
      // crumples at the center and already flies back on a high arc; lands on its spot with a small bounce
      if (A.tf > 0.999) A.arc = 0.34;
      const land = () => { if (!A) return; A.bounce = 0; tween(A, 'bounce', 1, 0.36, linear, 0, finish); };
      tween(A, 'tf', 0, 0.78, easeReturn, dur * (env ? 0.8 : 0.5), land);
    }
    emitEvent(A.ent.btn, 'close', { id: A.P.cfg.id });
    kick();
  }

  // burn after reading: on close the burn front runs across the whole paper, with sparks and ashes, and it is gone for good
  function burnAway() {
    keepBurn();
    A.phase = 'closing'; A.dragging = false;
    bar.classList.remove('on'); hint.classList.remove('on');
    cv.style.pointerEvents = 'none';
    if (A.f > 0) tween(A, 'f', 0, 0.4, easeIO);
    const P = A.P.letter || A.P;
    A.destroy = Math.max(P.front0 > -0.5 ? P.front0 + P.burned : -0.06, -0.06);
    Sound.play('fire', 2.8);
    tween(A, 'destroy', 1.6, reduce ? 1.2 : 2.6, linear, 0, () => {
      if (!A) return;
      A.ashes = true;
      A.ashesEnd = performance.now() + 3000;
      backdrop.classList.remove('on');
      const ent = A.ent;
      store.set('destroyed.' + ent.cfg.id, true);
      ent.destroyed = true;
      emitEvent(ent.btn, 'burn', { id: ent.cfg.id });
    });
    kick();
  }

  function finish() {
    if (!A) return;
    const ent = A.ent, destroyed = !!A.ashes;
    A = null;
    parts.clear();
    backdrop.classList.remove('on');
    const hide = () => {
      if (!A) { cv.style.display = 'none'; cv.style.opacity = ''; }
      if (destroyed) { ent.btn.hidden = true; ent.btn.classList.remove('active'); }
      else if (!A || A.ent !== ent) ent.btn.classList.remove('active');
    };
    if (reduce) { cv.style.opacity = '0'; setTimeout(hide, 300); } else hide();
    srEl.textContent = '';
    if (!destroyed) ent.btn.focus({ preventScroll: true });
    updateTrigger(ent);
  }

  // any time but while closing or burning away (the flip turns the whole model, so it works at any opening)
  function flip() {
    if (!A || A.phase === 'closing' || A.destroy !== undefined) return;
    Sound.play('flip');
    tween(A, 'f', A.f < 0.5 ? 1 : 0, 0.8, linear);
    emitEvent(A.ent.btn, 'flip', { id: A.P.cfg.id, back: A.f < 0.5 });
    kick();
  }
  function tear() {
    if (!A || A.P.stubX === null || A.P.torn || A.tear > 0 || A.p < 0.95 || A.f > 0.01) return;
    Sound.play('tear');
    emitEvent(A.ent.btn, 'tear', { id: A.P.cfg.id });
    bTear.hidden = true;
    tween(A, 'tear', 1, reduce ? 0.3 : 1.0, linear, 0, () => { if (A) A.P.torn = true; });
    kick();
  }

  // trigger: a pre-rendered still image without WebGL; the paper is built only when someone gets close or touches it
  function attach(btn, cfgIn, o = {}) {
    dom();
    const cfg = normalize(cfgIn);
    const ent = { btn, cfg, P: null, building: null, opts: o, opened: false };
    entries.push(ent);
    btn.classList.add('crumple-trigger');
    if (store.get('destroyed.' + cfg.id, false)) { btn.hidden = true; ent.destroyed = true; }
    if (!btn.getAttribute('aria-label')) btn.setAttribute('aria-label', opts.labels.open);
    btn.addEventListener('click', async () => {
      const P = await build(ent);
      if (P) open(ent); else openFallback(ent);
    });
    ent.opened = remembered(cfg.id);
    let img = btn.querySelector('img');
    if (o.snapshot) {
      if (!img) { img = document.createElement('img'); img.alt = ''; btn.appendChild(img); }
      img.onerror = () => { ent.opts = {}; img.onerror = null; observe(ent); };
      img.src = ent.opened && o.snapshotOpened ? o.snapshotOpened : o.snapshot;
      const prepare = () => { idle(() => build(ent)); };
      ['pointerenter', 'focus', 'touchstart'].forEach((ev) => btn.addEventListener(ev, prepare, { once: true, passive: true }));
      btn.addEventListener('pointerdown', () => build(ent), { passive: true }); // ~100 ms before the click
    } else observe(ent);
    return ent;
  }
  function observe(ent) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); idle(() => build(ent).then(() => updateTrigger(ent))); } }), { rootMargin: '600px 0px' });
      io.observe(ent.btn);
    } else idle(() => build(ent).then(() => updateTrigger(ent)));
  }
  const idle = window.requestIdleCallback ? (fn) => requestIdleCallback(fn, { timeout: 700 }) : (fn) => setTimeout(fn, 60);
  // at most a few papers built at once (least recently used first out): older ones free their textures, the still image stays
  const built = [];
  function build(ent) {
    if (ent.P) { const i = built.indexOf(ent); if (i >= 0) built.push(built.splice(i, 1)[0]); return Promise.resolve(ent.P); }
    if (ent.building) return ent.building;
    ent.building = (async () => {
      if (!ensureRenderer()) return null;
      ent.P = await R.build(ent.cfg);
      built.push(ent);
      while (built.length > opts.maxBuilt) {
        const i = built.findIndex((x) => (!A || x !== A.ent) && x !== ent);
        if (i < 0) break;
        const old = built.splice(i, 1)[0];
        if (!old.opts.snapshot && old.P) updateTrigger(old);
        if (old.P) R.release(old.P);
        old.P = null; old.building = null;
      }
      return ent.P;
    })();
    return ent.building;
  }
  // trigger image: the crumpled paper (or the loosely crumpled one, if it was opened and remember is on)
  function updateTrigger(ent) {
    if (ent.destroyed) return;
    ent.opened = remembered(ent.cfg.id);
    let img = ent.btn.querySelector('img');
    if (!img) { img = document.createElement('img'); img.alt = ''; ent.btn.appendChild(img); }
    if (ent.opts.snapshot) { img.src = ent.opened && ent.opts.snapshotOpened ? ent.opts.snapshotOpened : ent.opts.snapshot; return; }
    if (ent.P && R) img.src = R.snapshot(ent.P, ent.opened);
  }
  // forget which papers were opened: they go back to tight balls (with a little squeeze)
  function reset() {
    let any = false;
    entries.forEach((ent) => {
      store.remove('opened.' + ent.cfg.id);
      if (!ent.opened || ent.destroyed) return;
      any = true;
      updateTrigger(ent);
      ent.btn.classList.remove('recrumple'); void ent.btn.offsetWidth; ent.btn.classList.add('recrumple');
    });
    if (any) Sound.play('crumple', 0.9);
  }

  // without WebGL2: the paper shows as a CSS sheet with its text (and the still image, if any)
  function openFallback(ent) {
    dom();
    const T = TYPES[ent.cfg.type];
    const c = (k) => Math.round(T.color[k] * 255);
    const sheet = document.createElement('div');
    sheet.className = 'sheet';
    sheet.style.background = `rgb(${c(0)},${c(1)},${c(2)})`;
    sheet.style.fontFamily = `"${T.font}", "Courier Prime", monospace`;
    if (ent.opts.snapshotOpened) { const i = document.createElement('img'); i.src = ent.opts.snapshotOpened; i.alt = ''; sheet.appendChild(i); }
    sheet.appendChild(document.createTextNode(ent.cfg.text.replace(/^# /gm, '').replace(/~~(.+?)~~(\{(.+?)\})?/g, '$1').replace(/\[\[(.+?)\]\]/g, '$1') + (ent.cfg.back ? '\n\n— ' + opts.labels.back + ' —\n' + ent.cfg.back : '')));
    const b = document.createElement('button'); b.type = 'button'; b.textContent = opts.labels.close; b.addEventListener('click', closeFallback);
    fallback.replaceChildren(sheet, b);
    fallback.classList.add('on');
    b.focus();
    fallback.onclick = (e) => { if (e.target === fallback) closeFallback(); };
    fallback._ent = ent;
    emitEvent(ent.btn, 'open', { id: ent.cfg.id, fallback: true });
  }
  function closeFallback() {
    fallback.classList.remove('on');
    if (fallback._ent) fallback._ent.btn.focus({ preventScroll: true });
  }

  return {
    // options: { labels, remember, motion: 'auto' | 'full' | 'reduced', flashlight, maxBuilt }
    init(o = {}) {
      opts = { ...opts, ...o, labels: { ...DEFAULT_LABELS, ...(o.labels || {}) } };
      if (cv) {
        // init after attach: apply the new labels to the elements that already exist
        bFlip.textContent = opts.labels.flip; bTear.textContent = opts.labels.tear; bClose.textContent = opts.labels.close; hint.textContent = opts.labels.hint;
      }
      dom();
      reduce = computeReduce();
      idle(ensureRenderer);
    },
    attach,
    open: (ent) => build(ent).then((P) => (P ? open(ent) : openFallback(ent))),
    close, flip, tear, reset,
    get reducedMotion() { return reduce; },
    get entries() { return entries; },
    get isOpen() { return !!A; },
    // debugging/testing: draws a fixed frame (flight, unfold, flip, tear, burn front) of an attached paper
    async frame(i, tf, p, f = 0, tearV = 0, destroy) {
      const ent = entries[i];
      await build(ent);
      if (destroy !== undefined) await R.ensureBurn(ent.P);
      cancelAnimationFrame(raf); raf = 0;
      resize();
      A = { P: ent.P, ent, from: ent.btn.getBoundingClientRect(), tf, p, f, tear: tearV, tw: [], phase: 'open', burnOpen: 0 };
      if (destroy !== undefined) A.destroy = destroy;
      cv.style.display = 'block'; backdrop.classList.add('on');
      entries.forEach((x) => x.btn.classList.toggle('active', x === ent));
      const { scene } = current();
      R.draw(scene.items, scene.shadow, null);
    },
    // debugging/testing: lights the flashlight at screen (x, y) and draws
    flashlight(x, y) { if (A) { lampTarget(A, x, y, cv.clientWidth, cv.clientHeight, cv.clientHeight / (2 * D * Math.tan(FOV / 2)), true); A.lampPos = A.lampGoal.slice(); A.lamp = 1; const { scene } = current(); R.draw(scene.items, scene.shadow, null); } },
    get debug() { return A ? { phase: A.phase, ashes: !!A.ashes, destroy: A.destroy, n: parts.n, raf, tw: A.tw.map((t) => t.key), lampPos: A.lampPos, lamp: A.lamp } : null; },
  };
})();
