# Log

## [2026-06-26] maintenance | Corpus bootstrapped

Initial corpus skeleton created: CLAUDE.md, index.md, log.md, and full wiki
spine (overview, architecture, decisions, status, open-questions). Content
seeded from a full read of the frontend and backend source as of this date.
Also recorded: package.json rebuild to latest stable versions (React 19, Mantine 9,
Express 5, ESLint 9 flat config), all breaking changes fixed, build passing.

## [2026-06-26] done | Major refactor — npm workspaces, SQLite, Stitch design

Completed full refactor of APIWatchdog. Key changes landed:

- **npm workspaces**: project split into `packages/shared`, `packages/be`, `packages/fe`.
- **Shared types**: `@apiwatchdog/shared` consumed via TypeScript path alias — no build step.
- **SQLite**: MongoDB/Mongoose replaced with `better-sqlite3` (sync API). 6 tables with uuid PKs. `data/watchdog.db`.
- **Auth**: Google OAuth removed. Email+password only (bcrypt 6 sync). Google OAuth preserved as open-question TODO.
- **Frontend**: Mantine removed entirely. Pure Tailwind v3 + Stitch design tokens (#131313 bg, Geist + JetBrains Mono + Material Symbols Outlined).
- **Pages written**: Login (glassmorphism), PublicDashboard (bento grid), DevDashboard (user-filtered), AppDashboard (log bars + SVG uptime donut + reports).
- **Components**: Sidebar (240px fixed desktop + mobile drawer), Modal, AddAppModal, SettingsModal, StatusBadge, AppCard, BugReportModal, AddEndpointModal, EndpointLogBars, UptimeDonut.
- **API layer**: `packages/fe/src/api/` — client.ts, auth.ts, apps.ts.
- **ESLint 9 flat config** on frontend (`eslint.config.js`).
- **TypeScript 6.0.3** strict + `ignoreDeprecations: "6.0"` + `moduleResolution: "node10"` across all packages.
- Corpus updated: architecture.md, decisions.md, status.md, open-questions.md all rewritten to reflect actual state.

## [2026-06-26] ingest | Playwright UI audit — 4 plans run, 3 bugs fixed, 3 todos filed

Test infrastructure scaffolded: `playwright/` hub + `corpus/test-plans/` (TP-01 to TP-04).
Seed script: `playwright/scripts/seed.cjs` (targets `packages/be/data/watchdog.db`).

**Bugs fixed during run:**
- `AuthContext.tsx`: `useState(null)` → `useState(getStoredUser)` — auth now rehydrates from localStorage on mount (was lost on every page reload/resize).
- `packages/shared/src/index.ts`: removed `.js` extensions from re-exports (broke CommonJS ts-node).
- `packages/shared/package.json`: removed `"type": "module"` (caused ERR_REQUIRE_ESM when backend imported shared types).

**Todos filed:**
- `corpus/todos/2026-06-26-fix-gradient-buttons.md` — gradient buttons rendering as solid purple (F-06).
- `corpus/todos/2026-06-26-fix-donut-zero-state.md` — 0% donut shows dot not empty ring (F-05).
- `corpus/todos/2026-06-26-escape-key-close.md` — Escape key doesn't close modals or mobile drawer (F-08, F-09).

**Contrast audit**: all pairings pass WCAG AA/AAA. Full results in `corpus/test-plans/RESULTS.md`.

## [2026-06-26] maintenance | Project structure reorganised + design integrated into corpus

- Removed legacy `frontend/`, `backend/`, `testAPI/` directories (superseded by `packages/`).
- Removed `stitch_watchdog_api_monitoring_dashboard.zip` (already extracted).
- Removed root `data/` dir (backend uses `packages/be/data/`).
- Moved `stitch_design/` → `corpus/design/` so Stitch HTML/PNG/DESIGN.md files are part of the corpus.
- Added `corpus/wiki/design.md` — synthesises color tokens, typography, spacing, screen inventory, and known deviations.
- Updated `corpus/index.md` with design section, test plans section, and todos table.
