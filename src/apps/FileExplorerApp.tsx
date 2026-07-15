import { useEffect, useMemo, useState } from 'react'
import { useOS } from '../contexts/OSContext'
import { homeFs } from '../data/lore'
import { playClick, playOpen } from '../lib/audio'
import type { FsNode } from '../types'

function pathTo(node: FsNode, target: string, trail: FsNode[] = []): FsNode[] | null {
  const next = [...trail, node]
  if (node.id === target || node.name === target) return next
  if (!node.children) return null
  for (const child of node.children) {
    const r = pathTo(child, target, next)
    if (r) return r
  }
  return null
}

function FsIcon({ node }: { node: FsNode }) {
  const c = 'w-full h-full'
  if (node.kind === 'folder') {
    return (
      <svg viewBox="0 0 16 16" className={c} shapeRendering="crispEdges" aria-hidden>
        <rect x="1" y="3" width="6" height="2" fill="#ffd000" stroke="#000" />
        <rect x="1" y="4" width="14" height="10" fill="#ffd000" stroke="#000" />
        <rect x="2" y="6" width="12" height="7" fill="#fff3c4" />
      </svg>
    )
  }
  switch (node.ext) {
    case 'png':
      return (
        <svg viewBox="0 0 16 16" className={c} shapeRendering="crispEdges" aria-hidden>
          <rect x="1" y="2" width="14" height="12" fill="#fff" stroke="#000" />
          <rect x="2" y="3" width="12" height="8" fill="#1084d0" />
          <circle cx="5" cy="6" r="1.5" fill="#ffe45e" />
        </svg>
      )
    case 'pdf':
      return (
        <svg viewBox="0 0 16 16" className={c} shapeRendering="crispEdges" aria-hidden>
          <rect x="2" y="2" width="12" height="14" fill="#fff" stroke="#000" />
          <rect x="2" y="2" width="12" height="3" fill="#c00000" />
          <rect x="4" y="8" width="8" height="1" fill="#000" />
          <rect x="4" y="11" width="8" height="1" fill="#000" />
        </svg>
      )
    case 'url':
      return (
        <svg viewBox="0 0 16 16" className={c} shapeRendering="crispEdges" aria-hidden>
          <rect x="1" y="3" width="14" height="10" fill="#fff" stroke="#000" />
          <rect x="1" y="3" width="14" height="4" fill="#c0c0c0" />
          <rect x="2" y="9" width="12" height="3" fill="none" stroke="#0000a8" />
        </svg>
      )
    case 'lnk':
      return (
        <svg viewBox="0 0 16 16" className={c} shapeRendering="crispEdges" aria-hidden>
          <rect x="1" y="3" width="6" height="2" fill="#ffd000" stroke="#000" />
          <rect x="1" y="4" width="14" height="10" fill="#ffd000" stroke="#000" />
          <path d="M9 1 h5 v5 z" fill="#fff" stroke="#000" />
        </svg>
      )
    case 'cur':
      return (
        <svg viewBox="0 0 16 16" className={c} shapeRendering="crispEdges" aria-hidden>
          <path d="M2 1 L2 12 L5 9 L7 14 L9 13 L7 8 L11 8 Z" fill="#000" stroke="#fff" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 16 16" className={c} shapeRendering="crispEdges" aria-hidden>
          <rect x="2" y="2" width="12" height="14" fill="#fff" stroke="#000" />
          <rect x="2" y="2" width="12" height="3" fill="#808080" />
          <rect x="4" y="7" width="8" height="1" fill="#000" />
          <rect x="4" y="9" width="8" height="1" fill="#000" />
          <rect x="4" y="11" width="6" height="1" fill="#000" />
        </svg>
      )
  }
}

export default function FileExplorerApp() {
  const { windows, openApp, audio } = useOS()
  const current = windows.find((w) => w.appId === 'files')
  const initialPath = current?.fsPath ?? 'home'
  const [path, setPath] = useState(initialPath)
  const trail = useMemo(() => pathTo(homeFs, path) ?? [homeFs], [path])
  const node = trail[trail.length - 1]

  useEffect(() => {
    if (current?.fsPath && current.fsPath !== path) setPath(current.fsPath)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.fsPath])

  const open = (child: FsNode) => {
    playClick(audio.enabled)
    if (child.kind === 'folder') {
      setPath(child.id)
      return
    }
    const t = child.target
    if (t?.app) {
      openApp(t.app, t.fsPath ? { fsPath: t.fsPath } : undefined)
    } else if (t?.href) {
      openApp('browser', { title: t.title ?? 'Browser', fsPath: t.href })
    } else if (child.content != null) {
      openApp('notepad', { title: child.name, content: child.content })
    } else {
      playOpen(audio.enabled)
      openApp('notepad', { title: child.name, content: `${child.name}\n\n(Preview not available in this demo.)\n` })
    }
  }

  return (
    <div className="flex h-full flex-col text-black">
      <div className="flex items-center gap-1 border-b-2 border-[#808080] bg-[#c0c0c0] px-2 py-1 text-xs">
        <span className="text-[#808080]">Address:</span>
        <span className="win-sunken flex-1 bg-white px-2 py-0.5">
          C:\\Users\\{trail.map((n) => n.name).join('\\')}
        </span>
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="w-32 shrink-0 border-r-2 border-[#808080] bg-[#c0c0c0] p-1 text-xs">
          <p className="px-1 py-0.5 font-bold">Folders</p>
          <button className="flex w-full items-center gap-1 px-1 py-0.5 text-left hover:bg-[#000080] hover:text-white" onClick={() => { playClick(audio.enabled); setPath('home') }}>
            🗄️ kayden
          </button>
          {homeFs.children?.map((c) => (
            <button key={c.id} className="flex w-full items-center gap-1 px-3 py-0.5 text-left hover:bg-[#000080] hover:text-white" onClick={() => { playClick(audio.enabled); setPath(c.id) }}>
              📁 {c.name}
            </button>
          ))}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[repeat(auto-fill,minmax(88px,1fr))] content-start gap-1 overflow-auto bg-white p-2">
          {trail.length > 1 && (
            <button className="flex flex-col items-center gap-1 p-1 text-center text-[11px] hover:bg-[#000080]/10" onClick={() => { playClick(audio.enabled); setPath(trail[trail.length - 2].id) }}>
              <span className="h-11 w-11"><svg viewBox="0 0 16 16" className="h-full w-full" shapeRendering="crispEdges"><path d="M7 3 L3 8 L7 8 L5 13 L13 7 L9 7 Z" fill="#dfdfdf" stroke="#000" /></svg></span>
              ..
            </button>
          )}
          {node.children?.map((child) => (
            <button key={child.id} className="flex flex-col items-center gap-1 p-1 text-center text-[11px] hover:bg-[#000080]/10" onDoubleClick={() => open(child)} onClick={() => playClick(audio.enabled)}>
              <span className="h-11 w-11"><FsIcon node={child} /></span>
              <span className="line-clamp-2">{child.name}</span>
            </button>
          ))}
          {!node.children?.length && <p className="col-span-full p-4 text-sm text-[#808080]">Empty folder.</p>}
        </div>
      </div>
      <div className="border-t-2 border-[#808080] bg-[#c0c0c0] px-2 py-0.5 text-[11px] text-[#808080]">
        {node.children?.length ?? 0} object(s)
      </div>
    </div>
  )
}
