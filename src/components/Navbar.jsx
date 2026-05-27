import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Menu, X } from 'lucide-react'
import { socials } from '../data/portfolioData'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certs', href: '#certifications' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Slide nav down on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        yPercent: -100,
        duration: 0.8,
        delay: 1.5,
        ease: 'expo.out',
      })
    })
    return () => ctx.revert()
  }, [])

  // Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 h-[72px] transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border-b border-[var(--border)]'
            : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          className="font-display text-2xl tracking-widest text-[var(--text-primary)] relative group"
          aria-label="Adit Kolhe — home"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }}
        >
          AK
          <span className="text-[var(--accent-gold)]">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10" role="list">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
                className="font-mono text-xs tracking-widest text-[var(--text-secondary)] uppercase relative pb-[2px] group hover:text-[var(--text-primary)] transition-colors duration-300"
                data-cursor="hover"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--accent-gold)] transition-all duration-400 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
              className="font-mono text-xs tracking-widest text-[var(--accent-gold)] uppercase border border-[var(--border-hover)] px-5 py-2 rounded-sm hover:bg-[var(--accent-gold)] hover:text-[var(--bg-primary)] transition-all duration-300"
              data-cursor="hover"
            >
              Let's Talk
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden text-[var(--text-primary)] p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[rgba(10,10,10,0.97)] backdrop-blur-2xl flex flex-col items-center justify-center gap-10"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
              className="font-display text-5xl tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-300"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
            className="font-display text-5xl tracking-widest text-[var(--accent-gold)]"
          >
            Contact
          </a>
        </div>
      )}
    </>
  )
}
