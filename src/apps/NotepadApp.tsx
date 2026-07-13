import { useOS } from '../contexts/OSContext'

export default function NotepadApp() {
  const { windows } = useOS()
  // find this window's content via title match
  const self = windows.find((w) => w.appId === 'notepad')
  const title = self?.title ?? 'untitled.txt'
  const content = (self?.title?.endsWith('.txt') ? self.content : undefined) ?? 'No file loaded.'

  return (
    <div className="win-body flex h-full flex-col text-black">
      <div className="win-sunken mb-1 flex items-center gap-3 bg-[#c0c0c0] px-2 py-0.5 text-xs">
        <span className="underline decoration-dotted underline-offset-2">File</span>
        <span className="underline decoration-dotted underline-offset-2">Edit</span>
        <span className="underline decoration-dotted underline-offset-2">Search</span>
        <span className="underline decoration-dotted underline-offset-2">Help</span>
      </div>
      <div className="win-sunken win-scroll min-h-0 flex-1 overflow-auto bg-white p-3 text-base leading-snug">
        <pre className="whitespace-pre-wrap font-[inherit]">{content}</pre>
      </div>
      <div className="win-sunken mt-1 px-2 py-0.5 text-xs">
        {title} — {content.length} chars
      </div>
    </div>
  )
}
