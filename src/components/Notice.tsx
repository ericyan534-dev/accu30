import type { ReactNode } from 'react'

interface NoticeProps {
  readonly label: string
  readonly children: ReactNode
  readonly surface?: 'stone' | 'board'
}

/** A stated condition, set as a small plate. Used for the building's planned
 *  status and anything else the reader must not misread.
 *
 *  The vermillion lives in the rule, not the label. Red type on the dark board
 *  measures 3.14:1 at this size — under AA — and the rule carries the same
 *  signal without asking colour to do the contrast work. */
export default function Notice({ label, children, surface = 'stone' }: NoticeProps) {
  const labelColor = surface === 'stone' ? 'text-vermillion-ink' : 'text-on-board'
  const body = surface === 'stone' ? 'text-ink-2' : 'text-on-board-2'

  return (
    <div className="max-w-[64ch] border-t-2 border-vermillion-ink pt-3">
      <p className={`sign mb-2 ${labelColor}`}>{label}</p>
      <p className={`prose-small ${body}`}>{children}</p>
    </div>
  )
}
