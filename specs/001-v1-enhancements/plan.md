# Plan: Crumple v1.1 Enhancements

**Feature Branch**: `001-v1-enhancements`  
**Date**: 2026-10-28  
**Spec**: `/specs/001-v1-enhancements/spec.md`

## Summary

Implement performance, accessibility, mobile touch, and extensibility upgrades for `@devandreotti/crumple` while maintaining zero runtime dependencies and a <38 KB gzip footprint.

## Technical Context (repo scan)

- **Stack**: Vanilla JavaScript (ES2020), WebGL2 (GLSL ES 3.00), Canvas 2D, Web Audio API, Web Workers, esbuild.
- **Key modules/files touched**:
  - `src/scene.js`: A11y structure (dialog container, aria-describedby, focus management).
  - `src/shaders.js`: Vertex shader optimization (analytic normal calculation, single `place()` call).
  - `src/motion.js`: Multi-touch pinch transition fix, swipe-to-flip, flick-to-close gestures.
  - `src/sound.js`: 1-pole pink noise filter, 400Hz plate body resonance.
  - `src/print.js`: SVG `<foreignObject>` rasterization for `rich` content.
  - `src/catalog.js`: Registry functions for custom paper types and wear states.
  - `src/element.js` (new): Universal Custom Element `<crumple-paper>`.
  - `src/index.js` & `crumple.d.ts`: Public exports and TypeScript type definitions.

## Approach (mapped to primary user flow)

1. **Accessibility Refactoring**: Move `.crumple-sr` into `.crumple-bar` modal dialog. Link with `aria-describedby` so screen readers announce title and full semantic text when paper opens.
2. **Shader Instruction Reduction**: Refactor vertex shader deformation functions (`bend`, `foldX`, `foldY`, `sphere`, etc.) to return both deformed position and analytic normal vector. Replace 3x `place()` calls with 1 call per vertex.
3. **Touch Ergonomics & Haptics**: Fix pointer tracking state machine in `dragControl()` so finger liftoff transitions from 2 fingers to 1 without deadlock. Track gesture velocity to fire `flip()` on horizontal swipe and `close()` on vertical flick. Inject lightweight `navigator.vibrate` calls behind `!Scene.reducedMotion`.
4. **Rich Content & Plugins**: In `print.js`, detect `cfg.rich` and rasterize HTML/SVG blobs into an `Image` before drawing onto 2D canvas context. Export `registerPaperType` and `registerWearState` in `catalog.js`.
5. **Universal Component & Types**: Create `src/element.js` exporting `<crumple-paper>`. Update `tools/build.mjs` and `package.json` exports map.

## Interfaces / APIs

### 1. Custom Element (`src/element.js`)
```html
<crumple-paper
  type="notebook"
  states="coffee,burnt"
  text="# Secret Note\nDetails inside."
  back="Back message"
  shape="quarters"
  open="auto">
</crumple-paper>
```

### 2. Rich Content (`PaperConfig.rich`)
```typescript
export interface RichContent {
  mode?: 'html' | 'canvas';
  body: string | ((ctx: CanvasRenderingContext2D, area: PrintArea, w: number, h: number) => void | Promise<void>);
  style?: string;
}

export interface PaperConfig {
  // ... existing fields ...
  rich?: RichContent;
}
```

### 3. Plugin Registration API (`src/catalog.js`)
```typescript
export function registerPaperType(id: string, def: TypeInfo): void;
export function registerWearState(id: string, def: { name: string; apply: Function }): void;
```

## Data Model / Migrations

No database or persistent schema migrations. `localStorage` keys maintain existing prefix (`crumple:opened:` and `crumple:burnt:`).

## Security / Privacy

- **Canvas Tainting Protection**: Rich SVG images generated via `URL.createObjectURL(blob)` must strictly prohibit unauthenticated cross-origin resource requests. An explicit check in `print.js` falls back to sanitized text if image loading fails or triggers security errors.
- **Strict Reduced Motion**: Haptic vibrations and heavy motion animations are completely suppressed when `prefers-reduced-motion` is active.

## Observability

- Non-intrusive console warnings when duplicate IDs or unregistered plugin types are detected.
- Test hooks (`Scene.debug`, `Stage.state`) preserve access for headless browser verification.

## Test Strategy (map to acceptance scenarios)

- **Scenario P1.1 (A11y)**: Expand `tests/robust.cjs` to assert `.crumple-sr` is a direct descendant of `.crumple-bar[role="dialog"]` and that `aria-describedby` resolves.
- **Scenario P1.2 (Vertex Shader)**: Automated shader syntax verification via WebGL compilation test; verify GLSL compiles with 0 warnings on SwiftShader.
- **Scenario P2.1 (Pinch Transition)**: Headless browser touch emulation test in `tests/flow.cjs` simulating 2-touch pinch followed by 1-touch release.
- **Scenario P2.2 (Swipe to Flip)**: Simulate horizontal pointer gesture with `vx > 0.35 px/ms` and assert `crumple:flip` event fires.
- **Scenario P3.1 (Web Component)**: Node unit test in `tests/node.test.mjs` validating Custom Element registration and options mapping.
- **Scenario P4.1 (Rich SVG)**: Render paper with `rich: { mode: 'html', body: '<div>Test</div>' }` and assert canvas snapshot is non-empty.

## Rollout Plan

1. Verify all unit and headless browser tests pass locally (`npm test`).
2. Build minified artifacts (`npm run build`) and verify gzip size under 38 KB.
3. Update `README.md` and `README.pt-BR.md` with framework usage guides.
4. Prepare semver minor release: `@devandreotti/crumple` v1.1.0.

## Risks + Mitigations

- **Risk 1: SVG ForeignObject CORS/Tainting**: External web fonts or remote images inside foreignObject can taint the canvas, blocking `gl.texImage2D`.  
  *Mitigation*: Restrict `<foreignObject>` documentation and examples to inline SVGs, CSS, and base64 assets; catch `SecurityError` and fall back to plain text.
- **Risk 2: Shader precision variations on mobile**: Complex analytic normal logic in vertex shader might cause precision artifacts on Mali GPUs with mediump default.  
  *Mitigation*: Keep `precision highp float;` at the top of the vertex shader.
- **Risk 3: iOS Safari lack of haptics**: `navigator.vibrate` is unsupported on Safari mobile.  
  *Mitigation*: Guard all calls with `'vibrate' in navigator`.

## Assumptions

- No external runtime dependencies permitted.
- Custom Elements are supported in all target evergreen browsers (Chrome, Safari, Firefox, Edge).
