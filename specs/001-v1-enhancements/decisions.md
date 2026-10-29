# Decisions: Crumple v1.1 Enhancements

**Feature Branch**: `001-v1-enhancements`  
**Created**: 2026-10-28

## ADR-001: Preserving Zero-Dependency WebGL2 Core with Analytic Normals and SVG ForeignObject

**Status**: Accepted  
**Date**: 2026-10-28

### Context

Following the release of `@devandreotti/crumple` v1.0.0 on npm, performance audits revealed significant mobile vertex shader overhead (calling `place()` 3 times per vertex for finite-difference normal vectors), accessibility barriers with screen reader container placement, and developer demand for rich content (QR codes, custom tables) and framework ergonomics.

Two conflicting architectural directions emerged:
1. **Aggressive Engine Rewrite**: Introduce WebGPU with WGSL compute shaders for crease generation and integrate an external Markdown parser (e.g. Marked/Remark) for rich content.
2. **Zero-Dependency Native Evolution**: Retain the 35 KB WebGL2 engine, eliminate vertex redundancy by deriving analytic normals directly in GLSL, use browser-native SVG `<foreignObject>` for rich content, and provide lightweight, zero-dependency framework adapters.

### Options Considered

1. **Option A: Full WebGPU Pipeline + External Markdown Parser**
   - *Pros*: Compute shaders generate crease textures on the GPU in <1ms (vs ~30ms CPU worker); full CommonMark markdown parsing out of the box.
   - *Cons*: WebGPU is unavailable on older iOS/Android devices and requires heavy fallbacks; adding an AST markdown library increases bundle size by 30 KB (+85% payload), violating Crumple's core value proposition of being lightweight and zero-dependency.

2. **Option B: Optimized WebGL2 Core + Native SVG ForeignObject + Analytic Normals (Chosen)**
   - *Pros*: Keeps bundle size within ~36 KB gzip with zero runtime dependencies; solves the mobile thermal bottleneck by removing 66% of vertex shader arithmetic; provides 100% browser-standard rich HTML rendering via `<svg><foreignObject>`; runs everywhere WebGL2 is supported.
   - *Cons*: SVG `<foreignObject>` rasterization is asynchronous and requires strict image/font inlining to avoid canvas tainting (`SecurityError`).

### Decision

We choose **Option B** because Crumple's adoption in the npm ecosystem depends on its lightweight, drop-in, zero-dependency nature. Eliminating vertex shader redundancy gives immediate 60fps stability on mobile without requiring a complex dual WebGL2/WebGPU architecture. Using native browser features (SVG `<foreignObject>`, `navigator.vibrate`, Custom Elements) delivers the requested capabilities at almost zero bundle cost.

### Consequences

**Positive:**
- Zero runtime dependencies maintained (`package.json` dependencies remains `{}`).
- Gzip bundle overhead capped under +2 KB across all v1.1 enhancements.
- Vertex shader ALU workload cut by ~66%, preventing thermal throttling on mobile devices.
- Universal support across React, Vue, Svelte, and vanilla HTML via native `<crumple-paper>`.

**Negative:**
- Crease heightfield generation remains on the CPU Web Worker (~25-40ms on first paper build) rather than instantaneous GPU compute.
- Rich content requires self-contained HTML/SVG without untrusted cross-origin assets to prevent canvas tainting.
