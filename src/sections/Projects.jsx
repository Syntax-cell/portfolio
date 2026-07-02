import Reveal from '../components/Reveal'
import { PROJECTS } from '../data/content'

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-28 sm:py-36">
      <Reveal>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Projects
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mb-12 text-3xl font-bold text-white sm:text-4xl">
          Things I&apos;ve built
        </h2>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.12}>
            <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-ink-soft p-6 transition-colors duration-300 hover:border-accent/60">
              <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-accent">
                {project.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-400">
                {project.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {/* PLACEHOLDER link — swap the URL in src/data/content.js */}
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-accent"
              >
                GitHub
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
