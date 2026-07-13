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
    description: 'Profile, interests, and developer identity.',
    defaultSize: { width: 560, height: 480 },
    component: lazy(() => import('./AboutApp')),
    renderIcon: (props) => <PersonIcon {...props} />,
  },
  projects: {
    id: 'projects',
    name: 'File Explorer',
    description: 'File Explorer style portfolio project previews.',
    defaultSize: { width: 760, height: 520 },
    component: lazy(() => import('./ProjectsApp')),
    renderIcon: (props) => <FolderIcon {...props} />,
  },
  resume: {
    id: 'resume',
    name: 'Documents',
    description: 'Document viewer for resume data.',
    defaultSize: { width: 640, height: 500 },
    component: lazy(() => import('./ResumeApp')),
    renderIcon: (props) => <DiskIcon {...props} />,
  },
  contact: {
    id: 'contact',
    name: 'Mail',
    description: 'Mail client for contacting Kayden.',
    defaultSize: { width: 600, height: 440 },
    component: lazy(() => import('./ContactApp')),
    renderIcon: (props) => <MailIcon {...props} />,
  },
  workspace: {
    id: 'workspace',
    name: 'Workspace',
    description: 'Fake VS Code dev environment + git panel.',
    defaultSize: { width: 820, height: 560 },
    component: lazy(() => import('./WorkspaceApp')),
    renderIcon: (props) => <WorkspaceIcon {...props} />,
  },
  arcade: {
    id: 'arcade',
    name: 'Arcade',
    description: 'Launcher for existing and future standalone games.',
    defaultSize: { width: 700, height: 480 },
    component: lazy(() => import('./ArcadeApp')),
    renderIcon: (props) => <GameIcon {...props} />,
  },
  terminal: {
    id: 'terminal',
    name: 'Terminal',
    description: 'Fake terminal with portfolio commands.',
    defaultSize: { width: 680, height: 440 },
    component: lazy(() => import('./TerminalApp')),
    renderIcon: (props) => <TerminalIcon {...props} />,
  },
  settings: {
    id: 'settings',
    name: 'Settings',
    description: 'Themes, wallpapers, accent colors, and developer mode.',
    defaultSize: { width: 620, height: 460 },
    component: lazy(() => import('./SettingsApp')),
    renderIcon: (props) => <GearIcon {...props} />,
  },
  files: {
    id: 'files',
    name: 'My Computer',
    description: 'Fake filesystem for /home/kayden.',
    defaultSize: { width: 700, height: 500 },
    component: lazy(() => import('./FileExplorerApp')),
    renderIcon: (props) => <MyComputerIcon {...props} />,
  },
  browser: {
    id: 'browser',
    name: 'Browser',
    description: 'Fake browser for project links and demos.',
    defaultSize: { width: 780, height: 520 },
    component: lazy(() => import('./BrowserApp')),
    renderIcon: (props) => <GlobeIcon {...props} />,
  },
  notepad: {
    id: 'notepad',
    name: 'Notepad',
    description: 'Plain-text viewer for desktop files.',
    defaultSize: { width: 520, height: 420 },
    component: lazy(() => import('./NotepadApp')),
    renderIcon: (props) => <FileIcon {...props} />,
  },
  photos: {
    id: 'photos',
    name: 'Photos',
    description: 'Your Pictures folder, with EXIF info.',
    defaultSize: { width: 760, height: 520 },
    component: lazy(() => import('./PhotosApp')),
    renderIcon: (props) => <PhotoIcon {...props} />,
  },
  timeline: {
    id: 'timeline',
    name: 'Timeline',
    description: 'A timeline of your coding journey.',
    defaultSize: { width: 680, height: 560 },
    component: lazy(() => import('./TimelineApp')),
    renderIcon: (props) => <TimelineIcon {...props} />,
  },
  recycle: {
    id: 'recycle',
    name: 'Recycle Bin',
    description: 'Where deleted things go. Mostly empty.',
    defaultSize: { width: 560, height: 420 },
    component: lazy(() => import('./RecycleBinApp')),
    renderIcon: (props) => <RecycleIcon {...props} />,
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
  'settings',
]
