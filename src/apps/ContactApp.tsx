import { contact } from '../data/portfolio'

export default function ContactApp() {
  return (
    <div className="text-black">
      <div className="win-titlebar mb-2 px-2 py-1 font-bold">NEW MESSAGE - PIXEL MAIL</div>
      <div className="win-sunken space-y-2 p-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="w-16 font-bold">To:</span>
          <span className="win-sunken flex-1 bg-white px-1">{contact.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="w-16 font-bold">From:</span>
          <span className="win-sunken flex-1 bg-white px-1">visitor@internet</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="w-16 font-bold">Subject:</span>
          <span className="win-sunken flex-1 bg-white px-1">Hello from Archive</span>
        </div>
        <textarea
          className="win-sunken h-28 w-full bg-white p-1 text-sm"
          placeholder="Type your message here..."
        />
        <div className="flex flex-wrap gap-2">
          <button className="win-btn text-sm">Send</button>
          <a className="win-btn text-sm" href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="win-btn text-sm" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="win-btn text-sm" href={contact.twitter} target="_blank" rel="noreferrer">Twitter</a>
        </div>
      </div>
    </div>
  )
}
