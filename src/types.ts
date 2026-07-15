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
  | 'media'
  | 'mail'

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
  | 'studio'
  | 'snow'

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
  /** manual season override for the dynamic desktop (null = use real weather/time) */
  seasonOverride: 'auto' | 'winter'
  /** custom pixel cursor on/off */
  pixelCursor: boolean
  /** CRT scanline/aberration intensity */
  crt: boolean
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
  /** path into the virtual filesystem (for File Explorer sub-views) */
  fsPath?: string
}

/** A non-app desktop item (file, folder shortcut, or app shortcut). */
export type DesktopItemKind = 'app' | 'folder' | 'file' | 'link'

export type DesktopItem = {
  id: string
  kind: DesktopItemKind
  label: string
  appId?: AppId
  /** virtual-fs path this item opens (folders/links) */
  fsPath?: string
  /** text content for `file` items opened in Notepad */
  content?: string
  /** accent for `folder` items */
  tint?: string
}

/** Virtual filesystem node for the interconnected File Explorer. */
export type FsNode = {
  id: string
  name: string
  kind: 'folder' | 'file'
  /** file extension drives the icon + viewer */
  ext?: 'txt' | 'md' | 'todo' | 'png' | 'url' | 'pdf' | 'lnk' | 'app' | 'exe' | 'cur'
  children?: FsNode[]
  /** file body (text) */
  content?: string
  /** for .url / .lnk — the app to open, or external link */
  target?: { app?: AppId; fsPath?: string; href?: string; title?: string }
}

export type MusicTrack = {
  id: string
  title: string
  artist: string
  /** seconds */
  duration: number
  /** a small melody as [freqHz, beats] pairs; played with Web Audio */
  notes: [number, number][]
  /** base waveform */
  wave?: OscillatorType
}

export type NotificationMessage = {
  id: string
  from: string
  subject: string
  body: string
  /** app to open when clicked */
  open?: AppId
}
