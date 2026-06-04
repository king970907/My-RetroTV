import RetroTV from '@/components/tv/RetroTV'
import CDPlayer from '@/components/cd/CDPlayer'
import CDCase from '@/components/cd/CDCase'
import styles from './MainScene.module.css'

export default function MainScene() {
  return (
    <div className={styles.scene}>
      <div className={styles.furniture}>
        {/* TV unit — center top */}
        <div className={styles.tvSlot}>
          <RetroTV />
        </div>

        {/* Bottom shelf: CD Player left, CD Case right */}
        <div className={styles.shelf}>
          <CDPlayer />
          <CDCase />
        </div>
      </div>
    </div>
  )
}
