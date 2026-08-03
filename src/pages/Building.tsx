import { useCopy } from '@/content'
import PageHeader from '@/components/PageHeader'
import Notice from '@/components/Notice'
import exteriorImg from '@/assets/spaces/image.webp'

/** The building is PLANNED. It is presented as a programme — a schedule of
 *  spaces — never as a place. Reference imagery appears only inside captioned
 *  plates that name what the picture actually is. */
export default function Building() {
  const copy = useCopy()

  return (
    <>
      <PageHeader
        floor="03"
        title={copy.building.title}
        standfirst={copy.building.standfirst}
        notice={copy.building.statusNotice}
        noticeLabel="Status"
      />

      <div className="wrap grid gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16">
        <section>
          <h2 className="sign-lg mb-5 text-xl">{copy.building.about.label}</h2>
          {copy.building.about.body.map((para, i) => (
            <p key={i} className="prose-body text-ink-2">
              {para}
            </p>
          ))}
        </section>
        <section>
          <h2 className="sign-lg mb-5 text-xl">{copy.building.overview.label}</h2>
          {copy.building.overview.body.map((para, i) => (
            <p key={i} className="prose-body text-ink-2">
              {para}
            </p>
          ))}
        </section>
      </div>

      <div className="wrap pb-4">
        <figure className="plate">
          <img
            src={exteriorImg}
            alt="A street-level view of a multi-storey community centre with a gate at its entrance"
          />
          <figcaption>
            <span>Reference · not the ACC building</span>
            <span>Street elevation</span>
          </figcaption>
        </figure>
      </div>

      {/* The programme: a schedule of spaces, ranked and numbered like floors. */}
      <section className="board on-dark mt-12 py-14 sm:py-20" aria-labelledby="programme">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="programme" className="sign-lg text-2xl text-on-board">
              {copy.building.spacesHeading}
            </h2>
            <p className="sign text-on-board-2">
              {copy.building.spaces.length} spaces · all planned
            </p>
          </div>

          <ol className="list-none p-0">
            {copy.building.spaces.map((space, i) => (
              <li
                key={space.name}
                className="grid gap-x-8 gap-y-4 border-b border-white/12 py-8 last:border-b-0 md:grid-cols-[3.5rem_1fr_15rem] md:items-start"
              >
                <span className="dir-floor pt-1 text-on-board-2">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="dir-name incised mb-3 text-lg">{space.name}</h3>
                  <p className="prose-small text-on-board-2">{space.body}</p>
                </div>
                {space.image && (
                  <figure className="plate border-white/15 bg-board-raised">
                    <img src={space.image} alt="" loading="lazy" />
                    <figcaption className="text-on-board-2">
                      <span>{space.imageNote}</span>
                    </figcaption>
                  </figure>
                )}
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <Notice label="About these images" surface="board">
              {copy.building.imageryNotice}
            </Notice>
          </div>
        </div>
      </section>
    </>
  )
}
