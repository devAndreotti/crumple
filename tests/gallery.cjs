// node tests/gallery.cjs [baseURL]: the docs gallery. Hover and tap run the short paper tremor, no live WebGL
// preview is created, snapshots are lazy, and reduced motion turns the tremor off. Exits 1 on any failure.
const { session } = require('./helpers.cjs');
const fails = [];
const check = (name, ok, extra = '') => { console.log((ok ? 'ok    ' : 'FAIL  ') + name + (extra ? '  [' + extra + ']' : '')); if (!ok) fails.push(name); };
const sleep = (t) => new Promise((r) => setTimeout(r, t));
(async () => {
  const s = await session();
  try {
    const p = await s.browser.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    await p.setViewport({ width: 1280, height: 900 });
    await p.evaluateOnNewDocument(() => {
      window.__anims = [];
      document.addEventListener('animationstart', (e) => window.__anims.push(e.animationName), true);
    });
    await p.goto(s.base + '/docs/index.html', { waitUntil: 'load', timeout: 120000 });
    await sleep(1800);

    const btn = await p.$('[data-paper]');
    await btn.evaluate((b) => b.scrollIntoView({ block: 'center' }));
    await sleep(500);

    // 1. hover: the tremor plays, the image stays, and no live canvas is created
    await p.evaluate(() => { window.__anims.length = 0; });
    await btn.hover();
    await sleep(600);
    const hov = await p.evaluate(() => ({ anims: window.__anims.slice(), canvases: document.querySelectorAll('canvas.preview-canvas').length, opacity: getComputedStyle(document.querySelector('[data-paper] img')).opacity }));
    check('hover runs the paper tremor', hov.anims.includes('paper-tremor'), hov.anims.join(','));
    check('hover keeps the image and creates no live canvas', hov.opacity === '1' && hov.canvases === 0, 'opacity ' + hov.opacity + ', canvases ' + hov.canvases);
    await p.mouse.move(2, 2);
    await sleep(300);

    // 2. touch: a tap runs the same tremor (touch has no hover)
    await p.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await sleep(400);
    const tbtn = await p.$('[data-paper]');
    await tbtn.evaluate((b) => b.scrollIntoView({ block: 'center' }));
    await sleep(400);
    const box = await tbtn.boundingBox();
    await p.evaluate(() => { window.__anims.length = 0; });
    await p.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
    // the class is removed by a 500 ms timer: wait up to 2 s for it to go
    await p.waitForFunction('document.querySelector("[data-paper].is-tremor") === null', { timeout: 2000 }).catch(() => {});
    const tap = await p.evaluate(() => ({ anims: window.__anims.slice(), stillMarked: document.querySelector('[data-paper].is-tremor') !== null }));
    check('tap runs the paper tremor', tap.anims.includes('paper-tremor'), tap.anims.join(','));
    check('tremor class is removed when the animation ends', tap.stillMarked === false);
    // a tap opens the paper; close it so the rest of the page is in its normal state
    await p.keyboard.press('Escape');
    await sleep(400);
    await p.setViewport({ width: 1280, height: 900 });
    await sleep(400);

    // 3. snapshots are lazy-loaded
    const lazy = await p.evaluate(() => { const i = document.querySelector('[data-paper] img'); return i ? i.loading : 'none'; });
    check('gallery snapshots are lazy-loaded', lazy === 'lazy', lazy);

    // 4. reduced motion: hovering starts no tremor
    await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await sleep(300);
    await p.evaluate(() => { window.__anims.length = 0; });
    const rbtn = await p.$('[data-paper]');
    await rbtn.evaluate((b) => b.scrollIntoView({ block: 'center' }));
    await sleep(300);
    await rbtn.hover();
    await sleep(600);
    const red = await p.evaluate(() => window.__anims.slice());
    check('reduced motion: hover starts no paper tremor', !red.includes('paper-tremor'), red.join(','));
    await p.mouse.move(2, 2);

    check('no page errors', errs.length === 0, errs.join(' | '));
  } finally {
    await s.close();
  }
  if (fails.length) { console.log('FAILED: ' + fails.join(', ')); process.exitCode = 1; }
  else console.log('all gallery checks passed');
})().catch((e) => { console.error(e); process.exitCode = 1; });
