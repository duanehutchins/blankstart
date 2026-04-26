# ADR 0003: Avoid backend for expo demo

## Status
Accepted

## Context
Network reliability is uncertain at expo venues.

## Decision
Use static web app with local persistence and client-side exports only.

## Consequences
No server dependency; requires manual export/import into downstream systems.

## Alternatives considered
Hosted backend sync (network fragility); hybrid offline queue+sync (extra complexity beyond MVP).
