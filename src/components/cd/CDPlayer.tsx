import { useEffect, useRef, useState } from 'react'
import ProjectCarousel from './ProjectCarousel'
import type { Project } from '@/cores/types/project'
import styles from './CDPlayer.module.css'

interface Props {
  selectedProject: Project | null
  onProjectSelect: (project: Project | null) => void
}

export default function CDPlayer({ selectedProject, onProjectSelect }: Props) {
  const [loadedProject, setLoadedProject] = useState<Project | null>(null)
  const [isTrayOpen, setIsTrayOpen] = useState(false)
  const [isListOpen, setIsListOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isPlaying = selectedProject !== null && selectedProject.id === loadedProject?.id

  // Sync loadedProject when selectedProject is changed externally (e.g. TV knob switching projects).
  // Also closes the carousel if it happens to be open — keeps UI consistent.
  useEffect(() => {
    if (selectedProject && selectedProject.id !== loadedProject?.id) {
      setLoadedProject(selectedProject)
      if (isListOpen) closeList()
    }
  }, [selectedProject])

  // Cancel any pending tray timer on unmount to prevent stale setState calls
  useEffect(() => () => clearTimer(), [])

  const clearTimer = () => { if (timerRef.current) clearTimeout(timerRef.current) }

  const handleEject = () => {
    clearTimer()
    if (isTrayOpen || isListOpen) {
      setIsListOpen(false)
      timerRef.current = setTimeout(() => setIsTrayOpen(false), 250)
    } else {
      if (isPlaying) onProjectSelect(null)
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
    setLoadedProject(project)
  }

  const handlePlay = () => {
    if (!loadedProject) return
    onProjectSelect(isPlaying ? null : loadedProject)
  }

  return (
    <div className={styles.player}>
      <div className={styles.brand}>RETRO · CD</div>

      <div className={styles.trayArea}>
        <div className={`${styles.tray} ${isTrayOpen ? styles.open : ''}`}>
          {loadedProject && (
            <div className={`${styles.disc} ${isPlaying ? styles.spinning : ''}`}>
              <div className={styles.discCenter} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.display}>
        <span>{loadedProject?.title ?? '---'}</span>
      </div>

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
          disabled={!loadedProject}
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
