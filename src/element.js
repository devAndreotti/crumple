// Universal Custom Element: <crumple-paper>
import { Scene } from './scene.js';

export class CrumplePaper extends (typeof HTMLElement !== 'undefined' ? HTMLElement : class {}) {
  connectedCallback() {
    let btn = this.querySelector('button');
    if (!btn) {
      btn = document.createElement('button');
      btn.type = 'button';
      this.appendChild(btn);
      this._madeBtn = true;
    }
    this.btn = btn;

    const statesAttr = this.getAttribute('states');
    const states = statesAttr ? statesAttr.split(',').map((s) => s.trim()).filter(Boolean) : undefined;
    const cfg = {
      id: this.getAttribute('id') || undefined,
      type: this.getAttribute('type') || undefined,
      shape: this.getAttribute('shape') || undefined,
      states,
      text: this.getAttribute('text') || (this._madeBtn ? '' : btn.textContent || ''),
      back: this.getAttribute('back') || undefined,
      open: this.getAttribute('open') || undefined,
      seed: this.hasAttribute('seed') ? Number(this.getAttribute('seed')) : undefined,
    };
    const snap = this.getAttribute('snapshot') || undefined;
    const snapOpened = this.getAttribute('snapshot-opened') || undefined;
    const opts = (snap || snapOpened) ? { snapshot: snap, snapshotOpened: snapOpened } : undefined;

    const mount = () => {
      if (this.entry) return;
      if (this._io) { this._io.disconnect(); this._io = null; }
      this.entry = Scene.attach(btn, cfg, opts);
    };

    btn.addEventListener('click', mount, { once: true, capture: true });

    if (typeof IntersectionObserver !== 'undefined') {
      this._io = new IntersectionObserver((es) => {
        for (const e of es) {
          if (e.isIntersecting) { mount(); break; }
        }
      }, { rootMargin: '200px' });
      this._io.observe(this);
    } else mount();
  }

  disconnectedCallback() {
    if (this._io) {
      this._io.disconnect();
      this._io = null;
    }
    if (this.btn) Scene.detach(this.btn);
    if (this._madeBtn && this.btn.parentNode) this.btn.remove();
    this.entry = null;
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('crumple-paper')) {
  customElements.define('crumple-paper', CrumplePaper);
}
