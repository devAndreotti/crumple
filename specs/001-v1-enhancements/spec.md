# Feature Spec: Crumple v1.1 Enhancements

**Feature Branch**: `001-v1-enhancements`  
**Created**: 2026-10-28  
**Input**: User request: "crie spec detalhada de implementação dessas coisas com plano de implementação"

## Problem Statement

Crumple v1.0.0 delivers 3D procedural crumpled paper in WebGL2 with zero runtime dependencies. However, production use across mobile and modern web frameworks surfaces four concrete limitations:
1. **Accessibility isolation**: Screen readers (VoiceOver, NVDA) fall silent because the off-screen text container (`.crumple-sr`) is outside the modal dialog bar (`[role="dialog"][aria-modal="true"]`).
2. **Mobile GPU overdraw & touch friction**: Vertex shaders call `place()` 3x per vertex for finite-difference normals (90k calls/frame), causing thermal throttling on mobile GPUs. Touch interactions freeze when transitioning from 2 to 1 finger in pinch-to-crumple, and lack swipe-to-flip/flick-to-close gestures.
3. **Framework adoption & SSR hazards**: Direct usage in React/Next.js App Router, Vue, and Svelte requires manual lifecycle wiring, while dynamic assets fail with 404s on nested routes if `config.assets` is not explicitly set.
4. **Content & audio boundaries**: Printing is constrained to plain regex text formatting without QR codes or custom styling, and audio synthesis sounds harsh without pink noise filtering.

## Goals

- Fix screen reader accessibility by nesting readable semantic text inside the dialog with proper ARIA attributes.
- Cut vertex shader instruction load by ~66% by extracting analytic normals directly from the vertex placement logic.
- Stabilize touch interactions: fix pinch 2-to-1 finger release lock, add swipe-to-flip, flick-to-close, and optional haptic feedback (`navigator.vibrate`).
- Provide zero-dependency framework ergonomic adapters: universal Web Component `<crumple-paper>`, React hook `useCrumple`, Vue directive `vCrumple`, and Svelte action.
- Enable SVG `<foreignObject>` printing for rich HTML/QR-code content and expose a public plugin registry (`registerPaperType`, `registerWearState`).
- Improve procedural audio realism with 1-pole pink noise filtering and 400Hz plate body resonance.

## Non-goals

- Full WebGPU/WGSL rewrite in v1.1 (WebGL2 remains primary to preserve zero-dependency 35 KB budget).
- Full Markdown/CommonMark AST parser dependency (use native SVG foreignObject instead).
- Dynamic Delaunay 3D mesh fracturing for torn paper physics.

## Primary User Flow (Happy Path)

1. **Discovery & Setup**: Developer installs `@devandreotti/crumple` and imports either declarative `<crumple-paper>` or programmatic `Scene.attach()` / `useCrumple()`.
2. **Interaction**: Mobile user taps a crumpled paper trigger; paper takes flight smoothly at 60fps without thermal lag.
3. **Reading & A11y**: Screen reader immediately reads the document title and semantic body. Mobile user swipes horizontally to flip to the back, feeling a subtle haptic click.
4. **Rich Content**: An unfolded ticket displays an authentic crisp QR code and custom tabular styling rendered via SVG foreignObject.
5. **Closing**: User flicks down or taps close; paper crumples with natural pink-noise crinkles and returns to its trigger.

## User Stories (prioritized)

### P1 — Accessible Reading & Vertex Performance (Core Engine)

As a screen reader user and mobile visitor,  
I want Crumple to announce document contents cleanly and render smoothly without overheating my phone,  
So that I can access interactive paper content on any device without barriers.

**Acceptance Scenarios**:
1. **Given** a paper opened via `Scene.open()`, **When** a screen reader inspects the active dialog, **Then** focus is placed on a semantically structured container inside `.crumple-bar` with `aria-describedby` pointing to the text, reading headings and strikethroughs.
2. **Given** the WebGL2 vertex shader in `shaders.js`, **When** calculating surface deformation, **Then** `place()` is invoked only once per vertex, outputting an analytic normal without finite difference sampling.

### P2 — Mobile Touch Ergonomics & Haptics

As a smartphone user,  
I want natural touch gestures (pinch, swipe to flip, flick to close) and tactile feedback,  
So that the paper feels physical and responsive in my hands.

**Acceptance Scenarios**:
1. **Given** a 2-finger pinch gesture in progress, **When** the user lifts one finger, **Then** interaction smoothly transitions to 1-finger drag without freezing or jumping `p`.
2. **Given** an open sheet (`p > 0.9`), **When** a horizontal swipe with velocity `vx > 0.35 px/ms` is detected, **Then** `flip()` is triggered.
3. **Given** a device supporting `navigator.vibrate` and reduced motion disabled, **When** paper snaps fully open or tears, **Then** short haptic pulses (12ms for snap, patterned for tear) are emitted.

### P3 — Framework DX & Universal Web Component

As a frontend developer using Next.js, Vue, or Svelte,  
I want idiomatic wrappers and a native Web Component,  
So that I can integrate crumpled notes in under 5 minutes without lifecycle bugs.

**Acceptance Scenarios**:
1. **Given** a `<crumple-paper type="receipt" text="Total: $10">` in standard HTML, **When** the element connects to DOM, **Then** it attaches automatically to `Scene` and detaches cleanly on disconnect.
2. **Given** a React component using `useCrumple(config)`, **When** mounted inside React 18 StrictMode, **Then** no duplicate binding warnings or memory leaks occur.

### P4 — Rich SVG Content & Audio Warmth

As a creative developer or game designer,  
I want to print QR codes/HTML tables and hear natural paper crinkles,  
So that the paper looks like authentic physical ephemera.

**Acceptance Scenarios**:
1. **Given** a `PaperConfig` with `rich: { mode: 'html', body: '<table...' }`, **When** the paper texture builds, **Then** it rasterizes via SVG `<foreignObject>` onto the 2D canvas without CORS tainting.
2. **Given** procedural sound synthesis in `sound.js`, **When** `play('crumple')` runs, **Then** white noise is shaped by a 1-pole low-pass filter and 400Hz resonance filter.

## Requirements

### Functional

- **FR-001**: Place `.crumple-sr` content container inside the `.crumple-bar` modal dialog with matching `aria-labelledby` and `aria-describedby`.
- **FR-002**: Refactor vertex shader deformation to emit analytic normal vectors in a single pass.
- **FR-003**: Update pointer tracking in `motion.js` to handle multi-touch finger transitions without deadlocks.
- **FR-004**: Add velocity-based swipe gesture detection for `flip()` and flick gesture for `close()`.
- **FR-005**: Add conditional `navigator.vibrate` calls for snap, tear, and burn states.
- **FR-006**: Implement and export `<crumple-paper>` Custom Element in `src/element.js`.
- **FR-007**: Add `rich` property support in `print.js` using SVG `<foreignObject>` rasterization.
- **FR-008**: Expose `registerPaperType()` and `registerWearState()` in `src/catalog.js`.
- **FR-009**: Update `src/sound.js` noise buffer with pink/brownian spectral rolloff and plate resonance.

### Non-functional

- **NFR-001**: Gzipped bundle size of `dist/crumple.min.js` must remain under 38 KB (baseline: 35.0 KB).
- **NFR-002**: Zero new runtime npm dependencies (`package.json` dependencies remains empty).
- **NFR-003**: Node SSR import tests (`tests/node.test.mjs`) must pass with zero exceptions.
- **NFR-004**: Frame time on mid-tier mobile (60fps target) must not drop below 55fps during unfold animation.

## Edge Cases

- **Touch cancellation**: Sudden browser gesture interruptions (e.g. pull-to-refresh) must gracefully reset drag states without locking the view.
- **ForeignObject taint**: Invalid external image URLs in rich HTML must fail gracefully to fallback text without crashing the WebGL texture upload.
- **Vibration permission**: Environments where `navigator.vibrate` is absent or throws must fail silently.

## Success Criteria

- **SC-001**: 100% pass rate across existing test suites (`node.test.mjs`, `smoke.cjs`, `flow.cjs`, `robust.cjs`).
- **SC-002**: Screen reader audits verify that document text is announced within 200ms of dialog appearance.
- **SC-003**: Mobile vertex ALU instruction count reduced by at least 50%.

## Assumptions

- Target browsers support standard ES2020 and WebGL2 (same as v1.0.0).
- Users of framework wrappers configure public asset paths if bundling into non-root directories.
