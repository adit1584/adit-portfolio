import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Cursor — Custom magnetic cursor (ring + dot)
 * Hidden on touch devices via CSS (pointer: coarse)
 */
export default function Cursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    const pos = { x: 0, y: 0 }
    const mouse = { x: 0, y: 0 }

    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      gsap.set(dot, { x: mouse.x - 3, y: mouse.y - 3 })
    }

    window.addEventListener('mousemove', onMouseMove)

    // Lerp ring to cursor
    const ticker = () => {
      pos.x += (mouse.x - pos.x) * 0.12
      pos.y += (mouse.y - pos.y) * 0.12
      gsap.set(ring, { x: pos.x - 20, y: pos.y - 20 })
    }

    gsap.ticker.add(ticker)

    // Hover effect
    const hoverEls = document.querySelectorAll(
      'a, button, [data-cursor="hover"], .skill-pill, .cert-card, .filter-btn'
    )

    const onEnter = () => ring.classList.add('hovered')
    const onLeave = () => ring.classList.remove('hovered')

    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // Click scale effect
    const onClick = () => {
      gsap.to(ring, { scale: 0.7, duration: 0.1, yoyo: true, repeat: 1 })
    }
    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
      gsap.ticker.remove(ticker)
      hoverEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none hidden md:block"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="cursor-dot pointer-events-none hidden md:block"
        aria-hidden="true"
      />
    </>
  )
}
