import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import type { Project } from '@/cores/types/project'
import type { Channel } from '@/cores/types/channel'
import { CHANNELS } from '@/data/channels'
import styles from './TVModal.module.css'

interface Props {
  isOpen: boolean
  selectedProject: Project | null
  activeChannelIndex: number
  bezelRef: RefObject<HTMLDivElement>
  onClose: () => void
}

export default function TVModal({ isOpen, selectedProject, activeChannelIndex, bezelRef, onClose }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const [isNoisy, setIsNoisy] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    if (!isNoisy) {
      cancelAnimationFrame(rafRef.current)
      return
    }
    const canvas = noiseCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const draw = () => {
      const img = ctx.createImageData(canvas.width, canvas.height)
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v
        img.data[i + 3] = 255
      }
      ctx.putImageData(img, 0, 0)
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isNoisy])

  const runClose = () => {
    const el = wrapperRef.current
    const bezel = bezelRef.current
    if (!el || !bezel) return
    const rect = bezel.getBoundingClientRect()

    setContentVisible(false)
    setIsNoisy(true)

    gsap.timeline({
      onComplete: () => {
        setIsNoisy(false)
        gsap.set(el, { display: 'none' })
        onClose()
      },
    })
      .to(el, {
        top: rect.top, left: rect.left,
        width: rect.width, height: rect.height,
        borderRadius: 22,
        duration: 0.42, ease: 'power3.inOut',
      })
      .to(el, { filter: 'brightness(2.5)', duration: 0.06 }, 0)
      .to(el, { filter: 'brightness(1)', duration: 0.22, ease: 'power2.out' }, 0.06)
  }

  // ESC to close
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') runClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen]) // runClose uses only stable refs/setters — no stale closure risk

  // Open animation
  useEffect(() => {
    const el = wrapperRef.current
    const bezel = bezelRef.current
    if (!isOpen || !el || !bezel) return

    const rect = bezel.getBoundingClientRect()
    setIsNoisy(true)
    setContentVisible(false)

    gsap.set(el, {
      display: 'flex',
      top: rect.top, left: rect.left,
      width: rect.width, height: rect.height,
      borderRadius: 22,
      filter: 'brightness(1)',
      scaleX: 1,
      boxShadow: 'none',
    })

    gsap.timeline({
      onComplete: () => {
        setIsNoisy(false)
        setContentVisible(true)
      },
    })
      // Expand from bezel rect to fullscreen
      .to(el, {
        top: 0, left: 0,
        width: window.innerWidth, height: window.innerHeight,
        borderRadius: 0,
        duration: 0.55, ease: 'power3.inOut',
      })
      // CRT power-on brightness flash
      .to(el, { filter: 'brightness(3.5)', duration: 0.08 }, 0)
      .to(el, { filter: 'brightness(1)', duration: 0.35, ease: 'power2.out' }, 0.08)
      // Horizontal stretch glitch at tube warm-up
      .to(el, { scaleX: 1.05, duration: 0.07 }, 0)
      .to(el, { scaleX: 1, duration: 0.22, ease: 'elastic.out(1, 0.4)' }, 0.07)
      // Green phosphor glow blooms then fades
      .to(el, { boxShadow: '0 0 70px 18px rgba(57,255,20,0.45)', duration: 0.28, ease: 'power2.out' }, 0.06)
      .to(el, { boxShadow: '0 0 0px 0px rgba(57,255,20,0)', duration: 0.28, ease: 'power2.in' }, 0.32)
  }, [isOpen])

  const channel = CHANNELS[activeChannelIndex]

  return (
    <div ref={wrapperRef} className={styles.modal} style={{ display: 'none' }}>
      <div className={styles.scanlines} aria-hidden />
      <div className={styles.vignette} aria-hidden />
      <div className={styles.glare} aria-hidden />

      {isNoisy && (
        <canvas ref={noiseCanvasRef} className={styles.noise} width={320} height={240} />
      )}

      {contentVisible && (
        <div className={styles.content}>
          <button className={styles.closeBtn} onClick={runClose} aria-label="Close">
            ✕ CLOSE
          </button>
          {selectedProject
            ? <ProjectDetail project={selectedProject} />
            : <ChannelDetail channel={channel} />
          }
        </div>
      )}
    </div>
  )
}

interface ProjectDetailProps { project: Project }
function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className={styles.projectDetail}>
      <div className={styles.tag}>◈ PROJECT DETAIL</div>
      <h2 className={styles.title}>{project.title}</h2>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.techList}>
        {project.tech.map(t => (
          <span key={t} className={styles.techTag}>{t}</span>
        ))}
      </div>
      {project.url !== '#' && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.visitLink}
          onClick={e => e.stopPropagation()}
        >
          ▶ VISIT PROJECT
        </a>
      )}
    </div>
  )
}

interface ChannelDetailProps { channel: Channel }
function ChannelDetail({ channel }: ChannelDetailProps) {
  return (
    <div
      className={styles.channelDetail}
      style={{ '--accent': channel.color } as React.CSSProperties}
    >
      <div className={styles.channelHeader}>
        <span className={styles.channelNum}>CH {channel.id.toString().padStart(2, '0')}</span>
        <span className={styles.channelName}>{channel.name}</span>
      </div>
      <div className={styles.channelBody}>
        {channel.component ?? <span className={styles.placeholder}>// CONTENT COMING SOON</span>}
      </div>
    </div>
  )
}
