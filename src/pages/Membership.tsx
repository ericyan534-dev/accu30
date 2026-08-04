import { Link } from 'react-router-dom'
import { useCopy } from '@/content'
import PageHeader from '@/components/PageHeader'
import { APPLICATION_PDF } from '@/config'

/** Membership changed from nomination to application, so this page's job
 *  changed with it: it used to state a standard and close the door. It now
 *  states the standard, shows what happens after you knock, and puts two real
 *  doors at the end — the on-screen form and the printed one. */
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
                <span className="sign text-vermillion-ink">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-ink-2">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The two doors, on the board, where the actions live. */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <section className="board on-dark p-8 sm:p-10">
            <h2 className="incised sign-lg text-xl">{copy.membership.applyHeading}</h2>
            <p className="prose-body mt-4 text-on-board-2">{copy.membership.applyBody}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/membership/apply" className="action">
                {copy.actions.nominate}
              </Link>
              <a href={APPLICATION_PDF} className="action action-ghost" download>
                {copy.membership.downloadLabel}
              </a>
            </div>

            <p className="sign mt-5 text-on-board-2">{copy.membership.downloadNote}</p>
            <p className="prose-small mt-6 border-t border-white/12 pt-5 text-on-board-2">
              {copy.membership.formNote}
            </p>
          </section>
        </div>
      </div>

      {/* What happens after it is sent. The numbers are the sequence, and the
          sequence is the information. */}
      <section className="board on-dark py-14 sm:py-20" aria-labelledby="process-heading">
        <div className="wrap">
          <h2 id="process-heading" className="sign-lg display-4 mb-9 text-on-board">
            {copy.membership.processHeading}
          </h2>
          <ol className="grid list-none gap-x-10 gap-y-0 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {copy.membership.process.map((stage, i) => (
              <li key={stage.step} className="border-t border-white/20 pt-5 pb-7">
                <p className="dir-floor text-left text-on-board-2">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="dir-name mt-3 text-on-board">{stage.step}</h3>
                <p className="prose-small mt-3 text-on-board-2">{stage.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
