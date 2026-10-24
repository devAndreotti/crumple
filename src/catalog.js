// Catalog: paper types, closed shapes, states and the default texts. A paper is born from a config:
// { id, type, shape, states, text, back, seed, open, hiddenInk, burnAfterReading, image, address, letter }
// Text markup: "# " at the start of a line = heading; ~~word~~{fix} = struck out and corrected by hand;
// [[passage]] = redaction bar that fades a little more on every opening.

// w, h in world units (0.84 x 1.1 is a letter sheet); color = paper RGB 0..1; size/lineHeight/x/y in print pixels
export const TYPES = {
  typed: { name: 'Typewritten sheet', w: 0.84, h: 1.1, color: [0.945, 0.92, 0.865], shape: 'ball', font: 'Special Elite', size: 42, lineHeight: 62, x: 96, y: 190, ink: [31, 29, 28], typewriter: true },
  notebook: { name: 'Notebook page', w: 0.84, h: 1.1, color: [0.955, 0.945, 0.905], shape: 'flat', font: 'Caveat', size: 56, lineHeight: 52, x: 150, y: 206, ink: [28, 45, 110], hand: true },
  form: { name: 'Continuous form', w: 0.92, h: 1.0, color: [0.95, 0.95, 0.935], shape: 'quarters', font: 'VT323', size: 46, lineHeight: 64, x: 120, y: 172, ink: [44, 44, 58], typewriter: true },
  receipt: { name: 'Thermal receipt', w: 0.42, h: 1.26, color: [0.975, 0.97, 0.955], shape: 'roll', font: 'VT323', size: 40, lineHeight: 46, x: 36, y: 110, ink: [64, 64, 80], typewriter: true, fades: true },
  ticket: { name: 'Theatre ticket', w: 1.0, h: 0.46, color: [0.93, 0.875, 0.76], shape: 'half', font: 'Special Elite', size: 38, lineHeight: 52, x: 70, y: 130, ink: [120, 28, 30], card: true, stub: 0.27 },
  memo: { name: 'Office memo', w: 0.84, h: 1.1, color: [0.965, 0.96, 0.94], shape: 'ball', font: 'Courier Prime', size: 33, lineHeight: 50, x: 100, y: 330, ink: [25, 25, 30], typewriter: true },
  newspaper: { name: 'Newspaper clipping', w: 0.8, h: 1.0, color: [0.85, 0.84, 0.79], shape: 'twist', font: 'Libre Baskerville', size: 25, lineHeight: 38, x: 56, y: 330, ink: [28, 28, 28] },
  sticky: { name: 'Sticky note', w: 0.5, h: 0.5, color: [0.985, 0.88, 0.38], shape: 'half', font: 'Caveat', size: 62, lineHeight: 70, x: 50, y: 150, ink: [30, 40, 100], hand: true },
  polaroid: { name: 'Instant photo', w: 0.62, h: 0.74, color: [0.975, 0.972, 0.96], shape: 'flat', font: 'Caveat', size: 50, lineHeight: 54, x: 50, y: 640, ink: [30, 40, 100], hand: true, card: true, photo: true },
  envelope: { name: 'Sealed envelope', w: 0.9, h: 0.96, body: 0.6, flap: 0.36, color: [0.93, 0.885, 0.79], shape: 'envelope', font: 'Caveat', size: 46, lineHeight: 50, x: 90, y: 600, ink: [30, 40, 100], hand: true },
};
export const SHAPES = { ball: 'Crumpled ball', flat: 'Flattened crumple', quarters: 'Folded in quarters', half: 'Folded in half', thirds: 'Folded in thirds (letter)', roll: 'Rolled up', twist: 'Twisted (candy wrapper)' };
export const STATES = { torn: 'Torn', burnt: 'Burnt', coffee: 'Coffee stain', water: 'Water stain', prints: 'Dirty fingerprints', aged: 'Aged', scribbled: 'Scribbled' };
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
};
export const ADDRESS = 'A. Reader\n12 Paper Lane\nFoldtown';
// corrections written by hand when the "scribbled" state picks words to strike out
export const CORRECTIONS = ['never', 'again', 'always', 'not yet', 'once more', 'still'];

// own keys only: 'toString' or 'constructor' from the prototype must not pass as a type, shape or state
const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

export function normalize(c = {}) {
  const type = has(TYPES, c.type) ? c.type : 'typed';
  const T = TYPES[type];
  return {
    id: c.id || type,
    type,
    shape: type === 'envelope' ? 'envelope' : (has(SHAPES, c.shape) ? c.shape : T.shape),
    states: (Array.isArray(c.states) ? c.states : []).filter((e) => has(STATES, e)),
    text: typeof c.text === 'string' ? c.text : TEXTS[type],
    back: typeof c.back === 'string' ? c.back : '',
    seed: (c.seed | 0) || 7,
    open: c.open === 'drag' ? 'drag' : 'auto',
    hiddenInk: typeof c.hiddenInk === 'string' ? c.hiddenInk : '',
    burnAfterReading: !!c.burnAfterReading,
    image: c.image || '',
    address: typeof c.address === 'string' ? c.address : ADDRESS,
    letter: has(TYPES, c.letter) && c.letter !== 'envelope' ? c.letter : 'typed',
  };
}
