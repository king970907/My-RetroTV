# CSS Rules

## Styling approach
- CSS Modules exclusively — no `styled-components`, no `emotion`, no Tailwind
- Dynamic values (computed offsets, JS-driven positions) may use inline `style` prop; everything else goes in the module file
- Global design tokens live in `src/styles/global.css` under `:root`; never hard-code a colour or spacing value that already has a token

## Design tokens (reference)
```
--color-bg          #0a0a0a
--color-crt-green   #39ff14
--color-crt-amber   #ffb000
--color-crt-white   #e8e8d0
--font-retro        'VT323', 'Courier New', monospace
--font-body         'Space Mono', 'Courier New', monospace
--transition-fast   150ms ease
--transition-med    300ms ease
--transition-slow   600ms cubic-bezier(0.4, 0, 0.2, 1)
--z-scene / --z-overlay / --z-modal
```

## Performance
- No animation RAF loops when idle — always cancel on unmount
- Thumbnails in `/public/thumbnails/`: WebP format, max 400×400 px
- Lazy-load the CD carousel (it lives behind a click interaction)
- Prefer `transform` and `opacity` for animations — avoid animating layout properties
