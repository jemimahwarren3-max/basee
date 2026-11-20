# Windows setup guide

This engine was built and tested on Windows (PowerShell + Git Bash), and is designed to need no
admin rights and no extra system installs — FFmpeg/ffprobe are bundled via npm
(`ffmpeg-static`/`ffprobe-static`), not a system install.

## Requirements

- **Node.js** — 20.19+ or 22.12+ should work (Vite 8's requirement); this repo was built and
  tested on Node 24.14. Check with `node --version`.
- **Git** — any recent version.
- No FFmpeg install, no Python, no Visual Studio Build Tools needed for the documented workflow.

## First-time setup (PowerShell)

```powershell
git clone <repo-url> yonah-creative-engine
cd yonah-creative-engine
npm install
Copy-Item .env.example .env.local
# edit .env.local and add your Pexels/Pixabay/Unsplash keys (optional — Poly Haven/Sketchfab
# search works with no key)
npm run dev
```

## Running the Playwright suite

```powershell
npx playwright install chromium   # one-time browser download, ~330 MB
npm run test
```

## A Windows-specific bug this repo already hit and fixed

`automation/exec.ts`'s command runner shells out to binaries like `git`, `ffmpeg`, `npm`, and
`npx`. On Windows, `npm`/`npx` are `.cmd` wrapper scripts — spawning them directly (without a
shell) fails with `EINVAL`. `runCommand()` takes a `shell: true` option for exactly this case
(used by `scripts/run-tests.ts`); `ffmpeg`/`ffprobe`/`git` are real `.exe` binaries and never
need it. If you add a new script that shells out to another `.cmd`-wrapped tool, you'll hit the
same thing — pass `shell: true`.

## Path separators

Scripts in this repo accept paths with forward slashes even on Windows (Node and the bundled
FFmpeg/Sharp both handle this transparently) — you don't need to worry about backslash-escaping
paths passed to `npm run search-assets`, `process-video`, etc.

## If `npm run create-project` or any script seems to hang

Nothing in this repo's scripts prompts for interactive input — if a command appears to hang,
it's more likely a slow network call (an API search, a Chromium download) than something
waiting on you. Check `docs/ASSET_RESEARCH.md` / `docs/MEDIA_PROCESSING.md` for which commands
hit the network.
