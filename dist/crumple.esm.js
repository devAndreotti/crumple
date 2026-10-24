// .build/util.js
function se(e) {
  let n = Math.imul(e | 0, 2654435761) >>> 0 || 1;
  return () => (n ^= n << 13, n >>>= 0, n ^= n >>> 17, n ^= n << 5, n >>>= 0, n / 4294967296);
}
function Ce(e) {
  let n = (s, o) => {
    let i = Math.imul(s, 374761393) + Math.imul(o, 668265263) + Math.imul(e, 1442695041) | 0;
    return i = Math.imul(i ^ i >>> 13, 1274126177), ((i ^ i >>> 16) >>> 0) / 4294967296;
  }, t = (s, o) => {
    let i = Math.floor(s), a = Math.floor(o), l = s - i, f = o - a, u = l * l * (3 - 2 * l), p = f * f * (3 - 2 * f), d = n(i, a), y = n(i + 1, a), m = n(i, a + 1), w = n(i + 1, a + 1);
    return d + (y - d) * u + (m - d) * p + (d - y - m + w) * u * p;
  };
  return (s, o) => (t(s, o) * 0.5 + t(s * 2, o * 2) * 0.25 + t(s * 4, o * 4) * 0.125 + t(s * 8, o * 8) * 0.0625) / 0.9375;
}
var j = (e, n = 0, t = 1) => Math.min(t, Math.max(n, e)), ce = (e) => e * e * (3 - 2 * e), $e = (e, n, t) => e + (n - e) * t, Be = (e) => e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2, Ne = (e) => 1 - (1 - e) * (1 - e), Rt = (e) => 0.5 * ce(e) + 0.5 * Ne(e), me = (e) => e, Ut = (e) => 0.35 * ce(e) + 0.65 * (1 - Math.pow(1 - e, 3)), Ot = (e) => e * e * (1.6 - 0.6 * e), ze = (e) => 0.55 * e + 0.45 * ce(e), at = (e) => e.F.shape === 0 ? (n) => 1 - Math.pow(1 - n, 2.3) : Rt, it = (e) => e.F.shape === 0 ? (n) => 1 - Math.pow(1 - n, 2.2) : Be, Fe = {
  // base URL of the assets folder (textures); detected from the script URL when possible
  assets: /* @__PURE__ */ (() => {
    try {
      let e = document.currentScript && document.currentScript.src;
      if (e && /\/dist\/[^/]+$/.test(e)) return e.replace(/dist\/[^/]+$/, "assets/");
    } catch {
    }
    return "assets/";
  })(),
  // prefix for localStorage keys (sound preference, opening counts, burnt papers)
  storagePrefix: "crumple.",
  // load the paper fonts from Google Fonts on demand (set false if the page already ships them)
  googleFonts: !0
}, pe = {
  get(e, n) {
    try {
      let t = localStorage.getItem(Fe.storagePrefix + e);
      return t === null ? n : JSON.parse(t);
    } catch {
      return n;
    }
  },
  set(e, n) {
    try {
      localStorage.setItem(Fe.storagePrefix + e, JSON.stringify(n));
    } catch {
    }
  },
  remove(e) {
    try {
      localStorage.removeItem(Fe.storagePrefix + e);
    } catch {
    }
  }
}, ge = (e, n, t) => {
  let s = document.createElement("canvas");
  return s.width = e, s.height = n, t && s.getContext("2d", { willReadFrequently: !0 }), s;
}, ae = (e, n) => `rgba(${e[0]},${e[1]},${e[2]},${n})`;
function De(e, n, t) {
  try {
    (e || document).dispatchEvent(new CustomEvent("crumple:" + n, { bubbles: !0, detail: t }));
  } catch {
  }
}
function je() {
  try {
    return matchMedia("(prefers-reduced-motion: reduce)");
  } catch {
    return null;
  }
}
function Ue(e) {
  if (e === "full") return !1;
  if (e === "reduce" || e === "reduced") return !0;
  let n = je();
  return !!n && n.matches;
}
function te(e, n, t, s, o) {
  n.addEventListener(t, s, o), e.push(() => n.removeEventListener(t, s, o));
}
var pn = { "Special Elite": "Special+Elite", "Courier Prime": "Courier+Prime:wght@400;700", Caveat: "Caveat:wght@500", VT323: "VT323", "Libre Baskerville": "Libre+Baskerville:ital,wght@0,400;0,700;1,400" }, Tt = {};
function Nt(e) {
  return document.fonts ? Promise.all(e.map((n) => {
    if (!Tt[n]) {
      let t = pn[n], s = t ? "family=" + t.split(":")[0] : null, i = !t || !Fe.googleFonts || [...document.querySelectorAll("link[rel=stylesheet]")].some((a) => a.href.includes(s)) ? Promise.resolve() : new Promise((a) => {
        let l = document.createElement("link");
        l.rel = "stylesheet", l.href = "https://fonts.googleapis.com/css2?family=" + t + "&display=swap", l.onload = a, l.onerror = a, setTimeout(a, 4e3), document.head.appendChild(l);
      });
      Tt[n] = i.then(() => Promise.all(["", "bold ", "italic "].map((a) => document.fonts.load(`${a}40px "${n}"`).catch(() => null))));
    }
    return Tt[n];
  })) : Promise.resolve();
}
var xt = {};
function st(e) {
  return xt[e] || (xt[e] = new Promise((n) => {
    let t = new Image();
    t.crossOrigin = "anonymous", t.onload = () => t.decode ? t.decode().then(() => n(t), () => n(t)) : n(t), t.onerror = () => n(null), t.src = e;
  })), xt[e];
}
var Xe = (e) => st(Fe.assets + "textures/" + e + ".webp");

// .build/catalog.js
var Ie = {
  typed: { name: "Typewritten sheet", w: 0.84, h: 1.1, color: [0.945, 0.92, 0.865], shape: "ball", font: "Special Elite", size: 42, lineHeight: 62, x: 96, y: 190, ink: [31, 29, 28], typewriter: !0 },
  notebook: { name: "Notebook page", w: 0.84, h: 1.1, color: [0.955, 0.945, 0.905], shape: "flat", font: "Caveat", size: 56, lineHeight: 52, x: 150, y: 206, ink: [28, 45, 110], hand: !0 },
  form: { name: "Continuous form", w: 0.92, h: 1, color: [0.95, 0.95, 0.935], shape: "quarters", font: "VT323", size: 46, lineHeight: 64, x: 120, y: 172, ink: [44, 44, 58], typewriter: !0 },
  receipt: { name: "Thermal receipt", w: 0.42, h: 1.26, color: [0.975, 0.97, 0.955], shape: "roll", font: "VT323", size: 40, lineHeight: 46, x: 36, y: 110, ink: [64, 64, 80], typewriter: !0, fades: !0 },
  ticket: { name: "Theatre ticket", w: 1, h: 0.46, color: [0.93, 0.875, 0.76], shape: "half", font: "Special Elite", size: 38, lineHeight: 52, x: 70, y: 130, ink: [120, 28, 30], card: !0, stub: 0.27 },
  memo: { name: "Office memo", w: 0.84, h: 1.1, color: [0.965, 0.96, 0.94], shape: "ball", font: "Courier Prime", size: 33, lineHeight: 50, x: 100, y: 330, ink: [25, 25, 30], typewriter: !0 },
  newspaper: { name: "Newspaper clipping", w: 0.8, h: 1, color: [0.85, 0.84, 0.79], shape: "twist", font: "Libre Baskerville", size: 25, lineHeight: 38, x: 56, y: 330, ink: [28, 28, 28] },
  sticky: { name: "Sticky note", w: 0.5, h: 0.5, color: [0.985, 0.88, 0.38], shape: "half", font: "Caveat", size: 62, lineHeight: 70, x: 50, y: 150, ink: [30, 40, 100], hand: !0 },
  polaroid: { name: "Instant photo", w: 0.62, h: 0.74, color: [0.975, 0.972, 0.96], shape: "flat", font: "Caveat", size: 50, lineHeight: 54, x: 50, y: 640, ink: [30, 40, 100], hand: !0, card: !0, photo: !0 },
  envelope: { name: "Sealed envelope", w: 0.9, h: 0.96, body: 0.6, flap: 0.36, color: [0.93, 0.885, 0.79], shape: "envelope", font: "Caveat", size: 46, lineHeight: 50, x: 90, y: 600, ink: [30, 40, 100], hand: !0 }
}, zt = { ball: "Crumpled ball", flat: "Flattened crumple", quarters: "Folded in quarters", half: "Folded in half", thirds: "Folded in thirds (letter)", roll: "Rolled up", twist: "Twisted (candy wrapper)" }, Xt = { torn: "Torn", burnt: "Burnt", coffee: "Coffee stain", water: "Water stain", prints: "Dirty fingerprints", aged: "Aged", scribbled: "Scribbled", singed: "Singed", wine: "Wine stain", ink: "Ink blot", foxing: "Foxing", tape: "Tape", stamp: "Rubber stamp", faded: "Sun-faded" }, dn = ["corner", "edge", "center", "spots"], qt = {
  typed: `To whoever finds this:

I folded every thought I could not say out loud and left it here.

Read it slowly.

\u2014 A.`,
  notebook: `monday night

could not sleep again.
made a list of things to fix tomorrow.

do not read the rest.`,
  form: `# CONTINUOUS FORM \xB7 LOG
UNIT: 04
STATUS: AWAITING SIGNATURE

READING 01 ..... 0412
READING 02 ..... 0413
READING 03 ..... 0415
READING 04 ..... ERROR`,
  receipt: `# CORNER STORE
# OPEN ALL NIGHT
--------------------
MILK .......... 2.40
BREAD ......... 1.90
CANDLES (2) ... 3.00
BATTERIES ..... 4.50
--------------------
TOTAL ........ 11.80

REGISTER 02
# THANK YOU`,
  ticket: `# THE GRAND THEATRE
EVENING PERFORMANCE
ROW C \xB7 SEAT 12

admit one`,
  memo: `# INTERNAL MEMO
TO: [[research team]]
FROM: management
RE: the new project

Details of the project [[must not be shared]] before launch. Deliver the report by Friday.

Further tests continue next week.`,
  newspaper: `# FOG STAYS FOR A THIRD DAY
Residents woke yesterday to the same thick fog that has covered the harbor since Monday. Ferries kept to their schedule, guided only by the lighthouse.

The weather office expects clear skies by the weekend. Until then, the old foghorn will keep sounding every few minutes, day and night.`,
  sticky: `do not forget
to water
the plants

\u2014 me`,
  polaroid: "summer, last day",
  envelope: `Dear friend,

I kept this letter in a drawer for a whole year before sending it.

Read it, then let it go.

\u2014 yours`
}, hn = `A. Reader
12 Paper Lane
Foldtown`, St = ["never", "again", "always", "not yet", "once more", "still"], lt = (e, n) => Object.prototype.hasOwnProperty.call(e, n);
function Ke(e = {}) {
  let n = lt(Ie, e.type) ? e.type : "typed", t = Ie[n];
  return {
    id: e.id || n,
    type: n,
    shape: n === "envelope" ? "envelope" : lt(zt, e.shape) ? e.shape : t.shape,
    states: (Array.isArray(e.states) ? e.states : []).filter((s) => lt(Xt, s)),
    text: typeof e.text == "string" ? e.text : qt[n],
    back: typeof e.back == "string" ? e.back : "",
    seed: Number.isFinite(e.seed) ? Math.trunc(e.seed) : 7,
    // 0 is a valid seed (rng starts from 1 either way)
    open: e.open === "drag" ? "drag" : "auto",
    hiddenInk: typeof e.hiddenInk == "string" ? e.hiddenInk : "",
    burnAfterReading: !!e.burnAfterReading,
    burn: dn.includes(e.burn) ? e.burn : "corner",
    image: e.image || "",
    address: typeof e.address == "string" ? e.address : hn,
    letter: lt(Ie, e.letter) && e.letter !== "envelope" ? e.letter : "typed",
    // the word of the 'stamp' state (drawn in capitals)
    stamp: typeof e.stamp == "string" && e.stamp.trim() ? e.stamp.trim() : "RECEIVED"
  };
}

// .build/fields.js
function ut(e, n, t) {
  let s = se(e.seed), o = () => s() < 0.5 ? -1 : 1, i = e.w / 2, a = e.h / 2, l = new Float32Array(n * t), f = n / e.w, u = t / e.h, p = (h, M, T, r, R, L) => {
    L === void 0 && (L = s() * Math.PI), r === void 0 && (r = (s() * 2 - 1) * i, R = (s() * 2 - 1) * a);
    let U = Math.cos(L), C = Math.sin(L), G = Math.abs(U) * h + M, oe = Math.abs(C) * h + M, re = Math.max(0, Math.floor((r - G + i) * f)), k = Math.min(n - 1, Math.ceil((r + G + i) * f)), _ = Math.max(0, Math.floor((R - oe + a) * u)), z = Math.min(t - 1, Math.ceil((R + oe + a) * u)), J = Math.min(0.08, h);
    for (let Z = _; Z <= z; Z++) {
      let ve = (Z + 0.5) / u - a - R;
      for (let we = re; we <= k; we++) {
        let Ee = (we + 0.5) / f - i - r, H = Math.abs(-Ee * C + ve * U);
        if (H >= M) continue;
        let Se = Math.abs(Ee * U + ve * C);
        Se >= h || (l[Z * n + we] += T * (1 - H / M) * Math.min(1, (h - Se) / J));
      }
    }
  }, d = e.shape === "quarters" || e.shape === "half" || e.shape === "thirds", y = d ? 0.18 : e.shape === "roll" ? 0.45 : e.shape === "twist" ? 0.55 : 1, m = d ? 0.35 : e.shape === "roll" || e.shape === "twist" ? 0.6 : 1;
  e.card && (y *= 0.5, m *= 0.5), e.shape === "envelope" && (y = 0.08, m = 0.25);
  let w = e.w * e.h / (0.84 * 1.1);
  for (let h = 0; h < Math.round(8 * y * w); h++) p(2, 0.08 + s() * 0.1, o() * (0.8 + s() * 0.4) * m);
  for (let h = 0; h < Math.round(46 * y * w); h++) p(0.1 + s() * 0.28, 0.035 + s() * 0.05, o() * (0.45 + s() * 0.4) * m);
  for (let h = 0; h < Math.round(150 * y * w); h++) p(0.03 + s() * 0.1, 0.01 + s() * 0.025, o() * (0.2 + s() * 0.35) * m);
  if (e.shape === "twist")
    for (let h of [-1, 1]) for (let M = 0; M < 26; M++) p(0.12 + s() * 0.3, 0.012 + s() * 0.02, o() * (0.5 + s() * 0.5), h * i * (0.6 + s() * 0.36), (s() * 2 - 1) * a, Math.PI / 2 + h * (0.5 + s() * 0.35));
  (e.shape === "half" || e.shape === "quarters") && p(2, 0.022, 0.6, 0, 0, Math.PI / 2), e.shape === "quarters" && p(2, 0.022, -0.55, 0, 0, 0), e.shape === "thirds" && (p(2, 0.02, 0.55, 0, -e.h / 6 * 1.08, 0), p(2, 0.02, -0.55, 0, e.h / 6, 0)), e.shape === "envelope" && p(2, 0.02, 0.5, 0, e.foldY, 0);
  let g = 1e-6;
  for (let h = 0; h < l.length; h++) Math.abs(l[h]) > g && (g = Math.abs(l[h]));
  for (let h = 0; h < l.length; h++) l[h] /= g;
  return l;
}
function ct(e, n, t) {
  let s = Ce(e.seed * 7 + 11), o = se(e.seed * 5 + 3), i = Math.hypot(n, t), a = new Float32Array(n * t), l = (u) => {
    for (let p = 0; p < t; p++) for (let d = 0; d < n; d++) a[p * n + d] = u(d, p);
  }, f = e.form || "corner";
  if (f === "edge") {
    let u = Math.floor(o() * 3);
    l((p, d) => (u === 0 ? t - d : u === 1 ? p : n - p) / (i * 1.6) + (s(p * 0.05, d * 0.05) - 0.5) * 0.35);
  } else if (f === "center") {
    let u = n * (0.3 + 0.4 * o()), p = t * (0.3 + 0.4 * o());
    l((d, y) => Math.hypot(d - u, y - p) / (i * 0.7) + (s(d * 0.04, y * 0.04) - 0.5) * 0.3);
  } else if (f === "spots") {
    let u = 3 + Math.floor(o() * 4), p = [];
    for (let d = 0; d < 200 && p.length < u; d++) {
      let y = n * (0.12 + 0.76 * o()), m = t * (0.12 + 0.76 * o());
      p.every((w) => Math.hypot(w[0] - y, w[1] - m) > i * 0.2) && p.push([y, m]);
    }
    l((d, y) => {
      let m = 1 / 0;
      return p.forEach((w) => {
        m = Math.min(m, Math.hypot(d - w[0], y - w[1]));
      }), m / (i * 0.5) + (s(d * 0.05, y * 0.05) - 0.5) * 0.1;
    });
  } else if (f === "singed")
    l((u, p) => Math.min(u, n - 1 - u, p, t - 1 - p) / (i * 0.5) + (s(u * 0.03, p * 0.03) - 0.5) * 0.12);
  else {
    let u = e.seed % 4, p = u & 1 ? n : 0, d = u & 2 ? t : 0;
    l((y, m) => Math.sqrt((y - p) * (y - p) + (m - d) * (m - d)) / i + (s(y * 0.02, m * 0.02) - 0.5) * 0.32);
  }
  return a;
}

// .build/worker.js
var ft = /* @__PURE__ */ (() => {
  let e, n = 0, t = /* @__PURE__ */ new Map();
  function s() {
    try {
      let i = [se, Ce, ut, ct].map((a) => a.toString()).join(`
`) + `
onmessage = (e) => { const { id, name, args } = e.data; const r = name === 'creases' ? ${ut.name}(...args) : ${ct.name}(...args); postMessage({ id, r }, [r.buffer]); };`;
      e = new Worker(URL.createObjectURL(new Blob([i], { type: "text/javascript" }))), e.onmessage = (a) => {
        let l = t.get(a.data.id);
        t.delete(a.data.id), l && (clearTimeout(l.t), l(a.data.r));
      }, e.onerror = () => {
        let a = [...t.values()];
        t.clear(), e = null, a.forEach((l) => {
          clearTimeout(l.t), l.redo();
        });
      };
    } catch {
      e = null;
    }
  }
  let o = (i, a) => i === "creases" ? ut(...a) : ct(...a);
  return {
    run(i, a) {
      if (e === void 0 && s(), !e) return Promise.resolve(o(i, a));
      let l = ++n, f = new Promise((p) => {
        let d = (y) => p(y);
        d.redo = () => p(o(i, a)), t.set(l, d);
      });
      e.postMessage({ id: l, name: i, args: a });
      let u = t.get(l);
      return u.t = setTimeout(() => {
        t.delete(l) && u.redo();
      }, 2e4), f;
    }
  };
})();

// .build/print.js
var pt = 1070;
function mn(e) {
  return e.split(`
`).map((n) => {
    let t = !1;
    n.startsWith("# ") && (t = !0, n = n.slice(2));
    let s = [], o = /~~(.+?)~~(?:\{(.+?)\})?|\[\[(.+?)\]\]|(\S+)/g, i;
    for (; i = o.exec(n); )
      i[1] !== void 0 ? s.push({ t: i[1], kind: "strike", fix: i[2] || "" }) : i[3] !== void 0 ? s.push({ t: i[3], kind: "redact" }) : s.push({ t: i[4], kind: "w" });
    return { head: t, toks: s };
  });
}
var gn = (e, n, t) => `${n && !e.hand ? "bold " : ""}${Math.round(t)}px "${e.font}", "Courier Prime", monospace`, bn = (e) => [e[0] + (200 - e[0]) * 0.4 + 8, e[1] + (170 - e[1]) * 0.3 + 4, e[2] + (120 - e[2]) * 0.3 - 4].map(Math.round);
function yn(e, n, t, s, o, i, a) {
  let l = mn(s), f = n.states.includes("faded") ? bn(t.ink) : t.ink;
  if (n.states.includes("scribbled") && !l.some((h) => h.toks.some((M) => M.kind === "strike"))) {
    let h = [];
    l.forEach((M) => M.toks.forEach((T) => {
      T.kind === "w" && T.t.replace(/\W/g, "").length >= 4 && h.push(T);
    }));
    for (let M = 0; M < 2 && h.length; M++) {
      let T = h.splice(Math.floor(a() * h.length), 1)[0];
      T.kind = "strike", T.fix = St[Math.floor(a() * St.length)];
    }
  }
  let u = j(1 - i * 0.34), p = o.cols || 1, d = (o.w - (p - 1) * 40) / p, y = 0, m = o.y, w = o.y + o.h, g = Ce(n.seed + 5);
  return l.forEach((h) => {
    let M = h.head ? t.size * (o.headK || 1.35) : t.size, T = h.head ? t.lineHeight * (o.headK || 1.35) : t.lineHeight;
    e.font = gn(t, h.head, M);
    let r = e.measureText(" ").width, R = h.head && o.headFull ? o.w : d, L = [[]], U = 0;
    if (h.toks.forEach((C) => {
      let G = e.measureText(C.t).width;
      U > 0 && U + r + G > R && (L.push([]), U = 0), L[L.length - 1].push({ ...C, tw: G }), U += (U > 0 ? r : 0) + G;
    }), !h.toks.length) {
      m += T * 0.7;
      return;
    }
    L.forEach((C) => {
      m > w && y < p - 1 && !(h.head && o.headFull) && (y++, m = o.colY || o.y);
      let G = C.reduce((k, _) => k + _.tw, 0) + r * (C.length - 1), oe = o.x + (h.head && o.headFull ? 0 : y * (d + 40)), re = o.center || h.head && o.centerHead ? oe + (R - G) / 2 : oe;
      C.forEach((k) => {
        vn(e, t, k, re, m, f, a, g), k.kind === "strike" && wn(e, k, re, m, M, a), k.kind === "redact" && (e.fillStyle = `rgba(12,12,14,${u})`, e.fillRect(re - 5, m - M * 0.82, k.tw + 10, M * 1.06)), re += k.tw + r;
      }), m += T;
    }), h.head && o.headFull && (o.colY = m + 10);
  }), m;
}
function vn(e, n, t, s, o, i, a, l) {
  if (n.hand) {
    e.save(), e.translate(s, o + (a() - 0.5) * 3), e.rotate((a() - 0.5) * 0.04), e.fillStyle = ae(i, 0.9), e.fillText(t.t, 0, 0), e.restore();
    return;
  }
  if (n.typewriter) {
    let f = s;
    for (let u of t.t) {
      let p = 0.72 + a() * 0.28;
      n.fades && (p *= 0.35 + 0.65 * l(f * 6e-3, o * 4e-3)), e.fillStyle = ae(i, p), e.fillText(u, f, o + (a() - 0.5) * 2), f += e.measureText(u).width;
    }
    return;
  }
  e.fillStyle = ae(i, 0.92), e.fillText(t.t, s, o);
}
function wn(e, n, t, s, o, i) {
  e.save(), e.strokeStyle = "rgba(165,28,30,0.85)", e.lineWidth = Math.max(2.5, o * 0.08), e.lineCap = "round";
  for (let a = 0; a < 2; a++) {
    e.beginPath();
    let l = s - o * (0.3 + 0.08 * a);
    e.moveTo(t - 4, l + (i() - 0.5) * 4), e.quadraticCurveTo(t + n.tw / 2, l + (i() - 0.5) * 8, t + n.tw + 4, l + (i() - 0.5) * 4), e.stroke();
  }
  n.fix && (e.fillStyle = "rgba(165,28,30,0.9)", e.font = `${Math.round(o * 0.62)}px "Caveat", cursive`, e.translate(t + n.tw * 0.25, s - o * 0.66), e.rotate(-0.06), e.fillText(n.fix, 0, 0)), e.restore();
}
function Ht(e, n, t, s, o, i, a = 6) {
  let l = Math.ceil(o / a), f = Math.ceil(i / a), u = ge(l, f, !0), p = u.getContext("2d"), d = Math.max(l / n.width, f / n.height);
  p.drawImage(n, (l - n.width * d) / 2, (f - n.height * d) / 2, n.width * d, n.height * d);
  let y = p.getImageData(0, 0, l, f).data;
  e.fillStyle = "rgba(20,20,20,0.88)";
  for (let m = 0; m < f; m++) for (let w = 0; w < l; w++) {
    let g = (m * l + w) * 4, h = (y[g] * 0.3 + y[g + 1] * 0.59 + y[g + 2] * 0.11) / 255, M = a * 0.56 * Math.sqrt(1 - h);
    M > 0.35 && (e.beginPath(), e.arc(t + (w + 0.5) * a, s + (m + 0.5) * a, M, 0, Math.PI * 2), e.fill());
  }
}
function En(e, n, t) {
  let s = [], o = "";
  return n.split(" ").forEach((i) => {
    let a = o ? o + " " + i : i;
    e.measureText(a).width > t && o ? (s.push(o), o = i) : o = a;
  }), o && s.push(o), s;
}
var Gt = {
  notebook(e, n, t) {
    e.strokeStyle = "rgba(95,135,205,0.5)", e.lineWidth = 2;
    for (let s = 206; s < t - 30; s += 52)
      e.beginPath(), e.moveTo(20, s), e.lineTo(n - 10, s), e.stroke();
    e.strokeStyle = "rgba(205,70,70,0.55)", e.lineWidth = 2.5, e.beginPath(), e.moveTo(126, 0), e.lineTo(126, t), e.stroke();
  },
  form(e, n, t) {
    for (let s = 0, o = 128; o < t; s++, o += 64) s % 2 === 0 && (e.fillStyle = "rgba(120,190,135,0.22)", e.fillRect(74, o, n - 148, 64));
    e.strokeStyle = "rgba(0,0,0,0.22)", e.setLineDash([6, 6]), e.lineWidth = 1.5, [66, n - 66].forEach((s) => {
      e.beginPath(), e.moveTo(s, 0), e.lineTo(s, t), e.stroke();
    }), e.setLineDash([]);
  },
  ticket(e, n, t, s) {
    let o = n * (1 - s.stub);
    e.strokeStyle = ae(s.ink, 0.7), e.lineWidth = 3, e.strokeRect(22, 22, n - 44, t - 44), e.lineWidth = 1.2, e.strokeRect(32, 32, n - 64, t - 64), e.setLineDash([3, 7]), e.lineWidth = 3, e.strokeStyle = ae(s.ink, 0.55), e.beginPath(), e.moveTo(o, 22), e.lineTo(o, t - 22), e.stroke(), e.setLineDash([]), e.save(), e.translate(o + (n - o) / 2, t / 2), e.rotate(-Math.PI / 2), e.fillStyle = ae(s.ink, 0.85), e.textAlign = "center", e.font = `bold 26px "${s.font}"`, e.fillText("No. 0042", 0, -46), e.font = `40px "${s.font}"`, e.fillText("C \xB7 12", 0, 2), e.font = `22px "${s.font}"`, e.fillText("ROW \xB7 SEAT", 0, 36), e.font = `italic 17px "${s.font}"`, e.fillText("non-refundable", 0, 64), e.restore();
  },
  memo(e, n) {
    e.fillStyle = "rgba(22,22,26,0.92)", e.beginPath(), e.arc(130, 120, 34, 0, Math.PI * 2), e.fill(), e.fillStyle = "rgba(245,244,240,1)", e.beginPath(), e.moveTo(130, 96), e.lineTo(154, 136), e.lineTo(106, 136), e.closePath(), e.fill(), e.fillStyle = "rgba(22,22,26,0.92)", e.font = 'bold 54px "Courier Prime"', e.fillText("MEMORANDUM", 184, 128), e.font = '22px "Courier Prime"', e.fillText("Research division \xB7 internal use", 186, 160), e.fillRect(96, 196, n - 192, 3), e.save(), e.translate(n - 250, 270), e.rotate(-0.12), e.strokeStyle = "rgba(175,30,30,0.7)", e.lineWidth = 4, e.strokeRect(-12, -44, 268, 60), e.fillStyle = "rgba(175,30,30,0.7)", e.font = 'bold 36px "Courier Prime"', e.fillText("CONFIDENTIAL", 0, 0), e.restore();
  },
  newspaper(e, n, t, s, o, i) {
    e.fillStyle = "rgba(25,25,25,0.9)", e.font = 'bold 50px "Libre Baskerville"', e.textAlign = "center", e.fillText("THE FOLDTOWN HERALD", n / 2, 92), e.font = 'italic 20px "Libre Baskerville"', e.fillText("evening edition \xB7 friday", n / 2, 126), e.textAlign = "left", e.fillRect(40, 140, n - 80, 3), e.fillRect(40, 147, n - 80, 1), e.fillRect(n / 2 - 1, 330, 1, t - 380);
    let a = n / 2 + 20, l = 336, f = n / 2 - 60, u = 230;
    if (e.fillStyle = "rgba(40,40,40,0.12)", e.fillRect(a, l, f, u), i.photo) Ht(e, i.photo, a, l, f, u);
    else
      for (let p = l + 4; p < l + u; p += 7) for (let d = a + 4; d < a + f; d += 7) {
        let y = 0.5 + 0.5 * Math.sin(d * 0.02) * Math.cos(p * 0.025);
        e.fillStyle = `rgba(20,20,20,${0.55 * y})`, e.beginPath(), e.arc(d, p, 1.2 + 2 * y, 0, Math.PI * 2), e.fill();
      }
    e.fillStyle = "rgba(25,25,25,0.85)", e.font = 'italic 17px "Libre Baskerville"', e.fillText("The harbor at dusk, yesterday.", a, l + u + 24);
  },
  sticky(e, n) {
    let t = e.createLinearGradient(0, 0, 0, 70);
    t.addColorStop(0, "rgba(170,130,20,0.18)"), t.addColorStop(1, "rgba(170,130,20,0)"), e.fillStyle = t, e.fillRect(0, 0, n, 70);
  },
  polaroid(e, n, t, s, o, i) {
    let a = Math.round(n * 0.065), l = n - 2 * a;
    if (e.fillStyle = "#1a1714", e.fillRect(a, a, l, l), i.img) {
      let f = i.img.width, u = i.img.height, p = Math.max(l / f, l / u);
      e.save(), e.beginPath(), e.rect(a, a, l, l), e.clip(), e.filter = "saturate(0.8) contrast(0.92) brightness(1.05)", e.drawImage(i.img, a + (l - f * p) / 2, a + (l - u * p) / 2, f * p, u * p), e.filter = "none", e.fillStyle = "rgba(255,200,140,0.10)", e.fillRect(a, a, l, l);
      let d = e.createRadialGradient(a + l / 2, a + l / 2, l * 0.25, a + l / 2, a + l / 2, l * 0.75);
      d.addColorStop(0, "rgba(0,0,0,0)"), d.addColorStop(1, "rgba(0,0,0,0.45)"), e.fillStyle = d, e.fillRect(a, a, l, l), e.restore();
    }
    e.strokeStyle = "rgba(0,0,0,0.25)", e.lineWidth = 2, e.strokeRect(a, a, l, l);
  },
  envelope(e, n, t, s) {
    let o = Math.round(s.flap / s.h * t), i = o + (t - o) * 0.48;
    e.strokeStyle = "rgba(110,85,50,0.35)", e.lineWidth = 2.2, e.beginPath(), e.moveTo(0, t), e.lineTo(n / 2, i), e.lineTo(n, t), e.stroke(), e.beginPath(), e.moveTo(0, o), e.lineTo(n * 0.42, i - 8), e.moveTo(n, o), e.lineTo(n * 0.58, i - 8), e.stroke(), e.save(), e.beginPath(), e.moveTo(0, o), e.lineTo(n / 2, 6), e.lineTo(n, o), e.closePath(), e.clip(), e.strokeStyle = "rgba(70,85,120,0.22)", e.lineWidth = 3;
    for (let a = -t; a < n + t; a += 14)
      e.beginPath(), e.moveTo(a, 0), e.lineTo(a + o, o), e.stroke();
    e.restore();
  }
};
function Mn(e, n, t, s, o, i) {
  let a = Math.round(s.flap / s.h * t);
  e.save(), e.translate(n / 2, a * 0.36), e.fillStyle = "rgba(140,20,24,0.95)", e.beginPath();
  for (let u = 0; u <= Math.PI * 2 + 0.01; u += 0.2) {
    let p = 46 * (1 + 0.06 * Math.sin(u * 7 + i() * 0.3));
    u ? e.lineTo(Math.cos(u) * p, Math.sin(u) * p) : e.moveTo(p, 0);
  }
  e.fill(), e.strokeStyle = "rgba(90,10,14,0.8)", e.lineWidth = 3, e.beginPath(), e.arc(0, 0, 30, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(80,8,12,0.9)", e.font = 'bold 30px "Special Elite"', e.textAlign = "center", e.fillText("A", 0, 11), e.restore();
  let l = n - 180, f = a + 40;
  e.fillStyle = "rgba(70,105,140,0.85)", e.fillRect(l, f, 120, 140), e.strokeStyle = "rgba(255,255,255,0.8)", e.setLineDash([4, 4]), e.lineWidth = 3, e.strokeRect(l + 6, f + 6, 108, 128), e.setLineDash([]), e.fillStyle = "rgba(255,255,255,0.9)", e.font = 'bold 44px "Special Elite"', e.textAlign = "center", e.fillText("25", l + 60, f + 88), e.strokeStyle = "rgba(40,40,60,0.55)", e.lineWidth = 3, e.beginPath(), e.arc(l - 30, f + 90, 58, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(40,40,60,0.6)", e.font = '20px "Courier Prime"', e.fillText("POST", l - 30, f + 98);
  for (let u = 0; u < 4; u++)
    e.beginPath(), e.moveTo(l - 120, f + 60 + u * 18), e.bezierCurveTo(l - 60, f + 50 + u * 18, l, f + 70 + u * 18, l + 60, f + 60 + u * 18), e.stroke();
  e.textAlign = "left", e.font = '52px "Caveat"', e.fillStyle = ae(s.ink, 0.9), o.address.split(`
`).forEach((u, p) => e.fillText(u, 150, a + 330 + p * 62));
}
var Tn = [
  ["FOR RENT", "quiet room near the park, morning light. Ask at the front desk."],
  ["FOR SALE", "vintage typewriter, works fine, missing the letter Q."],
  ["WANTED", "night watchman for the old warehouse on the pier."],
  ["FOUND", "small brass key with a red tag. Claim at the bakery."],
  ["LOST", "grey cat, answers to Pixel. Reward offered."],
  ["REPAIRS", "radios and record players, evenings only."],
  ["SWAP", "bicycle bell for anything that does not squeak."]
];
function xn(e, n, t, s) {
  let a = (n - 88 - 26) / 2;
  e.fillStyle = "rgba(25,25,25,0.9)", e.font = 'bold 34px "Libre Baskerville"', e.fillText("CLASSIFIEDS", 44, 92), e.fillRect(40, 108, n - 88 + 8, 3);
  let l = 44 + a + 26, f = 132, u = Math.round(a * 0.68);
  s.photo && Ht(e, s.photo, l, f, a, u), e.font = 'italic 16px "Libre Baskerville"', e.fillText("Old town, archive photo.", l, f + u + 22);
  let p = t - 60, d = [150, f + u + 60], y = 0, m = 44, w = d[0];
  for (let [g, h] of Tn) {
    e.font = '18px "Libre Baskerville"';
    let M = En(e, g + " " + h, a);
    if (w + M.length * 24 > p && (y === 1 || (y = 1, m = l, w = d[1], w + M.length * 24 > p)))
      break;
    M.forEach((T, r) => {
      if (r === 0) {
        e.font = 'bold 19px "Libre Baskerville"', e.fillText(g, m, w);
        let R = e.measureText(g + " ").width;
        e.font = '18px "Libre Baskerville"', e.fillText(T.slice(g.length + 1), m + R, w);
      } else
        e.font = '18px "Libre Baskerville"', e.fillText(T, m, w);
      w += 24;
    }), w += 16;
  }
}
var Rn = {
  typed: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 80 }),
  notebook: (e, n, t) => ({ x: t.x, y: t.y - 10, w: e - t.x - 50, h: n - t.y - 40 }),
  form: (e, n, t) => ({ x: t.x, y: t.y + 2, w: e - t.x * 2, h: n - t.y - 40 }),
  receipt: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 40, centerHead: !0 }),
  ticket: (e, n, t) => ({ x: 60, y: 120, w: e * (1 - t.stub) - 120, h: n - 160, center: !0, headK: 1.25 }),
  memo: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 60, headK: 1.15 }),
  newspaper: (e, n, t) => ({ x: t.x, y: 230, w: e - t.x * 2, h: n - 300, cols: 2, headFull: !0, centerHead: !0, headK: 2, colY: 330 }),
  sticky: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 30 }),
  polaroid: (e, n) => ({ x: 40, y: Math.round(e * 0.935 + (n - e * 0.935) * 0.55), w: e - 80, h: 120, center: !0 }),
  envelope: () => null
};
async function Je(e, n, t, s) {
  let o = Math.round(n.w * pt), i = Math.round(n.h * pt), a = ge(o, i), l = a.getContext("2d"), f = t === "front", u = se(e.seed * 31 + (f ? 5 : 9)), p = {};
  n.photo && f && (p.img = await st(e.image || Fe.assets + "photos/sunset.webp")), e.type === "newspaper" && (f || !e.back) && (p.photo = await st(Fe.assets + "photos/" + (f ? "sea" : "city") + ".webp"));
  let d = e.type === "notebook" || e.type === "form";
  Gt[e.type] && (f || d) && Gt[e.type](l, o, i, n, e, p), e.type === "envelope" && !f && Mn(l, o, i, n, e, u), e.type === "newspaper" && !f && !e.back && xn(l, o, i, p);
  let y = e.type === "envelope" ? "" : f ? e.text : e.back, m = f ? Rn[e.type](o, i, n) : { x: Math.round(n.x * 0.8), y: Math.min(n.y, Math.round(i * 0.28)), w: o - Math.round(n.x * 1.6), h: i - Math.min(n.y, Math.round(i * 0.28)) - 40, center: e.type === "ticket" };
  e.type === "ticket" && !f && (m.x = Math.round(o * 0.55), m.w = Math.round(o * 0.4)), e.type === "polaroid" && !f && (m = { x: 60, y: Math.round(i * 0.3), w: o - 120, h: i * 0.6, center: !0 });
  let w = y && m ? yn(l, e, n, y, m, s, u) : 0, g = se(e.seed * 17 + (f ? 1 : 2));
  return e.states.includes("coffee") && await Pn(a, l, o, i, e, f), e.states.includes("water") && await Sn(l, o, i, e, f), e.states.includes("prints") && await kn(l, o, i, e, f), e.states.includes("wine") && await Fn(a, l, o, i, e, f), e.states.includes("ink") && Ln(l, o, i, e, f), e.states.includes("aged") && An(l, o, i, g), e.states.includes("faded") && Cn(l, o, i, e), e.states.includes("foxing") && Bn(l, o, i, e), f && e.states.includes("stamp") && _n(l, o, i, e, w), f && e.states.includes("tape") && Dn(l, o, i, e), a;
}
function Pt(e, n, t, s, o, i, a, l) {
  e.save(), e.globalCompositeOperation = "multiply", e.globalAlpha = a, e.translate(t, s), l || e.scale(-1, 1), e.rotate(i), e.drawImage(n, -o / 2, -o / 2, o, o), e.restore();
}
async function Sn(e, n, t, s, o) {
  let i = await Xe("water");
  if (!i) return;
  let a = se(s.seed * 23 + 4), l = n * (0.25 + 0.5 * a()), f = t * (0.25 + 0.5 * a()), u = Math.min(n, t) * (0.8 + 0.35 * a()), p = a() * Math.PI * 2;
  Pt(e, i, o ? l : n - l, f, u, p, o ? 0.85 : 0.6, o);
}
async function kn(e, n, t, s, o) {
  let i = await Xe("prints");
  if (!i) return;
  let a = se(s.seed * 29 + 6);
  for (let l = 0; l < 2; l++) {
    let f = n * (l ? 0.86 - 0.08 * a() : 0.1 + 0.12 * a()), u = t * (0.72 + 0.2 * a()), p = Math.min(n, t) * (0.22 + 0.08 * a()), d = a() * Math.PI * 2;
    Pt(e, i, o ? f : n - f, u, p, d, o ? 0.6 : 0.4, o);
  }
}
async function Pn(e, n, t, s, o, i) {
  let a = se(o.seed * 17 + 1), l = t * (0.3 + 0.4 * a()), f = s * (0.35 + 0.35 * a()), u = Math.min(t, s) * (0.13 + 0.07 * a()), p = a() * Math.PI * 2, d = i ? l : t - l, y = await Xe("coffee");
  if (i) {
    let w = ge(t, s);
    w.getContext("2d").drawImage(e, 0, 0), n.save(), n.beginPath(), n.arc(d, f, u * 1.02, 0, Math.PI * 2), n.clip(), n.clearRect(d - u * 1.1, f - u * 1.1, u * 2.2, u * 2.2), n.filter = "blur(2.5px)", n.globalAlpha = 0.85, n.drawImage(w, 0, 0), n.restore();
  }
  if (y) {
    Pt(n, y, d, f, u * 3.4, p, i ? 0.95 : 0.55, i);
    return;
  }
  n.save();
  let m = n.createRadialGradient(d, f, u * 0.1, d, f, u);
  m.addColorStop(0, "rgba(140,95,45,0.10)"), m.addColorStop(0.82, "rgba(125,82,36,0.17)"), m.addColorStop(1, "rgba(110,70,30,0)"), n.fillStyle = m, n.beginPath(), n.arc(d, f, u, 0, Math.PI * 2), n.fill();
  for (let w = 0; w < 3; w++) {
    n.strokeStyle = `rgba(100,62,26,${0.2 + 0.12 * a()})`, n.lineWidth = u * (0.03 + 0.03 * a()), n.beginPath();
    let g = a() * 6.28, h = u * (0.9 + 0.05 * w);
    for (let M = 0; M <= Math.PI * 2 + 0.01; M += 0.05) {
      let T = h * (1 + 0.025 * Math.sin(M * 5 + g) + 0.015 * Math.sin(M * 11 + g * 2));
      M === 0 ? n.moveTo(d + Math.cos(M) * T, f + Math.sin(M) * T) : n.lineTo(d + Math.cos(M) * T, f + Math.sin(M) * T);
    }
    n.stroke();
  }
  for (let w = 0; w < 3; w++) {
    let g = d + (a() - 0.5) * u * 1.2, h = u * (0.6 + a() * 1.2), M = n.createLinearGradient(0, f + u * 0.6, 0, f + u * 0.6 + h);
    M.addColorStop(0, "rgba(115,75,32,0.16)"), M.addColorStop(1, "rgba(115,75,32,0)"), n.fillStyle = M, n.fillRect(g - 5, f + u * 0.6, 9 + a() * 6, h);
  }
  n.restore();
}
function An(e, n, t, s) {
  e.save(), e.fillStyle = "rgba(150,110,45,0.08)", e.fillRect(0, 0, n, t);
  let o = e.createRadialGradient(n / 2, t / 2, Math.min(n, t) * 0.3, n / 2, t / 2, Math.max(n, t) * 0.75);
  o.addColorStop(0, "rgba(120,80,30,0)"), o.addColorStop(1, "rgba(120,80,30,0.28)"), e.fillStyle = o, e.fillRect(0, 0, n, t);
  for (let i = 0; i < 34; i++) {
    let a = s() * n, l = s() * t, f = 3 + s() * 14, u = e.createRadialGradient(a, l, 0, a, l, f);
    u.addColorStop(0, `rgba(125,85,40,${0.12 + s() * 0.2})`), u.addColorStop(1, "rgba(125,85,40,0)"), e.fillStyle = u, e.beginPath(), e.arc(a, l, f, 0, Math.PI * 2), e.fill();
  }
  e.restore();
}
async function Fn(e, n, t, s, o, i) {
  let a = se(o.seed * 43 + 3), l = t * (0.3 + 0.4 * a()), f = s * (0.4 + 0.3 * a()), u = Math.min(t, s) * (0.1 + 0.04 * a()), p = i ? l : t - l, d = i ? 1 : 0.5;
  if (i) {
    let m = ge(t, s);
    m.getContext("2d").drawImage(e, 0, 0), n.save(), n.beginPath(), n.arc(p, f, u * 1.04, 0, Math.PI * 2), n.clip(), n.clearRect(p - u * 1.1, f - u * 1.1, u * 2.2, u * 2.2), n.filter = "blur(2px)", n.globalAlpha = 0.8, n.drawImage(m, 0, 0), n.restore();
  }
  n.save(), n.globalCompositeOperation = "multiply";
  let y = n.createRadialGradient(p, f, u * 0.2, p, f, u * 1.05);
  y.addColorStop(0, `rgba(120,14,38,${0.03 * d})`), y.addColorStop(0.8, `rgba(120,14,38,${0.1 * d})`), y.addColorStop(1, "rgba(90,8,28,0)"), n.fillStyle = y, n.beginPath(), n.arc(p, f, u * 1.05, 0, Math.PI * 2), n.fill(), n.lineCap = "round", n.filter = "blur(0.8px)";
  for (let m = 0; m < 2; m++) {
    let w = a() * 6.28, g = 3.4 + a() * 1.4, h = u * (0.94 + 0.12 * m + 0.03 * a()), M = a() * 6.28, T = (r, R) => {
      let L = (h - R) * (1 + 0.025 * Math.sin(r * 5 + M) + 0.012 * Math.sin(r * 9 + M * 2));
      return [p + Math.cos(r) * L, f + Math.sin(r) * L];
    };
    [[u * 0.22, 0.07, 0.04], [u * 0.07, 0.4, 0], [u * 0.03, 0.16, u * 0.06]].forEach(([r, R, L]) => {
      n.strokeStyle = `rgba(96,12,36,${R * d})`, n.lineWidth = r, n.beginPath();
      for (let U = 0, C = w; C <= w + g; U++, C += 0.04) {
        let G = T(C, L);
        U ? n.lineTo(G[0], G[1]) : n.moveTo(G[0], G[1]);
      }
      n.stroke();
    });
  }
  n.filter = "none";
  for (let m = 0, w = 4 + Math.floor(a() * 4); m < w; m++) {
    let g = a() * 6.28, h = u * (1.35 + a() * 1.1), M = u * (0.02 + 0.035 * a());
    n.fillStyle = `rgba(104,10,30,${0.45 * d})`, n.beginPath(), n.arc(p + Math.cos(g) * h, f + Math.sin(g) * h, M, 0, Math.PI * 2), n.fill(), m % 2 && (n.beginPath(), n.arc(p + Math.cos(g + 0.2) * h * 1.12, f + Math.sin(g + 0.2) * h * 1.12, M * 0.35, 0, Math.PI * 2), n.fill());
  }
  n.restore();
}
function In(e, n) {
  let t = [1, 2, 3, 5, 7, 11].map((o) => [o, e() * 6.28, (0.06 + 0.14 * e()) * 2 / o]), s = [];
  for (let o = 0; o < 40; o++) {
    let i = o / 40 * Math.PI * 2, a = 1;
    t.forEach(([l, f, u]) => {
      a += u * Math.sin(l * i + f);
    }), s.push([Math.cos(i) * n * a, Math.sin(i) * n * a]);
  }
  return s;
}
function kt(e, n, t, s, o) {
  e.beginPath(), n.forEach((i, a) => {
    a ? e.lineTo(t + i[0] * o, s + i[1] * o) : e.moveTo(t + i[0] * o, s + i[1] * o);
  }), e.closePath(), e.fill();
}
function Ln(e, n, t, s, o) {
  let i = se(s.seed * 47 + 5), a = Math.min(n, t), l = n * (0.2 + 0.6 * i()), f = t * (0.2 + 0.6 * i()), u = a * (0.03 + 0.015 * i()), p = o ? l : n - l, d = o ? 1 : 0.5, y = [16, 22, 58], m = In(i, u);
  e.save(), e.fillStyle = ae(y, 0.07 * d), kt(e, m, p, f, 1.45), kt(e, m, p, f, 1.22), e.fillStyle = ae(y, 0.86 * d), e.filter = "blur(0.5px)", kt(e, m, p, f, 1), e.filter = "none", e.fillStyle = ae(y, 0.86 * d);
  for (let R = 0, L = 6 + Math.floor(i() * 5); R < L; R++) {
    let U = i() * 6.28, C = u * (1.5 + 2.4 * i()), G = u * (0.16 + 0.14 * i()) * (1.6 - C / (u * 4));
    e.beginPath(), e.arc(p + Math.cos(U) * C, f + Math.sin(U) * C, Math.max(G, 0.8), 0, Math.PI * 2), e.fill();
  }
  let w = i() * 6.28, g = u * (1.6 + 1.2 * i()), h = Math.cos(w), M = Math.sin(w), T = [], r = [];
  for (let R = 0; R <= 10; R++) {
    let L = R / 10, U = u * 0.42 * Math.pow(1 - L, 1.3) * (0.85 + 0.3 * i()), C = u * 0.7 + g * L;
    T.push([h * C - M * U, M * C + h * U]), r.push([h * C + M * U, M * C - h * U]);
  }
  e.fillStyle = ae(y, 0.6 * d), e.beginPath(), T.concat(r.reverse()).forEach((R, L) => {
    L ? e.lineTo(p + R[0], f + R[1]) : e.moveTo(p + R[0], f + R[1]);
  }), e.closePath(), e.fill(), e.strokeStyle = ae(y, 0.28 * d), e.lineWidth = 0.9, e.lineCap = "round";
  for (let R = 0; R < 18; R++) {
    let L = i() * 6.28, U = u * (0.95 + 0.1 * i()), C = U + u * (0.3 + 0.9 * i());
    e.beginPath(), e.moveTo(p + Math.cos(L) * U, f + Math.sin(L) * U), e.lineTo(p + Math.cos(L + 0.05) * C, f + Math.sin(L + 0.05) * C), e.stroke();
  }
  e.restore();
}
function Cn(e, n, t, s) {
  let o = se(s.seed * 41 + 2), i = Ce(s.seed + 19), a = o() * Math.PI * 2, l = Math.cos(a), f = Math.sin(a), u = 96, p = Math.round(u * t / n), d = ge(u, p, !0), y = d.getContext("2d"), m = y.createImageData(u, p), w = m.data;
  for (let g = 0; g < p; g++) for (let h = 0; h < u; h++) {
    let M = j((h / u - 0.5) * l + (g / p - 0.5) * f + 0.5), T = Math.pow(M, 2.4) * (0.45 + 0.55 * i(h * 0.12, g * 0.12)), r = (g * u + h) * 4;
    w[r] = 165, w[r + 1] = 112, w[r + 2] = 45, w[r + 3] = Math.round(255 * 0.42 * T);
  }
  y.putImageData(m, 0, 0), e.save(), e.imageSmoothingQuality = "high", e.drawImage(d, 0, 0, n, t), e.restore();
}
function Bn(e, n, t, s) {
  let o = se(s.seed * 61 + 11), i = Math.min(n, t) / 900, a = [[150, 78, 30], [170, 96, 40], [128, 62, 24]];
  e.save(), e.globalCompositeOperation = "multiply";
  for (let l = 0, f = 0; l < 150 && f < 900; f++) {
    let u = o() * n, p = o() * t, d = Math.max(Math.abs(u / n - 0.5), Math.abs(p / t - 0.5)) * 2;
    if (o() > 0.15 + 0.85 * d * d * d) continue;
    l++;
    let y = o() < 0.4, m = i * (y ? 4 + Math.pow(o(), 1.5) * 15 : 1 + Math.pow(o(), 2) * 5), w = a[Math.floor(o() * 3)], g = 0.34 + 0.4 * o(), h = e.createRadialGradient(0, 0, m * (y ? 0 : 0.55), 0, 0, m);
    y ? (h.addColorStop(0, ae(w, g * 0.6)), h.addColorStop(0.55, ae(w, g * 0.4)), h.addColorStop(1, ae(w, 0))) : (h.addColorStop(0, ae(w, g * 0.7)), h.addColorStop(0.85, ae(w, g * 0.8)), h.addColorStop(0.97, ae(w, g * 1.15)), h.addColorStop(1, ae(w, 0))), e.save(), e.translate(u, p), e.rotate(o() * 3.14), e.scale(1, y ? 0.55 + 0.45 * o() : 1), e.fillStyle = h, e.beginPath(), e.arc(0, 0, m, 0, Math.PI * 2), e.fill(), e.restore();
  }
  e.restore();
}
function _n(e, n, t, s, o) {
  let i = se(s.seed * 59 + 9), a = Ce(s.seed + 23), l = String(s.stamp).toUpperCase(), f = i() < 0.6 ? [176, 26, 36] : [34, 64, 150], u = ge(1, 1).getContext("2d");
  u.font = 'bold 100px "Courier Prime", monospace', u.letterSpacing = "12px";
  let p = u.measureText(l).width / 100, d = n * 0.44, y = d / (p + 1.2), m = y * 2.1, w = -(0.14 + 0.17 * i()), g = n * (0.46 + 0.1 * i()), h = Math.min(t - m / 2 - 30, Math.max(t * 0.55, o + m / 2 + 24)), M = Math.ceil(Math.hypot(d, m) + y * 0.8), T = ge(M, M, !0), r = T.getContext("2d");
  r.translate(M / 2, M / 2), r.fillStyle = r.strokeStyle = ae(f, 1), r.textAlign = "center", r.textBaseline = "middle", r.font = `bold ${y}px "Courier Prime", monospace`, r.letterSpacing = y * 0.12 + "px", r.lineWidth = y * 0.13, r.strokeRect(-d / 2, -m / 2, d, m), r.globalAlpha = 0.5, r.lineWidth = y * 0.1, r.strokeRect(-d / 2 + y * 0.07, -m / 2 - y * 0.05, d, m), r.globalAlpha = 1, r.lineWidth = y * 0.05, r.strokeRect(-d / 2 + y * 0.3, -m / 2 + y * 0.3, d - y * 0.6, m - y * 0.6), r.fillText(l, -y * 0.06, y * 0.05);
  let R = r.getImageData(0, 0, M, M), L = R.data, U = M / 2;
  for (let C = 0; C < L.length; C += 4) {
    if (!L[C + 3]) continue;
    let G = C / 4, oe = G % M, re = Math.floor(G / M), k = (oe - U) / (d / 2), _ = (re - U) / (m / 2), z = 1 - 0.25 * Math.min(1, k * k + _ * _), J = j((a(oe / (y * 1.5), re / (y * 1.5)) - 0.25) * 3.2) * z * (i() < 0.94 ? 1 : 0.3);
    L[C + 3] = Math.round(L[C + 3] * J);
  }
  r.putImageData(R, 0, 0), e.save(), e.globalCompositeOperation = "multiply", e.globalAlpha = 0.9, e.translate(g, h), e.rotate(w), e.drawImage(T, -M / 2, -M / 2), e.restore();
}
function Dn(e, n, t, s) {
  let o = se(s.seed * 53 + 7), i = n * (0.24 + 0.04 * o()), a = n * 0.1;
  [[0.1, 0.05, 0.7], [0.9, 0.05, -0.7]].forEach(([l, f, u]) => {
    let p = n * (l + (o() - 0.5) * 0.03), d = t * (f + (o() - 0.5) * 0.02), y = u + (o() - 0.5) * 0.1;
    e.save(), e.translate(p, d), e.rotate(y);
    let m = [];
    for (let h = 0; h <= 6; h++) m.push([i / 2 - (h % 2 ? 0 : 2 + 4 * o()), -a / 2 + a * h / 6]);
    let w = () => {
      e.beginPath(), e.moveTo(-i / 2, -a / 2), m.forEach((h) => e.lineTo(h[0], h[1])), e.lineTo(-i / 2, a / 2), e.closePath();
    };
    w(), e.fillStyle = "rgba(226,176,96,0.48)", e.fill();
    let g = e.createLinearGradient(0, -a / 2, 0, a / 2);
    g.addColorStop(0, "rgba(255,248,230,0)"), g.addColorStop(0.3, "rgba(255,248,230,0.3)"), g.addColorStop(0.5, "rgba(255,248,230,0.06)"), g.addColorStop(1, "rgba(255,248,230,0)"), e.fillStyle = g, e.fill(), w(), e.strokeStyle = "rgba(140,92,36,0.5)", e.lineWidth = 2, e.stroke(), e.fillStyle = "rgba(140,92,36,0.16)", e.fillRect(-i / 2, -a / 2, i * 0.03, a);
    for (let h = 0, M = 6 + Math.floor(o() * 4); h < M; h++)
      e.fillStyle = `rgba(70,46,22,${0.3 + 0.3 * o()})`, e.beginPath(), e.arc((o() - 0.5) * i * 0.8, (o() - 0.5) * a * 0.7, 1 + 2 * o(), 0, Math.PI * 2), e.fill();
    e.restore();
  });
}
function Vt(e, n, t) {
  if (!e.hiddenInk) return null;
  let s = ge(n, t, !0), o = s.getContext("2d"), i = Math.round(n * 0.12);
  o.fillStyle = "#fff", o.textAlign = "center", o.filter = "blur(0.7px)", o.font = `${i}px "Caveat", cursive`, o.translate(n / 2, t * 0.7), o.rotate(-0.1), e.hiddenInk.split(`
`).forEach((f, u) => o.fillText(f, 0, u * i * 1.05));
  let a = o.getImageData(0, 0, n, t).data, l = new Float32Array(n * t);
  for (let f = 0; f < t; f++) for (let u = 0; u < n; u++) l[f * n + u] = a[((t - 1 - f) * n + u) * 4 + 3] / 255;
  return l;
}
function Yt(e, n, t, s, o) {
  let i = [e, n];
  for (let a = 0; a < s; a++) {
    let l = [i[0]];
    for (let f = 1; f < i.length; f++) {
      let u = i[f - 1], p = i[f], d = (u[0] + p[0]) / 2, y = (u[1] + p[1]) / 2, m = p[0] - u[0], w = p[1] - u[1], g = Math.hypot(m, w), h = (t() - 0.5) * g * o;
      l.push([d - w / g * h, y + m / g * h], p);
    }
    i = l;
  }
  return i;
}
async function At(e, n, t = null) {
  let s = Math.round(n.w * pt / 2), o = Math.round(n.h * pt / 2), i = ge(s, o, !0), a = i.getContext("2d");
  a.fillStyle = "#fff", a.fillRect(0, 0, s, o);
  let l = ge(s, o, !0), f = l.getContext("2d");
  f.fillStyle = "#000", f.fillRect(0, 0, s, o);
  let u = se(e.seed * 13 + 3);
  if (a.fillStyle = "#000", f.strokeStyle = "#fff", f.lineWidth = 2.2, f.filter = "blur(0.8px)", e.type === "form")
    for (let T = 22; T < o - 6; T += 24) [15, s - 15].forEach((r) => {
      a.beginPath(), a.arc(r, T, 5.5, 0, Math.PI * 2), a.fill();
    });
  if (e.type === "notebook") {
    let T = Yt([4, 0], [4, o], u, 7, 0.05);
    a.beginPath(), a.moveTo(0, 0), T.forEach((r) => a.lineTo(r[0] + u() * 2, r[1])), a.lineTo(0, o), a.closePath(), a.fill();
    for (let r = 18; r < o; r += 22)
      a.beginPath(), a.arc(2, r, 5 + u() * 1.5, 0, Math.PI * 2), a.fill();
    f.beginPath(), T.forEach((r, R) => R ? f.lineTo(r[0] + 1, r[1]) : f.moveTo(r[0] + 1, r[1])), f.stroke();
  }
  if (e.type === "envelope") {
    let T = n.flap / n.h * o;
    a.beginPath(), a.moveTo(-2, -2), a.lineTo(s / 2, -2), a.lineTo(s / 2, 3), a.lineTo(-2, T), a.closePath(), a.fill(), a.beginPath(), a.moveTo(s + 2, -2), a.lineTo(s / 2, -2), a.lineTo(s / 2, 3), a.lineTo(s + 2, T), a.closePath(), a.fill();
  }
  if (e.states.includes("torn")) {
    let T = Math.floor(u() * 3), r, R, L;
    T === 0 ? (r = [s * (0.5 + 0.25 * u()), -2], R = [s + 2, o * (0.2 + 0.25 * u())], L = [[s + 2, -2]]) : T === 1 ? (r = [-2, o * (0.72 + 0.12 * u())], R = [s + 2, o * (0.72 + 0.12 * u())], L = [[s + 2, o + 2], [-2, o + 2]]) : (r = [s * (0.3 + 0.25 * u()), o + 2], R = [-2, o * (0.55 + 0.2 * u())], L = [[-2, o + 2]]);
    let U = Yt(r, R, u, 8, 0.22);
    a.beginPath(), U.forEach((C, G) => G ? a.lineTo(C[0], C[1]) : a.moveTo(C[0], C[1])), L.forEach((C) => a.lineTo(C[0], C[1])), a.closePath(), a.fill(), f.lineWidth = 3.2, f.beginPath(), U.forEach((C, G) => G ? f.lineTo(C[0], C[1]) : f.moveTo(C[0], C[1])), f.stroke();
  }
  let p = a.getImageData(0, 0, s, o).data, d = f.getImageData(0, 0, s, o).data, y = t ? await ft.run("burn", [{ seed: e.seed, form: t === "singed" ? "singed" : e.burn }, s, o]) : null, m = a.createImageData(s, o), w = m.data, g = [], h = 1 / 0;
  for (let T = 0; T < o; T++) for (let r = 0; r < s; r++) {
    let R = (T * s + r) * 4;
    if (w[R] = p[R], w[R + 1] = 0, w[R + 2] = d[R], y) {
      let L = y[T * s + r];
      w[R + 3] = Math.round(j(L / 1.4) * 255), h = Math.min(h, L), t === "burn" && r % 3 === 0 && T % 3 === 0 && p[R] > 128 && g.push((r + 0.5) / s, 1 - (T + 0.5) / o, L);
    } else w[R + 3] = 255;
  }
  let M = ge(s, o);
  return M.getContext("2d").putImageData(m, 0, 0), { canvas: M, burnPts: t === "burn" ? new Float32Array(g) : null, lo: y ? Math.max(0, h) : 0 };
}

// .build/shaders.js
var $t = `#version 300 es
precision highp float;in vec2 aXY;uniform sampler2D uH;uniform int uShape;uniform float uP,uK0,uKres,uA0,uAres,uScale,uSeedA,uSquash,uRoll,uCurl,uTear,uStubX,uIsStub,uFoldSide,uFoldBw,uFoldY,uEdge,uThick;uniform vec2 uHalf;uniform mat4 uModel,uProj;out vec3 vPos;out vec3 vNrm;out vec2 vUv;out float vE;out float vAmp;float Hf(vec2 xy){return textureLod(uH,xy/(2.0*uHalf)+0.5,0.0).r;}vec3 rotY(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x+s*v.z,v.y,-s*v.x+c*v.z);}vec3 rotZ(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x-s*v.y,s*v.x+c*v.y,v.z);}vec3 bend(float d,float th,float bw){float t=max(abs(th),1e-4),R=bw/t,L=R*t;if(d<L){float a=d/R;return vec3(R*sin(a),R*(1.0-cos(a)),a);}return vec3(R*sin(t)+(d-L)*cos(t),R*(1.0-cos(t))+(d-L)*sin(t),t);}void foldX(inout vec3 p,inout vec3 n,float x0,float s,float th,float bw){float d=(p.x-x0)*s;if(d<=0.0||abs(th)<1e-4)return;vec3 c=bend(d,th,bw);float g=sign(th),ca=cos(c.z),sa=g*sin(c.z),z0=p.z;p.x=x0+s*(c.x-sa*z0);p.z=g*c.y+ca*z0;n=vec3(ca*n.x-s*sa*n.z,n.y,s*sa*n.x+ca*n.z);}void foldY(inout vec3 p,inout vec3 n,float y0,float s,float th,float bw){float d=(p.y-y0)*s;if(d<=0.0||abs(th)<1e-4)return;vec3 c=bend(d,th,bw);float g=sign(th),ca=cos(c.z),sa=g*sin(c.z),z0=p.z;p.y=y0+s*(c.x-sa*z0);p.z=g*c.y+ca*z0;n=vec3(n.x,ca*n.y-s*sa*n.z,s*sa*n.y+ca*n.z);}vec3 place(vec2 xy,out float e,out float amp){vec3 p=vec3(xy,0.0),n=vec3(0.0,0.0,1.0);if(uShape==0){float s=length(xy),sn=s/length(uHalf);float q=clamp(uP*1.5-sn*0.5+0.14*sn*sin(atan(xy.y,xy.x)*3.0+uSeedA),0.0,1.0);e=q*q*(3.0-2.0*q);float k=mix(uKres,uK0,(1.0-e)*(1.0-e));if(s>1e-6){float th=s*k,st=sin(th),ct=cos(th);vec2 dir=xy/s;n=vec3(st*dir,ct);p=vec3(st/k*dir,(ct-1.0)/k);}p.z*=mix(uSquash,1.0,e);p.xy*=mix(1.0+(1.0-uSquash)*0.3,1.0,e);amp=mix(uA0,uAres,pow(e,2.2));}else if(uShape==1){e=uP;float L=2.0*uHalf.x*e,s=xy.x+uHalf.x;if(s>L){float ph=(s-L)/uRoll;float r=uRoll*(1.0-0.07*ph/6.2831853);p=vec3(L-uHalf.x+r*sin(ph),xy.y,r*(1.0-cos(ph)));n=vec3(-sin(ph),0.0,cos(ph));}p.x+=(uHalf.x-uRoll)*(1.0-e);amp=mix(uA0,uAres,e);}else if(uShape==2){e=uP;float k=uK0*(1.0-e)*(1.0-e);if(k>1e-2){float a=(xy.y+uHalf.y)*k;float r=1.0/k-uRoll*a/6.2831853;vec2 ax=vec2(-uHalf.y,-1.0/k);p=vec3(xy.x,ax.x+r*sin(a),ax.y+r*cos(a));n=vec3(0.0,sin(a),cos(a));float g=pow(1.0-e,3.0);float axv=abs(xy.x)/uHalf.x;float neck=smoothstep(0.5,0.8,axv),fl=smoothstep(0.82,1.0,axv);float sc=mix(1.0,mix(1.0,0.17*(1.0+3.2*fl),neck),g);float tw=sign(xy.x)*(neck*3.4+fl*1.3)*g;float c=cos(tw),sn=sin(tw);vec2 rv=(p.yz-ax)*sc;p.yz=ax+vec2(c*rv.x-sn*rv.y,sn*rv.x+c*rv.y);n.yz=vec2(c*n.y-sn*n.z,sn*n.y+c*n.z);}p.y+=uHalf.y*(1.0-e);p.z+=(1.0/uK0)*(1.0-e);amp=mix(uA0,uAres,e);}else if(uShape==6){e=uP;foldY(p,n,uFoldY,1.0,mix(3.12,-1.1,smoothstep(0.0,1.0,e)),uFoldBw);p.y-=(uFoldY-uHalf.y)*0.5;amp=mix(uA0,uAres,e);}else{e=uP;float e2=smoothstep(0.0,0.5,e),e1=smoothstep(0.5,1.0,e);if(uShape==3){foldX(p,n,0.0,1.0,3.12*(1.0-e1),uFoldBw);foldY(p,n,0.0,1.0,3.12*(1.0-e2),uFoldBw*2.6);p.x+=uHalf.x*0.5*(1.0-e1);p.y+=uHalf.y*0.5*(1.0-e2);}else if(uShape==4){float em=smoothstep(0.0,1.0,e);foldX(p,n,0.0,uFoldSide,3.12*(1.0-em),uFoldBw);p.x+=uFoldSide*uHalf.x*0.5*(1.0-em);}else{float y3=uHalf.y/3.0;foldY(p,n,-y3*1.08,-1.0,3.12*(1.0-e1),uFoldBw);foldY(p,n,y3,1.0,3.12*(1.0-e2),uFoldBw*2.6);}amp=mix(uA0,uAres,e);}p+=n*Hf(xy)*amp;if(uIsStub>0.5&&uTear>0.0){vec3 piv=vec3(uStubX,0.0,0.0);p=rotY(rotZ(p-piv,-0.55*uTear),0.6*uTear)+piv+vec3(0.08*uTear,-1.1*uTear*uTear,0.12*uTear);}p.z-=uCurl*p.x*p.x;return p;}void main(){float e,ex,ey,amp,ax,ay;vec3 p0=place(aXY,e,amp);vec3 px=place(aXY+vec2(0.005,0.0),ex,ax);vec3 py=place(aXY+vec2(0.0,0.005),ey,ay);vec3 nrm=normalize(cross(px-p0,py-p0));if(uEdge>0.5)p0-=nrm*uThick*(nrm.z>=0.0?1.0:-1.0);vec4 w=uModel*vec4(p0,1.0);vPos=w.xyz;vNrm=mat3(uModel)*nrm;vUv=aXY/(2.0*uHalf)+0.5;vE=uShape==0?pow(e,2.2):e;vAmp=amp*uScale;gl_Position=uProj*w;}`, jt = `#version 300 es
precision highp float;in vec3 vPos;in vec3 vNrm;in vec2 vUv;in float vE;in float vAmp;uniform sampler2D uH,uPrintF,uPrintB,uFx,uGrain;uniform vec2 uGrainK;uniform vec3 uCam,uColor,uL,uLampPos;uniform float uBump,uAge,uTime,uThru,uFront,uInkMax,uEdge,uDestroy,uLamp,uLampR;out vec4 frag;float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}vec3 perturb(vec3 pos,vec3 n,vec2 dH){vec3 sx=dFdx(pos),sy=dFdy(pos);vec3 r1=cross(sy,n),r2=cross(n,sx);float det=dot(sx,r1);return normalize(abs(det)*n-sign(det)*(dH.x*r1+dH.y*r2));}void main(){vec4 fx=texture(uFx,vUv);float pres=fx.r,sc=0.0;if(uFront>-0.5){float b=fx.a*1.4;pres=min(pres,smoothstep(uFront-0.004,uFront+0.012,b));sc=1.0-smoothstep(uFront,uFront+0.17,b);}if(pres<0.4)discard;float a=smoothstep(0.4,0.6,pres);bool front=gl_FrontFacing;vec3 n=normalize(vNrm)*(front?1.0:-1.0);vec3 L=normalize(uL);if(uEdge>0.5){float w=clamp((dot(n,L)+0.3)/1.3,0.0,1.0);vec3 ec=mix(uColor*vec3(0.8,0.76,0.7),vec3(0.08,0.06,0.05),smoothstep(0.55,0.9,sc))*(0.45+0.55*w);frag=vec4(ec*a,a);return;}vec4 h0=texture(uH,vUv);vec2 du=dFdx(vUv),dv=dFdy(vUv);vec4 hx=texture(uH,vUv+du),hy=texture(uH,vUv+dv);vec3 toP=uLampPos-vPos;vec3 Lp=normalize(toP);float pool=pow(1.0-smoothstep(0.0,1.0,length(toP.xy)/uLampR),1.3)*uLamp;float grazD=clamp((1.0-L.z-0.4)/0.5,0.0,1.0);float grazP=smoothstep(0.2,0.75,1.0-Lp.z)*pool;float ink=uInkMax*mix(grazD,grazP*3.0,uLamp);vec2 dH=vec2(hx.r-h0.r,hy.r-h0.r)*vAmp*uBump*(1.0+1.6*pool)-vec2(hx.g-h0.g,hy.g-h0.g)*ink;n=perturb(vPos,n,dH);vec3 V=normalize(uCam-vPos);float wrap=clamp((dot(n,L)+0.08)/1.08,0.0,1.0);float wrapP=max(dot(n,Lp),0.0);float ao=mix(1.0,0.42+0.58*smoothstep(-0.55,0.35,h0.r),1.0-vE);float fib=hash(floor(vUv*vec2(900.0,1180.0)));vec2 eu=min(vUv,1.0-vUv);float edge=smoothstep(0.0,0.05,min(eu.x,eu.y));vec3 col0=mix(uColor,uColor*vec3(0.93,0.84,0.66),uAge);vec3 alb=col0*(0.975+0.025*fib)*(0.93+0.07*edge);alb*=1.0+(texture(uGrain,vUv*uGrainK).r-0.94)*1.8;if(!front)alb*=0.9;vec2 uvB=vec2(1.0-vUv.x,vUv.y);vec4 tF=texture(uPrintF,vUv),tB=texture(uPrintB,uvB);vec4 pr=front?tF:tB;vec4 th=front?tB:tF;alb=mix(alb,th.rgb,th.a*uThru);alb=mix(alb,pr.rgb,pr.a);alb=mix(alb,vec3(0.45,0.29,0.13),smoothstep(0.12,0.55,sc)*0.85);alb=mix(alb,vec3(0.06,0.045,0.04),smoothstep(0.55,0.9,sc));alb=mix(alb,vec3(0.99,0.985,0.96),fx.b*0.85);vec3 key=vec3(1.0,0.965,0.9),amb=vec3(0.62,0.64,0.7);vec3 warm=vec3(1.0,0.9,0.74);vec3 base=amb*0.3*ao+key*1.04*wrap*mix(1.0,ao,0.7)*mix(1.0,0.55,uLamp);float spot=wrapP*pool*mix(1.0,ao,0.5);vec3 col=alb*(base+warm*spot*max(vec3(0.0),vec3(1.15)-base));col+=key*0.03*pow(max(dot(n,normalize(L+V)),0.0),24.0)*(1.0-0.5*uLamp);col+=warm*0.06*pow(max(dot(n,normalize(Lp+V)),0.0),30.0)*pool;float rim=(1.0-smoothstep(0.42,0.66,pres))*smoothstep(0.6,0.95,sc);float fl=0.55+0.45*sin(uTime*6.0+vUv.x*37.0+vUv.y*23.0)*sin(uTime*2.3+vUv.y*51.0);col+=vec3(1.0,0.42,0.08)*rim*fl*(1.7+1.6*uDestroy);frag=vec4(col*a,a);}`, Kt = `#version 300 es
in vec2 aQ;uniform vec3 uC;uniform vec2 uHS;uniform float uSoft;uniform mat4 uProj;out vec2 vL;void main(){vL=aQ*(uHS+vec2(uSoft*3.0));gl_Position=uProj*vec4(uC+vec3(vL,0.0),1.0);}`, Jt = `#version 300 es
precision highp float;in vec2 vL;uniform vec2 uHS;uniform float uR,uSoft,uA,uOpen,uFront,uFlip;uniform sampler2D uFx;out vec4 frag;float paperAt(vec2 uv){vec4 fx=texture(uFx,clamp(uv,0.0,1.0));return uFront>-0.5?min(fx.r,smoothstep(uFront-0.004,uFront+0.012,fx.a*1.4)):fx.r;}void main(){vec2 q=abs(vL)-uHS+vec2(uR);float d=length(max(q,0.0))+min(max(q.x,q.y),0.0)-uR;float pres=1.0;if(uOpen>0.0){vec2 uv=vL/(2.0*uHS)+0.5,o=vec2(uSoft)/(2.0*uHS);if(uFlip>0.5)uv.x=1.0-uv.x;float p=paperAt(uv)*2.0+paperAt(uv+vec2(o.x,0.0))+paperAt(uv-vec2(o.x,0.0))+paperAt(uv+vec2(0.0,o.y))+paperAt(uv-vec2(0.0,o.y));pres=mix(1.0,p/6.0,uOpen);}frag=vec4(0.0,0.0,0.0,uA*pres*(1.0-smoothstep(-uSoft,uSoft*2.5,d)));}`, Zt = `#version 300 es
in vec3 aP;in vec4 aC;in float aS;uniform mat4 uProj;uniform float uPx;out vec4 vC;void main(){gl_Position=uProj*vec4(aP,1.0);gl_PointSize=max(1.0,aS*uPx/gl_Position.w);vC=aC;}`, Wt = `#version 300 es
precision highp float;in vec4 vC;out vec4 frag;void main(){float a=smoothstep(0.5,0.05,length(gl_PointCoord-0.5))*vC.a;frag=vec4(vC.rgb*a,a);}`;

// .build/sound.js
var le = /* @__PURE__ */ (() => {
  let e = null, n = null, t = null, s = null, o = pe.get("sound", !1), i = {}, a = {}, l = () => {
    if (!e) {
      let m = window.AudioContext || window.webkitAudioContext;
      if (!m) return null;
      e = new m(), n = e.createGain(), n.gain.value = 0.6, n.connect(e.destination), t = e.createBuffer(1, e.sampleRate, e.sampleRate);
      let w = t.getChannelData(0);
      for (let g = 0; g < w.length; g++) w[g] = Math.random() * 2 - 1;
    }
    return e.state === "suspended" && e.resume(), e;
  };
  function f() {
    return s || !e || (s = Promise.all(Object.entries(i).map(([m, w]) => fetch(w).then((g) => g.ok ? g.arrayBuffer() : Promise.reject(new Error(m))).then((g) => e.decodeAudioData(g)).then((g) => {
      a[m] = g;
    }).catch(() => {
    })))), s;
  }
  function u(m, w, g = {}) {
    let h = a[m];
    if (!h) return !1;
    let M = e.createBufferSource();
    M.buffer = h, M.playbackRate.value = g.rate || 1;
    let T = e.createGain();
    return T.gain.value = g.gain ?? 1, M.connect(T), T.connect(n), M.start(w, g.offset || 0, g.dur), !0;
  }
  function p(m, w, g, h, M) {
    let T = e.createBufferSource();
    T.buffer = t;
    let r = e.createBiquadFilter();
    r.type = "bandpass", r.frequency.value = g, r.Q.value = h;
    let R = e.createGain();
    R.gain.setValueAtTime(1e-4, m), R.gain.linearRampToValueAtTime(M, m + 2e-3), R.gain.exponentialRampToValueAtTime(1e-4, m + w), T.connect(r), r.connect(R), R.connect(n), T.start(m, Math.random() * 0.9, w + 0.03);
  }
  function d(m, w, g, h, M) {
    let T = e.createBufferSource();
    T.buffer = t, T.loop = !0;
    let r = e.createBiquadFilter();
    r.type = "bandpass", r.Q.value = 0.8, r.frequency.setValueAtTime(g, m), r.frequency.linearRampToValueAtTime(h, m + w);
    let R = e.createGain();
    R.gain.setValueAtTime(1e-4, m), R.gain.linearRampToValueAtTime(M, m + w * 0.15), R.gain.linearRampToValueAtTime(1e-4, m + w), T.connect(r), r.connect(R), R.connect(n), T.start(m), T.stop(m + w + 0.05);
  }
  function y(m, w, g, h, M, T) {
    let r = Math.round(w * g);
    for (let R = 0; R < r; R++) {
      let L = Math.random();
      T && (L = L * L), p(m + L * w, 6e-3 + Math.random() * 0.03, 1500 + Math.random() * 4500 * h, 0.7 + Math.random() * 2.2, M * (0.25 + Math.random() * 0.75));
    }
  }
  return {
    get enabled() {
      return o;
    },
    set(m) {
      o = !!m, pe.set("sound", o), o && l() && f();
    },
    // optional real recordings: { crumple, sheet, tear } (URLs)
    useSamples(m) {
      i = { ...m }, s = null, o && e && f();
    },
    // names: crumple, uncrumple, flip, tear, seal, fire, grain
    play(m, w = 1, g = 0) {
      if (!o || !l()) return;
      f();
      let h = e.currentTime + g, M = (T) => !!a[T];
      if (m === "crumple")
        if (M("crumple")) {
          let T = Math.max(2, Math.round(w * 4));
          for (let r = 0; r < T; r++) u("crumple", h + r / T * w * 0.85, { gain: 0.6 + Math.random() * 0.35, rate: 0.85 + Math.random() * 0.35 });
          y(h, w, 25, 1, 0.1, !0);
        } else
          y(h, w, 90, 1, 0.32, !0), d(h, w, 2400, 1200, 0.07);
      else if (m === "uncrumple")
        if (M("sheet")) {
          let T = Math.max(2, Math.round(w * 2.5));
          for (let r = 0; r < T; r++) u(r % 2 && M("crumple") ? "crumple" : "sheet", h + r / T * w * 0.9, { gain: 0.4 + Math.random() * 0.25, rate: 0.75 + Math.random() * 0.25 });
        } else
          y(h, w, 46, 0.8, 0.26, !1), d(h, w, 1400, 2600, 0.05);
      else m === "flip" ? u("sheet", h, { gain: 0.8, rate: 1.15 }) || (d(h, 0.38, 500, 2400, 0.16), p(h + 0.34, 0.05, 900, 1, 0.22)) : m === "tear" ? u("tear", h, { gain: 1 }) || (d(h, 0.45, 1800, 3600, 0.18), y(h, 0.45, 160, 1.2, 0.3, !1)) : m === "seal" ? (u("tear", h, { gain: 0.45, rate: 1.7, dur: 0.16 }) || p(h, 0.05, 1200, 2, 0.3), u("sheet", h + 0.2, { gain: 0.5, rate: 0.9 }) || d(h + 0.2, 0.5, 700, 2200, 0.08)) : m === "fire" ? (y(h, w, 22, 0.45, 0.16, !1), d(h, w, 500, 800, 0.05)) : m === "grain" && (u("crumple", h, { gain: 0.22, rate: 1.2 + Math.random() * 0.4, offset: Math.random() * 0.3, dur: 0.08 }) || y(h, 0.06, 60, 1, 0.2, !1));
    }
  };
})();

// .build/motion.js
function ue(e, n, t, s, o = me, i = 0, a) {
  e.tw = e.tw.filter((l) => l.key !== n), e.tw.push({ key: n, to: t, dur: Math.max(1e-3, s), ease: o, start: performance.now() + i * 1e3, from: null, done: a });
}
function dt(e, n) {
  let t = !1, s = [];
  return e.tw = e.tw.filter((o) => {
    if (t = !0, n < o.start) return !0;
    o.from === null && (o.from = e[o.key]);
    let i = j((n - o.start) / (o.dur * 1e3));
    return e[o.key] = o.from + (o.to - o.from) * o.ease(i), i >= 1 ? (o.done && s.push(o.done), !1) : !0;
  }), s.forEach((o) => o()), t;
}
function Ze(e) {
  if (e.cfg.type === "envelope") return 0.34;
  let n = e.F.shape;
  return n === 0 ? 0.42 : n === 2 ? 0.35 : 0.3;
}
function We(e, n) {
  let t = ce(j(n));
  return 2 * Math.max(e.F.ext[0] / 2 + (e.half[0] - e.F.ext[0] / 2) * t, e.F.ext[1] / 2 + (e.half[1] - e.F.ext[1] / 2) * t);
}
function Qt(e, n) {
  let t = ce(j(e.cfg.type === "envelope" ? n * 2 : n)), s = [0, 0, -0.02];
  return e.pose.map((o, i) => o * (1 - t) + s[i] * t);
}
function qe(e, n, t) {
  let s = (T, r = 0) => n.destroy !== void 0 ? n.destroy : T.front0 > -0.5 ? T.front0 + T.burned + r : -1, o = n.destroy !== void 0 ? j((1.25 - n.destroy) / 0.9) : 1;
  if (e.cfg.type !== "envelope") {
    let T = { ...t, p: n.p, f: n.f, tear: n.tear, front: s(e, n.burnOpen || 0), destroy: n.destroy !== void 0, alpha: o };
    return { items: [{ P: e, st: T }], shadow: { P: e, st: T }, active: { P: e, st: T } };
  }
  let i = e.letter, a = n.p, l = ce(j(a / 0.24)), f = ce(j((a - 0.14) / 0.36)), u = ce(j((a - 0.44) / 0.32)), p = j((a - 0.58) / 0.42), d = { ...t, p: l, f: n.f, tear: 0, cy: t.cy - u * t.vhU * 0.8, rot: [t.rot[0], t.rot[1], t.rot[2] + u * 0.45], front: s(e) }, y = -0.08 + f * 0.5, m = -0.035 * (1 - u), w = Math.PI * Be(j(n.f)), g = [0, 0, -0.02], h = { ...t, cx: $e(d.cx, 0, u), cy: $e(d.cy, 0, u), sc: $e(d.sc, t.scLetter, u), rot: d.rot.map((T, r) => $e(T, g[r] + (t.adjust ? t.adjust[r] : 0), u)), local: [-Math.sin(w) * m, y * (1 - u), Math.cos(w) * m], p: Rt(p), f: n.f, tear: 0, front: s(i, n.burnOpen || 0), destroy: n.destroy !== void 0, alpha: o };
  return { items: u >= 0.999 ? [{ P: i, st: h }] : a < 0.01 ? [{ P: e, st: d }] : [{ P: e, st: d }, { P: i, st: h }], shadow: u < 0.5 ? { P: e, st: d } : { P: i, st: h }, active: u < 0.5 ? { P: e, st: d } : { P: i, st: h } };
}
function Qe(e, n, t, s, o, i = 0, a = 0) {
  let l = ce(j(n.p)), f = (e.F.ext[0] / 2 + (e.half[0] - e.F.ext[0] / 2) * l) * n.sc * t * 1.1, u = (e.F.ext[1] / 2 + (e.half[1] - e.F.ext[1] / 2) * l) * n.sc * t * 1.1, p = i + s / 2 + n.cx * t, d = a + o / 2 - n.cy * t;
  return { cx: p, cy: d, x0: p - f, x1: p + f, y0: d - u, y1: d + u, w1: e.half[0] * 2 * n.sc * t, h1: e.half[1] * 2 * n.sc * t };
}
function ht(e, n, t, s) {
  let { P: o, st: i } = t.active, a = n.p - (n.pPrev ?? n.p), l = ce(j(i.p)), f = (o.F.ext[0] / 2 + (o.half[0] - o.F.ext[0] / 2) * l) * i.sc, u = (o.F.ext[1] / 2 + (o.half[1] - o.F.ext[1] / 2) * l) * i.sc;
  if (a > 5e-4 && n.p > 0.12 && n.p < 0.97) {
    let d = Math.min(8, Math.round(a * 300));
    for (let y = 0; y < d; y++) e.emit({ x: i.cx + (Math.random() - 0.5) * 2 * f, y: i.cy + (Math.random() - 0.5) * 2 * u, z: 0.06 * i.sc, vx: (Math.random() - 0.5) * 0.05 * i.sc, vy: (Math.random() * 0.04 + 0.01) * i.sc, ay: -0.01 * i.sc, r: 0.93, g: 0.9, b: 0.84, a: 0.5, s: (5e-3 + Math.random() * 8e-3) * i.sc, t: 0, life: 1.2 + Math.random() * 0.9 });
  }
  let p = i.front;
  if (p > -0.5 && o.burnPts && i.p > 0.9) {
    let d = n.destroy !== void 0;
    n.acc = (n.acc || 0) + s * (d ? 110 : 9);
    let y = o.burnPts, m = y.length / 3, w = Math.cos(i.rot[2]), g = Math.sin(i.rot[2]);
    for (; n.acc >= 1; ) {
      n.acc -= 1;
      let h = -1;
      for (let L = 0; L < 40; L++) {
        let U = Math.floor(Math.random() * m);
        if (Math.abs(y[U * 3 + 2] - p) < 0.012) {
          h = U;
          break;
        }
      }
      if (h < 0) continue;
      let M = (y[h * 3] - 0.5) * o.w * i.sc, T = (y[h * 3 + 1] - 0.5) * o.h * i.sc, r = i.cx + w * M - g * T, R = i.cy + g * M + w * T;
      e.emit({ x: r, y: R, z: 0.02 * i.sc, vx: (Math.random() - 0.5) * 0.08 * i.sc, vy: (0.06 + Math.random() * 0.1) * i.sc, ay: 0.06 * i.sc, r: 1, g: 0.5 + Math.random() * 0.3, b: 0.12, a: 1, s: (3e-3 + Math.random() * 5e-3) * i.sc, t: 0, life: 0.5 + Math.random() * 0.8, flicker: !0 }), d && Math.random() < 0.45 && e.emit({ x: r, y: R, z: 0.02 * i.sc, vx: (Math.random() - 0.5) * 0.06 * i.sc, vy: -(0.02 + Math.random() * 0.05) * i.sc, ay: -0.05 * i.sc, r: 0.2, g: 0.19, b: 0.18, a: 0.85, s: (8e-3 + Math.random() * 0.012) * i.sc, t: 0, life: 1.4 + Math.random() * 1.1 });
    }
  }
}
function mt(e, n) {
  let t = /* @__PURE__ */ new Map(), s = [], o = null, i = () => {
    let [u, p] = [...t.values()];
    return Math.hypot(u.x - p.x, u.y - p.y);
  }, a = (u) => {
    let p = n.active();
    if (!p) return;
    let d = n.box();
    if (!(d && u.clientX > d.x0 && u.clientX < d.x1 && u.clientY > d.y0 && u.clientY < d.y1) && !t.size) {
      n.outside(u);
      return;
    }
    if (!(!t.size && n.tap && n.tap(u))) {
      t.set(u.pointerId, { x: u.clientX, y: u.clientY });
      try {
        e.setPointerCapture(u.pointerId);
      } catch {
      }
      p.tw = p.tw.filter((m) => m.key !== "p"), t.size === 2 ? o = { pinch: !0, d0: i(), p0: p.p, moved: !0, last: p.p, box: d } : o = { pinch: !1, r0: Math.hypot(u.clientX - d.cx, u.clientY - d.cy), p0: p.p, x: u.clientX, y: u.clientY, moved: !1, last: p.p, box: d };
    }
  }, l = (u) => {
    if (!o || !t.has(u.pointerId)) return;
    t.set(u.pointerId, { x: u.clientX, y: u.clientY });
    let p = n.active();
    if (!p) {
      o = null, t.clear();
      return;
    }
    let d = 0.42 * Math.min(o.box.w1, o.box.h1);
    if (o.pinch && t.size === 2) p.p = j(o.p0 + (i() - o.d0) / d);
    else if (!o.pinch) {
      if (Math.hypot(u.clientX - o.x, u.clientY - o.y) > 6 && (o.moved = !0), !o.moved) return;
      p.p = j(o.p0 + (Math.hypot(u.clientX - o.box.cx, u.clientY - o.box.cy) - o.r0) / d);
    }
    Math.abs(p.p - o.last) > 0.035 && (le.play("grain"), o.last = p.p), p.dragging = !0, n.redraw();
  }, f = (u) => {
    if (!t.has(u.pointerId) || (t.delete(u.pointerId), t.size)) return;
    let p = n.active(), d = o && o.moved;
    o = null, p && (p.dragging = !1, d && (p.p >= 0.3 ? (le.play("uncrumple", 0.4), ue(p, "p", 1, 0.45 * (1 - p.p) + 0.15, Ne)) : (le.play("crumple", 0.35), ue(p, "p", 0, 0.35 * p.p + 0.12, Ne)), n.redraw()));
  };
  return [["pointerdown", a], ["pointermove", l], ["pointerup", f], ["pointercancel", f]].forEach(([u, p]) => te(s, e, u, p)), () => s.splice(0).forEach((u) => u());
}
function et(e, n, t, s, o, i, a) {
  let l = [(n - s / 2) / i, -(t - o / 2) / i, 0.09 * o / i];
  e.lampPos || (e.lampPos = l.slice()), e.lampGoal = l, e.lampOn = a ? 1 : 0, e.lampMoving = !0;
}
function gt(e, n) {
  if (!e.lampGoal) return !1;
  let t = 1 - Math.exp(-n * 20), s = 1 - Math.exp(-n * 7), o = !1;
  for (let a = 0; a < 3; a++) {
    let l = e.lampGoal[a] - e.lampPos[a];
    Math.abs(l) > 1e-4 && (o = !0), e.lampPos[a] += l * t;
  }
  let i = (e.lampOn || 0) - (e.lamp || 0);
  return Math.abs(i) > 2e-3 && (o = !0), e.lamp = (e.lamp || 0) + i * s, o;
}

// .build/renderer.js
var be = {
  persp(e, n, t, s) {
    let o = 1 / Math.tan(e / 2), i = 1 / (t - s);
    return [o / n, 0, 0, 0, 0, o, 0, 0, 0, 0, (s + t) * i, -1, 0, 0, 2 * s * t * i, 0];
  },
  mul(e, n) {
    let t = new Array(16);
    for (let s = 0; s < 4; s++) for (let o = 0; o < 4; o++) {
      let i = 0;
      for (let a = 0; a < 4; a++) i += e[a * 4 + o] * n[s * 4 + a];
      t[s * 4 + o] = i;
    }
    return t;
  },
  T(e, n, t) {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e, n, t, 1];
  },
  S(e) {
    return [e, 0, 0, 0, 0, e, 0, 0, 0, 0, e, 0, 0, 0, 0, 1];
  },
  RX(e) {
    let n = Math.cos(e), t = Math.sin(e);
    return [1, 0, 0, 0, 0, n, t, 0, 0, -t, n, 0, 0, 0, 0, 1];
  },
  RY(e) {
    let n = Math.cos(e), t = Math.sin(e);
    return [n, 0, -t, 0, 0, 1, 0, 0, t, 0, n, 0, 0, 0, 0, 1];
  },
  RZ(e) {
    let n = Math.cos(e), t = Math.sin(e);
    return [n, t, 0, 0, -t, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  }
}, Pe = 30 * Math.PI / 180, Ae = 10, Ge = [-0.45, 0.62, 0.65];
function Un(e, n) {
  let t = n.w / 2, s = n.h / 2, o = Math.hypot(t, s);
  if (e === "flat") {
    let l = 0.78 * Math.PI / o, f = 1 / l;
    return { shape: 0, k0: l, squash: 0.3, roll: 0, A0: n.card ? 0.06 : 0.1, Ares: 45e-4, ext: [2.42 * f, 2.42 * f] };
  }
  if (e === "roll") {
    let l = Math.max(0.03, n.w * 0.085);
    return { shape: 1, k0: 0, squash: 1, roll: l, A0: 0.03, Ares: 4e-3, ext: [2.2 * l, n.h] };
  }
  if (e === "twist") {
    let l = 3.3 * Math.PI / n.h;
    return { shape: 2, k0: l, squash: 1, roll: 0.012, A0: 0.03, Ares: 45e-4, ext: [n.w, 2.6 / l] };
  }
  if (e === "quarters") return { shape: 3, k0: 0, squash: 1, roll: 0, A0: 7e-3, Ares: 35e-4, ext: [t * 1.05, s * 1.05] };
  if (e === "half") return { shape: 4, k0: 0, squash: 1, roll: 0, A0: 7e-3, Ares: 35e-4, ext: [t * 1.05, n.h * 1.02] };
  if (e === "thirds") return { shape: 5, k0: 0, squash: 1, roll: 0, A0: 7e-3, Ares: 35e-4, ext: [n.w * 1.02, n.h / 3 * 1.05] };
  if (e === "envelope") return { shape: 6, k0: 0, squash: 1, roll: 0, A0: 5e-3, Ares: 3e-3, ext: [n.w * 1.02, n.body * 1.04] };
  let i = 0.95 * Math.PI / o, a = 1 / i;
  return { shape: 0, k0: i, squash: 1, roll: 0, A0: n.card ? 0.07 : 0.12, Ares: 45e-4, ext: [2 * (a + 0.06), 2 * (a + 0.06)] };
}
var On = (e) => e.states.includes("burnt") || e.burnAfterReading ? "burn" : e.states.includes("singed") ? "singed" : null, en = { corner: [0.3, 0.06], edge: [0.035, 0.01], center: [0.09, 0.03], spots: [0.035, 0.01] };
function tt(e, n = {}) {
  let t = e.getContext("webgl2", { alpha: !0, premultipliedAlpha: !0, antialias: !0 });
  if (!t) return null;
  let s, o, i, a, l, f, u, p = !1, d = !1, y = (E, v) => {
    let P = (Y, V) => {
      let $ = t.createShader(Y);
      if (t.shaderSource($, V), t.compileShader($), !t.getShaderParameter($, t.COMPILE_STATUS)) throw new Error(t.getShaderInfoLog($));
      return $;
    }, N = t.createProgram();
    if (t.attachShader(N, P(t.VERTEX_SHADER, E)), t.attachShader(N, P(t.FRAGMENT_SHADER, v)), t.linkProgram(N), !t.getProgramParameter(N, t.LINK_STATUS)) throw new Error(t.getProgramInfoLog(N));
    let A = {}, F = t.getProgramParameter(N, t.ACTIVE_UNIFORMS);
    for (let Y = 0; Y < F; Y++) {
      let V = t.getActiveUniform(N, Y);
      A[V.name] = t.getUniformLocation(N, V.name);
    }
    return { p: N, u: A };
  };
  function m() {
    s = y($t, jt), o = y(Kt, Jt), i = y(Zt, Wt), a = t.createVertexArray(), t.bindVertexArray(a), l = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, l), t.bufferData(t.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), t.STATIC_DRAW);
    let E = t.getAttribLocation(o.p, "aQ");
    t.enableVertexAttribArray(E), t.vertexAttribPointer(E, 2, t.FLOAT, !1, 0, 0), t.bindVertexArray(null), f = t.createVertexArray(), u = t.createBuffer(), t.bindVertexArray(f), t.bindBuffer(t.ARRAY_BUFFER, u), t.bufferData(t.ARRAY_BUFFER, 420 * 32, t.DYNAMIC_DRAW), [["aP", 3, 0], ["aC", 4, 12], ["aS", 1, 28]].forEach(([v, P, N]) => {
      let A = t.getAttribLocation(i.p, v);
      t.enableVertexAttribArray(A), t.vertexAttribPointer(A, P, t.FLOAT, !1, 32, N);
    }), t.bindVertexArray(null);
  }
  m();
  let w = (E) => {
    E.preventDefault(), p = !0;
  }, g = () => {
    p = !1, m(), T = null, r = null, G = null, oe = null, H = null, n.onRestore && n.onRestore();
  };
  e.addEventListener("webglcontextlost", w), e.addEventListener("webglcontextrestored", g);
  function h(E, v, P, N, A, F, Y) {
    let V = [];
    for (let q = 0; q <= N; q++) V.push(E + (v - E) * q / N);
    F.forEach((q) => {
      q > E + 1e-6 && q < v - 1e-6 && V.push(q);
    }), V.sort((q, ne) => q - ne);
    let $ = [];
    for (let q = 0; q <= A; q++) $.push(-P + 2 * P * q / A);
    Y.forEach((q) => {
      q > -P + 1e-6 && q < P - 1e-6 && !$.some((ne) => Math.abs(ne - q) < 1e-6) && $.push(q);
    }), $.sort((q, ne) => q - ne);
    let K = V.length, O = $.length, W = new Float32Array(K * O * 2), X = 0;
    for (let q = 0; q < O; q++) for (let ne = 0; ne < K; ne++)
      W[X++] = V[ne], W[X++] = $[q];
    let Q = new Uint16Array((K - 1) * (O - 1) * 6);
    X = 0;
    for (let q = 0; q < O - 1; q++) for (let ne = 0; ne < K - 1; ne++) {
      let Te = q * K + ne, Ye = Te + 1, Le = Te + K, c = Le + 1;
      Q[X++] = Te, Q[X++] = Ye, Q[X++] = c, Q[X++] = Te, Q[X++] = c, Q[X++] = Le;
    }
    let fe = t.createVertexArray();
    t.bindVertexArray(fe);
    let ee = t.createBuffer();
    t.bindBuffer(t.ARRAY_BUFFER, ee), t.bufferData(t.ARRAY_BUFFER, W, t.STATIC_DRAW);
    let Me = t.getAttribLocation(s.p, "aXY");
    t.enableVertexAttribArray(Me), t.vertexAttribPointer(Me, 2, t.FLOAT, !1, 0, 0);
    let he = t.createBuffer();
    return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, he), t.bufferData(t.ELEMENT_ARRAY_BUFFER, Q, t.STATIC_DRAW), t.bindVertexArray(null), { vao: fe, count: Q.length, bufs: [ee, he] };
  }
  function M(E, v) {
    let P = t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, P), v.float ? (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1), t.texImage2D(t.TEXTURE_2D, 0, t.RG16F, v.w, v.h, 0, t.RG, t.FLOAT, E)) : (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, E), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1)), v.mip ? (t.generateMipmap(t.TEXTURE_2D), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR)) : t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), P;
  }
  let T = null, r = null, R = (E) => {
    let v = t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, v), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(E)), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), v;
  }, L = () => T || (T = R([0, 0, 0, 0])), U = () => r || (r = R([255, 0, 0, 255])), C = (E) => {
    E && E !== T && E !== r && t.deleteTexture(E);
  }, G = null, oe = null;
  function re() {
    return G || (G = R([240, 240, 240, 255]), oe = Xe("grain").then((E) => {
      !E || d || (t.bindTexture(t.TEXTURE_2D, G), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, E), t.generateMipmap(t.TEXTURE_2D), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.REPEAT), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.REPEAT));
    }), G);
  }
  async function k(E) {
    let v = Ke(E), P = Ie[v.type];
    re();
    let N = v.type === "envelope" ? k({ id: v.id + "-letter", type: v.letter, shape: "thirds", text: v.text, back: v.back, states: v.states.filter((D) => D !== "torn"), seed: v.seed + 1, hiddenInk: v.hiddenInk, burn: v.burn, burnAfterReading: v.burnAfterReading, stamp: v.stamp }) : null;
    await Nt([P.font, "Caveat", "Courier Prime", "Special Elite"]);
    let A = P.w / 2, F = P.h / 2, Y = Un(v.shape, P), V = Math.round(512 * P.w / 0.84), $ = Math.round(V * P.h / P.w), K = pe.get("opens." + v.id, 0), O = se(v.seed * 7 + 1), W = P.stub ? A - P.w * P.stub : null, X = P.body ? -F + P.body : 0, Q = Math.max(16, Math.round(Math.sqrt(15e3 * P.w / P.h))), fe = Math.max(16, Math.round(Q * P.h / P.w)), ee = [0], Me = [0, -P.h / 6 * 1.08, P.h / 6, X], he = [];
    if (W !== null) {
      let D = Math.round(Q * (W + A) / P.w);
      he.push(h(-A, W, F, D, fe, ee, Me)), he.push(h(W, A, F, Q - D, fe, ee, Me));
    } else he.push(h(-A, A, F, Q, fe, ee, Me));
    let q = !(v.back || v.type === "notebook" || v.type === "form" || v.type === "envelope" || v.type === "newspaper" || ["coffee", "water", "prints", "aged", "wine", "ink", "foxing", "faded"].some((D) => v.states.includes(D))), ne = On(v), Te = !(v.type === "notebook" || v.type === "form" || v.type === "envelope" || v.states.includes("torn") || ne), [Ye, Le, c, b] = await Promise.all([
      ft.run("creases", [{ seed: v.seed, shape: v.shape, w: P.w, h: P.h, card: !!P.card, foldY: X }, V, $]),
      Je(v, P, "front", K),
      q ? null : Je(v, P, "back", K),
      Te ? null : At(v, P, ne)
    ]), x = Vt(v, V, $), S = new Float32Array(V * $ * 2);
    for (let D = 0; D < V * $; D++)
      S[D * 2] = Ye[D], S[D * 2 + 1] = x ? x[D] : 0;
    let B = Y.shape === 1 || Y.shape === 2, I = {
      cfg: v,
      T: P,
      w: P.w,
      h: P.h,
      half: [A, F],
      F: Y,
      stubX: W,
      foldY: X,
      meshes: he,
      openings: K,
      tH: M(S, { float: !0, w: V, h: $ }),
      tPF: M(Le, { mip: !0 }),
      tPB: q ? L() : M(c, { mip: !0 }),
      tFx: Te ? U() : M(b.canvas, {}),
      burnPts: Te ? null : b.burnPts,
      // which burn field the effects hold: 'burn' (sparks, can burn away), 'singed' (rim only) or 'none' (ensureBurn adds one)
      fxBurn: ne || "none",
      backEmpty: q,
      // estimated texture memory (front and back with mipmaps, effects, creases in RG16F)
      bytes: Math.round(Le.width * Le.height * 4 * 1.33 * (q ? 1 : 2) + (Te ? 0 : b.canvas.width * b.canvas.height * 4) + V * $ * 4),
      // folded and elongated papers stay almost facing the camera; crumpled ones may spin freely
      pose: Y.shape >= 3 ? [-0.22 + O() * 0.18, -0.2 + O() * 0.4, -0.45 + O() * 0.9] : B ? [-0.15 + O() * 0.15, -0.15 + O() * 0.3, -0.6 + O() * 1.2] : [-0.3 + O() * 0.25, -0.35 + O() * 0.7, O() * 6.28],
      seedA: O() * 6.28,
      // a singed rim holds its front just under the lowest value of its field: only the scorch band shows
      front0: v.states.includes("burnt") ? en[v.burn][0] + en[v.burn][1] * O() : ne === "singed" ? b.lo - 0.012 : -1,
      burned: pe.get("burned." + v.id, 0),
      age: v.states.includes("aged") ? 1 : 0,
      torn: !1
    };
    return I.extent = Math.max(Y.ext[0], Y.ext[1]), I.hasRedaction = /\[\[/.test(v.text + v.back), N && (I.letter = await N), await oe, I;
  }
  async function _(E) {
    E.openings = pe.get("opens." + E.cfg.id, 0);
    let [v, P] = await Promise.all([Je(E.cfg, E.T, "front", E.openings), E.backEmpty ? null : Je(E.cfg, E.T, "back", E.openings)]);
    C(E.tPF), C(E.tPB), E.tPF = M(v, { mip: !0 }), E.tPB = P ? M(P, { mip: !0 }) : L();
  }
  function z(E) {
    return E.fxBurn === "burn" ? Promise.resolve() : (E.burnJob || (E.burnJob = At(E.cfg, E.T, "burn").then((v) => {
      if (E.released) return;
      let P = E.tFx;
      P === r && (E.bytes += v.canvas.width * v.canvas.height * 4), E.tFx = M(v.canvas, {}), C(P), E.burnPts = v.burnPts, E.fxBurn = "burn";
    })), E.burnJob);
  }
  async function J(E) {
    await Promise.all([z(E), E.letter && z(E.letter)]);
  }
  function Z(E) {
    E.released = !0, [E.tH, E.tPF, E.tPB, E.tFx].forEach(C), E.meshes.forEach((v) => {
      t.deleteVertexArray(v.vao), v.bufs.forEach((P) => t.deleteBuffer(P));
    }), E.letter && Z(E.letter);
  }
  function ve(E, v, P) {
    let N = v.f || 0, A = be.mul(be.T(v.cx, v.cy, (v.zoff || 0) * v.sc + 0.12 * v.sc * Math.sin(Math.PI * N)), be.S(v.sc));
    A = be.mul(A, be.RZ(v.rot[2])), A = be.mul(A, be.RX(v.rot[0])), A = be.mul(A, be.RY(v.rot[1] + Math.PI * Be(j(N)))), v.local && (A = be.mul(A, be.T(v.local[0], v.local[1], v.local[2])));
    let F = s.u;
    t.useProgram(s.p), [[E.tH, "uH"], [E.tPF, "uPrintF"], [E.tPB, "uPrintB"], [E.tFx, "uFx"]].forEach(([K, O], W) => {
      t.activeTexture(t.TEXTURE0 + W), t.bindTexture(t.TEXTURE_2D, K), t.uniform1i(F[O], W);
    }), t.activeTexture(t.TEXTURE4), t.bindTexture(t.TEXTURE_2D, re()), t.uniform1i(F.uGrain, 4), t.uniform2f(F.uGrainK, E.w * 5, E.h * 5);
    let Y = v.L || Ge;
    t.uniform1i(F.uShape, E.F.shape), t.uniform1f(F.uP, j(v.p)), t.uniform1f(F.uK0, E.F.k0), t.uniform1f(F.uKres, 0.06), t.uniform1f(F.uA0, E.F.A0), t.uniform1f(F.uAres, E.F.Ares), t.uniform1f(F.uSeedA, E.seedA), t.uniform1f(F.uSquash, E.F.squash), t.uniform1f(F.uRoll, E.F.roll || 0.03), t.uniform1f(F.uCurl, 0.9 * Math.sin(Math.PI * j(N))), t.uniform1f(F.uStubX, E.stubX ?? 0), t.uniform1f(F.uFoldSide, E.T.stub ? -1 : 1), t.uniform1f(F.uFoldBw, E.T.card ? 0.03 : 0.016), t.uniform1f(F.uFoldY, E.foldY || 0), t.uniform1f(F.uThick, N > 0.5 ? -6e-3 : 6e-3), t.uniform1f(F.uScale, v.sc), t.uniform1f(F.uBump, 1), t.uniform2f(F.uHalf, E.half[0], E.half[1]), t.uniform3f(F.uCam, 0, 0, Ae), t.uniform3f(F.uColor, E.T.color[0], E.T.color[1], E.T.color[2]), t.uniform3f(F.uL, Y[0], Y[1], Y[2]), t.uniform1f(F.uAge, E.age), t.uniform1f(F.uThru, E.T.card ? 0 : 0.035), t.uniform1f(F.uTime, v.time || 0), t.uniform1f(F.uFront, v.front ?? -1), t.uniform1f(F.uDestroy, v.destroy ? 1 : 0), t.uniform1f(F.uInkMax, 24e-4 * v.sc);
    let V = v.lampPos || [0, 0, 10];
    t.uniform3f(F.uLampPos, V[0], V[1], V[2]), t.uniform1f(F.uLamp, v.lamp || 0), t.uniform1f(F.uLampR, v.lampR || 1), t.uniformMatrix4fv(F.uModel, !1, A), t.uniformMatrix4fv(F.uProj, !1, P), (E.T.card ? [1, 0] : [0]).forEach((K) => {
      t.uniform1f(F.uEdge, K), E.meshes.forEach((O, W) => {
        let X = W === 1;
        X && (E.torn || (v.tear || 0) >= 1) || (t.uniform1f(F.uIsStub, X ? 1 : 0), t.uniform1f(F.uTear, X && v.tear || 0), t.bindVertexArray(O.vao), t.drawElements(t.TRIANGLES, O.count, t.UNSIGNED_SHORT, 0));
      });
    });
  }
  function we(E, v, P) {
    t.useProgram(o.p), t.disable(t.DEPTH_TEST), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA);
    let N = ce(j(v.p)), A = [E.F.ext[0] / 2 * v.sc, E.F.ext[1] / 2 * v.sc], F = [A[0] + (E.half[0] * v.sc - A[0]) * N, A[1] + (E.half[1] * v.sc - A[1]) * N], Y = Math.min(Math.min(A[0], A[1]) * (1 - N) + 0.012 * v.sc * N, F[0], F[1]), V = (0.04 + 0.08 * v.lift + 0.04 * (1 - N)) * v.sc, $ = v.L || Ge, K = Math.hypot($[0], $[1]) || 1, O = (0.05 + 0.1 * v.lift) * v.sc * Math.min(1.6, K / Math.max(0.25, $[2]));
    t.uniform3f(o.u.uC, v.cx - $[0] / K * O, v.cy - $[1] / K * O, -0.25 * v.sc), t.uniform2f(o.u.uHS, F[0], F[1]), t.uniform1f(o.u.uR, Y), t.uniform1f(o.u.uSoft, V), t.uniform1f(o.u.uA, (0.62 - 0.2 * v.lift) * (v.alpha ?? 1)), t.uniformMatrix4fv(o.u.uProj, !1, P), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, E.tFx), t.uniform1i(o.u.uFx, 0), t.uniform1f(o.u.uOpen, j((v.p - 0.85) / 0.15)), t.uniform1f(o.u.uFront, v.front ?? -1), t.uniform1f(o.u.uFlip, (v.f || 0) > 0.5 ? 1 : 0), t.bindVertexArray(a), t.drawArrays(t.TRIANGLE_STRIP, 0, 4);
  }
  function Ee(E, v, P, N = e.width, A = e.height) {
    if (d || p) return;
    t.viewport(0, 0, N, A), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT);
    let F = be.mul(be.persp(Pe, N / A, 0.1, 100), be.T(0, 0, -Ae));
    if (v && (v.st.alpha ?? 1) > 0.01 && we(v.P, v.st, F), t.disable(t.BLEND), t.enable(t.DEPTH_TEST), E.forEach((Y) => ve(Y.P, Y.st, F)), P && P.n) {
      let Y = P.buffer();
      t.useProgram(i.p), t.disable(t.DEPTH_TEST), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA), t.uniformMatrix4fv(i.u.uProj, !1, F), t.uniform1f(i.u.uPx, A / (2 * Math.tan(Pe / 2))), t.bindVertexArray(f), t.bindBuffer(t.ARRAY_BUFFER, u), t.bufferSubData(t.ARRAY_BUFFER, 0, Y), t.drawArrays(t.POINTS, 0, Y.length / 8);
    }
  }
  let H = null;
  function Se() {
    t.deleteFramebuffer(H.fb), t.deleteRenderbuffer(H.rb), t.deleteTexture(H.t), H = null;
  }
  function Oe(E, v = !1, P = "image/png", N = 256) {
    if (d || p) return "";
    let A = N;
    if (!H || H.S !== A) {
      H && Se();
      let X = t.createTexture();
      t.bindTexture(t.TEXTURE_2D, X), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA8, A, A, 0, t.RGBA, t.UNSIGNED_BYTE, null), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR);
      let Q = t.createRenderbuffer();
      t.bindRenderbuffer(t.RENDERBUFFER, Q), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, A, A);
      let fe = t.createFramebuffer();
      t.bindFramebuffer(t.FRAMEBUFFER, fe), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, X, 0), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, Q), H = { fb: fe, t: X, rb: Q, S: A, c: ge(A, A) };
    }
    t.bindFramebuffer(t.FRAMEBUFFER, H.fb);
    let F = A / (2 * Ae * Math.tan(Pe / 2)), Y = v ? Ze(E) : 0, V = 0.9 * A / (We(E, Y) * F), { items: $ } = qe(E, { p: Y, f: 0, tear: 0, burnOpen: 0 }, { cx: 0, cy: 0, sc: V, scLetter: V, rot: Qt(E, Y), lift: 0, vhU: 1 });
    Ee($, null, null, A, A);
    let K = new Uint8Array(A * A * 4);
    t.readPixels(0, 0, A, A, t.RGBA, t.UNSIGNED_BYTE, K), t.bindFramebuffer(t.FRAMEBUFFER, null);
    let O = H.c.getContext("2d"), W = O.createImageData(A, A);
    for (let X = 0; X < A; X++) {
      let Q = (A - 1 - X) * A * 4, fe = X * A * 4;
      for (let ee = 0; ee < A * 4; ee += 4) {
        let Me = K[Q + ee + 3], he = Me ? 255 / Me : 0;
        W.data[fe + ee] = Math.min(255, K[Q + ee] * he), W.data[fe + ee + 1] = Math.min(255, K[Q + ee + 1] * he), W.data[fe + ee + 2] = Math.min(255, K[Q + ee + 2] * he), W.data[fe + ee + 3] = Me;
      }
    }
    return O.putImageData(W, 0, 0), H.c.toDataURL(P, 0.9);
  }
  function nt() {
    if (d) return;
    d = !0, e.removeEventListener("webglcontextlost", w), e.removeEventListener("webglcontextrestored", g), [s, o, i].forEach((v) => t.deleteProgram(v.p)), t.deleteVertexArray(a), t.deleteBuffer(l), t.deleteVertexArray(f), t.deleteBuffer(u), [T, r, G].forEach((v) => {
      v && t.deleteTexture(v);
    }), H && Se();
    let E = t.getExtension("WEBGL_lose_context");
    E && E.loseContext();
  }
  return { gl: t, build: k, refreshPrint: _, release: Z, draw: Ee, snapshot: Oe, ensureBurn: J, isLost: () => p, destroy: nt };
}

// .build/particles.js
function bt(e = 420) {
  let n = [], t = new Float32Array(e * 8);
  return {
    emit(s) {
      n.length < e && n.push(s);
    },
    step(s) {
      for (let o = n.length - 1; o >= 0; o--) {
        let i = n[o];
        if (i.t += s, i.t >= i.life) {
          n.splice(o, 1);
          continue;
        }
        i.vx += (i.ax || 0) * s, i.vy += (i.ay || 0) * s, i.x += i.vx * s, i.y += i.vy * s;
      }
    },
    get n() {
      return n.length;
    },
    // a single reused Float32Array: nothing is allocated per frame
    buffer() {
      for (let s = 0; s < n.length; s++) {
        let o = n[s], i = o.t / o.life, a = s * 8, l = o.a * Math.pow(Math.sin(Math.PI * Math.min(1, i)), 0.6);
        o.flicker && (l *= 0.55 + 0.45 * Math.sin(o.t * 28 + s)), t[a] = o.x, t[a + 1] = o.y, t[a + 2] = o.z, t[a + 3] = o.r, t[a + 4] = o.g, t[a + 5] = o.b, t[a + 6] = l, t[a + 7] = o.s;
      }
      return t.subarray(0, n.length * 8);
    },
    clear() {
      n.length = 0;
    }
  };
}

// .build/scene.js
var tn = {
  flip: "[ flip ]",
  tear: "[ tear stub ]",
  close: "[ close ]",
  hint: "drag to unfold",
  open: "Crumpled paper: open",
  back: "Back:"
}, Nn = /* @__PURE__ */ (() => {
  let e = { labels: tn, remember: !1, motion: "auto", flashlight: !0, maxBuilt: 3 }, n = !1, t, s = !1, o, i, a, l, f, u, p, d, y, m = null, w = null, g = [], h = /* @__PURE__ */ new WeakMap(), M = [], T = bt(), r = null, R = 0, L = (c) => c.replace(/\[\[[^\]\n]+\]\]/g, "redacted").replace(/~~[^~\n]+~~\{([^}\n]+)\}/g, "$1").replace(/~~([^~\n]+)~~/g, "$1").replace(/^# /gm, ""), U = 0.16, C = 0.9, G = 0.42, oe = 1.5, re = 1;
  function k() {
    if (o) return;
    n = Ue(e.motion);
    let c = document.createElement("style");
    c.textContent = ":root{--crumple-backdrop:rgba(6,5,4,.8);--crumple-ui-bg:rgba(14,13,12,.7);--crumple-ui-fg:#ebe5d6;--crumple-ui-border:rgba(235,229,214,.4);--crumple-ui-font:12px/1 'Courier Prime',ui-monospace,monospace;--crumple-accent:#f5c266}.crumple-scene{position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483640;pointer-events:none;display:none;transition:opacity .3s ease;touch-action:none}.crumple-backdrop{position:fixed;inset:0;z-index:2147483630;background:transparent;pointer-events:none;transition:background .7s ease}.crumple-backdrop.on{background:var(--crumple-backdrop)}.crumple-bar{position:fixed;z-index:2147483645;right:18px;top:16px;display:none;gap:8px}.crumple-bar.on{display:flex}.crumple-bar button,.crumple-fallback button{background:var(--crumple-ui-bg);border:1px solid var(--crumple-ui-border);color:var(--crumple-ui-fg);font:var(--crumple-ui-font);letter-spacing:.18em;padding:9px 12px;cursor:pointer}.crumple-bar button[hidden]{display:none}.crumple-hint{position:fixed;z-index:2147483645;left:50%;bottom:8vh;transform:translateX(-50%);font:var(--crumple-ui-font);font-size:13px;letter-spacing:.2em;color:var(--crumple-ui-fg);background:var(--crumple-ui-bg);padding:8px 14px;opacity:0;transition:opacity .5s;pointer-events:none}.crumple-hint.on{opacity:1}.crumple-trigger{display:inline-block;width:96px;height:96px;padding:0;border:0;background:none;cursor:pointer;-webkit-tap-highlight-color:transparent}.crumple-trigger img{width:100%;height:100%;display:block;filter:drop-shadow(2px 7px 6px rgba(0,0,0,.6))}.crumple-trigger:hover img,.crumple-trigger:focus-visible img{animation:crumple-wiggle .75s ease}.crumple-trigger:focus-visible{outline:2px solid var(--crumple-accent);outline-offset:4px;border-radius:50%}.crumple-trigger.active{visibility:hidden}.crumple-trigger.recrumple img{animation:crumple-squeeze .9s ease}@keyframes crumple-wiggle{0%{transform:none}22%{transform:rotate(-8deg) translateY(-4px)}50%{transform:rotate(6deg) translateY(-1px)}78%{transform:rotate(-2deg)}100%{transform:none}}@keyframes crumple-squeeze{0%{transform:scale(1.15)}30%{transform:scale(.7) rotate(-20deg)}60%{transform:scale(1.05) rotate(10deg)}100%{transform:none}}.crumple-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.crumple-fallback{position:fixed;inset:0;z-index:2147483646;display:none;align-items:center;justify-content:center;background:var(--crumple-backdrop);padding:24px}.crumple-fallback.on{display:flex}.crumple-fallback .sheet{max-width:min(520px,90vw);max-height:86vh;overflow:auto;padding:36px 34px;box-shadow:0 18px 40px rgba(0,0,0,.6);white-space:pre-line;font-size:19px;line-height:1.6;color:#2a2219}.crumple-fallback .sheet img{display:block;max-width:100%;margin:0 auto 16px}.crumple-fallback button{position:fixed;right:18px;top:16px}.crumple-fallback del{color:#5b4d3e;text-decoration:line-through;text-decoration-thickness:2px}.crumple-fallback ins{text-decoration:none;color:#1d3a8c;font-family:Caveat,'Comic Sans MS',cursive;font-size:1.12em;padding:0 .12em}.crumple-fallback .crumple-h{display:block;font-weight:700;font-size:1.15em;margin:.2em 0}.crumple-fallback .crumple-redact{display:inline-block;height:.85em;vertical-align:-.08em;background:#1b1713;border-radius:2px;margin:0 .1em}@media (prefers-reduced-motion:reduce){.crumple-trigger.recrumple img,.crumple-trigger:hover img{animation:none}}", document.head.appendChild(c), m = c;
    let b = e.labels;
    i = document.createElement("div"), i.className = "crumple-backdrop", o = document.createElement("canvas"), o.className = "crumple-scene", o.setAttribute("aria-hidden", "true"), a = document.createElement("div"), a.className = "crumple-bar", a.setAttribute("role", "dialog"), a.setAttribute("aria-modal", "true"), a.tabIndex = -1, l = document.createElement("button"), l.type = "button", l.textContent = b.flip, f = document.createElement("button"), f.type = "button", f.textContent = b.tear, f.hidden = !0, u = document.createElement("button"), u.type = "button", u.textContent = b.close, a.append(f, l, u), p = document.createElement("div"), p.className = "crumple-hint", p.textContent = b.hint, d = document.createElement("div"), d.className = "crumple-sr", d.setAttribute("aria-live", "polite"), y = document.createElement("div"), y.className = "crumple-fallback", y.setAttribute("role", "dialog"), y.setAttribute("aria-modal", "true"), document.body.append(i, o, a, p, d, y), te(M, u, "click", () => E()), te(M, l, "click", () => N()), te(M, f, "click", () => A()), te(M, window, "keydown", (x) => {
      if (!(x.ctrlKey || x.metaKey || x.altKey || Ye(x.target))) {
        if (y.classList.contains("on")) {
          x.key === "Escape" ? ne() : x.key === "Tab" && Te(x, y);
          return;
        }
        r && (x.key === "Tab" ? Te(x, a) : x.key === "Escape" ? E() : (x.key === "f" || x.key === "F") && N());
      }
    }), te(M, window, "resize", () => {
      r && (z(), H());
    }), te(M, window, "pointermove", (x) => {
      if (!e.flashlight || !r || r.phase !== "open" || r.dragging || x.pointerType === "touch") return;
      let S = r.boxCache || ve(), B = !!S && x.clientX > S.x0 - 30 && x.clientX < S.x1 + 30 && x.clientY > S.y0 - 30 && x.clientY < S.y1 + 30;
      et(r, x.clientX, x.clientY, o.clientWidth, o.clientHeight, o.clientHeight / (2 * Ae * Math.tan(Pe / 2)), B), H();
    }), te(M, document, "mouseout", (x) => {
      r && !x.relatedTarget && (r.lampOn = 0, H());
    }), te(M, document, "visibilitychange", () => {
      document.hidden || H();
    }), te(M, o, "dblclick", () => N()), w = je(), w && te(M, w, "change", () => {
      n = Ue(e.motion);
    }), M.push(mt(o, {
      active: () => r && r.phase === "open" ? r : null,
      box: ve,
      outside: () => E(),
      tap: (x) => {
        let S = we();
        return S && x.clientX > S.x0 && x.clientX < S.x1 && x.clientY > S.y0 && x.clientY < S.y1 ? (A(), !0) : !1;
      },
      redraw: () => H()
    }));
  }
  function _() {
    if (s) return t;
    s = !0, k();
    try {
      t = tt(o, { onRestore: fe });
    } catch {
      t = null;
    }
    return t;
  }
  function z() {
    let c = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(24e5 / Math.max(1, innerWidth * innerHeight))), b = Math.round(innerWidth * c), x = Math.round(innerHeight * c);
    (o.width !== b || o.height !== x) && (o.width = b, o.height = x);
  }
  function J(c) {
    let b = r.P, x = o.clientWidth, S = o.clientHeight, B = S / (2 * Ae * Math.tan(Pe / 2)), I = r.from, D = I.left + I.width / 2, ie = I.top + I.height / 2, de = (D - x / 2) / B, xe = -(ie - S / 2) / B, ye = 0.9 * I.width / ((r.ext0 || b.extent) * B), ke = b.cfg.type === "envelope", He = ke ? Math.min(0.5 * S / (b.T.body * B), 0.7 * x / (b.w * B)) : Math.min(0.86 * S / (b.h * B), 0.9 * x / (b.w * B)), yt = b.letter, on = yt ? Math.min(0.86 * S / (yt.h * B), 0.9 * x / (yt.w * B)) : He, _e = n ? 1 : r.tf, Ft = ce(j(ke ? r.p * 2 : r.p)), rn = Math.hypot(de, xe), It = (1 - _e) * (1 - _e), Lt = 2 * (1 - _e) * _e, an = r.arc || 0.24, sn = It * de + Lt * de * 0.5, vt = It * xe + Lt * (xe * 0.5 + an * rn), ot = b.F, ln = ot.shape === 0 && ot.squash > 0.5 ? 1 : ot.shape === 1 || ot.shape === 2 ? 0.8 : 0.45, un = n ? 0 : ce(_e) * ln, cn = [0.55, 1.15, 0.35], fn = [0, 0, -0.02], wt = b.pose.map((Re, Dt) => (Re + cn[Dt] * un) * (1 - Ft) + fn[Dt] * Ft), Et = ye + (He - ye) * Math.pow(_e, 1.25), Ct = 0.9 * I.width / B, Bt = r.pre ?? 1, Ve = r.bounce ?? 1, rt = r.settle ?? 1;
    if (Bt < 1) {
      let Re = Math.sin(Math.PI * Bt);
      Et *= 1 + 0.12 * Re, vt += Re * 0.16 * Ct;
    }
    if (Ve < 1) {
      let Re = (1 - Ve) * (1 - Ve);
      vt += Math.abs(Math.sin(2 * Math.PI * Ve)) * Re * 0.4 * Ct, wt[2] += 0.18 * Math.sin(2 * Math.PI * Ve) * Re;
    }
    let Mt = rt < 1 ? Math.sin(Math.PI * 2.5 * rt) * (1 - rt) * (1 - rt) : 0, _t = [0.05 * Mt, 0.022 * Mt, 0];
    for (let Re = 0; Re < 3; Re++) wt[Re] += _t[Re];
    return Et *= 1 + 0.01 * Mt, { cx: sn, cy: vt, sc: Et, scLetter: on, rot: wt, adjust: _t, lift: Math.sin(Math.PI * _e), time: c / 1e3, ppu: B, vw: x, vh: S, vhU: S / B, L: Ge, lampPos: r.lampPos, lamp: r.lamp || 0, lampR: 0.3 * S / B };
  }
  function Z(c = performance.now()) {
    let b = J(c);
    return { b, scene: qe(r.P, r, b) };
  }
  function ve() {
    if (!r) return null;
    let { b: c, scene: b } = Z();
    return Qe(b.active.P, b.active.st, c.ppu, c.vw, c.vh);
  }
  function we() {
    if (!r || r.P.stubX === null || r.P.torn || r.p < 0.95 || r.f > 0.01) return null;
    let { b: c, scene: b } = Z(), x = b.active.st, S = r.P, B = c.vw / 2 + x.cx * c.ppu, I = c.vh / 2 - x.cy * c.ppu;
    return { x0: B + S.stubX * x.sc * c.ppu, x1: B + S.half[0] * x.sc * c.ppu, y0: I - S.half[1] * x.sc * c.ppu, y1: I + S.half[1] * x.sc * c.ppu };
  }
  function Ee(c) {
    if (R = 0, !r || document.hidden || t.isLost() || r.rebuilding) return;
    if (!r.tw.length && !r.dragging && !r.lampMoving && !r.resume && r.tPrev && c - r.tPrev < 32) {
      R = requestAnimationFrame(Ee);
      return;
    }
    let b = r.resume ? 1 / 60 : Math.min(0.1, Math.max(0, (c - (r.tPrev || c)) / 1e3));
    r.resume = !1, r.tPrev = c;
    let x = dt(r, c);
    if (!r) return;
    let S = gt(r, b);
    r.lampMoving = S, r.P.burnPts && r.P.front0 > -0.5 && r.phase === "open" && r.destroy === void 0 && (r.burnOpen = Math.min(0.08, (r.burnOpen || 0) + b * 4e-3));
    let { b: B, scene: I } = Z(c);
    r.boxCache = Qe(I.active.P, I.active.st, B.ppu, B.vw, B.vh), ht(T, r, I, b), T.step(b), t.draw(I.items, I.shadow, T), r.pPrev = r.p;
    let D = I.active.st.front > -0.5 && !!I.active.P.burnPts;
    if (r.ashes && (T.n === 0 || c > r.ashesEnd)) {
      P();
      return;
    }
    (x || r.dragging || S || T.n > 0 || D || r.ashes) && (R = requestAnimationFrame(Ee));
  }
  function H() {
    !R && r && (r.resume = !0, R = requestAnimationFrame(Ee));
  }
  let Se = (c) => e.remember && !!pe.get("opened." + c, !1);
  function Oe(c) {
    if (r || !c.P) return;
    let b = c.P;
    z();
    let x = pe.get("opens." + b.cfg.id, 0) + 1;
    pe.set("opens." + b.cfg.id, x), b.hasRedaction && requestAnimationFrame(() => t.refreshPrint(b).then(H));
    let S = c.opened ? Ze(b) : 0;
    r = { P: b, ent: c, from: c.btn.getBoundingClientRect(), tf: 0, p: S, ext0: We(b, S), f: 0, tear: 0, tw: [], phase: "opening", dragging: !1, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 }, T.clear(), c.btn.classList.add("active"), o.style.display = "block", o.style.pointerEvents = "auto", i.classList.add("on"), a.classList.add("on"), a.setAttribute("aria-label", Ie[b.cfg.type].name), u.focus({ preventScroll: !0 }), f.hidden = b.stubX === null || b.torn, d.textContent = L(b.cfg.text) + (b.cfg.back ? " " + e.labels.back + " " + L(b.cfg.back) : "");
    let B = b.cfg.open === "drag", I = b.cfg.type === "envelope", D = () => {
      r && (r.phase = "open", B && r.p < 0.5 && p.classList.add("on"));
    };
    if (n)
      o.style.opacity = "0", requestAnimationFrame(() => {
        o.style.opacity = "1";
      }), r.tf = 1, r.phase = "open", B ? p.classList.add("on") : (ue(r, "p", 1, re * (I ? 1.6 : 1), Ne), le.play("uncrumple", re));
    else {
      r.pre = 0, r.arc = 0.24;
      let de = U * 0.55, xe = I ? oe * 1.85 : oe;
      if (ue(r, "pre", 1, U, me), ue(r, "tf", 1, C, Ut, de, D), !B) {
        let ye = () => {
          r && r.phase !== "closing" && (r.settle = 0, ue(r, "settle", 1, 0.9, me), H());
        };
        ue(r, "p", 1, xe, I ? ze : at(b), de + G, ye), le.play(I ? "seal" : "uncrumple", xe, de + G);
      }
    }
    b.front0 > -0.5 && le.play("fire", 2.5, 0.6), e.remember && pe.set("opened." + b.cfg.id, !0), De(c.btn, "open", { id: b.cfg.id, openings: x }), H();
    let { scene: ie } = Z();
    t.draw(ie.items, ie.shadow, T);
  }
  function nt() {
    !r || !r.burnOpen || (r.P.burned = Math.min(0.2, r.P.burned + r.burnOpen), pe.set("burned." + r.P.cfg.id, r.P.burned), r.burnOpen = 0);
  }
  function E() {
    if (!r || r.phase === "closing") return;
    if (r.P.cfg.burnAfterReading && r.p > 0.9 && r.phase === "open") {
      v();
      return;
    }
    nt(), r.phase = "closing", r.dragging = !1, r.lampOn = 0, r.from = r.ent.btn.getBoundingClientRect(), i.classList.remove("on"), a.classList.remove("on"), p.classList.remove("on"), o.style.pointerEvents = "none", r.tw = r.tw.filter((B) => B.key !== "settle"), r.settle = 1;
    let c = r.P.cfg.type === "envelope", b = Se(r.P.cfg.id) ? Ze(r.P) : 0;
    r.tf > 0.999 && (r.ext0 = We(r.P, b));
    let x = n ? 0.6 : c ? 1.9 : 0.85, S = x * Math.max(0.35, r.p - b);
    if (r.f > 0 && ue(r, "f", 0, 0.45, Be), r.p > b + 0.02 && le.play("crumple", S), ue(r, "p", b, S, c ? ze : it(r.P)), n) ue(r, "tf", 1, x, me, 0, P);
    else {
      r.tf > 0.999 && (r.arc = 0.34);
      let B = () => {
        r && (r.bounce = 0, ue(r, "bounce", 1, 0.36, me, 0, P));
      };
      ue(r, "tf", 0, 0.78, Ot, S * (c ? 0.8 : 0.5), B);
    }
    De(r.ent.btn, "close", { id: r.P.cfg.id }), H();
  }
  function v() {
    nt(), r.phase = "closing", r.dragging = !1, a.classList.remove("on"), p.classList.remove("on"), o.style.pointerEvents = "none", r.f > 0 && ue(r, "f", 0, 0.4, Be);
    let c = r.P.letter || r.P;
    r.destroy = Math.max(c.front0 > -0.5 ? c.front0 + c.burned : -0.06, -0.06), le.play("fire", 2.8), ue(r, "destroy", 1.6, n ? 1.2 : 2.6, me, 0, () => {
      if (!r) return;
      r.ashes = !0, r.ashesEnd = performance.now() + 3e3, i.classList.remove("on");
      let b = r.ent;
      pe.set("destroyed." + b.cfg.id, !0), b.destroyed = !0, De(b.btn, "burn", { id: b.cfg.id });
    }), H();
  }
  function P() {
    if (!r) return;
    let c = r.ent, b = !!r.ashes;
    r = null, T.clear(), i.classList.remove("on");
    let x = () => {
      r || (o.style.display = "none", o.style.opacity = ""), b ? (c.btn.hidden = !0, c.btn.classList.remove("active")) : (!r || r.ent !== c) && c.btn.classList.remove("active");
    };
    n ? (o.style.opacity = "0", setTimeout(x, 300)) : x(), d.textContent = "", b || c.btn.focus({ preventScroll: !0 }), ee(c);
  }
  function N() {
    !r || r.phase === "closing" || r.destroy !== void 0 || (le.play("flip"), ue(r, "f", r.f < 0.5 ? 1 : 0, 0.8, me), De(r.ent.btn, "flip", { id: r.P.cfg.id, back: r.f < 0.5 }), H());
  }
  function A() {
    !r || r.P.stubX === null || r.P.torn || r.tear > 0 || r.p < 0.95 || r.f > 0.01 || (le.play("tear"), De(r.ent.btn, "tear", { id: r.P.cfg.id }), f.hidden = !0, ue(r, "tear", 1, n ? 0.3 : 1, me, 0, () => {
      r && (r.P.torn = !0);
    }), H());
  }
  function F(c, b, x = {}) {
    let S = { btn: c, cfg: Ke(b), P: null, building: null, opts: x, opened: !1, off: [], io: null, gone: !1, madeImg: !1, madeLabel: !1 };
    return document.body ? Y(S) : document.addEventListener("DOMContentLoaded", () => Y(S), { once: !0 }), S;
  }
  function Y(c) {
    let { btn: b, cfg: x, opts: S } = c;
    k();
    let B = h.get(b);
    B && V(B);
    let I = g.find((ie) => ie.cfg.id === x.id);
    I && (console.warn(`crumple: id "${x.id}" is already attached, the previous paper is detached`), V(I)), g.push(c), h.set(b, c), b.classList.add("crumple-trigger"), b.getAttribute("aria-label") || (b.setAttribute("aria-label", e.labels.open), c.madeLabel = !0), pe.get("destroyed." + x.id, !1) && (b.hidden = !0, c.destroyed = !0), c.opened = Se(x.id), te(c.off, b, "click", async () => {
      await X(c) ? Oe(c) : q(c);
    });
    let D = b.querySelector("img");
    if (S.snapshot) {
      D || (D = document.createElement("img"), D.alt = "", b.appendChild(D), c.madeImg = !0), D.onerror = () => {
        c.opts = {}, D.onerror = null, $(c);
      }, D.src = c.opened && S.snapshotOpened ? S.snapshotOpened : S.snapshot;
      let ie = () => {
        K(() => X(c));
      };
      ["pointerenter", "focus", "touchstart"].forEach((de) => te(c.off, b, de, ie, { once: !0, passive: !0 })), te(c.off, b, "pointerdown", () => X(c), { passive: !0 });
    } else $(c);
  }
  function V(c) {
    c.gone = !0, c.off.splice(0).forEach((S) => S()), c.io && c.io.disconnect();
    let b = g.indexOf(c);
    b >= 0 && g.splice(b, 1);
    let x = O.indexOf(c);
    if (x >= 0 && O.splice(x, 1), r && r.ent === c && P(), c.P && (t.release(c.P), c.P = null), h.get(c.btn) === c && h.delete(c.btn), c.btn.classList.remove("crumple-trigger", "active", "recrumple"), c.madeLabel && c.btn.removeAttribute("aria-label"), c.madeImg) {
      let S = c.btn.querySelector("img");
      S && S.remove();
    }
  }
  function $(c) {
    if ("IntersectionObserver" in window) {
      let b = new IntersectionObserver((x) => x.forEach((S) => {
        S.isIntersecting && (b.disconnect(), K(() => X(c).then(() => ee(c))));
      }), { rootMargin: "600px 0px" });
      c.io = b, b.observe(c.btn);
    } else K(() => X(c).then(() => ee(c)));
  }
  let K = (c) => globalThis.requestIdleCallback ? requestIdleCallback(c, { timeout: 700 }) : setTimeout(c, 60), O = [], W = 0;
  function X(c) {
    if (c.P) {
      let b = O.indexOf(c);
      return b >= 0 && O.push(O.splice(b, 1)[0]), Promise.resolve(c.P);
    }
    return c.building ? c.building : c.building = Q(c);
  }
  async function Q(c) {
    let b = W;
    try {
      if (c.gone || !_() || t.isLost()) return null;
      let x = t, S = await x.build(c.cfg);
      if (b !== W) return null;
      if (c.gone)
        return x.release(S), null;
      for (c.P = S, O.push(c); O.length > e.maxBuilt; ) {
        let B = O.findIndex((D) => (!r || D !== r.ent) && D !== c);
        if (B < 0) break;
        let I = O.splice(B, 1)[0];
        !I.opts.snapshot && I.P && ee(I), I.P && x.release(I.P), I.P = null, I.building = null;
      }
      return c.P;
    } catch (x) {
      return console.warn("crumple: the paper could not be built, the CSS version is shown instead", x), null;
    } finally {
      b === W && (c.building = null);
    }
  }
  function fe() {
    W++;
    let c = O.splice(0);
    if (g.forEach((b) => {
      b.P = null, b.building = null;
    }), c.forEach((b) => X(b).then(() => ee(b))), r) {
      let b = r.ent;
      r.rebuilding = !0, X(b).then((x) => {
        !r || r.ent !== b || (x ? (r.P = x, r.rebuilding = !1, H()) : (r.ashes = !1, P()));
      });
    }
  }
  function ee(c) {
    if (c.destroyed || c.gone) return;
    c.opened = Se(c.cfg.id);
    let b = c.btn.querySelector("img");
    if (b || (b = document.createElement("img"), b.alt = "", c.btn.appendChild(b), c.madeImg = !0), c.opts.snapshot) {
      b.src = c.opened && c.opts.snapshotOpened ? c.opts.snapshotOpened : c.opts.snapshot;
      return;
    }
    c.P && t && (b.src = t.snapshot(c.P, c.opened));
  }
  function Me() {
    let c = !1;
    g.forEach((b) => {
      pe.remove("opened." + b.cfg.id), !(!b.opened || b.destroyed) && (c = !0, ee(b), b.btn.classList.remove("recrumple"), b.btn.offsetWidth, b.btn.classList.add("recrumple"));
    }), c && le.play("crumple", 0.9);
  }
  function he(c, b) {
    let x = !1;
    c.split(`
`).forEach((S, B) => {
      let I = S.startsWith("# ");
      B && !I && !x && b.append(`
`), x = I;
      let D = I ? S.slice(2) : S, ie = I ? document.createElement("span") : b;
      I && (ie.className = "crumple-h");
      let de = /~~([^~\n]+)~~(?:\{([^}\n]+)\})?|\[\[([^\]\n]+)\]\]/g, xe = 0, ye;
      for (; ye = de.exec(D); ) {
        if (ye.index > xe && ie.append(D.slice(xe, ye.index)), ye[3] !== void 0) {
          let ke = document.createElement("span");
          ke.className = "crumple-redact", ke.setAttribute("role", "img"), ke.setAttribute("aria-label", "redacted"), ke.style.width = Math.max(3, ye[3].length * 0.5) + "em", ie.append(ke);
        } else {
          let ke = document.createElement("del");
          if (ke.textContent = ye[1], ie.append(ke), ye[2] !== void 0) {
            let He = document.createElement("ins");
            He.textContent = ye[2], ie.append(He);
          }
        }
        xe = de.lastIndex;
      }
      xe < D.length && ie.append(D.slice(xe)), I && b.append(ie);
    });
  }
  function q(c) {
    k();
    let b = Ie[c.cfg.type], x = (I) => Math.round(b.color[I] * 255), S = document.createElement("div");
    if (S.className = "sheet", S.style.background = `rgb(${x(0)},${x(1)},${x(2)})`, S.style.fontFamily = `"${b.font}", "Courier Prime", monospace`, c.opts.snapshotOpened) {
      let I = document.createElement("img");
      I.src = c.opts.snapshotOpened, I.alt = "", S.appendChild(I);
    }
    he(c.cfg.text, S), c.cfg.back && (S.append(`

\u2014 ` + e.labels.back + ` \u2014
`), he(c.cfg.back, S));
    let B = document.createElement("button");
    B.type = "button", B.textContent = e.labels.close, B.addEventListener("click", ne), y.setAttribute("aria-label", b.name), y.replaceChildren(S, B), y.classList.add("on"), B.focus(), y.onclick = (I) => {
      I.target === y && ne();
    }, y._ent = c, De(c.btn, "open", { id: c.cfg.id, fallback: !0 });
  }
  function ne() {
    y.classList.remove("on"), y._ent && y._ent.btn.focus({ preventScroll: !0 });
  }
  function Te(c, b) {
    let x = [...b.querySelectorAll("button")].filter((D) => !D.hidden);
    if (!x.length) return;
    c.preventDefault();
    let S = x.indexOf(document.activeElement), B = x.length - 1, I = S < 0 ? 0 : c.shiftKey ? S === 0 ? B : S - 1 : S === B ? 0 : S + 1;
    x[I].focus({ preventScroll: !0 });
  }
  let Ye = (c) => !!c && (c.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(c.tagName));
  function Le() {
    o && (r = null, cancelAnimationFrame(R), R = 0, g.slice().forEach(V), O.length = 0, M.splice(0).forEach((c) => c()), t && t.destroy(), t = null, s = !1, m.remove(), [i, o, a, p, d, y].forEach((c) => c.remove()), i = o = a = p = d = y = null, T.clear());
  }
  return {
    // options: { labels, remember, motion: 'auto' | 'reduce' | 'full' ('reduced' still works), flashlight, maxBuilt }
    init(c = {}) {
      e = { ...e, ...c, labels: { ...tn, ...c.labels || {} } }, o && (l.textContent = e.labels.flip, f.textContent = e.labels.tear, u.textContent = e.labels.close, p.textContent = e.labels.hint), k(), n = Ue(e.motion), K(() => {
        o && _();
      });
    },
    attach: F,
    // detaches a trigger element, or the paper with that id
    detach(c) {
      let b = typeof c == "string" ? g.find((x) => x.cfg.id === c) : h.get(c);
      b && V(b);
    },
    destroy: Le,
    open: (c) => X(c).then((b) => b ? Oe(c) : q(c)),
    close: E,
    flip: N,
    tear: A,
    reset: Me,
    get reducedMotion() {
      return n;
    },
    get entries() {
      return g;
    },
    get isOpen() {
      return !!r;
    },
    // debugging/testing: draws a fixed frame (flight, unfold, flip, tear, burn front) of an attached paper
    async frame(c, b, x, S = 0, B = 0, I) {
      let D = g[c];
      await X(D), I !== void 0 && await t.ensureBurn(D.P), cancelAnimationFrame(R), R = 0, z(), r = { P: D.P, ent: D, from: D.btn.getBoundingClientRect(), tf: b, p: x, f: S, tear: B, tw: [], phase: "open", burnOpen: 0 }, I !== void 0 && (r.destroy = I), o.style.display = "block", i.classList.add("on"), g.forEach((de) => de.btn.classList.toggle("active", de === D));
      let { scene: ie } = Z();
      t.draw(ie.items, ie.shadow, null);
    },
    // debugging/testing: lights the flashlight at screen (x, y) and draws
    flashlight(c, b) {
      if (r) {
        et(r, c, b, o.clientWidth, o.clientHeight, o.clientHeight / (2 * Ae * Math.tan(Pe / 2)), !0), r.lampPos = r.lampGoal.slice(), r.lamp = 1;
        let { scene: x } = Z();
        t.draw(x.items, x.shadow, null);
      }
    },
    get debug() {
      return r ? { phase: r.phase, ashes: !!r.ashes, destroy: r.destroy, n: T.n, raf: R, tw: r.tw.map((c) => c.key), lampPos: r.lampPos, lamp: r.lamp } : null;
    }
  };
})();

// .build/stage.js
var nn = 1.5;
function zn(e, n = {}) {
  let t = { flashlight: !0, drag: !0, fit: 0.8, motion: "auto", ...n }, s, o = !1, i = Ue(t.motion);
  try {
    s = tt(e, { onRestore: C });
  } catch {
    s = null;
  }
  if (!s) return null;
  let a = (k, _, z, J, Z, ve, we) => ue(k, _, z, i ? J * 0.4 : J, Z, ve, we), l = null, f = 0, u = 0, p = null, d = "", y = null, m = [], w = bt(), g = { p: 1, f: 0, tear: 0, tw: [], dragging: !1, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 };
  function h() {
    let k = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(4e6 / Math.max(1, e.clientWidth * e.clientHeight))), _ = Math.round(e.clientWidth * k), z = Math.round(e.clientHeight * k);
    (e.width !== _ || e.height !== z) && (e.width = _, e.height = z);
  }
  function M(k) {
    let _ = e.clientWidth, z = e.clientHeight, J = z / (2 * Ae * Math.tan(Pe / 2)), Z = l.cfg.type === "envelope", ve = Z ? Math.min(t.fit * 0.69 * z / (l.T.body * J), 0.7 * _ / (l.w * J)) : Math.min(t.fit * z / (l.h * J), (t.fit + 0.06) * _ / (l.w * J)), we = l.letter ? Math.min(t.fit * z / (l.letter.h * J), (t.fit + 0.06) * _ / (l.letter.w * J)) : ve, Ee = ce(j(Z ? g.p * 2 : g.p)), H = [0, 0, -0.02];
    return { cx: 0, cy: 0, sc: ve, scLetter: we, rot: l.pose.map((Se, Oe) => Se * (1 - Ee) + H[Oe] * Ee), lift: 0, time: k / 1e3, ppu: J, vw: _, vh: z, vhU: z / J, L: Ge, lampPos: g.lampPos, lamp: g.lamp || 0, lampR: 0.3 * z / J };
  }
  let T = (k = performance.now()) => {
    let _ = M(k);
    return { b: _, scene: qe(l, g, _) };
  };
  function r(k) {
    if (f = 0, !l || document.hidden || o || s.isLost()) return;
    h();
    let _ = g.resume ? 1 / 60 : Math.min(0.05, Math.max(0, (k - (g.tPrev || k)) / 1e3));
    g.resume = !1, g.tPrev = k;
    let z = dt(g, k), J = gt(g, _), { scene: Z } = T(k);
    ht(w, g, Z, _), w.step(_), s.draw(Z.items, Z.shadow, w), g.pPrev = g.p, (z || g.dragging || J || w.n > 0 || Z.active.st.front > -0.5 && Z.active.P.burnPts) && (f = requestAnimationFrame(r));
  }
  let R = () => {
    !f && !o && (g.resume = !0, f = requestAnimationFrame(r));
  };
  function L() {
    if (!l) return null;
    let { b: k, scene: _ } = T(), z = e.getBoundingClientRect();
    return Qe(_.active.P, _.active.st, k.ppu, k.vw, k.vh, z.left, z.top);
  }
  t.drag && (d = e.style.touchAction, e.style.touchAction = "none", p = mt(e, { active: () => l ? g : null, box: L, outside: () => {
  }, redraw: R })), te(m, e, "dblclick", () => re.flip()), t.flashlight && (te(m, e, "pointermove", (k) => {
    if (!l || g.dragging || k.pointerType === "touch") return;
    let _ = L(), z = e.getBoundingClientRect(), J = !!_ && k.clientX > _.x0 - 30 && k.clientX < _.x1 + 30 && k.clientY > _.y0 - 30 && k.clientY < _.y1 + 30;
    et(g, k.clientX - z.left, k.clientY - z.top, e.clientWidth, e.clientHeight, e.clientHeight / (2 * Ae * Math.tan(Pe / 2)), J), R();
  }), te(m, e, "pointerleave", () => {
    g.lampOn = 0, R();
  })), te(m, window, "resize", () => R()), te(m, document, "visibilitychange", () => {
    document.hidden || R();
  });
  let U = je();
  U && t.motion === "auto" && te(m, U, "change", () => {
    i = Ue(t.motion);
  });
  function C() {
    let k = l && l.cfg, _ = g.p;
    l = null, k && re.set(k, { progress: _ }).catch((z) => console.warn("crumple: rebuild after context restore failed", z));
  }
  function G() {
    o || (o = !0, u++, cancelAnimationFrame(f), f = 0, m.splice(0).forEach((k) => k()), p && p(), t.drag && (e.style.touchAction = d), l && s.release(l), l = null, g.tw = [], w.clear(), s.destroy());
  }
  let oe = () => l.cfg.type === "envelope", re = {
    // builds a paper from a config and shows it (resolves with the paper, or null if a newer call replaced it)
    async set(k, { progress: _ } = {}) {
      if (o) return null;
      let z = ++u, J = await s.build(k);
      return z !== u || o ? (s.release(J), null) : (l && s.release(l), l = J, g.tear = 0, g.f = 0, l.torn = !1, delete g.destroy, _ !== void 0 && (g.tw = [], g.p = j(_)), w.clear(), R(), l);
    },
    crumple() {
      l && (le.play("crumple", 0.9), a(g, "p", 0, oe() ? 1.9 : 0.9, oe() ? ze : it(l)), R());
    },
    uncrumple() {
      l && (le.play(oe() ? "seal" : "uncrumple", 1.5), a(g, "p", 1, oe() ? nn * 1.85 : nn, oe() ? ze : at(l)), R());
    },
    toggle() {
      g.p > 0.5 ? re.crumple() : re.uncrumple();
    },
    // any time, except once the paper burns away; the side it shows is kept through crumple and unfold
    flip() {
      !l || g.destroy !== void 0 || (le.play("flip"), a(g, "f", g.f < 0.5 ? 1 : 0, 0.8, me), R());
    },
    tear() {
      !l || l.stubX === null || g.tear > 0 || g.p < 0.95 || (le.play("tear"), a(g, "tear", 1, 1, me, 0, () => {
        l.torn = !0;
      }), R());
    },
    restoreStub() {
      l && (g.tear = 0, l.torn = !1, R());
    },
    // resolves once the paper has its burn field (built on demand for any paper); a second call meanwhile does nothing,
    // and a paper replaced by set() meanwhile is not burnt
    async burn() {
      let k = l;
      if (!k || g.destroy !== void 0 || y === k) return;
      y = k;
      try {
        await s.ensureBurn(k);
      } finally {
        y === k && (y = null);
      }
      if (l !== k || g.destroy !== void 0) return;
      let _ = k.letter || k;
      le.play("fire", 2.6), g.destroy = Math.max(_.front0 > -0.5 ? _.front0 + _.burned : -0.06, -0.06), a(g, "destroy", 1.6, 2.6, me), R();
    },
    restore() {
      delete g.destroy, w.clear(), R();
    },
    setProgress(k) {
      g.tw = [], g.p = j(k), R();
    },
    // PNG of the current frame (draws and reads at once, no preserved buffer needed)
    png() {
      if (!l) return "";
      h();
      let { scene: k } = T();
      return s.draw(k.items, k.shadow, null), e.toDataURL("image/png");
    },
    snapshot(k, _, z) {
      return l ? s.snapshot(l, k, _, z) : "";
    },
    get state() {
      return g;
    },
    get paper() {
      return l;
    },
    destroy: G
  };
  return re;
}

// .build/index.js
var So = "1.0.0";
export {
  tt as Renderer,
  zt as SHAPES,
  Xt as STATES,
  Nn as Scene,
  le as Sound,
  zn as Stage,
  qt as TEXTS,
  Ie as TYPES,
  Fe as config,
  Ke as normalize,
  So as version
};
//# sourceMappingURL=crumple.esm.js.map
