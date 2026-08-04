/** Screenshot the site at real viewports, in both themes, and report
 *  horizontal overflow.
 *
 *  Chrome's headless CLI clamps the window to a 500px minimum on macOS, so
 *  `--window-size=390` silently renders at 500 and crops. This drives a real
 *  browser context instead, which is the only way to see phone width honestly.
 *
 *  Usage: node scripts/shoot.mjs [baseUrl] [outDir] [light|dark|both]
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const BASE = process.argv[2] ?? 'http://127.0.0.1:4321'
const OUT = process.argv[3] ?? '.impeccable/shots'
const THEMES = process.argv[4] === 'both' ? ['light', 'dark'] : [process.argv[4] ?? 'light']

const ROUTES = [
  ['/', 'home'],
  ['/vision', 'vision'],
  ['/ventures', 'ventures'],
  ['/ventures/ring-ing', 'ringing'],
  ['/ventures/encountra', 'venture'],
  ['/building', 'building'],
  ['/team', 'team'],
  ['/news', 'news'],
  ['/partners', 'partners'],
  ['/membership', 'membership'],
  ['/membership/apply', 'apply'],
  ['/contact', 'contact'],
  ['/nowhere', 'notfound'],
]

const VIEWPORTS = [
  { name: 'd', width: 1440, height: 940 },
  { name: 't', width: 834, height: 1112 },
  { name: 'm', width: 390, height: 844 },
]

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()
const problems = []
const errors = []

for (const theme of THEMES) {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      colorScheme: theme,
    })
    // The boot script reads localStorage before first paint, so seed it there
    // rather than toggling after load and screenshotting a transition.
    await context.addInitScript(value => {
      try {
        localStorage.setItem('acc-theme', value)
      } catch {}
    }, theme)

    const page = await context.newPage()
    page.on('pageerror', e => errors.push(`${theme} ${vp.width} ${page.url()}: ${e.message}`))

    for (const [route, name] of ROUTES) {
      await page.goto(BASE + route, { waitUntil: 'networkidle' })
      await page.waitForTimeout(300)

      const metrics = await page.evaluate(() => {
        const de = document.documentElement
        const wide = [...document.querySelectorAll('body *')]
          .filter(el => {
            const r = el.getBoundingClientRect()
            return r.width > 0 && r.right > de.clientWidth + 1
          })
          .slice(0, 5)
          .map(el => `${el.tagName.toLowerCase()}.${(el.className || '').toString().slice(0, 60)}`)
        return {
          scrollWidth: de.scrollWidth,
          clientWidth: de.clientWidth,
          wide,
          theme: de.getAttribute('data-theme'),
          h1: document.querySelector('h1, h1 *')?.textContent?.trim().slice(0, 40) ?? null,
        }
      })

      if (metrics.theme !== theme) {
        problems.push(`${theme} ${vp.width}px ${route}: data-theme is "${metrics.theme}"`)
      }
      if (metrics.scrollWidth > metrics.clientWidth + 1) {
        problems.push(
          `${theme} ${vp.width}px ${route}: scrollWidth ${metrics.scrollWidth} > ${metrics.clientWidth}` +
            (metrics.wide.length ? `\n    offenders: ${metrics.wide.join(' | ')}` : ''),
        )
      }

      await page.screenshot({ path: `${OUT}/${theme[0]}${vp.name}-${name}.png` })
    }
    await context.close()
  }
}

await browser.close()

if (errors.length) {
  console.log('PAGE ERRORS:')
  for (const e of errors) console.log('  ' + e)
}
if (problems.length) {
  console.log('PROBLEMS:')
  for (const p of problems) console.log('  ' + p)
  process.exitCode = 1
} else {
  console.log(`Clean at 1440 / 834 / 390 in ${THEMES.join(' + ')}.`)
}
