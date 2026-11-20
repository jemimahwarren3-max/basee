import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { FFMPEG_PATH } from './ffmpegPaths'
import { runCommand } from '../exec'

export interface TranscodeOptions {
  input: string
  output: string
  /** Trim start, in seconds. */
  startSeconds?: number
  /** Trim duration, in seconds. Omit to keep the rest of the clip. */
  durationSeconds?: number
  /** Scale to this width, preserving aspect ratio (height becomes -2 for even dimensions). */
  width?: number
  fps?: number
  /** 0 (best) – 51 (worst) for libx264; ignored for webm (libvpx-vp9 uses a bitrate-ish crf too). */
  crf?: number
  /** Strip the audio track — common for background/hero video. */
  muted?: boolean
}

function codecFor(output: string): { videoCodec: string; extraArgs: string[] } {
  const ext = path.extname(output).toLowerCase()
  if (ext === '.webm') {
    return { videoCodec: 'libvpx-vp9', extraArgs: ['-b:v', '0'] }
  }
  return { videoCodec: 'libx264', extraArgs: ['-pix_fmt', 'yuv420p', '-movflags', '+faststart'] }
}

/**
 * Trims, resizes, re-encodes (MP4/libx264 or WebM/VP9 by output extension), and optionally
 * mutes a video in one ffmpeg pass. This is the general-purpose entry point — call it for a
 * background/hero video; use extractFrameSequence() instead for scroll-controlled video.
 */
export async function transcodeVideo(options: TranscodeOptions): Promise<void> {
  await mkdir(path.dirname(options.output), { recursive: true })

  const { videoCodec, extraArgs } = codecFor(options.output)
  const filters: string[] = []
  if (options.width) filters.push(`scale=${options.width}:-2:flags=lanczos`)
  if (options.fps) filters.push(`fps=${options.fps}`)

  const args: string[] = ['-y']
  if (options.startSeconds !== undefined) args.push('-ss', String(options.startSeconds))
  args.push('-i', options.input)
  if (options.durationSeconds !== undefined) args.push('-t', String(options.durationSeconds))
  if (filters.length) args.push('-vf', filters.join(','))
  args.push('-c:v', videoCodec, '-crf', String(options.crf ?? 23), ...extraArgs)
  if (options.muted) {
    args.push('-an')
  } else {
    args.push('-c:a', 'aac', '-b:a', '128k')
  }
  args.push(options.output)

  await runCommand(FFMPEG_PATH, args)
}

/** Convenience wrapper for the common "just cut this clip" case, no re-encoding settings. */
export function trimVideo(input: string, output: string, startSeconds: number, durationSeconds: number) {
  return transcodeVideo({ input, output, startSeconds, durationSeconds })
}
