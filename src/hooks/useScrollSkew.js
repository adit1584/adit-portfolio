import { useEffect } from 'react'
import gsap from 'gsap'

/**
 * useScrollSkew — attaches a GSAP ticker that reads scroll velocity
 * and applies a subtle skewY to the target element, creating the
 * rubber-band / breathing feel you see on Locomotive Scroll sites.
 *
 * @param {React.RefObject} targetRef   - Ref to the element to skew
 * @param {number}          maxSkew     - Maximum skew in degrees (default 3)
 * @param {number}          lerp        - Smoothing factor 0–1 (default 0.1)
 */
export function useScrollSkew(targetRef, maxSkew = 3, lerp = 0.1) {
  useEffect(() => {
    let lastScrollY = window.scrollY
    let currentSkew = 0

    const tick = () => {
      const scrollY = window.scrollY
      const velocity = scrollY - lastScrollY
      lastScrollY = scrollY

      // Lerp current skew toward velocity-based target
      const target = gsap.utils.clamp(-maxSkew, maxSkew, velocity * -0.06)
      currentSkew += (target - currentSkew) * lerp

      if (targetRef.current) {
        gsap.set(targetRef.current, { skewY: currentSkew })
      }
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [targetRef, maxSkew, lerp])
}
