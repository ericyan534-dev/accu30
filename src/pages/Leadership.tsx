import { useCopy } from '@/content'
import PageHeader from '@/components/PageHeader'
import Notice from '@/components/Notice'

/** No stock portraits. Where a bio is missing the plate stays empty and says
 *  so — an unpainted tile awaiting its painter, not a stranger's face. */
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
        <ul className="grid list-none gap-px bg-stone-edge p-0 sm:grid-cols-2">
          {copy.leadership.founders.map((founder, i) => (
            <li key={founder.name} className="bg-stone p-8">
              {founder.portrait ? (
                <div className="mb-6 aspect-4/5 overflow-hidden bg-stone-deep">
                  <img
                    src={founder.portrait}
                    alt={founder.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                /* An unfilled plate that says what it is, rather than a
                   photo-shaped hole or a stranger's face. */
                <div className="mb-6 flex aspect-4/5 flex-col justify-between bg-stone-deep p-5 inset-ring inset-ring-stone-edge">
                  <span className="sign text-ink-3">Plate {String(i + 1).padStart(2, '0')}</span>
                  <span className="sign text-ink-3">Portrait to follow</span>
                </div>
              )}
              <p className="sign mb-2 text-vermillion">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="text-2xl">{founder.name}</h2>
              <p className="sign mt-2 text-ink-3">{founder.role}</p>
              {founder.bio && <p className="prose-body mt-4 text-ink-2">{founder.bio}</p>}
            </li>
          ))}
        </ul>

        {anyPending && (
          <div className="mt-12">
            <Notice label="Biographies pending">{copy.leadership.pendingNote}</Notice>
          </div>
        )}
      </div>
    </>
  )
}
