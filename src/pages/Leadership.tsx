import { useCopy } from '@/content'
import PageHeader from '@/components/PageHeader'
import Notice from '@/components/Notice'

/** No stock portraits. But an honest gap should be *stated*, not *staged*:
 *  the previous version sized each empty plate to the missing photograph,
 *  which made absence the largest thing on the page (47% of it on a phone).
 *  The notice now leads, and the plates are compact marks beside the names
 *  rather than full-column voids. */
export default function Leadership() {
  const copy = useCopy()
  const anyPending = copy.leadership.founders.some(f => !f.bio)

  return (
    <>
      <PageHeader
        floor="04"
        title={copy.leadership.title}
        standfirst={copy.leadership.standfirst}
      />

      <div className="wrap py-12 sm:py-16">
        {anyPending && (
          <div className="mb-10">
            <Notice label="Biographies pending">{copy.leadership.pendingNote}</Notice>
          </div>
        )}

        <ul className="grid list-none gap-x-10 gap-y-8 p-0 sm:grid-cols-2">
          {copy.leadership.founders.map((founder, i) => (
            <li
              key={founder.name}
              className="flex items-start gap-5 border-t border-stone-edge pt-6"
            >
              {founder.portrait ? (
                <img
                  src={founder.portrait}
                  alt={founder.name}
                  className="h-20 w-20 shrink-0 object-cover sm:h-24 sm:w-24"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="grid h-20 w-20 shrink-0 place-items-center bg-stone-deep inset-ring inset-ring-stone-edge sm:h-24 sm:w-24"
                >
                  <span className="sign text-ink-2">{String(i + 1).padStart(2, '0')}</span>
                </span>
              )}

              <div className="min-w-0">
                <h2 className="text-2xl">{founder.name}</h2>
                <p className="sign mt-2 text-ink-2">{founder.role}</p>
                {founder.bio ? (
                  <p className="prose-body mt-3 text-ink-2">{founder.bio}</p>
                ) : (
                  <p className="prose-small mt-3 text-ink-3">Biography to follow.</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
