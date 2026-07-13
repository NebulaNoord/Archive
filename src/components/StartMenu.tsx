import { appRegistry } from '../apps/registry'
import { useOS } from '../contexts/OSContext'

type StartMenuItem = { label: string; appId: keyof typeof appRegistry }

const sections: { title: string; items: StartMenuItem[] }[] = [
  {
    title: 'PROGRAMS',
    items: [
      { label: 'User Profile', appId: 'about' },
      { label: 'Workspace', appId: 'workspace' },
      { label: 'Mail', appId: 'contact' },
      { label: 'Browser', appId: 'browser' },
      { label: 'My Computer', appId: 'files' },
    ],
  },
  {
    title: 'PROJECTS',
    items: [{ label: 'File Explorer', appId: 'projects' }],
  },
  {
    title: 'GAMES',
    items: [{ label: 'Arcade', appId: 'arcade' }],
  },
]

type StartMenuProps = {
  onClose: () => void
}

export function StartMenu({ onClose }: StartMenuProps) {
  const { openApp, shutdown } = useOS()

  return (
    <>
      <div className="fixed inset-0 z-[9998]" onClick={onClose} />
      <div className="win-raised absolute bottom-9 left-1 z-[9999] flex w-60 text-black">
        <div className="w-7 shrink-0 bg-gradient-to-b from-[#000080] to-[#1084d0]">
          <p className="win-pixel mt-2 rotate-180 [writing-mode:vertical-rl] px-1 text-[10px] font-black tracking-widest text-white">
            ARCHIVE
          </p>
        </div>
        <div className="flex-1 py-1">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="win-pixel px-2 py-1 text-[8px] text-[#808080]">{section.title}</p>
              <ul>
                {section.items.map((item) => (
                  <li key={item.appId}>
                    <button
                      className="flex w-full items-center gap-2 px-2 py-1.5 win-pixel text-[9px] hover:bg-[#000080] hover:text-white"
                      onClick={() => {
                        openApp(item.appId)
                        onClose()
                      }}
                    >
                      {appRegistry[item.appId].renderIcon({ size: 22 })}
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              <li className="my-1 border-t-2 border-[#808080] border-dashed" />
            </div>
          ))}

          <ul>
            <li>
              <button
                className="flex w-full items-center gap-2 px-2 py-1.5 win-pixel text-[9px] hover:bg-[#000080] hover:text-white"
                onClick={() => { openApp('timeline'); onClose() }}
              >
                {appRegistry.timeline.renderIcon({ size: 22 })} Timeline
              </button>
            </li>
            <li>
              <button
                className="flex w-full items-center gap-2 px-2 py-1.5 win-pixel text-[9px] hover:bg-[#000080] hover:text-white"
                onClick={() => { openApp('photos'); onClose() }}
              >
                {appRegistry.photos.renderIcon({ size: 22 })} Photos
              </button>
            </li>
            <li>
              <button
                className="flex w-full items-center gap-2 px-2 py-1.5 win-pixel text-[9px] hover:bg-[#000080] hover:text-white"
                onClick={() => { openApp('recycle'); onClose() }}
              >
                {appRegistry.recycle.renderIcon({ size: 22 })} Recycle Bin
              </button>
            </li>
            <li className="my-1 border-t-2 border-[#808080] border-dashed" />
            <li>
              <button
                className="flex w-full items-center gap-2 px-2 py-1.5 win-pixel text-[9px] hover:bg-[#000080] hover:text-white"
                onClick={() => { openApp('settings'); onClose() }}
              >
                {appRegistry.settings.renderIcon({ size: 22 })} Settings
              </button>
            </li>
            <li>
              <button
                className="flex w-full items-center gap-2 px-2 py-1.5 win-pixel text-[9px] hover:bg-[#000080] hover:text-white"
                onClick={() => { openApp('resume'); onClose() }}
              >
                {appRegistry.resume.renderIcon({ size: 22 })} Documents
              </button>
            </li>
            <li>
              <button
                className="flex w-full items-center gap-2 px-2 py-1.5 win-pixel text-[9px] hover:bg-[#000080] hover:text-white"
                onClick={() => { openApp('terminal'); onClose() }}
              >
                {appRegistry.terminal.renderIcon({ size: 22 })} Search
              </button>
            </li>
            <li className="my-1 border-t-2 border-[#808080] border-dashed" />
            <li>
              <button
                className="flex w-full items-center gap-2 px-2 py-1.5 win-pixel text-[9px] hover:bg-[#000080] hover:text-white"
                onClick={() => { shutdown(); onClose() }}
              >
                <span className="flex h-6 w-6 items-center justify-center bg-black text-xs text-[#ff5454]">⏻</span>
                Shut Down...
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
