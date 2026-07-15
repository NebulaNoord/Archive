import { useEffect, useMemo, useState } from 'react'
import { playBoot } from '../lib/audio'

type Phase = 'flash' | 'bios' | 'reveal'

const BIOS_LINES: { text: string; cls: string }[] = [
  { text: 'ORIGIN BIOS v2.3.1', cls: 'text-white' },
  { text: 'Copyright (C) 2026 NEBULANOORD', cls: 'text-[#9aa6ff]' },
  { text: '', cls: '' },
  { text: 'CPU ............ Kayden-9 @ 3.20 GHz', cls: 'text-[#00ff88]' },
  { text: 'Memory Test .... 16384 MB OK', cls: 'text-[#00ff88]' },
  { text: 'Detecting drives .........', cls: 'text-[#00ff88]' },
  { text: '  C:\\  SYSTEM     [ OK ]', cls: 'text-[#00ff88]' },
  { text: '  D:\\  PROJECTS   [ OK ]', cls: 'text-[#00ff88]' },
  { text: '  E:\\  PICTURES   [ OK ]', cls: 'text-[#00ff88]' },
  { text: '', cls: '' },
  { text: 'Initializing Workspace...', cls: 'text-white' },
  { text: 'Loading Projects...', cls: 'text-white' },
  { text: 'Mounting user profile: kayden', cls: 'text-white' },
  { text: '', cls: '' },
]

type BootSequenceProps = { onComplete: () => void; soundOn: boolean }

export function BootSequence({ onComplete, soundOn }: BootSequenceProps) {
  const [phase, setPhase] = useState<Phase>('flash')
  const [shown, setShown] = useState(0)
  const [pct, setPct] = useState(0)

  // Phase 1: power flash (no sound yet — browser autoplay policy needs a gesture)
  useEffect(() => {
    const t = window.setTimeout(() => setPhase('bios'), 360)
    return () => window.clearTimeout(t)
  }, [])

  // Phase 2: BIOS POST lines + progress
  useEffect(() => {
    if (phase !== 'bios') return
    const id = window.setInterval(() => {
      setShown((s) => {
        const next = s + 1
        if (next >= BIOS_LINES.length) window.clearInterval(id)
        return Math.min(next, BIOS_LINES.length)
      })
    }, 150)
    const bar = window.setInterval(() => setPct((p) => Math.min(p + 7, 100)), 130)
    const done = window.setTimeout(() => setPhase('reveal'), BIOS_LINES.length * 150 + 450)
    return () => { window.clearInterval(id); window.clearInterval(bar); window.clearTimeout(done) }
  }, [phase])

  // Phase 3: logo reveal -> desktop (first real sound fires here)
  useEffect(() => {
    if (phase !== 'reveal') return
    playBoot(soundOn)
    const t = window.setTimeout(onComplete, 1700)
    return () => window.clearTimeout(t)
  }, [phase, soundOn, onComplete])

  const visible = useMemo(() => BIOS_LINES.slice(0, shown), [shown])
  const blocks = Math.round(pct / 5)

  if (phase === 'flash') {
    return (
      <main className="crt-screen fixed inset-0 z-[10001] flex items-center justify-center bg-black">
        <div className="boot-flash" />
        <p className="win-font text-2xl tracking-[0.4em] text-white/90 animate-[fade-in_0.3s_ease-out]">ORIGIN</p>
      </main>
    )
  }

  if (phase === 'bios') {
    return (
      <main className="crt-screen fixed inset-0 z-[10001] flex items-center justify-center bg-black p-4 win-font">
        <section className="w-full max-w-2xl border-2 border-[#222] bg-[#020402] p-5 shadow-[10px_10px_0_#000]">
          <div className="mb-3 h-32 overflow-hidden text-[12px] leading-relaxed">
            {visible.map((line, i) => (
              <p key={i} className={line.cls || 'text-[#00ff88]'}>{line.text || ' '}</p>
            ))}
            <p><span className="win-caret">_</span></p>
          </div>
          <div className="border-2 border-[#222] bg-[#010201] p-2">
            <div className="h-4 overflow-hidden font-mono text-[#00ff88]">
              {'█'.repeat(blocks)}{'░'.repeat(20 - blocks)}
            </div>
          </div>
        </section>
      </main>
    )
  }

  // reveal
  return (
    <main className="crt-screen fixed inset-0 z-[10001] flex items-center justify-center bg-black win-font">
      <div className="boot-logo">
        <p className="text-[11px] tracking-[0.5em] text-[#9aa6ff]">NEBULANOORD</p>
        <h1 className="boot-title mt-1 text-5xl font-black text-white sm:text-6xl">OS</h1>
        <p className="mt-2 text-[11px] tracking-[0.3em] text-white/60">KAYDEN&apos;S WORKSPACE</p>
        <div className="boot-bar mt-4" />
      </div>
    </main>
  )
}
