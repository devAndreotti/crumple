# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- 4 new paper presets in core catalog: `fax` (thermal G3 paper with scan lines), `cyanotype` (Prussian blue solar print on heavy 220 gsm cotton), `manuscript` (medieval illuminated folio on 160 gsm rag paper), and `market` (thin thermal grocery receipt, 48 gsm).
- Interactive Playground enhancements (`docs/`):
  - On-demand live WebGL preview canvas on preset buttons with hover/focus interaction.
  - Procedural customization panel: base paper tint (`#ctl-color`), GSM paper weight (`#ctl-gsm`), watermark text (`#ctl-watermark`), wax seal symbol (`#ctl-seal`), and wear intensity (`#ctl-wear-intensity`).
  - Export tools: direct WebP image export (`#webp`) and shareable configuration URL with hash synchronization (`#share`, `#cfg=`).
  - Technical tooltips (`.tech-tooltip`) with physical paper specs (GSM, fiber type, texture).
  - WCAG 2.1 AA accessible focus outlines (`:focus-visible`) and button active feedback states.
  - Dynamic acoustic resonance tuning for all 21 paper presets in `src/sound.js`.
- Automated WebGL visual regression suite (`tests/visual-regression.cjs`, `npm run test:visual`).

## [1.2.0] - 2026-10-29

### Added

- Native scroll-lock in `Scene`: automatically applies `.crumple-open` to `document.body` on open and removes on close to prevent background scroll leaks on mobile/iOS Safari.
- Clean print styles (`@media print`): hides WebGL canvas, overlay bar, and backdrop; prints legible monospace text from `.crumple-sr` cleanly onto real A4 paper.
- Performance optimization in `<crumple-paper>`: deferred `Scene.attach()` via `IntersectionObserver` with `rootMargin: '200px'`, keeping initial LCP and TBT minimal until scrolled into view.
- 7 new paper types: `blueprint` (cobalt blue millimetric schematic), `postcard` (vintage double-sided card with stamp and postmark), `punchcard` (IBM 80-col punched card with corner chamfer and cutout holes), `shipping` / `kraft` (brown fibrous parcel with procedural 1D barcode), `parchment` (ancient papyrus with frayed cellulose edges and wax seal), `ledger` (accounting journal with double ledger rules), and `carbon` (duplicate copy with violet-blue mechanical ink).
- 2 new closed shapes: `accordion` (horizontal z-fold leaflet) and `triangle` (military triangular corner tuck).
- 5 new physical wear states: `staple` (galvanized metal staple), `grease` (translucent soaked oil spot), `dogear` (folded corner mark), `damp` (wavy dried water ripple deformation), and `creased` (dense pocket-fold grid).
- Metal paper clip wear state `clip`: renders authentic steel wire paper clip with drop shadow and wire sheen across front and back margins.
- Procedural customization options in `PaperConfig`:
  - `color`: override paper base tint with RGB array `[r, g, b]` or `#rrggbb` hex without affecting grids, rules, or text.
  - `stamp`: object configuration `{ text, color, angle, align }` supporting custom ink colors, rotation angles, and alignments.
  - `watermark`: translucent embossed-style watermark text or symbol centered on sheet.
  - `seal`: wax seal on any paper with custom symbol and color (`red`, `gold`, `burgundy`, or RGB).
  - `wearIntensity`: scalar multiplier (0..2) adjusting stain radii and opacities across physical wear states.
  - Deckle edge: organic fiber fringing along margins for vintage and parchment sheets.
- Shader fidelity enhancements (`src/shaders.js`):
  - Chemical fold whitening: analytical fold stress calculations and micro-ridge Laplacian filtering blend subtle cellulose fiber whitening along crease lines.
  - Backlight transmission (`uThru`): directional backlight shines through thin sheets, showing transmitted ink silhouettes of the opposite side.
- Dynamic acoustic resonance (`src/sound.js`):
  - Peaking filter center frequency and Q factor modulated continuously by paper weight (`gsm`) and paper type presets (heavy stock: 280–340Hz muted thud; thin sheets: 560–680Hz crisp snap).

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
