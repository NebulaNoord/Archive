import { resume } from '../data/portfolio'

export default function ResumeApp() {
  return (
    <div className="text-black">
      <div className="win-titlebar mb-2 flex items-center justify-between px-2 py-1 win-pixel text-[9px]">
        <span>RESUME.DOC - ARCHIVE WRITE</span>
        <span>1 PAGE</span>
      </div>
      <div className="win-sunken space-y-3 p-3">
        <header>
          <h2 className="win-pixel text-[13px]">{resume.name}</h2>
          <p className="text-sm">{resume.title}</p>
        </header>

        <section>
          <h3 className="border-b-2 border-black text-sm font-bold">PROFILE</h3>
          <p className="mt-1 text-sm">{resume.profile}</p>
        </section>

        <section>
          <h3 className="border-b-2 border-black text-sm font-bold">TECHNICAL SKILLS</h3>
          <div className="mt-1 space-y-1 text-sm">
            {resume.skills.map((group) => (
              <p key={group.group}>
                <span className="font-bold">{group.group}:</span> {group.items.join(', ')}
              </p>
            ))}
          </div>
        </section>

        <section>
          <h3 className="border-b-2 border-black text-sm font-bold">EXPERIENCE</h3>
          <div className="mt-1 space-y-2 text-sm">
            {resume.experience.map((item) => (
              <div key={item.role}>
                <p className="font-bold">
                  {item.role} — {item.period}
                </p>
                <ul className="list-disc pl-5">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="border-b-2 border-black text-sm font-bold">PROJECTS</h3>
          <ul className="mt-1 list-disc pl-5 text-sm">
            {resume.projects.map((project) => (
              <li key={project.name}>
                <span className="font-bold">{project.name}</span> — {project.desc}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="border-b-2 border-black text-sm font-bold">EDUCATION</h3>
          <div className="mt-1 text-sm">
            {resume.education.map((item) => (
              <p key={item.school}>
                <span className="font-bold">{item.school}</span> — {item.detail}
              </p>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
