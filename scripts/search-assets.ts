#!/usr/bin/env tsx
/**
 * Research assets across all API-backed sources (and list manual-link-only sources).
 *
 * Usage:
 *   npm run search-assets -- --query "espresso pouring into a ceramic cup" --kind video
 *   npm run search-assets -- --query "smoke" --kind video --orientation landscape --per-page 5
 *   npm run search-assets -- --query "walnut texture" --kind texture --sources polyhaven
 */
import { API_SOURCES, manualSourcesFor, searchAssets } from '../automation/asset-search'
import type { AssetKind, AssetSourceId, Orientation } from '../automation/asset-search/types'
import { parseArgs } from '../automation/cli'
import { loadEnv } from '../automation/env'

loadEnv()

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!args.query) {
    console.error(
      'Missing --query. Example: npm run search-assets -- --query "espresso pouring" --kind video',
    )
    process.exitCode = 1
    return
  }

  const sources = args.sources
    ? (args.sources.split(',') as AssetSourceId[])
    : API_SOURCES

  const { results, errors } = await searchAssets({
    query: args.query,
    kind: args.kind as AssetKind | undefined,
    orientation: args.orientation as Orientation | undefined,
    perPage: args['per-page'] ? Number(args['per-page']) : undefined,
    minWidth: args['min-width'] ? Number(args['min-width']) : undefined,
    minDurationSeconds: args['min-duration'] ? Number(args['min-duration']) : undefined,
    maxDurationSeconds: args['max-duration'] ? Number(args['max-duration']) : undefined,
    sources,
  })

  console.log(JSON.stringify({ results, errors, manualSources: manualSourcesFor(args.kind) }, null, 2))

  if (errors.length) {
    console.error(
      `\n${errors.length} source(s) failed: ${errors.map((e) => `${e.source} (${e.message})`).join('; ')}`,
    )
  }
}

main()
