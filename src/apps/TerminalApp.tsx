import { useMemo, useState } from 'react'
import { projects, skills } from '../data/portfolio'

const commandList = ['help', 'about', 'projects', 'skills', 'resume', 'contact', 'clear', 'neofetch']

function runCommand(command: string) {
  const normalized = command.trim().toLowerCase()
  if (normalized === 'help') return `AVAILABLE COMMANDS:\n${commandList.join('  ')}`
  if (normalized === 'about') return 'KAYDEN: FRONTEND DEVELOPER / STUDENT - ALBERTA, CANADA'
  if (normalized === 'projects') return projects.map((project) => `DIR ${project.name.padEnd(12)} ${project.description}`).join('\n')
  if (normalized === 'skills') return skills.join(' / ')
  if (normalized === 'resume') return 'RESUME.DOC NOT MOUNTED YET. ADD EXTERNAL LINK LATER.'
  if (normalized === 'contact') return 'MAIL DEVICE NOT CONFIGURED. ADD EMAIL/GITHUB/LINKEDIN LATER.'
  if (normalized === 'sudo rm -rf /') return 'Nice try.'
  if (normalized === 'iddqd') return 'DOOM not found. But nice reference.'
  if (normalized === 'konami') return '↑↑↓↓←→←→ B A'
  if (normalized === 'neofetch') return 'ARCHIVE v1.0\nCPU: REACT 19\nSHELL: portfolio-os\nBUNDLER: VITE\nUI: WINDOWS 95\nAPPS: LAZY MODULES'
  if (!normalized) return ''
  return `BAD COMMAND OR FILE NAME: ${command}`
}

export default function TerminalApp() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>(['ARCHIVE TERMINAL READY.', 'TYPE HELP FOR COMMANDS.'])
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
            setHistory((items) => [...items, `C:\\ARCHIVE> ${input}`, runCommand(input)])
          }
          setInput('')
        }}
      >
        <span>C:\ARCHIVE&gt;</span>
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
