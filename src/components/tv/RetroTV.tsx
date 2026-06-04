import { useState } from 'react'
import CRTScreen from './CRTScreen'
import ChannelContent from './ChannelContent'
import { CHANNELS } from '@/data/channels'
import styles from './RetroTV.module.css'

export default function RetroTV() {
  const [activeChannel, setActiveChannel] = useState(0)
  const [isSwitching, setIsSwitching] = useState(false)

  const switchChannel = (next: number) => {
    if (isSwitching) return
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

  return (
    <div className={styles.tv}>
      <div className={styles.body}>

        {/* Left — screen */}
        <div className={styles.screenPanel}>
          <div className={styles.bezel}>
            <CRTScreen isSwitching={isSwitching}>
              <ChannelContent channel={CHANNELS[activeChannel]} />
            </CRTScreen>
          </div>
        </div>

        {/* Right — control panel */}
        <div className={styles.controlPanel}>
          {/* LED channel display */}
          <div className={styles.channelDisplay}>
            CH {(activeChannel + 1).toString().padStart(2, '0')}
          </div>

          {/* Knob: prev channel */}
          <div className={styles.knobGroup}>
            <button
              className={styles.knob}
              onClick={() => handleKnob('prev')}
              aria-label="Previous channel"
            />
            <span className={styles.knobLabel}>CH ▲</span>
          </div>

          {/* Knob: next channel */}
          <div className={styles.knobGroup}>
            <button
              className={styles.knob}
              onClick={() => handleKnob('next')}
              aria-label="Next channel"
            />
            <span className={styles.knobLabel}>CH ▼</span>
          </div>

          {/* Decorative dots */}
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
