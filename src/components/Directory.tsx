import { Link } from 'react-router-dom'
import { useCopy } from '@/content'

interface DirectoryProps {
  /** Stagger the rows in, once, like letters pushed into a changeable board. */
  readonly animate?: boolean
}

/** The board listing. This is the organisation's index and the site's spine. */
export default function Directory({ animate = false }: DirectoryProps) {
  const copy = useCopy()

  return (
    <div>
      {copy.directory.map((entry, i) => (
        <Link
          key={entry.to + entry.label}
          to={entry.to}
          className={`dir-row${entry.tenant ? ' tenant' : ''}${animate ? ' set-in' : ''}`}
          style={animate ? { animationDelay: `${Math.min(i, 12) * 38}ms` } : undefined}
        >
          <span className="dir-name incised">{entry.label}</span>
          <span className="dir-sub">{entry.note}</span>
          <span className="dir-floor">{entry.floor}</span>
        </Link>
      ))}
    </div>
  )
}
