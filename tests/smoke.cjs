// node tests/smoke.cjs [baseURL]: renders every paper type closed and open, saves screenshots, fails on page errors.
// Without baseURL it serves the repo itself (tests/helpers.cjs); CHROME=/path/to/chrome picks the browser.
const fs = require('fs');
const { session } = require('./helpers.cjs');
const out = __dirname + '/out/';
const sleep = (t) => new Promise((r) => setTimeout(r, t));
fs.mkdirSync(out, { recursive: true });
(async () => {
  const s = await session(process.argv[2], { defaultViewport: { width: 900, height: 640 } });
  try {
    const p = await s.browser.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(s.base + '/tests/smoke.html', { waitUntil: 'load', timeout: 180000 });
    await p.waitForFunction('window.__ready === true', { timeout: 180000, polling: 200 });
    const n = await p.evaluate(() => Crumple.Scene.entries.length);
    for (let i = 0; i < n; i++) {
      const id = await p.evaluate((i) => Crumple.Scene.entries[i].cfg.id, i);
      for (const [tag, pr] of [['closed', 0], ['open', 1]]) {
        await p.evaluate(async (i, pr) => { await Crumple.Scene.frame(i, 1, pr); }, i, pr);
        await sleep(150);
        await p.screenshot({ path: `${out}${String(i).padStart(2, '0')}-${tag}.png` });
        await p.screenshot({ path: `${out}${id}-${tag}.png` });
      }
    }
    console.log('papers:', n, 'errors:', errs.length ? errs.join(' | ') : 'none');
    if (errs.length) process.exitCode = 1;
  } finally {
    await s.close();
  }
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
