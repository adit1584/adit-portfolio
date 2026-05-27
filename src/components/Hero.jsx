import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ArrowDown } from 'lucide-react'
import { socials } from '../data/portfolioData'

const ROLES = ['Front-end Developer', 'ML Engineer', 'Hackathon Builder', 'Data Scientist']
const NAME = 'ADIT KOLHE'
const NAME_LETTERS = NAME.split('')

// ─── Brand SVGs ──────────────────────────────────────────────
const IconGithub = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)
const IconLinkedin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)
const IconInstagram = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.163S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)
const IconCredly = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0a12 12 0 100 24A12 12 0 0012 0zm0 4.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm0 16a8.5 8.5 0 01-6.5-3.03C6.91 15.73 9.3 14.5 12 14.5s5.09 1.23 6.5 2.97A8.5 8.5 0 0112 20.5z" />
  </svg>
)

// ─── Magnetic Button ─────────────────────────────────────────
function MagneticButton({ children, className, href, onClick, style, onMouseEnter, onMouseLeave, 'aria-label': ariaLabel }) {
  const btnRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(btn, {
      x: x * 0.28,
      y: y * 0.28,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseLeave = useCallback((e) => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    onMouseLeave?.(e)
  }, [onMouseLeave])

  const El = href ? 'a' : 'button'

  return (
    <El
      ref={btnRef}
      href={href}
      onClick={onClick}
      className={className}
      style={style}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="hover"
    >
      {children}
    </El>
  )
}

// ─── Hero Component ───────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef(null)
  const typewriterRef = useRef(null)
  const particlesRef = useRef(null)
  const spotlightRef = useRef(null)
  const nameRef = useRef(null)
  const roleIndex = useRef(0)
  const charIndex = useRef(0)
  const isDeleting = useRef(false)
  const isPaused = useRef(false)

  // ── GSAP Entrance ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.to('.hero-letter', { y: '0%', stagger: 0.04, duration: 1, ease: 'expo.out' })
      tl.from('.hero-role', { opacity: 0, y: 30, duration: 0.8 }, '-=0.4')
      tl.from('.hero-desc', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
      tl.from('.hero-cta', { opacity: 0, y: 20, stagger: 0.1, duration: 0.7 }, '-=0.5')
      tl.from('.hero-social', { opacity: 0, x: -20, stagger: 0.08, duration: 0.6 }, '-=0.6')
      tl.from('.hero-scroll', { opacity: 0, duration: 0.5 }, '-=0.3')
      tl.from('.hero-badge', { opacity: 0, y: -10, duration: 0.5 }, '<')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // ── Periodic glitch on name ──
  useEffect(() => {
    const el = nameRef.current
    if (!el) return
    let glitchTimer

    const doGlitch = () => {
      el.classList.add('glitch-active')
      setTimeout(() => el.classList.remove('glitch-active'), 350)
      glitchTimer = setTimeout(doGlitch, Math.random() * 4000 + 4000)
    }

    // First glitch after entrance
    glitchTimer = setTimeout(doGlitch, 3500)
    return () => clearTimeout(glitchTimer)
  }, [])

  // ── Cursor spotlight ──
  useEffect(() => {
    const section = sectionRef.current
    const spotlight = spotlightRef.current
    if (!section || !spotlight) return

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      gsap.to(spotlight, {
        '--sx': `${x}px`,
        '--sy': `${y}px`,
        duration: 0.8,
        ease: 'power2.out',
      })
    }

    section.addEventListener('mousemove', onMouseMove)
    return () => section.removeEventListener('mousemove', onMouseMove)
  }, [])

  // ── Typewriter ──
  useEffect(() => {
    const el = typewriterRef.current
    if (!el) return
    let timer

    function type() {
      if (isPaused.current) return
      const current = ROLES[roleIndex.current]
      if (isDeleting.current) {
        el.textContent = current.substring(0, charIndex.current - 1)
        charIndex.current--
        if (charIndex.current === 0) {
          isDeleting.current = false
          roleIndex.current = (roleIndex.current + 1) % ROLES.length
          timer = setTimeout(type, 400)
          return
        }
        timer = setTimeout(type, 45)
      } else {
        el.textContent = current.substring(0, charIndex.current + 1)
        charIndex.current++
        if (charIndex.current === current.length) {
          isPaused.current = true
          timer = setTimeout(() => {
            isPaused.current = false
            isDeleting.current = true
            type()
          }, 2200)
          return
        }
        timer = setTimeout(type, 75)
      }
    }

    const startDelay = setTimeout(() => type(), 1800)
    return () => { clearTimeout(timer); clearTimeout(startDelay) }
  }, [])

  // ── Floating particles ──
  useEffect(() => {
    const container = particlesRef.current
    if (!container) return
    const particles = []

    for (let i = 0; i < 22; i++) {
      const el = document.createElement('div')
      const size = Math.random() * 3 + 1.5
      el.className = 'particle'
      el.style.cssText = `width:${size}px;height:${size}px;opacity:${Math.random() * 0.35 + 0.05};left:${Math.random() * 100}%;top:${Math.random() * 100}%;`
      container.appendChild(el)
      particles.push(el)
      gsap.to(el, {
        x: `${(Math.random() - 0.5) * 120}`,
        y: `${(Math.random() - 0.5) * 120}`,
        duration: Math.random() * 12 + 8,
        repeat: -1, yoyo: true, ease: 'sine.inOut', delay: Math.random() * 5,
      })
    }

    return () => particles.forEach((p) => { gsap.killTweensOf(p); p.remove() })
  }, [])

  const socialLinks = [
    { href: socials.github, label: 'GitHub', icon: <IconGithub /> },
    { href: socials.linkedin, label: 'LinkedIn', icon: <IconLinkedin /> },
    { href: socials.instagram, label: 'Instagram', icon: <IconInstagram /> },
    { href: socials.credly, label: 'Credly', icon: <IconCredly /> },
  ]

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center pt-[72px] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Cursor spotlight layer */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          '--sx': '50%',
          '--sy': '40%',
          background: 'radial-gradient(600px circle at var(--sx) var(--sy), rgba(201,168,76,0.07) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Grid bg */}
      <div className="hero-grid-bg" aria-hidden="true" />

      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0" aria-hidden="true" />

      {/* Static radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 65% 30%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Available badge */}
      <div
        className="hero-badge absolute top-[90px] right-6 md:right-16 flex items-center gap-2 px-3 py-1.5 border border-[var(--border-hover)] rounded-full bg-[var(--accent-glow)]"
        role="status"
      >
        <span className="status-dot" />
        <span className="font-mono text-[0.65rem] tracking-[0.15em] text-[var(--accent-gold)] uppercase">
          Available for Internships
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-6 md:px-16 max-w-[1400px]">

        {/* NAME — glitch container */}
        <h1
          id="hero-heading"
          ref={nameRef}
          className="hero-name-glitch font-display leading-[0.88] mb-8 select-none"
          style={{ fontSize: 'clamp(4.5rem, 14vw, 13rem)', letterSpacing: '-0.02em' }}
          aria-label="Adit Kolhe"
          data-text="ADIT KOLHE"
        >
          {NAME_LETTERS.map((letter, i) => (
            <span
              key={i}
              className="hero-letter-wrapper"
              aria-hidden="true"
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                lineHeight: '0.95',
                ...(letter === ' ' ? { width: '0.25em' } : {}),
              }}
            >
              {letter !== ' ' && (
                <span
                  className="hero-letter inline-block"
                  style={{ transform: 'translateY(110%)' }}
                >
                  {letter}
                </span>
              )}
            </span>
          ))}
        </h1>

        {/* Role typewriter */}
        <div className="hero-role flex items-center gap-4 mb-6">
          <span className="w-10 h-[1px] flex-shrink-0 bg-[var(--text-muted)]" aria-hidden="true" />
          <p className="font-body text-lg md:text-2xl text-[var(--text-secondary)] font-light">
            <span ref={typewriterRef} className="text-[var(--text-primary)] font-medium" aria-live="polite">
              Front-end Developer
            </span>
            <span
              className="inline-block w-[2px] h-[1.1em] bg-[var(--accent-gold)] ml-[2px] align-middle"
              style={{ animation: 'blink 1s step-end infinite' }}
              aria-hidden="true"
            />
          </p>
        </div>

        {/* Description */}
        <p className="hero-desc max-w-xl text-base md:text-lg text-[var(--text-secondary)] font-light leading-relaxed mb-12">
          CS student at LNCT Bhopal · TIT Srijan National Hackathon 2026 Finalist · Building at the intersection of web and machine intelligence.
        </p>

        {/* CTAs — magnetic */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <MagneticButton
            href="#projects"
            className="hero-cta group inline-flex items-center justify-center gap-3 px-9 py-4 bg-[var(--accent-gold)] text-[var(--bg-primary)] font-mono text-xs tracking-[0.12em] uppercase font-medium relative overflow-hidden"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            <span className="absolute inset-0 bg-black/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" aria-hidden="true" />
            <span className="relative z-10">View Work</span>
            <ArrowDown size={14} className="relative z-10 -rotate-90" aria-hidden="true" />
          </MagneticButton>

          <MagneticButton
            href="#"
            className="hero-cta group inline-flex items-center justify-center gap-3 px-9 py-4 border border-[var(--border)] text-[var(--text-primary)] font-mono text-xs tracking-[0.12em] uppercase font-light relative overflow-hidden"
            aria-label="Download Resume PDF"
          >
            <span className="absolute inset-0 bg-[var(--accent-gold)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" aria-hidden="true" />
            <span className="relative z-10 group-hover:text-[var(--bg-primary)] transition-colors duration-300">Download CV</span>
          </MagneticButton>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[0.65rem] tracking-[0.25em] text-[var(--text-muted)] uppercase">Find me</span>
          <div className="flex gap-3">
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                className="hero-social w-10 h-10 border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] rounded-sm transition-all duration-300 hover:border-[rgba(201,168,76,0.4)] hover:text-[var(--accent-gold)] hover:bg-[rgba(201,168,76,0.08)] hover:-translate-y-[3px]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} profile`}
                data-cursor="hover"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 right-6 md:right-16 flex flex-col items-center gap-3" aria-hidden="true">
        <div className="w-[1px] h-16" style={{ background: 'linear-gradient(to bottom, var(--accent-gold), transparent)', animation: 'scroll-pulse 2s ease-in-out infinite' }} />
        <span className="font-mono text-[0.6rem] tracking-[0.25em] text-[var(--text-muted)] uppercase" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
      </div>

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }

        /* ── Glitch effect ── */
        .hero-name-glitch { position: relative; }

        .hero-name-glitch::before,
        .hero-name-glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          pointer-events: none;
          opacity: 0;
        }

        .hero-name-glitch.glitch-active::before {
          opacity: 1;
          color: #ff2d55;
          animation: glitch-before 0.35s steps(2) forwards;
          clip-path: polygon(0 15%, 100% 15%, 100% 40%, 0 40%);
        }

        .hero-name-glitch.glitch-active::after {
          opacity: 1;
          color: #00f5ff;
          animation: glitch-after 0.35s steps(2) forwards;
          clip-path: polygon(0 60%, 100% 60%, 100% 85%, 0 85%);
        }

        @keyframes glitch-before {
          0%   { transform: translateX(-6px) skewX(-2deg); }
          20%  { transform: translateX(4px)  skewX(1deg); }
          40%  { transform: translateX(-3px) skewX(-1deg); }
          60%  { transform: translateX(6px)  skewX(2deg); }
          80%  { transform: translateX(-2px) skewX(0deg); }
          100% { transform: translateX(0px); opacity: 0; }
        }

        @keyframes glitch-after {
          0%   { transform: translateX(6px)  skewX(2deg); }
          20%  { transform: translateX(-4px) skewX(-1deg); }
          40%  { transform: translateX(3px)  skewX(1deg); }
          60%  { transform: translateX(-6px) skewX(-2deg); }
          80%  { transform: translateX(2px)  skewX(0deg); }
          100% { transform: translateX(0px); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
