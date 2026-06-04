import { useState } from 'react'
import type { Project } from '@/data/projects'
import styles from './CDSleeve.module.css'

interface Props {
  project: Project
  index: number
  total: number
}

export default function CDSleeve({ project, index, total }: Props) {
  const [isHovered, setIsHovered] = useState(false)

  /* Slight perspective tilt based on position in carousel */
  const center = (total - 1) / 2
  const offset = index - center
  const rotateY = offset * -8
  const translateZ = Math.abs(offset) * -30

  return (
    <div
      className={styles.sleeveWrapper}
      style={{ transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px)` }}
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

      {/* Hover CTA */}
      {isHovered && (
        <a
          className={styles.cta}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
        >
          VIEW PROJECT →
        </a>
      )}
    </div>
  )
}
