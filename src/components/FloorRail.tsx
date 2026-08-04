import { NavLink, useLocation } from 'react-router-dom'
import { useCopy } from '@/content'

/** The elevator lantern: a fixed rail of floor numbers marking where the
 *  reader is in the building. A position indicator, not a second navigation —
 *  the labels live in the tab rail, the numbers live here.
 *
 *  The live floor is marked by a vermillion tick rather than vermillion type:
 *  red text on the board measured 4.19:1, and the tick keeps the One Red rule
 *  pointing at one thing without asking colour to carry the contrast. */
export default function FloorRail() {
  const copy = useCopy()
  const { pathname } = useLocation()

  const currentFloor = copy.nav.find(
    item => pathname === item.to || pathname.startsWith(`${item.to}/`),
  )?.floor

  return (
    <nav
      aria-label="Floor indicator"
      className="board fixed top-1/2 left-0 z-40 hidden -translate-y-1/2 flex-col 2xl:flex"
    >
      {copy.nav.map(item => {
        const live = item.floor === currentFloor
        return (
          <NavLink
            key={item.to}
            to={item.to}
            aria-label={`Floor ${item.floor} — ${item.label}`}
            className={`floor-mark relative ${
              live ? 'text-on-board' : 'text-on-board-2 hover:text-on-board'
            }`}
          >
            {live && (
              <span
                aria-hidden="true"
                className="absolute inset-y-1 left-0 w-[2px] bg-vermillion-ink"
              />
            )}
            {item.floor}
          </NavLink>
        )
      })}
    </nav>
  )
}
