import { useRef, useState } from 'react'
import CDSleeve from './CDSleeve'
import { PROJECTS } from '@/data/projects'
import styles from './CDCase.module.css'

export default function CDCase() {
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

  return (
    <div className={styles.wrapper}>
      {/* Closed state — binder cover */}
      {!isOpen && (
        <button className={styles.binder} onClick={() => setIsOpen(true)}>
          <span className={styles.binderLabel}>PORTFOLIO</span>
          <span className={styles.binderSub}>CLICK TO OPEN</span>
        </button>
      )}

      {/* Open state — 3D carousel */}
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
