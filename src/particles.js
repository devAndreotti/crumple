// Particles: dust while unfolding, sparks along a burnt edge, ashes when a paper burns away.
export function Particles(max = 420) {
  const d = [], buf = new Float32Array(max * 8);
  return {
    emit(o) { if (d.length < max) d.push(o); },
    step(dt) {
      for (let i = d.length - 1; i >= 0; i--) {
        const q = d[i];
        q.t += dt;
        if (q.t >= q.life) { d.splice(i, 1); continue; }
        q.vx += (q.ax || 0) * dt; q.vy += (q.ay || 0) * dt;
        q.x += q.vx * dt; q.y += q.vy * dt;
      }
    },
    get n() { return d.length; },
    // a single reused Float32Array: nothing is allocated per frame
    buffer() {
      for (let i = 0; i < d.length; i++) {
        const q = d[i], u = q.t / q.life, o = i * 8;
        let a = q.a * Math.pow(Math.sin(Math.PI * Math.min(1, u)), 0.6);
        if (q.flicker) a *= 0.55 + 0.45 * Math.sin(q.t * 28 + i);
        buf[o] = q.x; buf[o + 1] = q.y; buf[o + 2] = q.z; buf[o + 3] = q.r; buf[o + 4] = q.g; buf[o + 5] = q.b; buf[o + 6] = a; buf[o + 7] = q.s;
      }
      return buf.subarray(0, d.length * 8);
    },
    clear() { d.length = 0; },
  };
}
