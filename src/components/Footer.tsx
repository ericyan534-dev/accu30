import { Link } from 'react-router-dom'
import { useCopy, useEnquiryLabel } from '@/content'

/** The plate at the door: what this is, where it is, and how to reach it. */
export default function Footer() {
  const copy = useCopy()
  const enquiryLabel = useEnquiryLabel()

  return (
    <footer id="site-footer" className="board on-dark">
      <div className="wrap grid gap-x-10 gap-y-9 py-11 sm:grid-cols-2 sm:py-14 lg:grid-cols-4">
        <div>
          <p className="sign-lg text-base text-on-board">{copy.org.short}</p>
          <p className="mt-3 text-sm leading-relaxed text-on-board-2">{copy.org.mission}</p>
        </div>

        {/* One listing, one landmark. Two columns are a layout decision, not
            two navigations — split into a pair of <nav>s the landmark list
            read "Sections" (the header's name too) and "More sections".
            Four columns is right for a wall and wrong for a phone: stacked, the
            eight links ran the plate to seven hundred pixels of near-empty
            dark. Below the wide layout the two lists sit side by side and the
            plate goes back to being a plate. On the wall the inner gap matches
            the outer one, so the two columns still land on the grid. */}
        <nav
          aria-label="Footer"
          className="grid min-w-0 grid-cols-2 gap-x-8 sm:col-span-2 lg:col-span-2 lg:gap-x-10"
        >
          <div className="grid min-w-0 grid-cols-1 content-start">
            {copy.nav.slice(0, 4).map(item => (
              <Link
                viewTransition
                key={item.to}
                to={item.to}
                className="link-row sign w-full text-on-board-2 hover:text-on-board"
              >
                {/* A real flex item, so a word longer than the column can be
                    allowed to break instead of pushing the plate off the page
                    when the reader enlarges the type. */}
                <span className="min-w-0 break-words">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="grid min-w-0 grid-cols-1 content-start">
            {copy.nav.slice(4).map(item => (
              <Link
                viewTransition
                key={item.to}
                to={item.to}
                className="link-row sign w-full text-on-board-2 hover:text-on-board"
              >
                {/* A real flex item, so a word longer than the column can be
                    allowed to break instead of pushing the plate off the page
                    when the reader enlarges the type. */}
                <span className="min-w-0 break-words">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="grid content-start gap-3">
          <p className="sign text-on-board-2">{copy.footer.builtNote}</p>
          <Link to="/contact" className="action action-ghost justify-self-start">
            {enquiryLabel}
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
