import { useCopy } from '@/content'
import PageHeader from '@/components/PageHeader'
import EnquiryForm from '@/components/EnquiryForm'
import { CONTACT_EMAIL, POSTAL_ADDRESS, pressAddress } from '@/config'

export default function Contact() {
  const copy = useCopy()
  const press = pressAddress()

  return (
    <>
      <PageHeader floor="08" title={copy.contact.title} standfirst={copy.contact.standfirst} />

      <div className="wrap grid gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <section className="border-b border-stone-edge pb-8">
            <h2 className="sign-lg mb-4 text-xl">{copy.contact.generalHeading}</h2>
            {/* The purpose is always true; the instruction to write is only
                true once there is an address to write to. */}
            <p className="prose-body text-ink-2">
              {copy.contact.generalBody}
              {CONTACT_EMAIL && <> {copy.contact.generalAsk}</>}
            </p>
            {CONTACT_EMAIL && (
              <a href={`mailto:${CONTACT_EMAIL}`} className="sign mt-4 inline-block text-vermillion-ink">
                {CONTACT_EMAIL}
              </a>
            )}
          </section>

          <section className="border-b border-stone-edge py-8">
            <h2 className="sign-lg mb-4 text-xl">{copy.contact.pressHeading}</h2>
            <p className="prose-body text-ink-2">{copy.contact.pressBody}</p>
            {press && (
              <a href={`mailto:${press}`} className="sign mt-4 inline-block text-vermillion-ink">
                {press}
              </a>
            )}
          </section>

          <section className="pt-8">
            <h2 className="sign-lg mb-4 text-xl">{copy.contact.addressHeading}</h2>
            <p className="prose-body text-ink-2">{POSTAL_ADDRESS ?? copy.contact.addressBody}</p>
          </section>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <EnquiryForm kind="general" />
        </div>
      </div>
    </>
  )
}
