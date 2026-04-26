# QA_CHECKLIST.md

## Purpose
Provide a repeatable manual verification checklist for expo readiness.

## Audience
Engineers, QA reviewers, and booth operators.

## Responsibilities
Validate end-to-end behavior, offline reliability, data durability, and export correctness.

## Constraints
Checks must be executable without network and without backend services.

| Check | Steps | Expected result |
|---|---|---|
| Manual happy path | Start from idle, complete all 5 questions, submit lead with consent | Persona shown, lead submitted, thank-you shown |
| Offline test | Disable network in browser, reload, run full flow | Full flow still works |
| LocalStorage test | Capture lead, refresh app, open admin | Lead persists and appears in admin |
| Export test CSV | Click Export CSV and open file | File downloads with escaped values and headers |
| Export test JSON | Click Export JSON and inspect file | Includes schemaVersion, exportedAt, recordCount, records |
| Reset test auto | Complete flow to thank-you, wait for timer | Returns to idle automatically |
| Reset test manual | Use admin Reset Active Session | Active flow clears, leads remain |
| Responsive test | Check laptop and tablet widths | Layout remains readable and touch-friendly |
| Accessibility baseline | Keyboard nav through CTA, options, form, and admin buttons | Interactive controls are reachable and visibly focused |
