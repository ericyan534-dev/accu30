import { useCopy } from '@/content'
import PageHeader from '@/components/PageHeader'
import EnquiryForm from '@/components/EnquiryForm'

export default function Membership() {
  const copy = useCopy()

  return (
    <>
      <PageHeader
        floor="07"
        title={copy.membership.title}
        standfirst={copy.membership.standfirst}
      />

      <div className="wrap grid gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          {copy.membership.body.map((para, i) => (
            <p key={i} className={`prose-body${i > 0 ? ' mt-4' : ''} text-ink-2`}>
              {para}
            </p>
          ))}

          <h2 className="sign-lg mt-10 mb-5 text-xl">{copy.membership.criteriaHeading}</h2>
          <ul className="list-none p-0">
            {copy.membership.criteria.map((item, i) => (
              <li
                key={item}
                className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-stone-edge py-4"
              >
                <span className="sign text-vermillion">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-ink-2">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <EnquiryForm
            kind="nomination"
            heading={copy.actions.nominate}
            note={copy.membership.formNote}
            submitLabel={copy.actions.nominate}
          />
        </div>
      </div>
    </>
  )
}
