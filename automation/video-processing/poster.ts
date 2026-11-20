import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { FFMPEG_PATH } from './ffmpegPaths'
import { runCommand } from '../exec'

export interface PosterOptions {
  input: string
  output: string
  /** Timestamp to grab the frame from, in seconds. Defaults to 1s in (avoids a black first frame). */
  atSeconds?: number
  width?: number
}

/** Extracts a single still frame from a video — the poster/thumbnail for a <video> element. */
export async function generatePoster(options: PosterOptions): Promise<void> {
  await mkdir(path.dirname(options.output), { recursive: true })

  const args = ['-y', '-ss', String(options.atSeconds ?? 1), '-i', options.input]
  if (options.width) args.push('-vf', `scale=${options.width}:-2:flags=lanczos`)
  args.push('-frames:v', '1', options.output)

  await runCommand(FFMPEG_PATH, args)
}
