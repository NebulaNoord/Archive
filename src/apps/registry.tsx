import { lazy, type JSX, type LazyExoticComponent } from 'react'
import type { AppId, PixelAppComponent } from '../types'
import {
  DiskIcon,
  FolderIcon,
  GameIcon,
  GearIcon,
  FileIcon,
  GlobeIcon,
  MailIcon,
  MyComputerIcon,
  MusicIcon,
  PersonIcon,
  PhotoIcon,
  RecycleIcon,
  TerminalIcon,
  TimelineIcon,
  WorkspaceIcon,
} from '../icons'

type AppRegistryEntry = {
  id: AppId
  name: string
  description: string
  defaultSize: { width: number; height: number }
  component: LazyExoticComponent<PixelAppComponent>
  renderIcon: (props: { size?: number }) => JSX.Element
}

export const appRegistry: Record<AppId, AppRegistryEntry> = {
  about: {
    id: 'about',
    name: 'User Profile',
    description: 'Who I am.',
    defaultSize: { width: 560, height: 480 },
    component: lazy(() => import('./AboutApp')),
    renderIcon: (props) => <PersonIcon {...props} />,
  },
  projects: {
    id: 'projects',
    name: 'File Explorer',
    description: 'My projects, as a real filesystem.',
    defaultSize: { width: 760, height: 520 },
    component: lazy(() => import('./ProjectsApp')),
    renderIcon: (props) => <FolderIcon {...props} />,
  },
  resume: {
    id: 'resume',
    name: 'Resume',
    description: 'My resume (PDF-style).',
    defaultSize: { width: 640, height: 520 },
    component: lazy(() => import('./ResumeApp')),
    renderIcon: (props) => <DiskIcon {...props} />,
  },
  contact: {
    id: 'contact',
    name: 'Mail',
    description: 'My inbox.',
    defaultSize: { width: 600, height: 460 },
    component: lazy(() => import('./ContactApp')),
    renderIcon: (props) => <MailIcon {...props} />,
  },
  workspace: {
    id: 'workspace',
    name: 'Workspace',
    description: 'Fake VS Code — my real project structure.',
    defaultSize: { width: 820, height: 560 },
    component: lazy(() => import('./WorkspaceApp')),
    renderIcon: (props) => <WorkspaceIcon {...props} />,
  },
  arcade: {
    id: 'arcade',
    name: 'Arcade',
    description: 'Maze Runner + Pythonix.',
    defaultSize: { width: 700, height: 480 },
    component: lazy(() => import('./ArcadeApp')),
    renderIcon: (props) => <GameIcon {...props} />,
  },
  terminal: {
    id: 'terminal',
    name: 'Terminal',
    description: 'Commands: help, whoami, projects, open…',
    defaultSize: { width: 680, height: 440 },
    component: lazy(() => import('./TerminalApp')),
    renderIcon: (props) => <TerminalIcon {...props} />,
  },
  settings: {
    id: 'settings',
    name: 'Settings',
    description: 'Wallpaper, theme, sound, cursor, CRT.',
    defaultSize: { width: 620, height: 480 },
    component: lazy(() => import('./SettingsApp')),
    renderIcon: (props) => <GearIcon {...props} />,
  },
  files: {
    id: 'files',
    name: 'This PC',
    description: 'My virtual drives and home folder.',
    defaultSize: { width: 720, height: 500 },
    component: lazy(() => import('./FileExplorerApp')),
    renderIcon: (props) => <MyComputerIcon {...props} />,
  },
  browser: {
    id: 'browser',
    name: 'Browser',
    description: 'Bookmarks, not Google.',
    defaultSize: { width: 780, height: 520 },
    component: lazy(() => import('./BrowserApp')),
    renderIcon: (props) => <GlobeIcon {...props} />,
  },
  notepad: {
    id: 'notepad',
    name: 'Notepad',
    description: 'Plain-text + TODO viewer.',
    defaultSize: { width: 520, height: 440 },
    component: lazy(() => import('./NotepadApp')),
    renderIcon: (props) => <FileIcon {...props} />,
  },
  photos: {
    id: 'photos',
    name: 'Photos',
    description: 'My Pictures folder.',
    defaultSize: { width: 760, height: 520 },
    component: lazy(() => import('./PhotosApp')),
    renderIcon: (props) => <PhotoIcon {...props} />,
  },
  timeline: {
    id: 'timeline',
    name: 'Timeline',
    description: 'My coding journey.',
    defaultSize: { width: 680, height: 560 },
    component: lazy(() => import('./TimelineApp')),
    renderIcon: (props) => <TimelineIcon {...props} />,
  },
  recycle: {
    id: 'recycle',
    name: 'Recycle Bin',
    description: 'Where deleted things go.',
    defaultSize: { width: 560, height: 420 },
    component: lazy(() => import('./RecycleBinApp')),
    renderIcon: (props) => <RecycleIcon {...props} />,
  },
  media: {
    id: 'media',
    name: 'Media Player',
    description: 'What I code to.',
    defaultSize: { width: 560, height: 420 },
    component: lazy(() => import('./MediaPlayerApp')),
    renderIcon: (props) => <MusicIcon {...props} />,
  },
  mail: {
    id: 'mail',
    name: 'Mail',
    description: 'Inbox (Hermes, F1, …).',
    defaultSize: { width: 600, height: 460 },
    component: lazy(() => import('./MailApp')),
    renderIcon: (props) => <MailIcon {...props} />,
  },
}

export const desktopApps: AppId[] = [
  'about',
  'projects',
  'resume',
  'workspace',
  'arcade',
  'terminal',
  'files',
  'browser',
  'media',
  'mail',
  'settings',
]
