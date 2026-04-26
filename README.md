# Xerge Expo Demo — Are You Smarter Than an AI CTO?

<!-- wayfinder:next
- path: AGENTS.md
  reason: execution rules for contributors and AI agents
- path: repo_index.yaml
  reason: machine-readable map of repository contents
- path: TECH_BLUEPRINT.md
  reason: technical architecture and implementation constraints
-->

## What this repo is
A booth-ready offline-first React web demo for Xerge called **“Are You Smarter Than an AI CTO?”**.

## Why it exists
To attract expo visitors, teach Xerge's value proposition quickly, and capture consented leads locally for follow-up.

## Run locally
1. `npm install`
2. `npm run dev`
3. Open the local Vite URL shown in terminal.

## Build
- `npm run build`
- `npm run preview` (optional local check)

## Expo usage
- Launch app and leave on idle screen between visitors.
- Visitor flow: start challenge → 5 questions → persona result → lead capture → thank-you.
- App auto-resets after thank-you and on inactivity.

## Admin/export access
- Visit `/admin` directly, or press `A` from the challenge screen.
- Export leads via CSV or JSON.
- Clear leads only after explicit confirmation.

## Docs location
Core blueprints and operations docs live at repo root, with ADRs under `docs/adrs/`.
