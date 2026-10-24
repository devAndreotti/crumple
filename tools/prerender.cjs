// node tools/prerender.cjs <papers.json> <out dir> [size=256] [baseURL]
// Writes <id>.webp (closed) and <id>-opened.webp (loosely crumpled) for every config, so a page can show
// its papers without building any of them until the reader gets close. Needs Chrome (see tests/helpers.cjs).
const fs = require('fs');
const path = require('path');
const { session } = require('../tests/helpers.cjs');
const [list, outDir, size = '256', baseArg] = process.argv.slice(2);
if (!list || !outDir) { console.error('usage: node tools/prerender.cjs <papers.json> <out dir> [size] [baseURL]'); process.exit(1); }
(async () => {
  const configs = JSON.parse(fs.readFileSync(list, 'utf8'));
  const s = await session(baseArg, { defaultViewport: null });
  try {
    const p = await s.browser.newPage();
    p.on('pageerror', (e) => console.error('page error:', e.message));
    await p.goto(s.base + '/tools/prerender.html', { waitUntil: 'load', timeout: 180000 });
    await p.waitForFunction('window.__ready === true', { timeout: 180000, polling: 200 });
    const res = await p.evaluate((c, s) => window.__render(c, s), configs, +size);
    fs.mkdirSync(outDir, { recursive: true });
    for (const r of res) {
      fs.writeFileSync(path.join(outDir, r.id + '.webp'), Buffer.from(r.closed.split(',')[1], 'base64'));
      fs.writeFileSync(path.join(outDir, r.id + '-opened.webp'), Buffer.from(r.opened.split(',')[1], 'base64'));
    }
    console.log(`${res.length * 2} images → ${outDir}`);
  } finally {
    await s.close();
  }
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
