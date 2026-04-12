# 🌍 Youth Media Movement — ymm.org.za Website Rebuild

> **Complete project brief for Claude Code.**  
> Paste this README into Claude Code at the start of every session to give it full context.

---

## 📌 Project Summary

| Field | Detail |
|---|---|
| **Project** | ymm.org.za full website rebuild |
| **Organisation** | Youth Media Movement (YMM) |
| **Stack** | HTML5, CSS3, Vanilla JavaScript — NO WordPress, NO frameworks |
| **Goal** | Mobile-first, fully responsive site with video backgrounds, scroll animations, interactive program cards, testimonials carousel, and apply form |
| **Live Site Reference** | https://ymm.org.za |
| **Address** | 58 Sovereign Road, Morgens Village, Mitchells Plain, Western Cape, 7785 |
| **Tel** | 021 200 5391 |
| **Email** | admin@ymm.org.za |

---

## 🗂️ Full Folder Structure

```
ymm-website/
│
├── index.html                        ← Main site (single page)
│
├── css/
│   └── style.css                     ← All styles, CSS variables, responsive breakpoints
│
├── js/
│   └── main.js                       ← All interactivity (nav, carousel, flip cards, form, scroll reveal)
│
├── videos/                           ← 🎥 DROP YOUR 3 VIDEOS HERE
│   ├── hero-background.mp4           ← Fullscreen hero section background
│   ├── about-3dprinter.mp4           ← About Us left column video
│   └── apply-drone.mp4               ← Apply section right column video
│
├── images/
│   ├── logo.png                      ← YMM Africa map icon logo
│   ├── hero-poster.jpg               ← Hero video fallback image (mobile)
│   ├── about-poster.jpg              ← About video fallback image
│   ├── apply-poster.jpg              ← Apply video fallback image
│   ├── accreditations/
│   │   ├── agriseta.png
│   │   ├── mict-seta.png
│   │   ├── saiosh.png
│   │   └── certified-innovation.png
│   └── icons/                        ← Program card icons (optional, using emoji currently)
│
├── agents/                           ← 🤖 Claude agent configs & custom instructions
│   ├── AGENTS.md                     ← Master agent instructions (add to Claude Code context)
│   ├── content-agent.md              ← Agent for writing/updating site copy
│   ├── seo-agent.md                  ← Agent for meta tags, OG tags, structured data
│   └── qa-agent.md                   ← Agent for testing checklist & review tasks
│
├── claude-skills/                    ← 🧠 Reusable Claude skill prompts
│   ├── SKILLS.md                     ← Index of all skills
│   ├── html-component.md             ← Skill: build new HTML sections
│   ├── css-responsive.md             ← Skill: write mobile-first CSS
│   ├── js-interaction.md             ← Skill: add JS interactions & animations
│   ├── form-validation.md            ← Skill: form validation patterns
│   └── video-section.md              ← Skill: adding video backgrounds correctly
│
├── .claude/
│   └── settings.json                 ← Claude Code project settings
│
├── HOW-TO-ADD-VIDEOS.md              ← Quick guide for adding your video files
└── README.md                         ← This file
```

---

## 🎨 Design System

### Colour Palette

```css
:root {
  --green-primary:  #2d8a2d;   /* Main brand green — nav CTA, badges, labels */
  --green-dark:     #1e5c1e;   /* Darker green — disciplines section bg, card backs */
  --green-light:    #4caf50;   /* Lighter green — hover states */
  --yellow-accent:  #f5c518;   /* Gold/yellow — hero CTA, apply button, bullet dots */
  --black:          #0a0a0a;   /* Pure black — footer background */
  --dark:           #111111;   /* Near-black — programs & testimonials sections */
  --card-bg:        #1a1a1a;   /* Card backgrounds */
  --white:          #ffffff;
  --light-grey:     #f5f5f5;   /* About section bg, stat blocks */
  --text-dark:      #1a1a1a;
  --text-muted:     #666666;
}
```

### Typography

```css
/* Google Fonts — already imported in index.html */
--font-heading: 'Montserrat', sans-serif;   /* All headings, nav, buttons, labels */
--font-body:    'Open Sans', sans-serif;    /* Body text, form fields, paragraphs */
```

### Responsive Breakpoints

```css
/* Desktop first — then down */
@media (max-width: 1023px) { /* Tablet   */ }
@media (max-width: 900px)  { /* Tablet S — stacks 2-col layouts */ }
@media (max-width: 767px)  { /* Mobile   — hamburger menu activates */ }
@media (max-width: 480px)  { /* Small mobile */ }
```

---

## 🎬 Video Sections (The 3 Circled Areas)

Three sections use video backgrounds. All videos must be:
- Format: **MP4** (H.264 codec)
- Resolution: minimum **1080p** (1920×1080)
- File size: under **10MB each** (compress with HandBrake if needed)
- All have `autoplay muted loop playsinline` attributes for mobile compatibility

| Section | Video File | HTML Element | Notes |
|---|---|---|---|
| **Hero** | `videos/hero-background.mp4` | `<video id="hero-video">` | Dark overlay: `rgba(0,0,0,0.58)` |
| **About Us** | `videos/about-3dprinter.mp4` | `<video class="about-video">` | Height: 420px, rounded corners |
| **Apply** | `videos/apply-drone.mp4` | `<video class="apply-video">` | Height: 500px, rounded corners |

**Where to get free videos:**
- https://www.pexels.com/videos — search "drone africa", "3d printer", "drone flying"
- https://pixabay.com/videos — same searches
- https://mixkit.co — "technology", "drone", "innovation"
- https://coverr.co — "technology", "manufacturing"

---

## 📄 Page Sections — Full Spec

### 1. Navigation
- Fixed sticky top, `height: 70px`
- Background: `rgba(10,10,10,0.92)` with backdrop blur
- Logo: SVG Africa map icon + "YMM" green + "YOUTH MEDIA MOVEMENT" small grey text
- Links: About Us | Programs & Training | Apply | Testimonials | **CONTACT** (green button)
- Mobile: hamburger menu (3-line icon → X animation, slides down full-width menu)
- JS: adds `.scrolled` class (box-shadow) on scroll > 20px

### 2. Hero Section
- Full viewport height (`100vh`, min 600px)
- Video background with `rgba(0,0,0,0.58)` dark overlay
- Headline: **"Empowering Tomorrow's Innovators Today"** — "Innovators" in `#2d8a2d`
- Font: Montserrat 900, `clamp(2.2rem, 6vw, 4.5rem)`
- Subtext: *"Innovative Solutions In Drone Tech, 3D Printing, Space Exploration, And Gamification"*
- CTA: **"LET'S ELEVATE YOUR BUSINESS"** — yellow `#f5c518` background, black text
- Animations: headline fades up (0.4s delay), subtext (0.8s), button (1.2s)
- Bouncing scroll-down arrow at bottom (CSS keyframe bounce)

### 3. About Us — Two Column
- Background: white, `padding: 100px 0`
- Left: video (height 420px, rounded corners, box-shadow) + green badge "10+ Years of Impact"
- Right: green pill label "ABOUT OUR VISION" + h2 + paragraph + 2 stat blocks (Holistic Growth | Tech Leadership)
- Animation: left column slides from left, right slides from right — Intersection Observer

### 4. Disciplines Section
- Background: `#1e5c1e` (dark green)
- Left: section label + h2 "Our Disciplines" + 7 bullet items with yellow dot
- Right: decorative SVG orbit graphic (3 concentric rings, YMM icon centre)
- Bullets animate: stagger in one-by-one on scroll (120ms delay each)
- Mobile: orbit graphic hidden on small screens

### 5. Programs & Training — 6 Cards
- Background: `#111111`
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Each card: front (icon + title + short desc + "LEARN MORE →") | back (full bullet list + CLOSE button)
- Hover: `translateY(-8px)` lift + green glow border + icon scale/rotate
- Click: CSS 3D flip (rotateY 180deg)
- Scroll reveal: cards stagger in with 100ms delay each
- 6 programs: AI & Autonomous Systems | Advanced Digital Fabrication | Space Exploration & Robotics | Sustainable Technology & Climate Innovation | Immersive Digital & Neuro-Enhanced Media | Cloud Computing, Quantum Technologies & Digital Governance

### 6. Student Testimonials
- Background: `#111111`
- Section label: "VOICES OF SUCCESS" (small green uppercase)
- Header row: h2 left + left/right arrow buttons right
- Auto-scrolls every 5 seconds, arrow controls override
- Desktop: 3 cards visible | Tablet: 2 | Mobile: 1
- Student names: **Chanel Tomlinson** (AI Graduate) | **Farren Jansen** (Tech Innovator) | **Lesedi Moio** (Cloud Engineer) | **Nadia Khumalo** (Drone Technician)

### 7. Apply / Start Your Journey
- Background: white
- Left: h2 + intro text + form | Right: drone video
- Form fields: Full Name | Email Address | Select Program (6 options) | Message / Why You?
- Submit button: **APPLY NOW** — full width, yellow `#f5c518`
- JS validation: highlights empty fields red, email format check, success state on valid submit
- After submit: button turns green, shows "✓ Application Sent!", resets form after 3.5s

### 8. Mission Block
- Background: `#f5f5f5`
- Left: YMM SVG logo graphic + "YOUTH MEDIA MOVEMENT" text
- Right: green box with "OUR MISSION" label + mission statement in italic

### 9. Accreditations
- Background: white
- Row of 4 styled badge pills: AgriSETA | MICT SETA | Saiosh | Certified Innovation Services
- Hover: border and text turn green

### 10. Yellow Banner
- Full-width `#f5c518` background
- Text: *"Youth Media Movement – your **gateway** to a **future** defined by groundbreaking innovation"*

### 11. Footer
- Background: `#0a0a0a`
- 4 columns: Logo + tagline + social icons | Quick Links | Legal | Contact details
- Address: 58 Sovereign Road, Morgens Village, Mitchells Plain, Western Cape, 7785
- Tel: 021 200 5391 | Email: admin@ymm.org.za
- Social icons: Facebook, Instagram, LinkedIn (SVG, 36px circles)
- Bottom bar: copyright line

---

## ⚡ JavaScript Features

All in `js/main.js`:

```
main.js
├── Sticky nav — adds box-shadow class on scroll
├── Hamburger mobile menu — toggle open/close with animation
├── Smooth scroll — all anchor links with navbar offset
├── Hero video fallback — hides video, shows gradient if video errors
├── Scroll reveal — Intersection Observer on .reveal-left / .reveal-right
├── Disciplines stagger — 7 bullets animate in one-by-one on scroll
├── Program card stagger — cards fade in on scroll
├── Program card flip — click to flip, CLOSE button to unflip
├── Testimonials carousel — auto-scroll (5s) + prev/next arrows
└── Apply form validation — red highlight on empty/invalid fields, success state
```

---

## 🤖 Claude Agent Setup (agents/ folder)

The `agents/` folder contains custom instruction files for different Claude tasks on this project.

### How to use in Claude Code
When starting a task, reference the relevant agent file:
```
"Use the instructions in agents/content-agent.md to update the testimonials section"
"Use agents/seo-agent.md to add meta tags to index.html"
```

### Agent Files

**`agents/AGENTS.md`** — Master context file. Always include this at session start.
Contains: project stack, colour palette, file paths, naming conventions.

**`agents/content-agent.md`** — For writing and updating all site copy.
Tone: Professional, inspiring, future-forward. Audience: South African youth + business sponsors.

**`agents/seo-agent.md`** — For adding/updating SEO, meta tags, Open Graph, structured data.
Target keywords: youth tech training South Africa, drone training Cape Town, 3D printing courses.

**`agents/qa-agent.md`** — Testing checklist agent. Use before any deployment.
Checks: all 6 card flips, carousel, form validation, mobile nav, video autoplay.

---

## 🧠 Claude Skills Setup (claude-skills/ folder)

Reusable prompt templates for common development tasks on this project.

### How to use in Claude Code
```
"Use the skill in claude-skills/video-section.md to add a fourth video section"
"Apply claude-skills/css-responsive.md to make the mission block mobile responsive"
```

### Skill Files

| File | What it does |
|---|---|
| `claude-skills/html-component.md` | Template for adding new HTML sections matching YMM's style |
| `claude-skills/css-responsive.md` | Pattern for writing mobile-first CSS matching the breakpoints |
| `claude-skills/js-interaction.md` | Pattern for adding scroll-triggered animations and interactions |
| `claude-skills/form-validation.md` | JS form validation pattern with red highlight and success state |
| `claude-skills/video-section.md` | Correct HTML/CSS for adding autoplay video backgrounds |

---

## 🚀 Getting Started with Claude Code

### Install Claude Code
```bash
npm install -g @anthropic-ai/claude-code
```

### Start Claude Code in this project
```bash
cd ymm-website
claude
```

### Initialise the repo (first time)
```bash
git init
git add .
git commit -m "Initial YMM website build"
```

### Recommended first message to Claude Code
Paste this at the start of each session:

```
I'm working on the YMM (Youth Media Movement) website rebuild.
Stack: pure HTML/CSS/Vanilla JS — no frameworks.
Read the README.md for full project context.
The main file is index.html, styles in css/style.css, scripts in js/main.js.
Videos go in the /videos/ folder with these names:
  hero-background.mp4, about-3dprinter.mp4, apply-drone.mp4
Colour palette: green #2d8a2d, yellow #f5c518, black #0a0a0a
Font: Montserrat (headings) + Open Sans (body)
```

---

## ✅ Pre-Launch Checklist

### Videos
- [ ] `videos/hero-background.mp4` placed (under 10MB, 1080p+)
- [ ] `videos/about-3dprinter.mp4` placed
- [ ] `videos/apply-drone.mp4` placed
- [ ] All video tags have `poster="images/[name]-poster.jpg"` fallback images
- [ ] Tested autoplay on iPhone Safari (must be muted + playsinline)

### Functionality
- [ ] All 6 program card flips work (click front → flips, CLOSE → flips back)
- [ ] Testimonials carousel auto-scrolls every 5 seconds
- [ ] Testimonials left/right arrows work
- [ ] Apply form shows red on empty submit
- [ ] Apply form shows success state on valid submit
- [ ] Mobile hamburger menu opens and closes
- [ ] All nav links smooth scroll to correct section

### Responsive
- [ ] Desktop (1280px+) — full layout
- [ ] Tablet (768–1023px) — 2-col programs grid, 2 testimonials
- [ ] Mobile (max 767px) — hamburger menu, single column, videos still play
- [ ] iPhone SE (375px) — nothing overflows

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari (desktop)
- [ ] Safari (iPhone)
- [ ] Samsung Internet (Android)

### SEO & Accessibility
- [ ] `<title>` tag set
- [ ] Meta description added
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] All images have `alt` attributes
- [ ] Form labels linked to inputs with `for`/`id`
- [ ] Sufficient colour contrast (green on white)

---

## 🔧 Common Claude Code Tasks

### Add a new program card
```
Add a 7th program card to the programs grid in index.html.
Program name: "Cybersecurity & Ethical Hacking"
Description: "Defend digital infrastructure and learn ethical penetration testing."
Back content: Network Security, Ethical Hacking, Penetration Testing, Digital Forensics, Security Architecture
Use the same card HTML structure as the existing 6 cards.
```

### Update testimonial content
```
Update the testimonials section in index.html.
Replace the Nadia Khumalo card with:
Name: Sipho Dlamini | Role: Robotics Engineer
Quote: "The robotics program gave me hands-on skills I couldn't find anywhere else in Cape Town."
Keep all other cards as-is.
```

### Add a new section
```
Add a new "Partners" section between the Mission block and Accreditations section.
Background: white. Heading: "Our Partners". 
Show a row of 3 placeholder partner logo boxes.
Match the existing spacing and style conventions from style.css.
```

### Make a section more mobile-friendly
```
The disciplines-grid in style.css needs to be improved on mobile screens.
On max-width 767px: stack the two columns, hide the orbit graphic,
and make the disc-items slightly larger for touch targets.
```

---

## 📞 Client Details

| Field | Info |
|---|---|
| Organisation | Youth Media Movement |
| Website | https://ymm.org.za |
| Address | 58 Sovereign Road, Morgens Village, Mitchells Plain, Western Cape, 7785 |
| Tel | 021 200 5391 |
| Email | admin@ymm.org.za |
| © | 2025 Youth Media Movement |

---

*Last updated: April 2026*
