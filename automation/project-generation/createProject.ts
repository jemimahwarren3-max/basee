import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { runCommand } from '../exec'
import { getTemplate } from '../../templates'
import { slugify } from './slug'

export interface CreateProjectOptions {
  /** Human-readable client/project name, e.g. "Aurum Perfume Co." */
  name: string
  /** One of templates/index.ts's keys (cinematic, luxury, editorial, ecommerce, creative, immersive). */
  template: string
  /** Defaults to slugify(name). */
  slug?: string
  /** Defaults to a sibling directory named after the slug, e.g. ../<slug>. */
  outputDir?: string
}

export interface CreateProjectResult {
  outputDir: string
  slug: string
}

const EXCLUDED_DIR_NAMES = new Set(['node_modules', '.git', 'dist', '.tmp'])
const EXCLUDED_EXACT_PATHS = new Set(['.env.local'])
const MEDIA_LIBRARY_SUBDIRS = ['videos', 'images', 'sequences', 'textures', 'models']

/**
 * Clones this engine's foundation into a new, isolated directory for one client project —
 * never the previous client's downloaded assets or manifest, never .env.local (API keys).
 * This is the Node-side implementation behind `npm run create-project`.
 */
export async function createProject(options: CreateProjectOptions): Promise<CreateProjectResult> {
  const theme = getTemplate(options.template) // throws on an unknown template name
  const slug = options.slug ?? slugify(options.name)
  if (!slug) throw new Error(`"${options.name}" doesn't slugify into a usable directory name.`)

  const repoRoot = process.cwd()
  const outputDir = path.resolve(options.outputDir ?? path.join(repoRoot, '..', slug))

  if (path.resolve(outputDir) === path.resolve(repoRoot)) {
    throw new Error('outputDir must not be the engine repo itself.')
  }

  const existingEntries = await readdir(outputDir).catch(() => [])
  if (existingEntries.length > 0) {
    throw new Error(`${outputDir} already exists and isn't empty — refusing to overwrite it.`)
  }

  await mkdir(outputDir, { recursive: true })

  await cp(repoRoot, outputDir, {
    recursive: true,
    filter: (source) => {
      const relative = path.relative(repoRoot, source)
      if (relative === '') return true
      const segments = relative.split(path.sep)
      if (segments.some((segment) => EXCLUDED_DIR_NAMES.has(segment))) return false
      if (EXCLUDED_EXACT_PATHS.has(relative)) return false
      return true
    },
  })

  // Never carry a previous client's downloaded assets or manifest into the new project, even
  // if this engine checkout has some sitting around from local testing.
  for (const sub of MEDIA_LIBRARY_SUBDIRS) {
    const dir = path.join(outputDir, 'media-library', sub)
    const entries = await readdir(dir).catch(() => [] as string[])
    await Promise.all(
      entries
        .filter((entry) => entry !== '.gitkeep')
        .map((entry) => rm(path.join(dir, entry), { recursive: true, force: true })),
    )
  }

  const projectConfig = {
    name: options.name,
    slug,
    template: options.template,
    createdAt: new Date().toISOString(),
  }
  await writeFile(
    path.join(outputDir, 'project.config.json'),
    JSON.stringify(projectConfig, null, 2) + '\n',
    'utf-8',
  )

  await writeFile(path.join(outputDir, 'docs', 'DESIGN_BRIEF.md'), designBriefMarkdown(options.name, theme), 'utf-8')

  const claudeMdPath = path.join(outputDir, 'CLAUDE.md')
  const existingClaudeMd = await readFile(claudeMdPath, 'utf-8').catch(() => '')
  await writeFile(claudeMdPath, existingClaudeMd + projectClaudeMdSection(options.name, slug, theme), 'utf-8')

  await runCommand('git', ['init', '-q'], { cwd: outputDir }).catch(() => {
    // git not available or already a repo — not fatal, just means the user inits it themselves.
  })

  return { outputDir, slug }
}

function designBriefMarkdown(name: string, theme: ReturnType<typeof getTemplate>): string {
  return `# Design brief — ${name}

Starting template: **${theme.name}** — ${theme.direction}

Fill this in before building. This file (plus the brief the client actually gave you) is what
Claude Code should read before writing any component.

## Business

- Business type:
- Target audience:
- Website objective:
- Brand personality:

## Visual direction (seeded from the ${theme.name} template — adjust, don't just accept)

- Colors: background ${theme.colors.background}, foreground ${theme.colors.foreground}, accent ${theme.colors.accent}
- Fonts: heading ${theme.fonts.heading}, body ${theme.fonts.body}
- Motion intensity: ${theme.motion.intensity}

## Suggested components for this direction

${theme.suggestedComponents.map((c) => `- ${c}`).join('\n')}

## Avoid for this direction

${theme.avoid.map((a) => `- ${a}`).join('\n')}

## Required pages

-

## Required functionality

-

## Reference sites

-
`
}

function projectClaudeMdSection(name: string, slug: string, theme: ReturnType<typeof getTemplate>): string {
  return `

## Project: ${name}

- Slug: \`${slug}\` — pass this as \`--project ${slug}\` to search-assets/download-asset/manifest calls.
- Template: **${theme.name}** (${theme.direction})
- See \`docs/DESIGN_BRIEF.md\` — fill it in before building anything.
- Suggested components: ${theme.suggestedComponents.join(', ')}
- Avoid: ${theme.avoid.join('; ')}
`
}
