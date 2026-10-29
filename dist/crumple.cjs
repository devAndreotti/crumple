var Ct = Object.defineProperty;
var wn = Object.getOwnPropertyDescriptor;
var Pn = Object.getOwnPropertyNames;
var Rn = Object.prototype.hasOwnProperty;
var Mn = (e, n) => {
  for (var t in n)
    Ct(e, t, { get: n[t], enumerable: !0 });
}, kn = (e, n, t, l) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let o of Pn(n))
      !Rn.call(e, o) && o !== t && Ct(e, o, { get: () => n[o], enumerable: !(l = wn(n, o)) || l.enumerable });
  return e;
};
var An = (e) => kn(Ct({}, "__esModule", { value: !0 }), e);

// .build/index.js
var po = {};
Mn(po, {
  CrumplePaper: () => it,
  Renderer: () => je,
  SHAPES: () => Ot,
  STATES: () => We,
  Scene: () => at,
  Sound: () => le,
  Stage: () => cn,
  TEXTS: () => Dt,
  TYPES: () => Re,
  config: () => _e,
  normalize: () => Ye,
  registerPaperType: () => Jt,
  registerWearState: () => Zt,
  version: () => uo
});
module.exports = An(po);

// .build/util.js
function ne(e) {
  let n = Math.imul(e | 0, 2654435761) >>> 0 || 1;
  return () => (n ^= n << 13, n >>>= 0, n ^= n >>> 17, n ^= n << 5, n >>>= 0, n / 4294967296);
}
function Le(e) {
  let n = (l, o) => {
    let r = Math.imul(l, 374761393) + Math.imul(o, 668265263) + Math.imul(e, 1442695041) | 0;
    return r = Math.imul(r ^ r >>> 13, 1274126177), ((r ^ r >>> 16) >>> 0) / 4294967296;
  }, t = (l, o) => {
    let r = Math.floor(l), a = Math.floor(o), s = l - r, u = o - a, f = s * s * (3 - 2 * s), d = u * u * (3 - 2 * u), p = n(r, a), m = n(r + 1, a), h = n(r, a + 1), S = n(r + 1, a + 1);
    return p + (m - p) * f + (h - p) * d + (p - m - h + S) * f * d;
  };
  return (l, o) => (t(l, o) * 0.5 + t(l * 2, o * 2) * 0.25 + t(l * 4, o * 4) * 0.125 + t(l * 8, o * 8) * 0.0625) / 0.9375;
}
var K = (e, n = 0, t = 1) => Math.min(t, Math.max(n, e)), ue = (e) => e * e * (3 - 2 * e), Ze = (e, n, t) => e + (n - e) * t, De = (e) => e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2, qe = (e) => 1 - (1 - e) * (1 - e), Lt = (e) => 0.5 * ue(e) + 0.5 * qe(e), be = (e) => e, jt = (e) => 0.35 * ue(e) + 0.65 * (1 - Math.pow(1 - e, 3)), Kt = (e) => e * e * (1.6 - 0.6 * e), ze = (e) => 0.55 * e + 0.45 * ue(e), ut = (e) => e.F.shape === 0 ? (n) => 1 - Math.pow(1 - n, 2.3) : Lt, pt = (e) => e.F.shape === 0 ? (n) => 1 - Math.pow(1 - n, 2.2) : De, _e = {
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
}, he = {
  get(e, n) {
    try {
      let t = localStorage.getItem(_e.storagePrefix + e);
      return t === null ? n : JSON.parse(t);
    } catch {
      return n;
    }
  },
  set(e, n) {
    try {
      localStorage.setItem(_e.storagePrefix + e, JSON.stringify(n));
    } catch {
    }
  },
  remove(e) {
    try {
      localStorage.removeItem(_e.storagePrefix + e);
    } catch {
    }
  }
}, ye = (e, n, t) => {
  let l = document.createElement("canvas");
  return l.width = e, l.height = n, t && l.getContext("2d", { willReadFrequently: !0 }), l;
}, ie = (e, n) => `rgba(${e[0]},${e[1]},${e[2]},${n})`;
function Ue(e, n, t) {
  try {
    (e || document).dispatchEvent(new CustomEvent("crumple:" + n, { bubbles: !0, detail: t }));
  } catch {
  }
}
function Qe() {
  try {
    return matchMedia("(prefers-reduced-motion: reduce)");
  } catch {
    return null;
  }
}
function Be(e) {
  if (e === "full") return !1;
  if (e === "reduce" || e === "reduced") return !0;
  let n = Qe();
  return !!n && n.matches;
}
function oe(e, n, t, l, o) {
  n.addEventListener(t, l, o), e.push(() => n.removeEventListener(t, l, o));
}
var _n = { "Special Elite": "Special+Elite", "Courier Prime": "Courier+Prime:wght@400;700", Caveat: "Caveat:wght@500", VT323: "VT323", "Libre Baskerville": "Libre+Baskerville:ital,wght@0,400;0,700;1,400" }, It = {};
function xt(e) {
  return document.fonts ? Promise.all(e.map((n) => {
    if (!It[n]) {
      let t = _n[n], l = t ? "family=" + t.split(":")[0] : null, r = !t || !_e.googleFonts || [...document.querySelectorAll("link[rel=stylesheet]")].some((a) => a.href.includes(l)) ? Promise.resolve() : new Promise((a) => {
        let s = document.createElement("link");
        s.rel = "stylesheet", s.href = "https://fonts.googleapis.com/css2?family=" + t + "&display=swap", s.onload = a, s.onerror = a, setTimeout(a, 4e3), document.head.appendChild(s);
      });
      It[n] = r.then(() => Promise.all(["", "bold ", "italic "].map((a) => document.fonts.load(`${a}40px "${n}"`).catch(() => null))));
    }
    return It[n];
  })) : Promise.resolve();
}
var Ft = {};
function dt(e) {
  return Ft[e] || (Ft[e] = new Promise((n) => {
    let t = new Image();
    t.crossOrigin = "anonymous", t.onload = () => t.decode ? t.decode().then(() => n(t), () => n(t)) : n(t), t.onerror = () => n(null), t.src = e;
  })), Ft[e];
}
var Ge = (e) => dt(_e.assets + "textures/" + e + ".webp");
function Xe(e) {
  try {
    typeof navigator < "u" && "vibrate" in navigator && navigator.vibrate(e);
  } catch {
  }
}

// .build/catalog.js
var Re = {
  typed: { name: "Typewritten sheet", w: 0.84, h: 1.1, color: [0.945, 0.92, 0.865], shape: "ball", font: "Special Elite", size: 42, lineHeight: 62, x: 96, y: 190, ink: [31, 29, 28], typewriter: !0 },
  notebook: { name: "Notebook page", w: 0.84, h: 1.1, color: [0.955, 0.945, 0.905], shape: "flat", font: "Caveat", size: 56, lineHeight: 52, x: 150, y: 206, ink: [28, 45, 110], hand: !0 },
  form: { name: "Continuous form", w: 0.92, h: 1, color: [0.95, 0.95, 0.935], shape: "quarters", font: "VT323", size: 46, lineHeight: 64, x: 120, y: 172, ink: [44, 44, 58], typewriter: !0 },
  receipt: { name: "Thermal receipt", w: 0.42, h: 1.26, color: [0.975, 0.97, 0.955], shape: "roll", font: "VT323", size: 40, lineHeight: 46, x: 36, y: 110, ink: [64, 64, 80], typewriter: !0, fades: !0 },
  ticket: { name: "Theatre ticket", w: 1, h: 0.46, color: [0.93, 0.875, 0.76], shape: "half", font: "Special Elite", size: 38, lineHeight: 52, x: 70, y: 130, ink: [120, 28, 30], card: !0, stub: 0.27 },
  memo: { name: "Office memo", w: 0.84, h: 1.1, color: [0.965, 0.96, 0.94], shape: "ball", font: "Courier Prime", size: 33, lineHeight: 50, x: 100, y: 330, ink: [25, 25, 30], typewriter: !0 },
  newspaper: { name: "Newspaper clipping", w: 0.8, h: 1, color: [0.85, 0.84, 0.79], shape: "twist", font: "Libre Baskerville", size: 25, lineHeight: 38, x: 56, y: 330, ink: [28, 28, 28] },
  sticky: { name: "Sticky note", w: 0.5, h: 0.5, color: [0.985, 0.88, 0.38], shape: "half", font: "Caveat", size: 62, lineHeight: 70, x: 50, y: 150, ink: [30, 40, 100], hand: !0 },
  polaroid: { name: "Instant photo", w: 0.62, h: 0.74, color: [0.975, 0.972, 0.96], shape: "flat", font: "Caveat", size: 50, lineHeight: 54, x: 50, y: 640, ink: [30, 40, 100], hand: !0, card: !0, photo: !0 },
  envelope: { name: "Sealed envelope", w: 0.9, h: 0.96, body: 0.6, flap: 0.36, color: [0.93, 0.885, 0.79], shape: "envelope", font: "Caveat", size: 46, lineHeight: 50, x: 90, y: 600, ink: [30, 40, 100], hand: !0 },
  blueprint: { name: "Technical blueprint", w: 0.96, h: 0.72, color: [0.045, 0.145, 0.25], shape: "quarters", font: "Courier Prime", size: 28, lineHeight: 42, x: 64, y: 140, ink: [215, 240, 255], typewriter: !0 },
  postcard: { name: "Vintage postcard", w: 0.94, h: 0.62, color: [0.96, 0.95, 0.92], shape: "flat", font: "Caveat", size: 44, lineHeight: 50, x: 70, y: 120, ink: [24, 38, 90], hand: !0, card: !0 },
  punchcard: { name: "IBM 80-col punch card", w: 1.05, h: 0.48, color: [0.96, 0.93, 0.84], shape: "flat", font: "Courier Prime", size: 16, lineHeight: 24, x: 34, y: 24, ink: [25, 25, 25], typewriter: !0, card: !0 },
  shipping: { name: "Kraft shipping parcel", w: 0.76, h: 1, color: [0.78, 0.65, 0.48], shape: "flat", font: "Courier Prime", size: 36, lineHeight: 48, x: 60, y: 160, ink: [25, 20, 18], typewriter: !0 },
  kraft: { name: "Kraft paper parcel", w: 0.76, h: 1, color: [0.78, 0.65, 0.48], shape: "flat", font: "Courier Prime", size: 36, lineHeight: 48, x: 60, y: 160, ink: [25, 20, 18], typewriter: !0 },
  parchment: { name: "Ancient parchment", w: 0.82, h: 1.12, color: [0.91, 0.828, 0.655], shape: "roll", font: "Caveat", size: 50, lineHeight: 54, x: 90, y: 180, ink: [55, 35, 20], hand: !0 },
  ledger: { name: "Accounting ledger", w: 0.96, h: 0.76, color: [0.92, 0.955, 0.925], shape: "half", font: "Caveat", size: 36, lineHeight: 42, x: 74, y: 198, ink: [20, 35, 75], hand: !0 },
  carbon: { name: "Carbon duplicate copy", w: 0.84, h: 1.1, color: [0.15, 0.14, 0.21], shape: "quarters", font: "Special Elite", size: 34, lineHeight: 48, x: 74, y: 290, ink: [155, 170, 255], typewriter: !0, carbon: !0 }
}, Ot = { ball: "Crumpled ball", flat: "Flattened crumple", quarters: "Folded in quarters", half: "Folded in half", thirds: "Folded in thirds (letter)", roll: "Rolled up", twist: "Twisted (candy wrapper)", accordion: "Accordion fold", triangle: "Triangle fold" }, We = { torn: "Torn", burnt: "Burnt", coffee: "Coffee stain", water: "Water stain", prints: "Dirty fingerprints", aged: "Aged", scribbled: "Scribbled", singed: "Singed", wine: "Wine stain", ink: "Ink blot", foxing: "Foxing", tape: "Tape", stamp: "Rubber stamp", faded: "Sun-faded", staple: "Metal staple", grease: "Grease stain", dogear: "Dog-eared corner", damp: "Damp wrinkled relief", creased: "Pocket-creased grid" }, Cn = ["corner", "edge", "center", "spots"], Dt = {
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

\u2014 yours`,
  blueprint: `# AQUILA HYDRAULIC VALVE
SYSTEM SPECIFICATION REV 4

DESIGN PRESSURE: 420 BAR
TEST PRESSURE: 630 BAR
FLANGE SPEC: ANSI CLASS 2500

NOTE 1: ALL DIMENSIONS IN MM.
NOTE 2: DEBURR AND BREAK SHARP EDGES 0.5MM MAX.
NOTE 3: 100% RADIOGRAPHIC EXAMINATION REQUIRED ON PRESSURE WELDS.`,
  postcard: `Greetings from the coast!

The sea breeze has been gentle and the days quiet.
Found this old viewpoint overlooking the rocky lighthouse.
Wish you were here.

\u2014 Elena`,
  punchcard: "00100  IDENTIFICATION DIVISION. CRUMPLE-SYSTEM IBM 7094.",
  shipping: `# PRIORITY CARGO DISPATCH
TRACKING: BR-9042-CRUMPLE
DESTINATION: SECTOR 4-ALPHA

CONTENTS: PRECISION OPTICS & TOOLS
HANDLE WITH UTMOST CARE \xB7 DO NOT CRUSH
WEIGHT: 2.35 KG \xB7 CUSTOMS CLEARED`,
  kraft: `# PRIORITY CARGO DISPATCH
TRACKING: BR-9042-CRUMPLE
DESTINATION: SECTOR 4-ALPHA

CONTENTS: PRECISION OPTICS & TOOLS
HANDLE WITH UTMOST CARE \xB7 DO NOT CRUSH
WEIGHT: 2.35 KG \xB7 CUSTOMS CLEARED`,
  parchment: `In nomine veritatis,

We hereby affirm the ancient concord sealed across the waters. Let neither the turning of centuries nor the embers of flame erase what was pledged in this hall.

Anno Domini 1492`,
  ledger: `12 OCT   STEAMSHIP CARGO FREIGHT ....... 108   1,420.00          1,420.00
15 OCT   HARBOR DOCKAGE DUES ........... 109             115.50  1,304.50
18 OCT   BUNKER COAL REFUELING ......... 110             480.00    824.50
24 OCT   WAREHOUSE STEVEDORING ......... 111             210.00    614.50
29 OCT   BALANCE CARRIED FORWARD ....... 112                       614.50`,
  carbon: `# DUPLICATE COPY \xB7 VOUCHER \u2116 049182

PAYEE: MARITIME LOGISTICS DEPT
CHARGE CODE: ACCT-9042-ALPHA
SUM: $ 1,420.00 (ONE THOUSAND FOUR HUNDRED TWENTY DOLLARS)

VERIFIED BY AUDIT COMMITTEE \xB7 SECOND COPY RETAINED`
}, In = `A. Reader
12 Paper Lane
Foldtown`, Nt = ["never", "again", "always", "not yet", "once more", "still"], ct = {};
function Jt(e, n) {
  if (Re[e]) throw new Error(`Paper type "${e}" already exists`);
  Re[e] = n;
}
function Zt(e, n) {
  if (We[e]) throw new Error(`Wear state "${e}" already exists`);
  We[e] = n.name, n.apply && (ct[e] = n.apply);
}
var ht = (e, n) => Object.prototype.hasOwnProperty.call(e, n);
function Ye(e = {}) {
  let n = ht(Re, e.type) ? e.type : "typed", t = Re[n], l = {
    id: e.id || n,
    type: n,
    shape: n === "envelope" ? "envelope" : ht(Ot, e.shape) ? e.shape : t.shape,
    states: (Array.isArray(e.states) ? e.states : []).filter((o) => ht(We, o)),
    text: typeof e.text == "string" ? e.text : Dt[n] || "",
    back: typeof e.back == "string" ? e.back : "",
    seed: Number.isFinite(e.seed) ? Math.trunc(e.seed) : 7,
    // 0 is a valid seed (rng starts from 1 either way)
    open: e.open === "drag" ? "drag" : "auto",
    hiddenInk: typeof e.hiddenInk == "string" ? e.hiddenInk : "",
    burnAfterReading: !!e.burnAfterReading,
    burn: Cn.includes(e.burn) ? e.burn : "corner",
    image: e.image || "",
    address: typeof e.address == "string" ? e.address : In,
    letter: ht(Re, e.letter) && e.letter !== "envelope" ? e.letter : "typed",
    // the word of the 'stamp' state (drawn in capitals)
    stamp: typeof e.stamp == "string" && e.stamp.trim() ? e.stamp.trim() : "RECEIVED"
  };
  return e.rich && typeof e.rich == "object" && (l.rich = e.rich), Number.isFinite(e.gsm) && (l.gsm = e.gsm), l;
}

// .build/fields.js
function mt(e, n, t) {
  let l = ne(e.seed), o = () => l() < 0.5 ? -1 : 1, r = e.w / 2, a = e.h / 2, s = new Float32Array(n * t), u = n / e.w, f = t / e.h, d = (g, v, i, w, M, C) => {
    C === void 0 && (C = l() * Math.PI), w === void 0 && (w = (l() * 2 - 1) * r, M = (l() * 2 - 1) * a);
    let k = Math.cos(C), I = Math.sin(C), J = Math.abs(k) * g + v, ee = Math.abs(I) * g + v, _ = Math.max(0, Math.floor((w - J + r) * u)), U = Math.min(n - 1, Math.ceil((w + J + r) * u)), G = Math.max(0, Math.floor((M - ee + a) * f)), Z = Math.min(t - 1, Math.ceil((M + ee + a) * f)), re = Math.min(0.08, g);
    for (let me = G; me <= Z; me++) {
      let Ae = (me + 0.5) / f - a - M;
      for (let ge = _; ge <= U; ge++) {
        let H = (ge + 0.5) / u - r - w, Me = Math.abs(-H * I + Ae * k);
        if (Me >= v) continue;
        let Fe = Math.abs(H * k + Ae * I);
        Fe >= g || (s[me * n + ge] += i * (1 - Me / v) * Math.min(1, (g - Fe) / re));
      }
    }
  }, p = e.shape === "quarters" || e.shape === "half" || e.shape === "thirds" || e.shape === "accordion" || e.shape === "triangle", m = p ? 0.18 : e.shape === "roll" ? 0.45 : e.shape === "twist" ? 0.55 : 1, h = p ? 0.35 : e.shape === "roll" || e.shape === "twist" ? 0.6 : 1;
  e.card && (m *= 0.5, h *= 0.5), e.shape === "envelope" && (m = 0.08, h = 0.25);
  let S = e.w * e.h / (0.84 * 1.1);
  for (let g = 0; g < Math.round(8 * m * S); g++) d(2, 0.08 + l() * 0.1, o() * (0.8 + l() * 0.4) * h);
  for (let g = 0; g < Math.round(46 * m * S); g++) d(0.1 + l() * 0.28, 0.035 + l() * 0.05, o() * (0.45 + l() * 0.4) * h);
  for (let g = 0; g < Math.round(150 * m * S); g++) d(0.03 + l() * 0.1, 0.01 + l() * 0.025, o() * (0.2 + l() * 0.35) * h);
  if (e.shape === "twist")
    for (let g of [-1, 1]) for (let v = 0; v < 26; v++) d(0.12 + l() * 0.3, 0.012 + l() * 0.02, o() * (0.5 + l() * 0.5), g * r * (0.6 + l() * 0.36), (l() * 2 - 1) * a, Math.PI / 2 + g * (0.5 + l() * 0.35));
  if ((e.shape === "half" || e.shape === "quarters") && d(2, 0.022, 0.6, 0, 0, Math.PI / 2), e.shape === "quarters" && d(2, 0.022, -0.55, 0, 0, 0), e.shape === "thirds" && (d(2, 0.02, 0.55, 0, -e.h / 6 * 1.08, 0), d(2, 0.02, -0.55, 0, e.h / 6, 0)), e.shape === "accordion") {
    let g = e.w / 6;
    d(2, 0.02, 0.55, -g, 0, Math.PI / 2), d(2, 0.02, -0.55, 0, 0, Math.PI / 2), d(2, 0.02, 0.55, g, 0, Math.PI / 2);
  }
  e.shape === "triangle" && (d(2, 0.022, 0.6, 0, 0, Math.PI / 4), d(2, 0.022, -0.55, 0, 0, -Math.PI / 4)), e.shape === "envelope" && d(2, 0.02, 0.5, 0, e.foldY, 0);
  let b = Array.isArray(e.states) ? e.states : [];
  if (b.includes("creased"))
    for (let g = 0; g < 90; g++) d(0.04 + l() * 0.12, 8e-3 + l() * 0.015, o() * (0.3 + l() * 0.35));
  if (b.includes("damp")) {
    let g = Le(e.seed * 3 + 17);
    for (let v = 0; v < t; v++) {
      let i = (v + 0.5) / f - a;
      for (let w = 0; w < n; w++) {
        let M = (w + 0.5) / u - r;
        s[v * n + w] += Math.sin((M * 2.2 + i) * 18) * 0.18 + (g(M * 8, i * 8) - 0.5) * 0.22;
      }
    }
  }
  let E = 1e-6;
  for (let g = 0; g < s.length; g++) Math.abs(s[g]) > E && (E = Math.abs(s[g]));
  for (let g = 0; g < s.length; g++) s[g] /= E;
  return s;
}
function gt(e, n, t) {
  let l = Le(e.seed * 7 + 11), o = ne(e.seed * 5 + 3), r = Math.hypot(n, t), a = new Float32Array(n * t), s = (f) => {
    for (let d = 0; d < t; d++) for (let p = 0; p < n; p++) a[d * n + p] = f(p, d);
  }, u = e.form || "corner";
  if (u === "edge") {
    let f = Math.floor(o() * 3);
    s((d, p) => (f === 0 ? t - p : f === 1 ? d : n - d) / (r * 1.6) + (l(d * 0.05, p * 0.05) - 0.5) * 0.35);
  } else if (u === "center") {
    let f = n * (0.3 + 0.4 * o()), d = t * (0.3 + 0.4 * o());
    s((p, m) => Math.hypot(p - f, m - d) / (r * 0.7) + (l(p * 0.04, m * 0.04) - 0.5) * 0.3);
  } else if (u === "spots") {
    let f = 3 + Math.floor(o() * 4), d = [];
    for (let p = 0; p < 200 && d.length < f; p++) {
      let m = n * (0.12 + 0.76 * o()), h = t * (0.12 + 0.76 * o());
      d.every((S) => Math.hypot(S[0] - m, S[1] - h) > r * 0.2) && d.push([m, h]);
    }
    s((p, m) => {
      let h = 1 / 0;
      return d.forEach((S) => {
        h = Math.min(h, Math.hypot(p - S[0], m - S[1]));
      }), h / (r * 0.5) + (l(p * 0.05, m * 0.05) - 0.5) * 0.1;
    });
  } else if (u === "singed")
    s((f, d) => Math.min(f, n - 1 - f, d, t - 1 - d) / (r * 0.5) + (l(f * 0.03, d * 0.03) - 0.5) * 0.12);
  else {
    let f = e.seed % 4, d = f & 1 ? n : 0, p = f & 2 ? t : 0;
    s((m, h) => Math.sqrt((m - d) * (m - d) + (h - p) * (h - p)) / r + (l(m * 0.02, h * 0.02) - 0.5) * 0.32);
  }
  return a;
}

// .build/worker.js
var bt = /* @__PURE__ */ (() => {
  let e, n = 0, t = /* @__PURE__ */ new Map();
  function l() {
    try {
      let r = [ne, Le, mt, gt].map((a) => a.toString()).join(`
`) + `
onmessage = (e) => { const { id, name, args } = e.data; const r = name === 'creases' ? ${mt.name}(...args) : ${gt.name}(...args); postMessage({ id, r }, [r.buffer]); };`;
      e = new Worker(URL.createObjectURL(new Blob([r], { type: "text/javascript" }))), e.onmessage = (a) => {
        let s = t.get(a.data.id);
        t.delete(a.data.id), s && (clearTimeout(s.t), s(a.data.r));
      }, e.onerror = () => {
        let a = [...t.values()];
        t.clear(), e = null, a.forEach((s) => {
          clearTimeout(s.t), s.redo();
        });
      };
    } catch {
      e = null;
    }
  }
  let o = (r, a) => r === "creases" ? mt(...a) : gt(...a);
  return {
    run(r, a) {
      if (e === void 0 && l(), !e) return Promise.resolve(o(r, a));
      let s = ++n, u = new Promise((d) => {
        let p = (m) => d(m);
        p.redo = () => d(o(r, a)), t.set(s, p);
      });
      e.postMessage({ id: s, name: r, args: a });
      let f = t.get(s);
      return f.t = setTimeout(() => {
        t.delete(s) && f.redo();
      }, 2e4), u;
    }
  };
})();

// .build/print.js
var yt = 1070;
function Fn(e) {
  return e.split(`
`).map((n) => {
    let t = !1;
    n.startsWith("# ") && (t = !0, n = n.slice(2));
    let l = [], o = /~~(.+?)~~(?:\{(.+?)\})?|\[\[(.+?)\]\]|(\S+)/g, r;
    for (; r = o.exec(n); )
      r[1] !== void 0 ? l.push({ t: r[1], kind: "strike", fix: r[2] || "" }) : r[3] !== void 0 ? l.push({ t: r[3], kind: "redact" }) : l.push({ t: r[4], kind: "w" });
    return { head: t, toks: l };
  });
}
var Ln = (e, n, t) => `${n && !e.hand ? "bold " : ""}${Math.round(t)}px "${e.font}", "Courier Prime", monospace`, On = (e) => [e[0] + (200 - e[0]) * 0.4 + 8, e[1] + (170 - e[1]) * 0.3 + 4, e[2] + (120 - e[2]) * 0.3 - 4].map(Math.round);
function Dn(e, n, t, l, o, r, a) {
  let s = Fn(l), u = n.states.includes("faded") ? On(t.ink) : t.ink;
  if (n.states.includes("scribbled") && !s.some((E) => E.toks.some((g) => g.kind === "strike"))) {
    let E = [];
    s.forEach((g) => g.toks.forEach((v) => {
      v.kind === "w" && v.t.replace(/\W/g, "").length >= 4 && E.push(v);
    }));
    for (let g = 0; g < 2 && E.length; g++) {
      let v = E.splice(Math.floor(a() * E.length), 1)[0];
      v.kind = "strike", v.fix = Nt[Math.floor(a() * Nt.length)];
    }
  }
  let f = K(1 - r * 0.34), d = o.cols || 1, p = (o.w - (d - 1) * 40) / d, m = 0, h = o.y, S = o.y + o.h, b = Le(n.seed + 5);
  return s.forEach((E) => {
    let g = E.head ? t.size * (o.headK || 1.35) : t.size, v = E.head ? t.lineHeight * (o.headK || 1.35) : t.lineHeight;
    e.font = Ln(t, E.head, g);
    let i = e.measureText(" ").width, w = E.head && o.headFull ? o.w : p, M = [[]], C = 0;
    if (E.toks.forEach((k) => {
      let I = e.measureText(k.t).width;
      C > 0 && C + i + I > w && (M.push([]), C = 0), M[M.length - 1].push({ ...k, tw: I }), C += (C > 0 ? i : 0) + I;
    }), !E.toks.length) {
      h += v * 0.7;
      return;
    }
    M.forEach((k) => {
      h > S && m < d - 1 && !(E.head && o.headFull) && (m++, h = o.colY || o.y);
      let I = k.reduce((_, U) => _ + U.tw, 0) + i * (k.length - 1), J = o.x + (E.head && o.headFull ? 0 : m * (p + 40)), ee = o.center || E.head && o.centerHead ? J + (w - I) / 2 : J;
      k.forEach((_) => {
        Nn(e, t, _, ee, h, u, a, b), _.kind === "strike" && Un(e, _, ee, h, g, a), _.kind === "redact" && (e.fillStyle = `rgba(12,12,14,${f})`, e.fillRect(ee - 5, h - g * 0.82, _.tw + 10, g * 1.06)), ee += _.tw + i;
      }), h += v;
    }), E.head && o.headFull && (o.colY = h + 10);
  }), h;
}
function Nn(e, n, t, l, o, r, a, s) {
  if (n.hand) {
    e.save(), e.translate(l, o + (a() - 0.5) * 3), e.rotate((a() - 0.5) * 0.04), e.fillStyle = ie(r, 0.9), e.fillText(t.t, 0, 0), e.restore();
    return;
  }
  if (n.carbon) {
    let u = l;
    for (let f of t.t) {
      let d = (a() - 0.5) * 1.5, p = (a() - 0.5) * 1.8;
      e.fillStyle = "rgba(100, 115, 240, 0.28)", e.fillText(f, u + d - 1, o + p), e.fillText(f, u + d + 1, o + p), e.fillText(f, u + d, o + p + 1), e.fillStyle = ie(r, 0.82 + a() * 0.18), e.fillText(f, u + d, o + p), u += e.measureText(f).width;
    }
    return;
  }
  if (n.typewriter) {
    let u = l;
    for (let f of t.t) {
      let d = 0.72 + a() * 0.28;
      n.fades && (d *= 0.35 + 0.65 * s(u * 6e-3, o * 4e-3)), e.fillStyle = ie(r, d), e.fillText(f, u, o + (a() - 0.5) * 2), u += e.measureText(f).width;
    }
    return;
  }
  e.fillStyle = ie(r, 0.92), e.fillText(t.t, l, o);
}
function Un(e, n, t, l, o, r) {
  e.save(), e.strokeStyle = "rgba(165,28,30,0.85)", e.lineWidth = Math.max(2.5, o * 0.08), e.lineCap = "round";
  for (let a = 0; a < 2; a++) {
    e.beginPath();
    let s = l - o * (0.3 + 0.08 * a);
    e.moveTo(t - 4, s + (r() - 0.5) * 4), e.quadraticCurveTo(t + n.tw / 2, s + (r() - 0.5) * 8, t + n.tw + 4, s + (r() - 0.5) * 4), e.stroke();
  }
  n.fix && (e.fillStyle = "rgba(165,28,30,0.9)", e.font = `${Math.round(o * 0.62)}px "Caveat", cursive`, e.translate(t + n.tw * 0.25, l - o * 0.66), e.rotate(-0.06), e.fillText(n.fix, 0, 0)), e.restore();
}
function Wt(e, n, t, l, o, r, a = 6) {
  let s = Math.ceil(o / a), u = Math.ceil(r / a), f = ye(s, u, !0), d = f.getContext("2d"), p = Math.max(s / n.width, u / n.height);
  d.drawImage(n, (s - n.width * p) / 2, (u - n.height * p) / 2, n.width * p, n.height * p);
  let m = d.getImageData(0, 0, s, u).data;
  e.fillStyle = "rgba(20,20,20,0.88)";
  for (let h = 0; h < u; h++) for (let S = 0; S < s; S++) {
    let b = (h * s + S) * 4, E = (m[b] * 0.3 + m[b + 1] * 0.59 + m[b + 2] * 0.11) / 255, g = a * 0.56 * Math.sqrt(1 - E);
    g > 0.35 && (e.beginPath(), e.arc(t + (S + 0.5) * a, l + (h + 0.5) * a, g, 0, Math.PI * 2), e.fill());
  }
}
function Bn(e, n, t) {
  let l = [], o = "";
  return n.split(" ").forEach((r) => {
    let a = o ? o + " " + r : r;
    e.measureText(a).width > t && o ? (l.push(o), o = r) : o = a;
  }), o && l.push(o), l;
}
function en(e) {
  let n = String(e || "").toUpperCase();
  return n >= "0" && n <= "9" ? [n.charCodeAt(0) - 48 + 2] : n >= "A" && n <= "I" ? [0, n.charCodeAt(0) - 65 + 3] : n >= "J" && n <= "R" ? [1, n.charCodeAt(0) - 74 + 3] : n >= "S" && n <= "Z" ? [2, n.charCodeAt(0) - 83 + 4] : n === "-" ? [1] : n === "&" || n === "+" ? [0] : n === "/" ? [2, 3] : n === "." ? [0, 5, 10] : n === "," ? [2, 5, 10] : n === "=" ? [5, 10] : n === "$" ? [1, 5, 10] : n === "*" ? [1, 6, 10] : [];
}
var vt = {
  notebook(e, n, t) {
    e.strokeStyle = "rgba(95,135,205,0.5)", e.lineWidth = 2;
    for (let l = 206; l < t - 30; l += 52)
      e.beginPath(), e.moveTo(20, l), e.lineTo(n - 10, l), e.stroke();
    e.strokeStyle = "rgba(205,70,70,0.55)", e.lineWidth = 2.5, e.beginPath(), e.moveTo(126, 0), e.lineTo(126, t), e.stroke();
  },
  form(e, n, t) {
    for (let l = 0, o = 128; o < t; l++, o += 64) l % 2 === 0 && (e.fillStyle = "rgba(120,190,135,0.22)", e.fillRect(74, o, n - 148, 64));
    e.strokeStyle = "rgba(0,0,0,0.22)", e.setLineDash([6, 6]), e.lineWidth = 1.5, [66, n - 66].forEach((l) => {
      e.beginPath(), e.moveTo(l, 0), e.lineTo(l, t), e.stroke();
    }), e.setLineDash([]);
  },
  ticket(e, n, t, l) {
    let o = n * (1 - l.stub);
    e.strokeStyle = ie(l.ink, 0.7), e.lineWidth = 3, e.strokeRect(22, 22, n - 44, t - 44), e.lineWidth = 1.2, e.strokeRect(32, 32, n - 64, t - 64), e.setLineDash([3, 7]), e.lineWidth = 3, e.strokeStyle = ie(l.ink, 0.55), e.beginPath(), e.moveTo(o, 22), e.lineTo(o, t - 22), e.stroke(), e.setLineDash([]), e.save(), e.translate(o + (n - o) / 2, t / 2), e.rotate(-Math.PI / 2), e.fillStyle = ie(l.ink, 0.85), e.textAlign = "center", e.font = `bold 26px "${l.font}"`, e.fillText("No. 0042", 0, -46), e.font = `40px "${l.font}"`, e.fillText("C \xB7 12", 0, 2), e.font = `22px "${l.font}"`, e.fillText("ROW \xB7 SEAT", 0, 36), e.font = `italic 17px "${l.font}"`, e.fillText("non-refundable", 0, 64), e.restore();
  },
  memo(e, n) {
    e.fillStyle = "rgba(22,22,26,0.92)", e.beginPath(), e.arc(130, 120, 34, 0, Math.PI * 2), e.fill(), e.fillStyle = "rgba(245,244,240,1)", e.beginPath(), e.moveTo(130, 96), e.lineTo(154, 136), e.lineTo(106, 136), e.closePath(), e.fill(), e.fillStyle = "rgba(22,22,26,0.92)", e.font = 'bold 54px "Courier Prime"', e.fillText("MEMORANDUM", 184, 128), e.font = '22px "Courier Prime"', e.fillText("Research division \xB7 internal use", 186, 160), e.fillRect(96, 196, n - 192, 3), e.save(), e.translate(n - 250, 270), e.rotate(-0.12), e.strokeStyle = "rgba(175,30,30,0.7)", e.lineWidth = 4, e.strokeRect(-12, -44, 268, 60), e.fillStyle = "rgba(175,30,30,0.7)", e.font = 'bold 36px "Courier Prime"', e.fillText("CONFIDENTIAL", 0, 0), e.restore();
  },
  newspaper(e, n, t, l, o, r) {
    e.fillStyle = "rgba(25,25,25,0.9)", e.font = 'bold 50px "Libre Baskerville"', e.textAlign = "center", e.fillText("THE FOLDTOWN HERALD", n / 2, 92), e.font = 'italic 20px "Libre Baskerville"', e.fillText("evening edition \xB7 friday", n / 2, 126), e.textAlign = "left", e.fillRect(40, 140, n - 80, 3), e.fillRect(40, 147, n - 80, 1), e.fillRect(n / 2 - 1, 330, 1, t - 380);
    let a = n / 2 + 20, s = 336, u = n / 2 - 60, f = 230;
    if (e.fillStyle = "rgba(40,40,40,0.12)", e.fillRect(a, s, u, f), r.photo) Wt(e, r.photo, a, s, u, f);
    else
      for (let d = s + 4; d < s + f; d += 7) for (let p = a + 4; p < a + u; p += 7) {
        let m = 0.5 + 0.5 * Math.sin(p * 0.02) * Math.cos(d * 0.025);
        e.fillStyle = `rgba(20,20,20,${0.55 * m})`, e.beginPath(), e.arc(p, d, 1.2 + 2 * m, 0, Math.PI * 2), e.fill();
      }
    e.fillStyle = "rgba(25,25,25,0.85)", e.font = 'italic 17px "Libre Baskerville"', e.fillText("The harbor at dusk, yesterday.", a, s + f + 24);
  },
  sticky(e, n) {
    let t = e.createLinearGradient(0, 0, 0, 70);
    t.addColorStop(0, "rgba(170,130,20,0.18)"), t.addColorStop(1, "rgba(170,130,20,0)"), e.fillStyle = t, e.fillRect(0, 0, n, 70);
  },
  polaroid(e, n, t, l, o, r) {
    let a = Math.round(n * 0.065), s = n - 2 * a;
    if (e.fillStyle = "#1a1714", e.fillRect(a, a, s, s), r.img) {
      let u = r.img.width, f = r.img.height, d = Math.max(s / u, s / f);
      e.save(), e.beginPath(), e.rect(a, a, s, s), e.clip(), e.filter = "saturate(0.8) contrast(0.92) brightness(1.05)", e.drawImage(r.img, a + (s - u * d) / 2, a + (s - f * d) / 2, u * d, f * d), e.filter = "none", e.fillStyle = "rgba(255,200,140,0.10)", e.fillRect(a, a, s, s);
      let p = e.createRadialGradient(a + s / 2, a + s / 2, s * 0.25, a + s / 2, a + s / 2, s * 0.75);
      p.addColorStop(0, "rgba(0,0,0,0)"), p.addColorStop(1, "rgba(0,0,0,0.45)"), e.fillStyle = p, e.fillRect(a, a, s, s), e.restore();
    }
    e.strokeStyle = "rgba(0,0,0,0.25)", e.lineWidth = 2, e.strokeRect(a, a, s, s);
  },
  envelope(e, n, t, l) {
    let o = Math.round(l.flap / l.h * t), r = o + (t - o) * 0.48;
    e.strokeStyle = "rgba(110,85,50,0.35)", e.lineWidth = 2.2, e.beginPath(), e.moveTo(0, t), e.lineTo(n / 2, r), e.lineTo(n, t), e.stroke(), e.beginPath(), e.moveTo(0, o), e.lineTo(n * 0.42, r - 8), e.moveTo(n, o), e.lineTo(n * 0.58, r - 8), e.stroke(), e.save(), e.beginPath(), e.moveTo(0, o), e.lineTo(n / 2, 6), e.lineTo(n, o), e.closePath(), e.clip(), e.strokeStyle = "rgba(70,85,120,0.22)", e.lineWidth = 3;
    for (let a = -t; a < n + t; a += 14)
      e.beginPath(), e.moveTo(a, 0), e.lineTo(a + o, o), e.stroke();
    e.restore();
  },
  blueprint(e, n, t) {
    let l = e.createRadialGradient(n / 2, t / 2, n * 0.15, n / 2, t / 2, n * 0.72);
    l.addColorStop(0, "rgba(16, 52, 92, 0.45)"), l.addColorStop(1, "rgba(6, 18, 34, 0.85)"), e.fillStyle = l, e.fillRect(0, 0, n, t), e.strokeStyle = "rgba(65, 175, 255, 0.13)", e.lineWidth = 1;
    for (let h = 0; h < n; h += 15)
      e.beginPath(), e.moveTo(h, 0), e.lineTo(h, t), e.stroke();
    for (let h = 0; h < t; h += 15)
      e.beginPath(), e.moveTo(0, h), e.lineTo(n, h), e.stroke();
    e.strokeStyle = "rgba(95, 200, 255, 0.32)", e.lineWidth = 1.4;
    for (let h = 0; h < n; h += 60)
      e.beginPath(), e.moveTo(h, 0), e.lineTo(h, t), e.stroke();
    for (let h = 0; h < t; h += 60)
      e.beginPath(), e.moveTo(0, h), e.lineTo(n, h), e.stroke();
    e.strokeStyle = "rgba(140, 225, 255, 0.52)", e.lineWidth = 2.2;
    for (let h = 0; h < n; h += 180)
      e.beginPath(), e.moveTo(h, 0), e.lineTo(h, t), e.stroke();
    for (let h = 0; h < t; h += 180)
      e.beginPath(), e.moveTo(0, h), e.lineTo(n, h), e.stroke();
    let o = 26;
    e.strokeStyle = "rgba(170, 235, 255, 0.75)", e.lineWidth = 3, e.strokeRect(o, o, n - 2 * o, t - 2 * o), e.lineWidth = 1.2, e.strokeRect(o + 6, o + 6, n - 2 * o - 12, t - 2 * o - 12), e.fillStyle = "rgba(180, 235, 255, 0.75)", e.font = 'bold 12px "Courier Prime", monospace', e.textAlign = "center", e.textBaseline = "middle", ["A", "B", "C", "D", "E", "F"].forEach((h, S) => {
      let b = o + (S + 0.5) * ((n - 2 * o) / 6);
      e.fillText(h, b, o - 12), e.fillText(h, b, t - o + 12);
    }), ["1", "2", "3", "4"].forEach((h, S) => {
      let b = o + (S + 0.5) * ((t - 2 * o) / 4);
      e.fillText(h, o - 12, b), e.fillText(h, n - o + 12, b);
    }), [[o, o], [n - o, o], [o, t - o], [n - o, t - o]].forEach(([h, S]) => {
      e.beginPath(), e.moveTo(h - 10, S), e.lineTo(h + 10, S), e.moveTo(h, S - 10), e.lineTo(h, S + 10), e.stroke();
    });
    let r = n * 0.72, a = t * 0.4;
    e.save(), e.strokeStyle = "rgba(130, 215, 255, 0.55)", e.lineWidth = 1.5, e.setLineDash([12, 4, 3, 4]), e.beginPath(), e.moveTo(r - 170, a), e.lineTo(r + 170, a), e.stroke(), e.beginPath(), e.moveTo(r, a - 150), e.lineTo(r, a + 150), e.stroke(), e.setLineDash([]), e.strokeStyle = "rgba(200, 240, 255, 0.85)", e.lineWidth = 2.4, e.beginPath(), e.arc(r, a, 130, 0, Math.PI * 2), e.stroke(), e.lineWidth = 1.8, e.beginPath(), e.arc(r, a, 85, 0, Math.PI * 2), e.stroke(), e.beginPath(), e.arc(r, a, 42, 0, Math.PI * 2), e.stroke(), e.strokeStyle = "rgba(110, 205, 255, 0.6)", e.lineWidth = 1.2, e.setLineDash([6, 4]), e.beginPath(), e.arc(r, a, 108, 0, Math.PI * 2), e.stroke(), e.setLineDash([]), e.fillStyle = "rgba(8, 25, 45, 0.9)", e.strokeStyle = "rgba(210, 245, 255, 0.9)", e.lineWidth = 1.5;
    for (let h = 0; h < 8; h++) {
      let S = h * Math.PI / 4, b = r + Math.cos(S) * 108, E = a + Math.sin(S) * 108;
      e.beginPath(), e.arc(b, E, 9, 0, Math.PI * 2), e.fill(), e.stroke();
    }
    e.save(), e.beginPath(), e.arc(r, a, 130, Math.PI, Math.PI * 1.5), e.lineTo(r, a), e.closePath(), e.clip(), e.strokeStyle = "rgba(100, 190, 255, 0.35)", e.lineWidth = 1.2;
    for (let h = -150; h < 150; h += 8)
      e.beginPath(), e.moveTo(r + h - 150, a - 150), e.lineTo(r + h + 150, a + 150), e.stroke();
    e.restore(), e.strokeStyle = "rgba(170, 230, 255, 0.7)", e.lineWidth = 1.5, e.fillStyle = "rgba(215, 245, 255, 0.9)", e.font = 'bold 12px "Courier Prime", monospace', e.beginPath(), e.moveTo(r - 130, a + 145), e.lineTo(r + 130, a + 145), e.moveTo(r - 130, a + 135), e.lineTo(r - 130, a + 155), e.moveTo(r + 130, a + 135), e.lineTo(r + 130, a + 155), e.stroke(), e.fillText("<-- \xD8 260.00 mm -->", r, a + 158), e.beginPath(), e.moveTo(r + 30, a - 30), e.lineTo(r + 80, a - 80), e.lineTo(r + 140, a - 80), e.stroke(), e.textAlign = "left", e.fillText("BORE \xD8 42.0 H7", r + 85, a - 86);
    let s = r + 80, u = a - 130;
    e.strokeStyle = "rgba(160, 225, 255, 0.6)", e.lineWidth = 1.2, e.beginPath(), e.arc(s + 40, u, 10, 0, Math.PI * 2), e.stroke(), e.beginPath(), e.arc(s + 40, u, 4, 0, Math.PI * 2), e.stroke(), e.beginPath(), e.moveTo(s, u - 10), e.lineTo(s + 20, u - 5), e.lineTo(s + 20, u + 5), e.lineTo(s, u + 10), e.closePath(), e.stroke(), e.restore();
    let f = 390, d = 135, p = n - o - 6 - f, m = t - o - 6 - d;
    e.fillStyle = "rgba(8, 26, 48, 0.92)", e.fillRect(p, m, f, d), e.strokeStyle = "rgba(170, 235, 255, 0.8)", e.lineWidth = 2, e.strokeRect(p, m, f, d), e.lineWidth = 1.2, e.beginPath(), e.moveTo(p, m + 38), e.lineTo(p + f, m + 38), e.moveTo(p, m + 86), e.lineTo(p + f, m + 86), e.moveTo(p + 240, m + 38), e.lineTo(p + 240, m + d), e.moveTo(p + 120, m + 86), e.lineTo(p + 120, m + d), e.stroke(), e.fillStyle = "rgba(215, 245, 255, 0.95)", e.textAlign = "left", e.font = 'bold 15px "Courier Prime", monospace', e.fillText("AQUILA DYNAMICS \xB7 DEFENSE & NAVAL", p + 14, m + 24), e.font = 'bold 13px "Courier Prime", monospace', e.fillText("VALVE ASSEMBLY \xB7 HIGH PRESSURE", p + 14, m + 58), e.font = '11px "Courier Prime", monospace', e.fillStyle = "rgba(165, 220, 255, 0.85)", e.fillText("DWG NO: AQ-9042-REV-D", p + 14, m + 76), e.fillText("SCALE: 1:25", p + 14, m + 110), e.fillText("SHT 1 OF 1", p + 134, m + 110), e.fillText("DRN: E.M.", p + 252, m + 58), e.fillText("CHK: R.A.", p + 252, m + 76), e.fillStyle = "rgba(100, 255, 180, 0.9)", e.font = 'bold 11px "Courier Prime", monospace', e.fillText("APPROVED", p + 252, m + 110), e.strokeStyle = "rgba(230, 248, 255, 0.22)", e.lineWidth = 2.5, e.beginPath(), e.moveTo(n / 2, o), e.lineTo(n / 2, t - o), e.stroke(), e.beginPath(), e.moveTo(o, t / 2), e.lineTo(n - o, t / 2), e.stroke();
  },
  postcard(e, n, t) {
    e.strokeStyle = "rgba(180, 160, 130, 0.4)", e.lineWidth = 2, e.strokeRect(24, 24, n - 48, t - 48);
  },
  punchcard(e, n, t, l, o) {
    e.save(), e.strokeStyle = "rgba(100, 85, 70, 0.45)", e.lineWidth = 1.5, e.beginPath(), e.moveTo(0, 50), e.lineTo(50, 0), e.stroke(), e.fillStyle = "rgba(40, 85, 130, 0.25)", e.fillRect(0, 0, n, t * 0.16), e.strokeStyle = "rgba(40, 85, 130, 0.55)", e.lineWidth = 2, e.beginPath(), e.moveTo(0, t * 0.16), e.lineTo(n, t * 0.16), e.stroke();
    let r = 34, s = (n - 34 - r) / 79, u = t * 0.23, f = (t * 0.94 - u) / 11, d = (o.text.split(`
`)[0] || "").slice(0, 80);
    e.fillStyle = "rgba(25, 25, 25, 0.92)", e.font = 'bold 15px "Courier Prime", monospace', e.textAlign = "center";
    for (let p = 0; p < d.length; p++)
      d[p] !== " " && e.fillText(d[p], r + p * s, 24);
    e.fillStyle = "rgba(70, 60, 50, 0.65)", e.font = '9px "VT323", monospace';
    for (let p = 1; p <= 80; p++) {
      let m = r + (p - 1) * s;
      (p === 1 || p % 5 === 0) && (e.fillText(String(p), m, t * 0.14), e.fillText(String(p), m, t - 12));
    }
    e.font = '11px "VT323", monospace', e.fillStyle = "rgba(90, 80, 70, 0.45)";
    for (let p = 0; p < 10; p++) {
      let m = u + (p + 2) * f;
      for (let h = 1; h <= 80; h++) {
        let S = r + (h - 1) * s;
        e.fillText(String(p), S, m);
      }
    }
    e.fillStyle = "rgba(80, 70, 60, 0.7)", e.font = 'bold 11px "Courier Prime", monospace', e.fillText("IBM 5081", n - 80, t - 28), e.fillStyle = "rgba(15, 12, 10, 0.45)";
    for (let p = 0; p < d.length; p++) {
      let m = en(d[p]), h = r + p * s;
      for (let S of m) {
        let b = u + S * f;
        e.fillRect(h - 5, b - 10, 10, 20);
      }
    }
    e.restore();
  },
  shipping(e, n, t) {
    e.strokeStyle = "rgba(70, 50, 30, 0.35)", e.lineWidth = 2, e.strokeRect(30, 30, n - 60, t - 60);
    let l = t - 180, o = n - 140, r = 70;
    e.fillStyle = "#1c1612";
    for (let a = r; a < r + o; ) {
      let s = 2 + a * 17 % 7, u = 3 + a * 31 % 6;
      e.fillRect(a, l, s, 70), a += s + u;
    }
    e.font = 'bold 18px "Courier Prime", monospace', e.textAlign = "center", e.fillText("* EXP-9042-CRUMPLE *", n / 2, l + 100), e.textAlign = "left", e.save(), e.fillStyle = "rgba(50, 35, 20, 0.85)", e.font = "bold 28px sans-serif", e.fillText("\u2191 \u2191  THIS SIDE UP", 60, 80), e.restore();
  },
  kraft(e, n, t, l, o, r) {
    vt.shipping && vt.shipping(e, n, t, l, o, r);
  },
  parchment(e, n, t) {
    e.save();
    let l = n / 2, o = t - 140;
    e.fillStyle = "rgba(145, 24, 28, 0.92)", e.beginPath();
    for (let r = 0; r <= Math.PI * 2 + 0.01; r += 0.15) {
      let a = 48 * (1 + 0.08 * Math.sin(r * 8));
      r === 0 ? e.moveTo(l + Math.cos(r) * a, o + Math.sin(r) * a) : e.lineTo(l + Math.cos(r) * a, o + Math.sin(r) * a);
    }
    e.fill(), e.strokeStyle = "rgba(95, 12, 16, 0.8)", e.lineWidth = 3, e.beginPath(), e.arc(l, o, 32, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(85, 10, 14, 0.9)", e.font = 'bold 32px "Caveat", cursive', e.textAlign = "center", e.fillText("V", l, o + 11), e.restore();
  },
  ledger(e, n, t) {
    e.strokeStyle = "rgba(60, 110, 85, 0.6)", e.lineWidth = 2.5, e.strokeRect(30, 30, n - 60, t - 60), e.lineWidth = 1, e.strokeRect(34, 34, n - 60 - 8, t - 60 - 8), e.fillStyle = "rgba(235, 246, 238, 0.9)", e.fillRect(36, 36, n - 60 - 12, 110), e.strokeStyle = "rgba(60, 110, 85, 0.4)", e.strokeRect(36, 36, n - 60 - 12, 110), e.fillStyle = "rgba(25, 55, 40, 0.92)", e.textAlign = "center", e.font = 'bold 28px "Courier Prime", monospace', e.fillText("CONTINENTAL MERCANTILE CO. \xB7 GENERAL LEDGER", n / 2, 72), e.font = 'italic 16px "Libre Baskerville", serif', e.fillStyle = "rgba(35, 75, 55, 0.85)", e.fillText("FOLIO NO. 142 \u2014 ACCOUNT OF RECEIPTS & DISBURSEMENTS \u2014 ANNO 1928", n / 2, 102), e.fillRect(70, 118, n - 60 - 80, 2);
    let o = 146, r = t - 30 - 6, a = 210, s = n - 430, u = n - 370, f = n - 250, d = n - 130, p = 42;
    for (let m = o + p, h = 0; m < r; m += p, h++)
      h % 2 === 1 && (e.fillStyle = "rgba(180, 220, 200, 0.15)", e.fillRect(36, m, n - 60 - 12, p)), e.strokeStyle = "rgba(90, 160, 130, 0.35)", e.lineWidth = 1, e.beginPath(), e.moveTo(36, m), e.lineTo(n - 30 - 6, m), e.stroke();
    e.fillStyle = "rgba(40, 90, 65, 0.88)", e.fillRect(36, o, n - 60 - 12, p), e.fillStyle = "#f0f8f2", e.font = 'bold 14px "Courier Prime", monospace', e.textAlign = "center", e.fillText("DATE", (36 + a) / 2, o + 26), e.fillText("PARTICULARS / DESCRIPTION", (a + s) / 2, o + 26), e.fillText("FOL", (s + u) / 2, o + 26), e.fillText("DEBITS ($ | \xA2)", (u + f) / 2, o + 26), e.fillText("CREDITS ($ | \xA2)", (f + d) / 2, o + 26), e.fillText("BALANCE", (d + n - 30 - 6) / 2, o + 26), e.strokeStyle = "rgba(215, 45, 45, 0.65)", e.lineWidth = 1.5, e.beginPath(), e.moveTo(36, o), e.lineTo(36, r), e.stroke(), e.beginPath(), e.moveTo(40, o), e.lineTo(40, r), e.stroke(), e.strokeStyle = "rgba(70, 120, 160, 0.45)", e.lineWidth = 1.2, e.beginPath(), e.moveTo(a, o), e.lineTo(a, r), e.stroke(), e.beginPath(), e.moveTo(s, o), e.lineTo(s, r), e.stroke(), e.strokeStyle = "rgba(215, 45, 45, 0.65)", e.lineWidth = 1.8, e.beginPath(), e.moveTo(u, o), e.lineTo(u, r), e.stroke(), e.beginPath(), e.moveTo(f, o), e.lineTo(f, r), e.stroke(), e.beginPath(), e.moveTo(d, o), e.lineTo(d, r), e.stroke(), e.beginPath(), e.moveTo(d + 3, o), e.lineTo(d + 3, r), e.stroke(), e.strokeStyle = "rgba(60, 110, 190, 0.45)", e.lineWidth = 1, e.beginPath(), e.moveTo(f - 35, o + p), e.lineTo(f - 35, r), e.stroke(), e.beginPath(), e.moveTo(d - 35, o + p), e.lineTo(d - 35, r), e.stroke(), e.beginPath(), e.moveTo(n - 30 - 41, o + p), e.lineTo(n - 30 - 41, r), e.stroke(), e.strokeStyle = "rgba(215, 45, 45, 0.85)", e.lineWidth = 1.5, e.beginPath(), e.moveTo(u, r - 48), e.lineTo(n - 30 - 6, r - 48), e.stroke(), e.beginPath(), e.moveTo(u, r - 12), e.lineTo(n - 30 - 6, r - 12), e.stroke(), e.beginPath(), e.moveTo(u, r - 8), e.lineTo(n - 30 - 6, r - 8), e.stroke();
  },
  carbon(e, n, t) {
    let l = e.createLinearGradient(0, 0, n, t);
    l.addColorStop(0, "rgba(26, 24, 36, 0.95)"), l.addColorStop(0.5, "rgba(22, 20, 32, 0.98)"), l.addColorStop(1, "rgba(18, 16, 26, 0.95)"), e.fillStyle = l, e.fillRect(0, 0, n, t), e.save();
    for (let r = 0; r < 6; r++) {
      let a = r % 2 ? n - 60 : 60, s = t * (0.15 + r * 0.15), u = e.createRadialGradient(a, s, 10, a, s, 90);
      u.addColorStop(0, "rgba(90, 80, 150, 0.18)"), u.addColorStop(1, "rgba(20, 18, 30, 0)"), e.fillStyle = u, e.beginPath(), e.arc(a, s, 90, 0, Math.PI * 2), e.fill();
    }
    e.strokeStyle = "rgba(160, 170, 240, 0.35)", e.lineWidth = 1.5, e.setLineDash([4, 6]), e.beginPath(), e.moveTo(30, 40), e.lineTo(n - 30, 40), e.stroke(), e.setLineDash([]), e.fillStyle = "rgba(150, 160, 220, 0.55)", e.font = '11px "Courier Prime", monospace', e.textAlign = "center", e.fillText("\xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7  TEAR ALONG PERFORATION  \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7", n / 2, 34), e.strokeStyle = "rgba(140, 150, 235, 0.45)", e.lineWidth = 2.2, e.strokeRect(36, 56, n - 72, t - 96), e.lineWidth = 1, e.strokeRect(42, 62, n - 84, t - 108), e.fillStyle = "rgba(225, 60, 75, 0.88)", e.font = 'bold 20px "Special Elite", monospace', e.textAlign = "right", e.fillText("\u2116 049182", n - 60, 95), e.fillStyle = "rgba(180, 190, 255, 0.9)", e.textAlign = "left", e.font = 'bold 22px "Courier Prime", monospace', e.fillText("CUSTOMER DUPLICATE RECEIPT", 64, 98), e.font = '12px "Courier Prime", monospace', e.fillStyle = "rgba(140, 155, 230, 0.7)", e.fillText("INTER-OFFICE TRANSFER VOUCHER \xB7 SECOND VIA", 64, 118), e.fillRect(64, 130, n - 128, 2), e.font = '13px "Courier Prime", monospace', e.fillStyle = "rgba(135, 145, 220, 0.65)", [
      ["DATE OF RECORD: ____________________________", 64, 168],
      ["TRANSACTION REF: __________________________", n / 2 + 20, 168],
      ["RECEIVED FROM: __________________________________________________________________", 64, 210],
      ["SUM AMOUNT: ____________________________________________________________________", 64, 252]
    ].forEach(([r, a, s]) => e.fillText(r, a, s)), e.save(), e.translate(n - 220, t - 140), e.rotate(-0.16), e.strokeStyle = "rgba(150, 160, 255, 0.65)", e.lineWidth = 4, e.strokeRect(-110, -32, 220, 64), e.lineWidth = 1.5, e.strokeRect(-104, -26, 208, 52), e.fillStyle = "rgba(150, 160, 255, 0.75)", e.font = 'bold 28px "Courier Prime", monospace', e.textAlign = "center", e.fillText("DUPLICATE", 0, 10), e.restore(), e.restore();
  }
};
function qn(e, n, t, l, o) {
  e.strokeStyle = "rgba(100, 90, 75, 0.4)", e.lineWidth = 2, e.beginPath(), e.moveTo(n / 2, 40), e.lineTo(n / 2, t - 40), e.stroke();
  let r = n - 140, a = 50;
  e.strokeStyle = "rgba(100, 90, 75, 0.5)", e.lineWidth = 1.5, e.setLineDash([4, 4]), e.strokeRect(r, a, 90, 110), e.setLineDash([]), e.fillStyle = "rgba(120, 100, 80, 0.5)", e.font = '12px "Courier Prime", monospace', e.textAlign = "center", e.fillText("AFFIX", r + 45, a + 50), e.fillText("STAMP", r + 45, a + 68), e.strokeStyle = "rgba(40, 50, 80, 0.55)", e.lineWidth = 2, e.beginPath(), e.arc(r - 30, a + 60, 44, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(40, 50, 80, 0.6)", e.font = 'bold 13px "Courier Prime", monospace', e.fillText("POST", r - 30, a + 64), e.textAlign = "left", e.strokeStyle = "rgba(120, 110, 95, 0.4)", e.lineWidth = 1.5;
  for (let s = t * 0.45; s < t - 60; s += 44)
    e.beginPath(), e.moveTo(n / 2 + 40, s), e.lineTo(n - 40, s), e.stroke();
}
function zn(e, n, t, l, o, r) {
  let a = Math.round(l.flap / l.h * t);
  e.save(), e.translate(n / 2, a * 0.36), e.fillStyle = "rgba(140,20,24,0.95)", e.beginPath();
  for (let f = 0; f <= Math.PI * 2 + 0.01; f += 0.2) {
    let d = 46 * (1 + 0.06 * Math.sin(f * 7 + r() * 0.3));
    f ? e.lineTo(Math.cos(f) * d, Math.sin(f) * d) : e.moveTo(d, 0);
  }
  e.fill(), e.strokeStyle = "rgba(90,10,14,0.8)", e.lineWidth = 3, e.beginPath(), e.arc(0, 0, 30, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(80,8,12,0.9)", e.font = 'bold 30px "Special Elite"', e.textAlign = "center", e.fillText("A", 0, 11), e.restore();
  let s = n - 180, u = a + 40;
  e.fillStyle = "rgba(70,105,140,0.85)", e.fillRect(s, u, 120, 140), e.strokeStyle = "rgba(255,255,255,0.8)", e.setLineDash([4, 4]), e.lineWidth = 3, e.strokeRect(s + 6, u + 6, 108, 128), e.setLineDash([]), e.fillStyle = "rgba(255,255,255,0.9)", e.font = 'bold 44px "Special Elite"', e.textAlign = "center", e.fillText("25", s + 60, u + 88), e.strokeStyle = "rgba(40,40,60,0.55)", e.lineWidth = 3, e.beginPath(), e.arc(s - 30, u + 90, 58, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(40,40,60,0.6)", e.font = '20px "Courier Prime"', e.fillText("POST", s - 30, u + 98);
  for (let f = 0; f < 4; f++)
    e.beginPath(), e.moveTo(s - 120, u + 60 + f * 18), e.bezierCurveTo(s - 60, u + 50 + f * 18, s, u + 70 + f * 18, s + 60, u + 60 + f * 18), e.stroke();
  e.textAlign = "left", e.font = '52px "Caveat"', e.fillStyle = ie(l.ink, 0.9), o.address.split(`
`).forEach((f, d) => e.fillText(f, 150, a + 330 + d * 62));
}
var Gn = [
  ["FOR RENT", "quiet room near the park, morning light. Ask at the front desk."],
  ["FOR SALE", "vintage typewriter, works fine, missing the letter Q."],
  ["WANTED", "night watchman for the old warehouse on the pier."],
  ["FOUND", "small brass key with a red tag. Claim at the bakery."],
  ["LOST", "grey cat, answers to Pixel. Reward offered."],
  ["REPAIRS", "radios and record players, evenings only."],
  ["SWAP", "bicycle bell for anything that does not squeak."]
];
function Xn(e, n, t, l) {
  let a = (n - 88 - 26) / 2;
  e.fillStyle = "rgba(25,25,25,0.9)", e.font = 'bold 34px "Libre Baskerville"', e.fillText("CLASSIFIEDS", 44, 92), e.fillRect(40, 108, n - 88 + 8, 3);
  let s = 44 + a + 26, u = 132, f = Math.round(a * 0.68);
  l.photo && Wt(e, l.photo, s, u, a, f), e.font = 'italic 16px "Libre Baskerville"', e.fillText("Old town, archive photo.", s, u + f + 22);
  let d = t - 60, p = [150, u + f + 60], m = 0, h = 44, S = p[0];
  for (let [b, E] of Gn) {
    e.font = '18px "Libre Baskerville"';
    let g = Bn(e, b + " " + E, a);
    if (S + g.length * 24 > d && (m === 1 || (m = 1, h = s, S = p[1], S + g.length * 24 > d)))
      break;
    g.forEach((v, i) => {
      if (i === 0) {
        e.font = 'bold 19px "Libre Baskerville"', e.fillText(b, h, S);
        let w = e.measureText(b + " ").width;
        e.font = '18px "Libre Baskerville"', e.fillText(v.slice(b.length + 1), h + w, S);
      } else
        e.font = '18px "Libre Baskerville"', e.fillText(v, h, S);
      S += 24;
    }), S += 16;
  }
}
var Qt = {
  typed: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 80 }),
  notebook: (e, n, t) => ({ x: t.x, y: t.y - 10, w: e - t.x - 50, h: n - t.y - 40 }),
  form: (e, n, t) => ({ x: t.x, y: t.y + 2, w: e - t.x * 2, h: n - t.y - 40 }),
  receipt: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 40, centerHead: !0 }),
  ticket: (e, n, t) => ({ x: 60, y: 120, w: e * (1 - t.stub) - 120, h: n - 160, center: !0, headK: 1.25 }),
  memo: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 60, headK: 1.15 }),
  newspaper: (e, n, t) => ({ x: t.x, y: 230, w: e - t.x * 2, h: n - 300, cols: 2, headFull: !0, centerHead: !0, headK: 2, colY: 330 }),
  sticky: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 30 }),
  polaroid: (e, n) => ({ x: 40, y: Math.round(e * 0.935 + (n - e * 0.935) * 0.55), w: e - 80, h: 120, center: !0 }),
  envelope: () => null,
  blueprint: (e, n, t) => ({ x: 64, y: 140, w: Math.round(e * 0.44), h: n - 280, headK: 1.15 }),
  postcard: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 80 }),
  punchcard: (e, n, t) => ({ x: 34, y: 18, w: e - 68, h: 26 }),
  shipping: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 180 }),
  kraft: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 180 }),
  parchment: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 160, centerHead: !0 }),
  ledger: (e, n, t) => ({ x: 88, y: 198, w: e - 176, h: n - 260, headK: 1.1 }),
  carbon: (e, n, t) => ({ x: 74, y: 300, w: e - 148, h: n - 420, headK: 1.15 })
};
async function Yn(e, n, t, l = "") {
  if (typeof Blob > "u" || typeof URL > "u" || !URL.createObjectURL) return null;
  let o = `<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${t}">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;box-sizing:border-box;margin:0;padding:0;overflow:hidden;${l}">
        ${e}
      </div>
    </foreignObject>
  </svg>`, r = new Blob([o], { type: "image/svg+xml;charset=utf-8" }), a = URL.createObjectURL(r), s = new Image();
  return new Promise((u) => {
    s.onload = () => {
      URL.revokeObjectURL(a), u(s);
    }, s.onerror = () => {
      URL.revokeObjectURL(a), u(null);
    }, s.src = a;
  });
}
async function et(e, n, t, l) {
  let o = Math.round(n.w * yt), r = Math.round(n.h * yt), a = ye(o, r), s = a.getContext("2d"), u = t === "front", f = ne(e.seed * 31 + (u ? 5 : 9)), d = {};
  n.photo && u && (d.img = await dt(e.image || _e.assets + "photos/sunset.webp")), e.type === "newspaper" && (u || !e.back) && (d.photo = await dt(_e.assets + "photos/" + (u ? "sea" : "city") + ".webp"));
  let p = e.type === "notebook" || e.type === "form" || e.type === "blueprint" || e.type === "ledger";
  vt[e.type] && (u || p) && vt[e.type](s, o, r, n, e, d), e.type === "envelope" && !u && zn(s, o, r, n, e, f), e.type === "postcard" && !u && !e.back && qn(s, o, r, e, f), e.type === "newspaper" && !u && !e.back && Xn(s, o, r, d);
  let m = e.type === "envelope" ? "" : u ? e.text : e.back, h = u ? Qt[e.type] ? Qt[e.type](o, r, n) : { x: 50, y: 50, w: o - 100, h: r - 100 } : { x: Math.round(n.x * 0.8), y: Math.min(n.y, Math.round(r * 0.28)), w: o - Math.round(n.x * 1.6), h: r - Math.min(n.y, Math.round(r * 0.28)) - 40, center: e.type === "ticket" };
  e.type === "ticket" && !u && (h.x = Math.round(o * 0.55), h.w = Math.round(o * 0.4)), e.type === "postcard" && !u && (h.x = Math.round(o * 0.54), h.w = Math.round(o * 0.42)), e.type === "polaroid" && !u && (h = { x: 60, y: Math.round(r * 0.3), w: o - 120, h: r * 0.6, center: !0 });
  let S = m && h ? Dn(s, e, n, m, h, l, f) : 0;
  if (u && e.rich && h) {
    if (e.rich.mode === "canvas" && typeof e.rich.body == "function")
      try {
        await e.rich.body(s, h, o, r);
      } catch {
      }
    else if (typeof e.rich.body == "string")
      try {
        let E = await Yn(e.rich.body, h.w, h.h, e.rich.style || "");
        E && s.drawImage(E, h.x, h.y);
      } catch {
      }
  }
  let b = ne(e.seed * 17 + (u ? 1 : 2));
  e.states.includes("coffee") && await $n(a, s, o, r, e, u), e.states.includes("water") && await Vn(s, o, r, e, u), e.states.includes("prints") && await Hn(s, o, r, e, u), e.states.includes("wine") && await Kn(a, s, o, r, e, u), e.states.includes("ink") && Jn(s, o, r, e, u), e.states.includes("aged") && jn(s, o, r, b), e.states.includes("faded") && Zn(s, o, r, e), e.states.includes("foxing") && Qn(s, o, r, e), e.states.includes("staple") && to(s, o, r, e, u), e.states.includes("grease") && no(s, o, r, e, u), e.states.includes("dogear") && oo(s, o, r, e, u), e.states.includes("damp") && ro(s, o, r, e), e.states.includes("creased") && ao(s, o, r, e);
  for (let E of e.states)
    if (ct[E])
      try {
        await ct[E](s, a, o, r, e, u, b);
      } catch {
      }
  return u && e.states.includes("stamp") && Wn(s, o, r, e, S), u && e.states.includes("tape") && eo(s, o, r, e), a;
}
function Bt(e, n, t, l, o, r, a, s) {
  e.save(), e.globalCompositeOperation = "multiply", e.globalAlpha = a, e.translate(t, l), s || e.scale(-1, 1), e.rotate(r), e.drawImage(n, -o / 2, -o / 2, o, o), e.restore();
}
async function Vn(e, n, t, l, o) {
  let r = await Ge("water");
  if (!r) return;
  let a = ne(l.seed * 23 + 4), s = n * (0.25 + 0.5 * a()), u = t * (0.25 + 0.5 * a()), f = Math.min(n, t) * (0.8 + 0.35 * a()), d = a() * Math.PI * 2;
  Bt(e, r, o ? s : n - s, u, f, d, o ? 0.85 : 0.6, o);
}
async function Hn(e, n, t, l, o) {
  let r = await Ge("prints");
  if (!r) return;
  let a = ne(l.seed * 29 + 6);
  for (let s = 0; s < 2; s++) {
    let u = n * (s ? 0.86 - 0.08 * a() : 0.1 + 0.12 * a()), f = t * (0.72 + 0.2 * a()), d = Math.min(n, t) * (0.22 + 0.08 * a()), p = a() * Math.PI * 2;
    Bt(e, r, o ? u : n - u, f, d, p, o ? 0.6 : 0.4, o);
  }
}
async function $n(e, n, t, l, o, r) {
  let a = ne(o.seed * 17 + 1), s = t * (0.3 + 0.4 * a()), u = l * (0.35 + 0.35 * a()), f = Math.min(t, l) * (0.13 + 0.07 * a()), d = a() * Math.PI * 2, p = r ? s : t - s, m = await Ge("coffee");
  if (r) {
    let S = ye(t, l);
    S.getContext("2d").drawImage(e, 0, 0), n.save(), n.beginPath(), n.arc(p, u, f * 1.02, 0, Math.PI * 2), n.clip(), n.clearRect(p - f * 1.1, u - f * 1.1, f * 2.2, f * 2.2), n.filter = "blur(2.5px)", n.globalAlpha = 0.85, n.drawImage(S, 0, 0), n.restore();
  }
  if (m) {
    Bt(n, m, p, u, f * 3.4, d, r ? 0.95 : 0.55, r);
    return;
  }
  n.save();
  let h = n.createRadialGradient(p, u, f * 0.1, p, u, f);
  h.addColorStop(0, "rgba(140,95,45,0.10)"), h.addColorStop(0.82, "rgba(125,82,36,0.17)"), h.addColorStop(1, "rgba(110,70,30,0)"), n.fillStyle = h, n.beginPath(), n.arc(p, u, f, 0, Math.PI * 2), n.fill();
  for (let S = 0; S < 3; S++) {
    n.strokeStyle = `rgba(100,62,26,${0.2 + 0.12 * a()})`, n.lineWidth = f * (0.03 + 0.03 * a()), n.beginPath();
    let b = a() * 6.28, E = f * (0.9 + 0.05 * S);
    for (let g = 0; g <= Math.PI * 2 + 0.01; g += 0.05) {
      let v = E * (1 + 0.025 * Math.sin(g * 5 + b) + 0.015 * Math.sin(g * 11 + b * 2));
      g === 0 ? n.moveTo(p + Math.cos(g) * v, u + Math.sin(g) * v) : n.lineTo(p + Math.cos(g) * v, u + Math.sin(g) * v);
    }
    n.stroke();
  }
  for (let S = 0; S < 3; S++) {
    let b = p + (a() - 0.5) * f * 1.2, E = f * (0.6 + a() * 1.2), g = n.createLinearGradient(0, u + f * 0.6, 0, u + f * 0.6 + E);
    g.addColorStop(0, "rgba(115,75,32,0.16)"), g.addColorStop(1, "rgba(115,75,32,0)"), n.fillStyle = g, n.fillRect(b - 5, u + f * 0.6, 9 + a() * 6, E);
  }
  n.restore();
}
function jn(e, n, t, l) {
  e.save(), e.fillStyle = "rgba(150,110,45,0.08)", e.fillRect(0, 0, n, t);
  let o = e.createRadialGradient(n / 2, t / 2, Math.min(n, t) * 0.3, n / 2, t / 2, Math.max(n, t) * 0.75);
  o.addColorStop(0, "rgba(120,80,30,0)"), o.addColorStop(1, "rgba(120,80,30,0.28)"), e.fillStyle = o, e.fillRect(0, 0, n, t);
  for (let r = 0; r < 34; r++) {
    let a = l() * n, s = l() * t, u = 3 + l() * 14, f = e.createRadialGradient(a, s, 0, a, s, u);
    f.addColorStop(0, `rgba(125,85,40,${0.12 + l() * 0.2})`), f.addColorStop(1, "rgba(125,85,40,0)"), e.fillStyle = f, e.beginPath(), e.arc(a, s, u, 0, Math.PI * 2), e.fill();
  }
  e.restore();
}
async function Kn(e, n, t, l, o, r) {
  let a = ne(o.seed * 43 + 3), s = t * (0.3 + 0.4 * a()), u = l * (0.4 + 0.3 * a()), f = Math.min(t, l) * (0.1 + 0.04 * a()), d = r ? s : t - s, p = r ? 1 : 0.5;
  if (r) {
    let h = ye(t, l);
    h.getContext("2d").drawImage(e, 0, 0), n.save(), n.beginPath(), n.arc(d, u, f * 1.04, 0, Math.PI * 2), n.clip(), n.clearRect(d - f * 1.1, u - f * 1.1, f * 2.2, f * 2.2), n.filter = "blur(2px)", n.globalAlpha = 0.8, n.drawImage(h, 0, 0), n.restore();
  }
  n.save(), n.globalCompositeOperation = "multiply";
  let m = n.createRadialGradient(d, u, f * 0.2, d, u, f * 1.05);
  m.addColorStop(0, `rgba(120,14,38,${0.03 * p})`), m.addColorStop(0.8, `rgba(120,14,38,${0.1 * p})`), m.addColorStop(1, "rgba(90,8,28,0)"), n.fillStyle = m, n.beginPath(), n.arc(d, u, f * 1.05, 0, Math.PI * 2), n.fill(), n.lineCap = "round", n.filter = "blur(0.8px)";
  for (let h = 0; h < 2; h++) {
    let S = a() * 6.28, b = 3.4 + a() * 1.4, E = f * (0.94 + 0.12 * h + 0.03 * a()), g = a() * 6.28, v = (i, w) => {
      let M = (E - w) * (1 + 0.025 * Math.sin(i * 5 + g) + 0.012 * Math.sin(i * 9 + g * 2));
      return [d + Math.cos(i) * M, u + Math.sin(i) * M];
    };
    [[f * 0.22, 0.07, 0.04], [f * 0.07, 0.4, 0], [f * 0.03, 0.16, f * 0.06]].forEach(([i, w, M]) => {
      n.strokeStyle = `rgba(96,12,36,${w * p})`, n.lineWidth = i, n.beginPath();
      for (let C = 0, k = S; k <= S + b; C++, k += 0.04) {
        let I = v(k, M);
        C ? n.lineTo(I[0], I[1]) : n.moveTo(I[0], I[1]);
      }
      n.stroke();
    });
  }
  n.filter = "none";
  for (let h = 0, S = 4 + Math.floor(a() * 4); h < S; h++) {
    let b = a() * 6.28, E = f * (1.35 + a() * 1.1), g = f * (0.02 + 0.035 * a());
    n.fillStyle = `rgba(104,10,30,${0.45 * p})`, n.beginPath(), n.arc(d + Math.cos(b) * E, u + Math.sin(b) * E, g, 0, Math.PI * 2), n.fill(), h % 2 && (n.beginPath(), n.arc(d + Math.cos(b + 0.2) * E * 1.12, u + Math.sin(b + 0.2) * E * 1.12, g * 0.35, 0, Math.PI * 2), n.fill());
  }
  n.restore();
}
function xn(e, n) {
  let t = [1, 2, 3, 5, 7, 11].map((o) => [o, e() * 6.28, (0.06 + 0.14 * e()) * 2 / o]), l = [];
  for (let o = 0; o < 40; o++) {
    let r = o / 40 * Math.PI * 2, a = 1;
    t.forEach(([s, u, f]) => {
      a += f * Math.sin(s * r + u);
    }), l.push([Math.cos(r) * n * a, Math.sin(r) * n * a]);
  }
  return l;
}
function Ut(e, n, t, l, o) {
  e.beginPath(), n.forEach((r, a) => {
    a ? e.lineTo(t + r[0] * o, l + r[1] * o) : e.moveTo(t + r[0] * o, l + r[1] * o);
  }), e.closePath(), e.fill();
}
function Jn(e, n, t, l, o) {
  let r = ne(l.seed * 47 + 5), a = Math.min(n, t), s = n * (0.2 + 0.6 * r()), u = t * (0.2 + 0.6 * r()), f = a * (0.03 + 0.015 * r()), d = o ? s : n - s, p = o ? 1 : 0.5, m = [16, 22, 58], h = xn(r, f);
  e.save(), e.fillStyle = ie(m, 0.07 * p), Ut(e, h, d, u, 1.45), Ut(e, h, d, u, 1.22), e.fillStyle = ie(m, 0.86 * p), e.filter = "blur(0.5px)", Ut(e, h, d, u, 1), e.filter = "none", e.fillStyle = ie(m, 0.86 * p);
  for (let w = 0, M = 6 + Math.floor(r() * 5); w < M; w++) {
    let C = r() * 6.28, k = f * (1.5 + 2.4 * r()), I = f * (0.16 + 0.14 * r()) * (1.6 - k / (f * 4));
    e.beginPath(), e.arc(d + Math.cos(C) * k, u + Math.sin(C) * k, Math.max(I, 0.8), 0, Math.PI * 2), e.fill();
  }
  let S = r() * 6.28, b = f * (1.6 + 1.2 * r()), E = Math.cos(S), g = Math.sin(S), v = [], i = [];
  for (let w = 0; w <= 10; w++) {
    let M = w / 10, C = f * 0.42 * Math.pow(1 - M, 1.3) * (0.85 + 0.3 * r()), k = f * 0.7 + b * M;
    v.push([E * k - g * C, g * k + E * C]), i.push([E * k + g * C, g * k - E * C]);
  }
  e.fillStyle = ie(m, 0.6 * p), e.beginPath(), v.concat(i.reverse()).forEach((w, M) => {
    M ? e.lineTo(d + w[0], u + w[1]) : e.moveTo(d + w[0], u + w[1]);
  }), e.closePath(), e.fill(), e.strokeStyle = ie(m, 0.28 * p), e.lineWidth = 0.9, e.lineCap = "round";
  for (let w = 0; w < 18; w++) {
    let M = r() * 6.28, C = f * (0.95 + 0.1 * r()), k = C + f * (0.3 + 0.9 * r());
    e.beginPath(), e.moveTo(d + Math.cos(M) * C, u + Math.sin(M) * C), e.lineTo(d + Math.cos(M + 0.05) * k, u + Math.sin(M + 0.05) * k), e.stroke();
  }
  e.restore();
}
function Zn(e, n, t, l) {
  let o = ne(l.seed * 41 + 2), r = Le(l.seed + 19), a = o() * Math.PI * 2, s = Math.cos(a), u = Math.sin(a), f = 96, d = Math.round(f * t / n), p = ye(f, d, !0), m = p.getContext("2d"), h = m.createImageData(f, d), S = h.data;
  for (let b = 0; b < d; b++) for (let E = 0; E < f; E++) {
    let g = K((E / f - 0.5) * s + (b / d - 0.5) * u + 0.5), v = Math.pow(g, 2.4) * (0.45 + 0.55 * r(E * 0.12, b * 0.12)), i = (b * f + E) * 4;
    S[i] = 165, S[i + 1] = 112, S[i + 2] = 45, S[i + 3] = Math.round(255 * 0.42 * v);
  }
  m.putImageData(h, 0, 0), e.save(), e.imageSmoothingQuality = "high", e.drawImage(p, 0, 0, n, t), e.restore();
}
function Qn(e, n, t, l) {
  let o = ne(l.seed * 61 + 11), r = Math.min(n, t) / 900, a = [[150, 78, 30], [170, 96, 40], [128, 62, 24]];
  e.save(), e.globalCompositeOperation = "multiply";
  for (let s = 0, u = 0; s < 150 && u < 900; u++) {
    let f = o() * n, d = o() * t, p = Math.max(Math.abs(f / n - 0.5), Math.abs(d / t - 0.5)) * 2;
    if (o() > 0.15 + 0.85 * p * p * p) continue;
    s++;
    let m = o() < 0.4, h = r * (m ? 4 + Math.pow(o(), 1.5) * 15 : 1 + Math.pow(o(), 2) * 5), S = a[Math.floor(o() * 3)], b = 0.34 + 0.4 * o(), E = e.createRadialGradient(0, 0, h * (m ? 0 : 0.55), 0, 0, h);
    m ? (E.addColorStop(0, ie(S, b * 0.6)), E.addColorStop(0.55, ie(S, b * 0.4)), E.addColorStop(1, ie(S, 0))) : (E.addColorStop(0, ie(S, b * 0.7)), E.addColorStop(0.85, ie(S, b * 0.8)), E.addColorStop(0.97, ie(S, b * 1.15)), E.addColorStop(1, ie(S, 0))), e.save(), e.translate(f, d), e.rotate(o() * 3.14), e.scale(1, m ? 0.55 + 0.45 * o() : 1), e.fillStyle = E, e.beginPath(), e.arc(0, 0, h, 0, Math.PI * 2), e.fill(), e.restore();
  }
  e.restore();
}
function Wn(e, n, t, l, o) {
  let r = ne(l.seed * 59 + 9), a = Le(l.seed + 23), s = String(l.stamp).toUpperCase(), u = r() < 0.6 ? [176, 26, 36] : [34, 64, 150], f = ye(1, 1).getContext("2d");
  f.font = 'bold 100px "Courier Prime", monospace', f.letterSpacing = "12px";
  let d = f.measureText(s).width / 100, p = n * 0.44, m = p / (d + 1.2), h = m * 2.1, S = -(0.14 + 0.17 * r()), b = n * (0.46 + 0.1 * r()), E = Math.min(t - h / 2 - 30, Math.max(t * 0.55, o + h / 2 + 24)), g = Math.ceil(Math.hypot(p, h) + m * 0.8), v = ye(g, g, !0), i = v.getContext("2d");
  i.translate(g / 2, g / 2), i.fillStyle = i.strokeStyle = ie(u, 1), i.textAlign = "center", i.textBaseline = "middle", i.font = `bold ${m}px "Courier Prime", monospace`, i.letterSpacing = m * 0.12 + "px", i.lineWidth = m * 0.13, i.strokeRect(-p / 2, -h / 2, p, h), i.globalAlpha = 0.5, i.lineWidth = m * 0.1, i.strokeRect(-p / 2 + m * 0.07, -h / 2 - m * 0.05, p, h), i.globalAlpha = 1, i.lineWidth = m * 0.05, i.strokeRect(-p / 2 + m * 0.3, -h / 2 + m * 0.3, p - m * 0.6, h - m * 0.6), i.fillText(s, -m * 0.06, m * 0.05);
  let w = i.getImageData(0, 0, g, g), M = w.data, C = g / 2;
  for (let k = 0; k < M.length; k += 4) {
    if (!M[k + 3]) continue;
    let I = k / 4, J = I % g, ee = Math.floor(I / g), _ = (J - C) / (p / 2), U = (ee - C) / (h / 2), G = 1 - 0.25 * Math.min(1, _ * _ + U * U), Z = K((a(J / (m * 1.5), ee / (m * 1.5)) - 0.25) * 3.2) * G * (r() < 0.94 ? 1 : 0.3);
    M[k + 3] = Math.round(M[k + 3] * Z);
  }
  i.putImageData(w, 0, 0), e.save(), e.globalCompositeOperation = "multiply", e.globalAlpha = 0.9, e.translate(b, E), e.rotate(S), e.drawImage(v, -g / 2, -g / 2), e.restore();
}
function eo(e, n, t, l) {
  let o = ne(l.seed * 53 + 7), r = n * (0.24 + 0.04 * o()), a = n * 0.1;
  [[0.1, 0.05, 0.7], [0.9, 0.05, -0.7]].forEach(([s, u, f]) => {
    let d = n * (s + (o() - 0.5) * 0.03), p = t * (u + (o() - 0.5) * 0.02), m = f + (o() - 0.5) * 0.1;
    e.save(), e.translate(d, p), e.rotate(m);
    let h = [];
    for (let E = 0; E <= 6; E++) h.push([r / 2 - (E % 2 ? 0 : 2 + 4 * o()), -a / 2 + a * E / 6]);
    let S = () => {
      e.beginPath(), e.moveTo(-r / 2, -a / 2), h.forEach((E) => e.lineTo(E[0], E[1])), e.lineTo(-r / 2, a / 2), e.closePath();
    };
    S(), e.fillStyle = "rgba(226,176,96,0.48)", e.fill();
    let b = e.createLinearGradient(0, -a / 2, 0, a / 2);
    b.addColorStop(0, "rgba(255,248,230,0)"), b.addColorStop(0.3, "rgba(255,248,230,0.3)"), b.addColorStop(0.5, "rgba(255,248,230,0.06)"), b.addColorStop(1, "rgba(255,248,230,0)"), e.fillStyle = b, e.fill(), S(), e.strokeStyle = "rgba(140,92,36,0.5)", e.lineWidth = 2, e.stroke(), e.fillStyle = "rgba(140,92,36,0.16)", e.fillRect(-r / 2, -a / 2, r * 0.03, a);
    for (let E = 0, g = 6 + Math.floor(o() * 4); E < g; E++)
      e.fillStyle = `rgba(70,46,22,${0.3 + 0.3 * o()})`, e.beginPath(), e.arc((o() - 0.5) * r * 0.8, (o() - 0.5) * a * 0.7, 1 + 2 * o(), 0, Math.PI * 2), e.fill();
    e.restore();
  });
}
function to(e, n, t, l, o) {
  let r = ne(l.seed * 71 + 3), a = 54 + r() * 16, s = 48 + r() * 16, u = -0.52 + (r() - 0.5) * 0.15;
  if (e.save(), e.translate(o ? a : n - a, s), e.rotate(o ? u : -u), o) {
    e.fillStyle = "rgba(30, 20, 10, 0.7)", e.fillRect(-22, -3, 5, 6), e.fillRect(17, -3, 5, 6), e.fillStyle = "rgba(10, 10, 10, 0.35)", e.fillRect(-20, 1, 40, 5);
    let f = e.createLinearGradient(0, -3, 0, 3);
    f.addColorStop(0, "#c8cdd4"), f.addColorStop(0.3, "#ffffff"), f.addColorStop(0.7, "#858d99"), f.addColorStop(1, "#535b66"), e.fillStyle = f, e.fillRect(-20, -3, 40, 5), e.fillStyle = "rgba(140, 70, 30, 0.35)", e.fillRect(-8, -2, 6, 3);
  } else
    e.fillStyle = "rgba(30, 20, 10, 0.7)", e.fillRect(-22, -3, 5, 6), e.fillRect(17, -3, 5, 6), e.fillStyle = "#7a828e", e.fillRect(-18, -2, 12, 4), e.fillRect(6, -2, 12, 4);
  e.restore();
}
function no(e, n, t, l, o) {
  let r = ne(l.seed * 67 + 13), a = n * (0.25 + 0.5 * r()), s = t * (0.3 + 0.45 * r()), u = Math.min(n, t) * (0.12 + 0.08 * r()), f = o ? a : n - a;
  e.save(), e.globalCompositeOperation = "multiply";
  let d = e.createRadialGradient(f, s, u * 0.2, f, s, u);
  d.addColorStop(0, "rgba(140, 120, 70, 0.45)"), d.addColorStop(0.65, "rgba(150, 130, 80, 0.30)"), d.addColorStop(1, "rgba(150, 130, 80, 0)"), e.fillStyle = d, e.beginPath();
  for (let p = 0; p <= Math.PI * 2 + 0.01; p += 0.1) {
    let m = u * (1 + 0.12 * Math.sin(p * 5 + r() * 3));
    p === 0 ? e.moveTo(f + Math.cos(p) * m, s + Math.sin(p) * m) : e.lineTo(f + Math.cos(p) * m, s + Math.sin(p) * m);
  }
  e.fill(), e.restore();
}
function oo(e, n, t, l, o) {
  let r = Math.min(n, t) * 0.15;
  if (e.save(), o) {
    e.fillStyle = "rgba(10, 10, 15, 0.3)", e.beginPath(), e.moveTo(n - r - 8, 0), e.lineTo(n, r + 8), e.lineTo(n - r, r), e.closePath(), e.fill();
    let a = e.createLinearGradient(n - r, 0, n, r);
    a.addColorStop(0, "rgba(235, 225, 210, 0.95)"), a.addColorStop(1, "rgba(195, 185, 170, 0.95)"), e.fillStyle = a, e.beginPath(), e.moveTo(n - r, 0), e.lineTo(n, r), e.lineTo(n - r, r), e.closePath(), e.fill(), e.strokeStyle = "rgba(60, 50, 40, 0.4)", e.lineWidth = 2, e.beginPath(), e.moveTo(n - r, 0), e.lineTo(n, r), e.stroke();
  }
  e.restore();
}
function ro(e, n, t, l) {
  let o = ne(l.seed * 83 + 7);
  e.save(), e.strokeStyle = "rgba(120, 140, 170, 0.12)", e.lineWidth = 3;
  for (let r = 0; r < 6; r++) {
    let a = t * (0.2 + 0.12 * r + 0.04 * o());
    e.beginPath(), e.moveTo(0, a), e.bezierCurveTo(n * 0.33, a + 18 * (o() - 0.5), n * 0.66, a + 18 * (o() - 0.5), n, a), e.stroke();
  }
  e.restore();
}
function ao(e, n, t, l) {
  let o = ne(l.seed * 89 + 11);
  e.save(), e.strokeStyle = "rgba(255, 255, 255, 0.28)", e.lineWidth = 1;
  for (let r = 0; r < 14; r++) {
    let a = o() * n, s = o() * t, u = o() * Math.PI, f = 60 + o() * 120;
    e.beginPath(), e.moveTo(a, s), e.lineTo(a + Math.cos(u) * f, s + Math.sin(u) * f), e.stroke();
  }
  e.restore();
}
function tn(e, n, t) {
  if (!e.hiddenInk) return null;
  let l = ye(n, t, !0), o = l.getContext("2d"), r = Math.round(n * 0.12);
  o.fillStyle = "#fff", o.textAlign = "center", o.filter = "blur(0.7px)", o.font = `${r}px "Caveat", cursive`, o.translate(n / 2, t * 0.7), o.rotate(-0.1), e.hiddenInk.split(`
`).forEach((u, f) => o.fillText(u, 0, f * r * 1.05));
  let a = o.getImageData(0, 0, n, t).data, s = new Float32Array(n * t);
  for (let u = 0; u < t; u++) for (let f = 0; f < n; f++) s[u * n + f] = a[((t - 1 - u) * n + f) * 4 + 3] / 255;
  return s;
}
function Ve(e, n, t, l, o) {
  let r = [e, n];
  for (let a = 0; a < l; a++) {
    let s = [r[0]];
    for (let u = 1; u < r.length; u++) {
      let f = r[u - 1], d = r[u], p = (f[0] + d[0]) / 2, m = (f[1] + d[1]) / 2, h = d[0] - f[0], S = d[1] - f[1], b = Math.hypot(h, S), E = (t() - 0.5) * b * o;
      s.push([p - S / b * E, m + h / b * E], d);
    }
    r = s;
  }
  return r;
}
async function qt(e, n, t = null) {
  let l = Math.round(n.w * yt / 2), o = Math.round(n.h * yt / 2), r = ye(l, o, !0), a = r.getContext("2d");
  a.fillStyle = "#fff", a.fillRect(0, 0, l, o);
  let s = ye(l, o, !0), u = s.getContext("2d");
  u.fillStyle = "#000", u.fillRect(0, 0, l, o);
  let f = ne(e.seed * 13 + 3);
  if (a.fillStyle = "#000", u.strokeStyle = "#fff", u.lineWidth = 2.2, u.filter = "blur(0.8px)", e.type === "form")
    for (let v = 22; v < o - 6; v += 24) [15, l - 15].forEach((i) => {
      a.beginPath(), a.arc(i, v, 5.5, 0, Math.PI * 2), a.fill();
    });
  if (e.type === "notebook") {
    let v = Ve([4, 0], [4, o], f, 7, 0.05);
    a.beginPath(), a.moveTo(0, 0), v.forEach((i) => a.lineTo(i[0] + f() * 2, i[1])), a.lineTo(0, o), a.closePath(), a.fill();
    for (let i = 18; i < o; i += 22)
      a.beginPath(), a.arc(2, i, 5 + f() * 1.5, 0, Math.PI * 2), a.fill();
    u.beginPath(), v.forEach((i, w) => w ? u.lineTo(i[0] + 1, i[1]) : u.moveTo(i[0] + 1, i[1])), u.stroke();
  }
  if (e.type === "envelope") {
    let v = n.flap / n.h * o;
    a.beginPath(), a.moveTo(-2, -2), a.lineTo(l / 2, -2), a.lineTo(l / 2, 3), a.lineTo(-2, v), a.closePath(), a.fill(), a.beginPath(), a.moveTo(l + 2, -2), a.lineTo(l / 2, -2), a.lineTo(l / 2, 3), a.lineTo(l + 2, v), a.closePath(), a.fill();
  }
  if (e.type === "punchcard") {
    a.beginPath(), a.moveTo(-2, -2), a.lineTo(26, -2), a.lineTo(-2, 26), a.closePath(), a.fill();
    let v = (e.text.split(`
`)[0] || "").slice(0, 80), i = 17, M = (l - 17 - i) / 79, C = o * 0.23, k = (o * 0.94 - C) / 11;
    for (let I = 0; I < v.length; I++) {
      let J = en(v[I]), ee = i + I * M;
      for (let _ of J) {
        let U = C + _ * k;
        a.fillRect(ee - 2.5, U - 5, 5, 10);
      }
    }
  }
  if (e.type === "parchment") {
    let v = Ve([-2, 3], [l + 2, 3], f, 5, 0.1), i = Ve([-2, o - 3], [l + 2, o - 3], f, 5, 0.1), w = Ve([3, -2], [3, o + 2], f, 5, 0.1), M = Ve([l - 3, -2], [l - 3, o + 2], f, 5, 0.1);
    u.lineWidth = 2.5, [v, i, w, M].forEach((C) => {
      u.beginPath(), C.forEach((k, I) => I ? u.lineTo(k[0], k[1]) : u.moveTo(k[0], k[1])), u.stroke();
    });
  }
  if (e.states.includes("torn")) {
    let v = Math.floor(f() * 3), i, w, M;
    v === 0 ? (i = [l * (0.5 + 0.25 * f()), -2], w = [l + 2, o * (0.2 + 0.25 * f())], M = [[l + 2, -2]]) : v === 1 ? (i = [-2, o * (0.72 + 0.12 * f())], w = [l + 2, o * (0.72 + 0.12 * f())], M = [[l + 2, o + 2], [-2, o + 2]]) : (i = [l * (0.3 + 0.25 * f()), o + 2], w = [-2, o * (0.55 + 0.2 * f())], M = [[-2, o + 2]]);
    let C = Ve(i, w, f, 8, 0.22);
    a.beginPath(), C.forEach((k, I) => I ? a.lineTo(k[0], k[1]) : a.moveTo(k[0], k[1])), M.forEach((k) => a.lineTo(k[0], k[1])), a.closePath(), a.fill(), u.lineWidth = 3.2, u.beginPath(), C.forEach((k, I) => I ? u.lineTo(k[0], k[1]) : u.moveTo(k[0], k[1])), u.stroke();
  }
  let d = a.getImageData(0, 0, l, o).data, p = u.getImageData(0, 0, l, o).data, m = t ? await bt.run("burn", [{ seed: e.seed, form: t === "singed" ? "singed" : e.burn }, l, o]) : null, h = a.createImageData(l, o), S = h.data, b = [], E = 1 / 0;
  for (let v = 0; v < o; v++) for (let i = 0; i < l; i++) {
    let w = (v * l + i) * 4;
    if (S[w] = d[w], S[w + 1] = 0, S[w + 2] = p[w], m) {
      let M = m[v * l + i];
      S[w + 3] = Math.round(K(M / 1.4) * 255), E = Math.min(E, M), t === "burn" && i % 3 === 0 && v % 3 === 0 && d[w] > 128 && b.push((i + 0.5) / l, 1 - (v + 0.5) / o, M);
    } else S[w + 3] = 255;
  }
  let g = ye(l, o);
  return g.getContext("2d").putImageData(h, 0, 0), { canvas: g, burnPts: t === "burn" ? new Float32Array(b) : null, lo: m ? Math.max(0, E) : 0 };
}

// .build/shaders.js
var nn = `#version 300 es
precision highp float;in vec2 aXY;uniform sampler2D uH;uniform int uShape;uniform float uP,uK0,uKres,uA0,uAres,uScale,uSeedA,uSquash,uRoll,uCurl,uTear,uStubX,uIsStub,uFoldSide,uFoldBw,uFoldY,uEdge,uThick;uniform vec2 uHalf;uniform mat4 uModel,uProj;out vec3 vPos;out vec3 vNrm;out vec2 vUv;out float vE;out float vAmp;float Hf(vec2 xy){return textureLod(uH,xy/(2.0*uHalf)+0.5,0.0).r;}vec3 rotY(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x+s*v.z,v.y,-s*v.x+c*v.z);}vec3 rotZ(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x-s*v.y,s*v.x+c*v.y,v.z);}vec3 bend(float d,float th,float bw){float t=max(abs(th),1e-4),R=bw/t,L=R*t;if(d<L){float a=d/R;return vec3(R*sin(a),R*(1.0-cos(a)),a);}return vec3(R*sin(t)+(d-L)*cos(t),R*(1.0-cos(t))+(d-L)*sin(t),t);}void foldX(inout vec3 p,inout vec3 n,float x0,float s,float th,float bw){float d=(p.x-x0)*s;if(d<=0.0||abs(th)<1e-4)return;vec3 c=bend(d,th,bw);float g=sign(th),ca=cos(c.z),sa=g*sin(c.z),z0=p.z;p.x=x0+s*(c.x-sa*z0);p.z=g*c.y+ca*z0;n=vec3(ca*n.x-s*sa*n.z,n.y,s*sa*n.x+ca*n.z);}void foldY(inout vec3 p,inout vec3 n,float y0,float s,float th,float bw){float d=(p.y-y0)*s;if(d<=0.0||abs(th)<1e-4)return;vec3 c=bend(d,th,bw);float g=sign(th),ca=cos(c.z),sa=g*sin(c.z),z0=p.z;p.y=y0+s*(c.x-sa*z0);p.z=g*c.y+ca*z0;n=vec3(n.x,ca*n.y-s*sa*n.z,s*sa*n.y+ca*n.z);}vec3 place(vec2 xy,out float e,out float amp,out vec3 n){vec3 p=vec3(xy,0.0);n=vec3(0.0,0.0,1.0);if(uShape==0){float s=length(xy),sn=s/length(uHalf);float q=clamp(uP*1.5-sn*0.5+0.14*sn*sin(atan(xy.y,xy.x)*3.0+uSeedA),0.0,1.0);e=q*q*(3.0-2.0*q);float k=mix(uKres,uK0,(1.0-e)*(1.0-e));if(s>1e-6){float th=s*k,st=sin(th),ct=cos(th);vec2 dir=xy/s;n=vec3(st*dir,ct);p=vec3(st/k*dir,(ct-1.0)/k);}float sq=mix(uSquash,1.0,e);float expan=mix(1.0+(1.0-uSquash)*0.3,1.0,e);p.z*=sq;p.xy*=expan;n=normalize(vec3(n.xy/expan,n.z/sq));amp=mix(uA0,uAres,pow(e,2.2));}else if(uShape==1){e=uP;float L=2.0*uHalf.x*e,s=xy.x+uHalf.x;if(s>L){float ph=(s-L)/uRoll;float r=uRoll*(1.0-0.07*ph/6.2831853);p=vec3(L-uHalf.x+r*sin(ph),xy.y,r*(1.0-cos(ph)));n=vec3(-sin(ph),0.0,cos(ph));}p.x+=(uHalf.x-uRoll)*(1.0-e);amp=mix(uA0,uAres,e);}else if(uShape==2){e=uP;float k=uK0*(1.0-e)*(1.0-e);if(k>1e-2){float a=(xy.y+uHalf.y)*k;float r=1.0/k-uRoll*a/6.2831853;vec2 ax=vec2(-uHalf.y,-1.0/k);p=vec3(xy.x,ax.x+r*sin(a),ax.y+r*cos(a));n=vec3(0.0,sin(a),cos(a));float g=pow(1.0-e,3.0);float axv=abs(xy.x)/uHalf.x;float neck=smoothstep(0.5,0.8,axv),fl=smoothstep(0.82,1.0,axv);float sc=mix(1.0,mix(1.0,0.17*(1.0+3.2*fl),neck),g);float tw=sign(xy.x)*(neck*3.4+fl*1.3)*g;float c=cos(tw),sn=sin(tw);vec2 rv=(p.yz-ax)*sc;p.yz=ax+vec2(c*rv.x-sn*rv.y,sn*rv.x+c*rv.y);n.yz=vec2(c*n.y-sn*n.z,sn*n.y+c*n.z);n=normalize(n);}p.y+=uHalf.y*(1.0-e);p.z+=(1.0/uK0)*(1.0-e);amp=mix(uA0,uAres,e);}else if(uShape==6){e=uP;foldY(p,n,uFoldY,1.0,mix(3.12,-1.1,smoothstep(0.0,1.0,e)),uFoldBw);p.y-=(uFoldY-uHalf.y)*0.5;amp=mix(uA0,uAres,e);}else if(uShape==7){e=uP;float em=smoothstep(0.0,1.0,e);float a=3.12*(1.0-em);float x3=uHalf.x*0.333;foldX(p,n,-x3,-1.0,a,uFoldBw);foldX(p,n,0.0,1.0,-a,uFoldBw*1.5);foldX(p,n,x3,1.0,a,uFoldBw*2.0);p.x*=mix(0.28,1.0,em);amp=mix(uA0,uAres,e);}else if(uShape==8){e=uP;float em=smoothstep(0.0,1.0,e);float a=3.12*(1.0-em);foldX(p,n,0.0,1.0,a,uFoldBw);foldY(p,n,0.0,-1.0,a,uFoldBw*1.5);p.xy*=mix(0.58,1.0,em);amp=mix(uA0,uAres,e);}else{e=uP;float e2=smoothstep(0.0,0.5,e),e1=smoothstep(0.5,1.0,e);if(uShape==3){foldX(p,n,0.0,1.0,3.12*(1.0-e1),uFoldBw);foldY(p,n,0.0,1.0,3.12*(1.0-e2),uFoldBw*2.6);p.x+=uHalf.x*0.5*(1.0-e1);p.y+=uHalf.y*0.5*(1.0-e2);}else if(uShape==4){float em=smoothstep(0.0,1.0,e);foldX(p,n,0.0,uFoldSide,3.12*(1.0-em),uFoldBw);p.x+=uFoldSide*uHalf.x*0.5*(1.0-em);}else{float y3=uHalf.y/3.0;foldY(p,n,-y3*1.08,-1.0,3.12*(1.0-e1),uFoldBw);foldY(p,n,y3,1.0,3.12*(1.0-e2),uFoldBw*2.6);}amp=mix(uA0,uAres,e);}p+=n*Hf(xy)*amp;if(uIsStub>0.5&&uTear>0.0){vec3 piv=vec3(uStubX,0.0,0.0);p=rotY(rotZ(p-piv,-0.55*uTear),0.6*uTear)+piv+vec3(0.08*uTear,-1.1*uTear*uTear,0.12*uTear);n=rotY(rotZ(n,-0.55*uTear),0.6*uTear);}p.z-=uCurl*p.x*p.x;n=normalize(vec3(n.x+2.0*uCurl*p.x*n.z,n.y,n.z));return p;}void main(){float e,amp;vec3 nrm;vec3 p0=place(aXY,e,amp,nrm);if(uEdge>0.5)p0-=nrm*uThick*(nrm.z>=0.0?1.0:-1.0);vec4 w=uModel*vec4(p0,1.0);vPos=w.xyz;vNrm=mat3(uModel)*nrm;vUv=aXY/(2.0*uHalf)+0.5;vE=uShape==0?pow(e,2.2):e;vAmp=amp*uScale;gl_Position=uProj*w;}`, on = `#version 300 es
precision highp float;in vec3 vPos;in vec3 vNrm;in vec2 vUv;in float vE;in float vAmp;uniform sampler2D uH,uPrintF,uPrintB,uFx,uGrain;uniform vec2 uGrainK;uniform vec3 uCam,uColor,uL,uLampPos;uniform float uBump,uAge,uTime,uThru,uFront,uInkMax,uEdge,uDestroy,uLamp,uLampR;out vec4 frag;float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}vec3 perturb(vec3 pos,vec3 n,vec2 dH){vec3 sx=dFdx(pos),sy=dFdy(pos);vec3 r1=cross(sy,n),r2=cross(n,sx);float det=dot(sx,r1);return normalize(abs(det)*n-sign(det)*(dH.x*r1+dH.y*r2));}void main(){vec4 fx=texture(uFx,vUv);float pres=fx.r,sc=0.0;if(uFront>-0.5){float b=fx.a*1.4;pres=min(pres,smoothstep(uFront-0.004,uFront+0.012,b));sc=1.0-smoothstep(uFront,uFront+0.17,b);}if(pres<0.4)discard;float a=smoothstep(0.4,0.6,pres);bool front=gl_FrontFacing;vec3 n=normalize(vNrm)*(front?1.0:-1.0);vec3 L=normalize(uL);if(uEdge>0.5){float w=clamp((dot(n,L)+0.3)/1.3,0.0,1.0);vec3 ec=mix(uColor*vec3(0.8,0.76,0.7),vec3(0.08,0.06,0.05),smoothstep(0.55,0.9,sc))*(0.45+0.55*w);frag=vec4(ec*a,a);return;}vec4 h0=texture(uH,vUv);vec2 du=dFdx(vUv),dv=dFdy(vUv);vec4 hx=texture(uH,vUv+du),hy=texture(uH,vUv+dv);vec3 toP=uLampPos-vPos;vec3 Lp=normalize(toP);float pool=pow(1.0-smoothstep(0.0,1.0,length(toP.xy)/uLampR),1.3)*uLamp;float grazD=clamp((1.0-L.z-0.4)/0.5,0.0,1.0);float grazP=smoothstep(0.2,0.75,1.0-Lp.z)*pool;float ink=uInkMax*mix(grazD,grazP*3.0,uLamp);vec2 dH=vec2(hx.r-h0.r,hy.r-h0.r)*vAmp*uBump*(1.0+1.6*pool)-vec2(hx.g-h0.g,hy.g-h0.g)*ink;n=perturb(vPos,n,dH);vec3 V=normalize(uCam-vPos);float wrap=clamp((dot(n,L)+0.08)/1.08,0.0,1.0);float wrapP=max(dot(n,Lp),0.0);float ao=mix(1.0,0.42+0.58*smoothstep(-0.55,0.35,h0.r),1.0-vE);float fib=hash(floor(vUv*vec2(900.0,1180.0)));vec2 eu=min(vUv,1.0-vUv);float edge=smoothstep(0.0,0.05,min(eu.x,eu.y));vec3 col0=mix(uColor,uColor*vec3(0.93,0.84,0.66),uAge);vec3 alb=col0*(0.975+0.025*fib)*(0.93+0.07*edge);alb*=1.0+(texture(uGrain,vUv*uGrainK).r-0.94)*1.8;if(!front)alb*=0.9;vec2 uvB=vec2(1.0-vUv.x,vUv.y);vec4 tF=texture(uPrintF,vUv),tB=texture(uPrintB,uvB);vec4 pr=front?tF:tB;vec4 th=front?tB:tF;alb=mix(alb,th.rgb,th.a*uThru);alb=mix(alb,pr.rgb,pr.a);alb=mix(alb,vec3(0.45,0.29,0.13),smoothstep(0.12,0.55,sc)*0.85);alb=mix(alb,vec3(0.06,0.045,0.04),smoothstep(0.55,0.9,sc));alb=mix(alb,vec3(0.99,0.985,0.96),fx.b*0.85);vec3 key=vec3(1.0,0.965,0.9),amb=vec3(0.62,0.64,0.7);vec3 warm=vec3(1.0,0.9,0.74);vec3 base=amb*0.3*ao+key*1.04*wrap*mix(1.0,ao,0.7)*mix(1.0,0.55,uLamp);float spot=wrapP*pool*mix(1.0,ao,0.5);vec3 col=alb*(base+warm*spot*max(vec3(0.0),vec3(1.15)-base));col+=key*0.03*pow(max(dot(n,normalize(L+V)),0.0),24.0)*(1.0-0.5*uLamp);col+=warm*0.06*pow(max(dot(n,normalize(Lp+V)),0.0),30.0)*pool;float rim=(1.0-smoothstep(0.42,0.66,pres))*smoothstep(0.6,0.95,sc);float fl=0.55+0.45*sin(uTime*6.0+vUv.x*37.0+vUv.y*23.0)*sin(uTime*2.3+vUv.y*51.0);col+=vec3(1.0,0.42,0.08)*rim*fl*(1.7+1.6*uDestroy);frag=vec4(col*a,a);}`, rn = `#version 300 es
in vec2 aQ;uniform vec3 uC;uniform vec2 uHS;uniform float uSoft;uniform mat4 uProj;out vec2 vL;void main(){vL=aQ*(uHS+vec2(uSoft*3.0));gl_Position=uProj*vec4(uC+vec3(vL,0.0),1.0);}`, an = `#version 300 es
precision highp float;in vec2 vL;uniform vec2 uHS;uniform float uR,uSoft,uA,uOpen,uFront,uFlip;uniform sampler2D uFx;out vec4 frag;float paperAt(vec2 uv){vec4 fx=texture(uFx,clamp(uv,0.0,1.0));return uFront>-0.5?min(fx.r,smoothstep(uFront-0.004,uFront+0.012,fx.a*1.4)):fx.r;}void main(){vec2 q=abs(vL)-uHS+vec2(uR);float d=length(max(q,0.0))+min(max(q.x,q.y),0.0)-uR;float pres=1.0;if(uOpen>0.0){vec2 uv=vL/(2.0*uHS)+0.5,o=vec2(uSoft)/(2.0*uHS);if(uFlip>0.5)uv.x=1.0-uv.x;float p=paperAt(uv)*2.0+paperAt(uv+vec2(o.x,0.0))+paperAt(uv-vec2(o.x,0.0))+paperAt(uv+vec2(0.0,o.y))+paperAt(uv-vec2(0.0,o.y));pres=mix(1.0,p/6.0,uOpen);}frag=vec4(0.0,0.0,0.0,uA*pres*(1.0-smoothstep(-uSoft,uSoft*2.5,d)));}`, ln = `#version 300 es
in vec3 aP;in vec4 aC;in float aS;uniform mat4 uProj;uniform float uPx;out vec4 vC;void main(){gl_Position=uProj*vec4(aP,1.0);gl_PointSize=max(1.0,aS*uPx/gl_Position.w);vC=aC;}`, sn = `#version 300 es
precision highp float;in vec4 vC;out vec4 frag;void main(){float a=smoothstep(0.5,0.05,length(gl_PointCoord-0.5))*vC.a;frag=vec4(vC.rgb*a,a);}`;

// .build/sound.js
var fn = {
  postcard: { freq: 290, q: 3.2, gain: 3 },
  shipping: { freq: 310, q: 3, gain: 3 },
  kraft: { freq: 310, q: 3, gain: 3 },
  punchcard: { freq: 330, q: 2.8, gain: 3.2 },
  polaroid: { freq: 290, q: 3.2, gain: 3 },
  ticket: { freq: 330, q: 2.8, gain: 3.2 },
  carbon: { freq: 660, q: 1.8, gain: 4 },
  receipt: { freq: 590, q: 1.9, gain: 3.8 },
  newspaper: { freq: 560, q: 2, gain: 3.6 },
  typed: { freq: 420, q: 2.4, gain: 3.5 },
  notebook: { freq: 420, q: 2.4, gain: 3.5 },
  memo: { freq: 420, q: 2.4, gain: 3.5 },
  form: { freq: 420, q: 2.4, gain: 3.5 },
  sticky: { freq: 420, q: 2.4, gain: 3.5 },
  envelope: { freq: 420, q: 2.4, gain: 3.5 },
  blueprint: { freq: 420, q: 2.4, gain: 3.5 },
  parchment: { freq: 410, q: 2.5, gain: 3.5 },
  ledger: { freq: 420, q: 2.4, gain: 3.5 }
};
function io(e) {
  let n = Math.max(30, Math.min(350, e));
  if (n <= 80) {
    let r = (80 - n) / 50;
    return {
      freq: Math.round(420 + r * 260),
      q: +(2.4 - r * 0.6).toFixed(2),
      gain: +(3.5 + r * 0.5).toFixed(2)
    };
  }
  let t, l;
  if (n <= 160) {
    let r = (n - 80) / 80;
    t = Math.round(420 - r * 80), l = +(2.4 + r * 0.4).toFixed(2);
  } else {
    let r = Math.min(1, (n - 160) / 140);
    t = Math.round(340 - r * 60), l = +(2.8 + r * 0.4).toFixed(2);
  }
  let o = +(3.5 - Math.min(1, (n - 80) / 220) * 0.5).toFixed(2);
  return { freq: t, q: l, gain: o };
}
function lo(e) {
  if (!e) return { freq: 420, q: 2.4, gain: 3.5 };
  typeof e == "string" ? e = { type: e } : typeof e == "number" && (e = { gsm: e });
  let n;
  return e.gsm !== void 0 && Number.isFinite(e.gsm) ? n = io(e.gsm) : e.type && fn[e.type] ? n = fn[e.type] : n = { freq: 420, q: 2.4, gain: 3.5 }, {
    freq: Number.isFinite(e.freq) ? e.freq : n.freq,
    q: Number.isFinite(e.q) ? e.q : n.q,
    gain: Number.isFinite(e.gain) ? e.gain : n.gain
  };
}
var le = /* @__PURE__ */ (() => {
  let e = null, n = null, t = null, l = null, o = null, r = { freq: 420, q: 2.4, gain: 3.5 }, a = he.get("sound", !1), s = {}, u = {};
  function f(g, v) {
    if (r = { ...g }, t && e) {
      let i = v !== void 0 ? v : e.currentTime;
      i > e.currentTime ? (t.frequency.setValueAtTime(r.freq, i), t.Q.setValueAtTime(r.q, i), t.gain.setValueAtTime(r.gain, i)) : (t.frequency.setValueAtTime(r.freq, e.currentTime), t.frequency.value = r.freq, t.Q.setValueAtTime(r.q, e.currentTime), t.Q.value = r.q, t.gain.setValueAtTime(r.gain, e.currentTime), t.gain.value = r.gain);
    }
    return r;
  }
  function d(g, v) {
    return f(lo(g), v);
  }
  let p = () => {
    if (!e) {
      let g = window.AudioContext || window.webkitAudioContext;
      if (!g) return null;
      e = new g(), n = e.createGain(), n.gain.value = 0.6, t = e.createBiquadFilter(), t.type = "peaking", t.frequency.value = r.freq, t.Q.value = r.q, t.gain.value = r.gain, n.connect(t), t.connect(e.destination), l = e.createBuffer(1, e.sampleRate, e.sampleRate);
      let v = l.getChannelData(0), i = 0, w = 0;
      for (let M = 0; M < v.length; M++) {
        let C = Math.random() * 2 - 1;
        i = 0.99 * i + C * 0.05, w = 0.95 * w + C * 0.1, v[M] = (i + w + C * 0.15) * 1.6;
      }
    }
    return e.state === "suspended" && e.resume(), e;
  };
  function m() {
    return o || !e || (o = Promise.all(Object.entries(s).map(([g, v]) => fetch(v).then((i) => i.ok ? i.arrayBuffer() : Promise.reject(new Error(g))).then((i) => e.decodeAudioData(i)).then((i) => {
      u[g] = i;
    }).catch(() => {
    })))), o;
  }
  function h(g, v, i = {}) {
    let w = u[g];
    if (!w) return !1;
    let M = e.createBufferSource();
    M.buffer = w, M.playbackRate.value = i.rate || 1;
    let C = e.createGain();
    return C.gain.value = i.gain ?? 1, M.connect(C), C.connect(n), M.start(v, i.offset || 0, i.dur), !0;
  }
  function S(g, v, i, w, M) {
    let C = e.createBufferSource();
    C.buffer = l;
    let k = e.createBiquadFilter();
    k.type = "bandpass", k.frequency.value = i, k.Q.value = w;
    let I = e.createGain();
    I.gain.setValueAtTime(1e-4, g), I.gain.linearRampToValueAtTime(M, g + 2e-3), I.gain.exponentialRampToValueAtTime(1e-4, g + v), C.connect(k), k.connect(I), I.connect(n), C.start(g, Math.random() * 0.9, v + 0.03);
  }
  function b(g, v, i, w, M) {
    let C = e.createBufferSource();
    C.buffer = l, C.loop = !0;
    let k = e.createBiquadFilter();
    k.type = "bandpass", k.Q.value = 0.8, k.frequency.setValueAtTime(i, g), k.frequency.linearRampToValueAtTime(w, g + v);
    let I = e.createGain();
    I.gain.setValueAtTime(1e-4, g), I.gain.linearRampToValueAtTime(M, g + v * 0.15), I.gain.linearRampToValueAtTime(1e-4, g + v), C.connect(k), k.connect(I), I.connect(n), C.start(g), C.stop(g + v + 0.05);
  }
  function E(g, v, i, w, M, C) {
    let k = Math.round(v * i);
    for (let I = 0; I < k; I++) {
      let J = Math.random();
      C && (J = J * J), S(g + J * v, 6e-3 + Math.random() * 0.03, 1500 + Math.random() * 4500 * w, 0.7 + Math.random() * 2.2, M * (0.25 + Math.random() * 0.75));
    }
  }
  return {
    get enabled() {
      return a;
    },
    get tuning() {
      return { ...r };
    },
    set(g) {
      a = !!g, he.set("sound", a), a && p() && m();
    },
    // optional real recordings: { crumple, sheet, tear } (URLs)
    useSamples(g) {
      s = { ...g }, o = null, a && e && m();
    },
    tune(g) {
      return d(g);
    },
    // names: crumple, uncrumple, flip, tear, seal, fire, grain
    play(g, v = 1, i = 0, w) {
      if (typeof v == "object" && v !== null ? (w = v, v = 1, i = 0) : typeof v == "string" ? (w = { type: v }, v = 1, i = 0) : typeof i == "object" && i !== null ? (w = i, i = 0) : typeof i == "string" && (w = { type: i }, i = 0), typeof w == "string" ? w = { type: w } : typeof w == "number" && (w = { gsm: w }), w && d(w), !a || !p()) return;
      m();
      let M = e.currentTime + i;
      w && i > 0 && d(w, M);
      let C = (k) => !!u[k];
      if (g === "crumple")
        if (C("crumple")) {
          let k = Math.max(2, Math.round(v * 4));
          for (let I = 0; I < k; I++) h("crumple", M + I / k * v * 0.85, { gain: 0.6 + Math.random() * 0.35, rate: 0.85 + Math.random() * 0.35 });
          E(M, v, 25, 1, 0.1, !0);
        } else
          E(M, v, 90, 1, 0.32, !0), b(M, v, 2400, 1200, 0.07);
      else if (g === "uncrumple")
        if (C("sheet")) {
          let k = Math.max(2, Math.round(v * 2.5));
          for (let I = 0; I < k; I++) h(I % 2 && C("crumple") ? "crumple" : "sheet", M + I / k * v * 0.9, { gain: 0.4 + Math.random() * 0.25, rate: 0.75 + Math.random() * 0.25 });
        } else
          E(M, v, 46, 0.8, 0.26, !1), b(M, v, 1400, 2600, 0.05);
      else g === "flip" ? h("sheet", M, { gain: 0.8, rate: 1.15 }) || (b(M, 0.38, 500, 2400, 0.16), S(M + 0.34, 0.05, 900, 1, 0.22)) : g === "tear" ? h("tear", M, { gain: 1 }) || (b(M, 0.45, 1800, 3600, 0.18), E(M, 0.45, 160, 1.2, 0.3, !1)) : g === "seal" ? (h("tear", M, { gain: 0.45, rate: 1.7, dur: 0.16 }) || S(M, 0.05, 1200, 2, 0.3), h("sheet", M + 0.2, { gain: 0.5, rate: 0.9 }) || b(M + 0.2, 0.5, 700, 2200, 0.08)) : g === "fire" ? (E(M, v, 22, 0.45, 0.16, !1), b(M, v, 500, 800, 0.05)) : g === "grain" && (h("crumple", M, { gain: 0.22, rate: 1.2 + Math.random() * 0.4, offset: Math.random() * 0.3, dur: 0.08 }) || E(M, 0.06, 60, 1, 0.2, !1));
    }
  };
})();

// .build/motion.js
function fe(e, n, t, l, o = be, r = 0, a) {
  e.tw = e.tw.filter((s) => s.key !== n), e.tw.push({ key: n, to: t, dur: Math.max(1e-3, l), ease: o, start: performance.now() + r * 1e3, from: null, done: a });
}
function Tt(e, n) {
  let t = !1, l = [];
  return e.tw = e.tw.filter((o) => {
    if (t = !0, n < o.start) return !0;
    o.from === null && (o.from = e[o.key]);
    let r = K((n - o.start) / (o.dur * 1e3));
    return e[o.key] = o.from + (o.to - o.from) * o.ease(r), r >= 1 ? (o.done && l.push(o.done), !1) : !0;
  }), l.forEach((o) => o()), t;
}
function tt(e) {
  if (e.cfg.type === "envelope") return 0.34;
  let n = e.F.shape;
  return n === 0 ? 0.42 : n === 2 ? 0.35 : 0.3;
}
function nt(e, n) {
  let t = ue(K(n));
  return 2 * Math.max(e.F.ext[0] / 2 + (e.half[0] - e.F.ext[0] / 2) * t, e.F.ext[1] / 2 + (e.half[1] - e.F.ext[1] / 2) * t);
}
function un(e, n) {
  let t = ue(K(e.cfg.type === "envelope" ? n * 2 : n)), l = [0, 0, -0.02];
  return e.pose.map((o, r) => o * (1 - t) + l[r] * t);
}
function He(e, n, t) {
  let l = (v, i = 0) => n.destroy !== void 0 ? n.destroy : v.front0 > -0.5 ? v.front0 + v.burned + i : -1, o = n.destroy !== void 0 ? K((1.25 - n.destroy) / 0.9) : 1;
  if (e.cfg.type !== "envelope") {
    let v = { ...t, p: n.p, f: n.f, tear: n.tear, front: l(e, n.burnOpen || 0), destroy: n.destroy !== void 0, alpha: o };
    return { items: [{ P: e, st: v }], shadow: { P: e, st: v }, active: { P: e, st: v } };
  }
  let r = e.letter, a = n.p, s = ue(K(a / 0.24)), u = ue(K((a - 0.14) / 0.36)), f = ue(K((a - 0.44) / 0.32)), d = K((a - 0.58) / 0.42), p = { ...t, p: s, f: n.f, tear: 0, cy: t.cy - f * t.vhU * 0.8, rot: [t.rot[0], t.rot[1], t.rot[2] + f * 0.45], front: l(e) }, m = -0.08 + u * 0.5, h = -0.035 * (1 - f), S = Math.PI * De(K(n.f)), b = [0, 0, -0.02], E = { ...t, cx: Ze(p.cx, 0, f), cy: Ze(p.cy, 0, f), sc: Ze(p.sc, t.scLetter, f), rot: p.rot.map((v, i) => Ze(v, b[i] + (t.adjust ? t.adjust[i] : 0), f)), local: [-Math.sin(S) * h, m * (1 - f), Math.cos(S) * h], p: Lt(d), f: n.f, tear: 0, front: l(r, n.burnOpen || 0), destroy: n.destroy !== void 0, alpha: o };
  return { items: f >= 0.999 ? [{ P: r, st: E }] : a < 0.01 ? [{ P: e, st: p }] : [{ P: e, st: p }, { P: r, st: E }], shadow: f < 0.5 ? { P: e, st: p } : { P: r, st: E }, active: f < 0.5 ? { P: e, st: p } : { P: r, st: E } };
}
function ot(e, n, t, l, o, r = 0, a = 0) {
  let s = ue(K(n.p)), u = (e.F.ext[0] / 2 + (e.half[0] - e.F.ext[0] / 2) * s) * n.sc * t * 1.1, f = (e.F.ext[1] / 2 + (e.half[1] - e.F.ext[1] / 2) * s) * n.sc * t * 1.1, d = r + l / 2 + n.cx * t, p = a + o / 2 - n.cy * t;
  return { cx: d, cy: p, x0: d - u, x1: d + u, y0: p - f, y1: p + f, w1: e.half[0] * 2 * n.sc * t, h1: e.half[1] * 2 * n.sc * t };
}
function Et(e, n, t, l) {
  let { P: o, st: r } = t.active, a = n.p - (n.pPrev ?? n.p), s = ue(K(r.p)), u = (o.F.ext[0] / 2 + (o.half[0] - o.F.ext[0] / 2) * s) * r.sc, f = (o.F.ext[1] / 2 + (o.half[1] - o.F.ext[1] / 2) * s) * r.sc;
  if (a > 5e-4 && n.p > 0.12 && n.p < 0.97) {
    let p = Math.min(8, Math.round(a * 300));
    for (let m = 0; m < p; m++) e.emit({ x: r.cx + (Math.random() - 0.5) * 2 * u, y: r.cy + (Math.random() - 0.5) * 2 * f, z: 0.06 * r.sc, vx: (Math.random() - 0.5) * 0.05 * r.sc, vy: (Math.random() * 0.04 + 0.01) * r.sc, ay: -0.01 * r.sc, r: 0.93, g: 0.9, b: 0.84, a: 0.5, s: (5e-3 + Math.random() * 8e-3) * r.sc, t: 0, life: 1.2 + Math.random() * 0.9 });
  }
  let d = r.front;
  if (d > -0.5 && o.burnPts && r.p > 0.9) {
    let p = n.destroy !== void 0;
    n.acc = (n.acc || 0) + l * (p ? 110 : 9);
    let m = o.burnPts, h = m.length / 3, S = Math.cos(r.rot[2]), b = Math.sin(r.rot[2]);
    for (; n.acc >= 1; ) {
      n.acc -= 1;
      let E = -1;
      for (let M = 0; M < 40; M++) {
        let C = Math.floor(Math.random() * h);
        if (Math.abs(m[C * 3 + 2] - d) < 0.012) {
          E = C;
          break;
        }
      }
      if (E < 0) continue;
      let g = (m[E * 3] - 0.5) * o.w * r.sc, v = (m[E * 3 + 1] - 0.5) * o.h * r.sc, i = r.cx + S * g - b * v, w = r.cy + b * g + S * v;
      e.emit({ x: i, y: w, z: 0.02 * r.sc, vx: (Math.random() - 0.5) * 0.08 * r.sc, vy: (0.06 + Math.random() * 0.1) * r.sc, ay: 0.06 * r.sc, r: 1, g: 0.5 + Math.random() * 0.3, b: 0.12, a: 1, s: (3e-3 + Math.random() * 5e-3) * r.sc, t: 0, life: 0.5 + Math.random() * 0.8, flicker: !0 }), p && Math.random() < 0.45 && e.emit({ x: i, y: w, z: 0.02 * r.sc, vx: (Math.random() - 0.5) * 0.06 * r.sc, vy: -(0.02 + Math.random() * 0.05) * r.sc, ay: -0.05 * r.sc, r: 0.2, g: 0.19, b: 0.18, a: 0.85, s: (8e-3 + Math.random() * 0.012) * r.sc, t: 0, life: 1.4 + Math.random() * 1.1 });
    }
  }
}
function St(e, n) {
  let t = /* @__PURE__ */ new Map(), l = [], o = null, r = () => {
    let [f, d] = [...t.values()];
    return Math.hypot(f.x - d.x, f.y - d.y);
  }, a = (f) => {
    let d = n.active();
    if (!d) return;
    let p = n.box();
    if (!(p && f.clientX > p.x0 && f.clientX < p.x1 && f.clientY > p.y0 && f.clientY < p.y1) && !t.size) {
      n.outside(f);
      return;
    }
    if (!t.size && n.tap && n.tap(f)) return;
    t.set(f.pointerId, { x: f.clientX, y: f.clientY });
    try {
      e.setPointerCapture(f.pointerId);
    } catch {
    }
    d.tw = d.tw.filter((S) => S.key !== "p");
    let h = performance.now();
    t.size === 2 ? o = { pinch: !0, d0: r(), p0: d.p, moved: !0, last: d.p, box: p, tLast: h, lastX: f.clientX, lastY: f.clientY, vx: 0, vy: 0 } : o = { pinch: !1, r0: Math.hypot(f.clientX - p.cx, f.clientY - p.cy), p0: d.p, x: f.clientX, y: f.clientY, moved: !1, last: d.p, box: p, tLast: h, lastX: f.clientX, lastY: f.clientY, vx: 0, vy: 0 };
  }, s = (f) => {
    if (!o || !t.has(f.pointerId)) return;
    t.set(f.pointerId, { x: f.clientX, y: f.clientY });
    let d = n.active();
    if (!d) {
      o = null, t.clear();
      return;
    }
    let p = performance.now(), m = p - o.tLast;
    m > 8 && (o.vx = (f.clientX - o.lastX) / m, o.vy = (f.clientY - o.lastY) / m, o.tLast = p, o.lastX = f.clientX, o.lastY = f.clientY);
    let h = 0.42 * Math.min(o.box.w1, o.box.h1);
    if (o.pinch && t.size === 2) d.p = K(o.p0 + (r() - o.d0) / h);
    else if (!o.pinch) {
      if (Math.hypot(f.clientX - o.x, f.clientY - o.y) > 6 && (o.moved = !0), !o.moved) return;
      d.p = K(o.p0 + (Math.hypot(f.clientX - o.box.cx, f.clientY - o.box.cy) - o.r0) / h);
    }
    Math.abs(d.p - o.last) > 0.035 && (le.play("grain"), o.last = d.p), d.dragging = !0, n.redraw();
  }, u = (f) => {
    if (!t.has(f.pointerId)) return;
    if (t.delete(f.pointerId), t.size === 1 && o) {
      let b = [...t.values()][0], E = n.box ? n.box() : o.box;
      o.pinch = !1, o.x = b.x, o.y = b.y, o.r0 = Math.hypot(b.x - (E ? E.cx : o.x), b.y - (E ? E.cy : o.y)), o.p0 = n.active() ? n.active().p : o.p0;
      return;
    }
    if (t.size) return;
    let d = n.active(), p = o && o.moved, m = o ? o.p0 : 0, h = o && o.vx || 0, S = o && o.vy || 0;
    if (o = null, !!d) {
      if (d.dragging = !1, n.flip && m > 0.85 && Math.abs(h) > 0.2 && Math.abs(h) > 1.5 * Math.abs(S)) {
        d.p = 1, n.flip();
        return;
      }
      if (n.outside && S > 0.75) {
        n.outside(f);
        return;
      }
      p && (d.p >= 0.3 ? (le.play("uncrumple", 0.4), fe(d, "p", 1, 0.45 * (1 - d.p) + 0.15, qe, 0, () => Xe(12))) : (le.play("crumple", 0.35), fe(d, "p", 0, 0.35 * d.p + 0.12, qe, 0, () => Xe(18))), n.redraw());
    }
  };
  return [["pointerdown", a], ["pointermove", s], ["pointerup", u], ["pointercancel", u]].forEach(([f, d]) => oe(l, e, f, d)), () => l.splice(0).forEach((f) => f());
}
function rt(e, n, t, l, o, r, a) {
  let s = [(n - l / 2) / r, -(t - o / 2) / r, 0.09 * o / r];
  e.lampPos || (e.lampPos = s.slice()), e.lampGoal = s, e.lampOn = a ? 1 : 0, e.lampMoving = !0;
}
function wt(e, n) {
  if (!e.lampGoal) return !1;
  let t = 1 - Math.exp(-n * 20), l = 1 - Math.exp(-n * 7), o = !1;
  for (let a = 0; a < 3; a++) {
    let s = e.lampGoal[a] - e.lampPos[a];
    Math.abs(s) > 1e-4 && (o = !0), e.lampPos[a] += s * t;
  }
  let r = (e.lampOn || 0) - (e.lamp || 0);
  return Math.abs(r) > 2e-3 && (o = !0), e.lamp = (e.lamp || 0) + r * l, o;
}

// .build/renderer.js
var ve = {
  persp(e, n, t, l) {
    let o = 1 / Math.tan(e / 2), r = 1 / (t - l);
    return [o / n, 0, 0, 0, 0, o, 0, 0, 0, 0, (l + t) * r, -1, 0, 0, 2 * l * t * r, 0];
  },
  mul(e, n) {
    let t = new Array(16);
    for (let l = 0; l < 4; l++) for (let o = 0; o < 4; o++) {
      let r = 0;
      for (let a = 0; a < 4; a++) r += e[a * 4 + o] * n[l * 4 + a];
      t[l * 4 + o] = r;
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
}, Ce = 30 * Math.PI / 180, Ie = 10, $e = [-0.45, 0.62, 0.65];
function so(e, n) {
  let t = n.w / 2, l = n.h / 2, o = Math.hypot(t, l);
  if (e === "flat") {
    let s = 0.78 * Math.PI / o, u = 1 / s;
    return { shape: 0, k0: s, squash: 0.3, roll: 0, A0: n.card ? 0.06 : 0.1, Ares: 45e-4, ext: [2.42 * u, 2.42 * u] };
  }
  if (e === "roll") {
    let s = Math.max(0.03, n.w * 0.085);
    return { shape: 1, k0: 0, squash: 1, roll: s, A0: 0.03, Ares: 4e-3, ext: [2.2 * s, n.h] };
  }
  if (e === "twist") {
    let s = 3.3 * Math.PI / n.h;
    return { shape: 2, k0: s, squash: 1, roll: 0.012, A0: 0.03, Ares: 45e-4, ext: [n.w, 2.6 / s] };
  }
  if (e === "quarters") return { shape: 3, k0: 0, squash: 1, roll: 0, A0: 7e-3, Ares: 35e-4, ext: [t * 1.05, l * 1.05] };
  if (e === "half") return { shape: 4, k0: 0, squash: 1, roll: 0, A0: 7e-3, Ares: 35e-4, ext: [t * 1.05, n.h * 1.02] };
  if (e === "thirds") return { shape: 5, k0: 0, squash: 1, roll: 0, A0: 7e-3, Ares: 35e-4, ext: [n.w * 1.02, n.h / 3 * 1.05] };
  if (e === "envelope") return { shape: 6, k0: 0, squash: 1, roll: 0, A0: 5e-3, Ares: 3e-3, ext: [n.w * 1.02, n.body * 1.04] };
  if (e === "accordion") return { shape: 7, k0: 0, squash: 1, roll: 0, A0: 8e-3, Ares: 35e-4, ext: [n.w / 4 * 1.08, n.h * 1.02] };
  if (e === "triangle") return { shape: 8, k0: 0, squash: 1, roll: 0, A0: 8e-3, Ares: 35e-4, ext: [t * 1.08, l * 1.08] };
  let r = 0.95 * Math.PI / o, a = 1 / r;
  return { shape: 0, k0: r, squash: 1, roll: 0, A0: n.card ? 0.07 : 0.12, Ares: 45e-4, ext: [2 * (a + 0.06), 2 * (a + 0.06)] };
}
var fo = (e) => e.states.includes("burnt") || e.burnAfterReading ? "burn" : e.states.includes("singed") ? "singed" : null, pn = { corner: [0.3, 0.06], edge: [0.035, 0.01], center: [0.09, 0.03], spots: [0.035, 0.01] };
function je(e, n = {}) {
  let t = e.getContext("webgl2", { alpha: !0, premultipliedAlpha: !0, antialias: !0 });
  if (!t) return null;
  let l, o, r, a, s, u, f, d = !1, p = !1, m = (P, T) => {
    let F = (V, $) => {
      let j = t.createShader(V);
      if (t.shaderSource(j, $), t.compileShader(j), !t.getShaderParameter(j, t.COMPILE_STATUS)) throw new Error(t.getShaderInfoLog(j));
      return j;
    }, q = t.createProgram();
    if (t.attachShader(q, F(t.VERTEX_SHADER, P)), t.attachShader(q, F(t.FRAGMENT_SHADER, T)), t.linkProgram(q), !t.getProgramParameter(q, t.LINK_STATUS)) throw new Error(t.getProgramInfoLog(q));
    let L = {}, O = t.getProgramParameter(q, t.ACTIVE_UNIFORMS);
    for (let V = 0; V < O; V++) {
      let $ = t.getActiveUniform(q, V);
      L[$.name] = t.getUniformLocation(q, $.name);
    }
    return { p: q, u: L };
  };
  function h() {
    l = m(nn, on), o = m(rn, an), r = m(ln, sn), a = t.createVertexArray(), t.bindVertexArray(a), s = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, s), t.bufferData(t.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), t.STATIC_DRAW);
    let P = t.getAttribLocation(o.p, "aQ");
    t.enableVertexAttribArray(P), t.vertexAttribPointer(P, 2, t.FLOAT, !1, 0, 0), t.bindVertexArray(null), u = t.createVertexArray(), f = t.createBuffer(), t.bindVertexArray(u), t.bindBuffer(t.ARRAY_BUFFER, f), t.bufferData(t.ARRAY_BUFFER, 420 * 32, t.DYNAMIC_DRAW), [["aP", 3, 0], ["aC", 4, 12], ["aS", 1, 28]].forEach(([T, F, q]) => {
      let L = t.getAttribLocation(r.p, T);
      t.enableVertexAttribArray(L), t.vertexAttribPointer(L, F, t.FLOAT, !1, 32, q);
    }), t.bindVertexArray(null);
  }
  h();
  let S = (P) => {
    P.preventDefault(), d = !0;
  }, b = () => {
    d = !1, h(), v = null, i = null, I = null, J = null, H = null, n.onRestore && n.onRestore();
  };
  e.addEventListener("webglcontextlost", S), e.addEventListener("webglcontextrestored", b);
  function E(P, T, F, q, L, O, V) {
    let $ = [];
    for (let Y = 0; Y <= q; Y++) $.push(P + (T - P) * Y / q);
    O.forEach((Y) => {
      Y > P + 1e-6 && Y < T - 1e-6 && $.push(Y);
    }), $.sort((Y, ae) => Y - ae);
    let j = [];
    for (let Y = 0; Y <= L; Y++) j.push(-F + 2 * F * Y / L);
    V.forEach((Y) => {
      Y > -F + 1e-6 && Y < F - 1e-6 && !j.some((ae) => Math.abs(ae - Y) < 1e-6) && j.push(Y);
    }), j.sort((Y, ae) => Y - ae);
    let x = $.length, z = j.length, Q = new Float32Array(x * z * 2), X = 0;
    for (let Y = 0; Y < z; Y++) for (let ae = 0; ae < x; ae++)
      Q[X++] = $[ae], Q[X++] = j[Y];
    let te = new Uint16Array((x - 1) * (z - 1) * 6);
    X = 0;
    for (let Y = 0; Y < z - 1; Y++) for (let ae = 0; ae < x - 1; ae++) {
      let Se = Y * x + ae, Ke = Se + 1, Oe = Se + x, c = Oe + 1;
      te[X++] = Se, te[X++] = Ke, te[X++] = c, te[X++] = Se, te[X++] = c, te[X++] = Oe;
    }
    let pe = t.createVertexArray();
    t.bindVertexArray(pe);
    let W = t.createBuffer();
    t.bindBuffer(t.ARRAY_BUFFER, W), t.bufferData(t.ARRAY_BUFFER, Q, t.STATIC_DRAW);
    let Ee = t.getAttribLocation(l.p, "aXY");
    t.enableVertexAttribArray(Ee), t.vertexAttribPointer(Ee, 2, t.FLOAT, !1, 0, 0);
    let de = t.createBuffer();
    return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, de), t.bufferData(t.ELEMENT_ARRAY_BUFFER, te, t.STATIC_DRAW), t.bindVertexArray(null), { vao: pe, count: te.length, bufs: [W, de] };
  }
  function g(P, T) {
    let F = t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, F), T.float ? (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1), t.texImage2D(t.TEXTURE_2D, 0, t.RG16F, T.w, T.h, 0, t.RG, t.FLOAT, P)) : (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, P), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1)), T.mip ? (t.generateMipmap(t.TEXTURE_2D), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR)) : t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), F;
  }
  let v = null, i = null, w = (P) => {
    let T = t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, T), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(P)), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), T;
  }, M = () => v || (v = w([0, 0, 0, 0])), C = () => i || (i = w([255, 0, 0, 255])), k = (P) => {
    P && P !== v && P !== i && t.deleteTexture(P);
  }, I = null, J = null;
  function ee() {
    return I || (I = w([240, 240, 240, 255]), J = Ge("grain").then((P) => {
      !P || p || (t.bindTexture(t.TEXTURE_2D, I), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, P), t.generateMipmap(t.TEXTURE_2D), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.REPEAT), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.REPEAT));
    }), I);
  }
  async function _(P) {
    let T = Ye(P), F = Re[T.type];
    ee();
    let q = T.type === "envelope" ? _({ id: T.id + "-letter", type: T.letter, shape: "thirds", text: T.text, back: T.back, states: T.states.filter((B) => B !== "torn"), seed: T.seed + 1, hiddenInk: T.hiddenInk, burn: T.burn, burnAfterReading: T.burnAfterReading, stamp: T.stamp }) : null;
    await xt([F.font, "Caveat", "Courier Prime", "Special Elite"]);
    let L = F.w / 2, O = F.h / 2, V = so(T.shape, F), $ = Math.round(512 * F.w / 0.84), j = Math.round($ * F.h / F.w), x = he.get("opens." + T.id, 0), z = ne(T.seed * 7 + 1), Q = F.stub ? L - F.w * F.stub : null, X = F.body ? -O + F.body : 0, te = Math.max(16, Math.round(Math.sqrt(15e3 * F.w / F.h))), pe = Math.max(16, Math.round(te * F.h / F.w)), W = [0], Ee = [0, -F.h / 6 * 1.08, F.h / 6, X];
    T.shape === "accordion" && W.push(-F.w / 6, F.w / 6);
    let de = [];
    if (Q !== null) {
      let B = Math.round(te * (Q + L) / F.w);
      de.push(E(-L, Q, O, B, pe, W, Ee)), de.push(E(Q, L, O, te - B, pe, W, Ee));
    } else de.push(E(-L, L, O, te, pe, W, Ee));
    let Y = !(T.back || T.type === "notebook" || T.type === "form" || T.type === "envelope" || T.type === "newspaper" || T.type === "postcard" || T.type === "blueprint" || ["coffee", "water", "prints", "aged", "wine", "ink", "foxing", "faded", "staple", "grease", "dogear", "damp"].some((B) => T.states.includes(B))), ae = fo(T), Se = !(T.type === "notebook" || T.type === "form" || T.type === "envelope" || T.type === "punchcard" || T.type === "parchment" || T.states.includes("torn") || ae), [Ke, Oe, c, y] = await Promise.all([
      bt.run("creases", [{ seed: T.seed, shape: T.shape, w: F.w, h: F.h, card: !!F.card, foldY: X, states: T.states }, $, j]),
      et(T, F, "front", x),
      Y ? null : et(T, F, "back", x),
      Se ? null : qt(T, F, ae)
    ]), R = tn(T, $, j), A = new Float32Array($ * j * 2);
    for (let B = 0; B < $ * j; B++)
      A[B * 2] = Ke[B], A[B * 2 + 1] = R ? R[B] : 0;
    let N = V.shape === 1 || V.shape === 2, D = {
      cfg: T,
      T: F,
      w: F.w,
      h: F.h,
      half: [L, O],
      F: V,
      stubX: Q,
      foldY: X,
      meshes: de,
      openings: x,
      tH: g(A, { float: !0, w: $, h: j }),
      tPF: g(Oe, { mip: !0 }),
      tPB: Y ? M() : g(c, { mip: !0 }),
      tFx: Se ? C() : g(y.canvas, {}),
      burnPts: Se ? null : y.burnPts,
      // which burn field the effects hold: 'burn' (sparks, can burn away), 'singed' (rim only) or 'none' (ensureBurn adds one)
      fxBurn: ae || "none",
      backEmpty: Y,
      // estimated texture memory (front and back with mipmaps, effects, creases in RG16F)
      bytes: Math.round(Oe.width * Oe.height * 4 * 1.33 * (Y ? 1 : 2) + (Se ? 0 : y.canvas.width * y.canvas.height * 4) + $ * j * 4),
      // folded and elongated papers stay almost facing the camera; crumpled ones may spin freely
      pose: V.shape >= 3 ? [-0.22 + z() * 0.18, -0.2 + z() * 0.4, -0.45 + z() * 0.9] : N ? [-0.15 + z() * 0.15, -0.15 + z() * 0.3, -0.6 + z() * 1.2] : [-0.3 + z() * 0.25, -0.35 + z() * 0.7, z() * 6.28],
      seedA: z() * 6.28,
      // a singed rim holds its front just under the lowest value of its field: only the scorch band shows
      front0: T.states.includes("burnt") ? pn[T.burn][0] + pn[T.burn][1] * z() : ae === "singed" ? y.lo - 0.012 : -1,
      burned: he.get("burned." + T.id, 0),
      age: T.states.includes("aged") ? 1 : 0,
      torn: !1
    };
    return D.extent = Math.max(V.ext[0], V.ext[1]), D.hasRedaction = /\[\[/.test(T.text + T.back), q && (D.letter = await q), await J, D;
  }
  async function U(P) {
    P.openings = he.get("opens." + P.cfg.id, 0);
    let [T, F] = await Promise.all([et(P.cfg, P.T, "front", P.openings), P.backEmpty ? null : et(P.cfg, P.T, "back", P.openings)]);
    k(P.tPF), k(P.tPB), P.tPF = g(T, { mip: !0 }), P.tPB = F ? g(F, { mip: !0 }) : M();
  }
  function G(P) {
    return P.fxBurn === "burn" ? Promise.resolve() : (P.burnJob || (P.burnJob = qt(P.cfg, P.T, "burn").then((T) => {
      if (P.released) return;
      let F = P.tFx;
      F === i && (P.bytes += T.canvas.width * T.canvas.height * 4), P.tFx = g(T.canvas, {}), k(F), P.burnPts = T.burnPts, P.fxBurn = "burn";
    })), P.burnJob);
  }
  async function Z(P) {
    await Promise.all([G(P), P.letter && G(P.letter)]);
  }
  function re(P) {
    P.released = !0, [P.tH, P.tPF, P.tPB, P.tFx].forEach(k), P.meshes.forEach((T) => {
      t.deleteVertexArray(T.vao), T.bufs.forEach((F) => t.deleteBuffer(F));
    }), P.letter && re(P.letter);
  }
  function me(P, T, F) {
    let q = T.f || 0, L = ve.mul(ve.T(T.cx, T.cy, (T.zoff || 0) * T.sc + 0.12 * T.sc * Math.sin(Math.PI * q)), ve.S(T.sc));
    L = ve.mul(L, ve.RZ(T.rot[2])), L = ve.mul(L, ve.RX(T.rot[0])), L = ve.mul(L, ve.RY(T.rot[1] + Math.PI * De(K(q)))), T.local && (L = ve.mul(L, ve.T(T.local[0], T.local[1], T.local[2])));
    let O = l.u;
    t.useProgram(l.p), [[P.tH, "uH"], [P.tPF, "uPrintF"], [P.tPB, "uPrintB"], [P.tFx, "uFx"]].forEach(([x, z], Q) => {
      t.activeTexture(t.TEXTURE0 + Q), t.bindTexture(t.TEXTURE_2D, x), t.uniform1i(O[z], Q);
    }), t.activeTexture(t.TEXTURE4), t.bindTexture(t.TEXTURE_2D, ee()), t.uniform1i(O.uGrain, 4), t.uniform2f(O.uGrainK, P.w * 5, P.h * 5);
    let V = T.L || $e;
    t.uniform1i(O.uShape, P.F.shape), t.uniform1f(O.uP, K(T.p)), t.uniform1f(O.uK0, P.F.k0), t.uniform1f(O.uKres, 0.06), t.uniform1f(O.uA0, P.F.A0), t.uniform1f(O.uAres, P.F.Ares), t.uniform1f(O.uSeedA, P.seedA), t.uniform1f(O.uSquash, P.F.squash), t.uniform1f(O.uRoll, P.F.roll || 0.03), t.uniform1f(O.uCurl, 0.9 * Math.sin(Math.PI * K(q))), t.uniform1f(O.uStubX, P.stubX ?? 0), t.uniform1f(O.uFoldSide, P.T.stub ? -1 : 1), t.uniform1f(O.uFoldBw, P.T.card ? 0.03 : 0.016), t.uniform1f(O.uFoldY, P.foldY || 0), t.uniform1f(O.uThick, q > 0.5 ? -6e-3 : 6e-3), t.uniform1f(O.uScale, T.sc), t.uniform1f(O.uBump, 1), t.uniform2f(O.uHalf, P.half[0], P.half[1]), t.uniform3f(O.uCam, 0, 0, Ie), t.uniform3f(O.uColor, P.T.color[0], P.T.color[1], P.T.color[2]), t.uniform3f(O.uL, V[0], V[1], V[2]), t.uniform1f(O.uAge, P.age), t.uniform1f(O.uThru, P.T.card ? 0 : 0.035), t.uniform1f(O.uTime, T.time || 0), t.uniform1f(O.uFront, T.front ?? -1), t.uniform1f(O.uDestroy, T.destroy ? 1 : 0), t.uniform1f(O.uInkMax, 24e-4 * T.sc);
    let $ = T.lampPos || [0, 0, 10];
    t.uniform3f(O.uLampPos, $[0], $[1], $[2]), t.uniform1f(O.uLamp, T.lamp || 0), t.uniform1f(O.uLampR, T.lampR || 1), t.uniformMatrix4fv(O.uModel, !1, L), t.uniformMatrix4fv(O.uProj, !1, F), (P.T.card ? [1, 0] : [0]).forEach((x) => {
      t.uniform1f(O.uEdge, x), P.meshes.forEach((z, Q) => {
        let X = Q === 1;
        X && (P.torn || (T.tear || 0) >= 1) || (t.uniform1f(O.uIsStub, X ? 1 : 0), t.uniform1f(O.uTear, X && T.tear || 0), t.bindVertexArray(z.vao), t.drawElements(t.TRIANGLES, z.count, t.UNSIGNED_SHORT, 0));
      });
    });
  }
  function Ae(P, T, F) {
    t.useProgram(o.p), t.disable(t.DEPTH_TEST), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA);
    let q = ue(K(T.p)), L = [P.F.ext[0] / 2 * T.sc, P.F.ext[1] / 2 * T.sc], O = [L[0] + (P.half[0] * T.sc - L[0]) * q, L[1] + (P.half[1] * T.sc - L[1]) * q], V = Math.min(Math.min(L[0], L[1]) * (1 - q) + 0.012 * T.sc * q, O[0], O[1]), $ = (0.04 + 0.08 * T.lift + 0.04 * (1 - q)) * T.sc, j = T.L || $e, x = Math.hypot(j[0], j[1]) || 1, z = (0.05 + 0.1 * T.lift) * T.sc * Math.min(1.6, x / Math.max(0.25, j[2]));
    t.uniform3f(o.u.uC, T.cx - j[0] / x * z, T.cy - j[1] / x * z, -0.25 * T.sc), t.uniform2f(o.u.uHS, O[0], O[1]), t.uniform1f(o.u.uR, V), t.uniform1f(o.u.uSoft, $), t.uniform1f(o.u.uA, (0.62 - 0.2 * T.lift) * (T.alpha ?? 1)), t.uniformMatrix4fv(o.u.uProj, !1, F), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, P.tFx), t.uniform1i(o.u.uFx, 0), t.uniform1f(o.u.uOpen, K((T.p - 0.85) / 0.15)), t.uniform1f(o.u.uFront, T.front ?? -1), t.uniform1f(o.u.uFlip, (T.f || 0) > 0.5 ? 1 : 0), t.bindVertexArray(a), t.drawArrays(t.TRIANGLE_STRIP, 0, 4);
  }
  function ge(P, T, F, q = e.width, L = e.height) {
    if (p || d) return;
    t.viewport(0, 0, q, L), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT);
    let O = ve.mul(ve.persp(Ce, q / L, 0.1, 100), ve.T(0, 0, -Ie));
    if (T && (T.st.alpha ?? 1) > 0.01 && Ae(T.P, T.st, O), t.disable(t.BLEND), t.enable(t.DEPTH_TEST), P.forEach((V) => me(V.P, V.st, O)), F && F.n) {
      let V = F.buffer();
      t.useProgram(r.p), t.disable(t.DEPTH_TEST), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA), t.uniformMatrix4fv(r.u.uProj, !1, O), t.uniform1f(r.u.uPx, L / (2 * Math.tan(Ce / 2))), t.bindVertexArray(u), t.bindBuffer(t.ARRAY_BUFFER, f), t.bufferSubData(t.ARRAY_BUFFER, 0, V), t.drawArrays(t.POINTS, 0, V.length / 8);
    }
  }
  let H = null;
  function Me() {
    t.deleteFramebuffer(H.fb), t.deleteRenderbuffer(H.rb), t.deleteTexture(H.t), H = null;
  }
  function Fe(P, T = !1, F = "image/png", q = 256) {
    if (p || d) return "";
    let L = q;
    if (!H || H.S !== L) {
      H && Me();
      let X = t.createTexture();
      t.bindTexture(t.TEXTURE_2D, X), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA8, L, L, 0, t.RGBA, t.UNSIGNED_BYTE, null), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR);
      let te = t.createRenderbuffer();
      t.bindRenderbuffer(t.RENDERBUFFER, te), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, L, L);
      let pe = t.createFramebuffer();
      t.bindFramebuffer(t.FRAMEBUFFER, pe), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, X, 0), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, te), H = { fb: pe, t: X, rb: te, S: L, c: ye(L, L) };
    }
    t.bindFramebuffer(t.FRAMEBUFFER, H.fb);
    let O = L / (2 * Ie * Math.tan(Ce / 2)), V = T ? tt(P) : 0, $ = 0.9 * L / (nt(P, V) * O), { items: j } = He(P, { p: V, f: 0, tear: 0, burnOpen: 0 }, { cx: 0, cy: 0, sc: $, scLetter: $, rot: un(P, V), lift: 0, vhU: 1 });
    ge(j, null, null, L, L);
    let x = new Uint8Array(L * L * 4);
    t.readPixels(0, 0, L, L, t.RGBA, t.UNSIGNED_BYTE, x), t.bindFramebuffer(t.FRAMEBUFFER, null);
    let z = H.c.getContext("2d"), Q = z.createImageData(L, L);
    for (let X = 0; X < L; X++) {
      let te = (L - 1 - X) * L * 4, pe = X * L * 4;
      for (let W = 0; W < L * 4; W += 4) {
        let Ee = x[te + W + 3], de = Ee ? 255 / Ee : 0;
        Q.data[pe + W] = Math.min(255, x[te + W] * de), Q.data[pe + W + 1] = Math.min(255, x[te + W + 1] * de), Q.data[pe + W + 2] = Math.min(255, x[te + W + 2] * de), Q.data[pe + W + 3] = Ee;
      }
    }
    return z.putImageData(Q, 0, 0), H.c.toDataURL(F, 0.9);
  }
  function lt() {
    if (p) return;
    p = !0, e.removeEventListener("webglcontextlost", S), e.removeEventListener("webglcontextrestored", b), [l, o, r].forEach((T) => t.deleteProgram(T.p)), t.deleteVertexArray(a), t.deleteBuffer(s), t.deleteVertexArray(u), t.deleteBuffer(f), [v, i, I].forEach((T) => {
      T && t.deleteTexture(T);
    }), H && Me();
    let P = t.getExtension("WEBGL_lose_context");
    P && P.loseContext();
  }
  return { gl: t, build: _, refreshPrint: U, release: re, draw: ge, snapshot: Fe, ensureBurn: Z, isLost: () => d, destroy: lt };
}

// .build/particles.js
function Pt(e = 420) {
  let n = [], t = new Float32Array(e * 8);
  return {
    emit(l) {
      n.length < e && n.push(l);
    },
    step(l) {
      for (let o = n.length - 1; o >= 0; o--) {
        let r = n[o];
        if (r.t += l, r.t >= r.life) {
          n.splice(o, 1);
          continue;
        }
        r.vx += (r.ax || 0) * l, r.vy += (r.ay || 0) * l, r.x += r.vx * l, r.y += r.vy * l;
      }
    },
    get n() {
      return n.length;
    },
    // a single reused Float32Array: nothing is allocated per frame
    buffer() {
      for (let l = 0; l < n.length; l++) {
        let o = n[l], r = o.t / o.life, a = l * 8, s = o.a * Math.pow(Math.sin(Math.PI * Math.min(1, r)), 0.6);
        o.flicker && (s *= 0.55 + 0.45 * Math.sin(o.t * 28 + l)), t[a] = o.x, t[a + 1] = o.y, t[a + 2] = o.z, t[a + 3] = o.r, t[a + 4] = o.g, t[a + 5] = o.b, t[a + 6] = s, t[a + 7] = o.s;
      }
      return t.subarray(0, n.length * 8);
    },
    clear() {
      n.length = 0;
    }
  };
}

// .build/scene.js
var dn = {
  flip: "[ flip ]",
  tear: "[ tear stub ]",
  close: "[ close ]",
  hint: "drag to unfold",
  open: "Crumpled paper: open",
  back: "Back:"
}, at = /* @__PURE__ */ (() => {
  let e = { labels: dn, remember: !1, motion: "auto", flashlight: !0, maxBuilt: 3 }, n = !1, t, l = !1, o, r, a, s, u, f, d, p, m, h = null, S = null, b = [], E = /* @__PURE__ */ new WeakMap(), g = [], v = Pt(), i = null, w = 0, M = (c) => c.replace(/\[\[[^\]\n]+\]\]/g, "redacted").replace(/~~[^~\n]+~~\{([^}\n]+)\}/g, "$1").replace(/~~([^~\n]+)~~/g, "$1").replace(/^# /gm, ""), C = 0.16, k = 0.9, I = 0.42, J = 1.5, ee = 1;
  function _() {
    if (o) return;
    n = Be(e.motion);
    let c = document.createElement("style");
    c.textContent = ":root{--crumple-backdrop:rgba(6,5,4,.8);--crumple-ui-bg:rgba(14,13,12,.7);--crumple-ui-fg:#ebe5d6;--crumple-ui-border:rgba(235,229,214,.4);--crumple-ui-font:12px/1 'Courier Prime',ui-monospace,monospace;--crumple-accent:#f5c266}.crumple-scene{position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483640;pointer-events:none;display:none;transition:opacity .3s ease;touch-action:none}.crumple-backdrop{position:fixed;inset:0;z-index:2147483630;background:transparent;pointer-events:none;transition:background .7s ease}.crumple-backdrop.on{background:var(--crumple-backdrop)}.crumple-bar{position:fixed;z-index:2147483645;right:18px;top:16px;display:none;gap:8px}.crumple-bar.on{display:flex}.crumple-bar button,.crumple-fallback button{background:var(--crumple-ui-bg);border:1px solid var(--crumple-ui-border);color:var(--crumple-ui-fg);font:var(--crumple-ui-font);letter-spacing:.18em;padding:9px 12px;cursor:pointer}.crumple-bar button[hidden]{display:none}.crumple-hint{position:fixed;z-index:2147483645;left:50%;bottom:8vh;transform:translateX(-50%);font:var(--crumple-ui-font);font-size:13px;letter-spacing:.2em;color:var(--crumple-ui-fg);background:var(--crumple-ui-bg);padding:8px 14px;opacity:0;transition:opacity .5s;pointer-events:none}.crumple-hint.on{opacity:1}.crumple-trigger{display:inline-block;width:96px;height:96px;padding:0;border:0;background:none;cursor:pointer;-webkit-tap-highlight-color:transparent}.crumple-trigger img{width:100%;height:100%;display:block;filter:drop-shadow(2px 7px 6px rgba(0,0,0,.6))}.crumple-trigger:hover img,.crumple-trigger:focus-visible img{animation:crumple-wiggle .75s ease}.crumple-trigger:focus-visible{outline:2px solid var(--crumple-accent);outline-offset:4px;border-radius:50%}.crumple-trigger.active{visibility:hidden}.crumple-trigger.recrumple img{animation:crumple-squeeze .9s ease}@keyframes crumple-wiggle{0%{transform:none}22%{transform:rotate(-8deg) translateY(-4px)}50%{transform:rotate(6deg) translateY(-1px)}78%{transform:rotate(-2deg)}100%{transform:none}}@keyframes crumple-squeeze{0%{transform:scale(1.15)}30%{transform:scale(.7) rotate(-20deg)}60%{transform:scale(1.05) rotate(10deg)}100%{transform:none}}.crumple-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.crumple-fallback{position:fixed;inset:0;z-index:2147483646;display:none;align-items:center;justify-content:center;background:var(--crumple-backdrop);padding:24px}.crumple-fallback.on{display:flex}.crumple-fallback .sheet{max-width:min(520px,90vw);max-height:86vh;overflow:auto;padding:36px 34px;box-shadow:0 18px 40px rgba(0,0,0,.6);white-space:pre-line;font-size:19px;line-height:1.6;color:#2a2219}.crumple-fallback .sheet img{display:block;max-width:100%;margin:0 auto 16px}.crumple-fallback button{position:fixed;right:18px;top:16px}.crumple-fallback del{color:#5b4d3e;text-decoration:line-through;text-decoration-thickness:2px}.crumple-fallback ins{text-decoration:none;color:#1d3a8c;font-family:Caveat,'Comic Sans MS',cursive;font-size:1.12em;padding:0 .12em}.crumple-fallback .crumple-h{display:block;font-weight:700;font-size:1.15em;margin:.2em 0}.crumple-fallback .crumple-redact{display:inline-block;height:.85em;vertical-align:-.08em;background:#1b1713;border-radius:2px;margin:0 .1em}body.crumple-open{overflow:hidden;touch-action:none}@media (prefers-reduced-motion:reduce){.crumple-trigger.recrumple img,.crumple-trigger:hover img{animation:none}}@media print{canvas.crumple-scene,.crumple-backdrop,.crumple-bar,.crumple-hint,.crumple-fallback{display:none !important}.crumple-sr{position:static !important;width:auto !important;height:auto !important;overflow:visible !important;clip:auto !important;white-space:pre-wrap !important;color:#000;font-family:monospace}}", document.head.appendChild(c), h = c;
    let y = e.labels;
    r = document.createElement("div"), r.className = "crumple-backdrop", o = document.createElement("canvas"), o.className = "crumple-scene", o.setAttribute("aria-hidden", "true"), p = document.createElement("div"), p.className = "crumple-sr", p.id = "crumple-content", p.setAttribute("aria-live", "polite"), a = document.createElement("div"), a.className = "crumple-bar", a.setAttribute("role", "dialog"), a.setAttribute("aria-modal", "true"), a.setAttribute("aria-describedby", "crumple-content"), a.tabIndex = -1, s = document.createElement("button"), s.type = "button", s.textContent = y.flip, u = document.createElement("button"), u.type = "button", u.textContent = y.tear, u.hidden = !0, f = document.createElement("button"), f.type = "button", f.textContent = y.close, a.append(p, u, s, f), d = document.createElement("div"), d.className = "crumple-hint", d.textContent = y.hint, m = document.createElement("div"), m.className = "crumple-fallback", m.setAttribute("role", "dialog"), m.setAttribute("aria-modal", "true"), document.body.append(r, o, a, d, m), oe(g, f, "click", () => P()), oe(g, s, "click", () => q()), oe(g, u, "click", () => L()), oe(g, window, "keydown", (R) => {
      if (!(R.ctrlKey || R.metaKey || R.altKey || Ke(R.target))) {
        if (m.classList.contains("on")) {
          R.key === "Escape" ? ae() : R.key === "Tab" && Se(R, m);
          return;
        }
        i && (R.key === "Tab" ? Se(R, a) : R.key === "Escape" ? P() : (R.key === "f" || R.key === "F") && q());
      }
    }), oe(g, window, "resize", () => {
      i && (G(), H());
    }), oe(g, window, "pointermove", (R) => {
      if (!e.flashlight || !i || i.phase !== "open" || i.dragging || R.pointerType === "touch") return;
      let A = i.boxCache || me(), N = !!A && R.clientX > A.x0 - 30 && R.clientX < A.x1 + 30 && R.clientY > A.y0 - 30 && R.clientY < A.y1 + 30;
      rt(i, R.clientX, R.clientY, o.clientWidth, o.clientHeight, o.clientHeight / (2 * Ie * Math.tan(Ce / 2)), N), H();
    }), oe(g, document, "mouseout", (R) => {
      i && !R.relatedTarget && (i.lampOn = 0, H());
    }), oe(g, document, "visibilitychange", () => {
      document.hidden || H();
    }), oe(g, o, "dblclick", () => q()), S = Qe(), S && oe(g, S, "change", () => {
      n = Be(e.motion);
    }), g.push(St(o, {
      active: () => i && i.phase === "open" ? i : null,
      box: me,
      flip: () => q(),
      outside: () => P(),
      tap: (R) => {
        let A = Ae();
        return A && R.clientX > A.x0 && R.clientX < A.x1 && R.clientY > A.y0 && R.clientY < A.y1 ? (L(), !0) : !1;
      },
      redraw: () => H()
    }));
  }
  function U() {
    if (l) return t;
    l = !0, _();
    try {
      t = je(o, { onRestore: pe });
    } catch {
      t = null;
    }
    return t;
  }
  function G() {
    let c = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(24e5 / Math.max(1, innerWidth * innerHeight))), y = Math.round(innerWidth * c), R = Math.round(innerHeight * c);
    (o.width !== y || o.height !== R) && (o.width = y, o.height = R);
  }
  function Z(c) {
    let y = i.P, R = o.clientWidth, A = o.clientHeight, N = A / (2 * Ie * Math.tan(Ce / 2)), D = i.from, B = D.left + D.width / 2, se = D.top + D.height / 2, ce = (B - R / 2) / N, we = -(se - A / 2) / N, Te = 0.9 * D.width / ((i.ext0 || y.extent) * N), ke = y.cfg.type === "envelope", xe = ke ? Math.min(0.5 * A / (y.T.body * N), 0.7 * R / (y.w * N)) : Math.min(0.86 * A / (y.h * N), 0.9 * R / (y.w * N)), Rt = y.letter, mn = Rt ? Math.min(0.86 * A / (Rt.h * N), 0.9 * R / (Rt.w * N)) : xe, Ne = n ? 1 : i.tf, zt = ue(K(ke ? i.p * 2 : i.p)), gn = Math.hypot(ce, we), Gt = (1 - Ne) * (1 - Ne), Xt = 2 * (1 - Ne) * Ne, bn = i.arc || 0.24, yn = Gt * ce + Xt * ce * 0.5, Mt = Gt * we + Xt * (we * 0.5 + bn * gn), st = y.F, vn = st.shape === 0 && st.squash > 0.5 ? 1 : st.shape === 1 || st.shape === 2 ? 0.8 : 0.45, Tn = n ? 0 : ue(Ne) * vn, En = [0.55, 1.15, 0.35], Sn = [0, 0, -0.02], kt = y.pose.map((Pe, $t) => (Pe + En[$t] * Tn) * (1 - zt) + Sn[$t] * zt), At = Te + (xe - Te) * Math.pow(Ne, 1.25), Yt = 0.9 * D.width / N, Vt = i.pre ?? 1, Je = i.bounce ?? 1, ft = i.settle ?? 1;
    if (Vt < 1) {
      let Pe = Math.sin(Math.PI * Vt);
      At *= 1 + 0.12 * Pe, Mt += Pe * 0.16 * Yt;
    }
    if (Je < 1) {
      let Pe = (1 - Je) * (1 - Je);
      Mt += Math.abs(Math.sin(2 * Math.PI * Je)) * Pe * 0.4 * Yt, kt[2] += 0.18 * Math.sin(2 * Math.PI * Je) * Pe;
    }
    let _t = ft < 1 ? Math.sin(Math.PI * 2.5 * ft) * (1 - ft) * (1 - ft) : 0, Ht = [0.05 * _t, 0.022 * _t, 0];
    for (let Pe = 0; Pe < 3; Pe++) kt[Pe] += Ht[Pe];
    return At *= 1 + 0.01 * _t, { cx: yn, cy: Mt, sc: At, scLetter: mn, rot: kt, adjust: Ht, lift: Math.sin(Math.PI * Ne), time: c / 1e3, ppu: N, vw: R, vh: A, vhU: A / N, L: $e, lampPos: i.lampPos, lamp: i.lamp || 0, lampR: 0.3 * A / N };
  }
  function re(c = performance.now()) {
    let y = Z(c);
    return { b: y, scene: He(i.P, i, y) };
  }
  function me() {
    if (!i) return null;
    let { b: c, scene: y } = re();
    return ot(y.active.P, y.active.st, c.ppu, c.vw, c.vh);
  }
  function Ae() {
    if (!i || i.P.stubX === null || i.P.torn || i.p < 0.95 || i.f > 0.01) return null;
    let { b: c, scene: y } = re(), R = y.active.st, A = i.P, N = c.vw / 2 + R.cx * c.ppu, D = c.vh / 2 - R.cy * c.ppu;
    return { x0: N + A.stubX * R.sc * c.ppu, x1: N + A.half[0] * R.sc * c.ppu, y0: D - A.half[1] * R.sc * c.ppu, y1: D + A.half[1] * R.sc * c.ppu };
  }
  function ge(c) {
    if (w = 0, !i || document.hidden || t.isLost() || i.rebuilding) return;
    if (!i.tw.length && !i.dragging && !i.lampMoving && !i.resume && i.tPrev && c - i.tPrev < 32) {
      w = requestAnimationFrame(ge);
      return;
    }
    let y = i.resume ? 1 / 60 : Math.min(0.1, Math.max(0, (c - (i.tPrev || c)) / 1e3));
    i.resume = !1, i.tPrev = c;
    let R = Tt(i, c);
    if (!i) return;
    let A = wt(i, y);
    i.lampMoving = A, i.P.burnPts && i.P.front0 > -0.5 && i.phase === "open" && i.destroy === void 0 && (i.burnOpen = Math.min(0.08, (i.burnOpen || 0) + y * 4e-3));
    let { b: N, scene: D } = re(c);
    i.boxCache = ot(D.active.P, D.active.st, N.ppu, N.vw, N.vh), Et(v, i, D, y), v.step(y), t.draw(D.items, D.shadow, v), i.pPrev = i.p;
    let B = D.active.st.front > -0.5 && !!D.active.P.burnPts;
    if (i.ashes && (v.n === 0 || c > i.ashesEnd)) {
      F();
      return;
    }
    (R || i.dragging || A || v.n > 0 || B || i.ashes) && (w = requestAnimationFrame(ge));
  }
  function H() {
    !w && i && (i.resume = !0, w = requestAnimationFrame(ge));
  }
  let Me = (c) => e.remember && !!he.get("opened." + c, !1);
  function Fe(c) {
    if (i || !c.P) return;
    let y = c.P;
    G();
    let R = he.get("opens." + y.cfg.id, 0) + 1;
    he.set("opens." + y.cfg.id, R), y.hasRedaction && requestAnimationFrame(() => t.refreshPrint(y).then(H));
    let A = c.opened ? tt(y) : 0;
    i = { P: y, ent: c, from: c.btn.getBoundingClientRect(), tf: 0, p: A, ext0: nt(y, A), f: 0, tear: 0, tw: [], phase: "opening", dragging: !1, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 }, v.clear(), c.btn.classList.add("active"), document.body.classList.add("crumple-open"), o.style.display = "block", o.style.pointerEvents = "auto", r.classList.add("on"), a.classList.add("on"), a.setAttribute("aria-label", Re[y.cfg.type].name), f.focus({ preventScroll: !0 }), u.hidden = y.stubX === null || y.torn, p.replaceChildren(), de(y.cfg.text, p), y.cfg.back && (p.append(`

\u2014 ` + e.labels.back + ` \u2014
`), de(y.cfg.back, p));
    let N = y.cfg.open === "drag", D = y.cfg.type === "envelope", B = () => {
      i && (i.phase = "open", N && i.p < 0.5 && d.classList.add("on"));
    };
    if (n)
      o.style.opacity = "0", requestAnimationFrame(() => {
        o.style.opacity = "1";
      }), i.tf = 1, i.phase = "open", N ? d.classList.add("on") : (fe(i, "p", 1, ee * (D ? 1.6 : 1), qe), le.play("uncrumple", ee, 0, { type: y.cfg.type, gsm: y.cfg.gsm }));
    else {
      i.pre = 0, i.arc = 0.24;
      let ce = C * 0.55, we = D ? J * 1.85 : J;
      if (fe(i, "pre", 1, C, be), fe(i, "tf", 1, k, jt, ce, B), !N) {
        let Te = () => {
          i && i.phase !== "closing" && (i.settle = 0, fe(i, "settle", 1, 0.9, be), H());
        };
        fe(i, "p", 1, we, D ? ze : ut(y), ce + I, Te), le.play(D ? "seal" : "uncrumple", we, ce + I, { type: y.cfg.type, gsm: y.cfg.gsm });
      }
    }
    y.front0 > -0.5 && le.play("fire", 2.5, 0.6), e.remember && he.set("opened." + y.cfg.id, !0), Ue(c.btn, "open", { id: y.cfg.id, openings: R }), H();
    let { scene: se } = re();
    t.draw(se.items, se.shadow, v);
  }
  function lt() {
    !i || !i.burnOpen || (i.P.burned = Math.min(0.2, i.P.burned + i.burnOpen), he.set("burned." + i.P.cfg.id, i.P.burned), i.burnOpen = 0);
  }
  function P() {
    if (!i || i.phase === "closing") return;
    if (i.P.cfg.burnAfterReading && i.p > 0.9 && i.phase === "open") {
      T();
      return;
    }
    lt(), i.phase = "closing", i.dragging = !1, i.lampOn = 0, i.from = i.ent.btn.getBoundingClientRect(), r.classList.remove("on"), a.classList.remove("on"), d.classList.remove("on"), o.style.pointerEvents = "none", i.tw = i.tw.filter((N) => N.key !== "settle"), i.settle = 1;
    let c = i.P.cfg.type === "envelope", y = Me(i.P.cfg.id) ? tt(i.P) : 0;
    i.tf > 0.999 && (i.ext0 = nt(i.P, y));
    let R = n ? 0.6 : c ? 1.9 : 0.85, A = R * Math.max(0.35, i.p - y);
    if (i.f > 0 && fe(i, "f", 0, 0.45, De), i.p > y + 0.02 && le.play("crumple", A, 0, { type: i.P.cfg.type, gsm: i.P.cfg.gsm }), fe(i, "p", y, A, c ? ze : pt(i.P)), n) fe(i, "tf", 1, R, be, 0, F);
    else {
      i.tf > 0.999 && (i.arc = 0.34);
      let N = () => {
        i && (i.bounce = 0, fe(i, "bounce", 1, 0.36, be, 0, F));
      };
      fe(i, "tf", 0, 0.78, Kt, A * (c ? 0.8 : 0.5), N);
    }
    Ue(i.ent.btn, "close", { id: i.P.cfg.id }), H();
  }
  function T() {
    lt(), i.phase = "closing", i.dragging = !1, a.classList.remove("on"), d.classList.remove("on"), o.style.pointerEvents = "none", i.f > 0 && fe(i, "f", 0, 0.4, De);
    let c = i.P.letter || i.P;
    i.destroy = Math.max(c.front0 > -0.5 ? c.front0 + c.burned : -0.06, -0.06), le.play("fire", 2.8), fe(i, "destroy", 1.6, n ? 1.2 : 2.6, be, 0, () => {
      if (!i) return;
      i.ashes = !0, i.ashesEnd = performance.now() + 3e3, r.classList.remove("on");
      let y = i.ent;
      he.set("destroyed." + y.cfg.id, !0), y.destroyed = !0, Ue(y.btn, "burn", { id: y.cfg.id });
    }), H();
  }
  function F() {
    if (!i) return;
    let c = i.ent, y = !!i.ashes;
    i = null, v.clear(), r.classList.remove("on"), document.body?.classList.remove("crumple-open");
    let R = () => {
      i || (o.style.display = "none", o.style.opacity = ""), y ? (c.btn.hidden = !0, c.btn.classList.remove("active")) : (!i || i.ent !== c) && c.btn.classList.remove("active");
    };
    n ? (o.style.opacity = "0", setTimeout(R, 300)) : R(), p.textContent = "", y || c.btn.focus({ preventScroll: !0 }), W(c);
  }
  function q() {
    !i || i.phase === "closing" || i.destroy !== void 0 || (le.play("flip", 1, 0, { type: i.P.cfg.type, gsm: i.P.cfg.gsm }), Xe(10), fe(i, "f", i.f < 0.5 ? 1 : 0, 0.8, be), Ue(i.ent.btn, "flip", { id: i.P.cfg.id, back: i.f < 0.5 }), H());
  }
  function L() {
    !i || i.P.stubX === null || i.P.torn || i.tear > 0 || i.p < 0.95 || i.f > 0.01 || (le.play("tear"), Xe([15, 20, 15, 20, 30]), Ue(i.ent.btn, "tear", { id: i.P.cfg.id }), u.hidden = !0, fe(i, "tear", 1, n ? 0.3 : 1, be, 0, () => {
      i && (i.P.torn = !0);
    }), H());
  }
  function O(c, y, R = {}) {
    let A = { btn: c, cfg: Ye(y), P: null, building: null, opts: R, opened: !1, off: [], io: null, gone: !1, madeImg: !1, madeLabel: !1 };
    return document.body ? V(A) : document.addEventListener("DOMContentLoaded", () => V(A), { once: !0 }), A;
  }
  function V(c) {
    let { btn: y, cfg: R, opts: A } = c;
    _();
    let N = E.get(y);
    N && $(N);
    let D = b.find((se) => se.cfg.id === R.id);
    D && (console.warn(`crumple: id "${R.id}" is already attached, the previous paper is detached`), $(D)), b.push(c), E.set(y, c), y.classList.add("crumple-trigger"), y.getAttribute("aria-label") || (y.setAttribute("aria-label", e.labels.open), c.madeLabel = !0), he.get("destroyed." + R.id, !1) && (y.hidden = !0, c.destroyed = !0), c.opened = Me(R.id), oe(c.off, y, "click", async () => {
      await X(c) ? Fe(c) : Y(c);
    });
    let B = y.querySelector("img");
    if (A.snapshot) {
      B || (B = document.createElement("img"), B.alt = "", y.appendChild(B), c.madeImg = !0), B.onerror = () => {
        c.opts = {}, B.onerror = null, j(c);
      }, B.src = c.opened && A.snapshotOpened ? A.snapshotOpened : A.snapshot;
      let se = () => {
        x(() => X(c));
      };
      ["pointerenter", "focus", "touchstart"].forEach((ce) => oe(c.off, y, ce, se, { once: !0, passive: !0 })), oe(c.off, y, "pointerdown", () => X(c), { passive: !0 });
    } else j(c);
  }
  function $(c) {
    c.gone = !0, c.off.splice(0).forEach((A) => A()), c.io && c.io.disconnect();
    let y = b.indexOf(c);
    y >= 0 && b.splice(y, 1);
    let R = z.indexOf(c);
    if (R >= 0 && z.splice(R, 1), i && i.ent === c && F(), c.P && (t.release(c.P), c.P = null), E.get(c.btn) === c && E.delete(c.btn), c.btn.classList.remove("crumple-trigger", "active", "recrumple"), c.madeLabel && c.btn.removeAttribute("aria-label"), c.madeImg) {
      let A = c.btn.querySelector("img");
      A && A.remove();
    }
  }
  function j(c) {
    if ("IntersectionObserver" in window) {
      let y = new IntersectionObserver((R) => R.forEach((A) => {
        A.isIntersecting && (y.disconnect(), x(() => X(c).then(() => W(c))));
      }), { rootMargin: "600px 0px" });
      c.io = y, y.observe(c.btn);
    } else x(() => X(c).then(() => W(c)));
  }
  let x = (c) => globalThis.requestIdleCallback ? requestIdleCallback(c, { timeout: 700 }) : setTimeout(c, 60), z = [], Q = 0;
  function X(c) {
    if (c.P) {
      let y = z.indexOf(c);
      return y >= 0 && z.push(z.splice(y, 1)[0]), Promise.resolve(c.P);
    }
    return c.building ? c.building : c.building = te(c);
  }
  async function te(c) {
    let y = Q;
    try {
      if (c.gone || !U() || t.isLost()) return null;
      let R = t, A = await R.build(c.cfg);
      if (y !== Q) return null;
      if (c.gone)
        return R.release(A), null;
      for (c.P = A, z.push(c); z.length > e.maxBuilt; ) {
        let N = z.findIndex((B) => (!i || B !== i.ent) && B !== c);
        if (N < 0) break;
        let D = z.splice(N, 1)[0];
        !D.opts.snapshot && D.P && W(D), D.P && R.release(D.P), D.P = null, D.building = null;
      }
      return c.P;
    } catch (R) {
      return console.warn("crumple: the paper could not be built, the CSS version is shown instead", R), null;
    } finally {
      y === Q && (c.building = null);
    }
  }
  function pe() {
    Q++;
    let c = z.splice(0);
    if (b.forEach((y) => {
      y.P = null, y.building = null;
    }), c.forEach((y) => X(y).then(() => W(y))), i) {
      let y = i.ent;
      i.rebuilding = !0, X(y).then((R) => {
        !i || i.ent !== y || (R ? (i.P = R, i.rebuilding = !1, H()) : (i.ashes = !1, F()));
      });
    }
  }
  function W(c) {
    if (c.destroyed || c.gone) return;
    c.opened = Me(c.cfg.id);
    let y = c.btn.querySelector("img");
    if (y || (y = document.createElement("img"), y.alt = "", c.btn.appendChild(y), c.madeImg = !0), c.opts.snapshot) {
      y.src = c.opened && c.opts.snapshotOpened ? c.opts.snapshotOpened : c.opts.snapshot;
      return;
    }
    c.P && t && (y.src = t.snapshot(c.P, c.opened));
  }
  function Ee() {
    let c = !1;
    b.forEach((y) => {
      he.remove("opened." + y.cfg.id), !(!y.opened || y.destroyed) && (c = !0, W(y), y.btn.classList.remove("recrumple"), y.btn.offsetWidth, y.btn.classList.add("recrumple"));
    }), c && le.play("crumple", 0.9);
  }
  function de(c, y) {
    let R = !1;
    c.split(`
`).forEach((A, N) => {
      let D = A.startsWith("# ");
      N && !D && !R && y.append(`
`), R = D;
      let B = D ? A.slice(2) : A, se = D ? document.createElement("span") : y;
      D && (se.className = "crumple-h");
      let ce = /~~([^~\n]+)~~(?:\{([^}\n]+)\})?|\[\[([^\]\n]+)\]\]/g, we = 0, Te;
      for (; Te = ce.exec(B); ) {
        if (Te.index > we && se.append(B.slice(we, Te.index)), Te[3] !== void 0) {
          let ke = document.createElement("span");
          ke.className = "crumple-redact", ke.setAttribute("role", "img"), ke.setAttribute("aria-label", "redacted"), ke.style.width = Math.max(3, Te[3].length * 0.5) + "em", se.append(ke);
        } else {
          let ke = document.createElement("del");
          if (ke.textContent = Te[1], se.append(ke), Te[2] !== void 0) {
            let xe = document.createElement("ins");
            xe.textContent = Te[2], se.append(xe);
          }
        }
        we = ce.lastIndex;
      }
      we < B.length && se.append(B.slice(we)), D && y.append(se);
    });
  }
  function Y(c) {
    _();
    let y = Re[c.cfg.type], R = (D) => Math.round(y.color[D] * 255), A = document.createElement("div");
    if (A.className = "sheet", A.style.background = `rgb(${R(0)},${R(1)},${R(2)})`, A.style.fontFamily = `"${y.font}", "Courier Prime", monospace`, c.opts.snapshotOpened) {
      let D = document.createElement("img");
      D.src = c.opts.snapshotOpened, D.alt = "", A.appendChild(D);
    }
    de(c.cfg.text, A), c.cfg.back && (A.append(`

\u2014 ` + e.labels.back + ` \u2014
`), de(c.cfg.back, A));
    let N = document.createElement("button");
    N.type = "button", N.textContent = e.labels.close, N.addEventListener("click", ae), m.setAttribute("aria-label", y.name), m.replaceChildren(A, N), m.classList.add("on"), document.body?.classList.add("crumple-open"), N.focus(), m.onclick = (D) => {
      D.target === m && ae();
    }, m._ent = c, Ue(c.btn, "open", { id: c.cfg.id, fallback: !0 });
  }
  function ae() {
    m.classList.remove("on"), document.body?.classList.remove("crumple-open"), m._ent && m._ent.btn.focus({ preventScroll: !0 });
  }
  function Se(c, y) {
    let R = [...y.querySelectorAll("button")].filter((B) => !B.hidden);
    if (!R.length) return;
    c.preventDefault();
    let A = R.indexOf(document.activeElement), N = R.length - 1, D = A < 0 ? 0 : c.shiftKey ? A === 0 ? N : A - 1 : A === N ? 0 : A + 1;
    R[D].focus({ preventScroll: !0 });
  }
  let Ke = (c) => !!c && (c.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(c.tagName));
  function Oe() {
    o && (i = null, cancelAnimationFrame(w), w = 0, b.slice().forEach($), z.length = 0, g.splice(0).forEach((c) => c()), t && t.destroy(), t = null, l = !1, h.remove(), document.body?.classList.remove("crumple-open"), [r, o, a, d, p, m].forEach((c) => c.remove()), r = o = a = d = p = m = null, v.clear());
  }
  return {
    // options: { labels, remember, motion: 'auto' | 'reduce' | 'full' ('reduced' still works), flashlight, maxBuilt }
    init(c = {}) {
      e = { ...e, ...c, labels: { ...dn, ...c.labels || {} } }, o && (s.textContent = e.labels.flip, u.textContent = e.labels.tear, f.textContent = e.labels.close, d.textContent = e.labels.hint), _(), n = Be(e.motion), x(() => {
        o && U();
      });
    },
    attach: O,
    // detaches a trigger element, or the paper with that id
    detach(c) {
      let y = typeof c == "string" ? b.find((R) => R.cfg.id === c) : E.get(c);
      y && $(y);
    },
    destroy: Oe,
    open: (c) => X(c).then((y) => y ? Fe(c) : Y(c)),
    close: P,
    flip: q,
    tear: L,
    reset: Ee,
    get reducedMotion() {
      return n;
    },
    get entries() {
      return b;
    },
    get isOpen() {
      return !!i;
    },
    // debugging/testing: draws a fixed frame (flight, unfold, flip, tear, burn front) of an attached paper
    async frame(c, y, R, A = 0, N = 0, D) {
      let B = b[c];
      await X(B), D !== void 0 && await t.ensureBurn(B.P), cancelAnimationFrame(w), w = 0, G(), i = { P: B.P, ent: B, from: B.btn.getBoundingClientRect(), tf: y, p: R, f: A, tear: N, tw: [], phase: "open", burnOpen: 0 }, D !== void 0 && (i.destroy = D), o.style.display = "block", r.classList.add("on"), b.forEach((ce) => ce.btn.classList.toggle("active", ce === B));
      let { scene: se } = re();
      t.draw(se.items, se.shadow, null);
    },
    // debugging/testing: lights the flashlight at screen (x, y) and draws
    flashlight(c, y) {
      if (i) {
        rt(i, c, y, o.clientWidth, o.clientHeight, o.clientHeight / (2 * Ie * Math.tan(Ce / 2)), !0), i.lampPos = i.lampGoal.slice(), i.lamp = 1;
        let { scene: R } = re();
        t.draw(R.items, R.shadow, null);
      }
    },
    get debug() {
      return i ? { phase: i.phase, ashes: !!i.ashes, destroy: i.destroy, n: v.n, raf: w, tw: i.tw.map((c) => c.key), lampPos: i.lampPos, lamp: i.lamp } : null;
    }
  };
})();

// .build/stage.js
var hn = 1.5;
function cn(e, n = {}) {
  let t = { flashlight: !0, drag: !0, fit: 0.8, motion: "auto", ...n }, l, o = !1, r = Be(t.motion);
  try {
    l = je(e, { onRestore: k });
  } catch {
    l = null;
  }
  if (!l) return null;
  let a = (_, U, G, Z, re, me, Ae) => fe(_, U, G, r ? Z * 0.4 : Z, re, me, Ae), s = null, u = 0, f = 0, d = null, p = "", m = null, h = [], S = Pt(), b = { p: 1, f: 0, tear: 0, tw: [], dragging: !1, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 };
  function E() {
    let _ = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(4e6 / Math.max(1, e.clientWidth * e.clientHeight))), U = Math.round(e.clientWidth * _), G = Math.round(e.clientHeight * _);
    (e.width !== U || e.height !== G) && (e.width = U, e.height = G);
  }
  function g(_) {
    let U = e.clientWidth, G = e.clientHeight, Z = G / (2 * Ie * Math.tan(Ce / 2)), re = s.cfg.type === "envelope", me = re ? Math.min(t.fit * 0.69 * G / (s.T.body * Z), 0.7 * U / (s.w * Z)) : Math.min(t.fit * G / (s.h * Z), (t.fit + 0.06) * U / (s.w * Z)), Ae = s.letter ? Math.min(t.fit * G / (s.letter.h * Z), (t.fit + 0.06) * U / (s.letter.w * Z)) : me, ge = ue(K(re ? b.p * 2 : b.p)), H = [0, 0, -0.02];
    return { cx: 0, cy: 0, sc: me, scLetter: Ae, rot: s.pose.map((Me, Fe) => Me * (1 - ge) + H[Fe] * ge), lift: 0, time: _ / 1e3, ppu: Z, vw: U, vh: G, vhU: G / Z, L: $e, lampPos: b.lampPos, lamp: b.lamp || 0, lampR: 0.3 * G / Z };
  }
  let v = (_ = performance.now()) => {
    let U = g(_);
    return { b: U, scene: He(s, b, U) };
  };
  function i(_) {
    if (u = 0, !s || document.hidden || o || l.isLost()) return;
    E();
    let U = b.resume ? 1 / 60 : Math.min(0.05, Math.max(0, (_ - (b.tPrev || _)) / 1e3));
    b.resume = !1, b.tPrev = _;
    let G = Tt(b, _), Z = wt(b, U), { scene: re } = v(_);
    Et(S, b, re, U), S.step(U), l.draw(re.items, re.shadow, S), b.pPrev = b.p, (G || b.dragging || Z || S.n > 0 || re.active.st.front > -0.5 && re.active.P.burnPts) && (u = requestAnimationFrame(i));
  }
  let w = () => {
    !u && !o && (b.resume = !0, u = requestAnimationFrame(i));
  };
  function M() {
    if (!s) return null;
    let { b: _, scene: U } = v(), G = e.getBoundingClientRect();
    return ot(U.active.P, U.active.st, _.ppu, _.vw, _.vh, G.left, G.top);
  }
  t.drag && (p = e.style.touchAction, e.style.touchAction = "none", d = St(e, { active: () => s ? b : null, box: M, outside: () => {
  }, redraw: w })), oe(h, e, "dblclick", () => ee.flip()), t.flashlight && (oe(h, e, "pointermove", (_) => {
    if (!s || b.dragging || _.pointerType === "touch") return;
    let U = M(), G = e.getBoundingClientRect(), Z = !!U && _.clientX > U.x0 - 30 && _.clientX < U.x1 + 30 && _.clientY > U.y0 - 30 && _.clientY < U.y1 + 30;
    rt(b, _.clientX - G.left, _.clientY - G.top, e.clientWidth, e.clientHeight, e.clientHeight / (2 * Ie * Math.tan(Ce / 2)), Z), w();
  }), oe(h, e, "pointerleave", () => {
    b.lampOn = 0, w();
  })), oe(h, window, "resize", () => w()), oe(h, document, "visibilitychange", () => {
    document.hidden || w();
  });
  let C = Qe();
  C && t.motion === "auto" && oe(h, C, "change", () => {
    r = Be(t.motion);
  });
  function k() {
    let _ = s && s.cfg, U = b.p;
    s = null, _ && ee.set(_, { progress: U }).catch((G) => console.warn("crumple: rebuild after context restore failed", G));
  }
  function I() {
    o || (o = !0, f++, cancelAnimationFrame(u), u = 0, h.splice(0).forEach((_) => _()), d && d(), t.drag && (e.style.touchAction = p), s && l.release(s), s = null, b.tw = [], S.clear(), l.destroy());
  }
  let J = () => s.cfg.type === "envelope", ee = {
    // builds a paper from a config and shows it (resolves with the paper, or null if a newer call replaced it)
    async set(_, { progress: U } = {}) {
      if (o) return null;
      let G = ++f, Z = await l.build(_);
      return G !== f || o ? (l.release(Z), null) : (s && l.release(s), s = Z, b.tear = 0, b.f = 0, s.torn = !1, delete b.destroy, U !== void 0 && (b.tw = [], b.p = K(U)), S.clear(), w(), s);
    },
    crumple() {
      s && (le.play("crumple", 0.9, 0, { type: s.cfg.type, gsm: s.cfg.gsm }), a(b, "p", 0, J() ? 1.9 : 0.9, J() ? ze : pt(s)), w());
    },
    uncrumple() {
      s && (le.play(J() ? "seal" : "uncrumple", 1.5, 0, { type: s.cfg.type, gsm: s.cfg.gsm }), a(b, "p", 1, J() ? hn * 1.85 : hn, J() ? ze : ut(s)), w());
    },
    toggle() {
      b.p > 0.5 ? ee.crumple() : ee.uncrumple();
    },
    // any time, except once the paper burns away; the side it shows is kept through crumple and unfold
    flip() {
      !s || b.destroy !== void 0 || (le.play("flip", 1, 0, { type: s.cfg.type, gsm: s.cfg.gsm }), a(b, "f", b.f < 0.5 ? 1 : 0, 0.8, be), w());
    },
    tear() {
      !s || s.stubX === null || b.tear > 0 || b.p < 0.95 || (le.play("tear"), a(b, "tear", 1, 1, be, 0, () => {
        s.torn = !0;
      }), w());
    },
    restoreStub() {
      s && (b.tear = 0, s.torn = !1, w());
    },
    // resolves once the paper has its burn field (built on demand for any paper); a second call meanwhile does nothing,
    // and a paper replaced by set() meanwhile is not burnt
    async burn() {
      let _ = s;
      if (!_ || b.destroy !== void 0 || m === _) return;
      m = _;
      try {
        await l.ensureBurn(_);
      } finally {
        m === _ && (m = null);
      }
      if (s !== _ || b.destroy !== void 0) return;
      let U = _.letter || _;
      le.play("fire", 2.6), b.destroy = Math.max(U.front0 > -0.5 ? U.front0 + U.burned : -0.06, -0.06), a(b, "destroy", 1.6, 2.6, be), w();
    },
    restore() {
      delete b.destroy, S.clear(), w();
    },
    setProgress(_) {
      b.tw = [], b.p = K(_), w();
    },
    // PNG of the current frame (draws and reads at once, no preserved buffer needed)
    png() {
      if (!s) return "";
      E();
      let { scene: _ } = v();
      return l.draw(_.items, _.shadow, null), e.toDataURL("image/png");
    },
    snapshot(_, U, G) {
      return s ? l.snapshot(s, _, U, G) : "";
    },
    get state() {
      return b;
    },
    get paper() {
      return s;
    },
    destroy: I
  };
  return ee;
}

// .build/element.js
var it = class extends (typeof HTMLElement < "u" ? HTMLElement : class {
}) {
  connectedCallback() {
    let n = this.querySelector("button");
    n || (n = document.createElement("button"), n.type = "button", this.appendChild(n), this._madeBtn = !0), this.btn = n;
    let t = this.getAttribute("states"), l = t ? t.split(",").map((f) => f.trim()).filter(Boolean) : void 0, o = {
      id: this.getAttribute("id") || void 0,
      type: this.getAttribute("type") || void 0,
      shape: this.getAttribute("shape") || void 0,
      states: l,
      text: this.getAttribute("text") || (this._madeBtn ? "" : n.textContent || ""),
      back: this.getAttribute("back") || void 0,
      open: this.getAttribute("open") || void 0,
      seed: this.hasAttribute("seed") ? Number(this.getAttribute("seed")) : void 0
    }, r = this.getAttribute("snapshot") || void 0, a = this.getAttribute("snapshot-opened") || void 0, s = r || a ? { snapshot: r, snapshotOpened: a } : void 0, u = () => {
      this.entry || (this._io && (this._io.disconnect(), this._io = null), this.entry = at.attach(n, o, s));
    };
    n.addEventListener("click", u, { once: !0, capture: !0 }), typeof IntersectionObserver < "u" ? (this._io = new IntersectionObserver((f) => {
      for (let d of f)
        if (d.isIntersecting) {
          u();
          break;
        }
    }, { rootMargin: "200px" }), this._io.observe(this)) : u();
  }
  disconnectedCallback() {
    this._io && (this._io.disconnect(), this._io = null), this.btn && at.detach(this.btn), this._madeBtn && this.btn.parentNode && this.btn.remove(), this.entry = null;
  }
};
typeof customElements < "u" && !customElements.get("crumple-paper") && customElements.define("crumple-paper", it);

// .build/index.js
var uo = "1.2.0";
//# sourceMappingURL=crumple.cjs.map
