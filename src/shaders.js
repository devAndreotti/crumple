// GLSL ES 3.00 shaders. The vertex shader deforms a flat sheet into each closed shape; uP = how unfolded it is (0..1).

export const VS = `#version 300 es
precision highp float;
in vec2 aXY;
uniform sampler2D uH;
uniform int uShape;
uniform float uP, uK0, uKres, uA0, uAres, uScale, uSeedA, uSquash, uRoll, uCurl, uTear, uStubX, uIsStub, uFoldSide, uFoldBw, uFoldY, uEdge, uThick;
uniform vec2 uHalf;
uniform mat4 uModel, uProj;
out vec3 vPos; out vec3 vNrm; out vec2 vUv; out float vE; out float vAmp; out float vStress;
float Hf(vec2 xy){ return textureLod(uH, xy / (2.0 * uHalf) + 0.5, 0.0).r; }
vec3 rotY(vec3 v, float a){ float c = cos(a), s = sin(a); return vec3(c * v.x + s * v.z, v.y, -s * v.x + c * v.z); }
vec3 rotZ(vec3 v, float a){ float c = cos(a), s = sin(a); return vec3(c * v.x - s * v.y, s * v.x + c * v.y, v.z); }
// rounded fold: d = distance to the fold line; th = angle (negative folds backwards); bw = length of the bend.
// Returns (advance, height, local angle). The radius bw/|th| leaves room between layers: the fold thickness.
vec3 bend(float d, float th, float bw){
  float t = max(abs(th), 1e-4), R = bw / t, L = R * t;
  if (d < L) { float a = d / R; return vec3(R * sin(a), R * (1.0 - cos(a)), a); }
  return vec3(R * sin(t) + (d - L) * cos(t), R * (1.0 - cos(t)) + (d - L) * sin(t), t);
}
float foldStress(vec2 xy){
  float bw = max(uFoldBw, 0.008);
  if (uShape == 3) {
    return max(smoothstep(bw * 2.2, 0.0, abs(xy.x)), smoothstep(bw * 3.2, 0.0, abs(xy.y)));
  } else if (uShape == 4) {
    return smoothstep(bw * 2.2, 0.0, abs(xy.x));
  } else if (uShape == 5) {
    float y3 = uHalf.y / 3.0;
    return max(smoothstep(bw * 2.2, 0.0, abs(xy.y + y3 * 1.08)), smoothstep(bw * 3.2, 0.0, abs(xy.y - y3)));
  } else if (uShape == 6) {
    return smoothstep(bw * 2.2, 0.0, abs(xy.y - uFoldY));
  } else if (uShape == 7) {
    float x3 = uHalf.x * 0.333;
    return max(smoothstep(bw * 2.2, 0.0, abs(xy.x + x3)), max(smoothstep(bw * 2.6, 0.0, abs(xy.x)), smoothstep(bw * 3.2, 0.0, abs(xy.x - x3))));
  } else if (uShape == 8) {
    return max(smoothstep(bw * 2.2, 0.0, abs(xy.x)), smoothstep(bw * 2.6, 0.0, abs(xy.y)));
  }
  return 0.0;
}
void foldX(inout vec3 p, inout vec3 n, float x0, float s, float th, float bw){
  float d = (p.x - x0) * s;
  if (d <= 0.0 || abs(th) < 1e-4) return;
  vec3 c = bend(d, th, bw);
  float g = sign(th), ca = cos(c.z), sa = g * sin(c.z), z0 = p.z;
  p.x = x0 + s * (c.x - sa * z0);
  p.z = g * c.y + ca * z0;
  n = vec3(ca * n.x - s * sa * n.z, n.y, s * sa * n.x + ca * n.z);
}
void foldY(inout vec3 p, inout vec3 n, float y0, float s, float th, float bw){
  float d = (p.y - y0) * s;
  if (d <= 0.0 || abs(th) < 1e-4) return;
  vec3 c = bend(d, th, bw);
  float g = sign(th), ca = cos(c.z), sa = g * sin(c.z), z0 = p.z;
  p.y = y0 + s * (c.x - sa * z0);
  p.z = g * c.y + ca * z0;
  n = vec3(n.x, ca * n.y - s * sa * n.z, s * sa * n.y + ca * n.z);
}
vec3 place(vec2 xy, out float e, out float amp, out vec3 n){
  vec3 p = vec3(xy, 0.0);
  n = vec3(0.0, 0.0, 1.0);
  if (uShape == 0) {
    // ball / flattened: the sheet wrapped on a sphere of curvature k (radial lengths preserved); the center opens first
    float s = length(xy), sn = s / length(uHalf);
    float q = clamp(uP * 1.5 - sn * 0.5 + 0.14 * sn * sin(atan(xy.y, xy.x) * 3.0 + uSeedA), 0.0, 1.0);
    e = q * q * (3.0 - 2.0 * q);
    float k = mix(uKres, uK0, (1.0 - e) * (1.0 - e));
    if (s > 1e-6) {
      float th = s * k, st = sin(th), ct = cos(th);
      vec2 dir = xy / s;
      n = vec3(st * dir, ct);
      p = vec3(st / k * dir, (ct - 1.0) / k);
    }
    float sq = mix(uSquash, 1.0, e);
    float expan = mix(1.0 + (1.0 - uSquash) * 0.3, 1.0, e);
    p.z *= sq;
    p.xy *= expan;
    n = normalize(vec3(n.xy / expan, n.z / sq));
    amp = mix(uA0, uAres, pow(e, 2.2));
  } else if (uShape == 1) {
    // roll: unrolls from left to right; the rest stays rolled in a spiral
    e = uP;
    float L = 2.0 * uHalf.x * e, s = xy.x + uHalf.x;
    if (s > L) {
      float ph = (s - L) / uRoll;
      float r = uRoll * (1.0 - 0.07 * ph / 6.2831853);
      p = vec3(L - uHalf.x + r * sin(ph), xy.y, r * (1.0 - cos(ph)));
      n = vec3(-sin(ph), 0.0, cos(ph));
    }
    p.x += (uHalf.x - uRoll) * (1.0 - e);
    amp = mix(uA0, uAres, e);
  } else if (uShape == 2) {
    // twist (candy wrapper): rolled from the bottom edge, ends pinched, twisted and fanned out.
    // When opening it first untwists (g drops fast) and then unrolls (k goes to zero).
    e = uP;
    float k = uK0 * (1.0 - e) * (1.0 - e);
    if (k > 1e-2) {
      float a = (xy.y + uHalf.y) * k;
      float r = 1.0 / k - uRoll * a / 6.2831853;
      vec2 ax = vec2(-uHalf.y, -1.0 / k);
      p = vec3(xy.x, ax.x + r * sin(a), ax.y + r * cos(a));
      n = vec3(0.0, sin(a), cos(a));
      float g = pow(1.0 - e, 3.0);
      float axv = abs(xy.x) / uHalf.x;
      float neck = smoothstep(0.5, 0.8, axv), fl = smoothstep(0.82, 1.0, axv);
      float sc = mix(1.0, mix(1.0, 0.17 * (1.0 + 3.2 * fl), neck), g);
      float tw = sign(xy.x) * (neck * 3.4 + fl * 1.3) * g;
      float c = cos(tw), sn = sin(tw);
      vec2 rv = (p.yz - ax) * sc;
      p.yz = ax + vec2(c * rv.x - sn * rv.y, sn * rv.x + c * rv.y);
      n.yz = vec2(c * n.y - sn * n.z, sn * n.y + c * n.z);
      n = normalize(n);
    }
    p.y += uHalf.y * (1.0 - e);
    p.z += (1.0 / uK0) * (1.0 - e);
    amp = mix(uA0, uAres, e);
  } else if (uShape == 6) {
    // envelope: only the flap folds (backwards when it opens, so the letter can come out); the body stays centered
    e = uP;
    foldY(p, n, uFoldY, 1.0, mix(3.12, -1.1, smoothstep(0.0, 1.0, e)), uFoldBw);
    p.y -= (uFoldY - uHalf.y) * 0.5;
    amp = mix(uA0, uAres, e);
  } else if (uShape == 7) {
    // accordion: z-folds along X axis
    e = uP;
    float em = smoothstep(0.0, 1.0, e);
    float a = 3.12 * (1.0 - em);
    float x3 = uHalf.x * 0.333;
    foldX(p, n, -x3, -1.0, a, uFoldBw);
    foldX(p, n, 0.0, 1.0, -a, uFoldBw * 1.5);
    foldX(p, n, x3, 1.0, a, uFoldBw * 2.0);
    p.x *= mix(0.28, 1.0, em);
    amp = mix(uA0, uAres, e);
  } else if (uShape == 8) {
    // triangle fold: corner tuck
    e = uP;
    float em = smoothstep(0.0, 1.0, e);
    float a = 3.12 * (1.0 - em);
    foldX(p, n, 0.0, 1.0, a, uFoldBw);
    foldY(p, n, 0.0, -1.0, a, uFoldBw * 1.5);
    p.xy *= mix(0.58, 1.0, em);
    amp = mix(uA0, uAres, e);
  } else {
    // folded with rounded bends: 3 = quarters, 4 = half, 5 = thirds (letter)
    e = uP;
    float e2 = smoothstep(0.0, 0.5, e), e1 = smoothstep(0.5, 1.0, e);
    if (uShape == 3) {
      foldX(p, n, 0.0, 1.0, 3.12 * (1.0 - e1), uFoldBw);
      foldY(p, n, 0.0, 1.0, 3.12 * (1.0 - e2), uFoldBw * 2.6);
      p.x += uHalf.x * 0.5 * (1.0 - e1);
      p.y += uHalf.y * 0.5 * (1.0 - e2);
    } else if (uShape == 4) {
      float em = smoothstep(0.0, 1.0, e);
      foldX(p, n, 0.0, uFoldSide, 3.12 * (1.0 - em), uFoldBw);
      p.x += uFoldSide * uHalf.x * 0.5 * (1.0 - em);
    } else {
      float y3 = uHalf.y / 3.0;
      // the bottom third is a bit shorter (folds at 1.08 thirds): its edge stops before the top fold
      foldY(p, n, -y3 * 1.08, -1.0, 3.12 * (1.0 - e1), uFoldBw);
      foldY(p, n, y3, 1.0, 3.12 * (1.0 - e2), uFoldBw * 2.6);
    }
    amp = mix(uA0, uAres, e);
  }
  p += n * Hf(xy) * amp;
  if (uIsStub > 0.5 && uTear > 0.0) {
    // torn stub: spins loose and falls
    vec3 piv = vec3(uStubX, 0.0, 0.0);
    p = rotY(rotZ(p - piv, -0.55 * uTear), 0.6 * uTear) + piv + vec3(0.08 * uTear, -1.1 * uTear * uTear, 0.12 * uTear);
    n = rotY(rotZ(n, -0.55 * uTear), 0.6 * uTear);
  }
  p.z -= uCurl * p.x * p.x;
  n = normalize(vec3(n.x + 2.0 * uCurl * p.x * n.z, n.y, n.z));
  return p;
}
void main(){
  float e, amp;
  vec3 nrm;
  vec3 p0 = place(aXY, e, amp, nrm);
  // thickness pass (card stock): the same sheet pushed away from the camera becomes the thick edge seen from the side
  if (uEdge > 0.5) p0 -= nrm * uThick * (nrm.z >= 0.0 ? 1.0 : -1.0);
  vec4 w = uModel * vec4(p0, 1.0);
  vPos = w.xyz;
  vNrm = mat3(uModel) * nrm;
  vUv = aXY / (2.0 * uHalf) + 0.5;
  vE = uShape == 0 ? pow(e, 2.2) : e;
  vAmp = amp * uScale;
  vStress = foldStress(aXY);
  gl_Position = uProj * w;
}`;

export const FS = `#version 300 es
precision highp float;
in vec3 vPos; in vec3 vNrm; in vec2 vUv; in float vE; in float vAmp; in float vStress;
uniform sampler2D uH, uPrintF, uPrintB, uFx, uGrain;
uniform vec2 uGrainK;
uniform vec3 uCam, uColor, uL, uLampPos;
uniform float uBump, uAge, uTime, uThru, uFront, uInkMax, uEdge, uDestroy, uLamp, uLampR;
out vec4 frag;
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
vec3 perturb(vec3 pos, vec3 n, vec2 dH){
  vec3 sx = dFdx(pos), sy = dFdy(pos);
  vec3 r1 = cross(sy, n), r2 = cross(n, sx);
  float det = dot(sx, r1);
  return normalize(abs(det) * n - sign(det) * (dH.x * r1 + dH.y * r2));
}
void main(){
  vec4 fx = texture(uFx, vUv);
  float pres = fx.r, sc = 0.0;
  if (uFront > -0.5) {
    // the burn front moves: paper behind it disappears, paper just ahead of it is scorched
    float b = fx.a * 1.4;
    pres = min(pres, smoothstep(uFront - 0.004, uFront + 0.012, b));
    sc = 1.0 - smoothstep(uFront, uFront + 0.17, b);
  }
  if (pres < 0.4) discard;
  float a = smoothstep(0.4, 0.6, pres);
  bool front = gl_FrontFacing;
  vec3 n = normalize(vNrm) * (front ? 1.0 : -1.0);
  vec3 L = normalize(uL);
  if (uEdge > 0.5) {
    float w = clamp((dot(n, L) + 0.3) / 1.3, 0.0, 1.0);
    vec3 ec = mix(uColor * vec3(0.8, 0.76, 0.7), vec3(0.08, 0.06, 0.05), smoothstep(0.55, 0.9, sc)) * (0.45 + 0.55 * w);
    frag = vec4(ec * a, a);
    return;
  }
  vec4 h0 = texture(uH, vUv);
  vec2 du = dFdx(vUv), dv = dFdy(vUv);
  vec4 hx = texture(uH, vUv + du), hy = texture(uH, vUv + dv);
  vec4 hx2 = texture(uH, vUv - du), hy2 = texture(uH, vUv - dv);
  // flashlight: a low warm light under the cursor with a small pool; outside it the paper darkens a little
  vec3 toP = uLampPos - vPos;
  vec3 Lp = normalize(toP);
  float pool = pow(1.0 - smoothstep(0.0, 1.0, length(toP.xy) / uLampR), 1.3) * uLamp;
  // hidden ink shows only under grazing light (the key light lying low, or the ring around the flashlight)
  float grazD = clamp((1.0 - L.z - 0.4) / 0.5, 0.0, 1.0);
  float grazP = smoothstep(0.2, 0.75, 1.0 - Lp.z) * pool;
  float ink = uInkMax * mix(grazD, grazP * 3.0, uLamp);
  // creases (R) and the hidden-ink groove (G); near the flashlight the crease relief gets stronger (grazing light)
  vec2 dH = vec2(hx.r - h0.r, hy.r - h0.r) * vAmp * uBump * (1.0 + 1.6 * pool) - vec2(hx.g - h0.g, hy.g - h0.g) * ink;
  n = perturb(vPos, n, dH);
  vec3 V = normalize(uCam - vPos);
  float wrap = clamp((dot(n, L) + 0.08) / 1.08, 0.0, 1.0);
  float wrapP = max(dot(n, Lp), 0.0);
  float backL = max(0.0, -dot(n, L));
  float backLp = max(0.0, -dot(n, Lp)) * pool;
  float backlight = backL + backLp * 1.8;
  float ao = mix(1.0, 0.42 + 0.58 * smoothstep(-0.55, 0.35, h0.r), 1.0 - vE);
  float fib = hash(floor(vUv * vec2(900.0, 1180.0)));
  vec2 eu = min(vUv, 1.0 - vUv);
  float edge = smoothstep(0.0, 0.05, min(eu.x, eu.y));
  vec3 col0 = mix(uColor, uColor * vec3(0.93, 0.84, 0.66), uAge);
  vec3 alb = col0 * (0.975 + 0.025 * fib) * (0.93 + 0.07 * edge);
  // paper grain texture, tiled at a physical scale across the sheet
  alb *= 1.0 + (texture(uGrain, vUv * uGrainK).r - 0.94) * 1.8;
  if (!front) alb *= 0.9;

  // chemical fold whitening: calculate fold ridge stress and bleach cellulose fibers along sharp ridges
  float ridgeCurv = max(0.0, -((hx.r + hx2.r - 2.0 * h0.r) + (hy.r + hy2.r - 2.0 * h0.r)));
  float creaseStress = clamp(ridgeCurv * vAmp * 140.0, 0.0, 1.0);
  float totalStress = clamp(vStress * 0.75 + creaseStress * 0.6, 0.0, 1.0);
  float whitening = smoothstep(0.12, 0.82, totalStress) * 0.28;
  vec3 bleachCol = mix(vec3(0.985, 0.98, 0.96), vec3(1.0), fib * 0.5);
  alb = mix(alb, max(alb, bleachCol), whitening);

  // front reads normally; the back is mirrored in u; backlight reveals ink silhouette from opposite face
  vec2 uvB = vec2(1.0 - vUv.x, vUv.y);
  vec4 tF = texture(uPrintF, vUv), tB = texture(uPrintB, uvB);
  vec4 pr = front ? tF : tB;
  vec4 th = front ? tB : tF;
  float thruFactor = clamp(uThru * (1.0 + 3.2 * backlight), 0.0, 0.92);
  vec3 inkSilhouette = mix(th.rgb, th.rgb * 0.3 + vec3(0.02), clamp(backlight * 1.5, 0.0, 0.8));
  alb = mix(alb, inkSilhouette, th.a * thruFactor);
  alb += col0 * (uThru * (backL * 0.4 + backLp * 0.7)) * (1.0 - th.a * 0.85);
  alb = mix(alb, pr.rgb, pr.a);
  alb = mix(alb, vec3(0.45, 0.29, 0.13), smoothstep(0.12, 0.55, sc) * 0.85);
  alb = mix(alb, vec3(0.06, 0.045, 0.04), smoothstep(0.55, 0.9, sc));
  alb = mix(alb, vec3(0.99, 0.985, 0.96), fx.b * 0.85);
  vec3 key = vec3(1.0, 0.965, 0.9), amb = vec3(0.62, 0.64, 0.7);
  vec3 warm = vec3(1.0, 0.9, 0.74);
  vec3 base = amb * 0.3 * ao + key * 1.04 * wrap * mix(1.0, ao, 0.7) * mix(1.0, 0.55, uLamp);
  base += key * 0.45 * backL * uThru * mix(1.0, ao, 0.5);
  // the flashlight adds in "screen" fashion: brightens without blowing out, dark ink stays dark
  float spot = wrapP * pool * mix(1.0, ao, 0.5);
  vec3 col = alb * (base + warm * spot * max(vec3(0.0), vec3(1.15) - base));
  col += key * 0.03 * pow(max(dot(n, normalize(L + V)), 0.0), 24.0) * (1.0 - 0.5 * uLamp);
  col += warm * 0.06 * pow(max(dot(n, normalize(Lp + V)), 0.0), 30.0) * pool;
  // embers: flickering orange on the burnt edge (stronger while the paper burns away)
  float rim = (1.0 - smoothstep(0.42, 0.66, pres)) * smoothstep(0.6, 0.95, sc);
  float fl = 0.55 + 0.45 * sin(uTime * 6.0 + vUv.x * 37.0 + vUv.y * 23.0) * sin(uTime * 2.3 + vUv.y * 51.0);
  col += vec3(1.0, 0.42, 0.08) * rim * fl * (1.7 + 1.6 * uDestroy);
  frag = vec4(col * a, a);
}`;

// soft rounded-rectangle shadow under the paper
export const SVS = `#version 300 es
in vec2 aQ;
uniform vec3 uC; uniform vec2 uHS; uniform float uSoft; uniform mat4 uProj;
out vec2 vL;
void main(){ vL = aQ * (uHS + vec2(uSoft * 3.0)); gl_Position = uProj * vec4(uC + vec3(vL, 0.0), 1.0); }`;
export const SFS = `#version 300 es
precision highp float;
in vec2 vL; uniform vec2 uHS; uniform float uR, uSoft, uA, uOpen, uFront, uFlip; uniform sampler2D uFx;
out vec4 frag;
// paper present at a point of the open sheet: cut-outs, tears and whatever the burn front has eaten cast no shadow
float paperAt(vec2 uv){
  vec4 fx = texture(uFx, clamp(uv, 0.0, 1.0));
  return uFront > -0.5 ? min(fx.r, smoothstep(uFront - 0.004, uFront + 0.012, fx.a * 1.4)) : fx.r;
}
void main(){
  vec2 q = abs(vL) - uHS + vec2(uR);
  float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uR;
  float pres = 1.0;
  if (uOpen > 0.0) {
    vec2 uv = vL / (2.0 * uHS) + 0.5, o = vec2(uSoft) / (2.0 * uHS);
    if (uFlip > 0.5) uv.x = 1.0 - uv.x;
    float p = paperAt(uv) * 2.0 + paperAt(uv + vec2(o.x, 0.0)) + paperAt(uv - vec2(o.x, 0.0)) + paperAt(uv + vec2(0.0, o.y)) + paperAt(uv - vec2(0.0, o.y));
    pres = mix(1.0, p / 6.0, uOpen);
  }
  frag = vec4(0.0, 0.0, 0.0, uA * pres * (1.0 - smoothstep(-uSoft, uSoft * 2.5, d)));
}`;
// particles (dust, sparks, ashes): soft round points, size in world units
export const PVS = `#version 300 es
in vec3 aP; in vec4 aC; in float aS;
uniform mat4 uProj; uniform float uPx;
out vec4 vC;
void main(){ gl_Position = uProj * vec4(aP, 1.0); gl_PointSize = max(1.0, aS * uPx / gl_Position.w); vC = aC; }`;
export const PFS = `#version 300 es
precision highp float;
in vec4 vC; out vec4 frag;
void main(){ float a = smoothstep(0.5, 0.05, length(gl_PointCoord - 0.5)) * vC.a; frag = vec4(vC.rgb * a, a); }`;
