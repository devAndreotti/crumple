// node tools/prerender.cjs <papers.json> <out dir> [size=256] [baseURL]
// Writes <id>.webp (closed) and <id>-opened.webp (loosely crumpled) for every config, so a page can show
// its papers without building any of them until the reader gets close. Needs puppeteer (or puppeteer-core + CHROME).
const fs = require('fs');
const path = require('path');
const http = require('http');
let puppeteer;
try { puppeteer = require(process.env.PUPPETEER || 'puppeteer'); } catch (e) { puppeteer = require('puppeteer-core'); }
const [list, outDir, size = '256', baseArg] = process.argv.slice(2);
if (!list || !outDir) { console.error('usage: node tools/prerender.cjs <papers.json> <out dir> [size] [baseURL]'); process.exit(1); }
const root = path.join(__dirname, '..');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.webp': 'image/webp', '.json': 'application/json' };
(async () => {
  let base = baseArg, server = null;
  if (!base) {
    // tiny static server for the repo root
    server = http.createServer((req, res) => {
      const f = path.join(root, decodeURIComponent(req.url.split('?')[0]));
      if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(res);
    }).listen(0, '127.0.0.1');
    await new Promise((r) => server.once('listening', r));
    base = 'http://127.0.0.1:' + server.address().port;
  }
  const configs = JSON.parse(fs.readFileSync(list, 'utf8'));
  const b = await puppeteer.launch({ executablePath: process.env.CHROME, args: ['--no-sandbox'], protocolTimeout: 900000 });
  const p = await b.newPage();
  p.on('pageerror', (e) => console.error('page error:', e.message));
  await p.goto(base + '/tools/prerender.html', { waitUntil: 'load' });
  await p.waitForFunction('window.__ready === true');
  const res = await p.evaluate((c, s) => window.__render(c, s), configs, +size);
  fs.mkdirSync(outDir, { recursive: true });
  for (const r of res) {
    fs.writeFileSync(path.join(outDir, r.id + '.webp'), Buffer.from(r.closed.split(',')[1], 'base64'));
    fs.writeFileSync(path.join(outDir, r.id + '-opened.webp'), Buffer.from(r.opened.split(',')[1], 'base64'));
  }
  console.log(`${res.length * 2} images → ${outDir}`);
  await b.close();
  if (server) server.close();
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
