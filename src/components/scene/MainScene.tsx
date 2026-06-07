import { useEffect, useRef, useState } from 'react'
import RetroTV from '@/components/tv/RetroTV'
import TVModal from '@/components/tv/TVModal'
import CDPlayer from '@/components/cd/CDPlayer'
import { PROJECTS } from '@/data/projects'
import type { Project } from '@/cores/types/project'
import { ZOOM_MIN, ZOOM_MAX, ZOOM_WHEEL_SENSITIVITY, ZOOM_LERP_FACTOR } from '@/cores/const/scene'
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
        ZOOM_MIN,
        Math.min(ZOOM_MAX, target.current.scale - e.deltaY * ZOOM_WHEEL_SENSITIVITY)
      )
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      current.current.scale = lerp(current.current.scale, target.current.scale, ZOOM_LERP_FACTOR)

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

  const handleProjectKnob = (direction: 'prev' | 'next') => {
    if (!selectedProject) return
    const idx = PROJECTS.findIndex(p => p.id === selectedProject.id)
    const next = direction === 'next'
      ? (idx + 1) % PROJECTS.length
      : (idx - 1 + PROJECTS.length) % PROJECTS.length
    setSelectedProject(PROJECTS[next])
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
            onProjectKnob={handleProjectKnob}
            onScreenClick={handleScreenClick}
            bezelRef={bezelRef}
          />
          <CDPlayer selectedProject={selectedProject} onProjectSelect={setSelectedProject} />
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
