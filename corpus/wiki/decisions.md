# Decisions

Locked tech and design choices. Don't relitigate these without an explicit
revisit + a `log.md` note.

## Stack

- **React 19 + Mantine 9** for the frontend UI. Mantine is the component system;
  Tailwind v3 fills gaps (responsive grid, status colors). The two coexist — Mantine
  handles complex components (modals, selects, charts), Tailwind handles layout
  and color utilities.
- **Vite 6** as the frontend build tool.
- **React Router v7** for client-side routing (createBrowserRouter, index routes,
  nested layout via `<Outlet>`).
- **Express 5** for the backend API. `body-parser` is removed — Express 5 has
  `express.json()` and `express.urlencoded()` built in.
- **Mongoose 8** for MongoDB ODM. Database name: `API-Watchdog`.
- **Nodemailer 9** for email (Gmail SMTP via env vars). `@types/nodemailer` still
  needed as a dev dep.
- **bcrypt 6** for password hashing. Wrapper in `backend/src/utils/bCrypt.ts`.
- **ESLint 9 flat config** (`eslint.config.js`). The old `.eslintrc.cjs` format
  is gone. `typescript-eslint` v8 + `eslint-plugin-react-hooks` v5 + `eslint-plugin-react-refresh` v0.5.
- **TypeScript 5.8** on both frontend and backend.
- **`@react-oauth/google`** for Google OAuth on the frontend. No server-side
  Google token verification — the frontend fetches userinfo directly and trusts it.
- **`@tabler/icons-react`** as the icon set.

## Auth model

- No JWT, no server-side sessions. Auth state lives in `localStorage` +
  React Context. The backend trusts the email sent in the request body.
  Intentional for simplicity; not suited for adversarial environments.

## Polling model

- Polling runs **server-side** only (in `updateLogs.ts`), not per-user.
  The global interval is set via `POST /api/setInterval`.
- Per-user `updateInterval` exists in the User model but is not yet wired to
  control the server polling interval per-user. The single global interval
  is what actually fires.
- Logs are capped at **10 per endpoint** server-side (sliding window, oldest dropped).

## Frontend status color system

- `Stable` → green, `Unstable` → yellow, `Down` → red.
- Implemented via Tailwind utility classes in `ColoredStatus.tsx`. Not Mantine
  color tokens. This is intentional — status must be immediately legible.

## Endpoint identity

- An endpoint's URL is stored as its `name` field (both in the DB and frontend types).
  `extractLastPathFragment()` strips the URL to just the last path segment for display.

## Type duplication

- Frontend and backend have separate type definitions for the same entities
  (e.g. `IApp.ts` frontend vs `app.ts` backend types). No shared package.
  Accepted trade-off for repo simplicity.

## Package versions (as of 2026-06-26)

All packages rebuilt from scratch to latest stable. See `frontend/package.json`
and `backend/package.json` for pinned ranges. Summary of major versions bumped:
React 18→19, Mantine 7→9, React Router 6→7, Recharts 2→3, Vite 5→6,
Express 4→5, Nodemailer 6→9, ESLint 8→9.
