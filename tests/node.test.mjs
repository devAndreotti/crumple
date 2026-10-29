// node --test tests/node.test.mjs: no browser needed. Import safety in Node, the CJS build, the public surface
// (src/index.js vs crumple.d.ts), normalize(), and the pure helpers. Run `npm run build` first (dist/ is tested).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalize, TYPES, TEXTS, ADDRESS, STATES, SHAPES } from '../src/catalog.js';
import { rng, noise2 } from '../src/util.js';
import { creaseField, burnField } from '../src/fields.js';
import * as src from '../src/index.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const RUNTIME = ['CrumplePaper', 'Renderer', 'SHAPES', 'STATES', 'Scene', 'Sound', 'Stage', 'TEXTS', 'TYPES', 'config', 'normalize', 'registerPaperType', 'registerWearState', 'version'];

test('no window in Node: the ESM build and the sources import without throwing', async () => {
  assert.equal(typeof globalThis.window, 'undefined');
  assert.equal(typeof globalThis.document, 'undefined');
  const esm = await import(path.join(root, 'dist/crumple.esm.js'));
  assert.deepEqual(Object.keys(esm).sort(), RUNTIME);
  assert.equal(esm.version, '1.2.0');
  assert.equal(typeof esm.Scene.attach, 'function');
  assert.deepEqual(Object.keys(src).sort(), RUNTIME);
});

test('CJS build: require() gives the same surface', () => {
  const cjs = require(path.join(root, 'dist/crumple.cjs'));
  assert.deepEqual(Object.keys(cjs).sort(), RUNTIME);
  assert.equal(cjs.version, '1.2.0');
  assert.equal(typeof cjs.normalize, 'function');
});

test('package self-reference: exports map resolves for import, require and package.json', async () => {
  const pkg = require('@devandreotti/crumple/package.json');
  assert.equal(pkg.name, '@devandreotti/crumple');
  assert.equal(require('@devandreotti/crumple').version, '1.2.0');
  assert.equal((await import('@devandreotti/crumple')).version, '1.2.0');
});

test('normalize(): defaults for an empty config', () => {
  const c = normalize();
  assert.deepEqual(c, { id: 'typed', type: 'typed', shape: 'ball', states: [], text: TEXTS.typed, back: '', seed: 7, open: 'auto', hiddenInk: '', burnAfterReading: false, image: '', burn: 'corner', address: ADDRESS, letter: 'typed', stamp: 'RECEIVED' });
});

test('normalize(): unknown type falls back to typed and unknown states are dropped', () => {
  assert.equal(normalize({ type: 'nope' }).type, 'typed');
  assert.equal(normalize({ type: 'memo' }).type, 'memo');
  assert.equal(normalize({ type: 'memo' }).text, TEXTS.memo);
  assert.deepEqual(normalize({ states: ['burnt', 'bogus', 'torn', 'toString'] }).states, ['burnt', 'torn']);
  assert.deepEqual(normalize({ states: 'burnt' }).states, []);
  assert.equal(normalize({ burn: 'spots' }).burn, 'spots');
  assert.equal(normalize({ burn: 'toString' }).burn, 'corner');
  assert.equal(normalize({ stamp: '  void ' }).stamp, 'void');
  assert.equal(normalize({ stamp: '   ' }).stamp, 'RECEIVED');
});

test('normalize(): seed, open and envelope handling', () => {
  assert.equal(normalize({ seed: 0 }).seed, 0);
  assert.equal(normalize({}).seed, 7);
  assert.equal(normalize({ seed: 'x' }).seed, 7);
  assert.equal(normalize({ seed: 3.9 }).seed, 3);
  assert.equal(normalize({ open: 'drag' }).open, 'drag');
  assert.equal(normalize({ open: 'yes' }).open, 'auto');
  assert.equal(normalize({ type: 'envelope' }).shape, 'envelope');
  assert.equal(normalize({ type: 'envelope', shape: 'ball' }).shape, 'envelope');
  assert.equal(normalize({ type: 'envelope', letter: 'envelope' }).letter, 'typed');
  assert.equal(normalize({ type: 'typed', shape: 'roll' }).shape, 'roll');
  assert.equal(normalize({ type: 'typed', shape: 'nope' }).shape, TYPES.typed.shape);
  assert.equal(normalize({ text: 42 }).text, TEXTS.typed);
  assert.equal(normalize({ address: undefined }).address, ADDRESS);
});

test('the declared surface matches the runtime exports (crumple.d.ts both ways)', () => {
  const dts = readFileSync(path.join(root, 'crumple.d.ts'), 'utf8');
  const declared = new Set([...dts.matchAll(/^export (?:declare )?(?:const|function|class|let|var) (\w+)/gm)].map((m) => m[1]));
  const runtime = Object.keys(src);
  for (const n of runtime) assert.ok(declared.has(n), `runtime export ${n} is not declared in crumple.d.ts`);
  for (const n of declared) assert.ok(runtime.includes(n), `crumple.d.ts declares ${n} but src/index.js does not export it`);
});

test('the .d.cts copy and the .d.ts are the same file', () => {
  assert.equal(readFileSync(path.join(root, 'dist/crumple.d.cts'), 'utf8'), readFileSync(path.join(root, 'crumple.d.ts'), 'utf8'));
});

test('rng: same seed, same sequence; values in [0, 1)', () => {
  const a = rng(42), b = rng(42), c = rng(43);
  const sa = Array.from({ length: 200 }, () => a());
  assert.deepEqual(sa, Array.from({ length: 200 }, () => b()));
  assert.notDeepEqual(sa, Array.from({ length: 200 }, () => c()));
  assert.ok(sa.every((v) => v >= 0 && v < 1));
  assert.equal(new Set(sa).size > 190, true);
});

test('noise2: deterministic and within [0, 1]', () => {
  const n = noise2(9), m = noise2(9);
  for (let i = 0; i < 300; i++) {
    const x = i * 0.37 - 20, y = i * 0.21 + 3;
    const v = n(x, y);
    assert.equal(v, m(x, y));
    assert.ok(v >= 0 && v <= 1, `out of range: ${v}`);
  }
});

test('creaseField and burnField: pure height fields of the right size', () => {
  const o = { seed: 5, shape: 1, w: 0.84, h: 1.1, card: false, foldY: 0.2 };
  const a = creaseField(o, 32, 40), b = creaseField(o, 32, 40);
  assert.equal(a.length, 32 * 40);
  assert.ok(a.every(Number.isFinite));
  assert.deepEqual(a, b);
  const burn = burnField({ seed: 6 }, 24, 20);
  assert.equal(burn.length, 24 * 20);
  assert.ok(burn.every(Number.isFinite));
  assert.deepEqual(burn, burnField({ seed: 6 }, 24, 20));
});

test('catalog tables: every paper type has a text and a shape; every state has a label', () => {
  for (const [k, t] of Object.entries(TYPES)) {
    assert.ok(typeof TEXTS[k] === 'string' && TEXTS[k].length > 0, `text for ${k}`);
    assert.ok(t.shape === 'envelope' || SHAPES[t.shape], `shape for ${k}`);
  }
  for (const v of Object.values(STATES)) assert.equal(typeof v, 'string');
});

test('registerPaperType and registerWearState extend the catalog', () => {
  const { registerPaperType, registerWearState, normalize } = src;
  registerPaperType('custom_scroll', { name: 'Custom scroll', w: 0.8, h: 1.0, color: [0.9, 0.85, 0.7], shape: 'roll', font: 'Caveat', size: 40, lineHeight: 50, x: 50, y: 50, ink: [20, 20, 20] });
  assert.equal(normalize({ type: 'custom_scroll' }).type, 'custom_scroll');
  assert.equal(normalize({ type: 'custom_scroll' }).shape, 'roll');
  registerWearState('gilded', { name: 'Gold leaf' });
  assert.deepEqual(normalize({ states: ['gilded'] }).states, ['gilded']);
});

test('haptic utility safely interacts with navigator.vibrate', async () => {
  const { haptic } = await import('../src/util.js');
  let calledWith = null;
  const original = globalThis.navigator?.vibrate;
  if (!globalThis.navigator) globalThis.navigator = {};
  globalThis.navigator.vibrate = (val) => { calledWith = val; return true; };
  haptic(12);
  assert.equal(calledWith, 12);
  haptic([10, 20, 30]);
  assert.deepEqual(calledWith, [10, 20, 30]);
  if (original) globalThis.navigator.vibrate = original;
  else delete globalThis.navigator.vibrate;
  assert.doesNotThrow(() => haptic(12));
});

test('new paper types, shapes, and wear states are registered and normalize correctly', () => {
  const newTypes = ['blueprint', 'postcard', 'punchcard', 'shipping', 'kraft', 'parchment', 'ledger', 'carbon'];
  for (const t of newTypes) {
    const c = normalize({ type: t });
    assert.equal(c.type, t);
    assert.ok(TYPES[t]);
    assert.ok(TEXTS[t]);
    assert.ok(c.shape === 'envelope' || SHAPES[c.shape]);
  }
  const newShapes = ['accordion', 'triangle'];
  for (const sh of newShapes) {
    assert.ok(SHAPES[sh]);
    const c = normalize({ shape: sh });
    assert.equal(c.shape, sh);
  }
  const newStates = ['staple', 'grease', 'dogear', 'damp', 'creased', 'clip'];
  for (const st of newStates) {
    assert.ok(STATES[st]);
    const c = normalize({ states: [st] });
    assert.deepEqual(c.states, [st]);
  }
});

test('creaseField handles new shapes and wear states (accordion, triangle, damp, creased)', () => {
  for (const shape of ['accordion', 'triangle']) {
    const cf = creaseField({ seed: 10, shape, w: 0.9, h: 0.7, card: false, states: ['creased', 'damp'] }, 32, 32);
    assert.equal(cf.length, 32 * 32);
    assert.ok(cf.every(Number.isFinite));
  }
});
