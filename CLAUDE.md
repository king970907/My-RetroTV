# CLAUDE.md — Development Standards

This file defines the conventions and rules for working on this project with Claude Code.

---

## Project Overview

RetroTV Portfolio — a React + TypeScript single-page portfolio with CRT TV, CD Player, and CD binder interactions. See README.md for the full concept.

---

## Tech Stack Rules

- **React 18 + TypeScript 5** — strict mode enabled, no `any`
- **Vite 5** — use `@/` path alias for all src imports
- **CSS Modules** — all component styles live in `ComponentName.module.css` alongside the tsx
- **GSAP** — for complex multi-step animation timelines (channel switching, CD tray, TV zoom)
- **Framer Motion** — for simple declarative enter/exit transitions on UI elements
- **Three.js / R3F** — reserved for 3D enhancements; avoid if CSS 3D transforms suffice

---

## Code Style

- TypeScript strict mode — no implicit `any`, no non-null assertions without a comment justifying it
- Functional components only, no class components
- Prefer named exports; only `App` uses a default export at the route root
- Props interfaces are declared inline above the component, not in a separate types file unless shared
- No barrel `index.ts` files — import directly from the module file
- No comments that describe WHAT the code does; only add a comment when the WHY is non-obvious

---

## File & Folder Conventions

```
src/
├── components/
│   ├── scene/      — Layout shells only; no logic
│   ├── tv/         — Everything TV/CRT related
│   └── cd/         — Everything CD/Player related
├── data/           — Static data (channels, projects) — plain TypeScript objects
├── hooks/          — Custom hooks prefixed with `use`
└── styles/         — global.css only; component styles go in CSS Modules
```

- Component file: `PascalCase.tsx`
- Style file: `PascalCase.module.css` (same name as component)
- Hook file: `useCamelCase.ts`
- Data file: `camelCase.ts`

---

## Animation Guidelines

### GSAP
Use for:
- Channel-switch static noise + content swap
- CD tray open/close
- TV screen zoom-to-fullscreen when a CD is played
- Any animation that has a complex timeline with multiple stages

Always clean up with `gsap.killTweensOf(target)` or a returned cleanup in `useEffect`.

### Framer Motion
Use for:
- Boot screen fade in/out
- CD sleeve hover reveals
- Simple opacity/scale transitions

### CSS Transitions
Use for:
- Hover states on buttons/knobs
- CD disc slide-out (transform only)
- Fast, single-property transitions < 300ms

---

## CRT Screen Rules

- The `CRTScreen` component owns ALL visual CRT effects (scanlines, vignette, noise)
- Channel content components render ONLY the data/layout — they must not add their own overlays
- Canvas-based noise is rendered only during `isSwitching === true` to avoid constant RAF overhead

---

## Data Layer

- `src/data/channels.ts` — defines `Channel[]`; each entry has an `id`, `name`, `color`, and `component` (ReactNode)
- `src/data/projects.ts` — defines `Project[]`; thumbnail images go under `public/thumbnails/<project-id>.jpg`
- Never fetch data from an API; everything is static for this portfolio

---

## Performance Rules

- No animation RAF loops when idle — always cancel on unmount
- Images in `/public/thumbnails/` should be WebP, max 400×400px
- Lazy-load the CD carousel content (it is hidden behind a click)
- Avoid re-renders in animation callbacks — use refs, not state, for animation targets

---

## Git Conventions

- Branches: `feat/<name>`, `fix/<name>`, `style/<name>`
- Commit messages: imperative mood, present tense (`add CRT vignette`, `fix tray animation timing`)
- No commits with `console.log` left in production paths

---

## What NOT to Do

- Do not use `styled-components` or `emotion` — CSS Modules only
- Do not install a charting library or icon library — draw icons with SVG/CSS
- Do not add a router — this is a single-page experience with no URL routes
- Do not add a state management library (Redux, Zustand) — local state + props is enough
- Do not make this responsive for mobile — desktop-first, min-width 1024px is the target
