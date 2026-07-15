import { useEffect, useState } from 'react'
import { useOS } from '../contexts/OSContext'
import { playClick } from '../lib/audio'

const bookmarks = [
  { name: 'GitHub', url: 'https://github.com/NebulaNoord', emoji: '🐙' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/', emoji: '💼' },
  { name: 'YouTube', url: 'https://www.youtube.com/', emoji: '▶️' },
  { name: 'Formula 1', url: 'https://www.formula1.com/', emoji: '🏎️' },
  { name: 'ChatGPT', url: 'https://chat.openai.com/', emoji: '🤖' },
  { name: 'Spotify', url: 'https://open.spotify.com/', emoji: '🎧' },
]

export default function BrowserApp() {
  const { windows } = useOS()
  const self = windows.find((w) => w.appId === 'browser')
  const [url, setUrl] = useState(self?.fsPath ?? bookmarks[0].url)

  useEffect(() => {
    if (self?.fsPath) setUrl(self.fsPath)
  }, [self?.fsPath])

  return (
    <div className="flex h-full flex-col gap-2 text-black">
      <div className="win-sunken flex gap-1 p-1">
        <button className="win-btn" aria-label="Back">◄</button>
        <button className="win-btn" aria-label="Forward">►</button>
        <input
          className="win-sunken min-w-0 flex-1 bg-white px-1"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !url.startsWith('http')) setUrl('https://' + url) }}
        />
        <a className="win-btn" href={url.startsWith('http') ? url : `https://${url}`} target="_blank" rel="noreferrer">GO ↗</a>
      </div>
      <div className="win-sunken flex-1 overflow-auto bg-white p-4">
        <p className="border-b-2 border-black pb-1 text-xs font-bold">KAYDEN'S BROWSER — Bookmarks</p>
        <p className="mt-3 text-sm text-[#808080]">No homepage. Just the stuff I actually open.</p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {bookmarks.map((b) => (
            <a
              key={b.url}
              href={b.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => playClick(true)}
              className="win-raised flex items-center gap-2 p-2 text-sm hover:bg-[#000080] hover:text-white"
            >
              <span className="text-lg">{b.emoji}</span>
              {b.name}
            </a>
          ))}
        </div>
        <div className="win-sunken mt-4 bg-[#f3f3f3] p-2 text-xs">
          Now visiting: <span className="font-bold">{url}</span>
          <br />
          (Links open in a new tab — this is a portfolio, not a real browser.)
        </div>
      </div>
    </div>
  )
}
