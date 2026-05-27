import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/portfolioData'
import ScrambleHeading from './ScrambleHeading'

gsap.registerPlugin(ScrollTrigger)

const FILTERS = ['All', 'Hackathon', 'AI', 'ML', 'Frontend', 'Python', 'GDG']

const CARD_ICONS = { 1: '🚆', 2: '🤖', 3: '🏏', 4: '📈', 5: '🛡️', 6: '⚡', 7: '🎯', 8: '🔐' }

function matchesFilter(project, filter) {
  if (filter === 'All') return true
  return project.tags.some((t) => t.toLowerCase() === filter.toLowerCase())
}

// ── 3D Tilt Card ─────────────────────────────────────────────────
function TiltCard({ children, className, ...props }) {
  const cardRef = useRef(null)

  const onMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -12   // max ±12deg
    const rotY = ((x - cx) / cx) * 12

    // Update CSS vars for the shine
    card.style.setProperty('--mx', `${(x / rect.width) * 100}%`)
    card.style.setProperty('--my', `${(y / rect.height) * 100}%`)

    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      transformPerspective: 800,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [])

  const onMouseLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)',
    })
  }, [])

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      {...props}
    >
      {/* Dynamic shine layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        style={{
          background: 'radial-gradient(180px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}

// ── Projects Component ────────────────────────────────────────────
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const sectionRef = useRef(null)

  const featured = projects.find((p) => p.featured)
  const gridProjects = projects.filter((p) => !p.featured)
  const filteredGrid = gridProjects.filter((p) => matchesFilter(p, activeFilter))
  const showFeatured = matchesFilter(featured, activeFilter)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 px-6 md:px-16 bg-[var(--bg-secondary)]"
      aria-labelledby="projects-heading"
    >
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <div className="section-label">03 — Projects</div>
          <ScrambleHeading
            text="Selected Work"
            id="projects-heading"
            tag="h2"
            className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-none tracking-tight text-[var(--text-primary)]"
            speed={28}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`filter-btn px-5 py-2 border font-mono text-[0.7rem] tracking-[0.1em] uppercase rounded-full transition-all duration-300 ${
                activeFilter === f
                  ? 'filter-active'
                  : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--accent-gold)]'
              }`}
              aria-pressed={activeFilter === f}
              data-cursor="hover"
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Featured card */}
      <AnimatePresence mode="wait">
        {showFeatured && (
          <motion.article
            key="featured"
            className="group relative border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--bg-card)] mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            aria-labelledby="feat-title"
            style={{ '--mx': '50%', '--my': '50%' }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
              e.currentTarget.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
            }}
            whileHover={{ borderColor: 'rgba(201,168,76,0.4)' }}
          >
            {/* Dynamic spotlight on hover */}
            <div
              className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(400px circle at var(--mx) var(--my), rgba(201,168,76,0.06) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[380px]">
              {/* Visual side */}
              <div
                className="relative flex items-center justify-center p-10 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.02) 50%, transparent 100%)' }}
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(201,168,76,0.02) 40px, rgba(201,168,76,0.02) 41px)' }}
                />
                <div className="absolute top-5 left-5 bg-[var(--accent-gold)] text-[var(--bg-primary)] font-mono text-[0.65rem] tracking-[0.15em] uppercase px-3 py-1.5 rounded font-semibold">
                  Featured · TIT Srijan 2026
                </div>
                <motion.span
                  className="text-[80px] relative z-10 drop-shadow-2xl select-none"
                  role="img" aria-label="Train emoji"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🚆
                </motion.span>
              </div>

              {/* Content side */}
              <div className="flex flex-col justify-between p-10 md:p-14">
                <div>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.06)] font-mono text-[0.68rem] text-[#4ade80] mb-5"
                    role="status"
                  >
                    <span>↑</span>{featured.achievement}
                  </div>

                  <h3
                    id="feat-title"
                    className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-tight text-[var(--text-primary)] mb-4"
                  >
                    {featured.title}
                  </h3>

                  <p className="text-[var(--text-secondary)] text-base leading-relaxed font-light mb-6 max-w-sm">
                    {featured.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {featured.tech.map((t) => (
                      <span key={t} className="px-3 py-1 bg-[rgba(255,255,255,0.04)] border border-[var(--border)] rounded font-mono text-[0.68rem] text-[var(--text-muted)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={featured.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[0.75rem] tracking-[0.1em] text-[var(--accent-gold)] uppercase group/link w-fit relative"
                  aria-label="View on GitHub"
                >
                  View on GitHub
                  <ExternalLink size={13} className="transition-transform duration-300 group-hover/link:translate-x-[3px] group-hover/link:-translate-y-[3px]" />
                  <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-[var(--accent-gold)] group-hover/link:w-full transition-all duration-400" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.article>
        )}
      </AnimatePresence>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredGrid.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard
                className="project-card-hover group relative bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-8 flex flex-col gap-5 overflow-hidden h-full cursor-pointer transition-colors duration-400 hover:border-[var(--border-hover)]"
                aria-labelledby={`proj-title-${project.id}`}
                data-cursor="hover"
              >
                {/* Radial glow on hover */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-0"
                  style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.06), transparent)' }}
                  aria-hidden="true"
                />

                {/* Index number */}
                <span className="font-mono text-[0.65rem] text-[var(--text-muted)] tracking-[0.2em] absolute top-6 right-6 z-10" aria-hidden="true">
                  {String(project.id).padStart(2, '0')}
                </span>

                {/* Icon — float up on hover */}
                <div className="text-3xl transition-transform duration-400 group-hover:-translate-y-1 relative z-10" aria-hidden="true">
                  {CARD_ICONS[project.id]}
                </div>

                <div className="relative z-10">
                  <h3
                    id={`proj-title-${project.id}`}
                    className="font-display text-[1.5rem] tracking-tight text-[var(--text-primary)] mb-1"
                  >
                    {project.title}
                  </h3>
                  <div className="font-mono text-[0.68rem] text-[var(--accent-gold)] tracking-widest uppercase mb-3">
                    {project.subtitle}
                  </div>
                  <p className="text-[0.88rem] text-[var(--text-secondary)] leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                {project.achievement && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.06)] font-mono text-[0.65rem] text-[#4ade80] w-fit relative z-10">
                    ↑ {project.achievement}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 relative z-10">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="px-3 py-1 bg-[rgba(255,255,255,0.04)] border border-[var(--border)] rounded font-mono text-[0.68rem] text-[var(--text-muted)]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Reveal link arrow */}
                <div
                  className="flex items-center gap-2 font-mono text-[0.7rem] text-[var(--accent-gold)] tracking-[0.1em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 mt-auto relative z-10"
                  aria-hidden="true"
                >
                  View on GitHub →
                </div>

                {/* Full-card link */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-30"
                  aria-label={`${project.title} on GitHub`}
                />
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
