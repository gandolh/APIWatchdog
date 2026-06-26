# Test Plans — WatchDog UI

Setup hub: [playwright/README.md](../../playwright/README.md)

## Plans

| ID | Area | File |
|---|---|---|
| TP-01 | Auth (Login / Register) | [TP-01-auth.md](TP-01-auth.md) |
| TP-02 | Public Dashboard | [TP-02-public-dashboard.md](TP-02-public-dashboard.md) |
| TP-03 | App Detail Dashboard | [TP-03-app-detail.md](TP-03-app-detail.md) |
| TP-04 | UI/UX Audit (design fidelity, a11y, responsive) | [TP-04-ui-audit.md](TP-04-ui-audit.md) |

Latest results: [RESULTS.md](RESULTS.md)

## How a run works

1. Seed + start backend: `node playwright/scripts/seed-and-start.mjs`
2. Start frontend: `$env:VITE_API_URL="http://localhost:3001"; npm run dev:fe`
3. Open browser at `http://localhost:5173`
4. Walk each plan top-to-bottom, screenshot key states
5. Record outcome in RESULTS.md; file findings as corpus todos
6. Tear down per the Playwright hub README
