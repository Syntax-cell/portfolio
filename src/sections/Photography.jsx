import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../components/Reveal'

const photoModules = import.meta.glob(
  '../assets/photography/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, import: 'default', query: '?url' },
)

// Every supported image dropped into src/assets/photography/ is included.
// Filename sorting keeps the grid order predictable between builds.
const photos = Object.entries(photoModules)
  .map(([path, src]) => ({ filename: path.split('/').pop(), src }))
  .sort((first, second) => first.filename.localeCompare(second.filename))

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const photo = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Photography() {
  const [activePhoto, setActivePhoto] = useState(null)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setActivePhoto(null)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <section id="photography" className="mx-auto max-w-5xl px-6 py-28 sm:py-36">
      <Reveal>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Through the Lens
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
          Photography
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mb-12 max-w-2xl text-neutral-400">
          When I&apos;m not coding, I&apos;m out shooting the night sky and nature.
        </p>
      </Reveal>

      {photos.length > 0 && (
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
        >
          {photos.map((image) => (
            <motion.button
              key={image.filename}
              type="button"
              variants={photo}
              onClick={() => setActivePhoto(image)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-ink-soft text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              aria-label={`Open ${image.filename} in a larger view`}
            >
              <img
                src={image.src}
                alt="Photography by Pawan Veer Arya"
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-focus-visible:scale-105"
              />
              <span className="absolute inset-0 bg-accent/0 transition-colors duration-300 group-hover:bg-accent/10 group-focus-visible:bg-accent/10" />
            </motion.button>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Expanded photograph"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={activePhoto.src}
                alt="Photography by Pawan Veer Arya"
                className="max-h-[85vh] max-w-full rounded-xl border border-white/10 object-contain shadow-2xl"
              />
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-ink text-xl leading-none text-neutral-200 transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close enlarged photograph"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
