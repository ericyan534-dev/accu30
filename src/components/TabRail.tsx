import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCopy } from '@/content'
import ThemeToggle from '@/components/ThemeToggle'
import lockup from '@/assets/brand/acc-lockup-dark.webp'

/** Navigation as the board's index tabs. These are real routed links with real
 *  URLs — the tab treatment is the form's vocabulary, not a JS tab widget. */
export default function TabRail() {
  const copy = useCopy()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="board on-dark sticky top-0 z-50">
      <a
        href="#main"
        className="sign absolute left-2 -top-12 z-10 bg-vermillion px-3 py-2 text-white focus:top-2"
      >
        Skip to content
      </a>

      <div className="wrap flex items-stretch justify-between gap-4">
        {/* the mark, as the board's own head plate */}
        <Link
          to="/"
          className="flex shrink-0 items-center py-3"
          aria-label={`${copy.org.short} — home`}
        >
          <img
            src={lockup}
            alt=""
            className="block h-8 w-auto sm:h-9"
            width={420}
            height={146}
          />
        </Link>

        {/* desktop tabs */}
        <nav
          className="hidden min-w-0 flex-1 items-stretch justify-end xl:flex"
          aria-label="Sections"
        >
          {copy.nav.map(item => (
            <NavLink viewTransition key={item.to} to={item.to} className="tab">
              <span className="tab-floor">{item.floor}</span>
              {item.label}
            </NavLink>
          ))}
          <span aria-hidden="true" className="my-3 ml-2 w-px bg-white/14" />
          <ThemeToggle />
        </nav>

        {/* The lighting control stays out on the rail on small screens too —
            burying it inside the menu makes it a scavenger hunt. */}
        <div className="flex items-stretch xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="sign flex items-center gap-2 px-3 text-on-board"
            aria-expanded={open}
            aria-controls="tab-panel"
            onClick={() => setOpen(v => !v)}
          >
            {open ? 'Close' : 'Directory'}
            <span aria-hidden="true" className="text-[0.9rem] leading-none">
              {open ? '×' : '≡'}
            </span>
          </button>
        </div>
      </div>

      {/* mobile: the full board listing rather than a cramped menu */}
      {open && (
        <div
          id="tab-panel"
          ref={panelRef}
          className="border-t border-white/12 xl:hidden"
        >
          <div className="wrap py-2">
            {copy.nav.map(item => (
              <NavLink
                viewTransition
                key={item.to}
                to={item.to}
                className="dir-row"
                onClick={() => setOpen(false)}
              >
                <span className="dir-name">{item.label}</span>
                <span className="dir-sub" />
                <span className="dir-floor">{item.floor}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
