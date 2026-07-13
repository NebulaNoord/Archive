import type { DesktopItem } from '../types'

const welcomeText = `Welcome.

I'm Kayden.

This isn't just a portfolio.
It's my workspace.

Everything here represents something I've built,
learned, or experimented with.

Take a look around.
You might even find a few secrets.

- Double-click README.txt for the tour.
- Try the Terminal. Type 'help'.
- The Konami code does something.`

const readmeText = `KAYDEN'S WORKSTATION  -  README.txt
====================================

Thanks for visiting. This is a simulated Windows 95
workspace that doubles as my developer portfolio.

WHAT'S HERE
-----------
User Profile .... who I am
Projects ........ my real projects (live links)
Resume .......... my resume
Timeline ........ my coding journey
Photos .......... my Pictures folder
Workspace ....... fake dev environment (IDE)
Arcade ......... Maze Runner + Pythonix
Terminal ........ hidden commands live here
Browser ......... external demos

SECRETS
-------
Some things respond to input. Try:
  - The Konami code (↑↑↓↓←→←→ B A)
  - Terminal: sudo rm -rf /
  - Terminal: neofetch
  - 10 clicks on the Recycle Bin

Press Start > Shut Down to leave.`

export const desktopItems: DesktopItem[] = [
  { id: 'di-user', kind: 'app', label: 'User Profile', appId: 'about' },
  { id: 'di-projects', kind: 'app', label: 'Projects', appId: 'projects' },
  { id: 'di-resume', kind: 'app', label: 'Resume', appId: 'resume' },
  { id: 'di-timeline', kind: 'app', label: 'Timeline', appId: 'timeline' },
  { id: 'di-photos', kind: 'app', label: 'Photos', appId: 'photos' },
  { id: 'di-workspace', kind: 'app', label: 'Workspace', appId: 'workspace' },
  { id: 'di-arcade', kind: 'app', label: 'Arcade', appId: 'arcade' },
  { id: 'di-browser', kind: 'app', label: 'Browser', appId: 'browser' },
  { id: 'di-settings', kind: 'app', label: 'Settings', appId: 'settings' },
  { id: 'di-terminal', kind: 'app', label: 'Terminal', appId: 'terminal' },
  { id: 'di-recycle', kind: 'app', label: 'Recycle Bin', appId: 'recycle' },
  { id: 'di-readme', kind: 'file', label: 'README.txt', content: readmeText },
  { id: 'di-welcome', kind: 'file', label: 'Welcome.txt', content: welcomeText },
]

export function getItemContent(label: string): string | undefined {
  if (label === 'Welcome.txt') return welcomeText
  if (label === 'README.txt') return readmeText
  return undefined
}
