import { useEffect, useRef, useState } from 'react'
import { appRegistry } from '../apps/registry'
import { useOS } from '../contexts/OSContext'
import { useClock } from '../hooks/useClock'
import { usePerformanceStats } from '../hooks/usePerformanceStats'
import { Wallpaper } from './Wallpaper'
import { Taskbar } from './Taskbar'
import { WindowFrame } from './WindowFrame'
import type { DesktopItem, WallpaperId } from '../types'
import { ACHIEVEMENT_LABELS } from '../data/achievements'

type DesktopProps = {
  toasts: { id: number; label: string }[]
}

const POS_KEY = 'archive-icon-positions'

function loadPositions(): Record<string, { x: number; y: number }> {
  try {
    const raw = localStorage.getItem(POS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function defaultPositions(items: DesktopItem[]): Record<string, { x: number; y: number }> {
  // Deterministic scatter across the desktop (seeded by index) so icons feel
  // placed, not piled in the corner. Avoids the taskbar (~bottom 44px) and the
  // top-right SYSTEM RESUME panel.
  const startX = 16
  const startY = 16
  const cellW = 116
  const cellH = 104
  const cols = Math.max(2, Math.min(4, Math.floor((typeof window !== 'undefined' ? window.innerWidth : 1280) / cellW)))
  // Stable pseudo-random offsets so the layout looks scattered but consistent.
  const jitter = (i: number) => {
    const a = Math.sin((i + 1) * 12.9898) * 43758.5453
    const b = Math.sin((i + 1) * 78.233) * 23421.631
    return {
      dx: (a - Math.floor(a) - 0.5) * (cellW - 96),
      dy: (b - Math.floor(b) - 0.5) * (cellH - 80),
    }
  }
  const pos: Record<string, { x: number; y: number }> = {}
  items.forEach((item, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    const { dx, dy } = jitter(i)
    pos[item.id] = {
      x: Math.max(startX, Math.round(startX + col * cellW + dx)),
      y: Math.max(startY, Math.round(startY + row * cellH + dy)),
    }
  })
  return pos
}

export function Desktop({ toasts }: DesktopProps) {
  const { openApp, theme, windows, desktopItems, setWallpaper } = useOS()
  const { fps } = usePerformanceStats(theme.developerMode)
  const clock = useClock()
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null)
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() => ({
    ...defaultPositions(desktopItems),
    ...loadPositions(),
  }))
  const dragging = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null)
  const moved = useRef(false)

  useEffect(() => {
    try {
      localStorage.setItem(POS_KEY, JSON.stringify(positions))
    } catch {
      /* ignore */
    }
  }, [positions])

  const handleItem = (item: DesktopItem) => {
    if (item.kind === 'app' && item.appId) {
      openApp(item.appId)
    } else if (item.kind === 'file' && item.content != null) {
      openApp('notepad', { title: item.label, content: item.content })
    }
    // folders are decorative for now
  }

  const onPointerDownIcon = (e: React.PointerEvent, item: DesktopItem) => {
    e.stopPropagation()
    const pos = positions[item.id] ?? { x: 0, y: 0 }
    dragging.current = { id: item.id, offsetX: e.clientX - pos.x, offsetY: e.clientY - pos.y }
    moved.current = false
    try {
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    } catch {
      /* synthetic/unsupported pointer — capture is best-effort */
    }
  }

  const onPointerMoveIcon = (e: React.PointerEvent) => {
    if (!dragging.current) return
    moved.current = true
    const { id, offsetX, offsetY } = dragging.current
    const x = Math.max(0, Math.min(window.innerWidth - 96, e.clientX - offsetX))
    const y = Math.max(0, Math.min(window.innerHeight - 40, e.clientY - offsetY))
    setPositions((prev) => ({ ...prev, [id]: { x, y } }))
  }

  const onPointerUpIcon = (e: React.PointerEvent, item: DesktopItem) => {
    if (dragging.current && dragging.current.id === item.id) {
      const wasDrag = moved.current
      dragging.current = null
      try {
        ;(e.target as HTMLElement).releasePointerCapture?.(e.pointerId)
      } catch {
        /* best-effort */
      }
      if (!wasDrag) handleItem(item)
    }
  }

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenu({ x: e.clientX, y: e.clientY })
  }

  const cycleWallpaper = () => {
    const order: WallpaperId[] = [
      'studio', 'alpine', 'evergreen', 'nightcity', 'cosmos', 'prairie',
      'sunset', 'workspace', 'garage', 'classic', 'bliss',
    ]
    const idx = order.indexOf(theme.wallpaper)
    setWallpaper(order[(idx + 1) % order.length])
    setMenu(null)
  }

  const refreshLayout = () => {
    setPositions(defaultPositions(desktopItems))
    setMenu(null)
  }

  return (
    <main
      className="crt-screen relative h-svh overflow-hidden win-font"
      onContextMenu={onContextMenu}
      onClick={() => setMenu(null)}
    >
      <Wallpaper id={theme.wallpaper} animate={theme.animations} accent={theme.accent} className="absolute inset-0 h-full w-full" />

      <div className="crt-flicker pointer-events-none absolute inset-0 z-0" />

      {/* Draggable desktop icons */}
      {desktopItems.map((item) => {
        const pos = positions[item.id] ?? { x: 0, y: 0 }
        const icon =
          item.kind === 'app' && item.appId
            ? appRegistry[item.appId].renderIcon({ size: 32 })
            : item.kind === 'file'
              ? appRegistry.notepad.renderIcon({ size: 32 })
              : null
        const folderColor = item.tint ?? '#ffd000'
        const isDragging = dragging.current?.id === item.id
        return (
          <button
            key={item.id}
            className={`absolute z-10 flex w-24 flex-col items-center gap-1 text-center text-white outline-none focus:bg-[#000080]/40 ${isDragging ? 'opacity-80' : ''}`}
            style={{ left: pos.x, top: pos.y, touchAction: 'none' }}
            onPointerDown={(e) => onPointerDownIcon(e, item)}
            onPointerMove={onPointerMoveIcon}
            onPointerUp={(e) => onPointerUpIcon(e, item)}
            onDoubleClick={() => handleItem(item)}
          >
            <span className="drop-shadow-[2px_2px_0_#000]">
              {icon ?? (
                <svg viewBox="0 0 16 16" width={32} height={32} shapeRendering="crispEdges" aria-hidden>
                  <rect x="1" y="3" width="6" height="2" fill={folderColor} stroke="#000" />
                  <rect x="1" y="4" width="14" height="10" fill={folderColor} stroke="#000" />
                  <rect x="2" y="6" width="12" height="7" fill="#fff3c4" />
                </svg>
              )}
            </span>
            <span className="border border-transparent px-1 text-xs leading-tight shadow-[1px_1px_0_#000] focus:border-white">
              {item.label}
            </span>
          </button>
        )
      })}

      {windows.map((windowState) => (
        <WindowFrame key={windowState.id} windowState={windowState} />
      ))}

      <div className="win-raised absolute right-4 top-4 z-20 hidden w-72 p-2 text-black md:block">
        <div className="win-titlebar mb-2 flex items-center justify-between px-2 py-1 font-bold">
          <span>SYSTEM RESUME</span>
          <span className="h-2 w-2 animate-[win-flicker_2s_steps(3)_infinite] rounded-full bg-[#39ff7a]" />
        </div>
        <p className="win-pixel text-[10px] text-[#000080]">NEBULANOORD</p>
        <p className="text-sm">Kayden&apos;s studio workspace — open an app from the desktop or Start menu, then read Welcome.txt.</p>
        <p className="mt-2 text-[10px] text-[#808080]">Tip: drag icons to rearrange · right-click for wallpaper.</p>
        <div className="mt-2 win-sunken flex items-center justify-between px-2 py-1 text-[11px]">
          <span className="text-[#808080]">LOCAL TIME</span>
          <span className="win-pixel text-[#000080]">{clock}</span>
        </div>
      </div>

      {theme.developerMode && (
        <aside className="win-raised absolute bottom-14 right-3 z-[9998] p-2 text-xs text-black">
          <p className="win-titlebar mb-1 px-2 font-bold text-white">DEV MODE</p>
          <p>FPS ...... {fps}</p>
          <p>WINDOWS .. {windows.length}</p>
          <p>THEME .... {theme.theme.toUpperCase()}</p>
          <p>REACT .... 19</p>
        </aside>
      )}

      {/* Desktop context menu */}
      {menu && (
        <ul
          className="win-raised absolute z-[9999] w-44 py-1 text-xs text-black"
          style={{ left: menu.x, top: menu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <li>
            <button className="flex w-full items-center px-3 py-1 text-left hover:bg-[#000080] hover:text-white" onClick={refreshLayout}>↻ Refresh</button>
          </li>
          <li>
            <button className="flex w-full items-center px-3 py-1 text-left hover:bg-[#000080] hover:text-white" onClick={refreshLayout}>⇅ Sort By Name</button>
          </li>
          <li>
            <button className="flex w-full items-center px-3 py-1 text-left hover:bg-[#000080] hover:text-white" onClick={cycleWallpaper}>🖼 Change Wallpaper</button>
          </li>
          <li>
            <button className="flex w-full items-center px-3 py-1 text-left hover:bg-[#000080] hover:text-white" onClick={() => { openApp('settings'); setMenu(null) }}>🎨 Themes</button>
          </li>
          <li className="my-1 border-t-2 border-[#808080] border-dashed" />
          <li>
            <button className="flex w-full items-center px-3 py-1 text-left hover:bg-[#000080] hover:text-white" onClick={() => { openApp('about'); setMenu(null) }}>ℹ Properties</button>
          </li>
        </ul>
      )}

      {/* Achievement toasts */}
      <div className="pointer-events-none absolute bottom-12 left-1/2 z-[10000] flex -translate-x-1/2 flex-col items-center gap-1">
        {toasts.map((t) => (
          <div key={t.id} className="win-raised win-pixel animate-[win-pop_0.3s_ease-out] px-3 py-2 text-[9px] text-black">
            {ACHIEVEMENT_LABELS[t.label as keyof typeof ACHIEVEMENT_LABELS] ?? t.label}
          </div>
        ))}
      </div>

      <Taskbar />
    </main>
  )
}
