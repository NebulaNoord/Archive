import type { DesktopItem } from '../types'
import { homeFs } from './lore'

const readmeText = `KAYDEN'S WORKSTATION  -  README.txt
====================================

This isn't a Windows clone. It's my actual workspace,
simulated. Everything here is something I built, learned,
or am working on right now.

START HERE
----------
- README.txt ...... you are here
- Notes.txt ....... what I'm building / bugs / ideas
- Projects ........ real projects, each with a README
- Workspace ....... my code (opens in a fake VS Code)
- Terminal ......... type 'help' for secrets
- Music ............ what I code to

OPEN AN APP, THEN FOLLOW THE LINKS.
Resume mentions DayFlow -> open it -> "Source Code"
-> Workspace -> "README" -> Browser -> GitHub.
That's the whole point: it's one connected machine.

SECRETS
-------
- Konami code (↑↑↓↓←→←→ B A)
- Terminal: sudo rm -rf /
- 10 clicks on the Recycle Bin

Shut Down from the Start menu when you're done.`

const welcomeText = `Welcome.

I'm Kayden.

This is my workspace — not a portfolio pretending to be
Windows. It's the machine I'd actually sit at.

Poke around. Open README.txt. Try the Terminal.
Some things are connected; some things are secrets.

- Double-click README.txt for the tour.
- The Konami code does something.`

export const desktopItems: DesktopItem[] = [
  { id: 'di-readme', kind: 'file', label: 'README.txt', content: readmeText },
  { id: 'di-welcome', kind: 'file', label: 'Welcome.txt', content: welcomeText },
  { id: 'di-current', kind: 'link', label: 'Current Project.lnk', fsPath: 'p-dayflow' },
  { id: 'di-resume', kind: 'file', label: 'Resume.pdf', appId: 'resume' },
  { id: 'di-dayflow', kind: 'app', label: 'DayFlow.app', appId: 'workspace', fsPath: 'projects/dayflow' },
  { id: 'di-deltaview', kind: 'app', label: 'DeltaView.app', appId: 'workspace', fsPath: 'projects/delta view' },
  { id: 'di-maze', kind: 'app', label: 'MazeRunner.exe', appId: 'arcade' },
  { id: 'di-photos', kind: 'app', label: 'Photos', appId: 'photos' },
  { id: 'di-downloads', kind: 'folder', label: 'Downloads', tint: '#ffd000', fsPath: 'downloads' },
  { id: 'di-thispc', kind: 'app', label: 'This PC', appId: 'files' },
  { id: 'di-browser', kind: 'app', label: 'Browser', appId: 'browser' },
  { id: 'di-media', kind: 'app', label: 'Media Player', appId: 'media' },
  { id: 'di-mail', kind: 'app', label: 'Mail', appId: 'mail' },
  { id: 'di-terminal', kind: 'app', label: 'Terminal', appId: 'terminal' },
  { id: 'di-settings', kind: 'app', label: 'Settings', appId: 'settings' },
  { id: 'di-recycle', kind: 'app', label: 'Recycle Bin', appId: 'recycle' },
]

// re-export for any legacy callers
export { homeFs }
export function getItemContent(label: string): string | undefined {
  if (label === 'Welcome.txt') return welcomeText
  if (label === 'README.txt') return readmeText
  return undefined
}
