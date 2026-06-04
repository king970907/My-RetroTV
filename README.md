# My RetroTV — Personal Portfolio

A retro-themed interactive portfolio website built with React + TypeScript.

The main scene features a vintage CRT television, a CD player, and a CD binder — each acting as a different interactive element to explore personal info and work projects.

---

## Concept

```
Main Scene
├── RetroTV (center)      — Channel-switching displays About / Experience / Skills / Contact
├── CDPlayer (bottom)     — Accepts a CD and "plays" it, enlarging the TV to open a project link
└── CDCase (beside)       — 3D carousel of CD sleeves; hover slides the disc out; click loads it
```

## Tech Stack

| Role | Package |
|------|---------|
| Framework | React 18 + TypeScript 5 |
| Build | Vite 5 |
| 3D / Scenes | Three.js + React Three Fiber + Drei |
| Animation | GSAP 3 + Framer Motion |
| Styling | CSS Modules + CSS custom properties |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type-check only
npm run type-check

# Production build
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── scene/          — MainScene layout
│   ├── tv/             — RetroTV, CRTScreen, ChannelContent
│   └── cd/             — CDPlayer, CDCase, CDSleeve
├── data/
│   ├── channels.ts     — TV channel definitions (personal content)
│   └── projects.ts     — Portfolio project definitions
├── hooks/              — Custom hooks (CRT effects, animations)
├── styles/
│   └── global.css      — Design tokens + reset
└── main.tsx
```

## Adding Content

**TV Channels** — Edit `src/data/channels.ts`, replace the `component: null` placeholder with a real React component.

**Portfolio Projects** — Edit `src/data/projects.ts`, fill in real project data and place thumbnail images in `public/thumbnails/`.
