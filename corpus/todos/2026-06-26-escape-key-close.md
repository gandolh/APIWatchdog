---
title: Add Escape key support to Modal and mobile drawer
created: 2026-06-26
status: open
tags: [a11y, ux, keyboard]
---

# Add Escape key support to Modal and mobile drawer

## Context

Neither `Modal.tsx` nor the mobile drawer in `Sidebar.tsx` respond to the
Escape key. Only backdrop click and the ✕ button close them. This violates
keyboard navigation expectations (WCAG 2.1 SC 2.1.2 No Keyboard Trap).

Found in Playwright audit 2026-06-26 (F-08, F-09).

## What to do

- `Modal.tsx`: add `useEffect` with `keydown` listener for `key === 'Escape'`
  that calls `onClose()`. Remove listener on unmount.
- `Sidebar.tsx` mobile drawer: same pattern, call `setMobileOpen(false)`.

## Acceptance

Pressing Escape while a modal is open closes it. Pressing Escape while the
mobile drawer is open closes it. No focus escapes to the underlying page while
a modal is open.
