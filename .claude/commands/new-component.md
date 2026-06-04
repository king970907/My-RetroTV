Scaffold a new component for the RetroTV portfolio project.

Arguments: `<section>/<ComponentName>` — e.g. `tv/StaticOverlay` or `cd/DiscLabel`

Steps:
1. Create `src/components/$ARGUMENTS.tsx` with:
   - Named export
   - Inline Props interface (if it takes props)
   - Import its CSS Module as `styles`
   - No placeholder comments — leave the JSX minimal but valid

2. Create `src/components/$ARGUMENTS.module.css` with:
   - A root class matching the component's wrapper element
   - Use design tokens from `global.css` (e.g. `var(--color-crt-green)`)
   - No hard-coded colour or spacing values that duplicate existing tokens

Rules that apply:
- TypeScript strict — no `any`
- No barrel index.ts
- CSS Modules only, no inline styles except computed values
- No comments unless WHY is non-obvious
