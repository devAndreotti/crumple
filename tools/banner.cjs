// node tools/banner.cjs [baseURL]: renders Banner.webp (1600x560) and docs/og.jpg (1200x630) from tools/banner.html.
// Without baseURL it serves the repo itself (tests/helpers.cjs).
const path = require('path');
const { session } = require('../tests/helpers.cjs');
const sleep = (t) => new Promise((r) => setTimeout(r, t));
(async () => {
  const s = await session(process.argv[2], { defaultViewport: null });
  try {
    for (const [w, h, out, type] of [[1600, 560, 'Banner.webp', 'webp'], [1200, 630, 'docs/og.jpg', 'jpeg']]) {
      const p = await s.browser.newPage();
      await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
      await p.goto(`${s.base}/tools/banner.html?w=${w}&h=${h}`, { waitUntil: 'networkidle0', timeout: 180000 });
      await p.evaluate(() => window.__done); // a promise: evaluate waits for it
      await p.evaluate(() => document.fonts.ready);
      await sleep(800);
      await p.screenshot({ path: path.join(__dirname, '..', out), type, quality: 86 });
      console.log('wrote', out);
      await p.close();
    }
  } finally {
    await s.close();
  }
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
