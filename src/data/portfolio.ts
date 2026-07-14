type Project = {
  name: string
  description: string
  technologies: string[]
  features: string[]
  link: string
  year?: number
  live?: boolean
  tagline: string
  goal: string
  challenge: string
  solution: string
  outcome: string
  role: string
  evolution?: boolean
  versions?: { label: string; year: string; note: string }[]
  whatChanged?: string[]
}

type Game = {
  name: string
  icon: string
  description: string
  technologies: string[]
  status: string
  link?: string
}

type SkillCategory = {
  title: string
  items: string[]
}

export const profile = {
  name: 'Kayden',
  studio: 'NebulaNoord',
  studioDesc: 'Independent Design & Development Studio',
  location: 'Alberta, Canada',
  roles: ['Founder', 'Frontend Developer', 'Student'],
  // Short site intro (hero support line) — direct, human, no buzzwords.
  intro:
    'I design and build fast, interactive websites that help brands stand out through thoughtful design and memorable user experiences.',
  // About NebulaNoord + personal intro (About section).
  bio: "NebulaNoord is an independent design and development studio focused on creating modern, interactive websites that leave a lasting impression. Founded by Kayden, the studio combines thoughtful design, performance, and creative development to build sites that are both visually distinctive and enjoyable to use. I enjoy building websites that balance personality with usability — most projects start with a strong visual direction, then I spend just as much time on how people actually move through a site and what makes an experience stick.",
  interests: ['React', 'TypeScript', 'UI/UX', 'Web applications', 'Game development'],
  hobbies: ['Cities: Skylines II', 'Hot Wheels collecting', 'Formula 1', 'Exploring new tech'],
}

export const projects: Project[] = [
  {
    name: 'Maze Runner',
    tagline: 'A 999-level pixel-art maze game that runs smoothly on any phone.',
    description:
      'A retro pixel-art maze game with teleport portals — 999 procedurally generated levels, coin collection, a skin shop, mobile controls, and saved progress.',
    goal: 'Build a maze game with endless replay value that feels good on both desktop and mobile.',
    challenge: '999 unique levels meant hand-design was impossible — the game had to generate, render, and stay fast on low-end phones.',
    solution: 'Wrote a level generator with seeded randomness and portals, plus a touch control scheme and localStorage saves so progress never resets.',
    outcome: 'Runs at a smooth frame rate with 999 generated levels, a working skin shop, and progress that survives refreshes.',
    role: 'Solo — design, game logic, UI, mobile controls',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    features: ['999 generated levels', 'Teleport portals', 'Coin collection', 'Skin shop', 'Mobile controls', 'Saved progress'],
    link: 'https://mazeerunner.vercel.app/',
    year: 2026,
    live: true,
  },
  {
    name: 'CadenCeTyper',
    tagline: 'A typing test where you can see your rank against everyone else live.',
    description: 'A typing speed test with a global leaderboard and live ranking.',
    goal: 'Make practicing typing feel competitive instead of like a homework drill.',
    challenge: 'A leaderboard is only fun if it updates in real time and never feels fake or laggy.',
    solution: 'Built a live ranking system that recalculates WPM instantly and shows your position against other players as you type.',
    outcome: 'A fast, satisfying test with a global leaderboard that updates live — people keep coming back to climb it.',
    role: 'Solo — frontend, ranking logic, UI',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    features: ['WPM test', 'Global leaderboard', 'Live ranking'],
    link: 'https://cadencetyper.vercel.app/',
    year: 2025,
    live: true,
  },
  {
    name: 'ShiftSync',
    tagline: 'A shift logger I built because the app I was using made my own pay confusing.',
    description:
      'My first project — where I first learned to track real data and build a working UI from scratch. Logs work shifts, tracks pay periods, and translates them into the actual numbers on my paycheck.',
    goal: 'Understand my own pay periods and real paychecks — the tool I was using did not explain either.',
    challenge: 'It was my first build, so layout, state, and the pay math were all new. The UI had to stay clear enough to trust with my own money.',
    solution: 'Started simple: log a shift against a pay period, then show exactly how hours become the net amount on the check — no jargon, no hidden steps.',
    outcome: 'A shift logger that finally makes my pay periods and paychecks make sense — and the project where I learned to build a real UI.',
    role: 'Solo — first project, built from scratch',
    technologies: ['HTML', 'CSS', 'JavaScript', 'TypeScript'],
    features: ['Shift logging', 'Pay-period tracking', 'Net-pay breakdown'],
    link: 'https://shiftsyncyt.vercel.app/',
    year: 2024,
    live: true,
  },
  {
    name: 'Nebula Noord',
    tagline: 'The studio brand, reimagined — a case study in how my design thinking evolved.',
    description:
      "The studio's own brand — documented here as an evolution from its first visual identity to the portfolio you're browsing today.",
    goal: 'Give NebulaNoord a recognizable, premium identity — and show how the studio has grown.',
    challenge:
      'My first version worked, but it no longer reflected how I now approach branding, interaction, and storytelling. I needed to critique my own work honestly.',
    solution:
      'I treated the studio like a client: redefined the visual identity, tightened the typography and motion, and rebuilt the site around a clear narrative — then kept the old version as a documented case study rather than hiding it.',
    outcome:
      'One brand, two chapters. The new site is the official NebulaNoord home; the original is now evidence of iteration, not a competing site.',
    role: 'Founder — brand, design, development',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind'],
    features: ['Studio brand', 'Two interfaces', 'Documented evolution'],
    link: 'https://nebulanoord.vercel.app/',
    year: 2026,
    live: true,
    evolution: true,
    versions: [
      { label: 'Version 1', year: '2025', note: 'First visual identity — the studio’s original website.' },
      { label: 'Version 2', year: 'Current', note: 'The portfolio you’re browsing now — refined identity and storytelling.' },
    ],
    whatChanged: [
      'Stronger visual identity',
      'Better typography',
      'Clearer storytelling',
      'Improved motion design',
      'Better performance',
      'More cohesive branding',
    ],
  },
  {
    name: 'Pythonix',
    tagline: 'My very first game — a playable snake built before I knew frameworks.',
    description: 'My very first game — rough around the edges, but it genuinely plays. Launched separately from Archive.',
    goal: 'Make an actual game from scratch and learn what game development feels like.',
    challenge: 'No engine, no framework — just logic, a loop, and figuring out collision and input myself.',
    solution: 'Built the snake in Python with a simple game loop and keyboard controls, then shipped it as a standalone launcher.',
    outcome: 'A fully playable game and the starting point that got me into building web experiences.',
    role: 'Solo — first game, built from scratch',
    technologies: ['Python', 'Game development'],
    features: ['Playable game', 'External launcher', 'First game'],
    link: 'https://pythonix.vercel.app/',
    year: 2024,
    live: true,
  },
]

export const games: Game[] = [
  {
    name: 'Maze Runner',
    icon: 'MR',
    description: 'A large game with 999 generated levels. Archive only launches it externally.',
    technologies: ['HTML', 'CSS', 'JavaScript', '0 dependencies'],
    status: 'Live',
    link: 'https://mazeerunner.vercel.app/',
  },
  {
    name: 'Pythonix',
    icon: 'PX',
    description: 'My very first game — rough around the edges, but it genuinely plays. Archive launches it externally.',
    technologies: ['Python', 'Game logic'],
    status: 'Live',
    link: 'https://pythonix.vercel.app/',
  },
  {
    name: 'Future Games',
    icon: '??',
    description: 'Placeholder launcher slots for games developed separately later.',
    technologies: ['TBD'],
    status: 'Coming later',
    link: '#',
  },
]

export const process: { step: string; title: string; body: string }[] = [
  { step: '01', title: 'Discover', body: 'Learn about your project, goals, audience, and what success looks like.' },
  { step: '02', title: 'Design', body: 'Develop the visual direction and user experience — layout, type, and motion that fit your brand.' },
  { step: '03', title: 'Develop', body: 'Build a responsive, performant website with clean, maintainable code.' },
  { step: '04', title: 'Launch', body: 'Test, optimize for speed and accessibility, then deploy and hand over.' },
]

export const services: string[] = [
  'Custom Business Websites',
  'Portfolio Websites',
  'Landing Pages',
  'Frontend Development',
  'Website Refreshes',
  'Interactive Experiences',
]

export const trust: { label: string; value: string }[] = [
  { label: 'Stack', value: 'TypeScript · React · Vite · Tailwind' },
  { label: 'Typical build', value: '1–3 weeks, depending on scope' },
  { label: 'Performance', value: '~65 kB initial JS · built for speed' },
  { label: 'Accessibility', value: 'Semantic markup · reduced-motion aware' },
]

export const skills: string[] = [
  'TypeScript',
  'JavaScript',
  'HTML',
  'CSS',
  'Python',
  'React',
  'Vite',
  'Tailwind CSS',
  'Git',
  'GitHub',
  'VS Code',
  'Vercel',
  'Netlify',
  'Firebase',
  'UI/UX',
  'Responsive Design',
  'Game development',
]

export const skillsData: SkillCategory[] = [
  { title: 'LANGUAGES', items: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Python'] },
  { title: 'FRONTEND', items: ['React', 'Vite', 'Tailwind CSS', 'Responsive Design', 'Component Architecture'] },
  { title: 'TOOLS', items: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Netlify', 'Firebase'] },
  { title: 'UI / UX', items: ['Interface Design', 'Wireframing', 'Accessibility', 'Design Systems', 'User Experience'] },
]

export const resume = {
  name: 'Kayden',
  title: 'Frontend Developer',
  profile:
    'Frontend developer with experience designing and building responsive web applications using React, TypeScript, and modern development tools. Passionate about creating intuitive user experiences, writing clean code, and continuously expanding technical knowledge through personal projects.',
  skills: [
    { group: 'Languages', items: ['TypeScript', 'JavaScript', 'HTML', 'CSS', 'Python'] },
    { group: 'Frameworks & Libraries', items: ['React', 'Vite', 'Tailwind CSS'] },
    { group: 'Tools', items: ['Git', 'GitHub', 'Vercel', 'Netlify', 'Firebase', 'VS Code'] },
  ],
  experience: [
    {
      role: 'General Labourer',
      period: '2026 – Present',
      points: [
        'Worked efficiently in a team environment',
        'Followed safety procedures',
        'Assisted with daily operational tasks',
        'Maintained productivity under deadlines',
      ],
    },
  ],
  projects: [
    { name: 'Maze Runner', desc: 'Large-scale puzzle game featuring 999 generated levels.' },
    { name: 'CadenCeTyper', desc: 'Typing speed test with a global leaderboard.' },
    { name: 'ShiftSync', desc: 'Shift logging, hours tracking, and net pay calculator.' },
    { name: 'Nebula Noord', desc: "My company's website and professional home." },
    { name: 'Pythonix', desc: 'Browser-based snake game built with modern frontend tech.' },
  ],
  education: [{ school: 'Victoria Park High School', detail: 'Grade 11 (Current)' }],
}

export const contact = {
  email: 'nebulanoord@gmail.com',
  github: 'https://github.com/NebulaNoord',
  linkedin: 'https://linkedin.com/',
  twitter: 'https://x.com/',
}
