# Pawan Veer Arya — Portfolio

A clean, minimal, dark-themed personal portfolio built with **React (Vite)**,
**Tailwind CSS**, **Framer Motion** (scroll animations), and **Lenis** (smooth
scrolling). Accent color: Electric Orange `#FF4500`.

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
├─ main.jsx            # React entry
├─ App.jsx             # App shell (Navbar + sections + Footer)
├─ index.css          # Tailwind + global styles (Lenis styles included)
├─ hooks/
│  └─ useLenis.js      # Lenis smooth-scroll setup + anchor scrolling
├─ components/
│  ├─ Navbar.jsx       # Fixed responsive nav (mobile menu)
│  ├─ Footer.jsx
│  └─ Reveal.jsx       # Reusable Framer Motion scroll-in wrapper (whileInView)
├─ sections/
│  ├─ Hero.jsx         # Animated name entrance + tagline
│  ├─ About.jsx
│  ├─ Projects.jsx     # 3-card responsive grid
│  ├─ Skills.jsx       # Animated tag list
│  └─ Contact.jsx
└─ data/
   └─ content.js       # ← EDIT THIS to swap placeholder links/email/projects
```

## Swap the placeholders

All placeholder links live in **one file**: `src/data/content.js`.

- `CONTACT.email` — your email
- `CONTACT.github` — your GitHub profile URL
- `PROJECTS[].github` — each project's repo URL

They're marked with `// PLACEHOLDER` comments so they're easy to find.

## Customizing

- **Accent color / background:** `tailwind.config.js` (`accent`, `ink`, `ink-soft`).
- **Animations:** tweak `src/components/Reveal.jsx` (shared) or per-section variants.
- **Smooth-scroll feel:** adjust `duration`/`easing` in `src/hooks/useLenis.js`.
