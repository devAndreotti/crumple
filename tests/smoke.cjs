// node tests/smoke.cjs [baseURL]: renders every paper type closed and open, saves a contact sheet, fails on page errors
const puppeteer = require(process.env.PUPPETEER || 'puppeteer-core');
const fs = require('fs');
const base = process.argv[2] || 'http://127.0.0.1:8080';
const out = __dirname + '/out/';
fs.mkdirSync(out, { recursive: true });
(async () => {
  const b = await puppeteer.launch({ executablePath: process.env.CHROME || '/usr/local/bin/google-chrome', args: ['--no-sandbox', '--hide-scrollbars'], timeout: 90000, protocolTimeout: 900000 });
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await p.setViewport({ width: 900, height: 640 });
  await p.goto(base + '/tests/smoke.html', { waitUntil: 'load', timeout: 120000 });
  await p.waitForFunction('window.__ready === true', { timeout: 60000 });
  const n = await p.evaluate(() => Crumple.Scene.entries.length);
  for (let i = 0; i < n; i++) {
    for (const [tag, pr] of [['closed', 0], ['open', 1]]) {
      await p.evaluate(async (i, pr) => { await Crumple.Scene.frame(i, 1, pr); }, i, pr);
      await new Promise((r) => setTimeout(r, 150));
      await p.screenshot({ path: `${out}${String(i).padStart(2, '0')}-${tag}.png` });
    }
  }
  console.log('papers:', n, 'errors:', errs.length ? errs.join(' | ') : 'none');
  await b.close();
  if (errs.length) process.exit(1);
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
