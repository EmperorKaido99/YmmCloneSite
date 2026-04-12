# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page website rebuild for **Youth Media Movement** (ymm.org.za). Stack is **pure HTML5 / CSS3 / Vanilla JavaScript** — no frameworks, no build tools, no npm. Open `index.html` directly in a browser to preview.

## Core Constraints

- Never introduce external libraries or frameworks.
- All CSS must use the CSS custom properties defined in `:root` in `style.css` — do not hardcode colour or font values.
- All scroll-triggered animations must use `IntersectionObserver` — never `scroll` event listeners.
- **Never change section IDs** — nav smooth-scroll depends on: `#hero`, `#about`, `#disciplines`, `#programs`, `#testimonials`, `#apply`, `#contact`.
- Breakpoints are **desktop-first** — write base styles for desktop, then scale down with `max-width` queries.

## Design System

### Colours (defined in `:root`)
```
--green-primary:  #2d8a2d   (nav CTA, badges, labels, "Innovators" hero span)
--green-dark:     #1e5c1e   (disciplines section bg, card backs)
--green-light:    #4caf50   (hover states)
--yellow-accent:  #f5c518   (hero CTA button, apply button, bullet dots)
--black:          #0a0a0a   (footer)
--dark:           #111111   (programs & testimonials sections)
--card-bg:        #1a1a1a
--white:          #ffffff
--light-grey:     #f5f5f5   (about section bg, stat blocks)
--text-muted:     #666666
```

### Typography
```
--font-heading: 'Montserrat', sans-serif   (headings, nav, buttons — weights 400/600/700/900)
--font-body:    'Open Sans', sans-serif    (body text, form fields — weights 400/600)
```
Both fonts are loaded from Google Fonts in `<head>`.

### Breakpoints
```css
@media (max-width: 1023px) { /* Tablet */ }
@media (max-width: 900px)  { /* Tablet S — 2-col stacking */ }
@media (max-width: 767px)  { /* Mobile — hamburger activates */ }
@media (max-width: 480px)  { /* Small mobile */ }
```
Test every change at: 375px, 768px, 1280px.

## Video Sections

Three sections use full-bleed video backgrounds. All videos require `autoplay muted loop playsinline` and a `poster=` fallback image.

| Section | File | Notes |
|---|---|---|
| Hero | `videos/hero-background.mp4` | Overlay: `rgba(0,0,0,0.58)` |
| About Us | `videos/about-3dprinter.mp4` | Height 420px, rounded corners |
| Apply | `videos/apply-drone.mp4` | Height 500px, rounded corners |

Use the pattern in `claude-skills/video-section.md` when building or editing any video section.

## Page Sections (Build Order)

1. **Nav** — fixed, 70px, `rgba(10,10,10,0.92)` + backdrop-blur; hamburger on mobile
2. **Hero** — 100vh, video bg, Montserrat 900 headline, yellow CTA, bouncing scroll arrow
3. **About** — 2-col: video left / text right; slide-in from each side via IntersectionObserver
4. **Disciplines** — dark green bg, bullet list (yellow dots) left, SVG orbit graphic right; bullets stagger in
5. **Programs** — 6 flip cards (3-col → 2 → 1); front/back 3D CSS flip on click; hover lift + green glow
6. **Testimonials** — carousel, auto-advances every 5s, arrow controls, wraps around
7. **Apply** — video right, form left; JS validation (highlight red on error, green on success)
8. **Footer** — dark bg, accreditation logos, contact details, social links

## JS Architecture (`js/main.js`)

All code inside a single `DOMContentLoaded` listener. Planned modules (as named comment blocks):
- **Nav** — scroll class toggle (`.scrolled`), hamburger toggle, close-on-link-tap
- **Carousel** — auto-interval + prev/next controls
- **Flip cards** — click toggles `.flipped` class; CLOSE button removes it
- **Form validation** — intercept submit, validate fields, toggle error/success states
- **Scroll reveal** — single `IntersectionObserver` instance reused across all animated elements

## Agent & Skill Context Files

Load these into Claude Code context for specialised tasks:
- `agents/AGENTS.md` — master rules (always include)
- `agents/content-agent.md` — copy writing rules and brand voice
- `agents/seo-agent.md` — required meta/OG tags and JSON-LD schema
- `agents/qa-agent.md` — pre-deployment QA checklist
- `claude-skills/SKILLS.md` — index of reusable skill prompt files
