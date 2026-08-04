import { useTheme } from '@/theme'

interface ThemeToggleProps {
  /** `rail` sits in the tab row; `panel` sits in the mobile listing and
   *  carries a visible label because there is room for one. */
  readonly variant?: 'rail' | 'panel'
}

/** The lobby's house lights. Icon-only in the tab row, where every other
 *  control is already a word and an eighth word would crowd them out. */
export default function ThemeToggle({ variant = 'rail' }: ThemeToggleProps) {
  const { theme, toggle } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  const label = next === 'dark' ? 'Switch to the dark theme' : 'Switch to the light theme'

  if (variant === 'panel') {
    return (
      <button
        type="button"
        onClick={toggle}
        className="dir-row w-full text-left"
        aria-label={label}
      >
        <span className="dir-name">Lighting</span>
        <span className="dir-sub">{theme === 'dark' ? 'Dark' : 'Light'}</span>
        <span className="dir-floor flex justify-end">
          <Glyph theme={theme} />
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={label}
      aria-label={label}
      className="tab shrink-0 justify-center px-3"
    >
      <Glyph theme={theme} />
    </button>
  )
}

/** Sun for the daylight lobby, moon for the night one. Straight rays and butt
 *  caps so the mark is cut rather than drawn. */
function Glyph({ theme }: { readonly theme: 'light' | 'dark' }) {
  return theme === 'dark' ? (
    <svg
      viewBox="0 0 16 16"
      width="15"
      height="15"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M13.2 9.6A5.6 5.6 0 0 1 6.4 2.8 5.6 5.6 0 1 0 13.2 9.6Z" fill="currentColor" stroke="none" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 16 16"
      width="15"
      height="15"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="butt"
    >
      <circle cx="8" cy="8" r="3.1" fill="currentColor" stroke="none" />
      <path d="M8 .8v2.1M8 13.1v2.1M.8 8h2.1M13.1 8h2.1M2.9 2.9l1.5 1.5M11.6 11.6l1.5 1.5M13.1 2.9l-1.5 1.5M4.4 11.6l-1.5 1.5" />
    </svg>
  )
}
