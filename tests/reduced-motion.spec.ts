import { expect, test } from '@playwright/test'

test.use({ reducedMotion: 'reduce' })

test('key content is visible without relying on animation to reveal it', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  // Every animated component in this repo (ScrollReveal, TextReveal, Parallax, HorizontalScroll)
  // has an explicit prefers-reduced-motion branch that skips the animation setup entirely —
  // under reduced motion the content must simply already be visible, not stuck at opacity: 0
  // waiting for a GSAP tween that never runs.
  await expect(page.getByText('Scroll-triggered reveal')).toBeVisible()
  await expect(page.getByText('Parallax layer')).toBeVisible()
  await expect(
    page.getByText('Each word in this sentence reveals on its own as you scroll into view.'),
  ).toBeVisible()
})
