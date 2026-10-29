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
    await p.goto(s.base + '/tests/shapes.html', { waitUntil: 'load', timeout: 120000 });
    await p.waitForFunction('window.__ready === true', { timeout: 60000, polling: 100 });
    const stageEl = await p.$('#stage');
    const shapes = ['accordion', 'triangle'];
    for (const sh of shapes) {
      for (const [tag, pr] of [['closed', 0], ['open', 1]]) {
        await p.evaluate(async (sh, pr) => {
          await __stage.set({ type: 'typed', shape: sh, seed: 15 }, { progress: pr });
        }, sh, pr);
        await sleep(300);
        await stageEl.screenshot({ path: `${out}shape-${sh}-${tag}.png` });
      }
    }
    console.log('shapes tested:', shapes.join(', '), 'errors:', errs.length ? errs.join(' | ') : 'none');
    if (errs.length) process.exitCode = 1;
  } finally {
    await s.close();
  }
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
