# Contributing to Crumple

Thank you for helping. This guide covers the setup, the checks that run before a change is merged, and the style rules.

## Setup

You need Node.js 18 or newer (CI uses Node 22). The browser tests also need Chrome.

```bash
git clone https://github.com/devAndreotti/crumple.git
cd crumple
npm ci
```

## Build

```bash
npm run build
```

This compiles `src/` into `dist/` (global build, ES module, CommonJS, source maps and the `.d.cts` types) and copies the build to `docs/lib/` for the demo site.

The built files are committed. CI runs the build and fails if `dist/` or `docs/lib/` changed, so **always run `npm run build` after changing `src/` and commit the result**.

## Tests

```bash
npm run test:node      # unit tests (node:test), no browser needed
npm test               # unit tests, then the browser suites
```

The browser suites (smoke, flow, robust, burnflip and states) use puppeteer-core with a local Chrome. They pick the browser this way:

1. The `CHROME` environment variable, if set (`CHROME=/usr/bin/google-chrome npm run test:browser`).
2. Otherwise the first Chrome found in the usual install paths (see `tests/helpers.cjs`).
3. Otherwise puppeteer's own `chrome` channel lookup.

The browser tests run with software WebGL (SwiftShader), so they are slow on machines without a GPU. Give them time.

Screenshots from the browser suites go to `tests/out/`, which is git-ignored.

## Style

- **Zero runtime dependencies.** Development dependencies are fine when they are needed for the build or the tests. Nothing may be added to what the library ships.
- **Dense code.** Short functions and compact expressions are preferred to long ones, as long as they stay readable.
- **Short comments.** Explain why, not what. A comment is one line when possible.
- **Modules stay small.** Keep the source files in `src/` focused on one job.
- **Import safety.** Nothing may touch `window`, `document` or WebGL when a module is imported. Node and SSR must keep working.
- **Public API changes** update `crumple.d.ts`, the tests in `tests/node.test.mjs` (they check that the declarations match the runtime) and the README (English and Portuguese).

## Commits and branches

- Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`.
- Keep each commit focused. A rebuilt `dist/` belongs in the same commit as the source that changed it.
- Work on a branch and open a pull request against `main`.

## Pull request checklist

Before you request a review, make sure that:

- [ ] `npm run build` was run and `dist/` and `docs/lib/` are committed and up to date.
- [ ] `npm run test:node` passes, and `npm test` passes when the change touches the library or the demo.
- [ ] No runtime dependency was added.
- [ ] The public API, the declarations and the README (English and Portuguese) agree if the API changed.
- [ ] Visual changes come with before and after screenshots or a short clip in the pull request.
- [ ] The commits follow Conventional Commits.

## Releasing

1. Bump `version` in `package.json` and add the entry to `CHANGELOG.md` in the same pull request.
2. After it is merged to `main`, create a GitHub release with the tag `vX.Y.Z` (the same version).
3. The `publish` workflow checks the tag against `package.json`, rebuilds, runs the node tests and publishes to npm with provenance. It needs the one-time trusted publisher setup on npmjs.com (see the workflow file).

## Reporting bugs and ideas

Open an issue with the bug or feature template. For security problems, do not open a public issue; follow [SECURITY.md](./SECURITY.md).

## License

By contributing, you agree that your contribution is released under the [MIT license](./LICENSE).
