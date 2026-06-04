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

  const handleKnobClick = (direction: 'prev' | 'next') => {
    const next = direction === 'next'
      ? (activeChannel + 1) % CHANNELS.length
      : (activeChannel - 1 + CHANNELS.length) % CHANNELS.length
    switchChannel(next)
  }

  return (
    <div className={styles.tv}>
      {/* TV body */}
      <div className={styles.body}>
        {/* CRT bezel + screen */}
        <div className={styles.bezel}>
          <CRTScreen isSwitching={isSwitching}>
            <ChannelContent channel={CHANNELS[activeChannel]} />
          </CRTScreen>
        </div>

        {/* Channel indicator */}
        <div className={styles.channelBadge}>
          CH {(activeChannel + 1).toString().padStart(2, '0')}
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <button
            className={styles.knob}
            onClick={() => handleKnobClick('prev')}
            aria-label="Previous channel"
          />
          <div className={styles.speaker}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={styles.speakerDot} />
            ))}
          </div>
          <button
            className={styles.knob}
            onClick={() => handleKnobClick('next')}
            aria-label="Next channel"
          />
        </div>
      </div>

      {/* TV legs */}
      <div className={styles.legs}>
        <div className={styles.leg} />
        <div className={styles.leg} />
      </div>
    </div>
  )
}
