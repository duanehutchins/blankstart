# src/README.md

<!-- wayfinder:next
  - path: AGENTS.md
    reason: local source boundary constraints
  - path: App.tsx
    reason: main flow orchestration and routing
  - path: data/questions.ts
    reason: quiz content authority
  - path: lib/storage.ts
    reason: persistence authority
-->

## Purpose
Contains all runtime app source code.

## Why it exists
Separate product behavior from docs/operations layers.

## Contents map
- `App.tsx`, `main.tsx` — app shell and routing bootstrap.
- `pages/` — route-level screens.
- `data/` — quiz/persona/copy content.
- `features/quiz/` — deterministic scoring logic.
- `lib/` — storage/export/validation/time/id helpers.
- `types/` — shared interfaces.

## Authoritative local files
- `data/questions.ts`, `data/personas.ts`
- `features/quiz/scoring.ts`
- `lib/storage.ts`, `lib/exportCsv.ts`, `lib/exportJson.ts`

## Next steps
For code changes, read `src/AGENTS.md` first, then relevant local files above.
