import { useEffect, useRef, useState } from 'react'
import RetroTV from '@/components/tv/RetroTV'
import TVModal from '@/components/tv/TVModal'
import CDPlayer from '@/components/cd/CDPlayer'
import CDCase from '@/components/cd/CDCase'
import type { Project } from '@/data/projects'
import styles from './MainScene.module.css'

export default function MainScene() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedChannelIndex, setExpandedChannelIndex] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const bezelRef = useRef<HTMLDivElement>(null)
  const isExpandedRef = useRef(false)

  const target  = useRef({ scale: 1 })
  const current = useRef({ scale: 1 })
  const rafId   = useRef(0)

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (isExpandedRef.current) return
      e.preventDefault()
      target.current.scale = Math.max(
        0.55,
        Math.min(1.35, target.current.scale - e.deltaY * 0.0008)
      )
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      current.current.scale = lerp(current.current.scale, target.current.scale, 0.08)

      if (stageRef.current) {
        stageRef.current.style.transform = `scale(${current.current.scale.toFixed(4)})`
      }

      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('wheel', onWheel)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  const handleScreenClick = (channelIndex: number) => {
    setExpandedChannelIndex(channelIndex)
    setIsExpanded(true)
    isExpandedRef.current = true
  }

  const handleModalClose = () => {
    setIsExpanded(false)
    isExpandedRef.current = false
  }

  return (
    <div className={styles.scene}>
      <div className={styles.stage} ref={stageRef}>

        <div className={styles.tvUnit}>
          <RetroTV
            selectedProject={selectedProject}
            onProjectClose={() => setSelectedProject(null)}
            onScreenClick={handleScreenClick}
            bezelRef={bezelRef}
          />
          <CDPlayer />
        </div>

        <div className={styles.caseSlot}>
          <CDCase onProjectSelect={setSelectedProject} />
        </div>

      </div>

      <TVModal
        isOpen={isExpanded}
        selectedProject={selectedProject}
        activeChannelIndex={expandedChannelIndex}
        bezelRef={bezelRef}
        onClose={handleModalClose}
      />
    </div>
  )
}
