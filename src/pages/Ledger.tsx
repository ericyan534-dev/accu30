import { Link } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import { useEnquiryLabel } from '@/content'

interface LedgerProps {
  readonly floor: string
  readonly title: string
  readonly standfirst: string
  readonly emptyHeading: string
  readonly emptyBody: string
}

/** Shared page for sections that are real but have nothing published yet
 *  (News, Partners). The empty state is designed, stated plainly, and offers
 *  the reader somewhere to go — it never fabricates entries to look busy. */
export default function Ledger({
  floor,
  title,
  standfirst,
  emptyHeading,
  emptyBody,
}: LedgerProps) {
  const enquiryLabel = useEnquiryLabel()

  return (
    <>
      <PageHeader floor={floor} title={title} standfirst={standfirst} />

      <div className="wrap pt-12 pb-20 sm:pt-16 sm:pb-24">
        <div className="board on-dark px-8 py-14 sm:px-12 sm:py-20">
          <h2 className="incised sign-lg text-2xl">{emptyHeading}</h2>
          <p className="prose-body mt-5 text-on-board-2">{emptyBody}</p>
          <Link to="/contact" className="action action-ghost mt-8">
            {enquiryLabel}
          </Link>
        </div>
      </div>
    </>
  )
}
