import { spawn } from 'node:child_process'

/**
 * Runs a binary (ffmpeg/ffprobe) and collects stdout/stderr. Rejects with both streams included
 * in the error message on a non-zero exit, since ffmpeg puts its actual error on stderr even on
 * success (progress logging), so the raw exit code plus full stderr is what's actually useful
 * for debugging a failed command.
 */
export function runCommand(binary: string, args: string[]): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(binary, args)
    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (chunk: Buffer) => {
      stdout += chunk.toString()
    })
    child.stderr.on('data', (chunk: Buffer) => {
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
