import { useState } from 'react'
import { useCopy } from '@/content'
import { CONTACT_EMAIL } from '@/config'

interface ApplicationReviewProps {
  readonly values: Record<string, string>
  readonly onEdit: () => void
}

/** The completed application, set as a document rather than as a receipt.
 *
 *  This is the artifact the applicant actually sends, so it carries the form
 *  reference, the declaration and a signature block, and it prints on its own
 *  — the site chrome is dropped by the print rules in index.css. */
export default function ApplicationReview({ values, onEdit }: ApplicationReviewProps) {
  const copy = useCopy()
  const { application } = copy
  const [copied, setCopied] = useState(false)

  const plain = toPlainText(copy, values)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(plain)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 4000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="wrap py-12 sm:py-16">
      {/* Screen-only header. The document below is what prints. */}
      <div className="print:hidden">
        <h1 className="cut incised-stone display-3">{application.reviewHeading}</h1>
        <p className="prose-body mt-5 text-lg text-ink-2">{application.reviewBody}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="button" className="action" onClick={() => window.print()}>
            {application.printLabel}
          </button>
          <button type="button" className="action action-ghost" onClick={onEdit}>
            {application.editLabel}
          </button>
          <button type="button" className="action action-ghost" onClick={onCopy}>
            {copied ? application.copiedLabel : application.copyLabel}
          </button>
          {CONTACT_EMAIL && (
            <a
              className="action action-ghost"
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                `${application.reference} — ${values.fullName ?? 'Application'}`,
              )}&body=${encodeURIComponent(plain)}`}
            >
              Send by email
            </a>
          )}
        </div>

        {!CONTACT_EMAIL && (
          <p className="prose-small mt-6 text-ink-3">{application.noAddressNote}</p>
        )}
      </div>

      {/* ── The document ────────────────────────────────────────────────── */}
      <article className="application-doc mt-12 max-w-[46rem] border-t-2 border-ink pt-6">
        <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="sign-lg text-base">{copy.org.name}</p>
          <p className="sign text-ink-3">{application.reference}</p>
        </header>
        <h2 className="sign-lg mt-4 text-2xl">{application.title}</h2>

        {copy.application.sections.map(section => (
          <section key={section.letter} className="mt-9">
            <h3 className="sign-lg border-b border-stone-edge pb-2 text-base">
              {section.letter} · {section.title}
            </h3>
            <dl className="m-0">
              {section.fields.map(field => {
                const value = present(field.kind, values[field.id] ?? '')
                return (
                  <div
                    key={field.id}
                    className="grid gap-x-8 gap-y-1 border-b border-stone-edge py-3 sm:grid-cols-[16rem_1fr]"
                  >
                    <dt className="sign text-ink-3">{field.label}</dt>
                    <dd className="m-0 whitespace-pre-line text-ink">
                      {value || <span className="text-ink-3">—</span>}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </section>
        ))}

        <section className="mt-9">
          <h3 className="sign-lg border-b border-stone-edge pb-2 text-base">
            E · {application.declarationHeading}
          </h3>
          <p className="prose-small mt-4 text-ink-2">{application.declaration}</p>

          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-[1fr_10rem]">
            <SignatureRule label="Signature" />
            <SignatureRule label="Date" />
          </div>
        </section>

        <p className="sign mt-10 text-ink-3">
          {copy.org.short} · {copy.org.city}
        </p>
      </article>
    </div>
  )
}

/** A document does not print `2004-05-02`. Everything else passes through
 *  exactly as the applicant typed it. */
function present(kind: string, raw: string): string {
  const value = raw.trim()
  if (kind !== 'date' || !value) return value

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function SignatureRule({ label }: { readonly label: string }) {
  return (
    <div>
      <div className="h-10 border-b border-ink-3" />
      <p className="sign mt-2 text-ink-3">{label}</p>
    </div>
  )
}

/** The same application as plain text, for email and clipboard. */
function toPlainText(copy: ReturnType<typeof useCopy>, values: Record<string, string>): string {
  const lines: string[] = [
    copy.org.name,
    copy.application.title,
    copy.application.reference,
    '',
  ]

  for (const section of copy.application.sections) {
    lines.push(`${section.letter}. ${section.title.toUpperCase()}`)
    for (const field of section.fields) {
      lines.push(`${field.label}: ${present(field.kind, values[field.id] ?? '') || '—'}`)
    }
    lines.push('')
  }

  lines.push('E. DECLARATION', copy.application.declaration, '', 'Confirmed by the applicant.')
  return lines.join('\n')
}
