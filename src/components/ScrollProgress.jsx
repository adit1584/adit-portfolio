import { useEffect, useRef } from 'react'

/**
 * ScrollProgress — slim gold bar at the very top of the viewport
 * that grows from 0 → 100% as user scrolls down the page.
 */
export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      bar.style.width = `${pct}%`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[99998] h-[2px] bg-transparent"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-0 origin-left"
        style={{
          background: 'linear-gradient(90deg, var(--accent-gold), rgba(201,168,76,0.6))',
          boxShadow: '0 0 10px rgba(201,168,76,0.6)',
          transition: 'width 0.05s linear',
        }}
      />
    </div>
  )
}
