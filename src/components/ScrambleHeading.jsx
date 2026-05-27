import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useScramble } from '../hooks/useScramble'

/**
 * ScrambleHeading — fires the text-scramble animation when the heading
 * enters the viewport. Can also be triggered on hover.
 *
 * Usage:
 *   <ScrambleHeading text="Who I Am" className="..." tag="h2" />
 */
export default function ScrambleHeading({
  text,
  className = '',
  tag: Tag = 'h2',
  id,
  triggerOnce = true,
  hoverTrigger = false,
  speed = 35,
  reveal = 1,
}) {
  const { ref: scrambleRef, trigger } = useScramble(text, { speed, reveal })
  const triggered = useRef(false)

  const [viewRef, inView] = useInView({
    triggerOnce,
    threshold: 0.2,
  })

  // Trigger on scroll-into-view
  useEffect(() => {
    if (inView && (!triggerOnce || !triggered.current)) {
      triggered.current = true
      // Small delay so the heading is visible before scrambling
      const t = setTimeout(trigger, 80)
      return () => clearTimeout(t)
    }
  }, [inView, trigger, triggerOnce])

  return (
    <Tag
      ref={(node) => {
        viewRef(node)
        scrambleRef.current = node
      }}
      id={id}
      className={className}
      onMouseEnter={hoverTrigger ? trigger : undefined}
    >
      {text}
    </Tag>
  )
}
