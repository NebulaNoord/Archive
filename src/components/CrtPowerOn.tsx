import { useEffect, useState } from 'react'

/**
 * CRT power-on sweep: a thin white scanline expands vertically to fill the
 * screen, then collapses to nothing — the classic tube "turning on" effect.
 * Plays once, then unmounts itself via onDone.
 */
export function CrtPowerOn({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'expand' | 'hold' | 'collapse'>('expand')

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase('hold'), 420)
    const t2 = window.setTimeout(() => setPhase('collapse'), 620)
    const t3 = window.setTimeout(() => onDone(), 1020)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
    }
  }, [onDone])

  return (
    <div className="crt-screen pointer-events-none fixed inset-0 z-[10005] flex items-center justify-center bg-black">
      <div className={`crt-power-beam ${phase === 'expand' ? 'crt-power-expand' : phase === 'hold' ? 'crt-power-hold' : 'crt-power-collapse'}`} />
      {phase !== 'expand' && (
        <div className={`crt-power-fill ${phase === 'hold' ? 'crt-power-fill-on' : 'crt-power-fill-off'}`} />
      )}
    </div>
  )
}
