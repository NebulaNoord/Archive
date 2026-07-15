import { useMemo, useState } from 'react'
import { profile, projects, skills } from '../data/portfolio'

const commandList = ['help', 'about', 'projects', 'skills', 'resume', 'contact', 'clear', 'neofetch', 'fortune']

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

function runCommand(command: string) {
  const normalized = command.trim().toLowerCase()
  if (normalized === 'help') return `AVAILABLE COMMANDS:\n${commandList.join('  ')}`
  if (normalized === 'about')
    return `${profile.name.toUpperCase()}: ${profile.roles.join(' / ')} - ${profile.location}\n${profile.studio}: ${profile.studioDesc}`
  if (normalized === 'projects')
    return projects.map((project) => `DIR ${project.name.padEnd(12)} ${project.description}`).join('\n')
  if (normalized === 'skills') return skills.join(' / ')
  if (normalized === 'resume')
    return `${profile.name.toUpperCase()} - ${profile.roles.join(' / ')}\nLOCATION: ${profile.location}\nSTACK: ${skills.join(' / ')}\nOPEN FOR WORK. EMAIL: nebulanoord@gmail.com`
  if (normalized === 'contact') return 'MAIL: nebulanoord@gmail.com\nGITHUB: github.com/NebulaNoord'
  if (normalized === 'neofetch')
    return `${LOGO}\nOS:      NEBULANOORD OS v1.0\nSTUDIO:  ${profile.studio}\nCPU:     REACT 19\nSHELL:   portfolio-os\nBUNDLER: VITE\nUI:      WINDOWS 95 VIBES\nAPPS:    ${String(projects.length)} projects + games`
  if (normalized === 'fortune') return FORTUNES[Math.floor(Math.random() * FORTUNES.length)]
  if (normalized === 'sudo rm -rf /') return 'Nice try.'
  if (normalized === 'iddqd') return 'DOOM not found. But nice reference.'
  if (normalized === 'konami') return '↑↑↓↓←→←→ B A'
  if (!normalized) return ''
  return `BAD COMMAND OR FILE NAME: ${command}`
}

export default function TerminalApp() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([`${LOGO}`, 'NEBULANOORD TERMINAL READY.', 'TYPE HELP FOR COMMANDS.'])
  const output = useMemo(() => history.join('\n'), [history])

  return (
    <div className="flex h-full flex-col win-sunken bg-black p-2 text-sm text-[#00a800]">
      <pre className="min-h-0 flex-1 whitespace-pre-wrap">{output}</pre>
      <form
        className="mt-2 flex gap-1 border-t border-[#00a800] pt-2"
        onSubmit={(event) => {
          event.preventDefault()
          if (input.trim().toLowerCase() === 'clear') {
            setHistory([])
          } else {
            setHistory((items) => [...items, `C:\\NEBULANOORD> ${input}`, runCommand(input)])
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
