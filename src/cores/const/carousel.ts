export const ITEM_STEP = 240 // sleeve width (200) + gap (40)

// Coverflow visual tuning — all values apply per normalized step (t = distFromCenter / ITEM_STEP)
export const COVERFLOW_ROTATE_MAX     = 50   // max rotateY degrees (clamped at |t| = 1)
export const COVERFLOW_SCALE_RATE     = 0.15 // scale reduction per step
export const COVERFLOW_SCALE_MIN      = 0.72 // floor scale for far items
export const COVERFLOW_DEPTH          = 45   // translateZ pixels per step (max 2 steps = 90px)
export const COVERFLOW_BRIGHTNESS_RATE = 0.22 // brightness reduction per step
export const COVERFLOW_BRIGHTNESS_MIN  = 0.55 // floor brightness for far items
