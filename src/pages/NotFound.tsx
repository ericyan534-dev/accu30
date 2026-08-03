import { Link } from 'react-router-dom'
import { useCopy } from '@/content'
import Directory from '@/components/Directory'
import Relief from '@/components/Relief'

export default function NotFound() {
  const copy = useCopy()

  return (
    <>
      <header className="relative overflow-hidden border-b border-stone-edge bg-linear-to-b from-stone to-stone-deep">
        <Relief className="right-[-10%] bottom-[-36%] hidden w-[min(38vw,420px)] text-ink lg:block" opacity={0.05} />
        <div className="wrap relative py-16 sm:py-24">
          <p className="sign mb-5 text-vermillion">404</p>
          <h1 className="cut incised-stone display-1 max-w-[14ch]">
            {copy.notFound.title}
          </h1>
          <p className="prose-body mt-6 text-lg text-ink-2">{copy.notFound.body}</p>
          <Link to="/" className="action mt-8">
            {copy.notFound.action}
          </Link>
        </div>
      </header>

      <section className="board on-dark py-14">
        <div className="wrap">
          <Directory />
        </div>
      </section>
    </>
  )
}
