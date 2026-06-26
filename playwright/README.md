# Playwright Hub — WatchDog UI Testing

This file is the **how-to-run** reference for all UI test plans.
Test plans (what to test) live in [corpus/test-plans/](../corpus/test-plans/index.md).

---

## Bring up the test app

The app is two processes: the Express backend (port **3001** for testing) and the
Vite frontend dev server (port **5173** by default).

### 1. Install dependencies (once)

```powershell
cd d:\projects\APIWatchdog
npm install
```

### 2. Start the backend on a test port with a throwaway DB

```powershell
# From repo root
$env:PORT = "3001"
$env:DB_PATH = "data/test-watchdog.db"
npm run dev:be
```

Or use the helper script (starts backend on port 3001 with a seeded test DB):

```powershell
node playwright/scripts/seed-and-start.mjs
```

### 3. Start the frontend

```powershell
# In a second terminal, from repo root
npm run dev:fe
```

Frontend is at **http://localhost:5173**. It points to `VITE_API_URL` (defaults to
`http://localhost:3000`). For tests, set it to 3001:

```powershell
$env:VITE_API_URL = "http://localhost:3001"
npm run dev:fe
```

### 4. Verify health

```powershell
Invoke-WebRequest http://localhost:3001/ | Select-Object -ExpandProperty Content
# Expected: "WatchDog API"
```

---

## Fixtures (seeded test data)

The seed script creates:

| Entity | Value |
|---|---|
| User email | `test@watchdog.dev` |
| User password | `password123` |
| User username | `testuser` |
| App 1 | `Production API` — endpoints: `https://httpstat.us/200`, `https://httpstat.us/500` |
| App 2 | `Staging API` — endpoint: `https://httpstat.us/200` |

> These apps use `httpstat.us` which returns the status code you pass. No real
> services are hit; no metered APIs are involved. Cost: $0 per run.

---

## Routes

| URL | Screen |
|---|---|
| `/` | Public Dashboard — all apps grid |
| `/login` | Login / Register page |
| `/devdash` | Dev Dashboard — user's own apps (requires login) |
| `/pubdash/:appId` | App Detail Dashboard — logs, donut, reports |

---

## Conventions

- **Screenshot naming**: `screenshots/<plan-id>-<step>.png`
  e.g. `screenshots/TP-01-login-form.png`, `screenshots/TP-02-dashboard-loaded.png`
- **Selectors**: prefer CSS/role over snapshot `[ref=…]` IDs (refs churn).
  Use `input[placeholder="…"]`, `button:has-text("…")`, `.material-symbols-outlined`.
- **State reset**: delete `data/test-watchdog.db` and re-run the seed script between runs.
- **Console noise**: Vite HMR messages and `[vite] connected` are benign. Ignore them.
- **No live mail**: `MAIL_USER` / `MAIL_PASS` are unset in test mode — Nodemailer will
  fail silently on bug report emails. This is expected.

---

## Tear down

```powershell
# Stop both dev servers (Ctrl+C in each terminal)
# Delete throwaway DB
Remove-Item "d:\projects\APIWatchdog\data\test-watchdog.db" -ErrorAction SilentlyContinue
# Move screenshots out of repo root (MCP tool drops them at root)
Get-ChildItem "d:\projects\APIWatchdog\*.png" | Move-Item -Destination "d:\projects\APIWatchdog\playwright\screenshots\"
# Remove MCP scratch dir
Remove-Item "d:\projects\APIWatchdog\.playwright-mcp" -Recurse -Force -ErrorAction SilentlyContinue
```
