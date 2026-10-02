import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function BlurText({ text = '', delay = 80, className = '', direction = 'top', stepDuration = .35, onAnimationComplete }: { text?: string; delay?: number; className?: string; direction?: 'top' | 'bottom'; stepDuration?: number; onAnimationComplete?: () => void }) {
  const [inView, setInView] = useState(false); const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => { const node = ref.current; if (!node) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(node) } }, { threshold: .1 }); observer.observe(node); return () => observer.disconnect() }, [])
  const from = useMemo(() => ({ filter: 'blur(10px)', opacity: 0, y: direction === 'top' ? -50 : 50 }), [direction])
  return <span ref={ref} className={`blur-text ${className}`} aria-label={text}>{text.split('').map((char, index, chars) => <motion.span key={`${char}-${index}`} className="blur-text-char" initial={from} animate={inView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : from} transition={{ duration: stepDuration, delay: index * delay / 1000, ease: [0.25, .1, .25, 1] }} onAnimationComplete={index === chars.length - 1 ? onAnimationComplete : undefined}>{char === ' ' ? '\u00a0' : char}</motion.span>)}</span>
}
