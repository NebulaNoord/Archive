import { useEffect, useMemo, useState } from 'react'

type Line = { text: string; cls?: string }

const BIOS_LINES: Line[] = [
  { text: 'ORIGIN BIOS v2.3.1', cls: 'text-white' },
  { text: 'Copyright (C) 2026 NebulaNoord', cls: 'text-[#9aa6ff]' },
  { text: '' },
  { text: 'CPU: Kayden-9 @ 3.20GHz', cls: 'text-[#00a800]' },
  { text: 'Memory Test: 16384 MB OK', cls: 'text-[#00a800]' },
  { text: 'Detecting drives ............', cls: 'text-[#00a800]' },
  { text: '  C:\\  SYSTEM      [OK]', cls: 'text-[#00a800]' },
  { text: '  D:\\  PROJECTS    [OK]', cls: 'text-[#00a800]' },
  { text: '  E:\\  PICTURES    [OK]', cls: 'text-[#00a800]' },
  { text: '' },
  { text: 'Initializing Workspace...', cls: 'text-white' },
  { text: 'Loading Projects...', cls: 'text-white' },
  { text: 'Mounting user profile: kayden', cls: 'text-white' },
  { text: '' },
  { text: 'Starting NEBULANOORD OS...', cls: 'text-[#ffe45e]' },
]

type BootSequenceProps = {
  onComplete: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [shown, setShown] = useState(0)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setShown((s) => {
        const next = s + 1
        if (next >= BIOS_LINES.length) window.clearInterval(id)
        return Math.min(next, BIOS_LINES.length)
      })
    }, 230)
    const bar = window.setInterval(() => {
      setPct((p) => Math.min(p + 9, 100))
    }, 200)
    const done = window.setTimeout(onComplete, BIOS_LINES.length * 230 + 700)
    return () => {
      window.clearInterval(id)
      window.clearInterval(bar)
      window.clearTimeout(done)
    }
  }, [onComplete])

  const visible = useMemo(() => BIOS_LINES.slice(0, shown), [shown])
  const blocks = Math.round(pct / 5)

  return (
    <main className="crt-screen flex min-h-svh items-center justify-center bg-black p-4 text-[#00a800] win-font">
      <section className="w-full max-w-3xl border-2 border-[#2a2a2a] bg-black p-5 shadow-[8px_8px_0_#000]">
        <div className="mb-4 h-28 overflow-hidden text-[13px] leading-relaxed">
          {visible.map((line, i) => (
            <p key={i} className={line.cls ?? ''}>
              {line.text || ' '}
            </p>
          ))}
          <p>
            <span className="win-caret">_</span>
          </p>
        </div>
        <div className="border-2 border-[#2a2a2a] bg-[#050505] p-2">
          <div className="h-5 overflow-hidden text-[#00a800]">
            {'█'.repeat(blocks)}
            {'░'.repeat(20 - blocks)}
          </div>
        </div>
      </section>
    </main>
  )
}
