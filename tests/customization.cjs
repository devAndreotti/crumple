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

    const cases = [
      {
        id: 'feature-clip-state',
        cfg: { type: 'typed', states: ['clip'], seed: 42, text: '# ATTACHED MEMO\n\nSecured with classic steel wire paper clip.\nFiber holds tension across upper margin.' }
      },
      {
        id: 'feature-wax-seal',
        cfg: { type: 'typed', seed: 77, seal: { symbol: '★', color: 'gold' }, text: '# DIPLOMATIC MISSIVE\n\nAffixed with gold-leaf wax seal and authentic relief stamp.' }
      },
      {
        id: 'feature-watermark',
        cfg: { type: 'ledger', seed: 99, watermark: { text: 'AUTHENTIC REPO', symbol: '✦' }, text: '12 OCT   CUSTOM LEDGER ENTRY ....... 108   1,420.00\n\nWatermark visible through fiber under light.' }
      },
      {
        id: 'feature-color-override',
        cfg: { type: 'form', color: '#fbeae2', seed: 33, text: '# CUSTOM PEACH PALETTE\n\nContinuous form with custom pastel tint override.\nGreen rules and perforation dots intact.' }
      },
      {
        id: 'feature-advanced-stamp',
        cfg: { type: 'typed', states: ['stamp'], stamp: { text: 'CONFIDENTIAL', color: '#8822bb', angle: -0.22, align: 'center' }, seed: 55, text: '# CLASSIFIED BRIEFING\n\nPurple ink rubber stamp custom oriented.' }
      }
    ];

    for (const c of cases) {
      await p.evaluate(async (cfg) => {
        await __stage.set(cfg, { progress: 1 });
      }, c.cfg);
      await sleep(350);
      await stageEl.screenshot({ path: `${out}${c.id}.png` });
    }

    console.log('customization features rendered:', cases.length, 'errors:', errs.length ? errs.join(' | ') : 'none');
    if (errs.length) process.exitCode = 1;
  } finally {
    await s.close();
  }
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
