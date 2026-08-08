import type { ApplicationField } from '@/content/types'

interface FormFieldProps {
  readonly field: ApplicationField
  /** The item number printed inside the cell, as on the paper form. */
  readonly item: number
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

/** One numbered item on Form ACC-U30 / M-1.
 *
 *  The cell carries the rule; the control inside it carries none. That is
 *  how the printed form is set, and the screen form is the same form. */
export default function FormField({ field, item, value, error, onChange }: FormFieldProps) {
  const errorId = `${field.id}-error`
  const hintId = `${field.id}-hint`
  const describedBy = [field.hint ? hintId : null, error ? errorId : null]
    .filter(Boolean)
    .join(' ')

  const words = field.maxWords ? countWords(value) : 0
  const over = field.maxWords ? words > field.maxWords : false

  return (
    <div className="form-cell">
      {/* The number hangs in its own column so a question long enough to wrap
          keeps its number beside it. Set inline it dropped onto a line of its
          own above the question, which is not how a form is numbered. */}
      <label htmlFor={field.id} className="sign grid grid-cols-[1.9rem_minmax(0,1fr)] text-ink">
        <span className="text-ink-3">{String(item).padStart(2, '0')}</span>
        <span className="break-words">
          {field.label}
          {field.optional && (
            <span className="ml-2 normal-case tracking-normal text-ink-3">optional</span>
          )}
        </span>
      </label>

      {field.hint && (
        <p id={hintId} className="prose-small mt-1 text-ink-3 italic">
          {field.hint}
        </p>
      )}

      {field.kind === 'long' ? (
        <textarea
          id={field.id}
          rows={field.maxWords && field.maxWords > 150 ? 8 : 6}
          className="form-field mt-3"
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
        />
      ) : field.kind === 'choice' ? (
        // One choice per line until there is room for two without breaking a
        // word in half: at 320px the two-up grid gave each option 114px and
        // cut "Entrepreneurship" off inside its own cell. The marks are 24px,
        // the rows 44px — a form filled in with a thumb.
        <fieldset className="mt-3 mb-0 border-0 p-0">
          <legend className="sr-only">{field.label}</legend>
          <div className="grid gap-x-6 gap-y-1 min-[27rem]:grid-cols-2 lg:grid-cols-4">
            {field.options?.map(option => (
              <label
                key={option}
                className="flex min-h-[44px] cursor-pointer items-center gap-3 text-[0.95rem] leading-snug text-ink-2"
              >
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={value === option}
                  onChange={e => onChange(e.target.value)}
                  aria-describedby={describedBy || undefined}
                  className="h-6 w-6 shrink-0 accent-[var(--color-vermillion)]"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>
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

      {(error || field.maxWords) && (
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          {error ? (
            <p id={errorId} className="prose-small text-vermillion-ink">
              {error}
            </p>
          ) : (
            <span />
          )}
          {field.maxWords && (
            <p className={`sign ${over ? 'text-vermillion-ink' : 'text-ink-3'}`} aria-live="polite">
              {words} / {field.maxWords} words
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export function countWords(value: string): number {
  const trimmed = value.trim()
  return trimmed ? trimmed.split(/\s+/).length : 0
}
