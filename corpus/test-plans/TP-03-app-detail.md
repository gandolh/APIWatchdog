# TP-03 — App Detail Dashboard

Setup & fixtures: [../../playwright/README.md](../../playwright/README.md)

## Goal

Verify the app detail page renders all seeded data correctly: summary stats,
endpoint cards with log bars and uptime donuts, and the bug reports list.

## Cases

1. **Page loads** — Navigate to `/pubdash/<app1Id>` (Production API). Page header
   shows "Production API" + OPERATIONAL badge. Summary stat cards show: Overall
   Uptime %, Endpoints count (2), Open Reports (1), Period (24h).

2. **Endpoint cards** — Two endpoint cards visible. `200` endpoint card shows
   ~100% uptime donut (green). `500` endpoint card shows ~0% uptime donut (red).
   Log bars rendered (8 bars each, green for 200, red for 500).

3. **Log bar tooltips** — Hover over a log bar. Tooltip shows HTTP status code and
   timestamp.

4. **Add Endpoint (authenticated)** — Log in, navigate to the app. "Add Endpoint"
   button visible. Click → modal opens. Enter `https://httpstat.us/201`, submit.
   Modal closes. New endpoint card appears without page reload.

5. **Bug reports section** — One open report visible ("Endpoint is returning 500").
   State badge shows "Down". "Mark Fixed" button visible for logged-in user.

6. **Mark report fixed** — Click "Mark Fixed". Button disappears; report shows
   "Fixed" label and fades to 40% opacity.

7. **Back navigation** — Click the back arrow in the page header. Returns to
   previous page (Public Dashboard).

8. **Unknown app ID** — Navigate to `/pubdash/nonexistent-id`. Page should not
   crash (shows loading or empty state gracefully).

## Pass criteria

- Endpoint log bars visible and color-coded within 1 s of load.
- Uptime donuts reflect seeded log data (200-only ep ≥ 90%; 500-only ep ≤ 10%).
- Mark-fixed updates UI without page reload.
- Add Endpoint round-trip: new card appears + API confirms record exists.
