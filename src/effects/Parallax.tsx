import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type ReactNode, useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxProps {
  children: ReactNode
  /** How far the layer drifts (px) over the course of scrolling through its container. Negative moves up. */
  distance?: number
  className?: string
}

/** Scrubs a vertical translate on `children` as the viewport scrolls past it. No-ops under prefers-reduced-motion. */
export function Parallax({ children, distance = -80, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tween = gsap.fromTo(
      el,
      { y: 0 },
      {
        y: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [distance])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
