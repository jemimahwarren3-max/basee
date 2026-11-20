#!/usr/bin/env tsx
/**
 * Video inspection, trimming, transcoding, and poster generation.
 *
 * Usage:
 *   npm run process-video -- probe --input source.mp4
 *   npm run process-video -- trim --input source.mp4 --output clip.mp4 --start 2 --duration 5
 *   npm run process-video -- transcode --input clip.mp4 --output clip.webm --width 1280 --fps 30
 *   npm run process-video -- poster --input clip.mp4 --output poster.jpg --at 1 --width 1600
 */
import { parseArgs } from '../automation/cli'
import { generatePoster } from '../automation/video-processing/poster'
import { probeVideo } from '../automation/video-processing/probe'
import { transcodeVideo, trimVideo } from '../automation/video-processing/transcode'

async function main() {
  const [command, ...rest] = process.argv.slice(2)
  const args = parseArgs(rest)

  if (command === 'probe') {
    if (!args.input) throw new Error('Usage: process-video probe --input <file>')
    console.log(JSON.stringify(await probeVideo(args.input), null, 2))
    return
  }

  if (command === 'trim') {
    if (!args.input || !args.output || !args.start || !args.duration) {
      throw new Error('Usage: process-video trim --input <file> --output <file> --start <s> --duration <s>')
    }
    await trimVideo(args.input, args.output, Number(args.start), Number(args.duration))
    console.log(`Wrote ${args.output}`)
    return
  }

  if (command === 'transcode') {
    if (!args.input || !args.output) {
      throw new Error('Usage: process-video transcode --input <file> --output <file> [--width N] [--fps N] [--crf N] [--muted true]')
    }
    await transcodeVideo({
      input: args.input,
      output: args.output,
      width: args.width ? Number(args.width) : undefined,
      fps: args.fps ? Number(args.fps) : undefined,
      crf: args.crf ? Number(args.crf) : undefined,
      startSeconds: args.start ? Number(args.start) : undefined,
      durationSeconds: args.duration ? Number(args.duration) : undefined,
      muted: args.muted === 'true',
    })
    console.log(`Wrote ${args.output}`)
    return
  }

  if (command === 'poster') {
    if (!args.input || !args.output) {
      throw new Error('Usage: process-video poster --input <file> --output <file> [--at seconds] [--width N]')
    }
    await generatePoster({
      input: args.input,
      output: args.output,
      atSeconds: args.at ? Number(args.at) : undefined,
      width: args.width ? Number(args.width) : undefined,
    })
    console.log(`Wrote ${args.output}`)
    return
  }

  throw new Error(`Unknown command "${command}". Expected one of: probe, trim, transcode, poster.`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
