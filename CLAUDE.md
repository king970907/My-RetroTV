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

- `src/data/channels.ts` — `CHANNELS: Channel[]` — id, name, color, component (ReactNode)
- `src/data/projects.ts` — `PROJECTS: Project[]` — id, title, description, tech[], url, thumbnail?
- Thumbnails: `public/thumbnails/<id>.webp` (WebP, max 400×400)
- No API calls — everything is static

## Cores

Shared constants and types used across multiple components live in `src/cores/`:

| Path | Contents |
|------|---------|
| `src/cores/types/project.ts` | `Project` interface |
| `src/cores/types/channel.ts` | `Channel` interface |
| `src/cores/const/carousel.ts` | `ITEM_STEP`, coverflow visual tuning constants |
| `src/cores/const/scene.ts` | `ZOOM_MIN/MAX`, wheel sensitivity, lerp factor |

Rules:
- Always import types from `@/cores/types/<file>`, not from `@/data/`
- Always import shared numeric constants from `@/cores/const/<file>`
- Do **not** create barrel `index.ts` files inside `src/cores/` — import from the concrete module path
- Component-local magic numbers (animation timers, one-off offsets) do not need to move here; only values shared across ≥ 2 files or that form a coherent tuning set belong in cores

## Git

- Branches: `feat/<name>` · `fix/<name>` · `style/<name>`
- Commits: imperative present tense (`add CRT vignette`, `fix tray timing`)
- No `console.log` in production paths
