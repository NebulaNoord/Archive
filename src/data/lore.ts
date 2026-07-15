import type { FsNode, MusicTrack, NotificationMessage } from '../types'

/**
 * Kayden's virtual home folder. Lived-in and interconnected:
 *   Projects/<name>/README.md -> "Open Source" -> Workspace (VS Code) -> Source.url -> GitHub
 * Every node is reachable from the desktop File Explorer and most are clickable
 * into real apps, so the OS feels like one ecosystem, not disconnected windows.
 */
export const homeFs: FsNode = {
  id: 'home',
  name: 'kayden',
  kind: 'folder',
  children: [
    {
      id: 'desktop',
      name: 'Desktop',
      kind: 'folder',
      children: [
        { id: 'd-readme', name: 'README.txt', kind: 'file', ext: 'txt', content: readmeText() },
        { id: 'd-notes', name: 'Notes.txt', kind: 'file', ext: 'todo', content: notesTodo() },
        { id: 'd-ideas', name: 'ideas.txt', kind: 'file', ext: 'txt', content: ideasText() },
        {
          id: 'd-current',
          name: 'Current Project.lnk',
          kind: 'file',
          ext: 'lnk',
          target: { fsPath: 'projects/dayflow' },
        },
        { id: 'd-resume', name: 'Resume.pdf', kind: 'file', ext: 'pdf', target: { app: 'resume' } },
      ],
    },
    {
      id: 'projects',
      name: 'Projects',
      kind: 'folder',
      children: [
        projectFolder('dayflow', 'DayFlow', 'A daily-focus planner with streaks and a calm UI.'),
        projectFolder('delta view', 'DeltaView', 'Side-by-side diff viewer for design versions.'),
        projectFolder('mazerunner', 'MazeRunner', '999-level pixel maze game. Runs on any phone.'),
        projectFolder('portfolio', 'Portfolio', 'This site. Built with React, TypeScript, Vite.'),
      ],
    },
    {
      id: 'downloads',
      name: 'Downloads',
      kind: 'folder',
      children: [
        { id: 'dl-wall', name: 'Wallpaper.zip', kind: 'file', ext: 'png' },
        { id: 'dl-cheat', name: 'React Cheatsheet.pdf', kind: 'file', ext: 'pdf', target: { app: 'resume' } },
        { id: 'dl-cat', name: 'FunnyCat.png', kind: 'file', ext: 'png' },
        { id: 'dl-readme', name: 'README.txt', kind: 'file', ext: 'txt', content: readmeText() },
        { id: 'dl-cursor', name: 'PixelCursor.cur', kind: 'file', ext: 'cur' },
      ],
    },
    { id: 'pictures', name: 'Pictures', kind: 'folder', children: [] },
    {
      id: 'music',
      name: 'Music',
      kind: 'folder',
      children: [
        { id: 'm-open', name: 'Open Player.lnk', kind: 'file', ext: 'lnk', target: { app: 'media' } },
      ],
    },
    { id: 'documents', name: 'Documents', kind: 'folder', children: [
      { id: 'doc-todo', name: 'TODO.md', kind: 'file', ext: 'todo', content: notesTodo() },
      { id: 'doc-notes', name: 'Notes.txt', kind: 'file', ext: 'txt', content: notesText() },
    ] },
  ],
}

function projectFolder(id: string, name: string, blurb: string): FsNode {
  return {
    id: `p-${id}`,
    name,
    kind: 'folder',
    children: [
      { id: `${id}-readme`, name: 'README.md', kind: 'file', ext: 'md', content: `# ${name}\n\n${blurb}\n\n## Status\nIn progress. Open "Source Code" to dive in.\n` },
      { id: `${id}-preview`, name: 'Preview.png', kind: 'file', ext: 'png' },
      { id: `${id}-tech`, name: 'Tech.txt', kind: 'file', ext: 'txt', content: `Stack:\n- React 19\n- TypeScript\n- Vite\n- Tailwind\n\nBuild: ~${60 + (id.length * 3)} kB gzip` },
      {
        id: `${id}-src`,
        name: 'Source Code.lnk',
        kind: 'file',
        ext: 'lnk',
        target: { app: 'workspace', fsPath: `projects/${id}` },
      },
      {
        id: `${id}-gh`,
        name: 'GitHub.url',
        kind: 'file',
        ext: 'url',
        target: { href: 'https://github.com/NebulaNoord', title: `${name} on GitHub` },
      },
    ],
  }
}

function readmeText(): string {
  return `KAYDEN'S WORKSTATION  -  README.txt
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
}

function notesText(): string {
  return `Notes.txt
=========

Things I'm thinking about while building this:

- The retro OS should feel like MY computer, not Windows.
- Every app should link to the next one.
- Sounds only on action. Never ambient noise.
- People love finding secrets. Hide a few.`
}

function notesTodo(): string {
  return `TODO.md  —  updated ${new Date().toISOString().slice(0, 10)}
====================================

Things I want to build
[ ] Multiplayer game
[x] DayFlow
[ ] Mobile app
[x] Portfolio
[ ] Blog engine

Current Bugs
[ ] Wallpaper picker (sometimes resets)
[x] Taskbar animations
[ ] Explorer search

Ideas
[ ] Crew (collab tool)
[ ] Vault (notes sync)
[ ] Nebula (???)`
}

function ideasText(): string {
  return `ideas.txt
=========

Project ideas (half-baked, on purpose):

- Crew ...... a tiny team task board
- Vault ..... encrypted-ish notes
- Nebula .... no idea yet, sounds cool
- PixelOS ... oh wait, that's this

If you found this file, you're the kind of person
who reads other people's Notes.txt. Respect.`
}

export const musicTracks: MusicTrack[] = [
  {
    id: 'swimming-pools',
    title: 'Swimming Pools (Drank)',
    artist: 'Kendrick Lamar',
    duration: 245,
    file: '/music/swimming-pools.mp3',
    wave: 'triangle',
    notes: [
      [130.81, 2], [196.0, 2], [261.63, 2], [196.0, 2],
      [174.61, 2], [220.0, 2], [261.63, 2], [196.0, 2],
    ],
  },
  {
    id: 'champion',
    title: 'Champion',
    artist: 'Kanye West',
    duration: 233,
    file: '/music/champion.mp3',
    wave: 'sawtooth',
    notes: [
      [146.83, 1], [220.0, 1], [293.66, 1], [220.0, 1],
      [174.61, 1], [261.63, 1], [349.23, 1], [261.63, 1],
    ],
  },
  {
    id: 'hood-gone-love-it',
    title: 'Hood Gone Love It',
    artist: 'Jay Rock ft. Kendrick Lamar',
    duration: 234,
    file: '/music/hood-gone-love-it.mp3',
    wave: 'square',
    notes: [
      [110.0, 1], [164.81, 1], [220.0, 1], [164.81, 1],
      [146.83, 1], [220.0, 1], [293.66, 1], [220.0, 1],
    ],
  },
  {
    id: 'noble',
    title: 'NOBLE',
    artist: 'F3miii',
    duration: 200,
    file: '/music/noble.mp3',
    wave: 'triangle',
    notes: [
      [146.83, 1], [220.0, 1], [293.66, 1], [220.0, 1],
      [174.61, 1], [261.63, 1], [329.63, 1], [261.63, 1],
    ],
  },
  {
    id: 'focus',
    title: 'Late Night Compile',
    artist: 'Kayden',
    duration: 16,
    wave: 'triangle',
    notes: [
      [261.63, 1], [329.63, 1], [392.0, 1], [523.25, 1],
      [392.0, 1], [329.63, 1], [293.66, 1], [261.63, 1],
      [261.63, 1], [392.0, 1], [523.25, 1], [659.25, 1],
      [523.25, 1], [392.0, 1], [329.63, 1], [261.63, 1],
    ],
  },
  {
    id: 'pixel',
    title: '8-Bit Daydream',
    artist: 'Kayden',
    duration: 12,
    wave: 'square',
    notes: [
      [523.25, 0.5], [659.25, 0.5], [783.99, 0.5], [659.25, 0.5],
      [523.25, 0.5], [783.99, 0.5], [1046.5, 1], [783.99, 0.5],
      [659.25, 0.5], [523.25, 0.5], [659.25, 0.5], [523.25, 1],
    ],
  },
]

export const bootNotifications: NotificationMessage[] = [
  {
    id: 'n-hermes',
    from: 'Hermes',
    subject: "Don't forget the wallpaper manager",
    body: "Hey — you left the dynamic wallpaper picker half-done. Rain mode still resets on boot. Finish it before you show anyone 😂",
    open: 'mail',
  },
  {
    id: 'n-f1',
    from: 'Formula 1',
    subject: 'Race weekend',
    body: 'Next session in 2 days. Open Browser > Formula 1 to keep track.',
    open: 'browser',
  },
]
