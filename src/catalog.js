// Catalog: paper types, closed shapes, states and the default texts. A paper is born from a config:
// { id, type, shape, states, text, back, seed, open, hiddenInk, burnAfterReading, burn, image, address, letter, stamp }
// Text markup: "# " at the start of a line = heading; ~~word~~{fix} = struck out and corrected by hand;
// [[passage]] = redaction bar that fades a little more on every opening.

// w, h in world units (0.84 x 1.1 is a letter sheet); color = paper RGB 0..1; size/lineHeight/x/y in print pixels
export const TYPES = {
  typed: { name: 'Typewritten sheet', w: 0.84, h: 1.1, color: [0.945, 0.92, 0.865], shape: 'ball', font: 'Special Elite', size: 42, lineHeight: 62, x: 96, y: 190, ink: [31, 29, 28], typewriter: true, gsm: 80 },
  notebook: { name: 'Notebook page', w: 0.84, h: 1.1, color: [0.955, 0.945, 0.905], shape: 'flat', font: 'Caveat', size: 56, lineHeight: 52, x: 150, y: 206, ink: [28, 45, 110], hand: true, gsm: 75 },
  form: { name: 'Continuous form', w: 0.92, h: 1.0, color: [0.95, 0.95, 0.935], shape: 'quarters', font: 'VT323', size: 46, lineHeight: 64, x: 120, y: 172, ink: [44, 44, 58], typewriter: true, gsm: 70 },
  receipt: { name: 'Thermal receipt', w: 0.42, h: 1.26, color: [0.975, 0.97, 0.955], shape: 'roll', font: 'VT323', size: 40, lineHeight: 46, x: 36, y: 110, ink: [64, 64, 80], typewriter: true, fades: true, gsm: 48, thru: 0.14 },
  ticket: { name: 'Theatre ticket', w: 1.0, h: 0.46, color: [0.93, 0.875, 0.76], shape: 'half', font: 'Special Elite', size: 38, lineHeight: 52, x: 70, y: 130, ink: [120, 28, 30], card: true, stub: 0.27, gsm: 250 },
  memo: { name: 'Office memo', w: 0.84, h: 1.1, color: [0.965, 0.96, 0.94], shape: 'ball', font: 'Courier Prime', size: 33, lineHeight: 50, x: 100, y: 330, ink: [25, 25, 30], typewriter: true, gsm: 75 },
  newspaper: { name: 'Newspaper clipping', w: 0.8, h: 1.0, color: [0.85, 0.84, 0.79], shape: 'twist', font: 'Libre Baskerville', size: 25, lineHeight: 38, x: 56, y: 330, ink: [28, 28, 28], gsm: 45, thru: 0.08 },
  sticky: { name: 'Sticky note', w: 0.5, h: 0.5, color: [0.985, 0.88, 0.38], shape: 'half', font: 'Caveat', size: 62, lineHeight: 70, x: 50, y: 150, ink: [30, 40, 100], hand: true, gsm: 75 },
  polaroid: { name: 'Instant photo', w: 0.62, h: 0.74, color: [0.975, 0.972, 0.96], shape: 'flat', font: 'Caveat', size: 50, lineHeight: 54, x: 50, y: 640, ink: [30, 40, 100], hand: true, card: true, photo: true, gsm: 300 },
  envelope: { name: 'Sealed envelope', w: 0.9, h: 0.96, body: 0.6, flap: 0.36, color: [0.93, 0.885, 0.79], shape: 'envelope', font: 'Caveat', size: 46, lineHeight: 50, x: 90, y: 600, ink: [30, 40, 100], hand: true, gsm: 100 },
  blueprint: { name: 'Technical blueprint', w: 0.96, h: 0.72, color: [0.045, 0.145, 0.25], shape: 'quarters', font: 'Courier Prime', size: 28, lineHeight: 42, x: 64, y: 140, ink: [215, 240, 255], typewriter: true, gsm: 90 },
  postcard: { name: 'Vintage postcard', w: 0.94, h: 0.62, color: [0.96, 0.95, 0.92], shape: 'flat', font: 'Caveat', size: 44, lineHeight: 50, x: 70, y: 120, ink: [24, 38, 90], hand: true, card: true, gsm: 280 },
  punchcard: { name: 'IBM 80-col punch card', w: 1.05, h: 0.48, color: [0.96, 0.93, 0.84], shape: 'flat', font: 'Courier Prime', size: 16, lineHeight: 24, x: 34, y: 24, ink: [25, 25, 25], typewriter: true, card: true, gsm: 260 },
  shipping: { name: 'Kraft shipping parcel', w: 0.76, h: 1.0, color: [0.78, 0.65, 0.48], shape: 'flat', font: 'Courier Prime', size: 36, lineHeight: 48, x: 60, y: 160, ink: [25, 20, 18], typewriter: true, gsm: 130 },
  kraft: { name: 'Kraft paper parcel', w: 0.76, h: 1.0, color: [0.78, 0.65, 0.48], shape: 'flat', font: 'Courier Prime', size: 36, lineHeight: 48, x: 60, y: 160, ink: [25, 20, 18], typewriter: true, gsm: 130 },
  parchment: { name: 'Ancient parchment', w: 0.82, h: 1.12, color: [0.91, 0.828, 0.655], shape: 'roll', font: 'Caveat', size: 50, lineHeight: 54, x: 90, y: 180, ink: [55, 35, 20], hand: true, gsm: 140 },
  ledger: { name: 'Accounting ledger', w: 0.96, h: 0.76, color: [0.92, 0.955, 0.925], shape: 'half', font: 'Caveat', size: 36, lineHeight: 42, x: 74, y: 198, ink: [20, 35, 75], hand: true, gsm: 95 },
  carbon: { name: 'Carbon duplicate copy', w: 0.84, h: 1.1, color: [0.15, 0.14, 0.21], shape: 'quarters', font: 'Special Elite', size: 34, lineHeight: 48, x: 74, y: 290, ink: [155, 170, 255], typewriter: true, carbon: true, gsm: 42, thru: 0.18 },
};
export const SHAPES = { ball: 'Crumpled ball', flat: 'Flattened crumple', quarters: 'Folded in quarters', half: 'Folded in half', thirds: 'Folded in thirds (letter)', roll: 'Rolled up', twist: 'Twisted (candy wrapper)', accordion: 'Accordion fold', triangle: 'Triangle fold' };
export const STATES = { torn: 'Torn', burnt: 'Burnt', coffee: 'Coffee stain', water: 'Water stain', prints: 'Dirty fingerprints', aged: 'Aged', scribbled: 'Scribbled', singed: 'Singed', wine: 'Wine stain', ink: 'Ink blot', foxing: 'Foxing', tape: 'Tape', stamp: 'Rubber stamp', faded: 'Sun-faded', staple: 'Metal staple', grease: 'Grease stain', dogear: 'Dog-eared corner', damp: 'Damp wrinkled relief', creased: 'Pocket-creased grid', clip: 'Metal paper clip' };
// where a burn starts: from a corner (default), along one side, a hole from inside, or a few embers
export const BURNS = ['corner', 'edge', 'center', 'spots'];
export const TEXTS = {
  typed: 'To whoever finds this:\n\nI folded every thought I could not say out loud and left it here.\n\nRead it slowly.\n\n— A.',
  notebook: 'monday night\n\ncould not sleep again.\nmade a list of things to fix tomorrow.\n\ndo not read the rest.',
  form: '# CONTINUOUS FORM · LOG\nUNIT: 04\nSTATUS: AWAITING SIGNATURE\n\nREADING 01 ..... 0412\nREADING 02 ..... 0413\nREADING 03 ..... 0415\nREADING 04 ..... ERROR',
  receipt: '# CORNER STORE\n# OPEN ALL NIGHT\n--------------------\nMILK .......... 2.40\nBREAD ......... 1.90\nCANDLES (2) ... 3.00\nBATTERIES ..... 4.50\n--------------------\nTOTAL ........ 11.80\n\nREGISTER 02\n# THANK YOU',
  ticket: '# THE GRAND THEATRE\nEVENING PERFORMANCE\nROW C · SEAT 12\n\nadmit one',
  memo: '# INTERNAL MEMO\nTO: [[research team]]\nFROM: management\nRE: the new project\n\nDetails of the project [[must not be shared]] before launch. Deliver the report by Friday.\n\nFurther tests continue next week.',
  newspaper: '# FOG STAYS FOR A THIRD DAY\nResidents woke yesterday to the same thick fog that has covered the harbor since Monday. Ferries kept to their schedule, guided only by the lighthouse.\n\nThe weather office expects clear skies by the weekend. Until then, the old foghorn will keep sounding every few minutes, day and night.',
  sticky: 'do not forget\nto water\nthe plants\n\n— me',
  polaroid: 'summer, last day',
  envelope: 'Dear friend,\n\nI kept this letter in a drawer for a whole year before sending it.\n\nRead it, then let it go.\n\n— yours',
  blueprint: '# AQUILA HYDRAULIC VALVE\nSYSTEM SPECIFICATION REV 4\n\nDESIGN PRESSURE: 420 BAR\nTEST PRESSURE: 630 BAR\nFLANGE SPEC: ANSI CLASS 2500\n\nNOTE 1: ALL DIMENSIONS IN MM.\nNOTE 2: DEBURR AND BREAK SHARP EDGES 0.5MM MAX.\nNOTE 3: 100% RADIOGRAPHIC EXAMINATION REQUIRED ON PRESSURE WELDS.',
  postcard: 'Greetings from the coast!\n\nThe sea breeze has been gentle and the days quiet.\nFound this old viewpoint overlooking the rocky lighthouse.\nWish you were here.\n\n— Elena',
  punchcard: '00100  IDENTIFICATION DIVISION. CRUMPLE-SYSTEM IBM 7094.',
  shipping: '# PRIORITY CARGO DISPATCH\nTRACKING: BR-9042-CRUMPLE\nDESTINATION: SECTOR 4-ALPHA\n\nCONTENTS: PRECISION OPTICS & TOOLS\nHANDLE WITH UTMOST CARE · DO NOT CRUSH\nWEIGHT: 2.35 KG · CUSTOMS CLEARED',
  kraft: '# PRIORITY CARGO DISPATCH\nTRACKING: BR-9042-CRUMPLE\nDESTINATION: SECTOR 4-ALPHA\n\nCONTENTS: PRECISION OPTICS & TOOLS\nHANDLE WITH UTMOST CARE · DO NOT CRUSH\nWEIGHT: 2.35 KG · CUSTOMS CLEARED',
  parchment: 'In nomine veritatis,\n\nWe hereby affirm the ancient concord sealed across the waters. Let neither the turning of centuries nor the embers of flame erase what was pledged in this hall.\n\nAnno Domini 1492',
  ledger: '12 OCT   STEAMSHIP CARGO FREIGHT ....... 108   1,420.00          1,420.00\n15 OCT   HARBOR DOCKAGE DUES ........... 109             115.50  1,304.50\n18 OCT   BUNKER COAL REFUELING ......... 110             480.00    824.50\n24 OCT   WAREHOUSE STEVEDORING ......... 111             210.00    614.50\n29 OCT   BALANCE CARRIED FORWARD ....... 112                       614.50',
  carbon: '# DUPLICATE COPY · VOUCHER № 049182\n\nPAYEE: MARITIME LOGISTICS DEPT\nCHARGE CODE: ACCT-9042-ALPHA\nSUM: $ 1,420.00 (ONE THOUSAND FOUR HUNDRED TWENTY DOLLARS)\n\nVERIFIED BY AUDIT COMMITTEE · SECOND COPY RETAINED',
};
export const ADDRESS = 'A. Reader\n12 Paper Lane\nFoldtown';
// corrections written by hand when the "scribbled" state picks words to strike out
export const CORRECTIONS = ['never', 'again', 'always', 'not yet', 'once more', 'still'];

export const WEAR_APPLIERS = {};

export function registerPaperType(id, def) {
  if (TYPES[id]) throw new Error(`Paper type "${id}" already exists`);
  TYPES[id] = def;
}

export function registerWearState(id, def) {
  if (STATES[id]) throw new Error(`Wear state "${id}" already exists`);
  STATES[id] = def.name;
  if (def.apply) WEAR_APPLIERS[id] = def.apply;
}

// own keys only: 'toString' or 'constructor' from the prototype must not pass as a type, shape or state
const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

export function normalize(c = {}) {
  const type = has(TYPES, c.type) ? c.type : 'typed';
  const T = TYPES[type];
  const res = {
    id: c.id || type,
    type,
    shape: type === 'envelope' ? 'envelope' : (has(SHAPES, c.shape) ? c.shape : T.shape),
    states: (Array.isArray(c.states) ? c.states : []).filter((e) => has(STATES, e)),
    text: typeof c.text === 'string' ? c.text : (TEXTS[type] || ''),
    back: typeof c.back === 'string' ? c.back : '',
    seed: Number.isFinite(c.seed) ? Math.trunc(c.seed) : 7, // 0 is a valid seed (rng starts from 1 either way)
    open: c.open === 'drag' ? 'drag' : 'auto',
    hiddenInk: typeof c.hiddenInk === 'string' ? c.hiddenInk : '',
    burnAfterReading: !!c.burnAfterReading,
    burn: BURNS.includes(c.burn) ? c.burn : 'corner',
    image: c.image || '',
    address: typeof c.address === 'string' ? c.address : ADDRESS,
    letter: has(TYPES, c.letter) && c.letter !== 'envelope' ? c.letter : 'typed',
    // the word of the 'stamp' state (drawn in capitals)
    stamp: typeof c.stamp === 'string' && c.stamp.trim() ? c.stamp.trim() : 'RECEIVED',
  };
  if (Number.isFinite(c.gsm)) res.gsm = c.gsm;
  if (Number.isFinite(c.weight)) res.weight = c.weight;
  if (Number.isFinite(c.thickness)) res.thickness = c.thickness;
  if (Number.isFinite(c.thru)) res.thru = c.thru;
  if (c.rich && typeof c.rich === 'object') res.rich = c.rich;
  return res;
}
