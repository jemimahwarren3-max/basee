import { cinematicTheme } from './cinematic/theme'
import { creativeTheme } from './creative/theme'
import { ecommerceTheme } from './ecommerce/theme'
import { editorialTheme } from './editorial/theme'
import { immersiveTheme } from './immersive/theme'
import { luxuryTheme } from './luxury/theme'
import type { TemplateTheme } from './types'

export * from './types'

export const TEMPLATES: Record<string, TemplateTheme> = {
  cinematic: cinematicTheme,
  luxury: luxuryTheme,
  editorial: editorialTheme,
  ecommerce: ecommerceTheme,
  creative: creativeTheme,
  immersive: immersiveTheme,
}

export function getTemplate(name: string): TemplateTheme {
  const theme = TEMPLATES[name]
  if (!theme) {
    throw new Error(`Unknown template "${name}". Options: ${Object.keys(TEMPLATES).join(', ')}`)
  }
  return theme
}
