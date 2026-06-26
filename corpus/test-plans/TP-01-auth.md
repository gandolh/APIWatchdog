# TP-01 — Auth (Login / Register)

Setup & fixtures: [../../playwright/README.md](../../playwright/README.md)

## Goal

Verify that login and register flows work end-to-end, guard rails are in place,
and the UI reflects auth state correctly throughout.

## Cases

1. **Login page renders** — Navigate to `/login`. Glassmorphism card visible, two
   inputs (email, password), gradient "Secure Login" button, toggle to Register.
   WatchDog header visible. No console errors.

2. **Invalid credentials** — Enter `wrong@user.dev` / `badpass`, submit. Error
   message appears inline (not a page reload). Inputs remain populated.

3. **Valid login** — Enter `test@watchdog.dev` / `password123`, submit. Redirected
   to `/` (Public Dashboard). Sidebar shows the user's email and a Logout link
   instead of Login. "My Apps" nav item is visible.

4. **Auth persists on reload** — After logging in, reload the page. Still
   authenticated (sidebar still shows email + Logout).

5. **Logout** — Click Logout in sidebar. Redirected to `/`. "My Apps" nav item
   gone. Sidebar shows Login link.

6. **Register new user** — Click "Register Node", fill username + new email +
   password, submit. Should redirect to dashboard as the new user.

7. **Duplicate email registration** — Try to register with `test@watchdog.dev`
   (already exists). Error message appears; no crash.

8. **Password toggle** — Click the eye icon on the password field. Password becomes
   visible text. Click again → masked.

## Pass criteria

- Login → dashboard redirect in < 2 s.
- Error messages appear without full page reload.
- Auth state survives a hard reload (localStorage).
- No unhandled JS exceptions in the browser console.
