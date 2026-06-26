# TP-02 — Public Dashboard

Setup & fixtures: [../../playwright/README.md](../../playwright/README.md)

## Goal

Verify the public dashboard loads all seeded apps, cards render correctly with
status badges and endpoints, and the add-app / bug-report flows work.

## Cases

1. **Dashboard loads unauthenticated** — Navigate to `/` without logging in.
   Both seeded apps ("Production API", "Staging API") appear as cards. No
   "Create App" card (that's auth-gated). No console errors.

2. **App card content** — "Production API" card shows OPERATIONAL badge (green).
   "Staging API" card shows DEGRADED badge (orange). Each card shows up to 3
   endpoint rows with icon indicators.

3. **App card click navigates** — Click any app card. Navigates to `/pubdash/:id`.
   Back button returns to `/`.

4. **Create App card (authenticated)** — Log in, return to `/`. A "Create App"
   card appears first in the grid. Click it → "Add New App" modal opens.

5. **Add App flow** — In the modal, enter app name "Test App", click "Create App".
   Modal closes. New app card appears in the grid. Verify via GET `/api/app/getAll`
   that the record exists in the DB.

6. **Bug report modal** — Hover over an app card. Bug icon appears top-right.
   Click it → "Report a Bug" modal opens with endpoint dropdown + state select
   + message input. Fill and submit → modal closes, no error toast.

7. **Refresh button** — Click the refresh icon in the page header. Cards reload
   (no page navigation).

## Pass criteria

- Both seeded apps visible within 1 s of page load.
- Status badges match seeded data (Production=Stable, Staging=Unstable).
- Create App flow results in a new card without page reload.
- Bug report submits without console errors.
