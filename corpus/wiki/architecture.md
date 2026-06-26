# Architecture

## Backend (`backend/`)

```
src/
  app.ts                  Entry point — Express app setup, middleware, server start,
                          polling interval kick-off
  config/
    dbConnection.ts       Mongoose connect to MongoDB ("API-Watchdog" db)
  models/
    app.ts                Mongoose model for App (appName, status, endpoints[], reports[])
    user.ts               Mongoose model for User (username, email, password, apps[], updateInterval)
  controllers/
    appController.ts      CRUD + log/report logic for Apps
    userController.ts     Auth (login/register), user-app associations, interval setting
  routes/
    app.ts                /api/app/* — all app-related endpoints
    user.ts               /api/user/* — auth + user management
  types/                  TypeScript interfaces (iApp, iEndpoint, iLog, iReport, iUser, Status)
  utils/
    bCrypt.ts             hashPassword / comparePassword wrappers
    mail.ts               Nodemailer transporter (Gmail SMTP, env-driven)
    updateLogs.ts         The polling engine — setInterval loop that fetches every endpoint
```

### Polling engine (`updateLogs.ts`)

The core loop runs server-side on a configurable interval (default 60s, user-adjustable
via `POST /api/setInterval`). Each tick:

1. Fetch all apps from MongoDB.
2. For each app → for each endpoint: `fetch(endpoint.name)` (the URL is stored as `name`).
3. Push the HTTP status code + timestamp as a new `iLog` onto `endpoint.logs`.
4. Sort logs by time, **keep only the last 10**.
5. Derive endpoint status: all-200/302 → Stable; some bad → Unstable; all bad (10/10) → Down.
6. Derive app status from endpoint statuses; if any open (unfixed) report exists and the
   app would be Stable, bump to Unstable.
7. `Apps.updateOne` with the new state.

**Important:** logs are capped at 10 per endpoint server-side. The frontend
receives the last N logs filtered by a time window (hours), not a count.

### Data model

```
App {
  appName: string
  status: "Stable" | "Unstable" | "Down"
  endpoints: [{
    name: string        ← the URL being polled
    status: Status
    logs: [{ response: number, time: Date }]
  }]
  reports: [{
    _id: string
    endpoint: string
    state: string
    message: string
    fixed: boolean
  }]
}

User {
  username: string
  email: string
  password: string      ← bcrypt hash
  apps: string[]        ← array of App._id strings
  updateInterval: number
}
```

Database: MongoDB, db name `API-Watchdog`, single `apps` collection + `users` collection
(inferred — model file uses `appDb.model("apps", ...)`).

## Frontend (`frontend/`)

```
src/
  App.tsx               Router setup (React Router v7 createBrowserRouter)
  main.tsx              Root render, GoogleOAuthProvider, Mantine styles
  apiCallers/
    AuthApiCaller.ts    Login / Register / getLocalStorageUser
  components/
    ApiCaller.ts        All non-auth API calls (getAllApps, createApp, addEndpoint, etc.)
    auth/               AuthContext (React Context), Login page, GoogleButton
    shared/             MainLayout, HeaderMegaMenu, AddAppCard, Settings, PowerButton,
                        ToggleThemeComp, AuthGroupLarge, AuthGroupMobile, ErrorPage
    publicDashboard/    PublicDashboard, PubDashboardComp, PubDashCard, ColoredStatus
    individualDashboard/ AppDashboard, EndpointDashboards, AppPieChart, AddEndpointCard,
                        AverageStatsComp
    DevDashboard/       DevDashboard
  types/                Frontend TS interfaces (IApp, IEndpoint, ILog, IReport, NavLink, Status, User)
```

### Data flow (frontend)

```
PublicDashboard / DevDashboard
  └─ getAllApps() / GetUserApps()   API → state
  └─ PubDashboardComp
       └─ PubDashCard[]             displays name + status + top-3 endpoints
       └─ AddAppCard               modal → createApp() + addAppToUser()

AppDashboard (/pubdash/:appId)
  └─ getAppWithLatestLogs()         polls on mount + setInterval(frequency)
  └─ AppPieChart                   Mantine PieChart over endpoint logs
  └─ BugsList                      shows open reports; mark fixed via updateReport()
  └─ EndpointsDashboard
       └─ EndpointCard[]            log history bar (colored dots, tooltip per dot)
       └─ AddEndpointCard           modal → addEndpointToApp()
```

### Status color system

| Status | Tailwind text | Tailwind bg |
|---|---|---|
| Stable | `text-green-500` | `bg-green-500` |
| Unstable | `text-yellow-500` | `bg-yellow-500` |
| Down | `text-red-500` | `bg-red-500` |

## Layers and dependency direction

```
Browser (React SPA)
  └─ HTTP (axios, port 3000)
Express API (port 3000)
  └─ Mongoose
MongoDB (db: API-Watchdog)
```

No shared code package between frontend and backend — types are duplicated.
