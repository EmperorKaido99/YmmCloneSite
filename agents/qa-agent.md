# qa-agent.md — YMM QA & Testing Agent

## Role
Run through this checklist before any deployment or major update.

## QA Checklist

### Videos
- [ ] hero-background.mp4 autoplays on Chrome desktop
- [ ] hero-background.mp4 autoplays on iPhone Safari (muted + playsinline)
- [ ] about-3dprinter.mp4 visible in About section
- [ ] apply-drone.mp4 visible in Apply section
- [ ] All 3 poster fallback images exist in /images/

### Navigation
- [ ] Logo scrolls to #hero
- [ ] All 5 nav links scroll to correct sections with navbar offset
- [ ] Hamburger appears on mobile (max 767px)
- [ ] Hamburger opens/closes menu correctly
- [ ] Menu closes when a link is tapped

### Program Cards
- [ ] All 6 cards visible on desktop (3-col grid)
- [ ] Hover: card lifts and green glow appears
- [ ] Click: card flips to reveal back content
- [ ] CLOSE button: card flips back to front
- [ ] Cards stack to 2-col on tablet, 1-col on mobile

### Testimonials
- [ ] Auto-scrolls every 5 seconds
- [ ] Right arrow advances to next card
- [ ] Left arrow goes to previous card
- [ ] Wraps around (last → first)
- [ ] Shows 3 on desktop, 2 on tablet, 1 on mobile

### Apply Form
- [ ] Submit with empty fields: all fields highlight red
- [ ] Submit with invalid email: email field highlights red
- [ ] Submit with all valid: button turns green, shows success message
- [ ] Form resets after success
- [ ] Typing in a red field removes the red highlight

### Responsive
- [ ] 1280px — full desktop layout
- [ ] 1023px — 2-col programs grid
- [ ] 767px — hamburger menu active, all sections single column
- [ ] 375px — no horizontal overflow, text readable

### Accessibility
- [ ] All images have alt attributes
- [ ] Form inputs have associated labels
- [ ] Buttons have aria-labels
- [ ] Tab order makes sense
