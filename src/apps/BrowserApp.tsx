import { useState } from 'react'

const shortcuts = [
  'https://mazeerunner.vercel.app/',
  'https://cadencetyper.vercel.app/',
  'https://pythonix.vercel.app/',
  'https://shiftsyncyt.vercel.app/',
  'https://github.com/',
]

export default function BrowserApp() {
  const [url, setUrl] = useState(shortcuts[0])

  return (
    <div className="flex h-full flex-col gap-2 text-black">
      <div className="win-sunken flex gap-1 p-1">
        <button className="win-btn">◄</button>
        <button className="win-btn">►</button>
        <input className="win-sunken min-w-0 flex-1 bg-white px-1" value={url} onChange={(event) => setUrl(event.target.value)} />
        <a className="win-btn" href={url} target="_blank" rel="noreferrer">GO</a>
      </div>
      <div className="win-sunken flex-1 bg-white p-4">
        <p className="border-b-2 border-black pb-1 text-xs font-bold">ARCHIVE BROWSER</p>
        <h3 className="mt-3 text-2xl font-black">{url}</h3>
        <p className="mt-3 text-sm">External project links, GitHub, and live demos open outside the OS. Large apps are not embedded into Archive.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {shortcuts.map((shortcut) => (
            <button key={shortcut} className="win-btn text-sm" onClick={() => setUrl(shortcut)}>
              {shortcut}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
