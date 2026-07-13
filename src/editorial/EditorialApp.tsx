import { lazy, Suspense, useEffect, useState } from 'react'
import { projects, games, profile } from '../data/portfolio'
import '../styles/editorial.css'
import { Reveal } from './Reveal'
import { Noise } from './Noise'
import { MouseTrail } from './MouseTrail'
import { SideNav, Marquee, SectionHeading } from './SideNav'
import { ProjectCard, Stat, Polaroid } from './Cards'

const ArchiveOS = lazy(() => import('../App'))

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-white px-6 md:px-20 edi-border" style={{ borderWidth: '0 0 var(--border-w) 0' }}>
      <div className="edi-halftone pointer-events-none absolute inset-0" />
      <span className="edi-sticker absolute right-6 top-6 md:right-20">EST. 2026</span>
      <p className="edi-tag mb-4 text-[var(--accent)]">◆ PORTFOLIO / 2026 / ARCHIVE</p>
      <h1 className="edi-display text-[clamp(4rem,22vw,18rem)] leading-[0.82] text-[var(--fg)]">
        KAYDEN
      </h1>
      <h1 className="edi-display mt-2 inline-block text-[clamp(1.6rem,9vw,7rem)] leading-[0.9] text-[var(--fg)]">
        FRONTEND
        <br />
        DEVELOPER
        <span className="mt-2 block h-[6px] w-full bg-[var(--accent)]" />
      </h1>
      <div className="edi-stripes mt-10 h-6 w-40" />
      <p className="mt-8 max-w-md text-xl text-[var(--muted)]">
        I design and build distinctive digital experiences — not just dashboards. Scroll to explore the work.
      </p>
      <div className="absolute bottom-6 right-6 edi-tag text-[var(--accent)]">SCROLL ↓</div>
    </section>
  )
}

function Work() {
  return (
    <section id="work" className="relative px-6 py-24 md:px-20">
      <SectionHeading>WORK</SectionHeading>
      <div className="relative z-10 mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 70}>
            <ProjectCard
              name={p.name}
              tagline={p.description}
              year={String(p.year ?? '')}
              stack={p.technologies}
              href={p.link}
            />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:px-20">
      <SectionHeading>ABOUT</SectionHeading>
      <Reveal className="mt-8">
        <h3 className="edi-display max-w-5xl text-[clamp(2rem,7vw,5rem)] leading-[0.95]">
          HELLO.
          <br />
          I BUILD
          <br />
          <span className="text-[var(--accent)]">THINGS</span>
          <br />
          FOR THE WEB.
        </h3>
      </Reveal>
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Reveal><Stat value="CA" label="CANADA" /></Reveal>
        <Reveal delay={60}><Stat value="REACT" label="FRONTEND" /></Reveal>
        <Reveal delay={120}><Stat value="TS" label="TYPESCRIPT" /></Reveal>
        <Reveal delay={180}><Stat value="14" label="PROJECTS" /></Reveal>
      </div>
      <p className="mt-8 max-w-xl text-lg text-[var(--muted)]">{profile.bio}</p>
    </section>
  )
}

function Play() {
  return (
    <section id="play" className="relative px-6 py-24 md:px-20">
      <SectionHeading>PLAY</SectionHeading>
      <div className="mt-8 flex flex-col gap-6">
        {games.filter((g) => g.link && g.link !== '#').map((g) => (
          <Reveal key={g.name}>
            <a
              href={g.link}
              target="_blank"
              rel="noreferrer"
              className="edi-hover edi-border-accent flex items-center justify-between bg-[var(--accent-ink)] p-6"
            >
              <div>
                <div className="edi-display text-[clamp(1.5rem,5vw,3.5rem)] text-[var(--accent)]">{g.name}</div>
                <p className="mt-2 max-w-md text-[var(--muted)]">{g.description}</p>
              </div>
              <span className="edi-tag border-2 border-[var(--accent)] px-4 py-3 text-[var(--accent)]">LAUNCH →</span>
            </a>
          </Reveal>
        ))}
      </div>
      <p className="edi-tag mt-6 text-[var(--muted)]">↓ LAUNCH OPENS FULLSCREEN</p>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28 md:px-20">
      <SectionHeading>CONTACT</SectionHeading>
      <Reveal className="mt-10">
        <a
          href="mailto:kayden@nebulanoord.vercel.app"
          className="edi-display inline-block text-[clamp(1.5rem,6vw,4rem)] text-[var(--accent)] hover:text-[var(--fg)]"
        >
          LET'S TALK →
        </a>
      </Reveal>
      <div className="mt-10 flex flex-wrap gap-3">
        <a href="https://nebulanoord.vercel.app/" target="_blank" rel="noreferrer" className="edi-tag edi-border px-4 py-2 hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]">
          NEBULA NOORD
        </a>
        <span className="edi-tag edi-border px-4 py-2">{profile.location}</span>
        <span className="edi-tag edi-border px-4 py-2">{profile.roles.join(' / ')}</span>
      </div>
      <div className="mt-16 flex flex-wrap gap-6">
        <Polaroid emoji="🏎️" caption="HOT WHEELS" rotate={-4} />
        <Polaroid emoji="🏔️" caption="ALBERTA" rotate={3} />
        <Polaroid emoji="🏎️" caption="F1 SUNDAY" rotate={-2} />
        <Polaroid emoji="🌆" caption="LATE NIGHT CODE" rotate={5} />
      </div>
      <Marquee text="THANKS FOR VISITING — KAYDEN — ARCHIVE —" />
      <p className="edi-tag mt-6 text-[var(--muted)]">
        P.S. Find the hidden RETRO mode in the side nav. →
      </p>
    </section>
  )
}

export default function EditorialApp() {
  const [retro, setRetro] = useState(false)

  // Lock document scroll only while the OS (RETRO) is mounted.
  useEffect(() => {
    document.body.classList.toggle('os-mode', retro)
    return () => document.body.classList.remove('os-mode')
  }, [retro])

  if (retro) {
    return (
      <Suspense fallback={<div style={{ background: '#008080', height: '100vh' }} />}>
        <ArchiveOS onExitRetro={() => setRetro(false)} />
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
        <Marquee text="SELECTED WORK — KAYDEN — FRONTEND DEVELOPER —" />
        <Work />
        <About />
        <Play />
        <Contact />
      </main>
    </div>
  )
}
