import { useRef, useState } from 'react'
import ProjectCarousel from './ProjectCarousel'
import type { Project } from '@/data/projects'
import styles from './CDPlayer.module.css'

interface Props {
  onProjectSelect: (project: Project) => void
}

export default function CDPlayer({ onProjectSelect }: Props) {
  const [isTrayOpen, setIsTrayOpen] = useState(false)
  const [isListOpen, setIsListOpen] = useState(false)
  const [activeCDTitle, setActiveCDTitle] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = () => { if (timerRef.current) clearTimeout(timerRef.current) }

  const handleEject = () => {
    clearTimer()
    if (isTrayOpen || isListOpen) {
      // Close: carousel disappears first, then tray slides back
      setIsListOpen(false)
      timerRef.current = setTimeout(() => setIsTrayOpen(false), 250)
    } else {
      // Open: tray slides out (500ms CSS transition), then carousel appears
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
    setActiveCDTitle(project.title)
    setIsPlaying(false)
    onProjectSelect(project)
  }

  const handlePlay = () => {
    if (!activeCDTitle) return
    setIsPlaying(prev => !prev)
  }

  return (
    <div className={styles.player}>
      {/* Brand label */}
      <div className={styles.brand}>RETRO · CD</div>

      {/* Tray window */}
      <div className={styles.trayArea}>
        <div className={`${styles.tray} ${isTrayOpen ? styles.open : ''}`}>
          {activeCDTitle && (
            <div className={`${styles.disc} ${isPlaying ? styles.spinning : ''}`}>
              <div className={styles.discCenter} />
            </div>
          )}
        </div>
      </div>

      {/* Display */}
      <div className={styles.display}>
        <span>{activeCDTitle ?? '---'}</span>
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
          disabled={!activeCDTitle}
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
