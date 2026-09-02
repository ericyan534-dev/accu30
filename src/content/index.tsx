import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { LocaleCode, SiteCopy } from './types'
import { en } from './en'
import { CONTACT_EMAIL } from '@/config'

/** Registry of available locales. Adding 中文 means adding `zh.ts` and one
 *  entry here — no component touches a string literal. */
const LOCALES: Partial<Record<LocaleCode, SiteCopy>> = { en }

const DEFAULT_LOCALE: LocaleCode = 'en'

const CopyContext = createContext<SiteCopy>(en)

interface CopyProviderProps {
  readonly locale?: LocaleCode
  readonly children: ReactNode
}

export function CopyProvider({ locale = DEFAULT_LOCALE, children }: CopyProviderProps) {
  const copy = useMemo(() => LOCALES[locale] ?? en, [locale])
  return <CopyContext.Provider value={copy}>{children}</CopyContext.Provider>
}

/** The single way any component reads user-facing text. */
export function useCopy(): SiteCopy {
  return useContext(CopyContext)
}

/** The label on any link into the Contact floor. It promises sending only
 *  while there is an address to send to; otherwise it names the floor. Four
 *  doors used to read "Send an enquiry" and open onto a plate saying that
 *  nothing could be sent. */
export function useEnquiryLabel(): string {
  const copy = useCopy()
  return CONTACT_EMAIL ? copy.actions.enquire : copy.actions.reach
}

export function availableLocales(): readonly LocaleCode[] {
  return Object.keys(LOCALES) as LocaleCode[]
}

export type { SiteCopy, LocaleCode }
