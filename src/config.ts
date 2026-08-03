/** Deployment configuration.
 *
 *  These are deliberately empty. PRODUCT.md records the contact address and
 *  press address as NOT YET ESTABLISHED, and the site must not invent them.
 *  Fill these in and every form and contact link starts working — nothing
 *  else needs to change. */

/** General and partnership enquiries. */
export const CONTACT_EMAIL: string | null = null

/** Press and media enquiries. Falls back to CONTACT_EMAIL when unset. */
export const PRESS_EMAIL: string | null = null

/** Public postal address, once the office is confirmed. */
export const POSTAL_ADDRESS: string | null = null

export function pressAddress(): string | null {
  return PRESS_EMAIL ?? CONTACT_EMAIL
}
