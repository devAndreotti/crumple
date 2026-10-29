// node tests/robust.cjs [baseURL]: Stage destroy (20 cycles), context loss and restore, focus and keys in Scene,
// CSS fallback text, forged build failure, duplicate ids, detach and Scene destroy. Exits 1 on any failure.
const { session } = require('./helpers.cjs');
const fails = [];
const check = (name, ok, extra = '') => { console.log((ok ? 'ok    ' : 'FAIL  ') + name + (extra ? '  [' + extra + ']' : '')); if (!ok) fails.push(name); };
// browser messages that are expected while a context is lost, or from the forced failures
const EXPECTED = /CONTEXT_LOST|forced 2d failure|could not be built/;
(async () => {
  const s = await session(process.argv[2]);
  const b = s.browser, base = s.base;
  const open = async (query = '') => {
    const p = await b.newPage();
    const log = { errs: [], warns: [] };
    p.on('pageerror', (e) => log.errs.push(e.message));
    // console.warn reports as 'warn' in some puppeteer versions and 'warning' in others
    p.on('console', (m) => { if (m.type() === 'error') log.errs.push(m.text()); if (m.type() === 'warn' || m.type() === 'warning') log.warns.push(m.text()); });
    await p.setViewport({ width: 900, height: 640 });
    await p.goto(base + '/tests/robust.html' + query, { waitUntil: 'load', timeout: 120000 });
    await p.waitForFunction('window.__ready === true', { timeout: 60000 });
    return { p, log };
  };
  const unexpected = (log) => [...log.errs].filter((m) => !EXPECTED.test(m));
  const sleep = (t) => new Promise((r) => setTimeout(r, t));

  // 1. Stage: 20 create/destroy cycles, one more draws, no context-limit warning, seed 0 kept
  {
    const { p, log } = await open();
    const r = await p.evaluate(async () => {
      const make = (i) => { const c = document.createElement('canvas'); c.style.width = '200px'; c.style.height = '200px'; document.body.appendChild(c); return c; };
      for (let i = 0; i < 20; i++) {
        const c = make(i), s = Crumple.Stage(c, { drag: false, flashlight: false });
        await s.set({ type: 'sticky', seed: i + 1 }, { progress: 1 });
        s.destroy();
        c.remove();
      }
      const c = make(), s = Crumple.Stage(c, { drag: false, flashlight: false });
      await s.set({ type: 'sticky', seed: 3 }, { progress: 1 });
      const len = s.png().length;
      s.flip(); s.destroy();
      s.flip(); s.uncrumple(); // safe after destroy
      return { len, seed0: Crumple.normalize({ seed: 0 }).seed, after: s.png() };
    });
    const tooMany = log.warns.filter((w) => /Too many active WebGL contexts/.test(w)).length;
    check('stage: 20 destroys then one more draws', r.len > 3000, 'png ' + r.len + ' bytes');
    check('stage: no "Too many active WebGL contexts" warning', tooMany === 0, 'warnings ' + tooMany);
    check('stage: methods are no-ops after destroy', r.after === '');
    check('catalog: seed 0 stays 0', r.seed0 === 0);
    check('stage: no page errors', unexpected(log).length === 0, unexpected(log).join(' | '));
    await p.close();
  }

  // 2. Stage: context loss, then restore: the paper is built again and draws
  {
    const { p, log } = await open();
    const r = await p.evaluate(async () => {
      const c = document.createElement('canvas'); c.id = 'lost'; c.style.width = '200px'; c.style.height = '200px'; document.body.appendChild(c);
      const s = Crumple.Stage(c, { drag: false, flashlight: false });
      await s.set({ type: 'typed', seed: 9 }, { progress: 1 });
      const old = s.paper, before = s.png().length;
      const gl = c.getContext('webgl2'), ext = gl.getExtension('WEBGL_lose_context');
      let lost = false, restored = false;
      c.addEventListener('webglcontextlost', () => { lost = true; });
      c.addEventListener('webglcontextrestored', () => { restored = true; });
      ext.loseContext();
      await window.waitFor(() => lost && gl.isContextLost());
      const blank = s.png();
      ext.restoreContext();
      await window.waitFor(() => restored && s.paper && s.paper !== old);
      const after = s.png().length;
      s.destroy();
      return { before, after, blank: blank.length, same: s.paper === null };
    });
    check('stage: lost context draws nothing', r.blank === 0 || r.blank < 3000, 'png while lost ' + r.blank);
    check('stage: restored context rebuilds and draws', r.after > 3000, 'before ' + r.before + ' after ' + r.after);
    check('stage: no page errors during loss', unexpected(log).length === 0, unexpected(log).join(' | '));
    await p.close();
  }

  // 3. Scene: focus, keys and focus restore; context loss; duplicate ids; detach; destroy and attach again
  {
    const { p, log } = await open();
    await p.evaluate(() => { window.__flips = 0; document.addEventListener('crumple:flip', () => { window.__flips++; }); });
    const settle = 'Crumple.Scene.debug && Crumple.Scene.debug.phase === "open" && !Crumple.Scene.debug.tw.includes("p")';
    await p.evaluate(() => document.getElementById('robust-typed').click());
    await p.waitForFunction(settle, { timeout: 300000, polling: 200 });
    const dlg = await p.evaluate(() => {
      const bar = document.querySelector('.crumple-bar');
      const sr = bar.querySelector('.crumple-sr');
      return {
        role: bar.getAttribute('role'),
        modal: bar.getAttribute('aria-modal'),
        label: bar.getAttribute('aria-label'),
        describedby: bar.getAttribute('aria-describedby'),
        hasSrInside: !!sr && sr.id === 'crumple-content',
        focusInside: !!document.activeElement.closest('.crumple-bar')
      };
    });
    check('scene: overlay is a modal dialog with a label and describedby', dlg.role === 'dialog' && dlg.modal === 'true' && dlg.label === 'Typewritten sheet' && dlg.describedby === 'crumple-content' && dlg.hasSrInside, JSON.stringify(dlg));
    check('scene: focus moves into the dialog on open', dlg.focusInside);
    let trapped = true;
    const steps = [false, false, false, false, false, true, true];
    for (const shift of steps) {
      if (shift) await p.keyboard.down('Shift');
      await p.keyboard.press('Tab');
      if (shift) await p.keyboard.up('Shift');
      trapped = trapped && (await p.evaluate(() => !!document.activeElement.closest('.crumple-bar')));
    }
    check('scene: Tab and Shift+Tab stay inside the dialog', trapped);
    await p.evaluate(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'f', ctrlKey: true, bubbles: true })));
    await sleep(100);
    check('scene: Ctrl+F does not flip', (await p.evaluate(() => window.__flips)) === 0);
    await p.evaluate(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'f', bubbles: true })));
    await sleep(100);
    check('scene: plain F flips', (await p.evaluate(() => window.__flips)) === 1);
    await p.evaluate(() => { const f = document.getElementById('field'); f.focus(); f.dispatchEvent(new KeyboardEvent('keydown', { key: 'f', bubbles: true })); });
    await sleep(100);
    check('scene: F typed in a field does not flip', (await p.evaluate(() => window.__flips)) === 1);
    await p.evaluate(() => document.getElementById('field').blur());
    await p.keyboard.press('Escape');
    await p.waitForFunction('!Crumple.Scene.isOpen', { timeout: 300000, polling: 200 });
    const back = await p.evaluate(() => document.activeElement.id);
    check('scene: focus returns to the trigger on close', back === 'robust-typed', 'focus on ' + back);

    // context loss on the scene canvas: papers are built again, the open one stays open
    await p.evaluate(() => document.getElementById('robust-typed').click());
    await p.waitForFunction(settle, { timeout: 300000, polling: 200 });
    const cr = await p.evaluate(async () => {
      const old = Crumple.Scene.entries.find((e) => e.btn.id === 'robust-typed').P;
      const c = document.querySelector('canvas.crumple-scene'), gl = c.getContext('webgl2'), ext = gl.getExtension('WEBGL_lose_context');
      let restored = false, lost = false;
      c.addEventListener('webglcontextlost', () => { lost = true; });
      c.addEventListener('webglcontextrestored', () => { restored = true; });
      ext.loseContext();
      await window.waitFor(() => lost && gl.isContextLost()); // restoreContext is ignored until the lost event has fired
      ext.restoreContext();
      await window.waitFor(() => restored && Crumple.Scene.entries.find((e) => e.btn.id === 'robust-typed').P !== old);
      await new Promise((r) => setTimeout(r, 400));
      return { open: Crumple.Scene.isOpen, lost: gl.isContextLost(), phase: Crumple.Scene.debug && Crumple.Scene.debug.phase };
    });
    check('scene: restore rebuilds the open paper', cr.open && !cr.lost && cr.phase === 'open', JSON.stringify(cr));
    await p.keyboard.press('Escape');
    await p.waitForFunction('!Crumple.Scene.isOpen', { timeout: 300000, polling: 200 });

    // duplicate ids and double attach
    const dup = await p.evaluate(() => {
      const btn = document.createElement('button');
      document.getElementById('row').appendChild(btn);
      Crumple.Scene.attach(btn, { id: 'robust-typed', type: 'typed' });
      const old = document.getElementById('robust-typed');
      const same = document.createElement('button');
      document.getElementById('row').appendChild(same);
      Crumple.Scene.attach(same, { id: 'robust-two', type: 'sticky' });
      Crumple.Scene.attach(same, { id: 'robust-two', type: 'sticky' });
      return {
        oldBound: old.classList.contains('crumple-trigger'),
        oneForId: Crumple.Scene.entries.filter((e) => e.cfg.id === 'robust-typed').length,
        oneForBtn: Crumple.Scene.entries.filter((e) => e.btn === same).length,
      };
    });
    check('scene: same id again detaches the previous paper', !dup.oldBound && dup.oneForId === 1, JSON.stringify(dup));
    check('scene: attaching one element twice keeps one binding', dup.oneForBtn === 1);
    await sleep(300); // console events reach node a moment after the page logs them
    check('scene: duplicate id is warned about', log.warns.some((w) => /already attached/.test(w)));
    const det = await p.evaluate(() => {
      Crumple.Scene.detach('robust-note');
      const note = document.getElementById('robust-note');
      Crumple.Scene.detach(document.querySelector('#row button:last-child'));
      return { noteBound: note.classList.contains('crumple-trigger'), left: Crumple.Scene.entries.length };
    });
    check('scene: detach by id and by element', !det.noteBound && det.left === 1, JSON.stringify(det));

    // destroy: the page is clean, attach starts it again
    const des = await p.evaluate(() => {
      Crumple.Scene.destroy();
      return { canvas: !!document.querySelector('canvas.crumple-scene'), bar: !!document.querySelector('.crumple-bar'), entries: Crumple.Scene.entries.length, styles: document.querySelectorAll('style').length };
    });
    check('scene: destroy removes overlay, styles and entries', !des.canvas && !des.bar && des.entries === 0, JSON.stringify(des));
    const again = await p.evaluate(async () => {
      const b = document.createElement('button');
      document.getElementById('row').appendChild(b);
      Crumple.Scene.attach(b, { id: 'robust-again', type: 'typed' });
      b.click();
      await window.waitFor(() => Crumple.Scene.isOpen);
      return Crumple.Scene.isOpen;
    });
    check('scene: attach works again after destroy', again === true);
    await p.keyboard.press('Escape');
    await p.waitForFunction('!Crumple.Scene.isOpen', { timeout: 300000, polling: 200 });
    check('scene: no unexpected page errors', unexpected(log).length === 0, unexpected(log).join(' | '));
    await p.close();
  }

  // 4. CSS fallback without WebGL2: struck word with its fix, redaction bar with no text, heading without "# "
  {
    const { p, log } = await open('?nogl');
    await p.evaluate(() => document.getElementById('robust-note').click());
    await p.waitForFunction('document.querySelector(".crumple-fallback.on")', { timeout: 60000 });
    const fb = await p.evaluate(() => {
      const f = document.querySelector('.crumple-fallback'), sheet = f.querySelector('.sheet');
      return {
        del: [...sheet.querySelectorAll('del')].map((x) => x.textContent),
        ins: [...sheet.querySelectorAll('ins')].map((x) => x.textContent),
        redact: sheet.querySelectorAll('.crumple-redact[aria-label="redacted"]').length,
        text: sheet.textContent,
        heading: sheet.querySelector('.crumple-h') && sheet.querySelector('.crumple-h').textContent,
        label: f.getAttribute('aria-label'), role: f.getAttribute('role'), focus: document.activeElement.textContent,
      };
    });
    check('fallback: struck word is in del', fb.del.includes('milk'), JSON.stringify(fb.del));
    check('fallback: the correction is shown in ins', fb.ins.includes('oat milk'), JSON.stringify(fb.ins));
    check('fallback: redaction is a bar, its text is gone', fb.redact >= 1 && !/secret/.test(fb.text) && !/\[\[|~~|\{/.test(fb.text), fb.text.slice(0, 80));
    check('fallback: heading has no "# "', fb.heading === 'tuesday' && !/# /.test(fb.text));
    check('fallback: labelled dialog, focus on close', fb.role === 'dialog' && fb.label === 'Notebook page' && fb.focus === '[ close ]', fb.label + ' / ' + fb.focus);
    await p.keyboard.press('Escape');
    await p.waitForFunction('!document.querySelector(".crumple-fallback.on")', { timeout: 60000 });
    check('fallback: Escape closes and focus returns to the trigger', (await p.evaluate(() => document.activeElement.id)) === 'robust-note');
    check('fallback: no page errors', unexpected(log).length === 0, unexpected(log).join(' | '));
    await p.close();
  }

  // 5. A failed build shows the CSS sheet, clears its cache, and the next click builds the paper
  {
    const { p, log } = await open();
    await p.evaluate(() => { window.__fail2d = true; window.addTrigger('robust-fail', 'memo'); });
    await p.evaluate(() => document.getElementById('robust-fail').click());
    await p.waitForFunction('document.querySelector(".crumple-fallback.on")', { timeout: 120000 });
    check('build failure: the CSS sheet opens', true);
    await p.keyboard.press('Escape');
    await p.waitForFunction('!document.querySelector(".crumple-fallback.on")', { timeout: 60000 });
    await p.evaluate(() => { window.__fail2d = false; document.getElementById('robust-fail').click(); });
    await p.waitForFunction('Crumple.Scene.isOpen', { timeout: 300000, polling: 200 });
    check('build failure: the next click builds the paper', true);
    await p.keyboard.press('Escape');
    await p.waitForFunction('!Crumple.Scene.isOpen', { timeout: 300000, polling: 200 });
    await sleep(300);
    const bad = unexpected(log);
    check('build failure: only the expected warning', bad.length === 0 && log.warns.some((w) => /could not be built/.test(w)), bad.join(' | '));
    await p.close();
  }

  // 6. Custom Element <crumple-paper> and Rich Content
  {
    const { p, log } = await open();
    const wc = await p.evaluate(async () => {
      const el = document.createElement('crumple-paper');
      el.id = 'test-wc';
      el.setAttribute('type', 'receipt');
      el.setAttribute('text', '# Custom Receipt');
      document.getElementById('row').appendChild(el);
      const isRegistered = !!customElements.get('crumple-paper');
      const entry = Crumple.Scene.entries.find((e) => e.cfg.id === 'test-wc');
      el.btn.click();
      await window.waitFor(() => Crumple.Scene.isOpen);
      const openWhileMounted = Crumple.Scene.isOpen;
      Crumple.Scene.close();
      await window.waitFor(() => !Crumple.Scene.isOpen);
      el.remove();
      const leftAfterRemove = Crumple.Scene.entries.some((e) => e.cfg.id === 'test-wc');
      return { isRegistered, attached: !!entry, openWhileMounted, detached: !leftAfterRemove };
    });
    check('custom element: <crumple-paper> attaches, opens, closes, detaches', wc.isRegistered && wc.attached && wc.openWhileMounted && wc.detached, JSON.stringify(wc));
    await p.close();
  }

  await s.close();
  console.log(fails.length ? 'FAILED: ' + fails.join('; ') : 'all robust checks passed');
  if (fails.length) process.exit(1);
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
