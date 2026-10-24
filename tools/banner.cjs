// node tools/banner.cjs [baseURL]: renders Banner.webp (1600x560) and docs/og.jpg (1200x630) from tools/banner.html
const puppeteer = require(process.env.PUPPETEER || 'puppeteer');
const path = require('path');
const base = process.argv[2] || 'http://127.0.0.1:8080';
(async () => {
  const b = await puppeteer.launch({ executablePath: process.env.CHROME, args: ['--no-sandbox', '--hide-scrollbars'], protocolTimeout: 900000 });
  for (const [w, h, out, type] of [[1600, 560, 'Banner.webp', 'webp'], [1200, 630, 'docs/og.jpg', 'jpeg']]) {
    const p = await b.newPage();
    await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await p.goto(`${base}/tools/banner.html?w=${w}&h=${h}`, { waitUntil: 'networkidle0', timeout: 120000 });
    await p.evaluate(() => window.__done);
    await p.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 800));
    await p.screenshot({ path: path.join(__dirname, '..', out), type, quality: 86 });
    console.log('wrote', out);
  }
  await b.close();
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
