import './Beams.css'

type Props = { beamWidth?: number; beamHeight?: number; beamNumber?: number; lightColor?: string; beamColor?: string; backgroundColor?: string; speed?: number; noiseIntensity?: number; scale?: number; rotation?: number }

export default function Beams({ beamWidth = 2, beamHeight = 15, beamNumber = 12, lightColor = '#ffffff', beamColor = '#32116b', backgroundColor = '#0c0c0c', speed = 2, noiseIntensity = 1.75, scale = .2, rotation = 0 }: Props) {
  return <div className="beams-container" style={{ backgroundColor, ['--beam-color' as string]: beamColor, ['--light-color' as string]: lightColor, ['--beam-speed' as string]: `${Math.max(.5, 8 / speed)}s`, ['--beam-width' as string]: `${Math.max(8, beamWidth * 10)}px`, ['--beam-height' as string]: `${Math.max(70, beamHeight * 6)}%`, ['--beam-opacity' as string]: `${Math.min(1, .2 + noiseIntensity * .18)}`, ['--beam-scale' as string]: `${Math.max(.1, scale)}`, transform: `rotate(${rotation}deg)` }} aria-hidden="true">
    <div className="beams-glow" />
    <div className="beams-stack">{Array.from({ length: beamNumber }, (_, i) => <span key={i} style={{ ['--i' as string]: i }} />)}</div>
  </div>
}
