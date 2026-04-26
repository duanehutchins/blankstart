# AGENTS.md

<!-- wayfinder:next
  - path: src/AGENTS.md
    reason: source-code boundary rules and local checks
  - path: docs/AGENTS.md
    reason: documentation/ADR boundary rules
  - path: .vibe/README.md
    reason: operational plan/packet/review artifacts
  - path: .vibe/projects/xerge-expo-demo/plan.yaml
    reason: active project plan and status
  - path: QA_CHECKLIST.md
    reason: required manual QA checks
-->

## Non-negotiable repo rules
- Do not change quiz scoring/personas/content unless explicitly requested.
- Do not add backend/network runtime dependencies.
- Preserve offline lead capture/export behavior.
- Keep Wayfinder signposts valid and path-resolvable.

## Boundary policy
- Root rules apply to all files unless overridden by deeper AGENTS.md.
- Major boundaries are `src/`, `docs/`, and `.vibe/`.
- Add new boundary signposts only when local execution rules differ.

## Escalation rules
- If requested behavior conflicts with existing constraints, document in `IMPLEMENTATION_NOTES.md` before diverging.
- If a required path/signpost is missing, stop and repair signposts before feature work.

## Required checks
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run lint`
- `npm run wayfinder:check`

## Inheritance guidance
- `src/AGENTS.md` refines app-code constraints.
- `docs/AGENTS.md` refines documentation/ADR requirements.
- `.vibe/README.md` and project packet artifacts define current operational workflow.
