import { useState } from 'react'

type Photo = {
  file: string
  album: string
  caption: string
  taken: string
  location: string
  camera: string
  description: string
  /** emoji thumbnail so we don't ship binary images */
  thumb: string
}

const photos: Photo[] = [
  { file: 'IMG_2034.JPG', album: 'Setup', caption: 'Desk setup', taken: 'July 2026', location: 'Desk', camera: 'iPhone', description: 'Current development setup — dual monitors, mechanical keyboard, coffee.', thumb: '🖥️' },
  { file: 'IMG_2041.JPG', album: 'Setup', caption: 'Monitor', taken: 'July 2026', location: 'Desk', camera: 'iPhone', description: 'The main display, running Archive while I build it.', thumb: '📺' },
  { file: 'IMG_2055.JPG', album: 'Setup', caption: 'Keyboard', taken: 'June 2026', location: 'Desk', camera: 'iPhone', description: 'Custom 65% board. Sounds better than it types.', thumb: '⌨️' },
  { file: 'IMG_2102.JPG', album: 'Projects', caption: 'DayFlow', taken: 'May 2026', location: 'Laptop', camera: 'iPhone', description: 'Screenshot of DayFlow — my first productivity app.', thumb: '📅' },
  { file: 'IMG_2110.JPG', album: 'Projects', caption: 'DeltaView', taken: 'April 2026', location: 'Laptop', camera: 'iPhone', description: 'DeltaView data dashboard, early build.', thumb: '📊' },
  { file: 'IMG_2128.JPG', album: 'Projects', caption: 'Maze Runner', taken: 'March 2026', location: 'Browser', camera: 'iPhone', description: '999-level pixel maze. Still my favorite thing I built.', thumb: '🌀' },
  { file: 'IMG_2200.JPG', album: 'Projects', caption: 'Archive', taken: 'July 2026', location: 'Desktop', camera: 'iPhone', description: 'This very OS, mid-build.', thumb: '💽' },
  { file: 'IMG_2301.JPG', album: 'Hot Wheels', caption: 'Shelf', taken: '2025', location: 'Room', camera: 'iPhone', description: 'Part of the collection. The red one is the fastest.', thumb: '🏎️' },
  { file: 'IMG_2310.JPG', album: 'Hot Wheels', caption: 'Track', taken: '2025', location: 'Floor', camera: 'iPhone', description: 'Loop-the-loop setup, living room edition.', thumb: '🛤️' },
  { file: 'IMG_2400.JPG', album: 'Nature', caption: 'Coulee', taken: 'Autumn 2025', location: 'Lethbridge', camera: 'iPhone', description: 'The big sky and the old railway bridge.', thumb: '🌾' },
  { file: 'IMG_2412.JPG', album: 'Nature', caption: 'Prairie', taken: 'Autumn 2025', location: 'Lethbridge', camera: 'iPhone', description: 'Rolling hills at golden hour.', thumb: '🌅' },
  { file: 'IMG_2500.JPG', album: 'Wallpapers', caption: 'Alpine', taken: 'July 2026', location: 'Archive', camera: 'SVG', description: 'Pixel mountain wallpaper, drawn for this OS.', thumb: '🏔️' },
  { file: 'IMG_2511.JPG', album: 'Wallpapers', caption: 'Night City', taken: 'July 2026', location: 'Archive', camera: 'SVG', description: 'Rainy pixel skyline with tiny cars.', thumb: '🌆' },
  { file: 'IMG_2600.JPG', album: 'Random', caption: 'Coffee', taken: 'Daily', location: 'Desk', camera: 'iPhone', description: 'Required fuel. ☕', thumb: '☕' },
  { file: 'IMG_2612.JPG', album: 'Random', caption: 'Cat', taken: '2025', location: 'Couch', camera: 'iPhone', description: 'Not my cat. Very judgmental.', thumb: '🐱' },
]

const albums = ['All', 'Hot Wheels', 'Nature', 'Projects', 'Wallpapers', 'Setup', 'Random']

export default function PhotosApp() {
  const [album, setAlbum] = useState('All')
  const [selected, setSelected] = useState<Photo>(photos[0])
  const shown = album === 'All' ? photos : photos.filter((p) => p.album === album)

  return (
    <div className="flex h-full min-h-0 text-black">
      {/* folder tree */}
      <div className="win-raised w-40 shrink-0 overflow-auto p-1 text-xs">
        <p className="win-pixel mb-1 px-1 text-[8px] text-[#808080]">PICTURES</p>
        {albums.map((a) => (
          <button
            key={a}
            className={`flex w-full items-center gap-1 px-1 py-1 text-left text-[9px] hover:bg-[#000080] hover:text-white ${album === a ? 'bg-[#000080] text-white' : ''}`}
            onClick={() => setAlbum(a)}
          >
            📁 {a}
          </button>
        ))}
      </div>

      {/* thumbnails */}
      <div className="win-sunken min-h-0 flex-1 overflow-auto bg-white p-2">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {shown.map((p) => (
            <button
              key={p.file}
              className={`flex flex-col items-center gap-1 border-2 p-1 ${selected.file === p.file ? 'border-[#000080]' : 'border-[#808080]'}`}
              onClick={() => setSelected(p)}
            >
              <span className="flex h-14 w-full items-center justify-center bg-[#e7e7e7] text-3xl">{p.thumb}</span>
              <span className="win-pixel w-full truncate text-[7px]">{p.file}</span>
            </button>
          ))}
        </div>
      </div>

      {/* EXIF sidebar */}
      <div className="win-raised w-44 shrink-0 overflow-auto p-2 text-xs">
        <div className="win-titlebar mb-2 px-2 py-1 font-bold">{selected.file}</div>
        <p className="mb-2 flex h-20 items-center justify-center bg-[#e7e7e7] text-5xl">{selected.thumb}</p>
        <dl className="space-y-1">
          <div><dt className="text-[9px] font-bold text-[#808080]">TAKEN</dt><dd>{selected.taken}</dd></div>
          <div><dt className="text-[9px] font-bold text-[#808080]">LOCATION</dt><dd>{selected.location}</dd></div>
          <div><dt className="text-[9px] font-bold text-[#808080]">CAMERA</dt><dd>{selected.camera}</dd></div>
          <div><dt className="text-[9px] font-bold text-[#808080]">ALBUM</dt><dd>{selected.album}</dd></div>
        </dl>
        <p className="mt-2 border-t-2 border-[#808080] pt-1 text-[9px] leading-tight">{selected.description}</p>
      </div>
    </div>
  )
}
