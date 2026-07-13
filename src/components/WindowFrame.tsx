import { Suspense, useCallback, useEffect, useMemo, useRef } from 'react'
import { appRegistry } from '../apps/registry'
import { useOS } from '../contexts/OSContext'
import type { WindowState } from '../types'

type WindowFrameProps = {
  windowState: WindowState
}

export function WindowFrame({ windowState }: WindowFrameProps) {
  const { closeWindow, focusWindow, maximizeWindow, minimizeWindow, updateWindow, theme } = useOS()
  const dragStart = useRef<{ pointerX: number; pointerY: number; x: number; y: number } | null>(null)
  const app = appRegistry[windowState.appId]
  const AppComponent = app.component

  // Clear transient animation flag after it plays
  useEffect(() => {
    if (!windowState.anim) return
    const t = window.setTimeout(() => updateWindow(windowState.id, { anim: null }), 280)
    return () => window.clearTimeout(t)
  }, [windowState.anim, windowState.id, updateWindow])

  const boundsStyle = useMemo(() => {
    if (windowState.maximized) {
      return { left: 3, top: 3, width: 'calc(100vw - 6px)', height: 'calc(100svh - 45px)' }
    }

    return {
      left: windowState.x,
      top: windowState.y,
      width: `min(${windowState.width}px, calc(100vw - 6px))`,
      height: `min(${windowState.height}px, calc(100svh - 51px))`,
    }
  }, [windowState])

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      if (!dragStart.current || windowState.maximized) return
      const nextX = Math.max(2, dragStart.current.x + event.clientX - dragStart.current.pointerX)
      const nextY = Math.max(2, dragStart.current.y + event.clientY - dragStart.current.pointerY)
      updateWindow(windowState.id, { x: nextX, y: nextY })
    },
    [updateWindow, windowState.id, windowState.maximized],
  )

  const stopDrag = useCallback(() => {
    dragStart.current = null
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', stopDrag)
  }, [onPointerMove])

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    focusWindow(windowState.id)
    dragStart.current = { pointerX: event.clientX, pointerY: event.clientY, x: windowState.x, y: windowState.y }
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', stopDrag)
  }

  if (windowState.minimized) return null

  const animClass =
    theme.animations && windowState.anim ? `win-anim-${windowState.anim}` : ''

  return (
    <section
      className={`win-raised absolute flex overflow-hidden ${animClass}`}
      style={{ ...boundsStyle, zIndex: windowState.zIndex }}
      onPointerDown={() => focusWindow(windowState.id)}
    >
      <div className="flex min-h-0 w-full flex-col">
        <div
          className="win-titlebar flex cursor-move items-center justify-between px-1 py-0.5"
          onPointerDown={startDrag}
          onDoubleClick={() => maximizeWindow(windowState.id)}
        >
          <div className="flex min-w-0 items-center gap-1">
            <span className="flex h-5 w-5 items-center justify-center text-white">{app.renderIcon({ size: 16 })}</span>
            <h2 className="truncate text-sm font-bold leading-none">{windowState.title}</h2>
          </div>
          <div className="flex items-center gap-1">
            <button className="win-btn h-5 w-5 p-0 text-xs leading-none" aria-label="Minimize window" onClick={() => minimizeWindow(windowState.id)}>
              _
            </button>
            <button className="win-btn h-5 w-5 p-0 text-xs leading-none" aria-label="Maximize window" onClick={() => maximizeWindow(windowState.id)}>
              □
            </button>
            <button className="win-btn h-5 w-5 p-0 text-xs leading-none" aria-label="Close window" onClick={() => closeWindow(windowState.id)}>
              ×
            </button>
          </div>
        </div>
        <div className="win-sunken mx-1 mb-1 flex items-center gap-3 bg-[#c0c0c0] px-2 py-0.5 text-xs text-black">
          <span className="underline decoration-dotted underline-offset-2">File</span>
          <span className="underline decoration-dotted underline-offset-2">Edit</span>
          <span className="underline decoration-dotted underline-offset-2">View</span>
          <span className="underline decoration-dotted underline-offset-2">Help</span>
        </div>
        <div className="win-sunken win-scroll min-h-0 flex-1 overflow-auto bg-white p-3 text-black">
          <Suspense fallback={<div className="p-2 text-sm">Loading {app.name}...</div>}>
            <AppComponent windowId={windowState.id} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
