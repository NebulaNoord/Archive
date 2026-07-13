import { projects } from '../data/portfolio'
import { FolderIcon } from '../icons'
import { PixelProjectShot } from '../pixelArt'

export default function ProjectsApp() {
  return (
    <div className="win-body grid min-h-full gap-2 text-black lg:grid-cols-[200px_1fr]">
      <aside className="win-sunken p-2">
        <div className="win-titlebar mb-2 px-2 py-1 win-pixel text-[9px]">C:\\PROJECTS</div>
        <div className="space-y-1">
          {projects.map((project) => (
            <button key={project.name} className="flex w-full items-center gap-2 px-1 py-1 text-left text-lg hover:bg-[#000080] hover:text-white">
              <FolderIcon size={20} /> {project.name}
            </button>
          ))}
        </div>
      </aside>
      <section className="grid gap-2 md:grid-cols-2">
        {projects.map((project, index) => (
          <article key={project.name} className="win-raised p-2">
            <div className="win-sunken p-1">
              <PixelProjectShot variant={index} size={280} style={{ width: '100%', height: 'auto' }} />
            </div>
            <div className="win-titlebar mt-2 px-2 py-1 win-pixel text-[10px]">{project.name}</div>
            <p className="mt-2 text-lg">{project.description}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {project.technologies.map((tech) => (
                <span key={tech} className="win-sunken bg-white px-1 text-sm">{tech}</span>
              ))}
            </div>
            <ul className="mt-2 list-disc pl-5 text-base">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a className="win-btn mt-2 inline-block text-base" href={project.link} target={project.link.startsWith('http') ? '_blank' : undefined} rel="noreferrer">OPEN</a>
            <div className="mt-1 flex gap-2 text-xs">
              {project.live && <span className="win-sunken bg-[#008000] px-1 text-white">LIVE</span>}
              {project.year && <span className="win-sunken bg-white px-1">{project.year}</span>}
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
