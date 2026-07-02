import useLenis from './hooks/useLenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollPath from './components/ScrollPath'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'

export default function App() {
  // Enable Lenis smooth scrolling for the whole app.
  useLenis()

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-neutral-200">
      {/* Scroll-driven self-drawing SVG river (ambient background, z-0) */}
      <ScrollPath />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer className="relative z-10" />
    </div>
  )
}
