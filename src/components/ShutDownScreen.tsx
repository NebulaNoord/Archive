type ShutDownScreenProps = {
  onRestart: () => void
}

/**
 * Authentic Windows 95 "It is now safe to turn off your computer" style screen.
 * Replaces the old hard reload so shutting down feels like a real OS.
 */
export function ShutDownScreen({ onRestart }: ShutDownScreenProps) {
  return (
    <main className="crt-screen flex min-h-svh flex-col items-center justify-center gap-8 bg-black p-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="win-pixel text-[16px] leading-relaxed text-[#c0c0c0] sm:text-[20px]">
          IT IS NOW SAFE
          <br />
          TO TURN OFF
          <br />
          YOUR COMPUTER
        </div>
        <p className="win-body text-[#39ff7a]">ARCHIVE has been shut down.</p>
      </div>

      <button
        className="win-btn win-pixel px-4 py-2 text-[10px] text-black"
        onClick={onRestart}
      >
        RESTART
      </button>
    </main>
  )
}
