import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type ReactNode, useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: ReactNode
  /** Vertical offset (px) the element animates in from. */
  y?: number
  /** Animation duration in seconds. */
  duration?: number
  className?: string
}

/**
 * Fades and slides its children into view as they cross the viewport, using a single
 * ScrollTrigger-driven GSAP tween. Skips the animation under prefers-reduced-motion.
 */
export function ScrollReveal({ children, y = 40, duration = 0.8, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [y, duration])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
