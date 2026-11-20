import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { z } from 'zod'

export const ManifestEntrySchema = z.object({
  filename: z.string(),
  sourcePageUrl: z.string(),
  source: z.string(),
  creator: z.string(),
  license: z.string(),
  commercialUsePermitted: z.boolean(),
  downloadedAt: z.string(),
  intendedUse: z.string(),
  processingHistory: z.array(z.string()),
})

export type ManifestEntry = z.infer<typeof ManifestEntrySchema>

const ManifestSchema = z.array(ManifestEntrySchema)

function manifestPath(projectSlug: string): string {
  return path.join('media-library', projectSlug, 'manifest.json')
}

export async function readManifest(projectSlug: string): Promise<ManifestEntry[]> {
  try {
    const raw = await readFile(manifestPath(projectSlug), 'utf-8')
    return ManifestSchema.parse(JSON.parse(raw))
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return []
    throw error
  }
}

export async function appendManifestEntry(
  projectSlug: string,
  entry: ManifestEntry,
): Promise<void> {
  ManifestEntrySchema.parse(entry)
  const existing = await readManifest(projectSlug)
  existing.push(entry)
  await mkdir(path.dirname(manifestPath(projectSlug)), { recursive: true })
  await writeFile(manifestPath(projectSlug), JSON.stringify(existing, null, 2), 'utf-8')
}
