import ffmpegStatic from 'ffmpeg-static'
import ffprobeStatic from 'ffprobe-static'

/**
 * Bundled ffmpeg/ffprobe binary paths (via ffmpeg-static/ffprobe-static), so this engine works
 * on a fresh clone without a system-wide FFmpeg install. See docs/MEDIA_PROCESSING.md.
 */
export const FFMPEG_PATH = ffmpegStatic as unknown as string
export const FFPROBE_PATH = (ffprobeStatic as unknown as { path: string }).path
