# ADR 0001: Use LocalStorage for offline lead capture

## Status
Accepted

## Context
Expo booth operations require offline lead capture with no backend dependency.

## Decision
Persist leads and analytics in LocalStorage with schema versioning and guarded parsing.

## Consequences
- Pro: Works offline and is simple to operate.
- Con: Subject to browser storage availability and device-level clearing.
