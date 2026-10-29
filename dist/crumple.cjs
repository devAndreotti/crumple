var Pt = Object.defineProperty;
var En = Object.getOwnPropertyDescriptor;
var Mn = Object.getOwnPropertyNames;
var xn = Object.prototype.hasOwnProperty;
var Tn = (e, n) => {
  for (var t in n)
    Pt(e, t, { get: n[t], enumerable: !0 });
}, Rn = (e, n, t, s) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let o of Mn(n))
      !xn.call(e, o) && o !== t && Pt(e, o, { get: () => n[o], enumerable: !(s = En(n, o)) || s.enumerable });
  return e;
};
var Sn = (e) => Rn(Pt({}, "__esModule", { value: !0 }), e);

// .build/index.js
var to = {};
Tn(to, {
  CrumplePaper: () => at,
  Renderer: () => Ve,
  SHAPES: () => It,
  STATES: () => Ze,
  Scene: () => rt,
  Sound: () => ie,
  Stage: () => pn,
  TEXTS: () => Ct,
  TYPES: () => Se,
  config: () => Ae,
  normalize: () => Ye,
  registerPaperType: () => jt,
  registerWearState: () => Kt,
  version: () => eo
});
module.exports = Sn(to);

// .build/util.js
function le(e) {
  let n = Math.imul(e | 0, 2654435761) >>> 0 || 1;
  return () => (n ^= n << 13, n >>>= 0, n ^= n >>> 17, n ^= n << 5, n >>>= 0, n / 4294967296);
}
function Ce(e) {
  let n = (s, o) => {
    let i = Math.imul(s, 374761393) + Math.imul(o, 668265263) + Math.imul(e, 1442695041) | 0;
    return i = Math.imul(i ^ i >>> 13, 1274126177), ((i ^ i >>> 16) >>> 0) / 4294967296;
  }, t = (s, o) => {
    let i = Math.floor(s), a = Math.floor(o), l = s - i, f = o - a, u = l * l * (3 - 2 * l), p = f * f * (3 - 2 * f), m = n(i, a), g = n(i + 1, a), h = n(i, a + 1), v = n(i + 1, a + 1);
    return m + (g - m) * u + (h - m) * p + (m - g - h + v) * u * p;
  };
  return (s, o) => (t(s, o) * 0.5 + t(s * 2, o * 2) * 0.25 + t(s * 4, o * 4) * 0.125 + t(s * 8, o * 8) * 0.0625) / 0.9375;
}
var j = (e, n = 0, t = 1) => Math.min(t, Math.max(n, e)), ce = (e) => e * e * (3 - 2 * e), Je = (e, n, t) => e + (n - e) * t, Be = (e) => e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2, Ne = (e) => 1 - (1 - e) * (1 - e), Lt = (e) => 0.5 * ce(e) + 0.5 * Ne(e), me = (e) => e, Ht = (e) => 0.35 * ce(e) + 0.65 * (1 - Math.pow(1 - e, 3)), Vt = (e) => e * e * (1.6 - 0.6 * e), ze = (e) => 0.55 * e + 0.45 * ce(e), ut = (e) => e.F.shape === 0 ? (n) => 1 - Math.pow(1 - n, 2.3) : Lt, ct = (e) => e.F.shape === 0 ? (n) => 1 - Math.pow(1 - n, 2.2) : Be, Ae = {
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
}, de = {
  get(e, n) {
    try {
      let t = localStorage.getItem(Ae.storagePrefix + e);
      return t === null ? n : JSON.parse(t);
    } catch {
      return n;
    }
  },
  set(e, n) {
    try {
      localStorage.setItem(Ae.storagePrefix + e, JSON.stringify(n));
    } catch {
    }
  },
  remove(e) {
    try {
      localStorage.removeItem(Ae.storagePrefix + e);
    } catch {
    }
  }
}, be = (e, n, t) => {
  let s = document.createElement("canvas");
  return s.width = e, s.height = n, t && s.getContext("2d", { willReadFrequently: !0 }), s;
}, ae = (e, n) => `rgba(${e[0]},${e[1]},${e[2]},${n})`;
function Ue(e, n, t) {
  try {
    (e || document).dispatchEvent(new CustomEvent("crumple:" + n, { bubbles: !0, detail: t }));
  } catch {
  }
}
function We() {
  try {
    return matchMedia("(prefers-reduced-motion: reduce)");
  } catch {
    return null;
  }
}
function De(e) {
  if (e === "full") return !1;
  if (e === "reduce" || e === "reduced") return !0;
  let n = We();
  return !!n && n.matches;
}
function te(e, n, t, s, o) {
  n.addEventListener(t, s, o), e.push(() => n.removeEventListener(t, s, o));
}
var kn = { "Special Elite": "Special+Elite", "Courier Prime": "Courier+Prime:wght@400;700", Caveat: "Caveat:wght@500", VT323: "VT323", "Libre Baskerville": "Libre+Baskerville:ital,wght@0,400;0,700;1,400" }, At = {};
function $t(e) {
  return document.fonts ? Promise.all(e.map((n) => {
    if (!At[n]) {
      let t = kn[n], s = t ? "family=" + t.split(":")[0] : null, i = !t || !Ae.googleFonts || [...document.querySelectorAll("link[rel=stylesheet]")].some((a) => a.href.includes(s)) ? Promise.resolve() : new Promise((a) => {
        let l = document.createElement("link");
        l.rel = "stylesheet", l.href = "https://fonts.googleapis.com/css2?family=" + t + "&display=swap", l.onload = a, l.onerror = a, setTimeout(a, 4e3), document.head.appendChild(l);
      });
      At[n] = i.then(() => Promise.all(["", "bold ", "italic "].map((a) => document.fonts.load(`${a}40px "${n}"`).catch(() => null))));
    }
    return At[n];
  })) : Promise.resolve();
}
var Ft = {};
function ft(e) {
  return Ft[e] || (Ft[e] = new Promise((n) => {
    let t = new Image();
    t.crossOrigin = "anonymous", t.onload = () => t.decode ? t.decode().then(() => n(t), () => n(t)) : n(t), t.onerror = () => n(null), t.src = e;
  })), Ft[e];
}
var Xe = (e) => ft(Ae.assets + "textures/" + e + ".webp");
function qe(e) {
  try {
    typeof navigator < "u" && "vibrate" in navigator && navigator.vibrate(e);
  } catch {
  }
}

// .build/catalog.js
var Se = {
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
}, It = { ball: "Crumpled ball", flat: "Flattened crumple", quarters: "Folded in quarters", half: "Folded in half", thirds: "Folded in thirds (letter)", roll: "Rolled up", twist: "Twisted (candy wrapper)" }, Ze = { torn: "Torn", burnt: "Burnt", coffee: "Coffee stain", water: "Water stain", prints: "Dirty fingerprints", aged: "Aged", scribbled: "Scribbled", singed: "Singed", wine: "Wine stain", ink: "Ink blot", foxing: "Foxing", tape: "Tape", stamp: "Rubber stamp", faded: "Sun-faded" }, Pn = ["corner", "edge", "center", "spots"], Ct = {
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
}, An = `A. Reader
12 Paper Lane
Foldtown`, Bt = ["never", "again", "always", "not yet", "once more", "still"], dt = {};
function jt(e, n) {
  if (Se[e]) throw new Error(`Paper type "${e}" already exists`);
  Se[e] = n;
}
function Kt(e, n) {
  if (Ze[e]) throw new Error(`Wear state "${e}" already exists`);
  Ze[e] = n.name, n.apply && (dt[e] = n.apply);
}
var pt = (e, n) => Object.prototype.hasOwnProperty.call(e, n);
function Ye(e = {}) {
  let n = pt(Se, e.type) ? e.type : "typed", t = Se[n], s = {
    id: e.id || n,
    type: n,
    shape: n === "envelope" ? "envelope" : pt(It, e.shape) ? e.shape : t.shape,
    states: (Array.isArray(e.states) ? e.states : []).filter((o) => pt(Ze, o)),
    text: typeof e.text == "string" ? e.text : Ct[n] || "",
    back: typeof e.back == "string" ? e.back : "",
    seed: Number.isFinite(e.seed) ? Math.trunc(e.seed) : 7,
    // 0 is a valid seed (rng starts from 1 either way)
    open: e.open === "drag" ? "drag" : "auto",
    hiddenInk: typeof e.hiddenInk == "string" ? e.hiddenInk : "",
    burnAfterReading: !!e.burnAfterReading,
    burn: Pn.includes(e.burn) ? e.burn : "corner",
    image: e.image || "",
    address: typeof e.address == "string" ? e.address : An,
    letter: pt(Se, e.letter) && e.letter !== "envelope" ? e.letter : "typed",
    // the word of the 'stamp' state (drawn in capitals)
    stamp: typeof e.stamp == "string" && e.stamp.trim() ? e.stamp.trim() : "RECEIVED"
  };
  return e.rich && typeof e.rich == "object" && (s.rich = e.rich), s;
}

// .build/fields.js
function ht(e, n, t) {
  let s = le(e.seed), o = () => s() < 0.5 ? -1 : 1, i = e.w / 2, a = e.h / 2, l = new Float32Array(n * t), f = n / e.w, u = t / e.h, p = (d, E, x, r, R, I) => {
    I === void 0 && (I = s() * Math.PI), r === void 0 && (r = (s() * 2 - 1) * i, R = (s() * 2 - 1) * a);
    let D = Math.cos(I), C = Math.sin(I), Y = Math.abs(D) * d + E, oe = Math.abs(C) * d + E, re = Math.max(0, Math.floor((r - Y + i) * f)), k = Math.min(n - 1, Math.ceil((r + Y + i) * f)), _ = Math.max(0, Math.floor((R - oe + a) * u)), z = Math.min(t - 1, Math.ceil((R + oe + a) * u)), J = Math.min(0.08, d);
    for (let W = _; W <= z; W++) {
      let ve = (W + 0.5) / u - a - R;
      for (let we = re; we <= k; we++) {
        let Ee = (we + 0.5) / f - i - r, H = Math.abs(-Ee * C + ve * D);
        if (H >= E) continue;
        let ke = Math.abs(Ee * D + ve * C);
        ke >= d || (l[W * n + we] += x * (1 - H / E) * Math.min(1, (d - ke) / J));
      }
    }
  }, m = e.shape === "quarters" || e.shape === "half" || e.shape === "thirds", g = m ? 0.18 : e.shape === "roll" ? 0.45 : e.shape === "twist" ? 0.55 : 1, h = m ? 0.35 : e.shape === "roll" || e.shape === "twist" ? 0.6 : 1;
  e.card && (g *= 0.5, h *= 0.5), e.shape === "envelope" && (g = 0.08, h = 0.25);
  let v = e.w * e.h / (0.84 * 1.1);
  for (let d = 0; d < Math.round(8 * g * v); d++) p(2, 0.08 + s() * 0.1, o() * (0.8 + s() * 0.4) * h);
  for (let d = 0; d < Math.round(46 * g * v); d++) p(0.1 + s() * 0.28, 0.035 + s() * 0.05, o() * (0.45 + s() * 0.4) * h);
  for (let d = 0; d < Math.round(150 * g * v); d++) p(0.03 + s() * 0.1, 0.01 + s() * 0.025, o() * (0.2 + s() * 0.35) * h);
  if (e.shape === "twist")
    for (let d of [-1, 1]) for (let E = 0; E < 26; E++) p(0.12 + s() * 0.3, 0.012 + s() * 0.02, o() * (0.5 + s() * 0.5), d * i * (0.6 + s() * 0.36), (s() * 2 - 1) * a, Math.PI / 2 + d * (0.5 + s() * 0.35));
  (e.shape === "half" || e.shape === "quarters") && p(2, 0.022, 0.6, 0, 0, Math.PI / 2), e.shape === "quarters" && p(2, 0.022, -0.55, 0, 0, 0), e.shape === "thirds" && (p(2, 0.02, 0.55, 0, -e.h / 6 * 1.08, 0), p(2, 0.02, -0.55, 0, e.h / 6, 0)), e.shape === "envelope" && p(2, 0.02, 0.5, 0, e.foldY, 0);
  let b = 1e-6;
  for (let d = 0; d < l.length; d++) Math.abs(l[d]) > b && (b = Math.abs(l[d]));
  for (let d = 0; d < l.length; d++) l[d] /= b;
  return l;
}
function mt(e, n, t) {
  let s = Ce(e.seed * 7 + 11), o = le(e.seed * 5 + 3), i = Math.hypot(n, t), a = new Float32Array(n * t), l = (u) => {
    for (let p = 0; p < t; p++) for (let m = 0; m < n; m++) a[p * n + m] = u(m, p);
  }, f = e.form || "corner";
  if (f === "edge") {
    let u = Math.floor(o() * 3);
    l((p, m) => (u === 0 ? t - m : u === 1 ? p : n - p) / (i * 1.6) + (s(p * 0.05, m * 0.05) - 0.5) * 0.35);
  } else if (f === "center") {
    let u = n * (0.3 + 0.4 * o()), p = t * (0.3 + 0.4 * o());
    l((m, g) => Math.hypot(m - u, g - p) / (i * 0.7) + (s(m * 0.04, g * 0.04) - 0.5) * 0.3);
  } else if (f === "spots") {
    let u = 3 + Math.floor(o() * 4), p = [];
    for (let m = 0; m < 200 && p.length < u; m++) {
      let g = n * (0.12 + 0.76 * o()), h = t * (0.12 + 0.76 * o());
      p.every((v) => Math.hypot(v[0] - g, v[1] - h) > i * 0.2) && p.push([g, h]);
    }
    l((m, g) => {
      let h = 1 / 0;
      return p.forEach((v) => {
        h = Math.min(h, Math.hypot(m - v[0], g - v[1]));
      }), h / (i * 0.5) + (s(m * 0.05, g * 0.05) - 0.5) * 0.1;
    });
  } else if (f === "singed")
    l((u, p) => Math.min(u, n - 1 - u, p, t - 1 - p) / (i * 0.5) + (s(u * 0.03, p * 0.03) - 0.5) * 0.12);
  else {
    let u = e.seed % 4, p = u & 1 ? n : 0, m = u & 2 ? t : 0;
    l((g, h) => Math.sqrt((g - p) * (g - p) + (h - m) * (h - m)) / i + (s(g * 0.02, h * 0.02) - 0.5) * 0.32);
  }
  return a;
}

// .build/worker.js
var bt = /* @__PURE__ */ (() => {
  let e, n = 0, t = /* @__PURE__ */ new Map();
  function s() {
    try {
      let i = [le, Ce, ht, mt].map((a) => a.toString()).join(`
`) + `
onmessage = (e) => { const { id, name, args } = e.data; const r = name === 'creases' ? ${ht.name}(...args) : ${mt.name}(...args); postMessage({ id, r }, [r.buffer]); };`;
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
  let o = (i, a) => i === "creases" ? ht(...a) : mt(...a);
  return {
    run(i, a) {
      if (e === void 0 && s(), !e) return Promise.resolve(o(i, a));
      let l = ++n, f = new Promise((p) => {
        let m = (g) => p(g);
        m.redo = () => p(o(i, a)), t.set(l, m);
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
var gt = 1070;
function Fn(e) {
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
var Ln = (e, n, t) => `${n && !e.hand ? "bold " : ""}${Math.round(t)}px "${e.font}", "Courier Prime", monospace`, In = (e) => [e[0] + (200 - e[0]) * 0.4 + 8, e[1] + (170 - e[1]) * 0.3 + 4, e[2] + (120 - e[2]) * 0.3 - 4].map(Math.round);
function Cn(e, n, t, s, o, i, a) {
  let l = Fn(s), f = n.states.includes("faded") ? In(t.ink) : t.ink;
  if (n.states.includes("scribbled") && !l.some((d) => d.toks.some((E) => E.kind === "strike"))) {
    let d = [];
    l.forEach((E) => E.toks.forEach((x) => {
      x.kind === "w" && x.t.replace(/\W/g, "").length >= 4 && d.push(x);
    }));
    for (let E = 0; E < 2 && d.length; E++) {
      let x = d.splice(Math.floor(a() * d.length), 1)[0];
      x.kind = "strike", x.fix = Bt[Math.floor(a() * Bt.length)];
    }
  }
  let u = j(1 - i * 0.34), p = o.cols || 1, m = (o.w - (p - 1) * 40) / p, g = 0, h = o.y, v = o.y + o.h, b = Ce(n.seed + 5);
  return l.forEach((d) => {
    let E = d.head ? t.size * (o.headK || 1.35) : t.size, x = d.head ? t.lineHeight * (o.headK || 1.35) : t.lineHeight;
    e.font = Ln(t, d.head, E);
    let r = e.measureText(" ").width, R = d.head && o.headFull ? o.w : m, I = [[]], D = 0;
    if (d.toks.forEach((C) => {
      let Y = e.measureText(C.t).width;
      D > 0 && D + r + Y > R && (I.push([]), D = 0), I[I.length - 1].push({ ...C, tw: Y }), D += (D > 0 ? r : 0) + Y;
    }), !d.toks.length) {
      h += x * 0.7;
      return;
    }
    I.forEach((C) => {
      h > v && g < p - 1 && !(d.head && o.headFull) && (g++, h = o.colY || o.y);
      let Y = C.reduce((k, _) => k + _.tw, 0) + r * (C.length - 1), oe = o.x + (d.head && o.headFull ? 0 : g * (m + 40)), re = o.center || d.head && o.centerHead ? oe + (R - Y) / 2 : oe;
      C.forEach((k) => {
        Bn(e, t, k, re, h, f, a, b), k.kind === "strike" && _n(e, k, re, h, E, a), k.kind === "redact" && (e.fillStyle = `rgba(12,12,14,${u})`, e.fillRect(re - 5, h - E * 0.82, k.tw + 10, E * 1.06)), re += k.tw + r;
      }), h += x;
    }), d.head && o.headFull && (o.colY = h + 10);
  }), h;
}
function Bn(e, n, t, s, o, i, a, l) {
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
function _n(e, n, t, s, o, i) {
  e.save(), e.strokeStyle = "rgba(165,28,30,0.85)", e.lineWidth = Math.max(2.5, o * 0.08), e.lineCap = "round";
  for (let a = 0; a < 2; a++) {
    e.beginPath();
    let l = s - o * (0.3 + 0.08 * a);
    e.moveTo(t - 4, l + (i() - 0.5) * 4), e.quadraticCurveTo(t + n.tw / 2, l + (i() - 0.5) * 8, t + n.tw + 4, l + (i() - 0.5) * 4), e.stroke();
  }
  n.fix && (e.fillStyle = "rgba(165,28,30,0.9)", e.font = `${Math.round(o * 0.62)}px "Caveat", cursive`, e.translate(t + n.tw * 0.25, s - o * 0.66), e.rotate(-0.06), e.fillText(n.fix, 0, 0)), e.restore();
}
function Qt(e, n, t, s, o, i, a = 6) {
  let l = Math.ceil(o / a), f = Math.ceil(i / a), u = be(l, f, !0), p = u.getContext("2d"), m = Math.max(l / n.width, f / n.height);
  p.drawImage(n, (l - n.width * m) / 2, (f - n.height * m) / 2, n.width * m, n.height * m);
  let g = p.getImageData(0, 0, l, f).data;
  e.fillStyle = "rgba(20,20,20,0.88)";
  for (let h = 0; h < f; h++) for (let v = 0; v < l; v++) {
    let b = (h * l + v) * 4, d = (g[b] * 0.3 + g[b + 1] * 0.59 + g[b + 2] * 0.11) / 255, E = a * 0.56 * Math.sqrt(1 - d);
    E > 0.35 && (e.beginPath(), e.arc(t + (v + 0.5) * a, s + (h + 0.5) * a, E, 0, Math.PI * 2), e.fill());
  }
}
function Un(e, n, t) {
  let s = [], o = "";
  return n.split(" ").forEach((i) => {
    let a = o ? o + " " + i : i;
    e.measureText(a).width > t && o ? (s.push(o), o = i) : o = a;
  }), o && s.push(o), s;
}
var Jt = {
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
    if (e.fillStyle = "rgba(40,40,40,0.12)", e.fillRect(a, l, f, u), i.photo) Qt(e, i.photo, a, l, f, u);
    else
      for (let p = l + 4; p < l + u; p += 7) for (let m = a + 4; m < a + f; m += 7) {
        let g = 0.5 + 0.5 * Math.sin(m * 0.02) * Math.cos(p * 0.025);
        e.fillStyle = `rgba(20,20,20,${0.55 * g})`, e.beginPath(), e.arc(m, p, 1.2 + 2 * g, 0, Math.PI * 2), e.fill();
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
      let m = e.createRadialGradient(a + l / 2, a + l / 2, l * 0.25, a + l / 2, a + l / 2, l * 0.75);
      m.addColorStop(0, "rgba(0,0,0,0)"), m.addColorStop(1, "rgba(0,0,0,0.45)"), e.fillStyle = m, e.fillRect(a, a, l, l), e.restore();
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
function Dn(e, n, t, s, o, i) {
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
var On = [
  ["FOR RENT", "quiet room near the park, morning light. Ask at the front desk."],
  ["FOR SALE", "vintage typewriter, works fine, missing the letter Q."],
  ["WANTED", "night watchman for the old warehouse on the pier."],
  ["FOUND", "small brass key with a red tag. Claim at the bakery."],
  ["LOST", "grey cat, answers to Pixel. Reward offered."],
  ["REPAIRS", "radios and record players, evenings only."],
  ["SWAP", "bicycle bell for anything that does not squeak."]
];
function Nn(e, n, t, s) {
  let a = (n - 88 - 26) / 2;
  e.fillStyle = "rgba(25,25,25,0.9)", e.font = 'bold 34px "Libre Baskerville"', e.fillText("CLASSIFIEDS", 44, 92), e.fillRect(40, 108, n - 88 + 8, 3);
  let l = 44 + a + 26, f = 132, u = Math.round(a * 0.68);
  s.photo && Qt(e, s.photo, l, f, a, u), e.font = 'italic 16px "Libre Baskerville"', e.fillText("Old town, archive photo.", l, f + u + 22);
  let p = t - 60, m = [150, f + u + 60], g = 0, h = 44, v = m[0];
  for (let [b, d] of On) {
    e.font = '18px "Libre Baskerville"';
    let E = Un(e, b + " " + d, a);
    if (v + E.length * 24 > p && (g === 1 || (g = 1, h = l, v = m[1], v + E.length * 24 > p)))
      break;
    E.forEach((x, r) => {
      if (r === 0) {
        e.font = 'bold 19px "Libre Baskerville"', e.fillText(b, h, v);
        let R = e.measureText(b + " ").width;
        e.font = '18px "Libre Baskerville"', e.fillText(x.slice(b.length + 1), h + R, v);
      } else
        e.font = '18px "Libre Baskerville"', e.fillText(x, h, v);
      v += 24;
    }), v += 16;
  }
}
var Wt = {
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
async function zn(e, n, t, s = "") {
  if (typeof Blob > "u" || typeof URL > "u" || !URL.createObjectURL) return null;
  let o = `<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${t}">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;box-sizing:border-box;margin:0;padding:0;overflow:hidden;${s}">
        ${e}
      </div>
    </foreignObject>
  </svg>`, i = new Blob([o], { type: "image/svg+xml;charset=utf-8" }), a = URL.createObjectURL(i), l = new Image();
  return new Promise((f) => {
    l.onload = () => {
      URL.revokeObjectURL(a), f(l);
    }, l.onerror = () => {
      URL.revokeObjectURL(a), f(null);
    }, l.src = a;
  });
}
async function Qe(e, n, t, s) {
  let o = Math.round(n.w * gt), i = Math.round(n.h * gt), a = be(o, i), l = a.getContext("2d"), f = t === "front", u = le(e.seed * 31 + (f ? 5 : 9)), p = {};
  n.photo && f && (p.img = await ft(e.image || Ae.assets + "photos/sunset.webp")), e.type === "newspaper" && (f || !e.back) && (p.photo = await ft(Ae.assets + "photos/" + (f ? "sea" : "city") + ".webp"));
  let m = e.type === "notebook" || e.type === "form";
  Jt[e.type] && (f || m) && Jt[e.type](l, o, i, n, e, p), e.type === "envelope" && !f && Dn(l, o, i, n, e, u), e.type === "newspaper" && !f && !e.back && Nn(l, o, i, p);
  let g = e.type === "envelope" ? "" : f ? e.text : e.back, h = f ? Wt[e.type] ? Wt[e.type](o, i, n) : { x: 50, y: 50, w: o - 100, h: i - 100 } : { x: Math.round(n.x * 0.8), y: Math.min(n.y, Math.round(i * 0.28)), w: o - Math.round(n.x * 1.6), h: i - Math.min(n.y, Math.round(i * 0.28)) - 40, center: e.type === "ticket" };
  e.type === "ticket" && !f && (h.x = Math.round(o * 0.55), h.w = Math.round(o * 0.4)), e.type === "polaroid" && !f && (h = { x: 60, y: Math.round(i * 0.3), w: o - 120, h: i * 0.6, center: !0 });
  let v = g && h ? Cn(l, e, n, g, h, s, u) : 0;
  if (f && e.rich && h) {
    if (e.rich.mode === "canvas" && typeof e.rich.body == "function")
      try {
        await e.rich.body(l, h, o, i);
      } catch {
      }
    else if (typeof e.rich.body == "string")
      try {
        let d = await zn(e.rich.body, h.w, h.h, e.rich.style || "");
        d && l.drawImage(d, h.x, h.y);
      } catch {
      }
  }
  let b = le(e.seed * 17 + (f ? 1 : 2));
  e.states.includes("coffee") && await Yn(a, l, o, i, e, f), e.states.includes("water") && await Xn(l, o, i, e, f), e.states.includes("prints") && await qn(l, o, i, e, f), e.states.includes("wine") && await Hn(a, l, o, i, e, f), e.states.includes("ink") && $n(l, o, i, e, f), e.states.includes("aged") && Gn(l, o, i, b), e.states.includes("faded") && jn(l, o, i, e), e.states.includes("foxing") && Kn(l, o, i, e);
  for (let d of e.states)
    if (dt[d])
      try {
        await dt[d](l, a, o, i, e, f, b);
      } catch {
      }
  return f && e.states.includes("stamp") && Jn(l, o, i, e, v), f && e.states.includes("tape") && Wn(l, o, i, e), a;
}
function Ut(e, n, t, s, o, i, a, l) {
  e.save(), e.globalCompositeOperation = "multiply", e.globalAlpha = a, e.translate(t, s), l || e.scale(-1, 1), e.rotate(i), e.drawImage(n, -o / 2, -o / 2, o, o), e.restore();
}
async function Xn(e, n, t, s, o) {
  let i = await Xe("water");
  if (!i) return;
  let a = le(s.seed * 23 + 4), l = n * (0.25 + 0.5 * a()), f = t * (0.25 + 0.5 * a()), u = Math.min(n, t) * (0.8 + 0.35 * a()), p = a() * Math.PI * 2;
  Ut(e, i, o ? l : n - l, f, u, p, o ? 0.85 : 0.6, o);
}
async function qn(e, n, t, s, o) {
  let i = await Xe("prints");
  if (!i) return;
  let a = le(s.seed * 29 + 6);
  for (let l = 0; l < 2; l++) {
    let f = n * (l ? 0.86 - 0.08 * a() : 0.1 + 0.12 * a()), u = t * (0.72 + 0.2 * a()), p = Math.min(n, t) * (0.22 + 0.08 * a()), m = a() * Math.PI * 2;
    Ut(e, i, o ? f : n - f, u, p, m, o ? 0.6 : 0.4, o);
  }
}
async function Yn(e, n, t, s, o, i) {
  let a = le(o.seed * 17 + 1), l = t * (0.3 + 0.4 * a()), f = s * (0.35 + 0.35 * a()), u = Math.min(t, s) * (0.13 + 0.07 * a()), p = a() * Math.PI * 2, m = i ? l : t - l, g = await Xe("coffee");
  if (i) {
    let v = be(t, s);
    v.getContext("2d").drawImage(e, 0, 0), n.save(), n.beginPath(), n.arc(m, f, u * 1.02, 0, Math.PI * 2), n.clip(), n.clearRect(m - u * 1.1, f - u * 1.1, u * 2.2, u * 2.2), n.filter = "blur(2.5px)", n.globalAlpha = 0.85, n.drawImage(v, 0, 0), n.restore();
  }
  if (g) {
    Ut(n, g, m, f, u * 3.4, p, i ? 0.95 : 0.55, i);
    return;
  }
  n.save();
  let h = n.createRadialGradient(m, f, u * 0.1, m, f, u);
  h.addColorStop(0, "rgba(140,95,45,0.10)"), h.addColorStop(0.82, "rgba(125,82,36,0.17)"), h.addColorStop(1, "rgba(110,70,30,0)"), n.fillStyle = h, n.beginPath(), n.arc(m, f, u, 0, Math.PI * 2), n.fill();
  for (let v = 0; v < 3; v++) {
    n.strokeStyle = `rgba(100,62,26,${0.2 + 0.12 * a()})`, n.lineWidth = u * (0.03 + 0.03 * a()), n.beginPath();
    let b = a() * 6.28, d = u * (0.9 + 0.05 * v);
    for (let E = 0; E <= Math.PI * 2 + 0.01; E += 0.05) {
      let x = d * (1 + 0.025 * Math.sin(E * 5 + b) + 0.015 * Math.sin(E * 11 + b * 2));
      E === 0 ? n.moveTo(m + Math.cos(E) * x, f + Math.sin(E) * x) : n.lineTo(m + Math.cos(E) * x, f + Math.sin(E) * x);
    }
    n.stroke();
  }
  for (let v = 0; v < 3; v++) {
    let b = m + (a() - 0.5) * u * 1.2, d = u * (0.6 + a() * 1.2), E = n.createLinearGradient(0, f + u * 0.6, 0, f + u * 0.6 + d);
    E.addColorStop(0, "rgba(115,75,32,0.16)"), E.addColorStop(1, "rgba(115,75,32,0)"), n.fillStyle = E, n.fillRect(b - 5, f + u * 0.6, 9 + a() * 6, d);
  }
  n.restore();
}
function Gn(e, n, t, s) {
  e.save(), e.fillStyle = "rgba(150,110,45,0.08)", e.fillRect(0, 0, n, t);
  let o = e.createRadialGradient(n / 2, t / 2, Math.min(n, t) * 0.3, n / 2, t / 2, Math.max(n, t) * 0.75);
  o.addColorStop(0, "rgba(120,80,30,0)"), o.addColorStop(1, "rgba(120,80,30,0.28)"), e.fillStyle = o, e.fillRect(0, 0, n, t);
  for (let i = 0; i < 34; i++) {
    let a = s() * n, l = s() * t, f = 3 + s() * 14, u = e.createRadialGradient(a, l, 0, a, l, f);
    u.addColorStop(0, `rgba(125,85,40,${0.12 + s() * 0.2})`), u.addColorStop(1, "rgba(125,85,40,0)"), e.fillStyle = u, e.beginPath(), e.arc(a, l, f, 0, Math.PI * 2), e.fill();
  }
  e.restore();
}
async function Hn(e, n, t, s, o, i) {
  let a = le(o.seed * 43 + 3), l = t * (0.3 + 0.4 * a()), f = s * (0.4 + 0.3 * a()), u = Math.min(t, s) * (0.1 + 0.04 * a()), p = i ? l : t - l, m = i ? 1 : 0.5;
  if (i) {
    let h = be(t, s);
    h.getContext("2d").drawImage(e, 0, 0), n.save(), n.beginPath(), n.arc(p, f, u * 1.04, 0, Math.PI * 2), n.clip(), n.clearRect(p - u * 1.1, f - u * 1.1, u * 2.2, u * 2.2), n.filter = "blur(2px)", n.globalAlpha = 0.8, n.drawImage(h, 0, 0), n.restore();
  }
  n.save(), n.globalCompositeOperation = "multiply";
  let g = n.createRadialGradient(p, f, u * 0.2, p, f, u * 1.05);
  g.addColorStop(0, `rgba(120,14,38,${0.03 * m})`), g.addColorStop(0.8, `rgba(120,14,38,${0.1 * m})`), g.addColorStop(1, "rgba(90,8,28,0)"), n.fillStyle = g, n.beginPath(), n.arc(p, f, u * 1.05, 0, Math.PI * 2), n.fill(), n.lineCap = "round", n.filter = "blur(0.8px)";
  for (let h = 0; h < 2; h++) {
    let v = a() * 6.28, b = 3.4 + a() * 1.4, d = u * (0.94 + 0.12 * h + 0.03 * a()), E = a() * 6.28, x = (r, R) => {
      let I = (d - R) * (1 + 0.025 * Math.sin(r * 5 + E) + 0.012 * Math.sin(r * 9 + E * 2));
      return [p + Math.cos(r) * I, f + Math.sin(r) * I];
    };
    [[u * 0.22, 0.07, 0.04], [u * 0.07, 0.4, 0], [u * 0.03, 0.16, u * 0.06]].forEach(([r, R, I]) => {
      n.strokeStyle = `rgba(96,12,36,${R * m})`, n.lineWidth = r, n.beginPath();
      for (let D = 0, C = v; C <= v + b; D++, C += 0.04) {
        let Y = x(C, I);
        D ? n.lineTo(Y[0], Y[1]) : n.moveTo(Y[0], Y[1]);
      }
      n.stroke();
    });
  }
  n.filter = "none";
  for (let h = 0, v = 4 + Math.floor(a() * 4); h < v; h++) {
    let b = a() * 6.28, d = u * (1.35 + a() * 1.1), E = u * (0.02 + 0.035 * a());
    n.fillStyle = `rgba(104,10,30,${0.45 * m})`, n.beginPath(), n.arc(p + Math.cos(b) * d, f + Math.sin(b) * d, E, 0, Math.PI * 2), n.fill(), h % 2 && (n.beginPath(), n.arc(p + Math.cos(b + 0.2) * d * 1.12, f + Math.sin(b + 0.2) * d * 1.12, E * 0.35, 0, Math.PI * 2), n.fill());
  }
  n.restore();
}
function Vn(e, n) {
  let t = [1, 2, 3, 5, 7, 11].map((o) => [o, e() * 6.28, (0.06 + 0.14 * e()) * 2 / o]), s = [];
  for (let o = 0; o < 40; o++) {
    let i = o / 40 * Math.PI * 2, a = 1;
    t.forEach(([l, f, u]) => {
      a += u * Math.sin(l * i + f);
    }), s.push([Math.cos(i) * n * a, Math.sin(i) * n * a]);
  }
  return s;
}
function _t(e, n, t, s, o) {
  e.beginPath(), n.forEach((i, a) => {
    a ? e.lineTo(t + i[0] * o, s + i[1] * o) : e.moveTo(t + i[0] * o, s + i[1] * o);
  }), e.closePath(), e.fill();
}
function $n(e, n, t, s, o) {
  let i = le(s.seed * 47 + 5), a = Math.min(n, t), l = n * (0.2 + 0.6 * i()), f = t * (0.2 + 0.6 * i()), u = a * (0.03 + 0.015 * i()), p = o ? l : n - l, m = o ? 1 : 0.5, g = [16, 22, 58], h = Vn(i, u);
  e.save(), e.fillStyle = ae(g, 0.07 * m), _t(e, h, p, f, 1.45), _t(e, h, p, f, 1.22), e.fillStyle = ae(g, 0.86 * m), e.filter = "blur(0.5px)", _t(e, h, p, f, 1), e.filter = "none", e.fillStyle = ae(g, 0.86 * m);
  for (let R = 0, I = 6 + Math.floor(i() * 5); R < I; R++) {
    let D = i() * 6.28, C = u * (1.5 + 2.4 * i()), Y = u * (0.16 + 0.14 * i()) * (1.6 - C / (u * 4));
    e.beginPath(), e.arc(p + Math.cos(D) * C, f + Math.sin(D) * C, Math.max(Y, 0.8), 0, Math.PI * 2), e.fill();
  }
  let v = i() * 6.28, b = u * (1.6 + 1.2 * i()), d = Math.cos(v), E = Math.sin(v), x = [], r = [];
  for (let R = 0; R <= 10; R++) {
    let I = R / 10, D = u * 0.42 * Math.pow(1 - I, 1.3) * (0.85 + 0.3 * i()), C = u * 0.7 + b * I;
    x.push([d * C - E * D, E * C + d * D]), r.push([d * C + E * D, E * C - d * D]);
  }
  e.fillStyle = ae(g, 0.6 * m), e.beginPath(), x.concat(r.reverse()).forEach((R, I) => {
    I ? e.lineTo(p + R[0], f + R[1]) : e.moveTo(p + R[0], f + R[1]);
  }), e.closePath(), e.fill(), e.strokeStyle = ae(g, 0.28 * m), e.lineWidth = 0.9, e.lineCap = "round";
  for (let R = 0; R < 18; R++) {
    let I = i() * 6.28, D = u * (0.95 + 0.1 * i()), C = D + u * (0.3 + 0.9 * i());
    e.beginPath(), e.moveTo(p + Math.cos(I) * D, f + Math.sin(I) * D), e.lineTo(p + Math.cos(I + 0.05) * C, f + Math.sin(I + 0.05) * C), e.stroke();
  }
  e.restore();
}
function jn(e, n, t, s) {
  let o = le(s.seed * 41 + 2), i = Ce(s.seed + 19), a = o() * Math.PI * 2, l = Math.cos(a), f = Math.sin(a), u = 96, p = Math.round(u * t / n), m = be(u, p, !0), g = m.getContext("2d"), h = g.createImageData(u, p), v = h.data;
  for (let b = 0; b < p; b++) for (let d = 0; d < u; d++) {
    let E = j((d / u - 0.5) * l + (b / p - 0.5) * f + 0.5), x = Math.pow(E, 2.4) * (0.45 + 0.55 * i(d * 0.12, b * 0.12)), r = (b * u + d) * 4;
    v[r] = 165, v[r + 1] = 112, v[r + 2] = 45, v[r + 3] = Math.round(255 * 0.42 * x);
  }
  g.putImageData(h, 0, 0), e.save(), e.imageSmoothingQuality = "high", e.drawImage(m, 0, 0, n, t), e.restore();
}
function Kn(e, n, t, s) {
  let o = le(s.seed * 61 + 11), i = Math.min(n, t) / 900, a = [[150, 78, 30], [170, 96, 40], [128, 62, 24]];
  e.save(), e.globalCompositeOperation = "multiply";
  for (let l = 0, f = 0; l < 150 && f < 900; f++) {
    let u = o() * n, p = o() * t, m = Math.max(Math.abs(u / n - 0.5), Math.abs(p / t - 0.5)) * 2;
    if (o() > 0.15 + 0.85 * m * m * m) continue;
    l++;
    let g = o() < 0.4, h = i * (g ? 4 + Math.pow(o(), 1.5) * 15 : 1 + Math.pow(o(), 2) * 5), v = a[Math.floor(o() * 3)], b = 0.34 + 0.4 * o(), d = e.createRadialGradient(0, 0, h * (g ? 0 : 0.55), 0, 0, h);
    g ? (d.addColorStop(0, ae(v, b * 0.6)), d.addColorStop(0.55, ae(v, b * 0.4)), d.addColorStop(1, ae(v, 0))) : (d.addColorStop(0, ae(v, b * 0.7)), d.addColorStop(0.85, ae(v, b * 0.8)), d.addColorStop(0.97, ae(v, b * 1.15)), d.addColorStop(1, ae(v, 0))), e.save(), e.translate(u, p), e.rotate(o() * 3.14), e.scale(1, g ? 0.55 + 0.45 * o() : 1), e.fillStyle = d, e.beginPath(), e.arc(0, 0, h, 0, Math.PI * 2), e.fill(), e.restore();
  }
  e.restore();
}
function Jn(e, n, t, s, o) {
  let i = le(s.seed * 59 + 9), a = Ce(s.seed + 23), l = String(s.stamp).toUpperCase(), f = i() < 0.6 ? [176, 26, 36] : [34, 64, 150], u = be(1, 1).getContext("2d");
  u.font = 'bold 100px "Courier Prime", monospace', u.letterSpacing = "12px";
  let p = u.measureText(l).width / 100, m = n * 0.44, g = m / (p + 1.2), h = g * 2.1, v = -(0.14 + 0.17 * i()), b = n * (0.46 + 0.1 * i()), d = Math.min(t - h / 2 - 30, Math.max(t * 0.55, o + h / 2 + 24)), E = Math.ceil(Math.hypot(m, h) + g * 0.8), x = be(E, E, !0), r = x.getContext("2d");
  r.translate(E / 2, E / 2), r.fillStyle = r.strokeStyle = ae(f, 1), r.textAlign = "center", r.textBaseline = "middle", r.font = `bold ${g}px "Courier Prime", monospace`, r.letterSpacing = g * 0.12 + "px", r.lineWidth = g * 0.13, r.strokeRect(-m / 2, -h / 2, m, h), r.globalAlpha = 0.5, r.lineWidth = g * 0.1, r.strokeRect(-m / 2 + g * 0.07, -h / 2 - g * 0.05, m, h), r.globalAlpha = 1, r.lineWidth = g * 0.05, r.strokeRect(-m / 2 + g * 0.3, -h / 2 + g * 0.3, m - g * 0.6, h - g * 0.6), r.fillText(l, -g * 0.06, g * 0.05);
  let R = r.getImageData(0, 0, E, E), I = R.data, D = E / 2;
  for (let C = 0; C < I.length; C += 4) {
    if (!I[C + 3]) continue;
    let Y = C / 4, oe = Y % E, re = Math.floor(Y / E), k = (oe - D) / (m / 2), _ = (re - D) / (h / 2), z = 1 - 0.25 * Math.min(1, k * k + _ * _), J = j((a(oe / (g * 1.5), re / (g * 1.5)) - 0.25) * 3.2) * z * (i() < 0.94 ? 1 : 0.3);
    I[C + 3] = Math.round(I[C + 3] * J);
  }
  r.putImageData(R, 0, 0), e.save(), e.globalCompositeOperation = "multiply", e.globalAlpha = 0.9, e.translate(b, d), e.rotate(v), e.drawImage(x, -E / 2, -E / 2), e.restore();
}
function Wn(e, n, t, s) {
  let o = le(s.seed * 53 + 7), i = n * (0.24 + 0.04 * o()), a = n * 0.1;
  [[0.1, 0.05, 0.7], [0.9, 0.05, -0.7]].forEach(([l, f, u]) => {
    let p = n * (l + (o() - 0.5) * 0.03), m = t * (f + (o() - 0.5) * 0.02), g = u + (o() - 0.5) * 0.1;
    e.save(), e.translate(p, m), e.rotate(g);
    let h = [];
    for (let d = 0; d <= 6; d++) h.push([i / 2 - (d % 2 ? 0 : 2 + 4 * o()), -a / 2 + a * d / 6]);
    let v = () => {
      e.beginPath(), e.moveTo(-i / 2, -a / 2), h.forEach((d) => e.lineTo(d[0], d[1])), e.lineTo(-i / 2, a / 2), e.closePath();
    };
    v(), e.fillStyle = "rgba(226,176,96,0.48)", e.fill();
    let b = e.createLinearGradient(0, -a / 2, 0, a / 2);
    b.addColorStop(0, "rgba(255,248,230,0)"), b.addColorStop(0.3, "rgba(255,248,230,0.3)"), b.addColorStop(0.5, "rgba(255,248,230,0.06)"), b.addColorStop(1, "rgba(255,248,230,0)"), e.fillStyle = b, e.fill(), v(), e.strokeStyle = "rgba(140,92,36,0.5)", e.lineWidth = 2, e.stroke(), e.fillStyle = "rgba(140,92,36,0.16)", e.fillRect(-i / 2, -a / 2, i * 0.03, a);
    for (let d = 0, E = 6 + Math.floor(o() * 4); d < E; d++)
      e.fillStyle = `rgba(70,46,22,${0.3 + 0.3 * o()})`, e.beginPath(), e.arc((o() - 0.5) * i * 0.8, (o() - 0.5) * a * 0.7, 1 + 2 * o(), 0, Math.PI * 2), e.fill();
    e.restore();
  });
}
function en(e, n, t) {
  if (!e.hiddenInk) return null;
  let s = be(n, t, !0), o = s.getContext("2d"), i = Math.round(n * 0.12);
  o.fillStyle = "#fff", o.textAlign = "center", o.filter = "blur(0.7px)", o.font = `${i}px "Caveat", cursive`, o.translate(n / 2, t * 0.7), o.rotate(-0.1), e.hiddenInk.split(`
`).forEach((f, u) => o.fillText(f, 0, u * i * 1.05));
  let a = o.getImageData(0, 0, n, t).data, l = new Float32Array(n * t);
  for (let f = 0; f < t; f++) for (let u = 0; u < n; u++) l[f * n + u] = a[((t - 1 - f) * n + u) * 4 + 3] / 255;
  return l;
}
function Zt(e, n, t, s, o) {
  let i = [e, n];
  for (let a = 0; a < s; a++) {
    let l = [i[0]];
    for (let f = 1; f < i.length; f++) {
      let u = i[f - 1], p = i[f], m = (u[0] + p[0]) / 2, g = (u[1] + p[1]) / 2, h = p[0] - u[0], v = p[1] - u[1], b = Math.hypot(h, v), d = (t() - 0.5) * b * o;
      l.push([m - v / b * d, g + h / b * d], p);
    }
    i = l;
  }
  return i;
}
async function Dt(e, n, t = null) {
  let s = Math.round(n.w * gt / 2), o = Math.round(n.h * gt / 2), i = be(s, o, !0), a = i.getContext("2d");
  a.fillStyle = "#fff", a.fillRect(0, 0, s, o);
  let l = be(s, o, !0), f = l.getContext("2d");
  f.fillStyle = "#000", f.fillRect(0, 0, s, o);
  let u = le(e.seed * 13 + 3);
  if (a.fillStyle = "#000", f.strokeStyle = "#fff", f.lineWidth = 2.2, f.filter = "blur(0.8px)", e.type === "form")
    for (let x = 22; x < o - 6; x += 24) [15, s - 15].forEach((r) => {
      a.beginPath(), a.arc(r, x, 5.5, 0, Math.PI * 2), a.fill();
    });
  if (e.type === "notebook") {
    let x = Zt([4, 0], [4, o], u, 7, 0.05);
    a.beginPath(), a.moveTo(0, 0), x.forEach((r) => a.lineTo(r[0] + u() * 2, r[1])), a.lineTo(0, o), a.closePath(), a.fill();
    for (let r = 18; r < o; r += 22)
      a.beginPath(), a.arc(2, r, 5 + u() * 1.5, 0, Math.PI * 2), a.fill();
    f.beginPath(), x.forEach((r, R) => R ? f.lineTo(r[0] + 1, r[1]) : f.moveTo(r[0] + 1, r[1])), f.stroke();
  }
  if (e.type === "envelope") {
    let x = n.flap / n.h * o;
    a.beginPath(), a.moveTo(-2, -2), a.lineTo(s / 2, -2), a.lineTo(s / 2, 3), a.lineTo(-2, x), a.closePath(), a.fill(), a.beginPath(), a.moveTo(s + 2, -2), a.lineTo(s / 2, -2), a.lineTo(s / 2, 3), a.lineTo(s + 2, x), a.closePath(), a.fill();
  }
  if (e.states.includes("torn")) {
    let x = Math.floor(u() * 3), r, R, I;
    x === 0 ? (r = [s * (0.5 + 0.25 * u()), -2], R = [s + 2, o * (0.2 + 0.25 * u())], I = [[s + 2, -2]]) : x === 1 ? (r = [-2, o * (0.72 + 0.12 * u())], R = [s + 2, o * (0.72 + 0.12 * u())], I = [[s + 2, o + 2], [-2, o + 2]]) : (r = [s * (0.3 + 0.25 * u()), o + 2], R = [-2, o * (0.55 + 0.2 * u())], I = [[-2, o + 2]]);
    let D = Zt(r, R, u, 8, 0.22);
    a.beginPath(), D.forEach((C, Y) => Y ? a.lineTo(C[0], C[1]) : a.moveTo(C[0], C[1])), I.forEach((C) => a.lineTo(C[0], C[1])), a.closePath(), a.fill(), f.lineWidth = 3.2, f.beginPath(), D.forEach((C, Y) => Y ? f.lineTo(C[0], C[1]) : f.moveTo(C[0], C[1])), f.stroke();
  }
  let p = a.getImageData(0, 0, s, o).data, m = f.getImageData(0, 0, s, o).data, g = t ? await bt.run("burn", [{ seed: e.seed, form: t === "singed" ? "singed" : e.burn }, s, o]) : null, h = a.createImageData(s, o), v = h.data, b = [], d = 1 / 0;
  for (let x = 0; x < o; x++) for (let r = 0; r < s; r++) {
    let R = (x * s + r) * 4;
    if (v[R] = p[R], v[R + 1] = 0, v[R + 2] = m[R], g) {
      let I = g[x * s + r];
      v[R + 3] = Math.round(j(I / 1.4) * 255), d = Math.min(d, I), t === "burn" && r % 3 === 0 && x % 3 === 0 && p[R] > 128 && b.push((r + 0.5) / s, 1 - (x + 0.5) / o, I);
    } else v[R + 3] = 255;
  }
  let E = be(s, o);
  return E.getContext("2d").putImageData(h, 0, 0), { canvas: E, burnPts: t === "burn" ? new Float32Array(b) : null, lo: g ? Math.max(0, d) : 0 };
}

// .build/shaders.js
var tn = `#version 300 es
precision highp float;in vec2 aXY;uniform sampler2D uH;uniform int uShape;uniform float uP,uK0,uKres,uA0,uAres,uScale,uSeedA,uSquash,uRoll,uCurl,uTear,uStubX,uIsStub,uFoldSide,uFoldBw,uFoldY,uEdge,uThick;uniform vec2 uHalf;uniform mat4 uModel,uProj;out vec3 vPos;out vec3 vNrm;out vec2 vUv;out float vE;out float vAmp;float Hf(vec2 xy){return textureLod(uH,xy/(2.0*uHalf)+0.5,0.0).r;}vec3 rotY(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x+s*v.z,v.y,-s*v.x+c*v.z);}vec3 rotZ(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x-s*v.y,s*v.x+c*v.y,v.z);}vec3 bend(float d,float th,float bw){float t=max(abs(th),1e-4),R=bw/t,L=R*t;if(d<L){float a=d/R;return vec3(R*sin(a),R*(1.0-cos(a)),a);}return vec3(R*sin(t)+(d-L)*cos(t),R*(1.0-cos(t))+(d-L)*sin(t),t);}void foldX(inout vec3 p,inout vec3 n,float x0,float s,float th,float bw){float d=(p.x-x0)*s;if(d<=0.0||abs(th)<1e-4)return;vec3 c=bend(d,th,bw);float g=sign(th),ca=cos(c.z),sa=g*sin(c.z),z0=p.z;p.x=x0+s*(c.x-sa*z0);p.z=g*c.y+ca*z0;n=vec3(ca*n.x-s*sa*n.z,n.y,s*sa*n.x+ca*n.z);}void foldY(inout vec3 p,inout vec3 n,float y0,float s,float th,float bw){float d=(p.y-y0)*s;if(d<=0.0||abs(th)<1e-4)return;vec3 c=bend(d,th,bw);float g=sign(th),ca=cos(c.z),sa=g*sin(c.z),z0=p.z;p.y=y0+s*(c.x-sa*z0);p.z=g*c.y+ca*z0;n=vec3(n.x,ca*n.y-s*sa*n.z,s*sa*n.y+ca*n.z);}vec3 place(vec2 xy,out float e,out float amp,out vec3 n){vec3 p=vec3(xy,0.0);n=vec3(0.0,0.0,1.0);if(uShape==0){float s=length(xy),sn=s/length(uHalf);float q=clamp(uP*1.5-sn*0.5+0.14*sn*sin(atan(xy.y,xy.x)*3.0+uSeedA),0.0,1.0);e=q*q*(3.0-2.0*q);float k=mix(uKres,uK0,(1.0-e)*(1.0-e));if(s>1e-6){float th=s*k,st=sin(th),ct=cos(th);vec2 dir=xy/s;n=vec3(st*dir,ct);p=vec3(st/k*dir,(ct-1.0)/k);}float sq=mix(uSquash,1.0,e);float expan=mix(1.0+(1.0-uSquash)*0.3,1.0,e);p.z*=sq;p.xy*=expan;n=normalize(vec3(n.xy/expan,n.z/sq));amp=mix(uA0,uAres,pow(e,2.2));}else if(uShape==1){e=uP;float L=2.0*uHalf.x*e,s=xy.x+uHalf.x;if(s>L){float ph=(s-L)/uRoll;float r=uRoll*(1.0-0.07*ph/6.2831853);p=vec3(L-uHalf.x+r*sin(ph),xy.y,r*(1.0-cos(ph)));n=vec3(-sin(ph),0.0,cos(ph));}p.x+=(uHalf.x-uRoll)*(1.0-e);amp=mix(uA0,uAres,e);}else if(uShape==2){e=uP;float k=uK0*(1.0-e)*(1.0-e);if(k>1e-2){float a=(xy.y+uHalf.y)*k;float r=1.0/k-uRoll*a/6.2831853;vec2 ax=vec2(-uHalf.y,-1.0/k);p=vec3(xy.x,ax.x+r*sin(a),ax.y+r*cos(a));n=vec3(0.0,sin(a),cos(a));float g=pow(1.0-e,3.0);float axv=abs(xy.x)/uHalf.x;float neck=smoothstep(0.5,0.8,axv),fl=smoothstep(0.82,1.0,axv);float sc=mix(1.0,mix(1.0,0.17*(1.0+3.2*fl),neck),g);float tw=sign(xy.x)*(neck*3.4+fl*1.3)*g;float c=cos(tw),sn=sin(tw);vec2 rv=(p.yz-ax)*sc;p.yz=ax+vec2(c*rv.x-sn*rv.y,sn*rv.x+c*rv.y);n.yz=vec2(c*n.y-sn*n.z,sn*n.y+c*n.z);n=normalize(n);}p.y+=uHalf.y*(1.0-e);p.z+=(1.0/uK0)*(1.0-e);amp=mix(uA0,uAres,e);}else if(uShape==6){e=uP;foldY(p,n,uFoldY,1.0,mix(3.12,-1.1,smoothstep(0.0,1.0,e)),uFoldBw);p.y-=(uFoldY-uHalf.y)*0.5;amp=mix(uA0,uAres,e);}else{e=uP;float e2=smoothstep(0.0,0.5,e),e1=smoothstep(0.5,1.0,e);if(uShape==3){foldX(p,n,0.0,1.0,3.12*(1.0-e1),uFoldBw);foldY(p,n,0.0,1.0,3.12*(1.0-e2),uFoldBw*2.6);p.x+=uHalf.x*0.5*(1.0-e1);p.y+=uHalf.y*0.5*(1.0-e2);}else if(uShape==4){float em=smoothstep(0.0,1.0,e);foldX(p,n,0.0,uFoldSide,3.12*(1.0-em),uFoldBw);p.x+=uFoldSide*uHalf.x*0.5*(1.0-em);}else{float y3=uHalf.y/3.0;foldY(p,n,-y3*1.08,-1.0,3.12*(1.0-e1),uFoldBw);foldY(p,n,y3,1.0,3.12*(1.0-e2),uFoldBw*2.6);}amp=mix(uA0,uAres,e);}p+=n*Hf(xy)*amp;if(uIsStub>0.5&&uTear>0.0){vec3 piv=vec3(uStubX,0.0,0.0);p=rotY(rotZ(p-piv,-0.55*uTear),0.6*uTear)+piv+vec3(0.08*uTear,-1.1*uTear*uTear,0.12*uTear);n=rotY(rotZ(n,-0.55*uTear),0.6*uTear);}p.z-=uCurl*p.x*p.x;n=normalize(vec3(n.x+2.0*uCurl*p.x*n.z,n.y,n.z));return p;}void main(){float e,amp;vec3 nrm;vec3 p0=place(aXY,e,amp,nrm);if(uEdge>0.5)p0-=nrm*uThick*(nrm.z>=0.0?1.0:-1.0);vec4 w=uModel*vec4(p0,1.0);vPos=w.xyz;vNrm=mat3(uModel)*nrm;vUv=aXY/(2.0*uHalf)+0.5;vE=uShape==0?pow(e,2.2):e;vAmp=amp*uScale;gl_Position=uProj*w;}`, nn = `#version 300 es
precision highp float;in vec3 vPos;in vec3 vNrm;in vec2 vUv;in float vE;in float vAmp;uniform sampler2D uH,uPrintF,uPrintB,uFx,uGrain;uniform vec2 uGrainK;uniform vec3 uCam,uColor,uL,uLampPos;uniform float uBump,uAge,uTime,uThru,uFront,uInkMax,uEdge,uDestroy,uLamp,uLampR;out vec4 frag;float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}vec3 perturb(vec3 pos,vec3 n,vec2 dH){vec3 sx=dFdx(pos),sy=dFdy(pos);vec3 r1=cross(sy,n),r2=cross(n,sx);float det=dot(sx,r1);return normalize(abs(det)*n-sign(det)*(dH.x*r1+dH.y*r2));}void main(){vec4 fx=texture(uFx,vUv);float pres=fx.r,sc=0.0;if(uFront>-0.5){float b=fx.a*1.4;pres=min(pres,smoothstep(uFront-0.004,uFront+0.012,b));sc=1.0-smoothstep(uFront,uFront+0.17,b);}if(pres<0.4)discard;float a=smoothstep(0.4,0.6,pres);bool front=gl_FrontFacing;vec3 n=normalize(vNrm)*(front?1.0:-1.0);vec3 L=normalize(uL);if(uEdge>0.5){float w=clamp((dot(n,L)+0.3)/1.3,0.0,1.0);vec3 ec=mix(uColor*vec3(0.8,0.76,0.7),vec3(0.08,0.06,0.05),smoothstep(0.55,0.9,sc))*(0.45+0.55*w);frag=vec4(ec*a,a);return;}vec4 h0=texture(uH,vUv);vec2 du=dFdx(vUv),dv=dFdy(vUv);vec4 hx=texture(uH,vUv+du),hy=texture(uH,vUv+dv);vec3 toP=uLampPos-vPos;vec3 Lp=normalize(toP);float pool=pow(1.0-smoothstep(0.0,1.0,length(toP.xy)/uLampR),1.3)*uLamp;float grazD=clamp((1.0-L.z-0.4)/0.5,0.0,1.0);float grazP=smoothstep(0.2,0.75,1.0-Lp.z)*pool;float ink=uInkMax*mix(grazD,grazP*3.0,uLamp);vec2 dH=vec2(hx.r-h0.r,hy.r-h0.r)*vAmp*uBump*(1.0+1.6*pool)-vec2(hx.g-h0.g,hy.g-h0.g)*ink;n=perturb(vPos,n,dH);vec3 V=normalize(uCam-vPos);float wrap=clamp((dot(n,L)+0.08)/1.08,0.0,1.0);float wrapP=max(dot(n,Lp),0.0);float ao=mix(1.0,0.42+0.58*smoothstep(-0.55,0.35,h0.r),1.0-vE);float fib=hash(floor(vUv*vec2(900.0,1180.0)));vec2 eu=min(vUv,1.0-vUv);float edge=smoothstep(0.0,0.05,min(eu.x,eu.y));vec3 col0=mix(uColor,uColor*vec3(0.93,0.84,0.66),uAge);vec3 alb=col0*(0.975+0.025*fib)*(0.93+0.07*edge);alb*=1.0+(texture(uGrain,vUv*uGrainK).r-0.94)*1.8;if(!front)alb*=0.9;vec2 uvB=vec2(1.0-vUv.x,vUv.y);vec4 tF=texture(uPrintF,vUv),tB=texture(uPrintB,uvB);vec4 pr=front?tF:tB;vec4 th=front?tB:tF;alb=mix(alb,th.rgb,th.a*uThru);alb=mix(alb,pr.rgb,pr.a);alb=mix(alb,vec3(0.45,0.29,0.13),smoothstep(0.12,0.55,sc)*0.85);alb=mix(alb,vec3(0.06,0.045,0.04),smoothstep(0.55,0.9,sc));alb=mix(alb,vec3(0.99,0.985,0.96),fx.b*0.85);vec3 key=vec3(1.0,0.965,0.9),amb=vec3(0.62,0.64,0.7);vec3 warm=vec3(1.0,0.9,0.74);vec3 base=amb*0.3*ao+key*1.04*wrap*mix(1.0,ao,0.7)*mix(1.0,0.55,uLamp);float spot=wrapP*pool*mix(1.0,ao,0.5);vec3 col=alb*(base+warm*spot*max(vec3(0.0),vec3(1.15)-base));col+=key*0.03*pow(max(dot(n,normalize(L+V)),0.0),24.0)*(1.0-0.5*uLamp);col+=warm*0.06*pow(max(dot(n,normalize(Lp+V)),0.0),30.0)*pool;float rim=(1.0-smoothstep(0.42,0.66,pres))*smoothstep(0.6,0.95,sc);float fl=0.55+0.45*sin(uTime*6.0+vUv.x*37.0+vUv.y*23.0)*sin(uTime*2.3+vUv.y*51.0);col+=vec3(1.0,0.42,0.08)*rim*fl*(1.7+1.6*uDestroy);frag=vec4(col*a,a);}`, on = `#version 300 es
in vec2 aQ;uniform vec3 uC;uniform vec2 uHS;uniform float uSoft;uniform mat4 uProj;out vec2 vL;void main(){vL=aQ*(uHS+vec2(uSoft*3.0));gl_Position=uProj*vec4(uC+vec3(vL,0.0),1.0);}`, rn = `#version 300 es
precision highp float;in vec2 vL;uniform vec2 uHS;uniform float uR,uSoft,uA,uOpen,uFront,uFlip;uniform sampler2D uFx;out vec4 frag;float paperAt(vec2 uv){vec4 fx=texture(uFx,clamp(uv,0.0,1.0));return uFront>-0.5?min(fx.r,smoothstep(uFront-0.004,uFront+0.012,fx.a*1.4)):fx.r;}void main(){vec2 q=abs(vL)-uHS+vec2(uR);float d=length(max(q,0.0))+min(max(q.x,q.y),0.0)-uR;float pres=1.0;if(uOpen>0.0){vec2 uv=vL/(2.0*uHS)+0.5,o=vec2(uSoft)/(2.0*uHS);if(uFlip>0.5)uv.x=1.0-uv.x;float p=paperAt(uv)*2.0+paperAt(uv+vec2(o.x,0.0))+paperAt(uv-vec2(o.x,0.0))+paperAt(uv+vec2(0.0,o.y))+paperAt(uv-vec2(0.0,o.y));pres=mix(1.0,p/6.0,uOpen);}frag=vec4(0.0,0.0,0.0,uA*pres*(1.0-smoothstep(-uSoft,uSoft*2.5,d)));}`, an = `#version 300 es
in vec3 aP;in vec4 aC;in float aS;uniform mat4 uProj;uniform float uPx;out vec4 vC;void main(){gl_Position=uProj*vec4(aP,1.0);gl_PointSize=max(1.0,aS*uPx/gl_Position.w);vC=aC;}`, sn = `#version 300 es
precision highp float;in vec4 vC;out vec4 frag;void main(){float a=smoothstep(0.5,0.05,length(gl_PointCoord-0.5))*vC.a;frag=vec4(vC.rgb*a,a);}`;

// .build/sound.js
var ie = /* @__PURE__ */ (() => {
  let e = null, n = null, t = null, s = null, o = de.get("sound", !1), i = {}, a = {}, l = () => {
    if (!e) {
      let h = window.AudioContext || window.webkitAudioContext;
      if (!h) return null;
      e = new h(), n = e.createGain(), n.gain.value = 0.6;
      let v = e.createBiquadFilter();
      v.type = "peaking", v.frequency.value = 420, v.Q.value = 2.4, v.gain.value = 3.5, n.connect(v), v.connect(e.destination), t = e.createBuffer(1, e.sampleRate, e.sampleRate);
      let b = t.getChannelData(0), d = 0, E = 0;
      for (let x = 0; x < b.length; x++) {
        let r = Math.random() * 2 - 1;
        d = 0.99 * d + r * 0.05, E = 0.95 * E + r * 0.1, b[x] = (d + E + r * 0.15) * 1.6;
      }
    }
    return e.state === "suspended" && e.resume(), e;
  };
  function f() {
    return s || !e || (s = Promise.all(Object.entries(i).map(([h, v]) => fetch(v).then((b) => b.ok ? b.arrayBuffer() : Promise.reject(new Error(h))).then((b) => e.decodeAudioData(b)).then((b) => {
      a[h] = b;
    }).catch(() => {
    })))), s;
  }
  function u(h, v, b = {}) {
    let d = a[h];
    if (!d) return !1;
    let E = e.createBufferSource();
    E.buffer = d, E.playbackRate.value = b.rate || 1;
    let x = e.createGain();
    return x.gain.value = b.gain ?? 1, E.connect(x), x.connect(n), E.start(v, b.offset || 0, b.dur), !0;
  }
  function p(h, v, b, d, E) {
    let x = e.createBufferSource();
    x.buffer = t;
    let r = e.createBiquadFilter();
    r.type = "bandpass", r.frequency.value = b, r.Q.value = d;
    let R = e.createGain();
    R.gain.setValueAtTime(1e-4, h), R.gain.linearRampToValueAtTime(E, h + 2e-3), R.gain.exponentialRampToValueAtTime(1e-4, h + v), x.connect(r), r.connect(R), R.connect(n), x.start(h, Math.random() * 0.9, v + 0.03);
  }
  function m(h, v, b, d, E) {
    let x = e.createBufferSource();
    x.buffer = t, x.loop = !0;
    let r = e.createBiquadFilter();
    r.type = "bandpass", r.Q.value = 0.8, r.frequency.setValueAtTime(b, h), r.frequency.linearRampToValueAtTime(d, h + v);
    let R = e.createGain();
    R.gain.setValueAtTime(1e-4, h), R.gain.linearRampToValueAtTime(E, h + v * 0.15), R.gain.linearRampToValueAtTime(1e-4, h + v), x.connect(r), r.connect(R), R.connect(n), x.start(h), x.stop(h + v + 0.05);
  }
  function g(h, v, b, d, E, x) {
    let r = Math.round(v * b);
    for (let R = 0; R < r; R++) {
      let I = Math.random();
      x && (I = I * I), p(h + I * v, 6e-3 + Math.random() * 0.03, 1500 + Math.random() * 4500 * d, 0.7 + Math.random() * 2.2, E * (0.25 + Math.random() * 0.75));
    }
  }
  return {
    get enabled() {
      return o;
    },
    set(h) {
      o = !!h, de.set("sound", o), o && l() && f();
    },
    // optional real recordings: { crumple, sheet, tear } (URLs)
    useSamples(h) {
      i = { ...h }, s = null, o && e && f();
    },
    // names: crumple, uncrumple, flip, tear, seal, fire, grain
    play(h, v = 1, b = 0) {
      if (!o || !l()) return;
      f();
      let d = e.currentTime + b, E = (x) => !!a[x];
      if (h === "crumple")
        if (E("crumple")) {
          let x = Math.max(2, Math.round(v * 4));
          for (let r = 0; r < x; r++) u("crumple", d + r / x * v * 0.85, { gain: 0.6 + Math.random() * 0.35, rate: 0.85 + Math.random() * 0.35 });
          g(d, v, 25, 1, 0.1, !0);
        } else
          g(d, v, 90, 1, 0.32, !0), m(d, v, 2400, 1200, 0.07);
      else if (h === "uncrumple")
        if (E("sheet")) {
          let x = Math.max(2, Math.round(v * 2.5));
          for (let r = 0; r < x; r++) u(r % 2 && E("crumple") ? "crumple" : "sheet", d + r / x * v * 0.9, { gain: 0.4 + Math.random() * 0.25, rate: 0.75 + Math.random() * 0.25 });
        } else
          g(d, v, 46, 0.8, 0.26, !1), m(d, v, 1400, 2600, 0.05);
      else h === "flip" ? u("sheet", d, { gain: 0.8, rate: 1.15 }) || (m(d, 0.38, 500, 2400, 0.16), p(d + 0.34, 0.05, 900, 1, 0.22)) : h === "tear" ? u("tear", d, { gain: 1 }) || (m(d, 0.45, 1800, 3600, 0.18), g(d, 0.45, 160, 1.2, 0.3, !1)) : h === "seal" ? (u("tear", d, { gain: 0.45, rate: 1.7, dur: 0.16 }) || p(d, 0.05, 1200, 2, 0.3), u("sheet", d + 0.2, { gain: 0.5, rate: 0.9 }) || m(d + 0.2, 0.5, 700, 2200, 0.08)) : h === "fire" ? (g(d, v, 22, 0.45, 0.16, !1), m(d, v, 500, 800, 0.05)) : h === "grain" && (u("crumple", d, { gain: 0.22, rate: 1.2 + Math.random() * 0.4, offset: Math.random() * 0.3, dur: 0.08 }) || g(d, 0.06, 60, 1, 0.2, !1));
    }
  };
})();

// .build/motion.js
function ue(e, n, t, s, o = me, i = 0, a) {
  e.tw = e.tw.filter((l) => l.key !== n), e.tw.push({ key: n, to: t, dur: Math.max(1e-3, s), ease: o, start: performance.now() + i * 1e3, from: null, done: a });
}
function yt(e, n) {
  let t = !1, s = [];
  return e.tw = e.tw.filter((o) => {
    if (t = !0, n < o.start) return !0;
    o.from === null && (o.from = e[o.key]);
    let i = j((n - o.start) / (o.dur * 1e3));
    return e[o.key] = o.from + (o.to - o.from) * o.ease(i), i >= 1 ? (o.done && s.push(o.done), !1) : !0;
  }), s.forEach((o) => o()), t;
}
function et(e) {
  if (e.cfg.type === "envelope") return 0.34;
  let n = e.F.shape;
  return n === 0 ? 0.42 : n === 2 ? 0.35 : 0.3;
}
function tt(e, n) {
  let t = ce(j(n));
  return 2 * Math.max(e.F.ext[0] / 2 + (e.half[0] - e.F.ext[0] / 2) * t, e.F.ext[1] / 2 + (e.half[1] - e.F.ext[1] / 2) * t);
}
function ln(e, n) {
  let t = ce(j(e.cfg.type === "envelope" ? n * 2 : n)), s = [0, 0, -0.02];
  return e.pose.map((o, i) => o * (1 - t) + s[i] * t);
}
function Ge(e, n, t) {
  let s = (x, r = 0) => n.destroy !== void 0 ? n.destroy : x.front0 > -0.5 ? x.front0 + x.burned + r : -1, o = n.destroy !== void 0 ? j((1.25 - n.destroy) / 0.9) : 1;
  if (e.cfg.type !== "envelope") {
    let x = { ...t, p: n.p, f: n.f, tear: n.tear, front: s(e, n.burnOpen || 0), destroy: n.destroy !== void 0, alpha: o };
    return { items: [{ P: e, st: x }], shadow: { P: e, st: x }, active: { P: e, st: x } };
  }
  let i = e.letter, a = n.p, l = ce(j(a / 0.24)), f = ce(j((a - 0.14) / 0.36)), u = ce(j((a - 0.44) / 0.32)), p = j((a - 0.58) / 0.42), m = { ...t, p: l, f: n.f, tear: 0, cy: t.cy - u * t.vhU * 0.8, rot: [t.rot[0], t.rot[1], t.rot[2] + u * 0.45], front: s(e) }, g = -0.08 + f * 0.5, h = -0.035 * (1 - u), v = Math.PI * Be(j(n.f)), b = [0, 0, -0.02], d = { ...t, cx: Je(m.cx, 0, u), cy: Je(m.cy, 0, u), sc: Je(m.sc, t.scLetter, u), rot: m.rot.map((x, r) => Je(x, b[r] + (t.adjust ? t.adjust[r] : 0), u)), local: [-Math.sin(v) * h, g * (1 - u), Math.cos(v) * h], p: Lt(p), f: n.f, tear: 0, front: s(i, n.burnOpen || 0), destroy: n.destroy !== void 0, alpha: o };
  return { items: u >= 0.999 ? [{ P: i, st: d }] : a < 0.01 ? [{ P: e, st: m }] : [{ P: e, st: m }, { P: i, st: d }], shadow: u < 0.5 ? { P: e, st: m } : { P: i, st: d }, active: u < 0.5 ? { P: e, st: m } : { P: i, st: d } };
}
function nt(e, n, t, s, o, i = 0, a = 0) {
  let l = ce(j(n.p)), f = (e.F.ext[0] / 2 + (e.half[0] - e.F.ext[0] / 2) * l) * n.sc * t * 1.1, u = (e.F.ext[1] / 2 + (e.half[1] - e.F.ext[1] / 2) * l) * n.sc * t * 1.1, p = i + s / 2 + n.cx * t, m = a + o / 2 - n.cy * t;
  return { cx: p, cy: m, x0: p - f, x1: p + f, y0: m - u, y1: m + u, w1: e.half[0] * 2 * n.sc * t, h1: e.half[1] * 2 * n.sc * t };
}
function vt(e, n, t, s) {
  let { P: o, st: i } = t.active, a = n.p - (n.pPrev ?? n.p), l = ce(j(i.p)), f = (o.F.ext[0] / 2 + (o.half[0] - o.F.ext[0] / 2) * l) * i.sc, u = (o.F.ext[1] / 2 + (o.half[1] - o.F.ext[1] / 2) * l) * i.sc;
  if (a > 5e-4 && n.p > 0.12 && n.p < 0.97) {
    let m = Math.min(8, Math.round(a * 300));
    for (let g = 0; g < m; g++) e.emit({ x: i.cx + (Math.random() - 0.5) * 2 * f, y: i.cy + (Math.random() - 0.5) * 2 * u, z: 0.06 * i.sc, vx: (Math.random() - 0.5) * 0.05 * i.sc, vy: (Math.random() * 0.04 + 0.01) * i.sc, ay: -0.01 * i.sc, r: 0.93, g: 0.9, b: 0.84, a: 0.5, s: (5e-3 + Math.random() * 8e-3) * i.sc, t: 0, life: 1.2 + Math.random() * 0.9 });
  }
  let p = i.front;
  if (p > -0.5 && o.burnPts && i.p > 0.9) {
    let m = n.destroy !== void 0;
    n.acc = (n.acc || 0) + s * (m ? 110 : 9);
    let g = o.burnPts, h = g.length / 3, v = Math.cos(i.rot[2]), b = Math.sin(i.rot[2]);
    for (; n.acc >= 1; ) {
      n.acc -= 1;
      let d = -1;
      for (let I = 0; I < 40; I++) {
        let D = Math.floor(Math.random() * h);
        if (Math.abs(g[D * 3 + 2] - p) < 0.012) {
          d = D;
          break;
        }
      }
      if (d < 0) continue;
      let E = (g[d * 3] - 0.5) * o.w * i.sc, x = (g[d * 3 + 1] - 0.5) * o.h * i.sc, r = i.cx + v * E - b * x, R = i.cy + b * E + v * x;
      e.emit({ x: r, y: R, z: 0.02 * i.sc, vx: (Math.random() - 0.5) * 0.08 * i.sc, vy: (0.06 + Math.random() * 0.1) * i.sc, ay: 0.06 * i.sc, r: 1, g: 0.5 + Math.random() * 0.3, b: 0.12, a: 1, s: (3e-3 + Math.random() * 5e-3) * i.sc, t: 0, life: 0.5 + Math.random() * 0.8, flicker: !0 }), m && Math.random() < 0.45 && e.emit({ x: r, y: R, z: 0.02 * i.sc, vx: (Math.random() - 0.5) * 0.06 * i.sc, vy: -(0.02 + Math.random() * 0.05) * i.sc, ay: -0.05 * i.sc, r: 0.2, g: 0.19, b: 0.18, a: 0.85, s: (8e-3 + Math.random() * 0.012) * i.sc, t: 0, life: 1.4 + Math.random() * 1.1 });
    }
  }
}
function wt(e, n) {
  let t = /* @__PURE__ */ new Map(), s = [], o = null, i = () => {
    let [u, p] = [...t.values()];
    return Math.hypot(u.x - p.x, u.y - p.y);
  }, a = (u) => {
    let p = n.active();
    if (!p) return;
    let m = n.box();
    if (!(m && u.clientX > m.x0 && u.clientX < m.x1 && u.clientY > m.y0 && u.clientY < m.y1) && !t.size) {
      n.outside(u);
      return;
    }
    if (!t.size && n.tap && n.tap(u)) return;
    t.set(u.pointerId, { x: u.clientX, y: u.clientY });
    try {
      e.setPointerCapture(u.pointerId);
    } catch {
    }
    p.tw = p.tw.filter((v) => v.key !== "p");
    let h = performance.now();
    t.size === 2 ? o = { pinch: !0, d0: i(), p0: p.p, moved: !0, last: p.p, box: m, tLast: h, lastX: u.clientX, lastY: u.clientY, vx: 0, vy: 0 } : o = { pinch: !1, r0: Math.hypot(u.clientX - m.cx, u.clientY - m.cy), p0: p.p, x: u.clientX, y: u.clientY, moved: !1, last: p.p, box: m, tLast: h, lastX: u.clientX, lastY: u.clientY, vx: 0, vy: 0 };
  }, l = (u) => {
    if (!o || !t.has(u.pointerId)) return;
    t.set(u.pointerId, { x: u.clientX, y: u.clientY });
    let p = n.active();
    if (!p) {
      o = null, t.clear();
      return;
    }
    let m = performance.now(), g = m - o.tLast;
    g > 8 && (o.vx = (u.clientX - o.lastX) / g, o.vy = (u.clientY - o.lastY) / g, o.tLast = m, o.lastX = u.clientX, o.lastY = u.clientY);
    let h = 0.42 * Math.min(o.box.w1, o.box.h1);
    if (o.pinch && t.size === 2) p.p = j(o.p0 + (i() - o.d0) / h);
    else if (!o.pinch) {
      if (Math.hypot(u.clientX - o.x, u.clientY - o.y) > 6 && (o.moved = !0), !o.moved) return;
      p.p = j(o.p0 + (Math.hypot(u.clientX - o.box.cx, u.clientY - o.box.cy) - o.r0) / h);
    }
    Math.abs(p.p - o.last) > 0.035 && (ie.play("grain"), o.last = p.p), p.dragging = !0, n.redraw();
  }, f = (u) => {
    if (!t.has(u.pointerId)) return;
    if (t.delete(u.pointerId), t.size === 1 && o) {
      let b = [...t.values()][0], d = n.box ? n.box() : o.box;
      o.pinch = !1, o.x = b.x, o.y = b.y, o.r0 = Math.hypot(b.x - (d ? d.cx : o.x), b.y - (d ? d.cy : o.y)), o.p0 = n.active() ? n.active().p : o.p0;
      return;
    }
    if (t.size) return;
    let p = n.active(), m = o && o.moved, g = o ? o.p0 : 0, h = o && o.vx || 0, v = o && o.vy || 0;
    if (o = null, !!p) {
      if (p.dragging = !1, n.flip && g > 0.85 && Math.abs(h) > 0.2 && Math.abs(h) > 1.5 * Math.abs(v)) {
        p.p = 1, n.flip();
        return;
      }
      if (n.outside && v > 0.75) {
        n.outside(u);
        return;
      }
      m && (p.p >= 0.3 ? (ie.play("uncrumple", 0.4), ue(p, "p", 1, 0.45 * (1 - p.p) + 0.15, Ne, 0, () => qe(12))) : (ie.play("crumple", 0.35), ue(p, "p", 0, 0.35 * p.p + 0.12, Ne, 0, () => qe(18))), n.redraw());
    }
  };
  return [["pointerdown", a], ["pointermove", l], ["pointerup", f], ["pointercancel", f]].forEach(([u, p]) => te(s, e, u, p)), () => s.splice(0).forEach((u) => u());
}
function ot(e, n, t, s, o, i, a) {
  let l = [(n - s / 2) / i, -(t - o / 2) / i, 0.09 * o / i];
  e.lampPos || (e.lampPos = l.slice()), e.lampGoal = l, e.lampOn = a ? 1 : 0, e.lampMoving = !0;
}
function Et(e, n) {
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
var ge = {
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
}, Fe = 30 * Math.PI / 180, Le = 10, He = [-0.45, 0.62, 0.65];
function Zn(e, n) {
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
var Qn = (e) => e.states.includes("burnt") || e.burnAfterReading ? "burn" : e.states.includes("singed") ? "singed" : null, un = { corner: [0.3, 0.06], edge: [0.035, 0.01], center: [0.09, 0.03], spots: [0.035, 0.01] };
function Ve(e, n = {}) {
  let t = e.getContext("webgl2", { alpha: !0, premultipliedAlpha: !0, antialias: !0 });
  if (!t) return null;
  let s, o, i, a, l, f, u, p = !1, m = !1, g = (M, w) => {
    let P = (G, V) => {
      let $ = t.createShader(G);
      if (t.shaderSource($, V), t.compileShader($), !t.getShaderParameter($, t.COMPILE_STATUS)) throw new Error(t.getShaderInfoLog($));
      return $;
    }, O = t.createProgram();
    if (t.attachShader(O, P(t.VERTEX_SHADER, M)), t.attachShader(O, P(t.FRAGMENT_SHADER, w)), t.linkProgram(O), !t.getProgramParameter(O, t.LINK_STATUS)) throw new Error(t.getProgramInfoLog(O));
    let A = {}, F = t.getProgramParameter(O, t.ACTIVE_UNIFORMS);
    for (let G = 0; G < F; G++) {
      let V = t.getActiveUniform(O, G);
      A[V.name] = t.getUniformLocation(O, V.name);
    }
    return { p: O, u: A };
  };
  function h() {
    s = g(tn, nn), o = g(on, rn), i = g(an, sn), a = t.createVertexArray(), t.bindVertexArray(a), l = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, l), t.bufferData(t.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), t.STATIC_DRAW);
    let M = t.getAttribLocation(o.p, "aQ");
    t.enableVertexAttribArray(M), t.vertexAttribPointer(M, 2, t.FLOAT, !1, 0, 0), t.bindVertexArray(null), f = t.createVertexArray(), u = t.createBuffer(), t.bindVertexArray(f), t.bindBuffer(t.ARRAY_BUFFER, u), t.bufferData(t.ARRAY_BUFFER, 420 * 32, t.DYNAMIC_DRAW), [["aP", 3, 0], ["aC", 4, 12], ["aS", 1, 28]].forEach(([w, P, O]) => {
      let A = t.getAttribLocation(i.p, w);
      t.enableVertexAttribArray(A), t.vertexAttribPointer(A, P, t.FLOAT, !1, 32, O);
    }), t.bindVertexArray(null);
  }
  h();
  let v = (M) => {
    M.preventDefault(), p = !0;
  }, b = () => {
    p = !1, h(), x = null, r = null, Y = null, oe = null, H = null, n.onRestore && n.onRestore();
  };
  e.addEventListener("webglcontextlost", v), e.addEventListener("webglcontextrestored", b);
  function d(M, w, P, O, A, F, G) {
    let V = [];
    for (let q = 0; q <= O; q++) V.push(M + (w - M) * q / O);
    F.forEach((q) => {
      q > M + 1e-6 && q < w - 1e-6 && V.push(q);
    }), V.sort((q, ne) => q - ne);
    let $ = [];
    for (let q = 0; q <= A; q++) $.push(-P + 2 * P * q / A);
    G.forEach((q) => {
      q > -P + 1e-6 && q < P - 1e-6 && !$.some((ne) => Math.abs(ne - q) < 1e-6) && $.push(q);
    }), $.sort((q, ne) => q - ne);
    let K = V.length, N = $.length, Z = new Float32Array(K * N * 2), X = 0;
    for (let q = 0; q < N; q++) for (let ne = 0; ne < K; ne++)
      Z[X++] = V[ne], Z[X++] = $[q];
    let Q = new Uint16Array((K - 1) * (N - 1) * 6);
    X = 0;
    for (let q = 0; q < N - 1; q++) for (let ne = 0; ne < K - 1; ne++) {
      let xe = q * K + ne, $e = xe + 1, Ie = xe + K, c = Ie + 1;
      Q[X++] = xe, Q[X++] = $e, Q[X++] = c, Q[X++] = xe, Q[X++] = c, Q[X++] = Ie;
    }
    let fe = t.createVertexArray();
    t.bindVertexArray(fe);
    let ee = t.createBuffer();
    t.bindBuffer(t.ARRAY_BUFFER, ee), t.bufferData(t.ARRAY_BUFFER, Z, t.STATIC_DRAW);
    let Me = t.getAttribLocation(s.p, "aXY");
    t.enableVertexAttribArray(Me), t.vertexAttribPointer(Me, 2, t.FLOAT, !1, 0, 0);
    let pe = t.createBuffer();
    return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, pe), t.bufferData(t.ELEMENT_ARRAY_BUFFER, Q, t.STATIC_DRAW), t.bindVertexArray(null), { vao: fe, count: Q.length, bufs: [ee, pe] };
  }
  function E(M, w) {
    let P = t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, P), w.float ? (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1), t.texImage2D(t.TEXTURE_2D, 0, t.RG16F, w.w, w.h, 0, t.RG, t.FLOAT, M)) : (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, M), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1)), w.mip ? (t.generateMipmap(t.TEXTURE_2D), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR)) : t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), P;
  }
  let x = null, r = null, R = (M) => {
    let w = t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, w), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(M)), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), w;
  }, I = () => x || (x = R([0, 0, 0, 0])), D = () => r || (r = R([255, 0, 0, 255])), C = (M) => {
    M && M !== x && M !== r && t.deleteTexture(M);
  }, Y = null, oe = null;
  function re() {
    return Y || (Y = R([240, 240, 240, 255]), oe = Xe("grain").then((M) => {
      !M || m || (t.bindTexture(t.TEXTURE_2D, Y), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, M), t.generateMipmap(t.TEXTURE_2D), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.REPEAT), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.REPEAT));
    }), Y);
  }
  async function k(M) {
    let w = Ye(M), P = Se[w.type];
    re();
    let O = w.type === "envelope" ? k({ id: w.id + "-letter", type: w.letter, shape: "thirds", text: w.text, back: w.back, states: w.states.filter((U) => U !== "torn"), seed: w.seed + 1, hiddenInk: w.hiddenInk, burn: w.burn, burnAfterReading: w.burnAfterReading, stamp: w.stamp }) : null;
    await $t([P.font, "Caveat", "Courier Prime", "Special Elite"]);
    let A = P.w / 2, F = P.h / 2, G = Zn(w.shape, P), V = Math.round(512 * P.w / 0.84), $ = Math.round(V * P.h / P.w), K = de.get("opens." + w.id, 0), N = le(w.seed * 7 + 1), Z = P.stub ? A - P.w * P.stub : null, X = P.body ? -F + P.body : 0, Q = Math.max(16, Math.round(Math.sqrt(15e3 * P.w / P.h))), fe = Math.max(16, Math.round(Q * P.h / P.w)), ee = [0], Me = [0, -P.h / 6 * 1.08, P.h / 6, X], pe = [];
    if (Z !== null) {
      let U = Math.round(Q * (Z + A) / P.w);
      pe.push(d(-A, Z, F, U, fe, ee, Me)), pe.push(d(Z, A, F, Q - U, fe, ee, Me));
    } else pe.push(d(-A, A, F, Q, fe, ee, Me));
    let q = !(w.back || w.type === "notebook" || w.type === "form" || w.type === "envelope" || w.type === "newspaper" || ["coffee", "water", "prints", "aged", "wine", "ink", "foxing", "faded"].some((U) => w.states.includes(U))), ne = Qn(w), xe = !(w.type === "notebook" || w.type === "form" || w.type === "envelope" || w.states.includes("torn") || ne), [$e, Ie, c, y] = await Promise.all([
      bt.run("creases", [{ seed: w.seed, shape: w.shape, w: P.w, h: P.h, card: !!P.card, foldY: X }, V, $]),
      Qe(w, P, "front", K),
      q ? null : Qe(w, P, "back", K),
      xe ? null : Dt(w, P, ne)
    ]), T = en(w, V, $), S = new Float32Array(V * $ * 2);
    for (let U = 0; U < V * $; U++)
      S[U * 2] = $e[U], S[U * 2 + 1] = T ? T[U] : 0;
    let B = G.shape === 1 || G.shape === 2, L = {
      cfg: w,
      T: P,
      w: P.w,
      h: P.h,
      half: [A, F],
      F: G,
      stubX: Z,
      foldY: X,
      meshes: pe,
      openings: K,
      tH: E(S, { float: !0, w: V, h: $ }),
      tPF: E(Ie, { mip: !0 }),
      tPB: q ? I() : E(c, { mip: !0 }),
      tFx: xe ? D() : E(y.canvas, {}),
      burnPts: xe ? null : y.burnPts,
      // which burn field the effects hold: 'burn' (sparks, can burn away), 'singed' (rim only) or 'none' (ensureBurn adds one)
      fxBurn: ne || "none",
      backEmpty: q,
      // estimated texture memory (front and back with mipmaps, effects, creases in RG16F)
      bytes: Math.round(Ie.width * Ie.height * 4 * 1.33 * (q ? 1 : 2) + (xe ? 0 : y.canvas.width * y.canvas.height * 4) + V * $ * 4),
      // folded and elongated papers stay almost facing the camera; crumpled ones may spin freely
      pose: G.shape >= 3 ? [-0.22 + N() * 0.18, -0.2 + N() * 0.4, -0.45 + N() * 0.9] : B ? [-0.15 + N() * 0.15, -0.15 + N() * 0.3, -0.6 + N() * 1.2] : [-0.3 + N() * 0.25, -0.35 + N() * 0.7, N() * 6.28],
      seedA: N() * 6.28,
      // a singed rim holds its front just under the lowest value of its field: only the scorch band shows
      front0: w.states.includes("burnt") ? un[w.burn][0] + un[w.burn][1] * N() : ne === "singed" ? y.lo - 0.012 : -1,
      burned: de.get("burned." + w.id, 0),
      age: w.states.includes("aged") ? 1 : 0,
      torn: !1
    };
    return L.extent = Math.max(G.ext[0], G.ext[1]), L.hasRedaction = /\[\[/.test(w.text + w.back), O && (L.letter = await O), await oe, L;
  }
  async function _(M) {
    M.openings = de.get("opens." + M.cfg.id, 0);
    let [w, P] = await Promise.all([Qe(M.cfg, M.T, "front", M.openings), M.backEmpty ? null : Qe(M.cfg, M.T, "back", M.openings)]);
    C(M.tPF), C(M.tPB), M.tPF = E(w, { mip: !0 }), M.tPB = P ? E(P, { mip: !0 }) : I();
  }
  function z(M) {
    return M.fxBurn === "burn" ? Promise.resolve() : (M.burnJob || (M.burnJob = Dt(M.cfg, M.T, "burn").then((w) => {
      if (M.released) return;
      let P = M.tFx;
      P === r && (M.bytes += w.canvas.width * w.canvas.height * 4), M.tFx = E(w.canvas, {}), C(P), M.burnPts = w.burnPts, M.fxBurn = "burn";
    })), M.burnJob);
  }
  async function J(M) {
    await Promise.all([z(M), M.letter && z(M.letter)]);
  }
  function W(M) {
    M.released = !0, [M.tH, M.tPF, M.tPB, M.tFx].forEach(C), M.meshes.forEach((w) => {
      t.deleteVertexArray(w.vao), w.bufs.forEach((P) => t.deleteBuffer(P));
    }), M.letter && W(M.letter);
  }
  function ve(M, w, P) {
    let O = w.f || 0, A = ge.mul(ge.T(w.cx, w.cy, (w.zoff || 0) * w.sc + 0.12 * w.sc * Math.sin(Math.PI * O)), ge.S(w.sc));
    A = ge.mul(A, ge.RZ(w.rot[2])), A = ge.mul(A, ge.RX(w.rot[0])), A = ge.mul(A, ge.RY(w.rot[1] + Math.PI * Be(j(O)))), w.local && (A = ge.mul(A, ge.T(w.local[0], w.local[1], w.local[2])));
    let F = s.u;
    t.useProgram(s.p), [[M.tH, "uH"], [M.tPF, "uPrintF"], [M.tPB, "uPrintB"], [M.tFx, "uFx"]].forEach(([K, N], Z) => {
      t.activeTexture(t.TEXTURE0 + Z), t.bindTexture(t.TEXTURE_2D, K), t.uniform1i(F[N], Z);
    }), t.activeTexture(t.TEXTURE4), t.bindTexture(t.TEXTURE_2D, re()), t.uniform1i(F.uGrain, 4), t.uniform2f(F.uGrainK, M.w * 5, M.h * 5);
    let G = w.L || He;
    t.uniform1i(F.uShape, M.F.shape), t.uniform1f(F.uP, j(w.p)), t.uniform1f(F.uK0, M.F.k0), t.uniform1f(F.uKres, 0.06), t.uniform1f(F.uA0, M.F.A0), t.uniform1f(F.uAres, M.F.Ares), t.uniform1f(F.uSeedA, M.seedA), t.uniform1f(F.uSquash, M.F.squash), t.uniform1f(F.uRoll, M.F.roll || 0.03), t.uniform1f(F.uCurl, 0.9 * Math.sin(Math.PI * j(O))), t.uniform1f(F.uStubX, M.stubX ?? 0), t.uniform1f(F.uFoldSide, M.T.stub ? -1 : 1), t.uniform1f(F.uFoldBw, M.T.card ? 0.03 : 0.016), t.uniform1f(F.uFoldY, M.foldY || 0), t.uniform1f(F.uThick, O > 0.5 ? -6e-3 : 6e-3), t.uniform1f(F.uScale, w.sc), t.uniform1f(F.uBump, 1), t.uniform2f(F.uHalf, M.half[0], M.half[1]), t.uniform3f(F.uCam, 0, 0, Le), t.uniform3f(F.uColor, M.T.color[0], M.T.color[1], M.T.color[2]), t.uniform3f(F.uL, G[0], G[1], G[2]), t.uniform1f(F.uAge, M.age), t.uniform1f(F.uThru, M.T.card ? 0 : 0.035), t.uniform1f(F.uTime, w.time || 0), t.uniform1f(F.uFront, w.front ?? -1), t.uniform1f(F.uDestroy, w.destroy ? 1 : 0), t.uniform1f(F.uInkMax, 24e-4 * w.sc);
    let V = w.lampPos || [0, 0, 10];
    t.uniform3f(F.uLampPos, V[0], V[1], V[2]), t.uniform1f(F.uLamp, w.lamp || 0), t.uniform1f(F.uLampR, w.lampR || 1), t.uniformMatrix4fv(F.uModel, !1, A), t.uniformMatrix4fv(F.uProj, !1, P), (M.T.card ? [1, 0] : [0]).forEach((K) => {
      t.uniform1f(F.uEdge, K), M.meshes.forEach((N, Z) => {
        let X = Z === 1;
        X && (M.torn || (w.tear || 0) >= 1) || (t.uniform1f(F.uIsStub, X ? 1 : 0), t.uniform1f(F.uTear, X && w.tear || 0), t.bindVertexArray(N.vao), t.drawElements(t.TRIANGLES, N.count, t.UNSIGNED_SHORT, 0));
      });
    });
  }
  function we(M, w, P) {
    t.useProgram(o.p), t.disable(t.DEPTH_TEST), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA);
    let O = ce(j(w.p)), A = [M.F.ext[0] / 2 * w.sc, M.F.ext[1] / 2 * w.sc], F = [A[0] + (M.half[0] * w.sc - A[0]) * O, A[1] + (M.half[1] * w.sc - A[1]) * O], G = Math.min(Math.min(A[0], A[1]) * (1 - O) + 0.012 * w.sc * O, F[0], F[1]), V = (0.04 + 0.08 * w.lift + 0.04 * (1 - O)) * w.sc, $ = w.L || He, K = Math.hypot($[0], $[1]) || 1, N = (0.05 + 0.1 * w.lift) * w.sc * Math.min(1.6, K / Math.max(0.25, $[2]));
    t.uniform3f(o.u.uC, w.cx - $[0] / K * N, w.cy - $[1] / K * N, -0.25 * w.sc), t.uniform2f(o.u.uHS, F[0], F[1]), t.uniform1f(o.u.uR, G), t.uniform1f(o.u.uSoft, V), t.uniform1f(o.u.uA, (0.62 - 0.2 * w.lift) * (w.alpha ?? 1)), t.uniformMatrix4fv(o.u.uProj, !1, P), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, M.tFx), t.uniform1i(o.u.uFx, 0), t.uniform1f(o.u.uOpen, j((w.p - 0.85) / 0.15)), t.uniform1f(o.u.uFront, w.front ?? -1), t.uniform1f(o.u.uFlip, (w.f || 0) > 0.5 ? 1 : 0), t.bindVertexArray(a), t.drawArrays(t.TRIANGLE_STRIP, 0, 4);
  }
  function Ee(M, w, P, O = e.width, A = e.height) {
    if (m || p) return;
    t.viewport(0, 0, O, A), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT);
    let F = ge.mul(ge.persp(Fe, O / A, 0.1, 100), ge.T(0, 0, -Le));
    if (w && (w.st.alpha ?? 1) > 0.01 && we(w.P, w.st, F), t.disable(t.BLEND), t.enable(t.DEPTH_TEST), M.forEach((G) => ve(G.P, G.st, F)), P && P.n) {
      let G = P.buffer();
      t.useProgram(i.p), t.disable(t.DEPTH_TEST), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA), t.uniformMatrix4fv(i.u.uProj, !1, F), t.uniform1f(i.u.uPx, A / (2 * Math.tan(Fe / 2))), t.bindVertexArray(f), t.bindBuffer(t.ARRAY_BUFFER, u), t.bufferSubData(t.ARRAY_BUFFER, 0, G), t.drawArrays(t.POINTS, 0, G.length / 8);
    }
  }
  let H = null;
  function ke() {
    t.deleteFramebuffer(H.fb), t.deleteRenderbuffer(H.rb), t.deleteTexture(H.t), H = null;
  }
  function Oe(M, w = !1, P = "image/png", O = 256) {
    if (m || p) return "";
    let A = O;
    if (!H || H.S !== A) {
      H && ke();
      let X = t.createTexture();
      t.bindTexture(t.TEXTURE_2D, X), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA8, A, A, 0, t.RGBA, t.UNSIGNED_BYTE, null), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR);
      let Q = t.createRenderbuffer();
      t.bindRenderbuffer(t.RENDERBUFFER, Q), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, A, A);
      let fe = t.createFramebuffer();
      t.bindFramebuffer(t.FRAMEBUFFER, fe), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, X, 0), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, Q), H = { fb: fe, t: X, rb: Q, S: A, c: be(A, A) };
    }
    t.bindFramebuffer(t.FRAMEBUFFER, H.fb);
    let F = A / (2 * Le * Math.tan(Fe / 2)), G = w ? et(M) : 0, V = 0.9 * A / (tt(M, G) * F), { items: $ } = Ge(M, { p: G, f: 0, tear: 0, burnOpen: 0 }, { cx: 0, cy: 0, sc: V, scLetter: V, rot: ln(M, G), lift: 0, vhU: 1 });
    Ee($, null, null, A, A);
    let K = new Uint8Array(A * A * 4);
    t.readPixels(0, 0, A, A, t.RGBA, t.UNSIGNED_BYTE, K), t.bindFramebuffer(t.FRAMEBUFFER, null);
    let N = H.c.getContext("2d"), Z = N.createImageData(A, A);
    for (let X = 0; X < A; X++) {
      let Q = (A - 1 - X) * A * 4, fe = X * A * 4;
      for (let ee = 0; ee < A * 4; ee += 4) {
        let Me = K[Q + ee + 3], pe = Me ? 255 / Me : 0;
        Z.data[fe + ee] = Math.min(255, K[Q + ee] * pe), Z.data[fe + ee + 1] = Math.min(255, K[Q + ee + 1] * pe), Z.data[fe + ee + 2] = Math.min(255, K[Q + ee + 2] * pe), Z.data[fe + ee + 3] = Me;
      }
    }
    return N.putImageData(Z, 0, 0), H.c.toDataURL(P, 0.9);
  }
  function it() {
    if (m) return;
    m = !0, e.removeEventListener("webglcontextlost", v), e.removeEventListener("webglcontextrestored", b), [s, o, i].forEach((w) => t.deleteProgram(w.p)), t.deleteVertexArray(a), t.deleteBuffer(l), t.deleteVertexArray(f), t.deleteBuffer(u), [x, r, Y].forEach((w) => {
      w && t.deleteTexture(w);
    }), H && ke();
    let M = t.getExtension("WEBGL_lose_context");
    M && M.loseContext();
  }
  return { gl: t, build: k, refreshPrint: _, release: W, draw: Ee, snapshot: Oe, ensureBurn: J, isLost: () => p, destroy: it };
}

// .build/particles.js
function Mt(e = 420) {
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
var cn = {
  flip: "[ flip ]",
  tear: "[ tear stub ]",
  close: "[ close ]",
  hint: "drag to unfold",
  open: "Crumpled paper: open",
  back: "Back:"
}, rt = /* @__PURE__ */ (() => {
  let e = { labels: cn, remember: !1, motion: "auto", flashlight: !0, maxBuilt: 3 }, n = !1, t, s = !1, o, i, a, l, f, u, p, m, g, h = null, v = null, b = [], d = /* @__PURE__ */ new WeakMap(), E = [], x = Mt(), r = null, R = 0, I = (c) => c.replace(/\[\[[^\]\n]+\]\]/g, "redacted").replace(/~~[^~\n]+~~\{([^}\n]+)\}/g, "$1").replace(/~~([^~\n]+)~~/g, "$1").replace(/^# /gm, ""), D = 0.16, C = 0.9, Y = 0.42, oe = 1.5, re = 1;
  function k() {
    if (o) return;
    n = De(e.motion);
    let c = document.createElement("style");
    c.textContent = ":root{--crumple-backdrop:rgba(6,5,4,.8);--crumple-ui-bg:rgba(14,13,12,.7);--crumple-ui-fg:#ebe5d6;--crumple-ui-border:rgba(235,229,214,.4);--crumple-ui-font:12px/1 'Courier Prime',ui-monospace,monospace;--crumple-accent:#f5c266}.crumple-scene{position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483640;pointer-events:none;display:none;transition:opacity .3s ease;touch-action:none}.crumple-backdrop{position:fixed;inset:0;z-index:2147483630;background:transparent;pointer-events:none;transition:background .7s ease}.crumple-backdrop.on{background:var(--crumple-backdrop)}.crumple-bar{position:fixed;z-index:2147483645;right:18px;top:16px;display:none;gap:8px}.crumple-bar.on{display:flex}.crumple-bar button,.crumple-fallback button{background:var(--crumple-ui-bg);border:1px solid var(--crumple-ui-border);color:var(--crumple-ui-fg);font:var(--crumple-ui-font);letter-spacing:.18em;padding:9px 12px;cursor:pointer}.crumple-bar button[hidden]{display:none}.crumple-hint{position:fixed;z-index:2147483645;left:50%;bottom:8vh;transform:translateX(-50%);font:var(--crumple-ui-font);font-size:13px;letter-spacing:.2em;color:var(--crumple-ui-fg);background:var(--crumple-ui-bg);padding:8px 14px;opacity:0;transition:opacity .5s;pointer-events:none}.crumple-hint.on{opacity:1}.crumple-trigger{display:inline-block;width:96px;height:96px;padding:0;border:0;background:none;cursor:pointer;-webkit-tap-highlight-color:transparent}.crumple-trigger img{width:100%;height:100%;display:block;filter:drop-shadow(2px 7px 6px rgba(0,0,0,.6))}.crumple-trigger:hover img,.crumple-trigger:focus-visible img{animation:crumple-wiggle .75s ease}.crumple-trigger:focus-visible{outline:2px solid var(--crumple-accent);outline-offset:4px;border-radius:50%}.crumple-trigger.active{visibility:hidden}.crumple-trigger.recrumple img{animation:crumple-squeeze .9s ease}@keyframes crumple-wiggle{0%{transform:none}22%{transform:rotate(-8deg) translateY(-4px)}50%{transform:rotate(6deg) translateY(-1px)}78%{transform:rotate(-2deg)}100%{transform:none}}@keyframes crumple-squeeze{0%{transform:scale(1.15)}30%{transform:scale(.7) rotate(-20deg)}60%{transform:scale(1.05) rotate(10deg)}100%{transform:none}}.crumple-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.crumple-fallback{position:fixed;inset:0;z-index:2147483646;display:none;align-items:center;justify-content:center;background:var(--crumple-backdrop);padding:24px}.crumple-fallback.on{display:flex}.crumple-fallback .sheet{max-width:min(520px,90vw);max-height:86vh;overflow:auto;padding:36px 34px;box-shadow:0 18px 40px rgba(0,0,0,.6);white-space:pre-line;font-size:19px;line-height:1.6;color:#2a2219}.crumple-fallback .sheet img{display:block;max-width:100%;margin:0 auto 16px}.crumple-fallback button{position:fixed;right:18px;top:16px}.crumple-fallback del{color:#5b4d3e;text-decoration:line-through;text-decoration-thickness:2px}.crumple-fallback ins{text-decoration:none;color:#1d3a8c;font-family:Caveat,'Comic Sans MS',cursive;font-size:1.12em;padding:0 .12em}.crumple-fallback .crumple-h{display:block;font-weight:700;font-size:1.15em;margin:.2em 0}.crumple-fallback .crumple-redact{display:inline-block;height:.85em;vertical-align:-.08em;background:#1b1713;border-radius:2px;margin:0 .1em}@media (prefers-reduced-motion:reduce){.crumple-trigger.recrumple img,.crumple-trigger:hover img{animation:none}}", document.head.appendChild(c), h = c;
    let y = e.labels;
    i = document.createElement("div"), i.className = "crumple-backdrop", o = document.createElement("canvas"), o.className = "crumple-scene", o.setAttribute("aria-hidden", "true"), m = document.createElement("div"), m.className = "crumple-sr", m.id = "crumple-content", m.setAttribute("aria-live", "polite"), a = document.createElement("div"), a.className = "crumple-bar", a.setAttribute("role", "dialog"), a.setAttribute("aria-modal", "true"), a.setAttribute("aria-describedby", "crumple-content"), a.tabIndex = -1, l = document.createElement("button"), l.type = "button", l.textContent = y.flip, f = document.createElement("button"), f.type = "button", f.textContent = y.tear, f.hidden = !0, u = document.createElement("button"), u.type = "button", u.textContent = y.close, a.append(m, f, l, u), p = document.createElement("div"), p.className = "crumple-hint", p.textContent = y.hint, g = document.createElement("div"), g.className = "crumple-fallback", g.setAttribute("role", "dialog"), g.setAttribute("aria-modal", "true"), document.body.append(i, o, a, p, g), te(E, u, "click", () => M()), te(E, l, "click", () => O()), te(E, f, "click", () => A()), te(E, window, "keydown", (T) => {
      if (!(T.ctrlKey || T.metaKey || T.altKey || $e(T.target))) {
        if (g.classList.contains("on")) {
          T.key === "Escape" ? ne() : T.key === "Tab" && xe(T, g);
          return;
        }
        r && (T.key === "Tab" ? xe(T, a) : T.key === "Escape" ? M() : (T.key === "f" || T.key === "F") && O());
      }
    }), te(E, window, "resize", () => {
      r && (z(), H());
    }), te(E, window, "pointermove", (T) => {
      if (!e.flashlight || !r || r.phase !== "open" || r.dragging || T.pointerType === "touch") return;
      let S = r.boxCache || ve(), B = !!S && T.clientX > S.x0 - 30 && T.clientX < S.x1 + 30 && T.clientY > S.y0 - 30 && T.clientY < S.y1 + 30;
      ot(r, T.clientX, T.clientY, o.clientWidth, o.clientHeight, o.clientHeight / (2 * Le * Math.tan(Fe / 2)), B), H();
    }), te(E, document, "mouseout", (T) => {
      r && !T.relatedTarget && (r.lampOn = 0, H());
    }), te(E, document, "visibilitychange", () => {
      document.hidden || H();
    }), te(E, o, "dblclick", () => O()), v = We(), v && te(E, v, "change", () => {
      n = De(e.motion);
    }), E.push(wt(o, {
      active: () => r && r.phase === "open" ? r : null,
      box: ve,
      flip: () => O(),
      outside: () => M(),
      tap: (T) => {
        let S = we();
        return S && T.clientX > S.x0 && T.clientX < S.x1 && T.clientY > S.y0 && T.clientY < S.y1 ? (A(), !0) : !1;
      },
      redraw: () => H()
    }));
  }
  function _() {
    if (s) return t;
    s = !0, k();
    try {
      t = Ve(o, { onRestore: fe });
    } catch {
      t = null;
    }
    return t;
  }
  function z() {
    let c = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(24e5 / Math.max(1, innerWidth * innerHeight))), y = Math.round(innerWidth * c), T = Math.round(innerHeight * c);
    (o.width !== y || o.height !== T) && (o.width = y, o.height = T);
  }
  function J(c) {
    let y = r.P, T = o.clientWidth, S = o.clientHeight, B = S / (2 * Le * Math.tan(Fe / 2)), L = r.from, U = L.left + L.width / 2, se = L.top + L.height / 2, he = (U - T / 2) / B, Te = -(se - S / 2) / B, ye = 0.9 * L.width / ((r.ext0 || y.extent) * B), Pe = y.cfg.type === "envelope", je = Pe ? Math.min(0.5 * S / (y.T.body * B), 0.7 * T / (y.w * B)) : Math.min(0.86 * S / (y.h * B), 0.9 * T / (y.w * B)), xt = y.letter, dn = xt ? Math.min(0.86 * S / (xt.h * B), 0.9 * T / (xt.w * B)) : je, _e = n ? 1 : r.tf, Ot = ce(j(Pe ? r.p * 2 : r.p)), hn = Math.hypot(he, Te), Nt = (1 - _e) * (1 - _e), zt = 2 * (1 - _e) * _e, mn = r.arc || 0.24, bn = Nt * he + zt * he * 0.5, Tt = Nt * Te + zt * (Te * 0.5 + mn * hn), st = y.F, gn = st.shape === 0 && st.squash > 0.5 ? 1 : st.shape === 1 || st.shape === 2 ? 0.8 : 0.45, yn = n ? 0 : ce(_e) * gn, vn = [0.55, 1.15, 0.35], wn = [0, 0, -0.02], Rt = y.pose.map((Re, Gt) => (Re + vn[Gt] * yn) * (1 - Ot) + wn[Gt] * Ot), St = ye + (je - ye) * Math.pow(_e, 1.25), Xt = 0.9 * L.width / B, qt = r.pre ?? 1, Ke = r.bounce ?? 1, lt = r.settle ?? 1;
    if (qt < 1) {
      let Re = Math.sin(Math.PI * qt);
      St *= 1 + 0.12 * Re, Tt += Re * 0.16 * Xt;
    }
    if (Ke < 1) {
      let Re = (1 - Ke) * (1 - Ke);
      Tt += Math.abs(Math.sin(2 * Math.PI * Ke)) * Re * 0.4 * Xt, Rt[2] += 0.18 * Math.sin(2 * Math.PI * Ke) * Re;
    }
    let kt = lt < 1 ? Math.sin(Math.PI * 2.5 * lt) * (1 - lt) * (1 - lt) : 0, Yt = [0.05 * kt, 0.022 * kt, 0];
    for (let Re = 0; Re < 3; Re++) Rt[Re] += Yt[Re];
    return St *= 1 + 0.01 * kt, { cx: bn, cy: Tt, sc: St, scLetter: dn, rot: Rt, adjust: Yt, lift: Math.sin(Math.PI * _e), time: c / 1e3, ppu: B, vw: T, vh: S, vhU: S / B, L: He, lampPos: r.lampPos, lamp: r.lamp || 0, lampR: 0.3 * S / B };
  }
  function W(c = performance.now()) {
    let y = J(c);
    return { b: y, scene: Ge(r.P, r, y) };
  }
  function ve() {
    if (!r) return null;
    let { b: c, scene: y } = W();
    return nt(y.active.P, y.active.st, c.ppu, c.vw, c.vh);
  }
  function we() {
    if (!r || r.P.stubX === null || r.P.torn || r.p < 0.95 || r.f > 0.01) return null;
    let { b: c, scene: y } = W(), T = y.active.st, S = r.P, B = c.vw / 2 + T.cx * c.ppu, L = c.vh / 2 - T.cy * c.ppu;
    return { x0: B + S.stubX * T.sc * c.ppu, x1: B + S.half[0] * T.sc * c.ppu, y0: L - S.half[1] * T.sc * c.ppu, y1: L + S.half[1] * T.sc * c.ppu };
  }
  function Ee(c) {
    if (R = 0, !r || document.hidden || t.isLost() || r.rebuilding) return;
    if (!r.tw.length && !r.dragging && !r.lampMoving && !r.resume && r.tPrev && c - r.tPrev < 32) {
      R = requestAnimationFrame(Ee);
      return;
    }
    let y = r.resume ? 1 / 60 : Math.min(0.1, Math.max(0, (c - (r.tPrev || c)) / 1e3));
    r.resume = !1, r.tPrev = c;
    let T = yt(r, c);
    if (!r) return;
    let S = Et(r, y);
    r.lampMoving = S, r.P.burnPts && r.P.front0 > -0.5 && r.phase === "open" && r.destroy === void 0 && (r.burnOpen = Math.min(0.08, (r.burnOpen || 0) + y * 4e-3));
    let { b: B, scene: L } = W(c);
    r.boxCache = nt(L.active.P, L.active.st, B.ppu, B.vw, B.vh), vt(x, r, L, y), x.step(y), t.draw(L.items, L.shadow, x), r.pPrev = r.p;
    let U = L.active.st.front > -0.5 && !!L.active.P.burnPts;
    if (r.ashes && (x.n === 0 || c > r.ashesEnd)) {
      P();
      return;
    }
    (T || r.dragging || S || x.n > 0 || U || r.ashes) && (R = requestAnimationFrame(Ee));
  }
  function H() {
    !R && r && (r.resume = !0, R = requestAnimationFrame(Ee));
  }
  let ke = (c) => e.remember && !!de.get("opened." + c, !1);
  function Oe(c) {
    if (r || !c.P) return;
    let y = c.P;
    z();
    let T = de.get("opens." + y.cfg.id, 0) + 1;
    de.set("opens." + y.cfg.id, T), y.hasRedaction && requestAnimationFrame(() => t.refreshPrint(y).then(H));
    let S = c.opened ? et(y) : 0;
    r = { P: y, ent: c, from: c.btn.getBoundingClientRect(), tf: 0, p: S, ext0: tt(y, S), f: 0, tear: 0, tw: [], phase: "opening", dragging: !1, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 }, x.clear(), c.btn.classList.add("active"), o.style.display = "block", o.style.pointerEvents = "auto", i.classList.add("on"), a.classList.add("on"), a.setAttribute("aria-label", Se[y.cfg.type].name), u.focus({ preventScroll: !0 }), f.hidden = y.stubX === null || y.torn, m.replaceChildren(), pe(y.cfg.text, m), y.cfg.back && (m.append(`

\u2014 ` + e.labels.back + ` \u2014
`), pe(y.cfg.back, m));
    let B = y.cfg.open === "drag", L = y.cfg.type === "envelope", U = () => {
      r && (r.phase = "open", B && r.p < 0.5 && p.classList.add("on"));
    };
    if (n)
      o.style.opacity = "0", requestAnimationFrame(() => {
        o.style.opacity = "1";
      }), r.tf = 1, r.phase = "open", B ? p.classList.add("on") : (ue(r, "p", 1, re * (L ? 1.6 : 1), Ne), ie.play("uncrumple", re));
    else {
      r.pre = 0, r.arc = 0.24;
      let he = D * 0.55, Te = L ? oe * 1.85 : oe;
      if (ue(r, "pre", 1, D, me), ue(r, "tf", 1, C, Ht, he, U), !B) {
        let ye = () => {
          r && r.phase !== "closing" && (r.settle = 0, ue(r, "settle", 1, 0.9, me), H());
        };
        ue(r, "p", 1, Te, L ? ze : ut(y), he + Y, ye), ie.play(L ? "seal" : "uncrumple", Te, he + Y);
      }
    }
    y.front0 > -0.5 && ie.play("fire", 2.5, 0.6), e.remember && de.set("opened." + y.cfg.id, !0), Ue(c.btn, "open", { id: y.cfg.id, openings: T }), H();
    let { scene: se } = W();
    t.draw(se.items, se.shadow, x);
  }
  function it() {
    !r || !r.burnOpen || (r.P.burned = Math.min(0.2, r.P.burned + r.burnOpen), de.set("burned." + r.P.cfg.id, r.P.burned), r.burnOpen = 0);
  }
  function M() {
    if (!r || r.phase === "closing") return;
    if (r.P.cfg.burnAfterReading && r.p > 0.9 && r.phase === "open") {
      w();
      return;
    }
    it(), r.phase = "closing", r.dragging = !1, r.lampOn = 0, r.from = r.ent.btn.getBoundingClientRect(), i.classList.remove("on"), a.classList.remove("on"), p.classList.remove("on"), o.style.pointerEvents = "none", r.tw = r.tw.filter((B) => B.key !== "settle"), r.settle = 1;
    let c = r.P.cfg.type === "envelope", y = ke(r.P.cfg.id) ? et(r.P) : 0;
    r.tf > 0.999 && (r.ext0 = tt(r.P, y));
    let T = n ? 0.6 : c ? 1.9 : 0.85, S = T * Math.max(0.35, r.p - y);
    if (r.f > 0 && ue(r, "f", 0, 0.45, Be), r.p > y + 0.02 && ie.play("crumple", S), ue(r, "p", y, S, c ? ze : ct(r.P)), n) ue(r, "tf", 1, T, me, 0, P);
    else {
      r.tf > 0.999 && (r.arc = 0.34);
      let B = () => {
        r && (r.bounce = 0, ue(r, "bounce", 1, 0.36, me, 0, P));
      };
      ue(r, "tf", 0, 0.78, Vt, S * (c ? 0.8 : 0.5), B);
    }
    Ue(r.ent.btn, "close", { id: r.P.cfg.id }), H();
  }
  function w() {
    it(), r.phase = "closing", r.dragging = !1, a.classList.remove("on"), p.classList.remove("on"), o.style.pointerEvents = "none", r.f > 0 && ue(r, "f", 0, 0.4, Be);
    let c = r.P.letter || r.P;
    r.destroy = Math.max(c.front0 > -0.5 ? c.front0 + c.burned : -0.06, -0.06), ie.play("fire", 2.8), ue(r, "destroy", 1.6, n ? 1.2 : 2.6, me, 0, () => {
      if (!r) return;
      r.ashes = !0, r.ashesEnd = performance.now() + 3e3, i.classList.remove("on");
      let y = r.ent;
      de.set("destroyed." + y.cfg.id, !0), y.destroyed = !0, Ue(y.btn, "burn", { id: y.cfg.id });
    }), H();
  }
  function P() {
    if (!r) return;
    let c = r.ent, y = !!r.ashes;
    r = null, x.clear(), i.classList.remove("on");
    let T = () => {
      r || (o.style.display = "none", o.style.opacity = ""), y ? (c.btn.hidden = !0, c.btn.classList.remove("active")) : (!r || r.ent !== c) && c.btn.classList.remove("active");
    };
    n ? (o.style.opacity = "0", setTimeout(T, 300)) : T(), m.textContent = "", y || c.btn.focus({ preventScroll: !0 }), ee(c);
  }
  function O() {
    !r || r.phase === "closing" || r.destroy !== void 0 || (ie.play("flip"), qe(10), ue(r, "f", r.f < 0.5 ? 1 : 0, 0.8, me), Ue(r.ent.btn, "flip", { id: r.P.cfg.id, back: r.f < 0.5 }), H());
  }
  function A() {
    !r || r.P.stubX === null || r.P.torn || r.tear > 0 || r.p < 0.95 || r.f > 0.01 || (ie.play("tear"), qe([15, 20, 15, 20, 30]), Ue(r.ent.btn, "tear", { id: r.P.cfg.id }), f.hidden = !0, ue(r, "tear", 1, n ? 0.3 : 1, me, 0, () => {
      r && (r.P.torn = !0);
    }), H());
  }
  function F(c, y, T = {}) {
    let S = { btn: c, cfg: Ye(y), P: null, building: null, opts: T, opened: !1, off: [], io: null, gone: !1, madeImg: !1, madeLabel: !1 };
    return document.body ? G(S) : document.addEventListener("DOMContentLoaded", () => G(S), { once: !0 }), S;
  }
  function G(c) {
    let { btn: y, cfg: T, opts: S } = c;
    k();
    let B = d.get(y);
    B && V(B);
    let L = b.find((se) => se.cfg.id === T.id);
    L && (console.warn(`crumple: id "${T.id}" is already attached, the previous paper is detached`), V(L)), b.push(c), d.set(y, c), y.classList.add("crumple-trigger"), y.getAttribute("aria-label") || (y.setAttribute("aria-label", e.labels.open), c.madeLabel = !0), de.get("destroyed." + T.id, !1) && (y.hidden = !0, c.destroyed = !0), c.opened = ke(T.id), te(c.off, y, "click", async () => {
      await X(c) ? Oe(c) : q(c);
    });
    let U = y.querySelector("img");
    if (S.snapshot) {
      U || (U = document.createElement("img"), U.alt = "", y.appendChild(U), c.madeImg = !0), U.onerror = () => {
        c.opts = {}, U.onerror = null, $(c);
      }, U.src = c.opened && S.snapshotOpened ? S.snapshotOpened : S.snapshot;
      let se = () => {
        K(() => X(c));
      };
      ["pointerenter", "focus", "touchstart"].forEach((he) => te(c.off, y, he, se, { once: !0, passive: !0 })), te(c.off, y, "pointerdown", () => X(c), { passive: !0 });
    } else $(c);
  }
  function V(c) {
    c.gone = !0, c.off.splice(0).forEach((S) => S()), c.io && c.io.disconnect();
    let y = b.indexOf(c);
    y >= 0 && b.splice(y, 1);
    let T = N.indexOf(c);
    if (T >= 0 && N.splice(T, 1), r && r.ent === c && P(), c.P && (t.release(c.P), c.P = null), d.get(c.btn) === c && d.delete(c.btn), c.btn.classList.remove("crumple-trigger", "active", "recrumple"), c.madeLabel && c.btn.removeAttribute("aria-label"), c.madeImg) {
      let S = c.btn.querySelector("img");
      S && S.remove();
    }
  }
  function $(c) {
    if ("IntersectionObserver" in window) {
      let y = new IntersectionObserver((T) => T.forEach((S) => {
        S.isIntersecting && (y.disconnect(), K(() => X(c).then(() => ee(c))));
      }), { rootMargin: "600px 0px" });
      c.io = y, y.observe(c.btn);
    } else K(() => X(c).then(() => ee(c)));
  }
  let K = (c) => globalThis.requestIdleCallback ? requestIdleCallback(c, { timeout: 700 }) : setTimeout(c, 60), N = [], Z = 0;
  function X(c) {
    if (c.P) {
      let y = N.indexOf(c);
      return y >= 0 && N.push(N.splice(y, 1)[0]), Promise.resolve(c.P);
    }
    return c.building ? c.building : c.building = Q(c);
  }
  async function Q(c) {
    let y = Z;
    try {
      if (c.gone || !_() || t.isLost()) return null;
      let T = t, S = await T.build(c.cfg);
      if (y !== Z) return null;
      if (c.gone)
        return T.release(S), null;
      for (c.P = S, N.push(c); N.length > e.maxBuilt; ) {
        let B = N.findIndex((U) => (!r || U !== r.ent) && U !== c);
        if (B < 0) break;
        let L = N.splice(B, 1)[0];
        !L.opts.snapshot && L.P && ee(L), L.P && T.release(L.P), L.P = null, L.building = null;
      }
      return c.P;
    } catch (T) {
      return console.warn("crumple: the paper could not be built, the CSS version is shown instead", T), null;
    } finally {
      y === Z && (c.building = null);
    }
  }
  function fe() {
    Z++;
    let c = N.splice(0);
    if (b.forEach((y) => {
      y.P = null, y.building = null;
    }), c.forEach((y) => X(y).then(() => ee(y))), r) {
      let y = r.ent;
      r.rebuilding = !0, X(y).then((T) => {
        !r || r.ent !== y || (T ? (r.P = T, r.rebuilding = !1, H()) : (r.ashes = !1, P()));
      });
    }
  }
  function ee(c) {
    if (c.destroyed || c.gone) return;
    c.opened = ke(c.cfg.id);
    let y = c.btn.querySelector("img");
    if (y || (y = document.createElement("img"), y.alt = "", c.btn.appendChild(y), c.madeImg = !0), c.opts.snapshot) {
      y.src = c.opened && c.opts.snapshotOpened ? c.opts.snapshotOpened : c.opts.snapshot;
      return;
    }
    c.P && t && (y.src = t.snapshot(c.P, c.opened));
  }
  function Me() {
    let c = !1;
    b.forEach((y) => {
      de.remove("opened." + y.cfg.id), !(!y.opened || y.destroyed) && (c = !0, ee(y), y.btn.classList.remove("recrumple"), y.btn.offsetWidth, y.btn.classList.add("recrumple"));
    }), c && ie.play("crumple", 0.9);
  }
  function pe(c, y) {
    let T = !1;
    c.split(`
`).forEach((S, B) => {
      let L = S.startsWith("# ");
      B && !L && !T && y.append(`
`), T = L;
      let U = L ? S.slice(2) : S, se = L ? document.createElement("span") : y;
      L && (se.className = "crumple-h");
      let he = /~~([^~\n]+)~~(?:\{([^}\n]+)\})?|\[\[([^\]\n]+)\]\]/g, Te = 0, ye;
      for (; ye = he.exec(U); ) {
        if (ye.index > Te && se.append(U.slice(Te, ye.index)), ye[3] !== void 0) {
          let Pe = document.createElement("span");
          Pe.className = "crumple-redact", Pe.setAttribute("role", "img"), Pe.setAttribute("aria-label", "redacted"), Pe.style.width = Math.max(3, ye[3].length * 0.5) + "em", se.append(Pe);
        } else {
          let Pe = document.createElement("del");
          if (Pe.textContent = ye[1], se.append(Pe), ye[2] !== void 0) {
            let je = document.createElement("ins");
            je.textContent = ye[2], se.append(je);
          }
        }
        Te = he.lastIndex;
      }
      Te < U.length && se.append(U.slice(Te)), L && y.append(se);
    });
  }
  function q(c) {
    k();
    let y = Se[c.cfg.type], T = (L) => Math.round(y.color[L] * 255), S = document.createElement("div");
    if (S.className = "sheet", S.style.background = `rgb(${T(0)},${T(1)},${T(2)})`, S.style.fontFamily = `"${y.font}", "Courier Prime", monospace`, c.opts.snapshotOpened) {
      let L = document.createElement("img");
      L.src = c.opts.snapshotOpened, L.alt = "", S.appendChild(L);
    }
    pe(c.cfg.text, S), c.cfg.back && (S.append(`

\u2014 ` + e.labels.back + ` \u2014
`), pe(c.cfg.back, S));
    let B = document.createElement("button");
    B.type = "button", B.textContent = e.labels.close, B.addEventListener("click", ne), g.setAttribute("aria-label", y.name), g.replaceChildren(S, B), g.classList.add("on"), B.focus(), g.onclick = (L) => {
      L.target === g && ne();
    }, g._ent = c, Ue(c.btn, "open", { id: c.cfg.id, fallback: !0 });
  }
  function ne() {
    g.classList.remove("on"), g._ent && g._ent.btn.focus({ preventScroll: !0 });
  }
  function xe(c, y) {
    let T = [...y.querySelectorAll("button")].filter((U) => !U.hidden);
    if (!T.length) return;
    c.preventDefault();
    let S = T.indexOf(document.activeElement), B = T.length - 1, L = S < 0 ? 0 : c.shiftKey ? S === 0 ? B : S - 1 : S === B ? 0 : S + 1;
    T[L].focus({ preventScroll: !0 });
  }
  let $e = (c) => !!c && (c.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(c.tagName));
  function Ie() {
    o && (r = null, cancelAnimationFrame(R), R = 0, b.slice().forEach(V), N.length = 0, E.splice(0).forEach((c) => c()), t && t.destroy(), t = null, s = !1, h.remove(), [i, o, a, p, m, g].forEach((c) => c.remove()), i = o = a = p = m = g = null, x.clear());
  }
  return {
    // options: { labels, remember, motion: 'auto' | 'reduce' | 'full' ('reduced' still works), flashlight, maxBuilt }
    init(c = {}) {
      e = { ...e, ...c, labels: { ...cn, ...c.labels || {} } }, o && (l.textContent = e.labels.flip, f.textContent = e.labels.tear, u.textContent = e.labels.close, p.textContent = e.labels.hint), k(), n = De(e.motion), K(() => {
        o && _();
      });
    },
    attach: F,
    // detaches a trigger element, or the paper with that id
    detach(c) {
      let y = typeof c == "string" ? b.find((T) => T.cfg.id === c) : d.get(c);
      y && V(y);
    },
    destroy: Ie,
    open: (c) => X(c).then((y) => y ? Oe(c) : q(c)),
    close: M,
    flip: O,
    tear: A,
    reset: Me,
    get reducedMotion() {
      return n;
    },
    get entries() {
      return b;
    },
    get isOpen() {
      return !!r;
    },
    // debugging/testing: draws a fixed frame (flight, unfold, flip, tear, burn front) of an attached paper
    async frame(c, y, T, S = 0, B = 0, L) {
      let U = b[c];
      await X(U), L !== void 0 && await t.ensureBurn(U.P), cancelAnimationFrame(R), R = 0, z(), r = { P: U.P, ent: U, from: U.btn.getBoundingClientRect(), tf: y, p: T, f: S, tear: B, tw: [], phase: "open", burnOpen: 0 }, L !== void 0 && (r.destroy = L), o.style.display = "block", i.classList.add("on"), b.forEach((he) => he.btn.classList.toggle("active", he === U));
      let { scene: se } = W();
      t.draw(se.items, se.shadow, null);
    },
    // debugging/testing: lights the flashlight at screen (x, y) and draws
    flashlight(c, y) {
      if (r) {
        ot(r, c, y, o.clientWidth, o.clientHeight, o.clientHeight / (2 * Le * Math.tan(Fe / 2)), !0), r.lampPos = r.lampGoal.slice(), r.lamp = 1;
        let { scene: T } = W();
        t.draw(T.items, T.shadow, null);
      }
    },
    get debug() {
      return r ? { phase: r.phase, ashes: !!r.ashes, destroy: r.destroy, n: x.n, raf: R, tw: r.tw.map((c) => c.key), lampPos: r.lampPos, lamp: r.lamp } : null;
    }
  };
})();

// .build/stage.js
var fn = 1.5;
function pn(e, n = {}) {
  let t = { flashlight: !0, drag: !0, fit: 0.8, motion: "auto", ...n }, s, o = !1, i = De(t.motion);
  try {
    s = Ve(e, { onRestore: C });
  } catch {
    s = null;
  }
  if (!s) return null;
  let a = (k, _, z, J, W, ve, we) => ue(k, _, z, i ? J * 0.4 : J, W, ve, we), l = null, f = 0, u = 0, p = null, m = "", g = null, h = [], v = Mt(), b = { p: 1, f: 0, tear: 0, tw: [], dragging: !1, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 };
  function d() {
    let k = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(4e6 / Math.max(1, e.clientWidth * e.clientHeight))), _ = Math.round(e.clientWidth * k), z = Math.round(e.clientHeight * k);
    (e.width !== _ || e.height !== z) && (e.width = _, e.height = z);
  }
  function E(k) {
    let _ = e.clientWidth, z = e.clientHeight, J = z / (2 * Le * Math.tan(Fe / 2)), W = l.cfg.type === "envelope", ve = W ? Math.min(t.fit * 0.69 * z / (l.T.body * J), 0.7 * _ / (l.w * J)) : Math.min(t.fit * z / (l.h * J), (t.fit + 0.06) * _ / (l.w * J)), we = l.letter ? Math.min(t.fit * z / (l.letter.h * J), (t.fit + 0.06) * _ / (l.letter.w * J)) : ve, Ee = ce(j(W ? b.p * 2 : b.p)), H = [0, 0, -0.02];
    return { cx: 0, cy: 0, sc: ve, scLetter: we, rot: l.pose.map((ke, Oe) => ke * (1 - Ee) + H[Oe] * Ee), lift: 0, time: k / 1e3, ppu: J, vw: _, vh: z, vhU: z / J, L: He, lampPos: b.lampPos, lamp: b.lamp || 0, lampR: 0.3 * z / J };
  }
  let x = (k = performance.now()) => {
    let _ = E(k);
    return { b: _, scene: Ge(l, b, _) };
  };
  function r(k) {
    if (f = 0, !l || document.hidden || o || s.isLost()) return;
    d();
    let _ = b.resume ? 1 / 60 : Math.min(0.05, Math.max(0, (k - (b.tPrev || k)) / 1e3));
    b.resume = !1, b.tPrev = k;
    let z = yt(b, k), J = Et(b, _), { scene: W } = x(k);
    vt(v, b, W, _), v.step(_), s.draw(W.items, W.shadow, v), b.pPrev = b.p, (z || b.dragging || J || v.n > 0 || W.active.st.front > -0.5 && W.active.P.burnPts) && (f = requestAnimationFrame(r));
  }
  let R = () => {
    !f && !o && (b.resume = !0, f = requestAnimationFrame(r));
  };
  function I() {
    if (!l) return null;
    let { b: k, scene: _ } = x(), z = e.getBoundingClientRect();
    return nt(_.active.P, _.active.st, k.ppu, k.vw, k.vh, z.left, z.top);
  }
  t.drag && (m = e.style.touchAction, e.style.touchAction = "none", p = wt(e, { active: () => l ? b : null, box: I, outside: () => {
  }, redraw: R })), te(h, e, "dblclick", () => re.flip()), t.flashlight && (te(h, e, "pointermove", (k) => {
    if (!l || b.dragging || k.pointerType === "touch") return;
    let _ = I(), z = e.getBoundingClientRect(), J = !!_ && k.clientX > _.x0 - 30 && k.clientX < _.x1 + 30 && k.clientY > _.y0 - 30 && k.clientY < _.y1 + 30;
    ot(b, k.clientX - z.left, k.clientY - z.top, e.clientWidth, e.clientHeight, e.clientHeight / (2 * Le * Math.tan(Fe / 2)), J), R();
  }), te(h, e, "pointerleave", () => {
    b.lampOn = 0, R();
  })), te(h, window, "resize", () => R()), te(h, document, "visibilitychange", () => {
    document.hidden || R();
  });
  let D = We();
  D && t.motion === "auto" && te(h, D, "change", () => {
    i = De(t.motion);
  });
  function C() {
    let k = l && l.cfg, _ = b.p;
    l = null, k && re.set(k, { progress: _ }).catch((z) => console.warn("crumple: rebuild after context restore failed", z));
  }
  function Y() {
    o || (o = !0, u++, cancelAnimationFrame(f), f = 0, h.splice(0).forEach((k) => k()), p && p(), t.drag && (e.style.touchAction = m), l && s.release(l), l = null, b.tw = [], v.clear(), s.destroy());
  }
  let oe = () => l.cfg.type === "envelope", re = {
    // builds a paper from a config and shows it (resolves with the paper, or null if a newer call replaced it)
    async set(k, { progress: _ } = {}) {
      if (o) return null;
      let z = ++u, J = await s.build(k);
      return z !== u || o ? (s.release(J), null) : (l && s.release(l), l = J, b.tear = 0, b.f = 0, l.torn = !1, delete b.destroy, _ !== void 0 && (b.tw = [], b.p = j(_)), v.clear(), R(), l);
    },
    crumple() {
      l && (ie.play("crumple", 0.9), a(b, "p", 0, oe() ? 1.9 : 0.9, oe() ? ze : ct(l)), R());
    },
    uncrumple() {
      l && (ie.play(oe() ? "seal" : "uncrumple", 1.5), a(b, "p", 1, oe() ? fn * 1.85 : fn, oe() ? ze : ut(l)), R());
    },
    toggle() {
      b.p > 0.5 ? re.crumple() : re.uncrumple();
    },
    // any time, except once the paper burns away; the side it shows is kept through crumple and unfold
    flip() {
      !l || b.destroy !== void 0 || (ie.play("flip"), a(b, "f", b.f < 0.5 ? 1 : 0, 0.8, me), R());
    },
    tear() {
      !l || l.stubX === null || b.tear > 0 || b.p < 0.95 || (ie.play("tear"), a(b, "tear", 1, 1, me, 0, () => {
        l.torn = !0;
      }), R());
    },
    restoreStub() {
      l && (b.tear = 0, l.torn = !1, R());
    },
    // resolves once the paper has its burn field (built on demand for any paper); a second call meanwhile does nothing,
    // and a paper replaced by set() meanwhile is not burnt
    async burn() {
      let k = l;
      if (!k || b.destroy !== void 0 || g === k) return;
      g = k;
      try {
        await s.ensureBurn(k);
      } finally {
        g === k && (g = null);
      }
      if (l !== k || b.destroy !== void 0) return;
      let _ = k.letter || k;
      ie.play("fire", 2.6), b.destroy = Math.max(_.front0 > -0.5 ? _.front0 + _.burned : -0.06, -0.06), a(b, "destroy", 1.6, 2.6, me), R();
    },
    restore() {
      delete b.destroy, v.clear(), R();
    },
    setProgress(k) {
      b.tw = [], b.p = j(k), R();
    },
    // PNG of the current frame (draws and reads at once, no preserved buffer needed)
    png() {
      if (!l) return "";
      d();
      let { scene: k } = x();
      return s.draw(k.items, k.shadow, null), e.toDataURL("image/png");
    },
    snapshot(k, _, z) {
      return l ? s.snapshot(l, k, _, z) : "";
    },
    get state() {
      return b;
    },
    get paper() {
      return l;
    },
    destroy: Y
  };
  return re;
}

// .build/element.js
var at = class extends (typeof HTMLElement < "u" ? HTMLElement : class {
}) {
  connectedCallback() {
    let n = this.querySelector("button");
    n || (n = document.createElement("button"), n.type = "button", this.appendChild(n), this._madeBtn = !0), this.btn = n;
    let t = this.getAttribute("states"), s = t ? t.split(",").map((f) => f.trim()).filter(Boolean) : void 0, o = {
      id: this.getAttribute("id") || void 0,
      type: this.getAttribute("type") || void 0,
      shape: this.getAttribute("shape") || void 0,
      states: s,
      text: this.getAttribute("text") || (this._madeBtn ? "" : n.textContent || ""),
      back: this.getAttribute("back") || void 0,
      open: this.getAttribute("open") || void 0,
      seed: this.hasAttribute("seed") ? Number(this.getAttribute("seed")) : void 0
    }, i = this.getAttribute("snapshot") || void 0, a = this.getAttribute("snapshot-opened") || void 0, l = i || a ? { snapshot: i, snapshotOpened: a } : void 0;
    this.entry = rt.attach(n, o, l);
  }
  disconnectedCallback() {
    this.btn && rt.detach(this.btn), this._madeBtn && this.btn.parentNode && this.btn.remove(), this.entry = null;
  }
};
typeof customElements < "u" && !customElements.get("crumple-paper") && customElements.define("crumple-paper", at);

// .build/index.js
var eo = "1.1.1";
//# sourceMappingURL=crumple.cjs.map
