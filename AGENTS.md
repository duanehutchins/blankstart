# AGENTS.md

<!-- wayfinder:next
  - path: README.md
    reason: project intent and operator-level usage
  - path: repo_index.yaml
    reason: machine-readable repo map
  - path: QA_CHECKLIST.md
    reason: required validation steps before completion
-->

## Setup commands
- `npm install`
- `npm run dev`

## Build/test/lint/typecheck commands
- `npm run build`
- `npm run test`
- `npm run lint`
- `npm run typecheck`

## Coding constraints
- Use React + TypeScript + Vite + Tailwind.
- Keep logic out of UI components where practical.
- Keep quiz content in `src/data/`.
- Keep dependencies minimal and avoid runtime network requirements.

## Documentation expectations
- Keep root docs updated when behavior changes.
- Update `IMPLEMENTATION_NOTES.md` for deviations and known limits.
- Keep ADRs current for architectural decisions.

## Scope rules
- No backend or API requirement.
- No Expo/React Native Web/AsyncStorage.
- No service worker/PWA caching unless explicitly requested.

## Wayfinder expectations
- Preserve machine-readable wayfinder blocks in required signposts.
- Avoid adding nested signposts unless local execution rules differ.
