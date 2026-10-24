// Height fields computed off the main thread (see worker.js). These functions are stringified into the
// worker, so they may only use their arguments, rng and noise2.
import { rng, noise2 } from './util.js';

// creases: straight fold lines summed into a height field ("roof" profile, sharp ridge). o = { seed, shape, w, h, card, foldY }
export function creaseField(o, W, H) {
  const r = rng(o.seed);
  const sgn = () => (r() < 0.5 ? -1 : 1);
  const hw = o.w / 2, hh = o.h / 2;
  const f = new Float32Array(W * H);
  const sx = W / o.w, sy = H / o.h;
  const add = (half, wid, amp, cx, cy, a) => {
    if (a === undefined) a = r() * Math.PI;
    if (cx === undefined) { cx = (r() * 2 - 1) * hw; cy = (r() * 2 - 1) * hh; }
    const dx = Math.cos(a), dy = Math.sin(a);
    const ex = Math.abs(dx) * half + wid, ey = Math.abs(dy) * half + wid;
    const i0 = Math.max(0, Math.floor((cx - ex + hw) * sx)), i1 = Math.min(W - 1, Math.ceil((cx + ex + hw) * sx));
    const j0 = Math.max(0, Math.floor((cy - ey + hh) * sy)), j1 = Math.min(H - 1, Math.ceil((cy + ey + hh) * sy));
    const taper = Math.min(0.08, half);
    for (let j = j0; j <= j1; j++) {
      const py = (j + 0.5) / sy - hh - cy;
      for (let i = i0; i <= i1; i++) {
        const px = (i + 0.5) / sx - hw - cx;
        const d = Math.abs(-px * dy + py * dx);
        if (d >= wid) continue;
        const t = Math.abs(px * dx + py * dy);
        if (t >= half) continue;
        f[j * W + i] += amp * (1 - d / wid) * Math.min(1, (half - t) / taper);
      }
    }
  };
  const folded = o.shape === 'quarters' || o.shape === 'half' || o.shape === 'thirds';
  let k = folded ? 0.18 : o.shape === 'roll' ? 0.45 : o.shape === 'twist' ? 0.55 : 1;
  let ka = folded ? 0.35 : o.shape === 'roll' ? 0.6 : o.shape === 'twist' ? 0.6 : 1;
  if (o.card) { k *= 0.5; ka *= 0.5; }
  if (o.shape === 'envelope') { k = 0.08; ka = 0.25; }
  const area = (o.w * o.h) / (0.84 * 1.1);
  for (let i = 0; i < Math.round(8 * k * area); i++) add(2, 0.08 + r() * 0.1, sgn() * (0.8 + r() * 0.4) * ka);
  for (let i = 0; i < Math.round(46 * k * area); i++) add(0.1 + r() * 0.28, 0.035 + r() * 0.05, sgn() * (0.45 + r() * 0.4) * ka);
  for (let i = 0; i < Math.round(150 * k * area); i++) add(0.03 + r() * 0.1, 0.01 + r() * 0.025, sgn() * (0.2 + r() * 0.35) * ka);
  if (o.shape === 'twist') {
    for (const side of [-1, 1]) for (let i = 0; i < 26; i++) add(0.12 + r() * 0.3, 0.012 + r() * 0.02, sgn() * (0.5 + r() * 0.5), side * hw * (0.6 + r() * 0.36), (r() * 2 - 1) * hh, Math.PI / 2 + side * (0.5 + r() * 0.35));
  }
  if (o.shape === 'half' || o.shape === 'quarters') add(2, 0.022, 0.6, 0, 0, Math.PI / 2);
  if (o.shape === 'quarters') add(2, 0.022, -0.55, 0, 0, 0);
  if (o.shape === 'thirds') { add(2, 0.02, 0.55, 0, -o.h / 6 * 1.08, 0); add(2, 0.02, -0.55, 0, o.h / 6, 0); }
  if (o.shape === 'envelope') add(2, 0.02, 0.5, 0, o.foldY, 0);
  let mx = 1e-6;
  for (let i = 0; i < f.length; i++) if (Math.abs(f[i]) > mx) mx = Math.abs(f[i]);
  for (let i = 0; i < f.length; i++) f[i] /= mx;
  return f;
}

// burn: noisy distance to the corner where the fire started; the burn front itself is a shader uniform
export function burnField(o, MW, MH) {
  const nz = noise2(o.seed * 7 + 11);
  const v = o.seed % 4, ox = (v & 1) ? MW : 0, oy = (v & 2) ? MH : 0;
  const diag = Math.hypot(MW, MH);
  const b = new Float32Array(MW * MH);
  for (let j = 0; j < MH; j++) for (let i = 0; i < MW; i++) b[j * MW + i] = Math.sqrt((i - ox) * (i - ox) + (j - oy) * (j - oy)) / diag + (nz(i * 0.02, j * 0.02) - 0.5) * 0.32;
  return b;
}
