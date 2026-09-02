import { useState, type FormEvent } from 'react'
import { useCopy } from '@/content'
import { CONTACT_EMAIL } from '@/config'

type Kind = 'general' | 'press' | 'nomination'

interface EnquiryFormProps {
  readonly kind: Kind
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

/** Composes a mail draft rather than posting to an endpoint that does not
 *  exist. When no address is configured the form does not render at all: the
 *  same plate says so, in words that do not point at a form the reader
 *  cannot see. Every string comes from the locale layer, so 中文 is a second
 *  copy file and not a second component. */
export default function EnquiryForm({ kind, address }: EnquiryFormProps) {
  const copy = useCopy()
  const text = copy.enquiry
  const to = address !== undefined ? address : CONTACT_EMAIL
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  if (!to) {
    return (
      <section className="board on-dark p-8 sm:p-10">
        <h2 className="incised sign-lg text-xl">{text.pendingHeading}</h2>
        <p className="prose-body mt-4 text-on-board-2">{text.pendingBody}</p>
      </section>
    )
  }

  const update = (key: keyof Fields) => (value: string) => {
    setFields(prev => ({ ...prev, [key]: value }))
    setErrors(prev => (prev[key] ? { ...prev, [key]: undefined } : prev))
  }

  const validate = (values: Fields): Errors => {
    const next: Errors = {}
    if (!values.name.trim()) next.name = text.errors.name
    if (!values.email.trim()) next.email = text.errors.email
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      next.email = text.errors.emailFormat
    }
    if (values.message.trim().length < 20) next.message = text.errors.message
    return next
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    const body = [
      `${text.nameLabel}: ${fields.name}`,
      fields.organisation ? `${text.organisationLabel}: ${fields.organisation}` : null,
      `${text.emailLabel}: ${fields.email}`,
      '',
      fields.message,
    ]
      .filter(Boolean)
      .join('\n')

    window.location.href = `mailto:${to}?subject=${encodeURIComponent(
      text.subjects[kind],
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section className="board on-dark p-8 sm:p-10">
      <h2 className="incised sign-lg text-xl">{text.heading}</h2>
      <p className="prose-small mt-3 text-on-board-2">{text.note}</p>

      <form className="mt-8 grid gap-5" onSubmit={onSubmit} noValidate>
        <Field
          id={`${kind}-name`}
          label={text.nameLabel}
          value={fields.name}
          error={errors.name}
          onChange={update('name')}
          autoComplete="name"
        />
        <Field
          id={`${kind}-email`}
          label={text.emailLabel}
          type="email"
          value={fields.email}
          error={errors.email}
          onChange={update('email')}
          autoComplete="email"
        />
        <Field
          id={`${kind}-org`}
          label={text.organisationLabel}
          optional={text.optional}
          value={fields.organisation}
          onChange={update('organisation')}
          autoComplete="organization"
        />
        <Field
          id={`${kind}-message`}
          label={kind === 'nomination' ? text.nominationMessageLabel : text.messageLabel}
          value={fields.message}
          error={errors.message}
          onChange={update('message')}
          multiline
        />

        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="action">
            {copy.actions.enquire}
          </button>
          {sent && (
            <p className="prose-small text-on-board" role="status">
              {text.sent}
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
  /** The word that marks the field optional, in the reader's language. */
  readonly optional?: string
  readonly multiline?: boolean
  readonly autoComplete?: string
}

/** One ruled box on the board. The error is a sentence, so it is set as one:
 *  serif, in the reading colour. The red stays on the field's edge, where
 *  4.19:1 is enough for a line and not for words. */
function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = 'text',
  optional,
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
        {optional && <span className="normal-case tracking-normal opacity-70">{optional}</span>}
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
        <p id={describedBy} className="prose-small mt-2 text-on-board">
          {error}
        </p>
      )}
    </div>
  )
}
