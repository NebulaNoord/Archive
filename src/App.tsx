import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { appRegistry } from './apps/registry'
import { BootSequence } from './components/BootSequence'
import { CrtPowerOn } from './components/CrtPowerOn'
import { Desktop } from './components/Desktop'
import { ShutDownScreen } from './components/ShutDownScreen'
import { OSContext } from './contexts/OSContext'
import { desktopItems } from './data/desktopItems'
import { playBoot, playUiBlip, startAmbient, stopAmbient } from './lib/audio'
import { ACHIEVEMENTS } from './data/achievements'
import type { AppId, AchievementId, AudioState, ThemeState, WallpaperId, WindowState } from './types'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

function pickWallpaperForHour(hour: number): WallpaperId {
  if (hour >= 5 && hour < 8) return 'alpine'
  if (hour >= 8 && hour < 17) return 'studio'
  if (hour >= 17 && hour < 20) return 'sunset'
  return 'nightcity'
}

function loadAchievements(): Record<AchievementId, boolean> {
  const stored: Partial<Record<AchievementId, boolean>> = {}
  try {
    const raw = localStorage.getItem('archive-achievements')
    if (raw) Object.assign(stored, JSON.parse(raw))
  } catch {
    /* ignore */
  }
  return ACHIEVEMENTS.reduce(
    (acc, id) => ({ ...acc, [id]: Boolean(stored[id]) }),
    {} as Record<AchievementId, boolean>,
  )
}

const initialTheme: ThemeState = {
  wallpaper: pickWallpaperForHour(new Date().getHours()),
  theme: 'dark',
  accent: '#38bdf8',
  animations: true,
  developerMode: false,
}

function App({ onExitRetro }: { onExitRetro?: () => void }) {
  const [booted, setBooted] = useState(false)
  const [poweringOn, setPoweringOn] = useState(true)
  const [shuttingDown, setShuttingDown] = useState(false)
  const [windows, setWindows] = useState<WindowState[]>([])
  const [theme, setTheme] = useState<ThemeState>(initialTheme)
  const [audio, setAudio] = useState<AudioState>({ enabled: false })
  const [achievements, setAchievements] = useState<Record<AchievementId, boolean>>(loadAchievements)
  const [toasts, setToasts] = useState<{ id: number; label: string }[]>([])
  const [konamiActive, setKonamiActive] = useState(false)
  const zCounter = useRef(10)
  const konami = useRef<string[]>([])
  const toastId = useRef(0)
  const openedSet = useRef<Set<AppId>>(new Set())

  const shutdown = useCallback(() => {
    stopAmbient()
    setShuttingDown(true)
  }, [])

  const focusWindow = useCallback((windowId: string) => {
    zCounter.current += 1
    const next = zCounter.current
    setWindows((items) => items.map((item) => (item.id === windowId ? { ...item, zIndex: next } : item)))
  }, [])

  const closeWindow = useCallback((windowId: string) => {
    setWindows((items) => items.filter((item) => item.id !== windowId))
  }, [])

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows((items) =>
      items.map((item) =>
        item.id === windowId ? { ...item, minimized: !item.minimized, anim: 'minimize' } : item,
      ),
    )
  }, [])

  const maximizeWindow = useCallback((windowId: string) => {
    setWindows((items) =>
      items.map((item) =>
        item.id === windowId ? { ...item, maximized: !item.maximized, anim: 'maximize' } : item,
      ),
    )
  }, [])

  const updateWindow = useCallback((windowId: string, patch: Partial<WindowState>) => {
    setWindows((items) => items.map((item) => (item.id === windowId ? { ...item, ...patch } : item)))
  }, [])

  const openApp = useCallback(
    (appId: AppId, opts?: { title?: string; content?: string }) => {
      const app = appRegistry[appId]
      zCounter.current += 1
      const next = zCounter.current
      setWindows((items) => {
        const existing = items.find((item) => item.appId === appId && item.minimized)
        if (existing) {
          return items.map((item) =>
            item.id === existing.id ? { ...item, minimized: false, zIndex: next, anim: 'open' } : item,
          )
        }
        const offset = items.length * 28
        return [
          ...items,
          {
            id: `${appId}-${crypto.randomUUID()}`,
            appId,
            title: opts?.title ?? app.name,
            x: 140 + offset,
            y: 70 + offset,
            width: app.defaultSize.width,
            height: app.defaultSize.height,
            zIndex: next,
            minimized: false,
            maximized: false,
            anim: 'open',
            ...(opts?.content !== undefined ? { content: opts.content } as Partial<WindowState> : {}),
          },
        ]
      })
      playUiBlip(audio.enabled)
      openedSet.current.add(appId)
      if (appId === 'terminal') unlockRef.current('used-terminal')
      if (appId === 'arcade') {
        const hasPythonix = true
        if (hasPythonix) unlockRef.current('found-pythonix')
      }
      if (openedSet.current.size >= 9) unlockRef.current('opened-everything')
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [audio.enabled],
  )

  const unlock = useCallback((id: AchievementId) => {
    setAchievements((current) => {
      if (current[id]) return current
      const next = { ...current, [id]: true }
      try {
        localStorage.setItem('archive-achievements', JSON.stringify(next))
      } catch {
        /* ignore */
      }
      const meta = ACHIEVEMENTS.find((a) => a === id)
      if (meta) {
        toastId.current += 1
        const tid = toastId.current
        setToasts((items) => [...items, { id: tid, label: meta }])
        window.setTimeout(() => setToasts((items) => items.filter((t) => t.id !== tid)), 4200)
      }
      return next
    })
  }, [])

  // expose unlock to openApp via ref to avoid stale closure
  const unlockRef = useRef(unlock)
  useEffect(() => {
    unlockRef.current = unlock
  }, [unlock])

  const setWallpaper = useCallback(
    (id: WallpaperId) => {
      setTheme((current) => ({ ...current, wallpaper: id }))
      unlock('changed-wallpaper')
    },
    [unlock],
  )

  // First-boot achievement
  useEffect(() => {
    unlock('first-boot')
  }, [unlock])

  // Audio: start/stop ambient loop when toggled on (user gesture already happened)
  useEffect(() => {
    if (audio.enabled) {
      startAmbient()
      playBoot()
    } else {
      stopAmbient()
    }
    return () => stopAmbient()
  }, [audio.enabled])

  // Konami code listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      konami.current.push(key)
      if (konami.current.length > KONAMI.length) konami.current.shift()
      if (KONAMI.every((k, i) => konami.current[i] === k)) {
        konami.current = []
        unlock('found-pythonix')
        setKonamiActive(true)
        window.setTimeout(() => setKonamiActive(false), 5000)
        const tid = ++toastId.current
        setToasts((items) => [...items, { id: tid, label: 'KONAMI' }])
        window.setTimeout(() => setToasts((items) => items.filter((t) => t.id !== tid)), 4200)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [unlock])

  const osValue = useMemo(
    () => ({
      theme,
      setTheme,
      audio,
      setAudio,
      windows,
      desktopItems,
      openApp,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      updateWindow,
      setWallpaper,
      achievements,
      unlock,
      shutdown,
    }),
    [
      closeWindow, focusWindow, maximizeWindow, minimizeWindow, openApp, shutdown, theme,
      audio, windows, setWallpaper, achievements, unlock, updateWindow,
    ],
  )

  if (shuttingDown) {
    return <ShutDownScreen onRestart={() => { setShuttingDown(false); setWindows([]) }} />
  }

  return (
    <OSContext.Provider value={osValue}>
      {poweringOn && <CrtPowerOn onDone={() => setPoweringOn(false)} />}
      {booted ? (
        <Desktop toasts={toasts} />
      ) : (
        <BootSequence
          onComplete={() => {
            setBooted(true)
          }}
        />
      )}
      {konamiActive && (
        <div className="pointer-events-none fixed inset-0 z-[10001] flex items-center justify-center">
          <div className="win-raised win-pixel animate-[win-pop_0.3s_ease-out] bg-black px-6 py-4 text-center">
            <p className="win-titlebar mb-3 animate-[rainbow_1s_linear_infinite] px-3 py-1 text-sm font-black tracking-widest text-white">
              ★ SECRET MODE ★
            </p>
            <p className="win-pixel text-[10px] text-[#ffd000]">KONAMI CODE ACCEPTED</p>
            <p className="win-pixel mt-2 text-[8px] text-white">You found the developer&apos;s secret.</p>
            <p className="win-pixel mt-1 text-[8px] text-[#00ff00]">Thank you for exploring Archive.</p>
          </div>
        </div>
      )}
      {onExitRetro && (
        <button
          onClick={onExitRetro}
          className="win-raised win-pixel fixed bottom-3 right-3 z-[10002] bg-[#000080] px-3 py-1 text-[10px] text-white hover:bg-[#1084d0]"
        >
          EXIT RETRO ✕
        </button>
      )}
    </OSContext.Provider>
  )
}

export default App
