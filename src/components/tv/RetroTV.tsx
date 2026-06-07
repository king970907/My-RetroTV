import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import CRTScreen from './CRTScreen'
import ChannelContent from './ChannelContent'
import { ProjectChannel } from './ProjectChannel'
import { CHANNELS } from '@/data/channels'
import type { Project } from '@/cores/types/project'
import styles from './RetroTV.module.css'

interface Props {
  selectedProject: Project | null
  onProjectKnob: (direction: 'prev' | 'next') => void
  onScreenClick: (channelIndex: number) => void
  bezelRef: RefObject<HTMLDivElement>
}

export default function RetroTV({ selectedProject, onProjectKnob, onScreenClick, bezelRef }: Props) {
  const [activeChannel, setActiveChannel] = useState(0)
  const [isSwitching, setIsSwitching] = useState(false)
  const isFirstRender = useRef(true)
  const prevProjectIdRef = useRef<string | null>(null)
  const channelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (channelTimerRef.current) clearTimeout(channelTimerRef.current)
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      prevProjectIdRef.current = selectedProject?.id ?? null
      return
    }
    const prevId = prevProjectIdRef.current
    prevProjectIdRef.current = selectedProject?.id ?? null

    // Skip CRT noise and knob block when returning from project mode to channels —
    // only play the transition effect when entering or switching between projects
    if (!selectedProject && prevId !== null) return

    setIsSwitching(true)
    const timer = setTimeout(() => setIsSwitching(false), 400)
    return () => clearTimeout(timer)
  }, [selectedProject])

  const handleKnob = (direction: 'prev' | 'next') => {
    if (isSwitching) return
    if (selectedProject) {
      setIsSwitching(true)  // set immediately to debounce rapid clicks before useEffect fires
      onProjectKnob(direction)
      return
    }
    const next = direction === 'next'
      ? (activeChannel + 1) % CHANNELS.length
      : (activeChannel - 1 + CHANNELS.length) % CHANNELS.length
    if (channelTimerRef.current) clearTimeout(channelTimerRef.current)
    setIsSwitching(true)
    channelTimerRef.current = setTimeout(() => {
      setActiveChannel(next)
      setIsSwitching(false)
    }, 400)
  }

  return (
    <div className={styles.tv}>
      <div className={styles.body}>

        <div className={styles.screenPanel}>
          <div
            ref={bezelRef}
            className={`${styles.bezel} ${styles.bezelClickable}`}
            onClick={() => onScreenClick(activeChannel)}
          >
            <CRTScreen isSwitching={isSwitching}>
              {selectedProject
                ? <ProjectChannel project={selectedProject} />
                : <ChannelContent channel={CHANNELS[activeChannel]} />
              }
            </CRTScreen>
          </div>
        </div>

        <div className={styles.controlPanel}>
          <div className={styles.channelDisplay}>
            {selectedProject ? 'PRJ' : `CH ${(activeChannel + 1).toString().padStart(2, '0')}`}
          </div>

          <div className={styles.knobsWrapper}>
            <div className={styles.knobGroup}>
              <button
                className={styles.knob}
                onClick={() => handleKnob('prev')}
                aria-label={selectedProject ? 'Previous project' : 'Previous channel'}
              />
              <span className={styles.knobLabel}>{selectedProject ? 'PRJ ▲' : 'CH ▲'}</span>
            </div>

            <div className={styles.knobGroup}>
              <button
                className={styles.knob}
                onClick={() => handleKnob('next')}
                aria-label={selectedProject ? 'Next project' : 'Next channel'}
              />
              <span className={styles.knobLabel}>{selectedProject ? 'PRJ ▼' : 'CH ▼'}</span>
            </div>
          </div>

          <div className={styles.decorRow}>
            <div className={styles.decorDot} />
            <div className={styles.decorDot} />
            <div className={styles.powerLed} />
          </div>
        </div>

      </div>
    </div>
  )
}
