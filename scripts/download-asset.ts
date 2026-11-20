#!/usr/bin/env tsx
/**
 * Downloads one asset returned by search-assets.ts and records it in the project's manifest.
 *
 * Usage:
 *   npm run download-asset -- --asset-file ./scratch/chosen-asset.json --project perfume-brand --intended-use hero
 *
 * --asset-file must contain a single AssetSearchResult JSON object (one entry from
 * search-assets.ts's "results" array) — pick it yourself rather than guessing which result best
 * matches the brief.
 */
import { readFile } from 'node:fs/promises'
import { downloadAsset } from '../automation/asset-download/download'
import type { AssetSearchResult } from '../automation/asset-search/types'
import { parseArgs } from '../automation/cli'
import { loadEnv } from '../automation/env'

loadEnv()

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!args['asset-file'] || !args.project || !args['intended-use']) {
    console.error(
      'Usage: npm run download-asset -- --asset-file <path.json> --project <slug> --intended-use <use>',
    )
    process.exitCode = 1
    return
  }

  const asset = JSON.parse(await readFile(args['asset-file'], 'utf-8')) as AssetSearchResult

  const filePath = await downloadAsset(asset, {
    projectSlug: args.project,
    intendedUse: args['intended-use'],
    filename: args.filename,
    forceNonCommercial: args['force-non-commercial'] === 'true',
  })

  console.log(`Downloaded to ${filePath}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
