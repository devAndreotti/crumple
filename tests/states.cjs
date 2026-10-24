// node tests/states.cjs [baseURL]: renders the new paper states (typed and notebook, closed, open, back) and one combo; saves PNGs
// to tests/out/ (or $OUT), fails on page errors. Needs dist/ built first (node tools/build.mjs).
const { session } = require('./helpers.cjs');
const fs = require('fs');
const out = process.env.OUT || __dirname + '/out/';
fs.mkdirSync(out, { recursive: true });
(async () => {
  const s = await session(process.argv[2]);
  const b = s.browser, base = s.base;
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await p.setViewport({ width: 900, height: 640 });
  await p.goto(base + '/tests/states.html', { waitUntil: 'load', timeout: 120000 });
  await p.waitForFunction('window.__ready === true', { timeout: 60000 });
  const n = await p.evaluate(() => Crumple.Scene.entries.length);
  for (let i = 0; i < n; i++) {
    const id = await p.evaluate((i) => Crumple.Scene.entries[i].cfg.id, i);
    // closed, open front, open back (flip = f 1)
    for (const [tag, pr, f] of [['closed', 0, 0], ['open', 1, 0], ['back', 1, 1]]) {
      await p.evaluate(async (i, pr, f) => { await Crumple.Scene.frame(i, 1, pr, f); }, i, pr, f);
      await new Promise((r) => setTimeout(r, 150));
      await p.screenshot({ path: `${out}${id}-${tag}.png` });
    }
  }
  console.log('papers:', n, 'errors:', errs.length ? errs.join(' | ') : 'none');
  await s.close();
  if (errs.length) process.exit(1);
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
