// Confirms the bundled FFmpeg and ffprobe binaries run on this machine.
import { execFileSync } from 'node:child_process';
import ffmpegPath from 'ffmpeg-static';
import ffprobePath from 'ffprobe-static';

const tools = [
  ['ffmpeg', ffmpegPath],
  ['ffprobe', ffprobePath.path],
];

let failed = false;
for (const [name, path] of tools) {
  try {
    const out = execFileSync(path, ['-version'], { encoding: 'utf8' }).split('\n')[0];
    console.log(`ok   ${name}: ${out}`);
  } catch (err) {
    failed = true;
    console.error(`FAIL ${name} at ${path}: ${err.message}`);
  }
}

if (failed) {
  console.error('Run npm install again to re-download the binaries.');
  process.exit(1);
}
