import { useState } from 'react'
import { useOS } from '../contexts/OSContext'
import { playClick } from '../lib/audio'

const inbox = [
  {
    id: 'n-hermes',
    from: 'Hermes',
    subject: "Don't forget the wallpaper manager",
    body: "Hey — you left the dynamic wallpaper picker half-done. Rain mode still resets on boot. Finish it before you show anyone 😂",
    unread: true,
  },
  {
    id: 'n-f1',
    from: 'Formula 1',
    subject: 'Race weekend',
    body: 'Next session in 2 days. Open Browser > Formula 1 to keep track.',
    unread: false,
  },
  {
    id: 'n-github',
    from: 'GitHub',
    subject: '[nebulanoord/Archive] Night-city wallpaper merged',
    body: 'Your pull request #14 "Add animated night-city skyline" was merged into main.',
    unread: false,
  },
]

export default function MailApp() {
  const { audio } = useOS()
  const [selected, setSelected] = useState(inbox[0].id)
  const msg = inbox.find((m) => m.id === selected)!

  return (
    <div className="flex h-full text-black">
      <div className="w-44 shrink-0 border-r-2 border-[#808080] bg-[#c0c0c0]">
        <div className="win-titlebar mb-1 px-2 py-0.5 text-white">Inbox</div>
        <div className="px-1">
          {inbox.map((m) => (
            <button
              key={m.id}
              onClick={() => { setSelected(m.id); playClick(audio.enabled) }}
              className={`mb-0.5 flex w-full flex-col items-start border border-transparent px-1 py-1 text-left text-[11px] hover:border-white ${selected === m.id ? 'bg-[#000080] text-white' : 'bg-white'}`}
            >
              <span className="truncate font-bold">{m.from}</span>
              <span className="truncate opacity-80">{m.subject}</span>
              {m.unread && <span className="text-[9px] font-bold text-[#c00000]">● unread</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col bg-white">
        <div className="border-b-2 border-[#808080] px-3 py-2">
          <p className="text-sm font-bold">{msg.subject}</p>
          <p className="text-xs text-[#808080]">From: {msg.from}</p>
        </div>
        <div className="win-scroll min-h-0 flex-1 overflow-auto p-3 text-sm leading-relaxed">{msg.body}</div>
        <div className="border-t-2 border-[#808080] px-3 py-1 text-[11px] text-[#808080]">
          {inbox.length} messages · this is a simulated inbox
        </div>
      </div>
    </div>
  )
}
