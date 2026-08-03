import { Link } from 'react-router-dom'
import { useCopy } from '@/content'
import Relief from '@/components/Relief'
import Directory from '@/components/Directory'
import exteriorImg from '@/assets/spaces/image-1.webp'
import libraryImg from '@/assets/spaces/image-6.webp'

export default function Home() {
  const copy = useCopy()

  return (
    <>
      {/* ── The facade. Mission cut into stone, dragon in relief. ────────── */}
      <section className="relative grid min-h-[calc(100svh-3.5rem)] content-between gap-8 overflow-hidden bg-linear-to-b from-stone to-stone-deep py-10 sm:py-14">
        {/* Hidden between md and lg, where the mark would cross the prose. */}
        <Relief
          className="top-1/2 right-[-6%] hidden w-[min(56vw,660px)] -translate-y-1/2 text-ink max-md:block lg:block"
          opacity={0.07}
        />

        <div className="wrap relative flex flex-wrap items-start justify-between gap-4">
          <p className="sign-lg text-[0.8rem] leading-snug sm:text-[0.92rem]">
            Asian Community Center
            <br />
            Under 30
          </p>
          <p className="sign text-right text-ink-3">
            {copy.org.city}
            <br />
            {copy.org.kind}
          </p>
        </div>

        <div className="wrap relative">
          <h1 className="cut incised-stone display-hero max-w-[19ch]">
            {copy.org.missionLead}{' '}
            <span className="text-vermillion">{copy.org.missionAccent}</span>
          </h1>

          <p className="prose-body mt-6 max-w-[52ch] text-lg text-ink-2">{copy.org.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/contact" className="action">
              {copy.actions.partner}
            </Link>
            <Link to="/ventures" className="action action-ghost">
              {copy.actions.seeWork}
            </Link>
          </div>
        </div>

        {/* The proof rail: three hard facts as discrete cells, then the four
            ventures named — the only evidence of execution, above the fold. */}
        <div className="wrap relative">
          <hr className="border-0 border-t border-stone-edge" />
          <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-3">
            {copy.org.statusRail.map(fact => (
              <div key={fact}>
                <dt className="sr-only">Status</dt>
                <dd className="sign-lg text-[0.82rem] text-ink">{fact}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[0.9rem] text-ink-2">
            {copy.ventures.items.map(v => v.name).join(' · ')}
          </p>
        </div>
      </section>

      {/* ── Screen two is the EVIDENCE, not the navigation. These four
             ventures are the only things that already exist. ─────────────── */}
      <section className="board on-dark py-14 sm:py-20" aria-labelledby="ventures-heading">
        <div className="wrap">
          <div className="mb-9 flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="ventures-heading" className="sign-lg display-4 text-on-board">
              {copy.ventures.title}
            </h2>
            <p className="sign text-on-board-2">Operating today</p>
          </div>

          <ul className="list-none p-0">
            {copy.ventures.items.map((venture, i) => (
              <li key={venture.slug} className="border-b border-white/12 last:border-b-0">
                <Link
                  to={`/ventures/${venture.slug}`}
                  className="set-in group grid gap-x-8 gap-y-2 py-7 md:grid-cols-[4rem_1fr_9rem] md:items-baseline"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <span className="dir-floor text-on-board-2 md:text-left">{venture.floor}</span>
                  <div>
                    <h3 className="dir-name incised text-xl transition-colors group-hover:text-vermillion-lit">
                      {venture.name}
                    </h3>
                    <p className="sign mt-1.5 text-on-board-2">{venture.category}</p>
                    <p className="prose-small mt-3 text-on-board-2">{venture.summary}</p>
                  </div>
                  <span className="sign self-center text-on-board-2 underline decoration-white/30 underline-offset-4 group-hover:text-on-board md:text-right">
                    Read in full
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── The claim, with reference plates kept plainly labelled. ─────── */}
      <section className="py-16 sm:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <h2 className="display-2 max-w-[20ch]">{copy.home.claimHeading}</h2>
            <div className="mt-7">
              {copy.home.claimBody.map((para, i) => (
                <p key={i} className={`prose-body${i > 0 ? ' mt-4 text-ink-2' : ''}`}>
                  {para}
                </p>
              ))}
            </div>
            <Link to="/building" className="action action-ghost mt-8">
              {copy.actions.readProgramme}
            </Link>
          </div>

          {/* items-start: the plate must not stretch a short image into a
              tall empty mount. */}
          <div className="grid grid-cols-2 items-start gap-4 self-start">
            <figure className="plate">
              <img
                src={exteriorImg}
                alt="A street-level view of a community centre building"
                loading="lazy"
              />
              <figcaption>
                <span>Reference</span>
                <span>Exterior</span>
              </figcaption>
            </figure>
            <figure className="plate">
              <img src={libraryImg} alt="A large multi-level reading room" loading="lazy" />
              <figcaption>
                <span>Reference</span>
                <span>Reading room</span>
              </figcaption>
            </figure>
            <p className="prose-small col-span-2 text-ink-2">{copy.building.imageryNotice}</p>
          </div>
        </div>
      </section>

      {/* ── The directory, where a directory belongs: by the door. ──────── */}
      <section
        className="board on-dark border-t border-white/10 py-14"
        aria-labelledby="directory-heading"
      >
        <div className="wrap">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="directory-heading" className="sign-lg display-4 text-on-board">
              {copy.home.directoryHeading}
            </h2>
            <p className="sign text-on-board-2">{copy.home.directoryNote}</p>
          </div>
          <Directory />
        </div>
      </section>
    </>
  )
}
