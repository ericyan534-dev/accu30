import { useCopy } from '@/content'
import type { Mascot, Venture } from '@/content/types'
import wordmarkLight from '@/assets/ringing/wordmark-light.webp'
import birdHero from '@/assets/ringing/bird-hero.webp'
import banner from '@/assets/ringing/banner.webp'
import fbtiScreen from '@/assets/ringing/fbti-screen.webp'
import siteHome from '@/assets/ventures/ringing-site-home.webp'

interface RingIngProps {
  readonly venture: Venture
}

/* ══════════════════════════════════════════════════════════════════════
   DIRECTION CONTRACT — Ring-ing's floor · surface seed 7e0aeb7e
   Structure pinned by the brief, which beats the roll: the birds are
   integrated alongside the reading rather than collected in a grid.
   ──────────────────────────────────────────────────────────────────────
   THESIS  A venture with sixteen drawn archetypes should not park them in
           a specimen cabinet. Each one opens a chapter and then gets out
           of the reader's way. Refuses the gallery grid and the two-column
           docs page the other four ventures use.
   OWN-WORLD  ACC stone and board unchanged. Every chapter opens on a dark
           plate set into the stone wall, carrying a tabular chapter
           numeral, the section title, one bird at scale, and a 3px rule in
           that bird's own published accent — the only colour on this site
           that is not vermillion. Prose always returns to stone.
   STORY   The reader meets the product, then reads six chapters, each
           announced by a face. They leave knowing Ring-ing is a real
           shipping product with a design language of its own.
   FIRST VIEWPORT  Unchanged and approved: wordmark, cut tagline, summary,
           two actions, bird bleeding off the right of the board.
   FORM    Chapter plates with alternating bird placement — right, left,
           lead, right, left, right — so six openers never compose twice.
   ══════════════════════════════════════════════════════════════════════ */

/** Ring-ing does not get the tenant listing. It gets the floor. */
export default function RingIng({ venture }: RingIngProps) {
  const copy = useCopy()
  const ringing = copy.ringing
  const bird = (code: string): Mascot | undefined =>
    ringing.mascots.find(m => m.code === code)

  return (
    <>
      {/* ── The floor's own masthead ────────────────────────────────────── */}
      <header className="board on-dark relative overflow-hidden">
        <img
          src={birdHero}
          alt=""
          className="pointer-events-none absolute right-[-6%] bottom-[-14%] hidden w-[min(42vw,520px)] lg:block"
          loading="eager"
        />

        <div className="wrap relative py-14 sm:py-20">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="sign text-on-board-2">Floor {venture.floor}</p>
            <p className="sign flex items-center gap-2.5 text-on-board">
              <span aria-hidden="true" className="block h-3.5 w-[3px] bg-vermillion-lit" />
              {ringing.kicker}
            </p>
          </div>

          <h1 className="mt-7">
            <span className="sr-only">{venture.name}</span>
            <img
              src={wordmarkLight}
              alt=""
              className="h-11 w-auto sm:h-14"
              width={900}
              height={262}
            />
          </h1>

          <p className="cut incised display-2 mt-8 max-w-[17ch] text-on-board">
            {ringing.tagline}
          </p>

          <p className="prose-body mt-7 max-w-[54ch] text-lg text-on-board-2">
            {venture.summary}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a className="action" href={ringing.siteUrl} target="_blank" rel="noreferrer noopener">
              Visit {ringing.siteLabel} ↗
            </a>
            <a className="action action-ghost" href="#chapter-1">
              Read the venture
            </a>
          </div>
        </div>

        {/* A phone has no corner for the bird to stand in, so it takes the
            foot of the plate instead and runs off the right edge the way it
            does on the wide one. Without this the masthead the brief approved
            arrived on a phone with its mascot missing entirely. */}
        <div className="relative flex justify-end lg:hidden">
          <img
            src={birdHero}
            alt=""
            className="w-[min(72vw,350px)] translate-x-[12%]"
            loading="eager"
          />
        </div>
      </header>

      {/* ── The product, at the size a screenshot has to be to be read ─── */}
      <section className="py-14 sm:py-20" aria-labelledby="product-heading">
        <div className="wrap">
          <div className="mb-9 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <h2 id="product-heading" className="display-2">
              {ringing.productHeading}
            </h2>
            <a
              className="link-row sign text-ink-2 hover:text-vermillion-ink"
              href={ringing.siteUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              {ringing.siteLabel} ↗
            </a>
          </div>

          <div className="grid gap-6">
            <figure className="plate own">
              <img src={siteHome} alt="The Ring-ing landing page" width={1600} height={1000} />
              <figcaption>
                <span>Ring-ing</span>
                <span>Landing page</span>
              </figcaption>
            </figure>
            <figure className="plate own">
              <img
                src={fbtiScreen}
                alt="The FBTI profile view inside the Ring-ing workspace, showing one of the sixteen birds"
                width={1600}
                height={876}
                loading="lazy"
              />
              <figcaption>
                <span>Ring-ing</span>
                <span>FBTI profile · the bird in use</span>
              </figcaption>
            </figure>
          </div>

          <p className="prose-small mt-6 text-ink-3">{ringing.productNote}</p>
        </div>
      </section>

      {/* ── Six chapters, each announced by a face ──────────────────────── */}
      {venture.sections.map((section, i) => {
        const chapter = ringing.chapters[i]
        const mascot = chapter ? bird(chapter.code) : undefined
        const margin = chapter?.margin ? bird(chapter.margin.code) : undefined
        const marginSide = chapter?.margin?.side ?? 'right'

        return (
          <section key={section.label} id={`chapter-${i + 1}`} className="scroll-mt-20">
            <ChapterPlate
              number={String(i + 1).padStart(2, '0')}
              title={section.label}
              mascot={mascot}
              place={chapter?.place ?? 'right'}
            />

            {/* The running text keeps its reading measure; the margin beside
                it is where a second bird stands, so the reader meets one
                while reading rather than in a cabinet at the end. */}
            <div
              className={`wrap grid items-start gap-x-12 gap-y-10 py-11 sm:py-14 ${
                margin
                  ? marginSide === 'left'
                    ? 'lg:grid-cols-[15rem_1fr]'
                    : 'lg:grid-cols-[1fr_15rem]'
                  : ''
              }`}
            >
              {margin && marginSide === 'left' && <MarginBird mascot={margin} />}

              {/* A chapter with no bird in the margin sets its text in two
                  columns instead, so the quiet chapters use the full field
                  rather than stranding a column against a blank half-page. */}
              <div className={margin ? '' : 'lg:columns-2 lg:gap-14'}>
                {/* Narrow screens have no margin to stand a bird in, so it
                    steps into the text and the reading runs around it. Four of
                    the fourteen birds simply did not exist on a phone. */}
                {margin && <MarginBird mascot={margin} side={marginSide} inline />}
                {section.body.map((para, j) => (
                  <p
                    key={j}
                    className={`prose-body${j > 0 ? ' mt-5' : ''} text-lg text-ink-2`}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {margin && marginSide === 'right' && <MarginBird mascot={margin} />}
            </div>
          </section>
        )
      })}

      {/* ── The rest of the aviary, and the venture's own banner ────────── */}
      <section className="board on-dark py-14 sm:py-20" aria-labelledby="aviary-heading">
        <div className="wrap">
          <div className="max-w-[58ch]">
            <h2 id="aviary-heading" className="sign-lg display-4 text-on-board">
              {ringing.aviaryHeading}
            </h2>
            <p className="prose-body mt-5 text-lg text-on-board-2">{ringing.aviaryNote}</p>
          </div>

          <ul className="mt-10 grid list-none grid-cols-2 gap-5 p-0 lg:grid-cols-4">
            {ringing.aviary.map(code => {
              const m = bird(code)
              if (!m) return null
              return (
                <li key={code}>
                  <img
                    src={m.art}
                    alt={`Ring-ing's ${m.code} archetype`}
                    className="block w-full"
                    width={640}
                    height={640}
                    loading="lazy"
                  />
                  <div
                    aria-hidden="true"
                    className="h-[3px] w-full"
                    style={{ background: m.accent }}
                  />
                  <p className="sign mt-3 text-on-board">{m.code}</p>
                </li>
              )
            })}
          </ul>

          <figure className="plate own mt-12">
            <img src={banner} alt="The Ring-ing brand banner" width={2400} height={710} loading="lazy" />
            <figcaption>
              <span>Ring-ing</span>
              <span>Brand banner</span>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  )
}

interface MarginBirdProps {
  readonly mascot: Mascot
  /** Which side of the reading it stands on. Only used inline. */
  readonly side?: 'left' | 'right'
  /** `inline` sets the bird into the text itself, for screens with no margin;
   *  the default stands it in the margin column and is hidden below lg. */
  readonly inline?: boolean
}

/** A bird standing beside the running text — in the margin where there is a
 *  margin, and in the text itself where there is not. */
function MarginBird({ mascot, side = 'right', inline = false }: MarginBirdProps) {
  const art = (
    <>
      <img src={mascot.art} alt="" width={640} height={640} className="block w-full" />
      <span
        aria-hidden="true"
        className="block h-[3px] w-full"
        style={{ background: mascot.accent }}
      />
      <figcaption className="sign mt-3 text-ink-3">FBTI {mascot.code}</figcaption>
    </>
  )

  if (inline) {
    // The reading has to keep a measure worth reading. On the narrowest
    // screens a bird in the margin leaves twenty characters a line, so there
    // it stands above the text instead and the float starts once there is
    // room for both.
    return (
      <figure
        className={`mt-1 mb-4 w-[56%] max-w-[200px] min-[23rem]:mb-3 min-[23rem]:w-[38%] min-[23rem]:max-w-[180px] lg:hidden ${
          side === 'left' ? 'min-[23rem]:float-left min-[23rem]:mr-5' : 'min-[23rem]:float-right min-[23rem]:ml-5'
        }`}
      >
        {art}
      </figure>
    )
  }

  return <figure className="m-0 hidden lg:sticky lg:top-28 lg:block">{art}</figure>
}

interface ChapterPlateProps {
  readonly number: string
  readonly title: string
  readonly mascot?: Mascot
  readonly place: 'right' | 'left' | 'lead'
}

/** A dark plate set into the stone wall, announcing one chapter.
 *
 *  The bird moves — right, left, or leading above the title — so six of
 *  these down a page never read as six copies of one template. The accent
 *  rule is the bird's own published colour and is the one place on this
 *  site where something other than vermillion is allowed to be the colour. */
function ChapterPlate({ number, title, mascot, place }: ChapterPlateProps) {
  // Eager: six chapter birds are the page's structure, not decoration below
  // the fold, and a lazy one leaves a plate with a hole in it.
  // Narrow: the bird runs off the edge of the plate on the side its chapter
  // is composed to, so six openers still never compose twice on a phone.
  // Stacked and left-aligned they were a 200px picture with half the plate
  // empty beside it, six times down the page.
  const bleed =
    place === 'left'
      ? '-translate-x-[11%] self-start md:translate-x-0 md:self-center'
      : 'translate-x-[11%] self-end md:translate-x-0 md:self-center'

  const art = mascot && (
    <img
      src={mascot.art}
      alt=""
      width={640}
      height={640}
      className={
        place === 'lead'
          ? 'w-[min(64vw,300px)] shrink-0 sm:w-[min(56vw,270px)]'
          : `w-[min(68vw,320px)] shrink-0 md:w-[300px] lg:w-[340px] ${bleed}`
      }
    />
  )

  const heading = (
    <div className="min-w-0 flex-1">
      <p className="dir-floor text-left text-on-board-2">{number}</p>
      <h2 className="sign-lg display-3 mt-3 text-on-board">{title}</h2>
      {mascot && (
        <div className="mt-6 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="block h-[3px] w-24"
            style={{ background: mascot.accent }}
          />
          <span className="sign text-on-board-2">FBTI {mascot.code}</span>
        </div>
      )}
    </div>
  )

  if (place === 'lead') {
    return (
      <div className="board on-dark">
        <div className="wrap flex flex-col items-center gap-6 py-12 text-center sm:py-14">
          {art}
          <div className="flex flex-col items-center">
            <p className="dir-floor text-on-board-2">{number}</p>
            <h2 className="sign-lg display-3 mt-3 max-w-[18ch] text-on-board">{title}</h2>
            {mascot && (
              <div className="mt-6 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="block h-[3px] w-24"
                  style={{ background: mascot.accent }}
                />
                <span className="sign text-on-board-2">FBTI {mascot.code}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="board on-dark overflow-hidden">
      <div
        className={`wrap flex flex-col gap-8 py-12 sm:py-14 md:items-center md:gap-12 ${
          place === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
      >
        {art}
        {heading}
      </div>
    </div>
  )
}
