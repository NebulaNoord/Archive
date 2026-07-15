import { lazy, Suspense, useEffect, useState } from 'react'
import { projects, games, profile, process, services, trust, contact } from '../data/portfolio'
import '../styles/editorial.css'
import { Reveal } from './Reveal'
import { Noise } from './Noise'
import { MouseTrail } from './MouseTrail'
import { SideNav, Marquee, SectionHeading } from './SideNav'
import { ProjectCard, Stat, Polaroid, CaseStudyModal } from './Cards'
import { ContactForm } from './ContactForm'

const ArchiveOS = lazy(() => import('../App'))

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-white px-6 py-24 md:px-20 edi-border"
      style={{ borderWidth: '0 0 var(--border-w) 0' }}
    >
      <div className="edi-halftone pointer-events-none absolute inset-0" />
      <span className="edi-sticker absolute right-6 top-6 md:right-20">EST. 2026</span>
      <p className="edi-tag mb-4 text-[var(--accent)]">
        {profile.studio} — {profile.studioDesc}
      </p>
      <h1 className="edi-display text-[clamp(3.5rem,20vw,16rem)] leading-[0.82] text-[var(--fg)]">
        WEBSITES
        <br />
        PEOPLE
        <br />
        REMEMBER.
      </h1>
      <p className="mt-8 max-w-md text-xl text-[var(--muted)]">{profile.intro}</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="#work"
          className="edi-tag edi-border bg-[var(--accent)] px-6 py-4 text-[var(--accent-ink)] hover:bg-[var(--fg)]"
        >
          VIEW WORK →
        </a>
        <a
          href="#contact"
          className="edi-tag edi-border px-6 py-4 text-[var(--fg)] hover:bg-[var(--secondary)]"
        >
          LET'S TALK →
        </a>
      </div>
      <div className="absolute bottom-6 right-6 edi-tag text-[var(--accent)]">SCROLL ↓</div>
    </section>
  )
}

function Work() {
  const [open, setOpen] = useState<(typeof projects)[number] | null>(null)
  return (
    <section id="work" className="relative px-6 py-32 md:px-20">
      <SectionHeading>WORK</SectionHeading>
      <p className="edi-tag mb-8 max-w-xl text-[var(--muted)]">
        Selected projects — each one a problem solved, not just a pretty screen.
      </p>
      <div className="relative z-10 mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 70}>
            <ProjectCard
              name={p.name}
              tagline={p.tagline}
              year={String(p.year ?? '')}
              stack={p.technologies}
              onOpen={() => setOpen(p)}
            />
          </Reveal>
        ))}
      </div>
      {open && <CaseStudyModal project={open} onClose={() => setOpen(null)} />}
    </section>
  )
}

function About() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-20">
      <SectionHeading>ABOUT</SectionHeading>
      <Reveal className="mt-8">
        <h3 className="edi-display max-w-5xl text-[clamp(1.8rem,6vw,4.5rem)] leading-[0.95]">
          {profile.studio}
          <br />
          <span className="text-[var(--accent)]">AN INDEPENDENT</span>
          <br />
          STUDIO.
        </h3>
      </Reveal>
      <p className="mt-8 max-w-xl text-lg text-[var(--muted)]">{profile.bio}</p>
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Reveal>
          <Stat value="CA" label="ALBERTA" />
        </Reveal>
        <Reveal delay={60}>
          <Stat value="SOLO" label="STUDIO" />
        </Reveal>
        <Reveal delay={120}>
          <Stat value="TS" label="TYPE-SAFE" />
        </Reveal>
        <Reveal delay={180}>
          <Stat value="05" label="SHIPPED" />
        </Reveal>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="relative bg-[var(--surface)] px-6 py-32 md:px-20 edi-border" style={{ borderWidth: 'var(--border-w) 0' }}>
      <SectionHeading>PROCESS</SectionHeading>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((s, i) => (
          <Reveal key={s.step} delay={i * 70}>
            <div className="edi-border bg-white p-6">
              <div className="edi-display text-4xl text-[var(--accent)]">{s.step}</div>
              <div className="edi-tag mt-3 text-[var(--fg)]">{s.title}</div>
              <p className="mt-3 text-[var(--muted)]">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="relative px-6 py-32 md:px-20">
      <SectionHeading>SERVICES</SectionHeading>
      <div className="mt-8 flex flex-wrap gap-4">
        {services.map((s, i) => (
          <Reveal key={s} delay={i * 50}>
            <span className="edi-tag edi-border inline-block bg-white px-5 py-3 text-[var(--fg)] hover:bg-[var(--secondary)]">
              {s}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Play() {
  return (
    <section id="play" className="relative px-6 py-32 md:px-20">
      <SectionHeading>PLAY</SectionHeading>
      <div className="mt-8 flex flex-col gap-6">
        {games
          .filter((g) => g.link && g.link !== '#')
          .map((g) => (
            <Reveal key={g.name}>
              <a
                href={g.link}
                target="_blank"
                rel="noreferrer"
                className="edi-hover edi-border flex items-center justify-between bg-white p-6"
              >
                <div>
                  <div className="edi-display text-[clamp(1.5rem,5vw,3.5rem)] text-[var(--accent)]">
                    {g.name}
                  </div>
                  <p className="mt-2 max-w-md text-[var(--muted)]">{g.description}</p>
                </div>
                <span className="edi-tag edi-border px-4 py-3 text-[var(--accent)]">LAUNCH →</span>
              </a>
            </Reveal>
          ))}
      </div>
      <p className="edi-tag mt-6 text-[var(--muted)]">↓ LAUNCH OPENS FULLSCREEN</p>
    </section>
  )
}

function Trust() {
  return (
    <section className="relative bg-[var(--surface)] px-6 py-20 md:px-20 edi-border" style={{ borderWidth: 'var(--border-w) 0' }}>
      <p className="edi-tag mb-6 text-[var(--accent)]">WHY WORK WITH ME</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trust.map((t) => (
          <div key={t.label} className="edi-border bg-white p-5">
            <div className="edi-tag text-[var(--muted)]">{t.label}</div>
            <div className="mt-2 text-lg text-[var(--fg)]">{t.value}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function RetroCTA({ onSwitch }: { onSwitch: () => void }) {
  return (
    <section className="relative px-6 py-32 text-center md:px-20">
      <Reveal>
        <p className="edi-tag text-[var(--accent)]">EXPERIENCE ANOTHER SIDE</p>
        <h3 className="edi-display mx-auto mt-4 max-w-3xl text-[clamp(1.8rem,6vw,4rem)] leading-[0.95]">
          NOT SURE THIS IS YOUR VIBE?
        </h3>
        <p className="mx-auto mt-4 max-w-md text-lg text-[var(--muted)]">
          Switch to Retro OS Mode — a playful, nostalgic take on the same portfolio.
        </p>
        <div className="mt-8">
          <button
            onClick={onSwitch}
            className="edi-tag edi-border bg-[var(--fg)] px-6 py-4 text-[var(--bg)] hover:bg-[var(--accent)]"
          >
            RETRO OS MODE →
          </button>
        </div>
      </Reveal>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="relative px-6 py-32 md:px-20">
      <SectionHeading>CONTACT</SectionHeading>
      <Reveal className="mt-10">
        <a
          href={`mailto:${contact.email}`}
          className="edi-display inline-block text-[clamp(1.5rem,6vw,4rem)] text-[var(--accent)] hover:text-[var(--fg)]"
        >
          LET'S TALK →
        </a>
      </Reveal>
      <p className="edi-tag mt-4 text-[var(--muted)]">
        Have a project in mind, or just want to compare notes on design? Email me directly.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={`mailto:${contact.email}`}
          className="edi-tag edi-border px-4 py-2 bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--fg)]"
        >
          {contact.email}
        </a>
        <span className="edi-tag edi-border px-4 py-2">{profile.location}</span>
        <span className="edi-tag edi-border px-4 py-2">{profile.studioDesc}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[var(--muted)]">
        <span className="edi-tag">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--secondary)]" /> {profile.availability.status}
        </span>
        <span className="edi-tag">{profile.availability.timezone}</span>
        <span className="edi-tag">{profile.availability.response}</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={contact.github}
          target="_blank"
          rel="noreferrer"
          className="edi-tag edi-border px-4 py-2 hover:bg-[var(--secondary)]"
        >
          GITHUB ↗
        </a>
      </div>

      <ContactForm />

      <div className="mt-16 flex flex-wrap gap-6">
        <Polaroid emoji="🏎️" caption="HOT WHEELS" rotate={-4} />
        <Polaroid emoji="🏔️" caption="ALBERTA" rotate={3} />
        <Polaroid emoji="🏎️" caption="F1 SUNDAY" rotate={-2} />
        <Polaroid emoji="🌆" caption="LATE NIGHT CODE" rotate={5} />
      </div>
      <Marquee text="THANKS FOR VISITING — NEBULANOORD — ARCHIVE —" />
    </section>
  )
}

export default function EditorialApp() {
  const [retro, setRetro] = useState(false)
  const [retroFromCTA, setRetroFromCTA] = useState(false)

  // Lock document scroll only while the OS (RETRO) is mounted.
  useEffect(() => {
    document.body.classList.toggle('os-mode', retro)
    return () => document.body.classList.remove('os-mode')
  }, [retro])

  if (retro) {
    return (
      <Suspense fallback={<div style={{ background: '#008080', height: '100vh' }} />}>
        <ArchiveOS
          onExitRetro={() => {
            setRetro(false)
            if (retroFromCTA) {
              setRetroFromCTA(false)
              requestAnimationFrame(() =>
                document.getElementById('retro-cta')?.scrollIntoView({ behavior: 'smooth' }),
              )
            }
          }}
        />
      </Suspense>
    )
  }

  return (
    <div className="edi-body relative min-h-screen w-full">
      <Noise />
      <MouseTrail />
      <SideNav onRetro={() => setRetro(true)} />
      <main>
        <Hero />
        <Marquee text="SELECTED WORK — NEBULANOORD — INDEPENDENT STUDIO —" />
        <Work />
        <About />
        <Process />
        <Services />
        <Play />
        <Trust />
        <section id="retro-cta">
          <RetroCTA onSwitch={() => { setRetroFromCTA(true); setRetro(true) }} />
        </section>
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t-2 border-[var(--border-color)] px-6 py-10 md:px-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="edi-tag text-[var(--muted)]">© {new Date().getFullYear()} NEBULANOORD</span>
        <a
          href="/privacy.html"
          className="edi-tag edi-border px-3 py-2 hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
        >
          PRIVACY
        </a>
      </div>
    </footer>
  )
}
