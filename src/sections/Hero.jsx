import { motion } from 'framer-motion'

// Split the name so each word animates in with a stagger.
const nameWords = ['Pawan', 'Veer', 'Arya']

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const word = {
  hidden: { opacity: 0, y: '100%' },
  show: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Accent glow backdrop */}
      <div className="glow-accent pointer-events-none absolute inset-0" />

      <div className="relative z-10 text-center">
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center gap-x-4 text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
        >
          {nameWords.map((w, i) => (
            <span key={i} className="overflow-hidden pb-2">
              <motion.span
                variants={word}
                className={`inline-block ${
                  i === nameWords.length - 1 ? 'text-accent' : 'text-white'
                }`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 text-lg font-medium tracking-wide text-neutral-400 sm:text-xl"
        >
          Developer <span className="text-accent">|</span> Builder{' '}
          <span className="text-accent">|</span> Learner
        </motion.p>

        <motion.a
          href="#projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mt-10 inline-block rounded-full border border-accent/50 px-7 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-black"
        >
          View my work
        </motion.a>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="text-xs uppercase tracking-[0.3em] text-neutral-600"
        >
          Scroll
        </motion.div>
      </motion.div>
    </section>
  )
}
