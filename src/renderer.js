// WebGL2 renderer: one context per canvas. Builds papers (meshes + textures) and draws scenes of them.
import { clamp, smooth, easeIO, rng, store, ensureFonts, loadTexture, makeCanvas } from './util.js';
import { TYPES, normalize } from './catalog.js';
import { drawPrint, drawEffects, hiddenInkField } from './print.js';
import { Jobs } from './worker.js';
import { VS, FS, SVS, SFS, PVS, PFS } from './shaders.js';
import { openAmount, extentAt, poseAt, compose } from './motion.js';

// column-major 4x4 matrices
const M4 = {
  persp(fy, asp, n, f) { const t = 1 / Math.tan(fy / 2), nf = 1 / (n - f); return [t / asp, 0, 0, 0, 0, t, 0, 0, 0, 0, (f + n) * nf, -1, 0, 0, 2 * f * n * nf, 0]; },
  mul(a, b) { const o = new Array(16); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) { let s = 0; for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k]; o[c * 4 + r] = s; } return o; },
  T(x, y, z) { return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]; },
  S(s) { return [s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, 1]; },
  RX(a) { const c = Math.cos(a), s = Math.sin(a); return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]; },
  RY(a) { const c = Math.cos(a), s = Math.sin(a); return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]; },
  RZ(a) { const c = Math.cos(a), s = Math.sin(a); return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; },
};
// camera: 30° vertical field of view, 10 units away; key light from the upper left
export const FOV = 30 * Math.PI / 180, D = 10;
export const LIGHT = [-0.45, 0.62, 0.65];

// shape parameters for the vertex shader (shape id, curvature, squash, relief amplitude, closed extent)
function shapeParams(shape, T) {
  const hw = T.w / 2, hh = T.h / 2, smax = Math.hypot(hw, hh);
  if (shape === 'flat') { const k0 = 0.78 * Math.PI / smax, R = 1 / k0; return { shape: 0, k0, squash: 0.3, roll: 0, A0: T.card ? 0.06 : 0.1, Ares: 0.0045, ext: [2.42 * R, 2.42 * R] }; }
  if (shape === 'roll') { const roll = Math.max(0.03, T.w * 0.085); return { shape: 1, k0: 0, squash: 1, roll, A0: 0.03, Ares: 0.004, ext: [2.2 * roll, T.h] }; }
  if (shape === 'twist') { const k0 = 3.3 * Math.PI / T.h; return { shape: 2, k0, squash: 1, roll: 0.012, A0: 0.03, Ares: 0.0045, ext: [T.w, 2.6 / k0] }; }
  if (shape === 'quarters') return { shape: 3, k0: 0, squash: 1, roll: 0, A0: 0.007, Ares: 0.0035, ext: [hw * 1.05, hh * 1.05] };
  if (shape === 'half') return { shape: 4, k0: 0, squash: 1, roll: 0, A0: 0.007, Ares: 0.0035, ext: [hw * 1.05, T.h * 1.02] };
  if (shape === 'thirds') return { shape: 5, k0: 0, squash: 1, roll: 0, A0: 0.007, Ares: 0.0035, ext: [T.w * 1.02, T.h / 3 * 1.05] };
  if (shape === 'envelope') return { shape: 6, k0: 0, squash: 1, roll: 0, A0: 0.005, Ares: 0.003, ext: [T.w * 1.02, T.body * 1.04] };
  const k0 = 0.95 * Math.PI / smax, R = 1 / k0;
  return { shape: 0, k0, squash: 1, roll: 0, A0: T.card ? 0.07 : 0.12, Ares: 0.0045, ext: [2 * (R + 0.06), 2 * (R + 0.06)] };
}

export function Renderer(canvas) {
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: true });
  if (!gl) return null;
  const program = (vs, fs) => {
    const sh = (t, c) => { const s = gl.createShader(t); gl.shaderSource(s, c); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
    const p = gl.createProgram();
    gl.attachShader(p, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    const u = {}, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++) { const a = gl.getActiveUniform(p, i); u[a.name] = gl.getUniformLocation(p, a.name); }
    return { p, u };
  };
  const pp = program(VS, FS), sp = program(SVS, SFS), qp = program(PVS, PFS);
  const quad = gl.createVertexArray();
  gl.bindVertexArray(quad);
  const qb = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, qb); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const ql = gl.getAttribLocation(sp.p, 'aQ');
  gl.enableVertexAttribArray(ql); gl.vertexAttribPointer(ql, 2, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  const pVao = gl.createVertexArray(), pBuf = gl.createBuffer();
  gl.bindVertexArray(pVao);
  gl.bindBuffer(gl.ARRAY_BUFFER, pBuf);
  gl.bufferData(gl.ARRAY_BUFFER, 420 * 32, gl.DYNAMIC_DRAW); // fixed size: each frame only rewrites the part in use
  [['aP', 3, 0], ['aC', 4, 12], ['aS', 1, 28]].forEach(([name, n, off]) => { const l = gl.getAttribLocation(qp.p, name); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, n, gl.FLOAT, false, 32, off); });
  gl.bindVertexArray(null);

  // grid mesh with exact extra columns and rows (folds at x = 0, y = 0, thirds, flap and stub) so folds stay straight
  function mesh(x0, x1, hh, nx, ny, extraX, extraY) {
    const xs = [];
    for (let i = 0; i <= nx; i++) xs.push(x0 + (x1 - x0) * i / nx);
    extraX.forEach((x) => { if (x > x0 + 1e-6 && x < x1 - 1e-6) xs.push(x); });
    xs.sort((a, b) => a - b);
    const ys = [];
    for (let j = 0; j <= ny; j++) ys.push(-hh + 2 * hh * j / ny);
    extraY.forEach((y) => { if (y > -hh + 1e-6 && y < hh - 1e-6 && !ys.some((v) => Math.abs(v - y) < 1e-6)) ys.push(y); });
    ys.sort((a, b) => a - b);
    const cols = xs.length, rows = ys.length;
    const xy = new Float32Array(cols * rows * 2);
    let o = 0;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { xy[o++] = xs[i]; xy[o++] = ys[j]; }
    const idx = new Uint16Array((cols - 1) * (rows - 1) * 6);
    o = 0;
    for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
      const a = j * cols + i, b = a + 1, c = a + cols, d = c + 1;
      idx[o++] = a; idx[o++] = b; idx[o++] = d; idx[o++] = a; idx[o++] = d; idx[o++] = c;
    }
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const vb = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vb); gl.bufferData(gl.ARRAY_BUFFER, xy, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pp.p, 'aXY');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const ib = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
    gl.bindVertexArray(null);
    return { vao, count: idx.length, bufs: [vb, ib] };
  }
  function texture(src, opts) {
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    if (opts.float) {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG16F, opts.w, opts.h, 0, gl.RG, gl.FLOAT, src);
    } else {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    }
    if (opts.mip) { gl.generateMipmap(gl.TEXTURE_2D); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR); }
    else gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return t;
  }

  // shared 1x1 textures: empty back (transparent) and a paper without cut-outs (present, no burn)
  let tEmpty = null, tFull = null;
  const tex1 = (px) => { const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(px)); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST); return t; };
  const empty = () => tEmpty || (tEmpty = tex1([0, 0, 0, 0]));
  const full = () => tFull || (tFull = tex1([255, 0, 0, 255]));
  const drop = (t) => { if (t && t !== tEmpty && t !== tFull) gl.deleteTexture(t); };
  // paper grain: one repeating texture for every paper; until the image arrives, a neutral gray (factor 1)
  let tGrain = null, grainReady = null;
  function grain() {
    if (tGrain) return tGrain;
    tGrain = tex1([240, 240, 240, 255]);
    grainReady = loadTexture('grain').then((img) => {
      if (!img) return;
      gl.bindTexture(gl.TEXTURE_2D, tGrain);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    });
    return tGrain;
  }

  async function build(cfgIn) {
    const cfg = normalize(cfgIn);
    const T = TYPES[cfg.type];
    grain();
    // the letter lives inside the envelope: same text, back, states and hidden ink; folded in thirds. Built alongside the envelope
    const letterP = cfg.type === 'envelope' ? build({ id: cfg.id + '-letter', type: cfg.letter, shape: 'thirds', text: cfg.text, back: cfg.back, states: cfg.states.filter((e) => e !== 'torn'), seed: cfg.seed + 1, hiddenInk: cfg.hiddenInk }) : null;
    await ensureFonts([T.font, 'Caveat', 'Courier Prime', 'Special Elite']);
    const hw = T.w / 2, hh = T.h / 2;
    const F = shapeParams(cfg.shape, T);
    const W = Math.round(512 * T.w / 0.84), H = Math.round(W * T.h / T.w);
    const openings = store.get('opens.' + cfg.id, 0);
    const r = rng(cfg.seed * 7 + 1);
    const stubX = T.stub ? hw - T.w * T.stub : null;
    const foldY = T.body ? -hh + T.body : 0;
    const nx = Math.max(16, Math.round(Math.sqrt(15000 * T.w / T.h))), ny = Math.max(16, Math.round(nx * T.h / T.w));
    const exX = [0], exY = [0, -T.h / 6 * 1.08, T.h / 6, foldY];
    const meshes = [];
    if (stubX !== null) {
      const nMain = Math.round(nx * (stubX + hw) / T.w);
      meshes.push(mesh(-hw, stubX, hh, nMain, ny, exX, exY));
      meshes.push(mesh(stubX, hw, hh, nx - nMain, ny, exX, exY));
    } else meshes.push(mesh(-hw, hw, hh, nx, ny, exX, exY));
    // an empty back and a paper without cut-outs use the shared 1x1 textures (saves ~6 MB of texture per paper)
    const backEmpty = !(cfg.back || cfg.type === 'notebook' || cfg.type === 'form' || cfg.type === 'envelope' || cfg.type === 'newspaper' || ['coffee', 'water', 'prints', 'aged', 'wine', 'ink', 'foxing', 'faded'].some((e) => cfg.states.includes(e)));
    const noEffects = !(cfg.type === 'notebook' || cfg.type === 'form' || cfg.type === 'envelope' || cfg.states.includes('torn') || cfg.states.includes('burnt') || cfg.burnAfterReading);
    const [creases, printF, printB, fx] = await Promise.all([
      Jobs.run('creases', [{ seed: cfg.seed, shape: cfg.shape, w: T.w, h: T.h, card: !!T.card, foldY }, W, H]),
      drawPrint(cfg, T, 'front', openings),
      backEmpty ? null : drawPrint(cfg, T, 'back', openings),
      noEffects ? null : drawEffects(cfg, T),
    ]);
    const ink = hiddenInkField(cfg, W, H);
    const rg = new Float32Array(W * H * 2);
    for (let i = 0; i < W * H; i++) { rg[i * 2] = creases[i]; rg[i * 2 + 1] = ink ? ink[i] : 0; }
    const long = F.shape === 1 || F.shape === 2;
    const P = {
      cfg, T, w: T.w, h: T.h, half: [hw, hh], F, stubX, foldY, meshes, openings,
      tH: texture(rg, { float: true, w: W, h: H }),
      tPF: texture(printF, { mip: true }),
      tPB: backEmpty ? empty() : texture(printB, { mip: true }),
      tFx: noEffects ? full() : texture(fx.canvas, {}),
      burnPts: noEffects ? null : fx.burnPts,
      backEmpty,
      // estimated texture memory (front and back with mipmaps, effects, creases in RG16F)
      bytes: Math.round(printF.width * printF.height * 4 * 1.33 * (backEmpty ? 1 : 2) + (noEffects ? 0 : fx.canvas.width * fx.canvas.height * 4) + W * H * 4),
      // folded and elongated papers stay almost facing the camera; crumpled ones may spin freely
      pose: F.shape >= 3 ? [-0.22 + r() * 0.18, -0.2 + r() * 0.4, -0.45 + r() * 0.9] : long ? [-0.15 + r() * 0.15, -0.15 + r() * 0.3, -0.6 + r() * 1.2] : [-0.3 + r() * 0.25, -0.35 + r() * 0.7, r() * 6.28],
      seedA: r() * 6.28,
      front0: cfg.states.includes('burnt') ? 0.3 + 0.06 * r() : -1,
      burned: store.get('burned.' + cfg.id, 0),
      age: cfg.states.includes('aged') ? 1 : 0,
      torn: false,
    };
    P.extent = Math.max(F.ext[0], F.ext[1]);
    P.hasRedaction = /\[\[/.test(cfg.text + cfg.back);
    if (letterP) P.letter = await letterP;
    await grainReady;
    return P;
  }

  // redaction bars fade on every opening: redraw just the print
  async function refreshPrint(P) {
    P.openings = store.get('opens.' + P.cfg.id, 0);
    const [f, v] = await Promise.all([drawPrint(P.cfg, P.T, 'front', P.openings), P.backEmpty ? null : drawPrint(P.cfg, P.T, 'back', P.openings)]);
    drop(P.tPF); drop(P.tPB);
    P.tPF = texture(f, { mip: true }); P.tPB = v ? texture(v, { mip: true }) : empty();
  }

  function release(P) {
    [P.tH, P.tPF, P.tPB, P.tFx].forEach(drop);
    P.meshes.forEach((m) => { gl.deleteVertexArray(m.vao); m.bufs.forEach((b) => gl.deleteBuffer(b)); });
    if (P.letter) release(P.letter);
  }

  function drawPaper(P, st, proj) {
    const f = st.f || 0;
    let model = M4.mul(M4.T(st.cx, st.cy, (st.zoff || 0) * st.sc + 0.12 * st.sc * Math.sin(Math.PI * f)), M4.S(st.sc));
    model = M4.mul(model, M4.RZ(st.rot[2]));
    model = M4.mul(model, M4.RX(st.rot[0]));
    model = M4.mul(model, M4.RY(st.rot[1] + Math.PI * easeIO(clamp(f))));
    // offset in the paper's own space (the letter inside the envelope pocket, which turns with it)
    if (st.local) model = M4.mul(model, M4.T(st.local[0], st.local[1], st.local[2]));
    const u = pp.u;
    gl.useProgram(pp.p);
    [[P.tH, 'uH'], [P.tPF, 'uPrintF'], [P.tPB, 'uPrintB'], [P.tFx, 'uFx']].forEach(([t, name], i) => {
      gl.activeTexture(gl.TEXTURE0 + i); gl.bindTexture(gl.TEXTURE_2D, t); gl.uniform1i(u[name], i);
    });
    gl.activeTexture(gl.TEXTURE4); gl.bindTexture(gl.TEXTURE_2D, grain()); gl.uniform1i(u.uGrain, 4);
    gl.uniform2f(u.uGrainK, P.w * 5, P.h * 5);
    const L = st.L || LIGHT;
    gl.uniform1i(u.uShape, P.F.shape);
    gl.uniform1f(u.uP, clamp(st.p));
    gl.uniform1f(u.uK0, P.F.k0);
    gl.uniform1f(u.uKres, 0.06);
    gl.uniform1f(u.uA0, P.F.A0);
    gl.uniform1f(u.uAres, P.F.Ares);
    gl.uniform1f(u.uSeedA, P.seedA);
    gl.uniform1f(u.uSquash, P.F.squash);
    gl.uniform1f(u.uRoll, P.F.roll || 0.03);
    gl.uniform1f(u.uCurl, 0.9 * Math.sin(Math.PI * clamp(f)));
    gl.uniform1f(u.uStubX, P.stubX ?? 0);
    gl.uniform1f(u.uFoldSide, P.T.stub ? -1 : 1);
    gl.uniform1f(u.uFoldBw, P.T.card ? 0.03 : 0.016);
    gl.uniform1f(u.uFoldY, P.foldY || 0);
    gl.uniform1f(u.uThick, f > 0.5 ? -0.006 : 0.006);
    gl.uniform1f(u.uScale, st.sc);
    gl.uniform1f(u.uBump, 1.0);
    gl.uniform2f(u.uHalf, P.half[0], P.half[1]);
    gl.uniform3f(u.uCam, 0, 0, D);
    gl.uniform3f(u.uColor, P.T.color[0], P.T.color[1], P.T.color[2]);
    gl.uniform3f(u.uL, L[0], L[1], L[2]);
    gl.uniform1f(u.uAge, P.age);
    gl.uniform1f(u.uThru, P.T.card ? 0 : 0.035);
    gl.uniform1f(u.uTime, st.time || 0);
    gl.uniform1f(u.uFront, st.front ?? -1);
    gl.uniform1f(u.uDestroy, st.destroy ? 1 : 0);
    // hidden ink and flashlight (world position, how lit it is, pool radius)
    gl.uniform1f(u.uInkMax, 0.0024 * st.sc);
    const lp = st.lampPos || [0, 0, 10];
    gl.uniform3f(u.uLampPos, lp[0], lp[1], lp[2]);
    gl.uniform1f(u.uLamp, st.lamp || 0);
    gl.uniform1f(u.uLampR, st.lampR || 1);
    gl.uniformMatrix4fv(u.uModel, false, model);
    gl.uniformMatrix4fv(u.uProj, false, proj);
    const passes = P.T.card ? [1, 0] : [0];
    passes.forEach((edge) => {
      gl.uniform1f(u.uEdge, edge);
      P.meshes.forEach((m, i) => {
        const stub = i === 1;
        if (stub && (P.torn || (st.tear || 0) >= 1)) return;
        gl.uniform1f(u.uIsStub, stub ? 1 : 0);
        gl.uniform1f(u.uTear, stub ? (st.tear || 0) : 0);
        gl.bindVertexArray(m.vao);
        gl.drawElements(gl.TRIANGLES, m.count, gl.UNSIGNED_SHORT, 0);
      });
    });
  }

  function drawShadow(P, st, proj) {
    gl.useProgram(sp.p);
    gl.disable(gl.DEPTH_TEST); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const e = smooth(clamp(st.p));
    const ch = [P.F.ext[0] / 2 * st.sc, P.F.ext[1] / 2 * st.sc];
    const hs = [ch[0] + (P.half[0] * st.sc - ch[0]) * e, ch[1] + (P.half[1] * st.sc - ch[1]) * e];
    const rr = Math.min(Math.min(ch[0], ch[1]) * (1 - e) + 0.012 * st.sc * e, hs[0], hs[1]);
    const soft = (0.04 + 0.08 * st.lift + 0.04 * (1 - e)) * st.sc;
    // the shadow falls away from the light
    const L = st.L || LIGHT, n2 = Math.hypot(L[0], L[1]) || 1, off = (0.05 + 0.1 * st.lift) * st.sc * Math.min(1.6, n2 / Math.max(0.25, L[2]));
    gl.uniform3f(sp.u.uC, st.cx - L[0] / n2 * off, st.cy - L[1] / n2 * off, -0.25 * st.sc);
    gl.uniform2f(sp.u.uHS, hs[0], hs[1]);
    gl.uniform1f(sp.u.uR, rr); gl.uniform1f(sp.u.uSoft, soft); gl.uniform1f(sp.u.uA, (0.62 - 0.2 * st.lift) * (st.alpha ?? 1));
    gl.uniformMatrix4fv(sp.u.uProj, false, proj);
    gl.bindVertexArray(quad);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  // a scene: a list of papers (the envelope and its letter), the shadow of one of them and the particles
  function draw(items, shadow, parts, w = canvas.width, h = canvas.height) {
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const proj = M4.mul(M4.persp(FOV, w / h, 0.1, 100), M4.T(0, 0, -D));
    if (shadow && (shadow.st.alpha ?? 1) > 0.01) drawShadow(shadow.P, shadow.st, proj);
    gl.disable(gl.BLEND); gl.enable(gl.DEPTH_TEST);
    items.forEach((it) => drawPaper(it.P, it.st, proj));
    if (parts && parts.n) {
      const data = parts.buffer();
      gl.useProgram(qp.p);
      gl.disable(gl.DEPTH_TEST); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.uniformMatrix4fv(qp.u.uProj, false, proj);
      gl.uniform1f(qp.u.uPx, h / (2 * Math.tan(FOV / 2)));
      gl.bindVertexArray(pVao);
      gl.bindBuffer(gl.ARRAY_BUFFER, pBuf);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);
      gl.drawArrays(gl.POINTS, 0, data.length / 8);
    }
  }

  // the still image of a closed paper comes from its own framebuffer: it never touches the animation canvas.
  // opened = the paper after it was read, loosely crumpled (the state a remembered paper returns to)
  let snapFB = null;
  function snapshot(P, opened = false, format = 'image/png', size = 256) {
    const S = size;
    if (!snapFB || snapFB.S !== S) {
      const t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, S, S, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      const rb = gl.createRenderbuffer();
      gl.bindRenderbuffer(gl.RENDERBUFFER, rb);
      gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, S, S);
      const fb = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, rb);
      snapFB = { fb, S, c: makeCanvas(S, S) };
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, snapFB.fb);
    const ppu = S / (2 * D * Math.tan(FOV / 2));
    const pl = opened ? openAmount(P) : 0, sc = 0.9 * S / (extentAt(P, pl) * ppu);
    const { items } = compose(P, { p: pl, f: 0, tear: 0, burnOpen: 0 }, { cx: 0, cy: 0, sc, scLetter: sc, rot: poseAt(P, pl), lift: 0, vhU: 1 });
    draw(items, null, null, S, S);
    const px = new Uint8Array(S * S * 4);
    gl.readPixels(0, 0, S, S, gl.RGBA, gl.UNSIGNED_BYTE, px);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    const x = snapFB.c.getContext('2d');
    const id = x.createImageData(S, S);
    for (let j = 0; j < S; j++) {
      const src = (S - 1 - j) * S * 4, dst = j * S * 4;
      for (let i = 0; i < S * 4; i += 4) {
        const a = px[src + i + 3], k = a ? 255 / a : 0;
        id.data[dst + i] = Math.min(255, px[src + i] * k);
        id.data[dst + i + 1] = Math.min(255, px[src + i + 1] * k);
        id.data[dst + i + 2] = Math.min(255, px[src + i + 2] * k);
        id.data[dst + i + 3] = a;
      }
    }
    x.putImageData(id, 0, 0);
    return snapFB.c.toDataURL(format, 0.9);
  }

  return { gl, build, refreshPrint, release, draw, snapshot };
}
