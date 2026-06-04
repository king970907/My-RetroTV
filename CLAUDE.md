# CLAUDE.md

RetroTV Portfolio — React + TypeScript single-page portfolio.
Central scene: CRT TV (channel-switching) + CD Player + CD binder carousel.
See README.md for full concept and component map.

## Tech Stack

| Role | Package |
|------|---------|
| Framework | React 18 + TypeScript 5 (strict) |
| Build | Vite 5 — use `@/` alias for all `src/` imports |
| Animation | GSAP 3 (timelines) · Framer Motion (declarative) |
| 3D | Three.js + React Three Fiber + Drei (CSS 3D preferred first) |
| Styling | CSS Modules |

## Data Layer

- `src/data/channels.ts` — `Channel[]` — id, name, color, component (ReactNode)
- `src/data/projects.ts` — `Project[]` — id, title, description, tech[], url, thumbnail?
- Thumbnails: `public/thumbnails/<id>.webp` (WebP, max 400×400)
- No API calls — everything is static

## Git

- Branches: `feat/<name>` · `fix/<name>` · `style/<name>`
- Commits: imperative present tense (`add CRT vignette`, `fix tray timing`)
- No `console.log` in production paths
