# Animation Rules

## GSAP — use for multi-stage timelines
Appropriate cases:
- Channel-switch: static noise burst → content swap
- CD tray open/close sequence
- TV screen zoom-to-fullscreen when a project is opened
- Any animation that requires coordinating 3+ properties or elements

Always clean up to prevent memory leaks:
```ts
useEffect(() => {
  const tween = gsap.to(ref.current, { ... })
  return () => tween.kill()
}, [])
```
Or use `gsap.context()` / `gsap.killTweensOf(target)` on unmount.

## Framer Motion — use for declarative enter/exit
Appropriate cases:
- Boot screen fade in/out
- Simple `opacity`, `scale`, `y` transitions
- Components that mount/unmount and need exit animations

## CSS transitions — use for hover/micro-interactions
Appropriate cases:
- Button/knob hover states
- CD disc slide-out (single `transform` property)
- Any single-property transition under 300ms

## CRT Screen ownership
- `CRTScreen` owns ALL visual CRT effects: scanlines, vignette, glare, channel-switch noise
- Channel content components render data/layout only — no overlays, no canvas, no filters
- The noise canvas RAF loop runs **only** while `isSwitching === true`; always cancel on cleanup
