# Architecture

## Workspace layout (npm workspaces)

```
/
  package.json            workspace root — scripts: dev:be, dev:fe, build
  packages/
    shared/               @apiwatchdog/shared — TypeScript types only, no build step
    be/                   @apiwatchdog/be     — Express 5 API + SQLite
    fe/                   @apiwatchdog/fe     — React 19 SPA
  data/
    watchdog.db           SQLite database (created at runtime)
  corpus/                 this wiki
```

Shared types are consumed via TypeScript path aliases (`@apiwatchdog/shared →
../shared/src/index.ts`) in both `be` and `fe` tsconfigs. No build step is needed
for the shared package.

## Backend (`packages/be/`)

```
src/
  app.ts                  Express 5 app setup, cors, json, urlencoded, route mounting,
                          startPolling(60) on boot, POST /api/setInterval
  config/
    db.ts                 better-sqlite3 init — WAL + FK pragmas, creates all tables on
                          first run, returns the singleton DB instance
  controllers/
    appController.ts      Fully synchronous SQLite CRUD — apps, endpoints, logs, reports.
                          updateAllAppsStatus() recomputes all app/endpoint statuses from
                          the last 10 logs after each poll cycle.
    userController.ts     Synchronous bcrypt (compareSync/hashSync), user CRUD,
                          user_apps join table management.
  routes/
    app.ts                /api/app/* routes
    user.ts               /api/user/* routes
  utils/
    mail.ts               Nodemailer 9 Gmail transporter
    updateLogs.ts         Async polling engine — fetch() per endpoint, insert log, trim to
                          10 logs, then updateAllAppsStatus(). startPolling(seconds) wraps
                          it in a setInterval.
```

### SQLite schema (6 tables)

```
apps         (id TEXT PK, appName TEXT, status TEXT)
endpoints    (id TEXT PK, appId TEXT FK→apps, name TEXT, status TEXT)
logs         (id TEXT PK, endpointId TEXT FK→endpoints, response INTEGER, time TEXT)
reports      (id TEXT PK, appId TEXT FK→apps, endpoint TEXT, state TEXT,
              message TEXT, fixed INTEGER DEFAULT 0)
users        (id TEXT PK, username TEXT, email TEXT UNIQUE, password TEXT,
              update_interval INTEGER DEFAULT 60)
user_apps    (userId TEXT FK→users, appId TEXT FK→apps, PK(userId,appId))
```

All PKs are `uuid` v4 strings. `better-sqlite3` synchronous API — no async/await
in controllers. Logs capped at 10 per endpoint (oldest deleted on insert when count > 10).

### Polling engine (`updateLogs.ts`)

Interval default: 60 s. Each tick via `Promise.allSettled`:

1. Fetch all apps + endpoints from SQLite.
2. For each endpoint: `fetch(endpoint.name)` → insert log (HTTP status + ISO timestamp).
3. Trim logs: DELETE oldest rows when count > 10.
4. After all settled: `updateAllAppsStatus()` — recomputes endpoint status (Stable /
   Unstable / Down) and app status from last 10 logs.

## Frontend (`packages/fe/`)

```
src/
  main.tsx                createRoot, StrictMode
  App.tsx                 BrowserRouter, AuthProvider, route tree
  api/
    client.ts             axios instance (baseURL from VITE_API_URL or localhost:3000)
    auth.ts               login(), register(), getStoredUser(), storeUser(), clearUser()
    apps.ts               getAllApps(), getUserApps(), createApp(), addAppToUser(),
                          addEndpointToApp(), getAppWithLogs(), createBugReport(),
                          markReportFixed(), setPollingInterval()
  components/
    auth/
      AuthContext.tsx      IUser | null state, AuthProvider, useAuth()
      Login.tsx            Glassmorphism card — email+password only (no Google OAuth)
    shared/
      MainLayout.tsx       Outlet wrapper with 240px sidebar offset
      Sidebar.tsx          Fixed 240px desktop nav + mobile drawer; Add App, Settings
      Modal.tsx            Reusable dialog backdrop
      AddAppModal.tsx      Create app + associate to user
      SettingsModal.tsx    Frequency + period selects → setPollingInterval()
    publicDashboard/
      PublicDashboard.tsx  Bento grid of all apps
      AppCard.tsx          Status badge + top-3 endpoints + bug report trigger
      StatusBadge.tsx      Pill badge (Stable/Unstable/Down) + helpers statusIcon/statusColor
      BugReportModal.tsx   File a bug report against an endpoint
    devDashboard/
      DevDashboard.tsx     Same grid filtered to currentUser's apps
    individualDashboard/
      AppDashboard.tsx     Summary stats + endpoints grid + reports list
      EndpointLogBars.tsx  Colored h-3 bars per log (green/orange/red by HTTP status)
      UptimeDonut.tsx      SVG donut chart — uptime % per endpoint
      AddEndpointModal.tsx Add a URL endpoint to an app
```

### Route tree

```
/login                  <Login> (no layout)
/                       <MainLayout>
  index                 <PublicDashboard>
  devdash               <DevDashboard>
  pubdash/:appId        <AppDashboard>
*                       redirect to /
```

### Design system

Pure Tailwind v3 — no Mantine. Custom tokens in `tailwind.config.js` map directly
from the Stitch design file: background #131313, surface layers, primary #adc6ff,
secondary #d0bcff, tertiary #4fdbc8, error #ffb4ab. Typography scale uses Geist
(UI) and JetBrains Mono (code/labels). Material Symbols Outlined icon font via
Google Fonts (variable font, weight 300).

## Dependency direction

```
Browser (React SPA, Vite dev / dist)
  └─ HTTP (axios → localhost:3000 or VITE_API_URL)
Express 5 API (packages/be)
  └─ better-sqlite3
SQLite file (data/watchdog.db)

Both be and fe import types from:
packages/shared/src/index.ts  (TypeScript path alias, not a built package)
```
