import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import { FFMPEG_PATH } from './ffmpegPaths'
import { runCommand } from './run'

export interface FrameSequenceOptions {
  input: string
  /** Directory the frames are written into, e.g. media-library/<project>/sequences/<scene>. */
  outputDir: string
  fps?: number
  width?: number
  /** 0-100, libwebp quality. */
  quality?: number
  /** 0-6, libwebp compression effort (higher = smaller file, slower encode). */
  compressionLevel?: number
}

/**
 * Extracts a WebP frame sequence for a scroll-controlled video (the "scrub video on scroll"
 * technique) — one still image per frame, named frame-0001.webp, frame-0002.webp, ... Matches
 * the command in the master spec: fps=24, scale=1600:-1 lanczos, libwebp q=78 level=6.
 *
 * Deliberately not for every video: use this only when the destination is a ScrollSequence /
 * canvas component, not for ordinary background/hero playback (use transcodeVideo for that).
 */
export async function extractFrameSequence(options: FrameSequenceOptions): Promise<string[]> {
  await mkdir(options.outputDir, { recursive: true })

  const filters = [`fps=${options.fps ?? 24}`]
  if (options.width) filters.push(`scale=${options.width}:-1:flags=lanczos`)

  await runCommand(FFMPEG_PATH, [
    '-y',
    '-i',
    options.input,
    '-vf',
    filters.join(','),
    '-c:v',
    'libwebp',
    '-quality',
    String(options.quality ?? 78),
    '-compression_level',
    String(options.compressionLevel ?? 6),
    path.join(options.outputDir, 'frame-%04d.webp'),
  ])

  const files = await readdir(options.outputDir)
  return files.filter((f) => f.startsWith('frame-') && f.endsWith('.webp')).sort()
}
