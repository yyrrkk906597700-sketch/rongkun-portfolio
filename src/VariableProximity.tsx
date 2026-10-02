import { useEffect, useRef } from 'react'
import './VariableProximity.css'

export default function VariableProximity({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => { const node = ref.current; if (!node) return; const move = (event: MouseEvent) => { const rect = node.getBoundingClientRect(); const x = event.clientX - rect.left; const y = event.clientY - rect.top; node.querySelectorAll<HTMLElement>('[data-char]').forEach((char) => { const cr = char.getBoundingClientRect(); const dx = event.clientX - (cr.left + cr.width / 2); const dy = event.clientY - (cr.top + cr.height / 2); const distance = Math.hypot(dx, dy); const influence = Math.max(0, 1 - distance / 220); char.style.setProperty('--proximity', influence.toFixed(3)); char.style.setProperty('--px', `${(x - (cr.left - rect.left + cr.width / 2)) * influence * .05}px`); char.style.setProperty('--py', `${(y - (cr.top - rect.top + cr.height / 2)) * influence * .05}px`) }) }; const leave = () => node.querySelectorAll<HTMLElement>('[data-char]').forEach((char) => { char.style.setProperty('--proximity', '0'); char.style.setProperty('--px', '0px'); char.style.setProperty('--py', '0px') }); node.addEventListener('mousemove', move); node.addEventListener('mouseleave', leave); return () => { node.removeEventListener('mousemove', move); node.removeEventListener('mouseleave', leave) } }, [])
  return <span ref={ref} className="variable-proximity">{Array.from(text).map((char, index) => <span data-char key={index}>{char === ' ' ? '\u00a0' : char}</span>)}</span>
}
