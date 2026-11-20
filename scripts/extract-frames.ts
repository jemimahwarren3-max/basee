#!/usr/bin/env tsx
/**
 * Extracts a WebP frame sequence for scroll-controlled video. Use only when the destination is
 * a ScrollSequence/canvas component — not for ordinary video playback (see process-video.ts
 * transcode for that).
 *
 * Usage:
 *   npm run extract-frames -- --input source.mp4 --output-dir media-library/perfume-brand/sequences/reveal --fps 24 --width 1600
 */
import { parseArgs } from '../automation/cli'
import { extractFrameSequence } from '../automation/video-processing/sequence'

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!args.input || !args['output-dir']) {
    throw new Error(
      'Usage: npm run extract-frames -- --input <file> --output-dir <dir> [--fps N] [--width N] [--quality N] [--compression-level N]',
    )
  }

  const frames = await extractFrameSequence({
    input: args.input,
    outputDir: args['output-dir'],
    fps: args.fps ? Number(args.fps) : undefined,
    width: args.width ? Number(args.width) : undefined,
    quality: args.quality ? Number(args.quality) : undefined,
    compressionLevel: args['compression-level'] ? Number(args['compression-level']) : undefined,
  })

  console.log(`Wrote ${frames.length} frames to ${args['output-dir']}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
