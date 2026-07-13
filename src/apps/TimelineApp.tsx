type Entry = { year: string; title: string; detail: string; done: boolean }

const journey: Entry[] = [
  { year: '2019', title: 'First HTML page', detail: 'A single <h1> and a lot of confusion. The bug was real.', done: true },
  { year: '2021', title: 'Started JavaScript', detail: 'Discovered you could make buttons do things. Dangerous.', done: true },
  { year: '2023', title: 'Built first React app', detail: 'State clicked. Never looked back.', done: true },
  { year: '2025', title: 'Created DayFlow', detail: 'My first real product — a daily planner that stuck.', done: true },
  { year: '2026', title: 'Started Archive', detail: 'This very OS. A portfolio that feels like a computer.', done: true },
  { year: 'Future', title: '???', detail: 'You decide where this goes. Maybe you hire me.', done: false },
]

export default function TimelineApp() {
  return (
    <div className="win-scroll min-h-0 overflow-auto p-3 text-black">
      <div className="win-raised mx-auto max-w-md p-3">
        <div className="win-titlebar mb-3 px-2 py-1 font-bold">MY JOURNEY</div>
        <ol className="relative ml-3 border-l-2 border-[#000080]">
          {journey.map((e) => (
            <li key={e.year} className="mb-4 ml-4">
              <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#000080] bg-[#ffd000]" />
              <div className="win-raised p-2">
                <div className="flex items-center justify-between">
                  <span className="win-pixel text-[10px] font-black">{e.year}</span>
                  <span className={`win-pixel text-[8px] ${e.done ? 'text-[#008000]' : 'text-[#c00000]'}`}>
                    {e.done ? '✓ DONE' : '◌ SOON'}
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold">{e.title}</p>
                <p className="text-[10px] leading-tight text-[#333]">{e.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-2 text-center text-[9px] text-[#808080]">Not a resume. A story.</p>
      </div>
    </div>
  )
}
