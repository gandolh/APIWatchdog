# Corpus Index

Front door for the APIWatchdog corpus. Start here; then go to the relevant
wiki page or brief. See [CLAUDE.md](CLAUDE.md) for conventions.

## Wiki

| Page | What it covers |
|---|---|
| [overview.md](wiki/overview.md) | What the project is, components, the three frontend views |
| [architecture.md](wiki/architecture.md) | Backend/frontend structure, data model, polling engine, data flow |
| [decisions.md](wiki/decisions.md) | Locked tech choices — don't relitigate without a log entry |
| [status.md](wiki/status.md) | Dated living dashboard — build state, area snapshot, recent changes |
| [open-questions.md](wiki/open-questions.md) | Genuinely unresolved design questions |
| [design.md](wiki/design.md) | Design system — color tokens, typography, spacing, screen inventory |

## Design

Stitch-generated design source lives in [design/](design/). Dark-theme screens
are the authoritative visual reference; light variants exist for reference only.

| Screen | Dark | Light |
|---|---|---|
| Public Dashboard | [code.html](design/stitch_watchdog_api_monitoring_dashboard/public_dashboard/code.html) · [screen.png](design/stitch_watchdog_api_monitoring_dashboard/public_dashboard/screen.png) | [light](design/stitch_watchdog_api_monitoring_dashboard/public_dashboard_light/code.html) |
| Developer Dashboard | [code.html](design/stitch_watchdog_api_monitoring_dashboard/developer_dashboard/code.html) · [screen.png](design/stitch_watchdog_api_monitoring_dashboard/developer_dashboard/screen.png) | [light](design/stitch_watchdog_api_monitoring_dashboard/developer_dashboard_light/code.html) |
| App Detail Dashboard | [code.html](design/stitch_watchdog_api_monitoring_dashboard/app_detail_dashboard/code.html) · [screen.png](design/stitch_watchdog_api_monitoring_dashboard/app_detail_dashboard/screen.png) | [light](design/stitch_watchdog_api_monitoring_dashboard/app_detail_dashboard_light/code.html) |
| Login Page | [code.html](design/stitch_watchdog_api_monitoring_dashboard/login_page/code.html) · [screen.png](design/stitch_watchdog_api_monitoring_dashboard/login_page/screen.png) | [light](design/stitch_watchdog_api_monitoring_dashboard/login_page_light/code.html) |
| Design System Spec | [DESIGN.md](design/stitch_watchdog_api_monitoring_dashboard/watchdog_monitoring_system/DESIGN.md) | — |
| Luminous Sentinel Theme | [DESIGN.md](design/stitch_watchdog_api_monitoring_dashboard/luminous_sentinel/DESIGN.md) | — |

## Test Plans

| Plan | Area |
|---|---|
| [TP-01](test-plans/TP-01-auth.md) | Auth — login, register, error states |
| [TP-02](test-plans/TP-02-public-dashboard.md) | Public Dashboard — grid, cards, create app |
| [TP-03](test-plans/TP-03-app-detail.md) | App Detail — log bars, donut, reports |
| [TP-04](test-plans/TP-04-ui-audit.md) | UI/UX Audit — design fidelity, a11y, responsive |

Latest results: [test-plans/RESULTS.md](test-plans/RESULTS.md)

## Todos

| File | Summary |
|---|---|
| [2026-06-26-fix-gradient-buttons.md](todos/2026-06-26-fix-gradient-buttons.md) | Gradient buttons render as solid purple |
| [2026-06-26-fix-donut-zero-state.md](todos/2026-06-26-fix-donut-zero-state.md) | 0% uptime donut shows dot not empty ring |
| [2026-06-26-escape-key-close.md](todos/2026-06-26-escape-key-close.md) | Escape key doesn't close modals or mobile drawer |

## Briefs

| # | Title | State |
|---|---|---|
| — | *(none yet)* | — |

## Log

[log.md](log.md) — chronological record of every meaningful corpus change.
