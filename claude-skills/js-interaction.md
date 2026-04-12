# Skill: JS Interaction

**Use when:** Adding interactivity or animations to `main.js`.

## Pattern
- All code inside `DOMContentLoaded` listener.
- Use `document.querySelector` / `querySelectorAll` — no jQuery.
- Prefer CSS transitions triggered by class toggling over JS-driven animation.
- Use `IntersectionObserver` for scroll-reveal effects.
