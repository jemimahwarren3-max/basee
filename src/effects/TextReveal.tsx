import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useMemo, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  text: string
  /** Seconds between each word's reveal starting. */
  stagger?: number
  className?: string
  wordClassName?: string
}

/**
 * Splits `text` into words and reveals them one at a time (fade + rise) as the element scrolls
 * into view. Renders the plain, fully-visible text under prefers-reduced-motion rather than
 * animating word-by-word.
 */
export function TextReveal({ text, stagger = 0.05, className, wordClassName }: TextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const wordEls = container.querySelectorAll<HTMLSpanElement>('[data-word]')
    const tween = gsap.fromTo(
      wordEls,
      { opacity: 0, y: '0.6em' },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [words, stagger])

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => (
        // eslint-disable-next-line react/no-array-index-key -- words aren't a stable collection, position is fine here
        <span key={i} className="inline-block overflow-hidden pb-[0.1em]">
          <span data-word className={`inline-block ${wordClassName ?? ''}`}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </p>
  )
}
