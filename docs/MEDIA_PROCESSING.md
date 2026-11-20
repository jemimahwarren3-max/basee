# Media processing (Phase 5)

Node-side FFmpeg/Sharp pipeline under `automation/video-processing/`, `automation/image-processing/`,
and `scripts/`. Like asset research, these never run in the browser bundle.

FFmpeg and ffprobe are bundled via `ffmpeg-static`/`ffprobe-static` (npm packages, not a system
install) — this was the explicit choice for this engine: no admin rights needed, works the same
on every machine that clones the repo.

## Video

```
npm run process-video -- probe --input source.mp4
npm run process-video -- trim --input source.mp4 --output clip.mp4 --start 2 --duration 5
npm run process-video -- transcode --input clip.mp4 --output clip.webm --width 1280 --fps 30
npm run process-video -- transcode --input clip.mp4 --output bg.mp4 --width 1600 --muted true
npm run process-video -- poster --input clip.mp4 --output poster.jpg --at 1 --width 1600
```

`transcode` picks the codec from the output extension (`.webm` → VP9, anything else → H.264 +
faststart) and is the entry point for ordinary background/hero video. Don't reach for a frame
sequence unless the destination genuinely scrubs video on scroll.

## Scroll-controlled video → WebP frame sequence

```
npm run extract-frames -- --input source.mp4 --output-dir media-library/<project>/sequences/<scene> --fps 24 --width 1600
```

Matches the master spec's exact recipe (`fps=24, scale=1600:-1 lanczos, libwebp q=78 level=6`,
`frame-%04d.webp`). This is specifically for the ScrollSequence/canvas technique — don't
auto-extract every video into hundreds of frames "just in case."

## Images

```
npm run optimise-images -- --input photo.jpg --output photo.webp --width 1600
npm run optimise-images -- --input photo.jpg --output-dir media-library/<project>/images --base-name hero --widths 400,800,1200,1600
```

Format is chosen by the output extension (`.webp`/`.avif`/`.jpg`/`.png`), each with a sensible
default quality. The `--output-dir` form generates a full responsive set for an `<img srcset>`.

## Verified

Every command above (`probe`, `trim`, `transcode` to both MP4 and WebM, `poster`,
`extract-frames`, both `optimise-images` modes) was run end-to-end against a synthetic
`ffmpeg testsrc` clip generated locally (no external download) and the outputs were re-probed to
confirm duration, resolution, fps, codec, and mute actually changed as requested — not just that
the command exited 0.
