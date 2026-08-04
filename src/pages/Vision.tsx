import { useCopy } from '@/content'
import PageHeader from '@/components/PageHeader'

/** The `mark` slot on PageHeader is for a TENANT's emblem. ACC's own fuller
 *  emblem is not placed here: the lockup already sits in the tab rail 150px
 *  above, and two versions of the same identity that close together read as
 *  a mistake rather than as richness. The asset stays in src/assets/marks/
 *  until there is a floor that is actually about it. */
export default function Vision() {
  const copy = useCopy()

  return (
    <>
      <PageHeader floor="01" title={copy.vision.title} standfirst={copy.vision.standfirst} />

      {/* Seven ranked plates. The numbers are the pillars' own sequence. */}
      <div className="wrap py-12 sm:py-16">
        <ol className="list-none p-0">
          {copy.vision.pillars.map(pillar => (
            <li
              key={pillar.number}
              className="grid gap-x-8 gap-y-3 border-b border-stone-edge py-9 last:border-b-0 md:grid-cols-[3rem_14rem_1fr]"
            >
              <span className="sign pt-1 text-vermillion-ink">{pillar.number}</span>
              <h2 className="text-2xl">{pillar.title}</h2>
              <p className="prose-body text-ink-2">{pillar.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <section className="board on-dark py-16">
        <div className="wrap">
          <blockquote
            className="incised display-3 max-w-[26ch] font-sign font-bold leading-[1.12]"
          >
            {copy.vision.closing}
          </blockquote>
        </div>
      </section>
    </>
  )
}
