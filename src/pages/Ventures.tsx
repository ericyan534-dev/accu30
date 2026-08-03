import { Link } from 'react-router-dom'
import { useCopy } from '@/content'
import PageHeader from '@/components/PageHeader'

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
                className="group grid gap-x-8 gap-y-3 py-10 md:grid-cols-[4rem_1fr_auto] md:items-baseline"
              >
                <span className="sign text-vermillion">{venture.floor}</span>
                <div>
                  <h2 className="text-3xl transition-colors group-hover:text-vermillion">
                    {venture.name}
                  </h2>
                  <p className="sign mt-2 text-ink-3">{venture.category}</p>
                  <p className="prose-body mt-4 text-ink-2">{venture.summary}</p>
                </div>
                <span className="sign self-center text-ink-3 group-hover:text-ink">
                  {venture.sections.length} sections →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
