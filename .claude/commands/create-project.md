---
description: Scaffold a new client project from this engine's current foundation
argument-hint: "<client name> <template: cinematic|luxury|editorial|ecommerce|creative|immersive> [output-dir]"
---

Run `npm run create-project -- --name "$1" --template "$2"` (add `--output-dir "$3"` if a third
argument was given) and report what it printed — the new project's path and slug. Templates are
`cinematic`, `luxury`, `editorial`, `ecommerce`, `creative`, `immersive` (see
`docs/TEMPLATES.md`).

If `$1` or `$2` is missing, ask the user for the client name and which template fits their brief
before running anything — don't guess a template.

After it succeeds, tell the user the new project already has `docs/DESIGN_BRIEF.md` seeded from
the chosen template and a `## Project: ...` section appended to its `CLAUDE.md` — point them
there next, and remind them to run `npm install` inside the new directory (this command does
not do that for them).
