# Contributing to the Yonah Creative Engine

This is the **engine** repo — the thing that gets cloned per client via `npm run create-project`.
Changes here affect every future client project, so they get more scrutiny than a one-off page.

## Before changing anything

Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). It's the source of truth for what's actually
built versus reserved for a later phase — if you're about to use something it lists as
"Reserved," that thing doesn't exist yet; build it, don't assume it.

## The non-negotiables (from [CLAUDE.md](CLAUDE.md))

- **Never fabricate.** Don't claim an asset downloaded, a test passed, or a build succeeded
  without actually running it this session.
- **No placeholder modules presented as working.** An empty reserved folder is fine; a file that
  pretends to implement something it doesn't is not.
- **Every animated component needs a `prefers-reduced-motion` branch** — see
  [docs/ANIMATION.md](docs/ANIMATION.md) for the exact pattern every existing one follows.
- **Secrets stay in `.env.local`.** Never hardcode a key, never widen what `create-project`
  copies into a new client project to include it.

## Adding a new reusable component (effect/3D/animation)

1. Put it in the matching folder (`src/effects/`, `src/3d/`, `src/animations/`, `src/video/`).
2. Follow an existing file in that folder for the pattern: reduced-motion guard, cleanup
   function returned from `useEffect`, lazy-load via `React.lazy` if it pulls in a large
   dependency (Three.js scenes always do).
3. Wire it into `src/App.tsx`'s demo (or a dedicated test page) and actually run it — `npm run
   dev` plus a Playwright spec if the behavior is checkable (see `tests/` for examples), not
   just `tsc -b` passing.
4. Update `docs/ARCHITECTURE.md`'s "Built" section and, if relevant, a template's
   `suggestedComponents`/`avoid` list in `templates/<name>/theme.ts`.

## Adding a new template (art direction)

1. Add `templates/<name>/theme.ts` implementing `TemplateTheme` (see `templates/types.ts`) with
   genuinely different tokens from the existing six — not a recolor of an existing one.
2. Register it in `templates/index.ts`'s `TEMPLATES` map.
3. Verify it with the same approach used when the six were built: load it via `getTemplate()`
   and confirm every field is populated, confirm an unrelated template doesn't accidentally
   share its `suggestedComponents`/`avoid` lists.
4. Add it to the comparison table in [docs/TEMPLATES.md](docs/TEMPLATES.md).

## Adding a new Claude skill

1. Write `.claude/skills/<name>/SKILL.md` naming the **exact files/scripts** it uses — grep for
   them to confirm they exist before writing the skill, don't describe aspirational capability.
2. Add it to the pipeline order in [CLAUDE.md](CLAUDE.md)'s "How the skills fit together."

## Adding a new asset source / processing step / anything else

Same shape every time: build the real implementation, run it for real against real input (a
synthetic `ffmpeg testsrc` clip, a live no-key-needed API, whatever applies), fix what breaks,
only then update the relevant `docs/*.md` and `docs/ARCHITECTURE.md` to say it's built.

## Before calling a change done

`npm run test:report` — type-check, build, lint, and the Playwright suite, all for real. Don't
report success without having actually run it this session.
