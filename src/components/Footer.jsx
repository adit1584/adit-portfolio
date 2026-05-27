export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 md:px-16 py-8 bg-[var(--bg-primary)]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[0.72rem] tracking-[0.1em] text-[var(--text-muted)]">
          Designed &amp; built by{' '}
          <span className="text-[var(--accent-gold)]">Adit Kolhe</span>
        </p>

        <p className="font-mono text-[0.72rem] tracking-[0.1em] text-[var(--text-muted)]">
          React + GSAP + Framer Motion — 2025
        </p>

        <a
          href="#hero"
          className="font-mono text-[0.72rem] tracking-[0.1em] text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors duration-300 uppercase"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          data-cursor="hover"
          aria-label="Back to top"
        >
          Back to Top ↑
        </a>
      </div>
    </footer>
  )
}
