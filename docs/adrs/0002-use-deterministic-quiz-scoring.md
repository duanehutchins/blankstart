# ADR 0002: Use deterministic quiz scoring

## Status
Accepted

## Context
The demo must be reliable and explainable without any API calls.

## Decision
Assign fixed option scores and map total score ranges to personas.

## Consequences
- Pro: Fast, transparent, testable behavior.
- Con: Less adaptive than model-based scoring.
