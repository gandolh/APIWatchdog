# Decisions

Locked tech and design choices. Don't relitigate these without an explicit
revisit + a `log.md` note. `decisions.md` beats `status.md` for any choice listed here.

## Workspace structure

- **npm workspaces** with three packages under `packages/`: `@apiwatchdog/shared`,
  `@apiwatchdog/be`, `@apiwatchdog/fe`. Root `package.json` defines workspace
  scripts (`dev:be`, `dev:fe`, `build`).
- **Exact/pinned versions** (no `^` or `~`) in all package.json files. Every
  upgrade must be a deliberate, explicit change.
- **Shared types via TypeScript path alias**, not a published or built package.
  Both `be` and `fe` tsconfigs point `@apiwatchdog/shared` at `../shared/src/index.ts`.
  Vite alias mirrors this for the frontend bundler.

## Database

- **SQLite via `better-sqlite3` (sync API)**. Replaced MongoDB/Mongoose.
  DB file: `data/watchdog.db` (created at first run, relative to `packages/be`).
  WAL mode + foreign keys enabled on every connection.
- **`uuid` v4** for all primary keys (TEXT columns, not auto-increment).
- **6 tables**: apps, endpoints, logs, reports, users, user_apps.
- **Logs capped at 10 per endpoint** server-side — oldest deleted when count exceeds 10.

## Auth

- **Email + password only.** Google OAuth removed from implementation.
  See [open-questions.md](open-questions.md) for the Google OAuth TODO.
- **bcrypt 6 sync** (`hashSync` / `compareSync`) — consistent with the synchronous
  better-sqlite3 API in controllers.
- **No JWT, no server-side sessions.** Auth state lives in `localStorage` +
  React Context (`useAuth()`). Backend trusts the email in request bodies.
  Intentional for simplicity; not suited for adversarial environments.

## Frontend stack

- **React 19 + Vite 6 + React Router v7** (BrowserRouter, nested layout via `<Outlet>`).
- **Tailwind v3 (3.4.19) only — no Mantine.** Mantine was removed in the Stitch
  design refactor. Pure Tailwind utilities + custom design tokens.
- **Stitch design system** applied: background `#131313`, primary `#adc6ff`,
  secondary `#d0bcff`, tertiary `#4fdbc8`, error `#ffb4ab`. All tokens are in
  `packages/fe/tailwind.config.js`.
- **Geist** (UI font) + **JetBrains Mono** (code/labels) via Google Fonts.
- **Material Symbols Outlined** icon font (variable, weight 300) via Google Fonts.
  Icons rendered as `<span class="material-symbols-outlined">name</span>`.
  No icon component library needed.
- **`@tabler/icons-react`** kept as a dev dep but no longer the primary icon system.
- **No `.js` extension suffixes** on TypeScript imports in the frontend (Vite/bundler
  moduleResolution handles this).

## Backend stack

- **Express 5** (no `body-parser` — built-in `express.json()` + `express.urlencoded()`).
- **TypeScript 6.0.3** strict mode on all packages. `ignoreDeprecations: "6.0"` +
  `moduleResolution: "node10"` in the backend tsconfig.
- **`rootDir: ".."` + `include: ["src", "../shared/src"]`** in `packages/be/tsconfig.json`
  to allow the shared path alias to resolve without rootDir violations.
- **Nodemailer 9** for Gmail SMTP email (env-driven: `MAIL_USER`, `MAIL_PASS`).
- **ESLint 9 flat config** (`eslint.config.js`) on the frontend. `.eslintrc.cjs` removed.

## Status color system

- `Stable` → green `#74c69d`, `Unstable` → orange `#f4a261`, `Down` → red `#ffb4ab`.
- `StatusBadge.tsx` renders a pill badge. `statusColor()` / `statusIcon()` helpers
  return inline style values and Material Symbols icon names respectively.
- Status is also animated: Stable badge has a pulsing green dot.

## Endpoint identity

- An endpoint's URL is stored as its `name` field in both the DB and shared types.
- `lastSegment(url)` strips to the last path fragment for display.

## Polling model

- Polling runs **server-side only**, single global `setInterval` (default 60 s).
- Global interval is set via `POST /api/setInterval`.
- `user.frequency` (seconds) and `user.period` (hours) are stored per-user and
  surfaced in the Settings modal, but per-user polling is not yet implemented
  (see [open-questions.md](open-questions.md)).

## Package versions (pinned, as of 2026-06-26)

Key pins: `react@19.2.7`, `react-dom@19.2.7`, `react-router-dom@7.18.0`,
`tailwindcss@3.4.19`, `vite@6.3.5`, `typescript@6.0.3`, `express@5.2.1`,
`better-sqlite3@12.11.1`, `uuid@14.0.1`, `bcrypt@6.0.0`, `nodemailer@9.0.1`,
`axios@1.18.1`, `recharts@3.9.0`.
