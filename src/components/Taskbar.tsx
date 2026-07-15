import { useState } from 'react'
import { appRegistry } from '../apps/registry'
import { useOS } from '../contexts/OSContext'
import { useClock } from '../hooks/useClock'
import { StartMenu } from './StartMenu'
import { TrayIcons } from './TrayIcons'

const quickLaunch: ('projects' | 'terminal' | 'arcade')[] = ['projects', 'terminal', 'arcade']

export function Taskbar() {
  const clock = useClock()
  const { windows, minimizeWindow, focusWindow, openApp, audio, setAudio, achievements } = useOS()
  const [menuOpen, setMenuOpen] = useState(false)

  const unlockedCount = Object.values(achievements).filter(Boolean).length

  return (
    <>
      <footer className="absolute inset-x-0 bottom-0 z-[9999] flex h-9 items-center gap-1 border-t-2 border-white bg-[#c0c0c0]/85 px-1 backdrop-blur-[1px]">
        <button
          className={`win-btn flex h-7 items-center gap-1 win-pixel text-[9px] ${menuOpen ? 'pressed' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="flex h-4 w-4 items-center justify-center bg-[#000080] text-[10px] text-white">P</span>
          Start
        </button>

        <div className="h-7 w-0.5 bg-[#808080] shadow-[1px_0_0_#fff]" />

        {/* Quick launch */}
        {quickLaunch.map((id) => (
          <button
            key={id}
            className="win-btn flex h-7 w-7 items-center justify-center p-0"
            title={appRegistry[id].name}
            onClick={() => openApp(id)}
          >
            {appRegistry[id].renderIcon({ size: 22 })}
          </button>
        ))}

        <div className="h-7 w-0.5 bg-[#808080] shadow-[1px_0_0_#fff]" />

        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
          {windows.map((windowState) => (
            <button
              key={windowState.id}
              className={`win-btn flex h-7 items-center gap-1 text-xs ${windowState.minimized ? '' : 'pressed'}`}
              onClick={() => {
                if (windowState.minimized) {
                  minimizeWindow(windowState.id)
                }
                focusWindow(windowState.id)
              }}
            >
              {appRegistry[windowState.appId].renderIcon({ size: 16 })}
              {windowState.title}
            </button>
          ))}
        </div>

        <div className="win-sunken flex items-center gap-2 px-2 py-1 text-xs">
          <TrayIcons />
          <button
            className="win-btn flex h-6 items-center gap-1 px-1 text-[10px]"
            title={audio.enabled ? 'Mute' : 'Unmute'}
            onClick={() => setAudio((a) => ({ enabled: !a.enabled }))}
          >
            {audio.enabled ? '🔊' : '🔇'}
          </button>
          <span className="win-pixel text-[8px]" title={`Achievements: ${unlockedCount}/5`}>🏆{unlockedCount}</span>
          {clock}
        </div>
      </footer>

      {menuOpen && <StartMenu onClose={() => setMenuOpen(false)} />}
    </>
  )
}
