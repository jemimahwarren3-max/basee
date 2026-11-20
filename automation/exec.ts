import { spawn } from 'node:child_process'

/**
 * Runs a binary and collects stdout/stderr. Rejects with both streams included in the error
 * message on a non-zero exit — useful for debugging ffmpeg (which logs progress to stderr even
 * on success) and for any other CLI this engine shells out to (git, etc).
 */
export function runCommand(
  binary: string,
  args: string[],
  options?: { cwd?: string },
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(binary, args, { cwd: options?.cwd })
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
