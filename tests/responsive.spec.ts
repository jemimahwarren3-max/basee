import { expect, test } from '@playwright/test'

// Runs under both the Desktop Chrome and Mobile Chrome projects (see playwright.config.ts),
// so this alone covers "mobile layouts render" + "no horizontal overflow" at both widths.
test('no horizontal overflow', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }))

  // +1 tolerance for sub-pixel layout rounding.
  expect(scrollWidth, `page is ${scrollWidth - clientWidth}px wider than the viewport`).toBeLessThanOrEqual(
    clientWidth + 1,
  )
})
