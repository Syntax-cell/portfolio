import { useEffect, useRef, useState } from 'react'
import { useScroll, useSpring, motion } from 'framer-motion'

/**
 * A bold, living SVG "river" that spans the FULL document scroll height and
 * draws itself as the user scrolls.
 *
 * The path is authored in a readable design space (100 wide x 1000 tall) as an
 * array of cubic-bezier segments, then scaled at runtime to the real page size
 * in *pixels* (window.innerWidth x document scrollHeight). Because the SVG's
 * viewBox is set to those same pixel dimensions, 1 user unit == 1px, so the
 * 5px stroke and 10px glow blur are true pixels, and the path's vertical span
 * equals the document scroll height exactly.
 */

// Design space the segments below are authored in.
const DESIGN_W = 100
const DESIGN_H = 1000

// Start anchor.
const START = [0, 0]

// Each entry is one cubic bezier: [c1x, c1y, c2x, c2y, endX, endY].
// Alternating wide sweeps (edge-to-edge), sharp reversals, and tight wiggles.
// The path repeatedly touches x=0 and x=100 (the screen edges).
const SEGMENTS = [
  [60, 40, 100, 60, 100, 120], // wide sweep → right edge
  [100, 180, 20, 150, 0, 210], // sharp reversal → left edge
  [0, 250, 45, 235, 32, 300], // tight mid wiggle
  [16, 360, 100, 330, 100, 420], // wide sweep → right edge
  [100, 472, 52, 442, 44, 502], // sharp cut back
  [32, 542, 0, 520, 0, 582], // tight loop → left edge
  [0, 652, 92, 618, 100, 700], // wide sweep → right edge
  [100, 752, 28, 720, 24, 792], // sharp reversal
  [20, 842, 0, 820, 0, 882], // tight loop → left edge
  [0, 942, 82, 922, 100, 1000], // wide sweep → right edge, bottom
]

/** Build the pixel-space `d` string for the given page dimensions. */
function buildPathD(width, height) {
  const sx = width / DESIGN_W
  const sy = height / DESIGN_H
  const fx = (n) => (n * sx).toFixed(2)
  const fy = (n) => (n * sy).toFixed(2)

  let d = `M ${fx(START[0])} ${fy(START[1])}`
  for (const [c1x, c1y, c2x, c2y, ex, ey] of SEGMENTS) {
    d += ` C ${fx(c1x)} ${fy(c1y)}, ${fx(c2x)} ${fy(c2y)}, ${fx(ex)} ${fy(ey)}`
  }
  return d
}

/** Read the current viewport width and full document scroll height. */
function measurePage() {
  const width = window.innerWidth
  const height = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
  )
  return { width, height }
}

export default function ScrollPath() {
  const [dims, setDims] = useState(() =>
    typeof window === 'undefined' ? { width: 0, height: 0 } : measurePage(),
  )
  const coreRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.5,
  })

  // Keep dimensions in sync with the real, laid-out page (fonts, resize, etc.).
  useEffect(() => {
    const update = () => setDims(measurePage())
    update()
    window.addEventListener('resize', update)
    window.addEventListener('load', update)

    // Catch layout changes that don't fire resize (content/fonts reflow).
    const ro = new ResizeObserver(update)
    ro.observe(document.body)

    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('load', update)
      ro.disconnect()
    }
  }, [])

  const d = buildPathD(dims.width, dims.height)

  // Verification log: path total length vs. page scroll height.
  useEffect(() => {
    if (!coreRef.current || !dims.height) return
    const totalLength = coreRef.current.getTotalLength()
    const bbox = coreRef.current.getBBox()
    // eslint-disable-next-line no-console
    console.log(
      '[ScrollPath] path total length: %.1fpx | page scroll height: %dpx | path vertical span: %.1fpx',
      totalLength,
      dims.height,
      bbox.height,
    )
  }, [d, dims.height])

  const shared = {
    d,
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style: { pathLength },
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <svg
        className="h-full w-full"
        width={dims.width}
        height={dims.height}
        viewBox={`0 0 ${dims.width} ${dims.height}`}
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          {/* Vertical Electric-Orange gradient spanning the path's bbox */}
          <linearGradient id="riverGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FF7A00" />
            <stop offset="0.5" stopColor="#FF4500" />
            <stop offset="1" stopColor="#FF5A1A" />
          </linearGradient>

          {/* Strong soft glow for the blurred duplicate layer */}
          <filter
            id="riverGlow"
            x="-20%"
            y="-2%"
            width="140%"
            height="104%"
          >
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* Layer 1 — blurred duplicate beneath, strong glow */}
        <motion.path
          {...shared}
          stroke="#FF4500"
          strokeWidth="10"
          strokeOpacity="0.6"
          filter="url(#riverGlow)"
        />

        {/* Layer 2 — crisp 5px core line on top */}
        <motion.path
          {...shared}
          ref={coreRef}
          stroke="url(#riverGradient)"
          strokeWidth="5"
          strokeOpacity="0.9"
        />
      </svg>
    </div>
  )
}
