import { Link } from 'react-router-dom'
import { useCopy } from '@/content'

/** The plate at the door: what this is, where it is, and how to reach it. */
export default function Footer() {
  const copy = useCopy()

  return (
    <footer className="board on-dark">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="sign-lg text-base text-on-board">{copy.org.short}</p>
          <p className="mt-3 text-sm leading-relaxed text-on-board-2">{copy.org.mission}</p>
        </div>

        <nav aria-label="Sections" className="grid content-start gap-2">
          {copy.nav.slice(0, 4).map(item => (
            <Link key={item.to} to={item.to} className="sign text-on-board-2 hover:text-on-board">
              {item.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="More sections" className="grid content-start gap-2">
          {copy.nav.slice(4).map(item => (
            <Link key={item.to} to={item.to} className="sign text-on-board-2 hover:text-on-board">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="grid content-start gap-3">
          <p className="sign text-on-board-2">{copy.footer.builtNote}</p>
          <Link to="/contact" className="action action-ghost justify-self-start">
            {copy.actions.enquire}
          </Link>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-5">
          <p className="sign text-on-board-2">{copy.footer.rights}</p>
          <p className="sign text-on-board-2">{copy.org.kind}</p>
        </div>
      </div>
    </footer>
  )
}
