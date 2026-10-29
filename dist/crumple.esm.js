// .build/util.js
function Q(e) {
  let n = Math.imul(e | 0, 2654435761) >>> 0 || 1;
  return () => (n ^= n << 13, n >>>= 0, n ^= n >>> 17, n ^= n << 5, n >>>= 0, n / 4294967296);
}
function xe(e) {
  let n = (s, o) => {
    let r = Math.imul(s, 374761393) + Math.imul(o, 668265263) + Math.imul(e, 1442695041) | 0;
    return r = Math.imul(r ^ r >>> 13, 1274126177), ((r ^ r >>> 16) >>> 0) / 4294967296;
  }, t = (s, o) => {
    let r = Math.floor(s), a = Math.floor(o), l = s - r, f = o - a, u = l * l * (3 - 2 * l), c = f * f * (3 - 2 * f), d = n(r, a), g = n(r + 1, a), h = n(r, a + 1), E = n(r + 1, a + 1);
    return d + (g - d) * u + (h - d) * c + (d - g - h + E) * u * c;
  };
  return (s, o) => (t(s, o) * 0.5 + t(s * 2, o * 2) * 0.25 + t(s * 4, o * 4) * 0.125 + t(s * 8, o * 8) * 0.0625) / 0.9375;
}
var j = (e, n = 0, t = 1) => Math.min(t, Math.max(n, e)), fe = (e) => e * e * (3 - 2 * e), Ke = (e, n, t) => e + (n - e) * t, De = (e) => e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2, Be = (e) => 1 - (1 - e) * (1 - e), Lt = (e) => 0.5 * fe(e) + 0.5 * Be(e), ge = (e) => e, qt = (e) => 0.35 * fe(e) + 0.65 * (1 - Math.pow(1 - e, 3)), Ht = (e) => e * e * (1.6 - 0.6 * e), ze = (e) => 0.55 * e + 0.45 * fe(e), st = (e) => e.F.shape === 0 ? (n) => 1 - Math.pow(1 - n, 2.3) : Lt, lt = (e) => e.F.shape === 0 ? (n) => 1 - Math.pow(1 - n, 2.2) : De, Le = {
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
function _e(e) {
  if (e === "full") return !1;
  if (e === "reduce" || e === "reduced") return !0;
  let n = Je();
  return !!n && n.matches;
}
function te(e, n, t, s, o) {
  n.addEventListener(t, s, o), e.push(() => n.removeEventListener(t, s, o));
}
var gn = { "Special Elite": "Special+Elite", "Courier Prime": "Courier+Prime:wght@400;700", Caveat: "Caveat:wght@500", VT323: "VT323", "Libre Baskerville": "Libre+Baskerville:ital,wght@0,400;0,700;1,400" }, Ct = {};
function Vt(e) {
  return document.fonts ? Promise.all(e.map((n) => {
    if (!Ct[n]) {
      let t = gn[n], s = t ? "family=" + t.split(":")[0] : null, r = !t || !Le.googleFonts || [...document.querySelectorAll("link[rel=stylesheet]")].some((a) => a.href.includes(s)) ? Promise.resolve() : new Promise((a) => {
        let l = document.createElement("link");
        l.rel = "stylesheet", l.href = "https://fonts.googleapis.com/css2?family=" + t + "&display=swap", l.onload = a, l.onerror = a, setTimeout(a, 4e3), document.head.appendChild(l);
      });
      Ct[n] = r.then(() => Promise.all(["", "bold ", "italic "].map((a) => document.fonts.load(`${a}40px "${n}"`).catch(() => null))));
    }
    return Ct[n];
  })) : Promise.resolve();
}
var Ft = {};
function ut(e) {
  return Ft[e] || (Ft[e] = new Promise((n) => {
    let t = new Image();
    t.crossOrigin = "anonymous", t.onload = () => t.decode ? t.decode().then(() => n(t), () => n(t)) : n(t), t.onerror = () => n(null), t.src = e;
  })), Ft[e];
}
var Ge = (e) => ut(Le.assets + "textures/" + e + ".webp");
function Xe(e) {
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
  blueprint: { name: "Technical blueprint", w: 0.96, h: 0.72, color: [0.055, 0.165, 0.28], shape: "quarters", font: "Courier Prime", size: 34, lineHeight: 48, x: 80, y: 160, ink: [220, 240, 255], typewriter: !0 },
  postcard: { name: "Vintage postcard", w: 0.94, h: 0.62, color: [0.96, 0.95, 0.92], shape: "flat", font: "Caveat", size: 44, lineHeight: 50, x: 70, y: 120, ink: [24, 38, 90], hand: !0, card: !0 },
  punchcard: { name: "IBM 80-col punch card", w: 1.05, h: 0.48, color: [0.95, 0.92, 0.83], shape: "flat", font: "VT323", size: 38, lineHeight: 44, x: 40, y: 100, ink: [40, 40, 40], typewriter: !0, card: !0 },
  shipping: { name: "Kraft shipping parcel", w: 0.76, h: 1, color: [0.78, 0.65, 0.48], shape: "flat", font: "Courier Prime", size: 36, lineHeight: 48, x: 60, y: 160, ink: [25, 20, 18], typewriter: !0 },
  kraft: { name: "Kraft paper parcel", w: 0.76, h: 1, color: [0.78, 0.65, 0.48], shape: "flat", font: "Courier Prime", size: 36, lineHeight: 48, x: 60, y: 160, ink: [25, 20, 18], typewriter: !0 },
  parchment: { name: "Ancient parchment", w: 0.82, h: 1.12, color: [0.91, 0.828, 0.655], shape: "roll", font: "Caveat", size: 50, lineHeight: 54, x: 90, y: 180, ink: [55, 35, 20], hand: !0 },
  ledger: { name: "Accounting ledger", w: 0.96, h: 0.76, color: [0.9, 0.95, 0.91], shape: "half", font: "Caveat", size: 40, lineHeight: 46, x: 80, y: 140, ink: [20, 35, 75], hand: !0 },
  carbon: { name: "Carbon duplicate copy", w: 0.84, h: 1.1, color: [0.2, 0.19, 0.25], shape: "quarters", font: "Special Elite", size: 38, lineHeight: 52, x: 80, y: 180, ink: [150, 160, 255], typewriter: !0 }
}, $t = { ball: "Crumpled ball", flat: "Flattened crumple", quarters: "Folded in quarters", half: "Folded in half", thirds: "Folded in thirds (letter)", roll: "Rolled up", twist: "Twisted (candy wrapper)", accordion: "Accordion fold", triangle: "Triangle fold" }, ct = { torn: "Torn", burnt: "Burnt", coffee: "Coffee stain", water: "Water stain", prints: "Dirty fingerprints", aged: "Aged", scribbled: "Scribbled", singed: "Singed", wine: "Wine stain", ink: "Ink blot", foxing: "Foxing", tape: "Tape", stamp: "Rubber stamp", faded: "Sun-faded", staple: "Metal staple", grease: "Grease stain", dogear: "Dog-eared corner", damp: "Damp wrinkled relief", creased: "Pocket-creased grid" }, yn = ["corner", "edge", "center", "spots"], jt = {
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
  blueprint: `# PROJECT AQUILA \xB7 TECHNICAL SPECIFICATION
SECTOR: 07-B \xB7 ELEVATION 420M
SCALE: 1:50 \xB7 ALL TOLERANCES +/- 0.05MM

SYSTEM: HYDRAULIC PRESSURE VALVE
STATUS: VERIFIED AND APPROVED FOR FIELD ASSEMBLY
ENGINEERING SIGN-OFF: ENG. MORGAN`,
  postcard: `Greetings from the coast!

The sea breeze has been gentle and the days quiet.
Found this old viewpoint overlooking the rocky lighthouse.
Wish you were here.

\u2014 Elena`,
  punchcard: `00100  IDENTIFICATION DIVISION.
00200  PROGRAM-ID. CRUMPLE-SYSTEM.
00300  ENVIRONMENT DIVISION.
00400  DATA DIVISION.
00500  PROCEDURE DIVISION.
00600  DISPLAY "IBM 7094 READY".
00700  STOP RUN.`,
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
  ledger: `# ACCOUNTS JOURNAL \xB7 OCT 1928
TRANS 01: STEAMSHIP CARGO FREIGHT ..... CR  1,420.00
TRANS 02: HARBOR DOCKAGE DUES ......... DR    115.50
TRANS 03: BUNKER COAL REFUELING ....... DR    480.00
BALANCE CARRIED FORWARD ............... CR    824.50`,
  carbon: `# DUPLICATE VOUCHER \xB7 SECOND COPY
TRANSACTION REF: CB-804192
RETAIN FOR AUDIT VERIFICATION

CUSTOMER DUPLICATE RECEIPT
ALL CLAIMS VOID WITHOUT VOUCHER PRESENTED
SIGNATURE: ____________________`
}, vn = `A. Reader
12 Paper Lane
Foldtown`, xt = ["never", "again", "always", "not yet", "once more", "still"], pt = {};
function En(e, n) {
  if (ke[e]) throw new Error(`Paper type "${e}" already exists`);
  ke[e] = n;
}
function Tn(e, n) {
  if (ct[e]) throw new Error(`Wear state "${e}" already exists`);
  ct[e] = n.name, n.apply && (pt[e] = n.apply);
}
var ft = (e, n) => Object.prototype.hasOwnProperty.call(e, n);
function We(e = {}) {
  let n = ft(ke, e.type) ? e.type : "typed", t = ke[n], s = {
    id: e.id || n,
    type: n,
    shape: n === "envelope" ? "envelope" : ft($t, e.shape) ? e.shape : t.shape,
    states: (Array.isArray(e.states) ? e.states : []).filter((o) => ft(ct, o)),
    text: typeof e.text == "string" ? e.text : jt[n] || "",
    back: typeof e.back == "string" ? e.back : "",
    seed: Number.isFinite(e.seed) ? Math.trunc(e.seed) : 7,
    // 0 is a valid seed (rng starts from 1 either way)
    open: e.open === "drag" ? "drag" : "auto",
    hiddenInk: typeof e.hiddenInk == "string" ? e.hiddenInk : "",
    burnAfterReading: !!e.burnAfterReading,
    burn: yn.includes(e.burn) ? e.burn : "corner",
    image: e.image || "",
    address: typeof e.address == "string" ? e.address : vn,
    letter: ft(ke, e.letter) && e.letter !== "envelope" ? e.letter : "typed",
    // the word of the 'stamp' state (drawn in capitals)
    stamp: typeof e.stamp == "string" && e.stamp.trim() ? e.stamp.trim() : "RECEIVED"
  };
  return e.rich && typeof e.rich == "object" && (s.rich = e.rich), s;
}

// .build/fields.js
function dt(e, n, t) {
  let s = Q(e.seed), o = () => s() < 0.5 ? -1 : 1, r = e.w / 2, a = e.h / 2, l = new Float32Array(n * t), f = n / e.w, u = t / e.h, c = (y, w, i, M, C, N) => {
    N === void 0 && (N = s() * Math.PI), M === void 0 && (M = (s() * 2 - 1) * r, C = (s() * 2 - 1) * a);
    let F = Math.cos(N), z = Math.sin(N), ae = Math.abs(F) * y + w, ne = Math.abs(z) * y + w, k = Math.max(0, Math.floor((M - ae + r) * f)), D = Math.min(n - 1, Math.ceil((M + ae + r) * f)), G = Math.max(0, Math.floor((C - ne + a) * u)), J = Math.min(t - 1, Math.ceil((C + ne + a) * u)), oe = Math.min(0.08, y);
    for (let me = G; me <= J; me++) {
      let Ae = (me + 0.5) / u - a - C;
      for (let be = k; be <= D; be++) {
        let H = (be + 0.5) / f - r - M, Re = Math.abs(-H * z + Ae * F);
        if (Re >= w) continue;
        let Fe = Math.abs(H * F + Ae * z);
        Fe >= y || (l[me * n + be] += i * (1 - Re / w) * Math.min(1, (y - Fe) / oe));
      }
    }
  }, d = e.shape === "quarters" || e.shape === "half" || e.shape === "thirds" || e.shape === "accordion" || e.shape === "triangle", g = d ? 0.18 : e.shape === "roll" ? 0.45 : e.shape === "twist" ? 0.55 : 1, h = d ? 0.35 : e.shape === "roll" || e.shape === "twist" ? 0.6 : 1;
  e.card && (g *= 0.5, h *= 0.5), e.shape === "envelope" && (g = 0.08, h = 0.25);
  let E = e.w * e.h / (0.84 * 1.1);
  for (let y = 0; y < Math.round(8 * g * E); y++) c(2, 0.08 + s() * 0.1, o() * (0.8 + s() * 0.4) * h);
  for (let y = 0; y < Math.round(46 * g * E); y++) c(0.1 + s() * 0.28, 0.035 + s() * 0.05, o() * (0.45 + s() * 0.4) * h);
  for (let y = 0; y < Math.round(150 * g * E); y++) c(0.03 + s() * 0.1, 0.01 + s() * 0.025, o() * (0.2 + s() * 0.35) * h);
  if (e.shape === "twist")
    for (let y of [-1, 1]) for (let w = 0; w < 26; w++) c(0.12 + s() * 0.3, 0.012 + s() * 0.02, o() * (0.5 + s() * 0.5), y * r * (0.6 + s() * 0.36), (s() * 2 - 1) * a, Math.PI / 2 + y * (0.5 + s() * 0.35));
  if ((e.shape === "half" || e.shape === "quarters") && c(2, 0.022, 0.6, 0, 0, Math.PI / 2), e.shape === "quarters" && c(2, 0.022, -0.55, 0, 0, 0), e.shape === "thirds" && (c(2, 0.02, 0.55, 0, -e.h / 6 * 1.08, 0), c(2, 0.02, -0.55, 0, e.h / 6, 0)), e.shape === "accordion") {
    let y = e.w / 6;
    c(2, 0.02, 0.55, -y, 0, Math.PI / 2), c(2, 0.02, -0.55, 0, 0, Math.PI / 2), c(2, 0.02, 0.55, y, 0, Math.PI / 2);
  }
  e.shape === "triangle" && (c(2, 0.022, 0.6, 0, 0, Math.PI / 4), c(2, 0.022, -0.55, 0, 0, -Math.PI / 4)), e.shape === "envelope" && c(2, 0.02, 0.5, 0, e.foldY, 0);
  let m = Array.isArray(e.states) ? e.states : [];
  if (m.includes("creased"))
    for (let y = 0; y < 90; y++) c(0.04 + s() * 0.12, 8e-3 + s() * 0.015, o() * (0.3 + s() * 0.35));
  if (m.includes("damp")) {
    let y = xe(e.seed * 3 + 17);
    for (let w = 0; w < t; w++) {
      let i = (w + 0.5) / u - a;
      for (let M = 0; M < n; M++) {
        let C = (M + 0.5) / f - r;
        l[w * n + M] += Math.sin((C * 2.2 + i) * 18) * 0.18 + (y(C * 8, i * 8) - 0.5) * 0.22;
      }
    }
  }
  let b = 1e-6;
  for (let y = 0; y < l.length; y++) Math.abs(l[y]) > b && (b = Math.abs(l[y]));
  for (let y = 0; y < l.length; y++) l[y] /= b;
  return l;
}
function ht(e, n, t) {
  let s = xe(e.seed * 7 + 11), o = Q(e.seed * 5 + 3), r = Math.hypot(n, t), a = new Float32Array(n * t), l = (u) => {
    for (let c = 0; c < t; c++) for (let d = 0; d < n; d++) a[c * n + d] = u(d, c);
  }, f = e.form || "corner";
  if (f === "edge") {
    let u = Math.floor(o() * 3);
    l((c, d) => (u === 0 ? t - d : u === 1 ? c : n - c) / (r * 1.6) + (s(c * 0.05, d * 0.05) - 0.5) * 0.35);
  } else if (f === "center") {
    let u = n * (0.3 + 0.4 * o()), c = t * (0.3 + 0.4 * o());
    l((d, g) => Math.hypot(d - u, g - c) / (r * 0.7) + (s(d * 0.04, g * 0.04) - 0.5) * 0.3);
  } else if (f === "spots") {
    let u = 3 + Math.floor(o() * 4), c = [];
    for (let d = 0; d < 200 && c.length < u; d++) {
      let g = n * (0.12 + 0.76 * o()), h = t * (0.12 + 0.76 * o());
      c.every((E) => Math.hypot(E[0] - g, E[1] - h) > r * 0.2) && c.push([g, h]);
    }
    l((d, g) => {
      let h = 1 / 0;
      return c.forEach((E) => {
        h = Math.min(h, Math.hypot(d - E[0], g - E[1]));
      }), h / (r * 0.5) + (s(d * 0.05, g * 0.05) - 0.5) * 0.1;
    });
  } else if (f === "singed")
    l((u, c) => Math.min(u, n - 1 - u, c, t - 1 - c) / (r * 0.5) + (s(u * 0.03, c * 0.03) - 0.5) * 0.12);
  else {
    let u = e.seed % 4, c = u & 1 ? n : 0, d = u & 2 ? t : 0;
    l((g, h) => Math.sqrt((g - c) * (g - c) + (h - d) * (h - d)) / r + (s(g * 0.02, h * 0.02) - 0.5) * 0.32);
  }
  return a;
}

// .build/worker.js
var mt = /* @__PURE__ */ (() => {
  let e, n = 0, t = /* @__PURE__ */ new Map();
  function s() {
    try {
      let r = [Q, xe, dt, ht].map((a) => a.toString()).join(`
`) + `
onmessage = (e) => { const { id, name, args } = e.data; const r = name === 'creases' ? ${dt.name}(...args) : ${ht.name}(...args); postMessage({ id, r }, [r.buffer]); };`;
      e = new Worker(URL.createObjectURL(new Blob([r], { type: "text/javascript" }))), e.onmessage = (a) => {
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
  let o = (r, a) => r === "creases" ? dt(...a) : ht(...a);
  return {
    run(r, a) {
      if (e === void 0 && s(), !e) return Promise.resolve(o(r, a));
      let l = ++n, f = new Promise((c) => {
        let d = (g) => c(g);
        d.redo = () => c(o(r, a)), t.set(l, d);
      });
      e.postMessage({ id: l, name: r, args: a });
      let u = t.get(l);
      return u.t = setTimeout(() => {
        t.delete(l) && u.redo();
      }, 2e4), f;
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
var Sn = (e, n, t) => `${n && !e.hand ? "bold " : ""}${Math.round(t)}px "${e.font}", "Courier Prime", monospace`, Mn = (e) => [e[0] + (200 - e[0]) * 0.4 + 8, e[1] + (170 - e[1]) * 0.3 + 4, e[2] + (120 - e[2]) * 0.3 - 4].map(Math.round);
function Rn(e, n, t, s, o, r, a) {
  let l = wn(s), f = n.states.includes("faded") ? Mn(t.ink) : t.ink;
  if (n.states.includes("scribbled") && !l.some((b) => b.toks.some((y) => y.kind === "strike"))) {
    let b = [];
    l.forEach((y) => y.toks.forEach((w) => {
      w.kind === "w" && w.t.replace(/\W/g, "").length >= 4 && b.push(w);
    }));
    for (let y = 0; y < 2 && b.length; y++) {
      let w = b.splice(Math.floor(a() * b.length), 1)[0];
      w.kind = "strike", w.fix = xt[Math.floor(a() * xt.length)];
    }
  }
  let u = j(1 - r * 0.34), c = o.cols || 1, d = (o.w - (c - 1) * 40) / c, g = 0, h = o.y, E = o.y + o.h, m = xe(n.seed + 5);
  return l.forEach((b) => {
    let y = b.head ? t.size * (o.headK || 1.35) : t.size, w = b.head ? t.lineHeight * (o.headK || 1.35) : t.lineHeight;
    e.font = Sn(t, b.head, y);
    let i = e.measureText(" ").width, M = b.head && o.headFull ? o.w : d, C = [[]], N = 0;
    if (b.toks.forEach((F) => {
      let z = e.measureText(F.t).width;
      N > 0 && N + i + z > M && (C.push([]), N = 0), C[C.length - 1].push({ ...F, tw: z }), N += (N > 0 ? i : 0) + z;
    }), !b.toks.length) {
      h += w * 0.7;
      return;
    }
    C.forEach((F) => {
      h > E && g < c - 1 && !(b.head && o.headFull) && (g++, h = o.colY || o.y);
      let z = F.reduce((k, D) => k + D.tw, 0) + i * (F.length - 1), ae = o.x + (b.head && o.headFull ? 0 : g * (d + 40)), ne = o.center || b.head && o.centerHead ? ae + (M - z) / 2 : ae;
      F.forEach((k) => {
        Pn(e, t, k, ne, h, f, a, m), k.kind === "strike" && kn(e, k, ne, h, y, a), k.kind === "redact" && (e.fillStyle = `rgba(12,12,14,${u})`, e.fillRect(ne - 5, h - y * 0.82, k.tw + 10, y * 1.06)), ne += k.tw + i;
      }), h += w;
    }), b.head && o.headFull && (o.colY = h + 10);
  }), h;
}
function Pn(e, n, t, s, o, r, a, l) {
  if (n.hand) {
    e.save(), e.translate(s, o + (a() - 0.5) * 3), e.rotate((a() - 0.5) * 0.04), e.fillStyle = ie(r, 0.9), e.fillText(t.t, 0, 0), e.restore();
    return;
  }
  if (n.typewriter) {
    let f = s;
    for (let u of t.t) {
      let c = 0.72 + a() * 0.28;
      n.fades && (c *= 0.35 + 0.65 * l(f * 6e-3, o * 4e-3)), e.fillStyle = ie(r, c), e.fillText(u, f, o + (a() - 0.5) * 2), f += e.measureText(u).width;
    }
    return;
  }
  e.fillStyle = ie(r, 0.92), e.fillText(t.t, s, o);
}
function kn(e, n, t, s, o, r) {
  e.save(), e.strokeStyle = "rgba(165,28,30,0.85)", e.lineWidth = Math.max(2.5, o * 0.08), e.lineCap = "round";
  for (let a = 0; a < 2; a++) {
    e.beginPath();
    let l = s - o * (0.3 + 0.08 * a);
    e.moveTo(t - 4, l + (r() - 0.5) * 4), e.quadraticCurveTo(t + n.tw / 2, l + (r() - 0.5) * 8, t + n.tw + 4, l + (r() - 0.5) * 4), e.stroke();
  }
  n.fix && (e.fillStyle = "rgba(165,28,30,0.9)", e.font = `${Math.round(o * 0.62)}px "Caveat", cursive`, e.translate(t + n.tw * 0.25, s - o * 0.66), e.rotate(-0.06), e.fillText(n.fix, 0, 0)), e.restore();
}
function Jt(e, n, t, s, o, r, a = 6) {
  let l = Math.ceil(o / a), f = Math.ceil(r / a), u = ye(l, f, !0), c = u.getContext("2d"), d = Math.max(l / n.width, f / n.height);
  c.drawImage(n, (l - n.width * d) / 2, (f - n.height * d) / 2, n.width * d, n.height * d);
  let g = c.getImageData(0, 0, l, f).data;
  e.fillStyle = "rgba(20,20,20,0.88)";
  for (let h = 0; h < f; h++) for (let E = 0; E < l; E++) {
    let m = (h * l + E) * 4, b = (g[m] * 0.3 + g[m + 1] * 0.59 + g[m + 2] * 0.11) / 255, y = a * 0.56 * Math.sqrt(1 - b);
    y > 0.35 && (e.beginPath(), e.arc(t + (E + 0.5) * a, s + (h + 0.5) * a, y, 0, Math.PI * 2), e.fill());
  }
}
function An(e, n, t) {
  let s = [], o = "";
  return n.split(" ").forEach((r) => {
    let a = o ? o + " " + r : r;
    e.measureText(a).width > t && o ? (s.push(o), o = r) : o = a;
  }), o && s.push(o), s;
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
    e.strokeStyle = ie(s.ink, 0.7), e.lineWidth = 3, e.strokeRect(22, 22, n - 44, t - 44), e.lineWidth = 1.2, e.strokeRect(32, 32, n - 64, t - 64), e.setLineDash([3, 7]), e.lineWidth = 3, e.strokeStyle = ie(s.ink, 0.55), e.beginPath(), e.moveTo(o, 22), e.lineTo(o, t - 22), e.stroke(), e.setLineDash([]), e.save(), e.translate(o + (n - o) / 2, t / 2), e.rotate(-Math.PI / 2), e.fillStyle = ie(s.ink, 0.85), e.textAlign = "center", e.font = `bold 26px "${s.font}"`, e.fillText("No. 0042", 0, -46), e.font = `40px "${s.font}"`, e.fillText("C \xB7 12", 0, 2), e.font = `22px "${s.font}"`, e.fillText("ROW \xB7 SEAT", 0, 36), e.font = `italic 17px "${s.font}"`, e.fillText("non-refundable", 0, 64), e.restore();
  },
  memo(e, n) {
    e.fillStyle = "rgba(22,22,26,0.92)", e.beginPath(), e.arc(130, 120, 34, 0, Math.PI * 2), e.fill(), e.fillStyle = "rgba(245,244,240,1)", e.beginPath(), e.moveTo(130, 96), e.lineTo(154, 136), e.lineTo(106, 136), e.closePath(), e.fill(), e.fillStyle = "rgba(22,22,26,0.92)", e.font = 'bold 54px "Courier Prime"', e.fillText("MEMORANDUM", 184, 128), e.font = '22px "Courier Prime"', e.fillText("Research division \xB7 internal use", 186, 160), e.fillRect(96, 196, n - 192, 3), e.save(), e.translate(n - 250, 270), e.rotate(-0.12), e.strokeStyle = "rgba(175,30,30,0.7)", e.lineWidth = 4, e.strokeRect(-12, -44, 268, 60), e.fillStyle = "rgba(175,30,30,0.7)", e.font = 'bold 36px "Courier Prime"', e.fillText("CONFIDENTIAL", 0, 0), e.restore();
  },
  newspaper(e, n, t, s, o, r) {
    e.fillStyle = "rgba(25,25,25,0.9)", e.font = 'bold 50px "Libre Baskerville"', e.textAlign = "center", e.fillText("THE FOLDTOWN HERALD", n / 2, 92), e.font = 'italic 20px "Libre Baskerville"', e.fillText("evening edition \xB7 friday", n / 2, 126), e.textAlign = "left", e.fillRect(40, 140, n - 80, 3), e.fillRect(40, 147, n - 80, 1), e.fillRect(n / 2 - 1, 330, 1, t - 380);
    let a = n / 2 + 20, l = 336, f = n / 2 - 60, u = 230;
    if (e.fillStyle = "rgba(40,40,40,0.12)", e.fillRect(a, l, f, u), r.photo) Jt(e, r.photo, a, l, f, u);
    else
      for (let c = l + 4; c < l + u; c += 7) for (let d = a + 4; d < a + f; d += 7) {
        let g = 0.5 + 0.5 * Math.sin(d * 0.02) * Math.cos(c * 0.025);
        e.fillStyle = `rgba(20,20,20,${0.55 * g})`, e.beginPath(), e.arc(d, c, 1.2 + 2 * g, 0, Math.PI * 2), e.fill();
      }
    e.fillStyle = "rgba(25,25,25,0.85)", e.font = 'italic 17px "Libre Baskerville"', e.fillText("The harbor at dusk, yesterday.", a, l + u + 24);
  },
  sticky(e, n) {
    let t = e.createLinearGradient(0, 0, 0, 70);
    t.addColorStop(0, "rgba(170,130,20,0.18)"), t.addColorStop(1, "rgba(170,130,20,0)"), e.fillStyle = t, e.fillRect(0, 0, n, 70);
  },
  polaroid(e, n, t, s, o, r) {
    let a = Math.round(n * 0.065), l = n - 2 * a;
    if (e.fillStyle = "#1a1714", e.fillRect(a, a, l, l), r.img) {
      let f = r.img.width, u = r.img.height, c = Math.max(l / f, l / u);
      e.save(), e.beginPath(), e.rect(a, a, l, l), e.clip(), e.filter = "saturate(0.8) contrast(0.92) brightness(1.05)", e.drawImage(r.img, a + (l - f * c) / 2, a + (l - u * c) / 2, f * c, u * c), e.filter = "none", e.fillStyle = "rgba(255,200,140,0.10)", e.fillRect(a, a, l, l);
      let d = e.createRadialGradient(a + l / 2, a + l / 2, l * 0.25, a + l / 2, a + l / 2, l * 0.75);
      d.addColorStop(0, "rgba(0,0,0,0)"), d.addColorStop(1, "rgba(0,0,0,0.45)"), e.fillStyle = d, e.fillRect(a, a, l, l), e.restore();
    }
    e.strokeStyle = "rgba(0,0,0,0.25)", e.lineWidth = 2, e.strokeRect(a, a, l, l);
  },
  envelope(e, n, t, s) {
    let o = Math.round(s.flap / s.h * t), r = o + (t - o) * 0.48;
    e.strokeStyle = "rgba(110,85,50,0.35)", e.lineWidth = 2.2, e.beginPath(), e.moveTo(0, t), e.lineTo(n / 2, r), e.lineTo(n, t), e.stroke(), e.beginPath(), e.moveTo(0, o), e.lineTo(n * 0.42, r - 8), e.moveTo(n, o), e.lineTo(n * 0.58, r - 8), e.stroke(), e.save(), e.beginPath(), e.moveTo(0, o), e.lineTo(n / 2, 6), e.lineTo(n, o), e.closePath(), e.clip(), e.strokeStyle = "rgba(70,85,120,0.22)", e.lineWidth = 3;
    for (let a = -t; a < n + t; a += 14)
      e.beginPath(), e.moveTo(a, 0), e.lineTo(a + o, o), e.stroke();
    e.restore();
  },
  blueprint(e, n, t) {
    e.strokeStyle = "rgba(70, 180, 255, 0.16)", e.lineWidth = 1;
    for (let l = 0; l < n; l += 20)
      e.beginPath(), e.moveTo(l, 0), e.lineTo(l, t), e.stroke();
    for (let l = 0; l < t; l += 20)
      e.beginPath(), e.moveTo(0, l), e.lineTo(n, l), e.stroke();
    e.strokeStyle = "rgba(120, 220, 255, 0.35)", e.lineWidth = 1.5;
    for (let l = 0; l < n; l += 100)
      e.beginPath(), e.moveTo(l, 0), e.lineTo(l, t), e.stroke();
    for (let l = 0; l < t; l += 100)
      e.beginPath(), e.moveTo(0, l), e.lineTo(n, l), e.stroke();
    e.strokeStyle = "rgba(160, 230, 255, 0.6)", e.lineWidth = 3, e.strokeRect(30, 30, n - 60, t - 60), e.lineWidth = 1, e.strokeRect(36, 36, n - 72, t - 72);
    let s = 280, o = 90, r = n - 36 - s, a = t - 36 - o;
    e.fillStyle = "rgba(10, 35, 60, 0.85)", e.fillRect(r, a, s, o), e.strokeStyle = "rgba(160, 230, 255, 0.6)", e.strokeRect(r, a, s, o), e.fillStyle = "rgba(200, 240, 255, 0.9)", e.font = 'bold 16px "Courier Prime", monospace', e.fillText("AQUILA ENGINEERING", r + 14, a + 26), e.font = '12px "Courier Prime", monospace', e.fillText("DWG NO: 9042-B | SHT 1 OF 1", r + 14, a + 52), e.fillText("APPROVED FOR RELEASE", r + 14, a + 74);
  },
  postcard(e, n, t) {
    e.strokeStyle = "rgba(180, 160, 130, 0.4)", e.lineWidth = 2, e.strokeRect(24, 24, n - 48, t - 48);
  },
  punchcard(e, n, t) {
    e.strokeStyle = "rgba(120, 100, 80, 0.25)", e.lineWidth = 1, e.fillStyle = "rgba(100, 90, 80, 0.7)", e.font = '9px "VT323", monospace';
    for (let s = 1; s <= 80; s += 2) {
      let o = 30 + (s - 1) * ((n - 60) / 79);
      e.fillText(String(s % 10), o, 24), e.fillText(String(s % 10), o, t - 14);
    }
  },
  shipping(e, n, t) {
    e.strokeStyle = "rgba(70, 50, 30, 0.35)", e.lineWidth = 2, e.strokeRect(30, 30, n - 60, t - 60);
    let s = t - 180, o = n - 140, r = 70;
    e.fillStyle = "#1c1612";
    for (let a = r; a < r + o; ) {
      let l = 2 + a * 17 % 7, f = 3 + a * 31 % 6;
      e.fillRect(a, s, l, 70), a += l + f;
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
    e.strokeStyle = "rgba(130, 180, 150, 0.4)", e.lineWidth = 1;
    for (let r = 160; r < t - 40; r += 42)
      e.beginPath(), e.moveTo(30, r), e.lineTo(n - 30, r), e.stroke();
    e.strokeStyle = "rgba(215, 65, 65, 0.55)", e.lineWidth = 1.5, e.beginPath(), e.moveTo(96, 30), e.lineTo(96, t - 30), e.stroke(), e.beginPath(), e.moveTo(102, 30), e.lineTo(102, t - 30), e.stroke(), e.strokeStyle = "rgba(70, 100, 170, 0.5)", e.lineWidth = 1.5;
    let s = n - 280, o = n - 140;
    e.beginPath(), e.moveTo(s, 80), e.lineTo(s, t - 30), e.stroke(), e.beginPath(), e.moveTo(s + 4, 80), e.lineTo(s + 4, t - 30), e.stroke(), e.beginPath(), e.moveTo(o, 80), e.lineTo(o, t - 30), e.stroke(), e.beginPath(), e.moveTo(o + 4, 80), e.lineTo(o + 4, t - 30), e.stroke(), e.fillStyle = "rgba(40, 70, 120, 0.85)", e.font = 'bold 15px "Courier Prime", monospace', e.fillText("DEBIT", s - 70, 130), e.fillText("CREDIT", o - 70, 130);
  },
  carbon(e, n, t) {
    e.strokeStyle = "rgba(150, 160, 255, 0.45)", e.lineWidth = 2, e.strokeRect(30, 30, n - 60, t - 60), e.fillStyle = "rgba(160, 170, 255, 0.7)", e.font = 'bold 16px "Courier Prime", monospace', e.fillText("DUPLICATE \xB7 DO NOT DESTROY", 50, 60);
  }
};
function In(e, n, t, s, o) {
  e.strokeStyle = "rgba(100, 90, 75, 0.4)", e.lineWidth = 2, e.beginPath(), e.moveTo(n / 2, 40), e.lineTo(n / 2, t - 40), e.stroke();
  let r = n - 140, a = 50;
  e.strokeStyle = "rgba(100, 90, 75, 0.5)", e.lineWidth = 1.5, e.setLineDash([4, 4]), e.strokeRect(r, a, 90, 110), e.setLineDash([]), e.fillStyle = "rgba(120, 100, 80, 0.5)", e.font = '12px "Courier Prime", monospace', e.textAlign = "center", e.fillText("AFFIX", r + 45, a + 50), e.fillText("STAMP", r + 45, a + 68), e.strokeStyle = "rgba(40, 50, 80, 0.55)", e.lineWidth = 2, e.beginPath(), e.arc(r - 30, a + 60, 44, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(40, 50, 80, 0.6)", e.font = 'bold 13px "Courier Prime", monospace', e.fillText("POST", r - 30, a + 64), e.textAlign = "left", e.strokeStyle = "rgba(120, 110, 95, 0.4)", e.lineWidth = 1.5;
  for (let l = t * 0.45; l < t - 60; l += 44)
    e.beginPath(), e.moveTo(n / 2 + 40, l), e.lineTo(n - 40, l), e.stroke();
}
function Cn(e, n, t, s, o, r) {
  let a = Math.round(s.flap / s.h * t);
  e.save(), e.translate(n / 2, a * 0.36), e.fillStyle = "rgba(140,20,24,0.95)", e.beginPath();
  for (let u = 0; u <= Math.PI * 2 + 0.01; u += 0.2) {
    let c = 46 * (1 + 0.06 * Math.sin(u * 7 + r() * 0.3));
    u ? e.lineTo(Math.cos(u) * c, Math.sin(u) * c) : e.moveTo(c, 0);
  }
  e.fill(), e.strokeStyle = "rgba(90,10,14,0.8)", e.lineWidth = 3, e.beginPath(), e.arc(0, 0, 30, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(80,8,12,0.9)", e.font = 'bold 30px "Special Elite"', e.textAlign = "center", e.fillText("A", 0, 11), e.restore();
  let l = n - 180, f = a + 40;
  e.fillStyle = "rgba(70,105,140,0.85)", e.fillRect(l, f, 120, 140), e.strokeStyle = "rgba(255,255,255,0.8)", e.setLineDash([4, 4]), e.lineWidth = 3, e.strokeRect(l + 6, f + 6, 108, 128), e.setLineDash([]), e.fillStyle = "rgba(255,255,255,0.9)", e.font = 'bold 44px "Special Elite"', e.textAlign = "center", e.fillText("25", l + 60, f + 88), e.strokeStyle = "rgba(40,40,60,0.55)", e.lineWidth = 3, e.beginPath(), e.arc(l - 30, f + 90, 58, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(40,40,60,0.6)", e.font = '20px "Courier Prime"', e.fillText("POST", l - 30, f + 98);
  for (let u = 0; u < 4; u++)
    e.beginPath(), e.moveTo(l - 120, f + 60 + u * 18), e.bezierCurveTo(l - 60, f + 50 + u * 18, l, f + 70 + u * 18, l + 60, f + 60 + u * 18), e.stroke();
  e.textAlign = "left", e.font = '52px "Caveat"', e.fillStyle = ie(s.ink, 0.9), o.address.split(`
`).forEach((u, c) => e.fillText(u, 150, a + 330 + c * 62));
}
var Fn = [
  ["FOR RENT", "quiet room near the park, morning light. Ask at the front desk."],
  ["FOR SALE", "vintage typewriter, works fine, missing the letter Q."],
  ["WANTED", "night watchman for the old warehouse on the pier."],
  ["FOUND", "small brass key with a red tag. Claim at the bakery."],
  ["LOST", "grey cat, answers to Pixel. Reward offered."],
  ["REPAIRS", "radios and record players, evenings only."],
  ["SWAP", "bicycle bell for anything that does not squeak."]
];
function Ln(e, n, t, s) {
  let a = (n - 88 - 26) / 2;
  e.fillStyle = "rgba(25,25,25,0.9)", e.font = 'bold 34px "Libre Baskerville"', e.fillText("CLASSIFIEDS", 44, 92), e.fillRect(40, 108, n - 88 + 8, 3);
  let l = 44 + a + 26, f = 132, u = Math.round(a * 0.68);
  s.photo && Jt(e, s.photo, l, f, a, u), e.font = 'italic 16px "Libre Baskerville"', e.fillText("Old town, archive photo.", l, f + u + 22);
  let c = t - 60, d = [150, f + u + 60], g = 0, h = 44, E = d[0];
  for (let [m, b] of Fn) {
    e.font = '18px "Libre Baskerville"';
    let y = An(e, m + " " + b, a);
    if (E + y.length * 24 > c && (g === 1 || (g = 1, h = l, E = d[1], E + y.length * 24 > c)))
      break;
    y.forEach((w, i) => {
      if (i === 0) {
        e.font = 'bold 19px "Libre Baskerville"', e.fillText(m, h, E);
        let M = e.measureText(m + " ").width;
        e.font = '18px "Libre Baskerville"', e.fillText(w.slice(m.length + 1), h + M, E);
      } else
        e.font = '18px "Libre Baskerville"', e.fillText(w, h, E);
      E += 24;
    }), E += 16;
  }
}
var Kt = {
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
  blueprint: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 120 }),
  postcard: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 80 }),
  punchcard: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 60 }),
  shipping: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 180 }),
  kraft: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 180 }),
  parchment: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 160, centerHead: !0 }),
  ledger: (e, n, t) => ({ x: 120, y: t.y, w: e - 260, h: n - t.y - 60 }),
  carbon: (e, n, t) => ({ x: t.x, y: t.y, w: e - t.x * 2, h: n - t.y - 80 })
};
async function xn(e, n, t, s = "") {
  if (typeof Blob > "u" || typeof URL > "u" || !URL.createObjectURL) return null;
  let o = `<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${t}">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;box-sizing:border-box;margin:0;padding:0;overflow:hidden;${s}">
        ${e}
      </div>
    </foreignObject>
  </svg>`, r = new Blob([o], { type: "image/svg+xml;charset=utf-8" }), a = URL.createObjectURL(r), l = new Image();
  return new Promise((f) => {
    l.onload = () => {
      URL.revokeObjectURL(a), f(l);
    }, l.onerror = () => {
      URL.revokeObjectURL(a), f(null);
    }, l.src = a;
  });
}
async function Ze(e, n, t, s) {
  let o = Math.round(n.w * bt), r = Math.round(n.h * bt), a = ye(o, r), l = a.getContext("2d"), f = t === "front", u = Q(e.seed * 31 + (f ? 5 : 9)), c = {};
  n.photo && f && (c.img = await ut(e.image || Le.assets + "photos/sunset.webp")), e.type === "newspaper" && (f || !e.back) && (c.photo = await ut(Le.assets + "photos/" + (f ? "sea" : "city") + ".webp"));
  let d = e.type === "notebook" || e.type === "form" || e.type === "blueprint" || e.type === "ledger";
  gt[e.type] && (f || d) && gt[e.type](l, o, r, n, e, c), e.type === "envelope" && !f && Cn(l, o, r, n, e, u), e.type === "postcard" && !f && !e.back && In(l, o, r, e, u), e.type === "newspaper" && !f && !e.back && Ln(l, o, r, c);
  let g = e.type === "envelope" ? "" : f ? e.text : e.back, h = f ? Kt[e.type] ? Kt[e.type](o, r, n) : { x: 50, y: 50, w: o - 100, h: r - 100 } : { x: Math.round(n.x * 0.8), y: Math.min(n.y, Math.round(r * 0.28)), w: o - Math.round(n.x * 1.6), h: r - Math.min(n.y, Math.round(r * 0.28)) - 40, center: e.type === "ticket" };
  e.type === "ticket" && !f && (h.x = Math.round(o * 0.55), h.w = Math.round(o * 0.4)), e.type === "postcard" && !f && (h.x = Math.round(o * 0.54), h.w = Math.round(o * 0.42)), e.type === "polaroid" && !f && (h = { x: 60, y: Math.round(r * 0.3), w: o - 120, h: r * 0.6, center: !0 });
  let E = g && h ? Rn(l, e, n, g, h, s, u) : 0;
  if (f && e.rich && h) {
    if (e.rich.mode === "canvas" && typeof e.rich.body == "function")
      try {
        await e.rich.body(l, h, o, r);
      } catch {
      }
    else if (typeof e.rich.body == "string")
      try {
        let b = await xn(e.rich.body, h.w, h.h, e.rich.style || "");
        b && l.drawImage(b, h.x, h.y);
      } catch {
      }
  }
  let m = Q(e.seed * 17 + (f ? 1 : 2));
  e.states.includes("coffee") && await Nn(a, l, o, r, e, f), e.states.includes("water") && await On(l, o, r, e, f), e.states.includes("prints") && await Dn(l, o, r, e, f), e.states.includes("wine") && await _n(a, l, o, r, e, f), e.states.includes("ink") && zn(l, o, r, e, f), e.states.includes("aged") && Un(l, o, r, m), e.states.includes("faded") && Gn(l, o, r, e), e.states.includes("foxing") && Xn(l, o, r, e), e.states.includes("staple") && Hn(l, o, r, e, f), e.states.includes("grease") && Vn(l, o, r, e, f), e.states.includes("dogear") && $n(l, o, r, e, f), e.states.includes("damp") && jn(l, o, r, e), e.states.includes("creased") && Kn(l, o, r, e);
  for (let b of e.states)
    if (pt[b])
      try {
        await pt[b](l, a, o, r, e, f, m);
      } catch {
      }
  return f && e.states.includes("stamp") && Yn(l, o, r, e, E), f && e.states.includes("tape") && qn(l, o, r, e), a;
}
function Dt(e, n, t, s, o, r, a, l) {
  e.save(), e.globalCompositeOperation = "multiply", e.globalAlpha = a, e.translate(t, s), l || e.scale(-1, 1), e.rotate(r), e.drawImage(n, -o / 2, -o / 2, o, o), e.restore();
}
async function On(e, n, t, s, o) {
  let r = await Ge("water");
  if (!r) return;
  let a = Q(s.seed * 23 + 4), l = n * (0.25 + 0.5 * a()), f = t * (0.25 + 0.5 * a()), u = Math.min(n, t) * (0.8 + 0.35 * a()), c = a() * Math.PI * 2;
  Dt(e, r, o ? l : n - l, f, u, c, o ? 0.85 : 0.6, o);
}
async function Dn(e, n, t, s, o) {
  let r = await Ge("prints");
  if (!r) return;
  let a = Q(s.seed * 29 + 6);
  for (let l = 0; l < 2; l++) {
    let f = n * (l ? 0.86 - 0.08 * a() : 0.1 + 0.12 * a()), u = t * (0.72 + 0.2 * a()), c = Math.min(n, t) * (0.22 + 0.08 * a()), d = a() * Math.PI * 2;
    Dt(e, r, o ? f : n - f, u, c, d, o ? 0.6 : 0.4, o);
  }
}
async function Nn(e, n, t, s, o, r) {
  let a = Q(o.seed * 17 + 1), l = t * (0.3 + 0.4 * a()), f = s * (0.35 + 0.35 * a()), u = Math.min(t, s) * (0.13 + 0.07 * a()), c = a() * Math.PI * 2, d = r ? l : t - l, g = await Ge("coffee");
  if (r) {
    let E = ye(t, s);
    E.getContext("2d").drawImage(e, 0, 0), n.save(), n.beginPath(), n.arc(d, f, u * 1.02, 0, Math.PI * 2), n.clip(), n.clearRect(d - u * 1.1, f - u * 1.1, u * 2.2, u * 2.2), n.filter = "blur(2.5px)", n.globalAlpha = 0.85, n.drawImage(E, 0, 0), n.restore();
  }
  if (g) {
    Dt(n, g, d, f, u * 3.4, c, r ? 0.95 : 0.55, r);
    return;
  }
  n.save();
  let h = n.createRadialGradient(d, f, u * 0.1, d, f, u);
  h.addColorStop(0, "rgba(140,95,45,0.10)"), h.addColorStop(0.82, "rgba(125,82,36,0.17)"), h.addColorStop(1, "rgba(110,70,30,0)"), n.fillStyle = h, n.beginPath(), n.arc(d, f, u, 0, Math.PI * 2), n.fill();
  for (let E = 0; E < 3; E++) {
    n.strokeStyle = `rgba(100,62,26,${0.2 + 0.12 * a()})`, n.lineWidth = u * (0.03 + 0.03 * a()), n.beginPath();
    let m = a() * 6.28, b = u * (0.9 + 0.05 * E);
    for (let y = 0; y <= Math.PI * 2 + 0.01; y += 0.05) {
      let w = b * (1 + 0.025 * Math.sin(y * 5 + m) + 0.015 * Math.sin(y * 11 + m * 2));
      y === 0 ? n.moveTo(d + Math.cos(y) * w, f + Math.sin(y) * w) : n.lineTo(d + Math.cos(y) * w, f + Math.sin(y) * w);
    }
    n.stroke();
  }
  for (let E = 0; E < 3; E++) {
    let m = d + (a() - 0.5) * u * 1.2, b = u * (0.6 + a() * 1.2), y = n.createLinearGradient(0, f + u * 0.6, 0, f + u * 0.6 + b);
    y.addColorStop(0, "rgba(115,75,32,0.16)"), y.addColorStop(1, "rgba(115,75,32,0)"), n.fillStyle = y, n.fillRect(m - 5, f + u * 0.6, 9 + a() * 6, b);
  }
  n.restore();
}
function Un(e, n, t, s) {
  e.save(), e.fillStyle = "rgba(150,110,45,0.08)", e.fillRect(0, 0, n, t);
  let o = e.createRadialGradient(n / 2, t / 2, Math.min(n, t) * 0.3, n / 2, t / 2, Math.max(n, t) * 0.75);
  o.addColorStop(0, "rgba(120,80,30,0)"), o.addColorStop(1, "rgba(120,80,30,0.28)"), e.fillStyle = o, e.fillRect(0, 0, n, t);
  for (let r = 0; r < 34; r++) {
    let a = s() * n, l = s() * t, f = 3 + s() * 14, u = e.createRadialGradient(a, l, 0, a, l, f);
    u.addColorStop(0, `rgba(125,85,40,${0.12 + s() * 0.2})`), u.addColorStop(1, "rgba(125,85,40,0)"), e.fillStyle = u, e.beginPath(), e.arc(a, l, f, 0, Math.PI * 2), e.fill();
  }
  e.restore();
}
async function _n(e, n, t, s, o, r) {
  let a = Q(o.seed * 43 + 3), l = t * (0.3 + 0.4 * a()), f = s * (0.4 + 0.3 * a()), u = Math.min(t, s) * (0.1 + 0.04 * a()), c = r ? l : t - l, d = r ? 1 : 0.5;
  if (r) {
    let h = ye(t, s);
    h.getContext("2d").drawImage(e, 0, 0), n.save(), n.beginPath(), n.arc(c, f, u * 1.04, 0, Math.PI * 2), n.clip(), n.clearRect(c - u * 1.1, f - u * 1.1, u * 2.2, u * 2.2), n.filter = "blur(2px)", n.globalAlpha = 0.8, n.drawImage(h, 0, 0), n.restore();
  }
  n.save(), n.globalCompositeOperation = "multiply";
  let g = n.createRadialGradient(c, f, u * 0.2, c, f, u * 1.05);
  g.addColorStop(0, `rgba(120,14,38,${0.03 * d})`), g.addColorStop(0.8, `rgba(120,14,38,${0.1 * d})`), g.addColorStop(1, "rgba(90,8,28,0)"), n.fillStyle = g, n.beginPath(), n.arc(c, f, u * 1.05, 0, Math.PI * 2), n.fill(), n.lineCap = "round", n.filter = "blur(0.8px)";
  for (let h = 0; h < 2; h++) {
    let E = a() * 6.28, m = 3.4 + a() * 1.4, b = u * (0.94 + 0.12 * h + 0.03 * a()), y = a() * 6.28, w = (i, M) => {
      let C = (b - M) * (1 + 0.025 * Math.sin(i * 5 + y) + 0.012 * Math.sin(i * 9 + y * 2));
      return [c + Math.cos(i) * C, f + Math.sin(i) * C];
    };
    [[u * 0.22, 0.07, 0.04], [u * 0.07, 0.4, 0], [u * 0.03, 0.16, u * 0.06]].forEach(([i, M, C]) => {
      n.strokeStyle = `rgba(96,12,36,${M * d})`, n.lineWidth = i, n.beginPath();
      for (let N = 0, F = E; F <= E + m; N++, F += 0.04) {
        let z = w(F, C);
        N ? n.lineTo(z[0], z[1]) : n.moveTo(z[0], z[1]);
      }
      n.stroke();
    });
  }
  n.filter = "none";
  for (let h = 0, E = 4 + Math.floor(a() * 4); h < E; h++) {
    let m = a() * 6.28, b = u * (1.35 + a() * 1.1), y = u * (0.02 + 0.035 * a());
    n.fillStyle = `rgba(104,10,30,${0.45 * d})`, n.beginPath(), n.arc(c + Math.cos(m) * b, f + Math.sin(m) * b, y, 0, Math.PI * 2), n.fill(), h % 2 && (n.beginPath(), n.arc(c + Math.cos(m + 0.2) * b * 1.12, f + Math.sin(m + 0.2) * b * 1.12, y * 0.35, 0, Math.PI * 2), n.fill());
  }
  n.restore();
}
function Bn(e, n) {
  let t = [1, 2, 3, 5, 7, 11].map((o) => [o, e() * 6.28, (0.06 + 0.14 * e()) * 2 / o]), s = [];
  for (let o = 0; o < 40; o++) {
    let r = o / 40 * Math.PI * 2, a = 1;
    t.forEach(([l, f, u]) => {
      a += u * Math.sin(l * r + f);
    }), s.push([Math.cos(r) * n * a, Math.sin(r) * n * a]);
  }
  return s;
}
function Ot(e, n, t, s, o) {
  e.beginPath(), n.forEach((r, a) => {
    a ? e.lineTo(t + r[0] * o, s + r[1] * o) : e.moveTo(t + r[0] * o, s + r[1] * o);
  }), e.closePath(), e.fill();
}
function zn(e, n, t, s, o) {
  let r = Q(s.seed * 47 + 5), a = Math.min(n, t), l = n * (0.2 + 0.6 * r()), f = t * (0.2 + 0.6 * r()), u = a * (0.03 + 0.015 * r()), c = o ? l : n - l, d = o ? 1 : 0.5, g = [16, 22, 58], h = Bn(r, u);
  e.save(), e.fillStyle = ie(g, 0.07 * d), Ot(e, h, c, f, 1.45), Ot(e, h, c, f, 1.22), e.fillStyle = ie(g, 0.86 * d), e.filter = "blur(0.5px)", Ot(e, h, c, f, 1), e.filter = "none", e.fillStyle = ie(g, 0.86 * d);
  for (let M = 0, C = 6 + Math.floor(r() * 5); M < C; M++) {
    let N = r() * 6.28, F = u * (1.5 + 2.4 * r()), z = u * (0.16 + 0.14 * r()) * (1.6 - F / (u * 4));
    e.beginPath(), e.arc(c + Math.cos(N) * F, f + Math.sin(N) * F, Math.max(z, 0.8), 0, Math.PI * 2), e.fill();
  }
  let E = r() * 6.28, m = u * (1.6 + 1.2 * r()), b = Math.cos(E), y = Math.sin(E), w = [], i = [];
  for (let M = 0; M <= 10; M++) {
    let C = M / 10, N = u * 0.42 * Math.pow(1 - C, 1.3) * (0.85 + 0.3 * r()), F = u * 0.7 + m * C;
    w.push([b * F - y * N, y * F + b * N]), i.push([b * F + y * N, y * F - b * N]);
  }
  e.fillStyle = ie(g, 0.6 * d), e.beginPath(), w.concat(i.reverse()).forEach((M, C) => {
    C ? e.lineTo(c + M[0], f + M[1]) : e.moveTo(c + M[0], f + M[1]);
  }), e.closePath(), e.fill(), e.strokeStyle = ie(g, 0.28 * d), e.lineWidth = 0.9, e.lineCap = "round";
  for (let M = 0; M < 18; M++) {
    let C = r() * 6.28, N = u * (0.95 + 0.1 * r()), F = N + u * (0.3 + 0.9 * r());
    e.beginPath(), e.moveTo(c + Math.cos(C) * N, f + Math.sin(C) * N), e.lineTo(c + Math.cos(C + 0.05) * F, f + Math.sin(C + 0.05) * F), e.stroke();
  }
  e.restore();
}
function Gn(e, n, t, s) {
  let o = Q(s.seed * 41 + 2), r = xe(s.seed + 19), a = o() * Math.PI * 2, l = Math.cos(a), f = Math.sin(a), u = 96, c = Math.round(u * t / n), d = ye(u, c, !0), g = d.getContext("2d"), h = g.createImageData(u, c), E = h.data;
  for (let m = 0; m < c; m++) for (let b = 0; b < u; b++) {
    let y = j((b / u - 0.5) * l + (m / c - 0.5) * f + 0.5), w = Math.pow(y, 2.4) * (0.45 + 0.55 * r(b * 0.12, m * 0.12)), i = (m * u + b) * 4;
    E[i] = 165, E[i + 1] = 112, E[i + 2] = 45, E[i + 3] = Math.round(255 * 0.42 * w);
  }
  g.putImageData(h, 0, 0), e.save(), e.imageSmoothingQuality = "high", e.drawImage(d, 0, 0, n, t), e.restore();
}
function Xn(e, n, t, s) {
  let o = Q(s.seed * 61 + 11), r = Math.min(n, t) / 900, a = [[150, 78, 30], [170, 96, 40], [128, 62, 24]];
  e.save(), e.globalCompositeOperation = "multiply";
  for (let l = 0, f = 0; l < 150 && f < 900; f++) {
    let u = o() * n, c = o() * t, d = Math.max(Math.abs(u / n - 0.5), Math.abs(c / t - 0.5)) * 2;
    if (o() > 0.15 + 0.85 * d * d * d) continue;
    l++;
    let g = o() < 0.4, h = r * (g ? 4 + Math.pow(o(), 1.5) * 15 : 1 + Math.pow(o(), 2) * 5), E = a[Math.floor(o() * 3)], m = 0.34 + 0.4 * o(), b = e.createRadialGradient(0, 0, h * (g ? 0 : 0.55), 0, 0, h);
    g ? (b.addColorStop(0, ie(E, m * 0.6)), b.addColorStop(0.55, ie(E, m * 0.4)), b.addColorStop(1, ie(E, 0))) : (b.addColorStop(0, ie(E, m * 0.7)), b.addColorStop(0.85, ie(E, m * 0.8)), b.addColorStop(0.97, ie(E, m * 1.15)), b.addColorStop(1, ie(E, 0))), e.save(), e.translate(u, c), e.rotate(o() * 3.14), e.scale(1, g ? 0.55 + 0.45 * o() : 1), e.fillStyle = b, e.beginPath(), e.arc(0, 0, h, 0, Math.PI * 2), e.fill(), e.restore();
  }
  e.restore();
}
function Yn(e, n, t, s, o) {
  let r = Q(s.seed * 59 + 9), a = xe(s.seed + 23), l = String(s.stamp).toUpperCase(), f = r() < 0.6 ? [176, 26, 36] : [34, 64, 150], u = ye(1, 1).getContext("2d");
  u.font = 'bold 100px "Courier Prime", monospace', u.letterSpacing = "12px";
  let c = u.measureText(l).width / 100, d = n * 0.44, g = d / (c + 1.2), h = g * 2.1, E = -(0.14 + 0.17 * r()), m = n * (0.46 + 0.1 * r()), b = Math.min(t - h / 2 - 30, Math.max(t * 0.55, o + h / 2 + 24)), y = Math.ceil(Math.hypot(d, h) + g * 0.8), w = ye(y, y, !0), i = w.getContext("2d");
  i.translate(y / 2, y / 2), i.fillStyle = i.strokeStyle = ie(f, 1), i.textAlign = "center", i.textBaseline = "middle", i.font = `bold ${g}px "Courier Prime", monospace`, i.letterSpacing = g * 0.12 + "px", i.lineWidth = g * 0.13, i.strokeRect(-d / 2, -h / 2, d, h), i.globalAlpha = 0.5, i.lineWidth = g * 0.1, i.strokeRect(-d / 2 + g * 0.07, -h / 2 - g * 0.05, d, h), i.globalAlpha = 1, i.lineWidth = g * 0.05, i.strokeRect(-d / 2 + g * 0.3, -h / 2 + g * 0.3, d - g * 0.6, h - g * 0.6), i.fillText(l, -g * 0.06, g * 0.05);
  let M = i.getImageData(0, 0, y, y), C = M.data, N = y / 2;
  for (let F = 0; F < C.length; F += 4) {
    if (!C[F + 3]) continue;
    let z = F / 4, ae = z % y, ne = Math.floor(z / y), k = (ae - N) / (d / 2), D = (ne - N) / (h / 2), G = 1 - 0.25 * Math.min(1, k * k + D * D), J = j((a(ae / (g * 1.5), ne / (g * 1.5)) - 0.25) * 3.2) * G * (r() < 0.94 ? 1 : 0.3);
    C[F + 3] = Math.round(C[F + 3] * J);
  }
  i.putImageData(M, 0, 0), e.save(), e.globalCompositeOperation = "multiply", e.globalAlpha = 0.9, e.translate(m, b), e.rotate(E), e.drawImage(w, -y / 2, -y / 2), e.restore();
}
function qn(e, n, t, s) {
  let o = Q(s.seed * 53 + 7), r = n * (0.24 + 0.04 * o()), a = n * 0.1;
  [[0.1, 0.05, 0.7], [0.9, 0.05, -0.7]].forEach(([l, f, u]) => {
    let c = n * (l + (o() - 0.5) * 0.03), d = t * (f + (o() - 0.5) * 0.02), g = u + (o() - 0.5) * 0.1;
    e.save(), e.translate(c, d), e.rotate(g);
    let h = [];
    for (let b = 0; b <= 6; b++) h.push([r / 2 - (b % 2 ? 0 : 2 + 4 * o()), -a / 2 + a * b / 6]);
    let E = () => {
      e.beginPath(), e.moveTo(-r / 2, -a / 2), h.forEach((b) => e.lineTo(b[0], b[1])), e.lineTo(-r / 2, a / 2), e.closePath();
    };
    E(), e.fillStyle = "rgba(226,176,96,0.48)", e.fill();
    let m = e.createLinearGradient(0, -a / 2, 0, a / 2);
    m.addColorStop(0, "rgba(255,248,230,0)"), m.addColorStop(0.3, "rgba(255,248,230,0.3)"), m.addColorStop(0.5, "rgba(255,248,230,0.06)"), m.addColorStop(1, "rgba(255,248,230,0)"), e.fillStyle = m, e.fill(), E(), e.strokeStyle = "rgba(140,92,36,0.5)", e.lineWidth = 2, e.stroke(), e.fillStyle = "rgba(140,92,36,0.16)", e.fillRect(-r / 2, -a / 2, r * 0.03, a);
    for (let b = 0, y = 6 + Math.floor(o() * 4); b < y; b++)
      e.fillStyle = `rgba(70,46,22,${0.3 + 0.3 * o()})`, e.beginPath(), e.arc((o() - 0.5) * r * 0.8, (o() - 0.5) * a * 0.7, 1 + 2 * o(), 0, Math.PI * 2), e.fill();
    e.restore();
  });
}
function Hn(e, n, t, s, o) {
  let r = Q(s.seed * 71 + 3), a = 54 + r() * 16, l = 48 + r() * 16, f = -0.52 + (r() - 0.5) * 0.15;
  if (e.save(), e.translate(o ? a : n - a, l), e.rotate(o ? f : -f), o) {
    e.fillStyle = "rgba(30, 20, 10, 0.7)", e.fillRect(-22, -3, 5, 6), e.fillRect(17, -3, 5, 6), e.fillStyle = "rgba(10, 10, 10, 0.35)", e.fillRect(-20, 1, 40, 5);
    let u = e.createLinearGradient(0, -3, 0, 3);
    u.addColorStop(0, "#c8cdd4"), u.addColorStop(0.3, "#ffffff"), u.addColorStop(0.7, "#858d99"), u.addColorStop(1, "#535b66"), e.fillStyle = u, e.fillRect(-20, -3, 40, 5), e.fillStyle = "rgba(140, 70, 30, 0.35)", e.fillRect(-8, -2, 6, 3);
  } else
    e.fillStyle = "rgba(30, 20, 10, 0.7)", e.fillRect(-22, -3, 5, 6), e.fillRect(17, -3, 5, 6), e.fillStyle = "#7a828e", e.fillRect(-18, -2, 12, 4), e.fillRect(6, -2, 12, 4);
  e.restore();
}
function Vn(e, n, t, s, o) {
  let r = Q(s.seed * 67 + 13), a = n * (0.25 + 0.5 * r()), l = t * (0.3 + 0.45 * r()), f = Math.min(n, t) * (0.12 + 0.08 * r()), u = o ? a : n - a;
  e.save(), e.globalCompositeOperation = "multiply";
  let c = e.createRadialGradient(u, l, f * 0.2, u, l, f);
  c.addColorStop(0, "rgba(140, 120, 70, 0.45)"), c.addColorStop(0.65, "rgba(150, 130, 80, 0.30)"), c.addColorStop(1, "rgba(150, 130, 80, 0)"), e.fillStyle = c, e.beginPath();
  for (let d = 0; d <= Math.PI * 2 + 0.01; d += 0.1) {
    let g = f * (1 + 0.12 * Math.sin(d * 5 + r() * 3));
    d === 0 ? e.moveTo(u + Math.cos(d) * g, l + Math.sin(d) * g) : e.lineTo(u + Math.cos(d) * g, l + Math.sin(d) * g);
  }
  e.fill(), e.restore();
}
function $n(e, n, t, s, o) {
  let r = Math.min(n, t) * 0.15;
  if (e.save(), o) {
    e.fillStyle = "rgba(10, 10, 15, 0.3)", e.beginPath(), e.moveTo(n - r - 8, 0), e.lineTo(n, r + 8), e.lineTo(n - r, r), e.closePath(), e.fill();
    let a = e.createLinearGradient(n - r, 0, n, r);
    a.addColorStop(0, "rgba(235, 225, 210, 0.95)"), a.addColorStop(1, "rgba(195, 185, 170, 0.95)"), e.fillStyle = a, e.beginPath(), e.moveTo(n - r, 0), e.lineTo(n, r), e.lineTo(n - r, r), e.closePath(), e.fill(), e.strokeStyle = "rgba(60, 50, 40, 0.4)", e.lineWidth = 2, e.beginPath(), e.moveTo(n - r, 0), e.lineTo(n, r), e.stroke();
  }
  e.restore();
}
function jn(e, n, t, s) {
  let o = Q(s.seed * 83 + 7);
  e.save(), e.strokeStyle = "rgba(120, 140, 170, 0.12)", e.lineWidth = 3;
  for (let r = 0; r < 6; r++) {
    let a = t * (0.2 + 0.12 * r + 0.04 * o());
    e.beginPath(), e.moveTo(0, a), e.bezierCurveTo(n * 0.33, a + 18 * (o() - 0.5), n * 0.66, a + 18 * (o() - 0.5), n, a), e.stroke();
  }
  e.restore();
}
function Kn(e, n, t, s) {
  let o = Q(s.seed * 89 + 11);
  e.save(), e.strokeStyle = "rgba(255, 255, 255, 0.28)", e.lineWidth = 1;
  for (let r = 0; r < 14; r++) {
    let a = o() * n, l = o() * t, f = o() * Math.PI, u = 60 + o() * 120;
    e.beginPath(), e.moveTo(a, l), e.lineTo(a + Math.cos(f) * u, l + Math.sin(f) * u), e.stroke();
  }
  e.restore();
}
function Wt(e, n, t) {
  if (!e.hiddenInk) return null;
  let s = ye(n, t, !0), o = s.getContext("2d"), r = Math.round(n * 0.12);
  o.fillStyle = "#fff", o.textAlign = "center", o.filter = "blur(0.7px)", o.font = `${r}px "Caveat", cursive`, o.translate(n / 2, t * 0.7), o.rotate(-0.1), e.hiddenInk.split(`
`).forEach((f, u) => o.fillText(f, 0, u * r * 1.05));
  let a = o.getImageData(0, 0, n, t).data, l = new Float32Array(n * t);
  for (let f = 0; f < t; f++) for (let u = 0; u < n; u++) l[f * n + u] = a[((t - 1 - f) * n + u) * 4 + 3] / 255;
  return l;
}
function Ye(e, n, t, s, o) {
  let r = [e, n];
  for (let a = 0; a < s; a++) {
    let l = [r[0]];
    for (let f = 1; f < r.length; f++) {
      let u = r[f - 1], c = r[f], d = (u[0] + c[0]) / 2, g = (u[1] + c[1]) / 2, h = c[0] - u[0], E = c[1] - u[1], m = Math.hypot(h, E), b = (t() - 0.5) * m * o;
      l.push([d - E / m * b, g + h / m * b], c);
    }
    r = l;
  }
  return r;
}
async function Nt(e, n, t = null) {
  let s = Math.round(n.w * bt / 2), o = Math.round(n.h * bt / 2), r = ye(s, o, !0), a = r.getContext("2d");
  a.fillStyle = "#fff", a.fillRect(0, 0, s, o);
  let l = ye(s, o, !0), f = l.getContext("2d");
  f.fillStyle = "#000", f.fillRect(0, 0, s, o);
  let u = Q(e.seed * 13 + 3);
  if (a.fillStyle = "#000", f.strokeStyle = "#fff", f.lineWidth = 2.2, f.filter = "blur(0.8px)", e.type === "form")
    for (let w = 22; w < o - 6; w += 24) [15, s - 15].forEach((i) => {
      a.beginPath(), a.arc(i, w, 5.5, 0, Math.PI * 2), a.fill();
    });
  if (e.type === "notebook") {
    let w = Ye([4, 0], [4, o], u, 7, 0.05);
    a.beginPath(), a.moveTo(0, 0), w.forEach((i) => a.lineTo(i[0] + u() * 2, i[1])), a.lineTo(0, o), a.closePath(), a.fill();
    for (let i = 18; i < o; i += 22)
      a.beginPath(), a.arc(2, i, 5 + u() * 1.5, 0, Math.PI * 2), a.fill();
    f.beginPath(), w.forEach((i, M) => M ? f.lineTo(i[0] + 1, i[1]) : f.moveTo(i[0] + 1, i[1])), f.stroke();
  }
  if (e.type === "envelope") {
    let w = n.flap / n.h * o;
    a.beginPath(), a.moveTo(-2, -2), a.lineTo(s / 2, -2), a.lineTo(s / 2, 3), a.lineTo(-2, w), a.closePath(), a.fill(), a.beginPath(), a.moveTo(s + 2, -2), a.lineTo(s / 2, -2), a.lineTo(s / 2, 3), a.lineTo(s + 2, w), a.closePath(), a.fill();
  }
  if (e.type === "punchcard") {
    a.beginPath(), a.moveTo(-2, -2), a.lineTo(26, -2), a.lineTo(-2, 26), a.closePath(), a.fill();
    let w = Q(e.seed * 37 + 5);
    for (let i = 0; i < 28; i++) {
      let M = 36 + i * Math.round((s - 72) / 27), C = 1 + Math.floor(w() * 3);
      for (let N = 0; N < C; N++) {
        let F = 24 + Math.floor(w() * 10) * Math.round((o - 48) / 10);
        a.fillRect(M - 3, F - 6, 7, 13);
      }
    }
  }
  if (e.type === "parchment") {
    let w = Ye([-2, 3], [s + 2, 3], u, 5, 0.1), i = Ye([-2, o - 3], [s + 2, o - 3], u, 5, 0.1), M = Ye([3, -2], [3, o + 2], u, 5, 0.1), C = Ye([s - 3, -2], [s - 3, o + 2], u, 5, 0.1);
    f.lineWidth = 2.5, [w, i, M, C].forEach((N) => {
      f.beginPath(), N.forEach((F, z) => z ? f.lineTo(F[0], F[1]) : f.moveTo(F[0], F[1])), f.stroke();
    });
  }
  if (e.states.includes("torn")) {
    let w = Math.floor(u() * 3), i, M, C;
    w === 0 ? (i = [s * (0.5 + 0.25 * u()), -2], M = [s + 2, o * (0.2 + 0.25 * u())], C = [[s + 2, -2]]) : w === 1 ? (i = [-2, o * (0.72 + 0.12 * u())], M = [s + 2, o * (0.72 + 0.12 * u())], C = [[s + 2, o + 2], [-2, o + 2]]) : (i = [s * (0.3 + 0.25 * u()), o + 2], M = [-2, o * (0.55 + 0.2 * u())], C = [[-2, o + 2]]);
    let N = Ye(i, M, u, 8, 0.22);
    a.beginPath(), N.forEach((F, z) => z ? a.lineTo(F[0], F[1]) : a.moveTo(F[0], F[1])), C.forEach((F) => a.lineTo(F[0], F[1])), a.closePath(), a.fill(), f.lineWidth = 3.2, f.beginPath(), N.forEach((F, z) => z ? f.lineTo(F[0], F[1]) : f.moveTo(F[0], F[1])), f.stroke();
  }
  let c = a.getImageData(0, 0, s, o).data, d = f.getImageData(0, 0, s, o).data, g = t ? await mt.run("burn", [{ seed: e.seed, form: t === "singed" ? "singed" : e.burn }, s, o]) : null, h = a.createImageData(s, o), E = h.data, m = [], b = 1 / 0;
  for (let w = 0; w < o; w++) for (let i = 0; i < s; i++) {
    let M = (w * s + i) * 4;
    if (E[M] = c[M], E[M + 1] = 0, E[M + 2] = d[M], g) {
      let C = g[w * s + i];
      E[M + 3] = Math.round(j(C / 1.4) * 255), b = Math.min(b, C), t === "burn" && i % 3 === 0 && w % 3 === 0 && c[M] > 128 && m.push((i + 0.5) / s, 1 - (w + 0.5) / o, C);
    } else E[M + 3] = 255;
  }
  let y = ye(s, o);
  return y.getContext("2d").putImageData(h, 0, 0), { canvas: y, burnPts: t === "burn" ? new Float32Array(m) : null, lo: g ? Math.max(0, b) : 0 };
}

// .build/shaders.js
var Zt = `#version 300 es
precision highp float;in vec2 aXY;uniform sampler2D uH;uniform int uShape;uniform float uP,uK0,uKres,uA0,uAres,uScale,uSeedA,uSquash,uRoll,uCurl,uTear,uStubX,uIsStub,uFoldSide,uFoldBw,uFoldY,uEdge,uThick;uniform vec2 uHalf;uniform mat4 uModel,uProj;out vec3 vPos;out vec3 vNrm;out vec2 vUv;out float vE;out float vAmp;float Hf(vec2 xy){return textureLod(uH,xy/(2.0*uHalf)+0.5,0.0).r;}vec3 rotY(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x+s*v.z,v.y,-s*v.x+c*v.z);}vec3 rotZ(vec3 v,float a){float c=cos(a),s=sin(a);return vec3(c*v.x-s*v.y,s*v.x+c*v.y,v.z);}vec3 bend(float d,float th,float bw){float t=max(abs(th),1e-4),R=bw/t,L=R*t;if(d<L){float a=d/R;return vec3(R*sin(a),R*(1.0-cos(a)),a);}return vec3(R*sin(t)+(d-L)*cos(t),R*(1.0-cos(t))+(d-L)*sin(t),t);}void foldX(inout vec3 p,inout vec3 n,float x0,float s,float th,float bw){float d=(p.x-x0)*s;if(d<=0.0||abs(th)<1e-4)return;vec3 c=bend(d,th,bw);float g=sign(th),ca=cos(c.z),sa=g*sin(c.z),z0=p.z;p.x=x0+s*(c.x-sa*z0);p.z=g*c.y+ca*z0;n=vec3(ca*n.x-s*sa*n.z,n.y,s*sa*n.x+ca*n.z);}void foldY(inout vec3 p,inout vec3 n,float y0,float s,float th,float bw){float d=(p.y-y0)*s;if(d<=0.0||abs(th)<1e-4)return;vec3 c=bend(d,th,bw);float g=sign(th),ca=cos(c.z),sa=g*sin(c.z),z0=p.z;p.y=y0+s*(c.x-sa*z0);p.z=g*c.y+ca*z0;n=vec3(n.x,ca*n.y-s*sa*n.z,s*sa*n.y+ca*n.z);}vec3 place(vec2 xy,out float e,out float amp,out vec3 n){vec3 p=vec3(xy,0.0);n=vec3(0.0,0.0,1.0);if(uShape==0){float s=length(xy),sn=s/length(uHalf);float q=clamp(uP*1.5-sn*0.5+0.14*sn*sin(atan(xy.y,xy.x)*3.0+uSeedA),0.0,1.0);e=q*q*(3.0-2.0*q);float k=mix(uKres,uK0,(1.0-e)*(1.0-e));if(s>1e-6){float th=s*k,st=sin(th),ct=cos(th);vec2 dir=xy/s;n=vec3(st*dir,ct);p=vec3(st/k*dir,(ct-1.0)/k);}float sq=mix(uSquash,1.0,e);float expan=mix(1.0+(1.0-uSquash)*0.3,1.0,e);p.z*=sq;p.xy*=expan;n=normalize(vec3(n.xy/expan,n.z/sq));amp=mix(uA0,uAres,pow(e,2.2));}else if(uShape==1){e=uP;float L=2.0*uHalf.x*e,s=xy.x+uHalf.x;if(s>L){float ph=(s-L)/uRoll;float r=uRoll*(1.0-0.07*ph/6.2831853);p=vec3(L-uHalf.x+r*sin(ph),xy.y,r*(1.0-cos(ph)));n=vec3(-sin(ph),0.0,cos(ph));}p.x+=(uHalf.x-uRoll)*(1.0-e);amp=mix(uA0,uAres,e);}else if(uShape==2){e=uP;float k=uK0*(1.0-e)*(1.0-e);if(k>1e-2){float a=(xy.y+uHalf.y)*k;float r=1.0/k-uRoll*a/6.2831853;vec2 ax=vec2(-uHalf.y,-1.0/k);p=vec3(xy.x,ax.x+r*sin(a),ax.y+r*cos(a));n=vec3(0.0,sin(a),cos(a));float g=pow(1.0-e,3.0);float axv=abs(xy.x)/uHalf.x;float neck=smoothstep(0.5,0.8,axv),fl=smoothstep(0.82,1.0,axv);float sc=mix(1.0,mix(1.0,0.17*(1.0+3.2*fl),neck),g);float tw=sign(xy.x)*(neck*3.4+fl*1.3)*g;float c=cos(tw),sn=sin(tw);vec2 rv=(p.yz-ax)*sc;p.yz=ax+vec2(c*rv.x-sn*rv.y,sn*rv.x+c*rv.y);n.yz=vec2(c*n.y-sn*n.z,sn*n.y+c*n.z);n=normalize(n);}p.y+=uHalf.y*(1.0-e);p.z+=(1.0/uK0)*(1.0-e);amp=mix(uA0,uAres,e);}else if(uShape==6){e=uP;foldY(p,n,uFoldY,1.0,mix(3.12,-1.1,smoothstep(0.0,1.0,e)),uFoldBw);p.y-=(uFoldY-uHalf.y)*0.5;amp=mix(uA0,uAres,e);}else if(uShape==7){e=uP;float em=smoothstep(0.0,1.0,e);float a=3.12*(1.0-em);float x3=uHalf.x*0.333;foldX(p,n,-x3,-1.0,a,uFoldBw);foldX(p,n,0.0,1.0,-a,uFoldBw*1.5);foldX(p,n,x3,1.0,a,uFoldBw*2.0);p.x*=mix(0.28,1.0,em);amp=mix(uA0,uAres,e);}else if(uShape==8){e=uP;float em=smoothstep(0.0,1.0,e);float a=3.12*(1.0-em);foldX(p,n,0.0,1.0,a,uFoldBw);foldY(p,n,0.0,-1.0,a,uFoldBw*1.5);p.xy*=mix(0.58,1.0,em);amp=mix(uA0,uAres,e);}else{e=uP;float e2=smoothstep(0.0,0.5,e),e1=smoothstep(0.5,1.0,e);if(uShape==3){foldX(p,n,0.0,1.0,3.12*(1.0-e1),uFoldBw);foldY(p,n,0.0,1.0,3.12*(1.0-e2),uFoldBw*2.6);p.x+=uHalf.x*0.5*(1.0-e1);p.y+=uHalf.y*0.5*(1.0-e2);}else if(uShape==4){float em=smoothstep(0.0,1.0,e);foldX(p,n,0.0,uFoldSide,3.12*(1.0-em),uFoldBw);p.x+=uFoldSide*uHalf.x*0.5*(1.0-em);}else{float y3=uHalf.y/3.0;foldY(p,n,-y3*1.08,-1.0,3.12*(1.0-e1),uFoldBw);foldY(p,n,y3,1.0,3.12*(1.0-e2),uFoldBw*2.6);}amp=mix(uA0,uAres,e);}p+=n*Hf(xy)*amp;if(uIsStub>0.5&&uTear>0.0){vec3 piv=vec3(uStubX,0.0,0.0);p=rotY(rotZ(p-piv,-0.55*uTear),0.6*uTear)+piv+vec3(0.08*uTear,-1.1*uTear*uTear,0.12*uTear);n=rotY(rotZ(n,-0.55*uTear),0.6*uTear);}p.z-=uCurl*p.x*p.x;n=normalize(vec3(n.x+2.0*uCurl*p.x*n.z,n.y,n.z));return p;}void main(){float e,amp;vec3 nrm;vec3 p0=place(aXY,e,amp,nrm);if(uEdge>0.5)p0-=nrm*uThick*(nrm.z>=0.0?1.0:-1.0);vec4 w=uModel*vec4(p0,1.0);vPos=w.xyz;vNrm=mat3(uModel)*nrm;vUv=aXY/(2.0*uHalf)+0.5;vE=uShape==0?pow(e,2.2):e;vAmp=amp*uScale;gl_Position=uProj*w;}`, Qt = `#version 300 es
precision highp float;in vec3 vPos;in vec3 vNrm;in vec2 vUv;in float vE;in float vAmp;uniform sampler2D uH,uPrintF,uPrintB,uFx,uGrain;uniform vec2 uGrainK;uniform vec3 uCam,uColor,uL,uLampPos;uniform float uBump,uAge,uTime,uThru,uFront,uInkMax,uEdge,uDestroy,uLamp,uLampR;out vec4 frag;float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}vec3 perturb(vec3 pos,vec3 n,vec2 dH){vec3 sx=dFdx(pos),sy=dFdy(pos);vec3 r1=cross(sy,n),r2=cross(n,sx);float det=dot(sx,r1);return normalize(abs(det)*n-sign(det)*(dH.x*r1+dH.y*r2));}void main(){vec4 fx=texture(uFx,vUv);float pres=fx.r,sc=0.0;if(uFront>-0.5){float b=fx.a*1.4;pres=min(pres,smoothstep(uFront-0.004,uFront+0.012,b));sc=1.0-smoothstep(uFront,uFront+0.17,b);}if(pres<0.4)discard;float a=smoothstep(0.4,0.6,pres);bool front=gl_FrontFacing;vec3 n=normalize(vNrm)*(front?1.0:-1.0);vec3 L=normalize(uL);if(uEdge>0.5){float w=clamp((dot(n,L)+0.3)/1.3,0.0,1.0);vec3 ec=mix(uColor*vec3(0.8,0.76,0.7),vec3(0.08,0.06,0.05),smoothstep(0.55,0.9,sc))*(0.45+0.55*w);frag=vec4(ec*a,a);return;}vec4 h0=texture(uH,vUv);vec2 du=dFdx(vUv),dv=dFdy(vUv);vec4 hx=texture(uH,vUv+du),hy=texture(uH,vUv+dv);vec3 toP=uLampPos-vPos;vec3 Lp=normalize(toP);float pool=pow(1.0-smoothstep(0.0,1.0,length(toP.xy)/uLampR),1.3)*uLamp;float grazD=clamp((1.0-L.z-0.4)/0.5,0.0,1.0);float grazP=smoothstep(0.2,0.75,1.0-Lp.z)*pool;float ink=uInkMax*mix(grazD,grazP*3.0,uLamp);vec2 dH=vec2(hx.r-h0.r,hy.r-h0.r)*vAmp*uBump*(1.0+1.6*pool)-vec2(hx.g-h0.g,hy.g-h0.g)*ink;n=perturb(vPos,n,dH);vec3 V=normalize(uCam-vPos);float wrap=clamp((dot(n,L)+0.08)/1.08,0.0,1.0);float wrapP=max(dot(n,Lp),0.0);float ao=mix(1.0,0.42+0.58*smoothstep(-0.55,0.35,h0.r),1.0-vE);float fib=hash(floor(vUv*vec2(900.0,1180.0)));vec2 eu=min(vUv,1.0-vUv);float edge=smoothstep(0.0,0.05,min(eu.x,eu.y));vec3 col0=mix(uColor,uColor*vec3(0.93,0.84,0.66),uAge);vec3 alb=col0*(0.975+0.025*fib)*(0.93+0.07*edge);alb*=1.0+(texture(uGrain,vUv*uGrainK).r-0.94)*1.8;if(!front)alb*=0.9;vec2 uvB=vec2(1.0-vUv.x,vUv.y);vec4 tF=texture(uPrintF,vUv),tB=texture(uPrintB,uvB);vec4 pr=front?tF:tB;vec4 th=front?tB:tF;alb=mix(alb,th.rgb,th.a*uThru);alb=mix(alb,pr.rgb,pr.a);alb=mix(alb,vec3(0.45,0.29,0.13),smoothstep(0.12,0.55,sc)*0.85);alb=mix(alb,vec3(0.06,0.045,0.04),smoothstep(0.55,0.9,sc));alb=mix(alb,vec3(0.99,0.985,0.96),fx.b*0.85);vec3 key=vec3(1.0,0.965,0.9),amb=vec3(0.62,0.64,0.7);vec3 warm=vec3(1.0,0.9,0.74);vec3 base=amb*0.3*ao+key*1.04*wrap*mix(1.0,ao,0.7)*mix(1.0,0.55,uLamp);float spot=wrapP*pool*mix(1.0,ao,0.5);vec3 col=alb*(base+warm*spot*max(vec3(0.0),vec3(1.15)-base));col+=key*0.03*pow(max(dot(n,normalize(L+V)),0.0),24.0)*(1.0-0.5*uLamp);col+=warm*0.06*pow(max(dot(n,normalize(Lp+V)),0.0),30.0)*pool;float rim=(1.0-smoothstep(0.42,0.66,pres))*smoothstep(0.6,0.95,sc);float fl=0.55+0.45*sin(uTime*6.0+vUv.x*37.0+vUv.y*23.0)*sin(uTime*2.3+vUv.y*51.0);col+=vec3(1.0,0.42,0.08)*rim*fl*(1.7+1.6*uDestroy);frag=vec4(col*a,a);}`, en = `#version 300 es
in vec2 aQ;uniform vec3 uC;uniform vec2 uHS;uniform float uSoft;uniform mat4 uProj;out vec2 vL;void main(){vL=aQ*(uHS+vec2(uSoft*3.0));gl_Position=uProj*vec4(uC+vec3(vL,0.0),1.0);}`, tn = `#version 300 es
precision highp float;in vec2 vL;uniform vec2 uHS;uniform float uR,uSoft,uA,uOpen,uFront,uFlip;uniform sampler2D uFx;out vec4 frag;float paperAt(vec2 uv){vec4 fx=texture(uFx,clamp(uv,0.0,1.0));return uFront>-0.5?min(fx.r,smoothstep(uFront-0.004,uFront+0.012,fx.a*1.4)):fx.r;}void main(){vec2 q=abs(vL)-uHS+vec2(uR);float d=length(max(q,0.0))+min(max(q.x,q.y),0.0)-uR;float pres=1.0;if(uOpen>0.0){vec2 uv=vL/(2.0*uHS)+0.5,o=vec2(uSoft)/(2.0*uHS);if(uFlip>0.5)uv.x=1.0-uv.x;float p=paperAt(uv)*2.0+paperAt(uv+vec2(o.x,0.0))+paperAt(uv-vec2(o.x,0.0))+paperAt(uv+vec2(0.0,o.y))+paperAt(uv-vec2(0.0,o.y));pres=mix(1.0,p/6.0,uOpen);}frag=vec4(0.0,0.0,0.0,uA*pres*(1.0-smoothstep(-uSoft,uSoft*2.5,d)));}`, nn = `#version 300 es
in vec3 aP;in vec4 aC;in float aS;uniform mat4 uProj;uniform float uPx;out vec4 vC;void main(){gl_Position=uProj*vec4(aP,1.0);gl_PointSize=max(1.0,aS*uPx/gl_Position.w);vC=aC;}`, on = `#version 300 es
precision highp float;in vec4 vC;out vec4 frag;void main(){float a=smoothstep(0.5,0.05,length(gl_PointCoord-0.5))*vC.a;frag=vec4(vC.rgb*a,a);}`;

// .build/sound.js
var le = /* @__PURE__ */ (() => {
  let e = null, n = null, t = null, s = null, o = de.get("sound", !1), r = {}, a = {}, l = () => {
    if (!e) {
      let h = window.AudioContext || window.webkitAudioContext;
      if (!h) return null;
      e = new h(), n = e.createGain(), n.gain.value = 0.6;
      let E = e.createBiquadFilter();
      E.type = "peaking", E.frequency.value = 420, E.Q.value = 2.4, E.gain.value = 3.5, n.connect(E), E.connect(e.destination), t = e.createBuffer(1, e.sampleRate, e.sampleRate);
      let m = t.getChannelData(0), b = 0, y = 0;
      for (let w = 0; w < m.length; w++) {
        let i = Math.random() * 2 - 1;
        b = 0.99 * b + i * 0.05, y = 0.95 * y + i * 0.1, m[w] = (b + y + i * 0.15) * 1.6;
      }
    }
    return e.state === "suspended" && e.resume(), e;
  };
  function f() {
    return s || !e || (s = Promise.all(Object.entries(r).map(([h, E]) => fetch(E).then((m) => m.ok ? m.arrayBuffer() : Promise.reject(new Error(h))).then((m) => e.decodeAudioData(m)).then((m) => {
      a[h] = m;
    }).catch(() => {
    })))), s;
  }
  function u(h, E, m = {}) {
    let b = a[h];
    if (!b) return !1;
    let y = e.createBufferSource();
    y.buffer = b, y.playbackRate.value = m.rate || 1;
    let w = e.createGain();
    return w.gain.value = m.gain ?? 1, y.connect(w), w.connect(n), y.start(E, m.offset || 0, m.dur), !0;
  }
  function c(h, E, m, b, y) {
    let w = e.createBufferSource();
    w.buffer = t;
    let i = e.createBiquadFilter();
    i.type = "bandpass", i.frequency.value = m, i.Q.value = b;
    let M = e.createGain();
    M.gain.setValueAtTime(1e-4, h), M.gain.linearRampToValueAtTime(y, h + 2e-3), M.gain.exponentialRampToValueAtTime(1e-4, h + E), w.connect(i), i.connect(M), M.connect(n), w.start(h, Math.random() * 0.9, E + 0.03);
  }
  function d(h, E, m, b, y) {
    let w = e.createBufferSource();
    w.buffer = t, w.loop = !0;
    let i = e.createBiquadFilter();
    i.type = "bandpass", i.Q.value = 0.8, i.frequency.setValueAtTime(m, h), i.frequency.linearRampToValueAtTime(b, h + E);
    let M = e.createGain();
    M.gain.setValueAtTime(1e-4, h), M.gain.linearRampToValueAtTime(y, h + E * 0.15), M.gain.linearRampToValueAtTime(1e-4, h + E), w.connect(i), i.connect(M), M.connect(n), w.start(h), w.stop(h + E + 0.05);
  }
  function g(h, E, m, b, y, w) {
    let i = Math.round(E * m);
    for (let M = 0; M < i; M++) {
      let C = Math.random();
      w && (C = C * C), c(h + C * E, 6e-3 + Math.random() * 0.03, 1500 + Math.random() * 4500 * b, 0.7 + Math.random() * 2.2, y * (0.25 + Math.random() * 0.75));
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
      r = { ...h }, s = null, o && e && f();
    },
    // names: crumple, uncrumple, flip, tear, seal, fire, grain
    play(h, E = 1, m = 0) {
      if (!o || !l()) return;
      f();
      let b = e.currentTime + m, y = (w) => !!a[w];
      if (h === "crumple")
        if (y("crumple")) {
          let w = Math.max(2, Math.round(E * 4));
          for (let i = 0; i < w; i++) u("crumple", b + i / w * E * 0.85, { gain: 0.6 + Math.random() * 0.35, rate: 0.85 + Math.random() * 0.35 });
          g(b, E, 25, 1, 0.1, !0);
        } else
          g(b, E, 90, 1, 0.32, !0), d(b, E, 2400, 1200, 0.07);
      else if (h === "uncrumple")
        if (y("sheet")) {
          let w = Math.max(2, Math.round(E * 2.5));
          for (let i = 0; i < w; i++) u(i % 2 && y("crumple") ? "crumple" : "sheet", b + i / w * E * 0.9, { gain: 0.4 + Math.random() * 0.25, rate: 0.75 + Math.random() * 0.25 });
        } else
          g(b, E, 46, 0.8, 0.26, !1), d(b, E, 1400, 2600, 0.05);
      else h === "flip" ? u("sheet", b, { gain: 0.8, rate: 1.15 }) || (d(b, 0.38, 500, 2400, 0.16), c(b + 0.34, 0.05, 900, 1, 0.22)) : h === "tear" ? u("tear", b, { gain: 1 }) || (d(b, 0.45, 1800, 3600, 0.18), g(b, 0.45, 160, 1.2, 0.3, !1)) : h === "seal" ? (u("tear", b, { gain: 0.45, rate: 1.7, dur: 0.16 }) || c(b, 0.05, 1200, 2, 0.3), u("sheet", b + 0.2, { gain: 0.5, rate: 0.9 }) || d(b + 0.2, 0.5, 700, 2200, 0.08)) : h === "fire" ? (g(b, E, 22, 0.45, 0.16, !1), d(b, E, 500, 800, 0.05)) : h === "grain" && (u("crumple", b, { gain: 0.22, rate: 1.2 + Math.random() * 0.4, offset: Math.random() * 0.3, dur: 0.08 }) || g(b, 0.06, 60, 1, 0.2, !1));
    }
  };
})();

// .build/motion.js
function ue(e, n, t, s, o = ge, r = 0, a) {
  e.tw = e.tw.filter((l) => l.key !== n), e.tw.push({ key: n, to: t, dur: Math.max(1e-3, s), ease: o, start: performance.now() + r * 1e3, from: null, done: a });
}
function yt(e, n) {
  let t = !1, s = [];
  return e.tw = e.tw.filter((o) => {
    if (t = !0, n < o.start) return !0;
    o.from === null && (o.from = e[o.key]);
    let r = j((n - o.start) / (o.dur * 1e3));
    return e[o.key] = o.from + (o.to - o.from) * o.ease(r), r >= 1 ? (o.done && s.push(o.done), !1) : !0;
  }), s.forEach((o) => o()), t;
}
function Qe(e) {
  if (e.cfg.type === "envelope") return 0.34;
  let n = e.F.shape;
  return n === 0 ? 0.42 : n === 2 ? 0.35 : 0.3;
}
function et(e, n) {
  let t = fe(j(n));
  return 2 * Math.max(e.F.ext[0] / 2 + (e.half[0] - e.F.ext[0] / 2) * t, e.F.ext[1] / 2 + (e.half[1] - e.F.ext[1] / 2) * t);
}
function rn(e, n) {
  let t = fe(j(e.cfg.type === "envelope" ? n * 2 : n)), s = [0, 0, -0.02];
  return e.pose.map((o, r) => o * (1 - t) + s[r] * t);
}
function qe(e, n, t) {
  let s = (w, i = 0) => n.destroy !== void 0 ? n.destroy : w.front0 > -0.5 ? w.front0 + w.burned + i : -1, o = n.destroy !== void 0 ? j((1.25 - n.destroy) / 0.9) : 1;
  if (e.cfg.type !== "envelope") {
    let w = { ...t, p: n.p, f: n.f, tear: n.tear, front: s(e, n.burnOpen || 0), destroy: n.destroy !== void 0, alpha: o };
    return { items: [{ P: e, st: w }], shadow: { P: e, st: w }, active: { P: e, st: w } };
  }
  let r = e.letter, a = n.p, l = fe(j(a / 0.24)), f = fe(j((a - 0.14) / 0.36)), u = fe(j((a - 0.44) / 0.32)), c = j((a - 0.58) / 0.42), d = { ...t, p: l, f: n.f, tear: 0, cy: t.cy - u * t.vhU * 0.8, rot: [t.rot[0], t.rot[1], t.rot[2] + u * 0.45], front: s(e) }, g = -0.08 + f * 0.5, h = -0.035 * (1 - u), E = Math.PI * De(j(n.f)), m = [0, 0, -0.02], b = { ...t, cx: Ke(d.cx, 0, u), cy: Ke(d.cy, 0, u), sc: Ke(d.sc, t.scLetter, u), rot: d.rot.map((w, i) => Ke(w, m[i] + (t.adjust ? t.adjust[i] : 0), u)), local: [-Math.sin(E) * h, g * (1 - u), Math.cos(E) * h], p: Lt(c), f: n.f, tear: 0, front: s(r, n.burnOpen || 0), destroy: n.destroy !== void 0, alpha: o };
  return { items: u >= 0.999 ? [{ P: r, st: b }] : a < 0.01 ? [{ P: e, st: d }] : [{ P: e, st: d }, { P: r, st: b }], shadow: u < 0.5 ? { P: e, st: d } : { P: r, st: b }, active: u < 0.5 ? { P: e, st: d } : { P: r, st: b } };
}
function tt(e, n, t, s, o, r = 0, a = 0) {
  let l = fe(j(n.p)), f = (e.F.ext[0] / 2 + (e.half[0] - e.F.ext[0] / 2) * l) * n.sc * t * 1.1, u = (e.F.ext[1] / 2 + (e.half[1] - e.F.ext[1] / 2) * l) * n.sc * t * 1.1, c = r + s / 2 + n.cx * t, d = a + o / 2 - n.cy * t;
  return { cx: c, cy: d, x0: c - f, x1: c + f, y0: d - u, y1: d + u, w1: e.half[0] * 2 * n.sc * t, h1: e.half[1] * 2 * n.sc * t };
}
function vt(e, n, t, s) {
  let { P: o, st: r } = t.active, a = n.p - (n.pPrev ?? n.p), l = fe(j(r.p)), f = (o.F.ext[0] / 2 + (o.half[0] - o.F.ext[0] / 2) * l) * r.sc, u = (o.F.ext[1] / 2 + (o.half[1] - o.F.ext[1] / 2) * l) * r.sc;
  if (a > 5e-4 && n.p > 0.12 && n.p < 0.97) {
    let d = Math.min(8, Math.round(a * 300));
    for (let g = 0; g < d; g++) e.emit({ x: r.cx + (Math.random() - 0.5) * 2 * f, y: r.cy + (Math.random() - 0.5) * 2 * u, z: 0.06 * r.sc, vx: (Math.random() - 0.5) * 0.05 * r.sc, vy: (Math.random() * 0.04 + 0.01) * r.sc, ay: -0.01 * r.sc, r: 0.93, g: 0.9, b: 0.84, a: 0.5, s: (5e-3 + Math.random() * 8e-3) * r.sc, t: 0, life: 1.2 + Math.random() * 0.9 });
  }
  let c = r.front;
  if (c > -0.5 && o.burnPts && r.p > 0.9) {
    let d = n.destroy !== void 0;
    n.acc = (n.acc || 0) + s * (d ? 110 : 9);
    let g = o.burnPts, h = g.length / 3, E = Math.cos(r.rot[2]), m = Math.sin(r.rot[2]);
    for (; n.acc >= 1; ) {
      n.acc -= 1;
      let b = -1;
      for (let C = 0; C < 40; C++) {
        let N = Math.floor(Math.random() * h);
        if (Math.abs(g[N * 3 + 2] - c) < 0.012) {
          b = N;
          break;
        }
      }
      if (b < 0) continue;
      let y = (g[b * 3] - 0.5) * o.w * r.sc, w = (g[b * 3 + 1] - 0.5) * o.h * r.sc, i = r.cx + E * y - m * w, M = r.cy + m * y + E * w;
      e.emit({ x: i, y: M, z: 0.02 * r.sc, vx: (Math.random() - 0.5) * 0.08 * r.sc, vy: (0.06 + Math.random() * 0.1) * r.sc, ay: 0.06 * r.sc, r: 1, g: 0.5 + Math.random() * 0.3, b: 0.12, a: 1, s: (3e-3 + Math.random() * 5e-3) * r.sc, t: 0, life: 0.5 + Math.random() * 0.8, flicker: !0 }), d && Math.random() < 0.45 && e.emit({ x: i, y: M, z: 0.02 * r.sc, vx: (Math.random() - 0.5) * 0.06 * r.sc, vy: -(0.02 + Math.random() * 0.05) * r.sc, ay: -0.05 * r.sc, r: 0.2, g: 0.19, b: 0.18, a: 0.85, s: (8e-3 + Math.random() * 0.012) * r.sc, t: 0, life: 1.4 + Math.random() * 1.1 });
    }
  }
}
function Et(e, n) {
  let t = /* @__PURE__ */ new Map(), s = [], o = null, r = () => {
    let [u, c] = [...t.values()];
    return Math.hypot(u.x - c.x, u.y - c.y);
  }, a = (u) => {
    let c = n.active();
    if (!c) return;
    let d = n.box();
    if (!(d && u.clientX > d.x0 && u.clientX < d.x1 && u.clientY > d.y0 && u.clientY < d.y1) && !t.size) {
      n.outside(u);
      return;
    }
    if (!t.size && n.tap && n.tap(u)) return;
    t.set(u.pointerId, { x: u.clientX, y: u.clientY });
    try {
      e.setPointerCapture(u.pointerId);
    } catch {
    }
    c.tw = c.tw.filter((E) => E.key !== "p");
    let h = performance.now();
    t.size === 2 ? o = { pinch: !0, d0: r(), p0: c.p, moved: !0, last: c.p, box: d, tLast: h, lastX: u.clientX, lastY: u.clientY, vx: 0, vy: 0 } : o = { pinch: !1, r0: Math.hypot(u.clientX - d.cx, u.clientY - d.cy), p0: c.p, x: u.clientX, y: u.clientY, moved: !1, last: c.p, box: d, tLast: h, lastX: u.clientX, lastY: u.clientY, vx: 0, vy: 0 };
  }, l = (u) => {
    if (!o || !t.has(u.pointerId)) return;
    t.set(u.pointerId, { x: u.clientX, y: u.clientY });
    let c = n.active();
    if (!c) {
      o = null, t.clear();
      return;
    }
    let d = performance.now(), g = d - o.tLast;
    g > 8 && (o.vx = (u.clientX - o.lastX) / g, o.vy = (u.clientY - o.lastY) / g, o.tLast = d, o.lastX = u.clientX, o.lastY = u.clientY);
    let h = 0.42 * Math.min(o.box.w1, o.box.h1);
    if (o.pinch && t.size === 2) c.p = j(o.p0 + (r() - o.d0) / h);
    else if (!o.pinch) {
      if (Math.hypot(u.clientX - o.x, u.clientY - o.y) > 6 && (o.moved = !0), !o.moved) return;
      c.p = j(o.p0 + (Math.hypot(u.clientX - o.box.cx, u.clientY - o.box.cy) - o.r0) / h);
    }
    Math.abs(c.p - o.last) > 0.035 && (le.play("grain"), o.last = c.p), c.dragging = !0, n.redraw();
  }, f = (u) => {
    if (!t.has(u.pointerId)) return;
    if (t.delete(u.pointerId), t.size === 1 && o) {
      let m = [...t.values()][0], b = n.box ? n.box() : o.box;
      o.pinch = !1, o.x = m.x, o.y = m.y, o.r0 = Math.hypot(m.x - (b ? b.cx : o.x), m.y - (b ? b.cy : o.y)), o.p0 = n.active() ? n.active().p : o.p0;
      return;
    }
    if (t.size) return;
    let c = n.active(), d = o && o.moved, g = o ? o.p0 : 0, h = o && o.vx || 0, E = o && o.vy || 0;
    if (o = null, !!c) {
      if (c.dragging = !1, n.flip && g > 0.85 && Math.abs(h) > 0.2 && Math.abs(h) > 1.5 * Math.abs(E)) {
        c.p = 1, n.flip();
        return;
      }
      if (n.outside && E > 0.75) {
        n.outside(u);
        return;
      }
      d && (c.p >= 0.3 ? (le.play("uncrumple", 0.4), ue(c, "p", 1, 0.45 * (1 - c.p) + 0.15, Be, 0, () => Xe(12))) : (le.play("crumple", 0.35), ue(c, "p", 0, 0.35 * c.p + 0.12, Be, 0, () => Xe(18))), n.redraw());
    }
  };
  return [["pointerdown", a], ["pointermove", l], ["pointerup", f], ["pointercancel", f]].forEach(([u, c]) => te(s, e, u, c)), () => s.splice(0).forEach((u) => u());
}
function nt(e, n, t, s, o, r, a) {
  let l = [(n - s / 2) / r, -(t - o / 2) / r, 0.09 * o / r];
  e.lampPos || (e.lampPos = l.slice()), e.lampGoal = l, e.lampOn = a ? 1 : 0, e.lampMoving = !0;
}
function Tt(e, n) {
  if (!e.lampGoal) return !1;
  let t = 1 - Math.exp(-n * 20), s = 1 - Math.exp(-n * 7), o = !1;
  for (let a = 0; a < 3; a++) {
    let l = e.lampGoal[a] - e.lampPos[a];
    Math.abs(l) > 1e-4 && (o = !0), e.lampPos[a] += l * t;
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
}, Ie = 30 * Math.PI / 180, Ce = 10, He = [-0.45, 0.62, 0.65];
function Jn(e, n) {
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
  if (e === "accordion") return { shape: 7, k0: 0, squash: 1, roll: 0, A0: 8e-3, Ares: 35e-4, ext: [n.w / 4 * 1.08, n.h * 1.02] };
  if (e === "triangle") return { shape: 8, k0: 0, squash: 1, roll: 0, A0: 8e-3, Ares: 35e-4, ext: [t * 1.08, s * 1.08] };
  let r = 0.95 * Math.PI / o, a = 1 / r;
  return { shape: 0, k0: r, squash: 1, roll: 0, A0: n.card ? 0.07 : 0.12, Ares: 45e-4, ext: [2 * (a + 0.06), 2 * (a + 0.06)] };
}
var Wn = (e) => e.states.includes("burnt") || e.burnAfterReading ? "burn" : e.states.includes("singed") ? "singed" : null, an = { corner: [0.3, 0.06], edge: [0.035, 0.01], center: [0.09, 0.03], spots: [0.035, 0.01] };
function ot(e, n = {}) {
  let t = e.getContext("webgl2", { alpha: !0, premultipliedAlpha: !0, antialias: !0 });
  if (!t) return null;
  let s, o, r, a, l, f, u, c = !1, d = !1, g = (S, T) => {
    let A = (q, V) => {
      let $ = t.createShader(q);
      if (t.shaderSource($, V), t.compileShader($), !t.getShaderParameter($, t.COMPILE_STATUS)) throw new Error(t.getShaderInfoLog($));
      return $;
    }, _ = t.createProgram();
    if (t.attachShader(_, A(t.VERTEX_SHADER, S)), t.attachShader(_, A(t.FRAGMENT_SHADER, T)), t.linkProgram(_), !t.getProgramParameter(_, t.LINK_STATUS)) throw new Error(t.getProgramInfoLog(_));
    let I = {}, L = t.getProgramParameter(_, t.ACTIVE_UNIFORMS);
    for (let q = 0; q < L; q++) {
      let V = t.getActiveUniform(_, q);
      I[V.name] = t.getUniformLocation(_, V.name);
    }
    return { p: _, u: I };
  };
  function h() {
    s = g(Zt, Qt), o = g(en, tn), r = g(nn, on), a = t.createVertexArray(), t.bindVertexArray(a), l = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, l), t.bufferData(t.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), t.STATIC_DRAW);
    let S = t.getAttribLocation(o.p, "aQ");
    t.enableVertexAttribArray(S), t.vertexAttribPointer(S, 2, t.FLOAT, !1, 0, 0), t.bindVertexArray(null), f = t.createVertexArray(), u = t.createBuffer(), t.bindVertexArray(f), t.bindBuffer(t.ARRAY_BUFFER, u), t.bufferData(t.ARRAY_BUFFER, 420 * 32, t.DYNAMIC_DRAW), [["aP", 3, 0], ["aC", 4, 12], ["aS", 1, 28]].forEach(([T, A, _]) => {
      let I = t.getAttribLocation(r.p, T);
      t.enableVertexAttribArray(I), t.vertexAttribPointer(I, A, t.FLOAT, !1, 32, _);
    }), t.bindVertexArray(null);
  }
  h();
  let E = (S) => {
    S.preventDefault(), c = !0;
  }, m = () => {
    c = !1, h(), w = null, i = null, z = null, ae = null, H = null, n.onRestore && n.onRestore();
  };
  e.addEventListener("webglcontextlost", E), e.addEventListener("webglcontextrestored", m);
  function b(S, T, A, _, I, L, q) {
    let V = [];
    for (let Y = 0; Y <= _; Y++) V.push(S + (T - S) * Y / _);
    L.forEach((Y) => {
      Y > S + 1e-6 && Y < T - 1e-6 && V.push(Y);
    }), V.sort((Y, re) => Y - re);
    let $ = [];
    for (let Y = 0; Y <= I; Y++) $.push(-A + 2 * A * Y / I);
    q.forEach((Y) => {
      Y > -A + 1e-6 && Y < A - 1e-6 && !$.some((re) => Math.abs(re - Y) < 1e-6) && $.push(Y);
    }), $.sort((Y, re) => Y - re);
    let K = V.length, B = $.length, W = new Float32Array(K * B * 2), X = 0;
    for (let Y = 0; Y < B; Y++) for (let re = 0; re < K; re++)
      W[X++] = V[re], W[X++] = $[Y];
    let ee = new Uint16Array((K - 1) * (B - 1) * 6);
    X = 0;
    for (let Y = 0; Y < B - 1; Y++) for (let re = 0; re < K - 1; re++) {
      let we = Y * K + re, Ve = we + 1, Oe = we + K, p = Oe + 1;
      ee[X++] = we, ee[X++] = Ve, ee[X++] = p, ee[X++] = we, ee[X++] = p, ee[X++] = Oe;
    }
    let ce = t.createVertexArray();
    t.bindVertexArray(ce);
    let Z = t.createBuffer();
    t.bindBuffer(t.ARRAY_BUFFER, Z), t.bufferData(t.ARRAY_BUFFER, W, t.STATIC_DRAW);
    let Te = t.getAttribLocation(s.p, "aXY");
    t.enableVertexAttribArray(Te), t.vertexAttribPointer(Te, 2, t.FLOAT, !1, 0, 0);
    let pe = t.createBuffer();
    return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, pe), t.bufferData(t.ELEMENT_ARRAY_BUFFER, ee, t.STATIC_DRAW), t.bindVertexArray(null), { vao: ce, count: ee.length, bufs: [Z, pe] };
  }
  function y(S, T) {
    let A = t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, A), T.float ? (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1), t.texImage2D(t.TEXTURE_2D, 0, t.RG16F, T.w, T.h, 0, t.RG, t.FLOAT, S)) : (t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, S), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !1)), T.mip ? (t.generateMipmap(t.TEXTURE_2D), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR)) : t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), A;
  }
  let w = null, i = null, M = (S) => {
    let T = t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, T), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(S)), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), T;
  }, C = () => w || (w = M([0, 0, 0, 0])), N = () => i || (i = M([255, 0, 0, 255])), F = (S) => {
    S && S !== w && S !== i && t.deleteTexture(S);
  }, z = null, ae = null;
  function ne() {
    return z || (z = M([240, 240, 240, 255]), ae = Ge("grain").then((S) => {
      !S || d || (t.bindTexture(t.TEXTURE_2D, z), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, S), t.generateMipmap(t.TEXTURE_2D), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR_MIPMAP_LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.REPEAT), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.REPEAT));
    }), z);
  }
  async function k(S) {
    let T = We(S), A = ke[T.type];
    ne();
    let _ = T.type === "envelope" ? k({ id: T.id + "-letter", type: T.letter, shape: "thirds", text: T.text, back: T.back, states: T.states.filter((U) => U !== "torn"), seed: T.seed + 1, hiddenInk: T.hiddenInk, burn: T.burn, burnAfterReading: T.burnAfterReading, stamp: T.stamp }) : null;
    await Vt([A.font, "Caveat", "Courier Prime", "Special Elite"]);
    let I = A.w / 2, L = A.h / 2, q = Jn(T.shape, A), V = Math.round(512 * A.w / 0.84), $ = Math.round(V * A.h / A.w), K = de.get("opens." + T.id, 0), B = Q(T.seed * 7 + 1), W = A.stub ? I - A.w * A.stub : null, X = A.body ? -L + A.body : 0, ee = Math.max(16, Math.round(Math.sqrt(15e3 * A.w / A.h))), ce = Math.max(16, Math.round(ee * A.h / A.w)), Z = [0], Te = [0, -A.h / 6 * 1.08, A.h / 6, X];
    T.shape === "accordion" && Z.push(-A.w / 6, A.w / 6);
    let pe = [];
    if (W !== null) {
      let U = Math.round(ee * (W + I) / A.w);
      pe.push(b(-I, W, L, U, ce, Z, Te)), pe.push(b(W, I, L, ee - U, ce, Z, Te));
    } else pe.push(b(-I, I, L, ee, ce, Z, Te));
    let Y = !(T.back || T.type === "notebook" || T.type === "form" || T.type === "envelope" || T.type === "newspaper" || T.type === "postcard" || T.type === "blueprint" || ["coffee", "water", "prints", "aged", "wine", "ink", "foxing", "faded", "staple", "grease", "dogear", "damp"].some((U) => T.states.includes(U))), re = Wn(T), we = !(T.type === "notebook" || T.type === "form" || T.type === "envelope" || T.type === "punchcard" || T.type === "parchment" || T.states.includes("torn") || re), [Ve, Oe, p, v] = await Promise.all([
      mt.run("creases", [{ seed: T.seed, shape: T.shape, w: A.w, h: A.h, card: !!A.card, foldY: X, states: T.states }, V, $]),
      Ze(T, A, "front", K),
      Y ? null : Ze(T, A, "back", K),
      we ? null : Nt(T, A, re)
    ]), R = Wt(T, V, $), P = new Float32Array(V * $ * 2);
    for (let U = 0; U < V * $; U++)
      P[U * 2] = Ve[U], P[U * 2 + 1] = R ? R[U] : 0;
    let O = q.shape === 1 || q.shape === 2, x = {
      cfg: T,
      T: A,
      w: A.w,
      h: A.h,
      half: [I, L],
      F: q,
      stubX: W,
      foldY: X,
      meshes: pe,
      openings: K,
      tH: y(P, { float: !0, w: V, h: $ }),
      tPF: y(Oe, { mip: !0 }),
      tPB: Y ? C() : y(p, { mip: !0 }),
      tFx: we ? N() : y(v.canvas, {}),
      burnPts: we ? null : v.burnPts,
      // which burn field the effects hold: 'burn' (sparks, can burn away), 'singed' (rim only) or 'none' (ensureBurn adds one)
      fxBurn: re || "none",
      backEmpty: Y,
      // estimated texture memory (front and back with mipmaps, effects, creases in RG16F)
      bytes: Math.round(Oe.width * Oe.height * 4 * 1.33 * (Y ? 1 : 2) + (we ? 0 : v.canvas.width * v.canvas.height * 4) + V * $ * 4),
      // folded and elongated papers stay almost facing the camera; crumpled ones may spin freely
      pose: q.shape >= 3 ? [-0.22 + B() * 0.18, -0.2 + B() * 0.4, -0.45 + B() * 0.9] : O ? [-0.15 + B() * 0.15, -0.15 + B() * 0.3, -0.6 + B() * 1.2] : [-0.3 + B() * 0.25, -0.35 + B() * 0.7, B() * 6.28],
      seedA: B() * 6.28,
      // a singed rim holds its front just under the lowest value of its field: only the scorch band shows
      front0: T.states.includes("burnt") ? an[T.burn][0] + an[T.burn][1] * B() : re === "singed" ? v.lo - 0.012 : -1,
      burned: de.get("burned." + T.id, 0),
      age: T.states.includes("aged") ? 1 : 0,
      torn: !1
    };
    return x.extent = Math.max(q.ext[0], q.ext[1]), x.hasRedaction = /\[\[/.test(T.text + T.back), _ && (x.letter = await _), await ae, x;
  }
  async function D(S) {
    S.openings = de.get("opens." + S.cfg.id, 0);
    let [T, A] = await Promise.all([Ze(S.cfg, S.T, "front", S.openings), S.backEmpty ? null : Ze(S.cfg, S.T, "back", S.openings)]);
    F(S.tPF), F(S.tPB), S.tPF = y(T, { mip: !0 }), S.tPB = A ? y(A, { mip: !0 }) : C();
  }
  function G(S) {
    return S.fxBurn === "burn" ? Promise.resolve() : (S.burnJob || (S.burnJob = Nt(S.cfg, S.T, "burn").then((T) => {
      if (S.released) return;
      let A = S.tFx;
      A === i && (S.bytes += T.canvas.width * T.canvas.height * 4), S.tFx = y(T.canvas, {}), F(A), S.burnPts = T.burnPts, S.fxBurn = "burn";
    })), S.burnJob);
  }
  async function J(S) {
    await Promise.all([G(S), S.letter && G(S.letter)]);
  }
  function oe(S) {
    S.released = !0, [S.tH, S.tPF, S.tPB, S.tFx].forEach(F), S.meshes.forEach((T) => {
      t.deleteVertexArray(T.vao), T.bufs.forEach((A) => t.deleteBuffer(A));
    }), S.letter && oe(S.letter);
  }
  function me(S, T, A) {
    let _ = T.f || 0, I = ve.mul(ve.T(T.cx, T.cy, (T.zoff || 0) * T.sc + 0.12 * T.sc * Math.sin(Math.PI * _)), ve.S(T.sc));
    I = ve.mul(I, ve.RZ(T.rot[2])), I = ve.mul(I, ve.RX(T.rot[0])), I = ve.mul(I, ve.RY(T.rot[1] + Math.PI * De(j(_)))), T.local && (I = ve.mul(I, ve.T(T.local[0], T.local[1], T.local[2])));
    let L = s.u;
    t.useProgram(s.p), [[S.tH, "uH"], [S.tPF, "uPrintF"], [S.tPB, "uPrintB"], [S.tFx, "uFx"]].forEach(([K, B], W) => {
      t.activeTexture(t.TEXTURE0 + W), t.bindTexture(t.TEXTURE_2D, K), t.uniform1i(L[B], W);
    }), t.activeTexture(t.TEXTURE4), t.bindTexture(t.TEXTURE_2D, ne()), t.uniform1i(L.uGrain, 4), t.uniform2f(L.uGrainK, S.w * 5, S.h * 5);
    let q = T.L || He;
    t.uniform1i(L.uShape, S.F.shape), t.uniform1f(L.uP, j(T.p)), t.uniform1f(L.uK0, S.F.k0), t.uniform1f(L.uKres, 0.06), t.uniform1f(L.uA0, S.F.A0), t.uniform1f(L.uAres, S.F.Ares), t.uniform1f(L.uSeedA, S.seedA), t.uniform1f(L.uSquash, S.F.squash), t.uniform1f(L.uRoll, S.F.roll || 0.03), t.uniform1f(L.uCurl, 0.9 * Math.sin(Math.PI * j(_))), t.uniform1f(L.uStubX, S.stubX ?? 0), t.uniform1f(L.uFoldSide, S.T.stub ? -1 : 1), t.uniform1f(L.uFoldBw, S.T.card ? 0.03 : 0.016), t.uniform1f(L.uFoldY, S.foldY || 0), t.uniform1f(L.uThick, _ > 0.5 ? -6e-3 : 6e-3), t.uniform1f(L.uScale, T.sc), t.uniform1f(L.uBump, 1), t.uniform2f(L.uHalf, S.half[0], S.half[1]), t.uniform3f(L.uCam, 0, 0, Ce), t.uniform3f(L.uColor, S.T.color[0], S.T.color[1], S.T.color[2]), t.uniform3f(L.uL, q[0], q[1], q[2]), t.uniform1f(L.uAge, S.age), t.uniform1f(L.uThru, S.T.card ? 0 : 0.035), t.uniform1f(L.uTime, T.time || 0), t.uniform1f(L.uFront, T.front ?? -1), t.uniform1f(L.uDestroy, T.destroy ? 1 : 0), t.uniform1f(L.uInkMax, 24e-4 * T.sc);
    let V = T.lampPos || [0, 0, 10];
    t.uniform3f(L.uLampPos, V[0], V[1], V[2]), t.uniform1f(L.uLamp, T.lamp || 0), t.uniform1f(L.uLampR, T.lampR || 1), t.uniformMatrix4fv(L.uModel, !1, I), t.uniformMatrix4fv(L.uProj, !1, A), (S.T.card ? [1, 0] : [0]).forEach((K) => {
      t.uniform1f(L.uEdge, K), S.meshes.forEach((B, W) => {
        let X = W === 1;
        X && (S.torn || (T.tear || 0) >= 1) || (t.uniform1f(L.uIsStub, X ? 1 : 0), t.uniform1f(L.uTear, X && T.tear || 0), t.bindVertexArray(B.vao), t.drawElements(t.TRIANGLES, B.count, t.UNSIGNED_SHORT, 0));
      });
    });
  }
  function Ae(S, T, A) {
    t.useProgram(o.p), t.disable(t.DEPTH_TEST), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA);
    let _ = fe(j(T.p)), I = [S.F.ext[0] / 2 * T.sc, S.F.ext[1] / 2 * T.sc], L = [I[0] + (S.half[0] * T.sc - I[0]) * _, I[1] + (S.half[1] * T.sc - I[1]) * _], q = Math.min(Math.min(I[0], I[1]) * (1 - _) + 0.012 * T.sc * _, L[0], L[1]), V = (0.04 + 0.08 * T.lift + 0.04 * (1 - _)) * T.sc, $ = T.L || He, K = Math.hypot($[0], $[1]) || 1, B = (0.05 + 0.1 * T.lift) * T.sc * Math.min(1.6, K / Math.max(0.25, $[2]));
    t.uniform3f(o.u.uC, T.cx - $[0] / K * B, T.cy - $[1] / K * B, -0.25 * T.sc), t.uniform2f(o.u.uHS, L[0], L[1]), t.uniform1f(o.u.uR, q), t.uniform1f(o.u.uSoft, V), t.uniform1f(o.u.uA, (0.62 - 0.2 * T.lift) * (T.alpha ?? 1)), t.uniformMatrix4fv(o.u.uProj, !1, A), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, S.tFx), t.uniform1i(o.u.uFx, 0), t.uniform1f(o.u.uOpen, j((T.p - 0.85) / 0.15)), t.uniform1f(o.u.uFront, T.front ?? -1), t.uniform1f(o.u.uFlip, (T.f || 0) > 0.5 ? 1 : 0), t.bindVertexArray(a), t.drawArrays(t.TRIANGLE_STRIP, 0, 4);
  }
  function be(S, T, A, _ = e.width, I = e.height) {
    if (d || c) return;
    t.viewport(0, 0, _, I), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT);
    let L = ve.mul(ve.persp(Ie, _ / I, 0.1, 100), ve.T(0, 0, -Ce));
    if (T && (T.st.alpha ?? 1) > 0.01 && Ae(T.P, T.st, L), t.disable(t.BLEND), t.enable(t.DEPTH_TEST), S.forEach((q) => me(q.P, q.st, L)), A && A.n) {
      let q = A.buffer();
      t.useProgram(r.p), t.disable(t.DEPTH_TEST), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE_MINUS_SRC_ALPHA), t.uniformMatrix4fv(r.u.uProj, !1, L), t.uniform1f(r.u.uPx, I / (2 * Math.tan(Ie / 2))), t.bindVertexArray(f), t.bindBuffer(t.ARRAY_BUFFER, u), t.bufferSubData(t.ARRAY_BUFFER, 0, q), t.drawArrays(t.POINTS, 0, q.length / 8);
    }
  }
  let H = null;
  function Re() {
    t.deleteFramebuffer(H.fb), t.deleteRenderbuffer(H.rb), t.deleteTexture(H.t), H = null;
  }
  function Fe(S, T = !1, A = "image/png", _ = 256) {
    if (d || c) return "";
    let I = _;
    if (!H || H.S !== I) {
      H && Re();
      let X = t.createTexture();
      t.bindTexture(t.TEXTURE_2D, X), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA8, I, I, 0, t.RGBA, t.UNSIGNED_BYTE, null), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR);
      let ee = t.createRenderbuffer();
      t.bindRenderbuffer(t.RENDERBUFFER, ee), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_COMPONENT16, I, I);
      let ce = t.createFramebuffer();
      t.bindFramebuffer(t.FRAMEBUFFER, ce), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, X, 0), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.RENDERBUFFER, ee), H = { fb: ce, t: X, rb: ee, S: I, c: ye(I, I) };
    }
    t.bindFramebuffer(t.FRAMEBUFFER, H.fb);
    let L = I / (2 * Ce * Math.tan(Ie / 2)), q = T ? Qe(S) : 0, V = 0.9 * I / (et(S, q) * L), { items: $ } = qe(S, { p: q, f: 0, tear: 0, burnOpen: 0 }, { cx: 0, cy: 0, sc: V, scLetter: V, rot: rn(S, q), lift: 0, vhU: 1 });
    be($, null, null, I, I);
    let K = new Uint8Array(I * I * 4);
    t.readPixels(0, 0, I, I, t.RGBA, t.UNSIGNED_BYTE, K), t.bindFramebuffer(t.FRAMEBUFFER, null);
    let B = H.c.getContext("2d"), W = B.createImageData(I, I);
    for (let X = 0; X < I; X++) {
      let ee = (I - 1 - X) * I * 4, ce = X * I * 4;
      for (let Z = 0; Z < I * 4; Z += 4) {
        let Te = K[ee + Z + 3], pe = Te ? 255 / Te : 0;
        W.data[ce + Z] = Math.min(255, K[ee + Z] * pe), W.data[ce + Z + 1] = Math.min(255, K[ee + Z + 1] * pe), W.data[ce + Z + 2] = Math.min(255, K[ee + Z + 2] * pe), W.data[ce + Z + 3] = Te;
      }
    }
    return B.putImageData(W, 0, 0), H.c.toDataURL(A, 0.9);
  }
  function rt() {
    if (d) return;
    d = !0, e.removeEventListener("webglcontextlost", E), e.removeEventListener("webglcontextrestored", m), [s, o, r].forEach((T) => t.deleteProgram(T.p)), t.deleteVertexArray(a), t.deleteBuffer(l), t.deleteVertexArray(f), t.deleteBuffer(u), [w, i, z].forEach((T) => {
      T && t.deleteTexture(T);
    }), H && Re();
    let S = t.getExtension("WEBGL_lose_context");
    S && S.loseContext();
  }
  return { gl: t, build: k, refreshPrint: D, release: oe, draw: be, snapshot: Fe, ensureBurn: J, isLost: () => c, destroy: rt };
}

// .build/particles.js
function wt(e = 420) {
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
        let o = n[s], r = o.t / o.life, a = s * 8, l = o.a * Math.pow(Math.sin(Math.PI * Math.min(1, r)), 0.6);
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
var sn = {
  flip: "[ flip ]",
  tear: "[ tear stub ]",
  close: "[ close ]",
  hint: "drag to unfold",
  open: "Crumpled paper: open",
  back: "Back:"
}, St = /* @__PURE__ */ (() => {
  let e = { labels: sn, remember: !1, motion: "auto", flashlight: !0, maxBuilt: 3 }, n = !1, t, s = !1, o, r, a, l, f, u, c, d, g, h = null, E = null, m = [], b = /* @__PURE__ */ new WeakMap(), y = [], w = wt(), i = null, M = 0, C = (p) => p.replace(/\[\[[^\]\n]+\]\]/g, "redacted").replace(/~~[^~\n]+~~\{([^}\n]+)\}/g, "$1").replace(/~~([^~\n]+)~~/g, "$1").replace(/^# /gm, ""), N = 0.16, F = 0.9, z = 0.42, ae = 1.5, ne = 1;
  function k() {
    if (o) return;
    n = _e(e.motion);
    let p = document.createElement("style");
    p.textContent = ":root{--crumple-backdrop:rgba(6,5,4,.8);--crumple-ui-bg:rgba(14,13,12,.7);--crumple-ui-fg:#ebe5d6;--crumple-ui-border:rgba(235,229,214,.4);--crumple-ui-font:12px/1 'Courier Prime',ui-monospace,monospace;--crumple-accent:#f5c266}.crumple-scene{position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483640;pointer-events:none;display:none;transition:opacity .3s ease;touch-action:none}.crumple-backdrop{position:fixed;inset:0;z-index:2147483630;background:transparent;pointer-events:none;transition:background .7s ease}.crumple-backdrop.on{background:var(--crumple-backdrop)}.crumple-bar{position:fixed;z-index:2147483645;right:18px;top:16px;display:none;gap:8px}.crumple-bar.on{display:flex}.crumple-bar button,.crumple-fallback button{background:var(--crumple-ui-bg);border:1px solid var(--crumple-ui-border);color:var(--crumple-ui-fg);font:var(--crumple-ui-font);letter-spacing:.18em;padding:9px 12px;cursor:pointer}.crumple-bar button[hidden]{display:none}.crumple-hint{position:fixed;z-index:2147483645;left:50%;bottom:8vh;transform:translateX(-50%);font:var(--crumple-ui-font);font-size:13px;letter-spacing:.2em;color:var(--crumple-ui-fg);background:var(--crumple-ui-bg);padding:8px 14px;opacity:0;transition:opacity .5s;pointer-events:none}.crumple-hint.on{opacity:1}.crumple-trigger{display:inline-block;width:96px;height:96px;padding:0;border:0;background:none;cursor:pointer;-webkit-tap-highlight-color:transparent}.crumple-trigger img{width:100%;height:100%;display:block;filter:drop-shadow(2px 7px 6px rgba(0,0,0,.6))}.crumple-trigger:hover img,.crumple-trigger:focus-visible img{animation:crumple-wiggle .75s ease}.crumple-trigger:focus-visible{outline:2px solid var(--crumple-accent);outline-offset:4px;border-radius:50%}.crumple-trigger.active{visibility:hidden}.crumple-trigger.recrumple img{animation:crumple-squeeze .9s ease}@keyframes crumple-wiggle{0%{transform:none}22%{transform:rotate(-8deg) translateY(-4px)}50%{transform:rotate(6deg) translateY(-1px)}78%{transform:rotate(-2deg)}100%{transform:none}}@keyframes crumple-squeeze{0%{transform:scale(1.15)}30%{transform:scale(.7) rotate(-20deg)}60%{transform:scale(1.05) rotate(10deg)}100%{transform:none}}.crumple-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}.crumple-fallback{position:fixed;inset:0;z-index:2147483646;display:none;align-items:center;justify-content:center;background:var(--crumple-backdrop);padding:24px}.crumple-fallback.on{display:flex}.crumple-fallback .sheet{max-width:min(520px,90vw);max-height:86vh;overflow:auto;padding:36px 34px;box-shadow:0 18px 40px rgba(0,0,0,.6);white-space:pre-line;font-size:19px;line-height:1.6;color:#2a2219}.crumple-fallback .sheet img{display:block;max-width:100%;margin:0 auto 16px}.crumple-fallback button{position:fixed;right:18px;top:16px}.crumple-fallback del{color:#5b4d3e;text-decoration:line-through;text-decoration-thickness:2px}.crumple-fallback ins{text-decoration:none;color:#1d3a8c;font-family:Caveat,'Comic Sans MS',cursive;font-size:1.12em;padding:0 .12em}.crumple-fallback .crumple-h{display:block;font-weight:700;font-size:1.15em;margin:.2em 0}.crumple-fallback .crumple-redact{display:inline-block;height:.85em;vertical-align:-.08em;background:#1b1713;border-radius:2px;margin:0 .1em}body.crumple-open{overflow:hidden;touch-action:none}@media (prefers-reduced-motion:reduce){.crumple-trigger.recrumple img,.crumple-trigger:hover img{animation:none}}@media print{canvas.crumple-scene,.crumple-backdrop,.crumple-bar,.crumple-hint,.crumple-fallback{display:none !important}.crumple-sr{position:static !important;width:auto !important;height:auto !important;overflow:visible !important;clip:auto !important;white-space:pre-wrap !important;color:#000;font-family:monospace}}", document.head.appendChild(p), h = p;
    let v = e.labels;
    r = document.createElement("div"), r.className = "crumple-backdrop", o = document.createElement("canvas"), o.className = "crumple-scene", o.setAttribute("aria-hidden", "true"), d = document.createElement("div"), d.className = "crumple-sr", d.id = "crumple-content", d.setAttribute("aria-live", "polite"), a = document.createElement("div"), a.className = "crumple-bar", a.setAttribute("role", "dialog"), a.setAttribute("aria-modal", "true"), a.setAttribute("aria-describedby", "crumple-content"), a.tabIndex = -1, l = document.createElement("button"), l.type = "button", l.textContent = v.flip, f = document.createElement("button"), f.type = "button", f.textContent = v.tear, f.hidden = !0, u = document.createElement("button"), u.type = "button", u.textContent = v.close, a.append(d, f, l, u), c = document.createElement("div"), c.className = "crumple-hint", c.textContent = v.hint, g = document.createElement("div"), g.className = "crumple-fallback", g.setAttribute("role", "dialog"), g.setAttribute("aria-modal", "true"), document.body.append(r, o, a, c, g), te(y, u, "click", () => S()), te(y, l, "click", () => _()), te(y, f, "click", () => I()), te(y, window, "keydown", (R) => {
      if (!(R.ctrlKey || R.metaKey || R.altKey || Ve(R.target))) {
        if (g.classList.contains("on")) {
          R.key === "Escape" ? re() : R.key === "Tab" && we(R, g);
          return;
        }
        i && (R.key === "Tab" ? we(R, a) : R.key === "Escape" ? S() : (R.key === "f" || R.key === "F") && _());
      }
    }), te(y, window, "resize", () => {
      i && (G(), H());
    }), te(y, window, "pointermove", (R) => {
      if (!e.flashlight || !i || i.phase !== "open" || i.dragging || R.pointerType === "touch") return;
      let P = i.boxCache || me(), O = !!P && R.clientX > P.x0 - 30 && R.clientX < P.x1 + 30 && R.clientY > P.y0 - 30 && R.clientY < P.y1 + 30;
      nt(i, R.clientX, R.clientY, o.clientWidth, o.clientHeight, o.clientHeight / (2 * Ce * Math.tan(Ie / 2)), O), H();
    }), te(y, document, "mouseout", (R) => {
      i && !R.relatedTarget && (i.lampOn = 0, H());
    }), te(y, document, "visibilitychange", () => {
      document.hidden || H();
    }), te(y, o, "dblclick", () => _()), E = Je(), E && te(y, E, "change", () => {
      n = _e(e.motion);
    }), y.push(Et(o, {
      active: () => i && i.phase === "open" ? i : null,
      box: me,
      flip: () => _(),
      outside: () => S(),
      tap: (R) => {
        let P = Ae();
        return P && R.clientX > P.x0 && R.clientX < P.x1 && R.clientY > P.y0 && R.clientY < P.y1 ? (I(), !0) : !1;
      },
      redraw: () => H()
    }));
  }
  function D() {
    if (s) return t;
    s = !0, k();
    try {
      t = ot(o, { onRestore: ce });
    } catch {
      t = null;
    }
    return t;
  }
  function G() {
    let p = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(24e5 / Math.max(1, innerWidth * innerHeight))), v = Math.round(innerWidth * p), R = Math.round(innerHeight * p);
    (o.width !== v || o.height !== R) && (o.width = v, o.height = R);
  }
  function J(p) {
    let v = i.P, R = o.clientWidth, P = o.clientHeight, O = P / (2 * Ce * Math.tan(Ie / 2)), x = i.from, U = x.left + x.width / 2, se = x.top + x.height / 2, he = (U - R / 2) / O, Se = -(se - P / 2) / O, Ee = 0.9 * x.width / ((i.ext0 || v.extent) * O), Pe = v.cfg.type === "envelope", $e = Pe ? Math.min(0.5 * P / (v.T.body * O), 0.7 * R / (v.w * O)) : Math.min(0.86 * P / (v.h * O), 0.9 * R / (v.w * O)), Rt = v.letter, un = Rt ? Math.min(0.86 * P / (Rt.h * O), 0.9 * R / (Rt.w * O)) : $e, Ne = n ? 1 : i.tf, Ut = fe(j(Pe ? i.p * 2 : i.p)), fn = Math.hypot(he, Se), _t = (1 - Ne) * (1 - Ne), Bt = 2 * (1 - Ne) * Ne, cn = i.arc || 0.24, pn = _t * he + Bt * he * 0.5, Pt = _t * Se + Bt * (Se * 0.5 + cn * fn), at = v.F, dn = at.shape === 0 && at.squash > 0.5 ? 1 : at.shape === 1 || at.shape === 2 ? 0.8 : 0.45, hn = n ? 0 : fe(Ne) * dn, mn = [0.55, 1.15, 0.35], bn = [0, 0, -0.02], kt = v.pose.map((Me, Yt) => (Me + mn[Yt] * hn) * (1 - Ut) + bn[Yt] * Ut), At = Ee + ($e - Ee) * Math.pow(Ne, 1.25), zt = 0.9 * x.width / O, Gt = i.pre ?? 1, je = i.bounce ?? 1, it = i.settle ?? 1;
    if (Gt < 1) {
      let Me = Math.sin(Math.PI * Gt);
      At *= 1 + 0.12 * Me, Pt += Me * 0.16 * zt;
    }
    if (je < 1) {
      let Me = (1 - je) * (1 - je);
      Pt += Math.abs(Math.sin(2 * Math.PI * je)) * Me * 0.4 * zt, kt[2] += 0.18 * Math.sin(2 * Math.PI * je) * Me;
    }
    let It = it < 1 ? Math.sin(Math.PI * 2.5 * it) * (1 - it) * (1 - it) : 0, Xt = [0.05 * It, 0.022 * It, 0];
    for (let Me = 0; Me < 3; Me++) kt[Me] += Xt[Me];
    return At *= 1 + 0.01 * It, { cx: pn, cy: Pt, sc: At, scLetter: un, rot: kt, adjust: Xt, lift: Math.sin(Math.PI * Ne), time: p / 1e3, ppu: O, vw: R, vh: P, vhU: P / O, L: He, lampPos: i.lampPos, lamp: i.lamp || 0, lampR: 0.3 * P / O };
  }
  function oe(p = performance.now()) {
    let v = J(p);
    return { b: v, scene: qe(i.P, i, v) };
  }
  function me() {
    if (!i) return null;
    let { b: p, scene: v } = oe();
    return tt(v.active.P, v.active.st, p.ppu, p.vw, p.vh);
  }
  function Ae() {
    if (!i || i.P.stubX === null || i.P.torn || i.p < 0.95 || i.f > 0.01) return null;
    let { b: p, scene: v } = oe(), R = v.active.st, P = i.P, O = p.vw / 2 + R.cx * p.ppu, x = p.vh / 2 - R.cy * p.ppu;
    return { x0: O + P.stubX * R.sc * p.ppu, x1: O + P.half[0] * R.sc * p.ppu, y0: x - P.half[1] * R.sc * p.ppu, y1: x + P.half[1] * R.sc * p.ppu };
  }
  function be(p) {
    if (M = 0, !i || document.hidden || t.isLost() || i.rebuilding) return;
    if (!i.tw.length && !i.dragging && !i.lampMoving && !i.resume && i.tPrev && p - i.tPrev < 32) {
      M = requestAnimationFrame(be);
      return;
    }
    let v = i.resume ? 1 / 60 : Math.min(0.1, Math.max(0, (p - (i.tPrev || p)) / 1e3));
    i.resume = !1, i.tPrev = p;
    let R = yt(i, p);
    if (!i) return;
    let P = Tt(i, v);
    i.lampMoving = P, i.P.burnPts && i.P.front0 > -0.5 && i.phase === "open" && i.destroy === void 0 && (i.burnOpen = Math.min(0.08, (i.burnOpen || 0) + v * 4e-3));
    let { b: O, scene: x } = oe(p);
    i.boxCache = tt(x.active.P, x.active.st, O.ppu, O.vw, O.vh), vt(w, i, x, v), w.step(v), t.draw(x.items, x.shadow, w), i.pPrev = i.p;
    let U = x.active.st.front > -0.5 && !!x.active.P.burnPts;
    if (i.ashes && (w.n === 0 || p > i.ashesEnd)) {
      A();
      return;
    }
    (R || i.dragging || P || w.n > 0 || U || i.ashes) && (M = requestAnimationFrame(be));
  }
  function H() {
    !M && i && (i.resume = !0, M = requestAnimationFrame(be));
  }
  let Re = (p) => e.remember && !!de.get("opened." + p, !1);
  function Fe(p) {
    if (i || !p.P) return;
    let v = p.P;
    G();
    let R = de.get("opens." + v.cfg.id, 0) + 1;
    de.set("opens." + v.cfg.id, R), v.hasRedaction && requestAnimationFrame(() => t.refreshPrint(v).then(H));
    let P = p.opened ? Qe(v) : 0;
    i = { P: v, ent: p, from: p.btn.getBoundingClientRect(), tf: 0, p: P, ext0: et(v, P), f: 0, tear: 0, tw: [], phase: "opening", dragging: !1, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 }, w.clear(), p.btn.classList.add("active"), document.body.classList.add("crumple-open"), o.style.display = "block", o.style.pointerEvents = "auto", r.classList.add("on"), a.classList.add("on"), a.setAttribute("aria-label", ke[v.cfg.type].name), u.focus({ preventScroll: !0 }), f.hidden = v.stubX === null || v.torn, d.replaceChildren(), pe(v.cfg.text, d), v.cfg.back && (d.append(`

\u2014 ` + e.labels.back + ` \u2014
`), pe(v.cfg.back, d));
    let O = v.cfg.open === "drag", x = v.cfg.type === "envelope", U = () => {
      i && (i.phase = "open", O && i.p < 0.5 && c.classList.add("on"));
    };
    if (n)
      o.style.opacity = "0", requestAnimationFrame(() => {
        o.style.opacity = "1";
      }), i.tf = 1, i.phase = "open", O ? c.classList.add("on") : (ue(i, "p", 1, ne * (x ? 1.6 : 1), Be), le.play("uncrumple", ne));
    else {
      i.pre = 0, i.arc = 0.24;
      let he = N * 0.55, Se = x ? ae * 1.85 : ae;
      if (ue(i, "pre", 1, N, ge), ue(i, "tf", 1, F, qt, he, U), !O) {
        let Ee = () => {
          i && i.phase !== "closing" && (i.settle = 0, ue(i, "settle", 1, 0.9, ge), H());
        };
        ue(i, "p", 1, Se, x ? ze : st(v), he + z, Ee), le.play(x ? "seal" : "uncrumple", Se, he + z);
      }
    }
    v.front0 > -0.5 && le.play("fire", 2.5, 0.6), e.remember && de.set("opened." + v.cfg.id, !0), Ue(p.btn, "open", { id: v.cfg.id, openings: R }), H();
    let { scene: se } = oe();
    t.draw(se.items, se.shadow, w);
  }
  function rt() {
    !i || !i.burnOpen || (i.P.burned = Math.min(0.2, i.P.burned + i.burnOpen), de.set("burned." + i.P.cfg.id, i.P.burned), i.burnOpen = 0);
  }
  function S() {
    if (!i || i.phase === "closing") return;
    if (i.P.cfg.burnAfterReading && i.p > 0.9 && i.phase === "open") {
      T();
      return;
    }
    rt(), i.phase = "closing", i.dragging = !1, i.lampOn = 0, i.from = i.ent.btn.getBoundingClientRect(), r.classList.remove("on"), a.classList.remove("on"), c.classList.remove("on"), o.style.pointerEvents = "none", i.tw = i.tw.filter((O) => O.key !== "settle"), i.settle = 1;
    let p = i.P.cfg.type === "envelope", v = Re(i.P.cfg.id) ? Qe(i.P) : 0;
    i.tf > 0.999 && (i.ext0 = et(i.P, v));
    let R = n ? 0.6 : p ? 1.9 : 0.85, P = R * Math.max(0.35, i.p - v);
    if (i.f > 0 && ue(i, "f", 0, 0.45, De), i.p > v + 0.02 && le.play("crumple", P), ue(i, "p", v, P, p ? ze : lt(i.P)), n) ue(i, "tf", 1, R, ge, 0, A);
    else {
      i.tf > 0.999 && (i.arc = 0.34);
      let O = () => {
        i && (i.bounce = 0, ue(i, "bounce", 1, 0.36, ge, 0, A));
      };
      ue(i, "tf", 0, 0.78, Ht, P * (p ? 0.8 : 0.5), O);
    }
    Ue(i.ent.btn, "close", { id: i.P.cfg.id }), H();
  }
  function T() {
    rt(), i.phase = "closing", i.dragging = !1, a.classList.remove("on"), c.classList.remove("on"), o.style.pointerEvents = "none", i.f > 0 && ue(i, "f", 0, 0.4, De);
    let p = i.P.letter || i.P;
    i.destroy = Math.max(p.front0 > -0.5 ? p.front0 + p.burned : -0.06, -0.06), le.play("fire", 2.8), ue(i, "destroy", 1.6, n ? 1.2 : 2.6, ge, 0, () => {
      if (!i) return;
      i.ashes = !0, i.ashesEnd = performance.now() + 3e3, r.classList.remove("on");
      let v = i.ent;
      de.set("destroyed." + v.cfg.id, !0), v.destroyed = !0, Ue(v.btn, "burn", { id: v.cfg.id });
    }), H();
  }
  function A() {
    if (!i) return;
    let p = i.ent, v = !!i.ashes;
    i = null, w.clear(), r.classList.remove("on"), document.body?.classList.remove("crumple-open");
    let R = () => {
      i || (o.style.display = "none", o.style.opacity = ""), v ? (p.btn.hidden = !0, p.btn.classList.remove("active")) : (!i || i.ent !== p) && p.btn.classList.remove("active");
    };
    n ? (o.style.opacity = "0", setTimeout(R, 300)) : R(), d.textContent = "", v || p.btn.focus({ preventScroll: !0 }), Z(p);
  }
  function _() {
    !i || i.phase === "closing" || i.destroy !== void 0 || (le.play("flip"), Xe(10), ue(i, "f", i.f < 0.5 ? 1 : 0, 0.8, ge), Ue(i.ent.btn, "flip", { id: i.P.cfg.id, back: i.f < 0.5 }), H());
  }
  function I() {
    !i || i.P.stubX === null || i.P.torn || i.tear > 0 || i.p < 0.95 || i.f > 0.01 || (le.play("tear"), Xe([15, 20, 15, 20, 30]), Ue(i.ent.btn, "tear", { id: i.P.cfg.id }), f.hidden = !0, ue(i, "tear", 1, n ? 0.3 : 1, ge, 0, () => {
      i && (i.P.torn = !0);
    }), H());
  }
  function L(p, v, R = {}) {
    let P = { btn: p, cfg: We(v), P: null, building: null, opts: R, opened: !1, off: [], io: null, gone: !1, madeImg: !1, madeLabel: !1 };
    return document.body ? q(P) : document.addEventListener("DOMContentLoaded", () => q(P), { once: !0 }), P;
  }
  function q(p) {
    let { btn: v, cfg: R, opts: P } = p;
    k();
    let O = b.get(v);
    O && V(O);
    let x = m.find((se) => se.cfg.id === R.id);
    x && (console.warn(`crumple: id "${R.id}" is already attached, the previous paper is detached`), V(x)), m.push(p), b.set(v, p), v.classList.add("crumple-trigger"), v.getAttribute("aria-label") || (v.setAttribute("aria-label", e.labels.open), p.madeLabel = !0), de.get("destroyed." + R.id, !1) && (v.hidden = !0, p.destroyed = !0), p.opened = Re(R.id), te(p.off, v, "click", async () => {
      await X(p) ? Fe(p) : Y(p);
    });
    let U = v.querySelector("img");
    if (P.snapshot) {
      U || (U = document.createElement("img"), U.alt = "", v.appendChild(U), p.madeImg = !0), U.onerror = () => {
        p.opts = {}, U.onerror = null, $(p);
      }, U.src = p.opened && P.snapshotOpened ? P.snapshotOpened : P.snapshot;
      let se = () => {
        K(() => X(p));
      };
      ["pointerenter", "focus", "touchstart"].forEach((he) => te(p.off, v, he, se, { once: !0, passive: !0 })), te(p.off, v, "pointerdown", () => X(p), { passive: !0 });
    } else $(p);
  }
  function V(p) {
    p.gone = !0, p.off.splice(0).forEach((P) => P()), p.io && p.io.disconnect();
    let v = m.indexOf(p);
    v >= 0 && m.splice(v, 1);
    let R = B.indexOf(p);
    if (R >= 0 && B.splice(R, 1), i && i.ent === p && A(), p.P && (t.release(p.P), p.P = null), b.get(p.btn) === p && b.delete(p.btn), p.btn.classList.remove("crumple-trigger", "active", "recrumple"), p.madeLabel && p.btn.removeAttribute("aria-label"), p.madeImg) {
      let P = p.btn.querySelector("img");
      P && P.remove();
    }
  }
  function $(p) {
    if ("IntersectionObserver" in window) {
      let v = new IntersectionObserver((R) => R.forEach((P) => {
        P.isIntersecting && (v.disconnect(), K(() => X(p).then(() => Z(p))));
      }), { rootMargin: "600px 0px" });
      p.io = v, v.observe(p.btn);
    } else K(() => X(p).then(() => Z(p)));
  }
  let K = (p) => globalThis.requestIdleCallback ? requestIdleCallback(p, { timeout: 700 }) : setTimeout(p, 60), B = [], W = 0;
  function X(p) {
    if (p.P) {
      let v = B.indexOf(p);
      return v >= 0 && B.push(B.splice(v, 1)[0]), Promise.resolve(p.P);
    }
    return p.building ? p.building : p.building = ee(p);
  }
  async function ee(p) {
    let v = W;
    try {
      if (p.gone || !D() || t.isLost()) return null;
      let R = t, P = await R.build(p.cfg);
      if (v !== W) return null;
      if (p.gone)
        return R.release(P), null;
      for (p.P = P, B.push(p); B.length > e.maxBuilt; ) {
        let O = B.findIndex((U) => (!i || U !== i.ent) && U !== p);
        if (O < 0) break;
        let x = B.splice(O, 1)[0];
        !x.opts.snapshot && x.P && Z(x), x.P && R.release(x.P), x.P = null, x.building = null;
      }
      return p.P;
    } catch (R) {
      return console.warn("crumple: the paper could not be built, the CSS version is shown instead", R), null;
    } finally {
      v === W && (p.building = null);
    }
  }
  function ce() {
    W++;
    let p = B.splice(0);
    if (m.forEach((v) => {
      v.P = null, v.building = null;
    }), p.forEach((v) => X(v).then(() => Z(v))), i) {
      let v = i.ent;
      i.rebuilding = !0, X(v).then((R) => {
        !i || i.ent !== v || (R ? (i.P = R, i.rebuilding = !1, H()) : (i.ashes = !1, A()));
      });
    }
  }
  function Z(p) {
    if (p.destroyed || p.gone) return;
    p.opened = Re(p.cfg.id);
    let v = p.btn.querySelector("img");
    if (v || (v = document.createElement("img"), v.alt = "", p.btn.appendChild(v), p.madeImg = !0), p.opts.snapshot) {
      v.src = p.opened && p.opts.snapshotOpened ? p.opts.snapshotOpened : p.opts.snapshot;
      return;
    }
    p.P && t && (v.src = t.snapshot(p.P, p.opened));
  }
  function Te() {
    let p = !1;
    m.forEach((v) => {
      de.remove("opened." + v.cfg.id), !(!v.opened || v.destroyed) && (p = !0, Z(v), v.btn.classList.remove("recrumple"), v.btn.offsetWidth, v.btn.classList.add("recrumple"));
    }), p && le.play("crumple", 0.9);
  }
  function pe(p, v) {
    let R = !1;
    p.split(`
`).forEach((P, O) => {
      let x = P.startsWith("# ");
      O && !x && !R && v.append(`
`), R = x;
      let U = x ? P.slice(2) : P, se = x ? document.createElement("span") : v;
      x && (se.className = "crumple-h");
      let he = /~~([^~\n]+)~~(?:\{([^}\n]+)\})?|\[\[([^\]\n]+)\]\]/g, Se = 0, Ee;
      for (; Ee = he.exec(U); ) {
        if (Ee.index > Se && se.append(U.slice(Se, Ee.index)), Ee[3] !== void 0) {
          let Pe = document.createElement("span");
          Pe.className = "crumple-redact", Pe.setAttribute("role", "img"), Pe.setAttribute("aria-label", "redacted"), Pe.style.width = Math.max(3, Ee[3].length * 0.5) + "em", se.append(Pe);
        } else {
          let Pe = document.createElement("del");
          if (Pe.textContent = Ee[1], se.append(Pe), Ee[2] !== void 0) {
            let $e = document.createElement("ins");
            $e.textContent = Ee[2], se.append($e);
          }
        }
        Se = he.lastIndex;
      }
      Se < U.length && se.append(U.slice(Se)), x && v.append(se);
    });
  }
  function Y(p) {
    k();
    let v = ke[p.cfg.type], R = (x) => Math.round(v.color[x] * 255), P = document.createElement("div");
    if (P.className = "sheet", P.style.background = `rgb(${R(0)},${R(1)},${R(2)})`, P.style.fontFamily = `"${v.font}", "Courier Prime", monospace`, p.opts.snapshotOpened) {
      let x = document.createElement("img");
      x.src = p.opts.snapshotOpened, x.alt = "", P.appendChild(x);
    }
    pe(p.cfg.text, P), p.cfg.back && (P.append(`

\u2014 ` + e.labels.back + ` \u2014
`), pe(p.cfg.back, P));
    let O = document.createElement("button");
    O.type = "button", O.textContent = e.labels.close, O.addEventListener("click", re), g.setAttribute("aria-label", v.name), g.replaceChildren(P, O), g.classList.add("on"), document.body?.classList.add("crumple-open"), O.focus(), g.onclick = (x) => {
      x.target === g && re();
    }, g._ent = p, Ue(p.btn, "open", { id: p.cfg.id, fallback: !0 });
  }
  function re() {
    g.classList.remove("on"), document.body?.classList.remove("crumple-open"), g._ent && g._ent.btn.focus({ preventScroll: !0 });
  }
  function we(p, v) {
    let R = [...v.querySelectorAll("button")].filter((U) => !U.hidden);
    if (!R.length) return;
    p.preventDefault();
    let P = R.indexOf(document.activeElement), O = R.length - 1, x = P < 0 ? 0 : p.shiftKey ? P === 0 ? O : P - 1 : P === O ? 0 : P + 1;
    R[x].focus({ preventScroll: !0 });
  }
  let Ve = (p) => !!p && (p.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(p.tagName));
  function Oe() {
    o && (i = null, cancelAnimationFrame(M), M = 0, m.slice().forEach(V), B.length = 0, y.splice(0).forEach((p) => p()), t && t.destroy(), t = null, s = !1, h.remove(), document.body?.classList.remove("crumple-open"), [r, o, a, c, d, g].forEach((p) => p.remove()), r = o = a = c = d = g = null, w.clear());
  }
  return {
    // options: { labels, remember, motion: 'auto' | 'reduce' | 'full' ('reduced' still works), flashlight, maxBuilt }
    init(p = {}) {
      e = { ...e, ...p, labels: { ...sn, ...p.labels || {} } }, o && (l.textContent = e.labels.flip, f.textContent = e.labels.tear, u.textContent = e.labels.close, c.textContent = e.labels.hint), k(), n = _e(e.motion), K(() => {
        o && D();
      });
    },
    attach: L,
    // detaches a trigger element, or the paper with that id
    detach(p) {
      let v = typeof p == "string" ? m.find((R) => R.cfg.id === p) : b.get(p);
      v && V(v);
    },
    destroy: Oe,
    open: (p) => X(p).then((v) => v ? Fe(p) : Y(p)),
    close: S,
    flip: _,
    tear: I,
    reset: Te,
    get reducedMotion() {
      return n;
    },
    get entries() {
      return m;
    },
    get isOpen() {
      return !!i;
    },
    // debugging/testing: draws a fixed frame (flight, unfold, flip, tear, burn front) of an attached paper
    async frame(p, v, R, P = 0, O = 0, x) {
      let U = m[p];
      await X(U), x !== void 0 && await t.ensureBurn(U.P), cancelAnimationFrame(M), M = 0, G(), i = { P: U.P, ent: U, from: U.btn.getBoundingClientRect(), tf: v, p: R, f: P, tear: O, tw: [], phase: "open", burnOpen: 0 }, x !== void 0 && (i.destroy = x), o.style.display = "block", r.classList.add("on"), m.forEach((he) => he.btn.classList.toggle("active", he === U));
      let { scene: se } = oe();
      t.draw(se.items, se.shadow, null);
    },
    // debugging/testing: lights the flashlight at screen (x, y) and draws
    flashlight(p, v) {
      if (i) {
        nt(i, p, v, o.clientWidth, o.clientHeight, o.clientHeight / (2 * Ce * Math.tan(Ie / 2)), !0), i.lampPos = i.lampGoal.slice(), i.lamp = 1;
        let { scene: R } = oe();
        t.draw(R.items, R.shadow, null);
      }
    },
    get debug() {
      return i ? { phase: i.phase, ashes: !!i.ashes, destroy: i.destroy, n: w.n, raf: M, tw: i.tw.map((p) => p.key), lampPos: i.lampPos, lamp: i.lamp } : null;
    }
  };
})();

// .build/stage.js
var ln = 1.5;
function Zn(e, n = {}) {
  let t = { flashlight: !0, drag: !0, fit: 0.8, motion: "auto", ...n }, s, o = !1, r = _e(t.motion);
  try {
    s = ot(e, { onRestore: F });
  } catch {
    s = null;
  }
  if (!s) return null;
  let a = (k, D, G, J, oe, me, Ae) => ue(k, D, G, r ? J * 0.4 : J, oe, me, Ae), l = null, f = 0, u = 0, c = null, d = "", g = null, h = [], E = wt(), m = { p: 1, f: 0, tear: 0, tw: [], dragging: !1, lampPos: null, lampGoal: null, lamp: 0, lampOn: 0, burnOpen: 0 };
  function b() {
    let k = Math.min(window.devicePixelRatio || 1, 1.75, Math.sqrt(4e6 / Math.max(1, e.clientWidth * e.clientHeight))), D = Math.round(e.clientWidth * k), G = Math.round(e.clientHeight * k);
    (e.width !== D || e.height !== G) && (e.width = D, e.height = G);
  }
  function y(k) {
    let D = e.clientWidth, G = e.clientHeight, J = G / (2 * Ce * Math.tan(Ie / 2)), oe = l.cfg.type === "envelope", me = oe ? Math.min(t.fit * 0.69 * G / (l.T.body * J), 0.7 * D / (l.w * J)) : Math.min(t.fit * G / (l.h * J), (t.fit + 0.06) * D / (l.w * J)), Ae = l.letter ? Math.min(t.fit * G / (l.letter.h * J), (t.fit + 0.06) * D / (l.letter.w * J)) : me, be = fe(j(oe ? m.p * 2 : m.p)), H = [0, 0, -0.02];
    return { cx: 0, cy: 0, sc: me, scLetter: Ae, rot: l.pose.map((Re, Fe) => Re * (1 - be) + H[Fe] * be), lift: 0, time: k / 1e3, ppu: J, vw: D, vh: G, vhU: G / J, L: He, lampPos: m.lampPos, lamp: m.lamp || 0, lampR: 0.3 * G / J };
  }
  let w = (k = performance.now()) => {
    let D = y(k);
    return { b: D, scene: qe(l, m, D) };
  };
  function i(k) {
    if (f = 0, !l || document.hidden || o || s.isLost()) return;
    b();
    let D = m.resume ? 1 / 60 : Math.min(0.05, Math.max(0, (k - (m.tPrev || k)) / 1e3));
    m.resume = !1, m.tPrev = k;
    let G = yt(m, k), J = Tt(m, D), { scene: oe } = w(k);
    vt(E, m, oe, D), E.step(D), s.draw(oe.items, oe.shadow, E), m.pPrev = m.p, (G || m.dragging || J || E.n > 0 || oe.active.st.front > -0.5 && oe.active.P.burnPts) && (f = requestAnimationFrame(i));
  }
  let M = () => {
    !f && !o && (m.resume = !0, f = requestAnimationFrame(i));
  };
  function C() {
    if (!l) return null;
    let { b: k, scene: D } = w(), G = e.getBoundingClientRect();
    return tt(D.active.P, D.active.st, k.ppu, k.vw, k.vh, G.left, G.top);
  }
  t.drag && (d = e.style.touchAction, e.style.touchAction = "none", c = Et(e, { active: () => l ? m : null, box: C, outside: () => {
  }, redraw: M })), te(h, e, "dblclick", () => ne.flip()), t.flashlight && (te(h, e, "pointermove", (k) => {
    if (!l || m.dragging || k.pointerType === "touch") return;
    let D = C(), G = e.getBoundingClientRect(), J = !!D && k.clientX > D.x0 - 30 && k.clientX < D.x1 + 30 && k.clientY > D.y0 - 30 && k.clientY < D.y1 + 30;
    nt(m, k.clientX - G.left, k.clientY - G.top, e.clientWidth, e.clientHeight, e.clientHeight / (2 * Ce * Math.tan(Ie / 2)), J), M();
  }), te(h, e, "pointerleave", () => {
    m.lampOn = 0, M();
  })), te(h, window, "resize", () => M()), te(h, document, "visibilitychange", () => {
    document.hidden || M();
  });
  let N = Je();
  N && t.motion === "auto" && te(h, N, "change", () => {
    r = _e(t.motion);
  });
  function F() {
    let k = l && l.cfg, D = m.p;
    l = null, k && ne.set(k, { progress: D }).catch((G) => console.warn("crumple: rebuild after context restore failed", G));
  }
  function z() {
    o || (o = !0, u++, cancelAnimationFrame(f), f = 0, h.splice(0).forEach((k) => k()), c && c(), t.drag && (e.style.touchAction = d), l && s.release(l), l = null, m.tw = [], E.clear(), s.destroy());
  }
  let ae = () => l.cfg.type === "envelope", ne = {
    // builds a paper from a config and shows it (resolves with the paper, or null if a newer call replaced it)
    async set(k, { progress: D } = {}) {
      if (o) return null;
      let G = ++u, J = await s.build(k);
      return G !== u || o ? (s.release(J), null) : (l && s.release(l), l = J, m.tear = 0, m.f = 0, l.torn = !1, delete m.destroy, D !== void 0 && (m.tw = [], m.p = j(D)), E.clear(), M(), l);
    },
    crumple() {
      l && (le.play("crumple", 0.9), a(m, "p", 0, ae() ? 1.9 : 0.9, ae() ? ze : lt(l)), M());
    },
    uncrumple() {
      l && (le.play(ae() ? "seal" : "uncrumple", 1.5), a(m, "p", 1, ae() ? ln * 1.85 : ln, ae() ? ze : st(l)), M());
    },
    toggle() {
      m.p > 0.5 ? ne.crumple() : ne.uncrumple();
    },
    // any time, except once the paper burns away; the side it shows is kept through crumple and unfold
    flip() {
      !l || m.destroy !== void 0 || (le.play("flip"), a(m, "f", m.f < 0.5 ? 1 : 0, 0.8, ge), M());
    },
    tear() {
      !l || l.stubX === null || m.tear > 0 || m.p < 0.95 || (le.play("tear"), a(m, "tear", 1, 1, ge, 0, () => {
        l.torn = !0;
      }), M());
    },
    restoreStub() {
      l && (m.tear = 0, l.torn = !1, M());
    },
    // resolves once the paper has its burn field (built on demand for any paper); a second call meanwhile does nothing,
    // and a paper replaced by set() meanwhile is not burnt
    async burn() {
      let k = l;
      if (!k || m.destroy !== void 0 || g === k) return;
      g = k;
      try {
        await s.ensureBurn(k);
      } finally {
        g === k && (g = null);
      }
      if (l !== k || m.destroy !== void 0) return;
      let D = k.letter || k;
      le.play("fire", 2.6), m.destroy = Math.max(D.front0 > -0.5 ? D.front0 + D.burned : -0.06, -0.06), a(m, "destroy", 1.6, 2.6, ge), M();
    },
    restore() {
      delete m.destroy, E.clear(), M();
    },
    setProgress(k) {
      m.tw = [], m.p = j(k), M();
    },
    // PNG of the current frame (draws and reads at once, no preserved buffer needed)
    png() {
      if (!l) return "";
      b();
      let { scene: k } = w();
      return s.draw(k.items, k.shadow, null), e.toDataURL("image/png");
    },
    snapshot(k, D, G) {
      return l ? s.snapshot(l, k, D, G) : "";
    },
    get state() {
      return m;
    },
    get paper() {
      return l;
    },
    destroy: z
  };
  return ne;
}

// .build/element.js
var Mt = class extends (typeof HTMLElement < "u" ? HTMLElement : class {
}) {
  connectedCallback() {
    let n = this.querySelector("button");
    n || (n = document.createElement("button"), n.type = "button", this.appendChild(n), this._madeBtn = !0), this.btn = n;
    let t = this.getAttribute("states"), s = t ? t.split(",").map((u) => u.trim()).filter(Boolean) : void 0, o = {
      id: this.getAttribute("id") || void 0,
      type: this.getAttribute("type") || void 0,
      shape: this.getAttribute("shape") || void 0,
      states: s,
      text: this.getAttribute("text") || (this._madeBtn ? "" : n.textContent || ""),
      back: this.getAttribute("back") || void 0,
      open: this.getAttribute("open") || void 0,
      seed: this.hasAttribute("seed") ? Number(this.getAttribute("seed")) : void 0
    }, r = this.getAttribute("snapshot") || void 0, a = this.getAttribute("snapshot-opened") || void 0, l = r || a ? { snapshot: r, snapshotOpened: a } : void 0, f = () => {
      this.entry || (this._io && (this._io.disconnect(), this._io = null), this.entry = St.attach(n, o, l));
    };
    n.addEventListener("click", f, { once: !0, capture: !0 }), typeof IntersectionObserver < "u" ? (this._io = new IntersectionObserver((u) => {
      for (let c of u)
        if (c.isIntersecting) {
          f();
          break;
        }
    }, { rootMargin: "200px" }), this._io.observe(this)) : f();
  }
  disconnectedCallback() {
    this._io && (this._io.disconnect(), this._io = null), this.btn && St.detach(this.btn), this._madeBtn && this.btn.parentNode && this.btn.remove(), this.entry = null;
  }
};
typeof customElements < "u" && !customElements.get("crumple-paper") && customElements.define("crumple-paper", Mt);

// .build/index.js
var Go = "1.2.0";
export {
  Mt as CrumplePaper,
  ot as Renderer,
  $t as SHAPES,
  ct as STATES,
  St as Scene,
  le as Sound,
  Zn as Stage,
  jt as TEXTS,
  ke as TYPES,
  Le as config,
  We as normalize,
  En as registerPaperType,
  Tn as registerWearState,
  Go as version
};
//# sourceMappingURL=crumple.esm.js.map
