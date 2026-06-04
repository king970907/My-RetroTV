import RetroTV from '@/components/tv/RetroTV'
import CDPlayer from '@/components/cd/CDPlayer'
import CDCase from '@/components/cd/CDCase'
import styles from './MainScene.module.css'

export default function MainScene() {
  return (
    <div className={styles.scene}>
      <div className={styles.stage}>

        {/* TV + CDPlayer stacked as one unit */}
        <div className={styles.tvUnit}>
          <RetroTV />
          <CDPlayer />
        </div>

        {/* CD binder — beside, aligned to bottom of the unit */}
        <div className={styles.caseSlot}>
          <CDCase />
        </div>

      </div>
    </div>
  )
}
