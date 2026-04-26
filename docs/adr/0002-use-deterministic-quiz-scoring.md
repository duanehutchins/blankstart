# ADR 0002: Use deterministic quiz scoring

## Status
Accepted

## Context
The demo must be reliable and explainable without API calls.

## Decision
Assign fixed option scores and map total score ranges to personas.

## Consequences
Behavior is transparent and testable; less adaptive than model-based scoring.

## Alternatives considered
LLM-driven dynamic scoring (non-deterministic, network dependency); manual operator interpretation (inconsistent).
