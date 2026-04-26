# TECH_BLUEPRINT.md

## Purpose
Specify technical architecture for a reliable booth-ready offline web demo.

## Audience
Engineers, reviewers, operators, and maintainers.

## Responsibilities
- Implement deterministic quiz logic and persona mapping.
- Persist leads and analytics with LocalStorage.
- Support CSV/JSON export and booth reset behaviors.

## Constraints
- Stack fixed to React + TypeScript + Vite + Tailwind CSS.
- No backend, no API, no runtime network dependency.
- LocalStorage and client-side exports only.

### Stack
React web, TypeScript, Vite, Tailwind CSS, react-router-dom, vitest.

### Architecture
- `src/data/`: immutable content and copy
- `src/features/quiz/`: scoring and persona mapping
- `src/lib/`: storage/export/validation helpers
- `src/pages/`: route-level screens
- `src/types/`: shared interfaces

### Data model
Question, Option, Answer, QuizSession, Persona, Lead, ExportEnvelope.

### Offline strategy
Bundle all content locally; avoid runtime fetches; degrade gracefully if LocalStorage is unavailable.

### Storage strategy
Use schema-versioned snapshot in LocalStorage; guard read/write and fallback safely on corruption.

### Export strategy
Generate CSV and JSON entirely client-side with timestamped filenames and metadata envelope for JSON.

### Risks
- LocalStorage blocked by browser policy
- Operator forgets to export before clearing
- Booth interruptions during user flow
