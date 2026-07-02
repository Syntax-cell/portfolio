import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import { SKILLS } from '../data/content'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-28 sm:py-36">
      <Reveal>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Skills
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mb-12 text-3xl font-bold text-white sm:text-4xl">
          Tools I work with
        </h2>
      </Reveal>

      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-wrap gap-3 sm:gap-4"
      >
        {SKILLS.map((skill) => (
          <motion.li
            key={skill}
            variants={item}
            className="rounded-xl border border-white/10 bg-ink-soft px-6 py-3 text-base font-medium text-neutral-200 transition-colors hover:border-accent/60 hover:text-accent sm:text-lg"
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
