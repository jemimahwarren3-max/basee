#!/usr/bin/env tsx
/**
 * Runs every real check this engine has (type-check, production build, lint, Playwright) and
 * writes a readable report. Never reports success without actually running the checks — if one
 * fails, the report says so and the script exits non-zero.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { runCommand } from '../automation/exec'

interface CheckResult {
  name: string
  passed: boolean
  detail: string
}

async function runCheck(name: string, binary: string, args: string[]): Promise<CheckResult> {
  try {
    const { stdout, stderr } = await runCommand(binary, args, { shell: true })
    return { name, passed: true, detail: stdout || stderr || 'ok' }
  } catch (error) {
    return { name, passed: false, detail: error instanceof Error ? error.message : String(error) }
  }
}

async function main() {
  const results: CheckResult[] = []
  results.push(await runCheck('TypeScript (tsc -b)', 'npx', ['tsc', '-b']))
  results.push(await runCheck('Production build', 'npm', ['run', 'build']))
  results.push(await runCheck('Lint (oxlint)', 'npm', ['run', 'lint']))
  results.push(await runCheck('Playwright (functional + responsive + reduced-motion)', 'npx', ['playwright', 'test']))

  const lines = [
    '# Test report',
    '',
    `Generated ${new Date().toISOString()}`,
    '',
    '| Check | Result |',
    '| --- | --- |',
    ...results.map((r) => `| ${r.name} | ${r.passed ? 'PASS' : 'FAIL'} |`),
    '',
  ]
  for (const r of results.filter((result) => !result.passed)) {
    lines.push(`## ${r.name} — FAILED`, '', '```', r.detail, '```', '')
  }

  await mkdir('test-results', { recursive: true })
  await writeFile('test-results/REPORT.md', lines.join('\n'), 'utf-8')
  console.log(lines.join('\n'))

  if (results.some((r) => !r.passed)) process.exitCode = 1
}

main()
