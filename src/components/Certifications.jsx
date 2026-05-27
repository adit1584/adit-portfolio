import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { certifications, socials } from '../data/portfolioData'
import ScrambleHeading from './ScrambleHeading'

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
}

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative py-32 px-6 md:px-16 overflow-hidden"
      aria-labelledby="certs-heading"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="section-label">04 — Certifications</div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <ScrambleHeading
            text="Credentials"
            id="certs-heading"
            tag="h2"
            className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-none tracking-tight text-[var(--text-primary)]"
            speed={30}
          />
          <a
            href={socials.credly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-mono text-[0.75rem] tracking-[0.12em] text-[var(--accent-gold)] uppercase hover:gap-5 transition-all duration-300"
            aria-label="View all badges on Credly"
            data-cursor="hover"
          >
            View all on Credly
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Certificate cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {certifications.map((cert, i) => (
            <motion.article
              key={cert.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="group cert-card bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 flex flex-col gap-3 hover:border-[var(--border-hover)] hover:bg-[var(--bg-secondary)] hover:-translate-y-1 transition-all duration-400"
              data-cursor="hover"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[0.65rem] tracking-[0.15em] text-[var(--accent-gold)] uppercase">
                  {cert.issuer}
                </span>
                <div
                  className="w-9 h-9 flex items-center justify-center bg-[var(--accent-glow)] border border-[var(--border-hover)] rounded-md text-lg flex-shrink-0"
                  aria-hidden="true"
                >
                  {cert.emoji}
                </div>
              </div>

              <h3 className="text-[0.95rem] font-medium text-[var(--text-primary)] leading-snug">
                {cert.name}
              </h3>

              <span className="font-mono text-[0.68rem] text-[var(--text-muted)]">{cert.year}</span>

              {/* Gold bottom line on hover */}
              <div
                className="h-[1px] w-0 bg-[var(--accent-gold)] group-hover:w-full transition-all duration-500 mt-auto"
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
