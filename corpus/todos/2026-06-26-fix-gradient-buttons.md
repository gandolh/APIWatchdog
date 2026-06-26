---
title: Fix gradient buttons rendering as solid purple
created: 2026-06-26
status: open
tags: [ui, css, tailwind]
---

# Fix gradient buttons rendering as solid purple

## Context

Inline `style={{ background: 'linear-gradient(...)' }}` on buttons is being
overridden by Tailwind's base reset or a conflicting utility class.
Affected: "Add New App" in `Sidebar.tsx`, "Secure Login" in `Login.tsx`,
"Add Endpoint" in `AddEndpointModal.tsx`. All appear as solid purple (#4f378b
approximation) rather than the intended blue→purple gradient.

Found during Playwright audit 2026-06-26 (F-06, `playwright/screenshots/TP-04-desktop-authed.png`).

## Acceptance

Gradient buttons show a visible left-to-right blue→purple gradient matching
`linear-gradient(90deg, #4d8eff, #571bc1)` on all affected components.
