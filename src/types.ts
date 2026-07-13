import type { ComponentType } from 'react'

export type AppId =
  | 'about'
  | 'projects'
  | 'resume'
  | 'contact'
  | 'workspace'
  | 'arcade'
  | 'terminal'
  | 'settings'
  | 'files'
  | 'browser'
  | 'notepad'
  | 'photos'
  | 'timeline'
  | 'recycle'

export type PixelAppComponent = ComponentType<{ windowId: string }>

export type WallpaperId =
  | 'classic'
  | 'bliss'
  | 'alpine'
  | 'evergreen'
  | 'nightcity'
  | 'cosmos'
  | 'prairie'
  | 'sunset'
  | 'workspace'
  | 'garage'

export type AchievementId =
  | 'first-boot'
  | 'found-pythonix'
  | 'used-terminal'
  | 'changed-wallpaper'
  | 'opened-everything'

export type ThemeState = {
  wallpaper: WallpaperId
  theme: 'dark' | 'light'
  accent: string
  animations: boolean
  developerMode: boolean
}

export type AudioState = {
  enabled: boolean
}

export type WindowState = {
  id: string
  appId: AppId
  title: string
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  minimized: boolean
  maximized: boolean
  /** transient flags used to drive open/minimize/maximize animations */
  anim?: 'open' | 'minimize' | 'maximize' | null
  /** text content for notepad windows opened from a desktop file */
  content?: string
}

/** A non-app desktop item (file, folder shortcut, or app shortcut). */
export type DesktopItemKind = 'app' | 'folder' | 'file'

export type DesktopItem = {
  id: string
  kind: DesktopItemKind
  label: string
  appId?: AppId
  /** text content for `file` items opened in Notepad */
  content?: string
  /** accent for `folder` items */
  tint?: string
}
