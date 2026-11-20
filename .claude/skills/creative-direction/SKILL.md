---
name: creative-direction
description: Turn a client brief into a design spec by picking and adapting one of templates/'s six art directions, then writing docs/DESIGN_BRIEF.md. Use before any component gets built.
---

# Creative direction

Read the client's brief (and `docs/DESIGN_BRIEF.md` if `create-project` already seeded one) and
produce a concrete design spec before writing any component.

## What actually exists to work with

- `templates/index.ts` exports `getTemplate(name)` over six themes: `cinematic`, `luxury`,
  `editorial`, `ecommerce`, `creative`, `immersive`. Each `TemplateTheme` (see
  `templates/types.ts`) has `direction`, `fitsBriefsLike`, `colors`, `fonts`, `motion`,
  `suggestedComponents`, `suggestedLibraries`, and `avoid`. Read [docs/TEMPLATES.md](../../docs/TEMPLATES.md)
  for the full comparison table.
- These are starting points, not finished designs — the spec is explicit that no two client
  sites should look the same. Adapt the chosen template's tokens to the actual brand (colors,
  type, motion intensity); don't ship the template's defaults unchanged.

## Process

1. Match the brief against each theme's `fitsBriefsLike` and `direction` — pick the closest fit,
   or explain why none fit and what to deviate on.
2. Decide: business category, audience, brand personality, objectives, required pages,
   required functionality (forms, booking, payments, etc.), and how the chosen palette/type
   actually differs from the template default for this specific brand.
3. Cross-check `suggestedComponents` against what's actually built — see
   [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md) before promising a component that only
   exists as a reserved folder.
4. Write (or fill in) `docs/DESIGN_BRIEF.md` with the above. This is what asset-research,
   motion-design, and frontend-development read next — don't skip it and go straight to code.

## What this skill does not do

It doesn't pick stock footage or build components — that's `asset-research` and
`motion-design`/`frontend-development`. Its output is a written spec, not code.
