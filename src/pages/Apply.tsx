import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useCopy } from '@/content'
import type { ApplicationField } from '@/content/types'
import PageHeader from '@/components/PageHeader'
import Notice from '@/components/Notice'
import FormField, { countWords } from '@/components/FormField'
import ApplicationReview from '@/components/ApplicationReview'
import { APPLICATION_PDF, CONTACT_EMAIL } from '@/config'

type Values = Record<string, string>
type Errors = Record<string, string>

/** Form ACC-U30 / M-1, on screen.
 *
 *  There is no submission endpoint and no published address yet, so the form
 *  does not pretend to send. It validates, then hands the applicant a finished
 *  document they can print, save as a PDF, or copy — and it offers to mail it
 *  the moment an address exists in config. Nothing typed here leaves the
 *  browser until the applicant chooses. */
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

  return (
    <>
      <PageHeader
        floor='07·A'
        title={application.title}
        standfirst={application.standfirst}
        notice={application.eligibility}
        noticeLabel='Eligibility'
      />

      <div className="wrap py-12 sm:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-stone-edge pb-5">
          <p className="sign text-ink-3">{application.reference}</p>
          <a
            href={APPLICATION_PDF}
            className='link-row sign text-ink-2 hover:text-vermillion-ink'
            download
          >
            {copy.membership.downloadLabel} ↓
          </a>
        </div>
        <p className="prose-small mt-5 text-ink-3">
          {application.instructions}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
          {/* The same contents plate the venture pages use. On a form this
              long the reader wants to know how much is left. */}
          <nav
            aria-label='Sections of this form'
            className='lg:sticky lg:top-24 lg:self-start'
          >
            <p className="sign mb-4 text-ink-3">Sections</p>
            <ol className="list-none p-0">
              {[
                ...application.sections.map(s => ({
                  letter: s.letter,
                  title: s.title,
                })),
                {
                  letter: 'E',
                  title: application.declarationHeading,
                },
              ].map(section => (
                <li key={section.letter} className="border-t border-stone-edge">
                  <a
                    href={`#section-${section.letter}`}
                    className='link-row sign w-full gap-3 text-ink-2 hover:text-vermillion-ink'
                  >
                    <span className="text-ink-3">{section.letter}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <form className="max-w-[46rem]" onSubmit={onSubmit} noValidate>
            {application.sections.map(section => (
              <section
                key={section.letter}
                id={`section-${section.letter}`}
                className='mb-14 scroll-mt-24'
              >
                <div className="mb-8 flex items-baseline gap-4 border-b border-ink-3 pb-3">
                  <span className="sign-lg text-2xl text-vermillion-ink">
                    {section.letter}
                  </span>
                  <h2 className="sign-lg text-xl">{section.title}</h2>
                </div>

                {/* Short answers pair up; anything that needs a paragraph takes
                  the full measure. A telephone box 700px wide is not a form. */}
                <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  {section.fields.map(field => (
                    <div
                      key={field.id}
                      className={field.kind === 'long' ? 'sm:col-span-2' : ''}
                    >
                      <FormField
                        field={field}
                        value={values[field.id] ?? ''}
                        error={errors[field.id]}
                        onChange={update(field.id)}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* Section E — the declaration, which is the only place the form
              asks for agreement rather than information. */}
            <section id="section-E" className="mb-12 scroll-mt-24">
              <div className="mb-8 flex items-baseline gap-4 border-b border-ink-3 pb-3">
                <span className="sign-lg text-2xl text-vermillion-ink">E</span>
                <h2 className="sign-lg text-xl">
                  {application.declarationHeading}
                </h2>
              </div>

              <p className="prose-body text-ink-2">{application.declaration}</p>

              <label
                htmlFor='declaration'
                className='mt-6 flex min-h-[44px] cursor-pointer items-start gap-4'
              >
                <input
                  id='declaration'
                  type='checkbox'
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
                  aria-describedby={
                    errors.declaration ? 'declaration-error' : undefined
                  }
                  className='mt-1 h-5 w-5 shrink-0 accent-[var(--color-vermillion)]'
                />
                <span className="text-ink-2">
                  I confirm the declaration above.
                </span>
              </label>
              {errors.declaration && (
                <p
                  id='declaration-error'
                  className='prose-small mt-2 text-vermillion-ink'
                >
                  {errors.declaration}
                </p>
              )}
            </section>

            {errorCount > 0 && (
              <div className="mb-8">
                <Notice label="Not ready to send">
                  {errorCount === 1
                    ? 'One answer still needs attention — it is marked above.'
                    : `${errorCount} answers still need attention — they are marked above.`}
                </Notice>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" className="action">
                {application.submitLabel}
              </button>
              <Link to="/membership" className="action action-ghost">
                Back to membership
              </Link>
            </div>

            {!CONTACT_EMAIL && (
              <p className="prose-small mt-8 text-ink-3">
                {application.noAddressNote}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(
  fields: readonly ApplicationField[],
  values: Values,
  agreed: boolean,
): Errors {
  const errors: Errors = {}

  for (const field of fields) {
    const value = (values[field.id] ?? '').trim()

    if (!value) {
      if (!field.optional)
        errors[field.id] = 'This section of the form cannot be left blank.'
      continue
    }

    if (field.kind === 'email' && !EMAIL.test(value)) {
      errors[field.id] =
        'That address is missing an @ or a domain — check it and try again.'
    }

    if (field.kind === 'date') {
      const age = ageOn(value)
      if (age === null)
        errors[field.id] = 'Enter a date of birth in the form DD / MM / YYYY.'
      else if (age >= 30)
        errors[field.id] = 'Membership is open to applicants under thirty.'
      else if (age < 13)
        errors[field.id] = 'Check the year — that date reads as under thirteen.'
    }

    if (field.maxWords && countWords(value) > field.maxWords) {
      errors[field.id] = `Trim this to ${field.maxWords} words or fewer.`
    }
  }

  if (!agreed)
    errors.declaration =
      'The declaration has to be confirmed before the form is complete.'

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
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < born.getDate()))
    age -= 1
  return age
}
