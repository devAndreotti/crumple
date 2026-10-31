var _t = Object.defineProperty;
var Mn = Object.getOwnPropertyDescriptor;
var Rn = Object.getOwnPropertyNames;
var Pn = Object.prototype.hasOwnProperty;
var An = (e, n) => {
  for (var t in n)
    _t(e, t, { get: n[t], enumerable: !0 });
}, In = (e, n, t, s) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let o of Rn(n))
      !Pn.call(e, o) && o !== t && _t(e, o, { get: () => n[o], enumerable: !(s = Mn(n, o)) || s.enumerable });
  return e;
};
var Cn = (e) => In(_t({}, "__esModule", { value: !0 }), e);

// .build/index.js
var bo = {};
An(bo, {
  CrumplePaper: () => st,
  Renderer: () => Ke,
  SHAPES: () => Nt,
  STATES: () => et,
  Scene: () => it,
  Sound: () => se,
  Stage: () => gn,
  TEXTS: () => Dt,
  TYPES: () => Me,
  config: () => Ie,
  normalize: () => Ve,
  registerPaperType: () => Zt,
  registerWearState: () => Qt,
  version: () => go
});
module.exports = Cn(bo);

// .build/util.js
function ne(e) {
  let n = Math.imul(e | 0, 2654435761) >>> 0 || 1;
  return () => (n ^= n << 13, n >>>= 0, n ^= n >>> 17, n ^= n << 5, n >>>= 0, n / 4294967296);
}
function Le(e) {
  let n = (s, o) => {
    let r = Math.imul(s, 374761393) + Math.imul(o, 668265263) + Math.imul(e, 1442695041) | 0;
    return r = Math.imul(r ^ r >>> 13, 1274126177), ((r ^ r >>> 16) >>> 0) / 4294967296;
  }, t = (s, o) => {
    let r = Math.floor(s), a = Math.floor(o), i = s - r, p = o - a, l = i * i * (3 - 2 * i), u = p * p * (3 - 2 * p), d = n(r, a), c = n(r + 1, a), g = n(r, a + 1), m = n(r + 1, a + 1);
    return d + (c - d) * l + (g - d) * u + (d - c - g + m) * l * u;
  };
  return (s, o) => (t(s, o) * 0.5 + t(s * 2, o * 2) * 0.25 + t(s * 4, o * 4) * 0.125 + t(s * 8, o * 8) * 0.0625) / 0.9375;
}
var Y = (e, n = 0, t = 1) => Math.min(t, Math.max(n, e)), pe = (e) => e * e * (3 - 2 * e), Qe = (e, n, t) => e + (n - e) * t, De = (e) => e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2, ze = (e) => 1 - (1 - e) * (1 - e), Ot = (e) => 0.5 * pe(e) + 0.5 * ze(e), be = (e) => e, Kt = (e) => 0.35 * pe(e) + 0.65 * (1 - Math.pow(1 - e, 3)), xt = (e) => e * e * (1.6 - 0.6 * e), Ge = (e) => 0.55 * e + 0.45 * pe(e), pt = (e) => e.F.shape === 0 ? (n) => 1 - Math.pow(1 - n, 2.3) : Ot, dt = (e) => e.F.shape === 0 ? (n) => 1 - Math.pow(1 - n, 2.2) : De, Ie = {
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
      let t = localStorage.getItem(Ie.storagePrefix + e);
      return t === null ? n : JSON.parse(t);
    } catch {
      return n;
    }
  },
  set(e, n) {
    try {
      localStorage.setItem(Ie.storagePrefix + e, JSON.stringify(n));
    } catch {
    }
  },
  remove(e) {
    try {
      localStorage.removeItem(Ie.storagePrefix + e);
    } catch {
    }
  }
}, ye = (e, n, t) => {
  let s = document.createElement("canvas");
  return s.width = e, s.height = n, t && s.getContext("2d", { willReadFrequently: !0 }), s;
}, ie = (e, n) => `rgba(${e[0]},${e[1]},${e[2]},${n})`;
function Oe(e) {
  if (Array.isArray(e) && e.length === 3 && e.every((n) => typeof n == "number" && Number.isFinite(n) && n >= 0 && n <= 1))
    return [e[0], e[1], e[2]];
  if (typeof e == "string") {
    let n = e.trim(), t = /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/.exec(n);
    if (t) return [parseInt(t[1], 16) / 255, parseInt(t[2], 16) / 255, parseInt(t[3], 16) / 255];
    let s = /^#?([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/.exec(n);
    if (s) return [parseInt(s[1] + s[1], 16) / 255, parseInt(s[2] + s[2], 16) / 255, parseInt(s[3] + s[3], 16) / 255];
  }
  return null;
}
function Be(e, n, t) {
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
function qe(e) {
  if (e === "full") return !1;
  if (e === "reduce" || e === "reduced") return !0;
  let n = We();
  return !!n && n.matches;
}
function re(e, n, t, s, o) {
  n.addEventListener(t, s, o), e.push(() => n.removeEventListener(t, s, o));
}
var _n = { "Special Elite": "Special+Elite", "Courier Prime": "Courier+Prime:wght@400;700", Caveat: "Caveat:wght@500", VT323: "VT323", "Libre Baskerville": "Libre+Baskerville:ital,wght@0,400;0,700;1,400" }, Ft = {};
function Jt(e) {
  return document.fonts ? Promise.all(e.map((n) => {
    if (!Ft[n]) {
      let t = _n[n], s = t ? "family=" + t.split(":")[0] : null, r = !t || !Ie.googleFonts || [...document.querySelectorAll("link[rel=stylesheet]")].some((a) => a.href.includes(s)) ? Promise.resolve() : new Promise((a) => {
        let i = document.createElement("link");
        i.rel = "stylesheet", i.href = "https://fonts.googleapis.com/css2?family=" + t + "&display=swap", i.onload = a, i.onerror = a, setTimeout(a, 4e3), document.head.appendChild(i);
      });
      Ft[n] = r.then(() => Promise.all(["", "bold ", "italic "].map((a) => document.fonts.load(`${a}40px "${n}"`).catch(() => null))));
    }
    return Ft[n];
  })) : Promise.resolve();
}
var Lt = {};
function ht(e) {
  return Lt[e] || (Lt[e] = new Promise((n) => {
    let t = new Image();
    t.crossOrigin = "anonymous", t.onload = () => t.decode ? t.decode().then(() => n(t), () => n(t)) : n(t), t.onerror = () => n(null), t.src = e;
  })), Lt[e];
}
var Xe = (e) => ht(Ie.assets + "textures/" + e + ".webp");
function Ye(e) {
  try {
    typeof navigator < "u" && "vibrate" in navigator && navigator.vibrate(e);
  } catch {
  }
}

// .build/catalog.js
var Me = {
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
}, Nt = { ball: "Crumpled ball", flat: "Flattened crumple", quarters: "Folded in quarters", half: "Folded in half", thirds: "Folded in thirds (letter)", roll: "Rolled up", twist: "Twisted (candy wrapper)", accordion: "Accordion fold", triangle: "Triangle fold" }, et = { torn: "Torn", burnt: "Burnt", coffee: "Coffee stain", water: "Water stain", prints: "Dirty fingerprints", aged: "Aged", scribbled: "Scribbled", singed: "Singed", wine: "Wine stain", ink: "Ink blot", foxing: "Foxing", tape: "Tape", stamp: "Rubber stamp", faded: "Sun-faded", staple: "Metal staple", grease: "Grease stain", dogear: "Dog-eared corner", damp: "Damp wrinkled relief", creased: "Pocket-creased grid", clip: "Metal paper clip" }, Fn = ["corner", "edge", "center", "spots"], Dt = {
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
Foldtown`, Ut = ["never", "again", "always", "not yet", "once more", "still"], mt = {};
function Zt(e, n) {
  if (Me[e]) throw new Error(`Paper type "${e}" already exists`);
  Me[e] = n;
}
function Qt(e, n) {
  if (et[e]) throw new Error(`Wear state "${e}" already exists`);
  et[e] = n.name, n.apply && (mt[e] = n.apply);
}
var ct = (e, n) => Object.prototype.hasOwnProperty.call(e, n);
function Ve(e = {}) {
  let n = ct(Me, e.type) ? e.type : "typed", t = Me[n], s = typeof e.stamp == "string" && e.stamp.trim() ? e.stamp.trim() : e.stamp && typeof e.stamp == "object" ? {
    text: typeof e.stamp.text == "string" && e.stamp.text.trim() ? e.stamp.text.trim() : "RECEIVED",
    ...typeof e.stamp.color == "string" && e.stamp.color.trim() ? { color: e.stamp.color.trim() } : {},
    ...typeof e.stamp.angle == "number" && Number.isFinite(e.stamp.angle) ? { angle: e.stamp.angle } : {},
    ...["center", "left", "right"].includes(e.stamp.align) ? { align: e.stamp.align } : {}
  } : "RECEIVED", o = {
    id: e.id || n,
    type: n,
    shape: n === "envelope" ? "envelope" : ct(Nt, e.shape) ? e.shape : t.shape,
    states: (Array.isArray(e.states) ? e.states : []).filter((r) => ct(et, r)),
    text: typeof e.text == "string" ? e.text : Dt[n] || "",
    back: typeof e.back == "string" ? e.back : "",
    seed: Number.isFinite(e.seed) ? Math.trunc(e.seed) : 7,
    // 0 is a valid seed (rng starts from 1 either way)
    open: e.open === "drag" ? "drag" : "auto",
    hiddenInk: typeof e.hiddenInk == "string" ? e.hiddenInk : "",
    burnAfterReading: !!e.burnAfterReading,
    burn: Fn.includes(e.burn) ? e.burn : "corner",
    image: e.image || "",
    address: typeof e.address == "string" ? e.address : Ln,
    letter: ct(Me, e.letter) && e.letter !== "envelope" ? e.letter : "typed",
    // the word of the 'stamp' state (drawn in capitals)
    stamp: s
  };
  if (Number.isFinite(e.gsm) && (o.gsm = e.gsm), Number.isFinite(e.weight) && (o.weight = e.weight), Number.isFinite(e.thickness) && (o.thickness = e.thickness), Number.isFinite(e.thru) && (o.thru = e.thru), e.color !== void 0 && Oe(e.color) && (o.color = e.color), typeof e.watermark == "string" && e.watermark.trim())
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
function gt(e, n, t) {
  let s = ne(e.seed), o = () => s() < 0.5 ? -1 : 1, r = e.w / 2, a = e.h / 2, i = new Float32Array(n * t), p = n / e.w, l = t / e.h, u = (b, v, f, S, R, A) => {
    A === void 0 && (A = s() * Math.PI), S === void 0 && (S = (s() * 2 - 1) * r, R = (s() * 2 - 1) * a);
    let _ = Math.cos(A), M = Math.sin(A), D = Math.abs(_) * b + v, J = Math.abs(M) * b + v, I = Math.max(0, Math.floor((S - D + r) * p)), U = Math.min(n - 1, Math.ceil((S + D + r) * p)), z = Math.max(0, Math.floor((R - J + a) * l)), ee = Math.min(t - 1, Math.ceil((R + J + a) * l)), oe = Math.min(0.08, b);
    for (let me = z; me <= ee; me++) {
      let Ae = (me + 0.5) / l - a - R;
      for (let ge = I; ge <= U; ge++) {
        let K = (ge + 0.5) / p - r - S, Re = Math.abs(-K * M + Ae * _);
        if (Re >= v) continue;
        let Fe = Math.abs(K * _ + Ae * M);
        Fe >= b || (i[me * n + ge] += f * (1 - Re / v) * Math.min(1, (b - Fe) / oe));
      }
    }
  }, d = e.shape === "quarters" || e.shape === "half" || e.shape === "thirds" || e.shape === "accordion" || e.shape === "triangle", c = d ? 0.18 : e.shape === "roll" ? 0.45 : e.shape === "twist" ? 0.55 : 1, g = d ? 0.35 : e.shape === "roll" || e.shape === "twist" ? 0.6 : 1;
  e.card && (c *= 0.5, g *= 0.5), e.shape === "envelope" && (c = 0.08, g = 0.25);
  let m = e.w * e.h / (0.84 * 1.1);
  for (let b = 0; b < Math.round(8 * c * m); b++) u(2, 0.08 + s() * 0.1, o() * (0.8 + s() * 0.4) * g);
  for (let b = 0; b < Math.round(46 * c * m); b++) u(0.1 + s() * 0.28, 0.035 + s() * 0.05, o() * (0.45 + s() * 0.4) * g);
  for (let b = 0; b < Math.round(150 * c * m); b++) u(0.03 + s() * 0.1, 0.01 + s() * 0.025, o() * (0.2 + s() * 0.35) * g);
  if (e.shape === "twist")
    for (let b of [-1, 1]) for (let v = 0; v < 26; v++) u(0.12 + s() * 0.3, 0.012 + s() * 0.02, o() * (0.5 + s() * 0.5), b * r * (0.6 + s() * 0.36), (s() * 2 - 1) * a, Math.PI / 2 + b * (0.5 + s() * 0.35));
  if ((e.shape === "half" || e.shape === "quarters") && u(2, 0.022, 0.6, 0, 0, Math.PI / 2), e.shape === "quarters" && u(2, 0.022, -0.55, 0, 0, 0), e.shape === "thirds" && (u(2, 0.02, 0.55, 0, -e.h / 6 * 1.08, 0), u(2, 0.02, -0.55, 0, e.h / 6, 0)), e.shape === "accordion") {
    let b = e.w / 6;
    u(2, 0.02, 0.55, -b, 0, Math.PI / 2), u(2, 0.02, -0.55, 0, 0, Math.PI / 2), u(2, 0.02, 0.55, b, 0, Math.PI / 2);
  }
  e.shape === "triangle" && (u(2, 0.022, 0.6, 0, 0, Math.PI / 4), u(2, 0.022, -0.55, 0, 0, -Math.PI / 4)), e.shape === "envelope" && u(2, 0.02, 0.5, 0, e.foldY, 0);
  let y = Array.isArray(e.states) ? e.states : [];
  if (y.includes("creased"))
    for (let b = 0; b < 90; b++) u(0.04 + s() * 0.12, 8e-3 + s() * 0.015, o() * (0.3 + s() * 0.35));
  if (y.includes("damp")) {
    let b = Le(e.seed * 3 + 17);
    for (let v = 0; v < t; v++) {
      let f = (v + 0.5) / l - a;
      for (let S = 0; S < n; S++) {
        let R = (S + 0.5) / p - r;
        i[v * n + S] += Math.sin((R * 2.2 + f) * 18) * 0.18 + (b(R * 8, f * 8) - 0.5) * 0.22;
      }
    }
  }
  let k = 1e-6;
  for (let b = 0; b < i.length; b++) Math.abs(i[b]) > k && (k = Math.abs(i[b]));
  for (let b = 0; b < i.length; b++) i[b] /= k;
  return i;
}
function bt(e, n, t) {
  let s = Le(e.seed * 7 + 11), o = ne(e.seed * 5 + 3), r = Math.hypot(n, t), a = new Float32Array(n * t), i = (l) => {
    for (let u = 0; u < t; u++) for (let d = 0; d < n; d++) a[u * n + d] = l(d, u);
  }, p = e.form || "corner";
  if (p === "edge") {
    let l = Math.floor(o() * 3);
    i((u, d) => (l === 0 ? t - d : l === 1 ? u : n - u) / (r * 1.6) + (s(u * 0.05, d * 0.05) - 0.5) * 0.35);
  } else if (p === "center") {
    let l = n * (0.3 + 0.4 * o()), u = t * (0.3 + 0.4 * o());
    i((d, c) => Math.hypot(d - l, c - u) / (r * 0.7) + (s(d * 0.04, c * 0.04) - 0.5) * 0.3);
  } else if (p === "spots") {
    let l = 3 + Math.floor(o() * 4), u = [];
    for (let d = 0; d < 200 && u.length < l; d++) {
      let c = n * (0.12 + 0.76 * o()), g = t * (0.12 + 0.76 * o());
      u.every((m) => Math.hypot(m[0] - c, m[1] - g) > r * 0.2) && u.push([c, g]);
    }
    i((d, c) => {
      let g = 1 / 0;
      return u.forEach((m) => {
        g = Math.min(g, Math.hypot(d - m[0], c - m[1]));
      }), g / (r * 0.5) + (s(d * 0.05, c * 0.05) - 0.5) * 0.1;
    });
  } else if (p === "singed")
    i((l, u) => Math.min(l, n - 1 - l, u, t - 1 - u) / (r * 0.5) + (s(l * 0.03, u * 0.03) - 0.5) * 0.12);
  else {
    let l = e.seed % 4, u = l & 1 ? n : 0, d = l & 2 ? t : 0;
    i((c, g) => Math.sqrt((c - u) * (c - u) + (g - d) * (g - d)) / r + (s(c * 0.02, g * 0.02) - 0.5) * 0.32);
  }
  return a;
}

// .build/worker.js
var yt = /* @__PURE__ */ (() => {
  let e, n = 0, t = /* @__PURE__ */ new Map();
  function s() {
    try {
      let r = [ne, Le, gt, bt].map((a) => a.toString()).join(`
`) + `
onmessage = (e) => { const { id, name, args } = e.data; const r = name === 'creases' ? ${gt.name}(...args) : ${bt.name}(...args); postMessage({ id, r }, [r.buffer]); };`;
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
  let o = (r, a) => r === "creases" ? gt(...a) : bt(...a);
  return {
    run(r, a) {
      if (e === void 0 && s(), !e) return Promise.resolve(o(r, a));
      let i = ++n, p = new Promise((u) => {
        let d = (c) => u(c);
        d.redo = () => u(o(r, a)), t.set(i, d);
      });
      e.postMessage({ id: i, name: r, args: a });
      let l = t.get(i);
      return l.t = setTimeout(() => {
        t.delete(i) && l.redo();
      }, 2e4), p;
    }
  };
})();

// .build/print.js
var vt = 1070;
function On(e) {
  return e.split(`
`).map((n) => {
    let t = !1;
    n.startsWith("# ") && (t = !0, n = n.slice(2));
    let s = [], o = /~~(.+?)~~(?:\{(.+?)\})?|\[\[(.+?)\]\]|(\S+)/g, r;
    for (; r = o.exec(n); )
      r[1] !== void 0 ? s.push({ t: r[1], kind: "strike", fix: r[2] || "" }) : r[3] !== void 0 ? s.push({ t: r[3], kind: "redact" }) : s.push({ t: r[4], kind: "w" });
    return { head: t, toks: s };
  });
}
var Nn = (e, n, t) => `${n && !e.hand ? "bold " : ""}${Math.round(t)}px "${e.font}", "Courier Prime", monospace`, Dn = (e) => [e[0] + (200 - e[0]) * 0.4 + 8, e[1] + (170 - e[1]) * 0.3 + 4, e[2] + (120 - e[2]) * 0.3 - 4].map(Math.round);
function Un(e, n, t, s, o, r, a) {
  let i = On(s), p = n.states.includes("faded") ? Dn(t.ink) : t.ink;
  if (n.states.includes("scribbled") && !i.some((k) => k.toks.some((b) => b.kind === "strike"))) {
    let k = [];
    i.forEach((b) => b.toks.forEach((v) => {
      v.kind === "w" && v.t.replace(/\W/g, "").length >= 4 && k.push(v);
    }));
    for (let b = 0; b < 2 && k.length; b++) {
      let v = k.splice(Math.floor(a() * k.length), 1)[0];
      v.kind = "strike", v.fix = Ut[Math.floor(a() * Ut.length)];
    }
  }
  let l = Y(1 - r * 0.34), u = o.cols || 1, d = (o.w - (u - 1) * 40) / u, c = 0, g = o.y, m = o.y + o.h, y = Le(n.seed + 5);
  return i.forEach((k) => {
    let b = k.head ? t.size * (o.headK || 1.35) : t.size, v = k.head ? t.lineHeight * (o.headK || 1.35) : t.lineHeight;
    e.font = Nn(t, k.head, b);
    let f = e.measureText(" ").width, S = k.head && o.headFull ? o.w : d, R = [[]], A = 0;
    if (k.toks.forEach((_) => {
      let M = e.measureText(_.t).width;
      A > 0 && A + f + M > S && (R.push([]), A = 0), R[R.length - 1].push({ ..._, tw: M }), A += (A > 0 ? f : 0) + M;
    }), !k.toks.length) {
      g += v * 0.7;
      return;
    }
    R.forEach((_) => {
      g > m && c < u - 1 && !(k.head && o.headFull) && (c++, g = o.colY || o.y);
      let M = _.reduce((I, U) => I + U.tw, 0) + f * (_.length - 1), D = o.x + (k.head && o.headFull ? 0 : c * (d + 40)), J = o.center || k.head && o.centerHead ? D + (S - M) / 2 : D;
      _.forEach((I) => {
        Bn(e, t, I, J, g, p, a, y), I.kind === "strike" && qn(e, I, J, g, b, a), I.kind === "redact" && (e.fillStyle = `rgba(12,12,14,${l})`, e.fillRect(J - 5, g - b * 0.82, I.tw + 10, b * 1.06)), J += I.tw + f;
      }), g += v;
    }), k.head && o.headFull && (o.colY = g + 10);
  }), g;
}
function Bn(e, n, t, s, o, r, a, i) {
  if (n.hand) {
    e.save(), e.translate(s, o + (a() - 0.5) * 3), e.rotate((a() - 0.5) * 0.04), e.fillStyle = ie(r, 0.9), e.fillText(t.t, 0, 0), e.restore();
    return;
  }
  if (n.carbon) {
    let p = s;
    for (let l of t.t) {
      let u = (a() - 0.5) * 1.5, d = (a() - 0.5) * 1.8;
      e.fillStyle = "rgba(100, 115, 240, 0.28)", e.fillText(l, p + u - 1, o + d), e.fillText(l, p + u + 1, o + d), e.fillText(l, p + u, o + d + 1), e.fillStyle = ie(r, 0.82 + a() * 0.18), e.fillText(l, p + u, o + d), p += e.measureText(l).width;
    }
    return;
  }
  if (n.typewriter) {
    let p = s;
    for (let l of t.t) {
      let u = 0.72 + a() * 0.28;
      n.fades && (u *= 0.35 + 0.65 * i(p * 6e-3, o * 4e-3)), e.fillStyle = ie(r, u), e.fillText(l, p, o + (a() - 0.5) * 2), p += e.measureText(l).width;
    }
    return;
  }
  e.fillStyle = ie(r, 0.92), e.fillText(t.t, s, o);
}
function qn(e, n, t, s, o, r) {
  e.save(), e.strokeStyle = "rgba(165,28,30,0.85)", e.lineWidth = Math.max(2.5, o * 0.08), e.lineCap = "round";
  for (let a = 0; a < 2; a++) {
    e.beginPath();
    let i = s - o * (0.3 + 0.08 * a);
    e.moveTo(t - 4, i + (r() - 0.5) * 4), e.quadraticCurveTo(t + n.tw / 2, i + (r() - 0.5) * 8, t + n.tw + 4, i + (r() - 0.5) * 4), e.stroke();
  }
  n.fix && (e.fillStyle = "rgba(165,28,30,0.9)", e.font = `${Math.round(o * 0.62)}px "Caveat", cursive`, e.translate(t + n.tw * 0.25, s - o * 0.66), e.rotate(-0.06), e.fillText(n.fix, 0, 0)), e.restore();
}
function en(e, n, t, s, o, r, a = 6) {
  let i = Math.ceil(o / a), p = Math.ceil(r / a), l = ye(i, p, !0), u = l.getContext("2d"), d = Math.max(i / n.width, p / n.height);
  u.drawImage(n, (i - n.width * d) / 2, (p - n.height * d) / 2, n.width * d, n.height * d);
  let c = u.getImageData(0, 0, i, p).data;
  e.fillStyle = "rgba(20,20,20,0.88)";
  for (let g = 0; g < p; g++) for (let m = 0; m < i; m++) {
    let y = (g * i + m) * 4, k = (c[y] * 0.3 + c[y + 1] * 0.59 + c[y + 2] * 0.11) / 255, b = a * 0.56 * Math.sqrt(1 - k);
    b > 0.35 && (e.beginPath(), e.arc(t + (m + 0.5) * a, s + (g + 0.5) * a, b, 0, Math.PI * 2), e.fill());
  }
}
function zn(e, n, t) {
  let s = [], o = "";
  return n.split(" ").forEach((r) => {
    let a = o ? o + " " + r : r;
    e.measureText(a).width > t && o ? (s.push(o), o = r) : o = a;
  }), o && s.push(o), s;
}
function tn(e) {
  let n = String(e || "").toUpperCase();
  return n >= "0" && n <= "9" ? [n.charCodeAt(0) - 48 + 2] : n >= "A" && n <= "I" ? [0, n.charCodeAt(0) - 65 + 3] : n >= "J" && n <= "R" ? [1, n.charCodeAt(0) - 74 + 3] : n >= "S" && n <= "Z" ? [2, n.charCodeAt(0) - 83 + 4] : n === "-" ? [1] : n === "&" || n === "+" ? [0] : n === "/" ? [2, 3] : n === "." ? [0, 5, 10] : n === "," ? [2, 5, 10] : n === "=" ? [5, 10] : n === "$" ? [1, 5, 10] : n === "*" ? [1, 6, 10] : [];
}
var Tt = {
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
    e.strokeStyle = ie(s.ink, 0.7), e.lineWidth = 3, e.strokeRect(22, 22, n - 44, t - 44), e.lineWidth = 1.2, e.strokeRect(32, 32, n - 64, t - 64), e.setLineDash([3, 7]), e.lineWidth = 3, e.strokeStyle = ie(s.ink, 0.55), e.beginPath(), e.moveTo(o, 22), e.lineTo(o, t - 22), e.stroke(), e.setLineDash([]), e.save(), e.translate(o + (n - o) / 2, t / 2), e.rotate(-Math.PI / 2), e.fillStyle = ie(s.ink, 0.85), e.textAlign = "center", e.font = `bold 26px "${s.font}"`, e.fillText("No. 0042", 0, -46), e.font = `40px "${s.font}"`, e.fillText("C \xB7 12", 0, 2), e.font = `22px "${s.font}"`, e.fillText("ROW \xB7 SEAT", 0, 36), e.font = `italic 17px "${s.font}"`, e.fillText("non-refundable", 0, 64), e.restore();
  },
  memo(e, n) {
    e.fillStyle = "rgba(22,22,26,0.92)", e.beginPath(), e.arc(130, 120, 34, 0, Math.PI * 2), e.fill(), e.fillStyle = "rgba(245,244,240,1)", e.beginPath(), e.moveTo(130, 96), e.lineTo(154, 136), e.lineTo(106, 136), e.closePath(), e.fill(), e.fillStyle = "rgba(22,22,26,0.92)", e.font = 'bold 54px "Courier Prime"', e.fillText("MEMORANDUM", 184, 128), e.font = '22px "Courier Prime"', e.fillText("Research division \xB7 internal use", 186, 160), e.fillRect(96, 196, n - 192, 3), e.save(), e.translate(n - 250, 270), e.rotate(-0.12), e.strokeStyle = "rgba(175,30,30,0.7)", e.lineWidth = 4, e.strokeRect(-12, -44, 268, 60), e.fillStyle = "rgba(175,30,30,0.7)", e.font = 'bold 36px "Courier Prime"', e.fillText("CONFIDENTIAL", 0, 0), e.restore();
  },
  newspaper(e, n, t, s, o, r) {
    e.fillStyle = "rgba(25,25,25,0.9)", e.font = 'bold 50px "Libre Baskerville"', e.textAlign = "center", e.fillText("THE FOLDTOWN HERALD", n / 2, 92), e.font = 'italic 20px "Libre Baskerville"', e.fillText("evening edition \xB7 friday", n / 2, 126), e.textAlign = "left", e.fillRect(40, 140, n - 80, 3), e.fillRect(40, 147, n - 80, 1), e.fillRect(n / 2 - 1, 330, 1, t - 380);
    let a = n / 2 + 20, i = 336, p = n / 2 - 60, l = 230;
    if (e.fillStyle = "rgba(40,40,40,0.12)", e.fillRect(a, i, p, l), r.photo) en(e, r.photo, a, i, p, l);
    else
      for (let u = i + 4; u < i + l; u += 7) for (let d = a + 4; d < a + p; d += 7) {
        let c = 0.5 + 0.5 * Math.sin(d * 0.02) * Math.cos(u * 0.025);
        e.fillStyle = `rgba(20,20,20,${0.55 * c})`, e.beginPath(), e.arc(d, u, 1.2 + 2 * c, 0, Math.PI * 2), e.fill();
      }
    e.fillStyle = "rgba(25,25,25,0.85)", e.font = 'italic 17px "Libre Baskerville"', e.fillText("The harbor at dusk, yesterday.", a, i + l + 24);
  },
  sticky(e, n) {
    let t = e.createLinearGradient(0, 0, 0, 70);
    t.addColorStop(0, "rgba(170,130,20,0.18)"), t.addColorStop(1, "rgba(170,130,20,0)"), e.fillStyle = t, e.fillRect(0, 0, n, 70);
  },
  polaroid(e, n, t, s, o, r) {
    let a = Math.round(n * 0.065), i = n - 2 * a;
    if (e.fillStyle = "#1a1714", e.fillRect(a, a, i, i), r.img) {
      let p = r.img.width, l = r.img.height, u = Math.max(i / p, i / l);
      e.save(), e.beginPath(), e.rect(a, a, i, i), e.clip(), e.filter = "saturate(0.8) contrast(0.92) brightness(1.05)", e.drawImage(r.img, a + (i - p * u) / 2, a + (i - l * u) / 2, p * u, l * u), e.filter = "none", e.fillStyle = "rgba(255,200,140,0.10)", e.fillRect(a, a, i, i);
      let d = e.createRadialGradient(a + i / 2, a + i / 2, i * 0.25, a + i / 2, a + i / 2, i * 0.75);
      d.addColorStop(0, "rgba(0,0,0,0)"), d.addColorStop(1, "rgba(0,0,0,0.45)"), e.fillStyle = d, e.fillRect(a, a, i, i), e.restore();
    }
    e.strokeStyle = "rgba(0,0,0,0.25)", e.lineWidth = 2, e.strokeRect(a, a, i, i);
  },
  envelope(e, n, t, s) {
    let o = Math.round(s.flap / s.h * t), r = o + (t - o) * 0.48;
    e.strokeStyle = "rgba(110,85,50,0.35)", e.lineWidth = 2.2, e.beginPath(), e.moveTo(0, t), e.lineTo(n / 2, r), e.lineTo(n, t), e.stroke(), e.beginPath(), e.moveTo(0, o), e.lineTo(n * 0.42, r - 8), e.moveTo(n, o), e.lineTo(n * 0.58, r - 8), e.stroke(), e.save(), e.beginPath(), e.moveTo(0, o), e.lineTo(n / 2, 6), e.lineTo(n, o), e.closePath(), e.clip(), e.strokeStyle = "rgba(70,85,120,0.22)", e.lineWidth = 3;
    for (let a = -t; a < n + t; a += 14)
      e.beginPath(), e.moveTo(a, 0), e.lineTo(a + o, o), e.stroke();
    e.restore();
  },
  blueprint(e, n, t, s, o) {
    if (!o?.color) {
      let m = e.createRadialGradient(n / 2, t / 2, n * 0.15, n / 2, t / 2, n * 0.72);
      m.addColorStop(0, "rgba(16, 52, 92, 0.45)"), m.addColorStop(1, "rgba(6, 18, 34, 0.85)"), e.fillStyle = m, e.fillRect(0, 0, n, t);
    }
    e.strokeStyle = "rgba(65, 175, 255, 0.13)", e.lineWidth = 1;
    for (let m = 0; m < n; m += 15)
      e.beginPath(), e.moveTo(m, 0), e.lineTo(m, t), e.stroke();
    for (let m = 0; m < t; m += 15)
      e.beginPath(), e.moveTo(0, m), e.lineTo(n, m), e.stroke();
    e.strokeStyle = "rgba(95, 200, 255, 0.32)", e.lineWidth = 1.4;
    for (let m = 0; m < n; m += 60)
      e.beginPath(), e.moveTo(m, 0), e.lineTo(m, t), e.stroke();
    for (let m = 0; m < t; m += 60)
      e.beginPath(), e.moveTo(0, m), e.lineTo(n, m), e.stroke();
    e.strokeStyle = "rgba(140, 225, 255, 0.52)", e.lineWidth = 2.2;
    for (let m = 0; m < n; m += 180)
      e.beginPath(), e.moveTo(m, 0), e.lineTo(m, t), e.stroke();
    for (let m = 0; m < t; m += 180)
      e.beginPath(), e.moveTo(0, m), e.lineTo(n, m), e.stroke();
    let r = 26;
    e.strokeStyle = "rgba(170, 235, 255, 0.75)", e.lineWidth = 3, e.strokeRect(r, r, n - 2 * r, t - 2 * r), e.lineWidth = 1.2, e.strokeRect(r + 6, r + 6, n - 2 * r - 12, t - 2 * r - 12), e.fillStyle = "rgba(180, 235, 255, 0.75)", e.font = 'bold 12px "Courier Prime", monospace', e.textAlign = "center", e.textBaseline = "middle", ["A", "B", "C", "D", "E", "F"].forEach((m, y) => {
      let k = r + (y + 0.5) * ((n - 2 * r) / 6);
      e.fillText(m, k, r - 12), e.fillText(m, k, t - r + 12);
    }), ["1", "2", "3", "4"].forEach((m, y) => {
      let k = r + (y + 0.5) * ((t - 2 * r) / 4);
      e.fillText(m, r - 12, k), e.fillText(m, n - r + 12, k);
    }), [[r, r], [n - r, r], [r, t - r], [n - r, t - r]].forEach(([m, y]) => {
      e.beginPath(), e.moveTo(m - 10, y), e.lineTo(m + 10, y), e.moveTo(m, y - 10), e.lineTo(m, y + 10), e.stroke();
    });
    let a = n * 0.72, i = t * 0.4;
    e.save(), e.strokeStyle = "rgba(130, 215, 255, 0.55)", e.lineWidth = 1.5, e.setLineDash([12, 4, 3, 4]), e.beginPath(), e.moveTo(a - 170, i), e.lineTo(a + 170, i), e.stroke(), e.beginPath(), e.moveTo(a, i - 150), e.lineTo(a, i + 150), e.stroke(), e.setLineDash([]), e.strokeStyle = "rgba(200, 240, 255, 0.85)", e.lineWidth = 2.4, e.beginPath(), e.arc(a, i, 130, 0, Math.PI * 2), e.stroke(), e.lineWidth = 1.8, e.beginPath(), e.arc(a, i, 85, 0, Math.PI * 2), e.stroke(), e.beginPath(), e.arc(a, i, 42, 0, Math.PI * 2), e.stroke(), e.strokeStyle = "rgba(110, 205, 255, 0.6)", e.lineWidth = 1.2, e.setLineDash([6, 4]), e.beginPath(), e.arc(a, i, 108, 0, Math.PI * 2), e.stroke(), e.setLineDash([]), e.fillStyle = "rgba(8, 25, 45, 0.9)", e.strokeStyle = "rgba(210, 245, 255, 0.9)", e.lineWidth = 1.5;
    for (let m = 0; m < 8; m++) {
      let y = m * Math.PI / 4, k = a + Math.cos(y) * 108, b = i + Math.sin(y) * 108;
      e.beginPath(), e.arc(k, b, 9, 0, Math.PI * 2), e.fill(), e.stroke();
    }
    e.save(), e.beginPath(), e.arc(a, i, 130, Math.PI, Math.PI * 1.5), e.lineTo(a, i), e.closePath(), e.clip(), e.strokeStyle = "rgba(100, 190, 255, 0.35)", e.lineWidth = 1.2;
    for (let m = -150; m < 150; m += 8)
      e.beginPath(), e.moveTo(a + m - 150, i - 150), e.lineTo(a + m + 150, i + 150), e.stroke();
    e.restore(), e.strokeStyle = "rgba(170, 230, 255, 0.7)", e.lineWidth = 1.5, e.fillStyle = "rgba(215, 245, 255, 0.9)", e.font = 'bold 12px "Courier Prime", monospace', e.beginPath(), e.moveTo(a - 130, i + 145), e.lineTo(a + 130, i + 145), e.moveTo(a - 130, i + 135), e.lineTo(a - 130, i + 155), e.moveTo(a + 130, i + 135), e.lineTo(a + 130, i + 155), e.stroke(), e.fillText("<-- \xD8 260.00 mm -->", a, i + 158), e.beginPath(), e.moveTo(a + 30, i - 30), e.lineTo(a + 80, i - 80), e.lineTo(a + 140, i - 80), e.stroke(), e.textAlign = "left", e.fillText("BORE \xD8 42.0 H7", a + 85, i - 86);
    let p = a + 80, l = i - 130;
    e.strokeStyle = "rgba(160, 225, 255, 0.6)", e.lineWidth = 1.2, e.beginPath(), e.arc(p + 40, l, 10, 0, Math.PI * 2), e.stroke(), e.beginPath(), e.arc(p + 40, l, 4, 0, Math.PI * 2), e.stroke(), e.beginPath(), e.moveTo(p, l - 10), e.lineTo(p + 20, l - 5), e.lineTo(p + 20, l + 5), e.lineTo(p, l + 10), e.closePath(), e.stroke(), e.restore();
    let u = 390, d = 135, c = n - r - 6 - u, g = t - r - 6 - d;
    e.fillStyle = "rgba(8, 26, 48, 0.92)", e.fillRect(c, g, u, d), e.strokeStyle = "rgba(170, 235, 255, 0.8)", e.lineWidth = 2, e.strokeRect(c, g, u, d), e.lineWidth = 1.2, e.beginPath(), e.moveTo(c, g + 38), e.lineTo(c + u, g + 38), e.moveTo(c, g + 86), e.lineTo(c + u, g + 86), e.moveTo(c + 240, g + 38), e.lineTo(c + 240, g + d), e.moveTo(c + 120, g + 86), e.lineTo(c + 120, g + d), e.stroke(), e.fillStyle = "rgba(215, 245, 255, 0.95)", e.textAlign = "left", e.font = 'bold 15px "Courier Prime", monospace', e.fillText("AQUILA DYNAMICS \xB7 DEFENSE & NAVAL", c + 14, g + 24), e.font = 'bold 13px "Courier Prime", monospace', e.fillText("VALVE ASSEMBLY \xB7 HIGH PRESSURE", c + 14, g + 58), e.font = '11px "Courier Prime", monospace', e.fillStyle = "rgba(165, 220, 255, 0.85)", e.fillText("DWG NO: AQ-9042-REV-D", c + 14, g + 76), e.fillText("SCALE: 1:25", c + 14, g + 110), e.fillText("SHT 1 OF 1", c + 134, g + 110), e.fillText("DRN: E.M.", c + 252, g + 58), e.fillText("CHK: R.A.", c + 252, g + 76), e.fillStyle = "rgba(100, 255, 180, 0.9)", e.font = 'bold 11px "Courier Prime", monospace', e.fillText("APPROVED", c + 252, g + 110), e.strokeStyle = "rgba(230, 248, 255, 0.22)", e.lineWidth = 2.5, e.beginPath(), e.moveTo(n / 2, r), e.lineTo(n / 2, t - r), e.stroke(), e.beginPath(), e.moveTo(r, t / 2), e.lineTo(n - r, t / 2), e.stroke();
  },
  postcard(e, n, t) {
    e.strokeStyle = "rgba(180, 160, 130, 0.4)", e.lineWidth = 2, e.strokeRect(24, 24, n - 48, t - 48);
  },
  punchcard(e, n, t, s, o) {
    e.save(), e.strokeStyle = "rgba(100, 85, 70, 0.45)", e.lineWidth = 1.5, e.beginPath(), e.moveTo(0, 50), e.lineTo(50, 0), e.stroke(), e.fillStyle = "rgba(40, 85, 130, 0.25)", e.fillRect(0, 0, n, t * 0.16), e.strokeStyle = "rgba(40, 85, 130, 0.55)", e.lineWidth = 2, e.beginPath(), e.moveTo(0, t * 0.16), e.lineTo(n, t * 0.16), e.stroke();
    let r = 34, i = (n - 34 - r) / 79, p = t * 0.23, l = (t * 0.94 - p) / 11, u = (o.text.split(`
`)[0] || "").slice(0, 80);
    e.fillStyle = "rgba(25, 25, 25, 0.92)", e.font = 'bold 15px "Courier Prime", monospace', e.textAlign = "center";
    for (let d = 0; d < u.length; d++)
      u[d] !== " " && e.fillText(u[d], r + d * i, 24);
    e.fillStyle = "rgba(70, 60, 50, 0.65)", e.font = '9px "VT323", monospace';
    for (let d = 1; d <= 80; d++) {
      let c = r + (d - 1) * i;
      (d === 1 || d % 5 === 0) && (e.fillText(String(d), c, t * 0.14), e.fillText(String(d), c, t - 12));
    }
    e.font = '11px "VT323", monospace', e.fillStyle = "rgba(90, 80, 70, 0.45)";
    for (let d = 0; d < 10; d++) {
      let c = p + (d + 2) * l;
      for (let g = 1; g <= 80; g++) {
        let m = r + (g - 1) * i;
        e.fillText(String(d), m, c);
      }
    }
    e.fillStyle = "rgba(80, 70, 60, 0.7)", e.font = 'bold 11px "Courier Prime", monospace', e.fillText("IBM 5081", n - 80, t - 28), e.fillStyle = "rgba(15, 12, 10, 0.45)";
    for (let d = 0; d < u.length; d++) {
      let c = tn(u[d]), g = r + d * i;
      for (let m of c) {
        let y = p + m * l;
        e.fillRect(g - 5, y - 10, 10, 20);
      }
    }
    e.restore();
  },
  shipping(e, n, t) {
    e.strokeStyle = "rgba(70, 50, 30, 0.35)", e.lineWidth = 2, e.strokeRect(30, 30, n - 60, t - 60);
    let s = t - 180, o = n - 140, r = 70;
    e.fillStyle = "#1c1612";
    for (let a = r; a < r + o; ) {
      let i = 2 + a * 17 % 7, p = 3 + a * 31 % 6;
      e.fillRect(a, s, i, 70), a += i + p;
    }
    e.font = 'bold 18px "Courier Prime", monospace', e.textAlign = "center", e.fillText("* EXP-9042-CRUMPLE *", n / 2, s + 100), e.textAlign = "left", e.save(), e.fillStyle = "rgba(50, 35, 20, 0.85)", e.font = "bold 28px sans-serif", e.fillText("\u2191 \u2191  THIS SIDE UP", 60, 80), e.restore();
  },
  kraft(e, n, t, s, o, r) {
    Tt.shipping && Tt.shipping(e, n, t, s, o, r);
  },
  parchment(e, n, t, s, o) {
    o?.seal || nn(e, n / 2, t - 140, { symbol: "V", color: "red" });
  },
  ledger(e, n, t) {
    e.strokeStyle = "rgba(60, 110, 85, 0.6)", e.lineWidth = 2.5, e.strokeRect(30, 30, n - 60, t - 60), e.lineWidth = 1, e.strokeRect(34, 34, n - 60 - 8, t - 60 - 8), e.fillStyle = "rgba(235, 246, 238, 0.9)", e.fillRect(36, 36, n - 60 - 12, 110), e.strokeStyle = "rgba(60, 110, 85, 0.4)", e.strokeRect(36, 36, n - 60 - 12, 110), e.fillStyle = "rgba(25, 55, 40, 0.92)", e.textAlign = "center", e.font = 'bold 28px "Courier Prime", monospace', e.fillText("CONTINENTAL MERCANTILE CO. \xB7 GENERAL LEDGER", n / 2, 72), e.font = 'italic 16px "Libre Baskerville", serif', e.fillStyle = "rgba(35, 75, 55, 0.85)", e.fillText("FOLIO NO. 142 \u2014 ACCOUNT OF RECEIPTS & DISBURSEMENTS \u2014 ANNO 1928", n / 2, 102), e.fillRect(70, 118, n - 60 - 80, 2);
    let o = 146, r = t - 30 - 6, a = 210, i = n - 430, p = n - 370, l = n - 250, u = n - 130, d = 42;
    for (let c = o + d, g = 0; c < r; c += d, g++)
      g % 2 === 1 && (e.fillStyle = "rgba(180, 220, 200, 0.15)", e.fillRect(36, c, n - 60 - 12, d)), e.strokeStyle = "rgba(90, 160, 130, 0.35)", e.lineWidth = 1, e.beginPath(), e.moveTo(36, c), e.lineTo(n - 30 - 6, c), e.stroke();
    e.fillStyle = "rgba(40, 90, 65, 0.88)", e.fillRect(36, o, n - 60 - 12, d), e.fillStyle = "#f0f8f2", e.font = 'bold 14px "Courier Prime", monospace', e.textAlign = "center", e.fillText("DATE", (36 + a) / 2, o + 26), e.fillText("PARTICULARS / DESCRIPTION", (a + i) / 2, o + 26), e.fillText("FOL", (i + p) / 2, o + 26), e.fillText("DEBITS ($ | \xA2)", (p + l) / 2, o + 26), e.fillText("CREDITS ($ | \xA2)", (l + u) / 2, o + 26), e.fillText("BALANCE", (u + n - 30 - 6) / 2, o + 26), e.strokeStyle = "rgba(215, 45, 45, 0.65)", e.lineWidth = 1.5, e.beginPath(), e.moveTo(36, o), e.lineTo(36, r), e.stroke(), e.beginPath(), e.moveTo(40, o), e.lineTo(40, r), e.stroke(), e.strokeStyle = "rgba(70, 120, 160, 0.45)", e.lineWidth = 1.2, e.beginPath(), e.moveTo(a, o), e.lineTo(a, r), e.stroke(), e.beginPath(), e.moveTo(i, o), e.lineTo(i, r), e.stroke(), e.strokeStyle = "rgba(215, 45, 45, 0.65)", e.lineWidth = 1.8, e.beginPath(), e.moveTo(p, o), e.lineTo(p, r), e.stroke(), e.beginPath(), e.moveTo(l, o), e.lineTo(l, r), e.stroke(), e.beginPath(), e.moveTo(u, o), e.lineTo(u, r), e.stroke(), e.beginPath(), e.moveTo(u + 3, o), e.lineTo(u + 3, r), e.stroke(), e.strokeStyle = "rgba(60, 110, 190, 0.45)", e.lineWidth = 1, e.beginPath(), e.moveTo(l - 35, o + d), e.lineTo(l - 35, r), e.stroke(), e.beginPath(), e.moveTo(u - 35, o + d), e.lineTo(u - 35, r), e.stroke(), e.beginPath(), e.moveTo(n - 30 - 41, o + d), e.lineTo(n - 30 - 41, r), e.stroke(), e.strokeStyle = "rgba(215, 45, 45, 0.85)", e.lineWidth = 1.5, e.beginPath(), e.moveTo(p, r - 48), e.lineTo(n - 30 - 6, r - 48), e.stroke(), e.beginPath(), e.moveTo(p, r - 12), e.lineTo(n - 30 - 6, r - 12), e.stroke(), e.beginPath(), e.moveTo(p, r - 8), e.lineTo(n - 30 - 6, r - 8), e.stroke();
  },
  carbon(e, n, t, s, o) {
    if (!o?.color) {
      let a = e.createLinearGradient(0, 0, n, t);
      a.addColorStop(0, "rgba(26, 24, 36, 0.95)"), a.addColorStop(0.5, "rgba(22, 20, 32, 0.98)"), a.addColorStop(1, "rgba(18, 16, 26, 0.95)"), e.fillStyle = a, e.fillRect(0, 0, n, t);
    }
    e.save();
    for (let a = 0; a < 6; a++) {
      let i = a % 2 ? n - 60 : 60, p = t * (0.15 + a * 0.15), l = e.createRadialGradient(i, p, 10, i, p, 90);
      l.addColorStop(0, "rgba(90, 80, 150, 0.18)"), l.addColorStop(1, "rgba(20, 18, 30, 0)"), e.fillStyle = l, e.beginPath(), e.arc(i, p, 90, 0, Math.PI * 2), e.fill();
    }
    e.strokeStyle = "rgba(160, 170, 240, 0.35)", e.lineWidth = 1.5, e.setLineDash([4, 6]), e.beginPath(), e.moveTo(30, 40), e.lineTo(n - 30, 40), e.stroke(), e.setLineDash([]), e.fillStyle = "rgba(150, 160, 220, 0.55)", e.font = '11px "Courier Prime", monospace', e.textAlign = "center", e.fillText("\xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7  TEAR ALONG PERFORATION  \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7", n / 2, 34), e.strokeStyle = "rgba(140, 150, 235, 0.45)", e.lineWidth = 2.2, e.strokeRect(36, 56, n - 72, t - 96), e.lineWidth = 1, e.strokeRect(42, 62, n - 84, t - 108), e.fillStyle = "rgba(225, 60, 75, 0.88)", e.font = 'bold 20px "Special Elite", monospace', e.textAlign = "right", e.fillText("\u2116 049182", n - 60, 95), e.fillStyle = "rgba(180, 190, 255, 0.9)", e.textAlign = "left", e.font = 'bold 22px "Courier Prime", monospace', e.fillText("CUSTOMER DUPLICATE RECEIPT", 64, 98), e.font = '12px "Courier Prime", monospace', e.fillStyle = "rgba(140, 155, 230, 0.7)", e.fillText("INTER-OFFICE TRANSFER VOUCHER \xB7 SECOND VIA", 64, 118), e.fillRect(64, 130, n - 128, 2), e.font = '13px "Courier Prime", monospace', e.fillStyle = "rgba(135, 145, 220, 0.65)", [
      ["DATE OF RECORD: ____________________________", 64, 168],
      ["TRANSACTION REF: __________________________", n / 2 + 20, 168],
      ["RECEIVED FROM: __________________________________________________________________", 64, 210],
      ["SUM AMOUNT: ____________________________________________________________________", 64, 252]
    ].forEach(([a, i, p]) => e.fillText(a, i, p)), e.save(), e.translate(n - 220, t - 140), e.rotate(-0.16), e.strokeStyle = "rgba(150, 160, 255, 0.65)", e.lineWidth = 4, e.strokeRect(-110, -32, 220, 64), e.lineWidth = 1.5, e.strokeRect(-104, -26, 208, 52), e.fillStyle = "rgba(150, 160, 255, 0.75)", e.font = 'bold 28px "Courier Prime", monospace', e.textAlign = "center", e.fillText("DUPLICATE", 0, 10), e.restore(), e.restore();
  }
};
function Gn(e, n, t, s, o) {
  e.strokeStyle = "rgba(100, 90, 75, 0.4)", e.lineWidth = 2, e.beginPath(), e.moveTo(n / 2, 40), e.lineTo(n / 2, t - 40), e.stroke();
  let r = n - 140, a = 50;
  e.strokeStyle = "rgba(100, 90, 75, 0.5)", e.lineWidth = 1.5, e.setLineDash([4, 4]), e.strokeRect(r, a, 90, 110), e.setLineDash([]), e.fillStyle = "rgba(120, 100, 80, 0.5)", e.font = '12px "Courier Prime", monospace', e.textAlign = "center", e.fillText("AFFIX", r + 45, a + 50), e.fillText("STAMP", r + 45, a + 68), e.strokeStyle = "rgba(40, 50, 80, 0.55)", e.lineWidth = 2, e.beginPath(), e.arc(r - 30, a + 60, 44, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(40, 50, 80, 0.6)", e.font = 'bold 13px "Courier Prime", monospace', e.fillText("POST", r - 30, a + 64), e.textAlign = "left", e.strokeStyle = "rgba(120, 110, 95, 0.4)", e.lineWidth = 1.5;
  for (let i = t * 0.45; i < t - 60; i += 44)
    e.beginPath(), e.moveTo(n / 2 + 40, i), e.lineTo(n - 40, i), e.stroke();
}
function Xn(e, n, t, s, o, r) {
  let a = Math.round(s.flap / s.h * t);
  e.save(), e.translate(n / 2, a * 0.36), e.fillStyle = "rgba(140,20,24,0.95)", e.beginPath();
  for (let l = 0; l <= Math.PI * 2 + 0.01; l += 0.2) {
    let u = 46 * (1 + 0.06 * Math.sin(l * 7 + r() * 0.3));
    l ? e.lineTo(Math.cos(l) * u, Math.sin(l) * u) : e.moveTo(u, 0);
  }
  e.fill(), e.strokeStyle = "rgba(90,10,14,0.8)", e.lineWidth = 3, e.beginPath(), e.arc(0, 0, 30, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(80,8,12,0.9)", e.font = 'bold 30px "Special Elite"', e.textAlign = "center", e.fillText("A", 0, 11), e.restore();
  let i = n - 180, p = a + 40;
  e.fillStyle = "rgba(70,105,140,0.85)", e.fillRect(i, p, 120, 140), e.strokeStyle = "rgba(255,255,255,0.8)", e.setLineDash([4, 4]), e.lineWidth = 3, e.strokeRect(i + 6, p + 6, 108, 128), e.setLineDash([]), e.fillStyle = "rgba(255,255,255,0.9)", e.font = 'bold 44px "Special Elite"', e.textAlign = "center", e.fillText("25", i + 60, p + 88), e.strokeStyle = "rgba(40,40,60,0.55)", e.lineWidth = 3, e.beginPath(), e.arc(i - 30, p + 90, 58, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(40,40,60,0.6)", e.font = '20px "Courier Prime"', e.fillText("POST", i - 30, p + 98);
  for (let l = 0; l < 4; l++)
    e.beginPath(), e.moveTo(i - 120, p + 60 + l * 18), e.bezierCurveTo(i - 60, p + 50 + l * 18, i, p + 70 + l * 18, i + 60, p + 60 + l * 18), e.stroke();
  e.textAlign = "left", e.font = '52px "Caveat"', e.fillStyle = ie(s.ink, 0.9), o.address.split(`
`).forEach((l, u) => e.fillText(l, 150, a + 330 + u * 62));
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
function Vn(e, n, t, s) {
  let a = (n - 88 - 26) / 2;
  e.fillStyle = "rgba(25,25,25,0.9)", e.font = 'bold 34px "Libre Baskerville"', e.fillText("CLASSIFIEDS", 44, 92), e.fillRect(40, 108, n - 88 + 8, 3);
  let i = 44 + a + 26, p = 132, l = Math.round(a * 0.68);
  s.photo && en(e, s.photo, i, p, a, l), e.font = 'italic 16px "Libre Baskerville"', e.fillText("Old town, archive photo.", i, p + l + 22);
  let u = t - 60, d = [150, p + l + 60], c = 0, g = 44, m = d[0];
  for (let [y, k] of Yn) {
    e.font = '18px "Libre Baskerville"';
    let b = zn(e, y + " " + k, a);
    if (m + b.length * 24 > u && (c === 1 || (c = 1, g = i, m = d[1], m + b.length * 24 > u)))
      break;
    b.forEach((v, f) => {
      if (f === 0) {
        e.font = 'bold 19px "Libre Baskerville"', e.fillText(y, g, m);
        let S = e.measureText(y + " ").width;
        e.font = '18px "Libre Baskerville"', e.fillText(v.slice(y.length + 1), g + S, m);
      } else
        e.font = '18px "Libre Baskerville"', e.fillText(v, g, m);
      m += 24;
    }), m += 16;
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
async function Hn(e, n, t, s = "") {
  if (typeof Blob > "u" || typeof URL > "u" || !URL.createObjectURL) return null;
  let o = `<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${t}">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;box-sizing:border-box;margin:0;padding:0;overflow:hidden;${s}">
        ${e}
      </div>
    </foreignObject>
  </svg>`, r = new Blob([o], { type: "image/svg+xml;charset=utf-8" }), a = URL.createObjectURL(r), i = new Image();
  return new Promise((p) => {
    i.onload = () => {
      URL.revokeObjectURL(a), p(i);
    }, i.onerror = () => {
      URL.revokeObjectURL(a), p(null);
    }, i.src = a;
  });
}
async function tt(e, n, t, s) {
  let o = Math.round(n.w * vt), r = Math.round(n.h * vt), a = ye(o, r), i = a.getContext("2d"), p = t === "front", l = ne(e.seed * 31 + (p ? 5 : 9)), u = {};
  n.photo && p && (u.img = await ht(e.image || Ie.assets + "photos/sunset.webp")), e.type === "newspaper" && (p || !e.back) && (u.photo = await ht(Ie.assets + "photos/" + (p ? "sea" : "city") + ".webp"));
  let d = e.type === "notebook" || e.type === "form" || e.type === "blueprint" || e.type === "ledger";
  Tt[e.type] && (p || d) && Tt[e.type](i, o, r, n, e, u), e.watermark && ao(i, o, r, e.watermark), e.type === "envelope" && !p && Xn(i, o, r, n, e, l), e.type === "postcard" && !p && !e.back && Gn(i, o, r, e, l), e.type === "newspaper" && !p && !e.back && Vn(i, o, r, u), (e.type === "parchment" || e.type === "postcard" || e.states.includes("aged")) && io(i, o, r, e, l);
  let c = e.type === "envelope" ? "" : p ? e.text : e.back, g = p ? Wt[e.type] ? Wt[e.type](o, r, n) : { x: 50, y: 50, w: o - 100, h: r - 100 } : { x: Math.round(n.x * 0.8), y: Math.min(n.y, Math.round(r * 0.28)), w: o - Math.round(n.x * 1.6), h: r - Math.min(n.y, Math.round(r * 0.28)) - 40, center: e.type === "ticket" };
  e.type === "ticket" && !p && (g.x = Math.round(o * 0.55), g.w = Math.round(o * 0.4)), e.type === "postcard" && !p && (g.x = Math.round(o * 0.54), g.w = Math.round(o * 0.42)), e.type === "polaroid" && !p && (g = { x: 60, y: Math.round(r * 0.3), w: o - 120, h: r * 0.6, center: !0 });
  let m = c && g ? Un(i, e, n, c, g, s, l) : 0;
  if (p && e.rich && g) {
    if (e.rich.mode === "canvas" && typeof e.rich.body == "function")
      try {
        await e.rich.body(i, g, o, r);
      } catch {
      }
    else if (typeof e.rich.body == "string")
      try {
        let k = await Hn(e.rich.body, g.w, g.h, e.rich.style || "");
        k && i.drawImage(k, g.x, g.y);
      } catch {
      }
  }
  let y = ne(e.seed * 17 + (p ? 1 : 2));
  e.states.includes("coffee") && await Kn(a, i, o, r, e, p), e.states.includes("water") && await $n(i, o, r, e, p), e.states.includes("prints") && await jn(i, o, r, e, p), e.states.includes("wine") && await Jn(a, i, o, r, e, p), e.states.includes("ink") && Qn(i, o, r, e, p), e.states.includes("aged") && xn(i, o, r, y), e.states.includes("faded") && Wn(i, o, r, e), e.states.includes("foxing") && eo(i, o, r, e), e.states.includes("staple") && oo(i, o, r, e, p), e.states.includes("clip") && ro(i, o, r, e, p), e.states.includes("grease") && so(i, o, r, e, p), e.states.includes("dogear") && lo(i, o, r, e, p), e.states.includes("damp") && fo(i, o, r, e), e.states.includes("creased") && uo(i, o, r, e);
  for (let k of e.states)
    if (mt[k])
      try {
        await mt[k](i, a, o, r, e, p, y);
      } catch {
      }
  return p && e.seal && nn(i, o / 2, r - 140, e.seal), p && e.states.includes("stamp") && to(i, o, r, e, m), p && e.states.includes("tape") && no(i, o, r, e), a;
}
function qt(e, n, t, s, o, r, a, i) {
  e.save(), e.globalCompositeOperation = "multiply", e.globalAlpha = a, e.translate(t, s), i || e.scale(-1, 1), e.rotate(r), e.drawImage(n, -o / 2, -o / 2, o, o), e.restore();
}
async function $n(e, n, t, s, o) {
  let r = await Xe("water");
  if (!r) return;
  let a = ne(s.seed * 23 + 4), i = n * (0.25 + 0.5 * a()), p = t * (0.25 + 0.5 * a()), l = Math.min(n, t) * (0.8 + 0.35 * a()), u = a() * Math.PI * 2;
  qt(e, r, o ? i : n - i, p, l, u, o ? 0.85 : 0.6, o);
}
async function jn(e, n, t, s, o) {
  let r = typeof s.wearIntensity == "number" ? s.wearIntensity : 1;
  if (r <= 0) return;
  let a = await Xe("prints");
  if (!a) return;
  let i = ne(s.seed * 29 + 6);
  for (let p = 0; p < 2; p++) {
    let l = n * (p ? 0.86 - 0.08 * i() : 0.1 + 0.12 * i()), u = t * (0.72 + 0.2 * i()), d = Math.min(n, t) * (0.22 + 0.08 * i()) * r, c = i() * Math.PI * 2;
    qt(e, a, o ? l : n - l, u, d, c, Y((o ? 0.6 : 0.4) * r), o);
  }
}
async function Kn(e, n, t, s, o, r) {
  let a = typeof o.wearIntensity == "number" ? o.wearIntensity : 1;
  if (a <= 0) return;
  let i = ne(o.seed * 17 + 1), p = t * (0.3 + 0.4 * i()), l = s * (0.35 + 0.35 * i()), u = Math.min(t, s) * (0.13 + 0.07 * i()) * a, d = i() * Math.PI * 2, c = r ? p : t - p, g = await Xe("coffee");
  if (r) {
    let y = ye(t, s);
    y.getContext("2d").drawImage(e, 0, 0), n.save(), n.beginPath(), n.arc(c, l, u * 1.02, 0, Math.PI * 2), n.clip(), n.clearRect(c - u * 1.1, l - u * 1.1, u * 2.2, u * 2.2), n.filter = "blur(2.5px)", n.globalAlpha = Y(0.85 * a), n.drawImage(y, 0, 0), n.restore();
  }
  if (g) {
    qt(n, g, c, l, u * 3.4, d, Y((r ? 0.95 : 0.55) * a), r);
    return;
  }
  n.save();
  let m = n.createRadialGradient(c, l, u * 0.1, c, l, u);
  m.addColorStop(0, `rgba(140,95,45,${0.1 * a})`), m.addColorStop(0.82, `rgba(125,82,36,${0.17 * a})`), m.addColorStop(1, "rgba(110,70,30,0)"), n.fillStyle = m, n.beginPath(), n.arc(c, l, u, 0, Math.PI * 2), n.fill();
  for (let y = 0; y < 3; y++) {
    n.strokeStyle = `rgba(100,62,26,${(0.2 + 0.12 * i()) * a})`, n.lineWidth = u * (0.03 + 0.03 * i()), n.beginPath();
    let k = i() * 6.28, b = u * (0.9 + 0.05 * y);
    for (let v = 0; v <= Math.PI * 2 + 0.01; v += 0.05) {
      let f = b * (1 + 0.025 * Math.sin(v * 5 + k) + 0.015 * Math.sin(v * 11 + k * 2));
      v === 0 ? n.moveTo(c + Math.cos(v) * f, l + Math.sin(v) * f) : n.lineTo(c + Math.cos(v) * f, l + Math.sin(v) * f);
    }
    n.stroke();
  }
  for (let y = 0; y < 3; y++) {
    let k = c + (i() - 0.5) * u * 1.2, b = u * (0.6 + i() * 1.2), v = n.createLinearGradient(0, l + u * 0.6, 0, l + u * 0.6 + b);
    v.addColorStop(0, `rgba(115,75,32,${0.16 * a})`), v.addColorStop(1, "rgba(115,75,32,0)"), n.fillStyle = v, n.fillRect(k - 5, l + u * 0.6, 9 + i() * 6, b);
  }
  n.restore();
}
function xn(e, n, t, s) {
  e.save(), e.fillStyle = "rgba(150,110,45,0.08)", e.fillRect(0, 0, n, t);
  let o = e.createRadialGradient(n / 2, t / 2, Math.min(n, t) * 0.3, n / 2, t / 2, Math.max(n, t) * 0.75);
  o.addColorStop(0, "rgba(120,80,30,0)"), o.addColorStop(1, "rgba(120,80,30,0.28)"), e.fillStyle = o, e.fillRect(0, 0, n, t);
  for (let r = 0; r < 34; r++) {
    let a = s() * n, i = s() * t, p = 3 + s() * 14, l = e.createRadialGradient(a, i, 0, a, i, p);
    l.addColorStop(0, `rgba(125,85,40,${0.12 + s() * 0.2})`), l.addColorStop(1, "rgba(125,85,40,0)"), e.fillStyle = l, e.beginPath(), e.arc(a, i, p, 0, Math.PI * 2), e.fill();
  }
  e.restore();
}
async function Jn(e, n, t, s, o, r) {
  let a = typeof o.wearIntensity == "number" ? o.wearIntensity : 1;
  if (a <= 0) return;
  let i = ne(o.seed * 43 + 3), p = t * (0.3 + 0.4 * i()), l = s * (0.4 + 0.3 * i()), u = Math.min(t, s) * (0.1 + 0.04 * i()) * a, d = r ? p : t - p, c = (r ? 1 : 0.5) * a;
  if (r) {
    let m = ye(t, s);
    m.getContext("2d").drawImage(e, 0, 0), n.save(), n.beginPath(), n.arc(d, l, u * 1.04, 0, Math.PI * 2), n.clip(), n.clearRect(d - u * 1.1, l - u * 1.1, u * 2.2, u * 2.2), n.filter = "blur(2px)", n.globalAlpha = Y(0.8 * a), n.drawImage(m, 0, 0), n.restore();
  }
  n.save(), n.globalCompositeOperation = "multiply";
  let g = n.createRadialGradient(d, l, u * 0.2, d, l, u * 1.05);
  g.addColorStop(0, `rgba(120,14,38,${0.03 * c})`), g.addColorStop(0.8, `rgba(120,14,38,${0.1 * c})`), g.addColorStop(1, "rgba(90,8,28,0)"), n.fillStyle = g, n.beginPath(), n.arc(d, l, u * 1.05, 0, Math.PI * 2), n.fill(), n.lineCap = "round", n.filter = "blur(0.8px)";
  for (let m = 0; m < 2; m++) {
    let y = i() * 6.28, k = 3.4 + i() * 1.4, b = u * (0.94 + 0.12 * m + 0.03 * i()), v = i() * 6.28, f = (S, R) => {
      let A = (b - R) * (1 + 0.025 * Math.sin(S * 5 + v) + 0.012 * Math.sin(S * 9 + v * 2));
      return [d + Math.cos(S) * A, l + Math.sin(S) * A];
    };
    [[u * 0.22, 0.07, 0.04], [u * 0.07, 0.4, 0], [u * 0.03, 0.16, u * 0.06]].forEach(([S, R, A]) => {
      n.strokeStyle = `rgba(96,12,36,${R * c})`, n.lineWidth = S, n.beginPath();
      for (let _ = 0, M = y; M <= y + k; _++, M += 0.04) {
        let D = f(M, A);
        _ ? n.lineTo(D[0], D[1]) : n.moveTo(D[0], D[1]);
      }
      n.stroke();
    });
  }
  n.filter = "none";
  for (let m = 0, y = 4 + Math.floor(i() * 4); m < y; m++) {
    let k = i() * 6.28, b = u * (1.35 + i() * 1.1), v = u * (0.02 + 0.035 * i());
    n.fillStyle = `rgba(104,10,30,${0.45 * c})`, n.beginPath(), n.arc(d + Math.cos(k) * b, l + Math.sin(k) * b, v, 0, Math.PI * 2), n.fill(), m % 2 && (n.beginPath(), n.arc(d + Math.cos(k + 0.2) * b * 1.12, l + Math.sin(k + 0.2) * b * 1.12, v * 0.35, 0, Math.PI * 2), n.fill());
  }
  n.restore();
}
function Zn(e, n) {
  let t = [1, 2, 3, 5, 7, 11].map((o) => [o, e() * 6.28, (0.06 + 0.14 * e()) * 2 / o]), s = [];
  for (let o = 0; o < 40; o++) {
    let r = o / 40 * Math.PI * 2, a = 1;
    t.forEach(([i, p, l]) => {
      a += l * Math.sin(i * r + p);
    }), s.push([Math.cos(r) * n * a, Math.sin(r) * n * a]);
  }
  return s;
}
function Bt(e, n, t, s, o) {
  e.beginPath(), n.forEach((r, a) => {
    a ? e.lineTo(t + r[0] * o, s + r[1] * o) : e.moveTo(t + r[0] * o, s + r[1] * o);
  }), e.closePath(), e.fill();
}
function Qn(e, n, t, s, o) {
  let r = typeof s.wearIntensity == "number" ? s.wearIntensity : 1;
  if (r <= 0) return;
  let a = ne(s.seed * 47 + 5), i = Math.min(n, t), p = n * (0.2 + 0.6 * a()), l = t * (0.2 + 0.6 * a()), u = i * (0.03 + 0.015 * a()) * r, d = o ? p : n - p, c = (o ? 1 : 0.5) * r, g = [16, 22, 58], m = Zn(a, u);
  e.save(), e.fillStyle = ie(g, 0.07 * c), Bt(e, m, d, l, 1.45), Bt(e, m, d, l, 1.22), e.fillStyle = ie(g, 0.86 * c), e.filter = "blur(0.5px)", Bt(e, m, d, l, 1), e.filter = "none", e.fillStyle = ie(g, 0.86 * c);
  for (let R = 0, A = 6 + Math.floor(a() * 5); R < A; R++) {
    let _ = a() * 6.28, M = u * (1.5 + 2.4 * a()), D = u * (0.16 + 0.14 * a()) * (1.6 - M / (u * 4));
    e.beginPath(), e.arc(d + Math.cos(_) * M, l + Math.sin(_) * M, Math.max(D, 0.8), 0, Math.PI * 2), e.fill();
  }
  let y = a() * 6.28, k = u * (1.6 + 1.2 * a()), b = Math.cos(y), v = Math.sin(y), f = [], S = [];
  for (let R = 0; R <= 10; R++) {
    let A = R / 10, _ = u * 0.42 * Math.pow(1 - A, 1.3) * (0.85 + 0.3 * a()), M = u * 0.7 + k * A;
    f.push([b * M - v * _, v * M + b * _]), S.push([b * M + v * _, v * M - b * _]);
  }
  e.fillStyle = ie(g, 0.6 * c), e.beginPath(), f.concat(S.reverse()).forEach((R, A) => {
    A ? e.lineTo(d + R[0], l + R[1]) : e.moveTo(d + R[0], l + R[1]);
  }), e.closePath(), e.fill(), e.strokeStyle = ie(g, 0.28 * c), e.lineWidth = 0.9, e.lineCap = "round";
  for (let R = 0; R < 18; R++) {
    let A = a() * 6.28, _ = u * (0.95 + 0.1 * a()), M = _ + u * (0.3 + 0.9 * a());
    e.beginPath(), e.moveTo(d + Math.cos(A) * _, l + Math.sin(A) * _), e.lineTo(d + Math.cos(A + 0.05) * M, l + Math.sin(A + 0.05) * M), e.stroke();
  }
  e.restore();
}
function Wn(e, n, t, s) {
  let o = ne(s.seed * 41 + 2), r = Le(s.seed + 19), a = o() * Math.PI * 2, i = Math.cos(a), p = Math.sin(a), l = 96, u = Math.round(l * t / n), d = ye(l, u, !0), c = d.getContext("2d"), g = c.createImageData(l, u), m = g.data;
  for (let y = 0; y < u; y++) for (let k = 0; k < l; k++) {
    let b = Y((k / l - 0.5) * i + (y / u - 0.5) * p + 0.5), v = Math.pow(b, 2.4) * (0.45 + 0.55 * r(k * 0.12, y * 0.12)), f = (y * l + k) * 4;
    m[f] = 165, m[f + 1] = 112, m[f + 2] = 45, m[f + 3] = Math.round(255 * 0.42 * v);
  }
  c.putImageData(g, 0, 0), e.save(), e.imageSmoothingQuality = "high", e.drawImage(d, 0, 0, n, t), e.restore();
}
function eo(e, n, t, s) {
  let o = typeof s.wearIntensity == "number" ? s.wearIntensity : 1;
  if (o <= 0) return;
  let r = ne(s.seed * 61 + 11), a = Math.min(n, t) / 900, i = [[150, 78, 30], [170, 96, 40], [128, 62, 24]];
  e.save(), e.globalCompositeOperation = "multiply";
  for (let p = 0, l = 0; p < 150 && l < 900; l++) {
    let u = r() * n, d = r() * t, c = Math.max(Math.abs(u / n - 0.5), Math.abs(d / t - 0.5)) * 2;
    if (r() > 0.15 + 0.85 * c * c * c) continue;
    p++;
    let g = r() < 0.4, m = a * (g ? 4 + Math.pow(r(), 1.5) * 15 : 1 + Math.pow(r(), 2) * 5) * o, y = i[Math.floor(r() * 3)], k = (0.34 + 0.4 * r()) * o, b = e.createRadialGradient(0, 0, m * (g ? 0 : 0.55), 0, 0, m);
    g ? (b.addColorStop(0, ie(y, k * 0.6)), b.addColorStop(0.55, ie(y, k * 0.4)), b.addColorStop(1, ie(y, 0))) : (b.addColorStop(0, ie(y, k * 0.7)), b.addColorStop(0.85, ie(y, k * 0.8)), b.addColorStop(0.97, ie(y, k * 1.15)), b.addColorStop(1, ie(y, 0))), e.save(), e.translate(u, d), e.rotate(r() * 3.14), e.scale(1, g ? 0.55 + 0.45 * r() : 1), e.fillStyle = b, e.beginPath(), e.arc(0, 0, m, 0, Math.PI * 2), e.fill(), e.restore();
  }
  e.restore();
}
function to(e, n, t, s, o) {
  let r = ne(s.seed * 59 + 9), a = Le(s.seed + 23), i = typeof s.stamp == "object" && s.stamp ? s.stamp : { text: String(s.stamp || "RECEIVED") }, p = String(i.text || "RECEIVED").toUpperCase(), l = r() < 0.6 ? [176, 26, 36] : [34, 64, 150];
  if (i.color) {
    let M = i.color.toLowerCase().trim();
    if (M === "red") l = [176, 26, 36];
    else if (M === "blue") l = [34, 64, 150];
    else if (M === "purple") l = [128, 32, 140];
    else if (M === "green") l = [34, 128, 50];
    else {
      let D = Oe(i.color);
      D && (l = D.map((J) => Math.round(J * 255)));
    }
  }
  let u = ye(1, 1).getContext("2d");
  u.font = 'bold 100px "Courier Prime", monospace', u.letterSpacing = "12px";
  let d = u.measureText(p).width / 100, c = n * 0.44, g = c / (d + 1.2), m = g * 2.1, y = -(0.14 + 0.17 * r());
  typeof i.angle == "number" && Number.isFinite(i.angle) && (y = i.angle);
  let k = n * (0.46 + 0.1 * r());
  i.align === "left" ? k = c / 2 + n * 0.08 : i.align === "right" ? k = n - c / 2 - n * 0.08 : i.align === "center" && (k = n / 2);
  let b = Math.min(t - m / 2 - 30, Math.max(t * 0.55, o + m / 2 + 24)), v = Math.ceil(Math.hypot(c, m) + g * 0.8), f = ye(v, v, !0), S = f.getContext("2d");
  S.translate(v / 2, v / 2), S.fillStyle = S.strokeStyle = ie(l, 1), S.textAlign = "center", S.textBaseline = "middle", S.font = `bold ${g}px "Courier Prime", monospace`, S.letterSpacing = g * 0.12 + "px", S.lineWidth = g * 0.13, S.strokeRect(-c / 2, -m / 2, c, m), S.globalAlpha = 0.5, S.lineWidth = g * 0.1, S.strokeRect(-c / 2 + g * 0.07, -m / 2 - g * 0.05, c, m), S.globalAlpha = 1, S.lineWidth = g * 0.05, S.strokeRect(-c / 2 + g * 0.3, -m / 2 + g * 0.3, c - g * 0.6, m - g * 0.6), S.fillText(p, -g * 0.06, g * 0.05);
  let R = S.getImageData(0, 0, v, v), A = R.data, _ = v / 2;
  for (let M = 0; M < A.length; M += 4) {
    if (!A[M + 3]) continue;
    let D = M / 4, J = D % v, I = Math.floor(D / v), U = (J - _) / (c / 2), z = (I - _) / (m / 2), ee = 1 - 0.25 * Math.min(1, U * U + z * z), oe = Y((a(J / (g * 1.5), I / (g * 1.5)) - 0.25) * 3.2) * ee * (r() < 0.94 ? 1 : 0.3);
    A[M + 3] = Math.round(A[M + 3] * oe);
  }
  S.putImageData(R, 0, 0), e.save(), e.globalCompositeOperation = "multiply", e.globalAlpha = 0.9, e.translate(k, b), e.rotate(y), e.drawImage(f, -v / 2, -v / 2), e.restore();
}
function no(e, n, t, s) {
  let o = ne(s.seed * 53 + 7), r = n * (0.24 + 0.04 * o()), a = n * 0.1;
  [[0.1, 0.05, 0.7], [0.9, 0.05, -0.7]].forEach(([i, p, l]) => {
    let u = n * (i + (o() - 0.5) * 0.03), d = t * (p + (o() - 0.5) * 0.02), c = l + (o() - 0.5) * 0.1;
    e.save(), e.translate(u, d), e.rotate(c);
    let g = [];
    for (let k = 0; k <= 6; k++) g.push([r / 2 - (k % 2 ? 0 : 2 + 4 * o()), -a / 2 + a * k / 6]);
    let m = () => {
      e.beginPath(), e.moveTo(-r / 2, -a / 2), g.forEach((k) => e.lineTo(k[0], k[1])), e.lineTo(-r / 2, a / 2), e.closePath();
    };
    m(), e.fillStyle = "rgba(226,176,96,0.48)", e.fill();
    let y = e.createLinearGradient(0, -a / 2, 0, a / 2);
    y.addColorStop(0, "rgba(255,248,230,0)"), y.addColorStop(0.3, "rgba(255,248,230,0.3)"), y.addColorStop(0.5, "rgba(255,248,230,0.06)"), y.addColorStop(1, "rgba(255,248,230,0)"), e.fillStyle = y, e.fill(), m(), e.strokeStyle = "rgba(140,92,36,0.5)", e.lineWidth = 2, e.stroke(), e.fillStyle = "rgba(140,92,36,0.16)", e.fillRect(-r / 2, -a / 2, r * 0.03, a);
    for (let k = 0, b = 6 + Math.floor(o() * 4); k < b; k++)
      e.fillStyle = `rgba(70,46,22,${0.3 + 0.3 * o()})`, e.beginPath(), e.arc((o() - 0.5) * r * 0.8, (o() - 0.5) * a * 0.7, 1 + 2 * o(), 0, Math.PI * 2), e.fill();
    e.restore();
  });
}
function oo(e, n, t, s, o) {
  let r = ne(s.seed * 71 + 3), a = 54 + r() * 16, i = 48 + r() * 16, p = -0.52 + (r() - 0.5) * 0.15;
  if (e.save(), e.translate(o ? a : n - a, i), e.rotate(o ? p : -p), o) {
    e.fillStyle = "rgba(30, 20, 10, 0.7)", e.fillRect(-22, -3, 5, 6), e.fillRect(17, -3, 5, 6), e.fillStyle = "rgba(10, 10, 10, 0.35)", e.fillRect(-20, 1, 40, 5);
    let l = e.createLinearGradient(0, -3, 0, 3);
    l.addColorStop(0, "#c8cdd4"), l.addColorStop(0.3, "#ffffff"), l.addColorStop(0.7, "#858d99"), l.addColorStop(1, "#535b66"), e.fillStyle = l, e.fillRect(-20, -3, 40, 5), e.fillStyle = "rgba(140, 70, 30, 0.35)", e.fillRect(-8, -2, 6, 3);
  } else
    e.fillStyle = "rgba(30, 20, 10, 0.7)", e.fillRect(-22, -3, 5, 6), e.fillRect(17, -3, 5, 6), e.fillStyle = "#7a828e", e.fillRect(-18, -2, 12, 4), e.fillRect(6, -2, 12, 4);
  e.restore();
}
function ro(e, n, t, s, o) {
  let r = ne(s.seed * 79 + 5), a = n * (0.68 + 0.12 * r()), i = (r() - 0.5) * 0.08, p = Math.min(n, t) * 0.08 + 20, l = 22, u = 14, d = l / 2, c = u / 2;
  e.save(), e.translate(o ? a : n - a, 0), e.rotate(o ? i : -i);
  let g = (m) => {
    e.save(), e.translate(1.5, 2), e.strokeStyle = "rgba(20, 15, 10, 0.28)", e.lineWidth = 4, e.lineCap = "round", e.lineJoin = "round", m(), e.stroke(), e.restore(), e.strokeStyle = "#5a626d", e.lineWidth = 4, e.lineCap = "round", e.lineJoin = "round", m(), e.stroke(), e.strokeStyle = "#c5cbd3", e.lineWidth = 2.8, m(), e.stroke(), e.strokeStyle = "#ffffff", e.lineWidth = 1, m(), e.stroke();
  };
  g(o ? () => {
    e.beginPath(), e.moveTo(d, 0), e.lineTo(d, p - d), e.arc(0, p - d, d, 0, Math.PI, !1), e.lineTo(-d, 0);
  } : () => {
    e.beginPath(), e.moveTo(c, 0);
    let m = p * 0.72;
    e.lineTo(c, m - c), e.arc(0, m - c, c, 0, Math.PI, !1), e.lineTo(-c, 0);
  }), e.restore();
}
function ao(e, n, t, s) {
  if (!s) return;
  let o = typeof s == "string" ? s : s.text || "", r = typeof s == "object" && s.symbol || "";
  if (!o && !r) return;
  let a = n / 2, i = t / 2, p = Math.min(n, t) * 0.22, l = (u, d, c, g) => {
    e.save(), e.translate(a + u, i + d), e.fillStyle = c, e.strokeStyle = g, e.textAlign = "center", e.textBaseline = "middle", e.lineWidth = 2.5, e.beginPath(), e.arc(0, 0, p, 0, Math.PI * 2), e.stroke(), e.lineWidth = 1, e.beginPath(), e.arc(0, 0, p - 12, 0, Math.PI * 2), e.stroke(), r && o ? (e.font = `${Math.round(p * 0.55)}px serif`, e.fillText(r, 0, -p * 0.2), e.font = `bold ${Math.round(p * 0.18)}px "Courier Prime", monospace`, e.letterSpacing = "6px", e.fillText(o.toUpperCase(), 0, p * 0.45)) : r ? (e.font = `${Math.round(p * 0.85)}px serif`, e.fillText(r, 0, 0)) : (e.font = `bold ${Math.max(22, Math.round(p * 0.22))}px "Courier Prime", monospace`, e.letterSpacing = "8px", e.fillText(o.toUpperCase(), 0, 0)), e.restore();
  };
  e.save(), l(-1.5, -1.5, "rgba(255, 255, 255, 0.08)", "rgba(255, 255, 255, 0.12)"), l(1.5, 1.5, "rgba(40, 30, 20, 0.06)", "rgba(40, 30, 20, 0.09)"), l(0, 0, "rgba(120, 110, 100, 0.05)", "rgba(120, 110, 100, 0.07)"), e.restore();
}
function nn(e, n, t, s) {
  let o = s && typeof s.symbol == "string" && s.symbol ? s.symbol : "V", r = "rgba(145, 24, 28, 0.95)", a = "rgba(95, 12, 16, 0.85)", i = "rgba(85, 10, 14, 0.95)", p = s?.color;
  if (Array.isArray(p) && p.length === 3) {
    let [l, u, d] = p.map((c) => Math.round(c * 255));
    r = `rgba(${l}, ${u}, ${d}, 0.95)`, a = `rgba(${Math.round(l * 0.65)}, ${Math.round(u * 0.65)}, ${Math.round(d * 0.65)}, 0.85)`, i = `rgba(${Math.round(l * 0.55)}, ${Math.round(u * 0.55)}, ${Math.round(d * 0.55)}, 0.95)`;
  } else if (typeof p == "string") {
    let l = p.toLowerCase().trim();
    if (l === "gold")
      r = "rgba(212, 165, 45, 0.95)", a = "rgba(150, 110, 25, 0.85)", i = "rgba(120, 85, 18, 0.95)";
    else if (l === "burgundy")
      r = "rgba(108, 16, 38, 0.95)", a = "rgba(70, 8, 22, 0.85)", i = "rgba(58, 6, 18, 0.95)";
    else if (l === "red")
      r = "rgba(155, 24, 28, 0.95)", a = "rgba(98, 12, 16, 0.85)", i = "rgba(85, 10, 14, 0.95)";
    else {
      let u = Oe(p);
      if (u) {
        let [d, c, g] = u.map((m) => Math.round(m * 255));
        r = `rgba(${d}, ${c}, ${g}, 0.95)`, a = `rgba(${Math.round(d * 0.65)}, ${Math.round(c * 0.65)}, ${Math.round(g * 0.65)}, 0.85)`, i = `rgba(${Math.round(d * 0.55)}, ${Math.round(c * 0.55)}, ${Math.round(g * 0.55)}, 0.95)`;
      }
    }
  }
  e.save(), e.save(), e.translate(n + 2, t + 3), e.fillStyle = "rgba(20, 10, 5, 0.3)", e.beginPath();
  for (let l = 0; l <= Math.PI * 2 + 0.01; l += 0.15) {
    let u = 50 * (1 + 0.08 * Math.sin(l * 8));
    l === 0 ? e.moveTo(Math.cos(l) * u, Math.sin(l) * u) : e.lineTo(Math.cos(l) * u, Math.sin(l) * u);
  }
  e.fill(), e.restore(), e.save(), e.translate(n, t), e.fillStyle = r, e.beginPath();
  for (let l = 0; l <= Math.PI * 2 + 0.01; l += 0.15) {
    let u = 48 * (1 + 0.08 * Math.sin(l * 8));
    l === 0 ? e.moveTo(Math.cos(l) * u, Math.sin(l) * u) : e.lineTo(Math.cos(l) * u, Math.sin(l) * u);
  }
  e.fill(), e.strokeStyle = a, e.lineWidth = 3, e.beginPath(), e.arc(0, 0, 32, 0, Math.PI * 2), e.stroke(), e.strokeStyle = "rgba(255, 255, 255, 0.2)", e.lineWidth = 1.5, e.beginPath(), e.arc(-1, -1, 31, Math.PI * 0.8, Math.PI * 1.7), e.stroke(), e.fillStyle = i, e.font = 'bold 32px "Caveat", cursive', e.textAlign = "center", e.textBaseline = "middle", e.fillText(o, 0, 2), e.restore(), e.restore();
}
function io(e, n, t, s, o) {
  e.save(), e.strokeStyle = "rgba(255, 252, 240, 0.45)", e.lineWidth = 1.2;
  let r = (a, i, p, l, u) => {
    e.beginPath(), e.moveTo(a, i), e.lineTo(a + p * u + (o() - 0.5) * 3, i + l * u + (o() - 0.5) * 3), e.stroke();
  };
  for (let a = 4; a < n - 4; a += 4 + o() * 6)
    r(a, 2, (o() - 0.5) * 0.5, 1, 3 + o() * 7), r(a, t - 2, (o() - 0.5) * 0.5, -1, 3 + o() * 7);
  for (let a = 4; a < t - 4; a += 4 + o() * 6)
    r(2, a, 1, (o() - 0.5) * 0.5, 3 + o() * 7), r(n - 2, a, -1, (o() - 0.5) * 0.5, 3 + o() * 7);
  e.restore();
}
function so(e, n, t, s, o) {
  let r = ne(s.seed * 67 + 13), a = n * (0.25 + 0.5 * r()), i = t * (0.3 + 0.45 * r()), p = Math.min(n, t) * (0.12 + 0.08 * r()), l = o ? a : n - a;
  e.save(), e.globalCompositeOperation = "multiply";
  let u = e.createRadialGradient(l, i, p * 0.2, l, i, p);
  u.addColorStop(0, "rgba(140, 120, 70, 0.45)"), u.addColorStop(0.65, "rgba(150, 130, 80, 0.30)"), u.addColorStop(1, "rgba(150, 130, 80, 0)"), e.fillStyle = u, e.beginPath();
  for (let d = 0; d <= Math.PI * 2 + 0.01; d += 0.1) {
    let c = p * (1 + 0.12 * Math.sin(d * 5 + r() * 3));
    d === 0 ? e.moveTo(l + Math.cos(d) * c, i + Math.sin(d) * c) : e.lineTo(l + Math.cos(d) * c, i + Math.sin(d) * c);
  }
  e.fill(), e.restore();
}
function lo(e, n, t, s, o) {
  let r = Math.min(n, t) * 0.15;
  if (e.save(), o) {
    e.fillStyle = "rgba(10, 10, 15, 0.3)", e.beginPath(), e.moveTo(n - r - 8, 0), e.lineTo(n, r + 8), e.lineTo(n - r, r), e.closePath(), e.fill();
    let a = e.createLinearGradient(n - r, 0, n, r);
    a.addColorStop(0, "rgba(235, 225, 210, 0.95)"), a.addColorStop(1, "rgba(195, 185, 170, 0.95)"), e.fillStyle = a, e.beginPath(), e.moveTo(n - r, 0), e.lineTo(n, r), e.lineTo(n - r, r), e.closePath(), e.fill(), e.strokeStyle = "rgba(60, 50, 40, 0.4)", e.lineWidth = 2, e.beginPath(), e.moveTo(n - r, 0), e.lineTo(n, r), e.stroke();
  }
  e.restore();
}
function fo(e, n, t, s) {
  let o = ne(s.seed * 83 + 7);
  e.save(), e.strokeStyle = "rgba(120, 140, 170, 0.12)", e.lineWidth = 3;
  for (let r = 0; r < 6; r++) {
    let a = t * (0.2 + 0.12 * r + 0.04 * o());
    e.beginPath(), e.moveTo(0, a), e.bezierCurveTo(n * 0.33, a + 18 * (o() - 0.5), n * 0.66, a + 18 * (o() - 0.5), n, a), e.stroke();
  }
  e.restore();
}
function uo(e, n, t, s) {
  let o = ne(s.seed * 89 + 11);
  e.save(), e.strokeStyle = "rgba(255, 255, 255, 0.28)", e.lineWidth = 1;
  for (let r = 0; r < 14; r++) {
    let a = o() * n, i = o() * t, p = o() * Math.PI, l = 60 + o() * 120;
    e.beginPath(), e.moveTo(a, i), e.lineTo(a + Math.cos(p) * l, i + Math.sin(p) * l), e.stroke();
  }
  e.restore();
}
function on(e, n, t) {
  if (!e.hiddenInk) return null;
  let s = ye(n, t, !0), o = s.getContext("2d"), r = Math.round(n * 0.12);
  o.fillStyle = "#fff", o.textAlign = "center", o.filter = "blur(0.7px)", o.font = `${r}px "Caveat", cursive`, o.translate(n / 2, t * 0.7), o.rotate(-0.1), e.hiddenInk.split(`
`).forEach((p, l) => o.fillText(p, 0, l * r * 1.05));
  let a = o.getImageData(0, 0, n, t).data, i = new Float32Array(n * t);
  for (let p = 0; p < t; p++) for (let l = 0; l < n; l++) i[p * n + l] = a[((t - 1 - p) * n + l) * 4 + 3] / 255;
  return i;
}
function He(e, n, t, s, o) {
  let r = [e, n];
  for (let a = 0; a < s; a++) {
    let i = [r[0]];
    for (let p = 1; p < r.length; p++) {
      let l = r[p - 1], u = r[p], d = (l[0] + u[0]) / 2, c = (l[1] + u[1]) / 2, g = u[0] - l[0], m = u[1] - l[1], y = Math.hypot(g, m), k = (t() - 0.5) * y * o;
      i.push([d - m / y * k, c + g / y * k], u);
    }
    r = i;
  }
  return r;
}
async function zt(e, n, t = null) {
  let s = Math.round(n.w * vt / 2), o = Math.round(n.h * vt / 2), r = ye(s, o, !0), a = r.getContext("2d");
  a.fillStyle = "#fff", a.fillRect(0, 0, s, o);
  let i = ye(s, o, !0), p = i.getContext("2d");
  p.fillStyle = "#000", p.fillRect(0, 0, s, o);
  let l = ne(e.seed * 13 + 3);
  if (a.fillStyle = "#000", p.strokeStyle = "#fff", p.lineWidth = 2.2, p.filter = "blur(0.8px)", e.type === "form")
    for (let f = 22; f < o - 6; f += 24) [15, s - 15].forEach((S) => {
      a.beginPath(), a.arc(S, f, 5.5, 0, Math.PI * 2), a.fill();
    });
  if (e.type === "notebook") {
    let f = He([4, 0], [4, o], l, 7, 0.05);
    a.beginPath(), a.moveTo(0, 0), f.forEach((S) => a.lineTo(S[0] + l() * 2, S[1])), a.lineTo(0, o), a.closePath(), a.fill();
    for (let S = 18; S < o; S += 22)
      a.beginPath(), a.arc(2, S, 5 + l() * 1.5, 0, Math.PI * 2), a.fill();
    p.beginPath(), f.forEach((S, R) => R ? p.lineTo(S[0] + 1, S[1]) : p.moveTo(S[0] + 1, S[1])), p.stroke();
  }
  if (e.type === "envelope") {
    let f = n.flap / n.h * o;
    a.beginPath(), a.moveTo(-2, -2), a.lineTo(s / 2, -2), a.lineTo(s / 2, 3), a.lineTo(-2, f), a.closePath(), a.fill(), a.beginPath(), a.moveTo(s + 2, -2), a.lineTo(s / 2, -2), a.lineTo(s / 2, 3), a.lineTo(s + 2, f), a.closePath(), a.fill();
  }
  if (e.type === "punchcard") {
    a.beginPath(), a.moveTo(-2, -2), a.lineTo(26, -2), a.lineTo(-2, 26), a.closePath(), a.fill();
    let f = (e.text.split(`
`)[0] || "").slice(0, 80), S = 17, A = (s - 17 - S) / 79, _ = o * 0.23, M = (o * 0.94 - _) / 11;
    for (let D = 0; D < f.length; D++) {
      let J = tn(f[D]), I = S + D * A;
      for (let U of J) {
        let z = _ + U * M;
        a.fillRect(I - 2.5, z - 5, 5, 10);
      }
    }
  }
  if (e.type === "parchment" || e.type === "postcard" || e.states.includes("aged")) {
    let f = He([-2, 3], [s + 2, 3], l, 5, 0.12), S = He([-2, o - 3], [s + 2, o - 3], l, 5, 0.12), R = He([3, -2], [3, o + 2], l, 5, 0.12), A = He([s - 3, -2], [s - 3, o + 2], l, 5, 0.12);
    p.lineWidth = 2.2, [f, S, R, A].forEach((M) => {
      p.beginPath(), M.forEach((D, J) => J ? p.lineTo(D[0], D[1]) : p.moveTo(D[0], D[1])), p.stroke();
    }), p.lineWidth = 1;
    let _ = (M, D, J, I, U) => {
      p.beginPath(), p.moveTo(M, D), p.lineTo(M + J * U + (l() - 0.5) * 2, D + I * U + (l() - 0.5) * 2), p.stroke();
    };
    for (let M = 2; M < s - 2; M += 3 + l() * 4)
      _(M, 2, (l() - 0.5) * 0.6, 1, 2 + l() * 4), _(M, o - 2, (l() - 0.5) * 0.6, -1, 2 + l() * 4);
    for (let M = 2; M < o - 2; M += 3 + l() * 4)
      _(2, M, 1, (l() - 0.5) * 0.6, 2 + l() * 4), _(s - 2, M, -1, (l() - 0.5) * 0.6, 2 + l() * 4);
  }
  if (e.states.includes("torn")) {
    let f = Math.floor(l() * 3), S, R, A;
    f === 0 ? (S = [s * (0.5 + 0.25 * l()), -2], R = [s + 2, o * (0.2 + 0.25 * l())], A = [[s + 2, -2]]) : f === 1 ? (S = [-2, o * (0.72 + 0.12 * l())], R = [s + 2, o * (0.72 + 0.12 * l())], A = [[s + 2, o + 2], [-2, o + 2]]) : (S = [s * (0.3 + 0.25 * l()), o + 2], R = [-2, o * (0.55 + 0.2 * l())], A = [[-2, o + 2]]);
    let _ = He(S, R, l, 8, 0.22);
    a.beginPath(), _.forEach((M, D) => D ? a.lineTo(M[0], M[1]) : a.moveTo(M[0], M[1])), A.forEach((M) => a.lineTo(M[0], M[1])), a.closePath(), a.fill(), p.lineWidth = 3.2, p.beginPath(), _.forEach((M, D) => D ? p.lineTo(M[0], M[1]) : p.moveTo(M[0], M[1])), p.stroke();
  }
  let d = a.getImageData(0, 0, s, o).data, c = p.getImageData(0, 0, s, o).data, g = t ? await yt.run("burn", [{ seed: e.seed, form: t === "singed" ? "singed" : e.burn }, s, o]) : null, m = a.createImageData(s, o), y = m.data, k = [], b = 1 / 0;
  for (let f = 0; f < o; f++) for (let S = 0; S < s; S++) {
    let R = (f * s + S) * 4;
    if (y[R] = d[R], y[R + 1] = 0, y[R + 2] = c[R], g) {
      let A = g[f * s + S];
      y[R + 3] = Math.round(Y(A / 1.4) * 255), b = Math.min(b, A), t === "burn" && S % 3 === 0 && f % 3 === 0 && d[R] > 128 && k.push((S + 0.5) / s, 1 - (f + 0.5) / o, A);
    } else y[R + 3] = 255;
  }
  let v = ye(s, o);
  return v.getContext("2d").putImageData(m, 0, 0), { canvas: v, burnPts: t === "burn" ? new Float32Array(k) : null, lo: g ? Math.max(0, b) : 0 };
}

// .build/shaders.js
var rn = `#version 300 es
precision highp float;in vec2 aXY;uniform sampler2D uH;uniform int uShape;uniform float uP,uK0,uKres,uA0,uAres,uScale,uSeedA,uSquash,uRoll,uCurl,uTear,uStubX,uIsStub,uFoldSide,uFoldBw,uFoldY,uEdge,uThick;uniform vec2 uHalf;uniform mat4 uModel,uProj;out vec3 vPos;out vec3 vNrm;out vec2 vUv;out float vE;out float vAmp;out float vStress;float Hf(vec2 xy){return textureLod(uH,xy/(2.0*uHalf)+0.5,0.0).r;}vec3 rotY(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x+s*v.z,v.y,-s*v.x+c*v.z);}vec3 rotZ(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x-s*v.y,s*v.x+c*v.y,v.z);}vec3 bend(float d,float th,float bw){float t=max(abs(th),1e-4),R=bw/t,L=R*t;if(d<L){float a=d/R;return vec3(R*sin(a),R*(1.0-cos(a)),a);}return vec3(R*sin(t)+(d-L)*cos(t),R*(1.0-cos(t))+(d-L)*sin(t),t);}float foldStress(vec2 xy){float bw=max(uFoldBw,0.008);if(uShape==3){return max(smoothstep(bw*2.2,0.0,abs(xy.x)),smoothstep(bw*3.2,0.0,abs(xy.y)));}else if(uShape==4){return smoothstep(bw*2.2,0.0,abs(xy.x));}else if(uShape==5){float y3=uHalf.y/3.0;return max(smoothstep(bw*2.2,0.0,abs(xy.y+y3*1.08)),smoothstep(bw*3.2,0.0,abs(xy.y-y3)));}else if(uShape==6){return smoothstep(bw*2.2,0.0,abs(xy.y-uFoldY));}else if(uShape==7){float x3=uHalf.x*0.333;return max(smoothstep(bw*2.2,0.0,abs(xy.x+x3)),max(smoothstep(bw*2.6,0.0,abs(xy.x)),smoothstep(bw*3.2,0.0,abs(xy.x-x3))));}else if(uShape==8){return max(smoothstep(bw*2.2,0.0,abs(xy.x)),smoothstep(bw*2.6,0.0,abs(xy.y)));}return 0.0;}void foldX(inout vec3 p,inout vec3 n,float x0,float s,float th,float bw){float d=(p.x-x0)*s;if(d<=0.0||abs(th)<1e-4)return;vec3 c=bend(d,th,bw);float g=sign(th),ca=cos(c.z),sa=g*sin(c.z),z0=p.z;p.x=x0+s*(c.x-sa*z0);p.z=g*c.y+ca*z0;n=vec3(ca*n.x-s*sa*n.z,n.y,s*sa*n.x+ca*n.z);}void foldY(inout vec3 p,inout vec3 n,float y0,float s,float th,float bw){float d=(p.y-y0)*s;if(d<=0.0||abs(th)<1e-4)return;vec3 c=bend(d,th,bw);float g=sign(th),ca=cos(c.z),sa=g*sin(c.z),z0=p.z;p.y=y0+s*(c.x-sa*z0);p.z=g*c.y+ca*z0;n=vec3(n.x,ca*n.y-s*sa*n.z,s*sa*n.y+ca*n.z);}vec3 place(vec2 xy,out float e,out float amp,out vec3 n){vec3 p=vec3(xy,0.0);n=vec3(0.0,0.0,1.0);if(uShape==0){float s=length(xy),sn=s/length(uHalf);float q=clamp(uP*1.5-sn*0.5+0.14*sn*sin(atan(xy.y,xy.x)*3.0+uSeedA),0.0,1.0);e=q*q*(3.0-2.0*q);float k=mix(uKres,uK0,(1.0-e)*(1.0-e));if(s>1e-6){float th=s*k,st=sin(th),ct=cos(th);vec2 dir=xy/s;n=vec3(st*dir,ct);p=vec3(st/k*dir,(ct-1.0)/k);}float sq=mix(uSquash,1.0,e);float expan=mix(1.0+(1.0-uSquash)*0.3,1.0,e);p.z*=sq;p.xy*=expan;n=normalize(vec3(n.xy/expan,n.z/sq));amp=mix(uA0,uAres,pow(e,2.2));}else if(uShape==1){e=uP;float L=2.0*uHalf.x*e,s=xy.x+uHalf.x;if(s>L){float ph=(s-L)/uRoll;float r=uRoll*(1.0-0.07*ph/6.2831853);p=vec3(L-uHalf.x+r*sin(ph),xy.y,r*(1.0-cos(ph)));n=vec3(-sin(ph),0.0,cos(ph));}p.x+=(uHalf.x-uRoll)*(1.0-e);amp=mix(uA0,uAres,e);}else if(uShape==2){e=uP;float k=uK0*(1.0-e)*(1.0-e);if(k>1e-2){float a=(xy.y+uHalf.y)*k;float r=1.0/k-uRoll*a/6.2831853;vec2 ax=vec2(-uHalf.y,-1.0/k);p=vec3(xy.x,ax.x+r*sin(a),ax.y+r*cos(a));n=vec3(0.0,sin(a),cos(a));float g=pow(1.0-e,3.0);float axv=abs(xy.x)/uHalf.x;float neck=smoothstep(0.5,0.8,axv),fl=smoothstep(0.82,1.0,axv);float sc=mix(1.0,mix(1.0,0.17*(1.0+3.2*fl),neck),g);float tw=sign(xy.x)*(neck*3.4+fl*1.3)*g;float c=cos(tw),sn=sin(tw);vec2 rv=(p.yz-ax)*sc;p.yz=ax+vec2(c*rv.x-sn*rv.y,sn*rv.x+c*rv.y);n.yz=vec2(c*n.y-sn*n.z,sn*n.y+c*n.z);n=normalize(n);}p.y+=uHalf.y*(1.0-e);p.z+=(1.0/uK0)*(1.0-e);amp=mix(uA0,uAres,e);}else if(uShape==6){e=uP;foldY(p,n,uFoldY,1.0,mix(3.12,-1.1,smoothstep(0.0,1.0,e)),uFoldBw);p.y-=(uFoldY-uHalf.y)*0.5;amp=mix(uA0,uAres,e);}else if(uShape==7){e=uP;float em=smoothstep(0.0,1.0,e);float a=3.12*(1.0-em);float x3=uHalf.x*0.333;foldX(p,n,-x3,-1.0,a,uFoldBw);foldX(p,n,0.0,1.0,-a,uFoldBw*1.5);foldX(p,n,x3,1.0,a,uFoldBw*2.0);p.x*=mix(0.28,1.0,em);amp=mix(uA0,uAres,e);}else if(uShape==8){e=uP;float em=smoothstep(0.0,1.0,e);float a=3.12*(1.0-em);foldX(p,n,0.0,1.0,a,uFoldBw);foldY(p,n,0.0,-1.0,a,uFoldBw*1.5);p.xy*=mix(0.58,1.0,em);amp=mix(uA0,uAres,e);}else{e=uP;float e2=smoothstep(0.0,0.5,e),e1=smoothstep(0.5,1.0,e);if(uShape==3){foldX(p,n,0.0,1.0,3.12*(1.0-e1),uFoldBw);foldY(p,n,0.0,1.0,3.12*(1.0-e2),uFoldBw*2.6);p.x+=uHalf.x*0.5*(1.0-e1);p.y+=uHalf.y*0.5*(1.0-e2);}else if(uShape==4){float em=smoothstep(0.0,1.0,e);foldX(p,n,0.0,uFoldSide,3.12*(1.0-em),uFoldBw);p.x+=uFoldSide*uHalf.x*0.5*(1.0-em);}else{float y3=uHalf.y/3.0;foldY(p,n,-y3*1.08,-1.0,3.12*(1.0-e1),uFoldBw);foldY(p,n,y3,1.0,3.12*(1.0-e2),uFoldBw*2.6);}amp=mix(uA0,uAres,e);}p+=n*Hf(xy)*amp;if(uIsStub>0.5&&uTear>0.0){vec3 piv=vec3(uStubX,0.0,0.0);p=rotY(rotZ(p-piv,-0.55*uTear),0.6*uTear)+piv+vec3(0.08*uTear,-1.1*uTear*uTear,0.12*uTear);n=rotY(rotZ(n,-0.55*uTear),0.6*uTear);}p.z-=uCurl*p.x*p.x;n=normalize(vec3(n.x+2.0*uCurl*p.x*n.z,n.y,n.z));return p;}void main(){float e,amp;vec3 nrm;vec3 p0=place(aXY,e,amp,nrm);if(uEdge>0.5)p0-=nrm*uThick*(nrm.z>=0.0?1.0:-1.0);vec4 w=uModel*vec4(p0,1.0);vPos=w.xyz;vNrm=mat3(uModel)*nrm;vUv=aXY/(2.0*uHalf)+0.5;vE=uShape==0?pow(e,2.2):e;vAmp=amp*uScale;vStress=foldStress(aXY);gl_Position=uProj*w;}`, an = `#version 300 es
precision highp float;in vec3 vPos;in vec3 vNrm;in vec2 vUv;in float vE;in float vAmp;in float vStress;uniform sampler2D uH,uPrintF,uPrintB,uFx,uGrain;uniform vec2 uGrainK;uniform vec3 uCam,uColor,uL,uLampPos;uniform float uBump,uAge,uTime,uThru,uFront,uInkMax,uEdge,uDestroy,uLamp,uLampR;out vec4 frag;float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}vec3 perturb(vec3 pos,vec3 n,vec2 dH){vec3 sx=dFdx(pos),sy=dFdy(pos);vec3 r1=cross(sy,n),r2=cross(n,sx);float det=dot(sx,r1);return normalize(abs(det)*n-sign(det)*(dH.x*r1+dH.y*r2));}void main(){vec4 fx=texture(uFx,vUv);float pres=fx.r,sc=0.0;if(uFront>-0.5){float b=fx.a*1.4;pres=min(pres,smoothstep(uFront-0.004,uFront+0.012,b));sc=1.0-smoothstep(uFront,uFront+0.17,b);}if(pres<0.4)discard;float a=smoothstep(0.4,0.6,pres);bool front=gl_FrontFacing;vec3 n=normalize(vNrm)*(front?1.0:-1.0);vec3 L=normalize(uL);if(uEdge>0.5){float w=clamp((dot(n,L)+0.3)/1.3,0.0,1.0);vec3 ec=mix(uColor*vec3(0.8,0.76,0.7),vec3(0.08,0.06,0.05),smoothstep(0.55,0.9,sc))*(0.45+0.55*w);frag=vec4(ec*a,a);return;}vec4 h0=texture(uH,vUv);vec2 du=dFdx(vUv),dv=dFdy(vUv);vec4 hx=texture(uH,vUv+du),hy=texture(uH,vUv+dv);vec4 hx2=texture(uH,vUv-du),hy2=texture(uH,vUv-dv);vec3 toP=uLampPos-vPos;vec3 Lp=normalize(toP);float pool=pow(1.0-smoothstep(0.0,1.0,length(toP.xy)/uLampR),1.3)*uLamp;float grazD=clamp((1.0-L.z-0.4)/0.5,0.0,1.0);float grazP=smoothstep(0.2,0.75,1.0-Lp.z)*pool;float ink=uInkMax*mix(grazD,grazP*3.0,uLamp);vec2 dH=vec2(hx.r-h0.r,hy.r-h0.r)*vAmp*uBump*(1.0+1.6*pool)-vec2(hx.g-h0.g,hy.g-h0.g)*ink;n=perturb(vPos,n,dH);vec3 V=normalize(uCam-vPos);float wrap=clamp((dot(n,L)+0.08)/1.08,0.0,1.0);float wrapP=max(dot(n,Lp),0.0);float backL=max(0.0,-dot(n,L));float backLp=max(0.0,-dot(n,Lp))*pool;float backlight=backL+backLp*1.8;float ao=mix(1.0,0.42+0.58*smoothstep(-0.55,0.35,h0.r),1.0-vE);float fib=hash(floor(vUv*vec2(900.0,1180.0)));vec2 eu=min(vUv,1.0-vUv);float edge=smoothstep(0.0,0.05,min(eu.x,eu.y));vec3 col0=mix(uColor,uColor*vec3(0.93,0.84,0.66),uAge);vec3 alb=col0*(0.975+0.025*fib)*(0.93+0.07*edge);alb*=1.0+(texture(uGrain,vUv*uGrainK).r-0.94)*1.8;if(!front)alb*=0.9;float ridgeCurv=max(0.0,-((hx.r+hx2.r-2.0*h0.r)+(hy.r+hy2.r-2.0*h0.r)));float creaseStress=clamp(ridgeCurv*vAmp*140.0,0.0,1.0);float totalStress=clamp(vStress*0.75+creaseStress*0.6,0.0,1.0);float whitening=smoothstep(0.12,0.82,totalStress)*0.28;vec3 bleachCol=mix(vec3(0.985,0.98,0.96),vec3(1.0),fib*0.5);alb=mix(alb,max(alb,bleachCol),whitening);vec2 uvB=vec2(1.0-vUv.x,vUv.y);vec4 tF=texture(uPrintF,vUv),tB=texture(uPrintB,uvB);vec4 pr=front?tF:tB;vec4 th=front?tB:tF;float thruFactor=clamp(uThru*(1.0+3.2*backlight),0.0,0.92);vec3 inkSilhouette=mix(th.rgb,th.rgb*0.3+vec3(0.02),clamp(backlight*1.5,0.0,0.8));alb=mix(alb,inkSilhouette,th.a*thruFactor);alb+=col0*(uThru*(backL*0.4+backLp*0.7))*(1.0-th.a*0.85);alb=mix(alb,pr.rgb,pr.a);alb=mix(alb,vec3(0.45,0.29,0.13),smoothstep(0.12,0.55,sc)*0.85);alb=mix(alb,vec3(0.06,0.045,0.04),smoothstep(0.55,0.9,sc));alb=mix(alb,vec3(0.99,0.985,0.96),fx.b*0.85);vec3 key=vec3(1.0,0.965,0.9),amb=vec3(0.62,0.64,0.7);vec3 warm=vec3(1.0,0.9,0.74);vec3 base=amb*0.3*ao+key*1.04*wrap*mix(1.0,ao,0.7)*mix(1.0,0.55,uLamp);base+=key*0.45*backL*uThru*mix(1.0,ao,0.5);float spot=wrapP*pool*mix(1.0,ao,0.5);vec3 col=alb*(base+warm*spot*max(vec3(0.0),vec3(1.15)-base));col+=key*0.03*pow(max(dot(n,normalize(L+V)),0.0),24.0)*(1.0-0.5*uLamp);col+=warm*0.06*pow(max(dot(n,normalize(Lp+V)),0.0),30.0)*pool;float rim=(1.0-smoothstep(0.42,0.66,pres))*smoothstep(0.6,0.95,sc);float fl=0.55+0.45*sin(uTime*6.0+vUv.x*37.0+vUv.y*23.0)*sin(uTime*2.3+vUv.y*51.0);col+=vec3(1.0,0.42,0.08)*rim*fl*(1.7+1.6*uDestroy);frag=vec4(col*a,a);}`, sn = `#version 300 es
in vec2 aQ;uniform vec3 uC;uniform vec2 uHS;uniform float uSoft;uniform mat4 uProj;out vec2 vL;void main(){vL=aQ*(uHS+vec2(uSoft*3.0));gl_Position=uProj*vec4(uC+vec3(vL,0.0),1.0);}`, ln = `#version 300 es
precision highp float;in vec2 vL;uniform vec2 uHS;uniform float uR,uSoft,uA,uOpen,uFront,uFlip;uniform sampler2D uFx;out vec4 frag;float paperAt(vec2 uv){vec4 fx=texture(uFx,clamp(uv,0.0,1.0));return uFront>-0.5?min(fx.r,smoothstep(uFront-0.004,uFront+0.012,fx.a*1.4)):fx.r;}void main(){vec2 q=abs(vL)-uHS+vec2(uR);float d=length(max(q,0.0))+min(max(q.x,q.y),0.0)-uR;float pres=1.0;if(uOpen>0.0){vec2 uv=vL/(2.0*uHS)+0.5,o=vec2(uSoft)/(2.0*uHS);if(uFlip>0.5)uv.x=1.0-uv.x;float p=paperAt(uv)*2.0+paperAt(uv+vec2(o.x,0.0))+paperAt(uv-vec2(o.x,0.0))+paperAt(uv+vec2(0.0,o.y))+paperAt(uv-vec2(0.0,o.y));pres=mix(1.0,p/6.0,uOpen);}frag=vec4(0.0,0.0,0.0,uA*pres*(1.0-smoothstep(-uSoft,uSoft*2.5,d)));}`, fn = `#version 300 es
in vec3 aP;in vec4 aC;in float aS;uniform mat4 uProj;uniform float uPx;out vec4 vC;void main(){gl_Position=uProj*vec4(aP,1.0);gl_PointSize=max(1.0,aS*uPx/gl_Position.w);vC=aC;}`, un = `#version 300 es
precision highp float;in vec4 vC;out vec4 frag;void main(){float a=smoothstep(0.5,0.05,length(gl_PointCoord-0.5))*vC.a;frag=vec4(vC.rgb*a,a);}`;

// .build/sound.js
var pn = {
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
  let t, s;
  if (n <= 160) {
    let r = (n - 80) / 80;
    t = Math.round(420 - r * 80), s = +(2.4 + r * 0.4).toFixed(2);
  } else {
    let r = Math.min(1, (n - 160) / 140);
    t = Math.round(340 - r * 60), s = +(2.8 + r * 0.4).toFixed(2);
  }
  let o = +(3.5 - Math.min(1, (n - 80) / 220) * 0.5).toFixed(2);
  return { freq: t, q: s, gain: o };
}
function ho(e) {
  if (!e) return { freq: 420, q: 2.4, gain: 3.5 };
  typeof e == "string" ? e = { type: e } : typeof e == "number" && (e = { gsm: e });
  let n;
  e.gsm !== void 0 && Number.isFinite(e.gsm) ? n = po(e.gsm) : e.type && pn[e.type] ? n = pn[e.type] : n = { freq: 420, q: 2.4, gain: 3.5 };
  let t = Number.isFinite(e.gain) ? e.gain : n.gain;
  return Number.isFinite(e.volume) && (t = +(t * e.volume).toFixed(2)), {
    freq: Number.isFinite(e.freq) ? e.freq : n.freq,
    q: Number.isFinite(e.q) ? e.q : n.q,
    gain: t
  };
}
var se = /* @__PURE__ */ (() => {
  let e = null, n = null, t = null, s = null, o = null, r = { freq: 420, q: 2.4, gain: 3.5 }, a = he.get("sound", !1), i = {}, p = {};
  function l(b, v) {
    if (r = { ...b }, t && e) {
      let f = v !== void 0 ? v : e.currentTime;
      f > e.currentTime ? (t.frequency.setValueAtTime(r.freq, f), t.Q.setValueAtTime(r.q, f), t.gain.setValueAtTime(r.gain, f)) : (t.frequency.setValueAtTime(r.freq, e.currentTime), t.frequency.value = r.freq, t.Q.setValueAtTime(r.q, e.currentTime), t.Q.value = r.q, t.gain.setValueAtTime(r.gain, e.currentTime), t.gain.value = r.gain);
    }
    return r;
  }
  function u(b, v) {
    return l(ho(b), v);
  }
  let d = () => {
    if (!e) {
      let b = window.AudioContext || window.webkitAudioContext;
      if (!b) return null;
      e = new b(), n = e.createGain(), n.gain.value = 0.6, t = e.createBiquadFilter(), t.type = "peaking", t.frequency.value = r.freq, t.Q.value = r.q, t.gain.value = r.gain, n.connect(t), t.connect(e.destination), s = e.createBuffer(1, e.sampleRate, e.sampleRate);
      let v = s.getChannelData(0), f = 0, S = 0;
      for (let R = 0; R < v.length; R++) {
        let A = Math.random() * 2 - 1;
        f = 0.99 * f + A * 0.05, S = 0.95 * S + A * 0.1, v[R] = (f + S + A * 0.15) * 1.6;
      }
    }
    return e.state === "suspended" && e.resume(), e;
  };
  function c() {
    return o || !e || (o = Promise.all(Object.entries(i).map(([b, v]) => fetch(v).then((f) => f.ok ? f.arrayBuffer() : Promise.reject(new Error(b))).then((f) => e.decodeAudioData(f)).then((f) => {
      p[b] = f;
    }).catch(() => {
    })))), o;
  }
  function g(b, v, f = {}) {
    let S = p[b];
    if (!S) return !1;
    let R = e.createBufferSource();
    R.buffer = S, R.playbackRate.value = f.rate || 1;
    let A = e.createGain();
    return A.gain.value = f.gain ?? 1, R.connect(A), A.connect(n), R.start(v, f.offset || 0, f.dur), !0;
  }
  function m(b, v, f, S, R) {
    let A = e.createBufferSource();
    A.buffer = s;
    let _ = e.createBiquadFilter();
    _.type = "bandpass", _.frequency.value = f, _.Q.value = S;
    let M = e.createGain();
    M.gain.setValueAtTime(1e-4, b), M.gain.linearRampToValueAtTime(R, b + 2e-3), M.gain.exponentialRampToValueAtTime(1e-4, b + v), A.connect(_), _.connect(M), M.connect(n), A.start(b, Math.random() * 0.9, v + 0.03);
  }
  function y(b, v, f, S, R) {
    let A = e.createBufferSource();
    A.buffer = s, A.loop = !0;
    let _ = e.createBiquadFilter();
    _.type = "bandpass", _.Q.value = 0.8, _.frequency.setValueAtTime(f, b), _.frequency.linearRampToValueAtTime(S, b + v);
    let M = e.createGain();
    M.gain.setValueAtTime(1e-4, b), M.gain.linearRampToValueAtTime(R, b + v * 0.15), M.gain.linearRampToValueAtTime(1e-4, b + v), A.connect(_), _.connect(M), M.connect(n), A.start(b), A.stop(b + v + 0.05);
  }
  function k(b, v, f, S, R, A) {
    let _ = Math.round(v * f);
    for (let M = 0; M < _; M++) {
      let D = Math.random();
      A && (D = D * D), m(b + D * v, 6e-3 + Math.random() * 0.03, 1500 + Math.random() * 4500 * S, 0.7 + Math.random() * 2.2, R * (0.25 + Math.random() * 0.75));
    }
  }
  return {
    get enabled() {
      return a;
    },
    get tuning() {
      return { ...r };
    },
    set(b) {
      a = !!b, he.set("sound", a), a && d() && c();
    },
    // optional real recordings: { crumple, sheet, tear } (URLs)
    useSamples(b) {
      i = { ...b }, o = null, a && e && c();
    },
    tune(b) {
      return u(b);
    },
    // names: crumple, uncrumple, flip, tear, seal, fire, grain
    play(b, v = 1, f = 0, S) {
      if (typeof v == "object" && v !== null ? (S = v, v = 1, f = 0) : typeof v == "string" ? (S = { type: v }, v = 1, f = 0) : typeof f == "object" && f !== null ? (S = f, f = 0) : typeof f == "string" && (S = { type: f }, f = 0), typeof S == "string" ? S = { type: S } : typeof S == "number" && (S = { gsm: S }), S && u(S), !a || !d()) return;
      c();
      let R = e.currentTime + f;
      S && f > 0 && u(S, R);
      let A = (_) => !!p[_];
      if (b === "crumple")
        if (A("crumple")) {
          let _ = Math.max(2, Math.round(v * 4));
          for (let M = 0; M < _; M++) g("crumple", R + M / _ * v * 0.85, { gain: 0.6 + Math.random() * 0.35, rate: 0.85 + Math.random() * 0.35 });
          k(R, v, 25, 1, 0.1, !0);
        } else
          k(R, v, 90, 1, 0.32, !0), y(R, v, 2400, 1200, 0.07);
      else if (b === "uncrumple")
        if (A("sheet")) {
          let _ = Math.max(2, Math.round(v * 2.5));
          for (let M = 0; M < _; M++) g(M % 2 && A("crumple") ? "crumple" : "sheet", R + M / _ * v * 0.9, { gain: 0.4 + Math.random() * 0.25, rate: 0.75 + Math.random() * 0.25 });
        } else
          k(R, v, 46, 0.8, 0.26, !1), y(R, v, 1400, 2600, 0.05);
      else b === "flip" ? g("sheet", R, { gain: 0.8, rate: 1.15 }) || (y(R, 0.38, 500, 2400, 0.16), m(R + 0.34, 0.05, 900, 1, 0.22)) : b === "tear" ? g("tear", R, { gain: 1 }) || (y(R, 0.45, 1800, 3600, 0.18), k(R, 0.45, 160, 1.2, 0.3, !1)) : b === "seal" ? (g("tear", R, { gain: 0.45, rate: 1.7, dur: 0.16 }) || m(R, 0.05, 1200, 2, 0.3), g("sheet", R + 0.2, { gain: 0.5, rate: 0.9 }) || y(R + 0.2, 0.5, 700, 2200, 0.08)) : b === "fire" ? (k(R, v, 22, 0.45, 0.16, !1), y(R, v, 500, 800, 0.05)) : b === "grain" && (g("crumple", R, { gain: 0.22, rate: 1.2 + Math.random() * 0.4, offset: Math.random() * 0.3, dur: 0.08 }) || k(R, 0.06, 60, 1, 0.2, !1));
    }
  };
})();

// .build/motion.js
function ue(e, n, t, s, o = be, r = 0, a) {
  e.tw = e.tw.filter((i) => i.key !== n), e.tw.push({ key: n, to: t, dur: Math.max(1e-3, s), ease: o, start: performance.now() + r * 1e3, from: null, done: a });
}
function Et(e, n) {
  let t = !1, s = [];
  return e.tw = e.tw.filter((o) => {
    if (t = !0, n < o.start) return !0;
    o.from === null && (o.from = e[o.key]);
    let r = Y((n - o.start) / (o.dur * 1e3));
    return e[o.key] = o.from + (o.to - o.from) * o.ease(r), r >= 1 ? (o.done && s.push(o.done), !1) : !0;
  }), s.forEach((o) => o()), t;
}
function nt(e) {
  if (e.cfg.type === "envelope") return 0.34;
  let n = e.F.shape;
  return n === 0 ? 0.42 : n === 2 ? 0.35 : 0.3;
}
function ot(e, n) {
  let t = pe(Y(n));
  return 2 * Math.max(e.F.ext[0] / 2 + (e.half[0] - e.F.ext[0] / 2) * t, e.F.ext[1] / 2 + (e.half[1] - e.F.ext[1] / 2) * t);
}
function dn(e, n) {
  let t = pe(Y(e.cfg.type === "envelope" ? n * 2 : n)), s = [0, 0, -0.02];
  return e.pose.map((o, r) => o * (1 - t) + s[r] * t);
}
function $e(e, n, t) {
  let s = (v, f = 0) => n.destroy !== void 0 ? n.destroy : v.front0 > -0.5 ? v.front0 + v.burned + f : -1, o = n.destroy !== void 0 ? Y((1.25 - n.destroy) / 0.9) : 1;
  if (e.cfg.type !== "envelope") {
    let v = { ...t, p: n.p, f: n.f, tear: n.tear, front: s(e, n.burnOpen || 0), destroy: n.destroy !== void 0, alpha: o };
    return { items: [{ P: e, st: v }], shadow: { P: e, st: v }, active: { P: e, st: v } };
  }
  let r = e.letter, a = n.p, i = pe(Y(a / 0.24)), p = pe(Y((a - 0.14) / 0.36)), l = pe(Y((a - 0.44) / 0.32)), u = Y((a - 0.58) / 0.42), d = { ...t, p: i, f: n.f, tear: 0, cy: t.cy - l * t.vhU * 0.8, rot: [t.rot[0], t.rot[1], t.rot[2] + l * 0.45], front: s(e) }, c = -0.08 + p * 0.5, g = -0.035 * (1 - l), m = Math.PI * De(Y(n.f)), y = [0, 0, -0.02], k = { ...t, cx: Qe(d.cx, 0, l), cy: Qe(d.cy, 0, l), sc: Qe(d.sc, t.scLetter, l), rot: d.rot.map((v, f) => Qe(v, y[f] + (t.adjust ? t.adjust[f] : 0), l)), local: [-Math.sin(m) * g, c * (1 - l), Math.cos(m) * g], p: Ot(u), f: n.f, tear: 0, front: s(r, n.burnOpen || 0), destroy: n.destroy !== void 0, alpha: o };
  return { items: l >= 0.999 ? [{ P: r, st: k }] : a < 0.01 ? [{ P: e, st: d }] : [{ P: e, st: d }, { P: r, st: k }], shadow: l < 0.5 ? { P: e, st: d } : { P: r, st: k }, active: l < 0.5 ? { P: e, st: d } : { P: r, st: k } };
}
function rt(e, n, t, s, o, r = 0, a = 0) {
  let i = pe(Y(n.p)), p = (e.F.ext[0] / 2 + (e.half[0] - e.F.ext[0] / 2) * i) * n.sc * t * 1.1, l = (e.F.ext[1] / 2 + (e.half[1] - e.F.ext[1] / 2) * i) * n.sc * t * 1.1, u = r + s / 2 + n.cx * t, d = a + o / 2 - n.cy * t;
  return { cx: u, cy: d, x0: u - p, x1: u + p, y0: d - l, y1: d + l, w1: e.half[0] * 2 * n.sc * t, h1: e.half[1] * 2 * n.sc * t };
}
function St(e, n, t, s) {
  let { P: o, st: r } = t.active, a = n.p - (n.pPrev ?? n.p), i = pe(Y(r.p)), p = (o.F.ext[0] / 2 + (o.half[0] - o.F.ext[0] / 2) * i) * r.sc, l = (o.F.ext[1] / 2 + (o.half[1] - o.F.ext[1] / 2) * i) * r.sc;
  if (a > 5e-4 && n.p > 0.12 && n.p < 0.97) {
    let d = Math.min(8, Math.round(a * 300));
    for (let c = 0; c < d; c++) e.emit({ x: r.cx + (Math.random() - 0.5) * 2 * p, y: r.cy + (Math.random() - 0.5) * 2 * l, z: 0.06 * r.sc, vx: (Math.random() - 0.5) * 0.05 * r.sc, vy: (Math.random() * 0.04 + 0.01) * r.sc, ay: -0.01 * r.sc, r: 0.93, g: 0.9, b: 0.84, a: 0.5, s: (5e-3 + Math.random() * 8e-3) * r.sc, t: 0, life: 1.2 + Math.random() * 0.9 });
  }
  let u = r.front;
  if (u > -0.5 && o.burnPts && r.p > 0.9) {
    let d = n.destroy !== void 0;
    n.acc = (n.acc || 0) + s * (d ? 110 : 9);
    let c = o.burnPts, g = c.length / 3, m = Math.cos(r.rot[2]), y = Math.sin(r.rot[2]);
    for (; n.acc >= 1; ) {
      n.acc -= 1;
      let k = -1;
      for (let R = 0; R < 40; R++) {
        let A = Math.floor(Math.random() * g);
        if (Math.abs(c[A * 3 + 2] - u) < 0.012) {
          k = A;
          break;
        }
      }
      if (k < 0) continue;
      let b = (c[k * 3] - 0.5) * o.w * r.sc, v = (c[k * 3 + 1] - 0.5) * o.h * r.sc, f = r.cx + m * b - y * v, S = r.cy + y * b + m * v;
      e.emit({ x: f, y: S, z: 0.02 * r.sc, vx: (Math.random() - 0.5) * 0.08 * r.sc, vy: (0.06 + Math.random() * 0.1) * r.sc, ay: 0.06 * r.sc, r: 1, g: 0.5 + Math.random() * 0.3, b: 0.12, a: 1, s: (3e-3 + Math.random() * 5e-3) * r.sc, t: 0, life: 0.5 + Math.random() * 0.8, flicker: !0 }), d && Math.random() < 0.45 && e.emit({ x: f, y: S, z: 0.02 * r.sc, vx: (Math.random() - 0.5) * 0.06 * r.sc, vy: -(0.02 + Math.random() * 0.05) * r.sc, ay: -0.05 * r.sc, r: 0.2, g: 0.19, b: 0.18, a: 0.85, s: (8e-3 + Math.random() * 0.012) * r.sc, t: 0, life: 1.4 + Math.random() * 1.1 });
    }
  }
}
function wt(e, n) {
  let t = /* @__PURE__ */ new Map(), s = [], o = null, r = () => {
    let [l, u] = [...t.values()];
    return Math.hypot(l.x - u.x, l.y - u.y);
  }, a = (l) => {
    let u = n.active();
    if (!u) return;
    let d = n.box();
    if (!(d && l.clientX > d.x0 && l.clientX < d.x1 && l.clientY > d.y0 && l.clientY < d.y1) && !t.size) {
      n.outside(l);
      return;
    }
    if (!t.size && n.tap && n.tap(l)) return;
    t.set(l.pointerId, { x: l.clientX, y: l.clientY });
    try {
      e.setPointerCapture(l.pointerId);
    } catch {
    }
    u.tw = u.tw.filter((m) => m.key !== "p");
    let g = performance.now();
    t.size === 2 ? o = { pinch: !0, d0: r(), p0: u.p, moved: !0, last: u.p, box: d, tLast: g, lastX: l.clientX, lastY: l.clientY, vx: 0, vy: 0 } : o = { pinch: !1, r0: Math.hypot(l.clientX - d.cx, l.clientY - d.cy), p0: u.p, x: l.clientX, y: l.clientY, moved: !1, last: u.p, box: d, tLast: g, lastX: l.clientX, lastY: l.clientY, vx: 0, vy: 0 };
  }, i = (l) => {
    if (!o || !t.has(l.pointerId)) return;
    t.set(l.pointerId, { x: l.clientX, y: l.clientY });
    let u = n.active();
    if (!u) {
      o = null, t.clear();
      return;
    }
    let d = performance.now(), c = d - o.tLast;
    c > 8 && (o.vx = (l.clientX - o.lastX) / c, o.vy = (l.clientY - o.lastY) / c, o.tLast = d, o.lastX = l.clientX, o.lastY = l.clientY);
    let g = 0.42 * Math.min(o.box.w1, o.box.h1);
    if (o.pinch && t.size === 2) u.p = Y(o.p0 + (r() - o.d0) / g);
    else if (!o.pinch) {
      if (Math.hypot(l.clientX - o.x, l.clientY - o.y) > 6 && (o.moved = !0), !o.moved) return;
      u.p = Y(o.p0 + (Math.hypot(l.clientX - o.box.cx, l.clientY - o.box.cy) - o.r0) / g);
    }
    Math.abs(u.p - o.last) > 0.035 && (se.play("grain"), o.last = u.p), u.dragging = !0, n.redraw();
  }, p = (l) => {
    if (!t.has(l.pointerId)) return;
    if (t.delete(l.pointerId), t.size === 1 && o) {
      let y = [...t.values()][0], k = n.box ? n.box() : o.box;
      o.pinch = !1, o.x = y.x, o.y = y.y, o.r0 = Math.hypot(y.x - (k ? k.cx : o.x), y.y - (k ? k.cy : o.y)), o.p0 = n.active() ? n.active().p : o.p0;
      return;
    }
    if (t.size) return;
    let u = n.active(), d = o && o.moved, c = o ? o.p0 : 0, g = o && o.vx || 0, m = o && o.vy || 0;
    if (o = null, !!u) {
      if (u.dragging = !1, n.flip && c > 0.85 && Math.abs(g) > 0.2 && Math.abs(g) > 1.5 * Math.abs(m)) {
        u.p = 1, n.flip();
        return;
      }
      if (n.outside && m > 0.75) {
        n.outside(l);
        return;
      }
      d && (u.p >= 0.3 ? (se.play("uncrumple", 0.4), ue(u, "p", 1, 0.45 * (1 - u.p) + 0.15, ze, 0, () => Ye(12))) : (se.play("crumple", 0.35), ue(u, "p", 0, 0.35 * u.p + 0.12, ze, 0, () => Ye(18))), n.redraw());
    }
  };
  return [["pointerdown", a], ["pointermove", i], ["pointerup", p], ["pointercancel", p]].forEach(([l, u]) => re(s, e, l, u)), () => s.splice(0).forEach((l) => l());
}
function at(e, n, t, s, o, r, a) {
  let i = [(n - s / 2) / r, -(t - o / 2) / r, 0.09 * o / r];
  e.lampPos || (e.lampPos = i.slice()), e.lampGoal = i, e.lampOn = a ? 1 : 0, e.lampMoving = !0;
}
function kt(e, n) {
  if (!e.lampGoal) return !1;
  let t = 1 - Math.exp(-n * 20), s = 1 - Math.exp(-n * 7), o = !1;
  for (let a = 0; a < 3; a++) {
    let i = e.lampGoal[a] - e.lampPos[a];
    Math.abs(i) > 1e-4 && (o = !0), e.lampPos[a] += i * t;
  }
  let r = (e.lampOn || 0) - (e.lamp || 0);
  return Math.abs(r) > 2e-3 && (o = !0), e.lamp = (e.lamp || 0) + r * s, o;
}

// .build/renderer.js
var ve = {
  persp(e, n, t, s) {
    let o = 1 / Math.tan(e / 2), r = 1 / (t - s);
    return [o / n, 0, 0, 0, 0, o, 0, 0, 0, 0, (s + t) * r, -1, 0, 0, 2 * s * t * r, 0];
  },
  mul(e, n) {
    let t = new Array(16);
    for (let s = 0; s < 4; s++) for (let o = 0; o < 4; o++) {
      let r = 0;
      for (let a = 0; a < 4; a++) r += e[a * 4 + o] * n[s * 4 + a];
      t[s * 4 + o] = r;
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
}, Ce = 30 * Math.PI / 180, _e = 10, je = [-0.45, 0.62, 0.65];
function co(e, n) {
  let t = n.w / 2, s = n.h / 2, o = Math.hypot(t, s);
  if (e === "flat") {
    let i = 0.78 * Math.PI / o, p = 1 / i;
    return { shape: 0, k0: i, squash: 0.3, roll: 0, A0: n.card ? 0.06 : 0.1, Ares: 45e-4, ext: [2.42 * p, 2.42 * p] };
  }
  if (e === "roll") {
    let i = Math.max(0.03, n.w * 0.085);
    return { shape: 1, k0: 0, squash: 1, roll: i, A0: 0.03, Ares: 4e-3, ext: [2.2 * i, n.h] };
  }
  if (e === "twist") {
    let i = 3.3 * Math.PI / n.h;
    return { shape: 2, k0: i, squash: 1, roll: 0.012, A0: 0.03, Ares: 45e-4, ext: [n.w, 2.6 / i] };
  }
  if (e === "quarters") return { shape: 3, k0: 0, squash: 1, roll: 0, A0: 7e-3, Ares: 35e-4, ext: [t * 1.05, s * 1.05] };
  if (e === "half") return { shape: 4, k0: 0, squash: 1, roll: 0, A0: 7e-3, Ares: 35e-4, ext: [t * 1.05, n.h * 1.02] };
  if (e === "thirds") return { shape: 5, k0: 0, squash: 1, roll: 0, A0: 7e-3, Ares: 35e-4, ext: [n.w * 1.02, n.h / 3 * 1.05] };
  if (e === "envelope") return { shape: 6, k0: 0, squash: 1, roll: 0, A0: 5e-3, Ares: 3e-3, ext: [n.w * 1.02, n.body * 1.04] };
  if (e === "accordion") return { shape: 7, k0: 0, squash: 1, roll: 0, A0: 8e-3, Ares: 35e-4, ext: [n.w / 4 * 1.08, n.h * 1.02] };
  if (e === "triangle") return { shape: 8, k0: 0, squash: 1, roll: 0, A0: 8e-3, Ares: 35e-4, ext: [t * 1.08, s * 1.08] };
  let r = 0.95 * Math.PI / o, a = 1 / r;
  return { shape: 0, k0: r, squash: 1, roll: 0, A0: n.card ? 0.07 : 0.12, Ares: 45e-4, ext: [2 * (a + 0.06), 2 * (a + 0.06)] };
}
var mo = (e) => e.states.includes("burnt") || e.burnAfterReading ? "burn" : e.states.includes("singed") ? "singed" : null, hn = { corner: [0.3, 0.06], edge: [0.035, 0.01], center: [0.09, 0.03], spots: [0.035, 0.01] };
function Ke(e, n = {}) {
  let t = e.getContext("webgl2", { alpha: !0, premultipliedAlpha: !0, antialias: !0 });
  if (!t) return null;
  let s, o, r, a, i, p, l, u = !1, d = !1, c = (w, E) => {
    let F = ($, x) => {
      let j = t.createShader($);
      if (t.shaderSource(j, x), t.compileShader(j), !t.getShaderParameter(j, t.COMPILE_STATUS)) throw new Error(t.getShaderInfoLog(j));
      return j;
    }, G = t.createProgram();
    if (t.attachShader(G, F(t.VERTEX_SHADER, w)), t.attachShader(G, F(t.FRAGMENT_SHADER, E)), t.linkProgram(G), !t.getProgramParameter(G, t.LINK_STATUS)) throw new Error(t.getProgramInfoLog(G));
    let L = {}, O = t.getProgramParameter(G, t.ACTIVE_UNIFORMS);
    for (let $ = 0; $ < O; $++) {
      let x = t.getActiveUniform(G, $);
      L[x.name] = t.getUniformLocation(G, x.name);
    }
    return { p: G, u: L };
  };
  function g() {
    s = c(rn, an), o = c(sn, ln), r = c(fn, un), a = t.createVertexArray(), t.bindVertexArray(a), i = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, i), t.bufferData(t.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), t.STATIC_DRAW);
    let w = t.getAttribLocation(o.p, "aQ");
    t.enableVertexAttribArray(w), t.vertexAttribPointer(w, 2, t.FLOAT, !1, 0, 0), t.bindVertexArray(null), p = t.createVertexArray(), l = t.createBuffer(), t.bindVertexArray(p), t.bindBuffer(t.ARRAY_BUFFER, l), t.bufferData(t.ARRAY_BUFFER, 420 * 32, t.DYNAMIC_DRAW), [["aP", 3, 0], ["aC", 4, 12], ["aS", 1, 28]].forEach(([E, F, G]) => {
      let L = t.getAttribLocation(r.p, E);
      t.enableVertexAttribArray(L), t.vertexAttribPointer(L, F, t.FLOAT, !1, 32, G);
    }), t.bindVertexArray(null);
  }
  g();
  let m = (w) => {
    w.preventDefault(), u = !0;
  }, y = () => {
    u = !1, g(), v = null, f = null, M = null, D = null, K = null, n.onRestore && n.onRestore();
  };
  e.addEventListener("webglcontextlost", m), e.addEventListener("webglcontextrestored", y);
  function k(w, E, F, G, L, O, $) {
    let x = [];
    for (let H = 0; H <= G; H++) x.push(w + (E - w) * H / G);
    O.forEach((H) => {
      H > w + 1e-6 && H < E - 1e-6 && x.push(H);
    }), x.sort((H, ae) => H - ae);
    let j = [];
    for (let H = 0; H <= L; H++) j.push(-F + 2 * F * H / L);
    $.forEach((H) => {
      H > -F + 1e-6 && H < F - 1e-6 && !j.some((ae) => Math.abs(ae - H) < 1e-6) && j.push(H);
    }), j.sort((H, ae) => H - ae);
    let te = x.length, X = j.length, le = new Float32Array(te * X * 2), V = 0;
    for (let H = 0; H < X; H++) for (let ae = 0; ae < te; ae++)
      le[V++] = x[ae], le[V++] = j[H];
    let Z = new Uint16Array((te - 1) * (X - 1) * 6);
    V = 0;
    for (let H = 0; H < X - 1; H++) for (let ae = 0; ae < te - 1; ae++) {
      let Se = H * te + ae, xe = Se + 1, Ne = Se + te, h = Ne + 1;
      Z[V++] = Se, Z[V++] = xe, Z[V++] = h, Z[V++] = Se, Z[V++] = h, Z[V++] = Ne;
    }
    let fe = t.createVertexArray();
    t.bindVertexArray(fe);
    let Q = t.createBuffer();
    t.bindBuffer(t.ARRAY_BUFFER, Q), t.bufferData(t.ARRAY_BUFFER, le, t.STATIC_DRAW);
    let Ee = t.getAttribLocation(s.p, "aXY");
    t.enableVertexAttribArray(Ee), t.vertexAttribPointer(Ee, 2, t.FLOAT, !1, 0, 0);
    let de = t.createBuffer();
    return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, de), t.bufferData(t.ELEMENT_ARRAY_BUFFER, Z, t.STATIC_DRAW), t.bindVertexArray(null), { vao: fe, count: Z.length, bufs: [Q, de] };
  }
  function b(w, E) {
    let F = t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, F), E.float ? (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1), t.texImage2D(t.TEXTURE_2D, 0, t.RG16F, E.w, E.h, 0, t.RG, t.FLOAT, w)) : (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, w), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1)), E.mip ? (t.generateMipmap(t.TEXTURE_2D), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR)) : t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), F;
  }
  let v = null, f = null, S = (w) => {
    let E = t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, E), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(w)), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), E;
  }, R = () => v || (v = S([0, 0, 0, 0])), A = () => f || (f = S([255, 0, 0, 255])), _ = (w) => {
    w && w !== v && w !== f && t.deleteTexture(w);
  }, M = null, D = null;
  function J() {
    return M || (M = S([240, 240, 240, 255]), D = Xe("grain").then((w) => {
      !w || d || (t.bindTexture(t.TEXTURE_2D, M), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, w), t.generateMipmap(t.TEXTURE_2D), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.REPEAT), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.REPEAT));
    }), M);
  }
  async function I(w) {
    let E = Ve(w), F = { ...Me[E.type] };
    if (E.color) {
      let B = Oe(E.color);
      B && (F.color = B);
    }
    J();
    let G = E.type === "envelope" ? I({
      id: E.id + "-letter",
      type: E.letter,
      shape: "thirds",
      text: E.text,
      back: E.back,
      states: E.states.filter((B) => B !== "torn"),
      seed: E.seed + 1,
      hiddenInk: E.hiddenInk,
      burn: E.burn,
      burnAfterReading: E.burnAfterReading,
      stamp: E.stamp,
      ...E.color ? { color: E.color } : {},
      ...E.wearIntensity !== void 0 ? { wearIntensity: E.wearIntensity } : {}
    }) : null;
    await Jt([F.font, "Caveat", "Courier Prime", "Special Elite"]);
    let L = F.w / 2, O = F.h / 2, $ = co(E.shape, F), x = Math.round(512 * F.w / 0.84), j = Math.round(x * F.h / F.w), te = he.get("opens." + E.id, 0), X = ne(E.seed * 7 + 1), le = F.stub ? L - F.w * F.stub : null, V = F.body ? -O + F.body : 0, Z = Math.max(16, Math.round(Math.sqrt(15e3 * F.w / F.h))), fe = Math.max(16, Math.round(Z * F.h / F.w)), Q = [0], Ee = [0, -F.h / 6 * 1.08, F.h / 6, V];
    E.shape === "accordion" && Q.push(-F.w / 6, F.w / 6);
    let de = [];
    if (le !== null) {
      let B = Math.round(Z * (le + L) / F.w);
      de.push(k(-L, le, O, B, fe, Q, Ee)), de.push(k(le, L, O, Z - B, fe, Q, Ee));
    } else de.push(k(-L, L, O, Z, fe, Q, Ee));
    let H = !(E.back || E.type === "notebook" || E.type === "form" || E.type === "envelope" || E.type === "newspaper" || E.type === "postcard" || E.type === "blueprint" || ["coffee", "water", "prints", "aged", "wine", "ink", "foxing", "faded", "staple", "grease", "dogear", "damp", "clip"].some((B) => E.states.includes(B))), ae = mo(E), Se = !(E.type === "notebook" || E.type === "form" || E.type === "envelope" || E.type === "punchcard" || E.type === "parchment" || E.type === "postcard" || E.states.includes("aged") || E.states.includes("torn") || ae), [xe, Ne, h, T] = await Promise.all([
      yt.run("creases", [{ seed: E.seed, shape: E.shape, w: F.w, h: F.h, card: !!F.card, foldY: V, states: E.states }, x, j]),
      tt(E, F, "front", te),
      H ? null : tt(E, F, "back", te),
      Se ? null : zt(E, F, ae)
    ]), P = on(E, x, j), C = new Float32Array(x * j * 2);
    for (let B = 0; B < x * j; B++)
      C[B * 2] = xe[B], C[B * 2 + 1] = P ? P[B] : 0;
    let q = $.shape === 1 || $.shape === 2, N = {
      cfg: E,
      T: F,
      w: F.w,
      h: F.h,
      half: [L, O],
      F: $,
      stubX: le,
      foldY: V,
      meshes: de,
      openings: te,
      tH: b(C, { float: !0, w: x, h: j }),
      tPF: b(Ne, { mip: !0 }),
      tPB: H ? R() : b(h, { mip: !0 }),
      tFx: Se ? A() : b(T.canvas, {}),
      burnPts: Se ? null : T.burnPts,
      // which burn field the effects hold: 'burn' (sparks, can burn away), 'singed' (rim only) or 'none' (ensureBurn adds one)
      fxBurn: ae || "none",
      backEmpty: H,
      // estimated texture memory (front and back with mipmaps, effects, creases in RG16F)
      bytes: Math.round(Ne.width * Ne.height * 4 * 1.33 * (H ? 1 : 2) + (Se ? 0 : T.canvas.width * T.canvas.height * 4) + x * j * 4),
      // folded and elongated papers stay almost facing the camera; crumpled ones may spin freely
      pose: $.shape >= 3 ? [-0.22 + X() * 0.18, -0.2 + X() * 0.4, -0.45 + X() * 0.9] : q ? [-0.15 + X() * 0.15, -0.15 + X() * 0.3, -0.6 + X() * 1.2] : [-0.3 + X() * 0.25, -0.35 + X() * 0.7, X() * 6.28],
      seedA: X() * 6.28,
      // a singed rim holds its front just under the lowest value of its field: only the scorch band shows
      front0: E.states.includes("burnt") ? hn[E.burn][0] + hn[E.burn][1] * X() : ae === "singed" ? T.lo - 0.012 : -1,
      burned: he.get("burned." + E.id, 0),
      age: E.states.includes("aged") ? 1 : 0,
      torn: !1
    };
    return N.extent = Math.max($.ext[0], $.ext[1]), N.hasRedaction = /\[\[/.test(E.text + E.back), G && (N.letter = await G), await D, N;
  }
  async function U(w) {
    w.openings = he.get("opens." + w.cfg.id, 0);
    let [E, F] = await Promise.all([tt(w.cfg, w.T, "front", w.openings), w.backEmpty ? null : tt(w.cfg, w.T, "back", w.openings)]);
    _(w.tPF), _(w.tPB), w.tPF = b(E, { mip: !0 }), w.tPB = F ? b(F, { mip: !0 }) : R();
  }
  function z(w) {
    return w.fxBurn === "burn" ? Promise.resolve() : (w.burnJob || (w.burnJob = zt(w.cfg, w.T, "burn").then((E) => {
      if (w.released) return;
      let F = w.tFx;
      F === f && (w.bytes += E.canvas.width * E.canvas.height * 4), w.tFx = b(E.canvas, {}), _(F), w.burnPts = E.burnPts, w.fxBurn = "burn";
    })), w.burnJob);
  }
  async function ee(w) {
    await Promise.all([z(w), w.letter && z(w.letter)]);
  }
  function oe(w) {
    w.released = !0, [w.tH, w.tPF, w.tPB, w.tFx].forEach(_), w.meshes.forEach((E) => {
      t.deleteVertexArray(E.vao), E.bufs.forEach((F) => t.deleteBuffer(F));
    }), w.letter && oe(w.letter);
  }
  function me(w, E, F) {
    let G = E.f || 0, L = ve.mul(ve.T(E.cx, E.cy, (E.zoff || 0) * E.sc + 0.12 * E.sc * Math.sin(Math.PI * G)), ve.S(E.sc));
    L = ve.mul(L, ve.RZ(E.rot[2])), L = ve.mul(L, ve.RX(E.rot[0])), L = ve.mul(L, ve.RY(E.rot[1] + Math.PI * De(Y(G)))), E.local && (L = ve.mul(L, ve.T(E.local[0], E.local[1], E.local[2])));
    let O = s.u;
    t.useProgram(s.p), [[w.tH, "uH"], [w.tPF, "uPrintF"], [w.tPB, "uPrintB"], [w.tFx, "uFx"]].forEach(([V, Z], fe) => {
      t.activeTexture(t.TEXTURE0 + fe), t.bindTexture(t.TEXTURE_2D, V), t.uniform1i(O[Z], fe);
    }), t.activeTexture(t.TEXTURE4), t.bindTexture(t.TEXTURE_2D, J()), t.uniform1i(O.uGrain, 4), t.uniform2f(O.uGrainK, w.w * 5, w.h * 5);
    let $ = E.L || je;
    t.uniform1i(O.uShape, w.F.shape), t.uniform1f(O.uP, Y(E.p)), t.uniform1f(O.uK0, w.F.k0), t.uniform1f(O.uKres, 0.06), t.uniform1f(O.uA0, w.F.A0), t.uniform1f(O.uAres, w.F.Ares), t.uniform1f(O.uSeedA, w.seedA), t.uniform1f(O.uSquash, w.F.squash), t.uniform1f(O.uRoll, w.F.roll || 0.03);
    let x = w.cfg.gsm || w.T.gsm || (w.cfg.thickness ? w.cfg.thickness * 800 : w.T.thickness ? w.T.thickness * 800 : w.cfg.weight || w.T.weight || (w.T.card ? 260 : w.T.carbon ? 42 : w.cfg.type === "receipt" ? 48 : 80)), j = Y(x / 80, 0.45, 3.5);
    t.uniform1f(O.uCurl, 0.9 / Math.sqrt(j) * Math.sin(Math.PI * Y(G))), t.uniform1f(O.uStubX, w.stubX ?? 0), t.uniform1f(O.uFoldSide, w.T.stub ? -1 : 1), t.uniform1f(O.uFoldBw, (w.T.card ? 0.03 : 0.016) * Math.sqrt(j / (w.T.card ? 3.25 : 1))), t.uniform1f(O.uFoldY, w.foldY || 0), t.uniform1f(O.uThick, G > 0.5 ? -6e-3 : 6e-3), t.uniform1f(O.uScale, E.sc), t.uniform1f(O.uBump, 1), t.uniform2f(O.uHalf, w.half[0], w.half[1]), t.uniform3f(O.uCam, 0, 0, _e), t.uniform3f(O.uColor, w.T.color[0], w.T.color[1], w.T.color[2]), t.uniform3f(O.uL, $[0], $[1], $[2]), t.uniform1f(O.uAge, w.age);
    let te = w.cfg.thru !== void 0 ? w.cfg.thru : w.T.thru !== void 0 ? w.T.thru : w.T.card ? 0 : w.T.carbon ? 0.18 : w.cfg.type === "receipt" ? 0.14 : w.cfg.type === "newspaper" ? 0.08 : Y(0.035 * (80 / x), 0.015, 0.2);
    t.uniform1f(O.uThru, te), t.uniform1f(O.uTime, E.time || 0), t.uniform1f(O.uFront, E.front ?? -1), t.uniform1f(O.uDestroy, E.destroy ? 1 : 0), t.uniform1f(O.uInkMax, 24e-4 * E.sc);
    let X = E.lampPos || [0, 0, 10];
    t.uniform3f(O.uLampPos, X[0], X[1], X[2]), t.uniform1f(O.uLamp, E.lamp || 0), t.uniform1f(O.uLampR, E.lampR || 1), t.uniformMatrix4fv(O.uModel, !1, L), t.uniformMatrix4fv(O.uProj, !1, F), (w.T.card ? [1, 0] : [0]).forEach((V) => {
      t.uniform1f(O.uEdge, V), w.meshes.forEach((Z, fe) => {
        let Q = fe === 1;
        Q && (w.torn || (E.tear || 0) >= 1) || (t.uniform1f(O.uIsStub, Q ? 1 : 0), t.uniform1f(O.uTear, Q && E.tear || 0), t.bindVertexArray(Z.vao), t.drawElements(t.TRIANGLES, Z.count, t.UNSIGNED_SHORT, 0));
      });
    });
  }
  function Ae(w, E, F) {
    t.useProgram(o.p), t.disable(t.DEPTH_TEST), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA);
    let G = pe(Y(E.p)), L = [w.F.ext[0] / 2 * E.sc, w.F.ext[1] / 2 * E.sc], O = [L[0] + (w.half[0] * E.sc - L[0]) * G, L[1] + (w.half[1] * E.sc - L[1]) * G], $ = Math.min(Math.min(L[0], L[1]) * (1 - G) + 0.012 * E.sc * G, O[0], O[1]), x = (0.04 + 0.08 * E.lift + 0.04 * (1 - G)) * E.sc, j = E.L || je, te = Math.hypot(j[0], j[1]) || 1, X = (0.05 + 0.1 * E.lift) * E.sc * Math.min(1.6, te / Math.max(0.25, j[2]));
    t.uniform3f(o.u.uC, E.cx - j[0] / te * X, E.cy - j[1] / te * X, -0.25 * E.sc), t.uniform2f(o.u.uHS, O[0], O[1]), t.uniform1f(o.u.uR, $), t.uniform1f(o.u.uSoft, x), t.uniform1f(o.u.uA, (0.62 - 0.2 * E.lift) * (E.alpha ?? 1)), t.uniformMatrix4fv(o.u.uProj, !1, F), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, w.tFx), t.uniform1i(o.u.uFx, 0), t.uniform1f(o.u.uOpen, Y((E.p - 0.85) / 0.15)), t.uniform1f(o.u.uFront, E.front ?? -1), t.uniform1f(o.u.uFlip, (E.f || 0) > 0.5 ? 1 : 0), t.bindVertexArray(a), t.drawArrays(t.TRIANGLE_STRIP, 0, 4);
  }
  function ge(w, E, F, G = e.width, L = e.height) {
    if (d || u) return;
    t.viewport(0, 0, G, L), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT);
    let O = ve.mul(ve.persp(Ce, G / L, 0.1, 100), ve.T(0, 0, -_e));
    if (E && (E.st.alpha ?? 1) > 0.01 && Ae(E.P, E.st, O), t.disable(t.BLEND), t.enable(t.DEPTH_TEST), w.forEach(($) => me($.P, $.st, O)), F && F.n) {
      let $ = F.buffer();
      t.useProgram(r.p), t.disable(t.DEPTH_TEST), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA), t.uniformMatrix4fv(r.u.uProj, !1, O), t.uniform1f(r.u.uPx, L / (2 * Math.tan(Ce / 2))), t.bindVertexArray(p), t.bindBuffer(t.ARRAY_BUFFER, l), t.bufferSubData(t.ARRAY_BUFFER, 0, $), t.drawArrays(t.POINTS, 0, $.length / 8);
    }
  }
  let K = null;
  function Re() {
    t.deleteFramebuffer(K.fb), t.deleteRenderbuffer(K.rb), t.deleteTexture(K.t), K = null;
  }
  function Fe(w, E = !1, F = "image/png", G = 256) {
    if (d || u) return "";
    let L = G;
    if (!K || K.S !== L) {
      K && Re();
      let V = t.createTexture();
      t.bindTexture(t.TEXTURE_2D, V), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA8, L, L, 0, t.RGBA, t.UNSIGNED_BYTE, null), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR);
      let Z = t.createRenderbuffer();
      t.bindRenderbuffer(t.RENDERBUFFER, Z), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, L, L);
      let fe = t.createFramebuffer();
      t.bindFramebuffer(t.FRAMEBUFFER, fe), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, V, 0), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, Z), K = { fb: fe, t: V, rb: Z, S: L, c: ye(L, L) };
    }
    t.bindFramebuffer(t.FRAMEBUFFER, K.fb);
    let O = L / (2 * _e * Math.tan(Ce / 2)), $ = E ? nt(w) : 0, x = 0.9 * L / (ot(w, $) * O), { items: j } = $e(w, { p: $, f: 0, tear: 0, burnOpen: 0 }, { cx: 0, cy: 0, sc: x, scLetter: x, rot: dn(w, $), lift: 0, vhU: 1 });
    ge(j, null, null, L, L);
    let te = new Uint8Array(L * L * 4);
    t.readPixels(0, 0, L, L, t.RGBA, t.UNSIGNED_BYTE, te), t.bindFramebuffer(t.FRAMEBUFFER, null);
    let X = K.c.getContext("2d"), le = X.createImageData(L, L);
    for (let V = 0; V < L; V++) {
      let Z = (L - 1 - V) * L * 4, fe = V * L * 4;
      for (let Q = 0; Q < L * 4; Q += 4) {
        let Ee = te[Z + Q + 3], de = Ee ? 255 / Ee : 0;
        le.data[fe + Q] = Math.min(255, te[Z + Q] * de), le.data[fe + Q + 1] = Math.min(255, te[Z + Q + 1] * de), le.data[fe + Q + 2] = Math.min(255, te[Z + Q + 2] * de), le.data[fe + Q + 3] = Ee;
      }
    }
    return X.putImageData(le, 0, 0), K.c.toDataURL(F, 0.9);
  }
  function lt() {
    if (d) return;
    d = !0, e.removeEventListener("webglcontextlost", m), e.removeEventListener("webglcontextrestored", y), [s, o, r].forEach((E) => t.deleteProgram(E.p)), t.deleteVertexArray(a), t.deleteBuffer(i), t.deleteVertexArray(p), t.deleteBuffer(l), [v, f, M].forEach((E) => {
      E && t.deleteTexture(E);
    }), K && Re();
    let w = t.getExtension("WEBGL_lose_context");
    w && w.loseContext();
  }
  return { gl: t, build: I, refreshPrint: U, release: oe, draw: ge, snapshot: Fe, ensureBurn: ee, isLost: () => u, destroy: lt };
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
        let r = n[o];
        if (r.t += s, r.t >= r.life) {
          n.splice(o, 1);
          continue;
        }
        r.vx += (r.ax || 0) * s, r.vy += (r.ay || 0) * s, r.x += r.vx * s, r.y += r.vy * s;
      }
    },
    get n() {
      return n.length;
    },
    // a single reused Float32Array: nothing is allocated per frame
    buffer() {
      for (let s = 0; s < n.length; s++) {
        let o = n[s], r = o.t / o.life, a = s * 8, i = o.a * Math.pow(Math.sin(Math.PI * Math.min(1, r)), 0.6);
        o.flicker && (i *= 0.55 + 0.45 * Math.sin(o.t * 28 + s)), t[a] = o.x, t[a + 1] = o.y, t[a + 2] = o.z, t[a + 3] = o.r, t[a + 4] = o.g, t[a + 5] = o.b, t[a + 6] = i, t[a + 7] = o.s;
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
}, it = /* @__PURE__ */ (() => {
  let e = { labels: cn, remember: !1, motion: "auto", flashlight: !0, maxBuilt: 3 }, n = !1, t, s = !1, o, r, a, i, p, l, u, d, c, g = null, m = null, y = [], k = /* @__PURE__ */ new WeakMap(), b = [], v = Mt(), f = null, S = 0, R = (h) => h.replace(/\[\[[^\]\n]+\]\]/g, "redacted").replace(/~~[^~\n]+~~\{([^}\n]+)\}/g, "$1").replace(/~~([^~\n]+)~~/g, "$1").replace(/^# /gm, ""), A = 0.16, _ = 0.9, M = 0.42, D = 1.5, J = 1;
  function I() {
    if (o) return;
    n = qe(e.motion);
    let h = document.createElement("style");
    h.textContent = ":root{--crumple-backdrop:rgba(6,5,4,.8);--crumple-ui-bg:rgba(14,13,12,.7);--crumple-ui-fg:#ebe5d6;--crumple-ui-border:rgba(235,229,214,.4);--crumple-ui-font:12px/1 'Courier Prime',ui-monospace,monospace;--crumple-accent:#f5c266}.crumple-scene{position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483640;pointer-events:none;display:none;transition:opacity .3s ease;touch-action:none}.crumple-backdrop{position:fixed;inset:0;z-index:2147483630;background:transparent;pointer-events:none;transition:background .7s ease}.crumple-backdrop.on{background:var(--crumple-backdrop)}.crumple-bar{position:fixed;z-index:2147483645;right:18px;top:16px;display:none;gap:8px}.crumple-bar.on{display:flex}.crumple-bar button,.crumple-fallback button{background:var(--crumple-ui-bg);border:1px solid var(--crumple-ui-border);color:var(--crumple-ui-fg);font:var(--crumple-ui-font);letter-spacing:.18em;padding:9px 12px;cursor:pointer}.crumple-bar button[hidden]{display:none}.crumple-hint{position:fixed;z-index:2147483645;left:50%;bottom:8vh;transform:translateX(-50%);font:var(--crumple-ui-font);font-size:13px;letter-spacing:.2em;color:var(--crumple-ui-fg);background:var(--crumple-ui-bg);padding:8px 14px;opacity:0;transition:opacity .5s;pointer-events:none}.crumple-hint.on{opacity:1}.crumple-trigger{display:inline-block;width:96px;height:96px;padding:0;border:0;background:none;cursor:pointer;-webkit-tap-highlight-color:transparent}.crumple-trigger img{width:100%;height:100%;display:block;filter:drop-shadow(2px 7px 6px rgba(0,0,0,.6))}.crumple-trigger:hover img,.crumple-trigger:focus-visible img{animation:crumple-wiggle .75s ease}.crumple-trigger:focus-visible{outline:2px solid var(--crumple-accent);outline-offset:4px;border-radius:50%}.crumple-trigger.active{visibility:hidden}.crumple-trigger.recrumple img{animation:crumple-squeeze .9s ease}@keyframes crumple-wiggle{0%{transform:none}22%{transform:rotate(-8deg) translateY(-4px)}50%{transform:rotate(6deg) translateY(-1px)}78%{transform:rotate(-2deg)}100%{transform:none}}@keyframes crumple-squeeze{0%{transform:scale(1.15)}30%{transform:scale(.7) rotate(-20deg)}60%{transform:scale(1.05) rotate(10deg)}100%{transform:none}}.crumple-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.crumple-fallback{position:fixed;inset:0;z-index:2147483646;display:none;align-items:center;justify-content:center;background:var(--crumple-backdrop);padding:24px}.crumple-fallback.on{display:flex}.crumple-fallback .sheet{max-width:min(520px,90vw);max-height:86vh;overflow:auto;padding:36px 34px;box-shadow:0 18px 40px rgba(0,0,0,.6);white-space:pre-line;font-size:19px;line-height:1.6;color:#2a2219}.crumple-fallback .sheet img{display:block;max-width:100%;margin:0 auto 16px}.crumple-fallback button{position:fixed;right:18px;top:16px}.crumple-fallback del{color:#5b4d3e;text-decoration:line-through;text-decoration-thickness:2px}.crumple-fallback ins{text-decoration:none;color:#1d3a8c;font-family:Caveat,'Comic Sans MS',cursive;font-size:1.12em;padding:0 .12em}.crumple-fallback .crumple-h{display:block;font-weight:700;font-size:1.15em;margin:.2em 0}.crumple-fallback .crumple-redact{display:inline-block;height:.85em;vertical-align:-.08em;background:#1b1713;border-radius:2px;margin:0 .1em}body.crumple-open{overflow:hidden;touch-action:none}@media (prefers-reduced-motion:reduce){.crumple-trigger.recrumple img,.crumple-trigger:hover img{animation:none}}@media print{canvas.crumple-scene,.crumple-backdrop,.crumple-bar,.crumple-hint,.crumple-fallback{display:none !important}.crumple-sr{position:static !important;width:auto !important;height:auto !important;overflow:visible !important;clip:auto !important;white-space:pre-wrap !important;color:#000;font-family:monospace}}", document.head.appendChild(h), g = h;
    let T = e.labels;
    r = document.createElement("div"), r.className = "crumple-backdrop", o = document.createElement("canvas"), o.className = "crumple-scene", o.setAttribute("aria-hidden", "true"), d = document.createElement("div"), d.className = "crumple-sr", d.id = "crumple-content", d.setAttribute("aria-live", "polite"), a = document.createElement("div"), a.className = "crumple-bar", a.setAttribute("role", "dialog"), a.setAttribute("aria-modal", "true"), a.setAttribute("aria-describedby", "crumple-content"), a.tabIndex = -1, i = document.createElement("button"), i.type = "button", i.textContent = T.flip, p = document.createElement("button"), p.type = "button", p.textContent = T.tear, p.hidden = !0, l = document.createElement("button"), l.type = "button", l.textContent = T.close, a.append(d, p, i, l), u = document.createElement("div"), u.className = "crumple-hint", u.textContent = T.hint, c = document.createElement("div"), c.className = "crumple-fallback", c.setAttribute("role", "dialog"), c.setAttribute("aria-modal", "true"), document.body.append(r, o, a, u, c), re(b, l, "click", () => w()), re(b, i, "click", () => G()), re(b, p, "click", () => L()), re(b, window, "keydown", (P) => {
      if (!(P.ctrlKey || P.metaKey || P.altKey || xe(P.target))) {
        if (c.classList.contains("on")) {
          P.key === "Escape" ? ae() : P.key === "Tab" && Se(P, c);
          return;
        }
        f && (P.key === "Tab" ? Se(P, a) : P.key === "Escape" ? w() : (P.key === "f" || P.key === "F") && G());
      }
    }), re(b, window, "resize", () => {
      f && (z(), K());
    }), re(b, window, "pointermove", (P) => {
      if (!e.flashlight || !f || f.phase !== "open" || f.dragging || P.pointerType === "touch") return;
      let C = f.boxCache || me(), q = !!C && P.clientX > C.x0 - 30 && P.clientX < C.x1 + 30 && P.clientY > C.y0 - 30 && P.clientY < C.y1 + 30;
      at(f, P.clientX, P.clientY, o.clientWidth, o.clientHeight, o.clientHeight / (2 * _e * Math.tan(Ce / 2)), q), K();
    }), re(b, document, "mouseout", (P) => {
      f && !P.relatedTarget && (f.lampOn = 0, K());
    }), re(b, document, "visibilitychange", () => {
      document.hidden || K();
    }), re(b, o, "dblclick", () => G()), m = We(), m && re(b, m, "change", () => {
      n = qe(e.motion);
    }), b.push(wt(o, {
      active: () => f && f.phase === "open" ? f : null,
      box: me,
      flip: () => G(),
      outside: () => w(),
      tap: (P) => {
        let C = Ae();
        return C && P.clientX > C.x0 && P.clientX < C.x1 && P.clientY > C.y0 && P.clientY < C.y1 ? (L(), !0) : !1;
      },
      redraw: () => K()
    }));
  }
  function U() {
    if (s) return t;
    s = !0, I();
    try {
      t = Ke(o, { onRestore: fe });
    } catch {
      t = null;
    }
    return t;
  }
  function z() {
    let h = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(24e5 / Math.max(1, innerWidth * innerHeight))), T = Math.round(innerWidth * h), P = Math.round(innerHeight * h);
    (o.width !== T || o.height !== P) && (o.width = T, o.height = P);
  }
  function ee(h) {
    let T = f.P, P = o.clientWidth, C = o.clientHeight, q = C / (2 * _e * Math.tan(Ce / 2)), N = f.from, B = N.left + N.width / 2, W = N.top + N.height / 2, ce = (B - P / 2) / q, we = -(W - C / 2) / q, Te = 0.9 * N.width / ((f.ext0 || T.extent) * q), Pe = T.cfg.type === "envelope", Je = Pe ? Math.min(0.5 * C / (T.T.body * q), 0.7 * P / (T.w * q)) : Math.min(0.86 * C / (T.h * q), 0.9 * P / (T.w * q)), Rt = T.letter, bn = Rt ? Math.min(0.86 * C / (Rt.h * q), 0.9 * P / (Rt.w * q)) : Je, Ue = n ? 1 : f.tf, Gt = pe(Y(Pe ? f.p * 2 : f.p)), yn = Math.hypot(ce, we), Xt = (1 - Ue) * (1 - Ue), Yt = 2 * (1 - Ue) * Ue, vn = f.arc || 0.24, Tn = Xt * ce + Yt * ce * 0.5, Pt = Xt * we + Yt * (we * 0.5 + vn * yn), ft = T.F, En = ft.shape === 0 && ft.squash > 0.5 ? 1 : ft.shape === 1 || ft.shape === 2 ? 0.8 : 0.45, Sn = n ? 0 : pe(Ue) * En, wn = [0.55, 1.15, 0.35], kn = [0, 0, -0.02], At = T.pose.map((ke, jt) => (ke + wn[jt] * Sn) * (1 - Gt) + kn[jt] * Gt), It = Te + (Je - Te) * Math.pow(Ue, 1.25), Vt = 0.9 * N.width / q, Ht = f.pre ?? 1, Ze = f.bounce ?? 1, ut = f.settle ?? 1;
    if (Ht < 1) {
      let ke = Math.sin(Math.PI * Ht);
      It *= 1 + 0.12 * ke, Pt += ke * 0.16 * Vt;
    }
    if (Ze < 1) {
      let ke = (1 - Ze) * (1 - Ze);
      Pt += Math.abs(Math.sin(2 * Math.PI * Ze)) * ke * 0.4 * Vt, At[2] += 0.18 * Math.sin(2 * Math.PI * Ze) * ke;
    }
    let Ct = ut < 1 ? Math.sin(Math.PI * 2.5 * ut) * (1 - ut) * (1 - ut) : 0, $t = [0.05 * Ct, 0.022 * Ct, 0];
    for (let ke = 0; ke < 3; ke++) At[ke] += $t[ke];
    return It *= 1 + 0.01 * Ct, { cx: Tn, cy: Pt, sc: It, scLetter: bn, rot: At, adjust: $t, lift: Math.sin(Math.PI * Ue), time: h / 1e3, ppu: q, vw: P, vh: C, vhU: C / q, L: je, lampPos: f.lampPos, lamp: f.lamp || 0, lampR: 0.3 * C / q };
  }
  function oe(h = performance.now()) {
    let T = ee(h);
    return { b: T, scene: $e(f.P, f, T) };
  }
  function me() {
    if (!f) return null;
    let { b: h, scene: T } = oe();
    return rt(T.active.P, T.active.st, h.ppu, h.vw, h.vh);
  }
  function Ae() {
    if (!f || f.P.stubX === null || f.P.torn || f.p < 0.95 || f.f > 0.01) return null;
    let { b: h, scene: T } = oe(), P = T.active.st, C = f.P, q = h.vw / 2 + P.cx * h.ppu, N = h.vh / 2 - P.cy * h.ppu;
    return { x0: q + C.stubX * P.sc * h.ppu, x1: q + C.half[0] * P.sc * h.ppu, y0: N - C.half[1] * P.sc * h.ppu, y1: N + C.half[1] * P.sc * h.ppu };
  }
  function ge(h) {
    if (S = 0, !f || document.hidden || t.isLost() || f.rebuilding) return;
    if (!f.tw.length && !f.dragging && !f.lampMoving && !f.resume && f.tPrev && h - f.tPrev < 32) {
      S = requestAnimationFrame(ge);
      return;
    }
    let T = f.resume ? 1 / 60 : Math.min(0.1, Math.max(0, (h - (f.tPrev || h)) / 1e3));
    f.resume = !1, f.tPrev = h;
    let P = Et(f, h);
    if (!f) return;
    let C = kt(f, T);
    f.lampMoving = C, f.P.burnPts && f.P.front0 > -0.5 && f.phase === "open" && f.destroy === void 0 && (f.burnOpen = Math.min(0.08, (f.burnOpen || 0) + T * 4e-3));
    let { b: q, scene: N } = oe(h);
    f.boxCache = rt(N.active.P, N.active.st, q.ppu, q.vw, q.vh), St(v, f, N, T), v.step(T), t.draw(N.items, N.shadow, v), f.pPrev = f.p;
    let B = N.active.st.front > -0.5 && !!N.active.P.burnPts;
    if (f.ashes && (v.n === 0 || h > f.ashesEnd)) {
      F();
      return;
    }
    (P || f.dragging || C || v.n > 0 || B || f.ashes) && (S = requestAnimationFrame(ge));
  }
  function K() {
    !S && f && (f.resume = !0, S = requestAnimationFrame(ge));
  }
  let Re = (h) => e.remember && !!he.get("opened." + h, !1);
  function Fe(h) {
    if (f || !h.P) return;
    let T = h.P;
    z();
    let P = he.get("opens." + T.cfg.id, 0) + 1;
    he.set("opens." + T.cfg.id, P), T.hasRedaction && requestAnimationFrame(() => t.refreshPrint(T).then(K));
    let C = h.opened ? nt(T) : 0;
    f = { P: T, ent: h, from: h.btn.getBoundingClientRect(), tf: 0, p: C, ext0: ot(T, C), f: 0, tear: 0, tw: [], phase: "opening", dragging: !1, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 }, v.clear(), h.btn.classList.add("active"), document.body.classList.add("crumple-open"), o.style.display = "block", o.style.pointerEvents = "auto", r.classList.add("on"), a.classList.add("on"), a.setAttribute("aria-label", Me[T.cfg.type].name), l.focus({ preventScroll: !0 }), p.hidden = T.stubX === null || T.torn, d.replaceChildren(), de(T.cfg.text, d), T.cfg.back && (d.append(`

\u2014 ` + e.labels.back + ` \u2014
`), de(T.cfg.back, d));
    let q = T.cfg.open === "drag", N = T.cfg.type === "envelope", B = () => {
      f && (f.phase = "open", q && f.p < 0.5 && u.classList.add("on"));
    };
    if (n)
      o.style.opacity = "0", requestAnimationFrame(() => {
        o.style.opacity = "1";
      }), f.tf = 1, f.phase = "open", q ? u.classList.add("on") : (ue(f, "p", 1, J * (N ? 1.6 : 1), ze), se.play("uncrumple", J, 0, { type: T.cfg.type, gsm: T.cfg.gsm }));
    else {
      f.pre = 0, f.arc = 0.24;
      let ce = A * 0.55, we = N ? D * 1.85 : D;
      if (ue(f, "pre", 1, A, be), ue(f, "tf", 1, _, Kt, ce, B), !q) {
        let Te = () => {
          f && f.phase !== "closing" && (f.settle = 0, ue(f, "settle", 1, 0.9, be), K());
        };
        ue(f, "p", 1, we, N ? Ge : pt(T), ce + M, Te), se.play(N ? "seal" : "uncrumple", we, ce + M, { type: T.cfg.type, gsm: T.cfg.gsm });
      }
    }
    T.front0 > -0.5 && se.play("fire", 2.5, 0.6), e.remember && he.set("opened." + T.cfg.id, !0), Be(h.btn, "open", { id: T.cfg.id, openings: P }), K();
    let { scene: W } = oe();
    t.draw(W.items, W.shadow, v);
  }
  function lt() {
    !f || !f.burnOpen || (f.P.burned = Math.min(0.2, f.P.burned + f.burnOpen), he.set("burned." + f.P.cfg.id, f.P.burned), f.burnOpen = 0);
  }
  function w() {
    if (!f || f.phase === "closing") return;
    if (f.P.cfg.burnAfterReading && f.p > 0.9 && f.phase === "open") {
      E();
      return;
    }
    lt(), f.phase = "closing", f.dragging = !1, f.lampOn = 0, f.from = f.ent.btn.getBoundingClientRect(), r.classList.remove("on"), a.classList.remove("on"), u.classList.remove("on"), o.style.pointerEvents = "none", f.tw = f.tw.filter((q) => q.key !== "settle"), f.settle = 1;
    let h = f.P.cfg.type === "envelope", T = Re(f.P.cfg.id) ? nt(f.P) : 0;
    f.tf > 0.999 && (f.ext0 = ot(f.P, T));
    let P = n ? 0.6 : h ? 1.9 : 0.85, C = P * Math.max(0.35, f.p - T);
    if (f.f > 0 && ue(f, "f", 0, 0.45, De), f.p > T + 0.02 && se.play("crumple", C, 0, { type: f.P.cfg.type, gsm: f.P.cfg.gsm }), ue(f, "p", T, C, h ? Ge : dt(f.P)), n) ue(f, "tf", 1, P, be, 0, F);
    else {
      f.tf > 0.999 && (f.arc = 0.34);
      let q = () => {
        f && (f.bounce = 0, ue(f, "bounce", 1, 0.36, be, 0, F));
      };
      ue(f, "tf", 0, 0.78, xt, C * (h ? 0.8 : 0.5), q);
    }
    Be(f.ent.btn, "close", { id: f.P.cfg.id }), K();
  }
  function E() {
    lt(), f.phase = "closing", f.dragging = !1, a.classList.remove("on"), u.classList.remove("on"), o.style.pointerEvents = "none", f.f > 0 && ue(f, "f", 0, 0.4, De);
    let h = f.P.letter || f.P;
    f.destroy = Math.max(h.front0 > -0.5 ? h.front0 + h.burned : -0.06, -0.06), se.play("fire", 2.8), ue(f, "destroy", 1.6, n ? 1.2 : 2.6, be, 0, () => {
      if (!f) return;
      f.ashes = !0, f.ashesEnd = performance.now() + 3e3, r.classList.remove("on");
      let T = f.ent;
      he.set("destroyed." + T.cfg.id, !0), T.destroyed = !0, Be(T.btn, "burn", { id: T.cfg.id });
    }), K();
  }
  function F() {
    if (!f) return;
    let h = f.ent, T = !!f.ashes;
    f = null, v.clear(), r.classList.remove("on"), document.body?.classList.remove("crumple-open");
    let P = () => {
      f || (o.style.display = "none", o.style.opacity = ""), T ? (h.btn.hidden = !0, h.btn.classList.remove("active")) : (!f || f.ent !== h) && h.btn.classList.remove("active");
    };
    n ? (o.style.opacity = "0", setTimeout(P, 300)) : P(), d.textContent = "", T || h.btn.focus({ preventScroll: !0 }), Q(h);
  }
  function G() {
    !f || f.phase === "closing" || f.destroy !== void 0 || (se.play("flip", 1, 0, { type: f.P.cfg.type, gsm: f.P.cfg.gsm }), Ye(10), ue(f, "f", f.f < 0.5 ? 1 : 0, 0.8, be), Be(f.ent.btn, "flip", { id: f.P.cfg.id, back: f.f < 0.5 }), K());
  }
  function L() {
    !f || f.P.stubX === null || f.P.torn || f.tear > 0 || f.p < 0.95 || f.f > 0.01 || (se.play("tear", 1, 0, { type: f.P.cfg.type, gsm: f.P.cfg.gsm }), Ye([15, 20, 15, 20, 30]), Be(f.ent.btn, "tear", { id: f.P.cfg.id }), p.hidden = !0, ue(f, "tear", 1, n ? 0.3 : 1, be, 0, () => {
      f && (f.P.torn = !0);
    }), K());
  }
  function O(h, T, P = {}) {
    let C = { btn: h, cfg: Ve(T), P: null, building: null, opts: P, opened: !1, off: [], io: null, gone: !1, madeImg: !1, madeLabel: !1 };
    return document.body ? $(C) : document.addEventListener("DOMContentLoaded", () => $(C), { once: !0 }), C;
  }
  function $(h) {
    let { btn: T, cfg: P, opts: C } = h;
    I();
    let q = k.get(T);
    q && x(q);
    let N = y.find((W) => W.cfg.id === P.id);
    N && (console.warn(`crumple: id "${P.id}" is already attached, the previous paper is detached`), x(N)), y.push(h), k.set(T, h), T.classList.add("crumple-trigger"), T.getAttribute("aria-label") || (T.setAttribute("aria-label", e.labels.open), h.madeLabel = !0), he.get("destroyed." + P.id, !1) && (T.hidden = !0, h.destroyed = !0), h.opened = Re(P.id), re(h.off, T, "click", async () => {
      await V(h) ? Fe(h) : H(h);
    });
    let B = T.querySelector("img");
    if (C.snapshot) {
      B || (B = document.createElement("img"), B.alt = "", T.appendChild(B), h.madeImg = !0), B.onerror = () => {
        h.opts = {}, B.onerror = null, j(h);
      }, B.src = h.opened && C.snapshotOpened ? C.snapshotOpened : C.snapshot;
      let W = () => {
        te(() => V(h));
      };
      ["pointerenter", "focus", "touchstart"].forEach((ce) => re(h.off, T, ce, W, { once: !0, passive: !0 })), re(h.off, T, "pointerdown", () => V(h), { passive: !0 });
    } else j(h);
  }
  function x(h) {
    h.gone = !0, h.off.splice(0).forEach((C) => C()), h.io && h.io.disconnect();
    let T = y.indexOf(h);
    T >= 0 && y.splice(T, 1);
    let P = X.indexOf(h);
    if (P >= 0 && X.splice(P, 1), f && f.ent === h && F(), h.P && (t.release(h.P), h.P = null), k.get(h.btn) === h && k.delete(h.btn), h.btn.classList.remove("crumple-trigger", "active", "recrumple"), h.madeLabel && h.btn.removeAttribute("aria-label"), h.madeImg) {
      let C = h.btn.querySelector("img");
      C && C.remove();
    }
  }
  function j(h) {
    if ("IntersectionObserver" in window) {
      let T = new IntersectionObserver((P) => P.forEach((C) => {
        C.isIntersecting && (T.disconnect(), te(() => V(h).then(() => Q(h))));
      }), { rootMargin: "600px 0px" });
      h.io = T, T.observe(h.btn);
    } else te(() => V(h).then(() => Q(h)));
  }
  let te = (h) => globalThis.requestIdleCallback ? requestIdleCallback(h, { timeout: 700 }) : setTimeout(h, 60), X = [], le = 0;
  function V(h) {
    if (h.P) {
      let T = X.indexOf(h);
      return T >= 0 && X.push(X.splice(T, 1)[0]), Promise.resolve(h.P);
    }
    return h.building ? h.building : h.building = Z(h);
  }
  async function Z(h) {
    let T = le;
    try {
      if (h.gone || !U() || t.isLost()) return null;
      let P = t, C = await P.build(h.cfg);
      if (T !== le) return null;
      if (h.gone)
        return P.release(C), null;
      for (h.P = C, X.push(h); X.length > e.maxBuilt; ) {
        let q = X.findIndex((B) => (!f || B !== f.ent) && B !== h);
        if (q < 0) break;
        let N = X.splice(q, 1)[0];
        !N.opts.snapshot && N.P && Q(N), N.P && P.release(N.P), N.P = null, N.building = null;
      }
      return h.P;
    } catch (P) {
      return console.warn("crumple: the paper could not be built, the CSS version is shown instead", P), null;
    } finally {
      T === le && (h.building = null);
    }
  }
  function fe() {
    le++;
    let h = X.splice(0);
    if (y.forEach((T) => {
      T.P = null, T.building = null;
    }), h.forEach((T) => V(T).then(() => Q(T))), f) {
      let T = f.ent;
      f.rebuilding = !0, V(T).then((P) => {
        !f || f.ent !== T || (P ? (f.P = P, f.rebuilding = !1, K()) : (f.ashes = !1, F()));
      });
    }
  }
  function Q(h) {
    if (h.destroyed || h.gone) return;
    h.opened = Re(h.cfg.id);
    let T = h.btn.querySelector("img");
    if (T || (T = document.createElement("img"), T.alt = "", h.btn.appendChild(T), h.madeImg = !0), h.opts.snapshot) {
      T.src = h.opened && h.opts.snapshotOpened ? h.opts.snapshotOpened : h.opts.snapshot;
      return;
    }
    h.P && t && (T.src = t.snapshot(h.P, h.opened));
  }
  function Ee() {
    let h = !1;
    y.forEach((T) => {
      he.remove("opened." + T.cfg.id), !(!T.opened || T.destroyed) && (h = !0, Q(T), T.btn.classList.remove("recrumple"), T.btn.offsetWidth, T.btn.classList.add("recrumple"));
    }), h && se.play("crumple", 0.9);
  }
  function de(h, T) {
    let P = !1;
    h.split(`
`).forEach((C, q) => {
      let N = C.startsWith("# ");
      q && !N && !P && T.append(`
`), P = N;
      let B = N ? C.slice(2) : C, W = N ? document.createElement("span") : T;
      N && (W.className = "crumple-h");
      let ce = /~~([^~\n]+)~~(?:\{([^}\n]+)\})?|\[\[([^\]\n]+)\]\]/g, we = 0, Te;
      for (; Te = ce.exec(B); ) {
        if (Te.index > we && W.append(B.slice(we, Te.index)), Te[3] !== void 0) {
          let Pe = document.createElement("span");
          Pe.className = "crumple-redact", Pe.setAttribute("role", "img"), Pe.setAttribute("aria-label", "redacted"), Pe.style.width = Math.max(3, Te[3].length * 0.5) + "em", W.append(Pe);
        } else {
          let Pe = document.createElement("del");
          if (Pe.textContent = Te[1], W.append(Pe), Te[2] !== void 0) {
            let Je = document.createElement("ins");
            Je.textContent = Te[2], W.append(Je);
          }
        }
        we = ce.lastIndex;
      }
      we < B.length && W.append(B.slice(we)), N && T.append(W);
    });
  }
  function H(h) {
    I();
    let T = Me[h.cfg.type], C = (h.cfg.color ? Oe(h.cfg.color) : null) || T.color, q = (W) => Math.round(C[W] * 255), N = document.createElement("div");
    if (N.className = "sheet", N.style.background = `rgb(${q(0)},${q(1)},${q(2)})`, N.style.fontFamily = `"${T.font}", "Courier Prime", monospace`, h.opts.snapshotOpened) {
      let W = document.createElement("img");
      W.src = h.opts.snapshotOpened, W.alt = "", N.appendChild(W);
    }
    de(h.cfg.text, N), h.cfg.back && (N.append(`

\u2014 ` + e.labels.back + ` \u2014
`), de(h.cfg.back, N));
    let B = document.createElement("button");
    B.type = "button", B.textContent = e.labels.close, B.addEventListener("click", ae), c.setAttribute("aria-label", T.name), c.replaceChildren(N, B), c.classList.add("on"), document.body?.classList.add("crumple-open"), B.focus(), c.onclick = (W) => {
      W.target === c && ae();
    }, c._ent = h, Be(h.btn, "open", { id: h.cfg.id, fallback: !0 });
  }
  function ae() {
    c.classList.remove("on"), document.body?.classList.remove("crumple-open"), c._ent && c._ent.btn.focus({ preventScroll: !0 });
  }
  function Se(h, T) {
    let P = [...T.querySelectorAll("button")].filter((B) => !B.hidden);
    if (!P.length) return;
    h.preventDefault();
    let C = P.indexOf(document.activeElement), q = P.length - 1, N = C < 0 ? 0 : h.shiftKey ? C === 0 ? q : C - 1 : C === q ? 0 : C + 1;
    P[N].focus({ preventScroll: !0 });
  }
  let xe = (h) => !!h && (h.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(h.tagName));
  function Ne() {
    o && (f = null, cancelAnimationFrame(S), S = 0, y.slice().forEach(x), X.length = 0, b.splice(0).forEach((h) => h()), t && t.destroy(), t = null, s = !1, g.remove(), document.body?.classList.remove("crumple-open"), [r, o, a, u, d, c].forEach((h) => h.remove()), r = o = a = u = d = c = null, v.clear());
  }
  return {
    // options: { labels, remember, motion: 'auto' | 'reduce' | 'full' ('reduced' still works), flashlight, maxBuilt }
    init(h = {}) {
      e = { ...e, ...h, labels: { ...cn, ...h.labels || {} } }, o && (i.textContent = e.labels.flip, p.textContent = e.labels.tear, l.textContent = e.labels.close, u.textContent = e.labels.hint), I(), n = qe(e.motion), te(() => {
        o && U();
      });
    },
    attach: O,
    // detaches a trigger element, or the paper with that id
    detach(h) {
      let T = typeof h == "string" ? y.find((P) => P.cfg.id === h) : k.get(h);
      T && x(T);
    },
    destroy: Ne,
    open: (h) => V(h).then((T) => T ? Fe(h) : H(h)),
    close: w,
    flip: G,
    tear: L,
    reset: Ee,
    get reducedMotion() {
      return n;
    },
    get entries() {
      return y;
    },
    get isOpen() {
      return !!f;
    },
    // debugging/testing: draws a fixed frame (flight, unfold, flip, tear, burn front) of an attached paper
    async frame(h, T, P, C = 0, q = 0, N) {
      let B = y[h];
      await V(B), N !== void 0 && await t.ensureBurn(B.P), cancelAnimationFrame(S), S = 0, z(), f = { P: B.P, ent: B, from: B.btn.getBoundingClientRect(), tf: T, p: P, f: C, tear: q, tw: [], phase: "open", burnOpen: 0 }, N !== void 0 && (f.destroy = N), o.style.display = "block", r.classList.add("on"), y.forEach((ce) => ce.btn.classList.toggle("active", ce === B));
      let { scene: W } = oe();
      t.draw(W.items, W.shadow, null);
    },
    // debugging/testing: lights the flashlight at screen (x, y) and draws
    flashlight(h, T) {
      if (f) {
        at(f, h, T, o.clientWidth, o.clientHeight, o.clientHeight / (2 * _e * Math.tan(Ce / 2)), !0), f.lampPos = f.lampGoal.slice(), f.lamp = 1;
        let { scene: P } = oe();
        t.draw(P.items, P.shadow, null);
      }
    },
    get debug() {
      return f ? { phase: f.phase, ashes: !!f.ashes, destroy: f.destroy, n: v.n, raf: S, tw: f.tw.map((h) => h.key), lampPos: f.lampPos, lamp: f.lamp } : null;
    }
  };
})();

// .build/stage.js
var mn = 1.5;
function gn(e, n = {}) {
  let t = { flashlight: !0, drag: !0, fit: 0.8, motion: "auto", ...n }, s, o = !1, r = qe(t.motion);
  try {
    s = Ke(e, { onRestore: _ });
  } catch {
    s = null;
  }
  if (!s) return null;
  let a = (I, U, z, ee, oe, me, Ae) => ue(I, U, z, r ? ee * 0.4 : ee, oe, me, Ae), i = null, p = 0, l = 0, u = null, d = "", c = null, g = [], m = Mt(), y = { p: 1, f: 0, tear: 0, tw: [], dragging: !1, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 };
  function k() {
    let I = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(4e6 / Math.max(1, e.clientWidth * e.clientHeight))), U = Math.round(e.clientWidth * I), z = Math.round(e.clientHeight * I);
    (e.width !== U || e.height !== z) && (e.width = U, e.height = z);
  }
  function b(I) {
    let U = e.clientWidth, z = e.clientHeight, ee = z / (2 * _e * Math.tan(Ce / 2)), oe = i.cfg.type === "envelope", me = oe ? Math.min(t.fit * 0.69 * z / (i.T.body * ee), 0.7 * U / (i.w * ee)) : Math.min(t.fit * z / (i.h * ee), (t.fit + 0.06) * U / (i.w * ee)), Ae = i.letter ? Math.min(t.fit * z / (i.letter.h * ee), (t.fit + 0.06) * U / (i.letter.w * ee)) : me, ge = pe(Y(oe ? y.p * 2 : y.p)), K = [0, 0, -0.02];
    return { cx: 0, cy: 0, sc: me, scLetter: Ae, rot: i.pose.map((Re, Fe) => Re * (1 - ge) + K[Fe] * ge), lift: 0, time: I / 1e3, ppu: ee, vw: U, vh: z, vhU: z / ee, L: je, lampPos: y.lampPos, lamp: y.lamp || 0, lampR: 0.3 * z / ee };
  }
  let v = (I = performance.now()) => {
    let U = b(I);
    return { b: U, scene: $e(i, y, U) };
  };
  function f(I) {
    if (p = 0, !i || document.hidden || o || s.isLost()) return;
    k();
    let U = y.resume ? 1 / 60 : Math.min(0.05, Math.max(0, (I - (y.tPrev || I)) / 1e3));
    y.resume = !1, y.tPrev = I;
    let z = Et(y, I), ee = kt(y, U), { scene: oe } = v(I);
    St(m, y, oe, U), m.step(U), s.draw(oe.items, oe.shadow, m), y.pPrev = y.p, (z || y.dragging || ee || m.n > 0 || oe.active.st.front > -0.5 && oe.active.P.burnPts) && (p = requestAnimationFrame(f));
  }
  let S = () => {
    !p && !o && (y.resume = !0, p = requestAnimationFrame(f));
  };
  function R() {
    if (!i) return null;
    let { b: I, scene: U } = v(), z = e.getBoundingClientRect();
    return rt(U.active.P, U.active.st, I.ppu, I.vw, I.vh, z.left, z.top);
  }
  t.drag && (d = e.style.touchAction, e.style.touchAction = "none", u = wt(e, { active: () => i ? y : null, box: R, outside: () => {
  }, redraw: S })), re(g, e, "dblclick", () => J.flip()), t.flashlight && (re(g, e, "pointermove", (I) => {
    if (!i || y.dragging || I.pointerType === "touch") return;
    let U = R(), z = e.getBoundingClientRect(), ee = !!U && I.clientX > U.x0 - 30 && I.clientX < U.x1 + 30 && I.clientY > U.y0 - 30 && I.clientY < U.y1 + 30;
    at(y, I.clientX - z.left, I.clientY - z.top, e.clientWidth, e.clientHeight, e.clientHeight / (2 * _e * Math.tan(Ce / 2)), ee), S();
  }), re(g, e, "pointerleave", () => {
    y.lampOn = 0, S();
  })), re(g, window, "resize", () => S()), re(g, document, "visibilitychange", () => {
    document.hidden || S();
  });
  let A = We();
  A && t.motion === "auto" && re(g, A, "change", () => {
    r = qe(t.motion);
  });
  function _() {
    let I = i && i.cfg, U = y.p;
    i = null, I && J.set(I, { progress: U }).catch((z) => console.warn("crumple: rebuild after context restore failed", z));
  }
  function M() {
    o || (o = !0, l++, cancelAnimationFrame(p), p = 0, g.splice(0).forEach((I) => I()), u && u(), t.drag && (e.style.touchAction = d), i && s.release(i), i = null, y.tw = [], m.clear(), s.destroy());
  }
  let D = () => i.cfg.type === "envelope", J = {
    // builds a paper from a config and shows it (resolves with the paper, or null if a newer call replaced it)
    async set(I, { progress: U } = {}) {
      if (o) return null;
      let z = ++l, ee = await s.build(I);
      return z !== l || o ? (s.release(ee), null) : (i && s.release(i), i = ee, y.tear = 0, y.f = 0, i.torn = !1, delete y.destroy, U !== void 0 && (y.tw = [], y.p = Y(U)), m.clear(), S(), i);
    },
    crumple() {
      i && (se.play("crumple", 0.9, 0, { type: i.cfg.type, gsm: i.cfg.gsm }), a(y, "p", 0, D() ? 1.9 : 0.9, D() ? Ge : dt(i)), S());
    },
    uncrumple() {
      i && (se.play(D() ? "seal" : "uncrumple", 1.5, 0, { type: i.cfg.type, gsm: i.cfg.gsm }), a(y, "p", 1, D() ? mn * 1.85 : mn, D() ? Ge : pt(i)), S());
    },
    toggle() {
      y.p > 0.5 ? J.crumple() : J.uncrumple();
    },
    // any time, except once the paper burns away; the side it shows is kept through crumple and unfold
    flip() {
      !i || y.destroy !== void 0 || (se.play("flip", 1, 0, { type: i.cfg.type, gsm: i.cfg.gsm }), a(y, "f", y.f < 0.5 ? 1 : 0, 0.8, be), S());
    },
    tear() {
      !i || i.stubX === null || y.tear > 0 || y.p < 0.95 || (se.play("tear", 1, 0, { type: i.cfg.type, gsm: i.cfg.gsm }), a(y, "tear", 1, 1, be, 0, () => {
        i.torn = !0;
      }), S());
    },
    restoreStub() {
      i && (y.tear = 0, i.torn = !1, S());
    },
    // resolves once the paper has its burn field (built on demand for any paper); a second call meanwhile does nothing,
    // and a paper replaced by set() meanwhile is not burnt
    async burn() {
      let I = i;
      if (!I || y.destroy !== void 0 || c === I) return;
      c = I;
      try {
        await s.ensureBurn(I);
      } finally {
        c === I && (c = null);
      }
      if (i !== I || y.destroy !== void 0) return;
      let U = I.letter || I;
      se.play("fire", 2.6, 0, { type: i.cfg.type, gsm: i.cfg.gsm }), y.destroy = Math.max(U.front0 > -0.5 ? U.front0 + U.burned : -0.06, -0.06), a(y, "destroy", 1.6, 2.6, be), S();
    },
    restore() {
      delete y.destroy, m.clear(), i && se.play("uncrumple", 0.8, 0, { type: i.cfg.type, gsm: i.cfg.gsm }), S();
    },
    setProgress(I) {
      y.tw = [], y.p = Y(I), S();
    },
    // PNG of the current frame (draws and reads at once, no preserved buffer needed)
    png() {
      if (!i) return "";
      k();
      let { scene: I } = v();
      return s.draw(I.items, I.shadow, null), e.toDataURL("image/png");
    },
    snapshot(I, U, z) {
      return i ? s.snapshot(i, I, U, z) : "";
    },
    get state() {
      return y;
    },
    get paper() {
      return i;
    },
    destroy: M
  };
  return J;
}

// .build/element.js
var st = class extends (typeof HTMLElement < "u" ? HTMLElement : class {
}) {
  connectedCallback() {
    let n = this.querySelector("button");
    n || (n = document.createElement("button"), n.type = "button", this.appendChild(n), this._madeBtn = !0), this.btn = n;
    let t = this.getAttribute("states"), s = t ? t.split(",").map((l) => l.trim()).filter(Boolean) : void 0, o = {
      id: this.getAttribute("id") || void 0,
      type: this.getAttribute("type") || void 0,
      shape: this.getAttribute("shape") || void 0,
      states: s,
      text: this.getAttribute("text") || (this._madeBtn ? "" : n.textContent || ""),
      back: this.getAttribute("back") || void 0,
      open: this.getAttribute("open") || void 0,
      seed: this.hasAttribute("seed") ? Number(this.getAttribute("seed")) : void 0
    }, r = this.getAttribute("snapshot") || void 0, a = this.getAttribute("snapshot-opened") || void 0, i = r || a ? { snapshot: r, snapshotOpened: a } : void 0, p = () => {
      this.entry || (this._io && (this._io.disconnect(), this._io = null), this.entry = it.attach(n, o, i));
    };
    n.addEventListener("click", p, { once: !0, capture: !0 }), typeof IntersectionObserver < "u" ? (this._io = new IntersectionObserver((l) => {
      for (let u of l)
        if (u.isIntersecting) {
          p();
          break;
        }
    }, { rootMargin: "200px" }), this._io.observe(this)) : p();
  }
  disconnectedCallback() {
    this._io && (this._io.disconnect(), this._io = null), this.btn && it.detach(this.btn), this._madeBtn && this.btn.parentNode && this.btn.remove(), this.entry = null;
  }
};
typeof customElements < "u" && !customElements.get("crumple-paper") && customElements.define("crumple-paper", st);

// .build/index.js
var go = "1.2.0";
//# sourceMappingURL=crumple.cjs.map
