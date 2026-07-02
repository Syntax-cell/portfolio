import Reveal from '../components/Reveal'
import { CONTACT } from '../data/content'

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-3xl px-6 py-28 text-center sm:py-36"
    >
      <Reveal>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Contact
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mb-4 text-3xl font-bold text-white sm:text-5xl">
          Let&apos;s build something.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mx-auto mb-10 max-w-md text-neutral-400">
          Open to opportunities, collaborations, and learning. Reach out and
          say hi.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* PLACEHOLDER email — swap in src/data/content.js */}
          <a
            href={`mailto:${CONTACT.email}`}
            className="w-full rounded-full bg-accent px-8 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90 sm:w-auto"
          >
            Email me
          </a>

          {/* PLACEHOLDER GitHub — swap in src/data/content.js */}
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-full border border-white/15 px-8 py-3 text-sm font-semibold text-neutral-200 transition-colors hover:border-accent hover:text-accent sm:w-auto"
          >
            GitHub
          </a>
        </div>
      </Reveal>
    </section>
  )
}
