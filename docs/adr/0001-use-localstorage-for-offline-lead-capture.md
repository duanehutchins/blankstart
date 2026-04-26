# ADR 0001: Use LocalStorage for offline lead capture

## Status
Accepted

## Context
Expo booth operations require offline lead capture with no backend dependency.

## Decision
Persist leads and analytics in LocalStorage with schema versioning and guarded parsing.

## Consequences
Works offline and is simple to operate, but data depends on browser storage availability.

## Alternatives considered
Temporary in-memory storage (would lose data on refresh); backend API capture (breaks offline requirement).
