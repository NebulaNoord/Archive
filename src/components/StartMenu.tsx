import { appRegistry } from '../apps/registry'
import { useOS } from '../contexts/OSContext'

type StartMenuItem = { label: string; appId: keyof typeof appRegistry }

const sections: { title: string; items: StartMenuItem[] }[] = [
  {
    title: 'STUDIO',
    items: [
      { label: 'User Profile', appId: 'about' },
      { label: 'Developer Environment', appId: 'workspace' },
      { label: 'Mail', appId: 'contact' },
      { label: 'Browser', appId: 'browser' },
    ],
  },
  {
    title: 'WORK',
    items: [
      { label: 'Projects', appId: 'projects' },
      { label: 'Resume', appId: 'resume' },
      { label: 'Timeline', appId: 'timeline' },
      { label: 'Photos', appId: 'photos' },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'Terminal', appId: 'terminal' },
      { label: 'My Computer', appId: 'files' },
      { label: 'Settings', appId: 'settings' },
      { label: 'Recycle Bin', appId: 'recycle' },
    ],
  },
  {
    title: 'PLAY',
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
      <div className="win-raised absolute bottom-9 left-1 z-[9999] flex w-64 text-black">
        <div className="flex w-7 shrink-0 flex-col items-center justify-between bg-gradient-to-b from-[#000080] to-[#1084d0] py-2">
          <span className="h-2 w-2 animate-[win-flicker_2.4s_steps(3)_infinite] rounded-full bg-[#ffd000] shadow-[0_0_6px_#ffd000]" />
          <p className="win-pixel rotate-180 [writing-mode:vertical-rl] px-1 text-[9px] font-black tracking-[0.2em] text-white">
            NEBULANOORD
          </p>
          <span className="h-2 w-2 rounded-full bg-[#39ff7a]" />
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
