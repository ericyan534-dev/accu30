import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useCopy } from '@/content'
import type { ApplicationField } from '@/content/types'
import FormField, { countWords } from '@/components/FormField'
import ApplicationReview from '@/components/ApplicationReview'
import { APPLICATION_PDF, CONTACT_EMAIL } from '@/config'

type Values = Record<string, string>
type Errors = Record<string, string>

/** Form ACC-U30 / M-1, on screen — the same form as the printed one.
 *
 *  A federal-register grid: a boxed masthead with the form number in its own
 *  cell, a dense instruction box, a black band per section, and numbered
 *  items in ruled cells that share their edges. There is no submission
 *  endpoint and no published address yet, so the form does not pretend to
 *  send: it validates, then hands the applicant a finished document to print,
 *  save, or copy. Nothing typed here leaves the browser until they choose. */
export default function Apply() {
  const copy = useCopy()
  const { application } = copy
  const fields = useMemo(
    () => application.sections.flatMap(section => section.fields),
    [application.sections],
  )

  const [values, setValues] = useState<Values>({})
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [reviewing, setReviewing] = useState(false)

  const update = (id: string) => (value: string) => {
    setValues(prev => ({ ...prev, [id]: value }))
    setErrors(prev => {
      if (!prev[id]) return prev
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validate(fields, values, agreed)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      const first = document.getElementById(Object.keys(found)[0])
      first?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      first?.focus({ preventScroll: true })
      return
    }

    setReviewing(true)
    window.scrollTo({ top: 0 })
  }

  if (reviewing) {
    return (
      <ApplicationReview
        values={values}
        onEdit={() => {
          setReviewing(false)
          window.scrollTo({ top: 0 })
        }}
      />
    )
  }

  const errorCount = Object.keys(errors).length
  let item = 0

  return (
    <div className="wrap py-10 sm:py-14">
      <form className="mx-auto max-w-[62rem]" onSubmit={onSubmit} noValidate>
        {/* ── Masthead, boxed, with the form number in its own cell ─────── */}
        <div className="grid border border-ink sm:grid-cols-[1fr_14rem]">
          <div className="flex flex-col justify-center px-5 py-5 sm:px-7">
            <p className="sign-lg text-lg sm:text-xl">{copy.org.name}</p>
            <p className="prose-small mt-1 text-ink-2 italic">
              {copy.org.city} · {copy.org.kind}
            </p>
          </div>
          <dl className="m-0 grid border-t border-ink sm:border-t-0 sm:border-l">
            <div className="flex items-baseline justify-between gap-4 border-b border-ink px-4 py-2">
              <dt className="sign text-ink-3">Form no.</dt>
              <dd className="sign m-0 text-ink">ACC-U30 / M-1</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 px-4 py-2">
              <dt className="sign text-ink-3">Edition</dt>
              <dd className="sign m-0 text-ink">08/2026</dd>
            </div>
          </dl>
        </div>

        <div className="border-x border-b border-ink px-5 py-4 sm:px-7">
          <h1 className="sign-lg display-4">{application.title}</h1>
        </div>

        <div className="h-[3px] w-full bg-vermillion" />

        <div className="border-x border-b border-ink px-5 py-4 sm:px-7">
          <p className="sign mb-2 text-ink-3">Instructions</p>
          <p className="prose-small max-w-none text-ink-2">
            {application.standfirst} {application.eligibility}
          </p>
          <a
            href={APPLICATION_PDF}
            className="link-row sign mt-1 text-ink hover:text-vermillion-ink"
            download
          >
            {copy.membership.downloadLabel} ↓
          </a>
        </div>

        {/* ── Sections A–D ─────────────────────────────────────────────── */}
        {application.sections.map(section => (
          <section key={section.letter} id={`section-${section.letter}`} className="scroll-mt-24">
            <SectionBand letter={section.letter} title={section.title} />
            <div className="form-grid grid sm:grid-cols-2">
              {spans(section.fields).map(({ field, wide }) => {
                item += 1
                return (
                  <div key={field.id} className={wide ? 'flex sm:col-span-2' : 'flex'}>
                    <FormField
                      field={field}
                      item={item}
                      value={values[field.id] ?? ''}
                      error={errors[field.id]}
                      onChange={update(field.id)}
                    />
                  </div>
                )
              })}
            </div>
          </section>
        ))}

        {/* ── Section E — declaration ───────────────────────────────────── */}
        <section id="section-E" className="scroll-mt-24">
          <SectionBand letter="E" title={application.declarationHeading} />
          <div className="form-grid">
            <div className="form-cell">
              <p className="prose-small max-w-none text-ink-2">{application.declaration}</p>
              <label
                htmlFor="declaration"
                className="mt-5 flex min-h-[44px] cursor-pointer items-center gap-3.5"
              >
                <input
                  id="declaration"
                  type="checkbox"
                  checked={agreed}
                  onChange={e => {
                    setAgreed(e.target.checked)
                    setErrors(prev => {
                      if (!prev.declaration) return prev
                      const next = { ...prev }
                      delete next.declaration
                      return next
                    })
                  }}
                  aria-invalid={Boolean(errors.declaration)}
                  aria-describedby={errors.declaration ? 'declaration-error' : undefined}
                  className="h-6 w-6 shrink-0 accent-[var(--color-vermillion)]"
                />
                <span className="text-ink">I confirm the declaration above.</span>
              </label>
              {errors.declaration && (
                <p id="declaration-error" className="prose-small mt-2 text-vermillion-ink">
                  {errors.declaration}
                </p>
              )}
            </div>
          </div>
        </section>

        {errorCount > 0 && (
          <p
            role="alert"
            className="prose-small mt-6 border-l-2 border-vermillion-ink pl-4 text-vermillion-ink"
          >
            {errorCount === 1
              ? 'One item still needs attention — it is marked above.'
              : `${errorCount} items still need attention — they are marked above.`}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="submit" className="action">
            {application.submitLabel}
          </button>
          <Link to="/membership" className="action action-ghost">
            Back to membership
          </Link>
        </div>

        {!CONTACT_EMAIL && (
          <p className="prose-small mt-7 text-ink-3">{application.noAddressNote}</p>
        )}
      </form>
    </div>
  )
}

/** A full-width black band, reversed out — the hard division a form uses
 *  between sections, where a web page would use a hairline. */
function SectionBand({ letter, title }: { readonly letter: string; readonly title: string }) {
  return (
    <h2 className="form-band sign-lg mt-10 text-base">
      <span className="opacity-70">{letter}</span>
      <span>{title}</span>
    </h2>
  )
}

/** Works out which cells span the full width.
 *
 *  Free responses and choice lists always do. A short item that would end up
 *  alone on the last row is widened too, because a form with a hole punched
 *  in its grid stops looking like a form. */
function spans(
  fields: readonly ApplicationField[],
): { field: ApplicationField; wide: boolean }[] {
  const out = fields.map(field => ({
    field,
    wide: field.kind === 'long' || field.kind === 'choice',
  }))

  let column = 0
  for (let i = 0; i < out.length; i += 1) {
    if (out[i].wide) {
      column = 0
      continue
    }
    const startsRow = column === 0
    const nextIsNarrowSibling = !startsRow || (out[i + 1] && !out[i + 1].wide)
    if (startsRow && !nextIsNarrowSibling) out[i].wide = true
    column = out[i].wide ? 0 : (column + 1) % 2
  }
  return out
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(fields: readonly ApplicationField[], values: Values, agreed: boolean): Errors {
  const errors: Errors = {}

  for (const field of fields) {
    const value = (values[field.id] ?? '').trim()

    if (!value) {
      if (!field.optional) errors[field.id] = 'This item cannot be left blank.'
      continue
    }

    if (field.kind === 'email' && !EMAIL.test(value)) {
      errors[field.id] = 'That address is missing an @ or a domain — check it and try again.'
    }

    if (field.kind === 'date') {
      const age = ageOn(value)
      if (age === null) errors[field.id] = 'Enter a date of birth in the form DD / MM / YYYY.'
      else if (age >= 30) errors[field.id] = 'Membership is open to applicants under thirty.'
      else if (age < 13) errors[field.id] = 'Check the year — that date reads as under thirteen.'
    }

    if (field.maxWords && countWords(value) > field.maxWords) {
      errors[field.id] = `Trim this to ${field.maxWords} words or fewer.`
    }
  }

  if (!agreed) errors.declaration = 'The declaration has to be confirmed before the form is complete.'

  return errors
}

/** Whole years old today, or null if the date is unusable. */
function ageOn(iso: string): number | null {
  const born = new Date(iso)
  if (Number.isNaN(born.getTime())) return null

  const today = new Date()
  if (born > today) return null

  let age = today.getFullYear() - born.getFullYear()
  const monthDelta = today.getMonth() - born.getMonth()
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < born.getDate())) age -= 1
  return age
}
