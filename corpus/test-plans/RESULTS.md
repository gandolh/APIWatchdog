# Test Results — 2026-06-26

Run against: http://localhost:5173 (fe) / http://localhost:3000 (be)
Fixtures: seed.cjs — user test@watchdog.dev, Production API + Staging API

## Summary

| Plan | Result | Notes |
|---|---|---|
| TP-01 Auth | PASS w/ findings | Login, register toggle, invalid creds, error message, password toggle all work |
| TP-02 Public Dashboard | PASS | Apps grid, status badges, Create App, Dev Dashboard all work |
| TP-03 App Detail | PASS | Log bars, donut, add endpoint, mark fixed all work |
| TP-04 UI/UX Audit | PASS w/ findings | Design fidelity good; 4 minor issues found |

## Evidence (screenshots)

All in `playwright/screenshots/` (gitignored):
- `TP-01-login-page.png` — login form initial state
- `TP-01-invalid-credentials.png` — inline error on bad login
- `TP-02-dashboard-authenticated.png` — public dashboard after login
- `TP-02-dev-dashboard.png` — my apps filtered view
- `TP-03-app-detail-staging.png` — production API detail: log bars, donuts, report
- `TP-03-mark-fixed.png` — report marked fixed, counter 1→0
- `TP-03-add-endpoint.png` — 201 endpoint added, 3rd card appears
- `TP-04-desktop-authed.png` — 1280px desktop with auth rehydration fix applied
- `TP-04-mobile-375.png` — 375px 1-column layout
- `TP-04-mobile-drawer.png` — mobile hamburger drawer open
- `TP-04-login-audit.png` — login page design audit

## Findings

| ID | Sev | Description | Component | Filed |
|---|---|---|---|---|
| F-01 | Info | httpstat.us rate-limits during polling — seeded Stable status gets overwritten to DOWN quickly. Test fixture issue, not a bug. | updateLogs.ts | — |
| F-02 | Info | "201" endpoint httpstat.us shows UNSTABLE after polling (correct live behavior, not a bug) | updateLogs.ts | — |
| F-03 | 2 | DB path hardcoded via `__dirname` resolves to `packages/be/data/` not repo-root `data/` — seed scripts must target the correct path | db.ts | corpus/todos |
| F-04 | 3 | **Auth not rehydrated from localStorage on page load/refresh** — `useState(null)` ignores stored session | AuthContext.tsx | FIXED in session |
| F-05 | 1 | SVG donut at 0% renders a single dot instead of a visible empty ring | UptimeDonut.tsx | corpus/todos |
| F-06 | 2 | Gradient buttons (Add New App, Secure Login) render solid purple instead of blue→purple gradient — inline `style` background overridden by Tailwind reset | Sidebar.tsx, Login.tsx | corpus/todos |
| F-07 | 3 | Auth state lost across Playwright viewport resize (confirmed root cause: F-04, now fixed) | AuthContext.tsx | FIXED in session |
| F-08 | 1 | Mobile drawer Escape key does not close — only backdrop click and ✕ button work | Sidebar.tsx | corpus/todos |
| F-09 | 1 | Modal (AddAppModal etc.) Escape key does not close — only backdrop click and ✕ button work | Modal.tsx | corpus/todos |
| F-10 | Info | Login page redirects to `/` when already authenticated (expected behavior) | Login.tsx | — |

## Contrast audit (WCAG)

| Pairing | Ratio | Result |
|---|---|---|
| Body text `#e4e2e1` on bg `#131313` | 14.39:1 | AAA ✓ |
| Muted nav text `#938f99` on sidebar `#0e0e0e` | 6.09:1 | AA ✓ |
| Primary `#adc6ff` on active nav `#4f378b` | 5.46:1 | AA ✓ |

## Bugs fixed during run

- **F-04 / F-07**: `AuthContext.tsx` — `useState(null)` → `useState(getStoredUser)` to rehydrate from localStorage on mount.
- **Shared index.ts**: Removed `.js` extensions from re-exports (broke CommonJS ts-node).
- **Shared package.json**: Removed `"type": "module"` (broke CJS require of shared types).
- **DB path bug**: `packages/be/data/watchdog.db` is the correct path; seed scripts and docs updated.
