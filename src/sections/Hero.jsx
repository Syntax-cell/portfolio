import { motion } from 'framer-motion'
import profilePhoto from '../assets/profile-photo.png'

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
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-28 lg:py-24"
    >
      {/* Accent glow backdrop */}
      <div className="glow-accent pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.88fr)] lg:gap-16">
        <div className="text-center lg:text-left">
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-wrap justify-center gap-x-4 text-5xl font-extrabold tracking-tight sm:text-7xl lg:justify-start lg:text-8xl"
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

        <motion.div
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[280px] sm:max-w-[340px] lg:mx-0 lg:justify-self-end"
        >
          <img
            src={profilePhoto}
            alt="Pawan Veer Arya"
            className="aspect-[3/4] max-h-[500px] w-full rounded-3xl border border-white/10 object-cover shadow-[0_24px_80px_rgba(255,69,0,0.18)]"
          />
        </motion.div>
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
