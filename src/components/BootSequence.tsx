import { useEffect, useMemo, useState } from 'react'

const bootMessages = [
  'Loading workspace...',
  'Indexing projects...',
  'Ready.',
]

type BootSequenceProps = {
  onComplete: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + 14, 100)
        if (next >= 100) {
          window.clearInterval(id)
          window.setTimeout(onComplete, 650)
        }
        return next
      })
    }, 240)

    return () => window.clearInterval(id)
  }, [onComplete])

  useEffect(() => {
    setMessageIndex(Math.min(Math.floor((progress / 100) * bootMessages.length), bootMessages.length - 1))
  }, [progress])

  const visibleMessages = useMemo(() => bootMessages.slice(0, messageIndex + 1), [messageIndex])
  const blocks = Math.round(progress / 5)

  return (
    <main className="crt-screen flex min-h-svh items-center justify-center bg-black p-4 text-[#c0c0c0] win-font">
      <section className="win-flicker w-full max-w-3xl border-2 border-[#404040] bg-[#000080] p-5 shadow-[8px_8px_0_#000]">
        <div className="border-2 border-[#000] bg-black p-4 text-center">
          <h1 className="win-pixel text-[26px] tracking-[0.18em] text-white sm:text-[42px]">NEBULANOORD OS</h1>
          <p className="win-pixel mt-3 text-[10px] tracking-[0.3em] text-[#9aa6ff]">KAYDEN'S WORKSPACE</p>
        </div>

        <div className="win-body mt-5 min-h-44 space-y-2 border-2 border-black bg-black p-3 text-lg text-[#00a800]">
          {visibleMessages.map((message) => (
            <p key={message}>C:\ARCHIVE&gt; {message}</p>
          ))}
          <p>
            C:\ARCHIVE&gt; <span className="win-caret">_</span>
          </p>
        </div>

        <div className="mt-5 border-2 border-black bg-black p-2">
          <div className="win-body h-5 overflow-hidden text-[#00a800]">
            {'█'.repeat(blocks)}
            {'░'.repeat(20 - blocks)}
          </div>
        </div>
      </section>
    </main>
  )
}
