import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ScrambleHeading from './ScrambleHeading'
import WordReveal from './WordReveal'

gsap.registerPlugin(ScrollTrigger)

// ── Stats: numeric value + suffix ──────────────────────────────
const stats = [
  { raw: 13, suffix: '+', label: 'Repositories' },
  { raw: 5,  suffix: '+', label: 'Certifications' },
  { raw: 92, suffix: '%', label: 'ML Accuracy' },
  { raw: 40, suffix: '%', label: 'UX Uplift' },
]

// ── Count-up hook ───────────────────────────────────────────────
function useCountUp(target, inView, duration = 1400) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, target, duration])

  return count
}

// ── Individual stat card ────────────────────────────────────────
function StatCard({ raw, suffix, label, inView, delay }) {
  const count = useCountUp(raw, inView, 1400)

  return (
    <motion.div
      className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-center relative overflow-hidden group cursor-default"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -6, borderColor: 'rgba(201,168,76,0.4)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
      data-cursor="hover"
    >
      {/* Gold bottom bar */}
      <span
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent-gold)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        aria-hidden="true"
      />
      {/* Radial glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,168,76,0.07), transparent)' }}
        aria-hidden="true"
      />
      <div
        className="font-display text-[clamp(2rem,4vw,3rem)] text-[var(--accent-gold)] leading-none mb-2 tabular-nums"
        aria-label={`${raw}${suffix}`}
      >
        {count}{suffix}
      </div>
      <div className="font-mono text-[0.68rem] tracking-[0.12em] text-[var(--text-muted)] uppercase">
        {label}
      </div>
    </motion.div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  const sectionRef = useRef(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // GSAP scroll reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.reveal'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0, y: 60, stagger: 0.12, duration: 1, ease: 'expo.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 px-6 md:px-16 bg-[var(--bg-secondary)]"
      aria-labelledby="about-heading"
    >
      <div className="section-label reveal">01 — About</div>

      <ScrambleHeading
        text="Who I Am"
        id="about-heading"
        className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-none tracking-tight text-[var(--text-primary)] mb-16 reveal"
        speed={30}
        reveal={1}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">

        {/* Left column */}
        <div className="flex flex-col gap-8">
          {/* Avatar */}
          <div className="reveal flex items-start gap-6">
            <div className="relative flex-shrink-0">
              <div
                className="w-[160px] h-[160px] flex items-center justify-center bg-[var(--bg-card)] border border-[var(--border)] relative overflow-hidden rounded-2xl"
                style={{ boxShadow: 'inset 0 0 40px rgba(201,168,76,0.04)' }}
              >
                <div
                  className="absolute inset-[-1px] rounded-2xl"
                  style={{
                    background: 'linear-gradient(var(--bg-card), var(--bg-card)) padding-box, conic-gradient(from 0deg, var(--accent-gold), transparent 40%, transparent 60%, var(--accent-gold)) border-box',
                    border: '1px solid transparent',
                    animation: 'rotate-border 4s linear infinite',
                  }}
                  aria-hidden="true"
                />
                <span className="font-display text-5xl text-[var(--accent-gold)] tracking-widest relative z-10" aria-label="Initials AK">
                  AK
                </span>
              </div>
            </div>
            <div className="mt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-hover)] rounded-full bg-[var(--accent-glow)]" role="status">
                <span className="status-dot" aria-hidden="true" />
                <span className="font-mono text-[0.68rem] tracking-[0.1em] text-[var(--accent-gold)]">
                  Open to Internships 2025–26
                </span>
              </div>
              <p className="mt-3 font-mono text-[0.68rem] text-[var(--text-muted)] tracking-wider">Bhopal, MP · India</p>
            </div>
          </div>

          {/* Stats grid with count-up */}
          <div ref={ref} className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} inView={inView} delay={i * 0.1} />
            ))}
          </div>
        </div>

        {/* Right column */}
        <motion.div
          className="flex flex-col gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h3
            variants={itemVariants}
            className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-none text-[var(--text-primary)] tracking-tight"
          >
            Building With<span className="text-[var(--accent-gold)]"> Purpose</span>
          </motion.h3>

          <motion.blockquote
            variants={itemVariants}
            className="border-l-[3px] border-[var(--accent-gold)] pl-6 font-body text-xl md:text-2xl text-[var(--text-primary)] font-light italic leading-relaxed"
          >
            "Transforming complex problems into elegant digital solutions — at the intersection of web and machine intelligence."
          </motion.blockquote>

          <motion.div variants={itemVariants}>
            <WordReveal
              text="I'm **Adit Kolhe**, a Computer Science (Data Science) student at **LNCT Bhopal**, graduating in July 2027. I build across the full spectrum — from pixel-perfect React UIs to ML pipelines achieving gold:92% accuracy."
              className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-light"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <WordReveal
              text="A **TIT Srijan National Level Hackathon 2026 Finalist**, I shipped AI-powered tools and a responsive train management system that boosted user engagement by gold:40%. I also build at GDG Bhopal community events — currently diving deep into the MERN stack and DSA."
              className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-light"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h4 className="font-mono text-[0.68rem] tracking-[0.2em] text-[var(--text-muted)] uppercase">Education</h4>
            {[
              { title: 'B.Tech CSE — Data Science Specialisation', sub: 'Lakshmi Narain College of Technology, Bhopal · Graduating Jul 2027' },
              { title: 'Higher Secondary — PCM + PE', sub: 'St. Joseph Co-Ed Senior Secondary School, Bhopal · Apr 2023' },
            ].map(({ title, sub }) => (
              <div key={title} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-[var(--accent-gold)] mt-[6px] flex-shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-medium text-[var(--text-primary)] text-sm leading-snug">{title}</div>
                  <div className="font-mono text-[0.7rem] text-[var(--text-muted)] mt-1">{sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
