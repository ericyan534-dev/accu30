import { NavLink, useLocation } from 'react-router-dom'
import { useCopy } from '@/content'

/** The elevator lantern: a fixed rail of floor numbers marking where the
 *  reader is in the building. This is the form's position indicator, not a
 *  second navigation — the labels live in the tab rail, the numbers live here.
 *  Desktop only, where there is room beside the 1240px measure. */
export default function FloorRail() {
  const copy = useCopy()
  const { pathname } = useLocation()

  const currentFloor = copy.nav.find(
    item => pathname === item.to || pathname.startsWith(`${item.to}/`),
  )?.floor

  return (
    <nav
      aria-label="Floor indicator"
      className="board fixed top-1/2 left-0 z-40 hidden -translate-y-1/2 flex-col gap-1 rounded-r-[3px] px-2 py-3 shadow-[0_2px_12px_rgb(20_24_26/0.22)] 2xl:flex"
    >
      {copy.nav.map(item => {
        const live = item.floor === currentFloor
        return (
          <NavLink
            key={item.to}
            to={item.to}
            aria-label={`Floor ${item.floor} — ${item.label}`}
            className={`floor-mark ${
              live ? 'text-vermillion-lit' : 'text-on-board-2/55 hover:text-on-board'
            }`}
          >
            {item.floor}
          </NavLink>
        )
      })}
    </nav>
  )
}
