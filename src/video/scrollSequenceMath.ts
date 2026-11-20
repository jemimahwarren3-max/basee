/**
 * Pure math extracted out of ScrollSequence so it can be verified without a browser: given how
 * far a scroll-pinned section has progressed (0-1) and how many frames exist, which frame
 * should be on screen, and which frames should be preloaded around it.
 */

/** Maps scroll progress (0-1) to a frame index (0-based, clamped). */
export function frameIndexForProgress(progress: number, frameCount: number): number {
  if (frameCount <= 0) return 0
  const clamped = Math.min(1, Math.max(0, progress))
  return Math.min(frameCount - 1, Math.floor(clamped * frameCount))
}

/**
 * Returns the inclusive [start, end] frame index range to keep loaded around `currentIndex`,
 * clamped to [0, frameCount - 1]. `windowSize` is how many frames ahead/behind to keep warm.
 */
export function preloadRange(
  currentIndex: number,
  frameCount: number,
  windowSize: number,
): [number, number] {
  if (frameCount <= 0) return [0, -1]
  const start = Math.max(0, currentIndex - windowSize)
  const end = Math.min(frameCount - 1, currentIndex + windowSize)
  return [start, end]
}
