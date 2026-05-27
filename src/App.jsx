import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Toaster } from 'react-hot-toast'

import { useLenis } from './hooks/useLenis'
import { useScrollSkew } from './hooks/useScrollSkew'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useLenis()
  const wipeRef = useRef(null)
  const skewRef = useRef(null)
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Apply Locomotive-style scroll skewing
  if (!isReducedMotion) {
    useScrollSkew(skewRef, 2.5, 0.08)
  }

  // Gold wipe overlay on initial load
  useEffect(() => {
    if (isReducedMotion) {
      if (wipeRef.current) wipeRef.current.style.display = 'none'
      return
    }
    const ctx = gsap.context(() => {
      gsap.to(wipeRef.current, {
        scaleX: 0,
        duration: 0.6,
        ease: 'expo.inOut',
        delay: 0.1,
        transformOrigin: 'right',
        onComplete: () => {
          if (wipeRef.current) wipeRef.current.style.display = 'none'
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Gold wipe intro overlay */}
      <div ref={wipeRef} className="wipe-overlay" aria-hidden="true" />

      {/* Noise grain */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Toast notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#161616',
            color: '#F5F5F0',
            border: '1px solid #C9A84C',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.78rem',
            borderRadius: '6px',
          },
          iconTheme: { primary: '#C9A84C', secondary: '#0a0a0a' },
        }}
      />

      {/* Custom cursor */}
      <Cursor />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main ref={skewRef} style={{ willChange: 'transform' }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
