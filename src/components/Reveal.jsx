import { motion } from 'framer-motion'

/**
 * Reusable scroll-triggered animation wrapper.
 * Fades + slides its children into view the first time they enter the viewport.
 *
 * Props:
 *  - direction: 'up' | 'down' | 'left' | 'right' (default 'up')
 *  - delay: seconds to stagger the entrance (default 0)
 *  - as: element/motion tag to render (default motion.div)
 */
const offsets = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  ...rest
}) {
  const offset = offsets[direction] ?? offsets.up

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
