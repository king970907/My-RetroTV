import { useState } from 'react'
import styles from './CDPlayer.module.css'

interface Props {
  activeCDTitle?: string
  onPlay?: () => void
}

export default function CDPlayer({ activeCDTitle, onPlay }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleTray = () => setIsOpen(prev => !prev)

  const handlePlay = () => {
    if (!activeCDTitle) return
    setIsPlaying(prev => !prev)
    onPlay?.()
  }

  return (
    <div className={styles.player}>
      {/* Brand label */}
      <div className={styles.brand}>RETRO · CD</div>

      {/* Tray window */}
      <div className={styles.trayArea}>
        <div className={`${styles.tray} ${isOpen ? styles.open : ''}`}>
          {activeCDTitle && (
            <div className={`${styles.disc} ${isPlaying && !isOpen ? styles.spinning : ''}`}>
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
        <button className={styles.btn} onClick={handleTray} aria-label="Open/close tray">
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
    </div>
  )
}
