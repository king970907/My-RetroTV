import type { Project } from '@/data/projects'
import styles from './ProjectChannel.module.css'

interface Props {
  project: Project
}

export function ProjectChannel({ project }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tag}>◈ PROJECT PREVIEW</div>

      <h2 className={styles.title}>{project.title}</h2>

      <p className={styles.description}>{project.description}</p>

      <div className={styles.techList}>
        {project.tech.map(t => (
          <span key={t} className={styles.techTag}>{t}</span>
        ))}
      </div>

      <div className={styles.cta}>[ CLICK SCREEN TO OPEN ]</div>
    </div>
  )
}
