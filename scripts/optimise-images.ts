#!/usr/bin/env tsx
/**
 * Resizes/re-encodes one image, or generates a responsive WebP set at several widths.
 *
 * Usage:
 *   npm run optimise-images -- --input photo.jpg --output photo.webp --width 1600
 *   npm run optimise-images -- --input photo.jpg --output-dir media-library/perfume-brand/images --base-name hero --widths 400,800,1200,1600
 */
import { generateResponsiveSet, optimizeImage } from '../automation/image-processing'
import { parseArgs } from '../automation/cli'

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!args.input) {
    throw new Error(
      'Usage: npm run optimise-images -- --input <file> --output <file> [--width N] [--quality N]\n' +
        '   or: npm run optimise-images -- --input <file> --output-dir <dir> --base-name <name> --widths 400,800,1200',
    )
  }

  if (args['output-dir']) {
    if (!args['base-name'] || !args.widths) {
      throw new Error('--output-dir requires --base-name and --widths (comma-separated).')
    }
    const outputs = await generateResponsiveSet({
      input: args.input,
      outputDir: args['output-dir'],
      baseName: args['base-name'],
      widths: args.widths.split(',').map(Number),
      quality: args.quality ? Number(args.quality) : undefined,
    })
    console.log(`Wrote ${outputs.length} files:\n${outputs.join('\n')}`)
    return
  }

  if (!args.output) {
    throw new Error('Provide --output <file>, or --output-dir/--base-name/--widths for a responsive set.')
  }

  await optimizeImage({
    input: args.input,
    output: args.output,
    width: args.width ? Number(args.width) : undefined,
    quality: args.quality ? Number(args.quality) : undefined,
  })
  console.log(`Wrote ${args.output}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
