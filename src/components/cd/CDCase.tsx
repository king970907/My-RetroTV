import { useRef, useState } from 'react'
import CDSleeve from './CDSleeve'
import { PROJECTS } from '@/data/projects'
import type { Project } from '@/data/projects'
import styles from './CDCase.module.css'

interface Props {
  onProjectSelect: (project: Project) => void
}

export default function CDCase({ onProjectSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [scrollOffset, setScrollOffset] = useState(0)
  const isDragging = useRef(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    setDragStartX(e.clientX - scrollOffset)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    setScrollOffset(e.clientX - dragStartX)
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleProjectSelect = (project: Project) => {
    setIsOpen(false)
    onProjectSelect(project)
  }

  return (
    <div className={styles.wrapper}>
      {!isOpen && (
        <button className={styles.binder} onClick={() => setIsOpen(true)}>
          <span className={styles.binderLabel}>PORTFOLIO</span>
          <span className={styles.binderSub}>CLICK TO OPEN</span>
        </button>
      )}

      {isOpen && (
        <div className={styles.carousel}>
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
                onSelect={handleProjectSelect}
              />
            ))}
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
