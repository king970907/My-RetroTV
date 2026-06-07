import { useState } from 'react'
import type { Project } from '@/cores/types/project'
import {
  ITEM_STEP,
  COVERFLOW_ROTATE_MAX,
  COVERFLOW_SCALE_RATE,
  COVERFLOW_SCALE_MIN,
  COVERFLOW_DEPTH,
  COVERFLOW_BRIGHTNESS_RATE,
  COVERFLOW_BRIGHTNESS_MIN,
} from '@/cores/const/carousel'
import styles from './CDSleeve.module.css'

interface Props {
  project: Project
  distFromCenter: number // pixels from viewport center; positive = right of center
  onSelect: (project: Project) => void
}

export default function CDSleeve({ project, distFromCenter, onSelect }: Props) {
  const [isHovered, setIsHovered] = useState(false)

  const t = distFromCenter / ITEM_STEP
  const tAbs = Math.abs(t)
  const rotateY = Math.max(-1, Math.min(1, t)) * -COVERFLOW_ROTATE_MAX
  const scale = Math.max(1 - tAbs * COVERFLOW_SCALE_RATE, COVERFLOW_SCALE_MIN)
  const translateZ = -Math.min(tAbs, 2) * COVERFLOW_DEPTH
  const brightness = Math.max(1 - tAbs * COVERFLOW_BRIGHTNESS_RATE, COVERFLOW_BRIGHTNESS_MIN)

  return (
    <div
      className={styles.sleeveWrapper}
      style={{
        transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
        filter: `brightness(${brightness})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* CD disc — slides out above on hover */}
      <div className={`${styles.disc} ${isHovered ? styles.discOut : ''}`}>
        <div className={styles.discSurface} />
        <div className={styles.discCenter} />
      </div>

      {/* Sleeve / case */}
      <div className={styles.sleeve}>
        <div
          className={styles.artwork}
          style={{ backgroundImage: project.thumbnail ? `url(${project.thumbnail})` : undefined }}
        >
          {!project.thumbnail && (
            <span className={styles.artworkPlaceholder}>{project.title[0]}</span>
          )}
        </div>
        <div className={styles.label}>
          <span className={styles.title}>{project.title}</span>
          <span className={styles.tech}>{project.tech.join(' · ')}</span>
        </div>
      </div>

      {/* Hover CTA — sends project up, does not open URL directly */}
      {isHovered && (
        <button
          className={styles.cta}
          onClick={() => onSelect(project)}
        >
          VIEW PROJECT →
        </button>
      )}
    </div>
  )
}
