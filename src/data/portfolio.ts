type Project = {
  name: string
  description: string
  technologies: string[]
  features: string[]
  link: string
  year?: number
  live?: boolean
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
  location: 'Alberta, Canada',
  roles: ['Frontend Developer', 'Student'],
  bio: 'Frontend developer and student from Alberta, Canada, creating interactive web experiences with React, TypeScript, and Vite. My work ranges from productivity applications and dashboards to games and experimental projects, with a focus on clean design, intuitive user interfaces, and maintainable code.',
  interests: ['React', 'TypeScript', 'UI/UX', 'Web applications', 'Game development'],
  hobbies: ['Cities: Skylines II', 'Hot Wheels collecting', 'Formula 1', 'Exploring new tech'],
}

export const projects: Project[] = [
  {
    name: 'Maze Runner',
    description:
      'A retro pixel-art maze game with teleport portals — 999 procedurally generated levels, coin collection, a skin shop, mobile controls, and saved progress.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    features: ['999 generated levels', 'Teleport portals', 'Coin collection', 'Skin shop', 'Mobile controls', 'Saved progress'],
    link: 'https://mazeerunner.vercel.app/',
    year: 2026,
    live: true,
  },
  {
    name: 'CadenCeTyper',
    description: 'A typing speed test with a global leaderboard and live ranking.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    features: ['WPM test', 'Global leaderboard', 'Live ranking'],
    link: 'https://cadencetyper.vercel.app/',
    year: 2025,
    live: true,
  },
  {
    name: 'ShiftSync',
    description:
      'My first project, so the UI is rough — but it works. Logs work shifts, tracks hours, and calculates net pay.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    features: ['Shift logging', 'Hours tracker', 'Net pay calculator'],
    link: 'https://shiftsyncyt.vercel.app/',
    year: 2024,
    live: true,
  },
  {
    name: 'Nebula Noord',
    description: "My company's website — the professional home of Nebula Noord.",
    technologies: ['Web', 'Responsive design', 'UI/UX'],
    features: ['Company site', 'External link', 'Brand presence'],
    link: 'https://nebulanoord.vercel.app/',
    year: 2026,
    live: true,
  },
  {
    name: 'Pythonix',
    description: 'My first game, so the UI is a little rough — but it plays. Launched separately from Archive.',
    technologies: ['Python', 'Game development'],
    features: ['Launcher entry', 'External play', 'First game'],
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
    description: 'My first game, so the UI is a little rough — but it plays. Archive launches it externally.',
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
  email: 'kayden@example.com',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/',
  twitter: 'https://x.com/',
}
