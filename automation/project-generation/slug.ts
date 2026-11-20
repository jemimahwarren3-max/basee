/** Turns "Yonah Perfume Co." into "yonah-perfume-co" — used for directory names and manifest keys. */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
