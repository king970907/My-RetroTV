import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import CDSleeve from './CDSleeve'
import { PROJECTS } from '@/data/projects'
import type { Project } from '@/data/projects'
import styles from './ProjectCarousel.module.css'

interface Props {
  isOpen: boolean
  onSelect: (project: Project) => void
  onClose: () => void
}

const ITEM_W = 200
const GAP = 40
const STEP = ITEM_W + GAP                                         // 240px per slot
const LOOP_W = PROJECTS.length * STEP                             // 720px — one full cycle
const CONTENT_W = PROJECTS.length * ITEM_W + (PROJECTS.length - 1) * GAP  // 680px — visible span
// Triple-copy for seamless loop: center copy always visible during one full cycle
const ITEMS = [...PROJECTS, ...PROJECTS, ...PROJECTS]

export default function ProjectCarousel({ isOpen, onSelect, onClose }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const initOffsetRef = useRef(0)
  const isPausedRef = useRef(false)
  // Hover-pause is disabled for the first 500ms after open to prevent the overlay
  // rendering under a stationary cursor from immediately freezing the animation.
  const pauseAllowedRef = useRef(false)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!isOpen) return

    const init = Math.round((window.innerWidth - CONTENT_W) / 2)
    initOffsetRef.current = init
    offsetRef.current = init
    isPausedRef.current = false
    pauseAllowedRef.current = false

    const applyOffset = () => {
      if (trackRef.current) {
        trackRef.current.style.transform = `translateY(-50%) translateX(${offsetRef.current}px)`
      }
    }
    applyOffset()

    const enablePause = setTimeout(() => { pauseAllowedRef.current = true }, 500)

    const tick = () => {
      if (!(pauseAllowedRef.current && isPausedRef.current)) {
        offsetRef.current -= 0.5
        if (offsetRef.current <= init - LOOP_W) {
          offsetRef.current += LOOP_W
        }
        applyOffset()
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(enablePause)
    }
  }, [isOpen])

  const handleMouseDown = (e: React.MouseEvent) => {
    isPausedRef.current = true
    isDraggingRef.current = true
    dragStartXRef.current = e.clientX - offsetRef.current
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    offsetRef.current = e.clientX - dragStartXRef.current
    if (trackRef.current) {
      trackRef.current.style.transform = `translateY(-50%) translateX(${offsetRef.current}px)`
    }
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
    isPausedRef.current = false
  }

  if (!isOpen) return null

  return createPortal(
    <div
      className={styles.overlay}
      onMouseEnter={() => { isPausedRef.current = true }}
      onMouseLeave={() => {
        isPausedRef.current = false
        isDraggingRef.current = false
      }}
    >
      <div className={styles.carouselArea}>
        <div
          ref={trackRef}
          className={styles.track}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {ITEMS.map((project, i) => (
            <CDSleeve
              key={`${project.id}-${i}`}
              project={project}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>

      <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
        ✕
      </button>
    </div>,
    document.body
  )
}
