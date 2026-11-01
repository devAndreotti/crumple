// node tests/lifecycle.cjs [baseURL]: <crumple-paper> moves do not stack click listeners; Scene.destroy() during the
// reduced-motion close, and redaction papers opened repeatedly, raise no page errors. Exits 1 on any failure.
const { session } = require('./helpers.cjs');
const fails = [];
const check = (name, ok, extra = '') => { console.log((ok ? 'ok    ' : 'FAIL  ') + name + (extra ? '  [' + extra + ']' : '')); if (!ok) fails.push(name); };
const sleep = (t) => new Promise((r) => setTimeout(r, t));
(async () => {
  const s = await session(process.argv[2]);
  try {
    const p = await s.browser.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    await p.setViewport({ width: 900, height: 640 });
    await p.goto(s.base + '/tests/lifecycle.html', { waitUntil: 'load', timeout: 120000 });
    await p.waitForFunction('window.__ready === true', { timeout: 60000 });

    // 1. a <crumple-paper> moved 20 times keeps the same number of click listeners on its button
    const listeners = await p.evaluate(async () => {
      const el = document.createElement('crumple-paper');
      el.setAttribute('type', 'typed'); el.setAttribute('text', 'moved');
      document.body.append(el);
      await new Promise((r) => setTimeout(r, 200));
      const first = window.liveClicks(el.btn);
      for (let i = 0; i < 20; i++) { el.remove(); document.body.append(el); }
      await new Promise((r) => setTimeout(r, 200));
      el.btn.click();
      await new Promise((r) => setTimeout(r, 900));
      const opened = document.body.classList.contains('crumple-open');
      if (opened) document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await new Promise((r) => setTimeout(r, 600));
      return { first, after: window.liveClicks(el.btn), opened };
    });
    check('crumple-paper: click listeners do not grow on move', listeners.after <= listeners.first, 'first ' + listeners.first + ', after 20 moves ' + listeners.after);
    check('crumple-paper: still opens on click after 20 moves', listeners.opened === true);

    // 2. Scene.destroy() right after a reduced-motion close: the pending hide timer must not throw
    const before = errs.length;
    await p.evaluate(() => {
      const b = document.createElement('button'); b.textContent = 'open';
      document.body.append(b);
      window.__btn = b;
      Crumple.Scene.attach(b, { type: 'typed', text: 'close me' });
    });
    await p.click('body > button:last-of-type');
    await p.waitForFunction('document.body.classList.contains("crumple-open")', { timeout: 60000 });
    await p.evaluate(() => { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); Crumple.Scene.destroy(); });
    await sleep(700);
    const destroyErrs = errs.slice(before);
    check('Scene.destroy after reduced-motion close: no page errors', destroyErrs.length === 0, destroyErrs.join(' | '));

    // 3. a redaction paper opened six times (and its envelope letter) raises no page errors
    await p.evaluate(() => {
      Crumple.Scene.init({ motion: 'reduce' });
      const b = document.createElement('button'); b.textContent = 'redacted';
      document.body.append(b);
      Crumple.Scene.attach(b, { type: 'envelope', text: 'secret [[name]] line', back: 'back [[x]]' });
    });
    const beforeR = errs.length;
    for (let i = 0; i < 6; i++) {
      const btn = await p.$('body > button:last-of-type');
      await btn.click();
      await p.waitForFunction('document.body.classList.contains("crumple-open")', { timeout: 60000 });
      await sleep(400);
      await p.keyboard.press('Escape');
      await p.waitForFunction('!document.body.classList.contains("crumple-open")', { timeout: 60000 });
      await sleep(400);
    }
    check('redaction paper opened 6 times: no page errors', errs.length === beforeR, errs.slice(beforeR).join(' | '));
    check('no page errors overall', errs.length === 0, errs.join(' | '));
  } finally {
    await s.close();
  }
  if (fails.length) { console.log('FAILED: ' + fails.join(', ')); process.exitCode = 1; }
  else console.log('all lifecycle checks passed');
})().catch((e) => { console.error(e); process.exitCode = 1; });
