import { useState } from 'react'
import RetroTV from '@/components/tv/RetroTV'
import CDPlayer from '@/components/cd/CDPlayer'
import CDCase from '@/components/cd/CDCase'
import type { Project } from '@/data/projects'
import styles from './MainScene.module.css'

export default function MainScene() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className={styles.scene}>
      <div className={styles.stage}>

        <div className={styles.tvUnit}>
          <RetroTV
            selectedProject={selectedProject}
            onProjectClose={() => setSelectedProject(null)}
          />
          <CDPlayer />
        </div>

        <div className={styles.caseSlot}>
          <CDCase onProjectSelect={setSelectedProject} />
        </div>

      </div>
    </div>
  )
}
