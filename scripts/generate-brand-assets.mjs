// Generates every brand asset the page uses from the official logo file.
//
//   npm run brand
//
// To replace the logo: overwrite the file named in SOURCE and re-run. If the new
// artwork has a different layout, update the EMBLEM, WORDMARK and X_START values.
//
// The official logo sits on white and its wordmark is navy, which cannot be read on
// the page's black background. So this script removes the white and turns the wordmark
// letters white. The shapes come from the logo itself; nothing is redrawn.

import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SOURCE = 'AURVIX AI Solutions Logo.png';
const SRC_OUT = 'src/assets/brand';
const PUBLIC_OUT = 'public';
const MATTE = '#0a0b0d';

// Pixel regions in the 1254x1254 source.
const EMBLEM = { left: 190, top: 190, width: 890, height: 625 };
const WORDMARK = { left: 30, top: 825, width: 1175, height: 180 };
const X_START = 970; // Source x where the blue "X" starts; letters before it become white.

const BG_THRESHOLD = 245; // A pixel this close to white may be background.
const MIN_BG_AREA = 150; // Smaller white patches are highlights inside the artwork.
const EDGE_BAND = 5; // Only pixels this near the background may turn translucent.

const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const px = (x, y) => (y * W + x) * 4;
const minChannel = (x, y) => {
  const i = px(x, y);
  return Math.min(data[i], data[i + 1], data[i + 2]);
};

/** Marks real background: near-white regions large enough not to be a highlight. */
function findBackground() {
  const seen = new Uint8Array(W * H);
  const background = new Uint8Array(W * H);
  for (let start = 0; start < W * H; start++) {
    if (seen[start] || minChannel(start % W, Math.floor(start / W)) < BG_THRESHOLD) continue;
    const region = [];
    const stack = [start];
    seen[start] = 1;
    while (stack.length) {
      const p = stack.pop();
      region.push(p);
      const x = p % W;
      const y = Math.floor(p / W);
      for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const n = ny * W + nx;
        if (!seen[n] && minChannel(nx, ny) >= BG_THRESHOLD) {
          seen[n] = 1;
          stack.push(n);
        }
      }
    }
    if (region.length >= MIN_BG_AREA) for (const p of region) background[p] = 1;
  }
  return background;
}

/** Grows the background mask so anti-aliased edge pixels are included. */
function dilate(mask, radius) {
  let current = mask;
  for (let r = 0; r < radius; r++) {
    const next = current.slice();
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (!current[y * W + x]) continue;
        if (x > 0) next[y * W + x - 1] = 1;
        if (x < W - 1) next[y * W + x + 1] = 1;
        if (y > 0) next[(y - 1) * W + x] = 1;
        if (y < H - 1) next[(y + 1) * W + x] = 1;
      }
    }
    current = next;
  }
  return current;
}

const edgeBand = dilate(findBackground(), EDGE_BAND);

/** Removes white: returns the colour and alpha that give the same pixel over white. */
function unmixWhite(x, y) {
  const i = px(x, y);
  if (!edgeBand[y * W + x]) return [data[i], data[i + 1], data[i + 2], 255];
  const alpha = 1 - minChannel(x, y) / 255;
  if (alpha <= 0) return [0, 0, 0, 0];
  const channel = (c) => Math.max(0, Math.min(255, Math.round((c - (1 - alpha) * 255) / alpha)));
  return [channel(data[i]), channel(data[i + 1]), channel(data[i + 2]), Math.round(alpha * 255)];
}

function extract(region, pixelAt) {
  const out = Buffer.alloc(region.width * region.height * 4);
  for (let y = 0; y < region.height; y++) {
    for (let x = 0; x < region.width; x++) {
      out.set(pixelAt(region.left + x, region.top + y), (y * region.width + x) * 4);
    }
  }
  return sharp(out, { raw: { width: region.width, height: region.height, channels: 4 } }).png().toBuffer();
}

/** The letters become solid white; navy maps to full opacity, white to none. */
function wordmarkPixel(x, y) {
  if (x >= X_START) return unmixWhite(x, y);
  const NAVY_MIN = 70;
  const alpha = Math.max(0, Math.min(1, (255 - minChannel(x, y)) / (255 - NAVY_MIN)));
  return [255, 255, 255, Math.round(alpha * 255)];
}

const trim = (buffer) => sharp(buffer).trim({ threshold: 8 }).png().toBuffer();
const emblem = await trim(await extract(EMBLEM, unmixWhite));
const wordmark = await trim(await extract(WORDMARK, wordmarkPixel));

await mkdir(SRC_OUT, { recursive: true });
await mkdir(PUBLIC_OUT, { recursive: true });

// Page images, sized for 3x phone screens.
await sharp(emblem).resize({ width: 312 }).webp({ quality: 84, alphaQuality: 92 }).toFile(`${SRC_OUT}/aurvix-emblem.webp`);
await sharp(wordmark).resize({ width: 504 }).webp({ quality: 88, alphaQuality: 92 }).toFile(`${SRC_OUT}/aurvix-wordmark.webp`);

/** The emblem centred on a dark tile. */
async function tile(size, emblemWidth, radius) {
  const shape = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${MATTE}"/></svg>`,
  );
  const mark = await sharp(emblem).resize({ width: emblemWidth }).toBuffer();
  return sharp(shape).composite([{ input: mark }]).png({ compressionLevel: 9 });
}

await (await tile(48, 40, 10)).toFile(`${PUBLIC_OUT}/favicon-48.png`);
await (await tile(32, 27, 7)).toFile(`${PUBLIC_OUT}/favicon-32.png`);
await (await tile(180, 132, 0)).toFile(`${PUBLIC_OUT}/apple-touch-icon.png`);

// Preview image shown when the link is shared, for example on WhatsApp or LinkedIn.
const background = Buffer.from(`<svg width="1200" height="630">
  <defs><radialGradient id="g" cx="50%" cy="26%" r="60%">
    <stop offset="0%" stop-color="#1668ff" stop-opacity=".22"/>
    <stop offset="100%" stop-color="#1668ff" stop-opacity="0"/>
  </radialGradient></defs>
  <rect width="1200" height="630" fill="${MATTE}"/>
  <rect width="1200" height="630" fill="url(#g)"/>
</svg>`);
const ogEmblem = await sharp(emblem).resize({ width: 400 }).toBuffer();
const ogWordmark = await sharp(wordmark).resize({ width: 500 }).toBuffer();
const ogEmblemHeight = (await sharp(ogEmblem).metadata()).height;
await sharp(background)
  .composite([
    { input: ogEmblem, left: 400, top: 112 },
    { input: ogWordmark, left: 350, top: 112 + ogEmblemHeight + 46 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(`${PUBLIC_OUT}/og-image.png`);

console.log('Brand assets written to', SRC_OUT, 'and', PUBLIC_OUT);
