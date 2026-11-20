export interface ColorPalette {
  background: string
  foreground: string
  accent: string
  muted: string
}

export interface MotionProfile {
  /** How much movement/parallax/stagger a template leans on, as a rough intensity dial. */
  intensity: 'minimal' | 'moderate' | 'maximal'
  /** Default ScrollReveal/TextReveal duration in seconds. */
  revealDuration: number
}

export interface TemplateTheme {
  name: string
  /** One-line description of the art direction this template is a starting point for. */
  direction: string
  /** Example client briefs this template fits — not literal copy, a judgment aid. */
  fitsBriefsLike: string[]
  colors: ColorPalette
  fonts: {
    heading: string
    body: string
  }
  motion: MotionProfile
  /** Components from src/animations, src/3d, src/video, src/effects this direction leans on. */
  suggestedComponents: string[]
  /** Libraries worth loading for this direction — the modular principle: don't load all of them. */
  suggestedLibraries: string[]
  /** Things that would fight this direction's intent — a guardrail, not a hard rule. */
  avoid: string[]
}
