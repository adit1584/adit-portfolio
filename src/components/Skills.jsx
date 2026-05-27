import { motion } from 'framer-motion'
import { skills, marqueeItems } from '../data/portfolioData'
import ScrambleHeading from './ScrambleHeading'

const pillVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 },
  }),
}

// Double items for seamless marquee loop
const marqueeDouble = [...marqueeItems, ...marqueeItems]

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-32 px-6 md:px-16 overflow-hidden"
      aria-labelledby="skills-heading"
    >
      <div className="section-label">02 — Skills</div>
      <ScrambleHeading
        text="The Toolkit"
        id="skills-heading"
        tag="h2"
        className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-none tracking-tight text-[var(--text-primary)] mb-16"
        speed={28}
      />

      {/* Marquee row 1 — scroll left */}
      <div className="relative overflow-hidden mb-4 marquee-pause" aria-hidden="true">
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }}
        />
        <div className="flex gap-0 marquee-track marquee-left" style={{ width: 'max-content' }}>
          {marqueeDouble.map((item, i) => (
            <div
              key={`l1-${i}`}
              className="flex items-center gap-2 px-7 py-3 border-r border-[var(--border)] font-mono text-[0.75rem] text-[var(--text-muted)] tracking-widest whitespace-nowrap hover:text-[var(--accent-gold)] transition-colors duration-300"
            >
              <span className="w-1 h-1 rounded-full bg-[var(--accent-gold)] opacity-50" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Marquee row 2 — scroll right */}
      <div className="relative overflow-hidden mb-20 marquee-pause" aria-hidden="true">
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }}
        />
        <div
          className="flex gap-0 marquee-track marquee-right"
          style={{ width: 'max-content' }}
          aria-hidden="true"
        >
          {[...marqueeDouble].reverse().map((item, i) => (
            <div
              key={`l2-${i}`}
              className="flex items-center gap-2 px-7 py-3 border-r border-[var(--border)] font-mono text-[0.75rem] text-[var(--text-muted)] tracking-widest whitespace-nowrap hover:text-[var(--accent-gold)] transition-colors duration-300"
            >
              <span className="w-1 h-1 rounded-full bg-[var(--accent-gold)] opacity-30" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Categorised pill grid */}
      <div className="flex flex-col gap-12">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-mono text-[0.68rem] tracking-[0.2em] text-[var(--text-muted)] uppercase mb-5">
              {category}
            </h3>
            <div
              className="flex flex-wrap gap-3"
              role="list"
              aria-label={`${category} skills`}
            >
              {items.map((item, i) => (
                <motion.span
                  key={item}
                  className="skill-pill px-5 py-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-full font-mono text-[0.78rem] text-[var(--text-secondary)] tracking-[0.06em] cursor-default"
                  role="listitem"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0 }}
                  variants={pillVariants}
                  whileHover={{
                    y: -3,
                    borderColor: 'rgba(201, 168, 76, 0.4)',
                    color: '#C9A84C',
                    backgroundColor: 'rgba(201, 168, 76, 0.08)',
                    boxShadow: '0 8px 24px rgba(201, 168, 76, 0.1)',
                    transition: { duration: 0.2 },
                  }}
                  data-cursor="hover"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
