// What is printed on each side of a paper (2D canvases that become textures), and the cut-out effects
// (torn edges, punched holes, burn distance) at half resolution.
import { rng, noise2, clamp, rgba, makeCanvas, loadImage, loadTexture, config, parseColor } from './util.js';
import { CORRECTIONS, WEAR_APPLIERS } from './catalog.js';
import { Jobs } from './worker.js';

// print pixels per world unit
export const PPU = 1070;

function parseText(txt) {
  return txt.split('\n').map((line) => {
    let head = false;
    if (line.startsWith('# ')) { head = true; line = line.slice(2); }
    const toks = [];
    const re = /~~(.+?)~~(?:\{(.+?)\})?|\[\[(.+?)\]\]|(\S+)/g;
    let m;
    while ((m = re.exec(line))) {
      if (m[1] !== undefined) toks.push({ t: m[1], kind: 'strike', fix: m[2] || '' });
      else if (m[3] !== undefined) toks.push({ t: m[3], kind: 'redact' });
      else toks.push({ t: m[4], kind: 'w' });
    }
    return { head, toks };
  });
}
const fontFor = (T, head, size) => `${head && !T.hand ? 'bold ' : ''}${Math.round(size)}px "${T.font}", "Courier Prime", monospace`;

// sun-faded ink: lighter and a little warmer
const fadeInk = (c) => [c[0] + (200 - c[0]) * 0.4 + 8, c[1] + (170 - c[1]) * 0.3 + 4, c[2] + (120 - c[2]) * 0.3 - 4].map(Math.round);

function writeText(ctx, cfg, T, txt, area, openings, r) {
  const lines = parseText(txt);
  const ink = cfg.states.includes('faded') ? fadeInk(T.ink) : T.ink;
  // scribbled without markup: someone strikes out two words and corrects them by hand
  if (cfg.states.includes('scribbled') && !lines.some((l) => l.toks.some((t) => t.kind === 'strike'))) {
    const cand = [];
    lines.forEach((l) => l.toks.forEach((t) => { if (t.kind === 'w' && t.t.replace(/\W/g, '').length >= 4) cand.push(t); }));
    for (let k = 0; k < 2 && cand.length; k++) {
      const t = cand.splice(Math.floor(r() * cand.length), 1)[0];
      t.kind = 'strike'; t.fix = CORRECTIONS[Math.floor(r() * CORRECTIONS.length)];
    }
  }
  const redaction = clamp(1 - openings * 0.34);
  const cols = area.cols || 1;
  const colW = (area.w - (cols - 1) * 40) / cols;
  let col = 0, y = area.y;
  const end = area.y + area.h;
  const nz = noise2(cfg.seed + 5);
  lines.forEach((ln) => {
    const size = ln.head ? T.size * (area.headK || 1.35) : T.size;
    const lh = ln.head ? T.lineHeight * (area.headK || 1.35) : T.lineHeight;
    ctx.font = fontFor(T, ln.head, size);
    const space = ctx.measureText(' ').width;
    const width = ln.head && area.headFull ? area.w : colW;
    const rows = [[]];
    let w = 0;
    ln.toks.forEach((t) => {
      const tw = ctx.measureText(t.t).width;
      if (w > 0 && w + space + tw > width) { rows.push([]); w = 0; }
      rows[rows.length - 1].push({ ...t, tw });
      w += (w > 0 ? space : 0) + tw;
    });
    if (!ln.toks.length) { y += lh * 0.7; return; }
    rows.forEach((row) => {
      if (y > end && col < cols - 1 && !(ln.head && area.headFull)) { col++; y = area.colY || area.y; }
      const rowW = row.reduce((a, t) => a + t.tw, 0) + space * (row.length - 1);
      const x0 = area.x + (ln.head && area.headFull ? 0 : col * (colW + 40));
      let x = (area.center || (ln.head && area.centerHead)) ? x0 + (width - rowW) / 2 : x0;
      row.forEach((t) => {
        drawWord(ctx, T, t, x, y, ink, r, nz);
        if (t.kind === 'strike') strike(ctx, t, x, y, size, r);
        if (t.kind === 'redact') { ctx.fillStyle = `rgba(12,12,14,${redaction})`; ctx.fillRect(x - 5, y - size * 0.82, t.tw + 10, size * 1.06); }
        x += t.tw + space;
      });
      y += lh;
    });
    if (ln.head && area.headFull) area.colY = y + 10;
  });
  return y;
}

function drawWord(ctx, T, t, x, y, color, r, nz) {
  if (T.hand) {
    ctx.save();
    ctx.translate(x, y + (r() - 0.5) * 3);
    ctx.rotate((r() - 0.5) * 0.04);
    ctx.fillStyle = rgba(color, 0.9);
    ctx.fillText(t.t, 0, 0);
    ctx.restore();
    return;
  }
  if (T.carbon) {
    let cx = x;
    for (const ch of t.t) {
      const jx = (r() - 0.5) * 1.5, jy = (r() - 0.5) * 1.8;
      // mechanical impact bloom around character
      ctx.fillStyle = 'rgba(100, 115, 240, 0.28)';
      ctx.fillText(ch, cx + jx - 1, y + jy);
      ctx.fillText(ch, cx + jx + 1, y + jy);
      ctx.fillText(ch, cx + jx, y + jy + 1);
      // typewriter core strike
      ctx.fillStyle = rgba(color, 0.82 + r() * 0.18);
      ctx.fillText(ch, cx + jx, y + jy);
      cx += ctx.measureText(ch).width;
    }
    return;
  }
  if (T.typewriter) {
    // uneven strikes, letter by letter; thermal paper fades in patches
    let cx = x;
    for (const ch of t.t) {
      let a = 0.72 + r() * 0.28;
      if (T.fades) a *= 0.35 + 0.65 * nz(cx * 0.006, y * 0.004);
      ctx.fillStyle = rgba(color, a);
      ctx.fillText(ch, cx, y + (r() - 0.5) * 2);
      cx += ctx.measureText(ch).width;
    }
    return;
  }
  ctx.fillStyle = rgba(color, 0.92);
  ctx.fillText(t.t, x, y);
}

function strike(ctx, t, x, y, size, r) {
  ctx.save();
  ctx.strokeStyle = 'rgba(165,28,30,0.85)';
  ctx.lineWidth = Math.max(2.5, size * 0.08);
  ctx.lineCap = 'round';
  for (let k = 0; k < 2; k++) {
    ctx.beginPath();
    const yy = y - size * (0.3 + 0.08 * k);
    ctx.moveTo(x - 4, yy + (r() - 0.5) * 4);
    ctx.quadraticCurveTo(x + t.tw / 2, yy + (r() - 0.5) * 8, x + t.tw + 4, yy + (r() - 0.5) * 4);
    ctx.stroke();
  }
  if (t.fix) {
    ctx.fillStyle = 'rgba(165,28,30,0.9)';
    ctx.font = `${Math.round(size * 0.62)}px "Caveat", cursive`;
    ctx.translate(x + t.tw * 0.25, y - size * 0.66);
    ctx.rotate(-0.06);
    ctx.fillText(t.fix, 0, 0);
  }
  ctx.restore();
}

// newspaper halftone made from a photo: one dot per cell, sized by darkness
function halftone(ctx, img, x, y, w, h, step = 6) {
  const cols = Math.ceil(w / step), rows = Math.ceil(h / step);
  const c = makeCanvas(cols, rows, true), cc = c.getContext('2d');
  const k = Math.max(cols / img.width, rows / img.height);
  cc.drawImage(img, (cols - img.width * k) / 2, (rows - img.height * k) / 2, img.width * k, img.height * k);
  const d = cc.getImageData(0, 0, cols, rows).data;
  ctx.fillStyle = 'rgba(20,20,20,0.88)';
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const p = (j * cols + i) * 4, lum = (d[p] * 0.3 + d[p + 1] * 0.59 + d[p + 2] * 0.11) / 255;
    const rr = step * 0.56 * Math.sqrt(1 - lum);
    if (rr > 0.35) { ctx.beginPath(); ctx.arc(x + (i + 0.5) * step, y + (j + 0.5) * step, rr, 0, Math.PI * 2); ctx.fill(); }
  }
}
function wrapLines(ctx, txt, w) {
  const lines = []; let l = '';
  txt.split(' ').forEach((p) => { const t = l ? l + ' ' + p : p; if (ctx.measureText(t).width > w && l) { lines.push(l); l = p; } else l = t; });
  if (l) lines.push(l);
  return lines;
}

function hollerithRows(ch) {
  const c = String(ch || '').toUpperCase();
  if (c >= '0' && c <= '9') return [c.charCodeAt(0) - 48 + 2];
  if (c >= 'A' && c <= 'I') return [0, c.charCodeAt(0) - 65 + 3];
  if (c >= 'J' && c <= 'R') return [1, c.charCodeAt(0) - 74 + 3];
  if (c >= 'S' && c <= 'Z') return [2, c.charCodeAt(0) - 83 + 4];
  if (c === '-') return [1];
  if (c === '&' || c === '+') return [0];
  if (c === '/') return [2, 3];
  if (c === '.') return [0, 5, 10];
  if (c === ',') return [2, 5, 10];
  if (c === '=') return [5, 10];
  if (c === '$') return [1, 5, 10];
  if (c === '*') return [1, 6, 10];
  return [];
}

// what comes pre-printed on each type; receives (ctx, W, H, T, cfg, extras)
const BACKGROUNDS = {
  notebook(ctx, W, H) {
    ctx.strokeStyle = 'rgba(95,135,205,0.5)'; ctx.lineWidth = 2;
    for (let y = 206; y < H - 30; y += 52) { ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(W - 10, y); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(205,70,70,0.55)'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(126, 0); ctx.lineTo(126, H); ctx.stroke();
  },
  form(ctx, W, H) {
    for (let k = 0, y = 128; y < H; k++, y += 64) if (k % 2 === 0) { ctx.fillStyle = 'rgba(120,190,135,0.22)'; ctx.fillRect(74, y, W - 148, 64); }
    ctx.strokeStyle = 'rgba(0,0,0,0.22)'; ctx.setLineDash([6, 6]); ctx.lineWidth = 1.5;
    [66, W - 66].forEach((x) => { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); });
    ctx.setLineDash([]);
  },
  ticket(ctx, W, H, T) {
    const sx = W * (1 - T.stub);
    ctx.strokeStyle = rgba(T.ink, 0.7); ctx.lineWidth = 3;
    ctx.strokeRect(22, 22, W - 44, H - 44);
    ctx.lineWidth = 1.2; ctx.strokeRect(32, 32, W - 64, H - 64);
    ctx.setLineDash([3, 7]); ctx.lineWidth = 3; ctx.strokeStyle = rgba(T.ink, 0.55);
    ctx.beginPath(); ctx.moveTo(sx, 22); ctx.lineTo(sx, H - 22); ctx.stroke(); ctx.setLineDash([]);
    ctx.save();
    ctx.translate(sx + (W - sx) / 2, H / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = rgba(T.ink, 0.85); ctx.textAlign = 'center';
    ctx.font = `bold 26px "${T.font}"`; ctx.fillText('No. 0042', 0, -46);
    ctx.font = `40px "${T.font}"`; ctx.fillText('C · 12', 0, 2);
    ctx.font = `22px "${T.font}"`; ctx.fillText('ROW · SEAT', 0, 36);
    ctx.font = `italic 17px "${T.font}"`; ctx.fillText('non-refundable', 0, 64);
    ctx.restore();
  },
  memo(ctx, W) {
    ctx.fillStyle = 'rgba(22,22,26,0.92)';
    ctx.beginPath(); ctx.arc(130, 120, 34, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(245,244,240,1)';
    ctx.beginPath(); ctx.moveTo(130, 96); ctx.lineTo(154, 136); ctx.lineTo(106, 136); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(22,22,26,0.92)'; ctx.font = 'bold 54px "Courier Prime"'; ctx.fillText('MEMORANDUM', 184, 128);
    ctx.font = '22px "Courier Prime"'; ctx.fillText('Research division · internal use', 186, 160);
    ctx.fillRect(96, 196, W - 192, 3);
    ctx.save(); ctx.translate(W - 250, 270); ctx.rotate(-0.12);
    ctx.strokeStyle = 'rgba(175,30,30,0.7)'; ctx.lineWidth = 4; ctx.strokeRect(-12, -44, 268, 60);
    ctx.fillStyle = 'rgba(175,30,30,0.7)'; ctx.font = 'bold 36px "Courier Prime"'; ctx.fillText('CONFIDENTIAL', 0, 0);
    ctx.restore();
  },
  newspaper(ctx, W, H, T, cfg, ex) {
    ctx.fillStyle = 'rgba(25,25,25,0.9)';
    ctx.font = 'bold 50px "Libre Baskerville"'; ctx.textAlign = 'center'; ctx.fillText('THE FOLDTOWN HERALD', W / 2, 92);
    ctx.font = 'italic 20px "Libre Baskerville"'; ctx.fillText('evening edition · friday', W / 2, 126);
    ctx.textAlign = 'left';
    ctx.fillRect(40, 140, W - 80, 3); ctx.fillRect(40, 147, W - 80, 1);
    ctx.fillRect(W / 2 - 1, 330, 1, H - 380);
    const bx = W / 2 + 20, by = 336, bw = W / 2 - 60, bh = 230;
    ctx.fillStyle = 'rgba(40,40,40,0.12)'; ctx.fillRect(bx, by, bw, bh);
    if (ex.photo) halftone(ctx, ex.photo, bx, by, bw, bh);
    else {
      for (let y = by + 4; y < by + bh; y += 7) for (let x = bx + 4; x < bx + bw; x += 7) {
        const v = 0.5 + 0.5 * Math.sin(x * 0.02) * Math.cos(y * 0.025);
        ctx.fillStyle = `rgba(20,20,20,${0.55 * v})`; ctx.beginPath(); ctx.arc(x, y, 1.2 + 2 * v, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.fillStyle = 'rgba(25,25,25,0.85)'; ctx.font = 'italic 17px "Libre Baskerville"';
    ctx.fillText('The harbor at dusk, yesterday.', bx, by + bh + 24);
  },
  sticky(ctx, W) {
    const g = ctx.createLinearGradient(0, 0, 0, 70);
    g.addColorStop(0, 'rgba(170,130,20,0.18)'); g.addColorStop(1, 'rgba(170,130,20,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, 70);
  },
  polaroid(ctx, W, H, T, cfg, ex) {
    // square photo window with a "developed" look: slightly faded, warm, vignetted
    const m = Math.round(W * 0.065), s = W - 2 * m;
    ctx.fillStyle = '#1a1714'; ctx.fillRect(m, m, s, s);
    if (ex.img) {
      const iw = ex.img.width, ih = ex.img.height, k = Math.max(s / iw, s / ih);
      ctx.save(); ctx.beginPath(); ctx.rect(m, m, s, s); ctx.clip();
      ctx.filter = 'saturate(0.8) contrast(0.92) brightness(1.05)';
      ctx.drawImage(ex.img, m + (s - iw * k) / 2, m + (s - ih * k) / 2, iw * k, ih * k);
      ctx.filter = 'none';
      ctx.fillStyle = 'rgba(255,200,140,0.10)'; ctx.fillRect(m, m, s, s);
      const v = ctx.createRadialGradient(m + s / 2, m + s / 2, s * 0.25, m + s / 2, m + s / 2, s * 0.75);
      v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.45)');
      ctx.fillStyle = v; ctx.fillRect(m, m, s, s);
      ctx.restore();
    }
    ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 2; ctx.strokeRect(m, m, s, s);
  },
  envelope(ctx, W, H, T) {
    // side facing the camera: the back of the envelope (pocket seams) and the inside of the flap (security pattern)
    const ab = Math.round(T.flap / T.h * H), cy = ab + (H - ab) * 0.48;
    ctx.strokeStyle = 'rgba(110,85,50,0.35)'; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(W / 2, cy); ctx.lineTo(W, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, ab); ctx.lineTo(W * 0.42, cy - 8); ctx.moveTo(W, ab); ctx.lineTo(W * 0.58, cy - 8); ctx.stroke();
    ctx.save();
    ctx.beginPath(); ctx.moveTo(0, ab); ctx.lineTo(W / 2, 6); ctx.lineTo(W, ab); ctx.closePath(); ctx.clip();
    ctx.strokeStyle = 'rgba(70,85,120,0.22)'; ctx.lineWidth = 3;
    for (let x = -H; x < W + H; x += 14) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + ab, ab); ctx.stroke(); }
    ctx.restore();
  },
  blueprint(ctx, W, H, T, cfg) {
    if (!cfg?.color) {
      const bg = ctx.createRadialGradient(W / 2, H / 2, W * 0.15, W / 2, H / 2, W * 0.72);
      bg.addColorStop(0, 'rgba(16, 52, 92, 0.45)');
      bg.addColorStop(1, 'rgba(6, 18, 34, 0.85)');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    }

    ctx.strokeStyle = 'rgba(65, 175, 255, 0.13)'; ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 15) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += 15) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(95, 200, 255, 0.32)'; ctx.lineWidth = 1.4;
    for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(140, 225, 255, 0.52)'; ctx.lineWidth = 2.2;
    for (let x = 0; x < W; x += 180) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += 180) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    const m = 26;
    ctx.strokeStyle = 'rgba(170, 235, 255, 0.75)'; ctx.lineWidth = 3;
    ctx.strokeRect(m, m, W - 2 * m, H - 2 * m);
    ctx.lineWidth = 1.2; ctx.strokeRect(m + 6, m + 6, W - 2 * m - 12, H - 2 * m - 12);

    ctx.fillStyle = 'rgba(180, 235, 255, 0.75)'; ctx.font = 'bold 12px "Courier Prime", monospace';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach((ch, i) => {
      const zx = m + (i + 0.5) * ((W - 2 * m) / 6);
      ctx.fillText(ch, zx, m - 12);
      ctx.fillText(ch, zx, H - m + 12);
    });
    ['1', '2', '3', '4'].forEach((num, j) => {
      const zy = m + (j + 0.5) * ((H - 2 * m) / 4);
      ctx.fillText(num, m - 12, zy);
      ctx.fillText(num, W - m + 12, zy);
    });
    [[m, m], [W - m, m], [m, H - m], [W - m, H - m]].forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy); ctx.lineTo(cx + 10, cy);
      ctx.moveTo(cx, cy - 10); ctx.lineTo(cx, cy + 10);
      ctx.stroke();
    });

    const sx = W * 0.72, sy = H * 0.40;
    ctx.save();
    ctx.strokeStyle = 'rgba(130, 215, 255, 0.55)'; ctx.lineWidth = 1.5; ctx.setLineDash([12, 4, 3, 4]);
    ctx.beginPath(); ctx.moveTo(sx - 170, sy); ctx.lineTo(sx + 170, sy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(sx, sy - 150); ctx.lineTo(sx, sy + 150); ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = 'rgba(200, 240, 255, 0.85)'; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.arc(sx, sy, 130, 0, Math.PI * 2); ctx.stroke();
    ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.arc(sx, sy, 85, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(sx, sy, 42, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = 'rgba(110, 205, 255, 0.6)'; ctx.lineWidth = 1.2; ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.arc(sx, sy, 108, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(8, 25, 45, 0.9)';
    ctx.strokeStyle = 'rgba(210, 245, 255, 0.9)'; ctx.lineWidth = 1.5;
    for (let k = 0; k < 8; k++) {
      const a = k * Math.PI / 4;
      const bx = sx + Math.cos(a) * 108, by = sy + Math.sin(a) * 108;
      ctx.beginPath(); ctx.arc(bx, by, 9, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    ctx.save();
    ctx.beginPath(); ctx.arc(sx, sy, 130, Math.PI, Math.PI * 1.5);
    ctx.lineTo(sx, sy); ctx.closePath(); ctx.clip();
    ctx.strokeStyle = 'rgba(100, 190, 255, 0.35)'; ctx.lineWidth = 1.2;
    for (let d = -150; d < 150; d += 8) {
      ctx.beginPath(); ctx.moveTo(sx + d - 150, sy - 150); ctx.lineTo(sx + d + 150, sy + 150); ctx.stroke();
    }
    ctx.restore();
    ctx.strokeStyle = 'rgba(170, 230, 255, 0.7)'; ctx.lineWidth = 1.5;
    ctx.fillStyle = 'rgba(215, 245, 255, 0.9)'; ctx.font = 'bold 12px "Courier Prime", monospace';
    ctx.beginPath();
    ctx.moveTo(sx - 130, sy + 145); ctx.lineTo(sx + 130, sy + 145);
    ctx.moveTo(sx - 130, sy + 135); ctx.lineTo(sx - 130, sy + 155);
    ctx.moveTo(sx + 130, sy + 135); ctx.lineTo(sx + 130, sy + 155);
    ctx.stroke();
    ctx.fillText('<-- Ø 260.00 mm -->', sx, sy + 158);
    ctx.beginPath(); ctx.moveTo(sx + 30, sy - 30); ctx.lineTo(sx + 80, sy - 80); ctx.lineTo(sx + 140, sy - 80); ctx.stroke();
    ctx.textAlign = 'left';
    ctx.fillText('BORE Ø 42.0 H7', sx + 85, sy - 86);
    const px = sx + 80, py = sy - 130;
    ctx.strokeStyle = 'rgba(160, 225, 255, 0.6)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(px + 40, py, 10, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(px + 40, py, 4, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px, py - 10); ctx.lineTo(px + 20, py - 5); ctx.lineTo(px + 20, py + 5); ctx.lineTo(px, py + 10); ctx.closePath(); ctx.stroke();
    ctx.restore();

    const tbW = 390, tbH = 135, tbx = W - m - 6 - tbW, tby = H - m - 6 - tbH;
    ctx.fillStyle = 'rgba(8, 26, 48, 0.92)'; ctx.fillRect(tbx, tby, tbW, tbH);
    ctx.strokeStyle = 'rgba(170, 235, 255, 0.8)'; ctx.lineWidth = 2; ctx.strokeRect(tbx, tby, tbW, tbH);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(tbx, tby + 38); ctx.lineTo(tbx + tbW, tby + 38);
    ctx.moveTo(tbx, tby + 86); ctx.lineTo(tbx + tbW, tby + 86);
    ctx.moveTo(tbx + 240, tby + 38); ctx.lineTo(tbx + 240, tby + tbH);
    ctx.moveTo(tbx + 120, tby + 86); ctx.lineTo(tbx + 120, tby + tbH);
    ctx.stroke();
    ctx.fillStyle = 'rgba(215, 245, 255, 0.95)'; ctx.textAlign = 'left';
    ctx.font = 'bold 15px "Courier Prime", monospace';
    ctx.fillText('AQUILA DYNAMICS · DEFENSE & NAVAL', tbx + 14, tby + 24);
    ctx.font = 'bold 13px "Courier Prime", monospace';
    ctx.fillText('VALVE ASSEMBLY · HIGH PRESSURE', tbx + 14, tby + 58);
    ctx.font = '11px "Courier Prime", monospace'; ctx.fillStyle = 'rgba(165, 220, 255, 0.85)';
    ctx.fillText('DWG NO: AQ-9042-REV-D', tbx + 14, tby + 76);
    ctx.fillText('SCALE: 1:25', tbx + 14, tby + 110);
    ctx.fillText('SHT 1 OF 1', tbx + 134, tby + 110);
    ctx.fillText('DRN: E.M.', tbx + 252, tby + 58);
    ctx.fillText('CHK: R.A.', tbx + 252, tby + 76);
    ctx.fillStyle = 'rgba(100, 255, 180, 0.9)'; ctx.font = 'bold 11px "Courier Prime", monospace';
    ctx.fillText('APPROVED', tbx + 252, tby + 110);

    ctx.strokeStyle = 'rgba(230, 248, 255, 0.22)'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(W / 2, m); ctx.lineTo(W / 2, H - m); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(m, H / 2); ctx.lineTo(W - m, H / 2); ctx.stroke();
  },
  postcard(ctx, W, H) {
    ctx.strokeStyle = 'rgba(180, 160, 130, 0.4)'; ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, W - 48, H - 48);
  },
  punchcard(ctx, W, H, T, cfg) {
    ctx.save();
    ctx.strokeStyle = 'rgba(100, 85, 70, 0.45)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, 50); ctx.lineTo(50, 0); ctx.stroke();

    ctx.fillStyle = 'rgba(40, 85, 130, 0.25)';
    ctx.fillRect(0, 0, W, H * 0.16);
    ctx.strokeStyle = 'rgba(40, 85, 130, 0.55)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, H * 0.16); ctx.lineTo(W, H * 0.16); ctx.stroke();

    const x0 = 34, x1 = W - 34;
    const colW = (x1 - x0) / 79;
    const rowY0 = H * 0.23, rowStep = (H * 0.94 - rowY0) / 11;

    const line = (cfg.text.split('\n')[0] || '').slice(0, 80);
    ctx.fillStyle = 'rgba(25, 25, 25, 0.92)';
    ctx.font = 'bold 15px "Courier Prime", monospace'; ctx.textAlign = 'center';
    for (let c = 0; c < line.length; c++) {
      if (line[c] !== ' ') ctx.fillText(line[c], x0 + c * colW, 24);
    }

    ctx.fillStyle = 'rgba(70, 60, 50, 0.65)';
    ctx.font = '9px "VT323", monospace';
    for (let c = 1; c <= 80; c++) {
      const cx = x0 + (c - 1) * colW;
      if (c === 1 || c % 5 === 0) {
        ctx.fillText(String(c), cx, H * 0.14);
        ctx.fillText(String(c), cx, H - 12);
      }
    }

    ctx.font = '11px "VT323", monospace';
    ctx.fillStyle = 'rgba(90, 80, 70, 0.45)';
    for (let r = 0; r < 10; r++) {
      const y = rowY0 + (r + 2) * rowStep;
      for (let c = 1; c <= 80; c++) {
        const cx = x0 + (c - 1) * colW;
        ctx.fillText(String(r), cx, y);
      }
    }

    ctx.fillStyle = 'rgba(80, 70, 60, 0.7)';
    ctx.font = 'bold 11px "Courier Prime", monospace';
    ctx.fillText('IBM 5081', W - 80, H - 28);

    ctx.fillStyle = 'rgba(15, 12, 10, 0.45)';
    for (let c = 0; c < line.length; c++) {
      const rows = hollerithRows(line[c]);
      const cx = x0 + c * colW;
      for (const r of rows) {
        const cy = rowY0 + r * rowStep;
        ctx.fillRect(cx - 5, cy - 10, 10, 20);
      }
    }
    ctx.restore();
  },
  shipping(ctx, W, H) {
    ctx.strokeStyle = 'rgba(70, 50, 30, 0.35)'; ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, W - 60, H - 60);
    const by = H - 180, bw = W - 140, bx = 70;
    ctx.fillStyle = '#1c1612';
    for (let x = bx; x < bx + bw;) {
      const bar = 2 + ((x * 17) % 7), gap = 3 + ((x * 31) % 6);
      ctx.fillRect(x, by, bar, 70);
      x += bar + gap;
    }
    ctx.font = 'bold 18px "Courier Prime", monospace'; ctx.textAlign = 'center';
    ctx.fillText('* EXP-9042-CRUMPLE *', W / 2, by + 100);
    ctx.textAlign = 'left';
    ctx.save();
    ctx.fillStyle = 'rgba(50, 35, 20, 0.85)';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('↑ ↑  THIS SIDE UP', 60, 80);
    ctx.restore();
  },
  kraft(ctx, W, H, T, cfg, ex) {
    if (BACKGROUNDS.shipping) BACKGROUNDS.shipping(ctx, W, H, T, cfg, ex);
  },
  parchment(ctx, W, H, T, cfg) {
    if (!cfg?.seal) {
      drawWaxSeal(ctx, W / 2, H - 140, { symbol: 'V', color: 'red' });
    }
  },
  ledger(ctx, W, H) {
    const m = 30;
    ctx.strokeStyle = 'rgba(60, 110, 85, 0.6)'; ctx.lineWidth = 2.5;
    ctx.strokeRect(m, m, W - 2 * m, H - 2 * m);
    ctx.lineWidth = 1; ctx.strokeRect(m + 4, m + 4, W - 2 * m - 8, H - 2 * m - 8);

    ctx.fillStyle = 'rgba(235, 246, 238, 0.9)'; ctx.fillRect(m + 6, m + 6, W - 2 * m - 12, 110);
    ctx.strokeStyle = 'rgba(60, 110, 85, 0.4)'; ctx.strokeRect(m + 6, m + 6, W - 2 * m - 12, 110);
    ctx.fillStyle = 'rgba(25, 55, 40, 0.92)'; ctx.textAlign = 'center';
    ctx.font = 'bold 28px "Courier Prime", monospace';
    ctx.fillText('CONTINENTAL MERCANTILE CO. · GENERAL LEDGER', W / 2, m + 42);
    ctx.font = 'italic 16px "Libre Baskerville", serif'; ctx.fillStyle = 'rgba(35, 75, 55, 0.85)';
    ctx.fillText('FOLIO NO. 142 — ACCOUNT OF RECEIPTS & DISBURSEMENTS — ANNO 1928', W / 2, m + 72);
    ctx.fillRect(m + 40, m + 88, W - 2 * m - 80, 2);

    const yHeader = m + 116, yEnd = H - m - 6;
    const cDate = 210, cPart = W - 430, cFol = W - 370, cDeb = W - 250, cCred = W - 130;

    const rowH = 42;
    for (let y = yHeader + rowH, idx = 0; y < yEnd; y += rowH, idx++) {
      if (idx % 2 === 1) {
        ctx.fillStyle = 'rgba(180, 220, 200, 0.15)';
        ctx.fillRect(m + 6, y, W - 2 * m - 12, rowH);
      }
      ctx.strokeStyle = 'rgba(90, 160, 130, 0.35)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(m + 6, y); ctx.lineTo(W - m - 6, y); ctx.stroke();
    }

    ctx.fillStyle = 'rgba(40, 90, 65, 0.88)'; ctx.fillRect(m + 6, yHeader, W - 2 * m - 12, rowH);
    ctx.fillStyle = '#f0f8f2'; ctx.font = 'bold 14px "Courier Prime", monospace'; ctx.textAlign = 'center';
    ctx.fillText('DATE', (m + 6 + cDate) / 2, yHeader + 26);
    ctx.fillText('PARTICULARS / DESCRIPTION', (cDate + cPart) / 2, yHeader + 26);
    ctx.fillText('FOL', (cPart + cFol) / 2, yHeader + 26);
    ctx.fillText('DEBITS ($ | ¢)', (cFol + cDeb) / 2, yHeader + 26);
    ctx.fillText('CREDITS ($ | ¢)', (cDeb + cCred) / 2, yHeader + 26);
    ctx.fillText('BALANCE', (cCred + W - m - 6) / 2, yHeader + 26);

    ctx.strokeStyle = 'rgba(215, 45, 45, 0.65)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(m + 6, yHeader); ctx.lineTo(m + 6, yEnd); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(m + 10, yHeader); ctx.lineTo(m + 10, yEnd); ctx.stroke();

    ctx.strokeStyle = 'rgba(70, 120, 160, 0.45)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(cDate, yHeader); ctx.lineTo(cDate, yEnd); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cPart, yHeader); ctx.lineTo(cPart, yEnd); ctx.stroke();

    ctx.strokeStyle = 'rgba(215, 45, 45, 0.65)'; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.moveTo(cFol, yHeader); ctx.lineTo(cFol, yEnd); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cDeb, yHeader); ctx.lineTo(cDeb, yEnd); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cCred, yHeader); ctx.lineTo(cCred, yEnd); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cCred + 3, yHeader); ctx.lineTo(cCred + 3, yEnd); ctx.stroke();

    ctx.strokeStyle = 'rgba(60, 110, 190, 0.45)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cDeb - 35, yHeader + rowH); ctx.lineTo(cDeb - 35, yEnd); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cCred - 35, yHeader + rowH); ctx.lineTo(cCred - 35, yEnd); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W - m - 41, yHeader + rowH); ctx.lineTo(W - m - 41, yEnd); ctx.stroke();

    ctx.strokeStyle = 'rgba(215, 45, 45, 0.85)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(cFol, yEnd - 48); ctx.lineTo(W - m - 6, yEnd - 48); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cFol, yEnd - 12); ctx.lineTo(W - m - 6, yEnd - 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cFol, yEnd - 8); ctx.lineTo(W - m - 6, yEnd - 8); ctx.stroke();
  },
  carbon(ctx, W, H, T, cfg) {
    if (!cfg?.color) {
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, 'rgba(26, 24, 36, 0.95)');
      bg.addColorStop(0.5, 'rgba(22, 20, 32, 0.98)');
      bg.addColorStop(1, 'rgba(18, 16, 26, 0.95)');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    }

    ctx.save();
    for (let k = 0; k < 6; k++) {
      const gx = (k % 2 ? W - 60 : 60), gy = H * (0.15 + k * 0.15);
      const sm = ctx.createRadialGradient(gx, gy, 10, gx, gy, 90);
      sm.addColorStop(0, 'rgba(90, 80, 150, 0.18)');
      sm.addColorStop(1, 'rgba(20, 18, 30, 0)');
      ctx.fillStyle = sm; ctx.beginPath(); ctx.arc(gx, gy, 90, 0, Math.PI * 2); ctx.fill();
    }

    ctx.strokeStyle = 'rgba(160, 170, 240, 0.35)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 6]);
    ctx.beginPath(); ctx.moveTo(30, 40); ctx.lineTo(W - 30, 40); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(150, 160, 220, 0.55)'; ctx.font = '11px "Courier Prime", monospace';
    ctx.textAlign = 'center'; ctx.fillText('· · · · · · · · · ·  TEAR ALONG PERFORATION  · · · · · · · · · ·', W / 2, 34);

    ctx.strokeStyle = 'rgba(140, 150, 235, 0.45)'; ctx.lineWidth = 2.2;
    ctx.strokeRect(36, 56, W - 72, H - 96);
    ctx.lineWidth = 1; ctx.strokeRect(42, 62, W - 84, H - 108);

    ctx.fillStyle = 'rgba(225, 60, 75, 0.88)';
    ctx.font = 'bold 20px "Special Elite", monospace'; ctx.textAlign = 'right';
    ctx.fillText('№ 049182', W - 60, 95);

    ctx.fillStyle = 'rgba(180, 190, 255, 0.9)'; ctx.textAlign = 'left';
    ctx.font = 'bold 22px "Courier Prime", monospace';
    ctx.fillText('CUSTOMER DUPLICATE RECEIPT', 64, 98);
    ctx.font = '12px "Courier Prime", monospace'; ctx.fillStyle = 'rgba(140, 155, 230, 0.7)';
    ctx.fillText('INTER-OFFICE TRANSFER VOUCHER · SECOND VIA', 64, 118);
    ctx.fillRect(64, 130, W - 128, 2);

    ctx.font = '13px "Courier Prime", monospace';
    ctx.fillStyle = 'rgba(135, 145, 220, 0.65)';
    const fields = [
      ['DATE OF RECORD: ____________________________', 64, 168],
      ['TRANSACTION REF: __________________________', W / 2 + 20, 168],
      ['RECEIVED FROM: __________________________________________________________________', 64, 210],
      ['SUM AMOUNT: ____________________________________________________________________', 64, 252],
    ];
    fields.forEach(([f, fx, fy]) => ctx.fillText(f, fx, fy));

    ctx.save();
    ctx.translate(W - 220, H - 140);
    ctx.rotate(-0.16);
    ctx.strokeStyle = 'rgba(150, 160, 255, 0.65)'; ctx.lineWidth = 4;
    ctx.strokeRect(-110, -32, 220, 64);
    ctx.lineWidth = 1.5; ctx.strokeRect(-104, -26, 208, 52);
    ctx.fillStyle = 'rgba(150, 160, 255, 0.75)'; ctx.font = 'bold 28px "Courier Prime", monospace';
    ctx.textAlign = 'center'; ctx.fillText('DUPLICATE', 0, 10);
    ctx.restore();
    ctx.restore();
  },
};
function postcardBack(ctx, W, H, cfg, r) {
  ctx.strokeStyle = 'rgba(100, 90, 75, 0.4)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(W / 2, 40); ctx.lineTo(W / 2, H - 40); ctx.stroke();
  const sx = W - 140, sy = 50;
  ctx.strokeStyle = 'rgba(100, 90, 75, 0.5)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
  ctx.strokeRect(sx, sy, 90, 110); ctx.setLineDash([]);
  ctx.fillStyle = 'rgba(120, 100, 80, 0.5)'; ctx.font = '12px "Courier Prime", monospace'; ctx.textAlign = 'center';
  ctx.fillText('AFFIX', sx + 45, sy + 50); ctx.fillText('STAMP', sx + 45, sy + 68);
  ctx.strokeStyle = 'rgba(40, 50, 80, 0.55)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(sx - 30, sy + 60, 44, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = 'rgba(40, 50, 80, 0.6)'; ctx.font = 'bold 13px "Courier Prime", monospace';
  ctx.fillText('POST', sx - 30, sy + 64);
  ctx.textAlign = 'left';
  ctx.strokeStyle = 'rgba(120, 110, 95, 0.4)'; ctx.lineWidth = 1.5;
  for (let y = H * 0.45; y < H - 60; y += 44) {
    ctx.beginPath(); ctx.moveTo(W / 2 + 40, y); ctx.lineTo(W - 40, y); ctx.stroke();
  }
}
// back of the envelope: the front with the address, stamp and postmark; the wax seal sits outside the flap
function envelopeBack(ctx, W, H, T, cfg, r) {
  const ab = Math.round(T.flap / T.h * H);
  ctx.save();
  ctx.translate(W / 2, ab * 0.36);
  ctx.fillStyle = 'rgba(140,20,24,0.95)';
  ctx.beginPath();
  for (let a = 0; a <= Math.PI * 2 + 0.01; a += 0.2) { const q = 46 * (1 + 0.06 * Math.sin(a * 7 + r() * 0.3)); if (a) ctx.lineTo(Math.cos(a) * q, Math.sin(a) * q); else ctx.moveTo(q, 0); }
  ctx.fill();
  ctx.strokeStyle = 'rgba(90,10,14,0.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 30, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = 'rgba(80,8,12,0.9)'; ctx.font = 'bold 30px "Special Elite"'; ctx.textAlign = 'center'; ctx.fillText('A', 0, 11);
  ctx.restore();
  const sx = W - 180, sy = ab + 40;
  ctx.fillStyle = 'rgba(70,105,140,0.85)'; ctx.fillRect(sx, sy, 120, 140);
  ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.setLineDash([4, 4]); ctx.lineWidth = 3; ctx.strokeRect(sx + 6, sy + 6, 108, 128); ctx.setLineDash([]);
  ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.font = 'bold 44px "Special Elite"'; ctx.textAlign = 'center'; ctx.fillText('25', sx + 60, sy + 88);
  ctx.strokeStyle = 'rgba(40,40,60,0.55)'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(sx - 30, sy + 90, 58, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = 'rgba(40,40,60,0.6)'; ctx.font = '20px "Courier Prime"'; ctx.fillText('POST', sx - 30, sy + 98);
  for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(sx - 120, sy + 60 + k * 18); ctx.bezierCurveTo(sx - 60, sy + 50 + k * 18, sx, sy + 70 + k * 18, sx + 60, sy + 60 + k * 18); ctx.stroke(); }
  ctx.textAlign = 'left';
  ctx.font = '52px "Caveat"'; ctx.fillStyle = rgba(T.ink, 0.9);
  cfg.address.split('\n').forEach((l, i) => ctx.fillText(l, 150, ab + 330 + i * 62));
}
// back of the newspaper clipping: classified ads and an archive photo
const CLASSIFIEDS = [
  ['FOR RENT', 'quiet room near the park, morning light. Ask at the front desk.'],
  ['FOR SALE', 'vintage typewriter, works fine, missing the letter Q.'],
  ['WANTED', 'night watchman for the old warehouse on the pier.'],
  ['FOUND', 'small brass key with a red tag. Claim at the bakery.'],
  ['LOST', 'grey cat, answers to Pixel. Reward offered.'],
  ['REPAIRS', 'radios and record players, evenings only.'],
  ['SWAP', 'bicycle bell for anything that does not squeak.'],
];
function newspaperBack(ctx, W, H, ex) {
  const m = 44, gap = 26, colW = (W - 2 * m - gap) / 2;
  ctx.fillStyle = 'rgba(25,25,25,0.9)';
  ctx.font = 'bold 34px "Libre Baskerville"'; ctx.fillText('CLASSIFIEDS', m, 92);
  ctx.fillRect(m - 4, 108, W - 2 * m + 8, 3);
  const fx = m + colW + gap, fy = 132, fh = Math.round(colW * 0.68);
  if (ex.photo) halftone(ctx, ex.photo, fx, fy, colW, fh);
  ctx.font = 'italic 16px "Libre Baskerville"'; ctx.fillText('Old town, archive photo.', fx, fy + fh + 22);
  // left column top to bottom; when it fills up, the right one, below the photo
  const end = H - 60, tops = [150, fy + fh + 60];
  let col = 0, x = m, y = tops[0];
  for (const [t, body] of CLASSIFIEDS) {
    ctx.font = '18px "Libre Baskerville"';
    const ls = wrapLines(ctx, t + ' ' + body, colW);
    if (y + ls.length * 24 > end) {
      if (col === 1) break;
      col = 1; x = fx; y = tops[1];
      if (y + ls.length * 24 > end) break;
    }
    ls.forEach((l, i) => {
      if (i === 0) {
        ctx.font = 'bold 19px "Libre Baskerville"'; ctx.fillText(t, x, y);
        const wt = ctx.measureText(t + ' ').width;
        ctx.font = '18px "Libre Baskerville"'; ctx.fillText(l.slice(t.length + 1), x + wt, y);
      } else { ctx.font = '18px "Libre Baskerville"'; ctx.fillText(l, x, y); }
      y += 24;
    });
    y += 16;
  }
}
const AREAS = {
  typed: (W, H, T) => ({ x: T.x, y: T.y, w: W - T.x * 2, h: H - T.y - 80 }),
  notebook: (W, H, T) => ({ x: T.x, y: T.y - 10, w: W - T.x - 50, h: H - T.y - 40 }),
  form: (W, H, T) => ({ x: T.x, y: T.y + 2, w: W - T.x * 2, h: H - T.y - 40 }),
  receipt: (W, H, T) => ({ x: T.x, y: T.y, w: W - T.x * 2, h: H - T.y - 40, centerHead: true }),
  ticket: (W, H, T) => ({ x: 60, y: 120, w: W * (1 - T.stub) - 120, h: H - 160, center: true, headK: 1.25 }),
  memo: (W, H, T) => ({ x: T.x, y: T.y, w: W - T.x * 2, h: H - T.y - 60, headK: 1.15 }),
  newspaper: (W, H, T) => ({ x: T.x, y: 230, w: W - T.x * 2, h: H - 300, cols: 2, headFull: true, centerHead: true, headK: 2.0, colY: 330 }),
  sticky: (W, H, T) => ({ x: T.x, y: T.y, w: W - T.x * 2, h: H - T.y - 30 }),
  polaroid: (W, H) => ({ x: 40, y: Math.round(W * 0.935 + (H - W * 0.935) * 0.55), w: W - 80, h: 120, center: true }),
  envelope: () => null,
  blueprint: (W, H, T) => ({ x: 64, y: 140, w: Math.round(W * 0.44), h: H - 280, headK: 1.15 }),
  postcard: (W, H, T) => ({ x: T.x, y: T.y, w: W - T.x * 2, h: H - T.y - 80 }),
  punchcard: (W, H, T) => ({ x: 34, y: 18, w: W - 68, h: 26 }),
  shipping: (W, H, T) => ({ x: T.x, y: T.y, w: W - T.x * 2, h: H - T.y - 180 }),
  kraft: (W, H, T) => ({ x: T.x, y: T.y, w: W - T.x * 2, h: H - T.y - 180 }),
  parchment: (W, H, T) => ({ x: T.x, y: T.y, w: W - T.x * 2, h: H - T.y - 160, centerHead: true }),
  ledger: (W, H, T) => ({ x: 88, y: 198, w: W - 176, h: H - 260, headK: 1.1 }),
  carbon: (W, H, T) => ({ x: 74, y: 300, w: W - 148, h: H - 420, headK: 1.15 }),
};

export async function renderForeignObject(html, w, h, css = '') {
  if (typeof Blob === 'undefined' || typeof URL === 'undefined' || !URL.createObjectURL) return null;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;box-sizing:border-box;margin:0;padding:0;overflow:hidden;${css}">
        ${html}
      </div>
    </foreignObject>
  </svg>`;
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  return new Promise((resolve) => {
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  });
}

// draws one side ('front' or 'back') of a paper into a canvas
export async function drawPrint(cfg, T, side, openings) {
  const W = Math.round(T.w * PPU), H = Math.round(T.h * PPU);
  const c = makeCanvas(W, H), ctx = c.getContext('2d');
  const front = side === 'front';
  const r = rng(cfg.seed * 31 + (front ? 5 : 9));
  const ex = {};
  if (T.photo && front) ex.img = await loadImage(cfg.image || config.assets + 'photos/sunset.webp');
  if (cfg.type === 'newspaper' && (front || !cfg.back)) ex.photo = await loadImage(config.assets + 'photos/' + (front ? 'sea' : 'city') + '.webp');
  const bothSides = cfg.type === 'notebook' || cfg.type === 'form' || cfg.type === 'blueprint' || cfg.type === 'ledger';
  if (BACKGROUNDS[cfg.type] && (front || bothSides)) BACKGROUNDS[cfg.type](ctx, W, H, T, cfg, ex);
  if (cfg.watermark) drawWatermark(ctx, W, H, cfg.watermark);
  if (cfg.type === 'envelope' && !front) envelopeBack(ctx, W, H, T, cfg, r);
  if (cfg.type === 'postcard' && !front && !cfg.back) postcardBack(ctx, W, H, cfg, r);
  if (cfg.type === 'newspaper' && !front && !cfg.back) newspaperBack(ctx, W, H, ex);
  if (cfg.type === 'parchment' || cfg.type === 'postcard' || cfg.states.includes('aged')) {
    deckleEdge(ctx, W, H, cfg, r);
  }
  const txt = cfg.type === 'envelope' ? '' : (front ? cfg.text : cfg.back);
  // the back has its own area (on the ticket, on the half that folds over: it stays outside, whole, when closed)
  let area = front ? (AREAS[cfg.type] ? AREAS[cfg.type](W, H, T) : { x: 50, y: 50, w: W - 100, h: H - 100 })
    : { x: Math.round(T.x * 0.8), y: Math.min(T.y, Math.round(H * 0.28)), w: W - Math.round(T.x * 1.6), h: H - Math.min(T.y, Math.round(H * 0.28)) - 40, center: cfg.type === 'ticket' };
  if (cfg.type === 'ticket' && !front) { area.x = Math.round(W * 0.55); area.w = Math.round(W * 0.4); }
  if (cfg.type === 'postcard' && !front) { area.x = Math.round(W * 0.54); area.w = Math.round(W * 0.42); }
  if (cfg.type === 'polaroid' && !front) area = { x: 60, y: Math.round(H * 0.3), w: W - 120, h: H * 0.6, center: true };
  const textEnd = txt && area ? writeText(ctx, cfg, T, txt, area, openings, r) : 0;
  if (front && cfg.rich && area) {
    if (cfg.rich.mode === 'canvas' && typeof cfg.rich.body === 'function') {
      try { await cfg.rich.body(ctx, area, W, H); } catch (_) {}
    } else if (typeof cfg.rich.body === 'string') {
      try {
        const img = await renderForeignObject(cfg.rich.body, area.w, area.h, cfg.rich.style || '');
        if (img) ctx.drawImage(img, area.x, area.y);
      } catch (_) {}
    }
  }
  const rs = rng(cfg.seed * 17 + (front ? 1 : 2));
  // stains and fingerprints go through the sheet: on the back they sit at the same spot (mirrored) and fainter
  if (cfg.states.includes('coffee')) await coffeeStain(c, ctx, W, H, cfg, front);
  if (cfg.states.includes('water')) await waterStain(ctx, W, H, cfg, front);
  if (cfg.states.includes('prints')) await fingerprints(ctx, W, H, cfg, front);
  if (cfg.states.includes('wine')) await wineStain(c, ctx, W, H, cfg, front);
  if (cfg.states.includes('ink')) inkBlot(ctx, W, H, cfg, front);
  if (cfg.states.includes('aged')) age(ctx, W, H, rs);
  if (cfg.states.includes('faded')) fadeWash(ctx, W, H, cfg);
  if (cfg.states.includes('foxing')) foxing(ctx, W, H, cfg);
  if (cfg.states.includes('staple')) staple(ctx, W, H, cfg, front);
  if (cfg.states.includes('clip')) paperClip(ctx, W, H, cfg, front);
  if (cfg.states.includes('grease')) greaseStain(ctx, W, H, cfg, front);
  if (cfg.states.includes('dogear')) dogear(ctx, W, H, cfg, front);
  if (cfg.states.includes('damp')) dampWrinkle(ctx, W, H, cfg);
  if (cfg.states.includes('creased')) pocketCreases(ctx, W, H, cfg);
  for (const s of cfg.states) {
    if (WEAR_APPLIERS[s]) {
      try { await WEAR_APPLIERS[s](ctx, c, W, H, cfg, front, rs); } catch (_) {}
    }
  }
  if (front && cfg.seal) drawWaxSeal(ctx, W / 2, H - 140, cfg.seal);
  // the stamp sits over the text, the tape over everything; both are only on the front
  if (front && cfg.states.includes('stamp')) rubberStamp(ctx, W, H, cfg, textEnd);
  if (front && cfg.states.includes('tape')) tape(ctx, W, H, cfg);
  return c;
}

// draws a texture rotated at (cx, cy), multiplying the paper color; mirrored on the back
function stamp(ctx, img, cx, cy, s, ang, alpha, front) {
  ctx.save();
  ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = alpha;
  ctx.translate(cx, cy); if (!front) ctx.scale(-1, 1); ctx.rotate(ang);
  ctx.drawImage(img, -s / 2, -s / 2, s, s);
  ctx.restore();
}
async function waterStain(ctx, W, H, cfg, front) {
  const img = await loadTexture('water');
  if (!img) return;
  const r = rng(cfg.seed * 23 + 4);
  const x = W * (0.25 + 0.5 * r()), cy = H * (0.25 + 0.5 * r()), s = Math.min(W, H) * (0.8 + 0.35 * r()), ang = r() * Math.PI * 2;
  stamp(ctx, img, front ? x : W - x, cy, s, ang, front ? 0.85 : 0.6, front);
}
// dirty fingerprints of whoever held the sheet: near the bottom edges
async function fingerprints(ctx, W, H, cfg, front) {
  const intensity = typeof cfg.wearIntensity === 'number' ? cfg.wearIntensity : 1.0;
  if (intensity <= 0) return;
  const img = await loadTexture('prints');
  if (!img) return;
  const r = rng(cfg.seed * 29 + 6);
  for (let k = 0; k < 2; k++) {
    const x = W * (k ? 0.86 - 0.08 * r() : 0.1 + 0.12 * r()), cy = H * (0.72 + 0.2 * r()), s = Math.min(W, H) * (0.22 + 0.08 * r()) * intensity, ang = r() * Math.PI * 2;
    stamp(ctx, img, front ? x : W - x, cy, s, ang, clamp((front ? 0.6 : 0.4) * intensity), front);
  }
}
// coffee: cup rings (texture, with a procedural fallback); the ink inside the stain blurs
async function coffeeStain(c, ctx, W, H, cfg, front) {
  const intensity = typeof cfg.wearIntensity === 'number' ? cfg.wearIntensity : 1.0;
  if (intensity <= 0) return;
  const r = rng(cfg.seed * 17 + 1);
  const x = W * (0.3 + 0.4 * r()), cy = H * (0.35 + 0.35 * r()), R = Math.min(W, H) * (0.13 + 0.07 * r()) * intensity, ang = r() * Math.PI * 2;
  const cx = front ? x : W - x;
  const img = await loadTexture('coffee');
  if (front) {
    const copy = makeCanvas(W, H);
    copy.getContext('2d').drawImage(c, 0, 0);
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.02, 0, Math.PI * 2); ctx.clip();
    ctx.clearRect(cx - R * 1.1, cy - R * 1.1, R * 2.2, R * 2.2);
    ctx.filter = 'blur(2.5px)'; ctx.globalAlpha = clamp(0.85 * intensity); ctx.drawImage(copy, 0, 0);
    ctx.restore();
  }
  if (img) { stamp(ctx, img, cx, cy, R * 3.4, ang, clamp((front ? 0.95 : 0.55) * intensity), front); return; }
  ctx.save();
  const g = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R);
  g.addColorStop(0, `rgba(140,95,45,${0.10 * intensity})`); g.addColorStop(0.82, `rgba(125,82,36,${0.17 * intensity})`); g.addColorStop(1, 'rgba(110,70,30,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  for (let k = 0; k < 3; k++) {
    ctx.strokeStyle = `rgba(100,62,26,${(0.2 + 0.12 * r()) * intensity})`; ctx.lineWidth = R * (0.03 + 0.03 * r());
    ctx.beginPath();
    const ph = r() * 6.28, rr = R * (0.9 + 0.05 * k);
    for (let a = 0; a <= Math.PI * 2 + 0.01; a += 0.05) {
      const q = rr * (1 + 0.025 * Math.sin(a * 5 + ph) + 0.015 * Math.sin(a * 11 + ph * 2));
      if (a === 0) ctx.moveTo(cx + Math.cos(a) * q, cy + Math.sin(a) * q); else ctx.lineTo(cx + Math.cos(a) * q, cy + Math.sin(a) * q);
    }
    ctx.stroke();
  }
  for (let k = 0; k < 3; k++) {
    const dx = cx + (r() - 0.5) * R * 1.2, len = R * (0.6 + r() * 1.2);
    const gg = ctx.createLinearGradient(0, cy + R * 0.6, 0, cy + R * 0.6 + len);
    gg.addColorStop(0, `rgba(115,75,32,${0.16 * intensity})`); gg.addColorStop(1, 'rgba(115,75,32,0)');
    ctx.fillStyle = gg; ctx.fillRect(dx - 5, cy + R * 0.6, 9 + r() * 6, len);
  }
  ctx.restore();
}

function age(ctx, W, H, r) {
  ctx.save();
  ctx.fillStyle = 'rgba(150,110,45,0.08)'; ctx.fillRect(0, 0, W, H);
  const g = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.3, W / 2, H / 2, Math.max(W, H) * 0.75);
  g.addColorStop(0, 'rgba(120,80,30,0)'); g.addColorStop(1, 'rgba(120,80,30,0.28)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  for (let k = 0; k < 34; k++) {
    const x = r() * W, y = r() * H, rr = 3 + r() * 14;
    const s = ctx.createRadialGradient(x, y, 0, x, y, rr);
    s.addColorStop(0, `rgba(125,85,40,${0.12 + r() * 0.2})`); s.addColorStop(1, 'rgba(125,85,40,0)');
    ctx.fillStyle = s; ctx.beginPath(); ctx.arc(x, y, rr, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

// wine: one or two partial rings of a glass (dark rim, lighter band inside), a few drops and a dribble; the ink inside bleeds like coffee
async function wineStain(c, ctx, W, H, cfg, front) {
  const intensity = typeof cfg.wearIntensity === 'number' ? cfg.wearIntensity : 1.0;
  if (intensity <= 0) return;
  const r = rng(cfg.seed * 43 + 3);
  const x = W * (0.3 + 0.4 * r()), cy = H * (0.4 + 0.3 * r()), R = Math.min(W, H) * (0.1 + 0.04 * r()) * intensity;
  const cx = front ? x : W - x, al = (front ? 1 : 0.5) * intensity;
  if (front) {
    const copy = makeCanvas(W, H);
    copy.getContext('2d').drawImage(c, 0, 0);
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.04, 0, Math.PI * 2); ctx.clip();
    ctx.clearRect(cx - R * 1.1, cy - R * 1.1, R * 2.2, R * 2.2);
    ctx.filter = 'blur(2px)'; ctx.globalAlpha = clamp(0.8 * intensity); ctx.drawImage(copy, 0, 0);
    ctx.restore();
  }
  ctx.save();
  ctx.globalCompositeOperation = 'multiply';
  // a faint dark pool inside the rings
  const g = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.05);
  g.addColorStop(0, `rgba(120,14,38,${0.03 * al})`); g.addColorStop(0.8, `rgba(120,14,38,${0.1 * al})`); g.addColorStop(1, 'rgba(90,8,28,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.05, 0, Math.PI * 2); ctx.fill();
  ctx.lineCap = 'round'; ctx.filter = 'blur(0.8px)';
  for (let k = 0; k < 2; k++) {
    const a0 = r() * 6.28, sweep = 3.4 + r() * 1.4, rr = R * (0.94 + 0.12 * k + 0.03 * r()), ph = r() * 6.28;
    // the wobbly ring: radius varies a little with the angle
    const pt = (a, d) => { const q = (rr - d) * (1 + 0.025 * Math.sin(a * 5 + ph) + 0.012 * Math.sin(a * 9 + ph * 2)); return [cx + Math.cos(a) * q, cy + Math.sin(a) * q]; };
    // the dark rim, then a lighter band just inside it
    // a faint wide halo where the wet wine spread, then the dark rim and a lighter band inside it
    [[R * 0.22, 0.07, 0.04], [R * 0.07, 0.4, 0], [R * 0.03, 0.16, R * 0.06]].forEach(([w, o, d]) => {
      ctx.strokeStyle = `rgba(96,12,36,${o * al})`; ctx.lineWidth = w;
      ctx.beginPath();
      for (let i = 0, a = a0; a <= a0 + sweep; i++, a += 0.04) { const p = pt(a, d); if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); }
      ctx.stroke();
    });
  }
  // drops flicked off the rim, a few of them with a tiny satellite
  ctx.filter = 'none';
  for (let k = 0, n = 4 + Math.floor(r() * 4); k < n; k++) {
    const a = r() * 6.28, d = R * (1.35 + r() * 1.1), s = R * (0.02 + 0.035 * r());
    ctx.fillStyle = `rgba(104,10,30,${0.45 * al})`; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, s, 0, Math.PI * 2); ctx.fill();
    if (k % 2) { ctx.beginPath(); ctx.arc(cx + Math.cos(a + 0.2) * d * 1.12, cy + Math.sin(a + 0.2) * d * 1.12, s * 0.35, 0, Math.PI * 2); ctx.fill(); }
  }
  ctx.restore();
}

// fountain-pen ink: a blue-black blot with an irregular edge, feathering into the fibers, satellite drops and a short drag
function blotShape(r, R) {
  const h = [1, 2, 3, 5, 7, 11].map((k) => [k, r() * 6.28, (0.06 + 0.14 * r()) * 2 / k]);
  const pts = [];
  for (let i = 0; i < 40; i++) {
    const a = i / 40 * Math.PI * 2;
    let q = 1; h.forEach(([k, ph, amp]) => { q += amp * Math.sin(k * a + ph); });
    pts.push([Math.cos(a) * R * q, Math.sin(a) * R * q]);
  }
  return pts;
}
function fillPts(ctx, pts, cx, cy, s) {
  ctx.beginPath();
  pts.forEach((p, i) => { if (i) ctx.lineTo(cx + p[0] * s, cy + p[1] * s); else ctx.moveTo(cx + p[0] * s, cy + p[1] * s); });
  ctx.closePath(); ctx.fill();
}
function inkBlot(ctx, W, H, cfg, front) {
  const intensity = typeof cfg.wearIntensity === 'number' ? cfg.wearIntensity : 1.0;
  if (intensity <= 0) return;
  const r = rng(cfg.seed * 47 + 5), u = Math.min(W, H);
  const x0 = W * (0.2 + 0.6 * r()), y = H * (0.2 + 0.6 * r()), R = u * (0.03 + 0.015 * r()) * intensity;
  const x = front ? x0 : W - x0, al = (front ? 1 : 0.5) * intensity, col = [16, 22, 58];
  const pts = blotShape(r, R);
  ctx.save();
  // feathering: fainter rings just outside the edge, where the ink soaked into the fibers
  ctx.fillStyle = rgba(col, 0.07 * al); fillPts(ctx, pts, x, y, 1.45); fillPts(ctx, pts, x, y, 1.22);
  ctx.fillStyle = rgba(col, 0.86 * al); ctx.filter = 'blur(0.5px)'; fillPts(ctx, pts, x, y, 1); ctx.filter = 'none';
  // drops thrown off the nib, smaller the farther they land
  ctx.fillStyle = rgba(col, 0.86 * al);
  for (let k = 0, n = 6 + Math.floor(r() * 5); k < n; k++) {
    const a = r() * 6.28, d = R * (1.5 + 2.4 * r()), s = R * (0.16 + 0.14 * r()) * (1.6 - d / (R * 4));
    ctx.beginPath(); ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, Math.max(s, 0.8), 0, Math.PI * 2); ctx.fill();
  }
  // a short drag of the nib: one tapering shape with a wobbling edge
  const a = r() * 6.28, L = R * (1.6 + 1.2 * r()), ux = Math.cos(a), uy = Math.sin(a), side = [], left = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10, hw = R * 0.42 * Math.pow(1 - t, 1.3) * (0.85 + 0.3 * r()), d = R * 0.7 + L * t;
    side.push([ux * d - uy * hw, uy * d + ux * hw]); left.push([ux * d + uy * hw, uy * d - ux * hw]);
  }
  ctx.fillStyle = rgba(col, 0.6 * al); ctx.beginPath();
  side.concat(left.reverse()).forEach((p, i) => { if (i) ctx.lineTo(x + p[0], y + p[1]); else ctx.moveTo(x + p[0], y + p[1]); });
  ctx.closePath(); ctx.fill();
  // hairs pulled out of the wet edge
  ctx.strokeStyle = rgba(col, 0.28 * al); ctx.lineWidth = 0.9; ctx.lineCap = 'round';
  for (let k = 0; k < 18; k++) {
    const b = r() * 6.28, d0 = R * (0.95 + 0.1 * r()), d1 = d0 + R * (0.3 + 0.9 * r());
    ctx.beginPath(); ctx.moveTo(x + Math.cos(b) * d0, y + Math.sin(b) * d0); ctx.lineTo(x + Math.cos(b + 0.05) * d1, y + Math.sin(b + 0.05) * d1); ctx.stroke();
  }
  ctx.restore();
}

// sun-faded paper: a warm yellowing wash, strongest toward one edge and uneven (noise); both sides
function fadeWash(ctx, W, H, cfg) {
  const r = rng(cfg.seed * 41 + 2), n = noise2(cfg.seed + 19);
  const a = r() * Math.PI * 2, dx = Math.cos(a), dy = Math.sin(a);
  const sw = 96, sh = Math.round(sw * H / W);
  const c = makeCanvas(sw, sh, true), sc = c.getContext('2d'), d = sc.createImageData(sw, sh), o = d.data;
  for (let j = 0; j < sh; j++) for (let i = 0; i < sw; i++) {
    // p runs from the far side (0) to the chosen edge (1)
    const p = clamp((i / sw - 0.5) * dx + (j / sh - 0.5) * dy + 0.5);
    const v = Math.pow(p, 2.4) * (0.45 + 0.55 * n(i * 0.12, j * 0.12)), k = (j * sw + i) * 4;
    o[k] = 165; o[k + 1] = 112; o[k + 2] = 45; o[k + 3] = Math.round(255 * 0.42 * v);
  }
  sc.putImageData(d, 0, 0);
  ctx.save(); ctx.imageSmoothingQuality = 'high'; ctx.drawImage(c, 0, 0, W, H); ctx.restore();
}

// foxing: rust-brown age spots, soft or crisp, mostly small; they gather toward the edges
function foxing(ctx, W, H, cfg) {
  const intensity = typeof cfg.wearIntensity === 'number' ? cfg.wearIntensity : 1.0;
  if (intensity <= 0) return;
  const r = rng(cfg.seed * 61 + 11), u = Math.min(W, H) / 900;
  const colors = [[150, 78, 30], [170, 96, 40], [128, 62, 24]];
  ctx.save();
  ctx.globalCompositeOperation = 'multiply';
  for (let k = 0, tries = 0; k < 150 && tries < 900; tries++) {
    const x = r() * W, y = r() * H;
    const edge = Math.max(Math.abs(x / W - 0.5), Math.abs(y / H - 0.5)) * 2;
    if (r() > 0.15 + 0.85 * edge * edge * edge) continue;
    k++;
    // most spots are small and crisp; the rest are soft, squashed blotches of varied size
    const soft = r() < 0.4, rad = u * (soft ? 4 + Math.pow(r(), 1.5) * 15 : 1 + Math.pow(r(), 2) * 5) * intensity, c = colors[Math.floor(r() * 3)], a = (0.34 + 0.4 * r()) * intensity;
    const g = ctx.createRadialGradient(0, 0, rad * (soft ? 0 : 0.55), 0, 0, rad);
    if (soft) { g.addColorStop(0, rgba(c, a * 0.6)); g.addColorStop(0.55, rgba(c, a * 0.4)); g.addColorStop(1, rgba(c, 0)); }
    else { g.addColorStop(0, rgba(c, a * 0.7)); g.addColorStop(0.85, rgba(c, a * 0.8)); g.addColorStop(0.97, rgba(c, a * 1.15)); g.addColorStop(1, rgba(c, 0)); }
    ctx.save(); ctx.translate(x, y); ctx.rotate(r() * 3.14); ctx.scale(1, soft ? 0.55 + 0.45 * r() : 1);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rad, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

// rubber stamp: a box around a word in red or blue, about half the sheet wide, pressed crooked in the empty part below the text;
// the ink is denser in the middle, skips in patches, and the border is doubled as if pressed twice
function rubberStamp(ctx, W, H, cfg, below) {
  const r = rng(cfg.seed * 59 + 9), n = noise2(cfg.seed + 23);
  const stampCfg = typeof cfg.stamp === 'object' && cfg.stamp ? cfg.stamp : { text: String(cfg.stamp || 'RECEIVED') };
  const word = String(stampCfg.text || 'RECEIVED').toUpperCase();

  let ink = r() < 0.6 ? [176, 26, 36] : [34, 64, 150];
  if (stampCfg.color) {
    const cname = stampCfg.color.toLowerCase().trim();
    if (cname === 'red') ink = [176, 26, 36];
    else if (cname === 'blue') ink = [34, 64, 150];
    else if (cname === 'purple') ink = [128, 32, 140];
    else if (cname === 'green') ink = [34, 128, 50];
    else {
      const parsed = parseColor(stampCfg.color);
      if (parsed) ink = parsed.map((v) => Math.round(v * 255));
    }
  }

  // letter spacing grows with the size, so the word is measured at 100 px and scaled to the target width
  const m = makeCanvas(1, 1).getContext('2d');
  m.font = `bold 100px "Courier Prime", monospace`; m.letterSpacing = '12px';
  const kw = m.measureText(word).width / 100;
  const bw = W * 0.44, fs = bw / (kw + 1.2), bh = fs * 2.1;
  let ang = -(0.14 + 0.17 * r());
  if (typeof stampCfg.angle === 'number' && Number.isFinite(stampCfg.angle)) ang = stampCfg.angle;

  let cx = W * (0.46 + 0.1 * r());
  if (stampCfg.align === 'left') cx = bw / 2 + W * 0.08;
  else if (stampCfg.align === 'right') cx = W - bw / 2 - W * 0.08;
  else if (stampCfg.align === 'center') cx = W / 2;
  const cy = Math.min(H - bh / 2 - 30, Math.max(H * 0.55, below + bh / 2 + 24));
  const size = Math.ceil(Math.hypot(bw, bh) + fs * 0.8);
  const oc = makeCanvas(size, size, true), sc = oc.getContext('2d');
  sc.translate(size / 2, size / 2);
  sc.fillStyle = sc.strokeStyle = rgba(ink, 1);
  sc.textAlign = 'center'; sc.textBaseline = 'middle';
  sc.font = `bold ${fs}px "Courier Prime", monospace`; sc.letterSpacing = fs * 0.12 + 'px';
  // the outer border, a second pass a little off it (pressed twice), and an inner frame
  sc.lineWidth = fs * 0.13; sc.strokeRect(-bw / 2, -bh / 2, bw, bh);
  sc.globalAlpha = 0.5; sc.lineWidth = fs * 0.1; sc.strokeRect(-bw / 2 + fs * 0.07, -bh / 2 - fs * 0.05, bw, bh); sc.globalAlpha = 1;
  sc.lineWidth = fs * 0.05; sc.strokeRect(-bw / 2 + fs * 0.3, -bh / 2 + fs * 0.3, bw - fs * 0.6, bh - fs * 0.6);
  sc.fillText(word, -fs * 0.06, fs * 0.05);
  // uneven coverage: denser in the middle, blotchy patches with no ink, a little grain
  const d = sc.getImageData(0, 0, size, size), o = d.data, hs = size / 2;
  for (let k = 0; k < o.length; k += 4) {
    if (!o[k + 3]) continue;
    const p = k / 4, x = p % size, y = Math.floor(p / size), dx = (x - hs) / (bw / 2), dy = (y - hs) / (bh / 2);
    const mid = 1 - 0.25 * Math.min(1, dx * dx + dy * dy);
    const cov = clamp((n(x / (fs * 1.5), y / (fs * 1.5)) - 0.25) * 3.2) * mid * (r() < 0.94 ? 1 : 0.3);
    o[k + 3] = Math.round(o[k + 3] * cov);
  }
  sc.putImageData(d, 0, 0);
  ctx.save();
  ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.9;
  ctx.translate(cx, cy); ctx.rotate(ang); ctx.drawImage(oc, -size / 2, -size / 2);
  ctx.restore();
}

// taped note: two strips across the top corners, translucent amber with straight cut ends (one torn in a zigzag), a gloss band and specks
function tape(ctx, W, H, cfg) {
  const r = rng(cfg.seed * 53 + 7), L = W * (0.24 + 0.04 * r()), w = W * 0.1;
  [[0.1, 0.05, 0.7], [0.9, 0.05, -0.7]].forEach(([px, py, ang]) => {
    const x = W * (px + (r() - 0.5) * 0.03), y = H * (py + (r() - 0.5) * 0.02), a = ang + (r() - 0.5) * 0.1;
    ctx.save();
    ctx.translate(x, y); ctx.rotate(a);
    // the torn end is a zigzag on the right, the other end is cut straight
    const zig = [];
    for (let i = 0; i <= 6; i++) zig.push([L / 2 - (i % 2 ? 0 : 2 + 4 * r()), -w / 2 + w * i / 6]);
    const body = () => {
      ctx.beginPath(); ctx.moveTo(-L / 2, -w / 2);
      zig.forEach((p) => ctx.lineTo(p[0], p[1]));
      ctx.lineTo(-L / 2, w / 2); ctx.closePath();
    };
    body();
    ctx.fillStyle = 'rgba(226,176,96,0.48)'; ctx.fill();
    const g = ctx.createLinearGradient(0, -w / 2, 0, w / 2);
    g.addColorStop(0, 'rgba(255,248,230,0)'); g.addColorStop(0.3, 'rgba(255,248,230,0.3)'); g.addColorStop(0.5, 'rgba(255,248,230,0.06)'); g.addColorStop(1, 'rgba(255,248,230,0)');
    ctx.fillStyle = g; ctx.fill();
    // darker edges, slightly thicker at the cut end
    body(); ctx.strokeStyle = 'rgba(140,92,36,0.5)'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = 'rgba(140,92,36,0.16)'; ctx.fillRect(-L / 2, -w / 2, L * 0.03, w);
    for (let s = 0, k = 6 + Math.floor(r() * 4); s < k; s++) {
      ctx.fillStyle = `rgba(70,46,22,${0.3 + 0.3 * r()})`;
      ctx.beginPath(); ctx.arc((r() - 0.5) * L * 0.8, (r() - 0.5) * w * 0.7, 1 + 2 * r(), 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  });
}

function staple(ctx, W, H, cfg, front) {
  const r = rng(cfg.seed * 71 + 3);
  const x = 54 + r() * 16, y = 48 + r() * 16;
  const ang = -0.52 + (r() - 0.5) * 0.15;
  ctx.save();
  ctx.translate(front ? x : W - x, y);
  ctx.rotate(front ? ang : -ang);
  if (front) {
    ctx.fillStyle = 'rgba(30, 20, 10, 0.7)';
    ctx.fillRect(-22, -3, 5, 6);
    ctx.fillRect(17, -3, 5, 6);
    ctx.fillStyle = 'rgba(10, 10, 10, 0.35)';
    ctx.fillRect(-20, 1, 40, 5);
    const grad = ctx.createLinearGradient(0, -3, 0, 3);
    grad.addColorStop(0, '#c8cdd4');
    grad.addColorStop(0.3, '#ffffff');
    grad.addColorStop(0.7, '#858d99');
    grad.addColorStop(1, '#535b66');
    ctx.fillStyle = grad;
    ctx.fillRect(-20, -3, 40, 5);
    ctx.fillStyle = 'rgba(140, 70, 30, 0.35)';
    ctx.fillRect(-8, -2, 6, 3);
  } else {
    ctx.fillStyle = 'rgba(30, 20, 10, 0.7)';
    ctx.fillRect(-22, -3, 5, 6);
    ctx.fillRect(17, -3, 5, 6);
    ctx.fillStyle = '#7a828e';
    ctx.fillRect(-18, -2, 12, 4);
    ctx.fillRect(6, -2, 12, 4);
  }
  ctx.restore();
}

function paperClip(ctx, W, H, cfg, front) {
  const r = rng(cfg.seed * 79 + 5);
  const x = W * (0.68 + 0.12 * r());
  const ang = (r() - 0.5) * 0.08;
  const L = Math.min(W, H) * 0.08 + 20;
  const wOuter = 22, wInner = 14;
  const radO = wOuter / 2, radI = wInner / 2;

  ctx.save();
  ctx.translate(front ? x : W - x, 0);
  ctx.rotate(front ? ang : -ang);

  const drawWire = (pathFn) => {
    ctx.save();
    ctx.translate(1.5, 2);
    ctx.strokeStyle = 'rgba(20, 15, 10, 0.28)';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    pathFn();
    ctx.stroke();
    ctx.restore();

    ctx.strokeStyle = '#5a626d';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    pathFn();
    ctx.stroke();

    ctx.strokeStyle = '#c5cbd3';
    ctx.lineWidth = 2.8;
    pathFn();
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    pathFn();
    ctx.stroke();
  };

  if (front) {
    drawWire(() => {
      ctx.beginPath();
      ctx.moveTo(radO, 0);
      ctx.lineTo(radO, L - radO);
      ctx.arc(0, L - radO, radO, 0, Math.PI, false);
      ctx.lineTo(-radO, 0);
    });
  } else {
    drawWire(() => {
      ctx.beginPath();
      ctx.moveTo(radI, 0);
      const innerL = L * 0.72;
      ctx.lineTo(radI, innerL - radI);
      ctx.arc(0, innerL - radI, radI, 0, Math.PI, false);
      ctx.lineTo(-radI, 0);
    });
  }
  ctx.restore();
}

function drawWatermark(ctx, W, H, wm) {
  if (!wm) return;
  const text = typeof wm === 'string' ? wm : (wm.text || '');
  const symbol = typeof wm === 'object' ? (wm.symbol || '') : '';
  if (!text && !symbol) return;

  const cx = W / 2, cy = H / 2;
  const R = Math.min(W, H) * 0.22;

  const drawPass = (ox, oy, fill, stroke) => {
    ctx.save();
    ctx.translate(cx + ox, cy + oy);
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, R - 12, 0, Math.PI * 2);
    ctx.stroke();

    if (symbol && text) {
      ctx.font = `${Math.round(R * 0.55)}px serif`;
      ctx.fillText(symbol, 0, -R * 0.2);
      ctx.font = `bold ${Math.round(R * 0.18)}px "Courier Prime", monospace`;
      ctx.letterSpacing = '6px';
      ctx.fillText(text.toUpperCase(), 0, R * 0.45);
    } else if (symbol) {
      ctx.font = `${Math.round(R * 0.85)}px serif`;
      ctx.fillText(symbol, 0, 0);
    } else {
      ctx.font = `bold ${Math.max(22, Math.round(R * 0.22))}px "Courier Prime", monospace`;
      ctx.letterSpacing = '8px';
      ctx.fillText(text.toUpperCase(), 0, 0);
    }
    ctx.restore();
  };

  ctx.save();
  drawPass(-1.5, -1.5, 'rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.12)');
  drawPass(1.5, 1.5, 'rgba(40, 30, 20, 0.06)', 'rgba(40, 30, 20, 0.09)');
  drawPass(0, 0, 'rgba(120, 110, 100, 0.05)', 'rgba(120, 110, 100, 0.07)');
  ctx.restore();
}

function drawWaxSeal(ctx, cx, cy, seal) {
  const symbol = (seal && typeof seal.symbol === 'string' && seal.symbol) ? seal.symbol : 'V';
  let fillCol = 'rgba(145, 24, 28, 0.95)';
  let strokeCol = 'rgba(95, 12, 16, 0.85)';
  let symbolCol = 'rgba(85, 10, 14, 0.95)';

  const col = seal?.color;
  if (Array.isArray(col) && col.length === 3) {
    const [cr, cg, cb] = col.map((v) => Math.round(v * 255));
    fillCol = `rgba(${cr}, ${cg}, ${cb}, 0.95)`;
    strokeCol = `rgba(${Math.round(cr * 0.65)}, ${Math.round(cg * 0.65)}, ${Math.round(cb * 0.65)}, 0.85)`;
    symbolCol = `rgba(${Math.round(cr * 0.55)}, ${Math.round(cg * 0.55)}, ${Math.round(cb * 0.55)}, 0.95)`;
  } else if (typeof col === 'string') {
    const s = col.toLowerCase().trim();
    if (s === 'gold') {
      fillCol = 'rgba(212, 165, 45, 0.95)';
      strokeCol = 'rgba(150, 110, 25, 0.85)';
      symbolCol = 'rgba(120, 85, 18, 0.95)';
    } else if (s === 'burgundy') {
      fillCol = 'rgba(108, 16, 38, 0.95)';
      strokeCol = 'rgba(70, 8, 22, 0.85)';
      symbolCol = 'rgba(58, 6, 18, 0.95)';
    } else if (s === 'red') {
      fillCol = 'rgba(155, 24, 28, 0.95)';
      strokeCol = 'rgba(98, 12, 16, 0.85)';
      symbolCol = 'rgba(85, 10, 14, 0.95)';
    } else {
      const parsed = parseColor(col);
      if (parsed) {
        const [cr, cg, cb] = parsed.map((v) => Math.round(v * 255));
        fillCol = `rgba(${cr}, ${cg}, ${cb}, 0.95)`;
        strokeCol = `rgba(${Math.round(cr * 0.65)}, ${Math.round(cg * 0.65)}, ${Math.round(cb * 0.65)}, 0.85)`;
        symbolCol = `rgba(${Math.round(cr * 0.55)}, ${Math.round(cg * 0.55)}, ${Math.round(cb * 0.55)}, 0.95)`;
      }
    }
  }

  ctx.save();
  ctx.save();
  ctx.translate(cx + 2, cy + 3);
  ctx.fillStyle = 'rgba(20, 10, 5, 0.3)';
  ctx.beginPath();
  for (let a = 0; a <= Math.PI * 2 + 0.01; a += 0.15) {
    const q = 50 * (1 + 0.08 * Math.sin(a * 8));
    if (a === 0) ctx.moveTo(Math.cos(a) * q, Math.sin(a) * q);
    else ctx.lineTo(Math.cos(a) * q, Math.sin(a) * q);
  }
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = fillCol;
  ctx.beginPath();
  for (let a = 0; a <= Math.PI * 2 + 0.01; a += 0.15) {
    const q = 48 * (1 + 0.08 * Math.sin(a * 8));
    if (a === 0) ctx.moveTo(Math.cos(a) * q, Math.sin(a) * q);
    else ctx.lineTo(Math.cos(a) * q, Math.sin(a) * q);
  }
  ctx.fill();

  ctx.strokeStyle = strokeCol;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 32, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(-1, -1, 31, Math.PI * 0.8, Math.PI * 1.7);
  ctx.stroke();

  ctx.fillStyle = symbolCol;
  ctx.font = 'bold 32px "Caveat", cursive';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(symbol, 0, 2);
  ctx.restore();
  ctx.restore();
}

function deckleEdge(ctx, W, H, cfg, r) {
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 252, 240, 0.45)';
  ctx.lineWidth = 1.2;
  const strand = (x, y, dx, dy, len) => {
    ctx.beginPath(); ctx.moveTo(x, y);
    ctx.lineTo(x + dx * len + (r() - 0.5) * 3, y + dy * len + (r() - 0.5) * 3);
    ctx.stroke();
  };
  for (let x = 4; x < W - 4; x += 4 + r() * 6) {
    strand(x, 2, (r() - 0.5) * 0.5, 1, 3 + r() * 7);
    strand(x, H - 2, (r() - 0.5) * 0.5, -1, 3 + r() * 7);
  }
  for (let y = 4; y < H - 4; y += 4 + r() * 6) {
    strand(2, y, 1, (r() - 0.5) * 0.5, 3 + r() * 7);
    strand(W - 2, y, -1, (r() - 0.5) * 0.5, 3 + r() * 7);
  }
  ctx.restore();
}

function greaseStain(ctx, W, H, cfg, front) {
  const r = rng(cfg.seed * 67 + 13);
  const cx = W * (0.25 + 0.5 * r()), cy = H * (0.3 + 0.45 * r());
  const rad = Math.min(W, H) * (0.12 + 0.08 * r());
  const x = front ? cx : W - cx;
  ctx.save();
  ctx.globalCompositeOperation = 'multiply';
  const g = ctx.createRadialGradient(x, cy, rad * 0.2, x, cy, rad);
  g.addColorStop(0, 'rgba(140, 120, 70, 0.45)');
  g.addColorStop(0.65, 'rgba(150, 130, 80, 0.30)');
  g.addColorStop(1, 'rgba(150, 130, 80, 0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  for (let a = 0; a <= Math.PI * 2 + 0.01; a += 0.1) {
    const q = rad * (1 + 0.12 * Math.sin(a * 5 + r() * 3));
    if (a === 0) ctx.moveTo(x + Math.cos(a) * q, cy + Math.sin(a) * q);
    else ctx.lineTo(x + Math.cos(a) * q, cy + Math.sin(a) * q);
  }
  ctx.fill();
  ctx.restore();
}

function dogear(ctx, W, H, cfg, front) {
  const s = Math.min(W, H) * 0.15;
  ctx.save();
  if (front) {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.3)';
    ctx.beginPath();
    ctx.moveTo(W - s - 8, 0); ctx.lineTo(W, s + 8); ctx.lineTo(W - s, s); ctx.closePath();
    ctx.fill();
    const grad = ctx.createLinearGradient(W - s, 0, W, s);
    grad.addColorStop(0, 'rgba(235, 225, 210, 0.95)');
    grad.addColorStop(1, 'rgba(195, 185, 170, 0.95)');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.moveTo(W - s, 0); ctx.lineTo(W, s); ctx.lineTo(W - s, s); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(60, 50, 40, 0.4)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(W - s, 0); ctx.lineTo(W, s); ctx.stroke();
  }
  ctx.restore();
}

function dampWrinkle(ctx, W, H, cfg) {
  const r = rng(cfg.seed * 83 + 7);
  ctx.save();
  ctx.strokeStyle = 'rgba(120, 140, 170, 0.12)';
  ctx.lineWidth = 3;
  for (let k = 0; k < 6; k++) {
    const y0 = H * (0.2 + 0.12 * k + 0.04 * r());
    ctx.beginPath();
    ctx.moveTo(0, y0);
    ctx.bezierCurveTo(W * 0.33, y0 + 18 * (r() - 0.5), W * 0.66, y0 + 18 * (r() - 0.5), W, y0);
    ctx.stroke();
  }
  ctx.restore();
}

function pocketCreases(ctx, W, H, cfg) {
  const r = rng(cfg.seed * 89 + 11);
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
  ctx.lineWidth = 1;
  for (let k = 0; k < 14; k++) {
    const x0 = r() * W, y0 = r() * H;
    const a = r() * Math.PI, len = 60 + r() * 120;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0 + Math.cos(a) * len, y0 + Math.sin(a) * len);
    ctx.stroke();
  }
  ctx.restore();
}

// hidden ink (indented writing): the pen groove, visible only under grazing light. Rows bottom-up, like the crease field
export function hiddenInkField(cfg, W, H) {
  if (!cfg.hiddenInk) return null;
  const c = makeCanvas(W, H, true), x = c.getContext('2d');
  const size = Math.round(W * 0.12);
  x.fillStyle = '#fff'; x.textAlign = 'center'; x.filter = 'blur(0.7px)';
  x.font = `${size}px "Caveat", cursive`;
  x.translate(W / 2, H * 0.7); x.rotate(-0.1);
  cfg.hiddenInk.split('\n').forEach((l, i) => x.fillText(l, 0, i * size * 1.05));
  const d = x.getImageData(0, 0, W, H).data;
  const g = new Float32Array(W * H);
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) g[j * W + i] = d[((H - 1 - j) * W + i) * 4 + 3] / 255;
  return g;
}

// ---------- cut-out effects (half resolution): R = paper present, B = tear fibers, A = burn distance ----------
function jagged(a, b, r, depth, rough) {
  let pts = [a, b];
  for (let d = 0; d < depth; d++) {
    const next = [pts[0]];
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i - 1], q = pts[i];
      const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
      const dx = q[0] - p[0], dy = q[1] - p[1], len = Math.hypot(dx, dy);
      const off = (r() - 0.5) * len * rough;
      next.push([mx - dy / len * off, my + dx / len * off], q);
    }
    pts = next;
  }
  return pts;
}

// kind: null (no burn field), 'burn' (a burn with cfg.burn's form, sparks on its front) or 'singed' (browned rim only)
export async function drawEffects(cfg, T, kind = null) {
  const MW = Math.round(T.w * PPU / 2), MH = Math.round(T.h * PPU / 2);
  const pres = makeCanvas(MW, MH, true), pc = pres.getContext('2d');
  pc.fillStyle = '#fff'; pc.fillRect(0, 0, MW, MH);
  const fib = makeCanvas(MW, MH, true), fc = fib.getContext('2d');
  fc.fillStyle = '#000'; fc.fillRect(0, 0, MW, MH);
  const r = rng(cfg.seed * 13 + 3);
  pc.fillStyle = '#000';
  fc.strokeStyle = '#fff'; fc.lineWidth = 2.2; fc.filter = 'blur(0.8px)';
  if (cfg.type === 'form') {
    for (let y = 22; y < MH - 6; y += 24) [15, MW - 15].forEach((x) => { pc.beginPath(); pc.arc(x, y, 5.5, 0, Math.PI * 2); pc.fill(); });
  }
  if (cfg.type === 'notebook') {
    // the page was ripped out of the spiral: torn holes and a ragged edge
    const pts = jagged([4, 0], [4, MH], r, 7, 0.05);
    pc.beginPath(); pc.moveTo(0, 0); pts.forEach((p) => pc.lineTo(p[0] + r() * 2, p[1])); pc.lineTo(0, MH); pc.closePath(); pc.fill();
    for (let y = 18; y < MH; y += 22) { pc.beginPath(); pc.arc(2, y, 5 + r() * 1.5, 0, Math.PI * 2); pc.fill(); }
    fc.beginPath(); pts.forEach((p, i) => (i ? fc.lineTo(p[0] + 1, p[1]) : fc.moveTo(p[0] + 1, p[1]))); fc.stroke();
  }
  if (cfg.type === 'envelope') {
    // the flap is a triangle: the rest of the top band does not exist
    const ab = T.flap / T.h * MH;
    pc.beginPath(); pc.moveTo(-2, -2); pc.lineTo(MW / 2, -2); pc.lineTo(MW / 2, 3); pc.lineTo(-2, ab); pc.closePath(); pc.fill();
    pc.beginPath(); pc.moveTo(MW + 2, -2); pc.lineTo(MW / 2, -2); pc.lineTo(MW / 2, 3); pc.lineTo(MW + 2, ab); pc.closePath(); pc.fill();
  }
  if (cfg.type === 'punchcard') {
    pc.beginPath(); pc.moveTo(-2, -2); pc.lineTo(26, -2); pc.lineTo(-2, 26); pc.closePath(); pc.fill();
    const str = (cfg.text.split('\n')[0] || '').slice(0, 80);
    const x0 = 17, x1 = MW - 17;
    const colW = (x1 - x0) / 79;
    const rowY0 = MH * 0.23, rowStep = (MH * 0.94 - rowY0) / 11;
    for (let i = 0; i < str.length; i++) {
      const rows = hollerithRows(str[i]);
      const cx = x0 + i * colW;
      for (const r of rows) {
        const cy = rowY0 + r * rowStep;
        pc.fillRect(cx - 2.5, cy - 5, 5, 10);
      }
    }
  }
  const isDeckle = cfg.type === 'parchment' || cfg.type === 'postcard' || cfg.states.includes('aged');
  if (isDeckle) {
    const ptsT = jagged([-2, 3], [MW + 2, 3], r, 5, 0.12);
    const ptsB = jagged([-2, MH - 3], [MW + 2, MH - 3], r, 5, 0.12);
    const ptsL = jagged([3, -2], [3, MH + 2], r, 5, 0.12);
    const ptsR = jagged([MW - 3, -2], [MW - 3, MH + 2], r, 5, 0.12);
    fc.lineWidth = 2.2;
    [ptsT, ptsB, ptsL, ptsR].forEach((pts) => {
      fc.beginPath(); pts.forEach((p, i) => (i ? fc.lineTo(p[0], p[1]) : fc.moveTo(p[0], p[1]))); fc.stroke();
    });
    fc.lineWidth = 1.0;
    const strand = (x, y, dx, dy, len) => {
      fc.beginPath(); fc.moveTo(x, y);
      fc.lineTo(x + dx * len + (r() - 0.5) * 2, y + dy * len + (r() - 0.5) * 2);
      fc.stroke();
    };
    for (let x = 2; x < MW - 2; x += 3 + r() * 4) {
      strand(x, 2, (r() - 0.5) * 0.6, 1, 2 + r() * 4);
      strand(x, MH - 2, (r() - 0.5) * 0.6, -1, 2 + r() * 4);
    }
    for (let y = 2; y < MH - 2; y += 3 + r() * 4) {
      strand(2, y, 1, (r() - 0.5) * 0.6, 2 + r() * 4);
      strand(MW - 2, y, -1, (r() - 0.5) * 0.6, 2 + r() * 4);
    }
  }
  if (cfg.states.includes('torn')) {
    const v = Math.floor(r() * 3);
    let a, b, corners;
    if (v === 0) { a = [MW * (0.5 + 0.25 * r()), -2]; b = [MW + 2, MH * (0.2 + 0.25 * r())]; corners = [[MW + 2, -2]]; }
    else if (v === 1) { a = [-2, MH * (0.72 + 0.12 * r())]; b = [MW + 2, MH * (0.72 + 0.12 * r())]; corners = [[MW + 2, MH + 2], [-2, MH + 2]]; }
    else { a = [MW * (0.3 + 0.25 * r()), MH + 2]; b = [-2, MH * (0.55 + 0.2 * r())]; corners = [[-2, MH + 2]]; }
    const pts = jagged(a, b, r, 8, 0.22);
    pc.beginPath(); pts.forEach((p, i) => (i ? pc.lineTo(p[0], p[1]) : pc.moveTo(p[0], p[1]))); corners.forEach((p) => pc.lineTo(p[0], p[1])); pc.closePath(); pc.fill();
    fc.lineWidth = 3.2;
    fc.beginPath(); pts.forEach((p, i) => (i ? fc.lineTo(p[0], p[1]) : fc.moveTo(p[0], p[1]))); fc.stroke();
  }
  const pd = pc.getImageData(0, 0, MW, MH).data, fd = fc.getImageData(0, 0, MW, MH).data;
  const b = kind ? await Jobs.run('burn', [{ seed: cfg.seed, form: kind === 'singed' ? 'singed' : cfg.burn }, MW, MH]) : null;
  const out = pc.createImageData(MW, MH), o = out.data;
  const pts = [];
  let lo = Infinity;
  for (let j = 0; j < MH; j++) for (let i = 0; i < MW; i++) {
    const k = (j * MW + i) * 4;
    o[k] = pd[k]; o[k + 1] = 0; o[k + 2] = fd[k];
    if (b) {
      const v = b[j * MW + i];
      o[k + 3] = Math.round(clamp(v / 1.4) * 255);
      lo = Math.min(lo, v);
      // spark points (u, v with v bottom-up, and the burn distance); a singed rim has no embers
      if (kind === 'burn' && i % 3 === 0 && j % 3 === 0 && pd[k] > 128) pts.push((i + 0.5) / MW, 1 - (j + 0.5) / MH, v);
    } else o[k + 3] = 255;
  }
  const c = makeCanvas(MW, MH);
  c.getContext('2d').putImageData(out, 0, 0);
  // lo: the lowest burn value that the alpha can hold (never below 0): a singed front sits just under it
  return { canvas: c, burnPts: kind === 'burn' ? new Float32Array(pts) : null, lo: b ? Math.max(0, lo) : 0 };
}
