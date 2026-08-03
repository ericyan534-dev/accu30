/** Screenshot the built site at real viewports and report horizontal overflow.
 *
 *  Chrome's headless CLI clamps the window to a 500px minimum on macOS, so
 *  `--window-size=390` silently renders at 500 and crops. This drives a real
 *  browser context instead, which is the only way to see phone width honestly.
 *
 *  Usage: node scripts/shoot.mjs [baseUrl] [outDir]
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const BASE = process.argv[2] ?? 'http://127.0.0.1:4321'
const OUT = process.argv[3] ?? '.impeccable/shots'

const ROUTES = [
  ['/', 'home'],
  ['/vision', 'vision'],
  ['/ventures', 'ventures'],
  ['/ventures/ring-ing', 'venture'],
  ['/building', 'building'],
  ['/leadership', 'leadership'],
  ['/news', 'news'],
  ['/partners', 'partners'],
  ['/membership', 'membership'],
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

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()

  for (const [route, name] of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' })
    await page.waitForTimeout(250)

    const metrics = await page.evaluate(() => {
      const de = document.documentElement
      // any element whose right edge exceeds the viewport
      const wide = [...document.querySelectorAll('body *')]
        .filter(el => {
          const r = el.getBoundingClientRect()
          return r.width > 0 && r.right > de.clientWidth + 1
        })
        .slice(0, 5)
        .map(el => `${el.tagName.toLowerCase()}.${(el.className || '').toString().slice(0, 60)}`)
      return { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, wide }
    })

    if (metrics.scrollWidth > metrics.clientWidth + 1) {
      problems.push(
        `${vp.width}px ${route}: scrollWidth ${metrics.scrollWidth} > ${metrics.clientWidth}` +
          (metrics.wide.length ? `\n    offenders: ${metrics.wide.join(' | ')}` : ''),
      )
    }

    await page.screenshot({ path: `${OUT}/${vp.name}-${name}.png` })
  }
  await context.close()
}

await browser.close()

if (problems.length) {
  console.log('HORIZONTAL OVERFLOW:')
  for (const p of problems) console.log('  ' + p)
  process.exitCode = 1
} else {
  console.log('No horizontal overflow at 1440 / 834 / 390.')
}
