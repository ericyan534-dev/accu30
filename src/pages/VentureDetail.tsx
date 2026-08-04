import { Link, Navigate, useParams } from 'react-router-dom'
import { useCopy } from '@/content'
import type { Venture } from '@/content/types'
import PageHeader from '@/components/PageHeader'
import RingIng from '@/pages/RingIng'

/** Renders whatever sections a venture actually has. The section list is not
 *  normalised across ventures — that is the whole point. */
export default function VentureDetail() {
  const copy = useCopy()
  const { slug } = useParams<{ slug: string }>()
  const venture = copy.ventures.items.find(v => v.slug === slug)

  if (!venture) return <Navigate to="/ventures" replace />

  const index = copy.ventures.items.findIndex(v => v.slug === venture.slug)
  const next = copy.ventures.items[(index + 1) % copy.ventures.items.length]

  return (
    <>
      {/* Ring-ing is the priority venture and gets its own floor rather than
          the shared tenant layout. Everything after this — the next-venture
          plate — stays common, because leaving the floor works the same way
          on every floor. */}
      {venture.slug === 'ring-ing' ? (
        <RingIng venture={venture} />
      ) : (
        <StandardVenture venture={venture} />
      )}

      <section className="board on-dark">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-10">
          <div>
            <p className="sign text-on-board-2">Next</p>
            <p className="sign-lg mt-2 text-2xl text-on-board">{next.name}</p>
          </div>
          <Link to={`/ventures/${next.slug}`} className="action action-ghost">
            Continue
          </Link>
        </div>
      </section>
    </>
  )
}

/** The shared tenant layout: contents plate at left, the venture's own
 *  sections at right, exactly as many as it has. */
function StandardVenture({ venture }: { readonly venture: Venture }) {
  return (
    <>
      <PageHeader
        floor={venture.floor}
        title={venture.name}
        standfirst={venture.summary}
        mark={venture.mark}
        markAlt={`${venture.name} logotype`}
      />

      <div className="wrap grid gap-10 py-12 sm:py-16 lg:grid-cols-[16rem_1fr] lg:gap-16">
        {/* the venture's own contents, as a small plate */}
        <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
          <Link to="/ventures" className="link-row sign mb-5 text-ink-2 hover:text-vermillion-ink">
            ← All ventures
          </Link>
          <p className="sign mb-4 text-ink-3">Contents</p>
          <ol className="list-none p-0">
            {venture.sections.map((section, i) => (
              <li key={section.label} className="border-t border-stone-edge">
                <a
                  href={`#${slugify(section.label)}`}
                  className="link-row sign w-full gap-3 text-ink-2 hover:text-vermillion-ink"
                >
                  <span className="text-ink-3">{String(i + 1).padStart(2, '0')}</span>
                  {section.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div>
          {venture.sections.map(section => (
            <section
              key={section.label}
              id={slugify(section.label)}
              className="scroll-mt-24 border-b border-stone-edge py-9 first:pt-0 last:border-b-0"
            >
              <h2 className="sign-lg mb-5 text-xl">{section.label}</h2>
              {section.body.map((para, i) => (
                <p key={i} className={`prose-body${i > 0 ? ' mt-4' : ''} text-ink-2`}>
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </>
  )
}

function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
