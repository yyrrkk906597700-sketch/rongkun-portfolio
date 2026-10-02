import type { CSSProperties, ReactNode } from 'react'

interface PaperCrumpleProps {
  src: string
  alt?: string
  backSrc?: string
  width?: number
  height?: number
  sceneHeight?: number
  imageFit?: 'cover' | 'contain'
  releaseBehavior?: 'restore' | 'stay' | 'creased'
  crumpleAmount?: number
  crumpleDuration?: number
  releaseDuration?: number
  foldCount?: number
  foldSharpness?: number
  wrinkleDepth?: number
  creaseStrength?: number
  paperColor?: string
  roughness?: number
  paperTexture?: number
  lightIntensity?: number
  lightAngle?: number
  shadow?: boolean
  shadowOpacity?: number
  draggable?: boolean
  dragRotation?: number
  dragRadius?: number
  returnToOrigin?: boolean
  rotation?: number
  seed?: number
  detail?: number
  disabled?: boolean
  onClick?: () => void
  actionLabel?: string
  resetKey?: number
  onStateChange?: (state: string) => void
  onError?: (error: Error) => void
  className?: string
  style?: CSSProperties
}

export default function PaperCrumple(props: PaperCrumpleProps): ReactNode
