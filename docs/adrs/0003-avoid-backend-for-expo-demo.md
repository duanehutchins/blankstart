# ADR 0003: Avoid backend for expo demo

## Status
Accepted

## Context
Network reliability cannot be assumed at expo venues.

## Decision
Use a static web app with local persistence and client-side export only.

## Consequences
- Pro: No operational dependency on servers.
- Con: No live CRM sync until manual export/import.
