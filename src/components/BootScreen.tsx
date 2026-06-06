import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './BootScreen.module.css'

interface Props {
  onDone: () => void
}

const LINES = [
  'Dear Customer,',
  '',
  'This is my portfolio website.',
  'Feel free to browse, explore, and review my work.',
  '',
  'Enjoy your visit!',
]
const FULL_TEXT = LINES.join('\n')

// Delay (ms) after typing each character
function charDelay(text: string, index: number): number {
  const ch = text[index]
  const next = text[index + 1]
  if (ch === '\n' && next === '\n') return 260
  if (ch === '\n') return 160
  if (ch === '.') return 120
  if (ch === ',') return 100
  if (ch === '!') return 100
  return 40
}

export default function BootScreen({ onDone }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const waitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isZoomingRef = useRef(false)
  const [charIndex, setCharIndex] = useState(0)
  const [isTypingDone, setIsTypingDone] = useState(false)
  const isTypingDoneRef = useRef(false)

  // Typewriter loop
  useEffect(() => {
    if (charIndex >= FULL_TEXT.length) {
      isTypingDoneRef.current = true
      setIsTypingDone(true)
      return
    }
    timerRef.current = setTimeout(() => {
      setCharIndex(i => i + 1)
    }, charDelay(FULL_TEXT, charIndex))
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [charIndex])

  // After typing done: wait 1s then zoom
  useEffect(() => {
    if (!isTypingDone) return
    waitTimerRef.current = setTimeout(startZoom, 1000)
    return () => { if (waitTimerRef.current) clearTimeout(waitTimerRef.current) }
  }, [isTypingDone])

  const startZoom = () => {
    if (!wrapperRef.current || isZoomingRef.current) return
    isZoomingRef.current = true
    gsap.to(wrapperRef.current, {
      scale: 5,
      autoAlpha: 0,
      duration: 0.65,
      ease: 'power3.in',
      onComplete: onDone,
    })
  }

  const handleClick = () => {
    if (!isTypingDoneRef.current) {
      // Skip typewriter — show full text immediately
      if (timerRef.current) clearTimeout(timerRef.current)
      isTypingDoneRef.current = true
      setCharIndex(FULL_TEXT.length)
      setIsTypingDone(true)
    } else {
      // Skip the 1s wait — cancel pending timer then zoom immediately
      if (waitTimerRef.current) clearTimeout(waitTimerRef.current)
      startZoom()
    }
  }

  const displayed = FULL_TEXT.slice(0, charIndex)

  return (
    <div ref={wrapperRef} className={styles.wrapper} onClick={handleClick}>
      <pre className={styles.text}>
        {displayed}
        {!isTypingDone && <span className={styles.cursor}>▌</span>}
      </pre>
    </div>
  )
}
