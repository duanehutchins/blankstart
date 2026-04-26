# EXPO_RUNBOOK.md

## Purpose
Define booth operation steps for reliable day-of-demo execution.

## Audience
Duane and booth staff.

## Responsibilities
Start app, run visitor flow, export leads safely, and recover from common issues.

## Constraints
Must work without Wi-Fi or backend support.

## Pre-event setup
1. Charge demo device and disable sleep if possible.
2. Run `npm install` and `npm run build` ahead of event.
3. Launch with `npm run dev` (or serve build) and verify idle screen.

## How to start the app
Open local URL and keep device on root challenge route (`/`).

## Reset between visitors
- Auto-reset happens after thank-you countdown.
- Manual reset available via admin screen.

## Access admin/export
- Go to `/admin`, or press `A`.

## Export leads
- In admin, click Export CSV or Export JSON.
- Confirm file downloaded before clearing data.

## Clear leads safely
- Only clear after backup/export verification.
- Use "Clear Leads (Confirm)" and accept confirmation prompt.

## If Wi-Fi fails
Continue normally; the demo is offline-first and does not require internet.

## If LocalStorage fails
Use app as educational experience; note capture limitation and gather leads manually.

## End-of-day export checklist
1. Export CSV and JSON.
2. Open files to confirm record count > 0 if leads were captured.
3. Store files securely.
4. Clear leads only after backup verification.
