import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type ReactNode, useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface HorizontalScrollProps {
  /** Panels laid out side by side and scrubbed horizontally as the section pins. */
  children: ReactNode
  className?: string
}

/**
 * Pins the section and translates its track horizontally as the page scrolls vertically past
 * it — the "panels slide sideways" technique. Under prefers-reduced-motion, panels stay in
 * their natural horizontal flex layout with normal (non-pinned) scroll, so content is never
 * lost, just not pinned.
 */
export function HorizontalScroll({ children, className }: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const scrollDistance = track.scrollWidth - section.clientWidth
    if (scrollDistance <= 0) return

    const tween = gsap.to(track, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div ref={sectionRef} className={`overflow-hidden ${className ?? ''}`}>
      <div ref={trackRef} className="flex w-fit flex-row flex-nowrap">
        {children}
      </div>
    </div>
  )
}
