// Animation pieces shared by the Scene (fly to center) and the Stage (inline preview): tweens, the envelope
// composition, screen boxes, particle emitters, drag/pinch to unfold and the flashlight.
import { clamp, smooth, lerp, linear, easeIO, easeOut, easeUnfold, listen } from './util.js';
import { Sound } from './sound.js';

// time-based tweens on numeric fields of an animation state A
export function tween(A, key, to, dur, ease = linear, delay = 0, done) {
  A.tw = A.tw.filter((t) => t.key !== key);
  A.tw.push({ key, to, dur: Math.max(0.001, dur), ease, start: performance.now() + delay * 1000, from: null, done });
}
export function step(A, now) {
  let busy = false;
  const finished = [];
  A.tw = A.tw.filter((t) => {
    busy = true;
    if (now < t.start) return true;
    if (t.from === null) t.from = A[t.key];
    const u = clamp((now - t.start) / (t.dur * 1000));
    A[t.key] = t.from + (t.to - t.from) * t.ease(u);
    if (u >= 1) { if (t.done) finished.push(t.done); return false; }
    return true;
  });
  finished.forEach((f) => f());
  return busy;
}

// how open a remembered paper stays when it returns to its spot: loosely crumpled, not a tight ball
// (the envelope keeps its flap open with the letter peeking out)
export function openAmount(P) {
  if (P.cfg.type === 'envelope') return 0.34;
  const sh = P.F.shape;
  return sh === 0 ? 0.42 : sh === 2 ? 0.35 : 0.3;
}
// size of the paper (largest side) at an opening amount p: the same math as the on-screen box
export function extentAt(P, p) {
  const e = smooth(clamp(p));
  return 2 * Math.max(P.F.ext[0] / 2 + (P.half[0] - P.F.ext[0] / 2) * e, P.F.ext[1] / 2 + (P.half[1] - P.F.ext[1] / 2) * e);
}
// resting rotation at an opening amount p (the same blend the scene uses with the flight stopped)
export function poseAt(P, p) {
  const pe = smooth(clamp(P.cfg.type === 'envelope' ? p * 2 : p)), end = [0, 0, -0.02];
  return P.pose.map((a, i) => a * (1 - pe) + end[i] * pe);
}

// composition: the envelope opens its flap, lets the letter out, drops away, and the letter unfolds at the center
export function compose(P, A, b) {
  const frontOf = (Q, extra = 0) => (A.destroy !== undefined ? A.destroy : (Q.front0 > -0.5 ? Q.front0 + Q.burned + extra : -1));
  // while burning away, the shadow fades with the paper
  const alpha = A.destroy !== undefined ? clamp((1.25 - A.destroy) / 0.9) : 1;
  if (P.cfg.type !== 'envelope') {
    const st = { ...b, p: A.p, f: A.f, tear: A.tear, front: frontOf(P, A.burnOpen || 0), destroy: A.destroy !== undefined, alpha };
    return { items: [{ P, st }], shadow: { P, st }, active: { P, st } };
  }
  const C = P.letter, p = A.p;
  const fa = smooth(clamp(p / 0.24)), fl = smooth(clamp((p - 0.14) / 0.36)), fd = smooth(clamp((p - 0.44) / 0.32)), fu = clamp((p - 0.58) / 0.42);
  // the envelope turns with the flip too (f is the same for both: the letter turns in the pocket with it)
  const env = { ...b, p: fa, f: A.f, tear: 0, cy: b.cy - fd * b.vhU * 0.8, rot: [b.rot[0], b.rot[1], b.rot[2] + fd * 0.45], front: frontOf(P) };
  // the letter uses the envelope's transform plus a local offset: inside the pocket (behind the body), rising through the mouth.
  // drawPaper turns the offset with the flip, so it is counter-turned by the same yaw: the pocket stays behind the body on both sides
  const ly = -0.08 + fl * 0.5, oz = -0.035 * (1 - fd), yaw = Math.PI * easeIO(clamp(A.f));
  const end = [0, 0, -0.02];
  const letter = { ...b, cx: lerp(env.cx, 0, fd), cy: lerp(env.cy, 0, fd), sc: lerp(env.sc, b.scLetter, fd), rot: env.rot.map((a, i) => lerp(a, end[i] + (b.adjust ? b.adjust[i] : 0), fd)), local: [-Math.sin(yaw) * oz, ly * (1 - fd), Math.cos(yaw) * oz], p: easeUnfold(fu), f: A.f, tear: 0, front: frontOf(C, A.burnOpen || 0), destroy: A.destroy !== undefined, alpha };
  // the closed letter inside the closed envelope is not drawn at all
  const items = fd >= 0.999 ? [{ P: C, st: letter }] : p < 0.01 ? [{ P, st: env }] : [{ P, st: env }, { P: C, st: letter }];
  return { items, shadow: fd < 0.5 ? { P, st: env } : { P: C, st: letter }, active: fd < 0.5 ? { P, st: env } : { P: C, st: letter } };
}

// on-screen box of the active paper (to drag, click outside and aim the flashlight)
export function screenBox(Q, st, ppu, vw, vh, ox = 0, oy = 0) {
  const e = smooth(clamp(st.p));
  const hx = (Q.F.ext[0] / 2 + (Q.half[0] - Q.F.ext[0] / 2) * e) * st.sc * ppu * 1.1;
  const hy = (Q.F.ext[1] / 2 + (Q.half[1] - Q.F.ext[1] / 2) * e) * st.sc * ppu * 1.1;
  const cx = ox + vw / 2 + st.cx * ppu, cy = oy + vh / 2 - st.cy * ppu;
  return { cx, cy, x0: cx - hx, x1: cx + hx, y0: cy - hy, y1: cy + hy, w1: Q.half[0] * 2 * st.sc * ppu, h1: Q.half[1] * 2 * st.sc * ppu };
}

// emitters: dust while unfolding; sparks on the burn front; ashes while burning away
export function emit(parts, A, scene, dt) {
  const { P: Q, st } = scene.active;
  const dp = A.p - (A.pPrev ?? A.p);
  const e = smooth(clamp(st.p));
  const hx = (Q.F.ext[0] / 2 + (Q.half[0] - Q.F.ext[0] / 2) * e) * st.sc, hy = (Q.F.ext[1] / 2 + (Q.half[1] - Q.F.ext[1] / 2) * e) * st.sc;
  if (dp > 0.0005 && A.p > 0.12 && A.p < 0.97) {
    const n = Math.min(8, Math.round(dp * 300));
    for (let i = 0; i < n; i++) parts.emit({ x: st.cx + (Math.random() - 0.5) * 2 * hx, y: st.cy + (Math.random() - 0.5) * 2 * hy, z: 0.06 * st.sc, vx: (Math.random() - 0.5) * 0.05 * st.sc, vy: (Math.random() * 0.04 + 0.01) * st.sc, ay: -0.01 * st.sc, r: 0.93, g: 0.9, b: 0.84, a: 0.5, s: (0.005 + Math.random() * 0.008) * st.sc, t: 0, life: 1.2 + Math.random() * 0.9 });
  }
  const fr = st.front;
  if (fr > -0.5 && Q.burnPts && st.p > 0.9) {
    const destroying = A.destroy !== undefined;
    A.acc = (A.acc || 0) + dt * (destroying ? 110 : 9);
    const pts = Q.burnPts, np = pts.length / 3;
    const cz = Math.cos(st.rot[2]), sz = Math.sin(st.rot[2]);
    while (A.acc >= 1) {
      A.acc -= 1;
      let k = -1;
      for (let tries = 0; tries < 40; tries++) { const j = Math.floor(Math.random() * np); if (Math.abs(pts[j * 3 + 2] - fr) < 0.012) { k = j; break; } }
      if (k < 0) continue;
      const lx = (pts[k * 3] - 0.5) * Q.w * st.sc, ly = (pts[k * 3 + 1] - 0.5) * Q.h * st.sc;
      const x = st.cx + cz * lx - sz * ly, y = st.cy + sz * lx + cz * ly;
      parts.emit({ x, y, z: 0.02 * st.sc, vx: (Math.random() - 0.5) * 0.08 * st.sc, vy: (0.06 + Math.random() * 0.1) * st.sc, ay: 0.06 * st.sc, r: 1, g: 0.5 + Math.random() * 0.3, b: 0.12, a: 1, s: (0.003 + Math.random() * 0.005) * st.sc, t: 0, life: 0.5 + Math.random() * 0.8, flicker: true });
      if (destroying && Math.random() < 0.45) parts.emit({ x, y, z: 0.02 * st.sc, vx: (Math.random() - 0.5) * 0.06 * st.sc, vy: -(0.02 + Math.random() * 0.05) * st.sc, ay: -0.05 * st.sc, r: 0.2, g: 0.19, b: 0.18, a: 0.85, s: (0.008 + Math.random() * 0.012) * st.sc, t: 0, life: 1.4 + Math.random() * 1.1 });
    }
  }
}

// drag to unfold: moving away from the center opens, moving back crumples; a two-finger pinch does the same
export function dragControl(el, api) {
  const points = new Map();
  const offs = [];
  let d = null;
  const dist = () => { const [a, b] = [...points.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };
  const onDown = (e) => {
    const A = api.active();
    if (!A) return;
    const box = api.box();
    const inside = box && e.clientX > box.x0 && e.clientX < box.x1 && e.clientY > box.y0 && e.clientY < box.y1;
    if (!inside && !points.size) { api.outside(e); return; }
    if (!points.size && api.tap && api.tap(e)) return;
    points.set(e.pointerId, { x: e.clientX, y: e.clientY });
    try { el.setPointerCapture(e.pointerId); } catch (x) { /* no capture */ }
    A.tw = A.tw.filter((t) => t.key !== 'p');
    if (points.size === 2) d = { pinch: true, d0: dist(), p0: A.p, moved: true, last: A.p, box };
    else d = { pinch: false, r0: Math.hypot(e.clientX - box.cx, e.clientY - box.cy), p0: A.p, x: e.clientX, y: e.clientY, moved: false, last: A.p, box };
  };
  const onMove = (e) => {
    if (!d || !points.has(e.pointerId)) return;
    points.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const A = api.active();
    if (!A) { d = null; points.clear(); return; }
    const m = 0.42 * Math.min(d.box.w1, d.box.h1);
    if (d.pinch && points.size === 2) A.p = clamp(d.p0 + (dist() - d.d0) / m);
    else if (!d.pinch) {
      if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 6) d.moved = true;
      if (!d.moved) return;
      A.p = clamp(d.p0 + (Math.hypot(e.clientX - d.box.cx, e.clientY - d.box.cy) - d.r0) / m);
    }
    if (Math.abs(A.p - d.last) > 0.035) { Sound.play('grain'); d.last = A.p; }
    A.dragging = true;
    api.redraw();
  };
  const release = (e) => {
    if (!points.has(e.pointerId)) return;
    points.delete(e.pointerId);
    if (points.size) return;
    const A = api.active();
    const moved = d && d.moved;
    d = null;
    if (!A) return;
    A.dragging = false;
    if (!moved) return;
    if (A.p >= 0.3) { Sound.play('uncrumple', 0.4); tween(A, 'p', 1, 0.45 * (1 - A.p) + 0.15, easeOut); }
    else { Sound.play('crumple', 0.35); tween(A, 'p', 0, 0.35 * A.p + 0.12, easeOut); }
    api.redraw();
  };
  [['pointerdown', onDown], ['pointermove', onMove], ['pointerup', release], ['pointercancel', release]].forEach(([t, f]) => listen(offs, el, t, f));
  // returns a function that removes the listeners
  return () => offs.splice(0).forEach((f) => f());
}

// flashlight: a low light under the cursor. It follows the pointer with time-based smoothing (independent of the
// frame rate), lights up when entering the paper and fades when leaving. x, y in canvas pixels; the height
// (0.09 of the view) keeps the light grazing around the pool
export function lampTarget(A, x, y, vw, vh, ppu, inside) {
  const p = [(x - vw / 2) / ppu, -(y - vh / 2) / ppu, 0.09 * vh / ppu];
  if (!A.lampPos) A.lampPos = p.slice();
  A.lampGoal = p;
  A.lampOn = inside ? 1 : 0;
  A.lampMoving = true; // the next frame must not fall into the 30 fps limiter
}
export function approachLamp(A, dt) {
  if (!A.lampGoal) return false;
  const k = 1 - Math.exp(-dt * 20), kl = 1 - Math.exp(-dt * 7);
  let moving = false;
  for (let i = 0; i < 3; i++) { const d = A.lampGoal[i] - A.lampPos[i]; if (Math.abs(d) > 1e-4) moving = true; A.lampPos[i] += d * k; }
  const dl = (A.lampOn || 0) - (A.lamp || 0);
  if (Math.abs(dl) > 0.002) moving = true;
  A.lamp = (A.lamp || 0) + dl * kl;
  return moving;
}
