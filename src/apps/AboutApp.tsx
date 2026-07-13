import { profile } from '../data/portfolio'
import { PixelAvatar } from '../pixelArt'

export default function AboutApp() {
  return (
    <div className="win-body space-y-2 text-black">
      <section className="win-raised flex gap-3 p-2">
        <div className="win-sunken shrink-0 p-1">
          <PixelAvatar size={112} />
        </div>
        <div>
          <p className="win-pixel text-[10px] uppercase text-[#000080]">USER PROFILE</p>
          <h2 className="win-pixel mt-1 text-[14px]">{profile.name}</h2>
          <p className="mt-1 text-base">{profile.roles.join(' / ')}</p>
          <p className="mt-1 text-sm">{profile.location}</p>
        </div>
      </section>

      <section className="win-sunken whitespace-pre-line p-2 text-base">{profile.bio}</section>

      <section className="win-raised p-2">
        <div className="win-titlebar mb-2 px-2 py-1 win-pixel text-[9px]">INTERESTS</div>
        <div className="grid grid-cols-2 gap-2">
          {profile.interests.map((interest) => (
            <div key={interest} className="win-sunken p-1.5 text-base">
              ▸ {interest}
            </div>
          ))}
        </div>
      </section>

      <section className="win-raised p-2">
        <div className="win-titlebar mb-2 px-2 py-1 win-pixel text-[9px]">WHEN OFFLINE</div>
        <div className="grid grid-cols-2 gap-2">
          {profile.hobbies.map((hobby) => (
            <div key={hobby} className="win-sunken p-1.5 text-base">
              ▸ {hobby}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
