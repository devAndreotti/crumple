#!/usr/bin/env python3
# Regenerate every image under assets/ from scratch.
#
#   python3 tools/make-assets.py
#
# Deterministic: every asset draws from its own random.Random(seed), and all
# noise comes from Random.randbytes (never Image.effect_noise, which uses the
# C library RNG). Pillow is the only dependency; numpy is not used.
import math
import os
import random

from PIL import Image, ImageChops, ImageDraw, ImageStat
from PIL.ImageFilter import GaussianBlur

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "assets")
WEBP_METHOD = 6
TAU = 2.0 * math.pi
RESAMPLE = Image.Resampling

SEED_COFFEE = 101
SEED_WATER = 202
SEED_PRINTS = 303
SEED_GRAIN = 404
SEED_SUNSET = 505
SEED_SEA = 606
SEED_CITY = 707


# ---------------------------------------------------------------------------
# Generic helpers
# ---------------------------------------------------------------------------

def clamp8(v):
    return max(0, min(255, int(round(v))))


def save_webp(img, relpath, quality=None, alpha_quality=100, lossless=False):
    """Write a WebP. alpha_quality only matters for RGBA textures, where the
    alpha channel is the bulk of the size; lowering it trims bytes cheaply.
    lossless keeps exact values (used for the grain, whose channels must stay equal)."""
    path = os.path.join(ASSETS, relpath)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if lossless:
        img.save(path, "WEBP", lossless=True, method=WEBP_METHOD)
    else:
        img.save(path, "WEBP", quality=quality, alpha_quality=alpha_quality, method=WEBP_METHOD)
    print("wrote %-22s %6d bytes  %s" % (relpath, os.path.getsize(path), img.size))


def noise_L(w, h, rng):
    """Uniform white noise in mode L, drawn from a seeded RNG."""
    return Image.frombytes("L", (w, h), rng.randbytes(w * h))


def standardize(img, mean, std):
    """Remap an L image so it has the given mean and standard deviation."""
    st = ImageStat.Stat(img)
    cur_mean = st.mean[0]
    k = std / (st.stddev[0] or 1.0)
    return img.point([clamp8(mean + (v - cur_mean) * k) for v in range(256)])


def periodic_upscale(tile, size, radius=0.0):
    """Upscale a noise tile to `size` so the result wraps seamlessly.

    The tile is repeated 3x3, resized as one periodic canvas, optionally
    blurred there, and the centre copy is cropped out. Because the canvas is
    periodic with period `size`, every pixel of the crop has its real
    neighbours on all sides, so the output tiles without a seam.
    The tile size must divide `size` by an integer factor.
    """
    tw, th = tile.size
    w, h = size
    big = Image.new("L", (3 * tw, 3 * th))
    for i in range(3):
        for j in range(3):
            big.paste(tile, (i * tw, j * th))
    big = big.resize((3 * w, 3 * h), RESAMPLE.BILINEAR)
    if radius:
        big = big.filter(GaussianBlur(radius))
    return big.crop((w, h, 2 * w, 2 * h))


def seam_ratio(img):
    """Seam check: blurred horizontal and vertical differences across the
    tile seam divided by the average difference elsewhere. About 1.0 means
    no visible seam when the image is tiled 2x2."""
    w, h = img.size
    t = Image.new(img.mode, (2 * w, 2 * h))
    for i in range(2):
        for j in range(2):
            t.paste(img, (i * w, j * h))
    t = t.filter(GaussianBlur(2))
    dx = ImageChops.difference(t.crop((1, 0, 2 * w, 2 * h)), t.crop((0, 0, 2 * w - 1, 2 * h)))
    dy = ImageChops.difference(t.crop((0, 1, 2 * w, 2 * h)), t.crop((0, 0, 2 * w, 2 * h - 1)))
    seam_x = ImageStat.Stat(dx.crop((w - 1, 0, w, 2 * h))).mean[0]
    seam_y = ImageStat.Stat(dy.crop((0, h - 1, 2 * w, h))).mean[0]
    all_x = ImageStat.Stat(dx).mean[0]
    all_y = ImageStat.Stat(dy).mean[0]
    return seam_x / max(all_x, 1e-6), seam_y / max(all_y, 1e-6)


def solid(size, color, alpha):
    """RGBA layer of one colour whose alpha channel is the given L mask."""
    layer = Image.new("RGBA", size, tuple(color) + (0,))
    layer.putalpha(alpha)
    return layer


def lerp_stops(stops, t):
    if t <= stops[0][0]:
        return stops[0][1]
    for (t0, c0), (t1, c1) in zip(stops, stops[1:]):
        if t <= t1:
            k = (t - t0) / (t1 - t0) if t1 > t0 else 0.0
            return tuple(clamp8(a + (b - a) * k) for a, b in zip(c0, c1))
    return stops[-1][1]


def vgrad(w, h, stops):
    """Vertical RGB gradient. stops = [(position 0..1, (r, g, b)), ...]."""
    img = Image.new("RGB", (w, h))
    d = ImageDraw.Draw(img)
    for y in range(h):
        d.line([(0, y), (w, y)], fill=lerp_stops(stops, y / max(1, h - 1)))
    return img


def paint(base, mask, color):
    """Replace base with a flat colour where the L mask is bright."""
    flat = Image.new("RGB", base.size, tuple(color))
    return Image.composite(flat, base, mask)


def glow(base, mask, color, strength=1.0):
    """Screen a coloured light given by a (blurred) L mask onto base."""
    lit = mask.point([clamp8(v * strength) for v in range(256)])
    tint = Image.composite(
        Image.new("RGB", base.size, tuple(color)),
        Image.new("RGB", base.size, (0, 0, 0)),
        lit,
    )
    return ImageChops.screen(base, tint)


def film(img, rng, grain_std, vignette):
    """Photographic finish: monochrome film grain plus a soft vignette."""
    w, h = img.size
    grain = noise_L(w, h, rng).point([clamp8(128 + (v - 128) * grain_std / 73.6) for v in range(256)])
    grain = grain.filter(GaussianBlur(0.35))
    grain_rgb = Image.merge("RGB", (grain, grain, grain))
    img = ImageChops.add(img, grain_rgb, 1.0, -128)  # add grain centred on 128
    radial = Image.radial_gradient("L").resize((w, h), RESAMPLE.BILINEAR)
    vig = radial.point([clamp8(255 * (1.0 - vignette * (v / 255.0) ** 2)) for v in range(256)])
    return ImageChops.multiply(img, Image.merge("RGB", (vig, vig, vig)))


def ridge_layer(img, rng, base, amp, color):
    """Dark hill silhouette: a sum of random sines along the horizon."""
    w, h = img.size
    waves = [(rng.choice([1, 2, 3, 4, 6]), rng.uniform(0.4, 1.0), rng.uniform(0, TAU)) for _ in range(4)]
    pts = []
    for x in range(0, w + 1, 4):
        y = base
        for f, a, ph in waves:
            y += amp * a / f ** 0.7 * math.sin(TAU * f * x / w + ph)
        pts.append((x, y))
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).polygon(pts + [(w, h), (0, h)], fill=255)
    return paint(img, mask.filter(GaussianBlur(0.8)), color)


# ---------------------------------------------------------------------------
# 1. Coffee rings
# ---------------------------------------------------------------------------

def coffee_ring(size, cx, cy, radius, rng):
    """Return (rim_alpha, wash_alpha) L masks for one mug ring."""
    n = 240
    harm = [(k, rng.uniform(0.3, 1.0) * 0.045 / math.sqrt(k), rng.uniform(0, TAU)) for k in range(2, 7)]
    raw = [rng.gauss(0, 1) for _ in range(n)]
    jit = [(raw[i - 1] + 2 * raw[i] + raw[(i + 1) % n]) / 4 * 0.010 for i in range(n)]
    pts = []
    for i in range(n):
        t = TAU * i / n
        r = radius * (1 + sum(a * math.sin(k * t + p) for k, a, p in harm) + jit[i])
        pts.append((cx + r * math.cos(t), cy + r * math.sin(t)))

    rim = Image.new("L", (size, size), 0)
    rd = ImageDraw.Draw(rim)
    ph = rng.uniform(0, TAU)
    for i in range(n):
        p, q = pts[i], pts[(i + 1) % n]
        t = TAU * i / n
        w = 1.4 + 1.3 * (0.5 + 0.5 * math.sin(3 * t + ph)) + rng.uniform(0, 0.7)
        # Varying strength makes the dried rim look broken in places.
        strength = min(1.0, max(0.0, 0.8 + 0.3 * math.sin(5 * t + 2 * ph) + rng.gauss(0, 0.1)))
        val = int(255 * strength)
        rd.line([p, q], fill=val, width=max(1, int(round(w))))
        rd.ellipse([p[0] - w / 2, p[1] - w / 2, p[0] + w / 2, p[1] + w / 2], fill=val)

    # Two small drips running outward from the rim, tapering as they go.
    for _ in range(2):
        i = rng.randrange(n)
        px, py = pts[i]
        th = TAU * i / n
        length = int(rng.uniform(14, 30))
        for s in range(length):
            r = 1.3 * (1 - s / length) + 0.35
            x, y = px + math.cos(th) * s, py + math.sin(th) * s
            rd.ellipse([x - r, y - r, x + r, y + r], fill=200)
    # A few specks just outside the rim.
    for _ in range(8):
        th = rng.uniform(0, TAU)
        d = radius * rng.uniform(1.02, 1.14)
        x, y = cx + math.cos(th) * d, cy + math.sin(th) * d
        r = rng.uniform(0.8, 1.6)
        rd.ellipse([x - r, y - r, x + r, y + r], fill=rng.randint(120, 230))

    rim = rim.filter(GaussianBlur(0.6))
    rim_alpha = rim.point([clamp8(v * 0.80) for v in range(256)])

    inner = Image.new("L", (size, size), 0)
    ImageDraw.Draw(inner).polygon([(cx + (x - cx) * 0.92, cy + (y - cy) * 0.92) for x, y in pts], fill=255)
    inner = inner.filter(GaussianBlur(9))
    mottle = standardize(noise_L(size, size, rng).filter(GaussianBlur(4)), 190, 45)
    edge = rim.filter(GaussianBlur(7))  # faint extra tone just inside the rim
    wash = ImageChops.add(ImageChops.multiply(inner, mottle), edge)
    wash_alpha = wash.point([clamp8(v * 0.20) for v in range(256)])
    return rim_alpha, wash_alpha


def make_coffee():
    rng = random.Random(SEED_COFFEE)
    s = 512
    rim_color = (95, 60, 25)
    wash_color = (150, 105, 62)
    rings = [(0.42 * s, 0.45 * s, 0.25 * s), (0.59 * s, 0.56 * s, 0.23 * s)]
    parts = [coffee_ring(s, cx, cy, r, rng) for cx, cy, r in rings]
    out = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    # Each ring is its own layer, so the overlap comes out darker as it would on paper.
    for _, wash in parts:
        out = Image.alpha_composite(out, solid((s, s), wash_color, wash))
    for rim, _ in parts:
        out = Image.alpha_composite(out, solid((s, s), rim_color, rim))
    save_webp(out, "textures/coffee.webp", quality=80, alpha_quality=60)


# ---------------------------------------------------------------------------
# 2. Dried water stain
# ---------------------------------------------------------------------------

def make_water():
    rng = random.Random(SEED_WATER)
    s = 512
    field = Image.new("L", (s, s), 0)
    fd = ImageDraw.Draw(field)
    for _ in range(7):
        ex = s / 2 + rng.gauss(0, 46)
        ey = s / 2 + rng.gauss(0, 46)
        rx = rng.uniform(60, 115)
        ry = rng.uniform(50, 95)
        fd.ellipse([ex - rx, ey - ry, ex + rx, ey + ry], fill=255)
    field = field.filter(GaussianBlur(16))
    # Multiplying by a wobble field can only shrink the blob, so the outline
    # becomes irregular without spilling outside the soft union of ellipses.
    warp = standardize(noise_L(s, s, rng).filter(GaussianBlur(22)), 150, 40)
    warp_lut = [clamp8(255 * (0.6 + 0.4 * v / 255.0)) for v in range(256)]
    field = ImageChops.multiply(field, warp.point(warp_lut))
    field = field.filter(GaussianBlur(3))

    # Faint beige interior, mottled, with a clean edge to the transparency.
    mottle = standardize(noise_L(s, s, rng).filter(GaussianBlur(5)), 200, 40)
    interior = field.point([0 if v < 6 else clamp8(v * 0.27) for v in range(256)])
    interior = ImageChops.multiply(interior, mottle)

    # Tide line: a thin contour of the field near its edge, broken up by noise.
    band = field.point([255 if 120 <= v <= 136 else 0 for v in range(256)])
    band = band.filter(GaussianBlur(0.8))
    broken = standardize(noise_L(s, s, rng).filter(GaussianBlur(2)), 200, 45)
    band = ImageChops.multiply(band, broken)
    tide = band.point([clamp8(v * 0.62) for v in range(256)])

    out = Image.alpha_composite(
        solid((s, s), (214, 190, 140), interior),
        solid((s, s), (116, 78, 38), tide),
    )
    save_webp(out, "textures/water.webp", quality=80, alpha_quality=75)


# ---------------------------------------------------------------------------
# 3. Fingerprint smudges
# ---------------------------------------------------------------------------

def make_prints():
    rng = random.Random(SEED_PRINTS)
    w = h = 256
    buf = bytearray(w * h)
    period = 3.6  # ridge spacing in pixels
    # cx, cy, half-width a, half-height b, rotation, core offset, arch strength
    specs = [
        (96, 118, 66, 90, 0.25, -1.05, 0.45),
        (172, 150, 48, 68, -0.45, -0.95, -0.35),
    ]
    for cx, cy, a, b, ang, core, arch in specs:
        ca, sa = math.cos(ang), math.sin(ang)
        n = b / period  # ridge repeats per normalised unit along the half-height
        reach = int(max(a, b)) + 3
        for y in range(max(0, int(cy) - reach), min(h, int(cy) + reach)):
            dy = y - cy
            for x in range(max(0, int(cx) - reach), min(w, int(cx) + reach)):
                dx = x - cx
                u = (dx * ca + dy * sa) / a
                v = (-dx * sa + dy * ca) / b
                r2 = u * u + v * v
                if r2 >= 1.0:
                    continue
                env = (1.0 - r2) ** 0.6 * 0.75          # fades to 0 at the edge; peaks near 55% alpha
                rho = math.sqrt(0.8 * u * u + (v - core) ** 2)  # far-off core: mostly arches
                s = math.cos(TAU * n * (rho + arch * u * u))    # arched ridges
                ridge = s ** 3 if s > 0 else 0.0               # dark ridge lines
                val = env * ridge * (0.75 + 0.25 * rng.random()) * 255
                idx = y * w + x
                if val > buf[idx]:
                    buf[idx] = int(val)

    alpha = Image.frombytes("L", (w, h), bytes(buf)).filter(GaussianBlur(0.45))
    save_webp(solid((w, h), (70, 58, 48), alpha), "textures/prints.webp", quality=80, alpha_quality=75)


# ---------------------------------------------------------------------------
# 4. Paper grain (seamless tile)
# ---------------------------------------------------------------------------

def make_grain():
    rng = random.Random(SEED_GRAIN)
    t = 256
    size = (t, t)
    fine = periodic_upscale(noise_L(t, t, rng), size, radius=0.6)
    mid = periodic_upscale(noise_L(48, 48, rng), size, radius=2.0)
    # Fibres: short strokes at random angles (no preferred axis, so the tile never reads as woven cloth).
    # Each stroke is drawn at the 9 wrap-around offsets, which keeps the tile seamless.
    fib = Image.new("L", size, 128)
    d = ImageDraw.Draw(fib)
    for _ in range(520):
        x, y = rng.random() * t, rng.random() * t
        ang = rng.random() * math.pi
        ln = 5 + rng.random() * 14
        dx, dy = math.cos(ang) * ln / 2, math.sin(ang) * ln / 2
        v = 128 + int((rng.random() - 0.5) * 120)
        for ox in (-t, 0, t):
            for oy in (-t, 0, t):
                d.line([(x - dx + ox, y - dy + oy), (x + dx + ox, y + dy + oy)], fill=v, width=1)
    fib = fib.filter(GaussianBlur(0.5))
    mix = Image.blend(fine, mid, 0.35)
    # no large-scale mottle: it would repeat visibly, since the tile is repeated several times per sheet
    mix = Image.blend(mix, fib, 0.45)
    mix = standardize(mix, 240, 4)
    img = Image.merge("RGB", (mix, mix, mix))
    sx, sy = seam_ratio(mix)
    print("grain: mean %.2f std %.2f  seam ratio x=%.3f y=%.3f"
          % (ImageStat.Stat(mix).mean[0], ImageStat.Stat(mix).stddev[0], sx, sy))
    save_webp(img, "textures/grain.webp", lossless=True)


# ---------------------------------------------------------------------------
# 5. Photos for the frame demo (no text, logos, people or real places)
# ---------------------------------------------------------------------------

def make_sunset():
    rng = random.Random(SEED_SUNSET)
    w = h = 640
    img = vgrad(w, h, [(0.0, (30, 34, 70)), (0.28, (88, 64, 110)), (0.52, (206, 110, 96)),
                       (0.66, (255, 176, 112)), (1.0, (120, 70, 60))])
    sx, sy = int(w * 0.64), int(h * 0.60)
    horizon = int(h * 0.66)

    halo = Image.new("L", (w, h), 0)
    ImageDraw.Draw(halo).ellipse([sx - 200, sy - 200, sx + 200, sy + 200], fill=120)
    img = glow(img, halo.filter(GaussianBlur(80)), (255, 170, 100))
    core = Image.new("L", (w, h), 0)
    ImageDraw.Draw(core).ellipse([sx - 70, sy - 70, sx + 70, sy + 70], fill=160)
    img = glow(img, core.filter(GaussianBlur(28)), (255, 214, 160))
    disc = Image.new("L", (w, h), 0)
    ImageDraw.Draw(disc).ellipse([sx - 40, sy - 40, sx + 40, sy + 40], fill=255)
    img = paint(img, disc.filter(GaussianBlur(1.2)), (255, 242, 214))

    clouds = Image.new("L", (w, h), 0)
    cd = ImageDraw.Draw(clouds)
    for _ in range(9):
        x = rng.uniform(-80, w - 80)
        y = rng.uniform(0.18, 0.5) * h
        cw = rng.uniform(140, 320)
        ch = rng.uniform(5, 14)
        cd.ellipse([x, y, x + cw, y + ch], fill=rng.randint(50, 100))
    img = glow(img, clouds.filter(GaussianBlur(9)), (255, 196, 150))

    img = ridge_layer(img, rng, base=0.70 * h, amp=24, color=(132, 82, 104))
    img = ridge_layer(img, rng, base=0.77 * h, amp=20, color=(74, 46, 68))
    img = ridge_layer(img, rng, base=0.87 * h, amp=16, color=(34, 24, 40))
    return film(img, rng, grain_std=3.0, vignette=0.25)


def make_sea():
    rng = random.Random(SEED_SEA)
    w = h = 640
    horizon = int(h * 0.52)
    img = Image.new("RGB", (w, h))
    sky = vgrad(w, horizon, [(0, (118, 140, 192)), (0.6, (214, 190, 196)), (1.0, (252, 222, 198))])
    img.paste(sky, (0, 0))
    sea = vgrad(w, h - horizon, [(0, (176, 140, 140)), (0.12, (132, 118, 140)),
                                 (0.5, (64, 74, 104)), (1.0, (22, 36, 58))])
    # Horizontal ripples: noise stretched wide, then used as a brightness offset.
    ripples = noise_L(40, 60, rng).resize((w, h - horizon), RESAMPLE.BICUBIC).filter(GaussianBlur(1.0))
    ripples = standardize(ripples, 128, 7)
    sea = ImageChops.add(sea, Image.merge("RGB", (ripples, ripples, ripples)), 1.0, -128)
    img.paste(sea, (0, horizon))

    sx, sy = int(w * 0.58), horizon - 26
    halo = Image.new("L", (w, h), 0)
    ImageDraw.Draw(halo).ellipse([sx - 150, sy - 150, sx + 150, sy + 150], fill=110)
    img = glow(img, halo.filter(GaussianBlur(60)), (255, 206, 150))
    disc = Image.new("L", (w, h), 0)
    ImageDraw.Draw(disc).ellipse([sx - 24, sy - 24, sx + 24, sy + 24], fill=255)
    img = paint(img, disc.filter(GaussianBlur(1.0)), (255, 244, 220))

    # Sun reflection: short horizontal streaks that spread and thin with distance.
    refl = Image.new("L", (w, h), 0)
    rd = ImageDraw.Draw(refl)
    for _ in range(90):
        t = rng.random() ** 1.4
        y = horizon + 3 + t * (h - horizon - 10)
        spread = 10 + 90 * t
        xc = sx + rng.gauss(0, spread * 0.35)
        ww = spread * rng.uniform(0.25, 0.7) + 4
        hh = 1.2 + 2.6 * t
        val = int(255 * (1 - 0.6 * t) * rng.uniform(0.5, 1.0))
        rd.ellipse([xc - ww / 2, y - hh / 2, xc + ww / 2, y + hh / 2], fill=val)
    img = glow(img, refl.filter(GaussianBlur(1.2)), (255, 220, 170))
    return film(img, rng, grain_std=2.5, vignette=0.22)


def make_city():
    rng = random.Random(SEED_CITY)
    w = h = 640
    img = vgrad(w, h, [(0, (4, 8, 24)), (0.55, (16, 24, 50)), (0.9, (40, 50, 84)), (1.0, (36, 42, 68))])

    mx, my = int(w * 0.74), int(h * 0.22)
    halo = Image.new("L", (w, h), 0)
    ImageDraw.Draw(halo).ellipse([mx - 130, my - 130, mx + 130, my + 130], fill=100)
    img = glow(img, halo.filter(GaussianBlur(50)), (120, 134, 176))
    moon = Image.new("L", (w, h), 0)
    ImageDraw.Draw(moon).ellipse([mx - 34, my - 34, mx + 34, my + 34], fill=255)
    img = paint(img, moon.filter(GaussianBlur(1.0)), (236, 236, 226))

    # Two building layers: far (lighter, dimmer windows) and near (darker).
    draw = ImageDraw.Draw(img)
    winmask = Image.new("L", (w, h), 0)
    wd = ImageDraw.Draw(winmask)
    layers = [
        dict(color=(24, 32, 58), lit=0.06, wcol=(200, 150, 96), hmin=0.52, hmax=0.80, wmin=36, wmax=74, dim=0.6),
        dict(color=(9, 12, 26), lit=0.09, wcol=(255, 196, 112), hmin=0.62, hmax=0.92, wmin=28, wmax=60, dim=1.0),
    ]
    for layer in layers:
        x = -8
        while x < w:
            bw = rng.randint(layer["wmin"], layer["wmax"])
            top = int(h * rng.uniform(layer["hmin"], layer["hmax"]))
            draw.rectangle([x, top, x + bw, h], fill=layer["color"])
            wd.rectangle([x, top, x + bw, h], fill=0)
            if rng.random() < 0.2:  # occasional tower top
                tw = int(bw * 0.3)
                cxb = x + bw // 2
                draw.rectangle([cxb - tw // 2, top - 30, cxb + tw // 2, top], fill=layer["color"])
                wd.rectangle([cxb - tw // 2, top - 30, cxb + tw // 2, top], fill=0)
            for wy in range(top + 8, h - 8, 11):
                for wx in range(x + 6, x + bw - 7, 8):
                    if rng.random() < layer["lit"]:
                        k = rng.uniform(0.7, 1.0) * layer["dim"]
                        c = tuple(clamp8(v * k) for v in layer["wcol"])
                        draw.rectangle([wx, wy, wx + 3, wy + 5], fill=c)
                        wd.rectangle([wx, wy, wx + 3, wy + 5], fill=clamp8(255 * k))
            x += bw + rng.randint(-3, 6)

    img = glow(img, winmask.filter(GaussianBlur(4)), (255, 180, 96), strength=0.7)
    return film(img, rng, grain_std=3.0, vignette=0.3)


def make_photos():
    save_webp(make_sunset(), "photos/sunset.webp", quality=75)
    save_webp(make_sea(), "photos/sea.webp", quality=75)
    save_webp(make_city(), "photos/city.webp", quality=75)


def main():
    os.makedirs(ASSETS, exist_ok=True)
    make_coffee()
    make_water()
    make_prints()
    make_grain()
    make_photos()


if __name__ == "__main__":
    main()
