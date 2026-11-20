import type { Page } from '@playwright/test'

/**
 * Starts collecting console errors and uncaught page errors for `page`. Call before navigating
 * so nothing that happens during the initial load is missed.
 */
export function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))
  return errors
}
