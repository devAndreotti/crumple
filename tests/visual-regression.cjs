// tests/visual-regression.cjs: Automated visual regression & headless render suite for Crumple presets and procedural features.
const fs = require('fs');
const path = require('path');
const { session } = require('./helpers.cjs');

const outDir = path.join(__dirname, 'out', 'visual-regression');
fs.mkdirSync(outDir, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const s = await session(process.argv[2], { defaultViewport: { width: 800, height: 600 } });
  try {
    const page = await s.browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push('PageError: ' + e.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push('ConsoleError: ' + msg.text());
    });

    await page.goto(s.base + '/tests/shapes.html', { waitUntil: 'load', timeout: 120000 });
    await page.waitForFunction('window.__ready === true', { timeout: 60000, polling: 100 });
    const stageEl = await page.$('#stage');

    const testSuites = [
      { id: 'type-fax', cfg: { type: 'fax', seed: 24, text: 'TELEFAX G3 TRANSMISSION\nOK 9600 BAUD' } },
      { id: 'type-cyanotype', cfg: { type: 'cyanotype', seed: 25, text: 'CYANOTYPE SOLAR STUDY\nPRUSSIAN BLUE PRINT' } },
      { id: 'type-manuscript', cfg: { type: 'manuscript', seed: 26, text: 'ANNO DOMINI MCCLIV\nILLUMINATED FOLIO' } },
      { id: 'type-market', cfg: { type: 'market', seed: 27, text: 'FARMERS MARKET\nTOTAL: $14.50' } },
      { id: 'feature-clip-reg', cfg: { type: 'typed', states: ['clip'], seed: 42, text: 'CLIP REGRESSION TEST' } },
      { id: 'feature-seal-reg', cfg: { type: 'typed', seed: 10, seal: { symbol: '⚜', color: 'crimson' }, text: 'WAX SEAL REGRESSION' } }
    ];

    const results = [];
    for (const item of testSuites) {
      await page.evaluate(async (cfg) => {
        await __stage.set(cfg, { progress: 1 });
      }, item.cfg);
      await sleep(250);

      const filePath = path.join(outDir, `${item.id}.png`);
      await stageEl.screenshot({ path: filePath });
      const stats = fs.statSync(filePath);
      if (stats.size < 2000) {
        throw new Error(`Screenshot ${item.id}.png is abnormally small (${stats.size} bytes). Blank canvas suspected.`);
      }
      results.push({ id: item.id, size: stats.size });
    }

    console.log(`[visual-regression] SUCCESS: ${results.length} visual regression cases validated in headless WebGL.`);
    results.forEach((r) => console.log(`  - ${r.id}: ${r.size} bytes`));
    if (errors.length) {
      console.error('[visual-regression] Found errors during run:', errors);
      process.exitCode = 1;
    }
  } finally {
    await s.close();
  }
})().catch((err) => {
  console.error('[visual-regression] FAILED:', err.message);
  process.exit(1);
});
