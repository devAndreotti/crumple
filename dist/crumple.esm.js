// .build/util.js
function W(e) {
  let n = Math.imul(e | 0, 2654435761) >>> 0 || 1;
  return () => (n ^= n << 13, n >>>= 0, n ^= n >>> 17, n ^= n << 5, n >>>= 0, n / 4294967296);
}
function Fe(e) {
  let n = (s, o) => {
    let r = Math.imul(s, 374761393) + Math.imul(o, 668265263) + Math.imul(e, 1442695041) | 0;
    return r = Math.imul(r ^ r >>> 13, 1274126177), ((r ^ r >>> 16) >>> 0) / 4294967296;
  }, t = (s, o) => {
    let r = Math.floor(s), a = Math.floor(o), f = s - r, u = o - a, i = f * f * (3 - 2 * f), p = u * u * (3 - 2 * u), d = n(r, a), m = n(r + 1, a), h = n(r, a + 1), g = n(r + 1, a + 1);
    return d + (m - d) * i + (h - d) * p + (d - m - h + g) * i * p;
  };
  return (s, o) => (t(s, o) * 0.5 + t(s * 2, o * 2) * 0.25 + t(s * 4, o * 4) * 0.125 + t(s * 8, o * 8) * 0.0625) / 0.9375;
}
var $ = (e, n = 0, t = 1) => Math.min(t, Math.max(n, e)), pe = (e) => e * e * (3 - 2 * e), xe = (e, n, t) => e + (n - e) * t, De = (e) => e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2, ze = (e) => 1 - (1 - e) * (1 - e), Lt = (e) => 0.5 * pe(e) + 0.5 * ze(e), ge = (e) => e, Ht = (e) => 0.35 * pe(e) + 0.65 * (1 - Math.pow(1 - e, 3)), Vt = (e) => e * e * (1.6 - 0.6 * e), Ge = (e) => 0.55 * e + 0.45 * pe(e), lt = (e) => e.F.shape === 0 ? (n) => 1 - Math.pow(1 - n, 2.3) : Lt, st = (e) => e.F.shape === 0 ? (n) => 1 - Math.pow(1 - n, 2.2) : De, Le = {
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
}, ye = (e, n, t) => {
  let s = document.createElement("canvas");
  return s.width = e, s.height = n, t && s.getContext("2d", { willReadFrequently: !0 }), s;
}, ae = (e, n) => `rgba(${e[0]},${e[1]},${e[2]},${n})`;
function Ue(e, n, t) {
  try {
    (e || document).dispatchEvent(new CustomEvent("crumple:" + n, { bubbles: !0, detail: t }));
  } catch {
  }
}
function Je() {
  try {
    return matchMedia("(prefers-reduced-motion: reduce)");
  } catch {
    return null;
  }
}
function Be(e) {
  if (e === "full") return !1;
  if (e === "reduce" || e === "reduced") return !0;
  let n = Je();
  return !!n && n.matches;
}
function ne(e, n, t, s, o) {
  n.addEventListener(t, s, o), e.push(() => n.removeEventListener(t, s, o));
}
var yn = { "Special Elite": "Special+Elite", "Courier Prime": "Courier+Prime:wght@400;700", Caveat: "Caveat:wght@500", VT323: "VT323", "Libre Baskerville": "Libre+Baskerville:ital,wght@0,400;0,700;1,400" }, Ct = {};
function $t(e) {
  return document.fonts ? Promise.all(e.map((n) => {
    if (!Ct[n]) {
      let t = yn[n], s = t ? "family=" + t.split(":")[0] : null, r = !t || !Le.googleFonts || [...document.querySelectorAll("link[rel=stylesheet]")].some((a) => a.href.includes(s)) ? Promise.resolve() : new Promise((a) => {
        let f = document.createElement("link");
        f.rel = "stylesheet", f.href = "https://fonts.googleapis.com/css2?family=" + t + "&display=swap", f.onload = a, f.onerror = a, setTimeout(a, 4e3), document.head.appendChild(f);
      });
      Ct[n] = r.then(() => Promise.all(["", "bold ", "italic "].map((a) => document.fonts.load(`${a}40px "${n}"`).catch(() => null))));
    }
    return Ct[n];
  })) : Promise.resolve();
}
var It = {};
function ft(e) {
  return It[e] || (It[e] = new Promise((n) => {
    let t = new Image();
    t.crossOrigin = "anonymous", t.onload = () => t.decode ? t.decode().then(() => n(t), () => n(t)) : n(t), t.onerror = () => n(null), t.src = e;
  })), It[e];
}
var Xe = (e) => ft(Le.assets + "textures/" + e + ".webp");
function Ye(e) {
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
}, jt = { ball: "Crumpled ball", flat: "Flattened crumple", quarters: "Folded in quarters", half: "Folded in half", thirds: "Folded in thirds (letter)", roll: "Rolled up", twist: "Twisted (candy wrapper)", accordion: "Accordion fold", triangle: "Triangle fold" }, pt = { torn: "Torn", burnt: "Burnt", coffee: "Coffee stain", water: "Water stain", prints: "Dirty fingerprints", aged: "Aged", scribbled: "Scribbled", singed: "Singed", wine: "Wine stain", ink: "Ink blot", foxing: "Foxing", tape: "Tape", stamp: "Rubber stamp", faded: "Sun-faded", staple: "Metal staple", grease: "Grease stain", dogear: "Dog-eared corner", damp: "Damp wrinkled relief", creased: "Pocket-creased grid", clip: "Metal paper clip" }, vn = ["corner", "edge", "center", "spots"], Kt = {
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
}, Tn = `A. Reader
12 Paper Lane
Foldtown`, Ft = ["never", "again", "always", "not yet", "once more", "still"], dt = {};
function Sn(e, n) {
  if (Pe[e]) throw new Error(`Paper type "${e}" already exists`);
  Pe[e] = n;
}
function En(e, n) {
  if (pt[e]) throw new Error(`Wear state "${e}" already exists`);
  pt[e] = n.name, n.apply && (dt[e] = n.apply);
}
var ut = (e, n) => Object.prototype.hasOwnProperty.call(e, n);
function Ze(e = {}) {
  let n = ut(Pe, e.type) ? e.type : "typed", t = Pe[n], s = {
    id: e.id || n,
    type: n,
    shape: n === "envelope" ? "envelope" : ut(jt, e.shape) ? e.shape : t.shape,
    states: (Array.isArray(e.states) ? e.states : []).filter((o) => ut(pt, o)),
    text: typeof e.text == "string" ? e.text : Kt[n] || "",
    back: typeof e.back == "string" ? e.back : "",
    seed: Number.isFinite(e.seed) ? Math.trunc(e.seed) : 7,
    // 0 is a valid seed (rng starts from 1 either way)
    open: e.open === "drag" ? "drag" : "auto",
    hiddenInk: typeof e.hiddenInk == "string" ? e.hiddenInk : "",
    burnAfterReading: !!e.burnAfterReading,
    burn: vn.includes(e.burn) ? e.burn : "corner",
    image: e.image || "",
    address: typeof e.address == "string" ? e.address : Tn,
    letter: ut(Pe, e.letter) && e.letter !== "envelope" ? e.letter : "typed",
    // the word of the 'stamp' state (drawn in capitals)
    stamp: typeof e.stamp == "string" && e.stamp.trim() ? e.stamp.trim() : "RECEIVED"
  };
  return Number.isFinite(e.gsm) && (s.gsm = e.gsm), Number.isFinite(e.weight) && (s.weight = e.weight), Number.isFinite(e.thickness) && (s.thickness = e.thickness), Number.isFinite(e.thru) && (s.thru = e.thru), e.rich && typeof e.rich == "object" && (s.rich = e.rich), s;
}

// .build/fields.js
function ht(e, n, t) {
  let s = W(e.seed), o = () => s() < 0.5 ? -1 : 1, r = e.w / 2, a = e.h / 2, f = new Float32Array(n * t), u = n / e.w, i = t / e.h, p = (v, w, l, k, C, N) => {
    N === void 0 && (N = s() * Math.PI), k === void 0 && (k = (s() * 2 - 1) * r, C = (s() * 2 - 1) * a);
    let I = Math.cos(N), B = Math.sin(N), te = Math.abs(I) * v + w, ee = Math.abs(B) * v + w, P = Math.max(0, Math.floor((k - te + r) * u)), D = Math.min(n - 1, Math.ceil((k + te + r) * u)), X = Math.max(0, Math.floor((C - ee + a) * i)), Z = Math.min(t - 1, Math.ceil((C + ee + a) * i)), oe = Math.min(0.08, v);
    for (let me = X; me <= Z; me++) {
      let Ae = (me + 0.5) / i - a - C;
      for (let be = P; be <= D; be++) {
        let j = (be + 0.5) / u - r - k, Re = Math.abs(-j * B + Ae * I);
        if (Re >= w) continue;
        let Ie = Math.abs(j * I + Ae * B);
        Ie >= v || (f[me * n + be] += l * (1 - Re / w) * Math.min(1, (v - Ie) / oe));
      }
    }
  }, d = e.shape === "quarters" || e.shape === "half" || e.shape === "thirds" || e.shape === "accordion" || e.shape === "triangle", m = d ? 0.18 : e.shape === "roll" ? 0.45 : e.shape === "twist" ? 0.55 : 1, h = d ? 0.35 : e.shape === "roll" || e.shape === "twist" ? 0.6 : 1;
  e.card && (m *= 0.5, h *= 0.5), e.shape === "envelope" && (m = 0.08, h = 0.25);
  let g = e.w * e.h / (0.84 * 1.1);
  for (let v = 0; v < Math.round(8 * m * g); v++) p(2, 0.08 + s() * 0.1, o() * (0.8 + s() * 0.4) * h);
  for (let v = 0; v < Math.round(46 * m * g); v++) p(0.1 + s() * 0.28, 0.035 + s() * 0.05, o() * (0.45 + s() * 0.4) * h);
  for (let v = 0; v < Math.round(150 * m * g); v++) p(0.03 + s() * 0.1, 0.01 + s() * 0.025, o() * (0.2 + s() * 0.35) * h);
  if (e.shape === "twist")
    for (let v of [-1, 1]) for (let w = 0; w < 26; w++) p(0.12 + s() * 0.3, 0.012 + s() * 0.02, o() * (0.5 + s() * 0.5), v * r * (0.6 + s() * 0.36), (s() * 2 - 1) * a, Math.PI / 2 + v * (0.5 + s() * 0.35));
  if ((e.shape === "half" || e.shape === "quarters") && p(2, 0.022, 0.6, 0, 0, Math.PI / 2), e.shape === "quarters" && p(2, 0.022, -0.55, 0, 0, 0), e.shape === "thirds" && (p(2, 0.02, 0.55, 0, -e.h / 6 * 1.08, 0), p(2, 0.02, -0.55, 0, e.h / 6, 0)), e.shape === "accordion") {
    let v = e.w / 6;
    p(2, 0.02, 0.55, -v, 0, Math.PI / 2), p(2, 0.02, -0.55, 0, 0, Math.PI / 2), p(2, 0.02, 0.55, v, 0, Math.PI / 2);
  }
  e.shape === "triangle" && (p(2, 0.022, 0.6, 0, 0, Math.PI / 4), p(2, 0.022, -0.55, 0, 0, -Math.PI / 4)), e.shape === "envelope" && p(2, 0.02, 0.5, 0, e.foldY, 0);
  let b = Array.isArray(e.states) ? e.states : [];
  if (b.includes("creased"))
    for (let v = 0; v < 90; v++) p(0.04 + s() * 0.12, 8e-3 + s() * 0.015, o() * (0.3 + s() * 0.35));
  if (b.includes("damp")) {
    let v = Fe(e.seed * 3 + 17);
    for (let w = 0; w < t; w++) {
      let l = (w + 0.5) / i - a;
      for (let k = 0; k < n; k++) {
        let C = (k + 0.5) / u - r;
        f[w * n + k] += Math.sin((C * 2.2 + l) * 18) * 0.18 + (v(C * 8, l * 8) - 0.5) * 0.22;
      }
    }
  }
  let y = 1e-6;
  for (let v = 0; v < f.length; v++) Math.abs(f[v]) > y && (y = Math.abs(f[v]));
  for (let v = 0; v < f.length; v++) f[v] /= y;
  return f;
}
function ct(e, n, t) {
  let s = Fe(e.seed * 7 + 11), o = W(e.seed * 5 + 3), r = Math.hypot(n, t), a = new Float32Array(n * t), f = (i) => {
    for (let p = 0; p < t; p++) for (let d = 0; d < n; d++) a[p * n + d] = i(d, p);
  }, u = e.form || "corner";
  if (u === "edge") {
    let i = Math.floor(o() * 3);
    f((p, d) => (i === 0 ? t - d : i === 1 ? p : n - p) / (r * 1.6) + (s(p * 0.05, d * 0.05) - 0.5) * 0.35);
  } else if (u === "center") {
    let i = n * (0.3 + 0.4 * o()), p = t * (0.3 + 0.4 * o());
    f((d, m) => Math.hypot(d - i, m - p) / (r * 0.7) + (s(d * 0.04, m * 0.04) - 0.5) * 0.3);
  } else if (u === "spots") {
    let i = 3 + Math.floor(o() * 4), p = [];
    for (let d = 0; d < 200 && p.length < i; d++) {
      let m = n * (0.12 + 0.76 * o()), h = t * (0.12 + 0.76 * o());
      p.every((g) => Math.hypot(g[0] - m, g[1] - h) > r * 0.2) && p.push([m, h]);
    }
    f((d, m) => {
      let h = 1 / 0;
      return p.forEach((g) => {
        h = Math.min(h, Math.hypot(d - g[0], m - g[1]));
      }), h / (r * 0.5) + (s(d * 0.05, m * 0.05) - 0.5) * 0.1;
    });
  } else if (u === "singed")
    f((i, p) => Math.min(i, n - 1 - i, p, t - 1 - p) / (r * 0.5) + (s(i * 0.03, p * 0.03) - 0.5) * 0.12);
  else {
    let i = e.seed % 4, p = i & 1 ? n : 0, d = i & 2 ? t : 0;
    f((m, h) => Math.sqrt((m - p) * (m - p) + (h - d) * (h - d)) / r + (s(m * 0.02, h * 0.02) - 0.5) * 0.32);
  }
  return a;
}

// .build/worker.js
var mt = /* @__PURE__ */ (() => {
  let e, n = 0, t = /* @__PURE__ */ new Map();
  function s() {
    try {
      let r = [W, Fe, ht, ct].map((a) => a.toString()).join(`
`) + `
onmessage = (e) => { const { id, name, args } = e.data; const r = name === 'creases' ? ${ht.name}(...args) : ${ct.name}(...args); postMessage({ id, r }, [r.buffer]); };`;
      e = new Worker(URL.createObjectURL(new Blob([r], { type: "text/javascript" }))), e.onmessage = (a) => {
        let f = t.get(a.data.id);
        t.delete(a.data.id), f && (clearTimeout(f.t), f(a.data.r));
      }, e.onerror = () => {
        let a = [...t.values()];
        t.clear(), e = null, a.forEach((f) => {
          clearTimeout(f.t), f.redo();
        });
      };
    } catch {
      e = null;
    }
  }
  let o = (r, a) => r === "creases" ? ht(...a) : ct(...a);
  return {
    run(r, a) {
      if (e === void 0 && s(), !e) return Promise.resolve(o(r, a));
      let f = ++n, u = new Promise((p) => {
        let d = (m) => p(m);
        d.redo = () => p(o(r, a)), t.set(f, d);
      });
      e.postMessage({ id: f, name: r, args: a });
      let i = t.get(f);
      return i.t = setTimeout(() => {
        t.delete(f) && i.redo();
      }, 2e4), u;
    }
  };
})();

// .build/print.js
var bt = 1070;
function wn(e) {
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
var kn = (e, n, t) => `${n && !e.hand ? "bold " : ""}${Math.round(t)}px "${e.font}", "Courier Prime", monospace`, Rn = (e) => [e[0] + (200 - e[0]) * 0.4 + 8, e[1] + (170 - e[1]) * 0.3 + 4, e[2] + (120 - e[2]) * 0.3 - 4].map(Math.round);
function Mn(e, n, t, s, o, r, a) {
  let f = wn(s), u = n.states.includes("faded") ? Rn(t.ink) : t.ink;
  if (n.states.includes("scribbled") && !f.some((y) => y.toks.some((v) => v.kind === "strike"))) {
    let y = [];
    f.forEach((v) => v.toks.forEach((w) => {
      w.kind === "w" && w.t.replace(/\W/g, "").length >= 4 && y.push(w);
    }));
    for (let v = 0; v < 2 && y.length; v++) {
      let w = y.splice(Math.floor(a() * y.length), 1)[0];
      w.kind = "strike", w.fix = Ft[Math.floor(a() * Ft.length)];
    }
  }
  let i = $(1 - r * 0.34), p = o.cols || 1, d = (o.w - (p - 1) * 40) / p, m = 0, h = o.y, g = o.y + o.h, b = Fe(n.seed + 5);
  return f.forEach((y) => {
    let v = y.head ? t.size * (o.headK || 1.35) : t.size, w = y.head ? t.lineHeight * (o.headK || 1.35) : t.lineHeight;
    e.font = kn(t, y.head, v);
    let l = e.measureText(" ").width, k = y.head && o.headFull ? o.w : d, C = [[]], N = 0;
    if (y.toks.forEach((I) => {
      let B = e.measureText(I.t).width;
      N > 0 && N + l + B > k && (C.push([]), N = 0), C[C.length - 1].push({ ...I, tw: B }), N += (N > 0 ? l : 0) + B;
    }), !y.toks.length) {
      h += w * 0.7;
      return;
    }
    C.forEach((I) => {
      h > g && m < p - 1 && !(y.head && o.headFull) && (m++, h = o.colY || o.y);
      let B = I.reduce((P, D) => P + D.tw, 0) + l * (I.length - 1), te = o.x + (y.head && o.headFull ? 0 : m * (d + 40)), ee = o.center || y.head && o.centerHead ? te + (k - B) / 2 : te;
      I.forEach((P) => {
        Pn(e, t, P, ee, h, u, a, b), P.kind === "strike" && An(e, P, ee, h, v, a), P.kind === "redact" && (e.fillStyle = `rgba(12,12,14,${i})`, e.fillRect(ee - 5, h - v * 0.82, P.tw + 10, v * 1.06)), ee += P.tw + l;
      }), h += w;
    }), y.head && o.headFull && (o.colY = h + 10);
  }), h;
}
function Pn(e, n, t, s, o, r, a, f) {
  if (n.hand) {
    e.save(), e.translate(s, o + (a() - 0.5) * 3), e.rotate((a() - 0.5) * 0.04), e.fillStyle = ae(r, 0.9), e.fillText(t.t, 0, 0), e.restore();
    return;
  }
  if (n.carbon) {
    let u = s;
    for (let i of t.t) {
      let p = (a() - 0.5) * 1.5, d = (a() - 0.5) * 1.8;
      e.fillStyle = "rgba(100, 115, 240, 0.28)", e.fillText(i, u + p - 1, o + d), e.fillText(i, u + p + 1, o + d), e.fillText(i, u + p, o + d + 1), e.fillStyle = ae(r, 0.82 + a() * 0.18), e.fillText(i, u + p, o + d), u += e.measureText(i).width;
    }
    return;
  }
  if (n.typewriter) {
    let u = s;
    for (let i of t.t) {
      let p = 0.72 + a() * 0.28;
      n.fades && (p *= 0.35 + 0.65 * f(u * 6e-3, o * 4e-3)), e.fillStyle = ae(r, p), e.fillText(i, u, o + (a() - 0.5) * 2), u += e.measureText(i).width;
    }
    return;
  }
  e.fillStyle = ae(r, 0.92), e.fillText(t.t, s, o);
}
function An(e, n, t, s, o, r) {
  e.save(), e.strokeStyle = "rgba(165,28,30,0.85)", e.lineWidth = Math.max(2.5, o * 0.08), e.lineCap = "round";
  for (let a = 0; a < 2; a++) {
    e.beginPath();
    let f = s - o * (0.3 + 0.08 * a);
    e.moveTo(t - 4, f + (r() - 0.5) * 4), e.quadraticCurveTo(t + n.tw / 2, f + (r() - 0.5) * 8, t + n.tw + 4, f + (r() - 0.5) * 4), e.stroke();
  }
  n.fix && (e.fillStyle = "rgba(165,28,30,0.9)", e.font = `${Math.round(o * 0.62)}px "Caveat", cursive`, e.translate(t + n.tw * 0.25, s - o * 0.66), e.rotate(-0.06), e.fillText(n.fix, 0, 0)), e.restore();
}
function Jt(e, n, t, s, o, r, a = 6) {
  let f = Math.ceil(o / a), u = Math.ceil(r / a), i = ye(f, u, !0), p = i.getContext("2d"), d = Math.max(f / n.width, u / n.height);
  p.drawImage(n, (f - n.width * d) / 2, (u - n.height * d) / 2, n.width * d, n.height * d);
  let m = p.getImageData(0, 0, f, u).data;
  e.fillStyle = "rgba(20,20,20,0.88)";
  for (let h = 0; h < u; h++) for (let g = 0; g < f; g++) {
    let b = (h * f + g) * 4, y = (m[b] * 0.3 + m[b + 1] * 0.59 + m[b + 2] * 0.11) / 255, v = a * 0.56 * Math.sqrt(1 - y);
    v > 0.35 && (e.beginPath(), e.arc(t + (g + 0.5) * a, s + (h + 0.5) * a, v, 0, Math.PI * 2), e.fill());
  }
}
function _n(e, n, t) {
  let s = [], o = "";
  return n.split(" ").forEach((r) => {
    let a = o ? o + " " + r : r;
    e.measureText(a).width > t && o ? (s.push(o), o = r) : o = a;
  }), o && s.push(o), s;
}
function Zt(e) {
  let n = String(e || "").toUpperCase();
  return n >= "0" && n <= "9" ? [n.charCodeAt(0) - 48 + 2] : n >= "A" && n <= "I" ? [0, n.charCodeAt(0) - 65 + 3] : n >= "J" && n <= "R" ? [1, n.charCodeAt(0) - 74 + 3] : n >= "S" && n <= "Z" ? [2, n.charCodeAt(0) - 83 + 4] : n === "-" ? [1] : n === "&" || n === "+" ? [0] : n === "/" ? [2, 3] : n === "." ? [0, 5, 10] : n === "," ? [2, 5, 10] : n === "=" ? [5, 10] : n === "$" ? [1, 5, 10] : n === "*" ? [1, 6, 10] : [];
}
var gt = {
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
  newspaper(e, n, t, s, o, r) {
    e.fillStyle = "rgba(25,25,25,0.9)", e.font = 'bold 50px "Libre Baskerville"', e.textAlign = "center", e.fillText("THE FOLDTOWN HERALD", n / 2, 92), e.font = 'italic 20px "Libre Baskerville"', e.fillText("evening edition \xB7 friday", n / 2, 126), e.textAlign = "left", e.fillRect(40, 140, n - 80, 3), e.fillRect(40, 147, n - 80, 1), e.fillRect(n / 2 - 1, 330, 1, t - 380);
    let a = n / 2 + 20, f = 336, u = n / 2 - 60, i = 230;
    if (e.fillStyle = "rgba(40,40,40,0.12)", e.fillRect(a, f, u, i), r.photo) Jt(e, r.photo, a, f, u, i);
    else
      for (let p = f + 4; p < f + i; p += 7) for (let d = a + 4; d < a + u; d += 7) {
        let m = 0.5 + 0.5 * Math.sin(d * 0.02) * Math.cos(p * 0.025);
        e.fillStyle = `rgba(20,20,20,${0.55 * m})`, e.beginPath(), e.arc(d, p, 1.2 + 2 * m, 0, Math.PI * 2), e.fill();
      }
    e.fillStyle = "rgba(25,25,25,0.85)", e.font = 'italic 17px "Libre Baskerville"', e.fillText("The harbor at dusk, yesterday.", a, f + i + 24);
  },
  sticky(e, n) {
    let t = e.createLinearGradient(0, 0, 0, 70);
    t.addColorStop(0, "rgba(170,130,20,0.18)"), t.addColorStop(1, "rgba(170,130,20,0)"), e.fillStyle = t, e.fillRect(0, 0, n, 70);
  },
  polaroid(e, n, t, s, o, r) {
    let a = Math.round(n * 0.065), f = n - 2 * a;
    if (e.fillStyle = "#1a1714", e.fillRect(a, a, f, f), r.img) {
      let u = r.img.width, i = r.img.height, p = Math.max(f / u, f / i);
      e.save(), e.beginPath(), e.rect(a, a, f, f), e.clip(), e.filter = "saturate(0.8) contrast(0.92) brightness(1.05)", e.drawImage(r.img, a + (f - u * p) / 2, a + (f - i * p) / 2, u * p, i * p), e.filter = "none", e.fillStyle = "rgba(255,200,140,0.10)", e.fillRect(a, a, f, f);
      let d = e.createRadialGradient(a + f / 2, a + f / 2, f * 0.25, a + f / 2, a + f / 2, f * 0.75);
      d.addColorStop(0, "rgba(0,0,0,0)"), d.addColorStop(1, "rgba(0,0,0,0.45)"), e.fillStyle = d, e.fillRect(a, a, f, f), e.restore();
    }
    e.strokeStyle = "rgba(0,0,0,0.25)", e.lineWidth = 2, e.strokeRect(a, a, f, f);
  },
  envelope(e, n, t, s) {
    let o = Math.round(s.flap / s.h * t), r = o + (t - o) * 0.48;
    e.strokeStyle = "rgba(110,85,50,0.35)", e.lineWidth = 2.2, e.beginPath(), e.moveTo(0, t), e.lineTo(n / 2, r), e.lineTo(n, t), e.stroke(), e.beginPath(), e.moveTo(0, o), e.lineTo(n * 0.42, r - 8), e.moveTo(n, o), e.lineTo(n * 0.58, r - 8), e.stroke(), e.save(), e.beginPath(), e.moveTo(0, o), e.lineTo(n / 2, 6), e.lineTo(n, o), e.closePath(), e.clip(), e.strokeStyle = "rgba(70,85,120,0.22)", e.lineWidth = 3;
    for (let a = -t; a < n + t; a += 14)
      e.beginPath(), e.moveTo(a, 0), e.lineTo(a + o, o), e.stroke();
    e.restore();
  },
  blueprint(e, n, t) {
    let s = e.createRadialGradient(n / 2, t / 2, n * 0.15, n / 2, t / 2, n * 0.72);
    s.addColorStop(0, "rgba(16, 52, 92, 0.45)"), s.addColorStop(1, "rgba(6, 18, 34, 0.85)"), e.fillStyle = s, e.fillRect(0, 0, n, t), e.strokeStyle = "rgba(65, 175, 255, 0.13)", e.lineWidth = 1;
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
    e.strokeStyle = "rgba(170, 235, 255, 0.75)", e.lineWidth = 3, e.strokeRect(o, o, n - 2 * o, t - 2 * o), e.lineWidth = 1.2, e.strokeRect(o + 6, o + 6, n - 2 * o - 12, t - 2 * o - 12), e.fillStyle = "rgba(180, 235, 255, 0.75)", e.font = 'bold 12px "Courier Prime", monospace', e.textAlign = "center", e.textBaseline = "middle", ["A", "B", "C", "D", "E", "F"].forEach((h, g) => {
      let b = o + (g + 0.5) * ((n - 2 * o) / 6);
      e.fillText(h, b, o - 12), e.fillText(h, b, t - o + 12);
    }), ["1", "2", "3", "4"].forEach((h, g) => {
      let b = o + (g + 0.5) * ((t - 2 * o) / 4);
      e.fillText(h, o - 12, b), e.fillText(h, n - o + 12, b);
    }), [[o, o], [n - o, o], [o, t - o], [n - o, t - o]].forEach(([h, g]) => {
      e.beginPath(), e.moveTo(h - 10, g), e.lineTo(h + 10, g), e.moveTo(h, g - 10), e.lineTo(h, g + 10), e.stroke();
    });
    let r = n * 0.72, a = t * 0.4;
    e.save(), e.strokeStyle = "rgba(130, 215, 255, 0.55)", e.lineWidth = 1.5, e.setLineDash([12, 4, 3, 4]), e.beginPath(), e.moveTo(r - 170, a), e.lineTo(r + 170, a), e.stroke(), e.beginPath(), e.moveTo(r, a - 150), e.lineTo(r, a + 150), e.stroke(), e.setLineDash([]), e.strokeStyle = "rgba(200, 240, 255, 0.85)", e.lineWidth = 2.4, e.beginPath(), e.arc(r, a, 130, 0, Math.PI * 2), e.stroke(), e.lineWidth = 1.8, e.beginPath(), e.arc(r, a, 85, 0, Math.PI * 2), e.stroke(), e.beginPath(), e.arc(r, a, 42, 0, Math.PI * 2), e.stroke(), e.strokeStyle = "rgba(110, 205, 255, 0.6)", e.lineWidth = 1.2, e.setLineDash([6, 4]), e.beginPath(), e.arc(r, a, 108, 0, Math.PI * 2), e.stroke(), e.setLineDash([]), e.fillStyle = "rgba(8, 25, 45, 0.9)", e.strokeStyle = "rgba(210, 245, 255, 0.9)", e.lineWidth = 1.5;
    for (let h = 0; h < 8; h++) {
      let g = h * Math.PI / 4, b = r + Math.cos(g) * 108, y = a + Math.sin(g) * 108;
      e.beginPath(), e.arc(b, y, 9, 0, Math.PI * 2), e.fill(), e.stroke();
    }
    e.save(), e.beginPath(), e.arc(r, a, 130, Math.PI, Math.PI * 1.5), e.lineTo(r, a), e.closePath(), e.clip(), e.strokeStyle = "rgba(100, 190, 255, 0.35)", e.lineWidth = 1.2;
    for (let h = -150; h < 150; h += 8)
      e.beginPath(), e.moveTo(r + h - 150, a - 150), e.lineTo(r + h + 150, a + 150), e.stroke();
    e.restore(), e.strokeStyle = "rgba(170, 230, 255, 0.7)", e.lineWidth = 1.5, e.fillStyle = "rgba(215, 245, 255, 0.9)", e.font = 'bold 12px "Courier Prime", monospace', e.beginPath(), e.moveTo(r - 130, a + 145), e.lineTo(r + 130, a + 145), e.moveTo(r - 130, a + 135), e.lineTo(r - 130, a + 155), e.moveTo(r + 130, a + 135), e.lineTo(r + 130, a + 155), e.stroke(), e.fillText("<-- \xD8 260.00 mm -->", r, a + 158), e.beginPath(), e.moveTo(r + 30, a - 30), e.lineTo(r + 80, a - 80), e.lineTo(r + 140, a - 80), e.stroke(), e.textAlign = "left", e.fillText("BORE \xD8 42.0 H7", r + 85, a - 86);
    let f = r + 80, u = a - 130;
    e.strokeStyle = "rgba(160, 225, 255, 0.6)", e.lineWidth = 1.2, e.beginPath(), e.arc(f + 40, u, 10, 0, Math.PI * 2), e.stroke(), e.beginPath(), e.arc(f + 40, u, 4, 0, Math.PI * 2), e.stroke(), e.beginPath(), e.moveTo(f, u - 10), e.lineTo(f + 20, u - 5), e.lineTo(f + 20, u + 5), e.lineTo(f, u + 10), e.closePath(), e.stroke(), e.restore();
    let i = 390, p = 135, d = n - o - 6 - i, m = t - o - 6 - p;
    e.fillStyle = "rgba(8, 26, 48, 0.92)", e.fillRect(d, m, i, p), e.strokeStyle = "rgba(170, 235, 255, 0.8)", e.lineWidth = 2, e.strokeRect(d, m, i, p), e.lineWidth = 1.2, e.beginPath(), e.moveTo(d, m + 38), e.lineTo(d + i, m + 38), e.moveTo(d, m + 86), e.lineTo(d + i, m + 86), e.moveTo(d + 240, m + 38), e.lineTo(d + 240, m + p), e.moveTo(d + 120, m + 86), e.lineTo(d + 120, m + p), e.stroke(), e.fillStyle = "rgba(215, 245, 255, 0.95)", e.textAlign = "left", e.font = 'bold 15px "Courier Prime", monospace', e.fillText("AQUILA DYNAMICS \xB7 DEFENSE & NAVAL", d + 14, m + 24), e.font = 'bold 13px "Courier Prime", monospace', e.fillText("VALVE ASSEMBLY \xB7 HIGH PRESSURE", d + 14, m + 58), e.font = '11px "Courier Prime", monospace', e.fillStyle = "rgba(165, 220, 255, 0.85)", e.fillText("DWG NO: AQ-9042-REV-D", d + 14, m + 76), e.fillText("SCALE: 1:25", d + 14, m + 110), e.fillText("SHT 1 OF 1", d + 134, m + 110), e.fillText("DRN: E.M.", d + 252, m + 58), e.fillText("CHK: R.A.", d + 252, m + 76), e.fillStyle = "rgba(100, 255, 180, 0.9)", e.font = 'bold 11px "Courier Prime", monospace', e.fillText("APPROVED", d + 252, m + 110), e.strokeStyle = "rgba(230, 248, 255, 0.22)", e.lineWidth = 2.5, e.beginPath(), e.moveTo(n / 2, o), e.lineTo(n / 2, t - o), e.stroke(), e.beginPath(), e.moveTo(o, t / 2), e.lineTo(n - o, t / 2), e.stroke();
  },
  postcard(e, n, t) {
    e.strokeStyle = "rgba(180, 160, 130, 0.4)", e.lineWidth = 2, e.strokeRect(24, 24, n - 48, t - 48);
  },
  punchcard(e, n, t, s, o) {
    e.save(), e.strokeStyle = "rgba(100, 85, 70, 0.45)", e.lineWidth = 1.5, e.beginPath(), e.moveTo(0, 50), e.lineTo(50, 0), e.stroke(), e.fillStyle = "rgba(40, 85, 130, 0.25)", e.fillRect(0, 0, n, t * 0.16), e.strokeStyle = "rgba(40, 85, 130, 0.55)", e.lineWidth = 2, e.beginPath(), e.moveTo(0, t * 0.16), e.lineTo(n, t * 0.16), e.stroke();
    let r = 34, f = (n - 34 - r) / 79, u = t * 0.23, i = (t * 0.94 - u) / 11, p = (o.text.split(`
`)[0] || "").slice(0, 80);
    e.fillStyle = "rgba(25, 25, 25, 0.92)", e.font = 'bold 15px "Courier Prime", monospace', e.textAlign = "center";
    for (let d = 0; d < p.length; d++)
      p[d] !== " " && e.fillText(p[d], r + d * f, 24);
    e.fillStyle = "rgba(70, 60, 50, 0.65)", e.font = '9px "VT323", monospace';
    for (let d = 1; d <= 80; d++) {
      let m = r + (d - 1) * f;
      (d === 1 || d % 5 === 0) && (e.fillText(String(d), m, t * 0.14), e.fillText(String(d), m, t - 12));
    }
    e.font = '11px "VT323", monospace', e.fillStyle = "rgba(90, 80, 70, 0.45)";
    for (let d = 0; d < 10; d++) {
      let m = u + (d + 2) * i;
      for (let h = 1; h <= 80; h++) {
        let g = r + (h - 1) * f;
        e.fillText(String(d), g, m);
      }
    }
    e.fillStyle = "rgba(80, 70, 60, 0.7)", e.font = 'bold 11px "Courier Prime", monospace', e.fillText("IBM 5081", n - 80, t - 28), e.fillStyle = "rgba(15, 12, 10, 0.45)";
    for (let d = 0; d < p.length; d++) {
      let m = Zt(p[d]), h = r + d * f;
      for (let g of m) {
        let b = u + g * i;
        e.fillRect(h - 5, b - 10, 10, 20);
      }
    }
    e.restore();
  },
  shipping(e, n, t) {
    e.strokeStyle = "rgba(70, 50, 30, 0.35)", e.lineWidth = 2, e.strokeRect(30, 30, n - 60, t - 60);
    let s = t - 180, o = n - 140, r = 70;
    e.fillStyle = "#1c1612";
    for (let a = r; a < r + o; ) {
      let f = 2 + a * 17 % 7, u = 3 + a * 31 % 6;
      e.fillRect(a, s, f, 70), a += f + u;
    }
    e.font = 'bold 18px "Courier Prime", monospace', e.textAlign = "center", e.fillText("* EXP-9042-CRUMPLE *", n / 2, s + 100), e.textAlign = "left", e.save(), e.fillStyle = "rgba(50, 35, 20, 0.85)", e.font = "bold 28px sans-serif", e.fillText("\u2191 \u2191  THIS SIDE UP", 60, 80), e.restore();
  },
  kraft(e, n, t, s, o, r) {
    gt.shipping && gt.shipping(e, n, t, s, o, r);
  },
  parchment(e, n, t) {
    e.save();
    let s = n / 2, o = t - 140;
    e.fillStyle = "rgba(145, 24, 28, 0.92)", e.beginPath();
    for (let r = 0; r <= Math.PI * 2 + 0.01; r += 0.15) {
      let a = 48 * (1 + 0.08 * Math.sin(r * 8));
      r === 0 ? e.moveTo(s + Math.cos(r) * a, o + Math.sin(r) * a) : e.lineTo(s + Math.cos(r) * a, o + Math.sin(r) * a);
    }
    e.fill(), e.strokeStyle = "rgba(95, 12, 16, 0.8)", e.lineWidth = 3, e.beginPath(), e.arc(s, o, 32, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(85, 10, 14, 0.9)", e.font = 'bold 32px "Caveat", cursive', e.textAlign = "center", e.fillText("V", s, o + 11), e.restore();
  },
  ledger(e, n, t) {
    e.strokeStyle = "rgba(60, 110, 85, 0.6)", e.lineWidth = 2.5, e.strokeRect(30, 30, n - 60, t - 60), e.lineWidth = 1, e.strokeRect(34, 34, n - 60 - 8, t - 60 - 8), e.fillStyle = "rgba(235, 246, 238, 0.9)", e.fillRect(36, 36, n - 60 - 12, 110), e.strokeStyle = "rgba(60, 110, 85, 0.4)", e.strokeRect(36, 36, n - 60 - 12, 110), e.fillStyle = "rgba(25, 55, 40, 0.92)", e.textAlign = "center", e.font = 'bold 28px "Courier Prime", monospace', e.fillText("CONTINENTAL MERCANTILE CO. \xB7 GENERAL LEDGER", n / 2, 72), e.font = 'italic 16px "Libre Baskerville", serif', e.fillStyle = "rgba(35, 75, 55, 0.85)", e.fillText("FOLIO NO. 142 \u2014 ACCOUNT OF RECEIPTS & DISBURSEMENTS \u2014 ANNO 1928", n / 2, 102), e.fillRect(70, 118, n - 60 - 80, 2);
    let o = 146, r = t - 30 - 6, a = 210, f = n - 430, u = n - 370, i = n - 250, p = n - 130, d = 42;
    for (let m = o + d, h = 0; m < r; m += d, h++)
      h % 2 === 1 && (e.fillStyle = "rgba(180, 220, 200, 0.15)", e.fillRect(36, m, n - 60 - 12, d)), e.strokeStyle = "rgba(90, 160, 130, 0.35)", e.lineWidth = 1, e.beginPath(), e.moveTo(36, m), e.lineTo(n - 30 - 6, m), e.stroke();
    e.fillStyle = "rgba(40, 90, 65, 0.88)", e.fillRect(36, o, n - 60 - 12, d), e.fillStyle = "#f0f8f2", e.font = 'bold 14px "Courier Prime", monospace', e.textAlign = "center", e.fillText("DATE", (36 + a) / 2, o + 26), e.fillText("PARTICULARS / DESCRIPTION", (a + f) / 2, o + 26), e.fillText("FOL", (f + u) / 2, o + 26), e.fillText("DEBITS ($ | \xA2)", (u + i) / 2, o + 26), e.fillText("CREDITS ($ | \xA2)", (i + p) / 2, o + 26), e.fillText("BALANCE", (p + n - 30 - 6) / 2, o + 26), e.strokeStyle = "rgba(215, 45, 45, 0.65)", e.lineWidth = 1.5, e.beginPath(), e.moveTo(36, o), e.lineTo(36, r), e.stroke(), e.beginPath(), e.moveTo(40, o), e.lineTo(40, r), e.stroke(), e.strokeStyle = "rgba(70, 120, 160, 0.45)", e.lineWidth = 1.2, e.beginPath(), e.moveTo(a, o), e.lineTo(a, r), e.stroke(), e.beginPath(), e.moveTo(f, o), e.lineTo(f, r), e.stroke(), e.strokeStyle = "rgba(215, 45, 45, 0.65)", e.lineWidth = 1.8, e.beginPath(), e.moveTo(u, o), e.lineTo(u, r), e.stroke(), e.beginPath(), e.moveTo(i, o), e.lineTo(i, r), e.stroke(), e.beginPath(), e.moveTo(p, o), e.lineTo(p, r), e.stroke(), e.beginPath(), e.moveTo(p + 3, o), e.lineTo(p + 3, r), e.stroke(), e.strokeStyle = "rgba(60, 110, 190, 0.45)", e.lineWidth = 1, e.beginPath(), e.moveTo(i - 35, o + d), e.lineTo(i - 35, r), e.stroke(), e.beginPath(), e.moveTo(p - 35, o + d), e.lineTo(p - 35, r), e.stroke(), e.beginPath(), e.moveTo(n - 30 - 41, o + d), e.lineTo(n - 30 - 41, r), e.stroke(), e.strokeStyle = "rgba(215, 45, 45, 0.85)", e.lineWidth = 1.5, e.beginPath(), e.moveTo(u, r - 48), e.lineTo(n - 30 - 6, r - 48), e.stroke(), e.beginPath(), e.moveTo(u, r - 12), e.lineTo(n - 30 - 6, r - 12), e.stroke(), e.beginPath(), e.moveTo(u, r - 8), e.lineTo(n - 30 - 6, r - 8), e.stroke();
  },
  carbon(e, n, t) {
    let s = e.createLinearGradient(0, 0, n, t);
    s.addColorStop(0, "rgba(26, 24, 36, 0.95)"), s.addColorStop(0.5, "rgba(22, 20, 32, 0.98)"), s.addColorStop(1, "rgba(18, 16, 26, 0.95)"), e.fillStyle = s, e.fillRect(0, 0, n, t), e.save();
    for (let r = 0; r < 6; r++) {
      let a = r % 2 ? n - 60 : 60, f = t * (0.15 + r * 0.15), u = e.createRadialGradient(a, f, 10, a, f, 90);
      u.addColorStop(0, "rgba(90, 80, 150, 0.18)"), u.addColorStop(1, "rgba(20, 18, 30, 0)"), e.fillStyle = u, e.beginPath(), e.arc(a, f, 90, 0, Math.PI * 2), e.fill();
    }
    e.strokeStyle = "rgba(160, 170, 240, 0.35)", e.lineWidth = 1.5, e.setLineDash([4, 6]), e.beginPath(), e.moveTo(30, 40), e.lineTo(n - 30, 40), e.stroke(), e.setLineDash([]), e.fillStyle = "rgba(150, 160, 220, 0.55)", e.font = '11px "Courier Prime", monospace', e.textAlign = "center", e.fillText("\xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7  TEAR ALONG PERFORATION  \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7 \xB7", n / 2, 34), e.strokeStyle = "rgba(140, 150, 235, 0.45)", e.lineWidth = 2.2, e.strokeRect(36, 56, n - 72, t - 96), e.lineWidth = 1, e.strokeRect(42, 62, n - 84, t - 108), e.fillStyle = "rgba(225, 60, 75, 0.88)", e.font = 'bold 20px "Special Elite", monospace', e.textAlign = "right", e.fillText("\u2116 049182", n - 60, 95), e.fillStyle = "rgba(180, 190, 255, 0.9)", e.textAlign = "left", e.font = 'bold 22px "Courier Prime", monospace', e.fillText("CUSTOMER DUPLICATE RECEIPT", 64, 98), e.font = '12px "Courier Prime", monospace', e.fillStyle = "rgba(140, 155, 230, 0.7)", e.fillText("INTER-OFFICE TRANSFER VOUCHER \xB7 SECOND VIA", 64, 118), e.fillRect(64, 130, n - 128, 2), e.font = '13px "Courier Prime", monospace', e.fillStyle = "rgba(135, 145, 220, 0.65)", [
      ["DATE OF RECORD: ____________________________", 64, 168],
      ["TRANSACTION REF: __________________________", n / 2 + 20, 168],
      ["RECEIVED FROM: __________________________________________________________________", 64, 210],
      ["SUM AMOUNT: ____________________________________________________________________", 64, 252]
    ].forEach(([r, a, f]) => e.fillText(r, a, f)), e.save(), e.translate(n - 220, t - 140), e.rotate(-0.16), e.strokeStyle = "rgba(150, 160, 255, 0.65)", e.lineWidth = 4, e.strokeRect(-110, -32, 220, 64), e.lineWidth = 1.5, e.strokeRect(-104, -26, 208, 52), e.fillStyle = "rgba(150, 160, 255, 0.75)", e.font = 'bold 28px "Courier Prime", monospace', e.textAlign = "center", e.fillText("DUPLICATE", 0, 10), e.restore(), e.restore();
  }
};
function Cn(e, n, t, s, o) {
  e.strokeStyle = "rgba(100, 90, 75, 0.4)", e.lineWidth = 2, e.beginPath(), e.moveTo(n / 2, 40), e.lineTo(n / 2, t - 40), e.stroke();
  let r = n - 140, a = 50;
  e.strokeStyle = "rgba(100, 90, 75, 0.5)", e.lineWidth = 1.5, e.setLineDash([4, 4]), e.strokeRect(r, a, 90, 110), e.setLineDash([]), e.fillStyle = "rgba(120, 100, 80, 0.5)", e.font = '12px "Courier Prime", monospace', e.textAlign = "center", e.fillText("AFFIX", r + 45, a + 50), e.fillText("STAMP", r + 45, a + 68), e.strokeStyle = "rgba(40, 50, 80, 0.55)", e.lineWidth = 2, e.beginPath(), e.arc(r - 30, a + 60, 44, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(40, 50, 80, 0.6)", e.font = 'bold 13px "Courier Prime", monospace', e.fillText("POST", r - 30, a + 64), e.textAlign = "left", e.strokeStyle = "rgba(120, 110, 95, 0.4)", e.lineWidth = 1.5;
  for (let f = t * 0.45; f < t - 60; f += 44)
    e.beginPath(), e.moveTo(n / 2 + 40, f), e.lineTo(n - 40, f), e.stroke();
}
function In(e, n, t, s, o, r) {
  let a = Math.round(s.flap / s.h * t);
  e.save(), e.translate(n / 2, a * 0.36), e.fillStyle = "rgba(140,20,24,0.95)", e.beginPath();
  for (let i = 0; i <= Math.PI * 2 + 0.01; i += 0.2) {
    let p = 46 * (1 + 0.06 * Math.sin(i * 7 + r() * 0.3));
    i ? e.lineTo(Math.cos(i) * p, Math.sin(i) * p) : e.moveTo(p, 0);
  }
  e.fill(), e.strokeStyle = "rgba(90,10,14,0.8)", e.lineWidth = 3, e.beginPath(), e.arc(0, 0, 30, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(80,8,12,0.9)", e.font = 'bold 30px "Special Elite"', e.textAlign = "center", e.fillText("A", 0, 11), e.restore();
  let f = n - 180, u = a + 40;
  e.fillStyle = "rgba(70,105,140,0.85)", e.fillRect(f, u, 120, 140), e.strokeStyle = "rgba(255,255,255,0.8)", e.setLineDash([4, 4]), e.lineWidth = 3, e.strokeRect(f + 6, u + 6, 108, 128), e.setLineDash([]), e.fillStyle = "rgba(255,255,255,0.9)", e.font = 'bold 44px "Special Elite"', e.textAlign = "center", e.fillText("25", f + 60, u + 88), e.strokeStyle = "rgba(40,40,60,0.55)", e.lineWidth = 3, e.beginPath(), e.arc(f - 30, u + 90, 58, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(40,40,60,0.6)", e.font = '20px "Courier Prime"', e.fillText("POST", f - 30, u + 98);
  for (let i = 0; i < 4; i++)
    e.beginPath(), e.moveTo(f - 120, u + 60 + i * 18), e.bezierCurveTo(f - 60, u + 50 + i * 18, f, u + 70 + i * 18, f + 60, u + 60 + i * 18), e.stroke();
  e.textAlign = "left", e.font = '52px "Caveat"', e.fillStyle = ae(s.ink, 0.9), o.address.split(`
`).forEach((i, p) => e.fillText(i, 150, a + 330 + p * 62));
}
var Ln = [
  ["FOR RENT", "quiet room near the park, morning light. Ask at the front desk."],
  ["FOR SALE", "vintage typewriter, works fine, missing the letter Q."],
  ["WANTED", "night watchman for the old warehouse on the pier."],
  ["FOUND", "small brass key with a red tag. Claim at the bakery."],
  ["LOST", "grey cat, answers to Pixel. Reward offered."],
  ["REPAIRS", "radios and record players, evenings only."],
  ["SWAP", "bicycle bell for anything that does not squeak."]
];
function Fn(e, n, t, s) {
  let a = (n - 88 - 26) / 2;
  e.fillStyle = "rgba(25,25,25,0.9)", e.font = 'bold 34px "Libre Baskerville"', e.fillText("CLASSIFIEDS", 44, 92), e.fillRect(40, 108, n - 88 + 8, 3);
  let f = 44 + a + 26, u = 132, i = Math.round(a * 0.68);
  s.photo && Jt(e, s.photo, f, u, a, i), e.font = 'italic 16px "Libre Baskerville"', e.fillText("Old town, archive photo.", f, u + i + 22);
  let p = t - 60, d = [150, u + i + 60], m = 0, h = 44, g = d[0];
  for (let [b, y] of Ln) {
    e.font = '18px "Libre Baskerville"';
    let v = _n(e, b + " " + y, a);
    if (g + v.length * 24 > p && (m === 1 || (m = 1, h = f, g = d[1], g + v.length * 24 > p)))
      break;
    v.forEach((w, l) => {
      if (l === 0) {
        e.font = 'bold 19px "Libre Baskerville"', e.fillText(b, h, g);
        let k = e.measureText(b + " ").width;
        e.font = '18px "Libre Baskerville"', e.fillText(w.slice(b.length + 1), h + k, g);
      } else
        e.font = '18px "Libre Baskerville"', e.fillText(w, h, g);
      g += 24;
    }), g += 16;
  }
}
var xt = {
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
async function On(e, n, t, s = "") {
  if (typeof Blob > "u" || typeof URL > "u" || !URL.createObjectURL) return null;
  let o = `<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${t}">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;box-sizing:border-box;margin:0;padding:0;overflow:hidden;${s}">
        ${e}
      </div>
    </foreignObject>
  </svg>`, r = new Blob([o], { type: "image/svg+xml;charset=utf-8" }), a = URL.createObjectURL(r), f = new Image();
  return new Promise((u) => {
    f.onload = () => {
      URL.revokeObjectURL(a), u(f);
    }, f.onerror = () => {
      URL.revokeObjectURL(a), u(null);
    }, f.src = a;
  });
}
async function Qe(e, n, t, s) {
  let o = Math.round(n.w * bt), r = Math.round(n.h * bt), a = ye(o, r), f = a.getContext("2d"), u = t === "front", i = W(e.seed * 31 + (u ? 5 : 9)), p = {};
  n.photo && u && (p.img = await ft(e.image || Le.assets + "photos/sunset.webp")), e.type === "newspaper" && (u || !e.back) && (p.photo = await ft(Le.assets + "photos/" + (u ? "sea" : "city") + ".webp"));
  let d = e.type === "notebook" || e.type === "form" || e.type === "blueprint" || e.type === "ledger";
  gt[e.type] && (u || d) && gt[e.type](f, o, r, n, e, p), e.type === "envelope" && !u && In(f, o, r, n, e, i), e.type === "postcard" && !u && !e.back && Cn(f, o, r, e, i), e.type === "newspaper" && !u && !e.back && Fn(f, o, r, p);
  let m = e.type === "envelope" ? "" : u ? e.text : e.back, h = u ? xt[e.type] ? xt[e.type](o, r, n) : { x: 50, y: 50, w: o - 100, h: r - 100 } : { x: Math.round(n.x * 0.8), y: Math.min(n.y, Math.round(r * 0.28)), w: o - Math.round(n.x * 1.6), h: r - Math.min(n.y, Math.round(r * 0.28)) - 40, center: e.type === "ticket" };
  e.type === "ticket" && !u && (h.x = Math.round(o * 0.55), h.w = Math.round(o * 0.4)), e.type === "postcard" && !u && (h.x = Math.round(o * 0.54), h.w = Math.round(o * 0.42)), e.type === "polaroid" && !u && (h = { x: 60, y: Math.round(r * 0.3), w: o - 120, h: r * 0.6, center: !0 });
  let g = m && h ? Mn(f, e, n, m, h, s, i) : 0;
  if (u && e.rich && h) {
    if (e.rich.mode === "canvas" && typeof e.rich.body == "function")
      try {
        await e.rich.body(f, h, o, r);
      } catch {
      }
    else if (typeof e.rich.body == "string")
      try {
        let y = await On(e.rich.body, h.w, h.h, e.rich.style || "");
        y && f.drawImage(y, h.x, h.y);
      } catch {
      }
  }
  let b = W(e.seed * 17 + (u ? 1 : 2));
  e.states.includes("coffee") && await Un(a, f, o, r, e, u), e.states.includes("water") && await Dn(f, o, r, e, u), e.states.includes("prints") && await Nn(f, o, r, e, u), e.states.includes("wine") && await zn(a, f, o, r, e, u), e.states.includes("ink") && Xn(f, o, r, e, u), e.states.includes("aged") && Bn(f, o, r, b), e.states.includes("faded") && Yn(f, o, r, e), e.states.includes("foxing") && qn(f, o, r, e), e.states.includes("staple") && $n(f, o, r, e, u), e.states.includes("clip") && jn(f, o, r, e, u), e.states.includes("grease") && Kn(f, o, r, e, u), e.states.includes("dogear") && xn(f, o, r, e, u), e.states.includes("damp") && Jn(f, o, r, e), e.states.includes("creased") && Zn(f, o, r, e);
  for (let y of e.states)
    if (dt[y])
      try {
        await dt[y](f, a, o, r, e, u, b);
      } catch {
      }
  return u && e.states.includes("stamp") && Hn(f, o, r, e, g), u && e.states.includes("tape") && Vn(f, o, r, e), a;
}
function Dt(e, n, t, s, o, r, a, f) {
  e.save(), e.globalCompositeOperation = "multiply", e.globalAlpha = a, e.translate(t, s), f || e.scale(-1, 1), e.rotate(r), e.drawImage(n, -o / 2, -o / 2, o, o), e.restore();
}
async function Dn(e, n, t, s, o) {
  let r = await Xe("water");
  if (!r) return;
  let a = W(s.seed * 23 + 4), f = n * (0.25 + 0.5 * a()), u = t * (0.25 + 0.5 * a()), i = Math.min(n, t) * (0.8 + 0.35 * a()), p = a() * Math.PI * 2;
  Dt(e, r, o ? f : n - f, u, i, p, o ? 0.85 : 0.6, o);
}
async function Nn(e, n, t, s, o) {
  let r = await Xe("prints");
  if (!r) return;
  let a = W(s.seed * 29 + 6);
  for (let f = 0; f < 2; f++) {
    let u = n * (f ? 0.86 - 0.08 * a() : 0.1 + 0.12 * a()), i = t * (0.72 + 0.2 * a()), p = Math.min(n, t) * (0.22 + 0.08 * a()), d = a() * Math.PI * 2;
    Dt(e, r, o ? u : n - u, i, p, d, o ? 0.6 : 0.4, o);
  }
}
async function Un(e, n, t, s, o, r) {
  let a = W(o.seed * 17 + 1), f = t * (0.3 + 0.4 * a()), u = s * (0.35 + 0.35 * a()), i = Math.min(t, s) * (0.13 + 0.07 * a()), p = a() * Math.PI * 2, d = r ? f : t - f, m = await Xe("coffee");
  if (r) {
    let g = ye(t, s);
    g.getContext("2d").drawImage(e, 0, 0), n.save(), n.beginPath(), n.arc(d, u, i * 1.02, 0, Math.PI * 2), n.clip(), n.clearRect(d - i * 1.1, u - i * 1.1, i * 2.2, i * 2.2), n.filter = "blur(2.5px)", n.globalAlpha = 0.85, n.drawImage(g, 0, 0), n.restore();
  }
  if (m) {
    Dt(n, m, d, u, i * 3.4, p, r ? 0.95 : 0.55, r);
    return;
  }
  n.save();
  let h = n.createRadialGradient(d, u, i * 0.1, d, u, i);
  h.addColorStop(0, "rgba(140,95,45,0.10)"), h.addColorStop(0.82, "rgba(125,82,36,0.17)"), h.addColorStop(1, "rgba(110,70,30,0)"), n.fillStyle = h, n.beginPath(), n.arc(d, u, i, 0, Math.PI * 2), n.fill();
  for (let g = 0; g < 3; g++) {
    n.strokeStyle = `rgba(100,62,26,${0.2 + 0.12 * a()})`, n.lineWidth = i * (0.03 + 0.03 * a()), n.beginPath();
    let b = a() * 6.28, y = i * (0.9 + 0.05 * g);
    for (let v = 0; v <= Math.PI * 2 + 0.01; v += 0.05) {
      let w = y * (1 + 0.025 * Math.sin(v * 5 + b) + 0.015 * Math.sin(v * 11 + b * 2));
      v === 0 ? n.moveTo(d + Math.cos(v) * w, u + Math.sin(v) * w) : n.lineTo(d + Math.cos(v) * w, u + Math.sin(v) * w);
    }
    n.stroke();
  }
  for (let g = 0; g < 3; g++) {
    let b = d + (a() - 0.5) * i * 1.2, y = i * (0.6 + a() * 1.2), v = n.createLinearGradient(0, u + i * 0.6, 0, u + i * 0.6 + y);
    v.addColorStop(0, "rgba(115,75,32,0.16)"), v.addColorStop(1, "rgba(115,75,32,0)"), n.fillStyle = v, n.fillRect(b - 5, u + i * 0.6, 9 + a() * 6, y);
  }
  n.restore();
}
function Bn(e, n, t, s) {
  e.save(), e.fillStyle = "rgba(150,110,45,0.08)", e.fillRect(0, 0, n, t);
  let o = e.createRadialGradient(n / 2, t / 2, Math.min(n, t) * 0.3, n / 2, t / 2, Math.max(n, t) * 0.75);
  o.addColorStop(0, "rgba(120,80,30,0)"), o.addColorStop(1, "rgba(120,80,30,0.28)"), e.fillStyle = o, e.fillRect(0, 0, n, t);
  for (let r = 0; r < 34; r++) {
    let a = s() * n, f = s() * t, u = 3 + s() * 14, i = e.createRadialGradient(a, f, 0, a, f, u);
    i.addColorStop(0, `rgba(125,85,40,${0.12 + s() * 0.2})`), i.addColorStop(1, "rgba(125,85,40,0)"), e.fillStyle = i, e.beginPath(), e.arc(a, f, u, 0, Math.PI * 2), e.fill();
  }
  e.restore();
}
async function zn(e, n, t, s, o, r) {
  let a = W(o.seed * 43 + 3), f = t * (0.3 + 0.4 * a()), u = s * (0.4 + 0.3 * a()), i = Math.min(t, s) * (0.1 + 0.04 * a()), p = r ? f : t - f, d = r ? 1 : 0.5;
  if (r) {
    let h = ye(t, s);
    h.getContext("2d").drawImage(e, 0, 0), n.save(), n.beginPath(), n.arc(p, u, i * 1.04, 0, Math.PI * 2), n.clip(), n.clearRect(p - i * 1.1, u - i * 1.1, i * 2.2, i * 2.2), n.filter = "blur(2px)", n.globalAlpha = 0.8, n.drawImage(h, 0, 0), n.restore();
  }
  n.save(), n.globalCompositeOperation = "multiply";
  let m = n.createRadialGradient(p, u, i * 0.2, p, u, i * 1.05);
  m.addColorStop(0, `rgba(120,14,38,${0.03 * d})`), m.addColorStop(0.8, `rgba(120,14,38,${0.1 * d})`), m.addColorStop(1, "rgba(90,8,28,0)"), n.fillStyle = m, n.beginPath(), n.arc(p, u, i * 1.05, 0, Math.PI * 2), n.fill(), n.lineCap = "round", n.filter = "blur(0.8px)";
  for (let h = 0; h < 2; h++) {
    let g = a() * 6.28, b = 3.4 + a() * 1.4, y = i * (0.94 + 0.12 * h + 0.03 * a()), v = a() * 6.28, w = (l, k) => {
      let C = (y - k) * (1 + 0.025 * Math.sin(l * 5 + v) + 0.012 * Math.sin(l * 9 + v * 2));
      return [p + Math.cos(l) * C, u + Math.sin(l) * C];
    };
    [[i * 0.22, 0.07, 0.04], [i * 0.07, 0.4, 0], [i * 0.03, 0.16, i * 0.06]].forEach(([l, k, C]) => {
      n.strokeStyle = `rgba(96,12,36,${k * d})`, n.lineWidth = l, n.beginPath();
      for (let N = 0, I = g; I <= g + b; N++, I += 0.04) {
        let B = w(I, C);
        N ? n.lineTo(B[0], B[1]) : n.moveTo(B[0], B[1]);
      }
      n.stroke();
    });
  }
  n.filter = "none";
  for (let h = 0, g = 4 + Math.floor(a() * 4); h < g; h++) {
    let b = a() * 6.28, y = i * (1.35 + a() * 1.1), v = i * (0.02 + 0.035 * a());
    n.fillStyle = `rgba(104,10,30,${0.45 * d})`, n.beginPath(), n.arc(p + Math.cos(b) * y, u + Math.sin(b) * y, v, 0, Math.PI * 2), n.fill(), h % 2 && (n.beginPath(), n.arc(p + Math.cos(b + 0.2) * y * 1.12, u + Math.sin(b + 0.2) * y * 1.12, v * 0.35, 0, Math.PI * 2), n.fill());
  }
  n.restore();
}
function Gn(e, n) {
  let t = [1, 2, 3, 5, 7, 11].map((o) => [o, e() * 6.28, (0.06 + 0.14 * e()) * 2 / o]), s = [];
  for (let o = 0; o < 40; o++) {
    let r = o / 40 * Math.PI * 2, a = 1;
    t.forEach(([f, u, i]) => {
      a += i * Math.sin(f * r + u);
    }), s.push([Math.cos(r) * n * a, Math.sin(r) * n * a]);
  }
  return s;
}
function Ot(e, n, t, s, o) {
  e.beginPath(), n.forEach((r, a) => {
    a ? e.lineTo(t + r[0] * o, s + r[1] * o) : e.moveTo(t + r[0] * o, s + r[1] * o);
  }), e.closePath(), e.fill();
}
function Xn(e, n, t, s, o) {
  let r = W(s.seed * 47 + 5), a = Math.min(n, t), f = n * (0.2 + 0.6 * r()), u = t * (0.2 + 0.6 * r()), i = a * (0.03 + 0.015 * r()), p = o ? f : n - f, d = o ? 1 : 0.5, m = [16, 22, 58], h = Gn(r, i);
  e.save(), e.fillStyle = ae(m, 0.07 * d), Ot(e, h, p, u, 1.45), Ot(e, h, p, u, 1.22), e.fillStyle = ae(m, 0.86 * d), e.filter = "blur(0.5px)", Ot(e, h, p, u, 1), e.filter = "none", e.fillStyle = ae(m, 0.86 * d);
  for (let k = 0, C = 6 + Math.floor(r() * 5); k < C; k++) {
    let N = r() * 6.28, I = i * (1.5 + 2.4 * r()), B = i * (0.16 + 0.14 * r()) * (1.6 - I / (i * 4));
    e.beginPath(), e.arc(p + Math.cos(N) * I, u + Math.sin(N) * I, Math.max(B, 0.8), 0, Math.PI * 2), e.fill();
  }
  let g = r() * 6.28, b = i * (1.6 + 1.2 * r()), y = Math.cos(g), v = Math.sin(g), w = [], l = [];
  for (let k = 0; k <= 10; k++) {
    let C = k / 10, N = i * 0.42 * Math.pow(1 - C, 1.3) * (0.85 + 0.3 * r()), I = i * 0.7 + b * C;
    w.push([y * I - v * N, v * I + y * N]), l.push([y * I + v * N, v * I - y * N]);
  }
  e.fillStyle = ae(m, 0.6 * d), e.beginPath(), w.concat(l.reverse()).forEach((k, C) => {
    C ? e.lineTo(p + k[0], u + k[1]) : e.moveTo(p + k[0], u + k[1]);
  }), e.closePath(), e.fill(), e.strokeStyle = ae(m, 0.28 * d), e.lineWidth = 0.9, e.lineCap = "round";
  for (let k = 0; k < 18; k++) {
    let C = r() * 6.28, N = i * (0.95 + 0.1 * r()), I = N + i * (0.3 + 0.9 * r());
    e.beginPath(), e.moveTo(p + Math.cos(C) * N, u + Math.sin(C) * N), e.lineTo(p + Math.cos(C + 0.05) * I, u + Math.sin(C + 0.05) * I), e.stroke();
  }
  e.restore();
}
function Yn(e, n, t, s) {
  let o = W(s.seed * 41 + 2), r = Fe(s.seed + 19), a = o() * Math.PI * 2, f = Math.cos(a), u = Math.sin(a), i = 96, p = Math.round(i * t / n), d = ye(i, p, !0), m = d.getContext("2d"), h = m.createImageData(i, p), g = h.data;
  for (let b = 0; b < p; b++) for (let y = 0; y < i; y++) {
    let v = $((y / i - 0.5) * f + (b / p - 0.5) * u + 0.5), w = Math.pow(v, 2.4) * (0.45 + 0.55 * r(y * 0.12, b * 0.12)), l = (b * i + y) * 4;
    g[l] = 165, g[l + 1] = 112, g[l + 2] = 45, g[l + 3] = Math.round(255 * 0.42 * w);
  }
  m.putImageData(h, 0, 0), e.save(), e.imageSmoothingQuality = "high", e.drawImage(d, 0, 0, n, t), e.restore();
}
function qn(e, n, t, s) {
  let o = W(s.seed * 61 + 11), r = Math.min(n, t) / 900, a = [[150, 78, 30], [170, 96, 40], [128, 62, 24]];
  e.save(), e.globalCompositeOperation = "multiply";
  for (let f = 0, u = 0; f < 150 && u < 900; u++) {
    let i = o() * n, p = o() * t, d = Math.max(Math.abs(i / n - 0.5), Math.abs(p / t - 0.5)) * 2;
    if (o() > 0.15 + 0.85 * d * d * d) continue;
    f++;
    let m = o() < 0.4, h = r * (m ? 4 + Math.pow(o(), 1.5) * 15 : 1 + Math.pow(o(), 2) * 5), g = a[Math.floor(o() * 3)], b = 0.34 + 0.4 * o(), y = e.createRadialGradient(0, 0, h * (m ? 0 : 0.55), 0, 0, h);
    m ? (y.addColorStop(0, ae(g, b * 0.6)), y.addColorStop(0.55, ae(g, b * 0.4)), y.addColorStop(1, ae(g, 0))) : (y.addColorStop(0, ae(g, b * 0.7)), y.addColorStop(0.85, ae(g, b * 0.8)), y.addColorStop(0.97, ae(g, b * 1.15)), y.addColorStop(1, ae(g, 0))), e.save(), e.translate(i, p), e.rotate(o() * 3.14), e.scale(1, m ? 0.55 + 0.45 * o() : 1), e.fillStyle = y, e.beginPath(), e.arc(0, 0, h, 0, Math.PI * 2), e.fill(), e.restore();
  }
  e.restore();
}
function Hn(e, n, t, s, o) {
  let r = W(s.seed * 59 + 9), a = Fe(s.seed + 23), f = String(s.stamp).toUpperCase(), u = r() < 0.6 ? [176, 26, 36] : [34, 64, 150], i = ye(1, 1).getContext("2d");
  i.font = 'bold 100px "Courier Prime", monospace', i.letterSpacing = "12px";
  let p = i.measureText(f).width / 100, d = n * 0.44, m = d / (p + 1.2), h = m * 2.1, g = -(0.14 + 0.17 * r()), b = n * (0.46 + 0.1 * r()), y = Math.min(t - h / 2 - 30, Math.max(t * 0.55, o + h / 2 + 24)), v = Math.ceil(Math.hypot(d, h) + m * 0.8), w = ye(v, v, !0), l = w.getContext("2d");
  l.translate(v / 2, v / 2), l.fillStyle = l.strokeStyle = ae(u, 1), l.textAlign = "center", l.textBaseline = "middle", l.font = `bold ${m}px "Courier Prime", monospace`, l.letterSpacing = m * 0.12 + "px", l.lineWidth = m * 0.13, l.strokeRect(-d / 2, -h / 2, d, h), l.globalAlpha = 0.5, l.lineWidth = m * 0.1, l.strokeRect(-d / 2 + m * 0.07, -h / 2 - m * 0.05, d, h), l.globalAlpha = 1, l.lineWidth = m * 0.05, l.strokeRect(-d / 2 + m * 0.3, -h / 2 + m * 0.3, d - m * 0.6, h - m * 0.6), l.fillText(f, -m * 0.06, m * 0.05);
  let k = l.getImageData(0, 0, v, v), C = k.data, N = v / 2;
  for (let I = 0; I < C.length; I += 4) {
    if (!C[I + 3]) continue;
    let B = I / 4, te = B % v, ee = Math.floor(B / v), P = (te - N) / (d / 2), D = (ee - N) / (h / 2), X = 1 - 0.25 * Math.min(1, P * P + D * D), Z = $((a(te / (m * 1.5), ee / (m * 1.5)) - 0.25) * 3.2) * X * (r() < 0.94 ? 1 : 0.3);
    C[I + 3] = Math.round(C[I + 3] * Z);
  }
  l.putImageData(k, 0, 0), e.save(), e.globalCompositeOperation = "multiply", e.globalAlpha = 0.9, e.translate(b, y), e.rotate(g), e.drawImage(w, -v / 2, -v / 2), e.restore();
}
function Vn(e, n, t, s) {
  let o = W(s.seed * 53 + 7), r = n * (0.24 + 0.04 * o()), a = n * 0.1;
  [[0.1, 0.05, 0.7], [0.9, 0.05, -0.7]].forEach(([f, u, i]) => {
    let p = n * (f + (o() - 0.5) * 0.03), d = t * (u + (o() - 0.5) * 0.02), m = i + (o() - 0.5) * 0.1;
    e.save(), e.translate(p, d), e.rotate(m);
    let h = [];
    for (let y = 0; y <= 6; y++) h.push([r / 2 - (y % 2 ? 0 : 2 + 4 * o()), -a / 2 + a * y / 6]);
    let g = () => {
      e.beginPath(), e.moveTo(-r / 2, -a / 2), h.forEach((y) => e.lineTo(y[0], y[1])), e.lineTo(-r / 2, a / 2), e.closePath();
    };
    g(), e.fillStyle = "rgba(226,176,96,0.48)", e.fill();
    let b = e.createLinearGradient(0, -a / 2, 0, a / 2);
    b.addColorStop(0, "rgba(255,248,230,0)"), b.addColorStop(0.3, "rgba(255,248,230,0.3)"), b.addColorStop(0.5, "rgba(255,248,230,0.06)"), b.addColorStop(1, "rgba(255,248,230,0)"), e.fillStyle = b, e.fill(), g(), e.strokeStyle = "rgba(140,92,36,0.5)", e.lineWidth = 2, e.stroke(), e.fillStyle = "rgba(140,92,36,0.16)", e.fillRect(-r / 2, -a / 2, r * 0.03, a);
    for (let y = 0, v = 6 + Math.floor(o() * 4); y < v; y++)
      e.fillStyle = `rgba(70,46,22,${0.3 + 0.3 * o()})`, e.beginPath(), e.arc((o() - 0.5) * r * 0.8, (o() - 0.5) * a * 0.7, 1 + 2 * o(), 0, Math.PI * 2), e.fill();
    e.restore();
  });
}
function $n(e, n, t, s, o) {
  let r = W(s.seed * 71 + 3), a = 54 + r() * 16, f = 48 + r() * 16, u = -0.52 + (r() - 0.5) * 0.15;
  if (e.save(), e.translate(o ? a : n - a, f), e.rotate(o ? u : -u), o) {
    e.fillStyle = "rgba(30, 20, 10, 0.7)", e.fillRect(-22, -3, 5, 6), e.fillRect(17, -3, 5, 6), e.fillStyle = "rgba(10, 10, 10, 0.35)", e.fillRect(-20, 1, 40, 5);
    let i = e.createLinearGradient(0, -3, 0, 3);
    i.addColorStop(0, "#c8cdd4"), i.addColorStop(0.3, "#ffffff"), i.addColorStop(0.7, "#858d99"), i.addColorStop(1, "#535b66"), e.fillStyle = i, e.fillRect(-20, -3, 40, 5), e.fillStyle = "rgba(140, 70, 30, 0.35)", e.fillRect(-8, -2, 6, 3);
  } else
    e.fillStyle = "rgba(30, 20, 10, 0.7)", e.fillRect(-22, -3, 5, 6), e.fillRect(17, -3, 5, 6), e.fillStyle = "#7a828e", e.fillRect(-18, -2, 12, 4), e.fillRect(6, -2, 12, 4);
  e.restore();
}
function jn(e, n, t, s, o) {
  let r = W(s.seed * 73 + 5), a = n * (0.68 + (r() - 0.5) * 0.2), f = 30 + r() * 12, u = -0.06 + (r() - 0.5) * 0.12, i = 18, p = 60;
  e.save(), e.translate(o ? a : n - a, f), e.rotate(o ? u : -u), e.lineCap = "round", e.lineJoin = "round", e.strokeStyle = "rgba(20, 20, 25, 0.3)", e.lineWidth = 3.6, e.beginPath(), o ? (e.moveTo(-i / 2 + 1, -12), e.lineTo(-i / 2 + 1, p / 2 - i / 2), e.arc(1, p / 2 - i / 2, i / 2, Math.PI, 0, !0), e.lineTo(i / 2 + 1, -p / 2 + i / 2), e.arc(1, -p / 2 + i / 2, i / 2, 0, Math.PI, !0)) : (e.moveTo(-i / 4 + 1, -12), e.lineTo(-i / 4 + 1, p / 3), e.arc(1, p / 3, i / 4, Math.PI, 0, !0), e.lineTo(i / 4 + 1, -12)), e.stroke();
  let d = e.createLinearGradient(-i / 2, 0, i / 2, 0);
  d.addColorStop(0, "#858d99"), d.addColorStop(0.3, "#f5f8fb"), d.addColorStop(0.65, "#c0c6cf"), d.addColorStop(1, "#606670"), e.strokeStyle = d, e.lineWidth = 2.6, e.beginPath(), o ? (e.moveTo(-i / 2, -14), e.lineTo(-i / 2, p / 2 - i / 2), e.arc(0, p / 2 - i / 2, i / 2, Math.PI, 0, !0), e.lineTo(i / 2, -p / 2 + i / 2), e.arc(0, -p / 2 + i / 2, i / 2, 0, Math.PI, !0)) : (e.moveTo(-i / 4, -14), e.lineTo(-i / 4, p / 3), e.arc(0, p / 3, i / 4, Math.PI, 0, !0), e.lineTo(i / 4, -14)), e.stroke(), e.strokeStyle = "rgba(255, 255, 255, 0.7)", e.lineWidth = 0.9, e.stroke(), e.restore();
}
function Kn(e, n, t, s, o) {
  let r = W(s.seed * 67 + 13), a = n * (0.25 + 0.5 * r()), f = t * (0.3 + 0.45 * r()), u = Math.min(n, t) * (0.12 + 0.08 * r()), i = o ? a : n - a;
  e.save(), e.globalCompositeOperation = "multiply";
  let p = e.createRadialGradient(i, f, u * 0.2, i, f, u);
  p.addColorStop(0, "rgba(140, 120, 70, 0.45)"), p.addColorStop(0.65, "rgba(150, 130, 80, 0.30)"), p.addColorStop(1, "rgba(150, 130, 80, 0)"), e.fillStyle = p, e.beginPath();
  for (let d = 0; d <= Math.PI * 2 + 0.01; d += 0.1) {
    let m = u * (1 + 0.12 * Math.sin(d * 5 + r() * 3));
    d === 0 ? e.moveTo(i + Math.cos(d) * m, f + Math.sin(d) * m) : e.lineTo(i + Math.cos(d) * m, f + Math.sin(d) * m);
  }
  e.fill(), e.restore();
}
function xn(e, n, t, s, o) {
  let r = Math.min(n, t) * 0.15;
  if (e.save(), o) {
    e.fillStyle = "rgba(10, 10, 15, 0.3)", e.beginPath(), e.moveTo(n - r - 8, 0), e.lineTo(n, r + 8), e.lineTo(n - r, r), e.closePath(), e.fill();
    let a = e.createLinearGradient(n - r, 0, n, r);
    a.addColorStop(0, "rgba(235, 225, 210, 0.95)"), a.addColorStop(1, "rgba(195, 185, 170, 0.95)"), e.fillStyle = a, e.beginPath(), e.moveTo(n - r, 0), e.lineTo(n, r), e.lineTo(n - r, r), e.closePath(), e.fill(), e.strokeStyle = "rgba(60, 50, 40, 0.4)", e.lineWidth = 2, e.beginPath(), e.moveTo(n - r, 0), e.lineTo(n, r), e.stroke();
  }
  e.restore();
}
function Jn(e, n, t, s) {
  let o = W(s.seed * 83 + 7);
  e.save(), e.strokeStyle = "rgba(120, 140, 170, 0.12)", e.lineWidth = 3;
  for (let r = 0; r < 6; r++) {
    let a = t * (0.2 + 0.12 * r + 0.04 * o());
    e.beginPath(), e.moveTo(0, a), e.bezierCurveTo(n * 0.33, a + 18 * (o() - 0.5), n * 0.66, a + 18 * (o() - 0.5), n, a), e.stroke();
  }
  e.restore();
}
function Zn(e, n, t, s) {
  let o = W(s.seed * 89 + 11);
  e.save(), e.strokeStyle = "rgba(255, 255, 255, 0.28)", e.lineWidth = 1;
  for (let r = 0; r < 14; r++) {
    let a = o() * n, f = o() * t, u = o() * Math.PI, i = 60 + o() * 120;
    e.beginPath(), e.moveTo(a, f), e.lineTo(a + Math.cos(u) * i, f + Math.sin(u) * i), e.stroke();
  }
  e.restore();
}
function Qt(e, n, t) {
  if (!e.hiddenInk) return null;
  let s = ye(n, t, !0), o = s.getContext("2d"), r = Math.round(n * 0.12);
  o.fillStyle = "#fff", o.textAlign = "center", o.filter = "blur(0.7px)", o.font = `${r}px "Caveat", cursive`, o.translate(n / 2, t * 0.7), o.rotate(-0.1), e.hiddenInk.split(`
`).forEach((u, i) => o.fillText(u, 0, i * r * 1.05));
  let a = o.getImageData(0, 0, n, t).data, f = new Float32Array(n * t);
  for (let u = 0; u < t; u++) for (let i = 0; i < n; i++) f[u * n + i] = a[((t - 1 - u) * n + i) * 4 + 3] / 255;
  return f;
}
function qe(e, n, t, s, o) {
  let r = [e, n];
  for (let a = 0; a < s; a++) {
    let f = [r[0]];
    for (let u = 1; u < r.length; u++) {
      let i = r[u - 1], p = r[u], d = (i[0] + p[0]) / 2, m = (i[1] + p[1]) / 2, h = p[0] - i[0], g = p[1] - i[1], b = Math.hypot(h, g), y = (t() - 0.5) * b * o;
      f.push([d - g / b * y, m + h / b * y], p);
    }
    r = f;
  }
  return r;
}
async function Nt(e, n, t = null) {
  let s = Math.round(n.w * bt / 2), o = Math.round(n.h * bt / 2), r = ye(s, o, !0), a = r.getContext("2d");
  a.fillStyle = "#fff", a.fillRect(0, 0, s, o);
  let f = ye(s, o, !0), u = f.getContext("2d");
  u.fillStyle = "#000", u.fillRect(0, 0, s, o);
  let i = W(e.seed * 13 + 3);
  if (a.fillStyle = "#000", u.strokeStyle = "#fff", u.lineWidth = 2.2, u.filter = "blur(0.8px)", e.type === "form")
    for (let w = 22; w < o - 6; w += 24) [15, s - 15].forEach((l) => {
      a.beginPath(), a.arc(l, w, 5.5, 0, Math.PI * 2), a.fill();
    });
  if (e.type === "notebook") {
    let w = qe([4, 0], [4, o], i, 7, 0.05);
    a.beginPath(), a.moveTo(0, 0), w.forEach((l) => a.lineTo(l[0] + i() * 2, l[1])), a.lineTo(0, o), a.closePath(), a.fill();
    for (let l = 18; l < o; l += 22)
      a.beginPath(), a.arc(2, l, 5 + i() * 1.5, 0, Math.PI * 2), a.fill();
    u.beginPath(), w.forEach((l, k) => k ? u.lineTo(l[0] + 1, l[1]) : u.moveTo(l[0] + 1, l[1])), u.stroke();
  }
  if (e.type === "envelope") {
    let w = n.flap / n.h * o;
    a.beginPath(), a.moveTo(-2, -2), a.lineTo(s / 2, -2), a.lineTo(s / 2, 3), a.lineTo(-2, w), a.closePath(), a.fill(), a.beginPath(), a.moveTo(s + 2, -2), a.lineTo(s / 2, -2), a.lineTo(s / 2, 3), a.lineTo(s + 2, w), a.closePath(), a.fill();
  }
  if (e.type === "punchcard") {
    a.beginPath(), a.moveTo(-2, -2), a.lineTo(26, -2), a.lineTo(-2, 26), a.closePath(), a.fill();
    let w = (e.text.split(`
`)[0] || "").slice(0, 80), l = 17, C = (s - 17 - l) / 79, N = o * 0.23, I = (o * 0.94 - N) / 11;
    for (let B = 0; B < w.length; B++) {
      let te = Zt(w[B]), ee = l + B * C;
      for (let P of te) {
        let D = N + P * I;
        a.fillRect(ee - 2.5, D - 5, 5, 10);
      }
    }
  }
  if (e.type === "parchment") {
    let w = qe([-2, 3], [s + 2, 3], i, 5, 0.1), l = qe([-2, o - 3], [s + 2, o - 3], i, 5, 0.1), k = qe([3, -2], [3, o + 2], i, 5, 0.1), C = qe([s - 3, -2], [s - 3, o + 2], i, 5, 0.1);
    u.lineWidth = 2.5, [w, l, k, C].forEach((N) => {
      u.beginPath(), N.forEach((I, B) => B ? u.lineTo(I[0], I[1]) : u.moveTo(I[0], I[1])), u.stroke();
    });
  }
  if (e.states.includes("torn")) {
    let w = Math.floor(i() * 3), l, k, C;
    w === 0 ? (l = [s * (0.5 + 0.25 * i()), -2], k = [s + 2, o * (0.2 + 0.25 * i())], C = [[s + 2, -2]]) : w === 1 ? (l = [-2, o * (0.72 + 0.12 * i())], k = [s + 2, o * (0.72 + 0.12 * i())], C = [[s + 2, o + 2], [-2, o + 2]]) : (l = [s * (0.3 + 0.25 * i()), o + 2], k = [-2, o * (0.55 + 0.2 * i())], C = [[-2, o + 2]]);
    let N = qe(l, k, i, 8, 0.22);
    a.beginPath(), N.forEach((I, B) => B ? a.lineTo(I[0], I[1]) : a.moveTo(I[0], I[1])), C.forEach((I) => a.lineTo(I[0], I[1])), a.closePath(), a.fill(), u.lineWidth = 3.2, u.beginPath(), N.forEach((I, B) => B ? u.lineTo(I[0], I[1]) : u.moveTo(I[0], I[1])), u.stroke();
  }
  let p = a.getImageData(0, 0, s, o).data, d = u.getImageData(0, 0, s, o).data, m = t ? await mt.run("burn", [{ seed: e.seed, form: t === "singed" ? "singed" : e.burn }, s, o]) : null, h = a.createImageData(s, o), g = h.data, b = [], y = 1 / 0;
  for (let w = 0; w < o; w++) for (let l = 0; l < s; l++) {
    let k = (w * s + l) * 4;
    if (g[k] = p[k], g[k + 1] = 0, g[k + 2] = d[k], m) {
      let C = m[w * s + l];
      g[k + 3] = Math.round($(C / 1.4) * 255), y = Math.min(y, C), t === "burn" && l % 3 === 0 && w % 3 === 0 && p[k] > 128 && b.push((l + 0.5) / s, 1 - (w + 0.5) / o, C);
    } else g[k + 3] = 255;
  }
  let v = ye(s, o);
  return v.getContext("2d").putImageData(h, 0, 0), { canvas: v, burnPts: t === "burn" ? new Float32Array(b) : null, lo: m ? Math.max(0, y) : 0 };
}

// .build/shaders.js
var Wt = `#version 300 es
precision highp float;in vec2 aXY;uniform sampler2D uH;uniform int uShape;uniform float uP,uK0,uKres,uA0,uAres,uScale,uSeedA,uSquash,uRoll,uCurl,uTear,uStubX,uIsStub,uFoldSide,uFoldBw,uFoldY,uEdge,uThick;uniform vec2 uHalf;uniform mat4 uModel,uProj;out vec3 vPos;out vec3 vNrm;out vec2 vUv;out float vE;out float vAmp;out float vStress;float Hf(vec2 xy){return textureLod(uH,xy/(2.0*uHalf)+0.5,0.0).r;}vec3 rotY(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x+s*v.z,v.y,-s*v.x+c*v.z);}vec3 rotZ(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x-s*v.y,s*v.x+c*v.y,v.z);}vec3 bend(float d,float th,float bw){float t=max(abs(th),1e-4),R=bw/t,L=R*t;if(d<L){float a=d/R;return vec3(R*sin(a),R*(1.0-cos(a)),a);}return vec3(R*sin(t)+(d-L)*cos(t),R*(1.0-cos(t))+(d-L)*sin(t),t);}float foldStress(vec2 xy){float bw=max(uFoldBw,0.008);if(uShape==3){return max(smoothstep(bw*2.2,0.0,abs(xy.x)),smoothstep(bw*3.2,0.0,abs(xy.y)));}else if(uShape==4){return smoothstep(bw*2.2,0.0,abs(xy.x));}else if(uShape==5){float y3=uHalf.y/3.0;return max(smoothstep(bw*2.2,0.0,abs(xy.y+y3*1.08)),smoothstep(bw*3.2,0.0,abs(xy.y-y3)));}else if(uShape==6){return smoothstep(bw*2.2,0.0,abs(xy.y-uFoldY));}else if(uShape==7){float x3=uHalf.x*0.333;return max(smoothstep(bw*2.2,0.0,abs(xy.x+x3)),max(smoothstep(bw*2.6,0.0,abs(xy.x)),smoothstep(bw*3.2,0.0,abs(xy.x-x3))));}else if(uShape==8){return max(smoothstep(bw*2.2,0.0,abs(xy.x)),smoothstep(bw*2.6,0.0,abs(xy.y)));}return 0.0;}void foldX(inout vec3 p,inout vec3 n,float x0,float s,float th,float bw){float d=(p.x-x0)*s;if(d<=0.0||abs(th)<1e-4)return;vec3 c=bend(d,th,bw);float g=sign(th),ca=cos(c.z),sa=g*sin(c.z),z0=p.z;p.x=x0+s*(c.x-sa*z0);p.z=g*c.y+ca*z0;n=vec3(ca*n.x-s*sa*n.z,n.y,s*sa*n.x+ca*n.z);}void foldY(inout vec3 p,inout vec3 n,float y0,float s,float th,float bw){float d=(p.y-y0)*s;if(d<=0.0||abs(th)<1e-4)return;vec3 c=bend(d,th,bw);float g=sign(th),ca=cos(c.z),sa=g*sin(c.z),z0=p.z;p.y=y0+s*(c.x-sa*z0);p.z=g*c.y+ca*z0;n=vec3(n.x,ca*n.y-s*sa*n.z,s*sa*n.y+ca*n.z);}vec3 place(vec2 xy,out float e,out float amp,out vec3 n){vec3 p=vec3(xy,0.0);n=vec3(0.0,0.0,1.0);if(uShape==0){float s=length(xy),sn=s/length(uHalf);float q=clamp(uP*1.5-sn*0.5+0.14*sn*sin(atan(xy.y,xy.x)*3.0+uSeedA),0.0,1.0);e=q*q*(3.0-2.0*q);float k=mix(uKres,uK0,(1.0-e)*(1.0-e));if(s>1e-6){float th=s*k,st=sin(th),ct=cos(th);vec2 dir=xy/s;n=vec3(st*dir,ct);p=vec3(st/k*dir,(ct-1.0)/k);}float sq=mix(uSquash,1.0,e);float expan=mix(1.0+(1.0-uSquash)*0.3,1.0,e);p.z*=sq;p.xy*=expan;n=normalize(vec3(n.xy/expan,n.z/sq));amp=mix(uA0,uAres,pow(e,2.2));}else if(uShape==1){e=uP;float L=2.0*uHalf.x*e,s=xy.x+uHalf.x;if(s>L){float ph=(s-L)/uRoll;float r=uRoll*(1.0-0.07*ph/6.2831853);p=vec3(L-uHalf.x+r*sin(ph),xy.y,r*(1.0-cos(ph)));n=vec3(-sin(ph),0.0,cos(ph));}p.x+=(uHalf.x-uRoll)*(1.0-e);amp=mix(uA0,uAres,e);}else if(uShape==2){e=uP;float k=uK0*(1.0-e)*(1.0-e);if(k>1e-2){float a=(xy.y+uHalf.y)*k;float r=1.0/k-uRoll*a/6.2831853;vec2 ax=vec2(-uHalf.y,-1.0/k);p=vec3(xy.x,ax.x+r*sin(a),ax.y+r*cos(a));n=vec3(0.0,sin(a),cos(a));float g=pow(1.0-e,3.0);float axv=abs(xy.x)/uHalf.x;float neck=smoothstep(0.5,0.8,axv),fl=smoothstep(0.82,1.0,axv);float sc=mix(1.0,mix(1.0,0.17*(1.0+3.2*fl),neck),g);float tw=sign(xy.x)*(neck*3.4+fl*1.3)*g;float c=cos(tw),sn=sin(tw);vec2 rv=(p.yz-ax)*sc;p.yz=ax+vec2(c*rv.x-sn*rv.y,sn*rv.x+c*rv.y);n.yz=vec2(c*n.y-sn*n.z,sn*n.y+c*n.z);n=normalize(n);}p.y+=uHalf.y*(1.0-e);p.z+=(1.0/uK0)*(1.0-e);amp=mix(uA0,uAres,e);}else if(uShape==6){e=uP;foldY(p,n,uFoldY,1.0,mix(3.12,-1.1,smoothstep(0.0,1.0,e)),uFoldBw);p.y-=(uFoldY-uHalf.y)*0.5;amp=mix(uA0,uAres,e);}else if(uShape==7){e=uP;float em=smoothstep(0.0,1.0,e);float a=3.12*(1.0-em);float x3=uHalf.x*0.333;foldX(p,n,-x3,-1.0,a,uFoldBw);foldX(p,n,0.0,1.0,-a,uFoldBw*1.5);foldX(p,n,x3,1.0,a,uFoldBw*2.0);p.x*=mix(0.28,1.0,em);amp=mix(uA0,uAres,e);}else if(uShape==8){e=uP;float em=smoothstep(0.0,1.0,e);float a=3.12*(1.0-em);foldX(p,n,0.0,1.0,a,uFoldBw);foldY(p,n,0.0,-1.0,a,uFoldBw*1.5);p.xy*=mix(0.58,1.0,em);amp=mix(uA0,uAres,e);}else{e=uP;float e2=smoothstep(0.0,0.5,e),e1=smoothstep(0.5,1.0,e);if(uShape==3){foldX(p,n,0.0,1.0,3.12*(1.0-e1),uFoldBw);foldY(p,n,0.0,1.0,3.12*(1.0-e2),uFoldBw*2.6);p.x+=uHalf.x*0.5*(1.0-e1);p.y+=uHalf.y*0.5*(1.0-e2);}else if(uShape==4){float em=smoothstep(0.0,1.0,e);foldX(p,n,0.0,uFoldSide,3.12*(1.0-em),uFoldBw);p.x+=uFoldSide*uHalf.x*0.5*(1.0-em);}else{float y3=uHalf.y/3.0;foldY(p,n,-y3*1.08,-1.0,3.12*(1.0-e1),uFoldBw);foldY(p,n,y3,1.0,3.12*(1.0-e2),uFoldBw*2.6);}amp=mix(uA0,uAres,e);}p+=n*Hf(xy)*amp;if(uIsStub>0.5&&uTear>0.0){vec3 piv=vec3(uStubX,0.0,0.0);p=rotY(rotZ(p-piv,-0.55*uTear),0.6*uTear)+piv+vec3(0.08*uTear,-1.1*uTear*uTear,0.12*uTear);n=rotY(rotZ(n,-0.55*uTear),0.6*uTear);}p.z-=uCurl*p.x*p.x;n=normalize(vec3(n.x+2.0*uCurl*p.x*n.z,n.y,n.z));return p;}void main(){float e,amp;vec3 nrm;vec3 p0=place(aXY,e,amp,nrm);if(uEdge>0.5)p0-=nrm*uThick*(nrm.z>=0.0?1.0:-1.0);vec4 w=uModel*vec4(p0,1.0);vPos=w.xyz;vNrm=mat3(uModel)*nrm;vUv=aXY/(2.0*uHalf)+0.5;vE=uShape==0?pow(e,2.2):e;vAmp=amp*uScale;vStress=foldStress(aXY);gl_Position=uProj*w;}`, en = `#version 300 es
precision highp float;in vec3 vPos;in vec3 vNrm;in vec2 vUv;in float vE;in float vAmp;in float vStress;uniform sampler2D uH,uPrintF,uPrintB,uFx,uGrain;uniform vec2 uGrainK;uniform vec3 uCam,uColor,uL,uLampPos;uniform float uBump,uAge,uTime,uThru,uFront,uInkMax,uEdge,uDestroy,uLamp,uLampR;out vec4 frag;float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}vec3 perturb(vec3 pos,vec3 n,vec2 dH){vec3 sx=dFdx(pos),sy=dFdy(pos);vec3 r1=cross(sy,n),r2=cross(n,sx);float det=dot(sx,r1);return normalize(abs(det)*n-sign(det)*(dH.x*r1+dH.y*r2));}void main(){vec4 fx=texture(uFx,vUv);float pres=fx.r,sc=0.0;if(uFront>-0.5){float b=fx.a*1.4;pres=min(pres,smoothstep(uFront-0.004,uFront+0.012,b));sc=1.0-smoothstep(uFront,uFront+0.17,b);}if(pres<0.4)discard;float a=smoothstep(0.4,0.6,pres);bool front=gl_FrontFacing;vec3 n=normalize(vNrm)*(front?1.0:-1.0);vec3 L=normalize(uL);if(uEdge>0.5){float w=clamp((dot(n,L)+0.3)/1.3,0.0,1.0);vec3 ec=mix(uColor*vec3(0.8,0.76,0.7),vec3(0.08,0.06,0.05),smoothstep(0.55,0.9,sc))*(0.45+0.55*w);frag=vec4(ec*a,a);return;}vec4 h0=texture(uH,vUv);vec2 du=dFdx(vUv),dv=dFdy(vUv);vec4 hx=texture(uH,vUv+du),hy=texture(uH,vUv+dv);vec4 hx2=texture(uH,vUv-du),hy2=texture(uH,vUv-dv);vec3 toP=uLampPos-vPos;vec3 Lp=normalize(toP);float pool=pow(1.0-smoothstep(0.0,1.0,length(toP.xy)/uLampR),1.3)*uLamp;float grazD=clamp((1.0-L.z-0.4)/0.5,0.0,1.0);float grazP=smoothstep(0.2,0.75,1.0-Lp.z)*pool;float ink=uInkMax*mix(grazD,grazP*3.0,uLamp);vec2 dH=vec2(hx.r-h0.r,hy.r-h0.r)*vAmp*uBump*(1.0+1.6*pool)-vec2(hx.g-h0.g,hy.g-h0.g)*ink;n=perturb(vPos,n,dH);vec3 V=normalize(uCam-vPos);float wrap=clamp((dot(n,L)+0.08)/1.08,0.0,1.0);float wrapP=max(dot(n,Lp),0.0);float backL=max(0.0,-dot(n,L));float backLp=max(0.0,-dot(n,Lp))*pool;float backlight=backL+backLp*1.8;float ao=mix(1.0,0.42+0.58*smoothstep(-0.55,0.35,h0.r),1.0-vE);float fib=hash(floor(vUv*vec2(900.0,1180.0)));vec2 eu=min(vUv,1.0-vUv);float edge=smoothstep(0.0,0.05,min(eu.x,eu.y));vec3 col0=mix(uColor,uColor*vec3(0.93,0.84,0.66),uAge);vec3 alb=col0*(0.975+0.025*fib)*(0.93+0.07*edge);alb*=1.0+(texture(uGrain,vUv*uGrainK).r-0.94)*1.8;if(!front)alb*=0.9;float ridgeCurv=max(0.0,-((hx.r+hx2.r-2.0*h0.r)+(hy.r+hy2.r-2.0*h0.r)));float creaseStress=clamp(ridgeCurv*vAmp*140.0,0.0,1.0);float totalStress=clamp(vStress*0.75+creaseStress*0.6,0.0,1.0);float whitening=smoothstep(0.12,0.82,totalStress)*0.28;vec3 bleachCol=mix(vec3(0.985,0.98,0.96),vec3(1.0),fib*0.5);alb=mix(alb,max(alb,bleachCol),whitening);vec2 uvB=vec2(1.0-vUv.x,vUv.y);vec4 tF=texture(uPrintF,vUv),tB=texture(uPrintB,uvB);vec4 pr=front?tF:tB;vec4 th=front?tB:tF;float thruFactor=clamp(uThru*(1.0+3.2*backlight),0.0,0.92);vec3 inkSilhouette=mix(th.rgb,th.rgb*0.3+vec3(0.02),clamp(backlight*1.5,0.0,0.8));alb=mix(alb,inkSilhouette,th.a*thruFactor);alb+=col0*(uThru*(backL*0.4+backLp*0.7))*(1.0-th.a*0.85);alb=mix(alb,pr.rgb,pr.a);alb=mix(alb,vec3(0.45,0.29,0.13),smoothstep(0.12,0.55,sc)*0.85);alb=mix(alb,vec3(0.06,0.045,0.04),smoothstep(0.55,0.9,sc));alb=mix(alb,vec3(0.99,0.985,0.96),fx.b*0.85);vec3 key=vec3(1.0,0.965,0.9),amb=vec3(0.62,0.64,0.7);vec3 warm=vec3(1.0,0.9,0.74);vec3 base=amb*0.3*ao+key*1.04*wrap*mix(1.0,ao,0.7)*mix(1.0,0.55,uLamp);base+=key*0.45*backL*uThru*mix(1.0,ao,0.5);float spot=wrapP*pool*mix(1.0,ao,0.5);vec3 col=alb*(base+warm*spot*max(vec3(0.0),vec3(1.15)-base));col+=key*0.03*pow(max(dot(n,normalize(L+V)),0.0),24.0)*(1.0-0.5*uLamp);col+=warm*0.06*pow(max(dot(n,normalize(Lp+V)),0.0),30.0)*pool;float rim=(1.0-smoothstep(0.42,0.66,pres))*smoothstep(0.6,0.95,sc);float fl=0.55+0.45*sin(uTime*6.0+vUv.x*37.0+vUv.y*23.0)*sin(uTime*2.3+vUv.y*51.0);col+=vec3(1.0,0.42,0.08)*rim*fl*(1.7+1.6*uDestroy);frag=vec4(col*a,a);}`, tn = `#version 300 es
in vec2 aQ;uniform vec3 uC;uniform vec2 uHS;uniform float uSoft;uniform mat4 uProj;out vec2 vL;void main(){vL=aQ*(uHS+vec2(uSoft*3.0));gl_Position=uProj*vec4(uC+vec3(vL,0.0),1.0);}`, nn = `#version 300 es
precision highp float;in vec2 vL;uniform vec2 uHS;uniform float uR,uSoft,uA,uOpen,uFront,uFlip;uniform sampler2D uFx;out vec4 frag;float paperAt(vec2 uv){vec4 fx=texture(uFx,clamp(uv,0.0,1.0));return uFront>-0.5?min(fx.r,smoothstep(uFront-0.004,uFront+0.012,fx.a*1.4)):fx.r;}void main(){vec2 q=abs(vL)-uHS+vec2(uR);float d=length(max(q,0.0))+min(max(q.x,q.y),0.0)-uR;float pres=1.0;if(uOpen>0.0){vec2 uv=vL/(2.0*uHS)+0.5,o=vec2(uSoft)/(2.0*uHS);if(uFlip>0.5)uv.x=1.0-uv.x;float p=paperAt(uv)*2.0+paperAt(uv+vec2(o.x,0.0))+paperAt(uv-vec2(o.x,0.0))+paperAt(uv+vec2(0.0,o.y))+paperAt(uv-vec2(0.0,o.y));pres=mix(1.0,p/6.0,uOpen);}frag=vec4(0.0,0.0,0.0,uA*pres*(1.0-smoothstep(-uSoft,uSoft*2.5,d)));}`, on = `#version 300 es
in vec3 aP;in vec4 aC;in float aS;uniform mat4 uProj;uniform float uPx;out vec4 vC;void main(){gl_Position=uProj*vec4(aP,1.0);gl_PointSize=max(1.0,aS*uPx/gl_Position.w);vC=aC;}`, rn = `#version 300 es
precision highp float;in vec4 vC;out vec4 frag;void main(){float a=smoothstep(0.5,0.05,length(gl_PointCoord-0.5))*vC.a;frag=vec4(vC.rgb*a,a);}`;

// .build/sound.js
var fe = /* @__PURE__ */ (() => {
  let e = null, n = null, t = null, s = null, o = he.get("sound", !1), r = {}, a = {}, f = () => {
    if (!e) {
      let h = window.AudioContext || window.webkitAudioContext;
      if (!h) return null;
      e = new h(), n = e.createGain(), n.gain.value = 0.6;
      let g = e.createBiquadFilter();
      g.type = "peaking", g.frequency.value = 420, g.Q.value = 2.4, g.gain.value = 3.5, n.connect(g), g.connect(e.destination), t = e.createBuffer(1, e.sampleRate, e.sampleRate);
      let b = t.getChannelData(0), y = 0, v = 0;
      for (let w = 0; w < b.length; w++) {
        let l = Math.random() * 2 - 1;
        y = 0.99 * y + l * 0.05, v = 0.95 * v + l * 0.1, b[w] = (y + v + l * 0.15) * 1.6;
      }
    }
    return e.state === "suspended" && e.resume(), e;
  };
  function u() {
    return s || !e || (s = Promise.all(Object.entries(r).map(([h, g]) => fetch(g).then((b) => b.ok ? b.arrayBuffer() : Promise.reject(new Error(h))).then((b) => e.decodeAudioData(b)).then((b) => {
      a[h] = b;
    }).catch(() => {
    })))), s;
  }
  function i(h, g, b = {}) {
    let y = a[h];
    if (!y) return !1;
    let v = e.createBufferSource();
    v.buffer = y, v.playbackRate.value = b.rate || 1;
    let w = e.createGain();
    return w.gain.value = b.gain ?? 1, v.connect(w), w.connect(n), v.start(g, b.offset || 0, b.dur), !0;
  }
  function p(h, g, b, y, v) {
    let w = e.createBufferSource();
    w.buffer = t;
    let l = e.createBiquadFilter();
    l.type = "bandpass", l.frequency.value = b, l.Q.value = y;
    let k = e.createGain();
    k.gain.setValueAtTime(1e-4, h), k.gain.linearRampToValueAtTime(v, h + 2e-3), k.gain.exponentialRampToValueAtTime(1e-4, h + g), w.connect(l), l.connect(k), k.connect(n), w.start(h, Math.random() * 0.9, g + 0.03);
  }
  function d(h, g, b, y, v) {
    let w = e.createBufferSource();
    w.buffer = t, w.loop = !0;
    let l = e.createBiquadFilter();
    l.type = "bandpass", l.Q.value = 0.8, l.frequency.setValueAtTime(b, h), l.frequency.linearRampToValueAtTime(y, h + g);
    let k = e.createGain();
    k.gain.setValueAtTime(1e-4, h), k.gain.linearRampToValueAtTime(v, h + g * 0.15), k.gain.linearRampToValueAtTime(1e-4, h + g), w.connect(l), l.connect(k), k.connect(n), w.start(h), w.stop(h + g + 0.05);
  }
  function m(h, g, b, y, v, w) {
    let l = Math.round(g * b);
    for (let k = 0; k < l; k++) {
      let C = Math.random();
      w && (C = C * C), p(h + C * g, 6e-3 + Math.random() * 0.03, 1500 + Math.random() * 4500 * y, 0.7 + Math.random() * 2.2, v * (0.25 + Math.random() * 0.75));
    }
  }
  return {
    get enabled() {
      return o;
    },
    set(h) {
      o = !!h, he.set("sound", o), o && f() && u();
    },
    // optional real recordings: { crumple, sheet, tear } (URLs)
    useSamples(h) {
      r = { ...h }, s = null, o && e && u();
    },
    // names: crumple, uncrumple, flip, tear, seal, fire, grain
    play(h, g = 1, b = 0) {
      if (!o || !f()) return;
      u();
      let y = e.currentTime + b, v = (w) => !!a[w];
      if (h === "crumple")
        if (v("crumple")) {
          let w = Math.max(2, Math.round(g * 4));
          for (let l = 0; l < w; l++) i("crumple", y + l / w * g * 0.85, { gain: 0.6 + Math.random() * 0.35, rate: 0.85 + Math.random() * 0.35 });
          m(y, g, 25, 1, 0.1, !0);
        } else
          m(y, g, 90, 1, 0.32, !0), d(y, g, 2400, 1200, 0.07);
      else if (h === "uncrumple")
        if (v("sheet")) {
          let w = Math.max(2, Math.round(g * 2.5));
          for (let l = 0; l < w; l++) i(l % 2 && v("crumple") ? "crumple" : "sheet", y + l / w * g * 0.9, { gain: 0.4 + Math.random() * 0.25, rate: 0.75 + Math.random() * 0.25 });
        } else
          m(y, g, 46, 0.8, 0.26, !1), d(y, g, 1400, 2600, 0.05);
      else h === "flip" ? i("sheet", y, { gain: 0.8, rate: 1.15 }) || (d(y, 0.38, 500, 2400, 0.16), p(y + 0.34, 0.05, 900, 1, 0.22)) : h === "tear" ? i("tear", y, { gain: 1 }) || (d(y, 0.45, 1800, 3600, 0.18), m(y, 0.45, 160, 1.2, 0.3, !1)) : h === "seal" ? (i("tear", y, { gain: 0.45, rate: 1.7, dur: 0.16 }) || p(y, 0.05, 1200, 2, 0.3), i("sheet", y + 0.2, { gain: 0.5, rate: 0.9 }) || d(y + 0.2, 0.5, 700, 2200, 0.08)) : h === "fire" ? (m(y, g, 22, 0.45, 0.16, !1), d(y, g, 500, 800, 0.05)) : h === "grain" && (i("crumple", y, { gain: 0.22, rate: 1.2 + Math.random() * 0.4, offset: Math.random() * 0.3, dur: 0.08 }) || m(y, 0.06, 60, 1, 0.2, !1));
    }
  };
})();

// .build/motion.js
function ue(e, n, t, s, o = ge, r = 0, a) {
  e.tw = e.tw.filter((f) => f.key !== n), e.tw.push({ key: n, to: t, dur: Math.max(1e-3, s), ease: o, start: performance.now() + r * 1e3, from: null, done: a });
}
function yt(e, n) {
  let t = !1, s = [];
  return e.tw = e.tw.filter((o) => {
    if (t = !0, n < o.start) return !0;
    o.from === null && (o.from = e[o.key]);
    let r = $((n - o.start) / (o.dur * 1e3));
    return e[o.key] = o.from + (o.to - o.from) * o.ease(r), r >= 1 ? (o.done && s.push(o.done), !1) : !0;
  }), s.forEach((o) => o()), t;
}
function We(e) {
  if (e.cfg.type === "envelope") return 0.34;
  let n = e.F.shape;
  return n === 0 ? 0.42 : n === 2 ? 0.35 : 0.3;
}
function et(e, n) {
  let t = pe($(n));
  return 2 * Math.max(e.F.ext[0] / 2 + (e.half[0] - e.F.ext[0] / 2) * t, e.F.ext[1] / 2 + (e.half[1] - e.F.ext[1] / 2) * t);
}
function an(e, n) {
  let t = pe($(e.cfg.type === "envelope" ? n * 2 : n)), s = [0, 0, -0.02];
  return e.pose.map((o, r) => o * (1 - t) + s[r] * t);
}
function He(e, n, t) {
  let s = (w, l = 0) => n.destroy !== void 0 ? n.destroy : w.front0 > -0.5 ? w.front0 + w.burned + l : -1, o = n.destroy !== void 0 ? $((1.25 - n.destroy) / 0.9) : 1;
  if (e.cfg.type !== "envelope") {
    let w = { ...t, p: n.p, f: n.f, tear: n.tear, front: s(e, n.burnOpen || 0), destroy: n.destroy !== void 0, alpha: o };
    return { items: [{ P: e, st: w }], shadow: { P: e, st: w }, active: { P: e, st: w } };
  }
  let r = e.letter, a = n.p, f = pe($(a / 0.24)), u = pe($((a - 0.14) / 0.36)), i = pe($((a - 0.44) / 0.32)), p = $((a - 0.58) / 0.42), d = { ...t, p: f, f: n.f, tear: 0, cy: t.cy - i * t.vhU * 0.8, rot: [t.rot[0], t.rot[1], t.rot[2] + i * 0.45], front: s(e) }, m = -0.08 + u * 0.5, h = -0.035 * (1 - i), g = Math.PI * De($(n.f)), b = [0, 0, -0.02], y = { ...t, cx: xe(d.cx, 0, i), cy: xe(d.cy, 0, i), sc: xe(d.sc, t.scLetter, i), rot: d.rot.map((w, l) => xe(w, b[l] + (t.adjust ? t.adjust[l] : 0), i)), local: [-Math.sin(g) * h, m * (1 - i), Math.cos(g) * h], p: Lt(p), f: n.f, tear: 0, front: s(r, n.burnOpen || 0), destroy: n.destroy !== void 0, alpha: o };
  return { items: i >= 0.999 ? [{ P: r, st: y }] : a < 0.01 ? [{ P: e, st: d }] : [{ P: e, st: d }, { P: r, st: y }], shadow: i < 0.5 ? { P: e, st: d } : { P: r, st: y }, active: i < 0.5 ? { P: e, st: d } : { P: r, st: y } };
}
function tt(e, n, t, s, o, r = 0, a = 0) {
  let f = pe($(n.p)), u = (e.F.ext[0] / 2 + (e.half[0] - e.F.ext[0] / 2) * f) * n.sc * t * 1.1, i = (e.F.ext[1] / 2 + (e.half[1] - e.F.ext[1] / 2) * f) * n.sc * t * 1.1, p = r + s / 2 + n.cx * t, d = a + o / 2 - n.cy * t;
  return { cx: p, cy: d, x0: p - u, x1: p + u, y0: d - i, y1: d + i, w1: e.half[0] * 2 * n.sc * t, h1: e.half[1] * 2 * n.sc * t };
}
function vt(e, n, t, s) {
  let { P: o, st: r } = t.active, a = n.p - (n.pPrev ?? n.p), f = pe($(r.p)), u = (o.F.ext[0] / 2 + (o.half[0] - o.F.ext[0] / 2) * f) * r.sc, i = (o.F.ext[1] / 2 + (o.half[1] - o.F.ext[1] / 2) * f) * r.sc;
  if (a > 5e-4 && n.p > 0.12 && n.p < 0.97) {
    let d = Math.min(8, Math.round(a * 300));
    for (let m = 0; m < d; m++) e.emit({ x: r.cx + (Math.random() - 0.5) * 2 * u, y: r.cy + (Math.random() - 0.5) * 2 * i, z: 0.06 * r.sc, vx: (Math.random() - 0.5) * 0.05 * r.sc, vy: (Math.random() * 0.04 + 0.01) * r.sc, ay: -0.01 * r.sc, r: 0.93, g: 0.9, b: 0.84, a: 0.5, s: (5e-3 + Math.random() * 8e-3) * r.sc, t: 0, life: 1.2 + Math.random() * 0.9 });
  }
  let p = r.front;
  if (p > -0.5 && o.burnPts && r.p > 0.9) {
    let d = n.destroy !== void 0;
    n.acc = (n.acc || 0) + s * (d ? 110 : 9);
    let m = o.burnPts, h = m.length / 3, g = Math.cos(r.rot[2]), b = Math.sin(r.rot[2]);
    for (; n.acc >= 1; ) {
      n.acc -= 1;
      let y = -1;
      for (let C = 0; C < 40; C++) {
        let N = Math.floor(Math.random() * h);
        if (Math.abs(m[N * 3 + 2] - p) < 0.012) {
          y = N;
          break;
        }
      }
      if (y < 0) continue;
      let v = (m[y * 3] - 0.5) * o.w * r.sc, w = (m[y * 3 + 1] - 0.5) * o.h * r.sc, l = r.cx + g * v - b * w, k = r.cy + b * v + g * w;
      e.emit({ x: l, y: k, z: 0.02 * r.sc, vx: (Math.random() - 0.5) * 0.08 * r.sc, vy: (0.06 + Math.random() * 0.1) * r.sc, ay: 0.06 * r.sc, r: 1, g: 0.5 + Math.random() * 0.3, b: 0.12, a: 1, s: (3e-3 + Math.random() * 5e-3) * r.sc, t: 0, life: 0.5 + Math.random() * 0.8, flicker: !0 }), d && Math.random() < 0.45 && e.emit({ x: l, y: k, z: 0.02 * r.sc, vx: (Math.random() - 0.5) * 0.06 * r.sc, vy: -(0.02 + Math.random() * 0.05) * r.sc, ay: -0.05 * r.sc, r: 0.2, g: 0.19, b: 0.18, a: 0.85, s: (8e-3 + Math.random() * 0.012) * r.sc, t: 0, life: 1.4 + Math.random() * 1.1 });
    }
  }
}
function Tt(e, n) {
  let t = /* @__PURE__ */ new Map(), s = [], o = null, r = () => {
    let [i, p] = [...t.values()];
    return Math.hypot(i.x - p.x, i.y - p.y);
  }, a = (i) => {
    let p = n.active();
    if (!p) return;
    let d = n.box();
    if (!(d && i.clientX > d.x0 && i.clientX < d.x1 && i.clientY > d.y0 && i.clientY < d.y1) && !t.size) {
      n.outside(i);
      return;
    }
    if (!t.size && n.tap && n.tap(i)) return;
    t.set(i.pointerId, { x: i.clientX, y: i.clientY });
    try {
      e.setPointerCapture(i.pointerId);
    } catch {
    }
    p.tw = p.tw.filter((g) => g.key !== "p");
    let h = performance.now();
    t.size === 2 ? o = { pinch: !0, d0: r(), p0: p.p, moved: !0, last: p.p, box: d, tLast: h, lastX: i.clientX, lastY: i.clientY, vx: 0, vy: 0 } : o = { pinch: !1, r0: Math.hypot(i.clientX - d.cx, i.clientY - d.cy), p0: p.p, x: i.clientX, y: i.clientY, moved: !1, last: p.p, box: d, tLast: h, lastX: i.clientX, lastY: i.clientY, vx: 0, vy: 0 };
  }, f = (i) => {
    if (!o || !t.has(i.pointerId)) return;
    t.set(i.pointerId, { x: i.clientX, y: i.clientY });
    let p = n.active();
    if (!p) {
      o = null, t.clear();
      return;
    }
    let d = performance.now(), m = d - o.tLast;
    m > 8 && (o.vx = (i.clientX - o.lastX) / m, o.vy = (i.clientY - o.lastY) / m, o.tLast = d, o.lastX = i.clientX, o.lastY = i.clientY);
    let h = 0.42 * Math.min(o.box.w1, o.box.h1);
    if (o.pinch && t.size === 2) p.p = $(o.p0 + (r() - o.d0) / h);
    else if (!o.pinch) {
      if (Math.hypot(i.clientX - o.x, i.clientY - o.y) > 6 && (o.moved = !0), !o.moved) return;
      p.p = $(o.p0 + (Math.hypot(i.clientX - o.box.cx, i.clientY - o.box.cy) - o.r0) / h);
    }
    Math.abs(p.p - o.last) > 0.035 && (fe.play("grain"), o.last = p.p), p.dragging = !0, n.redraw();
  }, u = (i) => {
    if (!t.has(i.pointerId)) return;
    if (t.delete(i.pointerId), t.size === 1 && o) {
      let b = [...t.values()][0], y = n.box ? n.box() : o.box;
      o.pinch = !1, o.x = b.x, o.y = b.y, o.r0 = Math.hypot(b.x - (y ? y.cx : o.x), b.y - (y ? y.cy : o.y)), o.p0 = n.active() ? n.active().p : o.p0;
      return;
    }
    if (t.size) return;
    let p = n.active(), d = o && o.moved, m = o ? o.p0 : 0, h = o && o.vx || 0, g = o && o.vy || 0;
    if (o = null, !!p) {
      if (p.dragging = !1, n.flip && m > 0.85 && Math.abs(h) > 0.2 && Math.abs(h) > 1.5 * Math.abs(g)) {
        p.p = 1, n.flip();
        return;
      }
      if (n.outside && g > 0.75) {
        n.outside(i);
        return;
      }
      d && (p.p >= 0.3 ? (fe.play("uncrumple", 0.4), ue(p, "p", 1, 0.45 * (1 - p.p) + 0.15, ze, 0, () => Ye(12))) : (fe.play("crumple", 0.35), ue(p, "p", 0, 0.35 * p.p + 0.12, ze, 0, () => Ye(18))), n.redraw());
    }
  };
  return [["pointerdown", a], ["pointermove", f], ["pointerup", u], ["pointercancel", u]].forEach(([i, p]) => ne(s, e, i, p)), () => s.splice(0).forEach((i) => i());
}
function nt(e, n, t, s, o, r, a) {
  let f = [(n - s / 2) / r, -(t - o / 2) / r, 0.09 * o / r];
  e.lampPos || (e.lampPos = f.slice()), e.lampGoal = f, e.lampOn = a ? 1 : 0, e.lampMoving = !0;
}
function St(e, n) {
  if (!e.lampGoal) return !1;
  let t = 1 - Math.exp(-n * 20), s = 1 - Math.exp(-n * 7), o = !1;
  for (let a = 0; a < 3; a++) {
    let f = e.lampGoal[a] - e.lampPos[a];
    Math.abs(f) > 1e-4 && (o = !0), e.lampPos[a] += f * t;
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
}, _e = 30 * Math.PI / 180, Ce = 10, Ve = [-0.45, 0.62, 0.65];
function Qn(e, n) {
  let t = n.w / 2, s = n.h / 2, o = Math.hypot(t, s);
  if (e === "flat") {
    let f = 0.78 * Math.PI / o, u = 1 / f;
    return { shape: 0, k0: f, squash: 0.3, roll: 0, A0: n.card ? 0.06 : 0.1, Ares: 45e-4, ext: [2.42 * u, 2.42 * u] };
  }
  if (e === "roll") {
    let f = Math.max(0.03, n.w * 0.085);
    return { shape: 1, k0: 0, squash: 1, roll: f, A0: 0.03, Ares: 4e-3, ext: [2.2 * f, n.h] };
  }
  if (e === "twist") {
    let f = 3.3 * Math.PI / n.h;
    return { shape: 2, k0: f, squash: 1, roll: 0.012, A0: 0.03, Ares: 45e-4, ext: [n.w, 2.6 / f] };
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
var Wn = (e) => e.states.includes("burnt") || e.burnAfterReading ? "burn" : e.states.includes("singed") ? "singed" : null, ln = { corner: [0.3, 0.06], edge: [0.035, 0.01], center: [0.09, 0.03], spots: [0.035, 0.01] };
function ot(e, n = {}) {
  let t = e.getContext("webgl2", { alpha: !0, premultipliedAlpha: !0, antialias: !0 });
  if (!t) return null;
  let s, o, r, a, f, u, i, p = !1, d = !1, m = (S, E) => {
    let A = (H, K) => {
      let V = t.createShader(H);
      if (t.shaderSource(V, K), t.compileShader(V), !t.getShaderParameter(V, t.COMPILE_STATUS)) throw new Error(t.getShaderInfoLog(V));
      return V;
    }, z = t.createProgram();
    if (t.attachShader(z, A(t.VERTEX_SHADER, S)), t.attachShader(z, A(t.FRAGMENT_SHADER, E)), t.linkProgram(z), !t.getProgramParameter(z, t.LINK_STATUS)) throw new Error(t.getProgramInfoLog(z));
    let _ = {}, L = t.getProgramParameter(z, t.ACTIVE_UNIFORMS);
    for (let H = 0; H < L; H++) {
      let K = t.getActiveUniform(z, H);
      _[K.name] = t.getUniformLocation(z, K.name);
    }
    return { p: z, u: _ };
  };
  function h() {
    s = m(Wt, en), o = m(tn, nn), r = m(on, rn), a = t.createVertexArray(), t.bindVertexArray(a), f = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, f), t.bufferData(t.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), t.STATIC_DRAW);
    let S = t.getAttribLocation(o.p, "aQ");
    t.enableVertexAttribArray(S), t.vertexAttribPointer(S, 2, t.FLOAT, !1, 0, 0), t.bindVertexArray(null), u = t.createVertexArray(), i = t.createBuffer(), t.bindVertexArray(u), t.bindBuffer(t.ARRAY_BUFFER, i), t.bufferData(t.ARRAY_BUFFER, 420 * 32, t.DYNAMIC_DRAW), [["aP", 3, 0], ["aC", 4, 12], ["aS", 1, 28]].forEach(([E, A, z]) => {
      let _ = t.getAttribLocation(r.p, E);
      t.enableVertexAttribArray(_), t.vertexAttribPointer(_, A, t.FLOAT, !1, 32, z);
    }), t.bindVertexArray(null);
  }
  h();
  let g = (S) => {
    S.preventDefault(), p = !0;
  }, b = () => {
    p = !1, h(), w = null, l = null, B = null, te = null, j = null, n.onRestore && n.onRestore();
  };
  e.addEventListener("webglcontextlost", g), e.addEventListener("webglcontextrestored", b);
  function y(S, E, A, z, _, L, H) {
    let K = [];
    for (let q = 0; q <= z; q++) K.push(S + (E - S) * q / z);
    L.forEach((q) => {
      q > S + 1e-6 && q < E - 1e-6 && K.push(q);
    }), K.sort((q, re) => q - re);
    let V = [];
    for (let q = 0; q <= _; q++) V.push(-A + 2 * A * q / _);
    H.forEach((q) => {
      q > -A + 1e-6 && q < A - 1e-6 && !V.some((re) => Math.abs(re - q) < 1e-6) && V.push(q);
    }), V.sort((q, re) => q - re);
    let Q = K.length, G = V.length, ie = new Float32Array(Q * G * 2), Y = 0;
    for (let q = 0; q < G; q++) for (let re = 0; re < Q; re++)
      ie[Y++] = K[re], ie[Y++] = V[q];
    let x = new Uint16Array((Q - 1) * (G - 1) * 6);
    Y = 0;
    for (let q = 0; q < G - 1; q++) for (let re = 0; re < Q - 1; re++) {
      let Ee = q * Q + re, $e = Ee + 1, Oe = Ee + Q, c = Oe + 1;
      x[Y++] = Ee, x[Y++] = $e, x[Y++] = c, x[Y++] = Ee, x[Y++] = c, x[Y++] = Oe;
    }
    let le = t.createVertexArray();
    t.bindVertexArray(le);
    let J = t.createBuffer();
    t.bindBuffer(t.ARRAY_BUFFER, J), t.bufferData(t.ARRAY_BUFFER, ie, t.STATIC_DRAW);
    let Se = t.getAttribLocation(s.p, "aXY");
    t.enableVertexAttribArray(Se), t.vertexAttribPointer(Se, 2, t.FLOAT, !1, 0, 0);
    let de = t.createBuffer();
    return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, de), t.bufferData(t.ELEMENT_ARRAY_BUFFER, x, t.STATIC_DRAW), t.bindVertexArray(null), { vao: le, count: x.length, bufs: [J, de] };
  }
  function v(S, E) {
    let A = t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, A), E.float ? (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1), t.texImage2D(t.TEXTURE_2D, 0, t.RG16F, E.w, E.h, 0, t.RG, t.FLOAT, S)) : (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, S), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1)), E.mip ? (t.generateMipmap(t.TEXTURE_2D), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR)) : t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), A;
  }
  let w = null, l = null, k = (S) => {
    let E = t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, E), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(S)), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), E;
  }, C = () => w || (w = k([0, 0, 0, 0])), N = () => l || (l = k([255, 0, 0, 255])), I = (S) => {
    S && S !== w && S !== l && t.deleteTexture(S);
  }, B = null, te = null;
  function ee() {
    return B || (B = k([240, 240, 240, 255]), te = Xe("grain").then((S) => {
      !S || d || (t.bindTexture(t.TEXTURE_2D, B), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, S), t.generateMipmap(t.TEXTURE_2D), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.REPEAT), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.REPEAT));
    }), B);
  }
  async function P(S) {
    let E = Ze(S), A = Pe[E.type];
    ee();
    let z = E.type === "envelope" ? P({ id: E.id + "-letter", type: E.letter, shape: "thirds", text: E.text, back: E.back, states: E.states.filter((U) => U !== "torn"), seed: E.seed + 1, hiddenInk: E.hiddenInk, burn: E.burn, burnAfterReading: E.burnAfterReading, stamp: E.stamp }) : null;
    await $t([A.font, "Caveat", "Courier Prime", "Special Elite"]);
    let _ = A.w / 2, L = A.h / 2, H = Qn(E.shape, A), K = Math.round(512 * A.w / 0.84), V = Math.round(K * A.h / A.w), Q = he.get("opens." + E.id, 0), G = W(E.seed * 7 + 1), ie = A.stub ? _ - A.w * A.stub : null, Y = A.body ? -L + A.body : 0, x = Math.max(16, Math.round(Math.sqrt(15e3 * A.w / A.h))), le = Math.max(16, Math.round(x * A.h / A.w)), J = [0], Se = [0, -A.h / 6 * 1.08, A.h / 6, Y];
    E.shape === "accordion" && J.push(-A.w / 6, A.w / 6);
    let de = [];
    if (ie !== null) {
      let U = Math.round(x * (ie + _) / A.w);
      de.push(y(-_, ie, L, U, le, J, Se)), de.push(y(ie, _, L, x - U, le, J, Se));
    } else de.push(y(-_, _, L, x, le, J, Se));
    let q = !(E.back || E.type === "notebook" || E.type === "form" || E.type === "envelope" || E.type === "newspaper" || E.type === "postcard" || E.type === "blueprint" || ["coffee", "water", "prints", "aged", "wine", "ink", "foxing", "faded", "staple", "grease", "dogear", "damp", "clip"].some((U) => E.states.includes(U))), re = Wn(E), Ee = !(E.type === "notebook" || E.type === "form" || E.type === "envelope" || E.type === "punchcard" || E.type === "parchment" || E.states.includes("torn") || re), [$e, Oe, c, T] = await Promise.all([
      mt.run("creases", [{ seed: E.seed, shape: E.shape, w: A.w, h: A.h, card: !!A.card, foldY: Y, states: E.states }, K, V]),
      Qe(E, A, "front", Q),
      q ? null : Qe(E, A, "back", Q),
      Ee ? null : Nt(E, A, re)
    ]), R = Qt(E, K, V), M = new Float32Array(K * V * 2);
    for (let U = 0; U < K * V; U++)
      M[U * 2] = $e[U], M[U * 2 + 1] = R ? R[U] : 0;
    let O = H.shape === 1 || H.shape === 2, F = {
      cfg: E,
      T: A,
      w: A.w,
      h: A.h,
      half: [_, L],
      F: H,
      stubX: ie,
      foldY: Y,
      meshes: de,
      openings: Q,
      tH: v(M, { float: !0, w: K, h: V }),
      tPF: v(Oe, { mip: !0 }),
      tPB: q ? C() : v(c, { mip: !0 }),
      tFx: Ee ? N() : v(T.canvas, {}),
      burnPts: Ee ? null : T.burnPts,
      // which burn field the effects hold: 'burn' (sparks, can burn away), 'singed' (rim only) or 'none' (ensureBurn adds one)
      fxBurn: re || "none",
      backEmpty: q,
      // estimated texture memory (front and back with mipmaps, effects, creases in RG16F)
      bytes: Math.round(Oe.width * Oe.height * 4 * 1.33 * (q ? 1 : 2) + (Ee ? 0 : T.canvas.width * T.canvas.height * 4) + K * V * 4),
      // folded and elongated papers stay almost facing the camera; crumpled ones may spin freely
      pose: H.shape >= 3 ? [-0.22 + G() * 0.18, -0.2 + G() * 0.4, -0.45 + G() * 0.9] : O ? [-0.15 + G() * 0.15, -0.15 + G() * 0.3, -0.6 + G() * 1.2] : [-0.3 + G() * 0.25, -0.35 + G() * 0.7, G() * 6.28],
      seedA: G() * 6.28,
      // a singed rim holds its front just under the lowest value of its field: only the scorch band shows
      front0: E.states.includes("burnt") ? ln[E.burn][0] + ln[E.burn][1] * G() : re === "singed" ? T.lo - 0.012 : -1,
      burned: he.get("burned." + E.id, 0),
      age: E.states.includes("aged") ? 1 : 0,
      torn: !1
    };
    return F.extent = Math.max(H.ext[0], H.ext[1]), F.hasRedaction = /\[\[/.test(E.text + E.back), z && (F.letter = await z), await te, F;
  }
  async function D(S) {
    S.openings = he.get("opens." + S.cfg.id, 0);
    let [E, A] = await Promise.all([Qe(S.cfg, S.T, "front", S.openings), S.backEmpty ? null : Qe(S.cfg, S.T, "back", S.openings)]);
    I(S.tPF), I(S.tPB), S.tPF = v(E, { mip: !0 }), S.tPB = A ? v(A, { mip: !0 }) : C();
  }
  function X(S) {
    return S.fxBurn === "burn" ? Promise.resolve() : (S.burnJob || (S.burnJob = Nt(S.cfg, S.T, "burn").then((E) => {
      if (S.released) return;
      let A = S.tFx;
      A === l && (S.bytes += E.canvas.width * E.canvas.height * 4), S.tFx = v(E.canvas, {}), I(A), S.burnPts = E.burnPts, S.fxBurn = "burn";
    })), S.burnJob);
  }
  async function Z(S) {
    await Promise.all([X(S), S.letter && X(S.letter)]);
  }
  function oe(S) {
    S.released = !0, [S.tH, S.tPF, S.tPB, S.tFx].forEach(I), S.meshes.forEach((E) => {
      t.deleteVertexArray(E.vao), E.bufs.forEach((A) => t.deleteBuffer(A));
    }), S.letter && oe(S.letter);
  }
  function me(S, E, A) {
    let z = E.f || 0, _ = ve.mul(ve.T(E.cx, E.cy, (E.zoff || 0) * E.sc + 0.12 * E.sc * Math.sin(Math.PI * z)), ve.S(E.sc));
    _ = ve.mul(_, ve.RZ(E.rot[2])), _ = ve.mul(_, ve.RX(E.rot[0])), _ = ve.mul(_, ve.RY(E.rot[1] + Math.PI * De($(z)))), E.local && (_ = ve.mul(_, ve.T(E.local[0], E.local[1], E.local[2])));
    let L = s.u;
    t.useProgram(s.p), [[S.tH, "uH"], [S.tPF, "uPrintF"], [S.tPB, "uPrintB"], [S.tFx, "uFx"]].forEach(([Y, x], le) => {
      t.activeTexture(t.TEXTURE0 + le), t.bindTexture(t.TEXTURE_2D, Y), t.uniform1i(L[x], le);
    }), t.activeTexture(t.TEXTURE4), t.bindTexture(t.TEXTURE_2D, ee()), t.uniform1i(L.uGrain, 4), t.uniform2f(L.uGrainK, S.w * 5, S.h * 5);
    let H = E.L || Ve;
    t.uniform1i(L.uShape, S.F.shape), t.uniform1f(L.uP, $(E.p)), t.uniform1f(L.uK0, S.F.k0), t.uniform1f(L.uKres, 0.06), t.uniform1f(L.uA0, S.F.A0), t.uniform1f(L.uAres, S.F.Ares), t.uniform1f(L.uSeedA, S.seedA), t.uniform1f(L.uSquash, S.F.squash), t.uniform1f(L.uRoll, S.F.roll || 0.03);
    let K = S.cfg.gsm || S.T.gsm || (S.cfg.thickness ? S.cfg.thickness * 800 : S.T.thickness ? S.T.thickness * 800 : S.cfg.weight || S.T.weight || (S.T.card ? 260 : S.T.carbon ? 42 : S.cfg.type === "receipt" ? 48 : 80)), V = $(K / 80, 0.45, 3.5);
    t.uniform1f(L.uCurl, 0.9 / Math.sqrt(V) * Math.sin(Math.PI * $(z))), t.uniform1f(L.uStubX, S.stubX ?? 0), t.uniform1f(L.uFoldSide, S.T.stub ? -1 : 1), t.uniform1f(L.uFoldBw, (S.T.card ? 0.03 : 0.016) * Math.sqrt(V / (S.T.card ? 3.25 : 1))), t.uniform1f(L.uFoldY, S.foldY || 0), t.uniform1f(L.uThick, z > 0.5 ? -6e-3 : 6e-3), t.uniform1f(L.uScale, E.sc), t.uniform1f(L.uBump, 1), t.uniform2f(L.uHalf, S.half[0], S.half[1]), t.uniform3f(L.uCam, 0, 0, Ce), t.uniform3f(L.uColor, S.T.color[0], S.T.color[1], S.T.color[2]), t.uniform3f(L.uL, H[0], H[1], H[2]), t.uniform1f(L.uAge, S.age);
    let Q = S.cfg.thru !== void 0 ? S.cfg.thru : S.T.thru !== void 0 ? S.T.thru : S.T.card ? 0 : S.T.carbon ? 0.18 : S.cfg.type === "receipt" ? 0.14 : S.cfg.type === "newspaper" ? 0.08 : $(0.035 * (80 / K), 0.015, 0.2);
    t.uniform1f(L.uThru, Q), t.uniform1f(L.uTime, E.time || 0), t.uniform1f(L.uFront, E.front ?? -1), t.uniform1f(L.uDestroy, E.destroy ? 1 : 0), t.uniform1f(L.uInkMax, 24e-4 * E.sc);
    let G = E.lampPos || [0, 0, 10];
    t.uniform3f(L.uLampPos, G[0], G[1], G[2]), t.uniform1f(L.uLamp, E.lamp || 0), t.uniform1f(L.uLampR, E.lampR || 1), t.uniformMatrix4fv(L.uModel, !1, _), t.uniformMatrix4fv(L.uProj, !1, A), (S.T.card ? [1, 0] : [0]).forEach((Y) => {
      t.uniform1f(L.uEdge, Y), S.meshes.forEach((x, le) => {
        let J = le === 1;
        J && (S.torn || (E.tear || 0) >= 1) || (t.uniform1f(L.uIsStub, J ? 1 : 0), t.uniform1f(L.uTear, J && E.tear || 0), t.bindVertexArray(x.vao), t.drawElements(t.TRIANGLES, x.count, t.UNSIGNED_SHORT, 0));
      });
    });
  }
  function Ae(S, E, A) {
    t.useProgram(o.p), t.disable(t.DEPTH_TEST), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA);
    let z = pe($(E.p)), _ = [S.F.ext[0] / 2 * E.sc, S.F.ext[1] / 2 * E.sc], L = [_[0] + (S.half[0] * E.sc - _[0]) * z, _[1] + (S.half[1] * E.sc - _[1]) * z], H = Math.min(Math.min(_[0], _[1]) * (1 - z) + 0.012 * E.sc * z, L[0], L[1]), K = (0.04 + 0.08 * E.lift + 0.04 * (1 - z)) * E.sc, V = E.L || Ve, Q = Math.hypot(V[0], V[1]) || 1, G = (0.05 + 0.1 * E.lift) * E.sc * Math.min(1.6, Q / Math.max(0.25, V[2]));
    t.uniform3f(o.u.uC, E.cx - V[0] / Q * G, E.cy - V[1] / Q * G, -0.25 * E.sc), t.uniform2f(o.u.uHS, L[0], L[1]), t.uniform1f(o.u.uR, H), t.uniform1f(o.u.uSoft, K), t.uniform1f(o.u.uA, (0.62 - 0.2 * E.lift) * (E.alpha ?? 1)), t.uniformMatrix4fv(o.u.uProj, !1, A), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, S.tFx), t.uniform1i(o.u.uFx, 0), t.uniform1f(o.u.uOpen, $((E.p - 0.85) / 0.15)), t.uniform1f(o.u.uFront, E.front ?? -1), t.uniform1f(o.u.uFlip, (E.f || 0) > 0.5 ? 1 : 0), t.bindVertexArray(a), t.drawArrays(t.TRIANGLE_STRIP, 0, 4);
  }
  function be(S, E, A, z = e.width, _ = e.height) {
    if (d || p) return;
    t.viewport(0, 0, z, _), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT);
    let L = ve.mul(ve.persp(_e, z / _, 0.1, 100), ve.T(0, 0, -Ce));
    if (E && (E.st.alpha ?? 1) > 0.01 && Ae(E.P, E.st, L), t.disable(t.BLEND), t.enable(t.DEPTH_TEST), S.forEach((H) => me(H.P, H.st, L)), A && A.n) {
      let H = A.buffer();
      t.useProgram(r.p), t.disable(t.DEPTH_TEST), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA), t.uniformMatrix4fv(r.u.uProj, !1, L), t.uniform1f(r.u.uPx, _ / (2 * Math.tan(_e / 2))), t.bindVertexArray(u), t.bindBuffer(t.ARRAY_BUFFER, i), t.bufferSubData(t.ARRAY_BUFFER, 0, H), t.drawArrays(t.POINTS, 0, H.length / 8);
    }
  }
  let j = null;
  function Re() {
    t.deleteFramebuffer(j.fb), t.deleteRenderbuffer(j.rb), t.deleteTexture(j.t), j = null;
  }
  function Ie(S, E = !1, A = "image/png", z = 256) {
    if (d || p) return "";
    let _ = z;
    if (!j || j.S !== _) {
      j && Re();
      let Y = t.createTexture();
      t.bindTexture(t.TEXTURE_2D, Y), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA8, _, _, 0, t.RGBA, t.UNSIGNED_BYTE, null), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR);
      let x = t.createRenderbuffer();
      t.bindRenderbuffer(t.RENDERBUFFER, x), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, _, _);
      let le = t.createFramebuffer();
      t.bindFramebuffer(t.FRAMEBUFFER, le), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, Y, 0), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, x), j = { fb: le, t: Y, rb: x, S: _, c: ye(_, _) };
    }
    t.bindFramebuffer(t.FRAMEBUFFER, j.fb);
    let L = _ / (2 * Ce * Math.tan(_e / 2)), H = E ? We(S) : 0, K = 0.9 * _ / (et(S, H) * L), { items: V } = He(S, { p: H, f: 0, tear: 0, burnOpen: 0 }, { cx: 0, cy: 0, sc: K, scLetter: K, rot: an(S, H), lift: 0, vhU: 1 });
    be(V, null, null, _, _);
    let Q = new Uint8Array(_ * _ * 4);
    t.readPixels(0, 0, _, _, t.RGBA, t.UNSIGNED_BYTE, Q), t.bindFramebuffer(t.FRAMEBUFFER, null);
    let G = j.c.getContext("2d"), ie = G.createImageData(_, _);
    for (let Y = 0; Y < _; Y++) {
      let x = (_ - 1 - Y) * _ * 4, le = Y * _ * 4;
      for (let J = 0; J < _ * 4; J += 4) {
        let Se = Q[x + J + 3], de = Se ? 255 / Se : 0;
        ie.data[le + J] = Math.min(255, Q[x + J] * de), ie.data[le + J + 1] = Math.min(255, Q[x + J + 1] * de), ie.data[le + J + 2] = Math.min(255, Q[x + J + 2] * de), ie.data[le + J + 3] = Se;
      }
    }
    return G.putImageData(ie, 0, 0), j.c.toDataURL(A, 0.9);
  }
  function rt() {
    if (d) return;
    d = !0, e.removeEventListener("webglcontextlost", g), e.removeEventListener("webglcontextrestored", b), [s, o, r].forEach((E) => t.deleteProgram(E.p)), t.deleteVertexArray(a), t.deleteBuffer(f), t.deleteVertexArray(u), t.deleteBuffer(i), [w, l, B].forEach((E) => {
      E && t.deleteTexture(E);
    }), j && Re();
    let S = t.getExtension("WEBGL_lose_context");
    S && S.loseContext();
  }
  return { gl: t, build: P, refreshPrint: D, release: oe, draw: be, snapshot: Ie, ensureBurn: Z, isLost: () => p, destroy: rt };
}

// .build/particles.js
function Et(e = 420) {
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
        let o = n[s], r = o.t / o.life, a = s * 8, f = o.a * Math.pow(Math.sin(Math.PI * Math.min(1, r)), 0.6);
        o.flicker && (f *= 0.55 + 0.45 * Math.sin(o.t * 28 + s)), t[a] = o.x, t[a + 1] = o.y, t[a + 2] = o.z, t[a + 3] = o.r, t[a + 4] = o.g, t[a + 5] = o.b, t[a + 6] = f, t[a + 7] = o.s;
      }
      return t.subarray(0, n.length * 8);
    },
    clear() {
      n.length = 0;
    }
  };
}

// .build/scene.js
var sn = {
  flip: "[ flip ]",
  tear: "[ tear stub ]",
  close: "[ close ]",
  hint: "drag to unfold",
  open: "Crumpled paper: open",
  back: "Back:"
}, wt = /* @__PURE__ */ (() => {
  let e = { labels: sn, remember: !1, motion: "auto", flashlight: !0, maxBuilt: 3 }, n = !1, t, s = !1, o, r, a, f, u, i, p, d, m, h = null, g = null, b = [], y = /* @__PURE__ */ new WeakMap(), v = [], w = Et(), l = null, k = 0, C = (c) => c.replace(/\[\[[^\]\n]+\]\]/g, "redacted").replace(/~~[^~\n]+~~\{([^}\n]+)\}/g, "$1").replace(/~~([^~\n]+)~~/g, "$1").replace(/^# /gm, ""), N = 0.16, I = 0.9, B = 0.42, te = 1.5, ee = 1;
  function P() {
    if (o) return;
    n = Be(e.motion);
    let c = document.createElement("style");
    c.textContent = ":root{--crumple-backdrop:rgba(6,5,4,.8);--crumple-ui-bg:rgba(14,13,12,.7);--crumple-ui-fg:#ebe5d6;--crumple-ui-border:rgba(235,229,214,.4);--crumple-ui-font:12px/1 'Courier Prime',ui-monospace,monospace;--crumple-accent:#f5c266}.crumple-scene{position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483640;pointer-events:none;display:none;transition:opacity .3s ease;touch-action:none}.crumple-backdrop{position:fixed;inset:0;z-index:2147483630;background:transparent;pointer-events:none;transition:background .7s ease}.crumple-backdrop.on{background:var(--crumple-backdrop)}.crumple-bar{position:fixed;z-index:2147483645;right:18px;top:16px;display:none;gap:8px}.crumple-bar.on{display:flex}.crumple-bar button,.crumple-fallback button{background:var(--crumple-ui-bg);border:1px solid var(--crumple-ui-border);color:var(--crumple-ui-fg);font:var(--crumple-ui-font);letter-spacing:.18em;padding:9px 12px;cursor:pointer}.crumple-bar button[hidden]{display:none}.crumple-hint{position:fixed;z-index:2147483645;left:50%;bottom:8vh;transform:translateX(-50%);font:var(--crumple-ui-font);font-size:13px;letter-spacing:.2em;color:var(--crumple-ui-fg);background:var(--crumple-ui-bg);padding:8px 14px;opacity:0;transition:opacity .5s;pointer-events:none}.crumple-hint.on{opacity:1}.crumple-trigger{display:inline-block;width:96px;height:96px;padding:0;border:0;background:none;cursor:pointer;-webkit-tap-highlight-color:transparent}.crumple-trigger img{width:100%;height:100%;display:block;filter:drop-shadow(2px 7px 6px rgba(0,0,0,.6))}.crumple-trigger:hover img,.crumple-trigger:focus-visible img{animation:crumple-wiggle .75s ease}.crumple-trigger:focus-visible{outline:2px solid var(--crumple-accent);outline-offset:4px;border-radius:50%}.crumple-trigger.active{visibility:hidden}.crumple-trigger.recrumple img{animation:crumple-squeeze .9s ease}@keyframes crumple-wiggle{0%{transform:none}22%{transform:rotate(-8deg) translateY(-4px)}50%{transform:rotate(6deg) translateY(-1px)}78%{transform:rotate(-2deg)}100%{transform:none}}@keyframes crumple-squeeze{0%{transform:scale(1.15)}30%{transform:scale(.7) rotate(-20deg)}60%{transform:scale(1.05) rotate(10deg)}100%{transform:none}}.crumple-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.crumple-fallback{position:fixed;inset:0;z-index:2147483646;display:none;align-items:center;justify-content:center;background:var(--crumple-backdrop);padding:24px}.crumple-fallback.on{display:flex}.crumple-fallback .sheet{max-width:min(520px,90vw);max-height:86vh;overflow:auto;padding:36px 34px;box-shadow:0 18px 40px rgba(0,0,0,.6);white-space:pre-line;font-size:19px;line-height:1.6;color:#2a2219}.crumple-fallback .sheet img{display:block;max-width:100%;margin:0 auto 16px}.crumple-fallback button{position:fixed;right:18px;top:16px}.crumple-fallback del{color:#5b4d3e;text-decoration:line-through;text-decoration-thickness:2px}.crumple-fallback ins{text-decoration:none;color:#1d3a8c;font-family:Caveat,'Comic Sans MS',cursive;font-size:1.12em;padding:0 .12em}.crumple-fallback .crumple-h{display:block;font-weight:700;font-size:1.15em;margin:.2em 0}.crumple-fallback .crumple-redact{display:inline-block;height:.85em;vertical-align:-.08em;background:#1b1713;border-radius:2px;margin:0 .1em}body.crumple-open{overflow:hidden;touch-action:none}@media (prefers-reduced-motion:reduce){.crumple-trigger.recrumple img,.crumple-trigger:hover img{animation:none}}@media print{canvas.crumple-scene,.crumple-backdrop,.crumple-bar,.crumple-hint,.crumple-fallback{display:none !important}.crumple-sr{position:static !important;width:auto !important;height:auto !important;overflow:visible !important;clip:auto !important;white-space:pre-wrap !important;color:#000;font-family:monospace}}", document.head.appendChild(c), h = c;
    let T = e.labels;
    r = document.createElement("div"), r.className = "crumple-backdrop", o = document.createElement("canvas"), o.className = "crumple-scene", o.setAttribute("aria-hidden", "true"), d = document.createElement("div"), d.className = "crumple-sr", d.id = "crumple-content", d.setAttribute("aria-live", "polite"), a = document.createElement("div"), a.className = "crumple-bar", a.setAttribute("role", "dialog"), a.setAttribute("aria-modal", "true"), a.setAttribute("aria-describedby", "crumple-content"), a.tabIndex = -1, f = document.createElement("button"), f.type = "button", f.textContent = T.flip, u = document.createElement("button"), u.type = "button", u.textContent = T.tear, u.hidden = !0, i = document.createElement("button"), i.type = "button", i.textContent = T.close, a.append(d, u, f, i), p = document.createElement("div"), p.className = "crumple-hint", p.textContent = T.hint, m = document.createElement("div"), m.className = "crumple-fallback", m.setAttribute("role", "dialog"), m.setAttribute("aria-modal", "true"), document.body.append(r, o, a, p, m), ne(v, i, "click", () => S()), ne(v, f, "click", () => z()), ne(v, u, "click", () => _()), ne(v, window, "keydown", (R) => {
      if (!(R.ctrlKey || R.metaKey || R.altKey || $e(R.target))) {
        if (m.classList.contains("on")) {
          R.key === "Escape" ? re() : R.key === "Tab" && Ee(R, m);
          return;
        }
        l && (R.key === "Tab" ? Ee(R, a) : R.key === "Escape" ? S() : (R.key === "f" || R.key === "F") && z());
      }
    }), ne(v, window, "resize", () => {
      l && (X(), j());
    }), ne(v, window, "pointermove", (R) => {
      if (!e.flashlight || !l || l.phase !== "open" || l.dragging || R.pointerType === "touch") return;
      let M = l.boxCache || me(), O = !!M && R.clientX > M.x0 - 30 && R.clientX < M.x1 + 30 && R.clientY > M.y0 - 30 && R.clientY < M.y1 + 30;
      nt(l, R.clientX, R.clientY, o.clientWidth, o.clientHeight, o.clientHeight / (2 * Ce * Math.tan(_e / 2)), O), j();
    }), ne(v, document, "mouseout", (R) => {
      l && !R.relatedTarget && (l.lampOn = 0, j());
    }), ne(v, document, "visibilitychange", () => {
      document.hidden || j();
    }), ne(v, o, "dblclick", () => z()), g = Je(), g && ne(v, g, "change", () => {
      n = Be(e.motion);
    }), v.push(Tt(o, {
      active: () => l && l.phase === "open" ? l : null,
      box: me,
      flip: () => z(),
      outside: () => S(),
      tap: (R) => {
        let M = Ae();
        return M && R.clientX > M.x0 && R.clientX < M.x1 && R.clientY > M.y0 && R.clientY < M.y1 ? (_(), !0) : !1;
      },
      redraw: () => j()
    }));
  }
  function D() {
    if (s) return t;
    s = !0, P();
    try {
      t = ot(o, { onRestore: le });
    } catch {
      t = null;
    }
    return t;
  }
  function X() {
    let c = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(24e5 / Math.max(1, innerWidth * innerHeight))), T = Math.round(innerWidth * c), R = Math.round(innerHeight * c);
    (o.width !== T || o.height !== R) && (o.width = T, o.height = R);
  }
  function Z(c) {
    let T = l.P, R = o.clientWidth, M = o.clientHeight, O = M / (2 * Ce * Math.tan(_e / 2)), F = l.from, U = F.left + F.width / 2, se = F.top + F.height / 2, ce = (U - R / 2) / O, we = -(se - M / 2) / O, Te = 0.9 * F.width / ((l.ext0 || T.extent) * O), Me = T.cfg.type === "envelope", je = Me ? Math.min(0.5 * M / (T.T.body * O), 0.7 * R / (T.w * O)) : Math.min(0.86 * M / (T.h * O), 0.9 * R / (T.w * O)), Rt = T.letter, un = Rt ? Math.min(0.86 * M / (Rt.h * O), 0.9 * R / (Rt.w * O)) : je, Ne = n ? 1 : l.tf, Ut = pe($(Me ? l.p * 2 : l.p)), pn = Math.hypot(ce, we), Bt = (1 - Ne) * (1 - Ne), zt = 2 * (1 - Ne) * Ne, dn = l.arc || 0.24, hn = Bt * ce + zt * ce * 0.5, Mt = Bt * we + zt * (we * 0.5 + dn * pn), at = T.F, cn = at.shape === 0 && at.squash > 0.5 ? 1 : at.shape === 1 || at.shape === 2 ? 0.8 : 0.45, mn = n ? 0 : pe(Ne) * cn, bn = [0.55, 1.15, 0.35], gn = [0, 0, -0.02], Pt = T.pose.map((ke, qt) => (ke + bn[qt] * mn) * (1 - Ut) + gn[qt] * Ut), At = Te + (je - Te) * Math.pow(Ne, 1.25), Gt = 0.9 * F.width / O, Xt = l.pre ?? 1, Ke = l.bounce ?? 1, it = l.settle ?? 1;
    if (Xt < 1) {
      let ke = Math.sin(Math.PI * Xt);
      At *= 1 + 0.12 * ke, Mt += ke * 0.16 * Gt;
    }
    if (Ke < 1) {
      let ke = (1 - Ke) * (1 - Ke);
      Mt += Math.abs(Math.sin(2 * Math.PI * Ke)) * ke * 0.4 * Gt, Pt[2] += 0.18 * Math.sin(2 * Math.PI * Ke) * ke;
    }
    let _t = it < 1 ? Math.sin(Math.PI * 2.5 * it) * (1 - it) * (1 - it) : 0, Yt = [0.05 * _t, 0.022 * _t, 0];
    for (let ke = 0; ke < 3; ke++) Pt[ke] += Yt[ke];
    return At *= 1 + 0.01 * _t, { cx: hn, cy: Mt, sc: At, scLetter: un, rot: Pt, adjust: Yt, lift: Math.sin(Math.PI * Ne), time: c / 1e3, ppu: O, vw: R, vh: M, vhU: M / O, L: Ve, lampPos: l.lampPos, lamp: l.lamp || 0, lampR: 0.3 * M / O };
  }
  function oe(c = performance.now()) {
    let T = Z(c);
    return { b: T, scene: He(l.P, l, T) };
  }
  function me() {
    if (!l) return null;
    let { b: c, scene: T } = oe();
    return tt(T.active.P, T.active.st, c.ppu, c.vw, c.vh);
  }
  function Ae() {
    if (!l || l.P.stubX === null || l.P.torn || l.p < 0.95 || l.f > 0.01) return null;
    let { b: c, scene: T } = oe(), R = T.active.st, M = l.P, O = c.vw / 2 + R.cx * c.ppu, F = c.vh / 2 - R.cy * c.ppu;
    return { x0: O + M.stubX * R.sc * c.ppu, x1: O + M.half[0] * R.sc * c.ppu, y0: F - M.half[1] * R.sc * c.ppu, y1: F + M.half[1] * R.sc * c.ppu };
  }
  function be(c) {
    if (k = 0, !l || document.hidden || t.isLost() || l.rebuilding) return;
    if (!l.tw.length && !l.dragging && !l.lampMoving && !l.resume && l.tPrev && c - l.tPrev < 32) {
      k = requestAnimationFrame(be);
      return;
    }
    let T = l.resume ? 1 / 60 : Math.min(0.1, Math.max(0, (c - (l.tPrev || c)) / 1e3));
    l.resume = !1, l.tPrev = c;
    let R = yt(l, c);
    if (!l) return;
    let M = St(l, T);
    l.lampMoving = M, l.P.burnPts && l.P.front0 > -0.5 && l.phase === "open" && l.destroy === void 0 && (l.burnOpen = Math.min(0.08, (l.burnOpen || 0) + T * 4e-3));
    let { b: O, scene: F } = oe(c);
    l.boxCache = tt(F.active.P, F.active.st, O.ppu, O.vw, O.vh), vt(w, l, F, T), w.step(T), t.draw(F.items, F.shadow, w), l.pPrev = l.p;
    let U = F.active.st.front > -0.5 && !!F.active.P.burnPts;
    if (l.ashes && (w.n === 0 || c > l.ashesEnd)) {
      A();
      return;
    }
    (R || l.dragging || M || w.n > 0 || U || l.ashes) && (k = requestAnimationFrame(be));
  }
  function j() {
    !k && l && (l.resume = !0, k = requestAnimationFrame(be));
  }
  let Re = (c) => e.remember && !!he.get("opened." + c, !1);
  function Ie(c) {
    if (l || !c.P) return;
    let T = c.P;
    X();
    let R = he.get("opens." + T.cfg.id, 0) + 1;
    he.set("opens." + T.cfg.id, R), T.hasRedaction && requestAnimationFrame(() => t.refreshPrint(T).then(j));
    let M = c.opened ? We(T) : 0;
    l = { P: T, ent: c, from: c.btn.getBoundingClientRect(), tf: 0, p: M, ext0: et(T, M), f: 0, tear: 0, tw: [], phase: "opening", dragging: !1, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 }, w.clear(), c.btn.classList.add("active"), document.body.classList.add("crumple-open"), o.style.display = "block", o.style.pointerEvents = "auto", r.classList.add("on"), a.classList.add("on"), a.setAttribute("aria-label", Pe[T.cfg.type].name), i.focus({ preventScroll: !0 }), u.hidden = T.stubX === null || T.torn, d.replaceChildren(), de(T.cfg.text, d), T.cfg.back && (d.append(`

\u2014 ` + e.labels.back + ` \u2014
`), de(T.cfg.back, d));
    let O = T.cfg.open === "drag", F = T.cfg.type === "envelope", U = () => {
      l && (l.phase = "open", O && l.p < 0.5 && p.classList.add("on"));
    };
    if (n)
      o.style.opacity = "0", requestAnimationFrame(() => {
        o.style.opacity = "1";
      }), l.tf = 1, l.phase = "open", O ? p.classList.add("on") : (ue(l, "p", 1, ee * (F ? 1.6 : 1), ze), fe.play("uncrumple", ee));
    else {
      l.pre = 0, l.arc = 0.24;
      let ce = N * 0.55, we = F ? te * 1.85 : te;
      if (ue(l, "pre", 1, N, ge), ue(l, "tf", 1, I, Ht, ce, U), !O) {
        let Te = () => {
          l && l.phase !== "closing" && (l.settle = 0, ue(l, "settle", 1, 0.9, ge), j());
        };
        ue(l, "p", 1, we, F ? Ge : lt(T), ce + B, Te), fe.play(F ? "seal" : "uncrumple", we, ce + B);
      }
    }
    T.front0 > -0.5 && fe.play("fire", 2.5, 0.6), e.remember && he.set("opened." + T.cfg.id, !0), Ue(c.btn, "open", { id: T.cfg.id, openings: R }), j();
    let { scene: se } = oe();
    t.draw(se.items, se.shadow, w);
  }
  function rt() {
    !l || !l.burnOpen || (l.P.burned = Math.min(0.2, l.P.burned + l.burnOpen), he.set("burned." + l.P.cfg.id, l.P.burned), l.burnOpen = 0);
  }
  function S() {
    if (!l || l.phase === "closing") return;
    if (l.P.cfg.burnAfterReading && l.p > 0.9 && l.phase === "open") {
      E();
      return;
    }
    rt(), l.phase = "closing", l.dragging = !1, l.lampOn = 0, l.from = l.ent.btn.getBoundingClientRect(), r.classList.remove("on"), a.classList.remove("on"), p.classList.remove("on"), o.style.pointerEvents = "none", l.tw = l.tw.filter((O) => O.key !== "settle"), l.settle = 1;
    let c = l.P.cfg.type === "envelope", T = Re(l.P.cfg.id) ? We(l.P) : 0;
    l.tf > 0.999 && (l.ext0 = et(l.P, T));
    let R = n ? 0.6 : c ? 1.9 : 0.85, M = R * Math.max(0.35, l.p - T);
    if (l.f > 0 && ue(l, "f", 0, 0.45, De), l.p > T + 0.02 && fe.play("crumple", M), ue(l, "p", T, M, c ? Ge : st(l.P)), n) ue(l, "tf", 1, R, ge, 0, A);
    else {
      l.tf > 0.999 && (l.arc = 0.34);
      let O = () => {
        l && (l.bounce = 0, ue(l, "bounce", 1, 0.36, ge, 0, A));
      };
      ue(l, "tf", 0, 0.78, Vt, M * (c ? 0.8 : 0.5), O);
    }
    Ue(l.ent.btn, "close", { id: l.P.cfg.id }), j();
  }
  function E() {
    rt(), l.phase = "closing", l.dragging = !1, a.classList.remove("on"), p.classList.remove("on"), o.style.pointerEvents = "none", l.f > 0 && ue(l, "f", 0, 0.4, De);
    let c = l.P.letter || l.P;
    l.destroy = Math.max(c.front0 > -0.5 ? c.front0 + c.burned : -0.06, -0.06), fe.play("fire", 2.8), ue(l, "destroy", 1.6, n ? 1.2 : 2.6, ge, 0, () => {
      if (!l) return;
      l.ashes = !0, l.ashesEnd = performance.now() + 3e3, r.classList.remove("on");
      let T = l.ent;
      he.set("destroyed." + T.cfg.id, !0), T.destroyed = !0, Ue(T.btn, "burn", { id: T.cfg.id });
    }), j();
  }
  function A() {
    if (!l) return;
    let c = l.ent, T = !!l.ashes;
    l = null, w.clear(), r.classList.remove("on"), document.body?.classList.remove("crumple-open");
    let R = () => {
      l || (o.style.display = "none", o.style.opacity = ""), T ? (c.btn.hidden = !0, c.btn.classList.remove("active")) : (!l || l.ent !== c) && c.btn.classList.remove("active");
    };
    n ? (o.style.opacity = "0", setTimeout(R, 300)) : R(), d.textContent = "", T || c.btn.focus({ preventScroll: !0 }), J(c);
  }
  function z() {
    !l || l.phase === "closing" || l.destroy !== void 0 || (fe.play("flip"), Ye(10), ue(l, "f", l.f < 0.5 ? 1 : 0, 0.8, ge), Ue(l.ent.btn, "flip", { id: l.P.cfg.id, back: l.f < 0.5 }), j());
  }
  function _() {
    !l || l.P.stubX === null || l.P.torn || l.tear > 0 || l.p < 0.95 || l.f > 0.01 || (fe.play("tear"), Ye([15, 20, 15, 20, 30]), Ue(l.ent.btn, "tear", { id: l.P.cfg.id }), u.hidden = !0, ue(l, "tear", 1, n ? 0.3 : 1, ge, 0, () => {
      l && (l.P.torn = !0);
    }), j());
  }
  function L(c, T, R = {}) {
    let M = { btn: c, cfg: Ze(T), P: null, building: null, opts: R, opened: !1, off: [], io: null, gone: !1, madeImg: !1, madeLabel: !1 };
    return document.body ? H(M) : document.addEventListener("DOMContentLoaded", () => H(M), { once: !0 }), M;
  }
  function H(c) {
    let { btn: T, cfg: R, opts: M } = c;
    P();
    let O = y.get(T);
    O && K(O);
    let F = b.find((se) => se.cfg.id === R.id);
    F && (console.warn(`crumple: id "${R.id}" is already attached, the previous paper is detached`), K(F)), b.push(c), y.set(T, c), T.classList.add("crumple-trigger"), T.getAttribute("aria-label") || (T.setAttribute("aria-label", e.labels.open), c.madeLabel = !0), he.get("destroyed." + R.id, !1) && (T.hidden = !0, c.destroyed = !0), c.opened = Re(R.id), ne(c.off, T, "click", async () => {
      await Y(c) ? Ie(c) : q(c);
    });
    let U = T.querySelector("img");
    if (M.snapshot) {
      U || (U = document.createElement("img"), U.alt = "", T.appendChild(U), c.madeImg = !0), U.onerror = () => {
        c.opts = {}, U.onerror = null, V(c);
      }, U.src = c.opened && M.snapshotOpened ? M.snapshotOpened : M.snapshot;
      let se = () => {
        Q(() => Y(c));
      };
      ["pointerenter", "focus", "touchstart"].forEach((ce) => ne(c.off, T, ce, se, { once: !0, passive: !0 })), ne(c.off, T, "pointerdown", () => Y(c), { passive: !0 });
    } else V(c);
  }
  function K(c) {
    c.gone = !0, c.off.splice(0).forEach((M) => M()), c.io && c.io.disconnect();
    let T = b.indexOf(c);
    T >= 0 && b.splice(T, 1);
    let R = G.indexOf(c);
    if (R >= 0 && G.splice(R, 1), l && l.ent === c && A(), c.P && (t.release(c.P), c.P = null), y.get(c.btn) === c && y.delete(c.btn), c.btn.classList.remove("crumple-trigger", "active", "recrumple"), c.madeLabel && c.btn.removeAttribute("aria-label"), c.madeImg) {
      let M = c.btn.querySelector("img");
      M && M.remove();
    }
  }
  function V(c) {
    if ("IntersectionObserver" in window) {
      let T = new IntersectionObserver((R) => R.forEach((M) => {
        M.isIntersecting && (T.disconnect(), Q(() => Y(c).then(() => J(c))));
      }), { rootMargin: "600px 0px" });
      c.io = T, T.observe(c.btn);
    } else Q(() => Y(c).then(() => J(c)));
  }
  let Q = (c) => globalThis.requestIdleCallback ? requestIdleCallback(c, { timeout: 700 }) : setTimeout(c, 60), G = [], ie = 0;
  function Y(c) {
    if (c.P) {
      let T = G.indexOf(c);
      return T >= 0 && G.push(G.splice(T, 1)[0]), Promise.resolve(c.P);
    }
    return c.building ? c.building : c.building = x(c);
  }
  async function x(c) {
    let T = ie;
    try {
      if (c.gone || !D() || t.isLost()) return null;
      let R = t, M = await R.build(c.cfg);
      if (T !== ie) return null;
      if (c.gone)
        return R.release(M), null;
      for (c.P = M, G.push(c); G.length > e.maxBuilt; ) {
        let O = G.findIndex((U) => (!l || U !== l.ent) && U !== c);
        if (O < 0) break;
        let F = G.splice(O, 1)[0];
        !F.opts.snapshot && F.P && J(F), F.P && R.release(F.P), F.P = null, F.building = null;
      }
      return c.P;
    } catch (R) {
      return console.warn("crumple: the paper could not be built, the CSS version is shown instead", R), null;
    } finally {
      T === ie && (c.building = null);
    }
  }
  function le() {
    ie++;
    let c = G.splice(0);
    if (b.forEach((T) => {
      T.P = null, T.building = null;
    }), c.forEach((T) => Y(T).then(() => J(T))), l) {
      let T = l.ent;
      l.rebuilding = !0, Y(T).then((R) => {
        !l || l.ent !== T || (R ? (l.P = R, l.rebuilding = !1, j()) : (l.ashes = !1, A()));
      });
    }
  }
  function J(c) {
    if (c.destroyed || c.gone) return;
    c.opened = Re(c.cfg.id);
    let T = c.btn.querySelector("img");
    if (T || (T = document.createElement("img"), T.alt = "", c.btn.appendChild(T), c.madeImg = !0), c.opts.snapshot) {
      T.src = c.opened && c.opts.snapshotOpened ? c.opts.snapshotOpened : c.opts.snapshot;
      return;
    }
    c.P && t && (T.src = t.snapshot(c.P, c.opened));
  }
  function Se() {
    let c = !1;
    b.forEach((T) => {
      he.remove("opened." + T.cfg.id), !(!T.opened || T.destroyed) && (c = !0, J(T), T.btn.classList.remove("recrumple"), T.btn.offsetWidth, T.btn.classList.add("recrumple"));
    }), c && fe.play("crumple", 0.9);
  }
  function de(c, T) {
    let R = !1;
    c.split(`
`).forEach((M, O) => {
      let F = M.startsWith("# ");
      O && !F && !R && T.append(`
`), R = F;
      let U = F ? M.slice(2) : M, se = F ? document.createElement("span") : T;
      F && (se.className = "crumple-h");
      let ce = /~~([^~\n]+)~~(?:\{([^}\n]+)\})?|\[\[([^\]\n]+)\]\]/g, we = 0, Te;
      for (; Te = ce.exec(U); ) {
        if (Te.index > we && se.append(U.slice(we, Te.index)), Te[3] !== void 0) {
          let Me = document.createElement("span");
          Me.className = "crumple-redact", Me.setAttribute("role", "img"), Me.setAttribute("aria-label", "redacted"), Me.style.width = Math.max(3, Te[3].length * 0.5) + "em", se.append(Me);
        } else {
          let Me = document.createElement("del");
          if (Me.textContent = Te[1], se.append(Me), Te[2] !== void 0) {
            let je = document.createElement("ins");
            je.textContent = Te[2], se.append(je);
          }
        }
        we = ce.lastIndex;
      }
      we < U.length && se.append(U.slice(we)), F && T.append(se);
    });
  }
  function q(c) {
    P();
    let T = Pe[c.cfg.type], R = (F) => Math.round(T.color[F] * 255), M = document.createElement("div");
    if (M.className = "sheet", M.style.background = `rgb(${R(0)},${R(1)},${R(2)})`, M.style.fontFamily = `"${T.font}", "Courier Prime", monospace`, c.opts.snapshotOpened) {
      let F = document.createElement("img");
      F.src = c.opts.snapshotOpened, F.alt = "", M.appendChild(F);
    }
    de(c.cfg.text, M), c.cfg.back && (M.append(`

\u2014 ` + e.labels.back + ` \u2014
`), de(c.cfg.back, M));
    let O = document.createElement("button");
    O.type = "button", O.textContent = e.labels.close, O.addEventListener("click", re), m.setAttribute("aria-label", T.name), m.replaceChildren(M, O), m.classList.add("on"), document.body?.classList.add("crumple-open"), O.focus(), m.onclick = (F) => {
      F.target === m && re();
    }, m._ent = c, Ue(c.btn, "open", { id: c.cfg.id, fallback: !0 });
  }
  function re() {
    m.classList.remove("on"), document.body?.classList.remove("crumple-open"), m._ent && m._ent.btn.focus({ preventScroll: !0 });
  }
  function Ee(c, T) {
    let R = [...T.querySelectorAll("button")].filter((U) => !U.hidden);
    if (!R.length) return;
    c.preventDefault();
    let M = R.indexOf(document.activeElement), O = R.length - 1, F = M < 0 ? 0 : c.shiftKey ? M === 0 ? O : M - 1 : M === O ? 0 : M + 1;
    R[F].focus({ preventScroll: !0 });
  }
  let $e = (c) => !!c && (c.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(c.tagName));
  function Oe() {
    o && (l = null, cancelAnimationFrame(k), k = 0, b.slice().forEach(K), G.length = 0, v.splice(0).forEach((c) => c()), t && t.destroy(), t = null, s = !1, h.remove(), document.body?.classList.remove("crumple-open"), [r, o, a, p, d, m].forEach((c) => c.remove()), r = o = a = p = d = m = null, w.clear());
  }
  return {
    // options: { labels, remember, motion: 'auto' | 'reduce' | 'full' ('reduced' still works), flashlight, maxBuilt }
    init(c = {}) {
      e = { ...e, ...c, labels: { ...sn, ...c.labels || {} } }, o && (f.textContent = e.labels.flip, u.textContent = e.labels.tear, i.textContent = e.labels.close, p.textContent = e.labels.hint), P(), n = Be(e.motion), Q(() => {
        o && D();
      });
    },
    attach: L,
    // detaches a trigger element, or the paper with that id
    detach(c) {
      let T = typeof c == "string" ? b.find((R) => R.cfg.id === c) : y.get(c);
      T && K(T);
    },
    destroy: Oe,
    open: (c) => Y(c).then((T) => T ? Ie(c) : q(c)),
    close: S,
    flip: z,
    tear: _,
    reset: Se,
    get reducedMotion() {
      return n;
    },
    get entries() {
      return b;
    },
    get isOpen() {
      return !!l;
    },
    // debugging/testing: draws a fixed frame (flight, unfold, flip, tear, burn front) of an attached paper
    async frame(c, T, R, M = 0, O = 0, F) {
      let U = b[c];
      await Y(U), F !== void 0 && await t.ensureBurn(U.P), cancelAnimationFrame(k), k = 0, X(), l = { P: U.P, ent: U, from: U.btn.getBoundingClientRect(), tf: T, p: R, f: M, tear: O, tw: [], phase: "open", burnOpen: 0 }, F !== void 0 && (l.destroy = F), o.style.display = "block", r.classList.add("on"), b.forEach((ce) => ce.btn.classList.toggle("active", ce === U));
      let { scene: se } = oe();
      t.draw(se.items, se.shadow, null);
    },
    // debugging/testing: lights the flashlight at screen (x, y) and draws
    flashlight(c, T) {
      if (l) {
        nt(l, c, T, o.clientWidth, o.clientHeight, o.clientHeight / (2 * Ce * Math.tan(_e / 2)), !0), l.lampPos = l.lampGoal.slice(), l.lamp = 1;
        let { scene: R } = oe();
        t.draw(R.items, R.shadow, null);
      }
    },
    get debug() {
      return l ? { phase: l.phase, ashes: !!l.ashes, destroy: l.destroy, n: w.n, raf: k, tw: l.tw.map((c) => c.key), lampPos: l.lampPos, lamp: l.lamp } : null;
    }
  };
})();

// .build/stage.js
var fn = 1.5;
function eo(e, n = {}) {
  let t = { flashlight: !0, drag: !0, fit: 0.8, motion: "auto", ...n }, s, o = !1, r = Be(t.motion);
  try {
    s = ot(e, { onRestore: I });
  } catch {
    s = null;
  }
  if (!s) return null;
  let a = (P, D, X, Z, oe, me, Ae) => ue(P, D, X, r ? Z * 0.4 : Z, oe, me, Ae), f = null, u = 0, i = 0, p = null, d = "", m = null, h = [], g = Et(), b = { p: 1, f: 0, tear: 0, tw: [], dragging: !1, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 };
  function y() {
    let P = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(4e6 / Math.max(1, e.clientWidth * e.clientHeight))), D = Math.round(e.clientWidth * P), X = Math.round(e.clientHeight * P);
    (e.width !== D || e.height !== X) && (e.width = D, e.height = X);
  }
  function v(P) {
    let D = e.clientWidth, X = e.clientHeight, Z = X / (2 * Ce * Math.tan(_e / 2)), oe = f.cfg.type === "envelope", me = oe ? Math.min(t.fit * 0.69 * X / (f.T.body * Z), 0.7 * D / (f.w * Z)) : Math.min(t.fit * X / (f.h * Z), (t.fit + 0.06) * D / (f.w * Z)), Ae = f.letter ? Math.min(t.fit * X / (f.letter.h * Z), (t.fit + 0.06) * D / (f.letter.w * Z)) : me, be = pe($(oe ? b.p * 2 : b.p)), j = [0, 0, -0.02];
    return { cx: 0, cy: 0, sc: me, scLetter: Ae, rot: f.pose.map((Re, Ie) => Re * (1 - be) + j[Ie] * be), lift: 0, time: P / 1e3, ppu: Z, vw: D, vh: X, vhU: X / Z, L: Ve, lampPos: b.lampPos, lamp: b.lamp || 0, lampR: 0.3 * X / Z };
  }
  let w = (P = performance.now()) => {
    let D = v(P);
    return { b: D, scene: He(f, b, D) };
  };
  function l(P) {
    if (u = 0, !f || document.hidden || o || s.isLost()) return;
    y();
    let D = b.resume ? 1 / 60 : Math.min(0.05, Math.max(0, (P - (b.tPrev || P)) / 1e3));
    b.resume = !1, b.tPrev = P;
    let X = yt(b, P), Z = St(b, D), { scene: oe } = w(P);
    vt(g, b, oe, D), g.step(D), s.draw(oe.items, oe.shadow, g), b.pPrev = b.p, (X || b.dragging || Z || g.n > 0 || oe.active.st.front > -0.5 && oe.active.P.burnPts) && (u = requestAnimationFrame(l));
  }
  let k = () => {
    !u && !o && (b.resume = !0, u = requestAnimationFrame(l));
  };
  function C() {
    if (!f) return null;
    let { b: P, scene: D } = w(), X = e.getBoundingClientRect();
    return tt(D.active.P, D.active.st, P.ppu, P.vw, P.vh, X.left, X.top);
  }
  t.drag && (d = e.style.touchAction, e.style.touchAction = "none", p = Tt(e, { active: () => f ? b : null, box: C, outside: () => {
  }, redraw: k })), ne(h, e, "dblclick", () => ee.flip()), t.flashlight && (ne(h, e, "pointermove", (P) => {
    if (!f || b.dragging || P.pointerType === "touch") return;
    let D = C(), X = e.getBoundingClientRect(), Z = !!D && P.clientX > D.x0 - 30 && P.clientX < D.x1 + 30 && P.clientY > D.y0 - 30 && P.clientY < D.y1 + 30;
    nt(b, P.clientX - X.left, P.clientY - X.top, e.clientWidth, e.clientHeight, e.clientHeight / (2 * Ce * Math.tan(_e / 2)), Z), k();
  }), ne(h, e, "pointerleave", () => {
    b.lampOn = 0, k();
  })), ne(h, window, "resize", () => k()), ne(h, document, "visibilitychange", () => {
    document.hidden || k();
  });
  let N = Je();
  N && t.motion === "auto" && ne(h, N, "change", () => {
    r = Be(t.motion);
  });
  function I() {
    let P = f && f.cfg, D = b.p;
    f = null, P && ee.set(P, { progress: D }).catch((X) => console.warn("crumple: rebuild after context restore failed", X));
  }
  function B() {
    o || (o = !0, i++, cancelAnimationFrame(u), u = 0, h.splice(0).forEach((P) => P()), p && p(), t.drag && (e.style.touchAction = d), f && s.release(f), f = null, b.tw = [], g.clear(), s.destroy());
  }
  let te = () => f.cfg.type === "envelope", ee = {
    // builds a paper from a config and shows it (resolves with the paper, or null if a newer call replaced it)
    async set(P, { progress: D } = {}) {
      if (o) return null;
      let X = ++i, Z = await s.build(P);
      return X !== i || o ? (s.release(Z), null) : (f && s.release(f), f = Z, b.tear = 0, b.f = 0, f.torn = !1, delete b.destroy, D !== void 0 && (b.tw = [], b.p = $(D)), g.clear(), k(), f);
    },
    crumple() {
      f && (fe.play("crumple", 0.9), a(b, "p", 0, te() ? 1.9 : 0.9, te() ? Ge : st(f)), k());
    },
    uncrumple() {
      f && (fe.play(te() ? "seal" : "uncrumple", 1.5), a(b, "p", 1, te() ? fn * 1.85 : fn, te() ? Ge : lt(f)), k());
    },
    toggle() {
      b.p > 0.5 ? ee.crumple() : ee.uncrumple();
    },
    // any time, except once the paper burns away; the side it shows is kept through crumple and unfold
    flip() {
      !f || b.destroy !== void 0 || (fe.play("flip"), a(b, "f", b.f < 0.5 ? 1 : 0, 0.8, ge), k());
    },
    tear() {
      !f || f.stubX === null || b.tear > 0 || b.p < 0.95 || (fe.play("tear"), a(b, "tear", 1, 1, ge, 0, () => {
        f.torn = !0;
      }), k());
    },
    restoreStub() {
      f && (b.tear = 0, f.torn = !1, k());
    },
    // resolves once the paper has its burn field (built on demand for any paper); a second call meanwhile does nothing,
    // and a paper replaced by set() meanwhile is not burnt
    async burn() {
      let P = f;
      if (!P || b.destroy !== void 0 || m === P) return;
      m = P;
      try {
        await s.ensureBurn(P);
      } finally {
        m === P && (m = null);
      }
      if (f !== P || b.destroy !== void 0) return;
      let D = P.letter || P;
      fe.play("fire", 2.6), b.destroy = Math.max(D.front0 > -0.5 ? D.front0 + D.burned : -0.06, -0.06), a(b, "destroy", 1.6, 2.6, ge), k();
    },
    restore() {
      delete b.destroy, g.clear(), k();
    },
    setProgress(P) {
      b.tw = [], b.p = $(P), k();
    },
    // PNG of the current frame (draws and reads at once, no preserved buffer needed)
    png() {
      if (!f) return "";
      y();
      let { scene: P } = w();
      return s.draw(P.items, P.shadow, null), e.toDataURL("image/png");
    },
    snapshot(P, D, X) {
      return f ? s.snapshot(f, P, D, X) : "";
    },
    get state() {
      return b;
    },
    get paper() {
      return f;
    },
    destroy: B
  };
  return ee;
}

// .build/element.js
var kt = class extends (typeof HTMLElement < "u" ? HTMLElement : class {
}) {
  connectedCallback() {
    let n = this.querySelector("button");
    n || (n = document.createElement("button"), n.type = "button", this.appendChild(n), this._madeBtn = !0), this.btn = n;
    let t = this.getAttribute("states"), s = t ? t.split(",").map((i) => i.trim()).filter(Boolean) : void 0, o = {
      id: this.getAttribute("id") || void 0,
      type: this.getAttribute("type") || void 0,
      shape: this.getAttribute("shape") || void 0,
      states: s,
      text: this.getAttribute("text") || (this._madeBtn ? "" : n.textContent || ""),
      back: this.getAttribute("back") || void 0,
      open: this.getAttribute("open") || void 0,
      seed: this.hasAttribute("seed") ? Number(this.getAttribute("seed")) : void 0
    }, r = this.getAttribute("snapshot") || void 0, a = this.getAttribute("snapshot-opened") || void 0, f = r || a ? { snapshot: r, snapshotOpened: a } : void 0, u = () => {
      this.entry || (this._io && (this._io.disconnect(), this._io = null), this.entry = wt.attach(n, o, f));
    };
    n.addEventListener("click", u, { once: !0, capture: !0 }), typeof IntersectionObserver < "u" ? (this._io = new IntersectionObserver((i) => {
      for (let p of i)
        if (p.isIntersecting) {
          u();
          break;
        }
    }, { rootMargin: "200px" }), this._io.observe(this)) : u();
  }
  disconnectedCallback() {
    this._io && (this._io.disconnect(), this._io = null), this.btn && wt.detach(this.btn), this._madeBtn && this.btn.parentNode && this.btn.remove(), this.entry = null;
  }
};
typeof customElements < "u" && !customElements.get("crumple-paper") && customElements.define("crumple-paper", kt);

// .build/index.js
var qo = "1.2.0";
export {
  kt as CrumplePaper,
  ot as Renderer,
  jt as SHAPES,
  pt as STATES,
  wt as Scene,
  fe as Sound,
  eo as Stage,
  Kt as TEXTS,
  Pe as TYPES,
  Le as config,
  Ze as normalize,
  Sn as registerPaperType,
  En as registerWearState,
  qo as version
};
//# sourceMappingURL=crumple.esm.js.map
