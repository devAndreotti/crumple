var Lt = Object.defineProperty;
var kn = Object.getOwnPropertyDescriptor;
var Rn = Object.getOwnPropertyNames;
var Pn = Object.prototype.hasOwnProperty;
var An = (e, n) => {
  for (var t in n)
    Lt(e, t, { get: n[t], enumerable: !0 });
}, In = (e, n, t, f) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let o of Rn(n))
      !Pn.call(e, o) && o !== t && Lt(e, o, { get: () => n[o], enumerable: !(f = kn(n, o)) || f.enumerable });
  return e;
};
var Cn = (e) => In(Lt({}, "__esModule", { value: !0 }), e);

// .build/index.js
var bo = {};
An(bo, {
  CrumplePaper: () => ut,
  Renderer: () => We,
  SHAPES: () => Ut,
  STATES: () => rt,
  Scene: () => ft,
  Sound: () => ie,
  Stage: () => bn,
  TEXTS: () => Bt,
  TYPES: () => Pe,
  config: () => Le,
  normalize: () => Ke,
  registerPaperType: () => Qt,
  registerWearState: () => Wt,
  version: () => go
});
module.exports = Cn(bo);

// .build/util.js
function oe(e) {
  let n = Math.imul(e | 0, 2654435761) >>> 0 || 1;
  return () => (n ^= n << 13, n >>>= 0, n ^= n >>> 17, n ^= n << 5, n >>>= 0, n / 4294967296);
}
function Ne(e) {
  let n = Math.imul(e, 1442695041), t = (r, a) => {
    let i = Math.imul(r, 374761393) + Math.imul(a, 668265263) + n | 0;
    return i = Math.imul(i ^ i >>> 13, 1274126177), ((i ^ i >>> 16) >>> 0) / 4294967296;
  }, f = [0, 1, 2, 3].map(() => ({ xi: NaN, yi: NaN, a: 0, b: 0, c: 0, d: 0 })), o = (r, a, i) => {
    let u = Math.floor(r), s = Math.floor(a), p = r - u, d = a - s, m = p * p * (3 - 2 * p), g = d * d * (3 - 2 * d), c = f[i];
    (c.xi !== u || c.yi !== s) && (c.xi = u, c.yi = s, c.a = t(u, s), c.b = t(u + 1, s), c.c = t(u, s + 1), c.d = t(u + 1, s + 1));
    let y = c.a, w = c.b, M = c.c, b = c.d;
    return y + (w - y) * m + (M - y) * g + (y - w - M + b) * m * g;
  };
  return (r, a) => (o(r, a, 0) * 0.5 + o(r * 2, a * 2, 1) * 0.25 + o(r * 4, a * 4, 2) * 0.125 + o(r * 8, a * 8, 3) * 0.0625) / 0.9375;
}
var V = (e, n = 0, t = 1) => Math.min(t, Math.max(n, e)), ce = (e) => e * e * (3 - 2 * e), nt = (e, n, t) => e + (n - e) * t, Be = (e) => e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2, Ve = (e) => 1 - (1 - e) * (1 - e), Dt = (e) => 0.5 * ce(e) + 0.5 * Ve(e), Me = (e) => e, xt = (e) => 0.35 * ce(e) + 0.65 * (1 - Math.pow(1 - e, 3)), Jt = (e) => e * e * (1.6 - 0.6 * e), He = (e) => 0.55 * e + 0.45 * ce(e), ct = (e) => e.F.shape === 0 ? (n) => 1 - Math.pow(1 - n, 2.3) : Dt, mt = (e) => e.F.shape === 0 ? (n) => 1 - Math.pow(1 - n, 2.2) : Be, Le = {
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
}, be = {
  get(e, n) {
    try {
      let t = localStorage.getItem(Le.storagePrefix + e);
      return t === null ? n : JSON.parse(t);
    } catch {
      return n;
    }
  },
  set(e, n) {
    try {
      localStorage.setItem(Le.storagePrefix + e, JSON.stringify(n));
    } catch {
    }
  },
  remove(e) {
    try {
      localStorage.removeItem(Le.storagePrefix + e);
    } catch {
    }
  }
}, Se = (e, n, t) => {
  let f = document.createElement("canvas");
  return f.width = e, f.height = n, t && f.getContext("2d", { willReadFrequently: !0 }), f;
}, ae = (e, n) => `rgba(${e[0]},${e[1]},${e[2]},${n})`;
function De(e) {
  if (Array.isArray(e) && e.length === 3 && e.every((n) => typeof n == "number" && Number.isFinite(n) && n >= 0 && n <= 1))
    return [e[0], e[1], e[2]];
  if (typeof e == "string") {
    let n = e.trim(), t = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/.exec(n);
    if (t) return [parseInt(t[1], 16) / 255, parseInt(t[2], 16) / 255, parseInt(t[3], 16) / 255];
    let f = /^#?([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/.exec(n);
    if (f) return [parseInt(f[1] + f[1], 16) / 255, parseInt(f[2] + f[2], 16) / 255, parseInt(f[3] + f[3], 16) / 255];
  }
  return null;
}
function ze(e, n, t) {
  try {
    (e || document).dispatchEvent(new CustomEvent("crumple:" + n, { bubbles: !0, detail: t }));
  } catch {
  }
}
function ot() {
  try {
    return matchMedia("(prefers-reduced-motion: reduce)");
  } catch {
    return null;
  }
}
function Xe(e) {
  if (e === "full") return !1;
  if (e === "reduce" || e === "reduced") return !0;
  let n = ot();
  return !!n && n.matches;
}
function re(e, n, t, f, o) {
  n.addEventListener(t, f, o), e.push(() => n.removeEventListener(t, f, o));
}
var _n = { "Special Elite": "Special+Elite", "Courier Prime": "Courier+Prime:wght@400;700", Caveat: "Caveat:wght@500", VT323: "VT323", "Libre Baskerville": "Libre+Baskerville:ital,wght@0,400;0,700;1,400" }, Ot = {};
function Zt(e) {
  return document.fonts ? Promise.all(e.map((n) => {
    if (!Ot[n]) {
      let t = _n[n], f = t ? "family=" + t.split(":")[0] : null, r = !t || !Le.googleFonts || [...document.querySelectorAll("link[rel=stylesheet]")].some((a) => a.href.includes(f)) ? Promise.resolve() : new Promise((a) => {
        let i = document.createElement("link");
        i.rel = "stylesheet", i.href = "https://fonts.googleapis.com/css2?family=" + t + "&display=swap", i.onload = a, i.onerror = a, setTimeout(a, 4e3), document.head.appendChild(i);
      });
      Ot[n] = r.then(() => Promise.all(["", "bold ", "italic "].map((a) => document.fonts.load(`${a}40px "${n}"`).catch(() => null))));
    }
    return Ot[n];
  })) : Promise.resolve();
}
var Nt = {};
function gt(e) {
  return Nt[e] || (Nt[e] = new Promise((n) => {
    let t = new Image();
    t.crossOrigin = "anonymous", t.onload = () => t.decode ? t.decode().then(() => n(t), () => n(t)) : n(t), t.onerror = () => n(null), t.src = e;
  })), Nt[e];
}
var $e = (e) => gt(Le.assets + "textures/" + e + ".webp");
function je(e) {
  try {
    typeof navigator < "u" && "vibrate" in navigator && navigator.vibrate(e);
  } catch {
  }
}

// .build/catalog.js
var Pe = {
  typed: { name: "Typewritten sheet", w: 0.84, h: 1.1, color: [0.945, 0.92, 0.865], shape: "ball", font: "Special Elite", size: 42, lineHeight: 62, x: 96, y: 190, ink: [31, 29, 28], typewriter: !0, gsm: 80 },
  notebook: { name: "Notebook page", w: 0.84, h: 1.1, color: [0.955, 0.945, 0.905], shape: "flat", font: "Caveat", size: 56, lineHeight: 52, x: 150, y: 206, ink: [28, 45, 110], hand: !0, gsm: 75 },
  form: { name: "Continuous form", w: 0.92, h: 1, color: [0.95, 0.95, 0.935], shape: "quarters", font: "VT323", size: 46, lineHeight: 64, x: 120, y: 172, ink: [44, 44, 58], typewriter: !0, gsm: 70 },
  receipt: { name: "Thermal receipt", w: 0.42, h: 1.26, color: [0.975, 0.97, 0.955], shape: "roll", font: "VT323", size: 40, lineHeight: 46, x: 36, y: 110, ink: [64, 64, 80], typewriter: !0, fades: !0, gsm: 48, thru: 0.14 },
  ticket: { name: "Theatre ticket", w: 1, h: 0.46, color: [0.93, 0.875, 0.76], shape: "half", font: "Special Elite", size: 38, lineHeight: 52, x: 70, y: 130, ink: [120, 28, 30], card: !0, stub: 0.27, gsm: 250 },
  memo: { name: "Office memo", w: 0.84, h: 1.1, color: [0.965, 0.96, 0.94], shape: "ball", font: "Courier Prime", size: 33, lineHeight: 50, x: 100, y: 330, ink: [25, 25, 30], typewriter: !0, gsm: 75 },
  newspaper: { name: "Newspaper clipping", w: 0.8, h: 1, color: [0.85, 0.84, 0.79], shape: "twist", font: "Libre Baskerville", size: 25, lineHeight: 38, x: 56, y: 330, ink: [28, 28, 28], gsm: 45, thru: 0.08 },
  sticky: { name: "Sticky note", w: 0.5, h: 0.5, color: [0.985, 0.88, 0.38], shape: "half", font: "Caveat", size: 62, lineHeight: 70, x: 50, y: 150, ink: [30, 40, 100], hand: !0, gsm: 75 },
  polaroid: { name: "Instant photo", w: 0.62, h: 0.74, color: [0.975, 0.972, 0.96], shape: "flat", font: "Caveat", size: 50, lineHeight: 54, x: 50, y: 640, ink: [30, 40, 100], hand: !0, card: !0, photo: !0, gsm: 300 },
  envelope: { name: "Sealed envelope", w: 0.9, h: 0.96, body: 0.6, flap: 0.36, color: [0.93, 0.885, 0.79], shape: "envelope", font: "Caveat", size: 46, lineHeight: 50, x: 90, y: 600, ink: [30, 40, 100], hand: !0, gsm: 100 },
  blueprint: { name: "Technical blueprint", w: 0.96, h: 0.72, color: [0.045, 0.145, 0.25], shape: "quarters", font: "Courier Prime", size: 28, lineHeight: 42, x: 64, y: 140, ink: [215, 240, 255], typewriter: !0, gsm: 90 },
  postcard: { name: "Vintage postcard", w: 0.94, h: 0.62, color: [0.96, 0.95, 0.92], shape: "flat", font: "Caveat", size: 44, lineHeight: 50, x: 70, y: 120, ink: [24, 38, 90], hand: !0, card: !0, gsm: 280 },
  punchcard: { name: "IBM 80-col punch card", w: 1.05, h: 0.48, color: [0.96, 0.93, 0.84], shape: "flat", font: "Courier Prime", size: 16, lineHeight: 24, x: 34, y: 24, ink: [25, 25, 25], typewriter: !0, card: !0, gsm: 260 },
  shipping: { name: "Kraft shipping parcel", w: 0.76, h: 1, color: [0.78, 0.65, 0.48], shape: "flat", font: "Courier Prime", size: 36, lineHeight: 48, x: 60, y: 160, ink: [25, 20, 18], typewriter: !0, gsm: 130 },
  kraft: { name: "Kraft paper parcel", w: 0.76, h: 1, color: [0.78, 0.65, 0.48], shape: "flat", font: "Courier Prime", size: 36, lineHeight: 48, x: 60, y: 160, ink: [25, 20, 18], typewriter: !0, gsm: 130 },
  parchment: { name: "Ancient parchment", w: 0.82, h: 1.12, color: [0.91, 0.828, 0.655], shape: "roll", font: "Caveat", size: 50, lineHeight: 54, x: 90, y: 180, ink: [55, 35, 20], hand: !0, gsm: 140 },
  ledger: { name: "Accounting ledger", w: 0.96, h: 0.76, color: [0.92, 0.955, 0.925], shape: "half", font: "Caveat", size: 36, lineHeight: 42, x: 74, y: 198, ink: [20, 35, 75], hand: !0, gsm: 95 },
  carbon: { name: "Carbon duplicate copy", w: 0.84, h: 1.1, color: [0.15, 0.14, 0.21], shape: "quarters", font: "Special Elite", size: 34, lineHeight: 48, x: 74, y: 290, ink: [155, 170, 255], typewriter: !0, carbon: !0, gsm: 42, thru: 0.18 }
}, Ut = { ball: "Crumpled ball", flat: "Flattened crumple", quarters: "Folded in quarters", half: "Folded in half", thirds: "Folded in thirds (letter)", roll: "Rolled up", twist: "Twisted (candy wrapper)", accordion: "Accordion fold", triangle: "Triangle fold" }, rt = { torn: "Torn", burnt: "Burnt", coffee: "Coffee stain", water: "Water stain", prints: "Dirty fingerprints", aged: "Aged", scribbled: "Scribbled", singed: "Singed", wine: "Wine stain", ink: "Ink blot", foxing: "Foxing", tape: "Tape", stamp: "Rubber stamp", faded: "Sun-faded", staple: "Metal staple", grease: "Grease stain", dogear: "Dog-eared corner", damp: "Damp wrinkled relief", creased: "Pocket-creased grid", clip: "Metal paper clip" }, Fn = ["corner", "edge", "center", "spots"], Bt = {
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

VERIFIED BY AUDIT COMMITTEE \xB7 SECOND COPY RETAINED`,
  fax: `# INCOMING TRANSMISSION \xB7 TELEFAX G3
FROM: TELECOM OPERATOR 09
DATE: 30 OCT 2026  23:41:02 UTC

DISPATCH ACKNOWLEDGED. ALL CIRCUITS CLEAR.`,
  cyanotype: `# HERBARIUM SPECIMEN \u2116 408
FERN (PTERIDOPHYTA)

SOLAR CONTACT PRINT \xB7 PRUSSIAN BLUE
EXPOSURE: 18 MIN MIDDAY SUN`,
  manuscript: `Anno Domini MCCLIV

In hoc volumine continentur secreta antiquorum scriptorum.`,
  market: `# CENTRAL MARKET \xB7 SLIP 1094
----------------------------
SODA 2L ............ 4.50
BREAD 500G ......... 3.20
COFFEE 250G ........ 8.90
----------------------------
TOTAL .............. 16.60

CODE: 789100029481
THANK YOU FOR SHOPPING!`
}, Ln = `A. Reader
12 Paper Lane
Foldtown`, qt = ["never", "again", "always", "not yet", "once more", "still"], yt = {};
function Qt(e, n) {
  if (Pe[e]) throw new Error(`Paper type "${e}" already exists`);
  Pe[e] = n;
}
function Wt(e, n) {
  if (rt[e]) throw new Error(`Wear state "${e}" already exists`);
  rt[e] = n.name, n.apply && (yt[e] = n.apply);
}
var bt = (e, n) => Object.prototype.hasOwnProperty.call(e, n);
function Ke(e = {}) {
  (!e || typeof e != "object") && (e = {});
  let n = bt(Pe, e.type) ? e.type : "typed", t = Pe[n], f = typeof e.stamp == "string" && e.stamp.trim() ? e.stamp.trim() : e.stamp && typeof e.stamp == "object" ? {
    text: typeof e.stamp.text == "string" && e.stamp.text.trim() ? e.stamp.text.trim() : "RECEIVED",
    ...typeof e.stamp.color == "string" && e.stamp.color.trim() ? { color: e.stamp.color.trim() } : {},
    ...typeof e.stamp.angle == "number" && Number.isFinite(e.stamp.angle) ? { angle: e.stamp.angle } : {},
    ...["center", "left", "right"].includes(e.stamp.align) ? { align: e.stamp.align } : {}
  } : "RECEIVED", o = {
    id: e.id || n,
    type: n,
    shape: n === "envelope" ? "envelope" : bt(Ut, e.shape) ? e.shape : t.shape,
    states: (Array.isArray(e.states) ? e.states : []).filter((r) => bt(rt, r)),
    text: typeof e.text == "string" ? e.text : Bt[n] || "",
    back: typeof e.back == "string" ? e.back : "",
    seed: Number.isFinite(e.seed) ? Math.trunc(e.seed) : 7,
    // 0 is a valid seed (rng starts from 1 either way)
    open: e.open === "drag" ? "drag" : "auto",
    hiddenInk: typeof e.hiddenInk == "string" ? e.hiddenInk : "",
    burnAfterReading: !!e.burnAfterReading,
    burn: Fn.includes(e.burn) ? e.burn : "corner",
    image: e.image || "",
    address: typeof e.address == "string" ? e.address : Ln,
    letter: bt(Pe, e.letter) && e.letter !== "envelope" ? e.letter : "typed",
    // the word of the 'stamp' state (drawn in capitals)
    stamp: f
  };
  if (Number.isFinite(e.gsm) && (o.gsm = e.gsm), Number.isFinite(e.weight) && (o.weight = e.weight), Number.isFinite(e.thickness) && (o.thickness = e.thickness), Number.isFinite(e.thru) && (o.thru = e.thru), e.color !== void 0 && De(e.color) && (o.color = e.color), typeof e.watermark == "string" && e.watermark.trim())
    o.watermark = e.watermark.trim();
  else if (e.watermark && typeof e.watermark == "object") {
    let r = {};
    typeof e.watermark.text == "string" && e.watermark.text.trim() && (r.text = e.watermark.text.trim()), typeof e.watermark.symbol == "string" && e.watermark.symbol.trim() && (r.symbol = e.watermark.symbol.trim()), (r.text || r.symbol) && (o.watermark = r);
  }
  if (e.seal && typeof e.seal == "object") {
    let r = {};
    typeof e.seal.symbol == "string" && e.seal.symbol.trim() && (r.symbol = e.seal.symbol.trim()), typeof e.seal.color == "string" && e.seal.color.trim() ? r.color = e.seal.color.trim() : Array.isArray(e.seal.color) && e.seal.color.length === 3 && e.seal.color.every((a) => typeof a == "number" && Number.isFinite(a) && a >= 0 && a <= 1) && (r.color = [e.seal.color[0], e.seal.color[1], e.seal.color[2]]), (r.symbol !== void 0 || r.color !== void 0) && (o.seal = r);
  }
  return typeof e.wearIntensity == "number" && Number.isFinite(e.wearIntensity) && (o.wearIntensity = Math.max(0, Math.min(2, e.wearIntensity))), e.rich && typeof e.rich == "object" && (o.rich = e.rich), o;
}

// .build/fields.js
function vt(e, n, t) {
  let f = oe(e.seed), o = () => f() < 0.5 ? -1 : 1, r = e.w / 2, a = e.h / 2, i = new Float32Array(n * t), u = n / e.w, s = t / e.h, p = (b, l, S) => Math.abs(b) < 1e-12 ? Math.abs(l) < S + 1e-9 ? [-1 / 0, 1 / 0] : [1 / 0, -1 / 0] : [Math.min((-S - l) / b, (S - l) / b), Math.max((-S - l) / b, (S - l) / b)], d = (b, l, S, k, I, L) => {
    L === void 0 && (L = f() * Math.PI), k === void 0 && (k = (f() * 2 - 1) * r, I = (f() * 2 - 1) * a);
    let R = Math.cos(L), U = Math.sin(L), G = Math.abs(R) * b + l, A = Math.abs(U) * b + l, D = Math.max(0, Math.floor((k - G + r) * u)), z = Math.min(n - 1, Math.ceil((k + G + r) * u)), Q = Math.max(0, Math.floor((I - A + a) * s)), ee = Math.min(t - 1, Math.ceil((I + A + a) * s)), ye = Math.min(0.08, b);
    for (let ge = Q; ge <= ee; ge++) {
      let me = (ge + 0.5) / s - a - I, [ue, _e] = p(-U, me * R, l), [le, qe] = p(R, me * U, b), Ue = Math.max(ue, le), et = Math.min(_e, qe), E = Math.max(D, Math.floor((Ue + r + k) * u - 1.5)), v = Math.min(z, Math.ceil((et + r + k) * u + 0.5));
      for (let _ = E; _ <= v; _++) {
        let X = (_ + 0.5) / u - r - k, F = Math.abs(-X * U + me * R);
        if (F >= l) continue;
        let H = Math.abs(X * R + me * U);
        H >= b || (i[ge * n + _] += S * (1 - F / l) * Math.min(1, (b - H) / ye));
      }
    }
  }, m = e.shape === "quarters" || e.shape === "half" || e.shape === "thirds" || e.shape === "accordion" || e.shape === "triangle", g = m ? 0.18 : e.shape === "roll" ? 0.45 : e.shape === "twist" ? 0.55 : 1, c = m ? 0.35 : e.shape === "roll" || e.shape === "twist" ? 0.6 : 1;
  e.card && (g *= 0.5, c *= 0.5), e.shape === "envelope" && (g = 0.08, c = 0.25);
  let y = e.w * e.h / (0.84 * 1.1);
  for (let b = 0; b < Math.round(8 * g * y); b++) d(2, 0.08 + f() * 0.1, o() * (0.8 + f() * 0.4) * c);
  for (let b = 0; b < Math.round(46 * g * y); b++) d(0.1 + f() * 0.28, 0.035 + f() * 0.05, o() * (0.45 + f() * 0.4) * c);
  for (let b = 0; b < Math.round(150 * g * y); b++) d(0.03 + f() * 0.1, 0.01 + f() * 0.025, o() * (0.2 + f() * 0.35) * c);
  if (e.shape === "twist")
    for (let b of [-1, 1]) for (let l = 0; l < 26; l++) d(0.12 + f() * 0.3, 0.012 + f() * 0.02, o() * (0.5 + f() * 0.5), b * r * (0.6 + f() * 0.36), (f() * 2 - 1) * a, Math.PI / 2 + b * (0.5 + f() * 0.35));
  if ((e.shape === "half" || e.shape === "quarters") && d(2, 0.022, 0.6, 0, 0, Math.PI / 2), e.shape === "quarters" && d(2, 0.022, -0.55, 0, 0, 0), e.shape === "thirds" && (d(2, 0.02, 0.55, 0, -e.h / 6 * 1.08, 0), d(2, 0.02, -0.55, 0, e.h / 6, 0)), e.shape === "accordion") {
    let b = e.w / 6;
    d(2, 0.02, 0.55, -b, 0, Math.PI / 2), d(2, 0.02, -0.55, 0, 0, Math.PI / 2), d(2, 0.02, 0.55, b, 0, Math.PI / 2);
  }
  e.shape === "triangle" && (d(2, 0.022, 0.6, 0, 0, Math.PI / 4), d(2, 0.022, -0.55, 0, 0, -Math.PI / 4)), e.shape === "envelope" && d(2, 0.02, 0.5, 0, e.foldY, 0);
  let w = Array.isArray(e.states) ? e.states : [];
  if (w.includes("creased"))
    for (let b = 0; b < 90; b++) d(0.04 + f() * 0.12, 8e-3 + f() * 0.015, o() * (0.3 + f() * 0.35));
  if (w.includes("damp")) {
    let b = Ne(e.seed * 3 + 17);
    for (let l = 0; l < t; l++) {
      let S = (l + 0.5) / s - a;
      for (let k = 0; k < n; k++) {
        let I = (k + 0.5) / u - r;
        i[l * n + k] += Math.sin((I * 2.2 + S) * 18) * 0.18 + (b(I * 8, S * 8) - 0.5) * 0.22;
      }
    }
  }
  let M = 1e-6;
  for (let b = 0; b < i.length; b++) Math.abs(i[b]) > M && (M = Math.abs(i[b]));
  for (let b = 0; b < i.length; b++) i[b] /= M;
  return i;
}
function Tt(e, n, t) {
  let f = Ne(e.seed * 7 + 11), o = oe(e.seed * 5 + 3), r = Math.hypot(n, t), a = new Float32Array(n * t), i = (s) => {
    for (let p = 0; p < t; p++) for (let d = 0; d < n; d++) a[p * n + d] = s(d, p);
  }, u = e.form || "corner";
  if (u === "edge") {
    let s = Math.floor(o() * 3);
    i((p, d) => (s === 0 ? t - d : s === 1 ? p : n - p) / (r * 1.6) + (f(p * 0.05, d * 0.05) - 0.5) * 0.35);
  } else if (u === "center") {
    let s = n * (0.3 + 0.4 * o()), p = t * (0.3 + 0.4 * o());
    i((d, m) => Math.hypot(d - s, m - p) / (r * 0.7) + (f(d * 0.04, m * 0.04) - 0.5) * 0.3);
  } else if (u === "spots") {
    let s = 3 + Math.floor(o() * 4), p = [];
    for (let d = 0; d < 200 && p.length < s; d++) {
      let m = n * (0.12 + 0.76 * o()), g = t * (0.12 + 0.76 * o());
      p.every((c) => Math.hypot(c[0] - m, c[1] - g) > r * 0.2) && p.push([m, g]);
    }
    i((d, m) => {
      let g = 1 / 0;
      for (let c = 0; c < p.length; c++) g = Math.min(g, Math.hypot(d - p[c][0], m - p[c][1]));
      return g / (r * 0.5) + (f(d * 0.05, m * 0.05) - 0.5) * 0.1;
    });
  } else if (u === "singed")
    i((s, p) => Math.min(s, n - 1 - s, p, t - 1 - p) / (r * 0.5) + (f(s * 0.03, p * 0.03) - 0.5) * 0.12);
  else {
    let s = e.seed % 4, p = s & 1 ? n : 0, d = s & 2 ? t : 0;
    i((m, g) => Math.sqrt((m - p) * (m - p) + (g - d) * (g - d)) / r + (f(m * 0.02, g * 0.02) - 0.5) * 0.32);
  }
  return a;
}

// .build/worker.js
var Et = /* @__PURE__ */ (() => {
  let e, n = 0, t = /* @__PURE__ */ new Map();
  function f() {
    try {
      let r = [oe, Ne, vt, Tt].map((a) => a.toString()).join(`
`) + `
onmessage = (e) => { const { id, name, args } = e.data; const r = name === 'creases' ? ${vt.name}(...args) : ${Tt.name}(...args); postMessage({ id, r }, [r.buffer]); };`;
      e = new Worker(URL.createObjectURL(new Blob([r], { type: "text/javascript" }))), e.onmessage = (a) => {
        let i = t.get(a.data.id);
        t.delete(a.data.id), i && (clearTimeout(i.t), i(a.data.r));
      }, e.onerror = () => {
        let a = [...t.values()];
        t.clear(), e = null, a.forEach((i) => {
          clearTimeout(i.t), i.redo();
        });
      };
    } catch {
      e = null;
    }
  }
  let o = (r, a) => r === "creases" ? vt(...a) : Tt(...a);
  return {
    run(r, a) {
      if (e === void 0 && f(), !e) return Promise.resolve(o(r, a));
      let i = ++n, u = new Promise((p) => {
        let d = (m) => p(m);
        d.redo = () => p(o(r, a)), t.set(i, d);
      });
      e.postMessage({ id: i, name: r, args: a });
      let s = t.get(i);
      return s.t = setTimeout(() => {
        t.delete(i) && s.redo();
      }, 2e4), u;
    }
  };
})();

// .build/print.js
var St = 1070;
function On(e) {
  return e.split(`
`).map((n) => {
    let t = !1;
    n.startsWith("# ") && (t = !0, n = n.slice(2));
    let f = [], o = /~~(.+?)~~(?:\{(.+?)\})?|\[\[(.+?)\]\]|(\S+)/g, r;
    for (; r = o.exec(n); )
      r[1] !== void 0 ? f.push({ t: r[1], kind: "strike", fix: r[2] || "" }) : r[3] !== void 0 ? f.push({ t: r[3], kind: "redact" }) : f.push({ t: r[4], kind: "w" });
    return { head: t, toks: f };
  });
}
var Nn = (e, n, t) => `${n && !e.hand ? "bold " : ""}${Math.round(t)}px "${e.font}", "Courier Prime", monospace`, Dn = (e) => [e[0] + (200 - e[0]) * 0.4 + 8, e[1] + (170 - e[1]) * 0.3 + 4, e[2] + (120 - e[2]) * 0.3 - 4].map(Math.round);
function Un(e, n, t, f, o, r, a) {
  let i = On(f), u = n.states.includes("faded") ? Dn(t.ink) : t.ink;
  if (n.states.includes("scribbled") && !i.some((w) => w.toks.some((M) => M.kind === "strike"))) {
    let w = [];
    i.forEach((M) => M.toks.forEach((b) => {
      b.kind === "w" && b.t.replace(/\W/g, "").length >= 4 && w.push(b);
    }));
    for (let M = 0; M < 2 && w.length; M++) {
      let b = w.splice(Math.floor(a() * w.length), 1)[0];
      b.kind = "strike", b.fix = qt[Math.floor(a() * qt.length)];
    }
  }
  let s = V(1 - r * 0.34), p = o.cols || 1, d = (o.w - (p - 1) * 40) / p, m = 0, g = o.y, c = o.y + o.h, y = Ne(n.seed + 5);
  return i.forEach((w) => {
    let M = w.head ? t.size * (o.headK || 1.35) : t.size, b = w.head ? t.lineHeight * (o.headK || 1.35) : t.lineHeight;
    e.font = Nn(t, w.head, M);
    let l = e.measureText(" ").width, S = w.head && o.headFull ? o.w : d, k = [[]], I = 0;
    if (w.toks.forEach((L) => {
      let R = e.measureText(L.t).width;
      I > 0 && I + l + R > S && (k.push([]), I = 0), k[k.length - 1].push({ ...L, tw: R }), I += (I > 0 ? l : 0) + R;
    }), !w.toks.length) {
      g += b * 0.7;
      return;
    }
    k.forEach((L) => {
      g > c && m < p - 1 && !(w.head && o.headFull) && (m++, g = o.colY || o.y);
      let R = L.reduce((A, D) => A + D.tw, 0) + l * (L.length - 1), U = o.x + (w.head && o.headFull ? 0 : m * (d + 40)), G = o.center || w.head && o.centerHead ? U + (S - R) / 2 : U;
      L.forEach((A) => {
        Bn(e, t, A, G, g, u, a, y), A.kind === "strike" && qn(e, A, G, g, M, a), A.kind === "redact" && (e.fillStyle = `rgba(12,12,14,${s})`, e.fillRect(G - 5, g - M * 0.82, A.tw + 10, M * 1.06)), G += A.tw + l;
      }), g += b;
    }), w.head && o.headFull && (o.colY = g + 10);
  }), g;
}
function Bn(e, n, t, f, o, r, a, i) {
  if (n.hand) {
    e.save(), e.translate(f, o + (a() - 0.5) * 3), e.rotate((a() - 0.5) * 0.04), e.fillStyle = ae(r, 0.9), e.fillText(t.t, 0, 0), e.restore();
    return;
  }
  if (n.carbon) {
    let u = f;
    for (let s of t.t) {
      let p = (a() - 0.5) * 1.5, d = (a() - 0.5) * 1.8;
      e.fillStyle = "rgba(100, 115, 240, 0.28)", e.fillText(s, u + p - 1, o + d), e.fillText(s, u + p + 1, o + d), e.fillText(s, u + p, o + d + 1), e.fillStyle = ae(r, 0.82 + a() * 0.18), e.fillText(s, u + p, o + d), u += e.measureText(s).width;
    }
    return;
  }
  if (n.typewriter) {
    let u = f;
    for (let s of t.t) {
      let p = 0.72 + a() * 0.28;
      n.fades && (p *= 0.35 + 0.65 * i(u * 6e-3, o * 4e-3)), e.fillStyle = ae(r, p), e.fillText(s, u, o + (a() - 0.5) * 2), u += e.measureText(s).width;
    }
    return;
  }
  e.fillStyle = ae(r, 0.92), e.fillText(t.t, f, o);
}
function qn(e, n, t, f, o, r) {
  e.save(), e.strokeStyle = "rgba(165,28,30,0.85)", e.lineWidth = Math.max(2.5, o * 0.08), e.lineCap = "round";
  for (let a = 0; a < 2; a++) {
    e.beginPath();
    let i = f - o * (0.3 + 0.08 * a);
    e.moveTo(t - 4, i + (r() - 0.5) * 4), e.quadraticCurveTo(t + n.tw / 2, i + (r() - 0.5) * 8, t + n.tw + 4, i + (r() - 0.5) * 4), e.stroke();
  }
  n.fix && (e.fillStyle = "rgba(165,28,30,0.9)", e.font = `${Math.round(o * 0.62)}px "Caveat", cursive`, e.translate(t + n.tw * 0.25, f - o * 0.66), e.rotate(-0.06), e.fillText(n.fix, 0, 0)), e.restore();
}
function tn(e, n, t, f, o, r, a = 6) {
  let i = Math.ceil(o / a), u = Math.ceil(r / a), s = Se(i, u, !0), p = s.getContext("2d"), d = Math.max(i / n.width, u / n.height);
  p.drawImage(n, (i - n.width * d) / 2, (u - n.height * d) / 2, n.width * d, n.height * d);
  let m = p.getImageData(0, 0, i, u).data;
  e.fillStyle = "rgba(20,20,20,0.88)";
  for (let g = 0; g < u; g++) for (let c = 0; c < i; c++) {
    let y = (g * i + c) * 4, w = (m[y] * 0.3 + m[y + 1] * 0.59 + m[y + 2] * 0.11) / 255, M = a * 0.56 * Math.sqrt(1 - w);
    M > 0.35 && (e.beginPath(), e.arc(t + (c + 0.5) * a, f + (g + 0.5) * a, M, 0, Math.PI * 2), e.fill());
  }
}
function Gn(e, n, t) {
  let f = [], o = "";
  return n.split(" ").forEach((r) => {
    let a = o ? o + " " + r : r;
    e.measureText(a).width > t && o ? (f.push(o), o = r) : o = a;
  }), o && f.push(o), f;
}
function nn(e) {
  let n = String(e || "").toUpperCase();
  return n >= "0" && n <= "9" ? [n.charCodeAt(0) - 48 + 2] : n >= "A" && n <= "I" ? [0, n.charCodeAt(0) - 65 + 3] : n >= "J" && n <= "R" ? [1, n.charCodeAt(0) - 74 + 3] : n >= "S" && n <= "Z" ? [2, n.charCodeAt(0) - 83 + 4] : n === "-" ? [1] : n === "&" || n === "+" ? [0] : n === "/" ? [2, 3] : n === "." ? [0, 5, 10] : n === "," ? [2, 5, 10] : n === "=" ? [5, 10] : n === "$" ? [1, 5, 10] : n === "*" ? [1, 6, 10] : [];
}
var Mt = {
  notebook(e, n, t) {
    e.strokeStyle = "rgba(95,135,205,0.5)", e.lineWidth = 2;
    for (let f = 206; f < t - 30; f += 52)
      e.beginPath(), e.moveTo(20, f), e.lineTo(n - 10, f), e.stroke();
    e.strokeStyle = "rgba(205,70,70,0.55)", e.lineWidth = 2.5, e.beginPath(), e.moveTo(126, 0), e.lineTo(126, t), e.stroke();
  },
  form(e, n, t) {
    for (let f = 0, o = 128; o < t; f++, o += 64) f % 2 === 0 && (e.fillStyle = "rgba(120,190,135,0.22)", e.fillRect(74, o, n - 148, 64));
    e.strokeStyle = "rgba(0,0,0,0.22)", e.setLineDash([6, 6]), e.lineWidth = 1.5, [66, n - 66].forEach((f) => {
      e.beginPath(), e.moveTo(f, 0), e.lineTo(f, t), e.stroke();
    }), e.setLineDash([]);
  },
  ticket(e, n, t, f) {
    let o = n * (1 - f.stub);
    e.strokeStyle = ae(f.ink, 0.7), e.lineWidth = 3, e.strokeRect(22, 22, n - 44, t - 44), e.lineWidth = 1.2, e.strokeRect(32, 32, n - 64, t - 64), e.setLineDash([3, 7]), e.lineWidth = 3, e.strokeStyle = ae(f.ink, 0.55), e.beginPath(), e.moveTo(o, 22), e.lineTo(o, t - 22), e.stroke(), e.setLineDash([]), e.save(), e.translate(o + (n - o) / 2, t / 2), e.rotate(-Math.PI / 2), e.fillStyle = ae(f.ink, 0.85), e.textAlign = "center", e.font = `bold 26px "${f.font}"`, e.fillText("No. 0042", 0, -46), e.font = `40px "${f.font}"`, e.fillText("C \xB7 12", 0, 2), e.font = `22px "${f.font}"`, e.fillText("ROW \xB7 SEAT", 0, 36), e.font = `italic 17px "${f.font}"`, e.fillText("non-refundable", 0, 64), e.restore();
  },
  memo(e, n) {
    e.fillStyle = "rgba(22,22,26,0.92)", e.beginPath(), e.arc(130, 120, 34, 0, Math.PI * 2), e.fill(), e.fillStyle = "rgba(245,244,240,1)", e.beginPath(), e.moveTo(130, 96), e.lineTo(154, 136), e.lineTo(106, 136), e.closePath(), e.fill(), e.fillStyle = "rgba(22,22,26,0.92)", e.font = 'bold 54px "Courier Prime"', e.fillText("MEMORANDUM", 184, 128), e.font = '22px "Courier Prime"', e.fillText("Research division \xB7 internal use", 186, 160), e.fillRect(96, 196, n - 192, 3), e.save(), e.translate(n - 250, 270), e.rotate(-0.12), e.strokeStyle = "rgba(175,30,30,0.7)", e.lineWidth = 4, e.strokeRect(-12, -44, 268, 60), e.fillStyle = "rgba(175,30,30,0.7)", e.font = 'bold 36px "Courier Prime"', e.fillText("CONFIDENTIAL", 0, 0), e.restore();
  },
  newspaper(e, n, t, f, o, r) {
    e.fillStyle = "rgba(25,25,25,0.9)", e.font = 'bold 50px "Libre Baskerville"', e.textAlign = "center", e.fillText("THE FOLDTOWN HERALD", n / 2, 92), e.font = 'italic 20px "Libre Baskerville"', e.fillText("evening edition \xB7 friday", n / 2, 126), e.textAlign = "left", e.fillRect(40, 140, n - 80, 3), e.fillRect(40, 147, n - 80, 1), e.fillRect(n / 2 - 1, 330, 1, t - 380);
    let a = n / 2 + 20, i = 336, u = n / 2 - 60, s = 230;
    if (e.fillStyle = "rgba(40,40,40,0.12)", e.fillRect(a, i, u, s), r.photo) tn(e, r.photo, a, i, u, s);
    else
      for (let p = i + 4; p < i + s; p += 7) for (let d = a + 4; d < a + u; d += 7) {
        let m = 0.5 + 0.5 * Math.sin(d * 0.02) * Math.cos(p * 0.025);
        e.fillStyle = `rgba(20,20,20,${0.55 * m})`, e.beginPath(), e.arc(d, p, 1.2 + 2 * m, 0, Math.PI * 2), e.fill();
      }
    e.fillStyle = "rgba(25,25,25,0.85)", e.font = 'italic 17px "Libre Baskerville"', e.fillText("The harbor at dusk, yesterday.", a, i + s + 24);
  },
  sticky(e, n) {
    let t = e.createLinearGradient(0, 0, 0, 70);
    t.addColorStop(0, "rgba(170,130,20,0.18)"), t.addColorStop(1, "rgba(170,130,20,0)"), e.fillStyle = t, e.fillRect(0, 0, n, 70);
  },
  polaroid(e, n, t, f, o, r) {
    let a = Math.round(n * 0.065), i = n - 2 * a;
    if (e.fillStyle = "#1a1714", e.fillRect(a, a, i, i), r.img) {
      let u = r.img.width, s = r.img.height, p = Math.max(i / u, i / s);
      e.save(), e.beginPath(), e.rect(a, a, i, i), e.clip(), e.filter = "saturate(0.8) contrast(0.92) brightness(1.05)", e.drawImage(r.img, a + (i - u * p) / 2, a + (i - s * p) / 2, u * p, s * p), e.filter = "none", e.fillStyle = "rgba(255,200,140,0.10)", e.fillRect(a, a, i, i);
      let d = e.createRadialGradient(a + i / 2, a + i / 2, i * 0.25, a + i / 2, a + i / 2, i * 0.75);
      d.addColorStop(0, "rgba(0,0,0,0)"), d.addColorStop(1, "rgba(0,0,0,0.45)"), e.fillStyle = d, e.fillRect(a, a, i, i), e.restore();
    }
    e.strokeStyle = "rgba(0,0,0,0.25)", e.lineWidth = 2, e.strokeRect(a, a, i, i);
  },
  envelope(e, n, t, f) {
    let o = Math.round(f.flap / f.h * t), r = o + (t - o) * 0.48;
    e.strokeStyle = "rgba(110,85,50,0.35)", e.lineWidth = 2.2, e.beginPath(), e.moveTo(0, t), e.lineTo(n / 2, r), e.lineTo(n, t), e.stroke(), e.beginPath(), e.moveTo(0, o), e.lineTo(n * 0.42, r - 8), e.moveTo(n, o), e.lineTo(n * 0.58, r - 8), e.stroke(), e.save(), e.beginPath(), e.moveTo(0, o), e.lineTo(n / 2, 6), e.lineTo(n, o), e.closePath(), e.clip(), e.strokeStyle = "rgba(70,85,120,0.22)", e.lineWidth = 3;
    for (let a = -t; a < n + t; a += 14)
      e.beginPath(), e.moveTo(a, 0), e.lineTo(a + o, o), e.stroke();
    e.restore();
  },
  blueprint(e, n, t, f, o) {
    if (!o?.color) {
      let c = e.createRadialGradient(n / 2, t / 2, n * 0.15, n / 2, t / 2, n * 0.72);
      c.addColorStop(0, "rgba(16, 52, 92, 0.45)"), c.addColorStop(1, "rgba(6, 18, 34, 0.85)"), e.fillStyle = c, e.fillRect(0, 0, n, t);
    }
    e.strokeStyle = "rgba(65, 175, 255, 0.13)", e.lineWidth = 1;
    for (let c = 0; c < n; c += 15)
      e.beginPath(), e.moveTo(c, 0), e.lineTo(c, t), e.stroke();
    for (let c = 0; c < t; c += 15)
      e.beginPath(), e.moveTo(0, c), e.lineTo(n, c), e.stroke();
    e.strokeStyle = "rgba(95, 200, 255, 0.32)", e.lineWidth = 1.4;
    for (let c = 0; c < n; c += 60)
      e.beginPath(), e.moveTo(c, 0), e.lineTo(c, t), e.stroke();
    for (let c = 0; c < t; c += 60)
      e.beginPath(), e.moveTo(0, c), e.lineTo(n, c), e.stroke();
    e.strokeStyle = "rgba(140, 225, 255, 0.52)", e.lineWidth = 2.2;
    for (let c = 0; c < n; c += 180)
      e.beginPath(), e.moveTo(c, 0), e.lineTo(c, t), e.stroke();
    for (let c = 0; c < t; c += 180)
      e.beginPath(), e.moveTo(0, c), e.lineTo(n, c), e.stroke();
    let r = 26;
    e.strokeStyle = "rgba(170, 235, 255, 0.75)", e.lineWidth = 3, e.strokeRect(r, r, n - 2 * r, t - 2 * r), e.lineWidth = 1.2, e.strokeRect(r + 6, r + 6, n - 2 * r - 12, t - 2 * r - 12), e.fillStyle = "rgba(180, 235, 255, 0.75)", e.font = 'bold 12px "Courier Prime", monospace', e.textAlign = "center", e.textBaseline = "middle", ["A", "B", "C", "D", "E", "F"].forEach((c, y) => {
      let w = r + (y + 0.5) * ((n - 2 * r) / 6);
      e.fillText(c, w, r - 12), e.fillText(c, w, t - r + 12);
    }), ["1", "2", "3", "4"].forEach((c, y) => {
      let w = r + (y + 0.5) * ((t - 2 * r) / 4);
      e.fillText(c, r - 12, w), e.fillText(c, n - r + 12, w);
    }), [[r, r], [n - r, r], [r, t - r], [n - r, t - r]].forEach(([c, y]) => {
      e.beginPath(), e.moveTo(c - 10, y), e.lineTo(c + 10, y), e.moveTo(c, y - 10), e.lineTo(c, y + 10), e.stroke();
    });
    let a = n * 0.72, i = t * 0.4;
    e.save(), e.strokeStyle = "rgba(130, 215, 255, 0.55)", e.lineWidth = 1.5, e.setLineDash([12, 4, 3, 4]), e.beginPath(), e.moveTo(a - 170, i), e.lineTo(a + 170, i), e.stroke(), e.beginPath(), e.moveTo(a, i - 150), e.lineTo(a, i + 150), e.stroke(), e.setLineDash([]), e.strokeStyle = "rgba(200, 240, 255, 0.85)", e.lineWidth = 2.4, e.beginPath(), e.arc(a, i, 130, 0, Math.PI * 2), e.stroke(), e.lineWidth = 1.8, e.beginPath(), e.arc(a, i, 85, 0, Math.PI * 2), e.stroke(), e.beginPath(), e.arc(a, i, 42, 0, Math.PI * 2), e.stroke(), e.strokeStyle = "rgba(110, 205, 255, 0.6)", e.lineWidth = 1.2, e.setLineDash([6, 4]), e.beginPath(), e.arc(a, i, 108, 0, Math.PI * 2), e.stroke(), e.setLineDash([]), e.fillStyle = "rgba(8, 25, 45, 0.9)", e.strokeStyle = "rgba(210, 245, 255, 0.9)", e.lineWidth = 1.5;
    for (let c = 0; c < 8; c++) {
      let y = c * Math.PI / 4, w = a + Math.cos(y) * 108, M = i + Math.sin(y) * 108;
      e.beginPath(), e.arc(w, M, 9, 0, Math.PI * 2), e.fill(), e.stroke();
    }
    e.save(), e.beginPath(), e.arc(a, i, 130, Math.PI, Math.PI * 1.5), e.lineTo(a, i), e.closePath(), e.clip(), e.strokeStyle = "rgba(100, 190, 255, 0.35)", e.lineWidth = 1.2;
    for (let c = -150; c < 150; c += 8)
      e.beginPath(), e.moveTo(a + c - 150, i - 150), e.lineTo(a + c + 150, i + 150), e.stroke();
    e.restore(), e.strokeStyle = "rgba(170, 230, 255, 0.7)", e.lineWidth = 1.5, e.fillStyle = "rgba(215, 245, 255, 0.9)", e.font = 'bold 12px "Courier Prime", monospace', e.beginPath(), e.moveTo(a - 130, i + 145), e.lineTo(a + 130, i + 145), e.moveTo(a - 130, i + 135), e.lineTo(a - 130, i + 155), e.moveTo(a + 130, i + 135), e.lineTo(a + 130, i + 155), e.stroke(), e.fillText("<-- \xD8 260.00 mm -->", a, i + 158), e.beginPath(), e.moveTo(a + 30, i - 30), e.lineTo(a + 80, i - 80), e.lineTo(a + 140, i - 80), e.stroke(), e.textAlign = "left", e.fillText("BORE \xD8 42.0 H7", a + 85, i - 86);
    let u = a + 80, s = i - 130;
    e.strokeStyle = "rgba(160, 225, 255, 0.6)", e.lineWidth = 1.2, e.beginPath(), e.arc(u + 40, s, 10, 0, Math.PI * 2), e.stroke(), e.beginPath(), e.arc(u + 40, s, 4, 0, Math.PI * 2), e.stroke(), e.beginPath(), e.moveTo(u, s - 10), e.lineTo(u + 20, s - 5), e.lineTo(u + 20, s + 5), e.lineTo(u, s + 10), e.closePath(), e.stroke(), e.restore();
    let p = 390, d = 135, m = n - r - 6 - p, g = t - r - 6 - d;
    e.fillStyle = "rgba(8, 26, 48, 0.92)", e.fillRect(m, g, p, d), e.strokeStyle = "rgba(170, 235, 255, 0.8)", e.lineWidth = 2, e.strokeRect(m, g, p, d), e.lineWidth = 1.2, e.beginPath(), e.moveTo(m, g + 38), e.lineTo(m + p, g + 38), e.moveTo(m, g + 86), e.lineTo(m + p, g + 86), e.moveTo(m + 240, g + 38), e.lineTo(m + 240, g + d), e.moveTo(m + 120, g + 86), e.lineTo(m + 120, g + d), e.stroke(), e.fillStyle = "rgba(215, 245, 255, 0.95)", e.textAlign = "left", e.font = 'bold 15px "Courier Prime", monospace', e.fillText("AQUILA DYNAMICS \xB7 DEFENSE & NAVAL", m + 14, g + 24), e.font = 'bold 13px "Courier Prime", monospace', e.fillText("VALVE ASSEMBLY \xB7 HIGH PRESSURE", m + 14, g + 58), e.font = '11px "Courier Prime", monospace', e.fillStyle = "rgba(165, 220, 255, 0.85)", e.fillText("DWG NO: AQ-9042-REV-D", m + 14, g + 76), e.fillText("SCALE: 1:25", m + 14, g + 110), e.fillText("SHT 1 OF 1", m + 134, g + 110), e.fillText("DRN: E.M.", m + 252, g + 58), e.fillText("CHK: R.A.", m + 252, g + 76), e.fillStyle = "rgba(100, 255, 180, 0.9)", e.font = 'bold 11px "Courier Prime", monospace', e.fillText("APPROVED", m + 252, g + 110), e.strokeStyle = "rgba(230, 248, 255, 0.22)", e.lineWidth = 2.5, e.beginPath(), e.moveTo(n / 2, r), e.lineTo(n / 2, t - r), e.stroke(), e.beginPath(), e.moveTo(r, t / 2), e.lineTo(n - r, t / 2), e.stroke();
  },
  postcard(e, n, t) {
    e.strokeStyle = "rgba(180, 160, 130, 0.4)", e.lineWidth = 2, e.strokeRect(24, 24, n - 48, t - 48);
  },
  punchcard(e, n, t, f, o) {
    e.save(), e.strokeStyle = "rgba(100, 85, 70, 0.45)", e.lineWidth = 1.5, e.beginPath(), e.moveTo(0, 50), e.lineTo(50, 0), e.stroke(), e.fillStyle = "rgba(40, 85, 130, 0.25)", e.fillRect(0, 0, n, t * 0.16), e.strokeStyle = "rgba(40, 85, 130, 0.55)", e.lineWidth = 2, e.beginPath(), e.moveTo(0, t * 0.16), e.lineTo(n, t * 0.16), e.stroke();
    let r = 34, i = (n - 34 - r) / 79, u = t * 0.23, s = (t * 0.94 - u) / 11, p = (o.text.split(`
`)[0] || "").slice(0, 80);
    e.fillStyle = "rgba(25, 25, 25, 0.92)", e.font = 'bold 15px "Courier Prime", monospace', e.textAlign = "center";
    for (let d = 0; d < p.length; d++)
      p[d] !== " " && e.fillText(p[d], r + d * i, 24);
    e.fillStyle = "rgba(70, 60, 50, 0.65)", e.font = '9px "VT323", monospace';
    for (let d = 1; d <= 80; d++) {
      let m = r + (d - 1) * i;
      (d === 1 || d % 5 === 0) && (e.fillText(String(d), m, t * 0.14), e.fillText(String(d), m, t - 12));
    }
    e.font = '11px "VT323", monospace', e.fillStyle = "rgba(90, 80, 70, 0.45)";
    for (let d = 0; d < 10; d++) {
      let m = u + (d + 2) * s;
      for (let g = 1; g <= 80; g++) {
        let c = r + (g - 1) * i;
        e.fillText(String(d), c, m);
      }
    }
    e.fillStyle = "rgba(80, 70, 60, 0.7)", e.font = 'bold 11px "Courier Prime", monospace', e.fillText("IBM 5081", n - 80, t - 28), e.fillStyle = "rgba(15, 12, 10, 0.45)";
    for (let d = 0; d < p.length; d++) {
      let m = nn(p[d]), g = r + d * i;
      for (let c of m) {
        let y = u + c * s;
        e.fillRect(g - 5, y - 10, 10, 20);
      }
    }
    e.restore();
  },
  shipping(e, n, t) {
    e.strokeStyle = "rgba(70, 50, 30, 0.35)", e.lineWidth = 2, e.strokeRect(30, 30, n - 60, t - 60);
    let f = t - 180, o = n - 140, r = 70;
    e.fillStyle = "#1c1612";
    for (let a = r; a < r + o; ) {
      let i = 2 + a * 17 % 7, u = 3 + a * 31 % 6;
      e.fillRect(a, f, i, 70), a += i + u;
    }
    e.font = 'bold 18px "Courier Prime", monospace', e.textAlign = "center", e.fillText("* EXP-9042-CRUMPLE *", n / 2, f + 100), e.textAlign = "left", e.save(), e.fillStyle = "rgba(50, 35, 20, 0.85)", e.font = "bold 28px sans-serif", e.fillText("\u2191 \u2191  THIS SIDE UP", 60, 80), e.restore();
  },
  kraft(e, n, t, f, o, r) {
    Mt.shipping && Mt.shipping(e, n, t, f, o, r);
  },
  parchment(e, n, t, f, o) {
    o?.seal || on(e, n / 2, t - 140, { symbol: "V", color: "red" });
  },
  ledger(e, n, t) {
    e.strokeStyle = "rgba(60, 110, 85, 0.6)", e.lineWidth = 2.5, e.strokeRect(30, 30, n - 60, t - 60), e.lineWidth = 1, e.strokeRect(34, 34, n - 60 - 8, t - 60 - 8), e.fillStyle = "rgba(235, 246, 238, 0.9)", e.fillRect(36, 36, n - 60 - 12, 110), e.strokeStyle = "rgba(60, 110, 85, 0.4)", e.strokeRect(36, 36, n - 60 - 12, 110), e.fillStyle = "rgba(25, 55, 40, 0.92)", e.textAlign = "center", e.font = 'bold 28px "Courier Prime", monospace', e.fillText("CONTINENTAL MERCANTILE CO. \xB7 GENERAL LEDGER", n / 2, 72), e.font = 'italic 16px "Libre Baskerville", serif', e.fillStyle = "rgba(35, 75, 55, 0.85)", e.fillText("FOLIO NO. 142 \u2014 ACCOUNT OF RECEIPTS & DISBURSEMENTS \u2014 ANNO 1928", n / 2, 102), e.fillRect(70, 118, n - 60 - 80, 2);
    let o = 146, r = t - 30 - 6, a = 210, i = n - 430, u = n - 370, s = n - 250, p = n - 130, d = 42;
    for (let m = o + d, g = 0; m < r; m += d, g++)
      g % 2 === 1 && (e.fillStyle = "rgba(180, 220, 200, 0.15)", e.fillRect(36, m, n - 60 - 12, d)), e.strokeStyle = "rgba(90, 160, 130, 0.35)", e.lineWidth = 1, e.beginPath(), e.moveTo(36, m), e.lineTo(n - 30 - 6, m), e.stroke();
    e.fillStyle = "rgba(40, 90, 65, 0.88)", e.fillRect(36, o, n - 60 - 12, d), e.fillStyle = "#f0f8f2", e.font = 'bold 14px "Courier Prime", monospace', e.textAlign = "center", e.fillText("DATE", (36 + a) / 2, o + 26), e.fillText("PARTICULARS / DESCRIPTION", (a + i) / 2, o + 26), e.fillText("FOL", (i + u) / 2, o + 26), e.fillText("DEBITS ($ | \xA2)", (u + s) / 2, o + 26), e.fillText("CREDITS ($ | \xA2)", (s + p) / 2, o + 26), e.fillText("BALANCE", (p + n - 30 - 6) / 2, o + 26), e.strokeStyle = "rgba(215, 45, 45, 0.65)", e.lineWidth = 1.5, e.beginPath(), e.moveTo(36, o), e.lineTo(36, r), e.stroke(), e.beginPath(), e.moveTo(40, o), e.lineTo(40, r), e.stroke(), e.strokeStyle = "rgba(70, 120, 160, 0.45)", e.lineWidth = 1.2, e.beginPath(), e.moveTo(a, o), e.lineTo(a, r), e.stroke(), e.beginPath(), e.moveTo(i, o), e.lineTo(i, r), e.stroke(), e.strokeStyle = "rgba(215, 45, 45, 0.65)", e.lineWidth = 1.8, e.beginPath(), e.moveTo(u, o), e.lineTo(u, r), e.stroke(), e.beginPath(), e.moveTo(s, o), e.lineTo(s, r), e.stroke(), e.beginPath(), e.moveTo(p, o), e.lineTo(p, r), e.stroke(), e.beginPath(), e.moveTo(p + 3, o), e.lineTo(p + 3, r), e.stroke(), e.strokeStyle = "rgba(60, 110, 190, 0.45)", e.lineWidth = 1, e.beginPath(), e.moveTo(s - 35, o + d), e.lineTo(s - 35, r), e.stroke(), e.beginPath(), e.moveTo(p - 35, o + d), e.lineTo(p - 35, r), e.stroke(), e.beginPath(), e.moveTo(n - 30 - 41, o + d), e.lineTo(n - 30 - 41, r), e.stroke(), e.strokeStyle = "rgba(215, 45, 45, 0.85)", e.lineWidth = 1.5, e.beginPath(), e.moveTo(u, r - 48), e.lineTo(n - 30 - 6, r - 48), e.stroke(), e.beginPath(), e.moveTo(u, r - 12), e.lineTo(n - 30 - 6, r - 12), e.stroke(), e.beginPath(), e.moveTo(u, r - 8), e.lineTo(n - 30 - 6, r - 8), e.stroke();
  },
  carbon(e, n, t, f, o) {
    if (!o?.color) {
      let a = e.createLinearGradient(0, 0, n, t);
      a.addColorStop(0, "rgba(26, 24, 36, 0.95)"), a.addColorStop(0.5, "rgba(22, 20, 32, 0.98)"), a.addColorStop(1, "rgba(18, 16, 26, 0.95)"), e.fillStyle = a, e.fillRect(0, 0, n, t);
    }
    e.save();
    for (let a = 0; a < 6; a++) {
      let i = a % 2 ? n - 60 : 60, u = t * (0.15 + a * 0.15), s = e.createRadialGradient(i, u, 10, i, u, 90);
      s.addColorStop(0, "rgba(90, 80, 150, 0.18)"), s.addColorStop(1, "rgba(20, 18, 30, 0)"), e.fillStyle = s, e.beginPath(), e.arc(i, u, 90, 0, Math.PI * 2), e.fill();
    }
    e.strokeStyle = "rgba(160, 170, 240, 0.35)", e.lineWidth = 1.5, e.setLineDash([4, 6]), e.beginPath(), e.moveTo(30, 40), e.lineTo(n - 30, 40), e.stroke(), e.setLineDash([]), e.fillStyle = "rgba(150, 160, 220, 0.55)", e.font = '11px "Courier Prime", monospace', e.textAlign = "center", e.fillText("\xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7  TEAR ALONG PERFORATION  \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7", n / 2, 34), e.strokeStyle = "rgba(140, 150, 235, 0.45)", e.lineWidth = 2.2, e.strokeRect(36, 56, n - 72, t - 96), e.lineWidth = 1, e.strokeRect(42, 62, n - 84, t - 108), e.fillStyle = "rgba(225, 60, 75, 0.88)", e.font = 'bold 20px "Special Elite", monospace', e.textAlign = "right", e.fillText("\u2116 049182", n - 60, 95), e.fillStyle = "rgba(180, 190, 255, 0.9)", e.textAlign = "left", e.font = 'bold 22px "Courier Prime", monospace', e.fillText("CUSTOMER DUPLICATE RECEIPT", 64, 98), e.font = '12px "Courier Prime", monospace', e.fillStyle = "rgba(140, 155, 230, 0.7)", e.fillText("INTER-OFFICE TRANSFER VOUCHER \xB7 SECOND VIA", 64, 118), e.fillRect(64, 130, n - 128, 2), e.font = '13px "Courier Prime", monospace', e.fillStyle = "rgba(135, 145, 220, 0.65)", [
      ["DATE OF RECORD: ____________________________", 64, 168],
      ["TRANSACTION REF: __________________________", n / 2 + 20, 168],
      ["RECEIVED FROM: __________________________________________________________________", 64, 210],
      ["SUM AMOUNT: ____________________________________________________________________", 64, 252]
    ].forEach(([a, i, u]) => e.fillText(a, i, u)), e.save(), e.translate(n - 220, t - 140), e.rotate(-0.16), e.strokeStyle = "rgba(150, 160, 255, 0.65)", e.lineWidth = 4, e.strokeRect(-110, -32, 220, 64), e.lineWidth = 1.5, e.strokeRect(-104, -26, 208, 52), e.fillStyle = "rgba(150, 160, 255, 0.75)", e.font = 'bold 28px "Courier Prime", monospace', e.textAlign = "center", e.fillText("DUPLICATE", 0, 10), e.restore(), e.restore();
  }
};
function zn(e, n, t, f, o) {
  e.strokeStyle = "rgba(100, 90, 75, 0.4)", e.lineWidth = 2, e.beginPath(), e.moveTo(n / 2, 40), e.lineTo(n / 2, t - 40), e.stroke();
  let r = n - 140, a = 50;
  e.strokeStyle = "rgba(100, 90, 75, 0.5)", e.lineWidth = 1.5, e.setLineDash([4, 4]), e.strokeRect(r, a, 90, 110), e.setLineDash([]), e.fillStyle = "rgba(120, 100, 80, 0.5)", e.font = '12px "Courier Prime", monospace', e.textAlign = "center", e.fillText("AFFIX", r + 45, a + 50), e.fillText("STAMP", r + 45, a + 68), e.strokeStyle = "rgba(40, 50, 80, 0.55)", e.lineWidth = 2, e.beginPath(), e.arc(r - 30, a + 60, 44, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(40, 50, 80, 0.6)", e.font = 'bold 13px "Courier Prime", monospace', e.fillText("POST", r - 30, a + 64), e.textAlign = "left", e.strokeStyle = "rgba(120, 110, 95, 0.4)", e.lineWidth = 1.5;
  for (let i = t * 0.45; i < t - 60; i += 44)
    e.beginPath(), e.moveTo(n / 2 + 40, i), e.lineTo(n - 40, i), e.stroke();
}
function Xn(e, n, t, f, o, r) {
  let a = Math.round(f.flap / f.h * t);
  e.save(), e.translate(n / 2, a * 0.36), e.fillStyle = "rgba(140,20,24,0.95)", e.beginPath();
  for (let s = 0; s <= Math.PI * 2 + 0.01; s += 0.2) {
    let p = 46 * (1 + 0.06 * Math.sin(s * 7 + r() * 0.3));
    s ? e.lineTo(Math.cos(s) * p, Math.sin(s) * p) : e.moveTo(p, 0);
  }
  e.fill(), e.strokeStyle = "rgba(90,10,14,0.8)", e.lineWidth = 3, e.beginPath(), e.arc(0, 0, 30, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(80,8,12,0.9)", e.font = 'bold 30px "Special Elite"', e.textAlign = "center", e.fillText("A", 0, 11), e.restore();
  let i = n - 180, u = a + 40;
  e.fillStyle = "rgba(70,105,140,0.85)", e.fillRect(i, u, 120, 140), e.strokeStyle = "rgba(255,255,255,0.8)", e.setLineDash([4, 4]), e.lineWidth = 3, e.strokeRect(i + 6, u + 6, 108, 128), e.setLineDash([]), e.fillStyle = "rgba(255,255,255,0.9)", e.font = 'bold 44px "Special Elite"', e.textAlign = "center", e.fillText("25", i + 60, u + 88), e.strokeStyle = "rgba(40,40,60,0.55)", e.lineWidth = 3, e.beginPath(), e.arc(i - 30, u + 90, 58, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(40,40,60,0.6)", e.font = '20px "Courier Prime"', e.fillText("POST", i - 30, u + 98);
  for (let s = 0; s < 4; s++)
    e.beginPath(), e.moveTo(i - 120, u + 60 + s * 18), e.bezierCurveTo(i - 60, u + 50 + s * 18, i, u + 70 + s * 18, i + 60, u + 60 + s * 18), e.stroke();
  e.textAlign = "left", e.font = '52px "Caveat"', e.fillStyle = ae(f.ink, 0.9), o.address.split(`
`).forEach((s, p) => e.fillText(s, 150, a + 330 + p * 62));
}
var Yn = [
  ["FOR RENT", "quiet room near the park, morning light. Ask at the front desk."],
  ["FOR SALE", "vintage typewriter, works fine, missing the letter Q."],
  ["WANTED", "night watchman for the old warehouse on the pier."],
  ["FOUND", "small brass key with a red tag. Claim at the bakery."],
  ["LOST", "grey cat, answers to Pixel. Reward offered."],
  ["REPAIRS", "radios and record players, evenings only."],
  ["SWAP", "bicycle bell for anything that does not squeak."]
];
function Vn(e, n, t, f) {
  let a = (n - 88 - 26) / 2;
  e.fillStyle = "rgba(25,25,25,0.9)", e.font = 'bold 34px "Libre Baskerville"', e.fillText("CLASSIFIEDS", 44, 92), e.fillRect(40, 108, n - 88 + 8, 3);
  let i = 44 + a + 26, u = 132, s = Math.round(a * 0.68);
  f.photo && tn(e, f.photo, i, u, a, s), e.font = 'italic 16px "Libre Baskerville"', e.fillText("Old town, archive photo.", i, u + s + 22);
  let p = t - 60, d = [150, u + s + 60], m = 0, g = 44, c = d[0];
  for (let [y, w] of Yn) {
    e.font = '18px "Libre Baskerville"';
    let M = Gn(e, y + " " + w, a);
    if (c + M.length * 24 > p && (m === 1 || (m = 1, g = i, c = d[1], c + M.length * 24 > p)))
      break;
    M.forEach((b, l) => {
      if (l === 0) {
        e.font = 'bold 19px "Libre Baskerville"', e.fillText(y, g, c);
        let S = e.measureText(y + " ").width;
        e.font = '18px "Libre Baskerville"', e.fillText(b.slice(y.length + 1), g + S, c);
      } else
        e.font = '18px "Libre Baskerville"', e.fillText(b, g, c);
      c += 24;
    }), c += 16;
  }
}
var en = {
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
async function Hn(e, n, t, f = "") {
  if (typeof Blob > "u" || typeof URL > "u" || !URL.createObjectURL) return null;
  let o = `<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${t}">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;box-sizing:border-box;margin:0;padding:0;overflow:hidden;${f}">
        ${e}
      </div>
    </foreignObject>
  </svg>`, r = new Blob([o], { type: "image/svg+xml;charset=utf-8" }), a = URL.createObjectURL(r), i = new Image();
  return new Promise((u) => {
    i.onload = () => {
      URL.revokeObjectURL(a), u(i);
    }, i.onerror = () => {
      URL.revokeObjectURL(a), u(null);
    }, i.src = a;
  });
}
async function at(e, n, t, f) {
  let o = Math.round(n.w * St), r = Math.round(n.h * St), a = Se(o, r), i = a.getContext("2d"), u = t === "front", s = oe(e.seed * 31 + (u ? 5 : 9)), p = {};
  n.photo && u && (p.img = await gt(e.image || Le.assets + "photos/sunset.webp")), e.type === "newspaper" && (u || !e.back) && (p.photo = await gt(Le.assets + "photos/" + (u ? "sea" : "city") + ".webp"));
  let d = e.type === "notebook" || e.type === "form" || e.type === "blueprint" || e.type === "ledger";
  Mt[e.type] && (u || d) && Mt[e.type](i, o, r, n, e, p), e.watermark && ao(i, o, r, e.watermark), e.type === "envelope" && !u && Xn(i, o, r, n, e, s), e.type === "postcard" && !u && !e.back && zn(i, o, r, e, s), e.type === "newspaper" && !u && !e.back && Vn(i, o, r, p), (e.type === "parchment" || e.type === "postcard" || e.states.includes("aged")) && io(i, o, r, e, s);
  let m = e.type === "envelope" ? "" : u ? e.text : e.back, g = u ? en[e.type] ? en[e.type](o, r, n) : { x: 50, y: 50, w: o - 100, h: r - 100 } : { x: Math.round(n.x * 0.8), y: Math.min(n.y, Math.round(r * 0.28)), w: o - Math.round(n.x * 1.6), h: r - Math.min(n.y, Math.round(r * 0.28)) - 40, center: e.type === "ticket" };
  e.type === "ticket" && !u && (g.x = Math.round(o * 0.55), g.w = Math.round(o * 0.4)), e.type === "postcard" && !u && (g.x = Math.round(o * 0.54), g.w = Math.round(o * 0.42)), e.type === "polaroid" && !u && (g = { x: 60, y: Math.round(r * 0.3), w: o - 120, h: r * 0.6, center: !0 });
  let c = m && g ? Un(i, e, n, m, g, f, s) : 0;
  if (u && e.rich && g) {
    if (e.rich.mode === "canvas" && typeof e.rich.body == "function")
      try {
        await e.rich.body(i, g, o, r);
      } catch {
      }
    else if (typeof e.rich.body == "string")
      try {
        let w = await Hn(e.rich.body, g.w, g.h, e.rich.style || "");
        w && i.drawImage(w, g.x, g.y);
      } catch {
      }
  }
  let y = oe(e.seed * 17 + (u ? 1 : 2));
  e.states.includes("coffee") && await Kn(a, i, o, r, e, u), e.states.includes("water") && await $n(i, o, r, e, u), e.states.includes("prints") && await jn(i, o, r, e, u), e.states.includes("wine") && await Jn(a, i, o, r, e, u), e.states.includes("ink") && Qn(i, o, r, e, u), e.states.includes("aged") && xn(i, o, r, y), e.states.includes("faded") && Wn(i, o, r, e), e.states.includes("foxing") && eo(i, o, r, e), e.states.includes("staple") && oo(i, o, r, e, u), e.states.includes("clip") && ro(i, o, r, e, u), e.states.includes("grease") && so(i, o, r, e, u), e.states.includes("dogear") && lo(i, o, r, e, u), e.states.includes("damp") && fo(i, o, r, e), e.states.includes("creased") && uo(i, o, r, e);
  for (let w of e.states)
    if (yt[w])
      try {
        await yt[w](i, a, o, r, e, u, y);
      } catch {
      }
  return u && e.seal && on(i, o / 2, r - 140, e.seal), u && e.states.includes("stamp") && to(i, o, r, e, c), u && e.states.includes("tape") && no(i, o, r, e), a;
}
function zt(e, n, t, f, o, r, a, i) {
  e.save(), e.globalCompositeOperation = "multiply", e.globalAlpha = a, e.translate(t, f), i || e.scale(-1, 1), e.rotate(r), e.drawImage(n, -o / 2, -o / 2, o, o), e.restore();
}
async function $n(e, n, t, f, o) {
  let r = await $e("water");
  if (!r) return;
  let a = oe(f.seed * 23 + 4), i = n * (0.25 + 0.5 * a()), u = t * (0.25 + 0.5 * a()), s = Math.min(n, t) * (0.8 + 0.35 * a()), p = a() * Math.PI * 2;
  zt(e, r, o ? i : n - i, u, s, p, o ? 0.85 : 0.6, o);
}
async function jn(e, n, t, f, o) {
  let r = typeof f.wearIntensity == "number" ? f.wearIntensity : 1;
  if (r <= 0) return;
  let a = await $e("prints");
  if (!a) return;
  let i = oe(f.seed * 29 + 6);
  for (let u = 0; u < 2; u++) {
    let s = n * (u ? 0.86 - 0.08 * i() : 0.1 + 0.12 * i()), p = t * (0.72 + 0.2 * i()), d = Math.min(n, t) * (0.22 + 0.08 * i()) * r, m = i() * Math.PI * 2;
    zt(e, a, o ? s : n - s, p, d, m, V((o ? 0.6 : 0.4) * r), o);
  }
}
async function Kn(e, n, t, f, o, r) {
  let a = typeof o.wearIntensity == "number" ? o.wearIntensity : 1;
  if (a <= 0) return;
  let i = oe(o.seed * 17 + 1), u = t * (0.3 + 0.4 * i()), s = f * (0.35 + 0.35 * i()), p = Math.min(t, f) * (0.13 + 0.07 * i()) * a, d = i() * Math.PI * 2, m = r ? u : t - u, g = await $e("coffee");
  if (r) {
    let y = Se(t, f);
    y.getContext("2d").drawImage(e, 0, 0), n.save(), n.beginPath(), n.arc(m, s, p * 1.02, 0, Math.PI * 2), n.clip(), n.clearRect(m - p * 1.1, s - p * 1.1, p * 2.2, p * 2.2), n.filter = "blur(2.5px)", n.globalAlpha = V(0.85 * a), n.drawImage(y, 0, 0), n.restore();
  }
  if (g) {
    zt(n, g, m, s, p * 3.4, d, V((r ? 0.95 : 0.55) * a), r);
    return;
  }
  n.save();
  let c = n.createRadialGradient(m, s, p * 0.1, m, s, p);
  c.addColorStop(0, `rgba(140,95,45,${0.1 * a})`), c.addColorStop(0.82, `rgba(125,82,36,${0.17 * a})`), c.addColorStop(1, "rgba(110,70,30,0)"), n.fillStyle = c, n.beginPath(), n.arc(m, s, p, 0, Math.PI * 2), n.fill();
  for (let y = 0; y < 3; y++) {
    n.strokeStyle = `rgba(100,62,26,${(0.2 + 0.12 * i()) * a})`, n.lineWidth = p * (0.03 + 0.03 * i()), n.beginPath();
    let w = i() * 6.28, M = p * (0.9 + 0.05 * y);
    for (let b = 0; b <= Math.PI * 2 + 0.01; b += 0.05) {
      let l = M * (1 + 0.025 * Math.sin(b * 5 + w) + 0.015 * Math.sin(b * 11 + w * 2));
      b === 0 ? n.moveTo(m + Math.cos(b) * l, s + Math.sin(b) * l) : n.lineTo(m + Math.cos(b) * l, s + Math.sin(b) * l);
    }
    n.stroke();
  }
  for (let y = 0; y < 3; y++) {
    let w = m + (i() - 0.5) * p * 1.2, M = p * (0.6 + i() * 1.2), b = n.createLinearGradient(0, s + p * 0.6, 0, s + p * 0.6 + M);
    b.addColorStop(0, `rgba(115,75,32,${0.16 * a})`), b.addColorStop(1, "rgba(115,75,32,0)"), n.fillStyle = b, n.fillRect(w - 5, s + p * 0.6, 9 + i() * 6, M);
  }
  n.restore();
}
function xn(e, n, t, f) {
  e.save(), e.fillStyle = "rgba(150,110,45,0.08)", e.fillRect(0, 0, n, t);
  let o = e.createRadialGradient(n / 2, t / 2, Math.min(n, t) * 0.3, n / 2, t / 2, Math.max(n, t) * 0.75);
  o.addColorStop(0, "rgba(120,80,30,0)"), o.addColorStop(1, "rgba(120,80,30,0.28)"), e.fillStyle = o, e.fillRect(0, 0, n, t);
  for (let r = 0; r < 34; r++) {
    let a = f() * n, i = f() * t, u = 3 + f() * 14, s = e.createRadialGradient(a, i, 0, a, i, u);
    s.addColorStop(0, `rgba(125,85,40,${0.12 + f() * 0.2})`), s.addColorStop(1, "rgba(125,85,40,0)"), e.fillStyle = s, e.beginPath(), e.arc(a, i, u, 0, Math.PI * 2), e.fill();
  }
  e.restore();
}
async function Jn(e, n, t, f, o, r) {
  let a = typeof o.wearIntensity == "number" ? o.wearIntensity : 1;
  if (a <= 0) return;
  let i = oe(o.seed * 43 + 3), u = t * (0.3 + 0.4 * i()), s = f * (0.4 + 0.3 * i()), p = Math.min(t, f) * (0.1 + 0.04 * i()) * a, d = r ? u : t - u, m = (r ? 1 : 0.5) * a;
  if (r) {
    let c = Se(t, f);
    c.getContext("2d").drawImage(e, 0, 0), n.save(), n.beginPath(), n.arc(d, s, p * 1.04, 0, Math.PI * 2), n.clip(), n.clearRect(d - p * 1.1, s - p * 1.1, p * 2.2, p * 2.2), n.filter = "blur(2px)", n.globalAlpha = V(0.8 * a), n.drawImage(c, 0, 0), n.restore();
  }
  n.save(), n.globalCompositeOperation = "multiply";
  let g = n.createRadialGradient(d, s, p * 0.2, d, s, p * 1.05);
  g.addColorStop(0, `rgba(120,14,38,${0.03 * m})`), g.addColorStop(0.8, `rgba(120,14,38,${0.1 * m})`), g.addColorStop(1, "rgba(90,8,28,0)"), n.fillStyle = g, n.beginPath(), n.arc(d, s, p * 1.05, 0, Math.PI * 2), n.fill(), n.lineCap = "round", n.filter = "blur(0.8px)";
  for (let c = 0; c < 2; c++) {
    let y = i() * 6.28, w = 3.4 + i() * 1.4, M = p * (0.94 + 0.12 * c + 0.03 * i()), b = i() * 6.28, l = (S, k) => {
      let I = (M - k) * (1 + 0.025 * Math.sin(S * 5 + b) + 0.012 * Math.sin(S * 9 + b * 2));
      return [d + Math.cos(S) * I, s + Math.sin(S) * I];
    };
    [[p * 0.22, 0.07, 0.04], [p * 0.07, 0.4, 0], [p * 0.03, 0.16, p * 0.06]].forEach(([S, k, I]) => {
      n.strokeStyle = `rgba(96,12,36,${k * m})`, n.lineWidth = S, n.beginPath();
      for (let L = 0, R = y; R <= y + w; L++, R += 0.04) {
        let U = l(R, I);
        L ? n.lineTo(U[0], U[1]) : n.moveTo(U[0], U[1]);
      }
      n.stroke();
    });
  }
  n.filter = "none";
  for (let c = 0, y = 4 + Math.floor(i() * 4); c < y; c++) {
    let w = i() * 6.28, M = p * (1.35 + i() * 1.1), b = p * (0.02 + 0.035 * i());
    n.fillStyle = `rgba(104,10,30,${0.45 * m})`, n.beginPath(), n.arc(d + Math.cos(w) * M, s + Math.sin(w) * M, b, 0, Math.PI * 2), n.fill(), c % 2 && (n.beginPath(), n.arc(d + Math.cos(w + 0.2) * M * 1.12, s + Math.sin(w + 0.2) * M * 1.12, b * 0.35, 0, Math.PI * 2), n.fill());
  }
  n.restore();
}
function Zn(e, n) {
  let t = [1, 2, 3, 5, 7, 11].map((o) => [o, e() * 6.28, (0.06 + 0.14 * e()) * 2 / o]), f = [];
  for (let o = 0; o < 40; o++) {
    let r = o / 40 * Math.PI * 2, a = 1;
    t.forEach(([i, u, s]) => {
      a += s * Math.sin(i * r + u);
    }), f.push([Math.cos(r) * n * a, Math.sin(r) * n * a]);
  }
  return f;
}
function Gt(e, n, t, f, o) {
  e.beginPath(), n.forEach((r, a) => {
    a ? e.lineTo(t + r[0] * o, f + r[1] * o) : e.moveTo(t + r[0] * o, f + r[1] * o);
  }), e.closePath(), e.fill();
}
function Qn(e, n, t, f, o) {
  let r = typeof f.wearIntensity == "number" ? f.wearIntensity : 1;
  if (r <= 0) return;
  let a = oe(f.seed * 47 + 5), i = Math.min(n, t), u = n * (0.2 + 0.6 * a()), s = t * (0.2 + 0.6 * a()), p = i * (0.03 + 0.015 * a()) * r, d = o ? u : n - u, m = (o ? 1 : 0.5) * r, g = [16, 22, 58], c = Zn(a, p);
  e.save(), e.fillStyle = ae(g, 0.07 * m), Gt(e, c, d, s, 1.45), Gt(e, c, d, s, 1.22), e.fillStyle = ae(g, 0.86 * m), e.filter = "blur(0.5px)", Gt(e, c, d, s, 1), e.filter = "none", e.fillStyle = ae(g, 0.86 * m);
  for (let k = 0, I = 6 + Math.floor(a() * 5); k < I; k++) {
    let L = a() * 6.28, R = p * (1.5 + 2.4 * a()), U = p * (0.16 + 0.14 * a()) * (1.6 - R / (p * 4));
    e.beginPath(), e.arc(d + Math.cos(L) * R, s + Math.sin(L) * R, Math.max(U, 0.8), 0, Math.PI * 2), e.fill();
  }
  let y = a() * 6.28, w = p * (1.6 + 1.2 * a()), M = Math.cos(y), b = Math.sin(y), l = [], S = [];
  for (let k = 0; k <= 10; k++) {
    let I = k / 10, L = p * 0.42 * Math.pow(1 - I, 1.3) * (0.85 + 0.3 * a()), R = p * 0.7 + w * I;
    l.push([M * R - b * L, b * R + M * L]), S.push([M * R + b * L, b * R - M * L]);
  }
  e.fillStyle = ae(g, 0.6 * m), e.beginPath(), l.concat(S.reverse()).forEach((k, I) => {
    I ? e.lineTo(d + k[0], s + k[1]) : e.moveTo(d + k[0], s + k[1]);
  }), e.closePath(), e.fill(), e.strokeStyle = ae(g, 0.28 * m), e.lineWidth = 0.9, e.lineCap = "round";
  for (let k = 0; k < 18; k++) {
    let I = a() * 6.28, L = p * (0.95 + 0.1 * a()), R = L + p * (0.3 + 0.9 * a());
    e.beginPath(), e.moveTo(d + Math.cos(I) * L, s + Math.sin(I) * L), e.lineTo(d + Math.cos(I + 0.05) * R, s + Math.sin(I + 0.05) * R), e.stroke();
  }
  e.restore();
}
function Wn(e, n, t, f) {
  let o = oe(f.seed * 41 + 2), r = Ne(f.seed + 19), a = o() * Math.PI * 2, i = Math.cos(a), u = Math.sin(a), s = 96, p = Math.round(s * t / n), d = Se(s, p, !0), m = d.getContext("2d"), g = m.createImageData(s, p), c = g.data;
  for (let y = 0; y < p; y++) for (let w = 0; w < s; w++) {
    let M = V((w / s - 0.5) * i + (y / p - 0.5) * u + 0.5), b = Math.pow(M, 2.4) * (0.45 + 0.55 * r(w * 0.12, y * 0.12)), l = (y * s + w) * 4;
    c[l] = 165, c[l + 1] = 112, c[l + 2] = 45, c[l + 3] = Math.round(255 * 0.42 * b);
  }
  m.putImageData(g, 0, 0), e.save(), e.imageSmoothingQuality = "high", e.drawImage(d, 0, 0, n, t), e.restore();
}
function eo(e, n, t, f) {
  let o = typeof f.wearIntensity == "number" ? f.wearIntensity : 1;
  if (o <= 0) return;
  let r = oe(f.seed * 61 + 11), a = Math.min(n, t) / 900, i = [[150, 78, 30], [170, 96, 40], [128, 62, 24]];
  e.save(), e.globalCompositeOperation = "multiply";
  for (let u = 0, s = 0; u < 150 && s < 900; s++) {
    let p = r() * n, d = r() * t, m = Math.max(Math.abs(p / n - 0.5), Math.abs(d / t - 0.5)) * 2;
    if (r() > 0.15 + 0.85 * m * m * m) continue;
    u++;
    let g = r() < 0.4, c = a * (g ? 4 + Math.pow(r(), 1.5) * 15 : 1 + Math.pow(r(), 2) * 5) * o, y = i[Math.floor(r() * 3)], w = (0.34 + 0.4 * r()) * o, M = e.createRadialGradient(0, 0, c * (g ? 0 : 0.55), 0, 0, c);
    g ? (M.addColorStop(0, ae(y, w * 0.6)), M.addColorStop(0.55, ae(y, w * 0.4)), M.addColorStop(1, ae(y, 0))) : (M.addColorStop(0, ae(y, w * 0.7)), M.addColorStop(0.85, ae(y, w * 0.8)), M.addColorStop(0.97, ae(y, w * 1.15)), M.addColorStop(1, ae(y, 0))), e.save(), e.translate(p, d), e.rotate(r() * 3.14), e.scale(1, g ? 0.55 + 0.45 * r() : 1), e.fillStyle = M, e.beginPath(), e.arc(0, 0, c, 0, Math.PI * 2), e.fill(), e.restore();
  }
  e.restore();
}
function to(e, n, t, f, o) {
  let r = oe(f.seed * 59 + 9), a = Ne(f.seed + 23), i = typeof f.stamp == "object" && f.stamp ? f.stamp : { text: String(f.stamp || "RECEIVED") }, u = String(i.text || "RECEIVED").toUpperCase(), s = r() < 0.6 ? [176, 26, 36] : [34, 64, 150];
  if (i.color) {
    let R = i.color.toLowerCase().trim();
    if (R === "red") s = [176, 26, 36];
    else if (R === "blue") s = [34, 64, 150];
    else if (R === "purple") s = [128, 32, 140];
    else if (R === "green") s = [34, 128, 50];
    else {
      let U = De(i.color);
      U && (s = U.map((G) => Math.round(G * 255)));
    }
  }
  let p = Se(1, 1).getContext("2d");
  p.font = 'bold 100px "Courier Prime", monospace', p.letterSpacing = "12px";
  let d = p.measureText(u).width / 100, m = n * 0.44, g = m / (d + 1.2), c = g * 2.1, y = -(0.14 + 0.17 * r());
  typeof i.angle == "number" && Number.isFinite(i.angle) && (y = i.angle);
  let w = n * (0.46 + 0.1 * r());
  i.align === "left" ? w = m / 2 + n * 0.08 : i.align === "right" ? w = n - m / 2 - n * 0.08 : i.align === "center" && (w = n / 2);
  let M = Math.min(t - c / 2 - 30, Math.max(t * 0.55, o + c / 2 + 24)), b = Math.ceil(Math.hypot(m, c) + g * 0.8), l = Se(b, b, !0), S = l.getContext("2d");
  S.translate(b / 2, b / 2), S.fillStyle = S.strokeStyle = ae(s, 1), S.textAlign = "center", S.textBaseline = "middle", S.font = `bold ${g}px "Courier Prime", monospace`, S.letterSpacing = g * 0.12 + "px", S.lineWidth = g * 0.13, S.strokeRect(-m / 2, -c / 2, m, c), S.globalAlpha = 0.5, S.lineWidth = g * 0.1, S.strokeRect(-m / 2 + g * 0.07, -c / 2 - g * 0.05, m, c), S.globalAlpha = 1, S.lineWidth = g * 0.05, S.strokeRect(-m / 2 + g * 0.3, -c / 2 + g * 0.3, m - g * 0.6, c - g * 0.6), S.fillText(u, -g * 0.06, g * 0.05);
  let k = S.getImageData(0, 0, b, b), I = k.data, L = b / 2;
  for (let R = 0; R < I.length; R += 4) {
    if (!I[R + 3]) continue;
    let U = R / 4, G = U % b, A = Math.floor(U / b), D = (G - L) / (m / 2), z = (A - L) / (c / 2), Q = 1 - 0.25 * Math.min(1, D * D + z * z), ee = V((a(G / (g * 1.5), A / (g * 1.5)) - 0.25) * 3.2) * Q * (r() < 0.94 ? 1 : 0.3);
    I[R + 3] = Math.round(I[R + 3] * ee);
  }
  S.putImageData(k, 0, 0), e.save(), e.globalCompositeOperation = "multiply", e.globalAlpha = 0.9, e.translate(w, M), e.rotate(y), e.drawImage(l, -b / 2, -b / 2), e.restore();
}
function no(e, n, t, f) {
  let o = oe(f.seed * 53 + 7), r = n * (0.24 + 0.04 * o()), a = n * 0.1;
  [[0.1, 0.05, 0.7], [0.9, 0.05, -0.7]].forEach(([i, u, s]) => {
    let p = n * (i + (o() - 0.5) * 0.03), d = t * (u + (o() - 0.5) * 0.02), m = s + (o() - 0.5) * 0.1;
    e.save(), e.translate(p, d), e.rotate(m);
    let g = [];
    for (let w = 0; w <= 6; w++) g.push([r / 2 - (w % 2 ? 0 : 2 + 4 * o()), -a / 2 + a * w / 6]);
    let c = () => {
      e.beginPath(), e.moveTo(-r / 2, -a / 2), g.forEach((w) => e.lineTo(w[0], w[1])), e.lineTo(-r / 2, a / 2), e.closePath();
    };
    c(), e.fillStyle = "rgba(226,176,96,0.48)", e.fill();
    let y = e.createLinearGradient(0, -a / 2, 0, a / 2);
    y.addColorStop(0, "rgba(255,248,230,0)"), y.addColorStop(0.3, "rgba(255,248,230,0.3)"), y.addColorStop(0.5, "rgba(255,248,230,0.06)"), y.addColorStop(1, "rgba(255,248,230,0)"), e.fillStyle = y, e.fill(), c(), e.strokeStyle = "rgba(140,92,36,0.5)", e.lineWidth = 2, e.stroke(), e.fillStyle = "rgba(140,92,36,0.16)", e.fillRect(-r / 2, -a / 2, r * 0.03, a);
    for (let w = 0, M = 6 + Math.floor(o() * 4); w < M; w++)
      e.fillStyle = `rgba(70,46,22,${0.3 + 0.3 * o()})`, e.beginPath(), e.arc((o() - 0.5) * r * 0.8, (o() - 0.5) * a * 0.7, 1 + 2 * o(), 0, Math.PI * 2), e.fill();
    e.restore();
  });
}
function oo(e, n, t, f, o) {
  let r = oe(f.seed * 71 + 3), a = 54 + r() * 16, i = 48 + r() * 16, u = -0.52 + (r() - 0.5) * 0.15;
  if (e.save(), e.translate(o ? a : n - a, i), e.rotate(o ? u : -u), o) {
    e.fillStyle = "rgba(30, 20, 10, 0.7)", e.fillRect(-22, -3, 5, 6), e.fillRect(17, -3, 5, 6), e.fillStyle = "rgba(10, 10, 10, 0.35)", e.fillRect(-20, 1, 40, 5);
    let s = e.createLinearGradient(0, -3, 0, 3);
    s.addColorStop(0, "#c8cdd4"), s.addColorStop(0.3, "#ffffff"), s.addColorStop(0.7, "#858d99"), s.addColorStop(1, "#535b66"), e.fillStyle = s, e.fillRect(-20, -3, 40, 5), e.fillStyle = "rgba(140, 70, 30, 0.35)", e.fillRect(-8, -2, 6, 3);
  } else
    e.fillStyle = "rgba(30, 20, 10, 0.7)", e.fillRect(-22, -3, 5, 6), e.fillRect(17, -3, 5, 6), e.fillStyle = "#7a828e", e.fillRect(-18, -2, 12, 4), e.fillRect(6, -2, 12, 4);
  e.restore();
}
function ro(e, n, t, f, o) {
  let r = oe(f.seed * 79 + 5), a = n * (0.68 + 0.12 * r()), i = (r() - 0.5) * 0.08, u = Math.min(n, t) * 0.08 + 20, s = 22, p = 14, d = s / 2, m = p / 2;
  e.save(), e.translate(o ? a : n - a, 0), e.rotate(o ? i : -i);
  let g = (c) => {
    e.save(), e.translate(1.5, 2), e.strokeStyle = "rgba(20, 15, 10, 0.28)", e.lineWidth = 4, e.lineCap = "round", e.lineJoin = "round", c(), e.stroke(), e.restore(), e.strokeStyle = "#5a626d", e.lineWidth = 4, e.lineCap = "round", e.lineJoin = "round", c(), e.stroke(), e.strokeStyle = "#c5cbd3", e.lineWidth = 2.8, c(), e.stroke(), e.strokeStyle = "#ffffff", e.lineWidth = 1, c(), e.stroke();
  };
  g(o ? () => {
    e.beginPath(), e.moveTo(d, 0), e.lineTo(d, u - d), e.arc(0, u - d, d, 0, Math.PI, !1), e.lineTo(-d, 0);
  } : () => {
    e.beginPath(), e.moveTo(m, 0);
    let c = u * 0.72;
    e.lineTo(m, c - m), e.arc(0, c - m, m, 0, Math.PI, !1), e.lineTo(-m, 0);
  }), e.restore();
}
function ao(e, n, t, f) {
  if (!f) return;
  let o = typeof f == "string" ? f : f.text || "", r = typeof f == "object" && f.symbol || "";
  if (!o && !r) return;
  let a = n / 2, i = t / 2, u = Math.min(n, t) * 0.22, s = (p, d, m, g) => {
    e.save(), e.translate(a + p, i + d), e.fillStyle = m, e.strokeStyle = g, e.textAlign = "center", e.textBaseline = "middle", e.lineWidth = 2.5, e.beginPath(), e.arc(0, 0, u, 0, Math.PI * 2), e.stroke(), e.lineWidth = 1, e.beginPath(), e.arc(0, 0, u - 12, 0, Math.PI * 2), e.stroke(), r && o ? (e.font = `${Math.round(u * 0.55)}px serif`, e.fillText(r, 0, -u * 0.2), e.font = `bold ${Math.round(u * 0.18)}px "Courier Prime", monospace`, e.letterSpacing = "6px", e.fillText(o.toUpperCase(), 0, u * 0.45)) : r ? (e.font = `${Math.round(u * 0.85)}px serif`, e.fillText(r, 0, 0)) : (e.font = `bold ${Math.max(22, Math.round(u * 0.22))}px "Courier Prime", monospace`, e.letterSpacing = "8px", e.fillText(o.toUpperCase(), 0, 0)), e.restore();
  };
  e.save(), s(-1.5, -1.5, "rgba(255, 255, 255, 0.08)", "rgba(255, 255, 255, 0.12)"), s(1.5, 1.5, "rgba(40, 30, 20, 0.06)", "rgba(40, 30, 20, 0.09)"), s(0, 0, "rgba(120, 110, 100, 0.05)", "rgba(120, 110, 100, 0.07)"), e.restore();
}
function on(e, n, t, f) {
  let o = f && typeof f.symbol == "string" && f.symbol ? f.symbol : "V", r = "rgba(145, 24, 28, 0.95)", a = "rgba(95, 12, 16, 0.85)", i = "rgba(85, 10, 14, 0.95)", u = f?.color;
  if (Array.isArray(u) && u.length === 3) {
    let [s, p, d] = u.map((m) => Math.round(m * 255));
    r = `rgba(${s}, ${p}, ${d}, 0.95)`, a = `rgba(${Math.round(s * 0.65)}, ${Math.round(p * 0.65)}, ${Math.round(d * 0.65)}, 0.85)`, i = `rgba(${Math.round(s * 0.55)}, ${Math.round(p * 0.55)}, ${Math.round(d * 0.55)}, 0.95)`;
  } else if (typeof u == "string") {
    let s = u.toLowerCase().trim();
    if (s === "gold")
      r = "rgba(212, 165, 45, 0.95)", a = "rgba(150, 110, 25, 0.85)", i = "rgba(120, 85, 18, 0.95)";
    else if (s === "burgundy")
      r = "rgba(108, 16, 38, 0.95)", a = "rgba(70, 8, 22, 0.85)", i = "rgba(58, 6, 18, 0.95)";
    else if (s === "red")
      r = "rgba(155, 24, 28, 0.95)", a = "rgba(98, 12, 16, 0.85)", i = "rgba(85, 10, 14, 0.95)";
    else {
      let p = De(u);
      if (p) {
        let [d, m, g] = p.map((c) => Math.round(c * 255));
        r = `rgba(${d}, ${m}, ${g}, 0.95)`, a = `rgba(${Math.round(d * 0.65)}, ${Math.round(m * 0.65)}, ${Math.round(g * 0.65)}, 0.85)`, i = `rgba(${Math.round(d * 0.55)}, ${Math.round(m * 0.55)}, ${Math.round(g * 0.55)}, 0.95)`;
      }
    }
  }
  e.save(), e.save(), e.translate(n + 2, t + 3), e.fillStyle = "rgba(20, 10, 5, 0.3)", e.beginPath();
  for (let s = 0; s <= Math.PI * 2 + 0.01; s += 0.15) {
    let p = 50 * (1 + 0.08 * Math.sin(s * 8));
    s === 0 ? e.moveTo(Math.cos(s) * p, Math.sin(s) * p) : e.lineTo(Math.cos(s) * p, Math.sin(s) * p);
  }
  e.fill(), e.restore(), e.save(), e.translate(n, t), e.fillStyle = r, e.beginPath();
  for (let s = 0; s <= Math.PI * 2 + 0.01; s += 0.15) {
    let p = 48 * (1 + 0.08 * Math.sin(s * 8));
    s === 0 ? e.moveTo(Math.cos(s) * p, Math.sin(s) * p) : e.lineTo(Math.cos(s) * p, Math.sin(s) * p);
  }
  e.fill(), e.strokeStyle = a, e.lineWidth = 3, e.beginPath(), e.arc(0, 0, 32, 0, Math.PI * 2), e.stroke(), e.strokeStyle = "rgba(255, 255, 255, 0.2)", e.lineWidth = 1.5, e.beginPath(), e.arc(-1, -1, 31, Math.PI * 0.8, Math.PI * 1.7), e.stroke(), e.fillStyle = i, e.font = 'bold 32px "Caveat", cursive', e.textAlign = "center", e.textBaseline = "middle", e.fillText(o, 0, 2), e.restore(), e.restore();
}
function io(e, n, t, f, o) {
  e.save(), e.strokeStyle = "rgba(255, 252, 240, 0.45)", e.lineWidth = 1.2;
  let r = (a, i, u, s, p) => {
    e.beginPath(), e.moveTo(a, i), e.lineTo(a + u * p + (o() - 0.5) * 3, i + s * p + (o() - 0.5) * 3), e.stroke();
  };
  for (let a = 4; a < n - 4; a += 4 + o() * 6)
    r(a, 2, (o() - 0.5) * 0.5, 1, 3 + o() * 7), r(a, t - 2, (o() - 0.5) * 0.5, -1, 3 + o() * 7);
  for (let a = 4; a < t - 4; a += 4 + o() * 6)
    r(2, a, 1, (o() - 0.5) * 0.5, 3 + o() * 7), r(n - 2, a, -1, (o() - 0.5) * 0.5, 3 + o() * 7);
  e.restore();
}
function so(e, n, t, f, o) {
  let r = oe(f.seed * 67 + 13), a = n * (0.25 + 0.5 * r()), i = t * (0.3 + 0.45 * r()), u = Math.min(n, t) * (0.12 + 0.08 * r()), s = o ? a : n - a;
  e.save(), e.globalCompositeOperation = "multiply";
  let p = e.createRadialGradient(s, i, u * 0.2, s, i, u);
  p.addColorStop(0, "rgba(140, 120, 70, 0.45)"), p.addColorStop(0.65, "rgba(150, 130, 80, 0.30)"), p.addColorStop(1, "rgba(150, 130, 80, 0)"), e.fillStyle = p, e.beginPath();
  for (let d = 0; d <= Math.PI * 2 + 0.01; d += 0.1) {
    let m = u * (1 + 0.12 * Math.sin(d * 5 + r() * 3));
    d === 0 ? e.moveTo(s + Math.cos(d) * m, i + Math.sin(d) * m) : e.lineTo(s + Math.cos(d) * m, i + Math.sin(d) * m);
  }
  e.fill(), e.restore();
}
function lo(e, n, t, f, o) {
  let r = Math.min(n, t) * 0.15;
  if (e.save(), o) {
    e.fillStyle = "rgba(10, 10, 15, 0.3)", e.beginPath(), e.moveTo(n - r - 8, 0), e.lineTo(n, r + 8), e.lineTo(n - r, r), e.closePath(), e.fill();
    let a = e.createLinearGradient(n - r, 0, n, r);
    a.addColorStop(0, "rgba(235, 225, 210, 0.95)"), a.addColorStop(1, "rgba(195, 185, 170, 0.95)"), e.fillStyle = a, e.beginPath(), e.moveTo(n - r, 0), e.lineTo(n, r), e.lineTo(n - r, r), e.closePath(), e.fill(), e.strokeStyle = "rgba(60, 50, 40, 0.4)", e.lineWidth = 2, e.beginPath(), e.moveTo(n - r, 0), e.lineTo(n, r), e.stroke();
  }
  e.restore();
}
function fo(e, n, t, f) {
  let o = oe(f.seed * 83 + 7);
  e.save(), e.strokeStyle = "rgba(120, 140, 170, 0.12)", e.lineWidth = 3;
  for (let r = 0; r < 6; r++) {
    let a = t * (0.2 + 0.12 * r + 0.04 * o());
    e.beginPath(), e.moveTo(0, a), e.bezierCurveTo(n * 0.33, a + 18 * (o() - 0.5), n * 0.66, a + 18 * (o() - 0.5), n, a), e.stroke();
  }
  e.restore();
}
function uo(e, n, t, f) {
  let o = oe(f.seed * 89 + 11);
  e.save(), e.strokeStyle = "rgba(255, 255, 255, 0.28)", e.lineWidth = 1;
  for (let r = 0; r < 14; r++) {
    let a = o() * n, i = o() * t, u = o() * Math.PI, s = 60 + o() * 120;
    e.beginPath(), e.moveTo(a, i), e.lineTo(a + Math.cos(u) * s, i + Math.sin(u) * s), e.stroke();
  }
  e.restore();
}
function rn(e, n, t) {
  if (!e.hiddenInk) return null;
  let f = Se(n, t, !0), o = f.getContext("2d"), r = Math.round(n * 0.12);
  o.fillStyle = "#fff", o.textAlign = "center", o.filter = "blur(0.7px)", o.font = `${r}px "Caveat", cursive`, o.translate(n / 2, t * 0.7), o.rotate(-0.1), e.hiddenInk.split(`
`).forEach((u, s) => o.fillText(u, 0, s * r * 1.05));
  let a = o.getImageData(0, 0, n, t).data, i = new Float32Array(n * t);
  for (let u = 0; u < t; u++) for (let s = 0; s < n; s++) i[u * n + s] = a[((t - 1 - u) * n + s) * 4 + 3] / 255;
  return i;
}
function xe(e, n, t, f, o) {
  let r = [e, n];
  for (let a = 0; a < f; a++) {
    let i = [r[0]];
    for (let u = 1; u < r.length; u++) {
      let s = r[u - 1], p = r[u], d = (s[0] + p[0]) / 2, m = (s[1] + p[1]) / 2, g = p[0] - s[0], c = p[1] - s[1], y = Math.hypot(g, c), w = (t() - 0.5) * y * o;
      i.push([d - c / y * w, m + g / y * w], p);
    }
    r = i;
  }
  return r;
}
async function Xt(e, n, t = null) {
  let f = Math.round(n.w * St / 2), o = Math.round(n.h * St / 2), r = Se(f, o, !0), a = r.getContext("2d");
  a.fillStyle = "#fff", a.fillRect(0, 0, f, o);
  let i = Se(f, o, !0), u = i.getContext("2d");
  u.fillStyle = "#000", u.fillRect(0, 0, f, o);
  let s = oe(e.seed * 13 + 3);
  if (a.fillStyle = "#000", u.strokeStyle = "#fff", u.lineWidth = 2.2, u.filter = "blur(0.8px)", e.type === "form")
    for (let l = 22; l < o - 6; l += 24) [15, f - 15].forEach((S) => {
      a.beginPath(), a.arc(S, l, 5.5, 0, Math.PI * 2), a.fill();
    });
  if (e.type === "notebook") {
    let l = xe([4, 0], [4, o], s, 7, 0.05);
    a.beginPath(), a.moveTo(0, 0), l.forEach((S) => a.lineTo(S[0] + s() * 2, S[1])), a.lineTo(0, o), a.closePath(), a.fill();
    for (let S = 18; S < o; S += 22)
      a.beginPath(), a.arc(2, S, 5 + s() * 1.5, 0, Math.PI * 2), a.fill();
    u.beginPath(), l.forEach((S, k) => k ? u.lineTo(S[0] + 1, S[1]) : u.moveTo(S[0] + 1, S[1])), u.stroke();
  }
  if (e.type === "envelope") {
    let l = n.flap / n.h * o;
    a.beginPath(), a.moveTo(-2, -2), a.lineTo(f / 2, -2), a.lineTo(f / 2, 3), a.lineTo(-2, l), a.closePath(), a.fill(), a.beginPath(), a.moveTo(f + 2, -2), a.lineTo(f / 2, -2), a.lineTo(f / 2, 3), a.lineTo(f + 2, l), a.closePath(), a.fill();
  }
  if (e.type === "punchcard") {
    a.beginPath(), a.moveTo(-2, -2), a.lineTo(26, -2), a.lineTo(-2, 26), a.closePath(), a.fill();
    let l = (e.text.split(`
`)[0] || "").slice(0, 80), S = 17, I = (f - 17 - S) / 79, L = o * 0.23, R = (o * 0.94 - L) / 11;
    for (let U = 0; U < l.length; U++) {
      let G = nn(l[U]), A = S + U * I;
      for (let D of G) {
        let z = L + D * R;
        a.fillRect(A - 2.5, z - 5, 5, 10);
      }
    }
  }
  if (e.type === "parchment" || e.type === "postcard" || e.states.includes("aged")) {
    let l = xe([-2, 3], [f + 2, 3], s, 5, 0.12), S = xe([-2, o - 3], [f + 2, o - 3], s, 5, 0.12), k = xe([3, -2], [3, o + 2], s, 5, 0.12), I = xe([f - 3, -2], [f - 3, o + 2], s, 5, 0.12);
    u.lineWidth = 2.2, [l, S, k, I].forEach((G) => {
      u.beginPath(), G.forEach((A, D) => D ? u.lineTo(A[0], A[1]) : u.moveTo(A[0], A[1])), u.stroke();
    }), u.lineWidth = 1;
    let L = Se(32, 32), R = L.getContext("2d");
    R.strokeStyle = "#fff", R.lineWidth = 1, R.filter = "blur(0.8px)";
    let U = (G, A, D, z, Q) => {
      let ee = G + D * Q + (s() - 0.5) * 2, ye = A + z * Q + (s() - 0.5) * 2, ge = Math.floor(Math.min(G, ee)) - 8, me = Math.floor(Math.min(A, ye)) - 8;
      R.clearRect(0, 0, 32, 32), R.beginPath(), R.moveTo(G - ge, A - me), R.lineTo(ee - ge, ye - me), R.stroke(), u.save(), u.filter = "none", u.drawImage(L, ge, me), u.restore();
    };
    for (let G = 2; G < f - 2; G += 3 + s() * 4)
      U(G, 2, (s() - 0.5) * 0.6, 1, 2 + s() * 4), U(G, o - 2, (s() - 0.5) * 0.6, -1, 2 + s() * 4);
    for (let G = 2; G < o - 2; G += 3 + s() * 4)
      U(2, G, 1, (s() - 0.5) * 0.6, 2 + s() * 4), U(f - 2, G, -1, (s() - 0.5) * 0.6, 2 + s() * 4);
  }
  if (e.states.includes("torn")) {
    let l = Math.floor(s() * 3), S, k, I;
    l === 0 ? (S = [f * (0.5 + 0.25 * s()), -2], k = [f + 2, o * (0.2 + 0.25 * s())], I = [[f + 2, -2]]) : l === 1 ? (S = [-2, o * (0.72 + 0.12 * s())], k = [f + 2, o * (0.72 + 0.12 * s())], I = [[f + 2, o + 2], [-2, o + 2]]) : (S = [f * (0.3 + 0.25 * s()), o + 2], k = [-2, o * (0.55 + 0.2 * s())], I = [[-2, o + 2]]);
    let L = xe(S, k, s, 8, 0.22);
    a.beginPath(), L.forEach((R, U) => U ? a.lineTo(R[0], R[1]) : a.moveTo(R[0], R[1])), I.forEach((R) => a.lineTo(R[0], R[1])), a.closePath(), a.fill(), u.lineWidth = 3.2, u.beginPath(), L.forEach((R, U) => U ? u.lineTo(R[0], R[1]) : u.moveTo(R[0], R[1])), u.stroke();
  }
  let d = a.getImageData(0, 0, f, o).data, m = u.getImageData(0, 0, f, o).data, g = t ? await Et.run("burn", [{ seed: e.seed, form: t === "singed" ? "singed" : e.burn }, f, o]) : null, c = a.createImageData(f, o), y = c.data, w = [], M = 1 / 0;
  for (let l = 0; l < o; l++) for (let S = 0; S < f; S++) {
    let k = (l * f + S) * 4;
    if (y[k] = d[k], y[k + 1] = 0, y[k + 2] = m[k], g) {
      let I = g[l * f + S];
      y[k + 3] = Math.round(V(I / 1.4) * 255), M = Math.min(M, I), t === "burn" && S % 3 === 0 && l % 3 === 0 && d[k] > 128 && w.push((S + 0.5) / f, 1 - (l + 0.5) / o, I);
    } else y[k + 3] = 255;
  }
  let b = Se(f, o);
  return b.getContext("2d").putImageData(c, 0, 0), { canvas: b, burnPts: t === "burn" ? new Float32Array(w) : null, lo: g ? Math.max(0, M) : 0 };
}

// .build/shaders.js
var an = `#version 300 es
precision highp float;in vec2 aXY;uniform sampler2D uH;uniform int uShape;uniform float uP,uK0,uKres,uA0,uAres,uScale,uSeedA,uSquash,uRoll,uCurl,uTear,uStubX,uIsStub,uFoldSide,uFoldBw,uFoldY,uEdge,uThick;uniform vec2 uHalf;uniform mat4 uModel,uProj;out vec3 vPos;out vec3 vNrm;out vec2 vUv;out float vE;out float vAmp;out float vStress;float Hf(vec2 xy){return textureLod(uH,xy/(2.0*uHalf)+0.5,0.0).r;}vec3 rotY(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x+s*v.z,v.y,-s*v.x+c*v.z);}vec3 rotZ(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x-s*v.y,s*v.x+c*v.y,v.z);}vec3 bend(float d,float th,float bw){float t=max(abs(th),1e-4),R=bw/t,L=R*t;if(d<L){float a=d/R;return vec3(R*sin(a),R*(1.0-cos(a)),a);}return vec3(R*sin(t)+(d-L)*cos(t),R*(1.0-cos(t))+(d-L)*sin(t),t);}float foldStress(vec2 xy){float bw=max(uFoldBw,0.008);if(uShape==3){return max(smoothstep(bw*2.2,0.0,abs(xy.x)),smoothstep(bw*3.2,0.0,abs(xy.y)));}else if(uShape==4){return smoothstep(bw*2.2,0.0,abs(xy.x));}else if(uShape==5){float y3=uHalf.y/3.0;return max(smoothstep(bw*2.2,0.0,abs(xy.y+y3*1.08)),smoothstep(bw*3.2,0.0,abs(xy.y-y3)));}else if(uShape==6){return smoothstep(bw*2.2,0.0,abs(xy.y-uFoldY));}else if(uShape==7){float x3=uHalf.x*0.333;return max(smoothstep(bw*2.2,0.0,abs(xy.x+x3)),max(smoothstep(bw*2.6,0.0,abs(xy.x)),smoothstep(bw*3.2,0.0,abs(xy.x-x3))));}else if(uShape==8){return max(smoothstep(bw*2.2,0.0,abs(xy.x)),smoothstep(bw*2.6,0.0,abs(xy.y)));}return 0.0;}void foldX(inout vec3 p,inout vec3 n,float x0,float s,float th,float bw){float d=(p.x-x0)*s;if(d<=0.0||abs(th)<1e-4)return;vec3 c=bend(d,th,bw);float g=sign(th),ca=cos(c.z),sa=g*sin(c.z),z0=p.z;p.x=x0+s*(c.x-sa*z0);p.z=g*c.y+ca*z0;n=vec3(ca*n.x-s*sa*n.z,n.y,s*sa*n.x+ca*n.z);}void foldY(inout vec3 p,inout vec3 n,float y0,float s,float th,float bw){float d=(p.y-y0)*s;if(d<=0.0||abs(th)<1e-4)return;vec3 c=bend(d,th,bw);float g=sign(th),ca=cos(c.z),sa=g*sin(c.z),z0=p.z;p.y=y0+s*(c.x-sa*z0);p.z=g*c.y+ca*z0;n=vec3(n.x,ca*n.y-s*sa*n.z,s*sa*n.y+ca*n.z);}vec3 place(vec2 xy,out float e,out float amp,out vec3 n){vec3 p=vec3(xy,0.0);n=vec3(0.0,0.0,1.0);if(uShape==0){float s=length(xy),sn=s/length(uHalf);float q=clamp(uP*1.5-sn*0.5+0.14*sn*sin(atan(xy.y,xy.x)*3.0+uSeedA),0.0,1.0);e=q*q*(3.0-2.0*q);float k=mix(uKres,uK0,(1.0-e)*(1.0-e));if(s>1e-6){float th=s*k,st=sin(th),ct=cos(th);vec2 dir=xy/s;n=vec3(st*dir,ct);p=vec3(st/k*dir,(ct-1.0)/k);}float sq=mix(uSquash,1.0,e);float expan=mix(1.0+(1.0-uSquash)*0.3,1.0,e);p.z*=sq;p.xy*=expan;n=normalize(vec3(n.xy/expan,n.z/sq));amp=mix(uA0,uAres,pow(e,2.2));}else if(uShape==1){e=uP;float L=2.0*uHalf.x*e,s=xy.x+uHalf.x;if(s>L){float ph=(s-L)/uRoll;float r=uRoll*(1.0-0.07*ph/6.2831853);p=vec3(L-uHalf.x+r*sin(ph),xy.y,r*(1.0-cos(ph)));n=vec3(-sin(ph),0.0,cos(ph));}p.x+=(uHalf.x-uRoll)*(1.0-e);amp=mix(uA0,uAres,e);}else if(uShape==2){e=uP;float k=uK0*(1.0-e)*(1.0-e);if(k>1e-2){float a=(xy.y+uHalf.y)*k;float r=1.0/k-uRoll*a/6.2831853;vec2 ax=vec2(-uHalf.y,-1.0/k);p=vec3(xy.x,ax.x+r*sin(a),ax.y+r*cos(a));n=vec3(0.0,sin(a),cos(a));float g=pow(1.0-e,3.0);float axv=abs(xy.x)/uHalf.x;float neck=smoothstep(0.5,0.8,axv),fl=smoothstep(0.82,1.0,axv);float sc=mix(1.0,mix(1.0,0.17*(1.0+3.2*fl),neck),g);float tw=sign(xy.x)*(neck*3.4+fl*1.3)*g;float c=cos(tw),sn=sin(tw);vec2 rv=(p.yz-ax)*sc;p.yz=ax+vec2(c*rv.x-sn*rv.y,sn*rv.x+c*rv.y);n.yz=vec2(c*n.y-sn*n.z,sn*n.y+c*n.z);n=normalize(n);}p.y+=uHalf.y*(1.0-e);p.z+=(1.0/uK0)*(1.0-e);amp=mix(uA0,uAres,e);}else if(uShape==6){e=uP;foldY(p,n,uFoldY,1.0,mix(3.12,-1.1,smoothstep(0.0,1.0,e)),uFoldBw);p.y-=(uFoldY-uHalf.y)*0.5;amp=mix(uA0,uAres,e);}else if(uShape==7){e=uP;float em=smoothstep(0.0,1.0,e);float a=3.12*(1.0-em);float x3=uHalf.x*0.333;foldX(p,n,-x3,-1.0,a,uFoldBw);foldX(p,n,0.0,1.0,-a,uFoldBw*1.5);foldX(p,n,x3,1.0,a,uFoldBw*2.0);p.x*=mix(0.28,1.0,em);amp=mix(uA0,uAres,e);}else if(uShape==8){e=uP;float em=smoothstep(0.0,1.0,e);float a=3.12*(1.0-em);foldX(p,n,0.0,1.0,a,uFoldBw);foldY(p,n,0.0,-1.0,a,uFoldBw*1.5);p.xy*=mix(0.58,1.0,em);amp=mix(uA0,uAres,e);}else{e=uP;float e2=smoothstep(0.0,0.5,e),e1=smoothstep(0.5,1.0,e);if(uShape==3){foldX(p,n,0.0,1.0,3.12*(1.0-e1),uFoldBw);foldY(p,n,0.0,1.0,3.12*(1.0-e2),uFoldBw*2.6);p.x+=uHalf.x*0.5*(1.0-e1);p.y+=uHalf.y*0.5*(1.0-e2);}else if(uShape==4){float em=smoothstep(0.0,1.0,e);foldX(p,n,0.0,uFoldSide,3.12*(1.0-em),uFoldBw);p.x+=uFoldSide*uHalf.x*0.5*(1.0-em);}else{float y3=uHalf.y/3.0;foldY(p,n,-y3*1.08,-1.0,3.12*(1.0-e1),uFoldBw);foldY(p,n,y3,1.0,3.12*(1.0-e2),uFoldBw*2.6);}amp=mix(uA0,uAres,e);}p+=n*Hf(xy)*amp;if(uIsStub>0.5&&uTear>0.0){vec3 piv=vec3(uStubX,0.0,0.0);p=rotY(rotZ(p-piv,-0.55*uTear),0.6*uTear)+piv+vec3(0.08*uTear,-1.1*uTear*uTear,0.12*uTear);n=rotY(rotZ(n,-0.55*uTear),0.6*uTear);}p.z-=uCurl*p.x*p.x;n=normalize(vec3(n.x+2.0*uCurl*p.x*n.z,n.y,n.z));return p;}void main(){float e,amp;vec3 nrm;vec3 p0=place(aXY,e,amp,nrm);if(uEdge>0.5)p0-=nrm*uThick*(nrm.z>=0.0?1.0:-1.0);vec4 w=uModel*vec4(p0,1.0);vPos=w.xyz;vNrm=mat3(uModel)*nrm;vUv=aXY/(2.0*uHalf)+0.5;vE=uShape==0?pow(e,2.2):e;vAmp=amp*uScale;vStress=foldStress(aXY);gl_Position=uProj*w;}`, sn = `#version 300 es
precision highp float;in vec3 vPos;in vec3 vNrm;in vec2 vUv;in float vE;in float vAmp;in float vStress;uniform sampler2D uH,uPrintF,uPrintB,uFx,uGrain;uniform vec2 uGrainK;uniform vec3 uCam,uColor,uL,uLampPos;uniform float uBump,uAge,uTime,uThru,uFront,uInkMax,uEdge,uDestroy,uLamp,uLampR;out vec4 frag;float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}vec3 perturb(vec3 pos,vec3 n,vec2 dH){vec3 sx=dFdx(pos),sy=dFdy(pos);vec3 r1=cross(sy,n),r2=cross(n,sx);float det=dot(sx,r1);return normalize(abs(det)*n-sign(det)*(dH.x*r1+dH.y*r2));}void main(){vec4 fx=texture(uFx,vUv);float pres=fx.r,sc=0.0;if(uFront>-0.5){float b=fx.a*1.4;pres=min(pres,smoothstep(uFront-0.004,uFront+0.012,b));sc=1.0-smoothstep(uFront,uFront+0.17,b);}if(pres<0.4)discard;float a=smoothstep(0.4,0.6,pres);bool front=gl_FrontFacing;vec3 n=normalize(vNrm)*(front?1.0:-1.0);vec3 L=normalize(uL);if(uEdge>0.5){float w=clamp((dot(n,L)+0.3)/1.3,0.0,1.0);vec3 ec=mix(uColor*vec3(0.8,0.76,0.7),vec3(0.08,0.06,0.05),smoothstep(0.55,0.9,sc))*(0.45+0.55*w);frag=vec4(ec*a,a);return;}vec4 h0=texture(uH,vUv);vec2 du=dFdx(vUv),dv=dFdy(vUv);vec4 hx=texture(uH,vUv+du),hy=texture(uH,vUv+dv);vec4 hx2=texture(uH,vUv-du),hy2=texture(uH,vUv-dv);vec3 toP=uLampPos-vPos;vec3 Lp=normalize(toP);float pool=pow(1.0-smoothstep(0.0,1.0,length(toP.xy)/uLampR),1.3)*uLamp;float grazD=clamp((1.0-L.z-0.4)/0.5,0.0,1.0);float grazP=smoothstep(0.2,0.75,1.0-Lp.z)*pool;float ink=uInkMax*mix(grazD,grazP*3.0,uLamp);vec2 dH=vec2(hx.r-h0.r,hy.r-h0.r)*vAmp*uBump*(1.0+1.6*pool)-vec2(hx.g-h0.g,hy.g-h0.g)*ink;n=perturb(vPos,n,dH);vec3 V=normalize(uCam-vPos);float wrap=clamp((dot(n,L)+0.08)/1.08,0.0,1.0);float wrapP=max(dot(n,Lp),0.0);float backL=max(0.0,-dot(n,L));float backLp=max(0.0,-dot(n,Lp))*pool;float backlight=backL+backLp*1.8;float ao=mix(1.0,0.42+0.58*smoothstep(-0.55,0.35,h0.r),1.0-vE);float fib=hash(floor(vUv*vec2(900.0,1180.0)));vec2 eu=min(vUv,1.0-vUv);float edge=smoothstep(0.0,0.05,min(eu.x,eu.y));vec3 col0=mix(uColor,uColor*vec3(0.93,0.84,0.66),uAge);vec3 alb=col0*(0.975+0.025*fib)*(0.93+0.07*edge);alb*=1.0+(texture(uGrain,vUv*uGrainK).r-0.94)*1.8;if(!front)alb*=0.9;float ridgeCurv=max(0.0,-((hx.r+hx2.r-2.0*h0.r)+(hy.r+hy2.r-2.0*h0.r)));float creaseStress=clamp(ridgeCurv*vAmp*140.0,0.0,1.0);float totalStress=clamp(vStress*0.75+creaseStress*0.6,0.0,1.0);float whitening=smoothstep(0.12,0.82,totalStress)*0.28;vec3 bleachCol=mix(vec3(0.985,0.98,0.96),vec3(1.0),fib*0.5);alb=mix(alb,max(alb,bleachCol),whitening);vec2 uvB=vec2(1.0-vUv.x,vUv.y),duB=vec2(-du.x,du.y),dvB=vec2(-dv.x,dv.y);vec4 pr,th=vec4(0.0);if(front)pr=textureGrad(uPrintF,vUv,du,dv);else pr=textureGrad(uPrintB,uvB,duB,dvB);float thruFactor=clamp(uThru*(1.0+3.2*backlight),0.0,0.92);if(uThru!=0.0){if(front)th=textureGrad(uPrintB,uvB,duB,dvB);else th=textureGrad(uPrintF,vUv,du,dv);vec3 inkSilhouette=mix(th.rgb,th.rgb*0.3+vec3(0.02),clamp(backlight*1.5,0.0,0.8));alb=mix(alb,inkSilhouette,th.a*thruFactor);alb+=col0*(uThru*(backL*0.4+backLp*0.7))*(1.0-th.a*0.85);}alb=mix(alb,pr.rgb,pr.a);alb=mix(alb,vec3(0.45,0.29,0.13),smoothstep(0.12,0.55,sc)*0.85);alb=mix(alb,vec3(0.06,0.045,0.04),smoothstep(0.55,0.9,sc));alb=mix(alb,vec3(0.99,0.985,0.96),fx.b*0.85);vec3 key=vec3(1.0,0.965,0.9),amb=vec3(0.62,0.64,0.7);vec3 warm=vec3(1.0,0.9,0.74);vec3 base=amb*0.3*ao+key*1.04*wrap*mix(1.0,ao,0.7)*mix(1.0,0.55,uLamp);base+=key*0.45*backL*uThru*mix(1.0,ao,0.5);float spot=wrapP*pool*mix(1.0,ao,0.5);vec3 col=alb*(base+warm*spot*max(vec3(0.0),vec3(1.15)-base));col+=key*0.03*pow(max(dot(n,normalize(L+V)),0.0),24.0)*(1.0-0.5*uLamp);col+=warm*0.06*pow(max(dot(n,normalize(Lp+V)),0.0),30.0)*pool;float rim=(1.0-smoothstep(0.42,0.66,pres))*smoothstep(0.6,0.95,sc);float fl=0.55+0.45*sin(uTime*6.0+vUv.x*37.0+vUv.y*23.0)*sin(uTime*2.3+vUv.y*51.0);col+=vec3(1.0,0.42,0.08)*rim*fl*(1.7+1.6*uDestroy);frag=vec4(col*a,a);}`, ln = `#version 300 es
in vec2 aQ;uniform vec3 uC;uniform vec2 uHS;uniform float uSoft;uniform mat4 uProj;out vec2 vL;void main(){vL=aQ*(uHS+vec2(uSoft*3.0));gl_Position=uProj*vec4(uC+vec3(vL,0.0),1.0);}`, fn = `#version 300 es
precision highp float;in vec2 vL;uniform vec2 uHS;uniform float uR,uSoft,uA,uOpen,uFront,uFlip;uniform sampler2D uFx;out vec4 frag;float paperAt(vec2 uv){vec4 fx=texture(uFx,clamp(uv,0.0,1.0));return uFront>-0.5?min(fx.r,smoothstep(uFront-0.004,uFront+0.012,fx.a*1.4)):fx.r;}void main(){vec2 q=abs(vL)-uHS+vec2(uR);float d=length(max(q,0.0))+min(max(q.x,q.y),0.0)-uR;float pres=1.0;if(uOpen>0.0){vec2 uv=vL/(2.0*uHS)+0.5,o=vec2(uSoft)/(2.0*uHS);if(uFlip>0.5)uv.x=1.0-uv.x;float p=paperAt(uv)*2.0+paperAt(uv+vec2(o.x,0.0))+paperAt(uv-vec2(o.x,0.0))+paperAt(uv+vec2(0.0,o.y))+paperAt(uv-vec2(0.0,o.y));pres=mix(1.0,p/6.0,uOpen);}frag=vec4(0.0,0.0,0.0,uA*pres*(1.0-smoothstep(-uSoft,uSoft*2.5,d)));}`, un = `#version 300 es
in vec3 aP;in vec4 aC;in float aS;uniform mat4 uProj;uniform float uPx;out vec4 vC;void main(){gl_Position=uProj*vec4(aP,1.0);gl_PointSize=max(1.0,aS*uPx/gl_Position.w);vC=aC;}`, pn = `#version 300 es
precision highp float;in vec4 vC;out vec4 frag;void main(){float a=smoothstep(0.5,0.05,length(gl_PointCoord-0.5))*vC.a;frag=vec4(vC.rgb*a,a);}`;

// .build/sound.js
var dn = {
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
  ledger: { freq: 420, q: 2.4, gain: 3.5 },
  fax: { freq: 610, q: 1.8, gain: 3.9 },
  cyanotype: { freq: 300, q: 3.1, gain: 3 },
  manuscript: { freq: 340, q: 2.8, gain: 3.2 },
  market: { freq: 640, q: 1.8, gain: 3.9 }
};
function po(e) {
  let n = Math.max(30, Math.min(350, e));
  if (n <= 80) {
    let r = (80 - n) / 50;
    return {
      freq: Math.round(420 + r * 260),
      q: +(2.4 - r * 0.6).toFixed(2),
      gain: +(3.5 + r * 0.5).toFixed(2)
    };
  }
  let t, f;
  if (n <= 160) {
    let r = (n - 80) / 80;
    t = Math.round(420 - r * 80), f = +(2.4 + r * 0.4).toFixed(2);
  } else {
    let r = Math.min(1, (n - 160) / 140);
    t = Math.round(340 - r * 60), f = +(2.8 + r * 0.4).toFixed(2);
  }
  let o = +(3.5 - Math.min(1, (n - 80) / 220) * 0.5).toFixed(2);
  return { freq: t, q: f, gain: o };
}
function ho(e) {
  if (!e) return { freq: 420, q: 2.4, gain: 3.5 };
  typeof e == "string" ? e = { type: e } : typeof e == "number" && (e = { gsm: e });
  let n;
  e.gsm !== void 0 && Number.isFinite(e.gsm) ? n = po(e.gsm) : e.type && dn[e.type] ? n = dn[e.type] : n = { freq: 420, q: 2.4, gain: 3.5 };
  let t = Number.isFinite(e.gain) ? e.gain : n.gain;
  return Number.isFinite(e.volume) && (t = +(t * e.volume).toFixed(2)), {
    freq: Number.isFinite(e.freq) ? e.freq : n.freq,
    q: Number.isFinite(e.q) ? e.q : n.q,
    gain: t
  };
}
var ie = /* @__PURE__ */ (() => {
  let e = null, n = null, t = null, f = null, o = null, r = { freq: 420, q: 2.4, gain: 3.5 }, a = be.get("sound", !1), i = {}, u = {};
  function s(M, b) {
    if (r = { ...M }, t && e) {
      let l = b !== void 0 ? b : e.currentTime;
      l > e.currentTime ? (t.frequency.setValueAtTime(r.freq, l), t.Q.setValueAtTime(r.q, l), t.gain.setValueAtTime(r.gain, l)) : (t.frequency.setValueAtTime(r.freq, e.currentTime), t.frequency.value = r.freq, t.Q.setValueAtTime(r.q, e.currentTime), t.Q.value = r.q, t.gain.setValueAtTime(r.gain, e.currentTime), t.gain.value = r.gain);
    }
    return r;
  }
  function p(M, b) {
    return s(ho(M), b);
  }
  let d = () => {
    if (!e) {
      let M = window.AudioContext || window.webkitAudioContext;
      if (!M) return null;
      e = new M(), n = e.createGain(), n.gain.value = 0.6, t = e.createBiquadFilter(), t.type = "peaking", t.frequency.value = r.freq, t.Q.value = r.q, t.gain.value = r.gain, n.connect(t), t.connect(e.destination), f = e.createBuffer(1, e.sampleRate, e.sampleRate);
      let b = f.getChannelData(0), l = 0, S = 0;
      for (let k = 0; k < b.length; k++) {
        let I = Math.random() * 2 - 1;
        l = 0.99 * l + I * 0.05, S = 0.95 * S + I * 0.1, b[k] = (l + S + I * 0.15) * 1.6;
      }
    }
    return e.state === "suspended" && e.resume(), e;
  };
  function m() {
    return o || !e || (o = Promise.all(Object.entries(i).map(([M, b]) => fetch(b).then((l) => l.ok ? l.arrayBuffer() : Promise.reject(new Error(M))).then((l) => e.decodeAudioData(l)).then((l) => {
      u[M] = l;
    }).catch(() => {
    })))), o;
  }
  function g(M, b, l = {}) {
    let S = u[M];
    if (!S) return !1;
    let k = e.createBufferSource();
    k.buffer = S, k.playbackRate.value = l.rate || 1;
    let I = e.createGain();
    return I.gain.value = l.gain ?? 1, k.connect(I), I.connect(n), k.start(b, l.offset || 0, l.dur), !0;
  }
  function c(M, b, l, S, k) {
    let I = e.createBufferSource();
    I.buffer = f;
    let L = e.createBiquadFilter();
    L.type = "bandpass", L.frequency.value = l, L.Q.value = S;
    let R = e.createGain();
    R.gain.setValueAtTime(1e-4, M), R.gain.linearRampToValueAtTime(k, M + 2e-3), R.gain.exponentialRampToValueAtTime(1e-4, M + b), I.connect(L), L.connect(R), R.connect(n), I.start(M, Math.random() * 0.9, b + 0.03);
  }
  function y(M, b, l, S, k) {
    let I = e.createBufferSource();
    I.buffer = f, I.loop = !0;
    let L = e.createBiquadFilter();
    L.type = "bandpass", L.Q.value = 0.8, L.frequency.setValueAtTime(l, M), L.frequency.linearRampToValueAtTime(S, M + b);
    let R = e.createGain();
    R.gain.setValueAtTime(1e-4, M), R.gain.linearRampToValueAtTime(k, M + b * 0.15), R.gain.linearRampToValueAtTime(1e-4, M + b), I.connect(L), L.connect(R), R.connect(n), I.start(M), I.stop(M + b + 0.05);
  }
  function w(M, b, l, S, k, I) {
    let L = Math.round(b * l);
    for (let R = 0; R < L; R++) {
      let U = Math.random();
      I && (U = U * U), c(M + U * b, 6e-3 + Math.random() * 0.03, 1500 + Math.random() * 4500 * S, 0.7 + Math.random() * 2.2, k * (0.25 + Math.random() * 0.75));
    }
  }
  return {
    get enabled() {
      return a;
    },
    get tuning() {
      return { ...r };
    },
    set(M) {
      a = !!M, be.set("sound", a), a && d() && m();
    },
    // optional real recordings: { crumple, sheet, tear } (URLs)
    useSamples(M) {
      i = { ...M }, o = null, a && e && m();
    },
    tune(M) {
      return p(M);
    },
    // names: crumple, uncrumple, flip, tear, seal, fire, grain
    play(M, b = 1, l = 0, S) {
      if (typeof b == "object" && b !== null ? (S = b, b = 1, l = 0) : typeof b == "string" ? (S = { type: b }, b = 1, l = 0) : typeof l == "object" && l !== null ? (S = l, l = 0) : typeof l == "string" && (S = { type: l }, l = 0), typeof S == "string" ? S = { type: S } : typeof S == "number" && (S = { gsm: S }), S && p(S, l > 0 && e ? e.currentTime + l : void 0), !a || !d()) return;
      m();
      let k = e.currentTime + l, I = (L) => !!u[L];
      if (M === "crumple")
        if (I("crumple")) {
          let L = Math.max(2, Math.round(b * 4));
          for (let R = 0; R < L; R++) g("crumple", k + R / L * b * 0.85, { gain: 0.6 + Math.random() * 0.35, rate: 0.85 + Math.random() * 0.35 });
          w(k, b, 25, 1, 0.1, !0);
        } else
          w(k, b, 90, 1, 0.32, !0), y(k, b, 2400, 1200, 0.07);
      else if (M === "uncrumple")
        if (I("sheet")) {
          let L = Math.max(2, Math.round(b * 2.5));
          for (let R = 0; R < L; R++) g(R % 2 && I("crumple") ? "crumple" : "sheet", k + R / L * b * 0.9, { gain: 0.4 + Math.random() * 0.25, rate: 0.75 + Math.random() * 0.25 });
        } else
          w(k, b, 46, 0.8, 0.26, !1), y(k, b, 1400, 2600, 0.05);
      else M === "flip" ? g("sheet", k, { gain: 0.8, rate: 1.15 }) || (y(k, 0.38, 500, 2400, 0.16), c(k + 0.34, 0.05, 900, 1, 0.22)) : M === "tear" ? g("tear", k, { gain: 1 }) || (y(k, 0.45, 1800, 3600, 0.18), w(k, 0.45, 160, 1.2, 0.3, !1)) : M === "seal" ? (g("tear", k, { gain: 0.45, rate: 1.7, dur: 0.16 }) || c(k, 0.05, 1200, 2, 0.3), g("sheet", k + 0.2, { gain: 0.5, rate: 0.9 }) || y(k + 0.2, 0.5, 700, 2200, 0.08)) : M === "fire" ? (w(k, b, 22, 0.45, 0.16, !1), y(k, b, 500, 800, 0.05)) : M === "grain" && (g("crumple", k, { gain: 0.22, rate: 1.2 + Math.random() * 0.4, offset: Math.random() * 0.3, dur: 0.08 }) || w(k, 0.06, 60, 1, 0.2, !1));
    }
  };
})();

// .build/motion.js
function de(e, n, t, f, o = Me, r = 0, a) {
  e.tw = e.tw.filter((i) => i.key !== n), e.tw.push({ key: n, to: t, dur: Math.max(1e-3, f), ease: o, start: performance.now() + r * 1e3, from: null, done: a });
}
function wt(e, n) {
  let t = !1, f = [];
  return e.tw = e.tw.filter((o) => {
    if (t = !0, n < o.start) return !0;
    o.from === null && (o.from = e[o.key]);
    let r = V((n - o.start) / (o.dur * 1e3));
    return e[o.key] = o.from + (o.to - o.from) * o.ease(r), r >= 1 ? (o.done && f.push(o.done), !1) : !0;
  }), f.forEach((o) => o()), t;
}
function it(e) {
  if (e.cfg.type === "envelope") return 0.34;
  let n = e.F.shape;
  return n === 0 ? 0.42 : n === 2 ? 0.35 : 0.3;
}
function Je(e, n) {
  let t = ce(V(n));
  return 2 * Math.max(e.F.ext[0] / 2 + (e.half[0] - e.F.ext[0] / 2) * t, e.F.ext[1] / 2 + (e.half[1] - e.F.ext[1] / 2) * t);
}
function hn(e, n) {
  let t = ce(V(e.cfg.type === "envelope" ? n * 2 : n)), f = [0, 0, -0.02];
  return e.pose.map((o, r) => o * (1 - t) + f[r] * t);
}
function Ze(e, n, t) {
  let f = (b, l = 0) => n.destroy !== void 0 ? n.destroy : b.front0 > -0.5 ? b.front0 + b.burned + l : -1, o = n.destroy !== void 0 ? V((1.25 - n.destroy) / 0.9) : 1;
  if (e.cfg.type !== "envelope") {
    let b = { ...t, p: n.p, f: n.f, tear: n.tear, front: f(e, n.burnOpen || 0), destroy: n.destroy !== void 0, alpha: o };
    return { items: [{ P: e, st: b }], shadow: { P: e, st: b }, active: { P: e, st: b } };
  }
  let r = e.letter, a = n.p, i = ce(V(a / 0.24)), u = ce(V((a - 0.14) / 0.36)), s = ce(V((a - 0.44) / 0.32)), p = V((a - 0.58) / 0.42), d = { ...t, p: i, f: n.f, tear: 0, cy: t.cy - s * t.vhU * 0.8, rot: [t.rot[0], t.rot[1], t.rot[2] + s * 0.45], front: f(e) }, m = -0.08 + u * 0.5, g = -0.035 * (1 - s), c = Math.PI * Be(V(n.f)), y = [0, 0, -0.02], w = { ...t, cx: nt(d.cx, 0, s), cy: nt(d.cy, 0, s), sc: nt(d.sc, t.scLetter, s), rot: d.rot.map((b, l) => nt(b, y[l] + (t.adjust ? t.adjust[l] : 0), s)), local: [-Math.sin(c) * g, m * (1 - s), Math.cos(c) * g], p: Dt(p), f: n.f, tear: 0, front: f(r, n.burnOpen || 0), destroy: n.destroy !== void 0, alpha: o };
  return { items: s >= 0.999 ? [{ P: r, st: w }] : a < 0.01 ? [{ P: e, st: d }] : [{ P: e, st: d }, { P: r, st: w }], shadow: s < 0.5 ? { P: e, st: d } : { P: r, st: w }, active: s < 0.5 ? { P: e, st: d } : { P: r, st: w } };
}
function st(e, n, t, f, o, r = 0, a = 0) {
  let i = ce(V(n.p)), u = (e.F.ext[0] / 2 + (e.half[0] - e.F.ext[0] / 2) * i) * n.sc * t * 1.1, s = (e.F.ext[1] / 2 + (e.half[1] - e.F.ext[1] / 2) * i) * n.sc * t * 1.1, p = r + f / 2 + n.cx * t, d = a + o / 2 - n.cy * t;
  return { cx: p, cy: d, x0: p - u, x1: p + u, y0: d - s, y1: d + s, w1: e.half[0] * 2 * n.sc * t, h1: e.half[1] * 2 * n.sc * t };
}
function kt(e, n, t, f) {
  let { P: o, st: r } = t.active, a = n.p - (n.pPrev ?? n.p), i = ce(V(r.p)), u = (o.F.ext[0] / 2 + (o.half[0] - o.F.ext[0] / 2) * i) * r.sc, s = (o.F.ext[1] / 2 + (o.half[1] - o.F.ext[1] / 2) * i) * r.sc;
  if (a > 5e-4 && n.p > 0.12 && n.p < 0.97) {
    let d = Math.min(8, Math.round(a * 300));
    for (let m = 0; m < d; m++) e.emit({ x: r.cx + (Math.random() - 0.5) * 2 * u, y: r.cy + (Math.random() - 0.5) * 2 * s, z: 0.06 * r.sc, vx: (Math.random() - 0.5) * 0.05 * r.sc, vy: (Math.random() * 0.04 + 0.01) * r.sc, ay: -0.01 * r.sc, r: 0.93, g: 0.9, b: 0.84, a: 0.5, s: (5e-3 + Math.random() * 8e-3) * r.sc, t: 0, life: 1.2 + Math.random() * 0.9 });
  }
  let p = r.front;
  if (p > -0.5 && o.burnPts && r.p > 0.9) {
    let d = n.destroy !== void 0;
    n.acc = (n.acc || 0) + f * (d ? 110 : 9);
    let m = o.burnPts, g = m.length / 3, c = Math.cos(r.rot[2]), y = Math.sin(r.rot[2]);
    for (; n.acc >= 1; ) {
      n.acc -= 1;
      let w = -1;
      for (let k = 0; k < 40; k++) {
        let I = Math.floor(Math.random() * g);
        if (Math.abs(m[I * 3 + 2] - p) < 0.012) {
          w = I;
          break;
        }
      }
      if (w < 0) continue;
      let M = (m[w * 3] - 0.5) * o.w * r.sc, b = (m[w * 3 + 1] - 0.5) * o.h * r.sc, l = r.cx + c * M - y * b, S = r.cy + y * M + c * b;
      e.emit({ x: l, y: S, z: 0.02 * r.sc, vx: (Math.random() - 0.5) * 0.08 * r.sc, vy: (0.06 + Math.random() * 0.1) * r.sc, ay: 0.06 * r.sc, r: 1, g: 0.5 + Math.random() * 0.3, b: 0.12, a: 1, s: (3e-3 + Math.random() * 5e-3) * r.sc, t: 0, life: 0.5 + Math.random() * 0.8, flicker: !0 }), d && Math.random() < 0.45 && e.emit({ x: l, y: S, z: 0.02 * r.sc, vx: (Math.random() - 0.5) * 0.06 * r.sc, vy: -(0.02 + Math.random() * 0.05) * r.sc, ay: -0.05 * r.sc, r: 0.2, g: 0.19, b: 0.18, a: 0.85, s: (8e-3 + Math.random() * 0.012) * r.sc, t: 0, life: 1.4 + Math.random() * 1.1 });
    }
  }
}
function Rt(e, n) {
  let t = /* @__PURE__ */ new Map(), f = [], o = null, r = () => {
    let [s, p] = [...t.values()];
    return Math.hypot(s.x - p.x, s.y - p.y);
  }, a = (s) => {
    let p = n.active();
    if (!p) return;
    let d = n.box();
    if (!(d && s.clientX > d.x0 && s.clientX < d.x1 && s.clientY > d.y0 && s.clientY < d.y1) && !t.size) {
      n.outside(s);
      return;
    }
    if (!t.size && n.tap && n.tap(s)) return;
    t.set(s.pointerId, { x: s.clientX, y: s.clientY });
    try {
      e.setPointerCapture(s.pointerId);
    } catch {
    }
    p.tw = p.tw.filter((c) => c.key !== "p");
    let g = performance.now();
    t.size === 2 ? o = { pinch: !0, d0: r(), p0: p.p, moved: !0, last: p.p, box: d, tLast: g, lastX: s.clientX, lastY: s.clientY, vx: 0, vy: 0 } : o = { pinch: !1, r0: Math.hypot(s.clientX - d.cx, s.clientY - d.cy), p0: p.p, x: s.clientX, y: s.clientY, moved: !1, last: p.p, box: d, tLast: g, lastX: s.clientX, lastY: s.clientY, vx: 0, vy: 0 };
  }, i = (s) => {
    if (!o || !t.has(s.pointerId)) return;
    t.set(s.pointerId, { x: s.clientX, y: s.clientY });
    let p = n.active();
    if (!p) {
      o = null, t.clear();
      return;
    }
    let d = performance.now(), m = d - o.tLast;
    m > 8 && (o.vx = (s.clientX - o.lastX) / m, o.vy = (s.clientY - o.lastY) / m, o.tLast = d, o.lastX = s.clientX, o.lastY = s.clientY);
    let g = 0.42 * Math.min(o.box.w1, o.box.h1);
    if (o.pinch && t.size === 2) p.p = V(o.p0 + (r() - o.d0) / g);
    else if (!o.pinch) {
      if (Math.hypot(s.clientX - o.x, s.clientY - o.y) > 6 && (o.moved = !0), !o.moved) return;
      p.p = V(o.p0 + (Math.hypot(s.clientX - o.box.cx, s.clientY - o.box.cy) - o.r0) / g);
    }
    Math.abs(p.p - o.last) > 0.035 && (ie.play("grain"), o.last = p.p), p.dragging = !0, n.redraw();
  }, u = (s) => {
    if (!t.has(s.pointerId)) return;
    if (t.delete(s.pointerId), t.size === 1 && o) {
      let y = [...t.values()][0], w = n.box ? n.box() : o.box;
      o.pinch = !1, o.x = y.x, o.y = y.y, o.r0 = Math.hypot(y.x - (w ? w.cx : o.x), y.y - (w ? w.cy : o.y)), o.p0 = n.active() ? n.active().p : o.p0;
      return;
    }
    if (t.size) return;
    let p = n.active(), d = o && o.moved, m = o ? o.p0 : 0, g = o && o.vx || 0, c = o && o.vy || 0;
    if (o = null, !!p) {
      if (p.dragging = !1, n.flip && m > 0.85 && Math.abs(g) > 0.2 && Math.abs(g) > 1.5 * Math.abs(c)) {
        p.p = 1, n.flip();
        return;
      }
      if (n.outside && c > 0.75) {
        n.outside(s);
        return;
      }
      d && (p.p >= 0.3 ? (ie.play("uncrumple", 0.4), de(p, "p", 1, 0.45 * (1 - p.p) + 0.15, Ve, 0, () => je(12))) : (ie.play("crumple", 0.35), de(p, "p", 0, 0.35 * p.p + 0.12, Ve, 0, () => je(18))), n.redraw());
    }
  };
  return [["pointerdown", a], ["pointermove", i], ["pointerup", u], ["pointercancel", u]].forEach(([s, p]) => re(f, e, s, p)), () => f.splice(0).forEach((s) => s());
}
function lt(e, n, t, f, o, r, a) {
  let i = [(n - f / 2) / r, -(t - o / 2) / r, 0.09 * o / r];
  e.lampPos || (e.lampPos = i.slice()), e.lampGoal = i, e.lampOn = a ? 1 : 0, e.lampMoving = !0;
}
function Pt(e, n) {
  if (!e.lampGoal) return !1;
  let t = 1 - Math.exp(-n * 20), f = 1 - Math.exp(-n * 7), o = !1;
  for (let a = 0; a < 3; a++) {
    let i = e.lampGoal[a] - e.lampPos[a];
    Math.abs(i) > 1e-4 && (o = !0), e.lampPos[a] += i * t;
  }
  let r = (e.lampOn || 0) - (e.lamp || 0);
  return Math.abs(r) > 2e-3 && (o = !0), e.lamp = (e.lamp || 0) + r * f, o;
}

// .build/renderer.js
var we = {
  persp(e, n, t, f) {
    let o = 1 / Math.tan(e / 2), r = 1 / (t - f);
    return [o / n, 0, 0, 0, 0, o, 0, 0, 0, 0, (f + t) * r, -1, 0, 0, 2 * f * t * r, 0];
  },
  mul(e, n) {
    let t = new Array(16);
    for (let f = 0; f < 4; f++) for (let o = 0; o < 4; o++) {
      let r = 0;
      for (let a = 0; a < 4; a++) r += e[a * 4 + o] * n[f * 4 + a];
      t[f * 4 + o] = r;
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
}, Ie = 30 * Math.PI / 180, Ce = 10, Qe = [-0.45, 0.62, 0.65];
function co(e, n) {
  let t = n.w / 2, f = n.h / 2, o = Math.hypot(t, f);
  if (e === "flat") {
    let i = 0.78 * Math.PI / o, u = 1 / i;
    return { shape: 0, k0: i, squash: 0.3, roll: 0, A0: n.card ? 0.06 : 0.1, Ares: 45e-4, ext: [2.42 * u, 2.42 * u] };
  }
  if (e === "roll") {
    let i = Math.max(0.03, n.w * 0.085);
    return { shape: 1, k0: 0, squash: 1, roll: i, A0: 0.03, Ares: 4e-3, ext: [2.2 * i, n.h] };
  }
  if (e === "twist") {
    let i = 3.3 * Math.PI / n.h;
    return { shape: 2, k0: i, squash: 1, roll: 0.012, A0: 0.03, Ares: 45e-4, ext: [n.w, 2.6 / i] };
  }
  if (e === "quarters") return { shape: 3, k0: 0, squash: 1, roll: 0, A0: 7e-3, Ares: 35e-4, ext: [t * 1.05, f * 1.05] };
  if (e === "half") return { shape: 4, k0: 0, squash: 1, roll: 0, A0: 7e-3, Ares: 35e-4, ext: [t * 1.05, n.h * 1.02] };
  if (e === "thirds") return { shape: 5, k0: 0, squash: 1, roll: 0, A0: 7e-3, Ares: 35e-4, ext: [n.w * 1.02, n.h / 3 * 1.05] };
  if (e === "envelope") return { shape: 6, k0: 0, squash: 1, roll: 0, A0: 5e-3, Ares: 3e-3, ext: [n.w * 1.02, n.body * 1.04] };
  if (e === "accordion") return { shape: 7, k0: 0, squash: 1, roll: 0, A0: 8e-3, Ares: 35e-4, ext: [n.w / 4 * 1.08, n.h * 1.02] };
  if (e === "triangle") return { shape: 8, k0: 0, squash: 1, roll: 0, A0: 8e-3, Ares: 35e-4, ext: [t * 1.08, f * 1.08] };
  let r = 0.95 * Math.PI / o, a = 1 / r;
  return { shape: 0, k0: r, squash: 1, roll: 0, A0: n.card ? 0.07 : 0.12, Ares: 45e-4, ext: [2 * (a + 0.06), 2 * (a + 0.06)] };
}
var mo = (e) => e.states.includes("burnt") || e.burnAfterReading ? "burn" : e.states.includes("singed") ? "singed" : null, cn = { corner: [0.3, 0.06], edge: [0.035, 0.01], center: [0.09, 0.03], spots: [0.035, 0.01] };
function We(e, n = {}) {
  let t = e.getContext("webgl2", { alpha: !0, premultipliedAlpha: !0, antialias: !0 });
  if (!t) return null;
  let f, o, r, a, i, u, s, p = !1, d = !1, m = (E, v) => {
    let _ = (O, j) => {
      let B = t.createShader(O);
      if (t.shaderSource(B, j), t.compileShader(B), !t.getShaderParameter(B, t.COMPILE_STATUS)) throw new Error(t.getShaderInfoLog(B));
      return B;
    }, X = t.createProgram();
    if (t.attachShader(X, _(t.VERTEX_SHADER, E)), t.attachShader(X, _(t.FRAGMENT_SHADER, v)), t.linkProgram(X), !t.getProgramParameter(X, t.LINK_STATUS)) throw new Error(t.getProgramInfoLog(X));
    let F = {}, H = t.getProgramParameter(X, t.ACTIVE_UNIFORMS);
    for (let O = 0; O < H; O++) {
      let j = t.getActiveUniform(X, O);
      F[j.name] = t.getUniformLocation(X, j.name);
    }
    return { p: X, u: F };
  };
  function g() {
    f = m(an, sn), o = m(ln, fn), r = m(un, pn), a = t.createVertexArray(), t.bindVertexArray(a), i = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, i), t.bufferData(t.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), t.STATIC_DRAW);
    let E = t.getAttribLocation(o.p, "aQ");
    t.enableVertexAttribArray(E), t.vertexAttribPointer(E, 2, t.FLOAT, !1, 0, 0), t.bindVertexArray(null), u = t.createVertexArray(), s = t.createBuffer(), t.bindVertexArray(u), t.bindBuffer(t.ARRAY_BUFFER, s), t.bufferData(t.ARRAY_BUFFER, 420 * 32, t.DYNAMIC_DRAW), [["aP", 3, 0], ["aC", 4, 12], ["aS", 1, 28]].forEach(([v, _, X]) => {
      let F = t.getAttribLocation(r.p, v);
      t.enableVertexAttribArray(F), t.vertexAttribPointer(F, _, t.FLOAT, !1, 32, X);
    }), t.bindVertexArray(null);
  }
  g();
  let c = (E) => {
    E.preventDefault(), p = !0;
  }, y = () => {
    p = !1, g(), b = null, l = null, R = null, U = null, le = null, n.onRestore && n.onRestore();
  };
  e.addEventListener("webglcontextlost", c), e.addEventListener("webglcontextrestored", y);
  function w(E, v, _, X, F, H, O) {
    let j = [];
    for (let $ = 0; $ <= X; $++) j.push(E + (v - E) * $ / X);
    H.forEach(($) => {
      $ > E + 1e-6 && $ < v - 1e-6 && j.push($);
    }), j.sort(($, fe) => $ - fe);
    let B = [];
    for (let $ = 0; $ <= F; $++) B.push(-_ + 2 * _ * $ / F);
    O.forEach(($) => {
      $ > -_ + 1e-6 && $ < _ - 1e-6 && !B.some((fe) => Math.abs(fe - $) < 1e-6) && B.push($);
    }), B.sort(($, fe) => $ - fe);
    let W = j.length, K = B.length, se = new Float32Array(W * K * 2), ne = 0;
    for (let $ = 0; $ < K; $++) for (let fe = 0; fe < W; fe++)
      se[ne++] = j[fe], se[ne++] = B[$];
    let Z = new Uint16Array((W - 1) * (K - 1) * 6);
    ne = 0;
    for (let $ = 0; $ < K - 1; $++) for (let fe = 0; fe < W - 1; fe++) {
      let Ae = $ * W + fe, h = Ae + 1, T = Ae + W, P = T + 1;
      Z[ne++] = Ae, Z[ne++] = h, Z[ne++] = P, Z[ne++] = Ae, Z[ne++] = P, Z[ne++] = T;
    }
    let pe = t.createVertexArray();
    t.bindVertexArray(pe);
    let te = t.createBuffer();
    t.bindBuffer(t.ARRAY_BUFFER, te), t.bufferData(t.ARRAY_BUFFER, se, t.STATIC_DRAW);
    let ve = t.getAttribLocation(f.p, "aXY");
    t.enableVertexAttribArray(ve), t.vertexAttribPointer(ve, 2, t.FLOAT, !1, 0, 0);
    let ke = t.createBuffer();
    return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, ke), t.bufferData(t.ELEMENT_ARRAY_BUFFER, Z, t.STATIC_DRAW), t.bindVertexArray(null), { vao: pe, count: Z.length, bufs: [te, ke] };
  }
  function M(E, v) {
    let _ = t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, _), v.float ? (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1), t.texImage2D(t.TEXTURE_2D, 0, t.RG16F, v.w, v.h, 0, t.RG, t.FLOAT, E)) : (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, E), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1)), v.mip ? (t.generateMipmap(t.TEXTURE_2D), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR)) : t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), _;
  }
  let b = null, l = null, S = (E) => {
    let v = t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, v), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(E)), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), v;
  }, k = () => b || (b = S([0, 0, 0, 0])), I = () => l || (l = S([255, 0, 0, 255])), L = (E) => {
    E && E !== b && E !== l && t.deleteTexture(E);
  }, R = null, U = null;
  function G() {
    return R || (R = S([240, 240, 240, 255]), U = $e("grain").then((E) => {
      !E || d || (t.bindTexture(t.TEXTURE_2D, R), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, E), t.generateMipmap(t.TEXTURE_2D), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.REPEAT), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.REPEAT));
    }), R);
  }
  async function A(E) {
    let v = Ke(E), _ = { ...Pe[v.type] };
    if (v.color) {
      let J = De(v.color);
      J && (_.color = J);
    }
    G();
    let X = v.type === "envelope" ? A({
      id: v.id + "-letter",
      type: v.letter,
      shape: "thirds",
      text: v.text,
      back: v.back,
      states: v.states.filter((J) => J !== "torn"),
      seed: v.seed + 1,
      hiddenInk: v.hiddenInk,
      burn: v.burn,
      burnAfterReading: v.burnAfterReading,
      stamp: v.stamp,
      ...v.color ? { color: v.color } : {},
      ...v.wearIntensity !== void 0 ? { wearIntensity: v.wearIntensity } : {}
    }) : null;
    await Zt([_.font, "Caveat", "Courier Prime", "Special Elite"]);
    let F = _.w / 2, H = _.h / 2, O = co(v.shape, _), j = Math.round(512 * _.w / 0.84), B = Math.round(j * _.h / _.w), W = be.get("opens." + v.id, 0), K = oe(v.seed * 7 + 1), se = _.stub ? F - _.w * _.stub : null, ne = _.body ? -H + _.body : 0, Z = Math.max(16, Math.round(Math.sqrt(15e3 * _.w / _.h))), pe = Math.max(16, Math.round(Z * _.h / _.w)), te = [0], ve = [0, -_.h / 6 * 1.08, _.h / 6, ne];
    v.shape === "accordion" && te.push(-_.w / 6, _.w / 6);
    let ke = [1, 2, 4].map((J) => {
      let Te = (Fe) => J > 1 ? Fe.flatMap((Ye) => [Ye - 0.03, Ye, Ye + 0.03]) : Fe, he = Math.max(4, Math.round(Z / J)), Ee = Math.max(4, Math.round(pe / J)), Oe = Te(te), Ge = Te(ve);
      if (se === null) return [w(-F, F, H, he, Ee, Oe, Ge)];
      let pt = Math.min(he - 1, Math.max(1, Math.round(he * (se + F) / _.w)));
      return [w(-F, se, H, pt, Ee, Oe, Ge), w(se, F, H, he - pt, Ee, Oe, Ge)];
    }), $ = !(v.back || v.type === "notebook" || v.type === "form" || v.type === "envelope" || v.type === "newspaper" || v.type === "postcard" || v.type === "blueprint" || ["coffee", "water", "prints", "aged", "wine", "ink", "foxing", "faded", "staple", "grease", "dogear", "damp", "clip"].some((J) => v.states.includes(J))), fe = mo(v), Ae = !(v.type === "notebook" || v.type === "form" || v.type === "envelope" || v.type === "punchcard" || v.type === "parchment" || v.type === "postcard" || v.states.includes("aged") || v.states.includes("torn") || fe), [h, T, P, C] = await Promise.all([
      Et.run("creases", [{ seed: v.seed, shape: v.shape, w: _.w, h: _.h, card: !!_.card, foldY: ne, states: v.states }, j, B]),
      at(v, _, "front", W),
      $ ? null : at(v, _, "back", W),
      Ae ? null : Xt(v, _, fe)
    ]), q = rn(v, j, B), N = new Float32Array(j * B * 2);
    for (let J = 0; J < j * B; J++)
      N[J * 2] = h[J], N[J * 2 + 1] = q ? q[J] : 0;
    let Y = O.shape === 1 || O.shape === 2, x = {
      cfg: v,
      T: _,
      w: _.w,
      h: _.h,
      half: [F, H],
      F: O,
      stubX: se,
      foldY: ne,
      lods: ke,
      lod: 0,
      openings: W,
      tH: M(N, { float: !0, w: j, h: B }),
      tPF: M(T, { mip: !0 }),
      tPB: $ ? k() : M(P, { mip: !0 }),
      tFx: Ae ? I() : M(C.canvas, {}),
      burnPts: Ae ? null : C.burnPts,
      // which burn field the effects hold: 'burn' (sparks, can burn away), 'singed' (rim only) or 'none' (ensureBurn adds one)
      fxBurn: fe || "none",
      backEmpty: $,
      // estimated texture memory (front and back with mipmaps, effects, creases in RG16F)
      bytes: Math.round(T.width * T.height * 4 * 1.33 * ($ ? 1 : 2) + (Ae ? 0 : C.canvas.width * C.canvas.height * 4) + j * B * 4),
      // folded and elongated papers stay almost facing the camera; crumpled ones may spin freely
      pose: O.shape >= 3 ? [-0.22 + K() * 0.18, -0.2 + K() * 0.4, -0.45 + K() * 0.9] : Y ? [-0.15 + K() * 0.15, -0.15 + K() * 0.3, -0.6 + K() * 1.2] : [-0.3 + K() * 0.25, -0.35 + K() * 0.7, K() * 6.28],
      seedA: K() * 6.28,
      // a singed rim holds its front just under the lowest value of its field: only the scorch band shows
      front0: v.states.includes("burnt") ? cn[v.burn][0] + cn[v.burn][1] * K() : fe === "singed" ? C.lo - 0.012 : -1,
      burned: be.get("burned." + v.id, 0),
      age: v.states.includes("aged") ? 1 : 0,
      torn: !1
    };
    return x.extent = Math.max(O.ext[0], O.ext[1]), x.hasRedaction = /\[\[/.test(v.text + v.back), X && (x.letter = await X), await U, x;
  }
  async function D(E) {
    E.openings = be.get("opens." + E.cfg.id, 0);
    let [v, _] = await Promise.all([at(E.cfg, E.T, "front", E.openings), E.backEmpty ? null : at(E.cfg, E.T, "back", E.openings)]);
    L(E.tPF), L(E.tPB), E.tPF = M(v, { mip: !0 }), E.tPB = _ ? M(_, { mip: !0 }) : k();
  }
  function z(E) {
    return E.fxBurn === "burn" ? Promise.resolve() : (E.burnJob || (E.burnJob = Xt(E.cfg, E.T, "burn").then((v) => {
      if (E.released) return;
      let _ = E.tFx;
      _ === l && (E.bytes += v.canvas.width * v.canvas.height * 4), E.tFx = M(v.canvas, {}), L(_), E.burnPts = v.burnPts, E.fxBurn = "burn";
    })), E.burnJob);
  }
  async function Q(E) {
    await Promise.all([z(E), E.letter && z(E.letter)]);
  }
  function ee(E) {
    E.released = !0, [E.tH, E.tPF, E.tPB, E.tFx].forEach(L), E.lods.flat().forEach((v) => {
      t.deleteVertexArray(v.vao), v.bufs.forEach((_) => t.deleteBuffer(_));
    }), E.letter && ee(E.letter);
  }
  let ye = [260, 130];
  function ge(E, v, _) {
    let X = Je(E, v.p) * v.sc * _, F = E.lod;
    for (; F < 2 && X < ye[F] * 0.9; ) F++;
    for (; F > 0 && X > ye[F - 1] * 1.1; ) F--;
    return E.lod = F;
  }
  function me(E, v, _, X) {
    let F = v.f || 0, H = we.mul(we.T(v.cx, v.cy, (v.zoff || 0) * v.sc + 0.12 * v.sc * Math.sin(Math.PI * F)), we.S(v.sc));
    H = we.mul(H, we.RZ(v.rot[2])), H = we.mul(H, we.RX(v.rot[0])), H = we.mul(H, we.RY(v.rot[1] + Math.PI * Be(V(F)))), v.local && (H = we.mul(H, we.T(v.local[0], v.local[1], v.local[2])));
    let O = f.u;
    t.useProgram(f.p), [[E.tH, "uH"], [E.tPF, "uPrintF"], [E.tPB, "uPrintB"], [E.tFx, "uFx"]].forEach(([Z, pe], te) => {
      t.activeTexture(t.TEXTURE0 + te), t.bindTexture(t.TEXTURE_2D, Z), t.uniform1i(O[pe], te);
    }), t.activeTexture(t.TEXTURE4), t.bindTexture(t.TEXTURE_2D, G()), t.uniform1i(O.uGrain, 4), t.uniform2f(O.uGrainK, E.w * 5, E.h * 5);
    let j = v.L || Qe;
    t.uniform1i(O.uShape, E.F.shape), t.uniform1f(O.uP, V(v.p)), t.uniform1f(O.uK0, E.F.k0), t.uniform1f(O.uKres, 0.06), t.uniform1f(O.uA0, E.F.A0), t.uniform1f(O.uAres, E.F.Ares), t.uniform1f(O.uSeedA, E.seedA), t.uniform1f(O.uSquash, E.F.squash), t.uniform1f(O.uRoll, E.F.roll || 0.03);
    let B = E.cfg.gsm || E.T.gsm || (E.cfg.thickness ? E.cfg.thickness * 800 : E.T.thickness ? E.T.thickness * 800 : E.cfg.weight || E.T.weight || (E.T.card ? 260 : E.T.carbon ? 42 : E.cfg.type === "receipt" ? 48 : 80)), W = V(B / 80, 0.45, 3.5);
    t.uniform1f(O.uCurl, 0.9 / Math.sqrt(W) * Math.sin(Math.PI * V(F))), t.uniform1f(O.uStubX, E.stubX ?? 0), t.uniform1f(O.uFoldSide, E.T.stub ? -1 : 1), t.uniform1f(O.uFoldBw, (E.T.card ? 0.03 : 0.016) * Math.sqrt(W / (E.T.card ? 3.25 : 1))), t.uniform1f(O.uFoldY, E.foldY || 0), t.uniform1f(O.uThick, F > 0.5 ? -6e-3 : 6e-3), t.uniform1f(O.uScale, v.sc), t.uniform1f(O.uBump, 1), t.uniform2f(O.uHalf, E.half[0], E.half[1]), t.uniform3f(O.uCam, 0, 0, Ce), t.uniform3f(O.uColor, E.T.color[0], E.T.color[1], E.T.color[2]), t.uniform3f(O.uL, j[0], j[1], j[2]), t.uniform1f(O.uAge, E.age);
    let K = E.cfg.thru !== void 0 ? E.cfg.thru : E.T.thru !== void 0 ? E.T.thru : E.T.card ? 0 : E.T.carbon ? 0.18 : E.cfg.type === "receipt" ? 0.14 : E.cfg.type === "newspaper" ? 0.08 : V(0.035 * (80 / B), 0.015, 0.2);
    t.uniform1f(O.uThru, K), t.uniform1f(O.uTime, v.time || 0), t.uniform1f(O.uFront, v.front ?? -1), t.uniform1f(O.uDestroy, v.destroy ? 1 : 0), t.uniform1f(O.uInkMax, 24e-4 * v.sc);
    let se = v.lampPos || [0, 0, 10];
    t.uniform3f(O.uLampPos, se[0], se[1], se[2]), t.uniform1f(O.uLamp, v.lamp || 0), t.uniform1f(O.uLampR, v.lampR || 1), t.uniformMatrix4fv(O.uModel, !1, H), t.uniformMatrix4fv(O.uProj, !1, _), (E.T.card ? [1, 0] : [0]).forEach((Z) => {
      t.uniform1f(O.uEdge, Z), E.lods[X].forEach((pe, te) => {
        let ve = te === 1;
        ve && (E.torn || (v.tear || 0) >= 1) || (t.uniform1f(O.uIsStub, ve ? 1 : 0), t.uniform1f(O.uTear, ve && v.tear || 0), t.bindVertexArray(pe.vao), t.drawElements(t.TRIANGLES, pe.count, t.UNSIGNED_SHORT, 0));
      });
    });
  }
  function ue(E, v, _) {
    t.useProgram(o.p), t.disable(t.DEPTH_TEST), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA);
    let X = ce(V(v.p)), F = [E.F.ext[0] / 2 * v.sc, E.F.ext[1] / 2 * v.sc], H = [F[0] + (E.half[0] * v.sc - F[0]) * X, F[1] + (E.half[1] * v.sc - F[1]) * X], O = Math.min(Math.min(F[0], F[1]) * (1 - X) + 0.012 * v.sc * X, H[0], H[1]), j = (0.04 + 0.08 * v.lift + 0.04 * (1 - X)) * v.sc, B = v.L || Qe, W = Math.hypot(B[0], B[1]) || 1, K = (0.05 + 0.1 * v.lift) * v.sc * Math.min(1.6, W / Math.max(0.25, B[2]));
    t.uniform3f(o.u.uC, v.cx - B[0] / W * K, v.cy - B[1] / W * K, -0.25 * v.sc), t.uniform2f(o.u.uHS, H[0], H[1]), t.uniform1f(o.u.uR, O), t.uniform1f(o.u.uSoft, j), t.uniform1f(o.u.uA, (0.62 - 0.2 * v.lift) * (v.alpha ?? 1)), t.uniformMatrix4fv(o.u.uProj, !1, _), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, E.tFx), t.uniform1i(o.u.uFx, 0), t.uniform1f(o.u.uOpen, V((v.p - 0.85) / 0.15)), t.uniform1f(o.u.uFront, v.front ?? -1), t.uniform1f(o.u.uFlip, (v.f || 0) > 0.5 ? 1 : 0), t.bindVertexArray(a), t.drawArrays(t.TRIANGLE_STRIP, 0, 4);
  }
  function _e(E, v, _, X = e.width, F = e.height, H = !1) {
    if (d || p) return;
    t.viewport(0, 0, X, F), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT);
    let O = we.mul(we.persp(Ie, X / F, 0.1, 100), we.T(0, 0, -Ce));
    v && (v.st.alpha ?? 1) > 0.01 && ue(v.P, v.st, O), t.disable(t.BLEND), t.enable(t.DEPTH_TEST);
    let j = F / (2 * Ce * Math.tan(Ie / 2));
    if (E.forEach((B) => me(B.P, B.st, O, H ? 0 : ge(B.P, B.st, j))), _ && _.n) {
      let B = _.buffer();
      t.useProgram(r.p), t.disable(t.DEPTH_TEST), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA), t.uniformMatrix4fv(r.u.uProj, !1, O), t.uniform1f(r.u.uPx, F / (2 * Math.tan(Ie / 2))), t.bindVertexArray(u), t.bindBuffer(t.ARRAY_BUFFER, s), t.bufferSubData(t.ARRAY_BUFFER, 0, B), t.drawArrays(t.POINTS, 0, B.length / 8);
    }
  }
  let le = null;
  function qe() {
    t.deleteFramebuffer(le.fb), t.deleteRenderbuffer(le.rb), t.deleteTexture(le.t), le = null;
  }
  function Ue(E, v = !1, _ = "image/png", X = 256) {
    if (d || p) return "";
    let F = X;
    if (!le || le.S !== F) {
      le && qe();
      let ne = t.createTexture();
      t.bindTexture(t.TEXTURE_2D, ne), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA8, F, F, 0, t.RGBA, t.UNSIGNED_BYTE, null), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR);
      let Z = t.createRenderbuffer();
      t.bindRenderbuffer(t.RENDERBUFFER, Z), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, F, F);
      let pe = t.createFramebuffer();
      t.bindFramebuffer(t.FRAMEBUFFER, pe), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, ne, 0), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, Z), le = { fb: pe, t: ne, rb: Z, S: F, c: Se(F, F) };
    }
    t.bindFramebuffer(t.FRAMEBUFFER, le.fb);
    let H = F / (2 * Ce * Math.tan(Ie / 2)), O = v ? it(E) : 0, j = 0.9 * F / (Je(E, O) * H), { items: B } = Ze(E, { p: O, f: 0, tear: 0, burnOpen: 0 }, { cx: 0, cy: 0, sc: j, scLetter: j, rot: hn(E, O), lift: 0, vhU: 1 });
    _e(B, null, null, F, F, !0);
    let W = new Uint8Array(F * F * 4);
    t.readPixels(0, 0, F, F, t.RGBA, t.UNSIGNED_BYTE, W), t.bindFramebuffer(t.FRAMEBUFFER, null);
    let K = le.c.getContext("2d"), se = K.createImageData(F, F);
    for (let ne = 0; ne < F; ne++) {
      let Z = (F - 1 - ne) * F * 4, pe = ne * F * 4;
      for (let te = 0; te < F * 4; te += 4) {
        let ve = W[Z + te + 3], ke = ve ? 255 / ve : 0;
        se.data[pe + te] = Math.min(255, W[Z + te] * ke), se.data[pe + te + 1] = Math.min(255, W[Z + te + 1] * ke), se.data[pe + te + 2] = Math.min(255, W[Z + te + 2] * ke), se.data[pe + te + 3] = ve;
      }
    }
    return K.putImageData(se, 0, 0), le.c.toDataURL(_, 0.9);
  }
  function et() {
    if (d) return;
    d = !0, e.removeEventListener("webglcontextlost", c), e.removeEventListener("webglcontextrestored", y), [f, o, r].forEach((v) => t.deleteProgram(v.p)), t.deleteVertexArray(a), t.deleteBuffer(i), t.deleteVertexArray(u), t.deleteBuffer(s), [b, l, R].forEach((v) => {
      v && t.deleteTexture(v);
    }), le && qe();
    let E = t.getExtension("WEBGL_lose_context");
    E && E.loseContext();
  }
  return { gl: t, build: A, refreshPrint: D, release: ee, draw: _e, snapshot: Ue, ensureBurn: Q, isLost: () => p, destroy: et };
}

// .build/particles.js
function At(e = 420) {
  let n = [], t = new Float32Array(e * 8);
  return {
    emit(f) {
      n.length < e && n.push(f);
    },
    step(f) {
      for (let o = n.length - 1; o >= 0; o--) {
        let r = n[o];
        if (r.t += f, r.t >= r.life) {
          n.splice(o, 1);
          continue;
        }
        r.vx += (r.ax || 0) * f, r.vy += (r.ay || 0) * f, r.x += r.vx * f, r.y += r.vy * f;
      }
    },
    get n() {
      return n.length;
    },
    // a single reused Float32Array: nothing is allocated per frame
    buffer() {
      for (let f = 0; f < n.length; f++) {
        let o = n[f], r = o.t / o.life, a = f * 8, i = o.a * Math.pow(Math.sin(Math.PI * Math.min(1, r)), 0.6);
        o.flicker && (i *= 0.55 + 0.45 * Math.sin(o.t * 28 + f)), t[a] = o.x, t[a + 1] = o.y, t[a + 2] = o.z, t[a + 3] = o.r, t[a + 4] = o.g, t[a + 5] = o.b, t[a + 6] = i, t[a + 7] = o.s;
      }
      return t.subarray(0, n.length * 8);
    },
    clear() {
      n.length = 0;
    }
  };
}

// .build/scene.js
var mn = {
  flip: "[ flip ]",
  tear: "[ tear stub ]",
  close: "[ close ]",
  hint: "drag to unfold",
  open: "Crumpled paper: open",
  back: "Back:"
}, ft = /* @__PURE__ */ (() => {
  let e = { labels: mn, remember: !1, motion: "auto", flashlight: !0, maxBuilt: 3 }, n = !1, t, f = !1, o, r, a, i, u, s, p, d, m, g = null, c = null, y = [], w = /* @__PURE__ */ new WeakMap(), M = [], b = At(), l = null, S = 0, k = (h) => h.replace(/\[\[[^\]\n]+\]\]/g, "redacted").replace(/~~[^~\n]+~~\{([^}\n]+)\}/g, "$1").replace(/~~([^~\n]+)~~/g, "$1").replace(/^# /gm, ""), I = 0.16, L = 0.9, R = 0.42, U = 1.5, G = 1;
  function A() {
    if (o) return;
    n = Xe(e.motion);
    let h = document.createElement("style");
    h.textContent = ":root{--crumple-backdrop:rgba(6,5,4,.8);--crumple-ui-bg:rgba(14,13,12,.7);--crumple-ui-fg:#ebe5d6;--crumple-ui-border:rgba(235,229,214,.4);--crumple-ui-font:12px/1 'Courier Prime',ui-monospace,monospace;--crumple-accent:#f5c266}.crumple-scene{position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483640;pointer-events:none;display:none;transition:opacity .3s ease;touch-action:none}.crumple-backdrop{position:fixed;inset:0;z-index:2147483630;background:transparent;pointer-events:none;transition:background .7s ease}.crumple-backdrop.on{background:var(--crumple-backdrop)}.crumple-bar{position:fixed;z-index:2147483645;right:18px;top:16px;display:none;gap:8px}.crumple-bar.on{display:flex}.crumple-bar button,.crumple-fallback button{background:var(--crumple-ui-bg);border:1px solid var(--crumple-ui-border);color:var(--crumple-ui-fg);font:var(--crumple-ui-font);letter-spacing:.18em;padding:9px 12px;cursor:pointer}.crumple-bar button[hidden]{display:none}.crumple-hint{position:fixed;z-index:2147483645;left:50%;bottom:8vh;transform:translateX(-50%);font:var(--crumple-ui-font);font-size:13px;letter-spacing:.2em;color:var(--crumple-ui-fg);background:var(--crumple-ui-bg);padding:8px 14px;opacity:0;transition:opacity .5s;pointer-events:none}.crumple-hint.on{opacity:1}.crumple-trigger{display:inline-block;width:96px;height:96px;padding:0;border:0;background:none;cursor:pointer;-webkit-tap-highlight-color:transparent}.crumple-trigger img{width:100%;height:100%;display:block;filter:drop-shadow(2px 7px 6px rgba(0,0,0,.6))}.crumple-trigger:hover img,.crumple-trigger:focus-visible img{animation:crumple-wiggle .75s ease}.crumple-trigger:focus-visible{outline:2px solid var(--crumple-accent);outline-offset:4px;border-radius:50%}.crumple-trigger.active{visibility:hidden}.crumple-trigger.recrumple img{animation:crumple-squeeze .9s ease}@keyframes crumple-wiggle{0%{transform:none}22%{transform:rotate(-8deg) translateY(-4px)}50%{transform:rotate(6deg) translateY(-1px)}78%{transform:rotate(-2deg)}100%{transform:none}}@keyframes crumple-squeeze{0%{transform:scale(1.15)}30%{transform:scale(.7) rotate(-20deg)}60%{transform:scale(1.05) rotate(10deg)}100%{transform:none}}.crumple-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.crumple-fallback{position:fixed;inset:0;z-index:2147483646;display:none;align-items:center;justify-content:center;background:var(--crumple-backdrop);padding:24px}.crumple-fallback.on{display:flex}.crumple-fallback .sheet{max-width:min(520px,90vw);max-height:86vh;overflow:auto;padding:36px 34px;box-shadow:0 18px 40px rgba(0,0,0,.6);white-space:pre-line;font-size:19px;line-height:1.6;color:#2a2219}.crumple-fallback .sheet img{display:block;max-width:100%;margin:0 auto 16px}.crumple-fallback button{position:fixed;right:18px;top:16px}.crumple-fallback del{color:#5b4d3e;text-decoration:line-through;text-decoration-thickness:2px}.crumple-fallback ins{text-decoration:none;color:#1d3a8c;font-family:Caveat,'Comic Sans MS',cursive;font-size:1.12em;padding:0 .12em}.crumple-fallback .crumple-h{display:block;font-weight:700;font-size:1.15em;margin:.2em 0}.crumple-fallback .crumple-redact{display:inline-block;height:.85em;vertical-align:-.08em;background:#1b1713;border-radius:2px;margin:0 .1em}body.crumple-open{overflow:hidden;touch-action:none}@media (prefers-reduced-motion:reduce){.crumple-trigger.recrumple img,.crumple-trigger:hover img{animation:none}}@media print{canvas.crumple-scene,.crumple-backdrop,.crumple-bar,.crumple-hint,.crumple-fallback{display:none !important}.crumple-sr{position:static !important;width:auto !important;height:auto !important;overflow:visible !important;clip:auto !important;white-space:pre-wrap !important;color:#000;font-family:monospace}}", document.head.appendChild(h), g = h;
    let T = e.labels;
    r = document.createElement("div"), r.className = "crumple-backdrop", o = document.createElement("canvas"), o.className = "crumple-scene", o.setAttribute("aria-hidden", "true"), d = document.createElement("div"), d.className = "crumple-sr", d.id = "crumple-content", d.setAttribute("aria-live", "polite"), a = document.createElement("div"), a.className = "crumple-bar", a.setAttribute("role", "dialog"), a.setAttribute("aria-modal", "true"), a.setAttribute("aria-describedby", "crumple-content"), a.tabIndex = -1, i = document.createElement("button"), i.type = "button", i.textContent = T.flip, u = document.createElement("button"), u.type = "button", u.textContent = T.tear, u.hidden = !0, s = document.createElement("button"), s.type = "button", s.textContent = T.close, a.append(d, u, i, s), p = document.createElement("div"), p.className = "crumple-hint", p.textContent = T.hint, m = document.createElement("div"), m.className = "crumple-fallback", m.setAttribute("role", "dialog"), m.setAttribute("aria-modal", "true"), document.body.append(r, o, a, p, m), re(M, s, "click", () => Ue()), re(M, i, "click", () => v()), re(M, u, "click", () => _()), re(M, window, "keydown", (P) => {
      if (!(P.ctrlKey || P.metaKey || P.altKey || fe(P.target))) {
        if (m.classList.contains("on")) {
          P.key === "Escape" ? ke() : P.key === "Tab" && $(P, m);
          return;
        }
        l && (P.key === "Tab" ? $(P, a) : P.key === "Escape" ? Ue() : (P.key === "f" || P.key === "F") && v());
      }
    }), re(M, window, "resize", () => {
      l && (z(), ue());
    }), re(M, window, "pointermove", (P) => {
      if (!e.flashlight || !l || l.phase !== "open" || l.dragging || P.pointerType === "touch") return;
      let C = l.boxCache || ye(), q = !!C && P.clientX > C.x0 - 30 && P.clientX < C.x1 + 30 && P.clientY > C.y0 - 30 && P.clientY < C.y1 + 30;
      lt(l, P.clientX, P.clientY, o.clientWidth, o.clientHeight, o.clientHeight / (2 * Ce * Math.tan(Ie / 2)), q), ue();
    }), re(M, document, "mouseout", (P) => {
      l && !P.relatedTarget && (l.lampOn = 0, ue());
    }), re(M, document, "visibilitychange", () => {
      document.hidden || ue();
    }), re(M, o, "dblclick", () => v()), c = ot(), c && re(M, c, "change", () => {
      n = Xe(e.motion);
    }), M.push(Rt(o, {
      active: () => l && l.phase === "open" ? l : null,
      box: ye,
      flip: () => v(),
      outside: () => Ue(),
      tap: (P) => {
        let C = ge();
        return C && P.clientX > C.x0 && P.clientX < C.x1 && P.clientY > C.y0 && P.clientY < C.y1 ? (_(), !0) : !1;
      },
      redraw: () => ue()
    }));
  }
  function D() {
    if (f) return t;
    f = !0, A();
    try {
      t = We(o, { onRestore: ne });
    } catch {
      t = null;
    }
    return t;
  }
  function z() {
    let h = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(24e5 / Math.max(1, innerWidth * innerHeight))), T = Math.round(innerWidth * h), P = Math.round(innerHeight * h);
    (o.width !== T || o.height !== P) && (o.width = T, o.height = P);
  }
  function Q(h) {
    let T = l.P, P = o.clientWidth, C = o.clientHeight, q = C / (2 * Ce * Math.tan(Ie / 2)), N = l.from, Y = N.left + N.width / 2, x = N.top + N.height / 2, J = (Y - P / 2) / q, Te = -(x - C / 2) / q, he = 0.9 * N.width / ((l.ext0 || T.extent) * q), Ee = T.cfg.type === "envelope", Oe = Ee ? Math.min(0.5 * C / (T.T.body * q), 0.7 * P / (T.w * q)) : Math.min(0.86 * C / (T.h * q), 0.9 * P / (T.w * q)), Ge = T.letter, pt = Ge ? Math.min(0.86 * C / (Ge.h * q), 0.9 * P / (Ge.w * q)) : Oe, Fe = n ? 1 : l.tf, Ye = ce(V(Ee ? l.p * 2 : l.p)), yn = Math.hypot(J, Te), Yt = (1 - Fe) * (1 - Fe), Vt = 2 * (1 - Fe) * Fe, vn = l.arc || 0.24, Tn = Yt * J + Vt * J * 0.5, It = Yt * Te + Vt * (Te * 0.5 + vn * yn), dt = T.F, En = dt.shape === 0 && dt.squash > 0.5 ? 1 : dt.shape === 1 || dt.shape === 2 ? 0.8 : 0.45, Sn = n ? 0 : ce(Fe) * En, Mn = [0.55, 1.15, 0.35], wn = [0, 0, -0.02], Ct = T.pose.map((Re, Kt) => (Re + Mn[Kt] * Sn) * (1 - Ye) + wn[Kt] * Ye), _t = he + (Oe - he) * Math.pow(Fe, 1.25), Ht = 0.9 * N.width / q, $t = l.pre ?? 1, tt = l.bounce ?? 1, ht = l.settle ?? 1;
    if ($t < 1) {
      let Re = Math.sin(Math.PI * $t);
      _t *= 1 + 0.12 * Re, It += Re * 0.16 * Ht;
    }
    if (tt < 1) {
      let Re = (1 - tt) * (1 - tt);
      It += Math.abs(Math.sin(2 * Math.PI * tt)) * Re * 0.4 * Ht, Ct[2] += 0.18 * Math.sin(2 * Math.PI * tt) * Re;
    }
    let Ft = ht < 1 ? Math.sin(Math.PI * 2.5 * ht) * (1 - ht) * (1 - ht) : 0, jt = [0.05 * Ft, 0.022 * Ft, 0];
    for (let Re = 0; Re < 3; Re++) Ct[Re] += jt[Re];
    return _t *= 1 + 0.01 * Ft, { cx: Tn, cy: It, sc: _t, scLetter: pt, rot: Ct, adjust: jt, lift: Math.sin(Math.PI * Fe), time: h / 1e3, ppu: q, vw: P, vh: C, vhU: C / q, L: Qe, lampPos: l.lampPos, lamp: l.lamp || 0, lampR: 0.3 * C / q };
  }
  function ee(h = performance.now()) {
    let T = Q(h);
    return { b: T, scene: Ze(l.P, l, T) };
  }
  function ye() {
    if (!l) return null;
    let { b: h, scene: T } = ee();
    return st(T.active.P, T.active.st, h.ppu, h.vw, h.vh);
  }
  function ge() {
    if (!l || l.P.stubX === null || l.P.torn || l.p < 0.95 || l.f > 0.01) return null;
    let { b: h, scene: T } = ee(), P = T.active.st, C = l.P, q = h.vw / 2 + P.cx * h.ppu, N = h.vh / 2 - P.cy * h.ppu;
    return { x0: q + C.stubX * P.sc * h.ppu, x1: q + C.half[0] * P.sc * h.ppu, y0: N - C.half[1] * P.sc * h.ppu, y1: N + C.half[1] * P.sc * h.ppu };
  }
  function me(h) {
    if (S = 0, !l || document.hidden || t.isLost() || l.rebuilding) return;
    if (!l.tw.length && !l.dragging && !l.lampMoving && !l.resume && l.tPrev && h - l.tPrev < 32) {
      S = requestAnimationFrame(me);
      return;
    }
    let T = l.resume ? 1 / 60 : Math.min(0.1, Math.max(0, (h - (l.tPrev || h)) / 1e3));
    l.resume = !1, l.tPrev = h;
    let P = wt(l, h);
    if (!l) return;
    let C = Pt(l, T);
    l.lampMoving = C, l.P.burnPts && l.P.front0 > -0.5 && l.phase === "open" && l.destroy === void 0 && (l.burnOpen = Math.min(0.08, (l.burnOpen || 0) + T * 4e-3));
    let { b: q, scene: N } = ee(h);
    l.boxCache = st(N.active.P, N.active.st, q.ppu, q.vw, q.vh), kt(b, l, N, T), b.step(T), t.draw(N.items, N.shadow, b), l.pPrev = l.p;
    let Y = N.active.st.front > -0.5 && !!N.active.P.burnPts;
    if (l.ashes && (b.n === 0 || h > l.ashesEnd)) {
      E();
      return;
    }
    (P || l.dragging || C || b.n > 0 || Y || l.ashes) && (S = requestAnimationFrame(me));
  }
  function ue() {
    !S && l && (l.resume = !0, S = requestAnimationFrame(me));
  }
  let _e = (h) => e.remember && !!be.get("opened." + h, !1);
  function le(h) {
    if (l || !h.P) return;
    let T = h.P;
    z();
    let P = be.get("opens." + T.cfg.id, 0) + 1;
    be.set("opens." + T.cfg.id, P), T.hasRedaction && requestAnimationFrame(() => {
      l && l.P === T && t.refreshPrint(T).then(ue);
    });
    let C = h.opened ? it(T) : 0;
    l = { P: T, ent: h, from: h.btn.getBoundingClientRect(), tf: 0, p: C, ext0: Je(T, C), f: 0, tear: 0, tw: [], phase: "opening", dragging: !1, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 }, b.clear(), h.btn.classList.add("active"), document.body.classList.add("crumple-open"), o.style.display = "block", o.style.pointerEvents = "auto", r.classList.add("on"), a.classList.add("on"), a.setAttribute("aria-label", Pe[T.cfg.type].name), s.focus({ preventScroll: !0 }), u.hidden = T.stubX === null || T.torn, d.replaceChildren(), te(T.cfg.text, d), T.cfg.back && (d.append(`

\u2014 ` + e.labels.back + ` \u2014
`), te(T.cfg.back, d));
    let q = T.cfg.open === "drag", N = T.cfg.type === "envelope", Y = () => {
      l && (l.phase = "open", q && l.p < 0.5 && p.classList.add("on"));
    };
    if (n)
      o.style.opacity = "0", requestAnimationFrame(() => {
        o.style.opacity = "1";
      }), l.tf = 1, l.phase = "open", q ? p.classList.add("on") : (de(l, "p", 1, G * (N ? 1.6 : 1), Ve), ie.play("uncrumple", G, 0, { type: T.cfg.type, gsm: T.cfg.gsm }));
    else {
      l.pre = 0, l.arc = 0.24;
      let J = I * 0.55, Te = N ? U * 1.85 : U;
      if (de(l, "pre", 1, I, Me), de(l, "tf", 1, L, xt, J, Y), !q) {
        let he = () => {
          l && l.phase !== "closing" && (l.settle = 0, de(l, "settle", 1, 0.9, Me), ue());
        };
        de(l, "p", 1, Te, N ? He : ct(T), J + R, he), ie.play(N ? "seal" : "uncrumple", Te, J + R, { type: T.cfg.type, gsm: T.cfg.gsm });
      }
    }
    T.front0 > -0.5 && ie.play("fire", 2.5, 0.6), e.remember && be.set("opened." + T.cfg.id, !0), ze(h.btn, "open", { id: T.cfg.id, openings: P }), ue();
    let { scene: x } = ee();
    t.draw(x.items, x.shadow, b);
  }
  function qe() {
    !l || !l.burnOpen || (l.P.burned = Math.min(0.2, l.P.burned + l.burnOpen), be.set("burned." + l.P.cfg.id, l.P.burned), l.burnOpen = 0);
  }
  function Ue() {
    if (!l || l.phase === "closing") return;
    if (l.P.cfg.burnAfterReading && l.p > 0.9 && l.phase === "open") {
      et();
      return;
    }
    qe(), l.phase = "closing", l.dragging = !1, l.lampOn = 0, l.from = l.ent.btn.getBoundingClientRect(), r.classList.remove("on"), a.classList.remove("on"), p.classList.remove("on"), o.style.pointerEvents = "none", l.tw = l.tw.filter((q) => q.key !== "settle"), l.settle = 1;
    let h = l.P.cfg.type === "envelope", T = _e(l.P.cfg.id) ? it(l.P) : 0;
    l.tf > 0.999 && (l.ext0 = Je(l.P, T));
    let P = n ? 0.6 : h ? 1.9 : 0.85, C = P * Math.max(0.35, l.p - T);
    if (l.f > 0 && de(l, "f", 0, 0.45, Be), l.p > T + 0.02 && ie.play("crumple", C, 0, { type: l.P.cfg.type, gsm: l.P.cfg.gsm }), de(l, "p", T, C, h ? He : mt(l.P)), n) de(l, "tf", 1, P, Me, 0, E);
    else {
      l.tf > 0.999 && (l.arc = 0.34);
      let q = () => {
        l && (l.bounce = 0, de(l, "bounce", 1, 0.36, Me, 0, E));
      };
      de(l, "tf", 0, 0.78, Jt, C * (h ? 0.8 : 0.5), q);
    }
    ze(l.ent.btn, "close", { id: l.P.cfg.id }), ue();
  }
  function et() {
    qe(), l.phase = "closing", l.dragging = !1, a.classList.remove("on"), p.classList.remove("on"), o.style.pointerEvents = "none", l.f > 0 && de(l, "f", 0, 0.4, Be);
    let h = l.P.letter || l.P;
    l.destroy = Math.max(h.front0 > -0.5 ? h.front0 + h.burned : -0.06, -0.06), ie.play("fire", 2.8), de(l, "destroy", 1.6, n ? 1.2 : 2.6, Me, 0, () => {
      if (!l) return;
      l.ashes = !0, l.ashesEnd = performance.now() + 3e3, r.classList.remove("on");
      let T = l.ent;
      be.set("destroyed." + T.cfg.id, !0), T.destroyed = !0, ze(T.btn, "burn", { id: T.cfg.id });
    }), ue();
  }
  function E() {
    if (!l) return;
    let h = l.ent, T = !!l.ashes;
    l = null, b.clear(), r.classList.remove("on"), document.body?.classList.remove("crumple-open");
    let P = () => {
      !l && o && (o.style.display = "none", o.style.opacity = ""), T ? (h.btn.hidden = !0, h.btn.classList.remove("active")) : (!l || l.ent !== h) && h.btn.classList.remove("active");
    };
    n ? (o.style.opacity = "0", setTimeout(P, 300)) : P(), d.textContent = "", T || h.btn.focus({ preventScroll: !0 }), Z(h);
  }
  function v() {
    !l || l.phase === "closing" || l.destroy !== void 0 || (ie.play("flip", 1, 0, { type: l.P.cfg.type, gsm: l.P.cfg.gsm }), je(10), de(l, "f", l.f < 0.5 ? 1 : 0, 0.8, Me), ze(l.ent.btn, "flip", { id: l.P.cfg.id, back: l.f < 0.5 }), ue());
  }
  function _() {
    !l || l.P.stubX === null || l.P.torn || l.tear > 0 || l.p < 0.95 || l.f > 0.01 || (ie.play("tear", 1, 0, { type: l.P.cfg.type, gsm: l.P.cfg.gsm }), je([15, 20, 15, 20, 30]), ze(l.ent.btn, "tear", { id: l.P.cfg.id }), u.hidden = !0, de(l, "tear", 1, n ? 0.3 : 1, Me, 0, () => {
      l && (l.P.torn = !0);
    }), ue());
  }
  function X(h, T, P = {}) {
    let C = { btn: h, cfg: Ke(T), P: null, building: null, opts: P, opened: !1, off: [], io: null, gone: !1, madeImg: !1, madeLabel: !1 };
    return document.body ? F(C) : document.addEventListener("DOMContentLoaded", () => F(C), { once: !0 }), C;
  }
  function F(h) {
    let { btn: T, cfg: P, opts: C } = h;
    A();
    let q = w.get(T);
    q && H(q);
    let N = y.find((x) => x.cfg.id === P.id);
    N && (console.warn(`crumple: id "${P.id}" is already attached, the previous paper is detached`), H(N)), y.push(h), w.set(T, h), T.classList.add("crumple-trigger"), T.getAttribute("aria-label") || (T.setAttribute("aria-label", e.labels.open), h.madeLabel = !0), be.get("destroyed." + P.id, !1) && (T.hidden = !0, h.destroyed = !0), h.opened = _e(P.id), re(h.off, T, "click", async () => {
      await K(h) ? le(h) : ve(h);
    });
    let Y = T.querySelector("img");
    if (C.snapshot) {
      Y || (Y = document.createElement("img"), Y.alt = "", T.appendChild(Y), h.madeImg = !0), Y.onerror = () => {
        h.opts = {}, Y.onerror = null, O(h);
      }, Y.src = h.opened && C.snapshotOpened ? C.snapshotOpened : C.snapshot;
      let x = () => {
        j(() => K(h));
      };
      ["pointerenter", "focus", "touchstart"].forEach((J) => re(h.off, T, J, x, { once: !0, passive: !0 })), re(h.off, T, "pointerdown", () => K(h), { passive: !0 });
    } else O(h);
  }
  function H(h) {
    h.gone = !0, h.off.splice(0).forEach((C) => C()), h.io && h.io.disconnect();
    let T = y.indexOf(h);
    T >= 0 && y.splice(T, 1);
    let P = B.indexOf(h);
    if (P >= 0 && B.splice(P, 1), l && l.ent === h && E(), h.P && (t.release(h.P), h.P = null), w.get(h.btn) === h && w.delete(h.btn), h.btn.classList.remove("crumple-trigger", "active", "recrumple"), h.madeLabel && h.btn.removeAttribute("aria-label"), h.madeImg) {
      let C = h.btn.querySelector("img");
      C && C.remove();
    }
  }
  function O(h) {
    if ("IntersectionObserver" in window) {
      let T = new IntersectionObserver((P) => P.forEach((C) => {
        C.isIntersecting && (T.disconnect(), j(() => K(h).then(() => Z(h))));
      }), { rootMargin: "600px 0px" });
      h.io = T, T.observe(h.btn);
    } else j(() => K(h).then(() => Z(h)));
  }
  let j = (h) => globalThis.requestIdleCallback ? requestIdleCallback(h, { timeout: 700 }) : setTimeout(h, 60), B = [], W = 0;
  function K(h) {
    if (h.P) {
      let T = B.indexOf(h);
      return T >= 0 && B.push(B.splice(T, 1)[0]), Promise.resolve(h.P);
    }
    return h.building ? h.building : h.building = se(h);
  }
  async function se(h) {
    let T = W;
    try {
      if (h.gone || !D() || t.isLost()) return null;
      let P = t, C = await P.build(h.cfg);
      if (T !== W) return null;
      if (h.gone)
        return P.release(C), null;
      for (h.P = C, B.push(h); B.length > e.maxBuilt; ) {
        let q = B.findIndex((Y) => (!l || Y !== l.ent) && Y !== h);
        if (q < 0) break;
        let N = B.splice(q, 1)[0];
        !N.opts.snapshot && N.P && Z(N), N.P && P.release(N.P), N.P = null, N.building = null;
      }
      return h.P;
    } catch (P) {
      return console.warn("crumple: the paper could not be built, the CSS version is shown instead", P), null;
    } finally {
      T === W && (h.building = null);
    }
  }
  function ne() {
    W++;
    let h = B.splice(0);
    if (y.forEach((T) => {
      T.P = null, T.building = null;
    }), h.forEach((T) => K(T).then(() => Z(T))), l) {
      let T = l.ent;
      l.rebuilding = !0, K(T).then((P) => {
        !l || l.ent !== T || (P ? (l.P = P, l.rebuilding = !1, ue()) : (l.ashes = !1, E()));
      });
    }
  }
  function Z(h) {
    if (h.destroyed || h.gone) return;
    h.opened = _e(h.cfg.id);
    let T = h.btn.querySelector("img");
    if (T || (T = document.createElement("img"), T.alt = "", h.btn.appendChild(T), h.madeImg = !0), h.opts.snapshot) {
      T.src = h.opened && h.opts.snapshotOpened ? h.opts.snapshotOpened : h.opts.snapshot;
      return;
    }
    h.P && t && (T.src = t.snapshot(h.P, h.opened));
  }
  function pe() {
    let h = !1;
    y.forEach((T) => {
      be.remove("opened." + T.cfg.id), !(!T.opened || T.destroyed) && (h = !0, Z(T), T.btn.classList.remove("recrumple"), T.btn.offsetWidth, T.btn.classList.add("recrumple"));
    }), h && ie.play("crumple", 0.9);
  }
  function te(h, T) {
    let P = !1;
    h.split(`
`).forEach((C, q) => {
      let N = C.startsWith("# ");
      q && !N && !P && T.append(`
`), P = N;
      let Y = N ? C.slice(2) : C, x = N ? document.createElement("span") : T;
      N && (x.className = "crumple-h");
      let J = /~~([^~\n]+)~~(?:\{([^}\n]+)\})?|\[\[([^\]\n]+)\]\]/g, Te = 0, he;
      for (; he = J.exec(Y); ) {
        if (he.index > Te && x.append(Y.slice(Te, he.index)), he[3] !== void 0) {
          let Ee = document.createElement("span");
          Ee.className = "crumple-redact", Ee.setAttribute("role", "img"), Ee.setAttribute("aria-label", "redacted"), Ee.style.width = Math.max(3, he[3].length * 0.5) + "em", x.append(Ee);
        } else {
          let Ee = document.createElement("del");
          if (Ee.textContent = he[1], x.append(Ee), he[2] !== void 0) {
            let Oe = document.createElement("ins");
            Oe.textContent = he[2], x.append(Oe);
          }
        }
        Te = J.lastIndex;
      }
      Te < Y.length && x.append(Y.slice(Te)), N && T.append(x);
    });
  }
  function ve(h) {
    A();
    let T = Pe[h.cfg.type], C = (h.cfg.color ? De(h.cfg.color) : null) || T.color, q = (x) => Math.round(C[x] * 255), N = document.createElement("div");
    if (N.className = "sheet", N.style.background = `rgb(${q(0)},${q(1)},${q(2)})`, N.style.fontFamily = `"${T.font}", "Courier Prime", monospace`, h.opts.snapshotOpened) {
      let x = document.createElement("img");
      x.src = h.opts.snapshotOpened, x.alt = "", N.appendChild(x);
    }
    te(h.cfg.text, N), h.cfg.back && (N.append(`

\u2014 ` + e.labels.back + ` \u2014
`), te(h.cfg.back, N));
    let Y = document.createElement("button");
    Y.type = "button", Y.textContent = e.labels.close, Y.addEventListener("click", ke), m.setAttribute("aria-label", T.name), m.replaceChildren(N, Y), m.classList.add("on"), document.body?.classList.add("crumple-open"), Y.focus(), m.onclick = (x) => {
      x.target === m && ke();
    }, m._ent = h, ze(h.btn, "open", { id: h.cfg.id, fallback: !0 });
  }
  function ke() {
    m.classList.remove("on"), document.body?.classList.remove("crumple-open"), m._ent && m._ent.btn.focus({ preventScroll: !0 });
  }
  function $(h, T) {
    let P = [...T.querySelectorAll("button")].filter((Y) => !Y.hidden);
    if (!P.length) return;
    h.preventDefault();
    let C = P.indexOf(document.activeElement), q = P.length - 1, N = C < 0 ? 0 : h.shiftKey ? C === 0 ? q : C - 1 : C === q ? 0 : C + 1;
    P[N].focus({ preventScroll: !0 });
  }
  let fe = (h) => !!h && (h.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(h.tagName));
  function Ae() {
    o && (l = null, cancelAnimationFrame(S), S = 0, y.slice().forEach(H), B.length = 0, M.splice(0).forEach((h) => h()), t && t.destroy(), t = null, f = !1, g.remove(), document.body?.classList.remove("crumple-open"), [r, o, a, p, d, m].forEach((h) => h.remove()), r = o = a = p = d = m = null, b.clear());
  }
  return {
    // options: { labels, remember, motion: 'auto' | 'reduce' | 'full' ('reduced' still works), flashlight, maxBuilt }
    init(h = {}) {
      e = { ...e, ...h, labels: { ...mn, ...h.labels || {} } }, o && (i.textContent = e.labels.flip, u.textContent = e.labels.tear, s.textContent = e.labels.close, p.textContent = e.labels.hint), A(), n = Xe(e.motion), j(() => {
        o && D();
      });
    },
    attach: X,
    // detaches a trigger element, or the paper with that id
    detach(h) {
      let T = typeof h == "string" ? y.find((P) => P.cfg.id === h) : w.get(h);
      T && H(T);
    },
    destroy: Ae,
    open: (h) => K(h).then((T) => T ? le(h) : ve(h)),
    close: Ue,
    flip: v,
    tear: _,
    reset: pe,
    get reducedMotion() {
      return n;
    },
    get entries() {
      return y;
    },
    get isOpen() {
      return !!l;
    },
    // debugging/testing: draws a fixed frame (flight, unfold, flip, tear, burn front) of an attached paper
    async frame(h, T, P, C = 0, q = 0, N) {
      let Y = y[h];
      await K(Y), N !== void 0 && await t.ensureBurn(Y.P), cancelAnimationFrame(S), S = 0, z(), l = { P: Y.P, ent: Y, from: Y.btn.getBoundingClientRect(), tf: T, p: P, f: C, tear: q, tw: [], phase: "open", burnOpen: 0 }, N !== void 0 && (l.destroy = N), o.style.display = "block", r.classList.add("on"), y.forEach((J) => J.btn.classList.toggle("active", J === Y));
      let { scene: x } = ee();
      t.draw(x.items, x.shadow, null);
    },
    // debugging/testing: lights the flashlight at screen (x, y) and draws
    flashlight(h, T) {
      if (l) {
        lt(l, h, T, o.clientWidth, o.clientHeight, o.clientHeight / (2 * Ce * Math.tan(Ie / 2)), !0), l.lampPos = l.lampGoal.slice(), l.lamp = 1;
        let { scene: P } = ee();
        t.draw(P.items, P.shadow, null);
      }
    },
    get debug() {
      return l ? { phase: l.phase, ashes: !!l.ashes, destroy: l.destroy, n: b.n, raf: S, tw: l.tw.map((h) => h.key), lampPos: l.lampPos, lamp: l.lamp } : null;
    }
  };
})();

// .build/stage.js
var gn = 1.5;
function bn(e, n = {}) {
  let t = { flashlight: !0, drag: !0, fit: 0.8, motion: "auto", ...n }, f, o = !1, r = Xe(t.motion);
  try {
    f = We(e, { onRestore: L });
  } catch {
    f = null;
  }
  if (!f) return null;
  let a = (A, D, z, Q, ee, ye, ge) => de(A, D, z, r ? Q * 0.4 : Q, ee, ye, ge), i = null, u = 0, s = 0, p = null, d = "", m = null, g = [], c = At(), y = { p: 1, f: 0, tear: 0, tw: [], dragging: !1, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 };
  function w() {
    let A = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(4e6 / Math.max(1, e.clientWidth * e.clientHeight))), D = Math.round(e.clientWidth * A), z = Math.round(e.clientHeight * A);
    (e.width !== D || e.height !== z) && (e.width = D, e.height = z);
  }
  function M(A) {
    let D = e.clientWidth, z = e.clientHeight, Q = z / (2 * Ce * Math.tan(Ie / 2)), ee = i.cfg.type === "envelope", ye = ee ? Math.min(t.fit * 0.69 * z / (i.T.body * Q), 0.7 * D / (i.w * Q)) : Math.min(t.fit * z / (i.h * Q), (t.fit + 0.06) * D / (i.w * Q)), ge = i.letter ? Math.min(t.fit * z / (i.letter.h * Q), (t.fit + 0.06) * D / (i.letter.w * Q)) : ye, me = ce(V(ee ? y.p * 2 : y.p)), ue = [0, 0, -0.02];
    return { cx: 0, cy: 0, sc: ye, scLetter: ge, rot: i.pose.map((_e, le) => _e * (1 - me) + ue[le] * me), lift: 0, time: A / 1e3, ppu: Q, vw: D, vh: z, vhU: z / Q, L: Qe, lampPos: y.lampPos, lamp: y.lamp || 0, lampR: 0.3 * z / Q };
  }
  let b = (A = performance.now()) => {
    let D = M(A);
    return { b: D, scene: Ze(i, y, D) };
  };
  function l(A) {
    if (u = 0, !i || document.hidden || o || f.isLost()) return;
    w();
    let D = y.resume ? 1 / 60 : Math.min(0.05, Math.max(0, (A - (y.tPrev || A)) / 1e3));
    y.resume = !1, y.tPrev = A;
    let z = wt(y, A), Q = Pt(y, D), { scene: ee } = b(A);
    kt(c, y, ee, D), c.step(D), f.draw(ee.items, ee.shadow, c), y.pPrev = y.p, (z || y.dragging || Q || c.n > 0 || ee.active.st.front > -0.5 && ee.active.P.burnPts) && (u = requestAnimationFrame(l));
  }
  let S = () => {
    !u && !o && (y.resume = !0, u = requestAnimationFrame(l));
  };
  function k() {
    if (!i) return null;
    let { b: A, scene: D } = b(), z = e.getBoundingClientRect();
    return st(D.active.P, D.active.st, A.ppu, A.vw, A.vh, z.left, z.top);
  }
  t.drag && (d = e.style.touchAction, e.style.touchAction = "none", p = Rt(e, { active: () => i ? y : null, box: k, outside: () => {
  }, redraw: S })), re(g, e, "dblclick", () => G.flip()), t.flashlight && (re(g, e, "pointermove", (A) => {
    if (!i || y.dragging || A.pointerType === "touch") return;
    let D = k(), z = e.getBoundingClientRect(), Q = !!D && A.clientX > D.x0 - 30 && A.clientX < D.x1 + 30 && A.clientY > D.y0 - 30 && A.clientY < D.y1 + 30;
    lt(y, A.clientX - z.left, A.clientY - z.top, e.clientWidth, e.clientHeight, e.clientHeight / (2 * Ce * Math.tan(Ie / 2)), Q), S();
  }), re(g, e, "pointerleave", () => {
    y.lampOn = 0, S();
  })), re(g, window, "resize", () => S()), re(g, document, "visibilitychange", () => {
    document.hidden || S();
  });
  let I = ot();
  I && t.motion === "auto" && re(g, I, "change", () => {
    r = Xe(t.motion);
  });
  function L() {
    let A = i && i.cfg, D = y.p;
    i = null, A && G.set(A, { progress: D }).catch((z) => console.warn("crumple: rebuild after context restore failed", z));
  }
  function R() {
    o || (o = !0, s++, cancelAnimationFrame(u), u = 0, g.splice(0).forEach((A) => A()), p && p(), t.drag && (e.style.touchAction = d), i && f.release(i), i = null, y.tw = [], c.clear(), f.destroy());
  }
  let U = () => i.cfg.type === "envelope", G = {
    // builds a paper from a config and shows it (resolves with the paper, or null if a newer call replaced it)
    async set(A, { progress: D } = {}) {
      if (o) return null;
      let z = ++s, Q = await f.build(A);
      return z !== s || o ? (f.release(Q), null) : (i && f.release(i), i = Q, y.tear = 0, y.f = 0, i.torn = !1, delete y.destroy, D !== void 0 && (y.tw = [], y.p = V(D)), c.clear(), S(), i);
    },
    crumple() {
      i && (ie.play("crumple", 0.9, 0, { type: i.cfg.type, gsm: i.cfg.gsm }), a(y, "p", 0, U() ? 1.9 : 0.9, U() ? He : mt(i)), S());
    },
    uncrumple() {
      i && (ie.play(U() ? "seal" : "uncrumple", 1.5, 0, { type: i.cfg.type, gsm: i.cfg.gsm }), a(y, "p", 1, U() ? gn * 1.85 : gn, U() ? He : ct(i)), S());
    },
    toggle() {
      y.p > 0.5 ? G.crumple() : G.uncrumple();
    },
    // any time, except once the paper burns away; the side it shows is kept through crumple and unfold
    flip() {
      !i || y.destroy !== void 0 || (ie.play("flip", 1, 0, { type: i.cfg.type, gsm: i.cfg.gsm }), a(y, "f", y.f < 0.5 ? 1 : 0, 0.8, Me), S());
    },
    tear() {
      !i || i.stubX === null || y.tear > 0 || y.p < 0.95 || (ie.play("tear", 1, 0, { type: i.cfg.type, gsm: i.cfg.gsm }), a(y, "tear", 1, 1, Me, 0, () => {
        i.torn = !0;
      }), S());
    },
    restoreStub() {
      i && (y.tear = 0, i.torn = !1, S());
    },
    // resolves once the paper has its burn field (built on demand for any paper); a second call meanwhile does nothing,
    // and a paper replaced by set() meanwhile is not burnt
    async burn() {
      let A = i;
      if (!A || y.destroy !== void 0 || m === A) return;
      m = A;
      try {
        await f.ensureBurn(A);
      } finally {
        m === A && (m = null);
      }
      if (i !== A || y.destroy !== void 0) return;
      let D = A.letter || A;
      ie.play("fire", 2.6, 0, { type: i.cfg.type, gsm: i.cfg.gsm }), y.destroy = Math.max(D.front0 > -0.5 ? D.front0 + D.burned : -0.06, -0.06), a(y, "destroy", 1.6, 2.6, Me), S();
    },
    restore() {
      delete y.destroy, c.clear(), i && ie.play("uncrumple", 0.8, 0, { type: i.cfg.type, gsm: i.cfg.gsm }), S();
    },
    setProgress(A) {
      y.tw = [], y.p = V(A), S();
    },
    // PNG of the current frame (draws and reads at once, no preserved buffer needed)
    png() {
      if (!i) return "";
      w();
      let { scene: A } = b();
      return f.draw(A.items, A.shadow, null), e.toDataURL("image/png");
    },
    snapshot(A, D, z) {
      return i ? f.snapshot(i, A, D, z) : "";
    },
    get state() {
      return y;
    },
    get paper() {
      return i;
    },
    destroy: R
  };
  return G;
}

// .build/element.js
var ut = class extends (typeof HTMLElement < "u" ? HTMLElement : class {
}) {
  connectedCallback() {
    let n = this.querySelector("button");
    n || (n = document.createElement("button"), n.type = "button", this.appendChild(n), this._madeBtn = !0), this.btn = n;
    let t = this.getAttribute("states"), f = t ? t.split(",").map((s) => s.trim()).filter(Boolean) : void 0, o = {
      id: this.getAttribute("id") || void 0,
      type: this.getAttribute("type") || void 0,
      shape: this.getAttribute("shape") || void 0,
      states: f,
      text: this.getAttribute("text") || (this._madeBtn ? "" : n.textContent || ""),
      back: this.getAttribute("back") || void 0,
      open: this.getAttribute("open") || void 0,
      seed: this.hasAttribute("seed") ? Number(this.getAttribute("seed")) : void 0
    }, r = this.getAttribute("snapshot") || void 0, a = this.getAttribute("snapshot-opened") || void 0, i = r || a ? { snapshot: r, snapshotOpened: a } : void 0, u = () => {
      this.entry || (this._io && (this._io.disconnect(), this._io = null), this.entry = ft.attach(n, o, i));
    };
    n.addEventListener("click", u, { once: !0, capture: !0 }), this._click = [n, u], typeof IntersectionObserver < "u" ? (this._io = new IntersectionObserver((s) => {
      for (let p of s)
        if (p.isIntersecting) {
          u();
          break;
        }
    }, { rootMargin: "200px" }), this._io.observe(this)) : u();
  }
  disconnectedCallback() {
    this._io && (this._io.disconnect(), this._io = null), this._click && (this._click[0].removeEventListener("click", this._click[1], { capture: !0 }), this._click = null), this.btn && ft.detach(this.btn), this._madeBtn && this.btn.parentNode && this.btn.remove(), this.entry = null;
  }
};
typeof customElements < "u" && !customElements.get("crumple-paper") && customElements.define("crumple-paper", ut);

// .build/index.js
var go = "1.2.0";
//# sourceMappingURL=crumple.cjs.map
