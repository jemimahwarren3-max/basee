import { useEffect, useRef } from 'react'
import { frameIndexForProgress, preloadRange } from './scrollSequenceMath'

export interface ScrollSequenceProps {
  /** Ordered frame URLs, e.g. frame-0001.webp ... frame-0240.webp from extractFrameSequence(). */
  frameUrls: string[]
  /** How many frames ahead/behind the current one to keep preloaded. */
  preloadWindow?: number
  className?: string
}

/**
 * Scrubs a WebP frame sequence (from automation/video-processing/sequence.ts) against scroll
 * position inside a tall pinned container, drawing to a <canvas> rather than swapping <img>
 * elements. Preloads only a window of frames around the current one — not the whole sequence
 * up front — cleans up its scroll listener and in-flight loads on unmount, and freezes on the
 * first frame under prefers-reduced-motion instead of animating.
 */
export function ScrollSequence({ frameUrls, preloadWindow = 6, className }: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas || frameUrls.length === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const images: (HTMLImageElement | undefined)[] = new Array(frameUrls.length)
    let currentIndex = -1
    let destroyed = false

    const draw = (index: number) => {
      const img = images[index]
      // A frame that hasn't finished loading yet is skipped rather than drawn as a blank —
      // the previous frame stays on screen until this one is ready.
      if (!img || !img.complete || img.naturalWidth === 0) return
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      ctx.drawImage(img, 0, 0)
    }

    const loadFrame = (index: number) => {
      if (images[index] || index < 0 || index >= frameUrls.length) return
      const img = new Image()
      img.src = frameUrls[index]
      images[index] = img
      img.onload = () => {
        if (!destroyed && index === currentIndex) draw(index)
      }
    }

    const onScroll = () => {
      const rect = container.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const progress = total > 0 ? -rect.top / total : 0

      const index = frameIndexForProgress(progress, frameUrls.length)
      const [start, end] = preloadRange(index, frameUrls.length, preloadWindow)
      for (let i = start; i <= end; i += 1) loadFrame(i)

      if (index !== currentIndex) {
        currentIndex = index
        draw(index)
      }
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      loadFrame(0)
      currentIndex = 0
      images[0]!.onload = () => draw(0)
      return () => {
        destroyed = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()

    return () => {
      destroyed = true
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [frameUrls, preloadWindow])

  return (
    <div ref={containerRef} className={className} style={{ height: '300vh' }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="max-h-full max-w-full" />
      </div>
    </div>
  )
}
