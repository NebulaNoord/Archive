type ProjectCardProps = {
  name: string
  tagline: string
  year: string
  stack: string[]
  href?: string
}

export function ProjectCard({ name, tagline, year, stack, href }: ProjectCardProps) {
  const inner = (
    <div className="edi-hover edi-border bg-[var(--bg)] p-5">
      <div className="edi-card-ghost edi-display text-[clamp(1.5rem,4vw,3rem)] transition-transform duration-500">
        {name}
      </div>
      <p className="mt-3 max-w-xs text-lg text-[var(--muted)]">{tagline}</p>
      <div className="mt-5 flex items-end justify-between">
        <div className="flex flex-wrap gap-1.5">
          {stack.map((s) => (
            <span key={s} className="edi-tag border-2 border-[var(--fg)] px-2 py-1 text-[var(--fg)]">
              {s}
            </span>
          ))}
        </div>
        <span className="edi-tag text-[var(--accent)]">{year}</span>
      </div>
      <div className="mt-4 flex items-center justify-between border-t-2 border-[var(--border-color)] pt-3">
        <span className="edi-tag text-[var(--accent)]">VIEW →</span>
        <span className="edi-stripes h-4 w-12" />
      </div>
    </div>
  )
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block">
      {inner}
    </a>
  ) : (
    <div className="block">{inner}</div>
  )
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="edi-border-accent bg-[var(--accent)] p-3 text-[var(--accent-ink)]">
      <div className="edi-display text-4xl">{value}</div>
      <div className="edi-tag mt-1">{label}</div>
    </div>
  )
}

export function Polaroid({ emoji, caption, rotate = 0 }: { emoji: string; caption: string; rotate?: number }) {
  return (
    <div
      className="edi-border bg-white p-2 text-[var(--fg)] shadow-xl"
      style={{ transform: `rotate(${rotate}deg)`, width: '11rem' }}
    >
      <div className="flex h-32 items-center justify-center bg-[#e7e7e7] text-6xl">{emoji}</div>
      <p className="edi-tag mt-2 text-center text-[var(--fg)]">{caption}</p>
    </div>
  )
}
