# Design System

Source files: [corpus/design/](../design/) (Stitch-generated).
Full token spec: [DESIGN.md](../design/stitch_watchdog_api_monitoring_dashboard/watchdog_monitoring_system/DESIGN.md)

The authoritative design is the **dark theme** ("WatchDog Monitoring System").
Light-theme variants exist in `corpus/design/` but are not implemented.

---

## Color tokens

| Role | Hex | Usage |
|---|---|---|
| `background` | `#131313` | Page background, body |
| `surface-container-lowest` | `#0e0e0e` | Sidebar |
| `surface-container-low` | `#1b1c1c` | Input fields |
| `surface-container` | `#1f2020` | Cards |
| `surface-container-high` | `#2a2a2a` | Buttons, chips |
| `on-surface` | `#e4e2e1` | Primary text |
| `on-surface-variant` | `#c2c6d6` | Secondary/muted text |
| `outline-variant` | `#424754` | Borders, dividers |
| `primary` | `#adc6ff` | Brand accent, active nav |
| `primary-container` | `#4d8eff` | Gradient start (buttons) |
| `secondary` | `#d0bcff` | Secondary accent |
| `secondary-container` | `#571bc1` | Active nav background, gradient end |
| `tertiary` | `#4fdbc8` | Add endpoint, success highlights |
| `tertiary-container` | `#00a392` | Tertiary interactive |
| `error` | `#ffb4ab` | Error text, DOWN status |
| `error-container` | `#93000a` | DOWN badge background |

### Status color system

| Status | Badge bg | Text | Meaning |
|---|---|---|---|
| Stable | `#1b4332` | `#74c69d` | All recent requests 2xx |
| Unstable | `#5c4033` | `#f4a261` | Some bad requests |
| Down | `#93000a` | `#ffb4ab` | All recent requests failed |

---

## Typography

Fonts loaded via Google Fonts in `packages/fe/index.html`.

| Scale token | Font | Size | Weight | Usage |
|---|---|---|---|---|
| `display` | Geist | 32px/40px | 700 | Large stat values |
| `headline-lg` | Geist | 24px/32px | 600 | Page titles |
| `headline-md` | Geist | 20px/28px | 600 | Card titles, modal titles |
| `body-lg` | Geist | 16px/24px | 400 | Body copy |
| `body-md` | Geist | 14px/20px | 400 | Descriptions |
| `body-sm` | Geist | 12px/16px | 400 | Captions |
| `code-md` | JetBrains Mono | 13px/18px | 500 | Code, endpoints, form inputs |
| `label-caps` | JetBrains Mono | 11px/16px | 700 | Nav labels, button text, ALL CAPS |

---

## Icons

Material Symbols Outlined loaded via Google Fonts (variable font, optical size 20, weight 300).
Rendered as: `<span class="material-symbols-outlined">icon_name</span>`.
Filled variant: add class `icon-fill` (sets `font-variation-settings: 'FILL' 1`).

Key icons in use: `visibility` (logo), `dashboard`, `monitor_heart`, `settings`,
`logout`, `login`, `add`, `refresh`, `bug_report`, `check_circle`, `cancel`,
`warning`, `sensors`, `show_chart`, `account_tree`, `schedule`.

---

## Spacing tokens (Tailwind)

| Token | Value | Usage |
|---|---|---|
| `stack-xs` | 4px | Tight gaps within components |
| `stack-sm` | 8px | Component internal padding |
| `stack-md` | 16px | Between related elements |
| `stack-lg` | 32px | Between sections |
| `margin-page` | 24px | Page edge padding |
| `gutter` | 16px | Grid column gap |

---

## Layout

- **Sidebar**: 240px fixed left, `surface-container-lowest` bg. Content shifts right by 240px on `md:` breakpoint.
- **Mobile**: sidebar hidden, top bar 60px height, hamburger drawer 280px.
- **App card grid**: `repeat(auto-fill)` with breakpoint overrides:
  - 1 col (< sm), 2 col (sm), 3 col (lg), 4 col (xl), 6 col (2xl).
- **App detail**: single column, summary stats row (4 cells), endpoint cards 2-col on `lg:`.

---

## Screens (dark, authoritative)

| Screen | HTML source | Screenshot |
|---|---|---|
| Public Dashboard | [code.html](../design/stitch_watchdog_api_monitoring_dashboard/public_dashboard/code.html) | [screen.png](../design/stitch_watchdog_api_monitoring_dashboard/public_dashboard/screen.png) |
| Developer Dashboard | [code.html](../design/stitch_watchdog_api_monitoring_dashboard/developer_dashboard/code.html) | [screen.png](../design/stitch_watchdog_api_monitoring_dashboard/developer_dashboard/screen.png) |
| App Detail Dashboard | [code.html](../design/stitch_watchdog_api_monitoring_dashboard/app_detail_dashboard/code.html) | [screen.png](../design/stitch_watchdog_api_monitoring_dashboard/app_detail_dashboard/screen.png) |
| Login Page | [code.html](../design/stitch_watchdog_api_monitoring_dashboard/login_page/code.html) | [screen.png](../design/stitch_watchdog_api_monitoring_dashboard/login_page/screen.png) |

---

## Known deviations from spec (filed as todos)

- Gradient buttons (`#4d8eff → #571bc1`) rendering as solid purple — see [fix-gradient-buttons todo](../todos/2026-06-26-fix-gradient-buttons.md).
- 0% uptime donut renders a dot not an empty ring — see [fix-donut-zero-state todo](../todos/2026-06-26-fix-donut-zero-state.md).
