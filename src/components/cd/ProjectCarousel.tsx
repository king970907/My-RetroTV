import { useRef, useState } from 'react'
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

export default function ProjectCarousel({ isOpen, onSelect, onClose }: Props) {
  const [scrollOffset, setScrollOffset] = useState(0)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    dragStartX.current = e.clientX - scrollOffset
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    setScrollOffset(e.clientX - dragStartX.current)
  }

  const handleMouseUp = () => { isDragging.current = false }

  if (!isOpen) return null

  return createPortal(
    <div className={styles.overlay}>
      <div
        className={styles.track}
        style={{ transform: `translateX(${scrollOffset}px)` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {PROJECTS.map((project, i) => (
          <CDSleeve
            key={project.id}
            project={project}
            index={i}
            total={PROJECTS.length}
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
