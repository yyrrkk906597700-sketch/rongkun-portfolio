import './FoldText.css'
export default function FoldText({ text }: { text: string }) { return <span className="fold-text">{Array.from(text).map((char, index) => <span className="fold-text-segment" key={`${char}-${index}`} style={{ ['--fold-delay' as string]: `${index * 0.018}s` }}>{char === ' ' ? '\u00a0' : char}</span>)}</span> }
