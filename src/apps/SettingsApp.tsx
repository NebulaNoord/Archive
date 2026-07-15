import { useOS } from '../contexts/OSContext'
import type { WallpaperId } from '../types'
import { Wallpaper } from '../components/Wallpaper'
import { ACHIEVEMENTS, ACHIEVEMENT_LABELS } from '../data/achievements'

const wallpapers: { id: WallpaperId; label: string; emoji: string }[] = [
  { id: 'studio', label: 'Studio', emoji: '✦' },
  { id: 'alpine', label: 'Alpine', emoji: '🏔️' },
  { id: 'evergreen', label: 'Evergreen', emoji: '🌲' },
  { id: 'nightcity', label: 'Night City', emoji: '🌆' },
  { id: 'cosmos', label: 'Cosmos', emoji: '🌌' },
  { id: 'prairie', label: 'Prairie', emoji: '🌾' },
  { id: 'sunset', label: 'Sunset', emoji: '🌇' },
  { id: 'workspace', label: 'Workspace', emoji: '💻' },
  { id: 'garage', label: 'Garage', emoji: '🏁' },
  { id: 'classic', label: 'Classic Teal', emoji: '🟦' },
  { id: 'bliss', label: 'Bliss 98', emoji: '🌄' },
]
const accents = ['#ffd000', '#00a800', '#c00000', '#1084d0']

export default function SettingsApp() {
  const { theme, setTheme, setWallpaper, achievements, audio, setAudio } = useOS()

  return (
    <div className="space-y-3 text-black">
      <section className="win-raised p-2">
        <div className="win-titlebar mb-2 px-2 py-1 font-bold">DISPLAY PROPERTIES</div>
        <p className="mb-1 text-xs font-bold">WALLPAPER</p>
        <div className="grid grid-cols-2 gap-2">
          {wallpapers.map((wallpaper) => (
            <button
              key={wallpaper.id}
              className={`flex flex-col gap-1 ${theme.wallpaper === wallpaper.id ? 'pressed' : ''}`}
              onClick={() => setWallpaper(wallpaper.id)}
            >
              <span className="win-raised relative block h-12 w-full overflow-hidden">
                <Wallpaper id={wallpaper.id} animate={false} />
              </span>
              <span className="win-pixel text-[8px]">
                {wallpaper.emoji} {wallpaper.label}
                {theme.wallpaper === wallpaper.id ? ' ✓' : ''}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="win-raised p-2">
        <div className="win-titlebar mb-2 px-2 py-1 font-bold">ACCENT</div>
        <div className="flex gap-2">
          {accents.map((accent) => (
            <button
              key={accent}
              className="h-8 w-8 win-raised"
              style={{ backgroundColor: accent }}
              onClick={() => setTheme((current) => ({ ...current, accent }))}
              aria-label={`Use accent ${accent}`}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-2">
        <button className="win-btn text-left" onClick={() => setTheme((c) => ({ ...c, theme: c.theme === 'dark' ? 'light' : 'dark' }))}>
          MODE: {theme.theme.toUpperCase()}
        </button>
        <button className="win-btn text-left" onClick={() => setTheme((c) => ({ ...c, animations: !c.animations }))}>
          ANIM: {theme.animations ? 'ON' : 'OFF'}
        </button>
        <button className="win-btn text-left" onClick={() => setTheme((c) => ({ ...c, developerMode: !c.developerMode }))}>
          DEV: {theme.developerMode ? 'ON' : 'OFF'}
        </button>
        <button className="win-btn text-left" onClick={() => setAudio((a) => ({ enabled: !a.enabled }))}>
          SOUND: {audio.enabled ? 'ON' : 'OFF'}
        </button>
      </section>

      <section className="win-raised p-2">
        <div className="win-titlebar mb-2 px-2 py-1 font-bold">ACHIEVEMENTS</div>
        <ul className="space-y-1 text-sm">
          {ACHIEVEMENTS.map((id) => (
            <li key={id} className={achievements[id] ? 'text-black' : 'text-[#808080]'}>
              {achievements[id] ? ACHIEVEMENT_LABELS[id] : `🔒 ${ACHIEVEMENT_LABELS[id].replace('🏆', '').trim()}`}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
