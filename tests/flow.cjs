// node tests/flow.cjs [baseURL]: click → fly → open → events → close, envelope, and burn after reading.
// Without baseURL it serves the repo itself (tests/helpers.cjs); CHROME=/path/to/chrome picks the browser.
const { session } = require('./helpers.cjs');
const sleep = (t) => new Promise((r) => setTimeout(r, t));
// every wait polls and has a long timeout: a headless Chrome without GPU can be slow under load
const WAIT = { timeout: 300000, polling: 300 };
(async () => {
  const s = await session(process.argv[2], { defaultViewport: { width: 900, height: 640 } });
  try {
    const p = await s.browser.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(s.base + '/tests/smoke.html', { waitUntil: 'load', timeout: 180000 });
    await p.waitForFunction('window.__ready === true', { timeout: 180000, polling: 200 });
    await p.evaluate(() => { localStorage.clear(); window.__ev = []; ['open', 'close', 'flip', 'tear', 'burn'].forEach((n) => document.addEventListener('crumple:' + n, (e) => window.__ev.push(n + ':' + e.detail.id))); });
    const run = async (type, after) => {
      await p.evaluate((t) => document.querySelector(`[data-type="${t}"]`).click(), type);
      await p.waitForFunction('Crumple.Scene.debug && Crumple.Scene.debug.phase === "open"', WAIT);
      await p.waitForFunction('Crumple.Scene.debug && !Crumple.Scene.debug.tw.includes("p")', WAIT);
      if (after) await after();
      await p.evaluate(() => Crumple.Scene.close());
      await p.waitForFunction('!Crumple.Scene.isOpen', WAIT);
    };
    await run('typed', async () => { await p.evaluate(() => Crumple.Scene.flip()); await sleep(2500); });
    await run('ticket', async () => { await p.evaluate(() => Crumple.Scene.tear()); await sleep(3000); });
    await run('envelope');
    await run('sticky');
    const ev = await p.evaluate(() => window.__ev);
    const hidden = await p.evaluate(() => document.querySelector('[data-type="sticky"]').hidden);
    console.log('events:', ev.join(' '));
    console.log('burnt-away trigger hidden:', hidden, '| errors:', errs.length ? errs.join(' | ') : 'none');
    const want = ['open:smoke-typed', 'flip:smoke-typed', 'close:smoke-typed', 'open:smoke-ticket', 'tear:smoke-ticket', 'close:smoke-ticket', 'open:smoke-envelope', 'close:smoke-envelope', 'open:smoke-sticky', 'burn:smoke-sticky'];
    if (errs.length || !hidden || want.some((w) => !ev.includes(w))) process.exitCode = 1;
  } finally {
    await s.close();
  }
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
