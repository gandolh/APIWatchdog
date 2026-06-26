---
title: Fix uptime donut at 0% renders a dot instead of empty ring
created: 2026-06-26
status: open
tags: [ui, svg]
---

# Fix uptime donut at 0% renders a dot instead of empty ring

## Context

`UptimeDonut.tsx` computes `arc = circumference * (uptime / 100)`. At 0%,
`arc = 0` and the `stroke-dasharray` collapses the colored arc to a dot.
The track circle (dark ring) should still be visible as a full empty ring.

Found in Playwright audit 2026-06-26 on the `httpstat.us/500` endpoint card
(F-05, `playwright/screenshots/TP-03-app-detail-staging.png`).

## Acceptance

At 0% uptime the donut shows a full empty dark ring with `0%` text in red.
At 100% uptime it shows a full green ring. Values between 0–100 show a partial arc.
