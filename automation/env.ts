/**
 * Loads .env.local into process.env for Node-side automation scripts (never imported by the
 * browser bundle). Missing file is fine — scripts that need a specific key report that
 * explicitly when they try to use it.
 */
export function loadEnv() {
  try {
    process.loadEnvFile('.env.local')
  } catch {
    // .env.local not present — fall through to whatever is already in process.env
  }
}

export function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy .env.example to .env.local and set it before running this command.`,
    )
  }
  return value
}
