# TP-04 — UI/UX Audit (Design Fidelity, A11y, Responsive)

Setup & fixtures: [../../playwright/README.md](../../playwright/README.md)

Design source: `stitch_design/` (Stitch-generated HTML/CSS files in the repo).

## Goal

Validate that the implemented UI matches the Stitch dark-theme design system,
meets basic accessibility requirements, and behaves correctly across breakpoints.

## Cases

### Design fidelity

1. **Background color** — Body background is `#131313` on all pages. Sidebar
   background is slightly lighter (`surface-container-lowest`). Verify in
   DevTools: `computed → background-color`.

2. **Typography** — Body text uses Geist. Code/labels use JetBrains Mono (check
   sidebar nav items, stat values, log bar tooltips). Verify via DevTools
   `computed → font-family`.

3. **Primary / secondary / tertiary colors** — Primary `#adc6ff` visible on active
   nav item background / text. Gradient buttons use `#4d8eff → #571bc1`. Tertiary
   `#4fdbc8` visible on Add Endpoint button.

4. **Status badge pills** — OPERATIONAL = green `#74c69d` bg tint + pulsing dot.
   DEGRADED = orange `#f4a261`. MAJOR OUTAGE = red `#ffb4ab`. Check on Public
   Dashboard.

5. **Login glassmorphism** — Login card has `backdrop-filter: blur(16px)` and
   semi-transparent background. Gradient orb visible in top-left. Verified in
   DevTools.

6. **Material Symbols icons** — Icons render in all nav items, buttons, badges.
   No broken/missing glyphs (would show as squares).

7. **Sidebar fixed width** — Desktop sidebar is exactly 240px wide. Content has
   `margin-left: 240px` on desktop. Verified via DevTools box model.

### Accessibility

8. **Keyboard nav on login form** — Tab through: email → password → submit.
   Enter on password field submits the form. Focus rings visible.

9. **Modal Escape key** — Open Add App modal. Press Escape → modal closes.

10. **Modal backdrop click** — Click outside the modal content → modal closes.

11. **Color contrast** — Body text (`text-on-surface` ~`#e6e1e5`) on background
    `#131313` — estimated contrast ~11:1 (passes AA/AAA). Status badge text
    checked against badge bg. No light-gray-on-light-gray failures.

12. **Focus trap** — While a modal is open, Tab does not escape to the underlying
    page (best-effort check; modal uses backdrop click, not a true trap).

### Responsive / breakpoints

13. **Mobile (375px width)** — Sidebar hidden. Mobile top bar visible with menu
    icon. Menu icon opens the drawer. Drawer shows full nav.

14. **Tablet (768px width)** — Sidebar appears at 240px. No layout overflow.

15. **App cards grid reflows** — At 375px: 1 column. At 768px: 2 columns. At
    1280px+: 3+ columns. Cards maintain min-height.

16. **Sidebar mobile Login link** — On mobile (unauthenticated), "Login" link is
    visible in top bar.

### Empty and loading states

17. **Dashboard with no apps** — Connect to backend with empty DB (fresh seed,
    before apps load). Dashboard shows no cards (no crash, no "undefined" text).

18. **App detail loading state** — Before the API responds, the page shows a
    "Loading…" label (not a blank white flash).

## Pass criteria

- All design fidelity checks match Stitch spec within visual tolerance.
- Tab order is logical; Enter submits forms; Escape closes modals.
- No content clipping or horizontal scroll at 375px.
- No JS exceptions in the browser console across all pages.
- Contrast: body text passes WCAG AA (4.5:1 minimum).
