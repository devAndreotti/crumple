// .build/util.js
function te(e) {
  let n = Math.imul(e | 0, 2654435761) >>> 0 || 1;
  return () => (n ^= n << 13, n >>>= 0, n ^= n >>> 17, n ^= n << 5, n >>>= 0, n / 4294967296);
}
function Fe(e) {
  let n = (l, o) => {
    let r = Math.imul(l, 374761393) + Math.imul(o, 668265263) + Math.imul(e, 1442695041) | 0;
    return r = Math.imul(r ^ r >>> 13, 1274126177), ((r ^ r >>> 16) >>> 0) / 4294967296;
  }, t = (l, o) => {
    let r = Math.floor(l), a = Math.floor(o), s = l - r, u = o - a, f = s * s * (3 - 2 * s), h = u * u * (3 - 2 * u), p = n(r, a), m = n(r + 1, a), d = n(r, a + 1), g = n(r + 1, a + 1);
    return p + (m - p) * f + (d - p) * h + (p - m - d + g) * f * h;
  };
  return (l, o) => (t(l, o) * 0.5 + t(l * 2, o * 2) * 0.25 + t(l * 4, o * 4) * 0.125 + t(l * 8, o * 8) * 0.0625) / 0.9375;
}
var K = (e, n = 0, t = 1) => Math.min(t, Math.max(n, e)), ue = (e) => e * e * (3 - 2 * e), xe = (e, n, t) => e + (n - e) * t, De = (e) => e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2, ze = (e) => 1 - (1 - e) * (1 - e), Lt = (e) => 0.5 * ue(e) + 0.5 * ze(e), ge = (e) => e, Ht = (e) => 0.35 * ue(e) + 0.65 * (1 - Math.pow(1 - e, 3)), Vt = (e) => e * e * (1.6 - 0.6 * e), Ge = (e) => 0.55 * e + 0.45 * ue(e), lt = (e) => e.F.shape === 0 ? (n) => 1 - Math.pow(1 - n, 2.3) : Lt, st = (e) => e.F.shape === 0 ? (n) => 1 - Math.pow(1 - n, 2.2) : De, Le = {
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
  let l = document.createElement("canvas");
  return l.width = e, l.height = n, t && l.getContext("2d", { willReadFrequently: !0 }), l;
}, ie = (e, n) => `rgba(${e[0]},${e[1]},${e[2]},${n})`;
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
function oe(e, n, t, l, o) {
  n.addEventListener(t, l, o), e.push(() => n.removeEventListener(t, l, o));
}
var yn = { "Special Elite": "Special+Elite", "Courier Prime": "Courier+Prime:wght@400;700", Caveat: "Caveat:wght@500", VT323: "VT323", "Libre Baskerville": "Libre+Baskerville:ital,wght@0,400;0,700;1,400" }, Ct = {};
function $t(e) {
  return document.fonts ? Promise.all(e.map((n) => {
    if (!Ct[n]) {
      let t = yn[n], l = t ? "family=" + t.split(":")[0] : null, r = !t || !Le.googleFonts || [...document.querySelectorAll("link[rel=stylesheet]")].some((a) => a.href.includes(l)) ? Promise.resolve() : new Promise((a) => {
        let s = document.createElement("link");
        s.rel = "stylesheet", s.href = "https://fonts.googleapis.com/css2?family=" + t + "&display=swap", s.onload = a, s.onerror = a, setTimeout(a, 4e3), document.head.appendChild(s);
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
var ke = {
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
}, jt = { ball: "Crumpled ball", flat: "Flattened crumple", quarters: "Folded in quarters", half: "Folded in half", thirds: "Folded in thirds (letter)", roll: "Rolled up", twist: "Twisted (candy wrapper)", accordion: "Accordion fold", triangle: "Triangle fold" }, pt = { torn: "Torn", burnt: "Burnt", coffee: "Coffee stain", water: "Water stain", prints: "Dirty fingerprints", aged: "Aged", scribbled: "Scribbled", singed: "Singed", wine: "Wine stain", ink: "Ink blot", foxing: "Foxing", tape: "Tape", stamp: "Rubber stamp", faded: "Sun-faded", staple: "Metal staple", grease: "Grease stain", dogear: "Dog-eared corner", damp: "Damp wrinkled relief", creased: "Pocket-creased grid" }, vn = ["corner", "edge", "center", "spots"], Kt = {
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
function En(e, n) {
  if (ke[e]) throw new Error(`Paper type "${e}" already exists`);
  ke[e] = n;
}
function Sn(e, n) {
  if (pt[e]) throw new Error(`Wear state "${e}" already exists`);
  pt[e] = n.name, n.apply && (dt[e] = n.apply);
}
var ut = (e, n) => Object.prototype.hasOwnProperty.call(e, n);
function Ze(e = {}) {
  let n = ut(ke, e.type) ? e.type : "typed", t = ke[n], l = {
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
    letter: ut(ke, e.letter) && e.letter !== "envelope" ? e.letter : "typed",
    // the word of the 'stamp' state (drawn in capitals)
    stamp: typeof e.stamp == "string" && e.stamp.trim() ? e.stamp.trim() : "RECEIVED"
  };
  return e.rich && typeof e.rich == "object" && (l.rich = e.rich), l;
}

// .build/fields.js
function ht(e, n, t) {
  let l = te(e.seed), o = () => l() < 0.5 ? -1 : 1, r = e.w / 2, a = e.h / 2, s = new Float32Array(n * t), u = n / e.w, f = t / e.h, h = (v, S, i, P, C, N) => {
    N === void 0 && (N = l() * Math.PI), P === void 0 && (P = (l() * 2 - 1) * r, C = (l() * 2 - 1) * a);
    let I = Math.cos(N), B = Math.sin(N), ne = Math.abs(I) * v + S, W = Math.abs(B) * v + S, k = Math.max(0, Math.floor((P - ne + r) * u)), D = Math.min(n - 1, Math.ceil((P + ne + r) * u)), X = Math.max(0, Math.floor((C - W + a) * f)), J = Math.min(t - 1, Math.ceil((C + W + a) * f)), re = Math.min(0.08, v);
    for (let me = X; me <= J; me++) {
      let Ae = (me + 0.5) / f - a - C;
      for (let be = k; be <= D; be++) {
        let V = (be + 0.5) / u - r - P, Re = Math.abs(-V * B + Ae * I);
        if (Re >= S) continue;
        let Ie = Math.abs(V * I + Ae * B);
        Ie >= v || (s[me * n + be] += i * (1 - Re / S) * Math.min(1, (v - Ie) / re));
      }
    }
  }, p = e.shape === "quarters" || e.shape === "half" || e.shape === "thirds" || e.shape === "accordion" || e.shape === "triangle", m = p ? 0.18 : e.shape === "roll" ? 0.45 : e.shape === "twist" ? 0.55 : 1, d = p ? 0.35 : e.shape === "roll" || e.shape === "twist" ? 0.6 : 1;
  e.card && (m *= 0.5, d *= 0.5), e.shape === "envelope" && (m = 0.08, d = 0.25);
  let g = e.w * e.h / (0.84 * 1.1);
  for (let v = 0; v < Math.round(8 * m * g); v++) h(2, 0.08 + l() * 0.1, o() * (0.8 + l() * 0.4) * d);
  for (let v = 0; v < Math.round(46 * m * g); v++) h(0.1 + l() * 0.28, 0.035 + l() * 0.05, o() * (0.45 + l() * 0.4) * d);
  for (let v = 0; v < Math.round(150 * m * g); v++) h(0.03 + l() * 0.1, 0.01 + l() * 0.025, o() * (0.2 + l() * 0.35) * d);
  if (e.shape === "twist")
    for (let v of [-1, 1]) for (let S = 0; S < 26; S++) h(0.12 + l() * 0.3, 0.012 + l() * 0.02, o() * (0.5 + l() * 0.5), v * r * (0.6 + l() * 0.36), (l() * 2 - 1) * a, Math.PI / 2 + v * (0.5 + l() * 0.35));
  if ((e.shape === "half" || e.shape === "quarters") && h(2, 0.022, 0.6, 0, 0, Math.PI / 2), e.shape === "quarters" && h(2, 0.022, -0.55, 0, 0, 0), e.shape === "thirds" && (h(2, 0.02, 0.55, 0, -e.h / 6 * 1.08, 0), h(2, 0.02, -0.55, 0, e.h / 6, 0)), e.shape === "accordion") {
    let v = e.w / 6;
    h(2, 0.02, 0.55, -v, 0, Math.PI / 2), h(2, 0.02, -0.55, 0, 0, Math.PI / 2), h(2, 0.02, 0.55, v, 0, Math.PI / 2);
  }
  e.shape === "triangle" && (h(2, 0.022, 0.6, 0, 0, Math.PI / 4), h(2, 0.022, -0.55, 0, 0, -Math.PI / 4)), e.shape === "envelope" && h(2, 0.02, 0.5, 0, e.foldY, 0);
  let b = Array.isArray(e.states) ? e.states : [];
  if (b.includes("creased"))
    for (let v = 0; v < 90; v++) h(0.04 + l() * 0.12, 8e-3 + l() * 0.015, o() * (0.3 + l() * 0.35));
  if (b.includes("damp")) {
    let v = Fe(e.seed * 3 + 17);
    for (let S = 0; S < t; S++) {
      let i = (S + 0.5) / f - a;
      for (let P = 0; P < n; P++) {
        let C = (P + 0.5) / u - r;
        s[S * n + P] += Math.sin((C * 2.2 + i) * 18) * 0.18 + (v(C * 8, i * 8) - 0.5) * 0.22;
      }
    }
  }
  let y = 1e-6;
  for (let v = 0; v < s.length; v++) Math.abs(s[v]) > y && (y = Math.abs(s[v]));
  for (let v = 0; v < s.length; v++) s[v] /= y;
  return s;
}
function ct(e, n, t) {
  let l = Fe(e.seed * 7 + 11), o = te(e.seed * 5 + 3), r = Math.hypot(n, t), a = new Float32Array(n * t), s = (f) => {
    for (let h = 0; h < t; h++) for (let p = 0; p < n; p++) a[h * n + p] = f(p, h);
  }, u = e.form || "corner";
  if (u === "edge") {
    let f = Math.floor(o() * 3);
    s((h, p) => (f === 0 ? t - p : f === 1 ? h : n - h) / (r * 1.6) + (l(h * 0.05, p * 0.05) - 0.5) * 0.35);
  } else if (u === "center") {
    let f = n * (0.3 + 0.4 * o()), h = t * (0.3 + 0.4 * o());
    s((p, m) => Math.hypot(p - f, m - h) / (r * 0.7) + (l(p * 0.04, m * 0.04) - 0.5) * 0.3);
  } else if (u === "spots") {
    let f = 3 + Math.floor(o() * 4), h = [];
    for (let p = 0; p < 200 && h.length < f; p++) {
      let m = n * (0.12 + 0.76 * o()), d = t * (0.12 + 0.76 * o());
      h.every((g) => Math.hypot(g[0] - m, g[1] - d) > r * 0.2) && h.push([m, d]);
    }
    s((p, m) => {
      let d = 1 / 0;
      return h.forEach((g) => {
        d = Math.min(d, Math.hypot(p - g[0], m - g[1]));
      }), d / (r * 0.5) + (l(p * 0.05, m * 0.05) - 0.5) * 0.1;
    });
  } else if (u === "singed")
    s((f, h) => Math.min(f, n - 1 - f, h, t - 1 - h) / (r * 0.5) + (l(f * 0.03, h * 0.03) - 0.5) * 0.12);
  else {
    let f = e.seed % 4, h = f & 1 ? n : 0, p = f & 2 ? t : 0;
    s((m, d) => Math.sqrt((m - h) * (m - h) + (d - p) * (d - p)) / r + (l(m * 0.02, d * 0.02) - 0.5) * 0.32);
  }
  return a;
}

// .build/worker.js
var mt = /* @__PURE__ */ (() => {
  let e, n = 0, t = /* @__PURE__ */ new Map();
  function l() {
    try {
      let r = [te, Fe, ht, ct].map((a) => a.toString()).join(`
`) + `
onmessage = (e) => { const { id, name, args } = e.data; const r = name === 'creases' ? ${ht.name}(...args) : ${ct.name}(...args); postMessage({ id, r }, [r.buffer]); };`;
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
  let o = (r, a) => r === "creases" ? ht(...a) : ct(...a);
  return {
    run(r, a) {
      if (e === void 0 && l(), !e) return Promise.resolve(o(r, a));
      let s = ++n, u = new Promise((h) => {
        let p = (m) => h(m);
        p.redo = () => h(o(r, a)), t.set(s, p);
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
var bt = 1070;
function wn(e) {
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
var Pn = (e, n, t) => `${n && !e.hand ? "bold " : ""}${Math.round(t)}px "${e.font}", "Courier Prime", monospace`, Rn = (e) => [e[0] + (200 - e[0]) * 0.4 + 8, e[1] + (170 - e[1]) * 0.3 + 4, e[2] + (120 - e[2]) * 0.3 - 4].map(Math.round);
function Mn(e, n, t, l, o, r, a) {
  let s = wn(l), u = n.states.includes("faded") ? Rn(t.ink) : t.ink;
  if (n.states.includes("scribbled") && !s.some((y) => y.toks.some((v) => v.kind === "strike"))) {
    let y = [];
    s.forEach((v) => v.toks.forEach((S) => {
      S.kind === "w" && S.t.replace(/\W/g, "").length >= 4 && y.push(S);
    }));
    for (let v = 0; v < 2 && y.length; v++) {
      let S = y.splice(Math.floor(a() * y.length), 1)[0];
      S.kind = "strike", S.fix = Ft[Math.floor(a() * Ft.length)];
    }
  }
  let f = K(1 - r * 0.34), h = o.cols || 1, p = (o.w - (h - 1) * 40) / h, m = 0, d = o.y, g = o.y + o.h, b = Fe(n.seed + 5);
  return s.forEach((y) => {
    let v = y.head ? t.size * (o.headK || 1.35) : t.size, S = y.head ? t.lineHeight * (o.headK || 1.35) : t.lineHeight;
    e.font = Pn(t, y.head, v);
    let i = e.measureText(" ").width, P = y.head && o.headFull ? o.w : p, C = [[]], N = 0;
    if (y.toks.forEach((I) => {
      let B = e.measureText(I.t).width;
      N > 0 && N + i + B > P && (C.push([]), N = 0), C[C.length - 1].push({ ...I, tw: B }), N += (N > 0 ? i : 0) + B;
    }), !y.toks.length) {
      d += S * 0.7;
      return;
    }
    C.forEach((I) => {
      d > g && m < h - 1 && !(y.head && o.headFull) && (m++, d = o.colY || o.y);
      let B = I.reduce((k, D) => k + D.tw, 0) + i * (I.length - 1), ne = o.x + (y.head && o.headFull ? 0 : m * (p + 40)), W = o.center || y.head && o.centerHead ? ne + (P - B) / 2 : ne;
      I.forEach((k) => {
        kn(e, t, k, W, d, u, a, b), k.kind === "strike" && An(e, k, W, d, v, a), k.kind === "redact" && (e.fillStyle = `rgba(12,12,14,${f})`, e.fillRect(W - 5, d - v * 0.82, k.tw + 10, v * 1.06)), W += k.tw + i;
      }), d += S;
    }), y.head && o.headFull && (o.colY = d + 10);
  }), d;
}
function kn(e, n, t, l, o, r, a, s) {
  if (n.hand) {
    e.save(), e.translate(l, o + (a() - 0.5) * 3), e.rotate((a() - 0.5) * 0.04), e.fillStyle = ie(r, 0.9), e.fillText(t.t, 0, 0), e.restore();
    return;
  }
  if (n.carbon) {
    let u = l;
    for (let f of t.t) {
      let h = (a() - 0.5) * 1.5, p = (a() - 0.5) * 1.8;
      e.fillStyle = "rgba(100, 115, 240, 0.28)", e.fillText(f, u + h - 1, o + p), e.fillText(f, u + h + 1, o + p), e.fillText(f, u + h, o + p + 1), e.fillStyle = ie(r, 0.82 + a() * 0.18), e.fillText(f, u + h, o + p), u += e.measureText(f).width;
    }
    return;
  }
  if (n.typewriter) {
    let u = l;
    for (let f of t.t) {
      let h = 0.72 + a() * 0.28;
      n.fades && (h *= 0.35 + 0.65 * s(u * 6e-3, o * 4e-3)), e.fillStyle = ie(r, h), e.fillText(f, u, o + (a() - 0.5) * 2), u += e.measureText(f).width;
    }
    return;
  }
  e.fillStyle = ie(r, 0.92), e.fillText(t.t, l, o);
}
function An(e, n, t, l, o, r) {
  e.save(), e.strokeStyle = "rgba(165,28,30,0.85)", e.lineWidth = Math.max(2.5, o * 0.08), e.lineCap = "round";
  for (let a = 0; a < 2; a++) {
    e.beginPath();
    let s = l - o * (0.3 + 0.08 * a);
    e.moveTo(t - 4, s + (r() - 0.5) * 4), e.quadraticCurveTo(t + n.tw / 2, s + (r() - 0.5) * 8, t + n.tw + 4, s + (r() - 0.5) * 4), e.stroke();
  }
  n.fix && (e.fillStyle = "rgba(165,28,30,0.9)", e.font = `${Math.round(o * 0.62)}px "Caveat", cursive`, e.translate(t + n.tw * 0.25, l - o * 0.66), e.rotate(-0.06), e.fillText(n.fix, 0, 0)), e.restore();
}
function Jt(e, n, t, l, o, r, a = 6) {
  let s = Math.ceil(o / a), u = Math.ceil(r / a), f = ye(s, u, !0), h = f.getContext("2d"), p = Math.max(s / n.width, u / n.height);
  h.drawImage(n, (s - n.width * p) / 2, (u - n.height * p) / 2, n.width * p, n.height * p);
  let m = h.getImageData(0, 0, s, u).data;
  e.fillStyle = "rgba(20,20,20,0.88)";
  for (let d = 0; d < u; d++) for (let g = 0; g < s; g++) {
    let b = (d * s + g) * 4, y = (m[b] * 0.3 + m[b + 1] * 0.59 + m[b + 2] * 0.11) / 255, v = a * 0.56 * Math.sqrt(1 - y);
    v > 0.35 && (e.beginPath(), e.arc(t + (g + 0.5) * a, l + (d + 0.5) * a, v, 0, Math.PI * 2), e.fill());
  }
}
function _n(e, n, t) {
  let l = [], o = "";
  return n.split(" ").forEach((r) => {
    let a = o ? o + " " + r : r;
    e.measureText(a).width > t && o ? (l.push(o), o = r) : o = a;
  }), o && l.push(o), l;
}
function Zt(e) {
  let n = String(e || "").toUpperCase();
  return n >= "0" && n <= "9" ? [n.charCodeAt(0) - 48 + 2] : n >= "A" && n <= "I" ? [0, n.charCodeAt(0) - 65 + 3] : n >= "J" && n <= "R" ? [1, n.charCodeAt(0) - 74 + 3] : n >= "S" && n <= "Z" ? [2, n.charCodeAt(0) - 83 + 4] : n === "-" ? [1] : n === "&" || n === "+" ? [0] : n === "/" ? [2, 3] : n === "." ? [0, 5, 10] : n === "," ? [2, 5, 10] : n === "=" ? [5, 10] : n === "$" ? [1, 5, 10] : n === "*" ? [1, 6, 10] : [];
}
var gt = {
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
    if (e.fillStyle = "rgba(40,40,40,0.12)", e.fillRect(a, s, u, f), r.photo) Jt(e, r.photo, a, s, u, f);
    else
      for (let h = s + 4; h < s + f; h += 7) for (let p = a + 4; p < a + u; p += 7) {
        let m = 0.5 + 0.5 * Math.sin(p * 0.02) * Math.cos(h * 0.025);
        e.fillStyle = `rgba(20,20,20,${0.55 * m})`, e.beginPath(), e.arc(p, h, 1.2 + 2 * m, 0, Math.PI * 2), e.fill();
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
      let u = r.img.width, f = r.img.height, h = Math.max(s / u, s / f);
      e.save(), e.beginPath(), e.rect(a, a, s, s), e.clip(), e.filter = "saturate(0.8) contrast(0.92) brightness(1.05)", e.drawImage(r.img, a + (s - u * h) / 2, a + (s - f * h) / 2, u * h, f * h), e.filter = "none", e.fillStyle = "rgba(255,200,140,0.10)", e.fillRect(a, a, s, s);
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
    for (let d = 0; d < n; d += 15)
      e.beginPath(), e.moveTo(d, 0), e.lineTo(d, t), e.stroke();
    for (let d = 0; d < t; d += 15)
      e.beginPath(), e.moveTo(0, d), e.lineTo(n, d), e.stroke();
    e.strokeStyle = "rgba(95, 200, 255, 0.32)", e.lineWidth = 1.4;
    for (let d = 0; d < n; d += 60)
      e.beginPath(), e.moveTo(d, 0), e.lineTo(d, t), e.stroke();
    for (let d = 0; d < t; d += 60)
      e.beginPath(), e.moveTo(0, d), e.lineTo(n, d), e.stroke();
    e.strokeStyle = "rgba(140, 225, 255, 0.52)", e.lineWidth = 2.2;
    for (let d = 0; d < n; d += 180)
      e.beginPath(), e.moveTo(d, 0), e.lineTo(d, t), e.stroke();
    for (let d = 0; d < t; d += 180)
      e.beginPath(), e.moveTo(0, d), e.lineTo(n, d), e.stroke();
    let o = 26;
    e.strokeStyle = "rgba(170, 235, 255, 0.75)", e.lineWidth = 3, e.strokeRect(o, o, n - 2 * o, t - 2 * o), e.lineWidth = 1.2, e.strokeRect(o + 6, o + 6, n - 2 * o - 12, t - 2 * o - 12), e.fillStyle = "rgba(180, 235, 255, 0.75)", e.font = 'bold 12px "Courier Prime", monospace', e.textAlign = "center", e.textBaseline = "middle", ["A", "B", "C", "D", "E", "F"].forEach((d, g) => {
      let b = o + (g + 0.5) * ((n - 2 * o) / 6);
      e.fillText(d, b, o - 12), e.fillText(d, b, t - o + 12);
    }), ["1", "2", "3", "4"].forEach((d, g) => {
      let b = o + (g + 0.5) * ((t - 2 * o) / 4);
      e.fillText(d, o - 12, b), e.fillText(d, n - o + 12, b);
    }), [[o, o], [n - o, o], [o, t - o], [n - o, t - o]].forEach(([d, g]) => {
      e.beginPath(), e.moveTo(d - 10, g), e.lineTo(d + 10, g), e.moveTo(d, g - 10), e.lineTo(d, g + 10), e.stroke();
    });
    let r = n * 0.72, a = t * 0.4;
    e.save(), e.strokeStyle = "rgba(130, 215, 255, 0.55)", e.lineWidth = 1.5, e.setLineDash([12, 4, 3, 4]), e.beginPath(), e.moveTo(r - 170, a), e.lineTo(r + 170, a), e.stroke(), e.beginPath(), e.moveTo(r, a - 150), e.lineTo(r, a + 150), e.stroke(), e.setLineDash([]), e.strokeStyle = "rgba(200, 240, 255, 0.85)", e.lineWidth = 2.4, e.beginPath(), e.arc(r, a, 130, 0, Math.PI * 2), e.stroke(), e.lineWidth = 1.8, e.beginPath(), e.arc(r, a, 85, 0, Math.PI * 2), e.stroke(), e.beginPath(), e.arc(r, a, 42, 0, Math.PI * 2), e.stroke(), e.strokeStyle = "rgba(110, 205, 255, 0.6)", e.lineWidth = 1.2, e.setLineDash([6, 4]), e.beginPath(), e.arc(r, a, 108, 0, Math.PI * 2), e.stroke(), e.setLineDash([]), e.fillStyle = "rgba(8, 25, 45, 0.9)", e.strokeStyle = "rgba(210, 245, 255, 0.9)", e.lineWidth = 1.5;
    for (let d = 0; d < 8; d++) {
      let g = d * Math.PI / 4, b = r + Math.cos(g) * 108, y = a + Math.sin(g) * 108;
      e.beginPath(), e.arc(b, y, 9, 0, Math.PI * 2), e.fill(), e.stroke();
    }
    e.save(), e.beginPath(), e.arc(r, a, 130, Math.PI, Math.PI * 1.5), e.lineTo(r, a), e.closePath(), e.clip(), e.strokeStyle = "rgba(100, 190, 255, 0.35)", e.lineWidth = 1.2;
    for (let d = -150; d < 150; d += 8)
      e.beginPath(), e.moveTo(r + d - 150, a - 150), e.lineTo(r + d + 150, a + 150), e.stroke();
    e.restore(), e.strokeStyle = "rgba(170, 230, 255, 0.7)", e.lineWidth = 1.5, e.fillStyle = "rgba(215, 245, 255, 0.9)", e.font = 'bold 12px "Courier Prime", monospace', e.beginPath(), e.moveTo(r - 130, a + 145), e.lineTo(r + 130, a + 145), e.moveTo(r - 130, a + 135), e.lineTo(r - 130, a + 155), e.moveTo(r + 130, a + 135), e.lineTo(r + 130, a + 155), e.stroke(), e.fillText("<-- \xD8 260.00 mm -->", r, a + 158), e.beginPath(), e.moveTo(r + 30, a - 30), e.lineTo(r + 80, a - 80), e.lineTo(r + 140, a - 80), e.stroke(), e.textAlign = "left", e.fillText("BORE \xD8 42.0 H7", r + 85, a - 86);
    let s = r + 80, u = a - 130;
    e.strokeStyle = "rgba(160, 225, 255, 0.6)", e.lineWidth = 1.2, e.beginPath(), e.arc(s + 40, u, 10, 0, Math.PI * 2), e.stroke(), e.beginPath(), e.arc(s + 40, u, 4, 0, Math.PI * 2), e.stroke(), e.beginPath(), e.moveTo(s, u - 10), e.lineTo(s + 20, u - 5), e.lineTo(s + 20, u + 5), e.lineTo(s, u + 10), e.closePath(), e.stroke(), e.restore();
    let f = 390, h = 135, p = n - o - 6 - f, m = t - o - 6 - h;
    e.fillStyle = "rgba(8, 26, 48, 0.92)", e.fillRect(p, m, f, h), e.strokeStyle = "rgba(170, 235, 255, 0.8)", e.lineWidth = 2, e.strokeRect(p, m, f, h), e.lineWidth = 1.2, e.beginPath(), e.moveTo(p, m + 38), e.lineTo(p + f, m + 38), e.moveTo(p, m + 86), e.lineTo(p + f, m + 86), e.moveTo(p + 240, m + 38), e.lineTo(p + 240, m + h), e.moveTo(p + 120, m + 86), e.lineTo(p + 120, m + h), e.stroke(), e.fillStyle = "rgba(215, 245, 255, 0.95)", e.textAlign = "left", e.font = 'bold 15px "Courier Prime", monospace', e.fillText("AQUILA DYNAMICS \xB7 DEFENSE & NAVAL", p + 14, m + 24), e.font = 'bold 13px "Courier Prime", monospace', e.fillText("VALVE ASSEMBLY \xB7 HIGH PRESSURE", p + 14, m + 58), e.font = '11px "Courier Prime", monospace', e.fillStyle = "rgba(165, 220, 255, 0.85)", e.fillText("DWG NO: AQ-9042-REV-D", p + 14, m + 76), e.fillText("SCALE: 1:25", p + 14, m + 110), e.fillText("SHT 1 OF 1", p + 134, m + 110), e.fillText("DRN: E.M.", p + 252, m + 58), e.fillText("CHK: R.A.", p + 252, m + 76), e.fillStyle = "rgba(100, 255, 180, 0.9)", e.font = 'bold 11px "Courier Prime", monospace', e.fillText("APPROVED", p + 252, m + 110), e.strokeStyle = "rgba(230, 248, 255, 0.22)", e.lineWidth = 2.5, e.beginPath(), e.moveTo(n / 2, o), e.lineTo(n / 2, t - o), e.stroke(), e.beginPath(), e.moveTo(o, t / 2), e.lineTo(n - o, t / 2), e.stroke();
  },
  postcard(e, n, t) {
    e.strokeStyle = "rgba(180, 160, 130, 0.4)", e.lineWidth = 2, e.strokeRect(24, 24, n - 48, t - 48);
  },
  punchcard(e, n, t, l, o) {
    e.save(), e.strokeStyle = "rgba(100, 85, 70, 0.45)", e.lineWidth = 1.5, e.beginPath(), e.moveTo(0, 50), e.lineTo(50, 0), e.stroke(), e.fillStyle = "rgba(40, 85, 130, 0.25)", e.fillRect(0, 0, n, t * 0.16), e.strokeStyle = "rgba(40, 85, 130, 0.55)", e.lineWidth = 2, e.beginPath(), e.moveTo(0, t * 0.16), e.lineTo(n, t * 0.16), e.stroke();
    let r = 34, s = (n - 34 - r) / 79, u = t * 0.23, f = (t * 0.94 - u) / 11, h = (o.text.split(`
`)[0] || "").slice(0, 80);
    e.fillStyle = "rgba(25, 25, 25, 0.92)", e.font = 'bold 15px "Courier Prime", monospace', e.textAlign = "center";
    for (let p = 0; p < h.length; p++)
      h[p] !== " " && e.fillText(h[p], r + p * s, 24);
    e.fillStyle = "rgba(70, 60, 50, 0.65)", e.font = '9px "VT323", monospace';
    for (let p = 1; p <= 80; p++) {
      let m = r + (p - 1) * s;
      (p === 1 || p % 5 === 0) && (e.fillText(String(p), m, t * 0.14), e.fillText(String(p), m, t - 12));
    }
    e.font = '11px "VT323", monospace', e.fillStyle = "rgba(90, 80, 70, 0.45)";
    for (let p = 0; p < 10; p++) {
      let m = u + (p + 2) * f;
      for (let d = 1; d <= 80; d++) {
        let g = r + (d - 1) * s;
        e.fillText(String(p), g, m);
      }
    }
    e.fillStyle = "rgba(80, 70, 60, 0.7)", e.font = 'bold 11px "Courier Prime", monospace', e.fillText("IBM 5081", n - 80, t - 28), e.fillStyle = "rgba(15, 12, 10, 0.45)";
    for (let p = 0; p < h.length; p++) {
      let m = Zt(h[p]), d = r + p * s;
      for (let g of m) {
        let b = u + g * f;
        e.fillRect(d - 5, b - 10, 10, 20);
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
    gt.shipping && gt.shipping(e, n, t, l, o, r);
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
    let o = 146, r = t - 30 - 6, a = 210, s = n - 430, u = n - 370, f = n - 250, h = n - 130, p = 42;
    for (let m = o + p, d = 0; m < r; m += p, d++)
      d % 2 === 1 && (e.fillStyle = "rgba(180, 220, 200, 0.15)", e.fillRect(36, m, n - 60 - 12, p)), e.strokeStyle = "rgba(90, 160, 130, 0.35)", e.lineWidth = 1, e.beginPath(), e.moveTo(36, m), e.lineTo(n - 30 - 6, m), e.stroke();
    e.fillStyle = "rgba(40, 90, 65, 0.88)", e.fillRect(36, o, n - 60 - 12, p), e.fillStyle = "#f0f8f2", e.font = 'bold 14px "Courier Prime", monospace', e.textAlign = "center", e.fillText("DATE", (36 + a) / 2, o + 26), e.fillText("PARTICULARS / DESCRIPTION", (a + s) / 2, o + 26), e.fillText("FOL", (s + u) / 2, o + 26), e.fillText("DEBITS ($ | \xA2)", (u + f) / 2, o + 26), e.fillText("CREDITS ($ | \xA2)", (f + h) / 2, o + 26), e.fillText("BALANCE", (h + n - 30 - 6) / 2, o + 26), e.strokeStyle = "rgba(215, 45, 45, 0.65)", e.lineWidth = 1.5, e.beginPath(), e.moveTo(36, o), e.lineTo(36, r), e.stroke(), e.beginPath(), e.moveTo(40, o), e.lineTo(40, r), e.stroke(), e.strokeStyle = "rgba(70, 120, 160, 0.45)", e.lineWidth = 1.2, e.beginPath(), e.moveTo(a, o), e.lineTo(a, r), e.stroke(), e.beginPath(), e.moveTo(s, o), e.lineTo(s, r), e.stroke(), e.strokeStyle = "rgba(215, 45, 45, 0.65)", e.lineWidth = 1.8, e.beginPath(), e.moveTo(u, o), e.lineTo(u, r), e.stroke(), e.beginPath(), e.moveTo(f, o), e.lineTo(f, r), e.stroke(), e.beginPath(), e.moveTo(h, o), e.lineTo(h, r), e.stroke(), e.beginPath(), e.moveTo(h + 3, o), e.lineTo(h + 3, r), e.stroke(), e.strokeStyle = "rgba(60, 110, 190, 0.45)", e.lineWidth = 1, e.beginPath(), e.moveTo(f - 35, o + p), e.lineTo(f - 35, r), e.stroke(), e.beginPath(), e.moveTo(h - 35, o + p), e.lineTo(h - 35, r), e.stroke(), e.beginPath(), e.moveTo(n - 30 - 41, o + p), e.lineTo(n - 30 - 41, r), e.stroke(), e.strokeStyle = "rgba(215, 45, 45, 0.85)", e.lineWidth = 1.5, e.beginPath(), e.moveTo(u, r - 48), e.lineTo(n - 30 - 6, r - 48), e.stroke(), e.beginPath(), e.moveTo(u, r - 12), e.lineTo(n - 30 - 6, r - 12), e.stroke(), e.beginPath(), e.moveTo(u, r - 8), e.lineTo(n - 30 - 6, r - 8), e.stroke();
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
function Cn(e, n, t, l, o) {
  e.strokeStyle = "rgba(100, 90, 75, 0.4)", e.lineWidth = 2, e.beginPath(), e.moveTo(n / 2, 40), e.lineTo(n / 2, t - 40), e.stroke();
  let r = n - 140, a = 50;
  e.strokeStyle = "rgba(100, 90, 75, 0.5)", e.lineWidth = 1.5, e.setLineDash([4, 4]), e.strokeRect(r, a, 90, 110), e.setLineDash([]), e.fillStyle = "rgba(120, 100, 80, 0.5)", e.font = '12px "Courier Prime", monospace', e.textAlign = "center", e.fillText("AFFIX", r + 45, a + 50), e.fillText("STAMP", r + 45, a + 68), e.strokeStyle = "rgba(40, 50, 80, 0.55)", e.lineWidth = 2, e.beginPath(), e.arc(r - 30, a + 60, 44, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(40, 50, 80, 0.6)", e.font = 'bold 13px "Courier Prime", monospace', e.fillText("POST", r - 30, a + 64), e.textAlign = "left", e.strokeStyle = "rgba(120, 110, 95, 0.4)", e.lineWidth = 1.5;
  for (let s = t * 0.45; s < t - 60; s += 44)
    e.beginPath(), e.moveTo(n / 2 + 40, s), e.lineTo(n - 40, s), e.stroke();
}
function In(e, n, t, l, o, r) {
  let a = Math.round(l.flap / l.h * t);
  e.save(), e.translate(n / 2, a * 0.36), e.fillStyle = "rgba(140,20,24,0.95)", e.beginPath();
  for (let f = 0; f <= Math.PI * 2 + 0.01; f += 0.2) {
    let h = 46 * (1 + 0.06 * Math.sin(f * 7 + r() * 0.3));
    f ? e.lineTo(Math.cos(f) * h, Math.sin(f) * h) : e.moveTo(h, 0);
  }
  e.fill(), e.strokeStyle = "rgba(90,10,14,0.8)", e.lineWidth = 3, e.beginPath(), e.arc(0, 0, 30, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(80,8,12,0.9)", e.font = 'bold 30px "Special Elite"', e.textAlign = "center", e.fillText("A", 0, 11), e.restore();
  let s = n - 180, u = a + 40;
  e.fillStyle = "rgba(70,105,140,0.85)", e.fillRect(s, u, 120, 140), e.strokeStyle = "rgba(255,255,255,0.8)", e.setLineDash([4, 4]), e.lineWidth = 3, e.strokeRect(s + 6, u + 6, 108, 128), e.setLineDash([]), e.fillStyle = "rgba(255,255,255,0.9)", e.font = 'bold 44px "Special Elite"', e.textAlign = "center", e.fillText("25", s + 60, u + 88), e.strokeStyle = "rgba(40,40,60,0.55)", e.lineWidth = 3, e.beginPath(), e.arc(s - 30, u + 90, 58, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(40,40,60,0.6)", e.font = '20px "Courier Prime"', e.fillText("POST", s - 30, u + 98);
  for (let f = 0; f < 4; f++)
    e.beginPath(), e.moveTo(s - 120, u + 60 + f * 18), e.bezierCurveTo(s - 60, u + 50 + f * 18, s, u + 70 + f * 18, s + 60, u + 60 + f * 18), e.stroke();
  e.textAlign = "left", e.font = '52px "Caveat"', e.fillStyle = ie(l.ink, 0.9), o.address.split(`
`).forEach((f, h) => e.fillText(f, 150, a + 330 + h * 62));
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
function Fn(e, n, t, l) {
  let a = (n - 88 - 26) / 2;
  e.fillStyle = "rgba(25,25,25,0.9)", e.font = 'bold 34px "Libre Baskerville"', e.fillText("CLASSIFIEDS", 44, 92), e.fillRect(40, 108, n - 88 + 8, 3);
  let s = 44 + a + 26, u = 132, f = Math.round(a * 0.68);
  l.photo && Jt(e, l.photo, s, u, a, f), e.font = 'italic 16px "Libre Baskerville"', e.fillText("Old town, archive photo.", s, u + f + 22);
  let h = t - 60, p = [150, u + f + 60], m = 0, d = 44, g = p[0];
  for (let [b, y] of Ln) {
    e.font = '18px "Libre Baskerville"';
    let v = _n(e, b + " " + y, a);
    if (g + v.length * 24 > h && (m === 1 || (m = 1, d = s, g = p[1], g + v.length * 24 > h)))
      break;
    v.forEach((S, i) => {
      if (i === 0) {
        e.font = 'bold 19px "Libre Baskerville"', e.fillText(b, d, g);
        let P = e.measureText(b + " ").width;
        e.font = '18px "Libre Baskerville"', e.fillText(S.slice(b.length + 1), d + P, g);
      } else
        e.font = '18px "Libre Baskerville"', e.fillText(S, d, g);
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
async function On(e, n, t, l = "") {
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
async function Qe(e, n, t, l) {
  let o = Math.round(n.w * bt), r = Math.round(n.h * bt), a = ye(o, r), s = a.getContext("2d"), u = t === "front", f = te(e.seed * 31 + (u ? 5 : 9)), h = {};
  n.photo && u && (h.img = await ft(e.image || Le.assets + "photos/sunset.webp")), e.type === "newspaper" && (u || !e.back) && (h.photo = await ft(Le.assets + "photos/" + (u ? "sea" : "city") + ".webp"));
  let p = e.type === "notebook" || e.type === "form" || e.type === "blueprint" || e.type === "ledger";
  gt[e.type] && (u || p) && gt[e.type](s, o, r, n, e, h), e.type === "envelope" && !u && In(s, o, r, n, e, f), e.type === "postcard" && !u && !e.back && Cn(s, o, r, e, f), e.type === "newspaper" && !u && !e.back && Fn(s, o, r, h);
  let m = e.type === "envelope" ? "" : u ? e.text : e.back, d = u ? xt[e.type] ? xt[e.type](o, r, n) : { x: 50, y: 50, w: o - 100, h: r - 100 } : { x: Math.round(n.x * 0.8), y: Math.min(n.y, Math.round(r * 0.28)), w: o - Math.round(n.x * 1.6), h: r - Math.min(n.y, Math.round(r * 0.28)) - 40, center: e.type === "ticket" };
  e.type === "ticket" && !u && (d.x = Math.round(o * 0.55), d.w = Math.round(o * 0.4)), e.type === "postcard" && !u && (d.x = Math.round(o * 0.54), d.w = Math.round(o * 0.42)), e.type === "polaroid" && !u && (d = { x: 60, y: Math.round(r * 0.3), w: o - 120, h: r * 0.6, center: !0 });
  let g = m && d ? Mn(s, e, n, m, d, l, f) : 0;
  if (u && e.rich && d) {
    if (e.rich.mode === "canvas" && typeof e.rich.body == "function")
      try {
        await e.rich.body(s, d, o, r);
      } catch {
      }
    else if (typeof e.rich.body == "string")
      try {
        let y = await On(e.rich.body, d.w, d.h, e.rich.style || "");
        y && s.drawImage(y, d.x, d.y);
      } catch {
      }
  }
  let b = te(e.seed * 17 + (u ? 1 : 2));
  e.states.includes("coffee") && await Un(a, s, o, r, e, u), e.states.includes("water") && await Dn(s, o, r, e, u), e.states.includes("prints") && await Nn(s, o, r, e, u), e.states.includes("wine") && await zn(a, s, o, r, e, u), e.states.includes("ink") && Xn(s, o, r, e, u), e.states.includes("aged") && Bn(s, o, r, b), e.states.includes("faded") && Yn(s, o, r, e), e.states.includes("foxing") && qn(s, o, r, e), e.states.includes("staple") && $n(s, o, r, e, u), e.states.includes("grease") && jn(s, o, r, e, u), e.states.includes("dogear") && Kn(s, o, r, e, u), e.states.includes("damp") && xn(s, o, r, e), e.states.includes("creased") && Jn(s, o, r, e);
  for (let y of e.states)
    if (dt[y])
      try {
        await dt[y](s, a, o, r, e, u, b);
      } catch {
      }
  return u && e.states.includes("stamp") && Hn(s, o, r, e, g), u && e.states.includes("tape") && Vn(s, o, r, e), a;
}
function Dt(e, n, t, l, o, r, a, s) {
  e.save(), e.globalCompositeOperation = "multiply", e.globalAlpha = a, e.translate(t, l), s || e.scale(-1, 1), e.rotate(r), e.drawImage(n, -o / 2, -o / 2, o, o), e.restore();
}
async function Dn(e, n, t, l, o) {
  let r = await Xe("water");
  if (!r) return;
  let a = te(l.seed * 23 + 4), s = n * (0.25 + 0.5 * a()), u = t * (0.25 + 0.5 * a()), f = Math.min(n, t) * (0.8 + 0.35 * a()), h = a() * Math.PI * 2;
  Dt(e, r, o ? s : n - s, u, f, h, o ? 0.85 : 0.6, o);
}
async function Nn(e, n, t, l, o) {
  let r = await Xe("prints");
  if (!r) return;
  let a = te(l.seed * 29 + 6);
  for (let s = 0; s < 2; s++) {
    let u = n * (s ? 0.86 - 0.08 * a() : 0.1 + 0.12 * a()), f = t * (0.72 + 0.2 * a()), h = Math.min(n, t) * (0.22 + 0.08 * a()), p = a() * Math.PI * 2;
    Dt(e, r, o ? u : n - u, f, h, p, o ? 0.6 : 0.4, o);
  }
}
async function Un(e, n, t, l, o, r) {
  let a = te(o.seed * 17 + 1), s = t * (0.3 + 0.4 * a()), u = l * (0.35 + 0.35 * a()), f = Math.min(t, l) * (0.13 + 0.07 * a()), h = a() * Math.PI * 2, p = r ? s : t - s, m = await Xe("coffee");
  if (r) {
    let g = ye(t, l);
    g.getContext("2d").drawImage(e, 0, 0), n.save(), n.beginPath(), n.arc(p, u, f * 1.02, 0, Math.PI * 2), n.clip(), n.clearRect(p - f * 1.1, u - f * 1.1, f * 2.2, f * 2.2), n.filter = "blur(2.5px)", n.globalAlpha = 0.85, n.drawImage(g, 0, 0), n.restore();
  }
  if (m) {
    Dt(n, m, p, u, f * 3.4, h, r ? 0.95 : 0.55, r);
    return;
  }
  n.save();
  let d = n.createRadialGradient(p, u, f * 0.1, p, u, f);
  d.addColorStop(0, "rgba(140,95,45,0.10)"), d.addColorStop(0.82, "rgba(125,82,36,0.17)"), d.addColorStop(1, "rgba(110,70,30,0)"), n.fillStyle = d, n.beginPath(), n.arc(p, u, f, 0, Math.PI * 2), n.fill();
  for (let g = 0; g < 3; g++) {
    n.strokeStyle = `rgba(100,62,26,${0.2 + 0.12 * a()})`, n.lineWidth = f * (0.03 + 0.03 * a()), n.beginPath();
    let b = a() * 6.28, y = f * (0.9 + 0.05 * g);
    for (let v = 0; v <= Math.PI * 2 + 0.01; v += 0.05) {
      let S = y * (1 + 0.025 * Math.sin(v * 5 + b) + 0.015 * Math.sin(v * 11 + b * 2));
      v === 0 ? n.moveTo(p + Math.cos(v) * S, u + Math.sin(v) * S) : n.lineTo(p + Math.cos(v) * S, u + Math.sin(v) * S);
    }
    n.stroke();
  }
  for (let g = 0; g < 3; g++) {
    let b = p + (a() - 0.5) * f * 1.2, y = f * (0.6 + a() * 1.2), v = n.createLinearGradient(0, u + f * 0.6, 0, u + f * 0.6 + y);
    v.addColorStop(0, "rgba(115,75,32,0.16)"), v.addColorStop(1, "rgba(115,75,32,0)"), n.fillStyle = v, n.fillRect(b - 5, u + f * 0.6, 9 + a() * 6, y);
  }
  n.restore();
}
function Bn(e, n, t, l) {
  e.save(), e.fillStyle = "rgba(150,110,45,0.08)", e.fillRect(0, 0, n, t);
  let o = e.createRadialGradient(n / 2, t / 2, Math.min(n, t) * 0.3, n / 2, t / 2, Math.max(n, t) * 0.75);
  o.addColorStop(0, "rgba(120,80,30,0)"), o.addColorStop(1, "rgba(120,80,30,0.28)"), e.fillStyle = o, e.fillRect(0, 0, n, t);
  for (let r = 0; r < 34; r++) {
    let a = l() * n, s = l() * t, u = 3 + l() * 14, f = e.createRadialGradient(a, s, 0, a, s, u);
    f.addColorStop(0, `rgba(125,85,40,${0.12 + l() * 0.2})`), f.addColorStop(1, "rgba(125,85,40,0)"), e.fillStyle = f, e.beginPath(), e.arc(a, s, u, 0, Math.PI * 2), e.fill();
  }
  e.restore();
}
async function zn(e, n, t, l, o, r) {
  let a = te(o.seed * 43 + 3), s = t * (0.3 + 0.4 * a()), u = l * (0.4 + 0.3 * a()), f = Math.min(t, l) * (0.1 + 0.04 * a()), h = r ? s : t - s, p = r ? 1 : 0.5;
  if (r) {
    let d = ye(t, l);
    d.getContext("2d").drawImage(e, 0, 0), n.save(), n.beginPath(), n.arc(h, u, f * 1.04, 0, Math.PI * 2), n.clip(), n.clearRect(h - f * 1.1, u - f * 1.1, f * 2.2, f * 2.2), n.filter = "blur(2px)", n.globalAlpha = 0.8, n.drawImage(d, 0, 0), n.restore();
  }
  n.save(), n.globalCompositeOperation = "multiply";
  let m = n.createRadialGradient(h, u, f * 0.2, h, u, f * 1.05);
  m.addColorStop(0, `rgba(120,14,38,${0.03 * p})`), m.addColorStop(0.8, `rgba(120,14,38,${0.1 * p})`), m.addColorStop(1, "rgba(90,8,28,0)"), n.fillStyle = m, n.beginPath(), n.arc(h, u, f * 1.05, 0, Math.PI * 2), n.fill(), n.lineCap = "round", n.filter = "blur(0.8px)";
  for (let d = 0; d < 2; d++) {
    let g = a() * 6.28, b = 3.4 + a() * 1.4, y = f * (0.94 + 0.12 * d + 0.03 * a()), v = a() * 6.28, S = (i, P) => {
      let C = (y - P) * (1 + 0.025 * Math.sin(i * 5 + v) + 0.012 * Math.sin(i * 9 + v * 2));
      return [h + Math.cos(i) * C, u + Math.sin(i) * C];
    };
    [[f * 0.22, 0.07, 0.04], [f * 0.07, 0.4, 0], [f * 0.03, 0.16, f * 0.06]].forEach(([i, P, C]) => {
      n.strokeStyle = `rgba(96,12,36,${P * p})`, n.lineWidth = i, n.beginPath();
      for (let N = 0, I = g; I <= g + b; N++, I += 0.04) {
        let B = S(I, C);
        N ? n.lineTo(B[0], B[1]) : n.moveTo(B[0], B[1]);
      }
      n.stroke();
    });
  }
  n.filter = "none";
  for (let d = 0, g = 4 + Math.floor(a() * 4); d < g; d++) {
    let b = a() * 6.28, y = f * (1.35 + a() * 1.1), v = f * (0.02 + 0.035 * a());
    n.fillStyle = `rgba(104,10,30,${0.45 * p})`, n.beginPath(), n.arc(h + Math.cos(b) * y, u + Math.sin(b) * y, v, 0, Math.PI * 2), n.fill(), d % 2 && (n.beginPath(), n.arc(h + Math.cos(b + 0.2) * y * 1.12, u + Math.sin(b + 0.2) * y * 1.12, v * 0.35, 0, Math.PI * 2), n.fill());
  }
  n.restore();
}
function Gn(e, n) {
  let t = [1, 2, 3, 5, 7, 11].map((o) => [o, e() * 6.28, (0.06 + 0.14 * e()) * 2 / o]), l = [];
  for (let o = 0; o < 40; o++) {
    let r = o / 40 * Math.PI * 2, a = 1;
    t.forEach(([s, u, f]) => {
      a += f * Math.sin(s * r + u);
    }), l.push([Math.cos(r) * n * a, Math.sin(r) * n * a]);
  }
  return l;
}
function Ot(e, n, t, l, o) {
  e.beginPath(), n.forEach((r, a) => {
    a ? e.lineTo(t + r[0] * o, l + r[1] * o) : e.moveTo(t + r[0] * o, l + r[1] * o);
  }), e.closePath(), e.fill();
}
function Xn(e, n, t, l, o) {
  let r = te(l.seed * 47 + 5), a = Math.min(n, t), s = n * (0.2 + 0.6 * r()), u = t * (0.2 + 0.6 * r()), f = a * (0.03 + 0.015 * r()), h = o ? s : n - s, p = o ? 1 : 0.5, m = [16, 22, 58], d = Gn(r, f);
  e.save(), e.fillStyle = ie(m, 0.07 * p), Ot(e, d, h, u, 1.45), Ot(e, d, h, u, 1.22), e.fillStyle = ie(m, 0.86 * p), e.filter = "blur(0.5px)", Ot(e, d, h, u, 1), e.filter = "none", e.fillStyle = ie(m, 0.86 * p);
  for (let P = 0, C = 6 + Math.floor(r() * 5); P < C; P++) {
    let N = r() * 6.28, I = f * (1.5 + 2.4 * r()), B = f * (0.16 + 0.14 * r()) * (1.6 - I / (f * 4));
    e.beginPath(), e.arc(h + Math.cos(N) * I, u + Math.sin(N) * I, Math.max(B, 0.8), 0, Math.PI * 2), e.fill();
  }
  let g = r() * 6.28, b = f * (1.6 + 1.2 * r()), y = Math.cos(g), v = Math.sin(g), S = [], i = [];
  for (let P = 0; P <= 10; P++) {
    let C = P / 10, N = f * 0.42 * Math.pow(1 - C, 1.3) * (0.85 + 0.3 * r()), I = f * 0.7 + b * C;
    S.push([y * I - v * N, v * I + y * N]), i.push([y * I + v * N, v * I - y * N]);
  }
  e.fillStyle = ie(m, 0.6 * p), e.beginPath(), S.concat(i.reverse()).forEach((P, C) => {
    C ? e.lineTo(h + P[0], u + P[1]) : e.moveTo(h + P[0], u + P[1]);
  }), e.closePath(), e.fill(), e.strokeStyle = ie(m, 0.28 * p), e.lineWidth = 0.9, e.lineCap = "round";
  for (let P = 0; P < 18; P++) {
    let C = r() * 6.28, N = f * (0.95 + 0.1 * r()), I = N + f * (0.3 + 0.9 * r());
    e.beginPath(), e.moveTo(h + Math.cos(C) * N, u + Math.sin(C) * N), e.lineTo(h + Math.cos(C + 0.05) * I, u + Math.sin(C + 0.05) * I), e.stroke();
  }
  e.restore();
}
function Yn(e, n, t, l) {
  let o = te(l.seed * 41 + 2), r = Fe(l.seed + 19), a = o() * Math.PI * 2, s = Math.cos(a), u = Math.sin(a), f = 96, h = Math.round(f * t / n), p = ye(f, h, !0), m = p.getContext("2d"), d = m.createImageData(f, h), g = d.data;
  for (let b = 0; b < h; b++) for (let y = 0; y < f; y++) {
    let v = K((y / f - 0.5) * s + (b / h - 0.5) * u + 0.5), S = Math.pow(v, 2.4) * (0.45 + 0.55 * r(y * 0.12, b * 0.12)), i = (b * f + y) * 4;
    g[i] = 165, g[i + 1] = 112, g[i + 2] = 45, g[i + 3] = Math.round(255 * 0.42 * S);
  }
  m.putImageData(d, 0, 0), e.save(), e.imageSmoothingQuality = "high", e.drawImage(p, 0, 0, n, t), e.restore();
}
function qn(e, n, t, l) {
  let o = te(l.seed * 61 + 11), r = Math.min(n, t) / 900, a = [[150, 78, 30], [170, 96, 40], [128, 62, 24]];
  e.save(), e.globalCompositeOperation = "multiply";
  for (let s = 0, u = 0; s < 150 && u < 900; u++) {
    let f = o() * n, h = o() * t, p = Math.max(Math.abs(f / n - 0.5), Math.abs(h / t - 0.5)) * 2;
    if (o() > 0.15 + 0.85 * p * p * p) continue;
    s++;
    let m = o() < 0.4, d = r * (m ? 4 + Math.pow(o(), 1.5) * 15 : 1 + Math.pow(o(), 2) * 5), g = a[Math.floor(o() * 3)], b = 0.34 + 0.4 * o(), y = e.createRadialGradient(0, 0, d * (m ? 0 : 0.55), 0, 0, d);
    m ? (y.addColorStop(0, ie(g, b * 0.6)), y.addColorStop(0.55, ie(g, b * 0.4)), y.addColorStop(1, ie(g, 0))) : (y.addColorStop(0, ie(g, b * 0.7)), y.addColorStop(0.85, ie(g, b * 0.8)), y.addColorStop(0.97, ie(g, b * 1.15)), y.addColorStop(1, ie(g, 0))), e.save(), e.translate(f, h), e.rotate(o() * 3.14), e.scale(1, m ? 0.55 + 0.45 * o() : 1), e.fillStyle = y, e.beginPath(), e.arc(0, 0, d, 0, Math.PI * 2), e.fill(), e.restore();
  }
  e.restore();
}
function Hn(e, n, t, l, o) {
  let r = te(l.seed * 59 + 9), a = Fe(l.seed + 23), s = String(l.stamp).toUpperCase(), u = r() < 0.6 ? [176, 26, 36] : [34, 64, 150], f = ye(1, 1).getContext("2d");
  f.font = 'bold 100px "Courier Prime", monospace', f.letterSpacing = "12px";
  let h = f.measureText(s).width / 100, p = n * 0.44, m = p / (h + 1.2), d = m * 2.1, g = -(0.14 + 0.17 * r()), b = n * (0.46 + 0.1 * r()), y = Math.min(t - d / 2 - 30, Math.max(t * 0.55, o + d / 2 + 24)), v = Math.ceil(Math.hypot(p, d) + m * 0.8), S = ye(v, v, !0), i = S.getContext("2d");
  i.translate(v / 2, v / 2), i.fillStyle = i.strokeStyle = ie(u, 1), i.textAlign = "center", i.textBaseline = "middle", i.font = `bold ${m}px "Courier Prime", monospace`, i.letterSpacing = m * 0.12 + "px", i.lineWidth = m * 0.13, i.strokeRect(-p / 2, -d / 2, p, d), i.globalAlpha = 0.5, i.lineWidth = m * 0.1, i.strokeRect(-p / 2 + m * 0.07, -d / 2 - m * 0.05, p, d), i.globalAlpha = 1, i.lineWidth = m * 0.05, i.strokeRect(-p / 2 + m * 0.3, -d / 2 + m * 0.3, p - m * 0.6, d - m * 0.6), i.fillText(s, -m * 0.06, m * 0.05);
  let P = i.getImageData(0, 0, v, v), C = P.data, N = v / 2;
  for (let I = 0; I < C.length; I += 4) {
    if (!C[I + 3]) continue;
    let B = I / 4, ne = B % v, W = Math.floor(B / v), k = (ne - N) / (p / 2), D = (W - N) / (d / 2), X = 1 - 0.25 * Math.min(1, k * k + D * D), J = K((a(ne / (m * 1.5), W / (m * 1.5)) - 0.25) * 3.2) * X * (r() < 0.94 ? 1 : 0.3);
    C[I + 3] = Math.round(C[I + 3] * J);
  }
  i.putImageData(P, 0, 0), e.save(), e.globalCompositeOperation = "multiply", e.globalAlpha = 0.9, e.translate(b, y), e.rotate(g), e.drawImage(S, -v / 2, -v / 2), e.restore();
}
function Vn(e, n, t, l) {
  let o = te(l.seed * 53 + 7), r = n * (0.24 + 0.04 * o()), a = n * 0.1;
  [[0.1, 0.05, 0.7], [0.9, 0.05, -0.7]].forEach(([s, u, f]) => {
    let h = n * (s + (o() - 0.5) * 0.03), p = t * (u + (o() - 0.5) * 0.02), m = f + (o() - 0.5) * 0.1;
    e.save(), e.translate(h, p), e.rotate(m);
    let d = [];
    for (let y = 0; y <= 6; y++) d.push([r / 2 - (y % 2 ? 0 : 2 + 4 * o()), -a / 2 + a * y / 6]);
    let g = () => {
      e.beginPath(), e.moveTo(-r / 2, -a / 2), d.forEach((y) => e.lineTo(y[0], y[1])), e.lineTo(-r / 2, a / 2), e.closePath();
    };
    g(), e.fillStyle = "rgba(226,176,96,0.48)", e.fill();
    let b = e.createLinearGradient(0, -a / 2, 0, a / 2);
    b.addColorStop(0, "rgba(255,248,230,0)"), b.addColorStop(0.3, "rgba(255,248,230,0.3)"), b.addColorStop(0.5, "rgba(255,248,230,0.06)"), b.addColorStop(1, "rgba(255,248,230,0)"), e.fillStyle = b, e.fill(), g(), e.strokeStyle = "rgba(140,92,36,0.5)", e.lineWidth = 2, e.stroke(), e.fillStyle = "rgba(140,92,36,0.16)", e.fillRect(-r / 2, -a / 2, r * 0.03, a);
    for (let y = 0, v = 6 + Math.floor(o() * 4); y < v; y++)
      e.fillStyle = `rgba(70,46,22,${0.3 + 0.3 * o()})`, e.beginPath(), e.arc((o() - 0.5) * r * 0.8, (o() - 0.5) * a * 0.7, 1 + 2 * o(), 0, Math.PI * 2), e.fill();
    e.restore();
  });
}
function $n(e, n, t, l, o) {
  let r = te(l.seed * 71 + 3), a = 54 + r() * 16, s = 48 + r() * 16, u = -0.52 + (r() - 0.5) * 0.15;
  if (e.save(), e.translate(o ? a : n - a, s), e.rotate(o ? u : -u), o) {
    e.fillStyle = "rgba(30, 20, 10, 0.7)", e.fillRect(-22, -3, 5, 6), e.fillRect(17, -3, 5, 6), e.fillStyle = "rgba(10, 10, 10, 0.35)", e.fillRect(-20, 1, 40, 5);
    let f = e.createLinearGradient(0, -3, 0, 3);
    f.addColorStop(0, "#c8cdd4"), f.addColorStop(0.3, "#ffffff"), f.addColorStop(0.7, "#858d99"), f.addColorStop(1, "#535b66"), e.fillStyle = f, e.fillRect(-20, -3, 40, 5), e.fillStyle = "rgba(140, 70, 30, 0.35)", e.fillRect(-8, -2, 6, 3);
  } else
    e.fillStyle = "rgba(30, 20, 10, 0.7)", e.fillRect(-22, -3, 5, 6), e.fillRect(17, -3, 5, 6), e.fillStyle = "#7a828e", e.fillRect(-18, -2, 12, 4), e.fillRect(6, -2, 12, 4);
  e.restore();
}
function jn(e, n, t, l, o) {
  let r = te(l.seed * 67 + 13), a = n * (0.25 + 0.5 * r()), s = t * (0.3 + 0.45 * r()), u = Math.min(n, t) * (0.12 + 0.08 * r()), f = o ? a : n - a;
  e.save(), e.globalCompositeOperation = "multiply";
  let h = e.createRadialGradient(f, s, u * 0.2, f, s, u);
  h.addColorStop(0, "rgba(140, 120, 70, 0.45)"), h.addColorStop(0.65, "rgba(150, 130, 80, 0.30)"), h.addColorStop(1, "rgba(150, 130, 80, 0)"), e.fillStyle = h, e.beginPath();
  for (let p = 0; p <= Math.PI * 2 + 0.01; p += 0.1) {
    let m = u * (1 + 0.12 * Math.sin(p * 5 + r() * 3));
    p === 0 ? e.moveTo(f + Math.cos(p) * m, s + Math.sin(p) * m) : e.lineTo(f + Math.cos(p) * m, s + Math.sin(p) * m);
  }
  e.fill(), e.restore();
}
function Kn(e, n, t, l, o) {
  let r = Math.min(n, t) * 0.15;
  if (e.save(), o) {
    e.fillStyle = "rgba(10, 10, 15, 0.3)", e.beginPath(), e.moveTo(n - r - 8, 0), e.lineTo(n, r + 8), e.lineTo(n - r, r), e.closePath(), e.fill();
    let a = e.createLinearGradient(n - r, 0, n, r);
    a.addColorStop(0, "rgba(235, 225, 210, 0.95)"), a.addColorStop(1, "rgba(195, 185, 170, 0.95)"), e.fillStyle = a, e.beginPath(), e.moveTo(n - r, 0), e.lineTo(n, r), e.lineTo(n - r, r), e.closePath(), e.fill(), e.strokeStyle = "rgba(60, 50, 40, 0.4)", e.lineWidth = 2, e.beginPath(), e.moveTo(n - r, 0), e.lineTo(n, r), e.stroke();
  }
  e.restore();
}
function xn(e, n, t, l) {
  let o = te(l.seed * 83 + 7);
  e.save(), e.strokeStyle = "rgba(120, 140, 170, 0.12)", e.lineWidth = 3;
  for (let r = 0; r < 6; r++) {
    let a = t * (0.2 + 0.12 * r + 0.04 * o());
    e.beginPath(), e.moveTo(0, a), e.bezierCurveTo(n * 0.33, a + 18 * (o() - 0.5), n * 0.66, a + 18 * (o() - 0.5), n, a), e.stroke();
  }
  e.restore();
}
function Jn(e, n, t, l) {
  let o = te(l.seed * 89 + 11);
  e.save(), e.strokeStyle = "rgba(255, 255, 255, 0.28)", e.lineWidth = 1;
  for (let r = 0; r < 14; r++) {
    let a = o() * n, s = o() * t, u = o() * Math.PI, f = 60 + o() * 120;
    e.beginPath(), e.moveTo(a, s), e.lineTo(a + Math.cos(u) * f, s + Math.sin(u) * f), e.stroke();
  }
  e.restore();
}
function Qt(e, n, t) {
  if (!e.hiddenInk) return null;
  let l = ye(n, t, !0), o = l.getContext("2d"), r = Math.round(n * 0.12);
  o.fillStyle = "#fff", o.textAlign = "center", o.filter = "blur(0.7px)", o.font = `${r}px "Caveat", cursive`, o.translate(n / 2, t * 0.7), o.rotate(-0.1), e.hiddenInk.split(`
`).forEach((u, f) => o.fillText(u, 0, f * r * 1.05));
  let a = o.getImageData(0, 0, n, t).data, s = new Float32Array(n * t);
  for (let u = 0; u < t; u++) for (let f = 0; f < n; f++) s[u * n + f] = a[((t - 1 - u) * n + f) * 4 + 3] / 255;
  return s;
}
function qe(e, n, t, l, o) {
  let r = [e, n];
  for (let a = 0; a < l; a++) {
    let s = [r[0]];
    for (let u = 1; u < r.length; u++) {
      let f = r[u - 1], h = r[u], p = (f[0] + h[0]) / 2, m = (f[1] + h[1]) / 2, d = h[0] - f[0], g = h[1] - f[1], b = Math.hypot(d, g), y = (t() - 0.5) * b * o;
      s.push([p - g / b * y, m + d / b * y], h);
    }
    r = s;
  }
  return r;
}
async function Nt(e, n, t = null) {
  let l = Math.round(n.w * bt / 2), o = Math.round(n.h * bt / 2), r = ye(l, o, !0), a = r.getContext("2d");
  a.fillStyle = "#fff", a.fillRect(0, 0, l, o);
  let s = ye(l, o, !0), u = s.getContext("2d");
  u.fillStyle = "#000", u.fillRect(0, 0, l, o);
  let f = te(e.seed * 13 + 3);
  if (a.fillStyle = "#000", u.strokeStyle = "#fff", u.lineWidth = 2.2, u.filter = "blur(0.8px)", e.type === "form")
    for (let S = 22; S < o - 6; S += 24) [15, l - 15].forEach((i) => {
      a.beginPath(), a.arc(i, S, 5.5, 0, Math.PI * 2), a.fill();
    });
  if (e.type === "notebook") {
    let S = qe([4, 0], [4, o], f, 7, 0.05);
    a.beginPath(), a.moveTo(0, 0), S.forEach((i) => a.lineTo(i[0] + f() * 2, i[1])), a.lineTo(0, o), a.closePath(), a.fill();
    for (let i = 18; i < o; i += 22)
      a.beginPath(), a.arc(2, i, 5 + f() * 1.5, 0, Math.PI * 2), a.fill();
    u.beginPath(), S.forEach((i, P) => P ? u.lineTo(i[0] + 1, i[1]) : u.moveTo(i[0] + 1, i[1])), u.stroke();
  }
  if (e.type === "envelope") {
    let S = n.flap / n.h * o;
    a.beginPath(), a.moveTo(-2, -2), a.lineTo(l / 2, -2), a.lineTo(l / 2, 3), a.lineTo(-2, S), a.closePath(), a.fill(), a.beginPath(), a.moveTo(l + 2, -2), a.lineTo(l / 2, -2), a.lineTo(l / 2, 3), a.lineTo(l + 2, S), a.closePath(), a.fill();
  }
  if (e.type === "punchcard") {
    a.beginPath(), a.moveTo(-2, -2), a.lineTo(26, -2), a.lineTo(-2, 26), a.closePath(), a.fill();
    let S = (e.text.split(`
`)[0] || "").slice(0, 80), i = 17, C = (l - 17 - i) / 79, N = o * 0.23, I = (o * 0.94 - N) / 11;
    for (let B = 0; B < S.length; B++) {
      let ne = Zt(S[B]), W = i + B * C;
      for (let k of ne) {
        let D = N + k * I;
        a.fillRect(W - 2.5, D - 5, 5, 10);
      }
    }
  }
  if (e.type === "parchment") {
    let S = qe([-2, 3], [l + 2, 3], f, 5, 0.1), i = qe([-2, o - 3], [l + 2, o - 3], f, 5, 0.1), P = qe([3, -2], [3, o + 2], f, 5, 0.1), C = qe([l - 3, -2], [l - 3, o + 2], f, 5, 0.1);
    u.lineWidth = 2.5, [S, i, P, C].forEach((N) => {
      u.beginPath(), N.forEach((I, B) => B ? u.lineTo(I[0], I[1]) : u.moveTo(I[0], I[1])), u.stroke();
    });
  }
  if (e.states.includes("torn")) {
    let S = Math.floor(f() * 3), i, P, C;
    S === 0 ? (i = [l * (0.5 + 0.25 * f()), -2], P = [l + 2, o * (0.2 + 0.25 * f())], C = [[l + 2, -2]]) : S === 1 ? (i = [-2, o * (0.72 + 0.12 * f())], P = [l + 2, o * (0.72 + 0.12 * f())], C = [[l + 2, o + 2], [-2, o + 2]]) : (i = [l * (0.3 + 0.25 * f()), o + 2], P = [-2, o * (0.55 + 0.2 * f())], C = [[-2, o + 2]]);
    let N = qe(i, P, f, 8, 0.22);
    a.beginPath(), N.forEach((I, B) => B ? a.lineTo(I[0], I[1]) : a.moveTo(I[0], I[1])), C.forEach((I) => a.lineTo(I[0], I[1])), a.closePath(), a.fill(), u.lineWidth = 3.2, u.beginPath(), N.forEach((I, B) => B ? u.lineTo(I[0], I[1]) : u.moveTo(I[0], I[1])), u.stroke();
  }
  let h = a.getImageData(0, 0, l, o).data, p = u.getImageData(0, 0, l, o).data, m = t ? await mt.run("burn", [{ seed: e.seed, form: t === "singed" ? "singed" : e.burn }, l, o]) : null, d = a.createImageData(l, o), g = d.data, b = [], y = 1 / 0;
  for (let S = 0; S < o; S++) for (let i = 0; i < l; i++) {
    let P = (S * l + i) * 4;
    if (g[P] = h[P], g[P + 1] = 0, g[P + 2] = p[P], m) {
      let C = m[S * l + i];
      g[P + 3] = Math.round(K(C / 1.4) * 255), y = Math.min(y, C), t === "burn" && i % 3 === 0 && S % 3 === 0 && h[P] > 128 && b.push((i + 0.5) / l, 1 - (S + 0.5) / o, C);
    } else g[P + 3] = 255;
  }
  let v = ye(l, o);
  return v.getContext("2d").putImageData(d, 0, 0), { canvas: v, burnPts: t === "burn" ? new Float32Array(b) : null, lo: m ? Math.max(0, y) : 0 };
}

// .build/shaders.js
var Wt = `#version 300 es
precision highp float;in vec2 aXY;uniform sampler2D uH;uniform int uShape;uniform float uP,uK0,uKres,uA0,uAres,uScale,uSeedA,uSquash,uRoll,uCurl,uTear,uStubX,uIsStub,uFoldSide,uFoldBw,uFoldY,uEdge,uThick;uniform vec2 uHalf;uniform mat4 uModel,uProj;out vec3 vPos;out vec3 vNrm;out vec2 vUv;out float vE;out float vAmp;float Hf(vec2 xy){return textureLod(uH,xy/(2.0*uHalf)+0.5,0.0).r;}vec3 rotY(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x+s*v.z,v.y,-s*v.x+c*v.z);}vec3 rotZ(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x-s*v.y,s*v.x+c*v.y,v.z);}vec3 bend(float d,float th,float bw){float t=max(abs(th),1e-4),R=bw/t,L=R*t;if(d<L){float a=d/R;return vec3(R*sin(a),R*(1.0-cos(a)),a);}return vec3(R*sin(t)+(d-L)*cos(t),R*(1.0-cos(t))+(d-L)*sin(t),t);}void foldX(inout vec3 p,inout vec3 n,float x0,float s,float th,float bw){float d=(p.x-x0)*s;if(d<=0.0||abs(th)<1e-4)return;vec3 c=bend(d,th,bw);float g=sign(th),ca=cos(c.z),sa=g*sin(c.z),z0=p.z;p.x=x0+s*(c.x-sa*z0);p.z=g*c.y+ca*z0;n=vec3(ca*n.x-s*sa*n.z,n.y,s*sa*n.x+ca*n.z);}void foldY(inout vec3 p,inout vec3 n,float y0,float s,float th,float bw){float d=(p.y-y0)*s;if(d<=0.0||abs(th)<1e-4)return;vec3 c=bend(d,th,bw);float g=sign(th),ca=cos(c.z),sa=g*sin(c.z),z0=p.z;p.y=y0+s*(c.x-sa*z0);p.z=g*c.y+ca*z0;n=vec3(n.x,ca*n.y-s*sa*n.z,s*sa*n.y+ca*n.z);}vec3 place(vec2 xy,out float e,out float amp,out vec3 n){vec3 p=vec3(xy,0.0);n=vec3(0.0,0.0,1.0);if(uShape==0){float s=length(xy),sn=s/length(uHalf);float q=clamp(uP*1.5-sn*0.5+0.14*sn*sin(atan(xy.y,xy.x)*3.0+uSeedA),0.0,1.0);e=q*q*(3.0-2.0*q);float k=mix(uKres,uK0,(1.0-e)*(1.0-e));if(s>1e-6){float th=s*k,st=sin(th),ct=cos(th);vec2 dir=xy/s;n=vec3(st*dir,ct);p=vec3(st/k*dir,(ct-1.0)/k);}float sq=mix(uSquash,1.0,e);float expan=mix(1.0+(1.0-uSquash)*0.3,1.0,e);p.z*=sq;p.xy*=expan;n=normalize(vec3(n.xy/expan,n.z/sq));amp=mix(uA0,uAres,pow(e,2.2));}else if(uShape==1){e=uP;float L=2.0*uHalf.x*e,s=xy.x+uHalf.x;if(s>L){float ph=(s-L)/uRoll;float r=uRoll*(1.0-0.07*ph/6.2831853);p=vec3(L-uHalf.x+r*sin(ph),xy.y,r*(1.0-cos(ph)));n=vec3(-sin(ph),0.0,cos(ph));}p.x+=(uHalf.x-uRoll)*(1.0-e);amp=mix(uA0,uAres,e);}else if(uShape==2){e=uP;float k=uK0*(1.0-e)*(1.0-e);if(k>1e-2){float a=(xy.y+uHalf.y)*k;float r=1.0/k-uRoll*a/6.2831853;vec2 ax=vec2(-uHalf.y,-1.0/k);p=vec3(xy.x,ax.x+r*sin(a),ax.y+r*cos(a));n=vec3(0.0,sin(a),cos(a));float g=pow(1.0-e,3.0);float axv=abs(xy.x)/uHalf.x;float neck=smoothstep(0.5,0.8,axv),fl=smoothstep(0.82,1.0,axv);float sc=mix(1.0,mix(1.0,0.17*(1.0+3.2*fl),neck),g);float tw=sign(xy.x)*(neck*3.4+fl*1.3)*g;float c=cos(tw),sn=sin(tw);vec2 rv=(p.yz-ax)*sc;p.yz=ax+vec2(c*rv.x-sn*rv.y,sn*rv.x+c*rv.y);n.yz=vec2(c*n.y-sn*n.z,sn*n.y+c*n.z);n=normalize(n);}p.y+=uHalf.y*(1.0-e);p.z+=(1.0/uK0)*(1.0-e);amp=mix(uA0,uAres,e);}else if(uShape==6){e=uP;foldY(p,n,uFoldY,1.0,mix(3.12,-1.1,smoothstep(0.0,1.0,e)),uFoldBw);p.y-=(uFoldY-uHalf.y)*0.5;amp=mix(uA0,uAres,e);}else if(uShape==7){e=uP;float em=smoothstep(0.0,1.0,e);float a=3.12*(1.0-em);float x3=uHalf.x*0.333;foldX(p,n,-x3,-1.0,a,uFoldBw);foldX(p,n,0.0,1.0,-a,uFoldBw*1.5);foldX(p,n,x3,1.0,a,uFoldBw*2.0);p.x*=mix(0.28,1.0,em);amp=mix(uA0,uAres,e);}else if(uShape==8){e=uP;float em=smoothstep(0.0,1.0,e);float a=3.12*(1.0-em);foldX(p,n,0.0,1.0,a,uFoldBw);foldY(p,n,0.0,-1.0,a,uFoldBw*1.5);p.xy*=mix(0.58,1.0,em);amp=mix(uA0,uAres,e);}else{e=uP;float e2=smoothstep(0.0,0.5,e),e1=smoothstep(0.5,1.0,e);if(uShape==3){foldX(p,n,0.0,1.0,3.12*(1.0-e1),uFoldBw);foldY(p,n,0.0,1.0,3.12*(1.0-e2),uFoldBw*2.6);p.x+=uHalf.x*0.5*(1.0-e1);p.y+=uHalf.y*0.5*(1.0-e2);}else if(uShape==4){float em=smoothstep(0.0,1.0,e);foldX(p,n,0.0,uFoldSide,3.12*(1.0-em),uFoldBw);p.x+=uFoldSide*uHalf.x*0.5*(1.0-em);}else{float y3=uHalf.y/3.0;foldY(p,n,-y3*1.08,-1.0,3.12*(1.0-e1),uFoldBw);foldY(p,n,y3,1.0,3.12*(1.0-e2),uFoldBw*2.6);}amp=mix(uA0,uAres,e);}p+=n*Hf(xy)*amp;if(uIsStub>0.5&&uTear>0.0){vec3 piv=vec3(uStubX,0.0,0.0);p=rotY(rotZ(p-piv,-0.55*uTear),0.6*uTear)+piv+vec3(0.08*uTear,-1.1*uTear*uTear,0.12*uTear);n=rotY(rotZ(n,-0.55*uTear),0.6*uTear);}p.z-=uCurl*p.x*p.x;n=normalize(vec3(n.x+2.0*uCurl*p.x*n.z,n.y,n.z));return p;}void main(){float e,amp;vec3 nrm;vec3 p0=place(aXY,e,amp,nrm);if(uEdge>0.5)p0-=nrm*uThick*(nrm.z>=0.0?1.0:-1.0);vec4 w=uModel*vec4(p0,1.0);vPos=w.xyz;vNrm=mat3(uModel)*nrm;vUv=aXY/(2.0*uHalf)+0.5;vE=uShape==0?pow(e,2.2):e;vAmp=amp*uScale;gl_Position=uProj*w;}`, en = `#version 300 es
precision highp float;in vec3 vPos;in vec3 vNrm;in vec2 vUv;in float vE;in float vAmp;uniform sampler2D uH,uPrintF,uPrintB,uFx,uGrain;uniform vec2 uGrainK;uniform vec3 uCam,uColor,uL,uLampPos;uniform float uBump,uAge,uTime,uThru,uFront,uInkMax,uEdge,uDestroy,uLamp,uLampR;out vec4 frag;float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}vec3 perturb(vec3 pos,vec3 n,vec2 dH){vec3 sx=dFdx(pos),sy=dFdy(pos);vec3 r1=cross(sy,n),r2=cross(n,sx);float det=dot(sx,r1);return normalize(abs(det)*n-sign(det)*(dH.x*r1+dH.y*r2));}void main(){vec4 fx=texture(uFx,vUv);float pres=fx.r,sc=0.0;if(uFront>-0.5){float b=fx.a*1.4;pres=min(pres,smoothstep(uFront-0.004,uFront+0.012,b));sc=1.0-smoothstep(uFront,uFront+0.17,b);}if(pres<0.4)discard;float a=smoothstep(0.4,0.6,pres);bool front=gl_FrontFacing;vec3 n=normalize(vNrm)*(front?1.0:-1.0);vec3 L=normalize(uL);if(uEdge>0.5){float w=clamp((dot(n,L)+0.3)/1.3,0.0,1.0);vec3 ec=mix(uColor*vec3(0.8,0.76,0.7),vec3(0.08,0.06,0.05),smoothstep(0.55,0.9,sc))*(0.45+0.55*w);frag=vec4(ec*a,a);return;}vec4 h0=texture(uH,vUv);vec2 du=dFdx(vUv),dv=dFdy(vUv);vec4 hx=texture(uH,vUv+du),hy=texture(uH,vUv+dv);vec3 toP=uLampPos-vPos;vec3 Lp=normalize(toP);float pool=pow(1.0-smoothstep(0.0,1.0,length(toP.xy)/uLampR),1.3)*uLamp;float grazD=clamp((1.0-L.z-0.4)/0.5,0.0,1.0);float grazP=smoothstep(0.2,0.75,1.0-Lp.z)*pool;float ink=uInkMax*mix(grazD,grazP*3.0,uLamp);vec2 dH=vec2(hx.r-h0.r,hy.r-h0.r)*vAmp*uBump*(1.0+1.6*pool)-vec2(hx.g-h0.g,hy.g-h0.g)*ink;n=perturb(vPos,n,dH);vec3 V=normalize(uCam-vPos);float wrap=clamp((dot(n,L)+0.08)/1.08,0.0,1.0);float wrapP=max(dot(n,Lp),0.0);float ao=mix(1.0,0.42+0.58*smoothstep(-0.55,0.35,h0.r),1.0-vE);float fib=hash(floor(vUv*vec2(900.0,1180.0)));vec2 eu=min(vUv,1.0-vUv);float edge=smoothstep(0.0,0.05,min(eu.x,eu.y));vec3 col0=mix(uColor,uColor*vec3(0.93,0.84,0.66),uAge);vec3 alb=col0*(0.975+0.025*fib)*(0.93+0.07*edge);alb*=1.0+(texture(uGrain,vUv*uGrainK).r-0.94)*1.8;if(!front)alb*=0.9;vec2 uvB=vec2(1.0-vUv.x,vUv.y);vec4 tF=texture(uPrintF,vUv),tB=texture(uPrintB,uvB);vec4 pr=front?tF:tB;vec4 th=front?tB:tF;alb=mix(alb,th.rgb,th.a*uThru);alb=mix(alb,pr.rgb,pr.a);alb=mix(alb,vec3(0.45,0.29,0.13),smoothstep(0.12,0.55,sc)*0.85);alb=mix(alb,vec3(0.06,0.045,0.04),smoothstep(0.55,0.9,sc));alb=mix(alb,vec3(0.99,0.985,0.96),fx.b*0.85);vec3 key=vec3(1.0,0.965,0.9),amb=vec3(0.62,0.64,0.7);vec3 warm=vec3(1.0,0.9,0.74);vec3 base=amb*0.3*ao+key*1.04*wrap*mix(1.0,ao,0.7)*mix(1.0,0.55,uLamp);float spot=wrapP*pool*mix(1.0,ao,0.5);vec3 col=alb*(base+warm*spot*max(vec3(0.0),vec3(1.15)-base));col+=key*0.03*pow(max(dot(n,normalize(L+V)),0.0),24.0)*(1.0-0.5*uLamp);col+=warm*0.06*pow(max(dot(n,normalize(Lp+V)),0.0),30.0)*pool;float rim=(1.0-smoothstep(0.42,0.66,pres))*smoothstep(0.6,0.95,sc);float fl=0.55+0.45*sin(uTime*6.0+vUv.x*37.0+vUv.y*23.0)*sin(uTime*2.3+vUv.y*51.0);col+=vec3(1.0,0.42,0.08)*rim*fl*(1.7+1.6*uDestroy);frag=vec4(col*a,a);}`, tn = `#version 300 es
in vec2 aQ;uniform vec3 uC;uniform vec2 uHS;uniform float uSoft;uniform mat4 uProj;out vec2 vL;void main(){vL=aQ*(uHS+vec2(uSoft*3.0));gl_Position=uProj*vec4(uC+vec3(vL,0.0),1.0);}`, nn = `#version 300 es
precision highp float;in vec2 vL;uniform vec2 uHS;uniform float uR,uSoft,uA,uOpen,uFront,uFlip;uniform sampler2D uFx;out vec4 frag;float paperAt(vec2 uv){vec4 fx=texture(uFx,clamp(uv,0.0,1.0));return uFront>-0.5?min(fx.r,smoothstep(uFront-0.004,uFront+0.012,fx.a*1.4)):fx.r;}void main(){vec2 q=abs(vL)-uHS+vec2(uR);float d=length(max(q,0.0))+min(max(q.x,q.y),0.0)-uR;float pres=1.0;if(uOpen>0.0){vec2 uv=vL/(2.0*uHS)+0.5,o=vec2(uSoft)/(2.0*uHS);if(uFlip>0.5)uv.x=1.0-uv.x;float p=paperAt(uv)*2.0+paperAt(uv+vec2(o.x,0.0))+paperAt(uv-vec2(o.x,0.0))+paperAt(uv+vec2(0.0,o.y))+paperAt(uv-vec2(0.0,o.y));pres=mix(1.0,p/6.0,uOpen);}frag=vec4(0.0,0.0,0.0,uA*pres*(1.0-smoothstep(-uSoft,uSoft*2.5,d)));}`, on = `#version 300 es
in vec3 aP;in vec4 aC;in float aS;uniform mat4 uProj;uniform float uPx;out vec4 vC;void main(){gl_Position=uProj*vec4(aP,1.0);gl_PointSize=max(1.0,aS*uPx/gl_Position.w);vC=aC;}`, rn = `#version 300 es
precision highp float;in vec4 vC;out vec4 frag;void main(){float a=smoothstep(0.5,0.05,length(gl_PointCoord-0.5))*vC.a;frag=vec4(vC.rgb*a,a);}`;

// .build/sound.js
var se = /* @__PURE__ */ (() => {
  let e = null, n = null, t = null, l = null, o = he.get("sound", !1), r = {}, a = {}, s = () => {
    if (!e) {
      let d = window.AudioContext || window.webkitAudioContext;
      if (!d) return null;
      e = new d(), n = e.createGain(), n.gain.value = 0.6;
      let g = e.createBiquadFilter();
      g.type = "peaking", g.frequency.value = 420, g.Q.value = 2.4, g.gain.value = 3.5, n.connect(g), g.connect(e.destination), t = e.createBuffer(1, e.sampleRate, e.sampleRate);
      let b = t.getChannelData(0), y = 0, v = 0;
      for (let S = 0; S < b.length; S++) {
        let i = Math.random() * 2 - 1;
        y = 0.99 * y + i * 0.05, v = 0.95 * v + i * 0.1, b[S] = (y + v + i * 0.15) * 1.6;
      }
    }
    return e.state === "suspended" && e.resume(), e;
  };
  function u() {
    return l || !e || (l = Promise.all(Object.entries(r).map(([d, g]) => fetch(g).then((b) => b.ok ? b.arrayBuffer() : Promise.reject(new Error(d))).then((b) => e.decodeAudioData(b)).then((b) => {
      a[d] = b;
    }).catch(() => {
    })))), l;
  }
  function f(d, g, b = {}) {
    let y = a[d];
    if (!y) return !1;
    let v = e.createBufferSource();
    v.buffer = y, v.playbackRate.value = b.rate || 1;
    let S = e.createGain();
    return S.gain.value = b.gain ?? 1, v.connect(S), S.connect(n), v.start(g, b.offset || 0, b.dur), !0;
  }
  function h(d, g, b, y, v) {
    let S = e.createBufferSource();
    S.buffer = t;
    let i = e.createBiquadFilter();
    i.type = "bandpass", i.frequency.value = b, i.Q.value = y;
    let P = e.createGain();
    P.gain.setValueAtTime(1e-4, d), P.gain.linearRampToValueAtTime(v, d + 2e-3), P.gain.exponentialRampToValueAtTime(1e-4, d + g), S.connect(i), i.connect(P), P.connect(n), S.start(d, Math.random() * 0.9, g + 0.03);
  }
  function p(d, g, b, y, v) {
    let S = e.createBufferSource();
    S.buffer = t, S.loop = !0;
    let i = e.createBiquadFilter();
    i.type = "bandpass", i.Q.value = 0.8, i.frequency.setValueAtTime(b, d), i.frequency.linearRampToValueAtTime(y, d + g);
    let P = e.createGain();
    P.gain.setValueAtTime(1e-4, d), P.gain.linearRampToValueAtTime(v, d + g * 0.15), P.gain.linearRampToValueAtTime(1e-4, d + g), S.connect(i), i.connect(P), P.connect(n), S.start(d), S.stop(d + g + 0.05);
  }
  function m(d, g, b, y, v, S) {
    let i = Math.round(g * b);
    for (let P = 0; P < i; P++) {
      let C = Math.random();
      S && (C = C * C), h(d + C * g, 6e-3 + Math.random() * 0.03, 1500 + Math.random() * 4500 * y, 0.7 + Math.random() * 2.2, v * (0.25 + Math.random() * 0.75));
    }
  }
  return {
    get enabled() {
      return o;
    },
    set(d) {
      o = !!d, he.set("sound", o), o && s() && u();
    },
    // optional real recordings: { crumple, sheet, tear } (URLs)
    useSamples(d) {
      r = { ...d }, l = null, o && e && u();
    },
    // names: crumple, uncrumple, flip, tear, seal, fire, grain
    play(d, g = 1, b = 0) {
      if (!o || !s()) return;
      u();
      let y = e.currentTime + b, v = (S) => !!a[S];
      if (d === "crumple")
        if (v("crumple")) {
          let S = Math.max(2, Math.round(g * 4));
          for (let i = 0; i < S; i++) f("crumple", y + i / S * g * 0.85, { gain: 0.6 + Math.random() * 0.35, rate: 0.85 + Math.random() * 0.35 });
          m(y, g, 25, 1, 0.1, !0);
        } else
          m(y, g, 90, 1, 0.32, !0), p(y, g, 2400, 1200, 0.07);
      else if (d === "uncrumple")
        if (v("sheet")) {
          let S = Math.max(2, Math.round(g * 2.5));
          for (let i = 0; i < S; i++) f(i % 2 && v("crumple") ? "crumple" : "sheet", y + i / S * g * 0.9, { gain: 0.4 + Math.random() * 0.25, rate: 0.75 + Math.random() * 0.25 });
        } else
          m(y, g, 46, 0.8, 0.26, !1), p(y, g, 1400, 2600, 0.05);
      else d === "flip" ? f("sheet", y, { gain: 0.8, rate: 1.15 }) || (p(y, 0.38, 500, 2400, 0.16), h(y + 0.34, 0.05, 900, 1, 0.22)) : d === "tear" ? f("tear", y, { gain: 1 }) || (p(y, 0.45, 1800, 3600, 0.18), m(y, 0.45, 160, 1.2, 0.3, !1)) : d === "seal" ? (f("tear", y, { gain: 0.45, rate: 1.7, dur: 0.16 }) || h(y, 0.05, 1200, 2, 0.3), f("sheet", y + 0.2, { gain: 0.5, rate: 0.9 }) || p(y + 0.2, 0.5, 700, 2200, 0.08)) : d === "fire" ? (m(y, g, 22, 0.45, 0.16, !1), p(y, g, 500, 800, 0.05)) : d === "grain" && (f("crumple", y, { gain: 0.22, rate: 1.2 + Math.random() * 0.4, offset: Math.random() * 0.3, dur: 0.08 }) || m(y, 0.06, 60, 1, 0.2, !1));
    }
  };
})();

// .build/motion.js
function fe(e, n, t, l, o = ge, r = 0, a) {
  e.tw = e.tw.filter((s) => s.key !== n), e.tw.push({ key: n, to: t, dur: Math.max(1e-3, l), ease: o, start: performance.now() + r * 1e3, from: null, done: a });
}
function yt(e, n) {
  let t = !1, l = [];
  return e.tw = e.tw.filter((o) => {
    if (t = !0, n < o.start) return !0;
    o.from === null && (o.from = e[o.key]);
    let r = K((n - o.start) / (o.dur * 1e3));
    return e[o.key] = o.from + (o.to - o.from) * o.ease(r), r >= 1 ? (o.done && l.push(o.done), !1) : !0;
  }), l.forEach((o) => o()), t;
}
function We(e) {
  if (e.cfg.type === "envelope") return 0.34;
  let n = e.F.shape;
  return n === 0 ? 0.42 : n === 2 ? 0.35 : 0.3;
}
function et(e, n) {
  let t = ue(K(n));
  return 2 * Math.max(e.F.ext[0] / 2 + (e.half[0] - e.F.ext[0] / 2) * t, e.F.ext[1] / 2 + (e.half[1] - e.F.ext[1] / 2) * t);
}
function an(e, n) {
  let t = ue(K(e.cfg.type === "envelope" ? n * 2 : n)), l = [0, 0, -0.02];
  return e.pose.map((o, r) => o * (1 - t) + l[r] * t);
}
function He(e, n, t) {
  let l = (S, i = 0) => n.destroy !== void 0 ? n.destroy : S.front0 > -0.5 ? S.front0 + S.burned + i : -1, o = n.destroy !== void 0 ? K((1.25 - n.destroy) / 0.9) : 1;
  if (e.cfg.type !== "envelope") {
    let S = { ...t, p: n.p, f: n.f, tear: n.tear, front: l(e, n.burnOpen || 0), destroy: n.destroy !== void 0, alpha: o };
    return { items: [{ P: e, st: S }], shadow: { P: e, st: S }, active: { P: e, st: S } };
  }
  let r = e.letter, a = n.p, s = ue(K(a / 0.24)), u = ue(K((a - 0.14) / 0.36)), f = ue(K((a - 0.44) / 0.32)), h = K((a - 0.58) / 0.42), p = { ...t, p: s, f: n.f, tear: 0, cy: t.cy - f * t.vhU * 0.8, rot: [t.rot[0], t.rot[1], t.rot[2] + f * 0.45], front: l(e) }, m = -0.08 + u * 0.5, d = -0.035 * (1 - f), g = Math.PI * De(K(n.f)), b = [0, 0, -0.02], y = { ...t, cx: xe(p.cx, 0, f), cy: xe(p.cy, 0, f), sc: xe(p.sc, t.scLetter, f), rot: p.rot.map((S, i) => xe(S, b[i] + (t.adjust ? t.adjust[i] : 0), f)), local: [-Math.sin(g) * d, m * (1 - f), Math.cos(g) * d], p: Lt(h), f: n.f, tear: 0, front: l(r, n.burnOpen || 0), destroy: n.destroy !== void 0, alpha: o };
  return { items: f >= 0.999 ? [{ P: r, st: y }] : a < 0.01 ? [{ P: e, st: p }] : [{ P: e, st: p }, { P: r, st: y }], shadow: f < 0.5 ? { P: e, st: p } : { P: r, st: y }, active: f < 0.5 ? { P: e, st: p } : { P: r, st: y } };
}
function tt(e, n, t, l, o, r = 0, a = 0) {
  let s = ue(K(n.p)), u = (e.F.ext[0] / 2 + (e.half[0] - e.F.ext[0] / 2) * s) * n.sc * t * 1.1, f = (e.F.ext[1] / 2 + (e.half[1] - e.F.ext[1] / 2) * s) * n.sc * t * 1.1, h = r + l / 2 + n.cx * t, p = a + o / 2 - n.cy * t;
  return { cx: h, cy: p, x0: h - u, x1: h + u, y0: p - f, y1: p + f, w1: e.half[0] * 2 * n.sc * t, h1: e.half[1] * 2 * n.sc * t };
}
function vt(e, n, t, l) {
  let { P: o, st: r } = t.active, a = n.p - (n.pPrev ?? n.p), s = ue(K(r.p)), u = (o.F.ext[0] / 2 + (o.half[0] - o.F.ext[0] / 2) * s) * r.sc, f = (o.F.ext[1] / 2 + (o.half[1] - o.F.ext[1] / 2) * s) * r.sc;
  if (a > 5e-4 && n.p > 0.12 && n.p < 0.97) {
    let p = Math.min(8, Math.round(a * 300));
    for (let m = 0; m < p; m++) e.emit({ x: r.cx + (Math.random() - 0.5) * 2 * u, y: r.cy + (Math.random() - 0.5) * 2 * f, z: 0.06 * r.sc, vx: (Math.random() - 0.5) * 0.05 * r.sc, vy: (Math.random() * 0.04 + 0.01) * r.sc, ay: -0.01 * r.sc, r: 0.93, g: 0.9, b: 0.84, a: 0.5, s: (5e-3 + Math.random() * 8e-3) * r.sc, t: 0, life: 1.2 + Math.random() * 0.9 });
  }
  let h = r.front;
  if (h > -0.5 && o.burnPts && r.p > 0.9) {
    let p = n.destroy !== void 0;
    n.acc = (n.acc || 0) + l * (p ? 110 : 9);
    let m = o.burnPts, d = m.length / 3, g = Math.cos(r.rot[2]), b = Math.sin(r.rot[2]);
    for (; n.acc >= 1; ) {
      n.acc -= 1;
      let y = -1;
      for (let C = 0; C < 40; C++) {
        let N = Math.floor(Math.random() * d);
        if (Math.abs(m[N * 3 + 2] - h) < 0.012) {
          y = N;
          break;
        }
      }
      if (y < 0) continue;
      let v = (m[y * 3] - 0.5) * o.w * r.sc, S = (m[y * 3 + 1] - 0.5) * o.h * r.sc, i = r.cx + g * v - b * S, P = r.cy + b * v + g * S;
      e.emit({ x: i, y: P, z: 0.02 * r.sc, vx: (Math.random() - 0.5) * 0.08 * r.sc, vy: (0.06 + Math.random() * 0.1) * r.sc, ay: 0.06 * r.sc, r: 1, g: 0.5 + Math.random() * 0.3, b: 0.12, a: 1, s: (3e-3 + Math.random() * 5e-3) * r.sc, t: 0, life: 0.5 + Math.random() * 0.8, flicker: !0 }), p && Math.random() < 0.45 && e.emit({ x: i, y: P, z: 0.02 * r.sc, vx: (Math.random() - 0.5) * 0.06 * r.sc, vy: -(0.02 + Math.random() * 0.05) * r.sc, ay: -0.05 * r.sc, r: 0.2, g: 0.19, b: 0.18, a: 0.85, s: (8e-3 + Math.random() * 0.012) * r.sc, t: 0, life: 1.4 + Math.random() * 1.1 });
    }
  }
}
function Tt(e, n) {
  let t = /* @__PURE__ */ new Map(), l = [], o = null, r = () => {
    let [f, h] = [...t.values()];
    return Math.hypot(f.x - h.x, f.y - h.y);
  }, a = (f) => {
    let h = n.active();
    if (!h) return;
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
    h.tw = h.tw.filter((g) => g.key !== "p");
    let d = performance.now();
    t.size === 2 ? o = { pinch: !0, d0: r(), p0: h.p, moved: !0, last: h.p, box: p, tLast: d, lastX: f.clientX, lastY: f.clientY, vx: 0, vy: 0 } : o = { pinch: !1, r0: Math.hypot(f.clientX - p.cx, f.clientY - p.cy), p0: h.p, x: f.clientX, y: f.clientY, moved: !1, last: h.p, box: p, tLast: d, lastX: f.clientX, lastY: f.clientY, vx: 0, vy: 0 };
  }, s = (f) => {
    if (!o || !t.has(f.pointerId)) return;
    t.set(f.pointerId, { x: f.clientX, y: f.clientY });
    let h = n.active();
    if (!h) {
      o = null, t.clear();
      return;
    }
    let p = performance.now(), m = p - o.tLast;
    m > 8 && (o.vx = (f.clientX - o.lastX) / m, o.vy = (f.clientY - o.lastY) / m, o.tLast = p, o.lastX = f.clientX, o.lastY = f.clientY);
    let d = 0.42 * Math.min(o.box.w1, o.box.h1);
    if (o.pinch && t.size === 2) h.p = K(o.p0 + (r() - o.d0) / d);
    else if (!o.pinch) {
      if (Math.hypot(f.clientX - o.x, f.clientY - o.y) > 6 && (o.moved = !0), !o.moved) return;
      h.p = K(o.p0 + (Math.hypot(f.clientX - o.box.cx, f.clientY - o.box.cy) - o.r0) / d);
    }
    Math.abs(h.p - o.last) > 0.035 && (se.play("grain"), o.last = h.p), h.dragging = !0, n.redraw();
  }, u = (f) => {
    if (!t.has(f.pointerId)) return;
    if (t.delete(f.pointerId), t.size === 1 && o) {
      let b = [...t.values()][0], y = n.box ? n.box() : o.box;
      o.pinch = !1, o.x = b.x, o.y = b.y, o.r0 = Math.hypot(b.x - (y ? y.cx : o.x), b.y - (y ? y.cy : o.y)), o.p0 = n.active() ? n.active().p : o.p0;
      return;
    }
    if (t.size) return;
    let h = n.active(), p = o && o.moved, m = o ? o.p0 : 0, d = o && o.vx || 0, g = o && o.vy || 0;
    if (o = null, !!h) {
      if (h.dragging = !1, n.flip && m > 0.85 && Math.abs(d) > 0.2 && Math.abs(d) > 1.5 * Math.abs(g)) {
        h.p = 1, n.flip();
        return;
      }
      if (n.outside && g > 0.75) {
        n.outside(f);
        return;
      }
      p && (h.p >= 0.3 ? (se.play("uncrumple", 0.4), fe(h, "p", 1, 0.45 * (1 - h.p) + 0.15, ze, 0, () => Ye(12))) : (se.play("crumple", 0.35), fe(h, "p", 0, 0.35 * h.p + 0.12, ze, 0, () => Ye(18))), n.redraw());
    }
  };
  return [["pointerdown", a], ["pointermove", s], ["pointerup", u], ["pointercancel", u]].forEach(([f, h]) => oe(l, e, f, h)), () => l.splice(0).forEach((f) => f());
}
function nt(e, n, t, l, o, r, a) {
  let s = [(n - l / 2) / r, -(t - o / 2) / r, 0.09 * o / r];
  e.lampPos || (e.lampPos = s.slice()), e.lampGoal = s, e.lampOn = a ? 1 : 0, e.lampMoving = !0;
}
function Et(e, n) {
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
}, _e = 30 * Math.PI / 180, Ce = 10, Ve = [-0.45, 0.62, 0.65];
function Zn(e, n) {
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
var Qn = (e) => e.states.includes("burnt") || e.burnAfterReading ? "burn" : e.states.includes("singed") ? "singed" : null, ln = { corner: [0.3, 0.06], edge: [0.035, 0.01], center: [0.09, 0.03], spots: [0.035, 0.01] };
function ot(e, n = {}) {
  let t = e.getContext("webgl2", { alpha: !0, premultipliedAlpha: !0, antialias: !0 });
  if (!t) return null;
  let l, o, r, a, s, u, f, h = !1, p = !1, m = (w, E) => {
    let A = (H, $) => {
      let j = t.createShader(H);
      if (t.shaderSource(j, $), t.compileShader(j), !t.getShaderParameter(j, t.COMPILE_STATUS)) throw new Error(t.getShaderInfoLog(j));
      return j;
    }, z = t.createProgram();
    if (t.attachShader(z, A(t.VERTEX_SHADER, w)), t.attachShader(z, A(t.FRAGMENT_SHADER, E)), t.linkProgram(z), !t.getProgramParameter(z, t.LINK_STATUS)) throw new Error(t.getProgramInfoLog(z));
    let _ = {}, L = t.getProgramParameter(z, t.ACTIVE_UNIFORMS);
    for (let H = 0; H < L; H++) {
      let $ = t.getActiveUniform(z, H);
      _[$.name] = t.getUniformLocation(z, $.name);
    }
    return { p: z, u: _ };
  };
  function d() {
    l = m(Wt, en), o = m(tn, nn), r = m(on, rn), a = t.createVertexArray(), t.bindVertexArray(a), s = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, s), t.bufferData(t.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), t.STATIC_DRAW);
    let w = t.getAttribLocation(o.p, "aQ");
    t.enableVertexAttribArray(w), t.vertexAttribPointer(w, 2, t.FLOAT, !1, 0, 0), t.bindVertexArray(null), u = t.createVertexArray(), f = t.createBuffer(), t.bindVertexArray(u), t.bindBuffer(t.ARRAY_BUFFER, f), t.bufferData(t.ARRAY_BUFFER, 420 * 32, t.DYNAMIC_DRAW), [["aP", 3, 0], ["aC", 4, 12], ["aS", 1, 28]].forEach(([E, A, z]) => {
      let _ = t.getAttribLocation(r.p, E);
      t.enableVertexAttribArray(_), t.vertexAttribPointer(_, A, t.FLOAT, !1, 32, z);
    }), t.bindVertexArray(null);
  }
  d();
  let g = (w) => {
    w.preventDefault(), h = !0;
  }, b = () => {
    h = !1, d(), S = null, i = null, B = null, ne = null, V = null, n.onRestore && n.onRestore();
  };
  e.addEventListener("webglcontextlost", g), e.addEventListener("webglcontextrestored", b);
  function y(w, E, A, z, _, L, H) {
    let $ = [];
    for (let q = 0; q <= z; q++) $.push(w + (E - w) * q / z);
    L.forEach((q) => {
      q > w + 1e-6 && q < E - 1e-6 && $.push(q);
    }), $.sort((q, ae) => q - ae);
    let j = [];
    for (let q = 0; q <= _; q++) j.push(-A + 2 * A * q / _);
    H.forEach((q) => {
      q > -A + 1e-6 && q < A - 1e-6 && !j.some((ae) => Math.abs(ae - q) < 1e-6) && j.push(q);
    }), j.sort((q, ae) => q - ae);
    let x = $.length, G = j.length, Z = new Float32Array(x * G * 2), Y = 0;
    for (let q = 0; q < G; q++) for (let ae = 0; ae < x; ae++)
      Z[Y++] = $[ae], Z[Y++] = j[q];
    let ee = new Uint16Array((x - 1) * (G - 1) * 6);
    Y = 0;
    for (let q = 0; q < G - 1; q++) for (let ae = 0; ae < x - 1; ae++) {
      let Se = q * x + ae, $e = Se + 1, Oe = Se + x, c = Oe + 1;
      ee[Y++] = Se, ee[Y++] = $e, ee[Y++] = c, ee[Y++] = Se, ee[Y++] = c, ee[Y++] = Oe;
    }
    let pe = t.createVertexArray();
    t.bindVertexArray(pe);
    let Q = t.createBuffer();
    t.bindBuffer(t.ARRAY_BUFFER, Q), t.bufferData(t.ARRAY_BUFFER, Z, t.STATIC_DRAW);
    let Ee = t.getAttribLocation(l.p, "aXY");
    t.enableVertexAttribArray(Ee), t.vertexAttribPointer(Ee, 2, t.FLOAT, !1, 0, 0);
    let de = t.createBuffer();
    return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, de), t.bufferData(t.ELEMENT_ARRAY_BUFFER, ee, t.STATIC_DRAW), t.bindVertexArray(null), { vao: pe, count: ee.length, bufs: [Q, de] };
  }
  function v(w, E) {
    let A = t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, A), E.float ? (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1), t.texImage2D(t.TEXTURE_2D, 0, t.RG16F, E.w, E.h, 0, t.RG, t.FLOAT, w)) : (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, w), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1)), E.mip ? (t.generateMipmap(t.TEXTURE_2D), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR)) : t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), A;
  }
  let S = null, i = null, P = (w) => {
    let E = t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, E), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(w)), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), E;
  }, C = () => S || (S = P([0, 0, 0, 0])), N = () => i || (i = P([255, 0, 0, 255])), I = (w) => {
    w && w !== S && w !== i && t.deleteTexture(w);
  }, B = null, ne = null;
  function W() {
    return B || (B = P([240, 240, 240, 255]), ne = Xe("grain").then((w) => {
      !w || p || (t.bindTexture(t.TEXTURE_2D, B), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, w), t.generateMipmap(t.TEXTURE_2D), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.REPEAT), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.REPEAT));
    }), B);
  }
  async function k(w) {
    let E = Ze(w), A = ke[E.type];
    W();
    let z = E.type === "envelope" ? k({ id: E.id + "-letter", type: E.letter, shape: "thirds", text: E.text, back: E.back, states: E.states.filter((U) => U !== "torn"), seed: E.seed + 1, hiddenInk: E.hiddenInk, burn: E.burn, burnAfterReading: E.burnAfterReading, stamp: E.stamp }) : null;
    await $t([A.font, "Caveat", "Courier Prime", "Special Elite"]);
    let _ = A.w / 2, L = A.h / 2, H = Zn(E.shape, A), $ = Math.round(512 * A.w / 0.84), j = Math.round($ * A.h / A.w), x = he.get("opens." + E.id, 0), G = te(E.seed * 7 + 1), Z = A.stub ? _ - A.w * A.stub : null, Y = A.body ? -L + A.body : 0, ee = Math.max(16, Math.round(Math.sqrt(15e3 * A.w / A.h))), pe = Math.max(16, Math.round(ee * A.h / A.w)), Q = [0], Ee = [0, -A.h / 6 * 1.08, A.h / 6, Y];
    E.shape === "accordion" && Q.push(-A.w / 6, A.w / 6);
    let de = [];
    if (Z !== null) {
      let U = Math.round(ee * (Z + _) / A.w);
      de.push(y(-_, Z, L, U, pe, Q, Ee)), de.push(y(Z, _, L, ee - U, pe, Q, Ee));
    } else de.push(y(-_, _, L, ee, pe, Q, Ee));
    let q = !(E.back || E.type === "notebook" || E.type === "form" || E.type === "envelope" || E.type === "newspaper" || E.type === "postcard" || E.type === "blueprint" || ["coffee", "water", "prints", "aged", "wine", "ink", "foxing", "faded", "staple", "grease", "dogear", "damp"].some((U) => E.states.includes(U))), ae = Qn(E), Se = !(E.type === "notebook" || E.type === "form" || E.type === "envelope" || E.type === "punchcard" || E.type === "parchment" || E.states.includes("torn") || ae), [$e, Oe, c, T] = await Promise.all([
      mt.run("creases", [{ seed: E.seed, shape: E.shape, w: A.w, h: A.h, card: !!A.card, foldY: Y, states: E.states }, $, j]),
      Qe(E, A, "front", x),
      q ? null : Qe(E, A, "back", x),
      Se ? null : Nt(E, A, ae)
    ]), R = Qt(E, $, j), M = new Float32Array($ * j * 2);
    for (let U = 0; U < $ * j; U++)
      M[U * 2] = $e[U], M[U * 2 + 1] = R ? R[U] : 0;
    let O = H.shape === 1 || H.shape === 2, F = {
      cfg: E,
      T: A,
      w: A.w,
      h: A.h,
      half: [_, L],
      F: H,
      stubX: Z,
      foldY: Y,
      meshes: de,
      openings: x,
      tH: v(M, { float: !0, w: $, h: j }),
      tPF: v(Oe, { mip: !0 }),
      tPB: q ? C() : v(c, { mip: !0 }),
      tFx: Se ? N() : v(T.canvas, {}),
      burnPts: Se ? null : T.burnPts,
      // which burn field the effects hold: 'burn' (sparks, can burn away), 'singed' (rim only) or 'none' (ensureBurn adds one)
      fxBurn: ae || "none",
      backEmpty: q,
      // estimated texture memory (front and back with mipmaps, effects, creases in RG16F)
      bytes: Math.round(Oe.width * Oe.height * 4 * 1.33 * (q ? 1 : 2) + (Se ? 0 : T.canvas.width * T.canvas.height * 4) + $ * j * 4),
      // folded and elongated papers stay almost facing the camera; crumpled ones may spin freely
      pose: H.shape >= 3 ? [-0.22 + G() * 0.18, -0.2 + G() * 0.4, -0.45 + G() * 0.9] : O ? [-0.15 + G() * 0.15, -0.15 + G() * 0.3, -0.6 + G() * 1.2] : [-0.3 + G() * 0.25, -0.35 + G() * 0.7, G() * 6.28],
      seedA: G() * 6.28,
      // a singed rim holds its front just under the lowest value of its field: only the scorch band shows
      front0: E.states.includes("burnt") ? ln[E.burn][0] + ln[E.burn][1] * G() : ae === "singed" ? T.lo - 0.012 : -1,
      burned: he.get("burned." + E.id, 0),
      age: E.states.includes("aged") ? 1 : 0,
      torn: !1
    };
    return F.extent = Math.max(H.ext[0], H.ext[1]), F.hasRedaction = /\[\[/.test(E.text + E.back), z && (F.letter = await z), await ne, F;
  }
  async function D(w) {
    w.openings = he.get("opens." + w.cfg.id, 0);
    let [E, A] = await Promise.all([Qe(w.cfg, w.T, "front", w.openings), w.backEmpty ? null : Qe(w.cfg, w.T, "back", w.openings)]);
    I(w.tPF), I(w.tPB), w.tPF = v(E, { mip: !0 }), w.tPB = A ? v(A, { mip: !0 }) : C();
  }
  function X(w) {
    return w.fxBurn === "burn" ? Promise.resolve() : (w.burnJob || (w.burnJob = Nt(w.cfg, w.T, "burn").then((E) => {
      if (w.released) return;
      let A = w.tFx;
      A === i && (w.bytes += E.canvas.width * E.canvas.height * 4), w.tFx = v(E.canvas, {}), I(A), w.burnPts = E.burnPts, w.fxBurn = "burn";
    })), w.burnJob);
  }
  async function J(w) {
    await Promise.all([X(w), w.letter && X(w.letter)]);
  }
  function re(w) {
    w.released = !0, [w.tH, w.tPF, w.tPB, w.tFx].forEach(I), w.meshes.forEach((E) => {
      t.deleteVertexArray(E.vao), E.bufs.forEach((A) => t.deleteBuffer(A));
    }), w.letter && re(w.letter);
  }
  function me(w, E, A) {
    let z = E.f || 0, _ = ve.mul(ve.T(E.cx, E.cy, (E.zoff || 0) * E.sc + 0.12 * E.sc * Math.sin(Math.PI * z)), ve.S(E.sc));
    _ = ve.mul(_, ve.RZ(E.rot[2])), _ = ve.mul(_, ve.RX(E.rot[0])), _ = ve.mul(_, ve.RY(E.rot[1] + Math.PI * De(K(z)))), E.local && (_ = ve.mul(_, ve.T(E.local[0], E.local[1], E.local[2])));
    let L = l.u;
    t.useProgram(l.p), [[w.tH, "uH"], [w.tPF, "uPrintF"], [w.tPB, "uPrintB"], [w.tFx, "uFx"]].forEach(([x, G], Z) => {
      t.activeTexture(t.TEXTURE0 + Z), t.bindTexture(t.TEXTURE_2D, x), t.uniform1i(L[G], Z);
    }), t.activeTexture(t.TEXTURE4), t.bindTexture(t.TEXTURE_2D, W()), t.uniform1i(L.uGrain, 4), t.uniform2f(L.uGrainK, w.w * 5, w.h * 5);
    let H = E.L || Ve;
    t.uniform1i(L.uShape, w.F.shape), t.uniform1f(L.uP, K(E.p)), t.uniform1f(L.uK0, w.F.k0), t.uniform1f(L.uKres, 0.06), t.uniform1f(L.uA0, w.F.A0), t.uniform1f(L.uAres, w.F.Ares), t.uniform1f(L.uSeedA, w.seedA), t.uniform1f(L.uSquash, w.F.squash), t.uniform1f(L.uRoll, w.F.roll || 0.03), t.uniform1f(L.uCurl, 0.9 * Math.sin(Math.PI * K(z))), t.uniform1f(L.uStubX, w.stubX ?? 0), t.uniform1f(L.uFoldSide, w.T.stub ? -1 : 1), t.uniform1f(L.uFoldBw, w.T.card ? 0.03 : 0.016), t.uniform1f(L.uFoldY, w.foldY || 0), t.uniform1f(L.uThick, z > 0.5 ? -6e-3 : 6e-3), t.uniform1f(L.uScale, E.sc), t.uniform1f(L.uBump, 1), t.uniform2f(L.uHalf, w.half[0], w.half[1]), t.uniform3f(L.uCam, 0, 0, Ce), t.uniform3f(L.uColor, w.T.color[0], w.T.color[1], w.T.color[2]), t.uniform3f(L.uL, H[0], H[1], H[2]), t.uniform1f(L.uAge, w.age), t.uniform1f(L.uThru, w.T.card ? 0 : 0.035), t.uniform1f(L.uTime, E.time || 0), t.uniform1f(L.uFront, E.front ?? -1), t.uniform1f(L.uDestroy, E.destroy ? 1 : 0), t.uniform1f(L.uInkMax, 24e-4 * E.sc);
    let $ = E.lampPos || [0, 0, 10];
    t.uniform3f(L.uLampPos, $[0], $[1], $[2]), t.uniform1f(L.uLamp, E.lamp || 0), t.uniform1f(L.uLampR, E.lampR || 1), t.uniformMatrix4fv(L.uModel, !1, _), t.uniformMatrix4fv(L.uProj, !1, A), (w.T.card ? [1, 0] : [0]).forEach((x) => {
      t.uniform1f(L.uEdge, x), w.meshes.forEach((G, Z) => {
        let Y = Z === 1;
        Y && (w.torn || (E.tear || 0) >= 1) || (t.uniform1f(L.uIsStub, Y ? 1 : 0), t.uniform1f(L.uTear, Y && E.tear || 0), t.bindVertexArray(G.vao), t.drawElements(t.TRIANGLES, G.count, t.UNSIGNED_SHORT, 0));
      });
    });
  }
  function Ae(w, E, A) {
    t.useProgram(o.p), t.disable(t.DEPTH_TEST), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA);
    let z = ue(K(E.p)), _ = [w.F.ext[0] / 2 * E.sc, w.F.ext[1] / 2 * E.sc], L = [_[0] + (w.half[0] * E.sc - _[0]) * z, _[1] + (w.half[1] * E.sc - _[1]) * z], H = Math.min(Math.min(_[0], _[1]) * (1 - z) + 0.012 * E.sc * z, L[0], L[1]), $ = (0.04 + 0.08 * E.lift + 0.04 * (1 - z)) * E.sc, j = E.L || Ve, x = Math.hypot(j[0], j[1]) || 1, G = (0.05 + 0.1 * E.lift) * E.sc * Math.min(1.6, x / Math.max(0.25, j[2]));
    t.uniform3f(o.u.uC, E.cx - j[0] / x * G, E.cy - j[1] / x * G, -0.25 * E.sc), t.uniform2f(o.u.uHS, L[0], L[1]), t.uniform1f(o.u.uR, H), t.uniform1f(o.u.uSoft, $), t.uniform1f(o.u.uA, (0.62 - 0.2 * E.lift) * (E.alpha ?? 1)), t.uniformMatrix4fv(o.u.uProj, !1, A), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, w.tFx), t.uniform1i(o.u.uFx, 0), t.uniform1f(o.u.uOpen, K((E.p - 0.85) / 0.15)), t.uniform1f(o.u.uFront, E.front ?? -1), t.uniform1f(o.u.uFlip, (E.f || 0) > 0.5 ? 1 : 0), t.bindVertexArray(a), t.drawArrays(t.TRIANGLE_STRIP, 0, 4);
  }
  function be(w, E, A, z = e.width, _ = e.height) {
    if (p || h) return;
    t.viewport(0, 0, z, _), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT);
    let L = ve.mul(ve.persp(_e, z / _, 0.1, 100), ve.T(0, 0, -Ce));
    if (E && (E.st.alpha ?? 1) > 0.01 && Ae(E.P, E.st, L), t.disable(t.BLEND), t.enable(t.DEPTH_TEST), w.forEach((H) => me(H.P, H.st, L)), A && A.n) {
      let H = A.buffer();
      t.useProgram(r.p), t.disable(t.DEPTH_TEST), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA), t.uniformMatrix4fv(r.u.uProj, !1, L), t.uniform1f(r.u.uPx, _ / (2 * Math.tan(_e / 2))), t.bindVertexArray(u), t.bindBuffer(t.ARRAY_BUFFER, f), t.bufferSubData(t.ARRAY_BUFFER, 0, H), t.drawArrays(t.POINTS, 0, H.length / 8);
    }
  }
  let V = null;
  function Re() {
    t.deleteFramebuffer(V.fb), t.deleteRenderbuffer(V.rb), t.deleteTexture(V.t), V = null;
  }
  function Ie(w, E = !1, A = "image/png", z = 256) {
    if (p || h) return "";
    let _ = z;
    if (!V || V.S !== _) {
      V && Re();
      let Y = t.createTexture();
      t.bindTexture(t.TEXTURE_2D, Y), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA8, _, _, 0, t.RGBA, t.UNSIGNED_BYTE, null), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR);
      let ee = t.createRenderbuffer();
      t.bindRenderbuffer(t.RENDERBUFFER, ee), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, _, _);
      let pe = t.createFramebuffer();
      t.bindFramebuffer(t.FRAMEBUFFER, pe), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, Y, 0), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, ee), V = { fb: pe, t: Y, rb: ee, S: _, c: ye(_, _) };
    }
    t.bindFramebuffer(t.FRAMEBUFFER, V.fb);
    let L = _ / (2 * Ce * Math.tan(_e / 2)), H = E ? We(w) : 0, $ = 0.9 * _ / (et(w, H) * L), { items: j } = He(w, { p: H, f: 0, tear: 0, burnOpen: 0 }, { cx: 0, cy: 0, sc: $, scLetter: $, rot: an(w, H), lift: 0, vhU: 1 });
    be(j, null, null, _, _);
    let x = new Uint8Array(_ * _ * 4);
    t.readPixels(0, 0, _, _, t.RGBA, t.UNSIGNED_BYTE, x), t.bindFramebuffer(t.FRAMEBUFFER, null);
    let G = V.c.getContext("2d"), Z = G.createImageData(_, _);
    for (let Y = 0; Y < _; Y++) {
      let ee = (_ - 1 - Y) * _ * 4, pe = Y * _ * 4;
      for (let Q = 0; Q < _ * 4; Q += 4) {
        let Ee = x[ee + Q + 3], de = Ee ? 255 / Ee : 0;
        Z.data[pe + Q] = Math.min(255, x[ee + Q] * de), Z.data[pe + Q + 1] = Math.min(255, x[ee + Q + 1] * de), Z.data[pe + Q + 2] = Math.min(255, x[ee + Q + 2] * de), Z.data[pe + Q + 3] = Ee;
      }
    }
    return G.putImageData(Z, 0, 0), V.c.toDataURL(A, 0.9);
  }
  function rt() {
    if (p) return;
    p = !0, e.removeEventListener("webglcontextlost", g), e.removeEventListener("webglcontextrestored", b), [l, o, r].forEach((E) => t.deleteProgram(E.p)), t.deleteVertexArray(a), t.deleteBuffer(s), t.deleteVertexArray(u), t.deleteBuffer(f), [S, i, B].forEach((E) => {
      E && t.deleteTexture(E);
    }), V && Re();
    let w = t.getExtension("WEBGL_lose_context");
    w && w.loseContext();
  }
  return { gl: t, build: k, refreshPrint: D, release: re, draw: be, snapshot: Ie, ensureBurn: J, isLost: () => h, destroy: rt };
}

// .build/particles.js
function St(e = 420) {
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
var sn = {
  flip: "[ flip ]",
  tear: "[ tear stub ]",
  close: "[ close ]",
  hint: "drag to unfold",
  open: "Crumpled paper: open",
  back: "Back:"
}, wt = /* @__PURE__ */ (() => {
  let e = { labels: sn, remember: !1, motion: "auto", flashlight: !0, maxBuilt: 3 }, n = !1, t, l = !1, o, r, a, s, u, f, h, p, m, d = null, g = null, b = [], y = /* @__PURE__ */ new WeakMap(), v = [], S = St(), i = null, P = 0, C = (c) => c.replace(/\[\[[^\]\n]+\]\]/g, "redacted").replace(/~~[^~\n]+~~\{([^}\n]+)\}/g, "$1").replace(/~~([^~\n]+)~~/g, "$1").replace(/^# /gm, ""), N = 0.16, I = 0.9, B = 0.42, ne = 1.5, W = 1;
  function k() {
    if (o) return;
    n = Be(e.motion);
    let c = document.createElement("style");
    c.textContent = ":root{--crumple-backdrop:rgba(6,5,4,.8);--crumple-ui-bg:rgba(14,13,12,.7);--crumple-ui-fg:#ebe5d6;--crumple-ui-border:rgba(235,229,214,.4);--crumple-ui-font:12px/1 'Courier Prime',ui-monospace,monospace;--crumple-accent:#f5c266}.crumple-scene{position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483640;pointer-events:none;display:none;transition:opacity .3s ease;touch-action:none}.crumple-backdrop{position:fixed;inset:0;z-index:2147483630;background:transparent;pointer-events:none;transition:background .7s ease}.crumple-backdrop.on{background:var(--crumple-backdrop)}.crumple-bar{position:fixed;z-index:2147483645;right:18px;top:16px;display:none;gap:8px}.crumple-bar.on{display:flex}.crumple-bar button,.crumple-fallback button{background:var(--crumple-ui-bg);border:1px solid var(--crumple-ui-border);color:var(--crumple-ui-fg);font:var(--crumple-ui-font);letter-spacing:.18em;padding:9px 12px;cursor:pointer}.crumple-bar button[hidden]{display:none}.crumple-hint{position:fixed;z-index:2147483645;left:50%;bottom:8vh;transform:translateX(-50%);font:var(--crumple-ui-font);font-size:13px;letter-spacing:.2em;color:var(--crumple-ui-fg);background:var(--crumple-ui-bg);padding:8px 14px;opacity:0;transition:opacity .5s;pointer-events:none}.crumple-hint.on{opacity:1}.crumple-trigger{display:inline-block;width:96px;height:96px;padding:0;border:0;background:none;cursor:pointer;-webkit-tap-highlight-color:transparent}.crumple-trigger img{width:100%;height:100%;display:block;filter:drop-shadow(2px 7px 6px rgba(0,0,0,.6))}.crumple-trigger:hover img,.crumple-trigger:focus-visible img{animation:crumple-wiggle .75s ease}.crumple-trigger:focus-visible{outline:2px solid var(--crumple-accent);outline-offset:4px;border-radius:50%}.crumple-trigger.active{visibility:hidden}.crumple-trigger.recrumple img{animation:crumple-squeeze .9s ease}@keyframes crumple-wiggle{0%{transform:none}22%{transform:rotate(-8deg) translateY(-4px)}50%{transform:rotate(6deg) translateY(-1px)}78%{transform:rotate(-2deg)}100%{transform:none}}@keyframes crumple-squeeze{0%{transform:scale(1.15)}30%{transform:scale(.7) rotate(-20deg)}60%{transform:scale(1.05) rotate(10deg)}100%{transform:none}}.crumple-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.crumple-fallback{position:fixed;inset:0;z-index:2147483646;display:none;align-items:center;justify-content:center;background:var(--crumple-backdrop);padding:24px}.crumple-fallback.on{display:flex}.crumple-fallback .sheet{max-width:min(520px,90vw);max-height:86vh;overflow:auto;padding:36px 34px;box-shadow:0 18px 40px rgba(0,0,0,.6);white-space:pre-line;font-size:19px;line-height:1.6;color:#2a2219}.crumple-fallback .sheet img{display:block;max-width:100%;margin:0 auto 16px}.crumple-fallback button{position:fixed;right:18px;top:16px}.crumple-fallback del{color:#5b4d3e;text-decoration:line-through;text-decoration-thickness:2px}.crumple-fallback ins{text-decoration:none;color:#1d3a8c;font-family:Caveat,'Comic Sans MS',cursive;font-size:1.12em;padding:0 .12em}.crumple-fallback .crumple-h{display:block;font-weight:700;font-size:1.15em;margin:.2em 0}.crumple-fallback .crumple-redact{display:inline-block;height:.85em;vertical-align:-.08em;background:#1b1713;border-radius:2px;margin:0 .1em}body.crumple-open{overflow:hidden;touch-action:none}@media (prefers-reduced-motion:reduce){.crumple-trigger.recrumple img,.crumple-trigger:hover img{animation:none}}@media print{canvas.crumple-scene,.crumple-backdrop,.crumple-bar,.crumple-hint,.crumple-fallback{display:none !important}.crumple-sr{position:static !important;width:auto !important;height:auto !important;overflow:visible !important;clip:auto !important;white-space:pre-wrap !important;color:#000;font-family:monospace}}", document.head.appendChild(c), d = c;
    let T = e.labels;
    r = document.createElement("div"), r.className = "crumple-backdrop", o = document.createElement("canvas"), o.className = "crumple-scene", o.setAttribute("aria-hidden", "true"), p = document.createElement("div"), p.className = "crumple-sr", p.id = "crumple-content", p.setAttribute("aria-live", "polite"), a = document.createElement("div"), a.className = "crumple-bar", a.setAttribute("role", "dialog"), a.setAttribute("aria-modal", "true"), a.setAttribute("aria-describedby", "crumple-content"), a.tabIndex = -1, s = document.createElement("button"), s.type = "button", s.textContent = T.flip, u = document.createElement("button"), u.type = "button", u.textContent = T.tear, u.hidden = !0, f = document.createElement("button"), f.type = "button", f.textContent = T.close, a.append(p, u, s, f), h = document.createElement("div"), h.className = "crumple-hint", h.textContent = T.hint, m = document.createElement("div"), m.className = "crumple-fallback", m.setAttribute("role", "dialog"), m.setAttribute("aria-modal", "true"), document.body.append(r, o, a, h, m), oe(v, f, "click", () => w()), oe(v, s, "click", () => z()), oe(v, u, "click", () => _()), oe(v, window, "keydown", (R) => {
      if (!(R.ctrlKey || R.metaKey || R.altKey || $e(R.target))) {
        if (m.classList.contains("on")) {
          R.key === "Escape" ? ae() : R.key === "Tab" && Se(R, m);
          return;
        }
        i && (R.key === "Tab" ? Se(R, a) : R.key === "Escape" ? w() : (R.key === "f" || R.key === "F") && z());
      }
    }), oe(v, window, "resize", () => {
      i && (X(), V());
    }), oe(v, window, "pointermove", (R) => {
      if (!e.flashlight || !i || i.phase !== "open" || i.dragging || R.pointerType === "touch") return;
      let M = i.boxCache || me(), O = !!M && R.clientX > M.x0 - 30 && R.clientX < M.x1 + 30 && R.clientY > M.y0 - 30 && R.clientY < M.y1 + 30;
      nt(i, R.clientX, R.clientY, o.clientWidth, o.clientHeight, o.clientHeight / (2 * Ce * Math.tan(_e / 2)), O), V();
    }), oe(v, document, "mouseout", (R) => {
      i && !R.relatedTarget && (i.lampOn = 0, V());
    }), oe(v, document, "visibilitychange", () => {
      document.hidden || V();
    }), oe(v, o, "dblclick", () => z()), g = Je(), g && oe(v, g, "change", () => {
      n = Be(e.motion);
    }), v.push(Tt(o, {
      active: () => i && i.phase === "open" ? i : null,
      box: me,
      flip: () => z(),
      outside: () => w(),
      tap: (R) => {
        let M = Ae();
        return M && R.clientX > M.x0 && R.clientX < M.x1 && R.clientY > M.y0 && R.clientY < M.y1 ? (_(), !0) : !1;
      },
      redraw: () => V()
    }));
  }
  function D() {
    if (l) return t;
    l = !0, k();
    try {
      t = ot(o, { onRestore: pe });
    } catch {
      t = null;
    }
    return t;
  }
  function X() {
    let c = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(24e5 / Math.max(1, innerWidth * innerHeight))), T = Math.round(innerWidth * c), R = Math.round(innerHeight * c);
    (o.width !== T || o.height !== R) && (o.width = T, o.height = R);
  }
  function J(c) {
    let T = i.P, R = o.clientWidth, M = o.clientHeight, O = M / (2 * Ce * Math.tan(_e / 2)), F = i.from, U = F.left + F.width / 2, le = F.top + F.height / 2, ce = (U - R / 2) / O, we = -(le - M / 2) / O, Te = 0.9 * F.width / ((i.ext0 || T.extent) * O), Me = T.cfg.type === "envelope", je = Me ? Math.min(0.5 * M / (T.T.body * O), 0.7 * R / (T.w * O)) : Math.min(0.86 * M / (T.h * O), 0.9 * R / (T.w * O)), Rt = T.letter, un = Rt ? Math.min(0.86 * M / (Rt.h * O), 0.9 * R / (Rt.w * O)) : je, Ne = n ? 1 : i.tf, Ut = ue(K(Me ? i.p * 2 : i.p)), pn = Math.hypot(ce, we), Bt = (1 - Ne) * (1 - Ne), zt = 2 * (1 - Ne) * Ne, dn = i.arc || 0.24, hn = Bt * ce + zt * ce * 0.5, Mt = Bt * we + zt * (we * 0.5 + dn * pn), at = T.F, cn = at.shape === 0 && at.squash > 0.5 ? 1 : at.shape === 1 || at.shape === 2 ? 0.8 : 0.45, mn = n ? 0 : ue(Ne) * cn, bn = [0.55, 1.15, 0.35], gn = [0, 0, -0.02], kt = T.pose.map((Pe, qt) => (Pe + bn[qt] * mn) * (1 - Ut) + gn[qt] * Ut), At = Te + (je - Te) * Math.pow(Ne, 1.25), Gt = 0.9 * F.width / O, Xt = i.pre ?? 1, Ke = i.bounce ?? 1, it = i.settle ?? 1;
    if (Xt < 1) {
      let Pe = Math.sin(Math.PI * Xt);
      At *= 1 + 0.12 * Pe, Mt += Pe * 0.16 * Gt;
    }
    if (Ke < 1) {
      let Pe = (1 - Ke) * (1 - Ke);
      Mt += Math.abs(Math.sin(2 * Math.PI * Ke)) * Pe * 0.4 * Gt, kt[2] += 0.18 * Math.sin(2 * Math.PI * Ke) * Pe;
    }
    let _t = it < 1 ? Math.sin(Math.PI * 2.5 * it) * (1 - it) * (1 - it) : 0, Yt = [0.05 * _t, 0.022 * _t, 0];
    for (let Pe = 0; Pe < 3; Pe++) kt[Pe] += Yt[Pe];
    return At *= 1 + 0.01 * _t, { cx: hn, cy: Mt, sc: At, scLetter: un, rot: kt, adjust: Yt, lift: Math.sin(Math.PI * Ne), time: c / 1e3, ppu: O, vw: R, vh: M, vhU: M / O, L: Ve, lampPos: i.lampPos, lamp: i.lamp || 0, lampR: 0.3 * M / O };
  }
  function re(c = performance.now()) {
    let T = J(c);
    return { b: T, scene: He(i.P, i, T) };
  }
  function me() {
    if (!i) return null;
    let { b: c, scene: T } = re();
    return tt(T.active.P, T.active.st, c.ppu, c.vw, c.vh);
  }
  function Ae() {
    if (!i || i.P.stubX === null || i.P.torn || i.p < 0.95 || i.f > 0.01) return null;
    let { b: c, scene: T } = re(), R = T.active.st, M = i.P, O = c.vw / 2 + R.cx * c.ppu, F = c.vh / 2 - R.cy * c.ppu;
    return { x0: O + M.stubX * R.sc * c.ppu, x1: O + M.half[0] * R.sc * c.ppu, y0: F - M.half[1] * R.sc * c.ppu, y1: F + M.half[1] * R.sc * c.ppu };
  }
  function be(c) {
    if (P = 0, !i || document.hidden || t.isLost() || i.rebuilding) return;
    if (!i.tw.length && !i.dragging && !i.lampMoving && !i.resume && i.tPrev && c - i.tPrev < 32) {
      P = requestAnimationFrame(be);
      return;
    }
    let T = i.resume ? 1 / 60 : Math.min(0.1, Math.max(0, (c - (i.tPrev || c)) / 1e3));
    i.resume = !1, i.tPrev = c;
    let R = yt(i, c);
    if (!i) return;
    let M = Et(i, T);
    i.lampMoving = M, i.P.burnPts && i.P.front0 > -0.5 && i.phase === "open" && i.destroy === void 0 && (i.burnOpen = Math.min(0.08, (i.burnOpen || 0) + T * 4e-3));
    let { b: O, scene: F } = re(c);
    i.boxCache = tt(F.active.P, F.active.st, O.ppu, O.vw, O.vh), vt(S, i, F, T), S.step(T), t.draw(F.items, F.shadow, S), i.pPrev = i.p;
    let U = F.active.st.front > -0.5 && !!F.active.P.burnPts;
    if (i.ashes && (S.n === 0 || c > i.ashesEnd)) {
      A();
      return;
    }
    (R || i.dragging || M || S.n > 0 || U || i.ashes) && (P = requestAnimationFrame(be));
  }
  function V() {
    !P && i && (i.resume = !0, P = requestAnimationFrame(be));
  }
  let Re = (c) => e.remember && !!he.get("opened." + c, !1);
  function Ie(c) {
    if (i || !c.P) return;
    let T = c.P;
    X();
    let R = he.get("opens." + T.cfg.id, 0) + 1;
    he.set("opens." + T.cfg.id, R), T.hasRedaction && requestAnimationFrame(() => t.refreshPrint(T).then(V));
    let M = c.opened ? We(T) : 0;
    i = { P: T, ent: c, from: c.btn.getBoundingClientRect(), tf: 0, p: M, ext0: et(T, M), f: 0, tear: 0, tw: [], phase: "opening", dragging: !1, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 }, S.clear(), c.btn.classList.add("active"), document.body.classList.add("crumple-open"), o.style.display = "block", o.style.pointerEvents = "auto", r.classList.add("on"), a.classList.add("on"), a.setAttribute("aria-label", ke[T.cfg.type].name), f.focus({ preventScroll: !0 }), u.hidden = T.stubX === null || T.torn, p.replaceChildren(), de(T.cfg.text, p), T.cfg.back && (p.append(`

\u2014 ` + e.labels.back + ` \u2014
`), de(T.cfg.back, p));
    let O = T.cfg.open === "drag", F = T.cfg.type === "envelope", U = () => {
      i && (i.phase = "open", O && i.p < 0.5 && h.classList.add("on"));
    };
    if (n)
      o.style.opacity = "0", requestAnimationFrame(() => {
        o.style.opacity = "1";
      }), i.tf = 1, i.phase = "open", O ? h.classList.add("on") : (fe(i, "p", 1, W * (F ? 1.6 : 1), ze), se.play("uncrumple", W));
    else {
      i.pre = 0, i.arc = 0.24;
      let ce = N * 0.55, we = F ? ne * 1.85 : ne;
      if (fe(i, "pre", 1, N, ge), fe(i, "tf", 1, I, Ht, ce, U), !O) {
        let Te = () => {
          i && i.phase !== "closing" && (i.settle = 0, fe(i, "settle", 1, 0.9, ge), V());
        };
        fe(i, "p", 1, we, F ? Ge : lt(T), ce + B, Te), se.play(F ? "seal" : "uncrumple", we, ce + B);
      }
    }
    T.front0 > -0.5 && se.play("fire", 2.5, 0.6), e.remember && he.set("opened." + T.cfg.id, !0), Ue(c.btn, "open", { id: T.cfg.id, openings: R }), V();
    let { scene: le } = re();
    t.draw(le.items, le.shadow, S);
  }
  function rt() {
    !i || !i.burnOpen || (i.P.burned = Math.min(0.2, i.P.burned + i.burnOpen), he.set("burned." + i.P.cfg.id, i.P.burned), i.burnOpen = 0);
  }
  function w() {
    if (!i || i.phase === "closing") return;
    if (i.P.cfg.burnAfterReading && i.p > 0.9 && i.phase === "open") {
      E();
      return;
    }
    rt(), i.phase = "closing", i.dragging = !1, i.lampOn = 0, i.from = i.ent.btn.getBoundingClientRect(), r.classList.remove("on"), a.classList.remove("on"), h.classList.remove("on"), o.style.pointerEvents = "none", i.tw = i.tw.filter((O) => O.key !== "settle"), i.settle = 1;
    let c = i.P.cfg.type === "envelope", T = Re(i.P.cfg.id) ? We(i.P) : 0;
    i.tf > 0.999 && (i.ext0 = et(i.P, T));
    let R = n ? 0.6 : c ? 1.9 : 0.85, M = R * Math.max(0.35, i.p - T);
    if (i.f > 0 && fe(i, "f", 0, 0.45, De), i.p > T + 0.02 && se.play("crumple", M), fe(i, "p", T, M, c ? Ge : st(i.P)), n) fe(i, "tf", 1, R, ge, 0, A);
    else {
      i.tf > 0.999 && (i.arc = 0.34);
      let O = () => {
        i && (i.bounce = 0, fe(i, "bounce", 1, 0.36, ge, 0, A));
      };
      fe(i, "tf", 0, 0.78, Vt, M * (c ? 0.8 : 0.5), O);
    }
    Ue(i.ent.btn, "close", { id: i.P.cfg.id }), V();
  }
  function E() {
    rt(), i.phase = "closing", i.dragging = !1, a.classList.remove("on"), h.classList.remove("on"), o.style.pointerEvents = "none", i.f > 0 && fe(i, "f", 0, 0.4, De);
    let c = i.P.letter || i.P;
    i.destroy = Math.max(c.front0 > -0.5 ? c.front0 + c.burned : -0.06, -0.06), se.play("fire", 2.8), fe(i, "destroy", 1.6, n ? 1.2 : 2.6, ge, 0, () => {
      if (!i) return;
      i.ashes = !0, i.ashesEnd = performance.now() + 3e3, r.classList.remove("on");
      let T = i.ent;
      he.set("destroyed." + T.cfg.id, !0), T.destroyed = !0, Ue(T.btn, "burn", { id: T.cfg.id });
    }), V();
  }
  function A() {
    if (!i) return;
    let c = i.ent, T = !!i.ashes;
    i = null, S.clear(), r.classList.remove("on"), document.body?.classList.remove("crumple-open");
    let R = () => {
      i || (o.style.display = "none", o.style.opacity = ""), T ? (c.btn.hidden = !0, c.btn.classList.remove("active")) : (!i || i.ent !== c) && c.btn.classList.remove("active");
    };
    n ? (o.style.opacity = "0", setTimeout(R, 300)) : R(), p.textContent = "", T || c.btn.focus({ preventScroll: !0 }), Q(c);
  }
  function z() {
    !i || i.phase === "closing" || i.destroy !== void 0 || (se.play("flip"), Ye(10), fe(i, "f", i.f < 0.5 ? 1 : 0, 0.8, ge), Ue(i.ent.btn, "flip", { id: i.P.cfg.id, back: i.f < 0.5 }), V());
  }
  function _() {
    !i || i.P.stubX === null || i.P.torn || i.tear > 0 || i.p < 0.95 || i.f > 0.01 || (se.play("tear"), Ye([15, 20, 15, 20, 30]), Ue(i.ent.btn, "tear", { id: i.P.cfg.id }), u.hidden = !0, fe(i, "tear", 1, n ? 0.3 : 1, ge, 0, () => {
      i && (i.P.torn = !0);
    }), V());
  }
  function L(c, T, R = {}) {
    let M = { btn: c, cfg: Ze(T), P: null, building: null, opts: R, opened: !1, off: [], io: null, gone: !1, madeImg: !1, madeLabel: !1 };
    return document.body ? H(M) : document.addEventListener("DOMContentLoaded", () => H(M), { once: !0 }), M;
  }
  function H(c) {
    let { btn: T, cfg: R, opts: M } = c;
    k();
    let O = y.get(T);
    O && $(O);
    let F = b.find((le) => le.cfg.id === R.id);
    F && (console.warn(`crumple: id "${R.id}" is already attached, the previous paper is detached`), $(F)), b.push(c), y.set(T, c), T.classList.add("crumple-trigger"), T.getAttribute("aria-label") || (T.setAttribute("aria-label", e.labels.open), c.madeLabel = !0), he.get("destroyed." + R.id, !1) && (T.hidden = !0, c.destroyed = !0), c.opened = Re(R.id), oe(c.off, T, "click", async () => {
      await Y(c) ? Ie(c) : q(c);
    });
    let U = T.querySelector("img");
    if (M.snapshot) {
      U || (U = document.createElement("img"), U.alt = "", T.appendChild(U), c.madeImg = !0), U.onerror = () => {
        c.opts = {}, U.onerror = null, j(c);
      }, U.src = c.opened && M.snapshotOpened ? M.snapshotOpened : M.snapshot;
      let le = () => {
        x(() => Y(c));
      };
      ["pointerenter", "focus", "touchstart"].forEach((ce) => oe(c.off, T, ce, le, { once: !0, passive: !0 })), oe(c.off, T, "pointerdown", () => Y(c), { passive: !0 });
    } else j(c);
  }
  function $(c) {
    c.gone = !0, c.off.splice(0).forEach((M) => M()), c.io && c.io.disconnect();
    let T = b.indexOf(c);
    T >= 0 && b.splice(T, 1);
    let R = G.indexOf(c);
    if (R >= 0 && G.splice(R, 1), i && i.ent === c && A(), c.P && (t.release(c.P), c.P = null), y.get(c.btn) === c && y.delete(c.btn), c.btn.classList.remove("crumple-trigger", "active", "recrumple"), c.madeLabel && c.btn.removeAttribute("aria-label"), c.madeImg) {
      let M = c.btn.querySelector("img");
      M && M.remove();
    }
  }
  function j(c) {
    if ("IntersectionObserver" in window) {
      let T = new IntersectionObserver((R) => R.forEach((M) => {
        M.isIntersecting && (T.disconnect(), x(() => Y(c).then(() => Q(c))));
      }), { rootMargin: "600px 0px" });
      c.io = T, T.observe(c.btn);
    } else x(() => Y(c).then(() => Q(c)));
  }
  let x = (c) => globalThis.requestIdleCallback ? requestIdleCallback(c, { timeout: 700 }) : setTimeout(c, 60), G = [], Z = 0;
  function Y(c) {
    if (c.P) {
      let T = G.indexOf(c);
      return T >= 0 && G.push(G.splice(T, 1)[0]), Promise.resolve(c.P);
    }
    return c.building ? c.building : c.building = ee(c);
  }
  async function ee(c) {
    let T = Z;
    try {
      if (c.gone || !D() || t.isLost()) return null;
      let R = t, M = await R.build(c.cfg);
      if (T !== Z) return null;
      if (c.gone)
        return R.release(M), null;
      for (c.P = M, G.push(c); G.length > e.maxBuilt; ) {
        let O = G.findIndex((U) => (!i || U !== i.ent) && U !== c);
        if (O < 0) break;
        let F = G.splice(O, 1)[0];
        !F.opts.snapshot && F.P && Q(F), F.P && R.release(F.P), F.P = null, F.building = null;
      }
      return c.P;
    } catch (R) {
      return console.warn("crumple: the paper could not be built, the CSS version is shown instead", R), null;
    } finally {
      T === Z && (c.building = null);
    }
  }
  function pe() {
    Z++;
    let c = G.splice(0);
    if (b.forEach((T) => {
      T.P = null, T.building = null;
    }), c.forEach((T) => Y(T).then(() => Q(T))), i) {
      let T = i.ent;
      i.rebuilding = !0, Y(T).then((R) => {
        !i || i.ent !== T || (R ? (i.P = R, i.rebuilding = !1, V()) : (i.ashes = !1, A()));
      });
    }
  }
  function Q(c) {
    if (c.destroyed || c.gone) return;
    c.opened = Re(c.cfg.id);
    let T = c.btn.querySelector("img");
    if (T || (T = document.createElement("img"), T.alt = "", c.btn.appendChild(T), c.madeImg = !0), c.opts.snapshot) {
      T.src = c.opened && c.opts.snapshotOpened ? c.opts.snapshotOpened : c.opts.snapshot;
      return;
    }
    c.P && t && (T.src = t.snapshot(c.P, c.opened));
  }
  function Ee() {
    let c = !1;
    b.forEach((T) => {
      he.remove("opened." + T.cfg.id), !(!T.opened || T.destroyed) && (c = !0, Q(T), T.btn.classList.remove("recrumple"), T.btn.offsetWidth, T.btn.classList.add("recrumple"));
    }), c && se.play("crumple", 0.9);
  }
  function de(c, T) {
    let R = !1;
    c.split(`
`).forEach((M, O) => {
      let F = M.startsWith("# ");
      O && !F && !R && T.append(`
`), R = F;
      let U = F ? M.slice(2) : M, le = F ? document.createElement("span") : T;
      F && (le.className = "crumple-h");
      let ce = /~~([^~\n]+)~~(?:\{([^}\n]+)\})?|\[\[([^\]\n]+)\]\]/g, we = 0, Te;
      for (; Te = ce.exec(U); ) {
        if (Te.index > we && le.append(U.slice(we, Te.index)), Te[3] !== void 0) {
          let Me = document.createElement("span");
          Me.className = "crumple-redact", Me.setAttribute("role", "img"), Me.setAttribute("aria-label", "redacted"), Me.style.width = Math.max(3, Te[3].length * 0.5) + "em", le.append(Me);
        } else {
          let Me = document.createElement("del");
          if (Me.textContent = Te[1], le.append(Me), Te[2] !== void 0) {
            let je = document.createElement("ins");
            je.textContent = Te[2], le.append(je);
          }
        }
        we = ce.lastIndex;
      }
      we < U.length && le.append(U.slice(we)), F && T.append(le);
    });
  }
  function q(c) {
    k();
    let T = ke[c.cfg.type], R = (F) => Math.round(T.color[F] * 255), M = document.createElement("div");
    if (M.className = "sheet", M.style.background = `rgb(${R(0)},${R(1)},${R(2)})`, M.style.fontFamily = `"${T.font}", "Courier Prime", monospace`, c.opts.snapshotOpened) {
      let F = document.createElement("img");
      F.src = c.opts.snapshotOpened, F.alt = "", M.appendChild(F);
    }
    de(c.cfg.text, M), c.cfg.back && (M.append(`

\u2014 ` + e.labels.back + ` \u2014
`), de(c.cfg.back, M));
    let O = document.createElement("button");
    O.type = "button", O.textContent = e.labels.close, O.addEventListener("click", ae), m.setAttribute("aria-label", T.name), m.replaceChildren(M, O), m.classList.add("on"), document.body?.classList.add("crumple-open"), O.focus(), m.onclick = (F) => {
      F.target === m && ae();
    }, m._ent = c, Ue(c.btn, "open", { id: c.cfg.id, fallback: !0 });
  }
  function ae() {
    m.classList.remove("on"), document.body?.classList.remove("crumple-open"), m._ent && m._ent.btn.focus({ preventScroll: !0 });
  }
  function Se(c, T) {
    let R = [...T.querySelectorAll("button")].filter((U) => !U.hidden);
    if (!R.length) return;
    c.preventDefault();
    let M = R.indexOf(document.activeElement), O = R.length - 1, F = M < 0 ? 0 : c.shiftKey ? M === 0 ? O : M - 1 : M === O ? 0 : M + 1;
    R[F].focus({ preventScroll: !0 });
  }
  let $e = (c) => !!c && (c.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(c.tagName));
  function Oe() {
    o && (i = null, cancelAnimationFrame(P), P = 0, b.slice().forEach($), G.length = 0, v.splice(0).forEach((c) => c()), t && t.destroy(), t = null, l = !1, d.remove(), document.body?.classList.remove("crumple-open"), [r, o, a, h, p, m].forEach((c) => c.remove()), r = o = a = h = p = m = null, S.clear());
  }
  return {
    // options: { labels, remember, motion: 'auto' | 'reduce' | 'full' ('reduced' still works), flashlight, maxBuilt }
    init(c = {}) {
      e = { ...e, ...c, labels: { ...sn, ...c.labels || {} } }, o && (s.textContent = e.labels.flip, u.textContent = e.labels.tear, f.textContent = e.labels.close, h.textContent = e.labels.hint), k(), n = Be(e.motion), x(() => {
        o && D();
      });
    },
    attach: L,
    // detaches a trigger element, or the paper with that id
    detach(c) {
      let T = typeof c == "string" ? b.find((R) => R.cfg.id === c) : y.get(c);
      T && $(T);
    },
    destroy: Oe,
    open: (c) => Y(c).then((T) => T ? Ie(c) : q(c)),
    close: w,
    flip: z,
    tear: _,
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
    async frame(c, T, R, M = 0, O = 0, F) {
      let U = b[c];
      await Y(U), F !== void 0 && await t.ensureBurn(U.P), cancelAnimationFrame(P), P = 0, X(), i = { P: U.P, ent: U, from: U.btn.getBoundingClientRect(), tf: T, p: R, f: M, tear: O, tw: [], phase: "open", burnOpen: 0 }, F !== void 0 && (i.destroy = F), o.style.display = "block", r.classList.add("on"), b.forEach((ce) => ce.btn.classList.toggle("active", ce === U));
      let { scene: le } = re();
      t.draw(le.items, le.shadow, null);
    },
    // debugging/testing: lights the flashlight at screen (x, y) and draws
    flashlight(c, T) {
      if (i) {
        nt(i, c, T, o.clientWidth, o.clientHeight, o.clientHeight / (2 * Ce * Math.tan(_e / 2)), !0), i.lampPos = i.lampGoal.slice(), i.lamp = 1;
        let { scene: R } = re();
        t.draw(R.items, R.shadow, null);
      }
    },
    get debug() {
      return i ? { phase: i.phase, ashes: !!i.ashes, destroy: i.destroy, n: S.n, raf: P, tw: i.tw.map((c) => c.key), lampPos: i.lampPos, lamp: i.lamp } : null;
    }
  };
})();

// .build/stage.js
var fn = 1.5;
function Wn(e, n = {}) {
  let t = { flashlight: !0, drag: !0, fit: 0.8, motion: "auto", ...n }, l, o = !1, r = Be(t.motion);
  try {
    l = ot(e, { onRestore: I });
  } catch {
    l = null;
  }
  if (!l) return null;
  let a = (k, D, X, J, re, me, Ae) => fe(k, D, X, r ? J * 0.4 : J, re, me, Ae), s = null, u = 0, f = 0, h = null, p = "", m = null, d = [], g = St(), b = { p: 1, f: 0, tear: 0, tw: [], dragging: !1, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 };
  function y() {
    let k = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(4e6 / Math.max(1, e.clientWidth * e.clientHeight))), D = Math.round(e.clientWidth * k), X = Math.round(e.clientHeight * k);
    (e.width !== D || e.height !== X) && (e.width = D, e.height = X);
  }
  function v(k) {
    let D = e.clientWidth, X = e.clientHeight, J = X / (2 * Ce * Math.tan(_e / 2)), re = s.cfg.type === "envelope", me = re ? Math.min(t.fit * 0.69 * X / (s.T.body * J), 0.7 * D / (s.w * J)) : Math.min(t.fit * X / (s.h * J), (t.fit + 0.06) * D / (s.w * J)), Ae = s.letter ? Math.min(t.fit * X / (s.letter.h * J), (t.fit + 0.06) * D / (s.letter.w * J)) : me, be = ue(K(re ? b.p * 2 : b.p)), V = [0, 0, -0.02];
    return { cx: 0, cy: 0, sc: me, scLetter: Ae, rot: s.pose.map((Re, Ie) => Re * (1 - be) + V[Ie] * be), lift: 0, time: k / 1e3, ppu: J, vw: D, vh: X, vhU: X / J, L: Ve, lampPos: b.lampPos, lamp: b.lamp || 0, lampR: 0.3 * X / J };
  }
  let S = (k = performance.now()) => {
    let D = v(k);
    return { b: D, scene: He(s, b, D) };
  };
  function i(k) {
    if (u = 0, !s || document.hidden || o || l.isLost()) return;
    y();
    let D = b.resume ? 1 / 60 : Math.min(0.05, Math.max(0, (k - (b.tPrev || k)) / 1e3));
    b.resume = !1, b.tPrev = k;
    let X = yt(b, k), J = Et(b, D), { scene: re } = S(k);
    vt(g, b, re, D), g.step(D), l.draw(re.items, re.shadow, g), b.pPrev = b.p, (X || b.dragging || J || g.n > 0 || re.active.st.front > -0.5 && re.active.P.burnPts) && (u = requestAnimationFrame(i));
  }
  let P = () => {
    !u && !o && (b.resume = !0, u = requestAnimationFrame(i));
  };
  function C() {
    if (!s) return null;
    let { b: k, scene: D } = S(), X = e.getBoundingClientRect();
    return tt(D.active.P, D.active.st, k.ppu, k.vw, k.vh, X.left, X.top);
  }
  t.drag && (p = e.style.touchAction, e.style.touchAction = "none", h = Tt(e, { active: () => s ? b : null, box: C, outside: () => {
  }, redraw: P })), oe(d, e, "dblclick", () => W.flip()), t.flashlight && (oe(d, e, "pointermove", (k) => {
    if (!s || b.dragging || k.pointerType === "touch") return;
    let D = C(), X = e.getBoundingClientRect(), J = !!D && k.clientX > D.x0 - 30 && k.clientX < D.x1 + 30 && k.clientY > D.y0 - 30 && k.clientY < D.y1 + 30;
    nt(b, k.clientX - X.left, k.clientY - X.top, e.clientWidth, e.clientHeight, e.clientHeight / (2 * Ce * Math.tan(_e / 2)), J), P();
  }), oe(d, e, "pointerleave", () => {
    b.lampOn = 0, P();
  })), oe(d, window, "resize", () => P()), oe(d, document, "visibilitychange", () => {
    document.hidden || P();
  });
  let N = Je();
  N && t.motion === "auto" && oe(d, N, "change", () => {
    r = Be(t.motion);
  });
  function I() {
    let k = s && s.cfg, D = b.p;
    s = null, k && W.set(k, { progress: D }).catch((X) => console.warn("crumple: rebuild after context restore failed", X));
  }
  function B() {
    o || (o = !0, f++, cancelAnimationFrame(u), u = 0, d.splice(0).forEach((k) => k()), h && h(), t.drag && (e.style.touchAction = p), s && l.release(s), s = null, b.tw = [], g.clear(), l.destroy());
  }
  let ne = () => s.cfg.type === "envelope", W = {
    // builds a paper from a config and shows it (resolves with the paper, or null if a newer call replaced it)
    async set(k, { progress: D } = {}) {
      if (o) return null;
      let X = ++f, J = await l.build(k);
      return X !== f || o ? (l.release(J), null) : (s && l.release(s), s = J, b.tear = 0, b.f = 0, s.torn = !1, delete b.destroy, D !== void 0 && (b.tw = [], b.p = K(D)), g.clear(), P(), s);
    },
    crumple() {
      s && (se.play("crumple", 0.9), a(b, "p", 0, ne() ? 1.9 : 0.9, ne() ? Ge : st(s)), P());
    },
    uncrumple() {
      s && (se.play(ne() ? "seal" : "uncrumple", 1.5), a(b, "p", 1, ne() ? fn * 1.85 : fn, ne() ? Ge : lt(s)), P());
    },
    toggle() {
      b.p > 0.5 ? W.crumple() : W.uncrumple();
    },
    // any time, except once the paper burns away; the side it shows is kept through crumple and unfold
    flip() {
      !s || b.destroy !== void 0 || (se.play("flip"), a(b, "f", b.f < 0.5 ? 1 : 0, 0.8, ge), P());
    },
    tear() {
      !s || s.stubX === null || b.tear > 0 || b.p < 0.95 || (se.play("tear"), a(b, "tear", 1, 1, ge, 0, () => {
        s.torn = !0;
      }), P());
    },
    restoreStub() {
      s && (b.tear = 0, s.torn = !1, P());
    },
    // resolves once the paper has its burn field (built on demand for any paper); a second call meanwhile does nothing,
    // and a paper replaced by set() meanwhile is not burnt
    async burn() {
      let k = s;
      if (!k || b.destroy !== void 0 || m === k) return;
      m = k;
      try {
        await l.ensureBurn(k);
      } finally {
        m === k && (m = null);
      }
      if (s !== k || b.destroy !== void 0) return;
      let D = k.letter || k;
      se.play("fire", 2.6), b.destroy = Math.max(D.front0 > -0.5 ? D.front0 + D.burned : -0.06, -0.06), a(b, "destroy", 1.6, 2.6, ge), P();
    },
    restore() {
      delete b.destroy, g.clear(), P();
    },
    setProgress(k) {
      b.tw = [], b.p = K(k), P();
    },
    // PNG of the current frame (draws and reads at once, no preserved buffer needed)
    png() {
      if (!s) return "";
      y();
      let { scene: k } = S();
      return l.draw(k.items, k.shadow, null), e.toDataURL("image/png");
    },
    snapshot(k, D, X) {
      return s ? l.snapshot(s, k, D, X) : "";
    },
    get state() {
      return b;
    },
    get paper() {
      return s;
    },
    destroy: B
  };
  return W;
}

// .build/element.js
var Pt = class extends (typeof HTMLElement < "u" ? HTMLElement : class {
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
      this.entry || (this._io && (this._io.disconnect(), this._io = null), this.entry = wt.attach(n, o, s));
    };
    n.addEventListener("click", u, { once: !0, capture: !0 }), typeof IntersectionObserver < "u" ? (this._io = new IntersectionObserver((f) => {
      for (let h of f)
        if (h.isIntersecting) {
          u();
          break;
        }
    }, { rootMargin: "200px" }), this._io.observe(this)) : u();
  }
  disconnectedCallback() {
    this._io && (this._io.disconnect(), this._io = null), this.btn && wt.detach(this.btn), this._madeBtn && this.btn.parentNode && this.btn.remove(), this.entry = null;
  }
};
typeof customElements < "u" && !customElements.get("crumple-paper") && customElements.define("crumple-paper", Pt);

// .build/index.js
var Yo = "1.2.0";
export {
  Pt as CrumplePaper,
  ot as Renderer,
  jt as SHAPES,
  pt as STATES,
  wt as Scene,
  se as Sound,
  Wn as Stage,
  Kt as TEXTS,
  ke as TYPES,
  Le as config,
  Ze as normalize,
  En as registerPaperType,
  Sn as registerWearState,
  Yo as version
};
//# sourceMappingURL=crumple.esm.js.map
