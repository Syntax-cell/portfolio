export default function Footer({ className = '' }) {
  return (
    <footer className={`border-t border-white/5 py-8 ${className}`}>
      <p className="text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Pawan Veer Arya. Built with React, Tailwind
        &amp; Framer Motion.
      </p>
    </footer>
  )
}
