---
name: Luminous Sentinel
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#712ae2'
  on-secondary: '#ffffff'
  secondary-container: '#8a4cfc'
  on-secondary-container: '#fffbff'
  tertiary: '#4d556b'
  on-tertiary: '#ffffff'
  tertiary-container: '#656d84'
  on-tertiary-container: '#eef0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  container-max: 1440px
---

## Brand & Style

The design system is engineered for the WatchDog Monitoring System, pivoting from a dark-mode technical aesthetic to a high-clarity, professional light-themed SaaS environment. The brand personality is vigilant, precise, and authoritative. It targets DevOps engineers and system administrators who require long-term visual comfort and rapid data scanning.

The design style is **Corporate Modern with Minimalist influences**. It prioritizes high-contrast legibility and structural discipline. By utilizing vast amounts of white space punctuated by vibrant functional status colors, the UI evokes a sense of "clinical reliability"—a workspace where information is organized, noise is suppressed, and critical alerts are impossible to miss.

## Colors

This design system utilizes a high-contrast light palette to maximize readability in well-lit environments.

- **Primary Surfaces:** Pure white (#FFFFFF) is used for the base layer to create a crisp, modern backdrop. 
- **Subtle Layering:** #F8F9FA is employed for sidebars, background fills, and low-priority containers to provide structural separation without introducing heavy shadows.
- **Typography:** Text is set in Deep Slate/Black (#0F172A) for maximum accessibility and visual weight.
- **Brand Identity:** The blue-to-violet gradient is reserved for high-impact brand moments like the logo, wordmark, and primary action states.
- **Functional Logic:** Status colors (Green, Yellow, Red) remain at 500-level intensity to ensure they pop against the white surface, guiding the user’s eye to system health indicators instantly.

## Typography

The typographic scale is optimized for data density and technical precision.

- **Headlines:** Uses **Geist** for its clinical, developer-friendly geometry. It provides a sharp, modern structure to dashboard titles.
- **Body:** Uses **Inter** for its neutral, highly legible characteristics. It is the workhorse for all descriptions and standard UI text.
- **Technical Labels:** Uses **JetBrains Mono** for metrics, timestamps, and log data. The monospaced nature ensures that numerical values align vertically in tables, facilitating easier data comparison.

## Layout & Spacing

The design system employs a **12-column fluid grid** for the main content area, with a fixed sidebar for navigation. 

- **Density:** We utilize a 4px baseline grid to allow for the tight grouping of metrics.
- **Gutters:** A 16px gutter provides enough breathing room to distinguish between different data widgets while maintaining high information density.
- **Breakpoints:**
  - **Mobile (< 768px):** Single column, 16px margins, navigation moves to a bottom bar or hamburger menu.
  - **Tablet (768px - 1024px):** 6-column grid, 24px margins.
  - **Desktop (> 1024px):** Full 12-column grid with a max-width container of 1440px to prevent excessive line lengths.

## Elevation & Depth

To maintain a "High-End SaaS" feel, this design system avoids heavy shadows, opting for **Tonal Layers and Low-Contrast Outlines**.

- **Level 0 (Background):** #F8F9FA.
- **Level 1 (Cards/Widgets):** White (#FFFFFF) with a 1px border of #E2E8F0. This creates a "flat-elevated" look that feels organized.
- **Level 2 (Dropdowns/Modals):** White (#FFFFFF) with a soft, diffused ambient shadow (10% opacity, 12px blur) to indicate temporary overlay without breaking the minimalist aesthetic.
- **Depth through Color:** Background blurs (Glassmorphism) are used sparingly on global headers to maintain context while scrolling.

## Shapes

The shape language is **Soft (0.25rem)**. This subtle rounding of corners strikes a balance between the rigidity of a technical tool and the approachability of a modern web application.

- **Buttons & Inputs:** 4px (0.25rem) corner radius.
- **Cards & Containers:** 8px (0.5rem) corner radius for a distinct but professional appearance.
- **Status Pills:** Fully rounded (pill-shaped) to distinguish them from interactive buttons.

## Components

- **Buttons:** Primary buttons use the Brand Gradient with white text. Secondary buttons use a white fill with a #E2E8F0 border and Deep Slate text.
- **Inputs:** Fields use a #F8F9FA background with a subtle bottom border that transforms into a 2px primary blue border on focus.
- **Chips/Badges:** Small, monospaced text within a 4px rounded container. Status badges use a light tint of the status color (e.g., 10% opacity Green-500) with full-intensity text.
- **Data Tables:** High-density rows with 1px horizontal dividers. Header rows use #F8F9FA background and bold JetBrains Mono labels.
- **Cards:** White background, 1px border (#E2E8F0), no shadow. Content is separated by subtle 1px dividers.
- **Monitoring Graphs:** Use the primary blue for lines, with the area under the curve filled with a 5% opacity blue gradient.