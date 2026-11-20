import { expect, test } from '@playwright/test'

test('before/after slider divider moves on keyboard input', async ({ page }) => {
  await page.goto('/')
  const slider = page.getByRole('slider', { name: 'Comparison position' })
  await slider.scrollIntoViewIfNeeded()
  await slider.focus()

  const before = Number(await slider.getAttribute('aria-valuenow'))
  await slider.press('ArrowRight')
  const afterRight = Number(await slider.getAttribute('aria-valuenow'))
  expect(afterRight, 'ArrowRight should move the divider forward').toBeGreaterThan(before)

  await slider.press('ArrowLeft')
  const afterLeft = Number(await slider.getAttribute('aria-valuenow'))
  expect(afterLeft, 'ArrowLeft should move the divider back').toBeLessThan(afterRight)
})
