import { games } from '../data/portfolio'
import { PixelCartridge } from '../pixelArt'

export default function ArcadeApp() {
  return (
    <div className="win-body text-black">
      <div className="win-titlebar mb-2 px-2 py-1 win-pixel text-[10px]">GAMES FOLDER</div>
      <div className="win-sunken mb-2 p-2 text-base">
        WARNING: Games are external cartridges. Maze Runner and Pythonix are not bundled into Archive. Archive launches them only.
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        {games.map((game) => (
          <article key={game.name} className="win-raised p-2">
            <div className="win-sunken flex items-center justify-center bg-[#101822] p-2">
              <PixelCartridge label={game.icon} size={140} style={{ width: '100%', height: 'auto' }} />
            </div>
            <p className="mt-2 win-sunken px-1 text-sm">{game.status}</p>
            <h3 className="win-pixel mt-1 text-[10px]">{game.name}</h3>
            <p className="mt-1 text-base">{game.description}</p>
            <div className="mt-2 space-y-1 text-sm">
              {game.technologies.map((tech) => (
                <p key={tech}>▸ {tech}</p>
              ))}
            </div>
            <button
              className="win-btn mt-3 w-full text-base"
              disabled={!game.link || game.link === '#'}
              onClick={() => game.link && game.link !== '#' && window.open(game.link, '_blank', 'noreferrer')}
            >
              PLAY
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}
