# IMPLEMENTATION_NOTES.md

## Purpose
Track implementation decisions, deviations, known limitations, and verification status.

## Audience
Maintainers, reviewers, and future AI contributors.

## Responsibilities
Provide transparent engineering context and risk visibility.

## Constraints
Record deviations before implementing them.

## Decisions made
- Used React + TypeScript + Vite + Tailwind per approved constraints.
- Implemented deterministic scoring with score-range persona mapping.
- Used LocalStorage snapshot with schema versioning and corruption fallback for leads and analytics.
- Added hidden admin route `/admin` and keyboard shortcut (`Ctrl+Shift+A`).
- Removed mid-quiz resume persistence so refresh always returns to idle state for booth reliability.
- Removed legacy binary hero asset (`src/assets/hero.png`) to keep diffs and patching reliable in the Codex workflow.
- Moved visible countdown state into `ThankYouScreen` with interval cleanup.

## Deviations from plan
- Disabled active session persistence intentionally to simplify booth behavior and avoid stale-session recovery issues.

## Known limitations
- BrowserRouter route reload behavior depends on local server fallback configuration.
- LocalStorage can be disabled by strict browser privacy settings.

## Verification performed
- Implemented unit tests for scoring, validation, CSV, JSON, and storage wrapper.
- Build, lint, typecheck, and test commands executed.

## Remaining risks
- Operator may forget end-of-day export without runbook adherence.
- On shared devices, local data can be manually cleared outside app controls.
