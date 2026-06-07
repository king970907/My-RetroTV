# TypeScript Rules

- Strict mode is on — no implicit `any`, no `as any` casts
- Non-null assertions (`!`) are only allowed with an inline comment explaining why null is impossible
- Props interfaces declared inline directly above the component they belong to; move to `src/cores/types/<domain>.ts` only when shared across 3+ components
- Shared named constants (numeric tuning values, layout constants) go in `src/cores/const/<domain>.ts` — never inline magic numbers that appear in ≥ 2 files
- No barrel `index.ts` re-export files — always import from the concrete module path
- Prefer named exports everywhere; `App` is the only allowed default export
- Functional components only — no class components
- No comments that describe WHAT code does; only add a comment when the WHY is non-obvious (hidden constraint, bug workaround, surprising invariant)
