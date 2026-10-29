# Tasks: Crumple v1.1 Enhancements

**Spec**: `/specs/001-v1-enhancements/spec.md`  
**Decisions**: `/specs/001-v1-enhancements/decisions.md`  
**Plan**: `/specs/001-v1-enhancements/plan.md`

## Instructions

- Group tasks by user story priority (P1, P2, P3, P4).
- Every acceptance scenario has at least one implementation task and one verification task.
- Sized for ~30–90 minutes per task.

## P1 — Accessible Reading & Vertex Performance (Core Engine)

### Acceptance Scenario 1 (A11y Dialog Structure & Describedby)
- [x] [Impl] Move `.crumple-sr` text container inside `.crumple-bar` dialog in `src/scene.js`, wire `aria-labelledby="crumple-title"` and `aria-describedby="crumple-content"`, and preserve rich semantic tags (`<del>`, `<ins>`, `.crumple-h`).
- [x] [Verify] Run `node tests/robust.cjs` and assert screen reader elements are verified within the dialog bounds without focus or trapping regressions.

### Acceptance Scenario 2 (Analytic Vertex Normals in Vertex Shader)
- [x] [Impl] Refactor deformation helpers in `src/shaders.js` to compute analytic normals and call `place()` once per vertex instead of three times.
- [x] [Verify] Verify shader compilation and visual parity by running `node tests/smoke.cjs` and checking pixel snapshot equality.

## P2 — Mobile Touch Ergonomics & Haptics

### Acceptance Scenario 1 (Pinch 2-to-1 Finger Transition)
- [x] [Impl] Update touch tracking in `src/motion.js` `dragControl` to recalculate base references when finger count transitions from 2 to 1 without resetting progress or locking `d.pinch`.
- [x] [Verify] Add touch gesture transition test in `tests/flow.cjs` verifying continuous drag after releasing one finger.

### Acceptance Scenario 2 (Swipe to Flip & Flick to Close)
- [x] [Impl] Implement velocity vector tracking in `src/motion.js` and bind `flip()` on horizontal swipe (`|vx| > 0.20 px/ms`) and `close()` on vertical flick (`vy > 0.75 px/ms`).
- [x] [Verify] Add automated gesture velocity simulation test in `tests/flow.cjs` asserting `crumple:flip` event fires.

### Acceptance Scenario 3 (Tactile Feedback via navigator.vibrate)
- [x] [Impl] Add conditional haptic utility in `src/util.js` and trigger discrete vibration pulses in `src/scene.js` / `src/stage.js` on unfold snap, stub tear, and burning embers when reduced motion is disabled.
- [x] [Verify] Run Node unit tests with mocked `navigator.vibrate` asserting proper vibration timings are called.

## P3 — Framework DX & Universal Web Component

### Acceptance Scenario 1 (Universal Web Component `<crumple-paper>`)
- [x] [Impl] Create `src/element.js` implementing `<crumple-paper>` Custom Element, forward attributes (`type`, `shape`, `states`, `text`, `back`, `open`), and export in `src/index.js`.
- [x] [Verify] Add headless browser test in `tests/robust.cjs` registering and opening a `<crumple-paper>` element.

### Acceptance Scenario 2 (React Hook & StrictMode Cleanliness)
- [x] [Impl] Author `examples/react/useCrumple.ts` and document framework recipes (React, Vue 3 directive, Svelte action) in `README.md`.
- [x] [Verify] Mount test verifying attach/detach cycle twice on the same element without duplicate ID warnings.

## P4 — Rich SVG Content & Audio Warmth

### Acceptance Scenario 1 (SVG ForeignObject Content Rasterization)
- [x] [Impl] Add `renderForeignObject` in `src/print.js` to rasterize HTML/SVG strings with embedded CSS onto Canvas 2D when `cfg.rich` is specified.
- [x] [Verify] Create test paper with QR code SVG and table content; assert non-empty render snapshot without canvas security exceptions.

### Acceptance Scenario 2 (Pink Noise Filtering & Resonance in Procedural Sound)
- [x] [Impl] Update noise buffer generator in `src/sound.js` with a 1-pole recursive low-pass filter and add a 400Hz peaking biquad filter for paper body resonance.
- [x] [Verify] Run `node tests/smoke.cjs` to confirm audio context and playback methods execute cleanly without clipping or errors.

## Final Verification

- [x] Run full test suite (`npm run test:node` and headless tests).
- [x] Run `npm run build` and verify `dist/crumple.min.js` gzip size < 38 KB (36.4 KB).
- [x] Verify all acceptance scenarios.
