import { expect, test } from '@playwright/test'
import { collectConsoleErrors } from './helpers'

test('loads with no console errors and the right title', async ({ page }) => {
  const errors = collectConsoleErrors(page)
  const response = await page.goto('/')
  expect(response?.ok()).toBeTruthy()
  await expect(page).toHaveTitle('Yonah Creative Engine')
  await page.waitForLoadState('networkidle')

  expect(errors, `console/page errors: ${errors.join('; ')}`).toEqual([])
})

test('no broken images', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const images = page.locator('img')
  const count = await images.count()
  expect(count, 'expected at least one <img> on the demo page').toBeGreaterThan(0)

  for (let i = 0; i < count; i += 1) {
    const naturalWidth = await images.nth(i).evaluate((img: HTMLImageElement) => img.naturalWidth)
    expect(naturalWidth, `image at index ${i} failed to load (naturalWidth is 0)`).toBeGreaterThan(0)
  }
})
