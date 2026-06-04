import { useEffect, useRef, useState } from 'react'
import CRTScreen from './CRTScreen'
import ChannelContent from './ChannelContent'
import { ProjectChannel } from './ProjectChannel'
import { CHANNELS } from '@/data/channels'
import type { Project } from '@/data/projects'
import styles from './RetroTV.module.css'

interface Props {
  selectedProject: Project | null
  onProjectClose: () => void
}

export default function RetroTV({ selectedProject, onProjectClose }: Props) {
  const [activeChannel, setActiveChannel] = useState(0)
  const [isSwitching, setIsSwitching] = useState(false)
  const isFirstRender = useRef(true)

  /* Trigger CRT static noise whenever project mode enters or exits */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setIsSwitching(true)
    const timer = setTimeout(() => setIsSwitching(false), 400)
    return () => clearTimeout(timer)
  }, [selectedProject])

  const switchChannel = (next: number) => {
    if (isSwitching || selectedProject) return
    setIsSwitching(true)
    setTimeout(() => {
      setActiveChannel(next)
      setIsSwitching(false)
    }, 400)
  }

  const handleKnob = (direction: 'prev' | 'next') => {
    const next = direction === 'next'
      ? (activeChannel + 1) % CHANNELS.length
      : (activeChannel - 1 + CHANNELS.length) % CHANNELS.length
    switchChannel(next)
  }

  const handleBezelClick = () => {
    if (!selectedProject) return
    window.open(selectedProject.url, '_blank', 'noopener,noreferrer')
    onProjectClose()
  }

  return (
    <div className={styles.tv}>
      <div className={styles.body}>

        {/* Left — screen */}
        <div className={styles.screenPanel}>
          <div
            className={`${styles.bezel} ${selectedProject ? styles.bezelClickable : ''}`}
            onClick={handleBezelClick}
          >
            <CRTScreen isSwitching={isSwitching}>
              {selectedProject
                ? <ProjectChannel project={selectedProject} />
                : <ChannelContent channel={CHANNELS[activeChannel]} />
              }
            </CRTScreen>
          </div>
        </div>

        {/* Right — control panel */}
        <div className={styles.controlPanel}>
          <div className={styles.channelDisplay}>
            {selectedProject ? 'PRJ' : `CH ${(activeChannel + 1).toString().padStart(2, '0')}`}
          </div>

          {selectedProject ? (
            /* Project mode: show BACK button instead of knobs */
            <button className={styles.backBtn} onClick={onProjectClose}>
              ← BACK
            </button>
          ) : (
            /* Normal mode: channel knobs */
            <>
              <div className={styles.knobGroup}>
                <button
                  className={styles.knob}
                  onClick={() => handleKnob('prev')}
                  aria-label="Previous channel"
                />
                <span className={styles.knobLabel}>CH ▲</span>
              </div>

              <div className={styles.knobGroup}>
                <button
                  className={styles.knob}
                  onClick={() => handleKnob('next')}
                  aria-label="Next channel"
                />
                <span className={styles.knobLabel}>CH ▼</span>
              </div>
            </>
          )}

          <div className={styles.decorRow}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={styles.decorDot} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
