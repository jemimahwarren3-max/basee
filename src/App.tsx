import { lazy, Suspense } from 'react'
import { ScrollReveal } from './animations/ScrollReveal'
import { useLenis } from './animations/useLenis'

const RotatingObject = lazy(() =>
  import('./3d/RotatingObject').then((m) => ({ default: m.RotatingObject })),
)

function App() {
  useLenis()

  return (
    <main className="bg-neutral-950 text-neutral-100">
      <section className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Yonah Creative Engine</h1>
        <p className="max-w-md text-sm text-neutral-400">
          Foundation + animation/3D pipeline running. Scroll down to see GSAP ScrollTrigger and
          React Three Fiber in action.
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center">
        <Suspense fallback={null}>
          <RotatingObject className="h-[60vh] w-full max-w-xl" />
        </Suspense>
      </section>

      <ScrollReveal className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Scroll-triggered reveal</h2>
        <p className="max-w-md text-sm text-neutral-400">
          This section fades and slides in via GSAP ScrollTrigger, driven by Lenis smooth scroll.
        </p>
      </ScrollReveal>
    </main>
  )
}

export default App
