# Open Questions

Only genuinely unresolved items. Delete an item the moment it's answered — its
history belongs in `status.md` + `log.md`, not here.

## Per-user polling interval

The `User` model has an `updateInterval` field and `POST /api/user/updateInterval`
exists, but the server polling loop is a single global `setInterval`. Should
each user's endpoints be polled at their own frequency, or is a global interval
(user-settable, affects everyone) the intended design? The Settings UI currently
sends to `POST /api/setInterval` (global), not `/api/user/updateInterval`.

## Auth security model

Currently there's no server-side session or JWT verification. The backend
trusts the email field in request bodies. Is this intentional (internal/demo
tool) or should proper auth be added (JWT, server-side sessions, or Supabase/Clerk)?

## Public vs. private apps

All apps in the DB are publicly visible on the Public Dashboard. There's no
privacy flag. Should users be able to mark an app as private (only visible in
Dev Dashboard)?

## Stitch design

A Stitch design brief was generated 2026-06-26. Once a design is produced, the
question is: which screens get redesigned first, and what's the implementation
plan for applying Mantine 9 theming overrides?
