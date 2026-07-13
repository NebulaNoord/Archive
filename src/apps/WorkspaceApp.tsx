import { useState } from 'react'

type FileNode = { name: string; path: string; lang: string; code: string }

const files: FileNode[] = [
  {
    name: 'Desktop.tsx', path: 'src/Desktop.tsx', lang: 'tsx',
    code: `export function Desktop() {
  const { openApp, theme } = useOS()
  return (
    <main style={{ background: theme.wallpaper }}>
      {desktopItems.map((item) => (
        <Icon key={item.id} onOpen={() => openApp(item.appId)} />
      ))}
    </main>
  )
}`,
  },
  {
    name: 'Wallpaper.tsx', path: 'src/components/Wallpaper.tsx', lang: 'tsx',
    code: `export function Wallpaper({ id }: Props) {
  // 10 pixel scenes, each with hidden references
  // to F1, Hot Wheels, and a tiny snake (Pythonix).
  switch (id) {
    case 'alpine': return <Alpine />
    case 'nightcity': return <NightCity /> // rain + tiny cars
    default: return <Bliss />
  }
}`,
  },
  {
    name: 'windowManager.ts', path: 'src/windows/windowManager.ts', lang: 'ts',
    code: `export function focusWindow(id: string) {
  const z = ++zCounter.current
  setWindows((ws) =>
    ws.map((w) => (w.id === id ? { ...w, zIndex: z } : w)),
  )
}`,
  },
  {
    name: 'konami.ts', path: 'src/easter/konami.ts', lang: 'ts',
    code: `const CODE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export function watchKonami(onMatch: () => void) {
  // unlocks the secret mode overlay
}`,
  },
  {
    name: 'README.md', path: 'README.md', lang: 'md',
    code: `# Archive

Kayden's retro pixel-art OS portfolio.
Built with React + TypeScript + Vite + Tailwind.

> Not a website. A workstation.`,
  },
]

const tree: { name: string; children?: { name: string; children?: { name: string }[] }[] }[] = [
  { name: 'src', children: [
    { name: 'components', children: [{ name: 'Wallpaper.tsx' }, { name: 'Desktop.tsx' }] },
    { name: 'apps', children: [{ name: 'WorkspaceApp.tsx' }, { name: 'PhotosApp.tsx' }] },
    { name: 'windows', children: [{ name: 'windowManager.ts' }] },
    { name: 'easter', children: [{ name: 'konami.ts' }] },
  ] },
  { name: 'README.md' },
]

function TreeRows({ nodes, depth = 0 }: { nodes: typeof tree; depth?: number }) {
  return (
    <ul>
      {nodes.map((n) => (
        <li key={n.name}>
          <div className="win-pixel px-1 text-[9px]">📁 {n.name}</div>
          {n.children && <div className="pl-3"><TreeRows nodes={n.children} depth={depth + 1} /></div>}
        </li>
      ))}
    </ul>
  )
}

export default function WorkspaceApp() {
  const [active, setActive] = useState<FileNode>(files[0])
  const [gitOpen, setGitOpen] = useState(true)

  const highlight = (code: string) => {
    // very small token highlighter — enough to feel like an editor
    const esc = code
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return esc
      .replace(/(\/\/[^\n]*)/g, '<span class="text-[#6a9955]">$1</span>')
      .replace(/('[^'\n]*'|`[^`\n]*`)/g, '<span class="text-[#ce9178]">$1</span>')
      .replace(/\b(export|import|function|const|return|switch|case|default|from)\b/g, '<span class="text-[#c586c0]">$1</span>')
      .replace(/\b(true|false|null)\b/g, '<span class="text-[#569cd6]">$1</span>')
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#1e1e1e] text-[#d4d4d4]">
      {/* menu bar */}
      <div className="flex items-center gap-3 bg-[#2d2d2d] px-2 py-0.5 text-[10px] text-[#ccc]">
        <span>File</span><span>Edit</span><span>Selection</span><span>View</span><span>Go</span><span>Run</span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* explorer */}
        <div className="w-44 shrink-0 overflow-auto bg-[#252526] p-1 text-[#ccc]">
          <p className="win-pixel mb-1 px-1 text-[8px] text-[#808080]">EXPLORER — ARCHIVE</p>
          <TreeRows nodes={tree} />
        </div>

        {/* editor */}
        <div className="flex min-w-0 flex-1 flex-col bg-[#1e1e1e]">
          <div className="flex items-center gap-3 border-b border-[#333] bg-[#2d2d2d] px-2 py-0.5 text-[10px]">
            {files.map((f) => (
              <button
                key={f.path}
                className={`win-pixel ${active.path === f.path ? 'border-b-2 border-[#ffd000] text-white' : 'text-[#999]'}`}
                onClick={() => setActive(f)}
              >
                {f.name}
              </button>
            ))}
          </div>
          <div className="win-scroll min-h-0 flex-1 overflow-auto p-2 text-[11px] leading-relaxed">
            <pre className="font-mono" dangerouslySetInnerHTML={{ __html: highlight(active.code) }} />
          </div>
          {/* status bar */}
          <div className="flex items-center justify-between bg-[#007acc] px-2 py-0.5 text-[9px] text-white">
            <span>⎇ master ✓</span>
            <span>TypeScript</span>
            <span className="text-[#b6f0b6]">✓ Build Successful — No Errors</span>
            <span>Ln 1, Col 1</span>
          </div>
        </div>

        {/* git / github panel */}
        <div className="w-48 shrink-0 overflow-auto bg-[#252526] p-2 text-[#ccc]">
          <button className="win-pixel mb-2 w-full text-left text-[9px] font-bold" onClick={() => setGitOpen((o) => !o)}>
            SOURCE CONTROL {gitOpen ? '▾' : '▸'}
          </button>
          {gitOpen && (
            <div className="space-y-2 text-[10px]">
              <p>✓ Clean Working Tree</p>
              <p>Commits: <b className="text-white">128</b></p>
              <p className="text-[#808080]">Languages</p>
              <ul className="ml-2 list-disc">
                <li>TypeScript</li>
                <li>React</li>
                <li>Tailwind</li>
              </ul>
              <p className="mt-2 border-t border-[#333] pt-2 text-[#808080]">CURRENT GOAL</p>
              <p className="text-white">Wallpaper Manager</p>
              <p className="mt-2 text-[#808080]">LAST BUILD</p>
              <p className="text-[#b6f0b6]">Successful</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
