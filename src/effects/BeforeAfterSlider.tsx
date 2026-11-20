import { useRef, useState } from 'react'

interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt?: string
  afterAlt?: string
  className?: string
}

/**
 * Classic draggable before/after image comparison. Pure React + CSS clip-path — no animation
 * library needed. Works with mouse, touch, and keyboard (arrow keys move the divider once it's
 * focused), so it doesn't depend on drag support to be usable.
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before',
  afterAlt = 'After',
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  function updateFromClientX(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const ratio = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, ratio)))
  }

  return (
    <div
      ref={containerRef}
      className={`relative touch-none select-none overflow-hidden ${className ?? ''}`}
      onPointerDown={(e) => {
        draggingRef.current = true
        updateFromClientX(e.clientX)
      }}
      onPointerMove={(e) => {
        if (draggingRef.current) updateFromClientX(e.clientX)
      }}
      onPointerUp={() => {
        draggingRef.current = false
      }}
      onPointerLeave={() => {
        draggingRef.current = false
      }}
    >
      <img src={afterSrc} alt={afterAlt} className="block h-full w-full object-cover" />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={beforeSrc} alt={beforeAlt} className="block h-full w-full object-cover" />
      </div>
      <div
        role="slider"
        aria-label="Comparison position"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        className="absolute inset-y-0 w-1 cursor-ew-resize bg-white/80"
        style={{ left: `calc(${position}% - 2px)` }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 2))
          if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 2))
        }}
      />
    </div>
  )
}
