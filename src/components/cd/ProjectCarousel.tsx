import { useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import CDSleeve from './CDSleeve'
import { PROJECTS } from '@/data/projects'
import type { Project } from '@/cores/types/project'
import { ITEM_STEP } from '@/cores/const/carousel'
import styles from './ProjectCarousel.module.css'

interface Props {
  isOpen: boolean
  onSelect: (project: Project) => void
  onClose: () => void
}

const N = PROJECTS.length
const CENTER = (N - 1) / 2

export default function ProjectCarousel({ isOpen, onSelect, onClose }: Props) {
  const [scrollOffset, setScrollOffset] = useState(0)
  const [isSnapping, setIsSnapping] = useState(false)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  // Ref mirrors state so handleMouseUp always reads the latest position (no stale closure)
  const scrollOffsetRef = useRef(0)
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const items = useMemo(
    () => PROJECTS.map((project, i) => ({
      project,
      distFromCenter: (i - CENTER) * ITEM_STEP + scrollOffset,
    })),
    [scrollOffset]
  )

  const snapToNearest = (offset: number) => {
    if (snapTimerRef.current) clearTimeout(snapTimerRef.current)
    const bestIdx = Math.max(0, Math.min(N - 1, Math.round(CENTER - offset / ITEM_STEP)))
    const target = -(bestIdx - CENTER) * ITEM_STEP
    scrollOffsetRef.current = target
    setIsSnapping(true)
    setScrollOffset(target)
    snapTimerRef.current = setTimeout(() => setIsSnapping(false), 380)
  }

  // onMouseDown stays on the track (drag origin)
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    dragStartX.current = e.clientX - scrollOffsetRef.current
    if (snapTimerRef.current) clearTimeout(snapTimerRef.current)
    setIsSnapping(false)
  }

  // onMouseMove / onMouseUp / onMouseLeave live on the full-screen overlay so
  // the drag isn't cancelled when the pointer drifts outside the track rect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    const next = e.clientX - dragStartX.current
    scrollOffsetRef.current = next
    setScrollOffset(next)
  }

  const handleMouseUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    snapToNearest(scrollOffsetRef.current)
  }

  if (!isOpen) return null

  return createPortal(
    <div
      className={styles.overlay}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className={styles.track}
        style={{
          transform: `translateX(${scrollOffset}px)`,
          transition: isSnapping ? 'transform 380ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
        }}
        onMouseDown={handleMouseDown}
      >
        {items.map(({ project, distFromCenter }) => (
          <CDSleeve
            key={project.id}
            project={project}
            distFromCenter={distFromCenter}
            onSelect={onSelect}
          />
        ))}
      </div>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
        ✕
      </button>
    </div>,
    document.body
  )
}
