import { useOS } from '../contexts/OSContext'

/** Render a single line, turning [x]/[ ] into checkboxes and URLs into links. */
function Line({ text, onLink }: { text: string; onLink: (href: string) => void }) {
  const urlMatch = text.match(/https?:\/\/\S+/)
  if (urlMatch) {
    const href = urlMatch[0]
    const [before, after] = text.split(href)
    return (
      <p>
        {before}
        <a className="text-[#0000a8] underline" href={href} onClick={(e) => { e.preventDefault(); onLink(href) }}>
          {href}
        </a>
        {after}
      </p>
    )
  }
  const todo = text.match(/^(\s*)(\[[ xX]\]\s)(.*)$/)
  if (todo) {
    const checked = todo[2].toLowerCase().includes('x')
    return (
      <p className="flex items-start gap-1">
        <span className="mt-0.5 inline-block h-3 w-3 shrink-0 border border-black bg-white text-center text-[10px] leading-3">
          {checked ? '✓' : ''}
        </span>
        <span className={checked ? 'line-through opacity-60' : ''}>{todo[3]}</span>
      </p>
    )
  }
  return <p>{text}</p>
}

export default function NotepadApp() {
  const { windows, openApp } = useOS()
  const self = windows.find((w) => w.appId === 'notepad')
  const title = self?.title ?? 'untitled.txt'
  const content = self?.content ?? 'No file loaded.'

  const onLink = (href: string) => openApp('browser', { title: 'Browser', fsPath: href })

  return (
    <div className="flex h-full flex-col text-black">
      <div className="win-sunken mb-1 flex items-center gap-3 bg-[#c0c0c0] px-2 py-0.5 text-xs">
        <span className="underline decoration-dotted underline-offset-2">File</span>
        <span className="underline decoration-dotted underline-offset-2">Edit</span>
        <span className="underline decoration-dotted underline-offset-2">Search</span>
        <span className="underline decoration-dotted underline-offset-2">Help</span>
      </div>
      <div className="win-sunken win-scroll min-h-0 flex-1 overflow-auto bg-white p-3 text-sm leading-snug">
        <div className="whitespace-pre-wrap font-mono">
          {content.split('\n').map((line, i) => (
            <Line key={i} text={line} onLink={onLink} />
          ))}
        </div>
      </div>
      <div className="win-sunken mt-1 px-2 py-0.5 text-xs text-[#808080]">
        {title} — {content.length} chars
      </div>
    </div>
  )
}
