---
name: video-processing
description: Prepare downloaded footage/images with the FFmpeg/Sharp pipeline — trim, resize, transcode, generate posters, extract WebP scroll sequences, optimize images. Use after asset-research has downloaded source files.
---

# Video & image processing

Turn a raw downloaded asset into the exact deliverable a component needs — never hand a
10 MB untouched source clip to a `<video>` tag.

## What actually exists to work with

See [docs/MEDIA_PROCESSING.md](../../docs/MEDIA_PROCESSING.md) for full usage; this is all
real, end-to-end verified (not just type-checked) against a synthetic test clip.

- `npm run process-video -- probe --input <file>` — ffprobe metadata (duration, resolution, fps,
  codec, has-audio, size). Check before deciding how aggressively to resize/compress.
- `npm run process-video -- trim --input <file> --output <file> --start <s> --duration <s>`
- `npm run process-video -- transcode --input <file> --output <file> [--width N] [--fps N] [--crf N] [--muted true]`
  — `.mp4` output encodes H.264, `.webm` encodes VP9. This is the entry point for ordinary
  background/hero video.
- `npm run process-video -- poster --input <file> --output <file> [--at seconds] [--width N]`
- `npm run extract-frames -- --input <file> --output-dir <dir> [--fps N] [--width N]` — WebP
  frame sequence for `src/video/ScrollSequence`. **Only use this for genuine scroll-scrubbed
  video** — don't extract frames "just in case."
- `npm run optimise-images -- --input <file> --output <file> [--width N] [--quality N]`, or
  `--output-dir <dir> --base-name <name> --widths 400,800,1200` for a responsive `srcset` set.

FFmpeg/ffprobe are bundled via `ffmpeg-static`/`ffprobe-static` — no system install needed.

## Process

1. `probe` first — know the source's real resolution/duration/codec before touching it.
2. Pick the right output for the destination component: `transcode` for playback,
   `extract-frames` only for `ScrollSequence`, `optimise-images` for anything feeding an `<img>`.
3. Write processed output into `media-library/<project>/<videos|images|sequences>/...` so the
   manifest's `processingHistory` stays meaningful.
4. Never claim a file was produced without actually running the command and checking the output
   exists (or re-probing it) — a non-zero exit from these scripts means it didn't happen.
