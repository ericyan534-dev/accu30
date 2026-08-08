import { Link } from 'react-router-dom'
import { useCopy } from '@/content'

/** The plate at the door: what this is, where it is, and how to reach it. */
export default function Footer() {
  const copy = useCopy()

  return (
    <footer className="board on-dark">
      <div className="wrap grid gap-x-10 gap-y-9 py-11 sm:grid-cols-2 sm:py-14 lg:grid-cols-4">
        <div>
          <p className="sign-lg text-base text-on-board">{copy.org.short}</p>
          <p className="mt-3 text-sm leading-relaxed text-on-board-2">{copy.org.mission}</p>
        </div>

        {/* Four columns is right for a wall and wrong for a phone: stacked, the
            eight links ran the plate to seven hundred pixels of near-empty
            dark. Below the wide layout the two lists sit side by side and the
            plate goes back to being a plate. */}
        <div className="grid grid-cols-2 gap-x-8 sm:col-span-2 lg:contents">
          <nav aria-label="Sections" className="grid content-start">
            {copy.nav.slice(0, 4).map(item => (
              <Link viewTransition key={item.to} to={item.to} className="link-row sign w-full text-on-board-2 hover:text-on-board">
                {item.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="More sections" className="grid content-start">
            {copy.nav.slice(4).map(item => (
              <Link viewTransition key={item.to} to={item.to} className="link-row sign w-full text-on-board-2 hover:text-on-board">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

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
