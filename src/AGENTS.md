# src/AGENTS.md

<!-- wayfinder:next
  - path: src/README.md
    reason: source boundary map and authoritative files
  - path: QA_CHECKLIST.md
    reason: validation expectations after app changes
  - path: TECH_BLUEPRINT.md
    reason: architecture constraints
-->

## Inherited rules
Inherits root AGENTS rules; they remain mandatory.

## Local commands/checks
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run lint`

## Local constraints
- Keep business logic outside screen components where practical.
- Do not modify scoring/persona behavior unless explicitly requested.
- Keep lead persistence/export format backward-compatible.

## Non-goals
- No backend/API integrations.
- No unnecessary framework/tooling expansion.

## Escalation rules
Document any required behavioral divergence in `IMPLEMENTATION_NOTES.md` before code change.
