#!/usr/bin/env tsx
/**
 * Scaffolds a new, isolated client project from this engine's current foundation.
 *
 * Usage:
 *   npm run create-project -- --name "Aurum Perfume Co." --template luxury
 *   npm run create-project -- --name "Aurum Perfume Co." --template luxury --output-dir ../aurum-site
 *
 * Templates: cinematic, luxury, editorial, ecommerce, creative, immersive (see templates/).
 */
import { parseArgs } from '../automation/cli'
import { createProject } from '../automation/project-generation/createProject'

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!args.name || !args.template) {
    throw new Error(
      'Usage: npm run create-project -- --name "<client name>" --template <cinematic|luxury|editorial|ecommerce|creative|immersive> [--output-dir <path>] [--slug <slug>]',
    )
  }

  const { outputDir, slug } = await createProject({
    name: args.name,
    template: args.template,
    slug: args.slug,
    outputDir: args['output-dir'],
  })

  console.log(`Created ${slug} at ${outputDir}`)
  console.log(`Next: cd ${outputDir} && npm install, then fill in docs/DESIGN_BRIEF.md`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
