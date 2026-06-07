# React Rules

## Component conventions
- One component per file, filename matches component name (`PascalCase.tsx`)
- Co-locate the CSS Module at `PascalCase.module.css` in the same directory
- Hooks file: `useCamelCase.ts` under `src/hooks/`
- Data file: `camelCase.ts` under `src/data/`

## State management
- Local `useState` + props only — do not install Redux, Zustand, or any global state library
- Use `useRef` for animation targets to avoid re-render churn in callbacks
- No React Context unless a value genuinely needs to cross 3+ component levels

## Scope limits (do not add)
- No router — single-page experience, no URL routes
- No mobile responsive styles — desktop-first, min-width 1024px
- No charting or icon libraries — SVG/CSS only
- No `styled-components` or `emotion` — CSS Modules only

## Folder ownership
- `src/components/scene/` — layout shells only, no business logic
- `src/components/tv/` — all CRT/TV concerns
- `src/components/cd/` — all CD Player/Sleeve/Case concerns
- `src/data/` — plain TypeScript data arrays (`PROJECTS`, `CHANNELS`), never async/fetch
- `src/cores/types/` — shared TypeScript interfaces (`Project`, `Channel`) — import from here, not from `src/data/`
- `src/cores/const/` — named numeric constants shared across ≥ 2 files or forming a coherent tuning set
