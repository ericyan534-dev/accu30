import { useState, type FormEvent } from 'react'
import { CONTACT_EMAIL } from '@/config'

type Kind = 'general' | 'press' | 'nomination'

interface EnquiryFormProps {
  readonly kind: Kind
  readonly heading: string
  readonly note: string
  readonly submitLabel: string
  /** Overrides CONTACT_EMAIL for this form (e.g. the press address). */
  readonly address?: string | null
}

interface Fields {
  readonly name: string
  readonly email: string
  readonly organisation: string
  readonly message: string
}

type Errors = Partial<Record<keyof Fields, string>>

const EMPTY: Fields = { name: '', email: '', organisation: '', message: '' }

const SUBJECTS: Record<Kind, string> = {
  general: 'Partnership enquiry',
  press: 'Press enquiry',
  nomination: 'Expression of interest',
}

/** Composes a mail draft rather than posting to an endpoint that does not
 *  exist. When no address is configured the form says so plainly instead of
 *  accepting input it cannot deliver. */
export default function EnquiryForm({
  kind,
  heading,
  note,
  submitLabel,
  address,
}: EnquiryFormProps) {
  const to = address !== undefined ? address : CONTACT_EMAIL
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  if (!to) {
    return (
      <section className="board on-dark p-8 sm:p-10">
        <h2 className="incised sign-lg text-xl">{heading}</h2>
        <p className="prose-body mt-4 text-on-board-2">
          No enquiry address has been published yet. Once ACC-U30 confirms one, this form will
          send to it.
        </p>
        <p className="sign mt-6 text-on-board-2">Address pending</p>
      </section>
    )
  }

  const update = (key: keyof Fields) => (value: string) => {
    setFields(prev => ({ ...prev, [key]: value }))
    setErrors(prev => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  const validate = (values: Fields): Errors => {
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Add your name so we know who is writing.'
    if (!values.email.trim()) next.email = 'Add an email address so we can reply.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      next.email = 'That address is missing an @ or a domain — check it and try again.'
    }
    if (values.message.trim().length < 20) {
      next.message = 'Tell us a little more — at least a sentence or two.'
    }
    return next
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    const body = [
      `Name: ${fields.name}`,
      fields.organisation ? `Organisation: ${fields.organisation}` : null,
      `Email: ${fields.email}`,
      '',
      fields.message,
    ]
      .filter(Boolean)
      .join('\n')

    window.location.href = `mailto:${to}?subject=${encodeURIComponent(
      SUBJECTS[kind],
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section className="board on-dark p-8 sm:p-10">
      <h2 className="incised sign-lg text-xl">{heading}</h2>
      <p className="sign mt-3 text-on-board-2">{note}</p>

      <form className="mt-8 grid gap-5" onSubmit={onSubmit} noValidate>
        <Field
          id={`${kind}-name`}
          label="Your name"
          value={fields.name}
          error={errors.name}
          onChange={update('name')}
          autoComplete="name"
        />
        <Field
          id={`${kind}-email`}
          label="Email"
          type="email"
          value={fields.email}
          error={errors.email}
          onChange={update('email')}
          autoComplete="email"
        />
        <Field
          id={`${kind}-org`}
          label="Organisation"
          optional
          value={fields.organisation}
          onChange={update('organisation')}
          autoComplete="organization"
        />
        <Field
          id={`${kind}-message`}
          label={kind === 'nomination' ? 'What have you built?' : 'What are you proposing?'}
          value={fields.message}
          error={errors.message}
          onChange={update('message')}
          multiline
        />

        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="action">
            {submitLabel}
          </button>
          {sent && (
            <p className="sign text-on-board" role="status">
              Your mail app should be open — send it and we will reply.
            </p>
          )}
        </div>
      </form>
    </section>
  )
}

interface FieldProps {
  readonly id: string
  readonly label: string
  readonly value: string
  readonly onChange: (value: string) => void
  readonly error?: string
  readonly type?: string
  readonly optional?: boolean
  readonly multiline?: boolean
  readonly autoComplete?: string
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  optional = false,
  multiline = false,
  autoComplete,
}: FieldProps) {
  const describedBy = error ? `${id}-error` : undefined
  const base =
    'w-full border bg-board-raised px-4 py-3 font-prose text-[0.98rem] text-on-board outline-none transition-colors placeholder:text-on-board-2 focus-visible:border-vermillion-lit'
  const borderClass = error ? 'border-vermillion-lit' : 'border-white/18'

  return (
    <div>
      <label htmlFor={id} className="sign mb-2 flex items-baseline gap-2 text-on-board-2">
        {label}
        {optional && <span className="normal-case tracking-normal opacity-70">(optional)</span>}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={5}
          className={`${base} ${borderClass} resize-y`}
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
      ) : (
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          className={`${base} ${borderClass}`}
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />
      )}
      {error && (
        <p id={describedBy} className="sign mt-2 text-vermillion-lit">
          {error}
        </p>
      )}
    </div>
  )
}
