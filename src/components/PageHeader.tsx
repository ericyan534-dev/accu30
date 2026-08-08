import Relief from './Relief'
import Notice from './Notice'

interface PageHeaderProps {
  readonly floor: string
  readonly title: string
  readonly standfirst?: string
  /** A condition the reader must not misread, e.g. the building's status. */
  readonly notice?: string
  readonly noticeLabel?: string
  /** An emblem belonging to whatever is on this floor — a tenant's own mark.
   *  Reproduced as supplied; never recoloured to match the wall. */
  readonly mark?: string | null
  readonly markAlt?: string
}

/** Every page opens on the stone wall with its floor designation cut beside
 *  the title — the reader always knows which floor they are on. */
export default function PageHeader({
  floor,
  title,
  standfirst,
  notice,
  noticeLabel = 'Please note',
  mark,
  markAlt = '',
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-stone-edge bg-linear-to-b from-stone to-stone-deep">
      {/* Kept clear of the text column so it never competes with reading.
          The narrow cut is its own: held to 38vw a phone got a 148px mark it
          could not read, so it was hidden and every floor opened on a blank
          grey band instead. Here it is carved across the foot of the plate
          and runs off the bottom-right corner. */}
      <Relief
        className="right-[-26%] bottom-[-34%] w-[96vw] text-ink lg:hidden"
        opacity={0.055}
      />
      <Relief
        className="right-[-10%] bottom-[-38%] hidden w-[min(38vw,420px)] text-ink lg:block"
        opacity={0.05}
      />
      <div className="wrap relative py-14 sm:py-20">
        <p className="sign mb-5 text-ink-3">Floor {floor}</p>
        {mark && (
          <img
            src={mark}
            alt={markAlt}
            className="mb-6 block h-14 w-auto sm:h-16"
            loading="eager"
          />
        )}
        <h1
          className="cut incised-stone display-1 max-w-[16ch]"
        >
          {title}
        </h1>
        {standfirst && <p className="prose-body mt-6 text-lg text-ink-2">{standfirst}</p>}
        {notice && (
          <div className="mt-8">
            <Notice label={noticeLabel}>{notice}</Notice>
          </div>
        )}
      </div>
    </header>
  )
}
