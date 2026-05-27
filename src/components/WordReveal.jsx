import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * WordReveal — Renders a paragraph where each word lights up from muted
 * to bright as you scroll through it (scrub-based).
 * Supports **bold** words (highlighted white) and gold:words (highlighted gold).
 */
export default function WordReveal({ text, className = '' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const words = container.querySelectorAll('.word-reveal-word')
    if (!words.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.1, color: 'rgba(245,245,240,0.12)' },
        {
          opacity: 1,
          color: (index, target) => {
            if (target.classList.contains('word-gold')) {
              return '#C9A84C' // Gold accent
            } else if (target.classList.contains('word-bold')) {
              return '#F5F5F0' // Pure primary white
            } else {
              return 'rgba(245,245,240,0.8)' // Standard text color
            }
          },
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            end: 'bottom 50%',
            scrub: 0.8,
          },
        }
      )
    }, container)

    return () => ctx.revert()
  }, [text])

  // Helper to parse formatting markers
  const parseWord = (rawWord) => {
    let isBold = false
    let isGold = false
    let cleanWord = rawWord

    if (cleanWord.includes('**')) {
      isBold = true
      cleanWord = cleanWord.replace(/\*\*/g, '')
    }
    if (cleanWord.includes('gold:')) {
      isGold = true
      cleanWord = cleanWord.replace(/gold:/g, '')
    }

    return { cleanWord, isBold, isGold }
  }

  return (
    <p ref={containerRef} className={className} aria-label={text}>
      {text.split(' ').map((word, i) => {
        const { cleanWord, isBold, isGold } = parseWord(word)
        return (
          <span
            key={i}
            className={`word-reveal-word inline-block mr-[0.3em] transition-all duration-300 ${
              isBold ? 'word-bold font-medium' : ''
            } ${isGold ? 'word-gold font-medium' : ''}`}
            aria-hidden="true"
            style={{ opacity: 0.1, color: 'rgba(245,245,240,0.12)', willChange: 'opacity, color' }}
          >
            {cleanWord}
          </span>
        )
      })}
    </p>
  )
}
