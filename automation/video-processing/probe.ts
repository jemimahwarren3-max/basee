import { FFPROBE_PATH } from './ffmpegPaths'
import { runCommand } from '../exec'

export interface VideoMetadata {
  durationSeconds: number
  width: number
  height: number
  fps: number
  codec: string
  hasAudio: boolean
  fileSizeBytes: number
}

interface FFProbeStream {
  codec_type: string
  codec_name: string
  width?: number
  height?: number
  r_frame_rate?: string
  avg_frame_rate?: string
}

interface FFProbeOutput {
  streams: FFProbeStream[]
  format: { duration: string; size: string }
}

function parseFrameRate(rate: string | undefined): number {
  if (!rate) return 0
  const [num, den] = rate.split('/').map(Number)
  if (!den) return num
  return num / den
}

/** Inspects a media file with ffprobe and returns normalized metadata. */
export async function probeVideo(filePath: string): Promise<VideoMetadata> {
  const { stdout } = await runCommand(FFPROBE_PATH, [
    '-v',
    'error',
    '-print_format',
    'json',
    '-show_format',
    '-show_streams',
    filePath,
  ])

  const data = JSON.parse(stdout) as FFProbeOutput
  const videoStream = data.streams.find((s) => s.codec_type === 'video')
  const audioStream = data.streams.find((s) => s.codec_type === 'audio')

  if (!videoStream) {
    throw new Error(`${filePath} has no video stream.`)
  }

  return {
    durationSeconds: Number(data.format.duration),
    width: videoStream.width ?? 0,
    height: videoStream.height ?? 0,
    fps: parseFrameRate(videoStream.avg_frame_rate ?? videoStream.r_frame_rate),
    codec: videoStream.codec_name,
    hasAudio: Boolean(audioStream),
    fileSizeBytes: Number(data.format.size),
  }
}
