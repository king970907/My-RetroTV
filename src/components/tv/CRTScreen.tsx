import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import styles from './CRTScreen.module.css'

interface Props {
  isSwitching: boolean
  children: ReactNode
}

export default function CRTScreen({ isSwitching, children }: Props) {
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!isSwitching) {
      cancelAnimationFrame(rafRef.current)
      return
    }

    const canvas = noiseCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawNoise = () => {
      const { width, height } = canvas
      const imageData = ctx.createImageData(width, height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255
        data[i] = v
        data[i + 1] = v
        data[i + 2] = v
        data[i + 3] = 255
      }
      ctx.putImageData(imageData, 0, 0)
      rafRef.current = requestAnimationFrame(drawNoise)
    }

    rafRef.current = requestAnimationFrame(drawNoise)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isSwitching])

  return (
    <div className={styles.screen}>
      {/* Content */}
      <div className={`${styles.content} ${isSwitching ? styles.hidden : ''}`}>
        {children}
      </div>

      {/* Static noise overlay when switching */}
      {isSwitching && (
        <canvas
          ref={noiseCanvasRef}
          className={styles.noise}
          width={320}
          height={240}
        />
      )}

      {/* Persistent CRT overlays */}
      <div className={styles.scanlines} aria-hidden />
      <div className={styles.vignette} aria-hidden />
      <div className={styles.glare} aria-hidden />
    </div>
  )
}
