import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

export interface OptimizeImageOptions {
  input: string
  output: string
  /** Resize to this width, preserving aspect ratio. Omit to keep original dimensions. */
  width?: number
  /** 1-100. Defaults differ sensibly per format below. */
  quality?: number
}

function formatFor(output: string): 'webp' | 'avif' | 'jpeg' | 'png' {
  const ext = path.extname(output).toLowerCase()
  if (ext === '.avif') return 'avif'
  if (ext === '.jpg' || ext === '.jpeg') return 'jpeg'
  if (ext === '.png') return 'png'
  return 'webp'
}

/**
 * Resizes and re-encodes one image to whatever format its output extension names
 * (.webp/.avif/.jpg/.png), with sensible default quality per format. This is the one place
 * image quality/compression decisions live — don't duplicate quality defaults elsewhere.
 */
export async function optimizeImage(options: OptimizeImageOptions): Promise<void> {
  await mkdir(path.dirname(options.output), { recursive: true })

  let pipeline = sharp(options.input)
  if (options.width) {
    pipeline = pipeline.resize({ width: options.width, withoutEnlargement: true })
  }

  const format = formatFor(options.output)
  const quality = options.quality
  if (format === 'webp') pipeline = pipeline.webp({ quality: quality ?? 80 })
  else if (format === 'avif') pipeline = pipeline.avif({ quality: quality ?? 60 })
  else if (format === 'jpeg') pipeline = pipeline.jpeg({ quality: quality ?? 82, mozjpeg: true })
  else pipeline = pipeline.png({ quality: quality ?? 80 })

  await pipeline.toFile(options.output)
}

export interface ResponsiveSetOptions {
  input: string
  /** Directory to write into; files are named <baseName>-<width>w.webp. */
  outputDir: string
  baseName: string
  widths: number[]
  quality?: number
}

/** Generates a set of WebP images at several widths — for a responsive <img srcset>. */
export async function generateResponsiveSet(options: ResponsiveSetOptions): Promise<string[]> {
  await mkdir(options.outputDir, { recursive: true })

  const outputs: string[] = []
  for (const width of options.widths) {
    const output = path.join(options.outputDir, `${options.baseName}-${width}w.webp`)
    await optimizeImage({ input: options.input, output, width, quality: options.quality })
    outputs.push(output)
  }
  return outputs
}

/** Reports an image's dimensions and file size — useful before deciding how aggressively to resize. */
export async function inspectImage(input: string) {
  const [metadata, stats] = await Promise.all([sharp(input).metadata(), stat(input)])
  return {
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
    format: metadata.format ?? 'unknown',
    fileSizeBytes: stats.size,
  }
}
