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
