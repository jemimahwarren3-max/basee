// Usage: npm run extract-frames -- <input.mp4> <outDir> [fps=30] [width=1920]
// Writes outDir/frame_0001.webp, frame_0002.webp, ... for ScrollSequence.
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import ffmpegPath from 'ffmpeg-static';

const [input, outDir, fps = '30', width = '1920'] = process.argv.slice(2);

if (!input || !outDir) {
  console.error('Usage: npm run extract-frames -- <input.mp4> <outDir> [fps=30] [width=1920]');
  process.exit(1);
}
if (!existsSync(input)) {
  console.error(`Input not found: ${input}`);
  process.exit(1);
}
if (!ffmpegPath) {
  console.error('ffmpeg-static binary not found. Run npm install.');
  process.exit(1);
}

const out = resolve(outDir);
mkdirSync(out, { recursive: true });

execFileSync(
  ffmpegPath,
  [
    '-y',
    '-i',
    resolve(input),
    '-vf',
    `fps=${fps},scale=${width}:-2`,
    '-c:v',
    'libwebp',
    '-q:v',
    '80',
    join(out, 'frame_%04d.webp'),
  ],
  { stdio: 'inherit' },
);

console.log(`Frames written to ${out}`);
