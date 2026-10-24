// Small shared helpers. rng and noise2 also run inside the Web Worker, so they must stay self-contained.

export function rng(seed) {
  let s = (Math.imul(seed | 0, 2654435761) >>> 0) || 1;
  return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
}

// value noise with 4 octaves, in [0, 1]
export function noise2(seed) {
  const h = (x, y) => { let n = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1442695041) | 0; n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };
  const vn = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = h(xi, yi), b = h(xi + 1, yi), c = h(xi, yi + 1), d = h(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
  return (x, y) => (vn(x, y) * 0.5 + vn(x * 2, y * 2) * 0.25 + vn(x * 4, y * 4) * 0.125 + vn(x * 8, y * 8) * 0.0625) / 0.9375;
}

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const smooth = (t) => t * t * (3 - 2 * t);
export const lerp = (a, b, t) => a + (b - a) * t;
export const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t) => 1 - (1 - t) * (1 - t);
export const easeUnfold = (t) => 0.5 * smooth(t) + 0.5 * easeOut(t);
export const linear = (t) => t;
// flight out: leaves with a push and brakes on arrival; flight back: lifts off slowly and lands with speed (so it can bounce)
export const easeFly = (t) => 0.35 * smooth(t) + 0.65 * (1 - Math.pow(1 - t, 3));
export const easeReturn = (t) => t * t * (1.6 - 0.6 * t);
export const easeSoft = (t) => 0.55 * t + 0.45 * smooth(t);
// on balls almost nothing changes until p ≈ 0.25 (each point opens only after the center did):
// this curve runs quickly through that stretch so the ball never looks stuck, then settles slowly
export const easeOpen = (P) => (P.F.shape === 0 ? (t) => 1 - Math.pow(1 - t, 2.3) : easeUnfold);
export const easeCrumple = (P) => (P.F.shape === 0 ? (t) => 1 - Math.pow(1 - t, 2.2) : easeIO);

// global settings (public as Crumple.config)
export const config = {
  // base URL of the assets folder (textures); detected from the script URL when possible
  assets: /* @__PURE__ */ (() => {
    try {
      const src = document.currentScript && document.currentScript.src;
      if (src && /\/dist\/[^/]+$/.test(src)) return src.replace(/dist\/[^/]+$/, 'assets/');
    } catch (e) { /* no DOM */ }
    return 'assets/';
  })(),
  // prefix for localStorage keys (sound preference, opening counts, burnt papers)
  storagePrefix: 'crumple.',
  // load the paper fonts from Google Fonts on demand (set false if the page already ships them)
  googleFonts: true,
};

export const store = {
  get(k, d) { try { const v = localStorage.getItem(config.storagePrefix + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(config.storagePrefix + k, JSON.stringify(v)); } catch (e) { /* no storage: keep going without saving */ } },
  remove(k) { try { localStorage.removeItem(config.storagePrefix + k); } catch (e) { /* no storage */ } },
};

// readBack = the canvas goes back to the CPU with getImageData: willReadFrequently avoids the GPU path
export const makeCanvas = (w, h, readBack) => { const c = document.createElement('canvas'); c.width = w; c.height = h; if (readBack) c.getContext('2d', { willReadFrequently: true }); return c; };
export const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

// events go out on the trigger element (they bubble), e.g. crumple:open, crumple:close, crumple:flip, crumple:tear, crumple:burn
export function emitEvent(el, name, detail) {
  try { (el || document).dispatchEvent(new CustomEvent('crumple:' + name, { bubbles: true, detail })); } catch (e) { /* old browsers */ }
}

// paper fonts arrive only when a paper is built: the page loads just its own
const FONTS = { 'Special Elite': 'Special+Elite', 'Courier Prime': 'Courier+Prime:wght@400;700', Caveat: 'Caveat:wght@500', VT323: 'VT323', 'Libre Baskerville': 'Libre+Baskerville:ital,wght@0,400;0,700;1,400' };
const fontsRequested = {};
export function ensureFonts(list) {
  if (!document.fonts) return Promise.resolve();
  return Promise.all(list.map((f) => {
    if (!fontsRequested[f]) {
      const spec = FONTS[f];
      const fam = spec ? 'family=' + spec.split(':')[0] : null;
      const has = !spec || !config.googleFonts || [...document.querySelectorAll('link[rel=stylesheet]')].some((l) => l.href.includes(fam));
      const css = has ? Promise.resolve() : new Promise((res) => {
        const l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = 'https://fonts.googleapis.com/css2?family=' + spec + '&display=swap';
        l.onload = res; l.onerror = res; setTimeout(res, 4000);
        document.head.appendChild(l);
      });
      // bold and italic too: the canvas does not wait for a font, it would draw with the fallback
      fontsRequested[f] = css.then(() => Promise.all(['', 'bold ', 'italic '].map((v) => document.fonts.load(`${v}40px "${f}"`).catch(() => null))));
    }
    return fontsRequested[f];
  }));
}

const images = {};
export function loadImage(src) {
  // decode() before use: the image is not decoded at the time of the first drawImage
  if (!images[src]) {
    images[src] = new Promise((res) => {
      const i = new Image();
      i.crossOrigin = 'anonymous';
      i.onload = () => (i.decode ? i.decode().then(() => res(i), () => res(i)) : res(i));
      i.onerror = () => res(null);
      i.src = src;
    });
  }
  return images[src];
}
// stain, fingerprint and grain textures: downloaded only when a paper uses them
export const loadTexture = (name) => loadImage(config.assets + 'textures/' + name + '.webp');
