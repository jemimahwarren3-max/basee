// Generates a favicon and brand variants from one source.
//
// Usage: npm run brand-kit -- <source> [out=public]
//   source: a local image file (PNG, JPG, WebP, SVG) OR "auto" to render
//           initials from site.config.name on a brand-coloured square.
//   out:    where to write files (default: public)
//
// Outputs:
//   <out>/favicon.svg       initials or the source SVG passed through
//   <out>/favicon.ico       32x32 (browsers that still want it)
//   <out>/favicon-192.png   192x192 (web app manifest, home-screen)
//   <out>/apple-touch-icon.png  180x180 (iOS)
//   <out>/og-brand.png      a 1200x630 mark on brand bg (for OG fallback)
//
// After running, Site.astro picks these up automatically.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import sharp from 'sharp';

const [sourceArg, outArg = 'public'] = process.argv.slice(2);
if (!sourceArg) {
  console.error('Usage: npm run brand-kit -- <source|auto> [out=public]');
  process.exit(1);
}

// Load brand name and colours from site.config via a regex scrape — we can't
// import TypeScript from a plain .mjs without a build step, but the fields are
// simple strings.
const cfg = readFileSync(resolve('src/site.config.ts'), 'utf8');
const get = (k) => (cfg.match(new RegExp(`${k}:\\s*['"]([^'"]+)['"]`)) ?? [, ''])[1];
const name = get('name') || 'Site';
const familyId = get('family') || 'swiss-minimalism';

// Pull foreground + background from the matching family file for the initials card.
let bg = '#111';
let fg = '#fff';
try {
  const family = readFileSync(resolve(`src/design-families/${familyId}.ts`), 'utf8');
  bg = (family.match(/foreground:\s*'([^']+)'/) ?? [, bg])[1];
  fg = (family.match(/background:\s*'([^']+)'/) ?? [, fg])[1];
} catch {}

const initials = name
  .split(/\s+/)
  .filter(Boolean)
  .map((w) => w[0].toUpperCase())
  .slice(0, 2)
  .join('');

const out = resolve(outArg);
mkdirSync(out, { recursive: true });

function initialsSvg(size) {
  const fontSize = size * 0.5;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" rx="${size * 0.18}" fill="${bg}"/>
  <text x="50%" y="50%" font-family="system-ui, sans-serif" font-size="${fontSize}" font-weight="700" fill="${fg}" text-anchor="middle" dominant-baseline="central">${initials}</text>
</svg>`;
}

async function rasterise(svg, size) {
  return sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
}

let sourceBuffer = null;
let sourceIsSvg = false;
if (sourceArg !== 'auto') {
  if (!existsSync(sourceArg)) {
    console.error(`Source not found: ${sourceArg}`);
    process.exit(1);
  }
  sourceBuffer = readFileSync(sourceArg);
  sourceIsSvg = extname(sourceArg).toLowerCase() === '.svg';
}

// favicon.svg — the source SVG if provided, else the initials card.
if (sourceIsSvg) {
  writeFileSync(`${out}/favicon.svg`, sourceBuffer);
} else {
  writeFileSync(`${out}/favicon.svg`, initialsSvg(64));
}

// PNG sizes.
async function makePng(size, filename) {
  const svg = initialsSvg(size);
  const buf =
    sourceBuffer && !sourceIsSvg
      ? await sharp(sourceBuffer)
          .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png()
          .toBuffer()
      : await rasterise(svg, size);
  writeFileSync(`${out}/${filename}`, buf);
}

await makePng(32, 'favicon.ico'); // served as png — browsers accept
await makePng(192, 'favicon-192.png');
await makePng(180, 'apple-touch-icon.png');

// OG fallback — the mark centred on the brand background at 1200x630.
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="100%" height="100%" fill="${bg}"/>
  <text x="50%" y="50%" font-family="system-ui, sans-serif" font-size="240" font-weight="700" fill="${fg}" text-anchor="middle" dominant-baseline="central">${initials}</text>
</svg>`;
writeFileSync(`${out}/og-brand.png`, await sharp(Buffer.from(ogSvg)).png().toBuffer());

console.log(`Wrote brand kit to ${out}:`);
console.log('  favicon.svg, favicon.ico, favicon-192.png, apple-touch-icon.png, og-brand.png');
console.log(
  `Using brand name "${name}" (initials "${initials}") with family "${familyId}" colours (bg ${bg}, fg ${fg}).`,
);
