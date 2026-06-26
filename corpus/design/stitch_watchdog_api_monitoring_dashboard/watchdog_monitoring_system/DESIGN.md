---
name: WatchDog Monitoring System
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e4e2e1'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e4e2e1'
  inverse-on-surface: '#303030'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#4fdbc8'
  on-tertiary: '#003731'
  tertiary-container: '#00a392'
  on-tertiary-container: '#00302a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#71f8e4'
  tertiary-fixed-dim: '#4fdbc8'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#005048'
  background: '#131313'
  on-background: '#e4e2e1'
  surface-variant: '#353535'
typography:
  display:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 1rem
  margin-page: 1.5rem
  stack-xs: 0.25rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style
The design system is engineered for high-performance API monitoring, prioritizing rapid information retrieval and technical precision. The aesthetic is "Developer-Centric Functionalism," blending a dark-first data-dense interface with high-energy accents. 

The style utilizes a **Corporate-Modern** foundation with **High-Contrast** status indicators. It is designed to feel like a mission-control center: utilitarian, authoritative, and void of unnecessary decoration. Visual hierarchy is established through structural rigidity and the strategic use of gradients to highlight primary actions and brand identity within a sea of technical data.

## Colors
The color architecture is built around a "Status-First" logic. The primary canvas is a deep charcoal (#333333) to minimize eye strain during extended monitoring. 

- **Brand Gradient:** A 90-degree linear gradient from Blue to Violet is reserved for the wordmark and primary "Global" actions.
- **Functional Accents:** Teal is used exclusively for "Create" or "Add" workflows, distinguishing constructive actions from status-monitoring tasks.
- **Semantic Logic:** Status colors (Green, Yellow, Red) must maintain high luminance against the dark background to ensure immediate peripheral recognition of system failures.
- **Light Mode:** When toggled, the system shifts to a high-visibility Blue-Tinted White (#bde0fe) to maintain brand cohesion while providing maximum contrast.

## Typography
This design system employs **Geist** for its neutral, technical appearance and high legibility in dense layouts. **JetBrains Mono** is utilized for all data points, metrics, and labels to reinforce the developer-tool aesthetic and ensure numerical alignment in tables.

Headline levels scale aggressively for desktop dashboards but should collapse to a maximum of `headline-md` for mobile headers. Small labels (`label-caps`) should be used for table headers and metadata categories to maximize the "data-density" without sacrificing scannability.

## Layout & Spacing
The layout follows a **Fluid Grid** model optimized for high-density information display. It uses a 12-column system with tight gutters (16px) to maximize the "surface area" of data.

- **Desktop:** Sidebar-heavy navigation (fixed 240px) with a fluid content area.
- **Tablet:** Sidebar collapses to an icon-rail; cards reflow to 2-column stacks.
- **Mobile:** Single column layout; margins reduce to 1rem; horizontal scrolling is permitted for wide data tables to maintain data integrity.
- **Rhythm:** A 4px baseline grid governs all internal component padding to maintain a compact, "packed" feel.

## Elevation & Depth
Depth is signaled through **Tonal Layers** rather than heavy shadows. 

- **Dark Mode:** The base layer is #333333. Surfaces (Cards) use a slightly lighter grey or an 8% white overlay to appear "raised." Borders are 1px solid with low opacity (10%) to define edges without adding visual noise.
- **Light Mode:** Surfaces use `shadow-lg` (soft, diffused) against the #bde0fe background to create a crisp, "floating" paper effect.
- **Interactions:** Hover states on interactive cards should trigger a subtle primary-colored glow or a 1px border stroke using the brand gradient.

## Shapes
The shape language is **Soft (0.25rem)**. This provides a professional, "tooled" look that feels modern but remains efficient for grid-based layouts. 

- **Standard Elements:** Buttons, Inputs, and Small Cards use 4px (`rounded-sm`).
- **Containers:** Dashboard widgets and main layout sections use 8px (`rounded-lg`).
- **Status Pills:** Use full `rounded-full` (pill) to distinguish status indicators from clickable UI buttons.

## Components

### Buttons & Inputs
- **Primary:** Features the Blue-to-Violet gradient with white text.
- **Secondary:** Transparent background with a 1px white or neutral-400 border.
- **Inputs:** Dark backgrounds with a subtle inner-shadow and 1px border. Focus state should highlight the border in Teal.

### Cards & Grids
- **Compact Cards:** Padding should not exceed 16px. Use `between` layouts for headers to keep metrics and titles on a single line.
- **Status Badges:** High-contrast background with black text (for light mode) or white text (for dark mode). Use the semantic status colors.

### Data Visualization
- **Sparklines:** Used inside cards to show 24h trends. Use the color of the current status (e.g., a Red sparkline if the API is currently "Down").
- **Dense Grids:** Tables should use `body-sm` or `code-md` typography. Zebra-striping is preferred over heavy borders for row separation.

### Specialized Elements
- **Gradient Wordmark:** The "WatchDog" logo must always use the 90-degree Blue-to-Violet gradient.
- **Activity Feed:** A vertical timeline component with monospaced timestamps and compact status icons.