import { expect, test } from '@playwright/test'

test('scroll sequence loads more than one distinct frame while scrolling', async ({ page }) => {
  const requestedFrames = new Set<string>()
  page.on('request', (request) => {
    const url = request.url()
    if (url.includes('/demo-sequence/frame-')) requestedFrames.add(url)
  })

  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight)
  const steps = 10
  for (let i = 1; i <= steps; i += 1) {
    await page.evaluate((y) => window.scrollTo(0, y), (scrollHeight / steps) * i)
    await page.waitForTimeout(100)
  }

  expect(
    requestedFrames.size,
    `expected ScrollSequence to request more than one frame while scrolling, got: ${[...requestedFrames].join(', ')}`,
  ).toBeGreaterThan(1)
})
