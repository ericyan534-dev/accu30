import { useCopy } from '@/content'
import type { Venture } from '@/content/types'
import wordmarkLight from '@/assets/ringing/wordmark-light.webp'
import birdHero from '@/assets/ringing/bird-hero.webp'
import banner from '@/assets/ringing/banner.webp'
import fbtiScreen from '@/assets/ringing/fbti-screen.webp'
import siteHome from '@/assets/ventures/ringing-site-home.webp'

interface RingIngProps {
  readonly venture: Venture
}

/** Ring-ing does not get the tenant listing. It gets the floor.
 *
 *  Every other venture is read on the stone wall as prose under a directory
 *  designation. This one opens on the board with its own wordmark, its own
 *  line and its own bird, and the sixteen FBTI archetypes are racked as
 *  plates — the one place on this site where another organisation's colour is
 *  allowed to be the loudest thing in the room. It stays inside the world:
 *  same grounds, same signage, zero radius, no shadow, no scroll theatre. */
export default function RingIng({ venture }: RingIngProps) {
  const copy = useCopy()
  const ringing = copy.ringing

  return (
    <>
      {/* ── The floor's own masthead ────────────────────────────────────── */}
      <header className="board on-dark relative overflow-hidden">
        {/* The bird is the venture's artwork, not borrowed reference, so it
            is not framed — it bleeds off the plate the way signage does. */}
        <img
          src={birdHero}
          alt=""
          className="pointer-events-none absolute right-[-6%] bottom-[-14%] hidden w-[min(42vw,520px)] lg:block"
          loading="eager"
        />

        <div className="wrap relative py-14 sm:py-20">
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <p className="sign text-on-board-2">Floor {venture.floor}</p>
            <p className="sign text-vermillion-lit">{ringing.kicker}</p>
          </div>

          <h1 className="mt-7">
            <img
              src={wordmarkLight}
              alt={venture.name}
              className="h-11 w-auto sm:h-14"
              width={900}
              height={262}
            />
          </h1>

          <p className="cut incised display-2 mt-8 max-w-[17ch] text-on-board">
            {ringing.tagline}
          </p>
          <p className="sign mt-4 text-on-board-2">{ringing.taglineNote}</p>

          <p className="prose-body mt-8 max-w-[54ch] text-lg text-on-board-2">
            {venture.summary}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              className="action"
              href={ringing.siteUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visit {ringing.siteLabel} ↗
            </a>
            <a className="action action-ghost" href="#about">
              Read the venture
            </a>
          </div>
        </div>
      </header>

      {/* ── Sixteen birds ──────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20" aria-labelledby="mascots-heading">
        <div className="wrap">
          <div className="max-w-[62ch]">
            <h2 id="mascots-heading" className="display-2">
              {ringing.mascotHeading}
            </h2>
            <p className="prose-body mt-5 text-lg text-ink-2">{ringing.mascotStandfirst}</p>
          </div>

          <ul className="mt-10 grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-3 lg:grid-cols-4">
            {ringing.mascots.map((mascot, i) => (
              <li
                key={mascot.code}
                className="set-in bg-board-raised"
                style={{ animationDelay: `${Math.min(i, 15) * 34}ms` }}
              >
                <img
                  src={mascot.art}
                  alt={`Ring-ing's ${mascot.code} archetype, drawn as the Ring-ing bird`}
                  className="block w-full"
                  width={640}
                  height={640}
                  loading={i < 4 ? 'eager' : 'lazy'}
                />
                <div
                  aria-hidden="true"
                  className="h-[3px] w-full"
                  style={{ background: mascot.accent }}
                />
                <p className="sign px-3 py-3 text-on-board">{mascot.code}</p>
              </li>
            ))}
          </ul>

          <p className="prose-small mt-7 text-ink-3">{ringing.mascotNote}</p>
        </div>
      </section>

      {/* ── The product, and the venture's own banner ───────────────────── */}
      <section className="board on-dark py-14 sm:py-20" aria-labelledby="product-heading">
        <div className="wrap">
          <div className="mb-9 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <h2 id="product-heading" className="sign-lg display-4 text-on-board">
              {ringing.productHeading}
            </h2>
            <a
              className="link-row sign text-on-board-2 hover:text-on-board"
              href={ringing.siteUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              {ringing.siteLabel} ↗
            </a>
          </div>

          {/* items-start, and only images of comparable proportion in one
              row. A plate that stretches to a taller neighbour turns into a
              mount with nothing mounted on it. */}
          <div className="grid items-start gap-5 md:grid-cols-2">
            <figure className="plate own">
              <img src={siteHome} alt="The Ring-ing landing page" loading="lazy" />
              <figcaption>
                <span>Ring-ing</span>
                <span>Landing page</span>
              </figcaption>
            </figure>
            <figure className="plate own">
              <img
                src={fbtiScreen}
                alt="The FBTI profile view inside the Ring-ing workspace, showing one of the sixteen birds"
                loading="lazy"
              />
              <figcaption>
                <span>Ring-ing</span>
                <span>FBTI profile · the bird in use</span>
              </figcaption>
            </figure>
            <figure className="plate own md:col-span-2">
              <img src={banner} alt="The Ring-ing brand banner" loading="lazy" />
              <figcaption>
                <span>Ring-ing</span>
                <span>Brand banner</span>
              </figcaption>
            </figure>
          </div>

          <p className="prose-small mt-7 text-on-board-2">{ringing.productNote}</p>
        </div>
      </section>

      {/* ── The venture in its own words, section list unchanged ────────── */}
      <div className="wrap grid gap-10 py-12 sm:py-16 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
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
          {venture.sections.map((section, i) => (
            <section
              key={section.label}
              id={i === 0 ? 'about' : slugify(section.label)}
              className="scroll-mt-24 border-b border-stone-edge py-9 first:pt-0 last:border-b-0"
            >
              <h2 className="sign-lg mb-5 text-2xl">{section.label}</h2>
              {section.body.map((para, j) => (
                <p key={j} className={`prose-body${j > 0 ? ' mt-4' : ''} text-ink-2`}>
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
