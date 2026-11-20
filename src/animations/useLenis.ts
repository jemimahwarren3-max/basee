import Lenis from 'lenis'
import { useEffect } from 'react'

/**
 * Mounts a Lenis smooth-scroll instance for the lifetime of the component tree and drives it
 * with requestAnimationFrame. Respects prefers-reduced-motion by not instantiating at all.
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ autoRaf: true })
    return () => lenis.destroy()
  }, [])
}
