import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import toast from 'react-hot-toast'
import { Copy } from 'lucide-react'
import { socials } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ["LET'S", 'BUILD', 'SOMETHING.']

// Inline SVG social icons (brand icons removed from lucide-react v1.x)
const IconGithub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const IconLinkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.163S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const socialLinks = [
  { href: socials.github, label: 'GitHub', icon: <IconGithub /> },
  { href: socials.linkedin, label: 'LinkedIn', icon: <IconLinkedin /> },
  { href: socials.instagram, label: 'Instagram', icon: <IconInstagram /> },
]

export default function Contact() {
  const sectionRef = useRef(null)

  // Word reveal animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.contact-word', {
        scrollTrigger: {
          trigger: '.contact-title',
          start: 'top 75%',
        },
        yPercent: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'expo.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleCopyEmail = () => {
    const email = socials.email
    const showToast = () =>
      toast.success('Email copied!', {
        style: {
          background: '#161616',
          color: '#F5F5F0',
          border: '1px solid #C9A84C',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.78rem',
          borderRadius: '6px',
        },
        iconTheme: { primary: '#C9A84C', secondary: '#0a0a0a' },
      })

    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(showToast).catch(() => {
        fallbackCopy(email)
        showToast()
      })
    } else {
      fallbackCopy(email)
      showToast()
    }
  }

  const fallbackCopy = (text) => {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-40 px-6 md:px-16 bg-[var(--bg-secondary)] text-center"
      aria-labelledby="contact-heading"
    >
      <div
        className="section-label mb-6"
        style={{ justifyContent: 'center' }}
      >
        05 — Contact
      </div>

      {/* Headline with word-by-word reveal */}
      <h2
        id="contact-heading"
        className="contact-title font-display leading-none tracking-tight text-[var(--text-primary)] mb-10"
        style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
      >
        {WORDS.map((word, i) => (
          <span
            key={word}
            style={{ display: 'inline-block', overflow: 'hidden', margin: '0 0.15em' }}
            aria-hidden="true"
          >
            <span
              className="contact-word"
              style={{
                display: 'inline-block',
                transform: 'translateY(100%)',
                color: i === 2 ? 'var(--accent-gold)' : 'var(--text-primary)',
              }}
            >
              {word}
            </span>
          </span>
        ))}
        <span className="sr-only">Let's Build Something.</span>
      </h2>

      <p className="text-lg md:text-xl text-[var(--text-secondary)] font-light max-w-lg mx-auto mb-14 leading-relaxed">
        Got a project idea, internship opportunity, or open-source collaboration? I'm all ears.
      </p>

      {/* Email copy button */}
      <div className="flex flex-col items-center gap-3 mb-14">
        <button
          onClick={handleCopyEmail}
          className="group inline-flex items-center gap-4 px-8 py-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl font-mono text-[var(--text-primary)] tracking-[0.04em]"
          style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
            transition: 'border-color 0.3s, color 0.3s',
          }}
          aria-label="Click to copy email address aditkolhe4@gmail.com"
          data-cursor="hover"
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.color = 'var(--accent-gold)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = '' }}
        >
          <span>{socials.email}</span>
          <div
            className="w-8 h-8 flex items-center justify-center border border-[var(--border)] rounded"
            style={{ transition: 'border-color 0.3s, background 0.3s, color 0.3s' }}
          >
            <Copy size={13} />
          </div>
        </button>
        <span className="font-mono text-[0.65rem] tracking-[0.2em] text-[var(--text-muted)] uppercase">
          Click to copy
        </span>
      </div>

      {/* Social links */}
      <div className="flex flex-wrap gap-4 justify-center">
        {socialLinks.map(({ href, label, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-md font-mono text-[0.72rem] tracking-[0.1em] text-[var(--text-secondary)] uppercase"
            style={{ transition: 'border-color 0.3s, color 0.3s, background 0.3s, transform 0.3s' }}
            aria-label={label}
            data-cursor="hover"
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.color = 'var(--accent-gold)'; e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = ''; e.currentTarget.style.background = ''; e.currentTarget.style.transform = '' }}
          >
            {icon}
            {label}
          </a>
        ))}
      </div>
    </section>
  )
}
