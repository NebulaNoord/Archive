import { useState } from 'react'

export default function RecycleBinApp() {
  const [clicks, setClicks] = useState(0)
  const secret = clicks >= 10

  return (
    <div className="flex h-full min-h-0 flex-col items-center justify-center gap-3 p-4 text-center text-black">
      <div
        className="flex h-24 w-24 cursor-pointer items-center justify-center text-5xl select-none"
        onClick={() => setClicks((c) => c + 1)}
        title="go on, click it"
      >
        🗑️
      </div>
      <p className="win-pixel text-[10px]">Recycle Bin is empty.</p>
      {!secret && (
        <p className="text-[9px] text-[#808080]">({clicks}/10 — why are you clicking an empty bin?)</p>
      )}
      {secret && (
        <div className="win-raised win-pixel animate-[win-pop_0.3s_ease-out] max-w-xs p-3 text-[10px]">
          <p className="font-black">🎉 YOU FOUND IT</p>
          <p className="mt-1 leading-tight">
            There was never anything in here. But you cared enough to check 10 times.
            That's the kind of person who builds cool things.
          </p>
          <p className="mt-1 text-[#008000]">Achievement unlocked: Curious.</p>
        </div>
      )}
    </div>
  )
}
