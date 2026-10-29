# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2026-10-29

### Added

- Universal Web Component `<crumple-paper>` (`CrumplePaper`): declaratively attach paper configs with zero boilerplate in HTML, React, Vue, Svelte, and Astro.
- Extensibility plugin API: `registerPaperType()` and `registerWearState()` to register custom paper textures, shaders, and wear patterns.
- Rich content rasterization via `renderForeignObject` in `print.js` supporting HTML/SVG elements (QR codes, vector graphics, custom markup).
- Mobile gestures: swipe-to-flip (`|vx| > 0.20 px/ms`) and vertical flick-to-close on touch screens.
- Smooth transition between 2-finger pinch and 1-finger drag in `dragControl`.
- Tactile haptic feedback via `navigator.vibrate` on unfold snap, stub tear, and burning embers (honors `prefers-reduced-motion`).
- Pink noise 1-pole recursive filtering and 420Hz biquad body resonance in procedural `Sound`.

### Changed

- Screen reader accessibility: moved `.crumple-sr` container inside `.crumple-bar` dialog, wired `aria-describedby="crumple-content"`, and preserved semantic tags (`<del>`, `<ins>`, `.crumple-h`).
- Vertex shader performance: refactored deformation helper `place()` to compute surface normals analytically, eliminating 2 redundant deformation evaluations per vertex (~66% ALU overhead reduction).

## [1.0.0] - 2026-10-24

### Added

- `Scene`: attach a crumpled paper to any button. It flies to the center of the screen, unfolds into a readable sheet and crumples back on close. Methods: `init`, `attach`, `detach`, `open`, `close`, `flip`, `tear`, `reset`, `destroy`.
- `Stage`: draw a paper inside your own canvas, with no flight. Methods: `set`, `crumple`, `uncrumple`, `toggle`, `flip`, `tear`, `restoreStub`, `burn`, `restore`, `setProgress`, `png`, `snapshot`, `destroy`.
- 10 paper types: typewritten sheet, notebook page, continuous form, thermal receipt, theatre ticket, office memo, newspaper clipping, sticky note, instant photo and sealed envelope.
- 7 closed shapes: ball, flat, quarters, half, thirds, roll and twist. Creases stay visible on the open sheet.
- 14 states: torn, burnt, singed, coffee, water, wine, ink, foxing, aged, tape, stamp, faded, prints and scribbled.
- Four burn forms (`corner`, `edge`, `center`, `spots`) for the `burnt` state, `burnAfterReading` and `Stage.burn()`. `Stage.burn()` works on any paper.
- Flip at any moment: crumpled, unfolding, or during the flight.
- Text markup: `#` headings, `~~word~~{fix}` struck-out words with handwritten corrections, and `[[passage]]` redaction bars that fade on each opening.
- Hidden ink revealed by a flashlight, optional envelope letters, ticket stubs that tear, burn after reading (remembered in `localStorage`), and an optional synthesized paper sound (`Sound`).
- `motion: 'auto' | 'reduce' | 'full'`, following `prefers-reduced-motion` by default.
- Keyboard and screen reader support: dialog semantics, focus trap, Escape to close, F to flip, and a live region with the paper text.
- CSS fallback without WebGL2 (`Scene` only; `Stage()` returns `null`).
- Events `crumple:open`, `crumple:close`, `crumple:flip`, `crumple:tear` and `crumple:burn`.
- Exports: `Scene`, `Stage`, `Renderer`, `Sound`, `config`, `normalize`, `TYPES`, `SHAPES`, `STATES`, `TEXTS` and `version`. TypeScript declarations in `crumple.d.ts`.

### Packaging

- ES module (`dist/crumple.esm.js`), CommonJS (`dist/crumple.cjs`) and a global build (`dist/crumple.min.js`, `window.Crumple`), with source maps.
- No runtime dependencies. About 35 KB gzip for the global build.
- Safe to import in Node and in server rendering: the DOM is touched only when a paper is used.
- Tree-shakable (`sideEffects: false`).
