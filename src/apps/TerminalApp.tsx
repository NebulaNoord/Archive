import { useState } from 'react'
import { profile, projects, skills } from '../data/portfolio'
import { homeFs } from '../data/lore'
import { useOS } from '../contexts/OSContext'

const commandList = ['help', 'whoami', 'about', 'projects', 'dayflow', 'skills', 'resume', 'mail', 'open', 'neofetch', 'fortune', 'clear']

const FORTUNES = [
  'GOOD DESIGN IS HONEST. — DIYETER RAMS',
  'THE BEST WAY TO PREDICT THE FUTURE IS TO INVENT IT.',
  'SHIP THE THING. PERFECT IS THE ENEMY OF DONE.',
  'EVERY PIXEL COUNTS. ESPECIALLY THE QUIET ONES.',
  'A SITE THAT LOADS FAST IS A SITE THAT GETS READ.',
  'YOU CANT SPELL FRONTEND WITHOUT FUN.',
]

const LOGO = String.raw`
 _   _ _____ _   _ _   _ _   _ ____
| \ | | ____| | | | \ | | \ | |  _ \
|  \| |  _| | | | |  \| |  \| | |_) |
| |\  | |___| |_| | |\  | |\  |  _ <
|_| \_|_____|\___/|_| \_|_| \_|_| \_\
`

function findFs(path: string) {
  const walk = (node: typeof homeFs): typeof homeFs | null => {
    if (node.name.toLowerCase() === path || node.id === path) return node
    for (const c of node.children ?? []) {
      const r = walk(c)
      if (r) return r
    }
    return null
  }
  return walk(homeFs)
}

export default function TerminalApp() {
  const { openApp } = useOS()
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([
    `${LOGO}`,
    'NEBULANOORD TERMINAL READY.',
    'TYPE "help" FOR COMMANDS.',
  ])

  const run = (command: string): string => {
    const normalized = command.trim().toLowerCase()
    if (normalized === 'help')
      return `AVAILABLE COMMANDS:\n${commandList.join('  ')}\n\nEXAMPLES:\n  open dayflow      -> opens DayFlow in Workspace\n  open projects     -> opens File Explorer\n  open mail         -> opens Mail`
    if (normalized === 'whoami')
      return `${profile.name}\nFrontend Developer\nGrade 11\nCanada\n\n> whoami --detail for more`
    if (normalized === 'whoami --detail')
      return `${profile.name}\nRole:    ${profile.roles.join(' / ')}\nStudio:  ${profile.studio}\nLoc:     ${profile.location}\nStack:   ${skills.join(' / ')}\nStatus:  ${profile.availability?.status ?? 'OPEN'}`
    if (normalized === 'about')
      return `${profile.name.toUpperCase()}: ${profile.roles.join(' / ')} - ${profile.location}\n${profile.studio}: ${profile.studioDesc}`
    if (normalized === 'projects')
      return projects.map((p) => `DIR ${p.name.padEnd(12)} ${p.description}`).join('\n')
    if (normalized === 'dayflow') {
      openApp('workspace', { fsPath: 'projects/dayflow' })
      return 'Opening DayFlow in Workspace...'
    }
    if (normalized === 'skills') return skills.join(' / ')
    if (normalized === 'resume')
      return `${profile.name.toUpperCase()} - ${profile.roles.join(' / ')}\nLOCATION: ${profile.location}\nSTACK: ${skills.join(' / ')}\nOPEN FOR WORK. EMAIL: nebulanoord@gmail.com`
    if (normalized === 'mail') {
      openApp('mail')
      return 'Opening Mail...'
    }
    if (normalized.startsWith('open ')) {
      const target = normalized.slice(5).trim()
      const appIds = ['about', 'projects', 'resume', 'workspace', 'arcade', 'terminal', 'files', 'browser', 'media', 'mail', 'settings', 'photos', 'timeline', 'recycle']
      if (appIds.includes(target)) {
        openApp(target as never)
        return `Opening ${target}...`
      }
      const fs = findFs(target)
      if (fs) {
        openApp(fs.kind === 'folder' ? 'files' : 'files', { fsPath: fs.id })
        return `Opening ${fs.name}...`
      }
      return `open: ${target}: No such app or file`
    }
    if (normalized === 'neofetch')
      return `${LOGO}\nOS:      NEBULANOORD OS v1.0\nSTUDIO:  ${profile.studio}\nCPU:     REACT 19\nSHELL:   portfolio-os\nBUNDLER: VITE\nAPPS:    ${projects.length} projects + games`
    if (normalized === 'fortune') return FORTUNES[Math.floor(Math.random() * FORTUNES.length)]
    if (normalized === 'sudo rm -rf /') return 'Nice try.'
    if (normalized === 'iddqd') return 'DOOM not found. But nice reference.'
    if (normalized === 'konami') return '↑↑↓↓←→←→ B A'
    if (!normalized) return ''
    return `BAD COMMAND OR FILE NAME: ${command}`
  }

  return (
    <div className="flex h-full flex-col win-sunken bg-black p-2 text-sm text-[#00a800]">
      <pre className="min-h-0 flex-1 whitespace-pre-wrap">{history.join('\n')}</pre>
      <form
        className="mt-2 flex gap-1 border-t border-[#00a800] pt-2"
        onSubmit={(event) => {
          event.preventDefault()
          if (input.trim().toLowerCase() === 'clear') {
            setHistory([])
          } else {
            setHistory((items) => [...items, `C:\\NEBULANOORD> ${input}`, run(input)])
          }
          setInput('')
        }}
      >
        <span>C:\NEBULANOORD&gt;</span>
        <input
          className="flex-1 bg-transparent text-[#00a800] outline-none"
          value={input}
          autoFocus
          onChange={(event) => setInput(event.target.value)}
          placeholder="help"
        />
      </form>
    </div>
  )
}
