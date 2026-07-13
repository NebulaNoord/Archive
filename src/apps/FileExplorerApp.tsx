import { FolderIcon } from '../icons'

const tree = [
  { path: '/home/kayden/projects', icon: 'projects', description: 'Maze Runner, CadenCeTyper, ShiftSync, Nebula Noord, Pythonix previews' },
  { path: '/home/kayden/games', icon: 'games', description: 'Launcher pointers for standalone games' },
  { path: '/home/kayden/documents', icon: 'documents', description: 'Resume and notes placeholders' },
  { path: '/home/kayden/images', icon: 'images', description: 'Portfolio screenshots and image placeholders' },
]

export default function FileExplorerApp() {
  return (
    <div className="grid gap-2 text-black md:grid-cols-[200px_1fr]">
      <aside className="win-sunken p-2 text-sm">
        <p>▾ /</p>
        <p className="ml-3">▾ home</p>
        <p className="ml-6 win-titlebar px-1 text-white">▸ kayden</p>
      </aside>
      <section className="space-y-2">
        {tree.map((item) => (
          <article key={item.path} className="win-raised p-2">
            <h3 className="flex items-center gap-2 font-bold"><FolderIcon size={20} /> {item.path}</h3>
            <p className="mt-1 text-sm">{item.description}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
