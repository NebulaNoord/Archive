import { useEffect, useState, type ReactNode } from 'react'

const SECTIONS = [
  { id: 'top', label: 'Top' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
]

export function SideNav() {
  const [active, setActive] = useState('top')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <nav className="edi-nav" aria-label="Section navigation">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'active' : ''}>
            {s.label}
          </a>
        ))}
      </nav>
    </>
  )
}

export function Marquee({ text }: { text: string }) {
  const items = Array.from({ length: 6 })
  return (
    <div className="edi-marquee" aria-hidden>
      {items.map((_, i) => (
        <span key={i}>{text}&nbsp;★&nbsp;</span>
      ))}
    </div>
  )
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="edi-ghost text-[clamp(3rem,16vw,13rem)] leading-none">{children}</h2>
}
