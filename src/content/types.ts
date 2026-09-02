/** Content model for ACC-U30.
 *
 *  Everything a reader sees lives in a locale module implementing `SiteCopy`.
 *  Adding 中文 means adding `zh.ts` — no component changes.
 *
 *  The venture section list is deliberately open-ended: the source document
 *  gives each venture a DIFFERENT set of sections, and forcing them into a
 *  fixed template is what silently dropped roughly 40% of the Curtain and
 *  Ring-ing copy from the previous site. */

export type LocaleCode = 'en' | 'zh'

/** A titled block of prose. `body` is an array of paragraphs. */
export interface Section {
  readonly label: string
  readonly body: readonly string[]
}

export interface Venture {
  readonly slug: string
  readonly name: string
  /** Short descriptor used in the directory and tab rails. */
  readonly category: string
  /** One sentence for indexes and cards. */
  readonly summary: string
  /** Directory designation, e.g. '02·A'. */
  readonly floor: string
  /** The venture's own mark, reproduced as it is — a tenant's sign is never
   *  recoloured to match the board. `null` where no artwork exists. */
  readonly mark: string | null
  /** Variable per venture — never normalise these. */
  readonly sections: readonly Section[]
}

export interface Pillar {
  readonly number: string
  readonly title: string
  readonly body: string
}

export interface BuildingSpace {
  readonly name: string
  readonly body: string
  /** Imported image URL, or null when no reference image exists. */
  readonly image: string | null
  /** Short caption naming what the reference image actually depicts. */
  readonly imageNote: string
}

export interface Person {
  readonly name: string
  readonly role: string
  /** Empty string means "not yet supplied" — rendered as an honest gap,
   *  never as a stock portrait or invented biography. */
  readonly bio: string
  readonly portrait: string | null
}

/** One of the sixteen archetypes Ring-ing's FBTI profiling assigns, drawn as
 *  the Ring-ing bird. `accent` is the venture's own published accent for that
 *  type — it is Ring-ing's colour, not ACC's, and is used only inside the
 *  mascot artwork's own frame. */
export interface Mascot {
  readonly code: string
  readonly accent: string
  readonly art: string
}

/** One question on the membership application. The same schema drives the
 *  on-site form and the printed document, so they cannot drift apart. */
export interface ApplicationField {
  readonly id: string
  readonly label: string
  readonly kind: 'text' | 'email' | 'tel' | 'date' | 'long' | 'choice'
  readonly hint?: string
  readonly options?: readonly string[]
  readonly optional?: boolean
  /** Soft ceiling shown to the applicant and enforced as a warning. */
  readonly maxWords?: number
}

export interface ApplicationSection {
  readonly letter: string
  readonly title: string
  readonly fields: readonly ApplicationField[]
}

export interface DirectoryEntry {
  readonly label: string
  readonly note: string
  readonly floor: string
  readonly to: string
  readonly tenant?: boolean
}

export interface SiteCopy {
  readonly locale: LocaleCode
  readonly localeName: string

  readonly org: {
    readonly name: string
    readonly short: string
    readonly mission: string
    /** The mission split for the monumental cut: part two takes vermillion. */
    readonly missionLead: string
    readonly missionAccent: string
    readonly city: string
    readonly kind: string
    readonly summary: string
    /** Three doors under the mission. Each carries its own floor number, its
     *  own label and its own line of real content — a fact with nothing
     *  underneath it is a hole in the wall, not a fact. */
    readonly statusRail: readonly {
      readonly floor: string
      readonly label: string
      readonly detail: string
      readonly to: string
    }[]
  }

  readonly nav: readonly { readonly label: string; readonly to: string; readonly floor: string }[]
  readonly directory: readonly DirectoryEntry[]

  readonly actions: {
    readonly partner: string
    readonly seeWork: string
    readonly readProgramme: string
    /** The label on a link into the Contact floor once an address exists. */
    readonly enquire: string
    /** The same link while no address is published — it names the floor,
     *  not an act of sending that cannot happen. */
    readonly reach: string
    readonly nominate: string
  }

  readonly home: {
    readonly directoryHeading: string
    readonly directoryNote: string
    readonly claimHeading: string
    readonly claimBody: readonly string[]
  }

  readonly vision: {
    readonly title: string
    readonly standfirst: string
    readonly pillars: readonly Pillar[]
    readonly closing: string
  }

  readonly ventures: {
    readonly title: string
    readonly standfirst: string
    readonly items: readonly Venture[]
  }

  readonly building: {
    readonly title: string
    readonly standfirst: string
    /** Shown wherever the building appears. Non-negotiable. */
    readonly statusNotice: string
    readonly imageryNotice: string
    readonly about: Section
    readonly overview: Section
    readonly spacesHeading: string
    readonly spaces: readonly BuildingSpace[]
  }

  readonly team: {
    readonly title: string
    readonly standfirst: string
    /** The four officers who run the organisation, named as such. */
    readonly officersHeading: string
    readonly officersNote: string
    readonly officers: readonly Person[]
    /** Everyone else on the roster, listed the way the board lists tenants. */
    readonly membersHeading: string
    readonly membersNote: string
    readonly members: readonly Person[]
    readonly pendingNote: string
  }

  readonly ringing: {
    /** Why this venture gets its own room. */
    readonly kicker: string
    readonly tagline: string
    readonly mascots: readonly Mascot[]
    /** One bird per section of the venture, in section order. The bird opens
     *  the chapter; `place` varies where it sits so six openers do not read
     *  as six copies of one template. */
    readonly chapters: readonly {
      readonly code: string
      readonly place: 'right' | 'left' | 'lead'
      /** A second bird standing in the margin beside the running text. Absent
       *  on some chapters on purpose — a page where every chapter carries one
       *  stops pacing and starts wallpapering. */
      readonly margin?: { readonly code: string; readonly side: 'right' | 'left' }
    }[]
    readonly productHeading: string
    readonly productNote: string
    readonly aviaryHeading: string
    readonly aviaryNote: string
    /** The birds shown at the close, beyond the six that open chapters. */
    readonly aviary: readonly string[]
    readonly siteLabel: string
    readonly siteUrl: string
  }

  readonly news: {
    readonly title: string
    readonly standfirst: string
    readonly emptyHeading: string
    readonly emptyBody: string
  }

  readonly partners: {
    readonly title: string
    readonly standfirst: string
    readonly emptyHeading: string
    readonly emptyBody: string
  }

  readonly membership: {
    readonly title: string
    readonly standfirst: string
    readonly body: readonly string[]
    readonly criteriaHeading: string
    readonly criteria: readonly string[]
    readonly processHeading: string
    readonly process: readonly { readonly step: string; readonly body: string }[]
    readonly applyHeading: string
    readonly applyBody: string
    readonly downloadLabel: string
    readonly downloadNote: string
    readonly formNote: string
  }

  readonly application: {
    readonly title: string
    readonly standfirst: string
    readonly reference: string
    readonly eligibility: string
    readonly instructions: string
    readonly sections: readonly ApplicationSection[]
    readonly declarationHeading: string
    readonly declaration: string
    readonly submitLabel: string
    readonly reviewHeading: string
    readonly reviewBody: string
    readonly printLabel: string
    readonly editLabel: string
    readonly copyLabel: string
    readonly copiedLabel: string
    readonly noAddressNote: string
  }

  readonly contact: {
    readonly title: string
    readonly standfirst: string
    readonly generalHeading: string
    readonly generalBody: string
    /** The instruction to write in — shown only when there is somewhere to write. */
    readonly generalAsk: string
    readonly pressHeading: string
    readonly pressBody: string
    readonly addressHeading: string
    readonly addressBody: string
  }

  /** The enquiry form, and the plate that stands in for it while no address
   *  is published. */
  readonly enquiry: {
    readonly heading: string
    readonly note: string
    readonly pendingHeading: string
    readonly pendingBody: string
    readonly nameLabel: string
    readonly emailLabel: string
    readonly organisationLabel: string
    readonly optional: string
    readonly messageLabel: string
    readonly nominationMessageLabel: string
    readonly subjects: {
      readonly general: string
      readonly press: string
      readonly nomination: string
    }
    readonly errors: {
      readonly name: string
      readonly email: string
      readonly emailFormat: string
      readonly message: string
    }
    readonly sent: string
  }

  readonly footer: {
    readonly rights: string
    readonly builtNote: string
  }

  readonly notFound: {
    readonly title: string
    readonly body: string
    readonly action: string
  }
}
