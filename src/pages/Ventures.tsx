import { Link } from 'react-router-dom'
import { useCopy } from '@/content'
import PageHeader from '@/components/PageHeader'

/** The four tenants, listed at the scale their names deserve. A venture that
 *  carries its own mark shows it; the three that do not are not given an
 *  invented one, and the row is composed so their absence leaves no gap. */
export default function Ventures() {
  const copy = useCopy()

  return (
    <>
      <PageHeader floor="02" title={copy.ventures.title} standfirst={copy.ventures.standfirst} />

      <div className="wrap py-12 sm:py-16">
        <ul className="list-none p-0">
          {copy.ventures.items.map(venture => (
            <li key={venture.slug} className="border-b border-stone-edge last:border-b-0">
              <Link
                to={`/ventures/${venture.slug}`}
                className="group grid gap-x-10 gap-y-4 py-10 sm:py-12 md:grid-cols-[4rem_1fr_auto] md:items-baseline"
              >
                <span className="sign text-vermillion-ink">{venture.floor}</span>
                <div className="min-w-0">
                  <h2 className="display-2 underline decoration-stone-edge decoration-1 underline-offset-[8px] transition-colors group-hover:text-vermillion-ink group-hover:decoration-vermillion-ink">
                    {venture.name}
                  </h2>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <p className="sign-lg text-sm text-ink-3">{venture.category}</p>
                    {venture.slug === 'ring-ing' && (
                      <p className="sign border-l border-stone-edge pl-4 text-vermillion-ink">
                        {copy.ringing.kicker}
                      </p>
                    )}
                  </div>
                  <p className="prose-body mt-5 text-lg text-ink-2">{venture.summary}</p>
                </div>
                <span className="sign self-center text-ink-2 group-hover:text-ink md:text-right">
                  Read in full · {venture.sections.length} sections →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
