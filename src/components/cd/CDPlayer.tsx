import { useEffect, useRef, useState } from 'react'
import ProjectCarousel from './ProjectCarousel'
import type { Project } from '@/data/projects'
import styles from './CDPlayer.module.css'

interface Props {
  selectedProject: Project | null
  onProjectSelect: (project: Project) => void
}

export default function CDPlayer({ selectedProject, onProjectSelect }: Props) {
  const [isTrayOpen, setIsTrayOpen] = useState(false)
  const [isListOpen, setIsListOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Clear playback state when project is deselected (BACK pressed)
  useEffect(() => {
    if (!selectedProject) setIsPlaying(false)
  }, [selectedProject])

  const clearTimer = () => { if (timerRef.current) clearTimeout(timerRef.current) }

  const handleEject = () => {
    clearTimer()
    if (isTrayOpen || isListOpen) {
      setIsListOpen(false)
      timerRef.current = setTimeout(() => setIsTrayOpen(false), 250)
    } else {
      setIsTrayOpen(true)
      timerRef.current = setTimeout(() => setIsListOpen(true), 500)
    }
  }

  const closeList = () => {
    clearTimer()
    setIsListOpen(false)
    timerRef.current = setTimeout(() => setIsTrayOpen(false), 250)
  }

  const handleSelect = (project: Project) => {
    closeList()
    setIsPlaying(false)
    onProjectSelect(project)
  }

  const handlePlay = () => {
    if (!selectedProject) return
    setIsPlaying(prev => !prev)
  }

  return (
    <div className={styles.player}>
      {/* Brand label */}
      <div className={styles.brand}>RETRO · CD</div>

      {/* Tray window */}
      <div className={styles.trayArea}>
        <div className={`${styles.tray} ${isTrayOpen ? styles.open : ''}`}>
          {selectedProject && (
            <div className={`${styles.disc} ${isPlaying ? styles.spinning : ''}`}>
              <div className={styles.discCenter} />
            </div>
          )}
        </div>
      </div>

      {/* Display */}
      <div className={styles.display}>
        <span>{selectedProject?.title ?? '---'}</span>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button
          className={`${styles.btn} ${isTrayOpen ? styles.btnActive : ''}`}
          onClick={handleEject}
          aria-label="Open disc list"
        >
          ⏏
        </button>
        <button
          className={`${styles.btn} ${styles.playBtn}`}
          onClick={handlePlay}
          disabled={!selectedProject}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>

      <ProjectCarousel
        isOpen={isListOpen}
        onSelect={handleSelect}
        onClose={closeList}
      />
    </div>
  )
}
