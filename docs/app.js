// Crumple site: galleries, triggers, playground, sound, copy buttons, language.
(function () {
  'use strict';

  var T = window.SiteI18n;
  var lang = T.lang;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  // ---- static strings and language buttons
  T.apply(document);
  $$('.lang button').forEach(function (b) {
    b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    b.addEventListener('click', function () { T.set(b.getAttribute('data-lang')); });
  });

  // ---- galleries (every card is a trigger button; papers attach once papers.json is read)
  var TYPE_IDS = ['typed', 'notebook', 'form', 'receipt', 'ticket', 'memo', 'newspaper', 'sticky', 'polaroid', 'envelope'];
  var SHAPE_IDS = ['ball', 'flat', 'quarters', 'half', 'thirds', 'roll', 'twist'];
  var STATE_IDS = [
    ['state-torn', 'state.torn'],
    ['state-burnt', 'state.burnt'],
    ['state-coffee', 'state.coffee'],
    ['state-water', 'state.water'],
    ['state-prints', 'state.prints'],
    ['state-aged', 'state.aged'],
    ['state-scribbled', 'state.scribbled'],
    ['state-burn-after', 'state.burnAfter'],
    ['state-hidden-ink', 'state.hidden'],
    ['state-envelope', 'state.envelope']
  ];

  function card(paperId, nameKey, descKey) {
    var art = el('article', 'card');
    var stage = el('div', 'card-stage');
    var btn = el('button', 'paper-btn');
    btn.type = 'button';
    btn.setAttribute('data-paper', paperId);
    btn.setAttribute('data-name', nameKey);
    stage.appendChild(btn);
    art.appendChild(stage);
    var h = el('h3');
    h.textContent = T.t(nameKey);
    art.appendChild(h);
    if (descKey) {
      var p = el('p');
      p.textContent = T.t(descKey);
      art.appendChild(p);
    }
    return art;
  }

  var galleries = {
    types: TYPE_IDS.map(function (t) { return card('type-' + t, 'type.' + t + '.name', 'type.' + t + '.desc'); }),
    shapes: SHAPE_IDS.map(function (s) { return card('shape-' + s, 'shape.' + s, null); }),
    states: STATE_IDS.map(function (s) { return card(s[0], s[1], null); })
  };
  Object.keys(galleries).forEach(function (name) {
    var host = $('[data-gallery="' + name + '"]');
    if (!host) return;
    galleries[name].forEach(function (node) { host.appendChild(node); });
  });

  // hero triggers already exist in the HTML; label every trigger before attaching
  $$('[data-paper]').forEach(function (btn) {
    btn.setAttribute('aria-label', T.t('trigger.open') + T.t(btn.getAttribute('data-name')));
  });

  // ---- Scene: triggers
  var Crumple = window.Crumple;
  var hasLib = !!(Crumple && Crumple.Scene);

  if (hasLib) {
    Crumple.config.assets = 'assets/';
    Crumple.Scene.init({ labels: T.sceneLabels(), motion: 'auto', flashlight: true, remember: false });

    fetch('papers.json', { cache: 'no-cache' })
      .then(function (r) { return r.json(); })
      .then(function (list) {
        var byId = {};
        list.forEach(function (p) { byId[p.id] = p; });
        $$('[data-paper]').forEach(function (btn) {
          var id = btn.getAttribute('data-paper');
          var base = byId[id];
          if (!base) return;
          var cfg = Object.assign({}, base, T.paper(id));
          Crumple.Scene.attach(btn, cfg, {
            snapshot: 'snaps/' + id + '.webp',
            snapshotOpened: 'snaps/' + id + '-opened.webp'
          });
        });
      })
      .catch(function () { /* without the papers the galleries stay as plain labels */ });
  }

  // ---- playground
  var ctl = {
    type: $('#ctl-type'),
    shape: $('#ctl-shape'),
    states: $('#ctl-states'),
    text: $('#ctl-text'),
    back: $('#ctl-back'),
    hidden: $('#ctl-hidden'),
    seed: $('#ctl-seed'),
    open: $('#ctl-open'),
    burn: $('#ctl-burn'),
    random: $('#ctl-random')
  };
  var progress = $('#progress');
  var json = $('#json-out');

  // type and shape options, labels in the active language
  TYPE_IDS.forEach(function (t) {
    var o = el('option');
    o.value = t;
    o.textContent = T.t('type.' + t + '.name');
    ctl.type.appendChild(o);
  });
  ['']
    .concat(SHAPE_IDS)
    .forEach(function (s) {
      var o = el('option');
      o.value = s;
      o.textContent = s ? T.t('shape.' + s) : T.t('play.shapeDefault');
      ctl.shape.appendChild(o);
    });
  // the seven paper states (burn-after, hidden ink and the envelope are options of their own, not states)
  ['torn', 'burnt', 'coffee', 'water', 'prints', 'aged', 'scribbled'].forEach(function (id) {
    var label = el('label');
    var box = el('input');
    box.type = 'checkbox';
    box.value = id;
    label.appendChild(box);
    label.appendChild(document.createTextNode(' ' + T.t('state.' + id)));
    ctl.states.appendChild(label);
  });

  function setDefaults() {
    ctl.type.value = 'typed';
    ctl.shape.value = '';
    ctl.text.value = T.t('play.defaultText');
    ctl.back.value = T.t('play.defaultBack');
    ctl.hidden.value = '';
    ctl.seed.value = '7';
    ctl.open.value = 'auto';
    ctl.burn.checked = false;
    progress.value = '1';
  }
  setDefaults();

  var canvas = $('#stage');
  var stage = null;
  try { stage = Crumple.Stage ? Crumple.Stage(canvas, { fit: 0.8 }) : null; } catch (e) { stage = null; }
  if (!stage) {
    $('#nogl').hidden = false;
    $$('.play-bar button, #progress, .controls input, .controls select, .controls textarea').forEach(function (n) { n.disabled = true; });
  }

  function readConfig() {
    var cfg = { id: 'playground', type: ctl.type.value };
    if (ctl.type.value !== 'envelope' && ctl.shape.value) cfg.shape = ctl.shape.value;
    var states = $$('#ctl-states input:checked').map(function (b) { return b.value; });
    if (states.length) cfg.states = states;
    cfg.text = ctl.text.value;
    if (ctl.back.value) cfg.back = ctl.back.value;
    if (ctl.hidden.value.trim()) cfg.hiddenInk = ctl.hidden.value;
    cfg.seed = Math.max(1, parseInt(ctl.seed.value, 10) || 7);
    cfg.open = ctl.open.value === 'drag' ? 'drag' : 'auto';
    if (ctl.burn.checked) cfg.burnAfterReading = true;
    return cfg;
  }

  function paintJson() {
    json.textContent = JSON.stringify(readConfig(), null, 2);
  }

  var timer = 0;
  function rebuild() {
    timer = 0;
    if (!stage) return;
    var p = Number(progress.value);
    var pr = stage.set(readConfig(), { progress: p });
    if (pr && pr.catch) pr.catch(function () { /* a failed build keeps the last paper */ });
  }
  function schedule() {
    paintJson();
    clearTimeout(timer);
    timer = setTimeout(rebuild, 300);
  }

  // controls that change the paper rebuild it (debounced); the type also decides whether shape is used
  function syncShapeEnabled() { ctl.shape.disabled = ctl.type.value === 'envelope' || !stage; }
  ctl.type.addEventListener('change', function () { syncShapeEnabled(); schedule(); });
  [ctl.shape, ctl.open, ctl.burn].forEach(function (n) { n.addEventListener('change', schedule); });
  $$('#ctl-states input').forEach(function (b) { b.addEventListener('change', schedule); });
  [ctl.text, ctl.back, ctl.hidden, ctl.seed].forEach(function (n) { n.addEventListener('input', schedule); });
  ctl.random.addEventListener('click', function () {
    ctl.seed.value = String(1 + Math.floor(Math.random() * 99998));
    schedule();
  });
  progress.addEventListener('input', function () {
    if (stage) stage.setProgress(Number(progress.value));
  });
  syncShapeEnabled();

  var actions = {
    crumple: function () { stage && stage.crumple(); },
    uncrumple: function () { stage && stage.uncrumple(); },
    flip: function () { stage && stage.flip(); },
    tear: function () { stage && stage.tear(); },
    burn: function () { stage && stage.burn(); },
    restore: function () { if (stage) { stage.restore(); stage.restoreStub(); } }
  };
  $$('[data-act]').forEach(function (b) {
    b.addEventListener('click', function () {
      var fn = actions[b.getAttribute('data-act')];
      if (fn) fn();
    });
  });
  $('#png').addEventListener('click', function () {
    if (!stage) return;
    var url = stage.png();
    if (!url) return;
    var a = el('a');
    a.href = url;
    a.download = 'crumple-' + ctl.type.value + '.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
  });

  paintJson();
  if (stage) timer = setTimeout(rebuild, 60);

  // ---- sound
  var soundBtn = $('#sound-toggle');
  var soundLabel = $('#sound-label');
  function paintSound() {
    var on = !!(Crumple && Crumple.Sound && Crumple.Sound.enabled);
    soundBtn.setAttribute('aria-pressed', String(on));
    soundLabel.textContent = T.t(on ? 'sound.on' : 'sound.off');
  }
  soundBtn.addEventListener('click', function () {
    if (!Crumple || !Crumple.Sound) return;
    var next = !Crumple.Sound.enabled;
    Crumple.Sound.set(next);
    if (next) Crumple.Sound.play('flip');
    paintSound();
  });
  paintSound();

  // ---- copy buttons (code blocks and the JSON box)
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = el('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      ta.remove();
      ok ? resolve() : reject(new Error('copy'));
    });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.copy');
    if (!b) return;
    var target = b.getAttribute('data-copy-target');
    var code = target ? document.getElementById(target) : (b.closest('.code') && b.closest('.code').querySelector('code'));
    if (!code) return;
    if (!b.getAttribute('data-label')) b.setAttribute('data-label', b.textContent);
    copyText(code.textContent).then(function () {
      flash(b, T.t('copied'));
    }, function () {
      flash(b, T.t('copyFail'));
    });
  });
  function flash(b, msg) {
    b.textContent = msg;
    clearTimeout(b._t);
    b._t = setTimeout(function () { b.textContent = b.getAttribute('data-label') || T.t('copy'); }, 1500);
  }

  // the sound button re-reads its state when the page comes back from the back-forward cache
  window.addEventListener('pageshow', function (ev) { if (ev.persisted) paintSound(); });
})();
