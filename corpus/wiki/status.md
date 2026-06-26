# Status

_Last updated: 2026-06-26_

## Current state

Major refactor complete. Project is now an npm workspace monorepo with three
packages (`shared`, `be`, `fe`). MongoDB/Mongoose replaced with SQLite
(`better-sqlite3`). Mantine and Google OAuth removed. Full Stitch dark-theme
design applied via pure Tailwind v3. All frontend React pages and components
written. Backend controllers, routes, and polling engine complete.

## Area snapshot

| Area | State |
|---|---|
| Workspace structure | npm workspaces — packages/shared, be, fe |
| Shared types | `@apiwatchdog/shared` via TS path alias; no build step |
| Backend build | TypeScript 6.0.3, CommonJS, better-sqlite3 |
| Frontend build | Vite 6, React 19, Tailwind v3 — no Mantine |
| Database | SQLite (`data/watchdog.db`), 6 tables, uuid PKs |
| Auth | Email + password only — Google OAuth removed |
| Public dashboard | Bento grid, app cards, status badges, bug report modal |
| Dev dashboard | Auth-gated, filtered to user's apps |
| App detail dashboard | Summary stats, endpoint log bars, SVG uptime donut, reports |
| Login / Register | Glassmorphism card, gradient button, email+password form |
| Polling engine | Server-side setInterval, 10-log cap, updateAllAppsStatus() |
| Email notifications | Nodemailer 9, Gmail SMTP |
| Settings modal | Frequency + period selects → global poll interval |
| Stitch design | Applied — #131313 bg, Geist + JetBrains Mono, Material Symbols |
| ESLint | ESLint 9 flat config (`eslint.config.js`) on frontend |
| Corpus | Updated — architecture, decisions, open-questions all current |

## What's next (open ideas)

See [open-questions.md](open-questions.md) for unresolved design questions.
See `corpus/todos/` for captured task ideas.

## Recent changes

- 2026-06-26: Major refactor — npm workspaces, SQLite, Stitch design, no Mantine, no Google OAuth.
  All frontend components and pages written. Corpus updated.
- 2026-06-26: Initial corpus bootstrapped + package.json rebuild.
