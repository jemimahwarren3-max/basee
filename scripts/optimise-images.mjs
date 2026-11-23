// Usage: npm run optimise-images -- <file-or-dir> <outDir> [widths=480,960,1600]
// Writes <name>-<width>.webp for each width no larger than the source, plus <name>.webp at full size.
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';
import sharp from 'sharp';

const [input, outDir, widthsArg = '480,960,1600'] = process.argv.slice(2);

if (!input || !outDir) {
  console.error('Usage: npm run optimise-images -- <file-or-dir> <outDir> [widths=480,960,1600]');
  process.exit(1);
}
if (!existsSync(input)) {
  console.error(`Input not found: ${input}`);
  process.exit(1);
}

const widths = widthsArg
  .split(',')
  .map(Number)
  .filter((w) => w > 0);
const IMAGE = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff']);
const sources = statSync(input).isDirectory()
  ? readdirSync(input)
      .map((f) => join(input, f))
      .filter((f) => IMAGE.has(extname(f).toLowerCase()))
  : [input];

const out = resolve(outDir);
mkdirSync(out, { recursive: true });

let written = 0;
for (const file of sources) {
  const name = basename(file, extname(file));
  const image = sharp(file, { failOn: 'error' }).rotate();
  const { width } = await image.metadata();
  const targets = [...widths.filter((w) => w < width), width];

  for (const w of targets) {
    const suffix = w === width ? '' : `-${w}`;
    await image
      .clone()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(join(out, `${name}${suffix}.webp`));
    written++;
  }
  console.log(`${basename(file)}: ${width}px source → ${targets.length} files`);
}

console.log(`Wrote ${written} WebP files to ${out}`);
