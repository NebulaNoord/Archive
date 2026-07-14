type ProjectCardProps = {
  name: string
  tagline: string
  year: string
  stack: string[]
  onOpen: () => void
}

export function ProjectCard({ name, tagline, year, stack, onOpen }: ProjectCardProps) {
  return (
    <button type="button" onClick={onOpen} className="edi-hover edi-border block w-full bg-white p-5 text-left">
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
        <span className="edi-tag text-[var(--accent)]">CASE STUDY →</span>
        <span className="edi-stripes h-4 w-12" />
      </div>
    </button>
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

type CaseStudy = {
  name: string
  tagline: string
  role: string
  goal: string
  challenge: string
  solution: string
  outcome: string
  technologies: string[]
  link: string
}

export function CaseStudyModal({ project, onClose }: { project: CaseStudy; onClose: () => void }) {
  const rows: [string, string][] = [
    ['Goal', project.goal],
    ['Challenge', project.challenge],
    ['Solution', project.solution],
    ['Outcome', project.outcome],
  ]
  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ background: 'rgba(17,17,17,0.72)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
    >
      <div
        className="edi-border bg-white max-h-[88vh] w-full max-w-2xl overflow-y-auto p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="edi-tag text-[var(--accent)]">{project.role}</p>
            <h3 className="edi-display mt-2 text-[clamp(1.6rem,5vw,2.8rem)] leading-[0.95]">{project.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="edi-tag edi-border px-3 py-2 hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="mt-4 text-lg text-[var(--muted)]">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.technologies.map((s) => (
            <span key={s} className="edi-tag border-2 border-[var(--fg)] px-2 py-1 text-[var(--fg)]">
              {s}
            </span>
          ))}
        </div>

        <dl className="mt-7 space-y-5">
          {rows.map(([k, v]) => (
            <div key={k} className="border-t-2 border-[var(--border-color)] pt-4">
              <dt className="edi-tag text-[var(--accent)]">{k}</dt>
              <dd className="mt-2 text-[var(--fg)]">{v}</dd>
            </div>
          ))}
        </dl>

        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="edi-tag edi-border mt-7 inline-block bg-[var(--accent)] px-5 py-3 text-[var(--accent-ink)] hover:bg-[var(--fg)]"
        >
          VISIT LIVE SITE →
        </a>
      </div>
    </div>
  )
}
