import { spawn } from 'node:child_process'

/**
 * Runs a binary and collects stdout/stderr. Rejects with both streams included in the error
 * message on a non-zero exit — useful for debugging ffmpeg (which logs progress to stderr even
 * on success) and for any other CLI this engine shells out to (git, etc).
 */
export function runCommand(
  binary: string,
  args: string[],
  options?: { cwd?: string; shell?: boolean },
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    // Windows .cmd wrappers (npm.cmd, npx.cmd) can only be spawned through a shell — spawning
    // them directly fails with EINVAL. Binaries this engine calls directly (ffmpeg, git) never
    // need this. Node warns that shell+args-array concatenates args unescaped; that's a real
    // risk for user-controlled input, but every caller here passes fixed internal literals
    // ('npm', 'run', 'build', ...), never a brief or filename, so it doesn't apply.
    const child = spawn(binary, args, { cwd: options?.cwd, shell: options?.shell })
    let stdout = ''
    let stderr = ''

    child.stdout?.on('data', (chunk: Buffer) => {
      stdout += chunk.toString()
    })
    child.stderr?.on('data', (chunk: Buffer) => {
      stderr += chunk.toString()
    })

    child.on('error', (error) => {
      reject(new Error(`Failed to run ${binary}: ${error.message}`))
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr })
      } else {
        reject(new Error(`${binary} exited with code ${code}\n${stderr}`))
      }
    })
  })
}
