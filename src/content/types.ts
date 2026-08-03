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

export interface Founder {
  readonly name: string
  readonly role: string
  /** Empty string means "not yet supplied" — rendered as an honest gap,
   *  never as a stock portrait or invented biography. */
  readonly bio: string
  readonly portrait: string | null
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
    readonly statusRail: readonly string[]
  }

  readonly nav: readonly { readonly label: string; readonly to: string; readonly floor: string }[]
  readonly directory: readonly DirectoryEntry[]

  readonly actions: {
    readonly partner: string
    readonly seeWork: string
    readonly readProgramme: string
    readonly enquire: string
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

  readonly leadership: {
    readonly title: string
    readonly standfirst: string
    readonly founders: readonly Founder[]
    readonly pendingNote: string
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
    readonly formNote: string
  }

  readonly contact: {
    readonly title: string
    readonly standfirst: string
    readonly generalHeading: string
    readonly generalBody: string
    readonly pressHeading: string
    readonly pressBody: string
    readonly addressHeading: string
    readonly addressBody: string
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
