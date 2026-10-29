// node tools/build.mjs: src/ (ES modules) → dist/crumple.min.js (global `Crumple`), dist/crumple.esm.js, dist/crumple.cjs (+ .map, .d.cts)
// Before esbuild, trims what it does not touch: GLSL (comments and whitespace) and the injected CSS.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, cpSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import path from 'node:path';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const esbuild = process.env.ESBUILD || path.join(root, 'node_modules/.bin/esbuild');
const tmp = path.join(root, '.build');
mkdirSync(tmp, { recursive: true });
mkdirSync(path.join(root, 'dist'), { recursive: true });

// copy src/ to .build/ with GLSL and CSS minified in place
for (const f of ['util', 'fields', 'worker', 'catalog', 'print', 'shaders', 'renderer', 'sound', 'particles', 'motion', 'scene', 'stage', 'element', 'index']) {
  let src = readFileSync(path.join(root, 'src', f + '.js'), 'utf8');
  src = src.replace(/`(#version 300 es[\s\S]*?)`/g, (m, body) => {
    let out = '';
    for (const raw of body.split('\n')) {
      const l = raw.replace(/\/\/.*$/, '').trim();
      if (!l) continue;
      if (l.startsWith('#')) out += (out && !out.endsWith('\n') ? '\n' : '') + l + '\n';
      else out += l + ' ';
    }
    out = out.replace(/[ \t]+/g, ' ').replace(/ ?([{}();,=+\-*/<>?:&|!]) ?/g, '$1');
    return '`' + out.trim() + '`';
  });
  src = src.replace(/css\.textContent = `([\s\S]*?)`;/, (m, c) => 'css.textContent = `' + c.replace(/\n\s*/g, '').replace(/\s*([{};,])\s*/g, '$1') + '`;');
  writeFileSync(path.join(tmp, f + '.js'), src);
}
const common = ['--bundle', '--target=es2020', '--log-level=warning', '--legal-comments=none', '--sourcemap'];
// the min build is fully minified; esm and cjs only drop syntax and keep /* @__PURE__ */ marks (bundlers
// need them to drop the unused top-level factories), and whitespace minification would strip those marks
const esm = (format, out) => execFileSync(esbuild, [path.join(tmp, 'index.js'), ...common, '--minify-syntax', '--minify-identifiers', '--format=' + format, '--outfile=' + path.join(root, 'dist', out)]);
execFileSync(esbuild, [path.join(tmp, 'index.js'), ...common, '--minify', '--format=iife', '--global-name=Crumple', '--outfile=' + path.join(root, 'dist/crumple.min.js')]);
esm('esm', 'crumple.esm.js');
esm('cjs', 'crumple.cjs');
// types for the "require" condition of package.json exports: the same file as the ESM one
copyFileSync(path.join(root, 'crumple.d.ts'), path.join(root, 'dist/crumple.d.cts'));
for (const f of ['crumple.min.js', 'crumple.esm.js', 'crumple.cjs']) {
  const b = readFileSync(path.join(root, 'dist', f));
  console.log(`dist/${f}: ${b.length} bytes, ${gzipSync(b, { level: 9 }).length} gzip`);
}
// the demo site serves its own copy of the build (with its source map) and the assets
mkdirSync(path.join(root, 'docs/lib'), { recursive: true });
copyFileSync(path.join(root, 'dist/crumple.min.js'), path.join(root, 'docs/lib/crumple.min.js'));
copyFileSync(path.join(root, 'dist/crumple.min.js.map'), path.join(root, 'docs/lib/crumple.min.js.map'));
cpSync(path.join(root, 'assets'), path.join(root, 'docs/assets'), { recursive: true, filter: (f) => !f.endsWith('.md') });
