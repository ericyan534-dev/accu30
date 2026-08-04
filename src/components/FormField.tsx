import type { ApplicationField } from '@/content/types'

interface FormFieldProps {
  readonly field: ApplicationField
  readonly value: string
  readonly error?: string
  readonly onChange: (value: string) => void
}

const INPUT_TYPE: Record<string, string> = {
  text: 'text',
  email: 'email',
  tel: 'tel',
  date: 'date',
}

/** One numbered question on the application, set the way a form sets one:
 *  label above, rule below, help and errors in the same column so nothing
 *  about the question ever appears to the side of it. */
export default function FormField({ field, value, error, onChange }: FormFieldProps) {
  const errorId = `${field.id}-error`
  const hintId = `${field.id}-hint`
  const describedBy = [field.hint ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ')

  const words = field.maxWords ? countWords(value) : 0
  const over = field.maxWords ? words > field.maxWords : false

  return (
    <div>
      <label htmlFor={field.id} className="sign mb-2 flex flex-wrap items-baseline gap-x-2 text-ink-2">
        {field.label}
        {field.optional && (
          <span className="normal-case tracking-normal text-ink-3">(optional)</span>
        )}
      </label>

      {field.hint && (
        <p id={hintId} className="prose-small mb-2 text-ink-3">
          {field.hint}
        </p>
      )}

      {field.kind === 'long' ? (
        <textarea
          id={field.id}
          rows={field.maxWords && field.maxWords > 150 ? 7 : 5}
          className="form-field"
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
        />
      ) : field.kind === 'choice' ? (
        <select
          id={field.id}
          className="form-field"
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
        >
          <option value="">Select one</option>
          {field.options?.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={field.id}
          type={INPUT_TYPE[field.kind] ?? 'text'}
          className="form-field"
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
        />
      )}

      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        {error ? (
          <p id={errorId} className="prose-small text-vermillion-ink">
            {error}
          </p>
        ) : (
          <span />
        )}
        {field.maxWords && (
          <p
            className={`sign ${over ? 'text-vermillion-ink' : 'text-ink-3'}`}
            aria-live="polite"
          >
            {words} / {field.maxWords} words
          </p>
        )}
      </div>
    </div>
  )
}

export function countWords(value: string): number {
  const trimmed = value.trim()
  return trimmed ? trimmed.split(/\s+/).length : 0
}
