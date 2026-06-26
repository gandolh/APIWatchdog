# Open Questions

Only genuinely unresolved items. Delete an item the moment it's answered — its
history belongs in `status.md` + `log.md`, not here.

## Google OAuth (TODO)

Google OAuth was removed from the current implementation in favor of email+password
only. The design decision to add it back later is preserved here. When the time
comes: add `@react-oauth/google` to `packages/fe`, add a `GoogleButton` component
to the Login page, and implement server-side Google token verification (the old
approach of trusting the frontend userinfo response is not acceptable for production).

## Per-user polling interval

`user.frequency` (seconds) and `user.period` (hours) are stored in the SQLite
`users` table and surfaced in the Settings modal, but the server's polling loop
is a single global `setInterval`. Should each user's endpoints be polled at their
own rate, or is a global interval (user-settable, affects everyone) the intended
design? The Settings UI currently sends to `POST /api/setInterval` (global).

## Auth security model

Currently there is no server-side session or JWT verification. The backend trusts
the `email` field in request bodies. Is this intentional (internal/demo tool) or
should proper auth be added (JWT, server-side sessions)?

## Public vs. private apps

All apps in the DB are publicly visible on the Public Dashboard. There is no
privacy flag. Should users be able to mark an app as private (only visible in
Dev Dashboard)?
