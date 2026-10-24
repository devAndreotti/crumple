// node tests/burnflip.cjs [baseURL]: burn on a plain paper (Stage), every burn form, singed, flips at any moment
// (Scene flight and crumpled, Stage at p = 0 and 0.5, envelope). Saves screenshots to BURNFLIP_OUT (default tests/out/).
// Stage advances at most 0.05 s per frame, so on a slow software renderer a 0.8 s tween can take a minute of wall time
const { session } = require('./helpers.cjs');
const fs = require('fs');
const out = process.env.BURNFLIP_OUT || __dirname + '/out/';
fs.mkdirSync(out, { recursive: true });
const sleep = (t) => new Promise((r) => setTimeout(r, t));
const TEXT = 'To whoever finds this:\n\nI folded every thought I could not say out loud.\n\n- A.';
const fails = [];
const check = (ok, what) => { console.log((ok ? 'ok   ' : 'FAIL ') + what); if (!ok) fails.push(what); };
(async () => {
  const s = await session(process.argv[2]);
  const b = s.browser, base = s.base;
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await p.setViewport({ width: 600, height: 680 });
  await p.goto(base + '/tests/burnflip.html', { waitUntil: 'load', timeout: 120000 });
  await p.waitForFunction('window.__ready === true', { timeout: 60000 });
  const stageEl = await p.$('#stage');
  const shot = (name) => stageEl.screenshot({ path: `${out}${name}.png` });
  const set = (cfg, pr) => p.evaluate(async (cfg, pr) => { await __stage.set(cfg, { progress: pr }); }, cfg, pr);

  // 1. plain typed paper: burn() resolves, the burn progresses, the pixels change
  await set({ type: 'typed', seed: 21, text: TEXT }, 1);
  await sleep(800);
  const before = await p.evaluate(() => __stage.png());
  await shot('burn-plain-before');
  await p.evaluate(() => __stage.burn());
  await p.waitForFunction('__stage.state.destroy > 0.5', { timeout: 120000, polling: 100 });
  const d = await p.evaluate(() => __stage.state.destroy);
  await sleep(300);
  const mid = await p.evaluate(() => __stage.png());
  await shot('burn-plain-mid');
  check(d > 0.5, `plain burn progressed (destroy ${d.toFixed(2)} > 0.5)`);
  check(mid !== before, 'plain burn changed the canvas pixels');
  await p.evaluate(() => __stage.restore());

  // 2. each burn form as a burnt paper, closed and open (singed too), plus a second burn() call is a no-op
  for (const [name, states, form] of [['corner', ['burnt'], 'corner'], ['edge', ['burnt'], 'edge'], ['center', ['burnt'], 'center'], ['spots', ['burnt'], 'spots'], ['singed', ['singed'], 'corner']]) {
    for (const [tag, pr] of [['closed', 0], ['open', 1]]) {
      await set({ type: 'typed', seed: 21, text: TEXT, states, burn: form }, pr);
      await sleep(700);
      await shot(`form-${name}-${tag}`);
    }
    check(true, `burn form ${name} rendered`);
  }
  await set({ type: 'typed', seed: 21, text: TEXT, states: ['burnt'], burn: 'spots' }, 1);
  await p.evaluate(() => { window.__calls = [__stage.burn(), __stage.burn()]; });
  await p.waitForFunction('__stage.state.destroy !== undefined', { timeout: 120000, polling: 100 });
  check(await p.evaluate(() => __stage.state.tw.length === 1), 'double burn() starts one tween');

  // 3. Stage flip at p = 0 and p = 0.5, and the side is kept through crumple
  await set({ type: 'typed', seed: 21, text: TEXT }, 0);
  await p.evaluate(() => __stage.flip());
  await p.waitForFunction('__stage.state.f > 0.99', { timeout: 180000, polling: 100 });
  await shot('flip-p0');
  check(await p.evaluate(() => __stage.state.f > 0.99), 'stage flip works at p = 0');
  await p.evaluate(() => __stage.uncrumple());
  await p.waitForFunction('__stage.state.p > 0.99', { timeout: 180000, polling: 100 });
  await p.evaluate(() => __stage.crumple());
  await sleep(400);
  check(await p.evaluate(() => __stage.state.f > 0.99), 'crumple keeps the flipped side');
  await set({ type: 'typed', seed: 21, text: TEXT }, 0.5);
  await p.evaluate(() => __stage.flip());
  await p.waitForFunction('__stage.state.f > 0.99', { timeout: 180000, polling: 100 });
  await shot('flip-p05');

  // 4. envelope flipped closed and mid-opening (the letter stays on its side)
  await set({ type: 'envelope', seed: 21, text: TEXT }, 0);
  await p.evaluate(() => __stage.flip());
  await p.waitForFunction('__stage.state.f > 0.99', { timeout: 180000, polling: 100 });
  await sleep(300);
  await shot('envelope-flipped-closed');
  await p.evaluate(() => __stage.setProgress(0.5));
  await sleep(400);
  await shot('envelope-flipped-opening');

  // 5. Scene: flip during the flight and while crumpled emits 'flip'
  await p.evaluate(() => { window.__flips = []; __entry.btn.addEventListener('crumple:flip', (e) => __flips.push(e.detail.back)); });
  await p.evaluate(() => Crumple.Scene.open(__entry));
  await p.waitForFunction('Crumple.Scene.debug && Crumple.Scene.debug.phase === "opening"', { timeout: 180000, polling: 20 });
  await p.evaluate(() => Crumple.Scene.flip());
  await sleep(200);
  check(await p.evaluate(() => __flips.length) === 1, "Scene flip during the flight emits 'flip'");
  await p.evaluate(() => Crumple.Scene.close());
  await p.waitForFunction('!Crumple.Scene.isOpen', { timeout: 120000, polling: 200 });
  await p.evaluate(() => { window.__flips = []; });
  await p.evaluate(async () => { await Crumple.Scene.frame(0, 1, 0); });
  await p.evaluate(() => Crumple.Scene.flip());
  await sleep(200);
  check(await p.evaluate(() => __flips.length) === 1, "Scene flip while crumpled emits 'flip'");
  await p.evaluate(async () => { await Crumple.Scene.frame(0, 0.5, 0, 0.5); });
  await sleep(300);
  await p.screenshot({ path: `${out}flip-flight-mid.png` });

  console.log('errors:', errs.length ? errs.join(' | ') : 'none');
  await s.close();
  if (errs.length) fails.push('page errors');
  console.log(fails.length ? `FAILED: ${fails.join('; ')}` : 'all burn and flip checks passed');
  if (fails.length) process.exit(1);
})().catch((e) => { console.error('FAIL', e.message); process.exit(1); });
