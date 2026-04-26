# docs/AGENTS.md

<!-- wayfinder:next
  - path: README.md
    reason: docs boundary overview
  - path: adr/
    reason: canonical ADR directory
  - path: ../IMPLEMENTATION_NOTES.md
    reason: implementation deviations and verification
-->

## Inherited rules
Root AGENTS rules apply.

## Local commands/checks
- `npm run wayfinder:check`
- `npm run lint`

## Local constraints
- ADRs must include: Title, Status, Context, Decision, Consequences, Alternatives considered.
- Keep paths aligned to canonical `docs/adr/` directory.

## Non-goals
- Do not store runtime app logic in docs boundary.

## Escalation rules
If ADR structure/path requirements conflict with existing references, update references atomically.
