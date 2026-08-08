import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCopy } from '@/content'
import ThemeToggle from '@/components/ThemeToggle'
import lockup from '@/assets/brand/acc-lockup-dark.webp'

/** Navigation as the board's index tabs. These are real routed links with real
 *  URLs — the tab treatment is the form's vocabulary, not a JS tab widget.
 *
 *  On a phone the tabs do not fit, so the board opens instead: the same
 *  listing that stands in the lobby, each floor with the note the directory
 *  already holds for it. It is capped to whatever the bar leaves of the screen
 *  and scrolls inside itself — eight floors on a landscape phone used to run
 *  45px past the bottom edge with no way to reach the last of them. */
export default function TabRail() {
  const copy = useCopy()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [barHeight, setBarHeight] = useState(56)

  /** Close, and hand the reader back the control they opened it with.
   *  Dropped, focus fell to <body> and the next Tab restarted at the skip
   *  link — the keyboard reader lost their place entirely. */
  const close = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  /** The note the directory already holds for each floor, so the open board
   *  reads as the board rather than as eight bare words. */
  const notes = useMemo(() => {
    const map = new Map<string, string>()
    for (const entry of copy.directory) map.set(entry.to, entry.note)
    return map
  }, [copy.directory])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // The listing only exists below xl. Left open across that line — a rotation,
  // a resized window — it would vanish with the page still locked and inert
  // behind it, and nothing on screen to say why.
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const wide = window.matchMedia('(min-width: 80rem)')
    const sync = () => { if (wide.matches) setOpen(false) }
    sync()
    wide.addEventListener('change', sync)
    return () => wide.removeEventListener('change', sync)
  }, [])

  // The bar grows when the reader enlarges the type, and the listing has to
  // give back exactly that much or its last floor falls off the bottom.
  useEffect(() => {
    const bar = barRef.current
    if (!bar || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(([entry]) => {
      setBarHeight(entry.contentRect.height)
    })
    observer.observe(bar)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)

    // The wall behind the open board holds still under the wheel and under a
    // finger. It is not pinned against a programmatic scroll — find-in-page can
    // still move it — because the honest fix for that, position:fixed on body,
    // would take the sticky header this panel hangs from off the screen with
    // it. Nothing a reader can reach by hand or by keyboard moves the wall:
    // the wheel is stopped here, touch by overscroll-contain on the panel, and
    // the keyboard by inert below.
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // And it is out of reach, not merely dimmed. Tabbing past the last floor
    // used to walk into the page behind the scrim, which cannot be scrolled
    // to and cannot be seen.
    const behind = [document.getElementById('main'), document.getElementById('site-footer')]
    for (const el of behind) el?.setAttribute('inert', '')

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
      for (const el of behind) el?.removeAttribute('inert')
    }
  }, [open])

  return (
    <>
      <header className="board on-dark sticky top-0 z-50">
        <a
          href="#main"
          className="sign absolute left-2 -top-14 z-10 inline-flex min-h-[44px] items-center bg-vermillion px-4 text-white focus:top-2"
        >
          Skip to content
        </a>

        {/* flex-wrap, so that raising the type size drops the controls onto a
            second line instead of pushing them off the right of the screen. */}
        <div ref={barRef} className="wrap flex flex-wrap items-stretch gap-x-4">
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
            className="ml-auto hidden min-w-0 items-stretch justify-end xl:flex"
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
          <div className="ml-auto flex items-stretch xl:hidden">
            <ThemeToggle />
            <button
              ref={triggerRef}
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
            className="board-drop overscroll-contain border-t border-white/12 xl:hidden"
            style={{ maxHeight: `calc(100svh - ${Math.round(barHeight)}px)`, overflowY: 'auto' }}
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
                  <span className="dir-sub">{notes.get(item.to) ?? ''}</span>
                  <span className="dir-floor">{item.floor}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* The rest of the wall, dimmed. Tapping it puts the board away — the
          only ways out were the Close button and the Escape key, and a phone
          has no Escape key. It is out of the tab order and hidden from
          assistive technology on purpose: Close already does this job, and a
          focus ring around the whole viewport says nothing. */}
      {open && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={close}
          className="scrim-in fixed inset-0 z-40 cursor-default bg-board/55 xl:hidden"
        />
      )}
    </>
  )
}
