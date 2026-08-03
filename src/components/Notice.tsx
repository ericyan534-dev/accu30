import type { ReactNode } from 'react'

interface NoticeProps {
  readonly label: string
  readonly children: ReactNode
  readonly surface?: 'stone' | 'board'
}

/** A stated condition, set as a small plate: a vermillion label above a rule,
 *  with the text beneath. Used for the building's planned status and for
 *  anything else the reader must not misread. */
export default function Notice({ label, children, surface = 'stone' }: NoticeProps) {
  const rule = surface === 'stone' ? 'border-ink' : 'border-on-board'
  const body = surface === 'stone' ? 'text-ink-2' : 'text-on-board-2'

  return (
    <div className={`max-w-[64ch] border-t ${rule} pt-3`}>
      <p className="sign mb-2 text-vermillion">{label}</p>
      <p className={`text-sm leading-relaxed ${body}`}>{children}</p>
    </div>
  )
}
