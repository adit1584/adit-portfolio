import { useEffect, useRef, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%<>[]{}|'

/**
 * useScramble — takes a ref pointing at a DOM element and scrambles its
 * text content through random chars before settling on the final string.
 *
 * @param {string} finalText  - The target text to reveal
 * @param {object} options
 *   @param {number} speed     - ms between frame ticks (default 40)
 *   @param {number} reveal    - chars revealed per tick (default 1)
 * @returns {{ ref, trigger }} - attach ref to element, call trigger() to animate
 */
export function useScramble(finalText, { speed = 40, reveal = 1 } = {}) {
  const elRef = useRef(null)
  const frameRef = useRef(null)
  const resolvedRef = useRef(0)

  const trigger = useCallback(() => {
    const el = elRef.current
    if (!el || !finalText) return

    clearInterval(frameRef.current)
    resolvedRef.current = 0

    frameRef.current = setInterval(() => {
      const resolved = resolvedRef.current
      if (resolved >= finalText.length) {
        el.textContent = finalText
        clearInterval(frameRef.current)
        return
      }

      const scrambled = finalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < resolved) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      el.textContent = scrambled
      resolvedRef.current += reveal
    }, speed)
  }, [finalText, speed, reveal])

  useEffect(() => {
    return () => clearInterval(frameRef.current)
  }, [])

  return { ref: elRef, trigger }
}
