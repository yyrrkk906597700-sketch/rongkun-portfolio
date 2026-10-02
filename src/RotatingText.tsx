import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import './RotatingText.css'

export default function RotatingText({ texts, interval = 2000 }: { texts: string[]; interval?: number }) {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  useEffect(() => { if (reduceMotion || texts.length < 2) return; const timer = window.setInterval(() => setIndex((value) => (value + 1) % texts.length), interval); return () => window.clearInterval(timer) }, [interval, texts.length, reduceMotion])
  if (reduceMotion) return <span>{texts.join(' · ')}</span>
  return <><span className="sr-only">{texts.join('，')}</span><span className="text-rotate" aria-hidden="true"><span key={index} className="text-rotate-line">{texts[index]}</span></span></>
}
