// node tests/flow.cjs [baseURL]: click → fly → open → events → close, envelope, and burn after reading
const puppeteer = require(process.env.PUPPETEER || 'puppeteer-core');
const base = process.argv[2] || 'http://127.0.0.1:8080';
const sleep = (t) => new Promise((r) => setTimeout(r, t));
(async () => {
  const b = await puppeteer.launch({ executablePath: process.env.CHROME || '/usr/local/bin/google-chrome', args: ['--no-sandbox'], timeout: 90000, protocolTimeout: 900000 });
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await p.setViewport({ width: 900, height: 640 });
  await p.goto(base + '/tests/smoke.html', { waitUntil: 'load', timeout: 120000 });
  await p.evaluate(() => { localStorage.clear(); window.__ev = []; ['open', 'close', 'flip', 'tear', 'burn'].forEach((n) => document.addEventListener('crumple:' + n, (e) => window.__ev.push(n + ':' + e.detail.id))); });
  const run = async (type, after) => {
    await p.evaluate((t) => document.querySelector(`[data-type="${t}"]`).click(), type);
    await p.waitForFunction('Crumple.Scene.debug && Crumple.Scene.debug.phase === "open"', { timeout: 300000, polling: 300 });
    await p.waitForFunction('Crumple.Scene.debug && !Crumple.Scene.debug.tw.includes("p")', { timeout: 300000, polling: 300 });
    if (after) await after();
    await p.evaluate(() => Crumple.Scene.close());
    await p.waitForFunction('!Crumple.Scene.isOpen', { timeout: 300000, polling: 300 });
  };
  await run('typed', async () => { await p.evaluate(() => Crumple.Scene.flip()); await sleep(2500); });
  await run('ticket', async () => { await p.evaluate(() => Crumple.Scene.tear()); await sleep(3000); });
  await run('envelope');
  await run('sticky');
  const ev = await p.evaluate(() => window.__ev);
  const hidden = await p.evaluate(() => document.querySelector('[data-type="sticky"]').hidden);
  console.log('events:', ev.join(' '));
  console.log('burnt-away trigger hidden:', hidden, '| errors:', errs.length ? errs.join(' | ') : 'none');
  await b.close();
  const want = ['open:smoke-typed', 'flip:smoke-typed', 'close:smoke-typed', 'open:smoke-ticket', 'tear:smoke-ticket', 'close:smoke-ticket', 'open:smoke-envelope', 'close:smoke-envelope', 'open:smoke-sticky', 'burn:smoke-sticky'];
  if (errs.length || !hidden || want.some((w) => !ev.includes(w))) process.exit(1);
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
