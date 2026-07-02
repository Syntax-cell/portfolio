import Reveal from '../components/Reveal'

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-28 sm:py-36">
      <Reveal>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          About
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="text-2xl font-light leading-relaxed text-neutral-200 sm:text-3xl sm:leading-relaxed">
          I&apos;m{' '}
          <span className="font-semibold text-white">Pawan Veer Arya</span>, a
          BCA student and early-stage developer building real-world projects
          while learning{' '}
          <span className="text-accent">React</span>,{' '}
          <span className="text-accent">prompt engineering</span>, and{' '}
          <span className="text-accent">cloud computing</span>. I like turning
          ideas into working products — one project at a time.
        </p>
      </Reveal>
    </section>
  )
}
