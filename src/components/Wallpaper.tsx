import type { ReactElement } from 'react'
import type { WallpaperId } from '../types'

type WallpaperProps = {
  id: WallpaperId
  /** when true, ambient animations (clouds, stars, rain) play */
  animate?: boolean
  className?: string
}

/* ============================== ALPINE (Mountains) ============================== */
function Alpine({ animate }: { animate?: boolean }) {
  return (
    <svg className="h-full w-full" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="alp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9ad0ff" />
          <stop offset="55%" stopColor="#cfe9ff" />
          <stop offset="100%" stopColor="#ffe9c9" />
        </linearGradient>
      </defs>
      <rect width="160" height="100" fill="url(#alp-sky)" />
      {/* moon */}
      <circle cx="132" cy="18" r="9" fill="#fff7e6" />
      {/* stars */}
      {[ [20,12],[40,8],[60,16],[88,10],[104,18],[120,28],[144,10] ].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="1" height="1" fill="#fff" className={animate ? 'star' : ''} />
      ))}
      {/* soft clouds */}
      <g className={animate ? 'cloud-slow' : ''} fill="#ffffff" opacity="0.9">
        <ellipse cx="36" cy="24" rx="14" ry="5" />
        <ellipse cx="52" cy="22" rx="10" ry="4" />
      </g>
      <g className={animate ? 'cloud-fast' : ''} fill="#ffffff" opacity="0.8">
        <ellipse cx="110" cy="34" rx="12" ry="4" />
        <ellipse cx="124" cy="32" rx="8" ry="3" />
      </g>
      {/* back range */}
      <polygon points="0,60 26,30 54,60" fill="#6b86b8" />
      <polygon points="40,60 80,20 122,60" fill="#7d97c7" />
      <polygon points="100,60 132,34 160,60" fill="#6b86b8" />
      {/* snow caps */}
      <polygon points="68,32 80,20 92,32" fill="#ffffff" />
      <polygon points="18,44 26,30 34,44" fill="#ffffff" />
      <polygon points="120,40 132,34 144,40" fill="#ffffff" />
      {/* lake */}
      <rect y="60" width="160" height="40" fill="#2f6f9e" />
      <rect y="60" width="160" height="3" fill="#bcdcff" />
      {/* mountain reflection */}
      <polygon points="40,60 80,96 122,60" fill="#3f7fa9" opacity="0.6" />
      <polygon points="68,84 80,96 92,84" fill="#ffffff" opacity="0.5" />
      {/* pine forest */}
      {[ [10,64],[22,62],[138,62],[150,64] ].map(([x,y],i)=>(
        <g key={i}>
          <rect x={x} y={y} width="3" height="6" fill="#5b3a1e" />
          <polygon points={`${x+1.5},${y-8} ${x-3},${y} ${x+6},${y}`} fill="#1f5e36" />
        </g>
      ))}
      {/* hidden easter egg: a tiny Hot Wheels car tucked in the grass */}
      <g transform="translate(70,95)">
        <rect x="0" y="1" width="8" height="3" fill="#e23b3b" />
        <rect x="1" y="-1" width="6" height="2" fill="#ffd000" />
        <circle cx="2" cy="4" r="1.4" fill="#222" />
        <circle cx="6" cy="4" r="1.4" fill="#222" />
      </g>
    </svg>
  )
}

/* ============================== EVERGREEN (Forest) ============================== */
function Evergreen({ animate }: { animate?: boolean }) {
  return (
    <svg className="h-full w-full" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="160" height="100" fill="#bfe3df" />
      <rect y="44" width="160" height="56" fill="#1f5e36" />
      <rect y="44" width="160" height="5" fill="#3f9c63" />
      {/* mist */}
      <rect className={animate ? 'mist' : ''} y="40" width="160" height="14" fill="#ffffff" opacity="0.18" />
      {/* sun */}
      <circle cx="30" cy="18" r="11" fill="#fff3c4" />
      {/* dense trees */}
      {[ [16,38],[44,32],[76,40],[108,34],[140,42],[58,46],[124,48] ].map(([x,top],i)=>(
        <g key={i}>
          <rect x={x-1.5} y={top+16} width="3" height="12" fill="#5b3a1e" />
          <polygon points={`${x},${top} ${x-10},${top+18} ${x+10},${top+18}`} fill="#1c5631" />
          <polygon points={`${x},${top+8} ${x-12},${top+28} ${x+12},${top+28}`} fill="#2f7d4f" />
        </g>
      ))}
      {/* campfire */}
      <g transform="translate(80,80)">
        <rect x="-6" y="2" width="12" height="2" fill="#5b3a1e" />
        <rect x="-2" y="2" width="4" height="2" fill="#5b3a1e" />
        <path className={animate ? 'flame' : ''} d="M0 -10 L3 0 L-3 0 Z" fill="#ff7b00" />
        <path className={animate ? 'flame' : ''} d="M0 -6 L1.6 0 L-1.6 0 Z" fill="#ffd000" />
        <circle cx="0" cy="6" r="3" fill="#ff4500" opacity="0.4" />
      </g>
      {/* fireflies */}
      {[ [40,60],[100,64],[130,72],[24,70] ].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="1.5" height="1.5" fill="#eaff7a" className={animate ? 'firefly' : ''} />
      ))}
      {/* hidden: tiny snake in the grass (Pythonix) */}
      <g transform="translate(112,90)" fill="#2faa4f">
        <rect x="0" y="0" width="3" height="2" />
        <rect x="3" y="-1" width="3" height="2" />
        <rect x="6" y="0" width="3" height="2" />
        <rect x="9" y="1" width="3" height="2" />
      </g>
    </svg>
  )
}

/* ============================== NIGHT CITY ============================== */
function NightCity({ animate }: { animate?: boolean }) {
  return (
    <svg className="h-full w-full" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="nc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0f24" />
          <stop offset="100%" stopColor="#241a3a" />
        </linearGradient>
      </defs>
      <rect width="160" height="100" fill="url(#nc-sky)" />
      {/* moon */}
      <circle cx="138" cy="18" r="8" fill="#e9eeff" />
      <circle cx="141" cy="16" r="8" fill="#0a0f24" />
      {/* stars */}
      {[ [18,10],[34,18],[56,8],[72,16],[92,12],[110,22],[124,10] ].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="1" height="1" fill="#fff" className={animate ? 'star' : ''} />
      ))}
      {/* rain */}
      {animate && [ [20,0],[44,0],[70,0],[96,0],[120,0],[150,0],[34,0],[84,0],[134,0] ].map(([x],i)=>(
        <line key={i} x1={x} y1="0" x2={x-6} y2="14" stroke="#7fa8d0" strokeWidth="0.6" className="rain" opacity="0.6" />
      ))}
      {/* wet street */}
      <rect y="82" width="160" height="18" fill="#15131f" />
      {/* street lights */}
      {[24,72,120].map((x)=>(
        <g key={x}>
          <rect x={x} y="66" width="2" height="18" fill="#2a2740" />
          <circle cx={x+1} cy="64" r="2" fill="#ffd86b" />
          <ellipse cx={x+1} cy="80" rx="10" ry="3" fill="#ffd86b" opacity="0.12" />
        </g>
      ))}
      {/* skyline with glowing windows */}
      {[ [4,28,24],[30,16,18],[50,40,28],[80,10,22],[104,34,26],[132,22,28] ].map(([x,top,w],i)=>(
        <g key={i}>
          <rect x={x} y={top} width={w} height={100-top} fill="#10162e" />
          <rect x={x} y={top} width={w} height="3" fill="#23305c" />
          {Array.from({ length: Math.floor((86-top)/7) }).map((_,r)=>
            Array.from({ length: Math.floor(w/6) }).map((_,c)=>{
              const lit=(x+r+c+i)%4!==0
              return <rect key={`${r}-${c}`} x={x+2+c*6} y={top+4+r*7} width="3" height="3" fill={lit?'#ffd86b':'#0c1024'} opacity={lit?0.95:1} />
            })
          )}
        </g>
      ))}
      {/* tiny cars */}
      <g className={animate ? 'car-a' : ''}><rect x="10" y="86" width="8" height="3" fill="#ff5454" /><rect x="11" y="85" width="5" height="2" fill="#ffd000" /></g>
      <g className={animate ? 'car-b' : ''}><rect x="120" y="90" width="8" height="3" fill="#54c8ff" /><rect x="121" y="89" width="5" height="2" fill="#ffd000" /></g>
    </svg>
  )
}

/* ============================== COSMOS (Space) ============================== */
function Cosmos({ animate }: { animate?: boolean }) {
  return (
    <svg className="h-full w-full" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id="cos-neb" cx="38%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#5b2a8a" />
          <stop offset="55%" stopColor="#243a8a" />
          <stop offset="100%" stopColor="#05071a" />
        </radialGradient>
      </defs>
      <rect width="160" height="100" fill="#05071a" />
      <rect width="160" height="100" fill="url(#cos-neb)" opacity="0.85" />
      {/* stars */}
      {Array.from({ length: 60 }).map((_,i)=>{
        const x=(i*37)%160, y=(i*53)%100
        return <rect key={i} x={x} y={y} width="1" height="1" fill="#fff" className={animate?'star':''} />
      })}
      {/* shooting star */}
      {animate && <line x1="20" y1="10" x2="40" y2="22" stroke="#ffffff" strokeWidth="1" className="shooting" />}
      {/* planet */}
      <circle cx="120" cy="28" r="16" fill="#e08a3c" />
      <ellipse cx="120" cy="28" rx="24" ry="6" fill="none" stroke="#c9a66b" strokeWidth="1.5" transform="rotate(-18 120 28)" />
      {/* small planet */}
      <circle cx="46" cy="74" r="7" fill="#4f9ee0" />
      {/* satellites */}
      <g className={animate?'orbit':''} transform="translate(76,40)">
        <rect x="-2" y="-1" width="4" height="2" fill="#cfd6e6" />
        <rect x="-6" y="-3" width="4" height="6" fill="#9aa3bd" />
        <rect x="2" y="-3" width="4" height="6" fill="#9aa3bd" />
      </g>
    </svg>
  )
}

/* ============================== PRAIRIE (Lethbridge) ============================== */
function Prairie({ animate }: { animate?: boolean }) {
  return (
    <svg className="h-full w-full" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="pr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8fc7ff" />
          <stop offset="100%" stopColor="#dff0ff" />
        </linearGradient>
      </defs>
      <rect width="160" height="100" fill="url(#pr-sky)" />
      {/* big sky clouds */}
      <g className={animate?'cloud-slow':''} fill="#ffffff" opacity="0.95">
        <ellipse cx="40" cy="18" rx="16" ry="6" />
        <ellipse cx="60" cy="16" rx="11" ry="4" />
        <ellipse cx="118" cy="26" rx="13" ry="5" />
      </g>
      {/* rolling hills (coulees) */}
      <path d="M0 64 Q40 50 80 60 T160 58 V100 H0 Z" fill="#7faa3c" />
      <path d="M0 74 Q50 62 100 72 T160 70 V100 H0 Z" fill="#5f8a2c" />
      {/* prairie grass */}
      {Array.from({ length: 40 }).map((_,i)=>{
        const x=(i*7)%160, y=80+((i*13)%16)
        return <rect key={i} x={x} y={y} width="1" height="3" fill="#3f6b1c" />
      })}
      {/* old railway bridge (High Level Bridge vibe) */}
      <g transform="translate(96,40)" stroke="#7a5a3a" strokeWidth="2" fill="none">
        <line x1="0" y1="0" x2="40" y2="0" />
        <line x1="0" y1="10" x2="40" y2="10" />
        <line x1="4" y1="0" x2="4" y2="34" />
        <line x1="14" y1="0" x2="14" y2="34" />
        <line x1="26" y1="0" x2="26" y2="34" />
        <line x1="36" y1="0" x2="36" y2="34" />
        <line x1="0" y1="34" x2="40" y2="34" />
      </g>
      {/* hidden: a tiny Cities Skylines-style building on the hill */}
      <g transform="translate(20,54)" fill="#b06a3a">
        <rect x="0" y="0" width="6" height="8" />
        <rect x="1" y="-3" width="3" height="4" />
      </g>
    </svg>
  )
}

/* ============================== SUNSET ============================== */
function Sunset({ animate }: { animate?: boolean }) {
  return (
    <svg className="h-full w-full" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="ss-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1a4a" />
          <stop offset="45%" stopColor="#d65a3a" />
          <stop offset="80%" stopColor="#ffb15a" />
          <stop offset="100%" stopColor="#ffe39a" />
        </linearGradient>
      </defs>
      <rect width="160" height="100" fill="url(#ss-sky)" />
      {/* sun */}
      <circle cx="80" cy="64" r="16" fill="#ffd86b" />
      <circle cx="80" cy="64" r="16" fill="#ffe9a8" opacity="0.5" />
      {/* silhouette hills */}
      <path d="M0 72 Q40 60 80 70 T160 68 V100 H0 Z" fill="#3a2233" />
      <path d="M0 82 Q60 72 120 80 T160 78 V100 H0 Z" fill="#241322" />
      {/* birds */}
      {[ [40,28],[52,24],[110,30] ].map(([x,y],i)=>(
        <path key={i} d={`M${x} ${y} q3 -3 6 0 q3 -3 6 0`} stroke="#2a1530" strokeWidth="1" fill="none" />
      ))}
      {/* hidden: F1 poster glow on a distant billboard */}
      <g transform="translate(126,58)">
        <rect x="0" y="0" width="10" height="7" fill="#111" />
        <rect x="1" y="1" width="8" height="5" fill="#c00000" />
        <rect x="3" y="2" width="4" height="1" fill="#fff" className={animate ? 'flicker-win' : ''} />
      </g>
    </svg>
  )
}

/* ============================== WORKSPACE ============================== */
function Workspace({ animate }: { animate?: boolean }) {
  return (
    <svg className="h-full w-full" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {/* room wall */}
      <rect width="160" height="100" fill="#3a3550" />
      {/* window looking out to a pixel city */}
      <rect x="40" y="10" width="80" height="52" fill="#0e1430" stroke="#7a6f52" strokeWidth="4" />
      <line x1="80" y1="10" x2="80" y2="62" stroke="#7a6f52" strokeWidth="2" />
      <line x1="40" y1="36" x2="120" y2="36" stroke="#7a6f52" strokeWidth="2" />
      {/* city outside */}
      {[ [44,30,8],[54,22,8],[66,34,8],[74,18,8],[86,32,8],[96,24,8],[106,36,8] ].map(([x,top,w],i)=>(
        <rect key={i} x={x} y={top} width={w} height={62-top} fill="#1b2550" />
      ))}
      {animate && [ [46,32],[66,37],[88,30],[108,39] ].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="2" height="2" fill="#ffd86b" className="flicker-win" />
      ))}
      {/* desk */}
      <rect y="74" width="160" height="26" fill="#6b4a2a" />
      <rect y="74" width="160" height="3" fill="#8a6438" />
      {/* CRT monitor */}
      <g transform="translate(30,52)">
        <rect x="-2" y="-2" width="34" height="26" fill="#1a1a1a" rx="2" />
        <rect x="1" y="1" width="28" height="20" fill="#0a2a0a" />
        <text x="4" y="9" fontSize="4" fill="#39ff14" fontFamily="monospace">&gt;_</text>
        <rect x="12" y="24" width="8" height="4" fill="#1a1a1a" />
      </g>
      {/* keyboard */}
      <g transform="translate(74,80)" fill="#d8d2c0">
        {Array.from({ length: 8 }).map((_,c)=>(
          <rect key={c} x={c*6} y="0" width="5" height="4" />
        ))}
      </g>
      {/* coffee */}
      <g transform="translate(122,76)">
        <rect x="0" y="0" width="8" height="7" fill="#e8e0d0" />
        <rect x="1" y="1" width="6" height="4" fill="#3a2417" />
        {animate && <ellipse cx="4" cy="-1" rx="2" ry="1" fill="#ffffff" opacity="0.5" className="mist" />}
      </g>
      {/* plant */}
      <g transform="translate(138,70)">
        <rect x="0" y="6" width="8" height="6" fill="#9a5a2a" />
        <path d="M4 6 Q-2 -2 2 -6 Q4 0 4 6 Q6 0 10 -4 Q6 2 4 6" fill="#2f7d4f" />
      </g>
      {/* notebook */}
      <g transform="translate(96,84)"><rect x="0" y="0" width="10" height="7" fill="#fff" /><rect x="0" y="0" width="10" height="2" fill="#c00000" /></g>
      {/* hidden: tiny Hot Wheels car on the desk */}
      <g transform="translate(58,86)" fill="#e23b3b"><rect x="0" y="1" width="7" height="3" /><rect x="1" y="-1" width="5" height="2" fill="#ffd000" /><circle cx="2" cy="4" r="1.2" fill="#222" /><circle cx="5" cy="4" r="1.2" fill="#222" /></g>
      {/* tiny LEDs */}
      {animate && [ [28,52],[150,30] ].map(([x,y],i)=>(<rect key={i} x={x} y={y} width="1.5" height="1.5" fill="#39ff14" className="flicker-win" />))}
    </svg>
  )
}

/* ============================== GARAGE (F1) ============================== */
function Garage({ animate }: { animate?: boolean }) {
  return (
    <svg className="h-full w-full" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {/* garage wall */}
      <rect width="160" height="100" fill="#2c2f38" />
      {/* floor */}
      <rect y="78" width="160" height="22" fill="#3a3d47" />
      <rect y="78" width="160" height="2" fill="#565a66" />
      {/* tool board */}
      <rect x="8" y="14" width="40" height="40" fill="#1f2229" stroke="#565a66" strokeWidth="2" />
      <rect x="12" y="18" width="14" height="3" fill="#8a8f9c" />
      <circle cx="34" cy="22" r="3" fill="#8a8f9c" />
      <rect x="12" y="30" width="10" height="10" fill="#11131a" />
      {/* subtle F1 poster */}
      <g transform="translate(108,16)">
        <rect x="0" y="0" width="36" height="24" fill="#11131a" stroke="#3a3d47" strokeWidth="2" />
        <rect x="4" y="4" width="28" height="3" fill="#c00000" />
        <rect x="4" y="10" width="20" height="2" fill="#ffd000" />
        <circle cx="24" cy="18" r="3" fill="#e23b3b" />
        <rect x="22" y="14" width="4" height="8" fill="#e23b3b" />
      </g>
      {/* garage door in the back, slightly open with light */}
      <rect x="58" y="22" width="44" height="56" fill="#23262e" stroke="#565a66" strokeWidth="2" />
      <rect x="62" y="26" width="36" height="6" fill="#3a3d47" />
      <rect x="62" y="36" width="36" height="6" fill="#3a3d47" />
      <rect x="62" y="46" width="36" height="6" fill="#3a3d47" />
      <rect x="62" y="58" width="36" height="14" fill="#ffd86b" opacity="0.25" />
      {/* a single wheel/tire */}
      <g transform="translate(20,70)">
        <circle cx="0" cy="0" r="9" fill="#15171d" />
        <circle cx="0" cy="0" r="4" fill="#8a8f9c" />
      </g>
      {/* workbench with laptop (subtle) */}
      <rect x="120" y="60" width="32" height="4" fill="#6b4a2a" />
      <rect x="134" y="50" width="14" height="10" fill="#1a1a1a" />
      <rect x="136" y="52" width="10" height="6" fill="#0a2a0a" />
      {/* hidden: a tiny snake decal on the tool board (Pythonix) */}
      <g transform="translate(14,38)" fill="#2faa4f">
        <rect x="0" y="0" width="3" height="2" /><rect x="3" y="-1" width="3" height="2" />
        <rect x="6" y="0" width="3" height="2" /><rect x="9" y="1" width="3" height="2" />
      </g>
      {/* tiny flickering LED */}
      {animate && <rect x="150" y="20" width="1.5" height="1.5" fill="#39ff14" className="flicker-win" />}
    </svg>
  )
}

/* ============================== BLISS 98 ============================== */
function Bliss({ animate }: { animate?: boolean }) {
  return (
    <svg className="h-full w-full" viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="bl-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a8fd6" />
          <stop offset="100%" stopColor="#7cc0ee" />
        </linearGradient>
      </defs>
      <rect width="160" height="62" fill="url(#bl-sky)" />
      <circle cx="120" cy="20" r="12" fill="#fff6cf" />
      {/* clouds */}
      <g className={animate?'cloud-slow':''} fill="#ffffff" opacity="0.9">
        <ellipse cx="40" cy="18" rx="16" ry="5" />
        <ellipse cx="56" cy="16" rx="11" ry="4" />
        <ellipse cx="100" cy="30" rx="12" ry="4" />
      </g>
      <rect y="62" width="160" height="38" fill="#5aa83a" />
      <rect y="62" width="160" height="4" fill="#cfe894" />
      <path d="M0 70 Q40 58 80 66 T160 64 V100 H0 Z" fill="#4f9e34" />
      {/* a tiny tree */}
      <g transform="translate(28,62)">
        <rect x="0" y="6" width="3" height="9" fill="#5b3a1e" />
        <circle cx="1.5" cy="4" r="6" fill="#2f7d4f" />
      </g>
      {/* hidden: a tiny snake in the grass */}
      <g transform="translate(120,80)" fill="#2faa4f">
        <rect x="0" y="0" width="3" height="2" /><rect x="3" y="-1" width="3" height="2" />
        <rect x="6" y="0" width="3" height="2" /><rect x="9" y="1" width="3" height="2" />
      </g>
    </svg>
  )
}

/* ============================== CLASSIC TEAL ============================== */
function Classic() {
  return <div className="h-full w-full" style={{ backgroundColor: '#008080' }} aria-hidden />
}

const scenes: Record<WallpaperId, (p: { animate?: boolean }) => ReactElement> = {
  classic: Classic,
  bliss: Bliss,
  alpine: Alpine,
  evergreen: Evergreen,
  nightcity: NightCity,
  cosmos: Cosmos,
  prairie: Prairie,
  sunset: Sunset,
  workspace: Workspace,
  garage: Garage,
}

/**
 * Pixel-art wallpapers. Each scene is a crisp SVG using a small palette
 * so it reads as low-res pixel art. Several include animated ambient
 * elements (clouds, stars, rain, fireflies) and hidden easter eggs.
 */
export function Wallpaper({ id, animate, className }: WallpaperProps) {
  const Scene = scenes[id] ?? Classic
  return (
    <div className={`absolute inset-0 ${className ?? ''}`}>
      <Scene animate={animate} />
    </div>
  )
}
