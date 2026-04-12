# AGENTS.md — YMM Master Agent Context
# Always include this file at the start of a Claude Code session.

## Project Identity
- Project: Youth Media Movement website (ymm.org.za)
- Stack: Pure HTML5 / CSS3 / Vanilla JavaScript — NO frameworks, NO WordPress
- Single page: index.html | css/style.css | js/main.js

## Core Rules for All Agents
1. Never introduce external libraries or frameworks
2. All CSS uses the variables defined in :root in style.css
3. All animations use Intersection Observer API (no scroll event listeners)
4. Mobile-first: test every change at 375px, 768px, 1280px
5. Videos always need: autoplay muted loop playsinline poster="images/x-poster.jpg"
6. Preserve all existing section IDs — nav links depend on them

## Colour Reference
- Green primary: #2d8a2d
- Green dark: #1e5c1e
- Yellow accent: #f5c518
- Black: #0a0a0a | Dark: #111111 | Card bg: #1a1a1a
- White: #ffffff | Light grey: #f5f5f5

## Font Reference
- Headings: Montserrat (weights 400, 600, 700, 900)
- Body: Open Sans (weights 400, 600)

## Section IDs (do not change)
- #hero | #about | #disciplines | #programs | #testimonials | #apply | #contact

## File Paths for Videos
- videos/hero-background.mp4
- videos/about-3dprinter.mp4
- videos/apply-drone.mp4
