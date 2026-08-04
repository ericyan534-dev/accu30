import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'acc-theme'

/** The inline script in index.html has already stamped the element before
 *  first paint. React reads its decision rather than making a second one. */
function current(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

function stored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'dark' || value === 'light' ? value : null
  } catch {
    return null
  }
}

/** Reads and sets the site's lighting. Follows the operating system until the
 *  reader states a preference, then remembers that preference for good. */
export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = useState<Theme>(current)

  // Until the reader chooses, the system keeps deciding — including when it
  // changes mid-visit, as it does at sunset on most phones.
  useEffect(() => {
    if (stored()) return
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => {
      const next: Theme = event.matches ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', next)
      setTheme(next)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // A locked-down browser still gets the theme, just not the memory.
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
