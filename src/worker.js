// Web Worker for the heavy fields (creases and burn), built from the functions' own source, with a main-thread fallback.
import { rng, noise2 } from './util.js';
import { creaseField, burnField } from './fields.js';

export const Jobs = /* @__PURE__ */ (() => {
  let w, n = 0;
  const pending = new Map();
  function create() {
    try {
      const src = [rng, noise2, creaseField, burnField].map((f) => f.toString()).join('\n')
        + `\nonmessage = (e) => { const { id, name, args } = e.data; const r = name === 'creases' ? ${creaseField.name}(...args) : ${burnField.name}(...args); postMessage({ id, r }, [r.buffer]); };`;
      w = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
      w.onmessage = (e) => { const p = pending.get(e.data.id); pending.delete(e.data.id); if (p) { clearTimeout(p.t); p(e.data.r); } };
      // if the worker fails, whatever was queued is computed here (never because of a delay: a busy queue does not redo work)
      w.onerror = () => { const queue = [...pending.values()]; pending.clear(); w = null; queue.forEach((f) => { clearTimeout(f.t); f.redo(); }); };
    } catch (e) { w = null; }
  }
  const local = (name, args) => (name === 'creases' ? creaseField(...args) : burnField(...args));
  return {
    run(name, args) {
      if (w === undefined) create();
      if (!w) return Promise.resolve(local(name, args));
      const id = ++n;
      const p = new Promise((res) => { const f = (r) => res(r); f.redo = () => res(local(name, args)); pending.set(id, f); });
      w.postMessage({ id, name, args });
      // last resort, in case the worker disappears silently (cleared as soon as the job answers)
      const f = pending.get(id);
      f.t = setTimeout(() => { if (pending.delete(id)) f.redo(); }, 20000);
      return p;
    },
  };
})();
