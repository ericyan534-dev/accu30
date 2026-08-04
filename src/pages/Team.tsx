import { useCopy } from '@/content'
import type { Person } from '@/content/types'
import PageHeader from '@/components/PageHeader'

/** Two registers, because the organisation has two.
 *
 *  The four officers are named, pictured and given their whole biography —
 *  they are accountable for the place. Everyone else is listed the way the
 *  board lists tenants: mark, name, function. Portraits that do not exist are
 *  stated as pending on a plate of the same size, so a missing photograph
 *  never becomes the largest thing on the page. */
export default function Team() {
  const copy = useCopy()
  const anyPending = [...copy.team.officers, ...copy.team.members].some(p => !p.portrait)

  return (
    <>
      <PageHeader floor="04" title={copy.team.title} standfirst={copy.team.standfirst} />

      {/* ── The four officers ──────────────────────────────────────────── */}
      <section className="wrap py-12 sm:py-16" aria-labelledby="officers-heading">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-stone-edge pb-5">
          <h2 id="officers-heading" className="sign-lg text-xl">
            {copy.team.officersHeading}
          </h2>
          <p className="prose-small text-ink-3">{copy.team.officersNote}</p>
        </div>

        {/* Portrait · office · biography, in three columns across the full
            measure. Two columns left the right third of every row empty,
            because a 68ch biography cannot fill 1100px on its own. */}
        <ul className="list-none p-0">
          {copy.team.officers.map(person => (
            <li
              key={person.name}
              className="grid gap-x-10 gap-y-5 border-b border-stone-edge py-9 last:border-b-0 md:grid-cols-[11rem_1fr] lg:grid-cols-[11rem_15rem_1fr]"
            >
              <Portrait person={person} className="w-[8.5rem] md:w-full" />
              <div className="min-w-0 lg:pt-1">
                <h3 className="text-2xl">{person.name}</h3>
                <p className="sign-lg mt-3 text-sm text-vermillion-ink">{person.role}</p>
              </div>
              <p className="prose-body min-w-0 text-ink-2 lg:pt-1">{person.bio}</p>
            </li>
          ))}
        </ul>

        {anyPending && (
          <p className="prose-small mt-8 text-ink-3">{copy.team.pendingNote}</p>
        )}
      </section>

      {/* ── Everyone else, as a board listing ──────────────────────────── */}
      <section className="board on-dark py-14 sm:py-20" aria-labelledby="members-heading">
        <div className="wrap">
          <div className="mb-9 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h2 id="members-heading" className="sign-lg display-4 text-on-board">
              {copy.team.membersHeading}
            </h2>
            <p className="sign text-on-board-2">{copy.team.membersNote}</p>
          </div>

          <ul className="grid list-none gap-x-10 gap-y-0 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {copy.team.members.map(person => (
              <li
                key={person.name}
                className="flex items-center gap-5 border-b border-white/12 py-5"
              >
                <Portrait person={person} className="w-16 shrink-0" surface="board" />
                <div className="min-w-0">
                  <p className="dir-name text-on-board">{person.name}</p>
                  <p className="dir-sub mt-1">{person.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

interface PortraitProps {
  readonly person: Person
  readonly className?: string
  readonly surface?: 'stone' | 'board'
}

/** A portrait plate. Present or pending, it occupies the same footprint. */
function Portrait({ person, className = '', surface = 'stone' }: PortraitProps) {
  if (person.portrait) {
    return (
      <img
        src={person.portrait}
        alt={person.name}
        className={`aspect-square object-cover ${
          surface === 'stone' ? 'inset-ring inset-ring-stone-edge' : 'inset-ring inset-ring-white/20'
        } ${className}`}
        loading="lazy"
      />
    )
  }

  // The small board plate has no room for a sentence, so it carries initials
  // and lets the accessible name say what the plate means. Nothing here goes
  // below the 12px signage floor to make words fit.
  const initials = person.name
    .replace(/[“”"]/g, '')
    .split(/\s+/)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <span
      role="img"
      aria-label={`${person.name} — portrait pending`}
      className={`grid aspect-square place-items-center px-2 text-center ${
        surface === 'stone'
          ? // ink-3 measures 4.32:1 on stone-deep — under AA. ink-2 is 6.77:1.
            'bg-stone-deep text-ink-2 inset-ring inset-ring-stone-edge'
          : 'bg-board-raised text-on-board-2 inset-ring inset-ring-white/20'
      } ${className}`}
    >
      <span className="sign leading-tight">
        {surface === 'stone' ? 'Portrait pending' : initials}
      </span>
    </span>
  )
}
