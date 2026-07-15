import { createContext, useContext } from 'react'
import type { AppId, AudioState, ThemeState, WallpaperId, WindowState, AchievementId, DesktopItem } from '../types'

type OSContextValue = {
  theme: ThemeState
  setTheme: React.Dispatch<React.SetStateAction<ThemeState>>
  audio: AudioState
  setAudio: React.Dispatch<React.SetStateAction<AudioState>>
  windows: WindowState[]
  desktopItems: DesktopItem[]
  openApp: (appId: AppId, opts?: { title?: string; content?: string; fsPath?: string }) => void
  closeWindow: (windowId: string) => void
  minimizeWindow: (windowId: string) => void
  maximizeWindow: (windowId: string) => void
  focusWindow: (windowId: string) => void
  updateWindow: (windowId: string, patch: Partial<WindowState>) => void
  setWallpaper: (id: WallpaperId) => void
  achievements: Record<AchievementId, boolean>
  unlock: (id: AchievementId) => void
  shutdown: () => void
}

export const OSContext = createContext<OSContextValue | null>(null)

export function useOS() {
  const value = useContext(OSContext)
  if (!value) {
    throw new Error('useOS must be used inside OSContext.Provider')
  }
  return value
}
