import dragonSolid from '@/assets/brand/acc-dragon-solid.webp'

interface ReliefProps {
  /** Tailwind positioning/size classes for the relief block. */
  readonly className?: string
  /** 0–1. Carved, not printed — this stays very low. */
  readonly opacity?: number
  readonly flip?: boolean
  /** 'stone' cuts into a light ground, 'board' into a dark one. */
  readonly surface?: 'stone' | 'board'
}

/** The dragon carved into a surface.
 *
 *  Two offset layers make it read as cut rather than printed: the mark itself
 *  sits in the surface's own shadow, and a one-pixel lit lip falls below it,
 *  the way light catches the lower edge of an incision. Recolouring happens
 *  through `currentColor` — never through inversion, hue-rotation, or a blend
 *  mode, which is what turned the mark cyan on the previous site. */
export default function Relief({
  className = '',
  opacity = 0.055,
  flip = false,
  surface = 'stone',
}: ReliefProps) {
  return (
    <div
      aria-hidden="true"
      className={`relief absolute${surface === 'board' ? ' on-board-surface' : ''} ${className}`}
      style={{
        // @ts-expect-error -- custom property consumed by the .relief rule
        '--relief-src': `url(${dragonSolid})`,
        opacity,
        transform: flip ? 'scaleX(-1)' : undefined,
        aspectRatio: '774 / 476',
      }}
    />
  )
}
