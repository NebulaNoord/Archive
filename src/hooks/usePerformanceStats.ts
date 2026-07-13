import { useEffect, useState } from 'react'

export function usePerformanceStats(enabled: boolean) {
  const [fps, setFps] = useState(0)

  useEffect(() => {
    if (!enabled) return undefined

    let frame = 0
    let last = performance.now()
    let raf = 0

    const tick = (time: number) => {
      frame += 1
      if (time >= last + 1000) {
        setFps(Math.round((frame * 1000) / (time - last)))
        frame = 0
        last = time
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [enabled])

  return { fps }
}
