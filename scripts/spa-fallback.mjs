/** GitHub Pages has no rewrite rules: it serves 404.html for any path it
 *  cannot find on disk. Copying index.html to 404.html makes deep links like
 *  /accu30/ventures/ring-ing boot the app instead of showing GitHub's 404.
 *
 *  Run after `vite build`. */
import { copyFile, access } from 'node:fs/promises'
import { resolve } from 'node:path'

const dist = resolve(process.cwd(), 'dist')
const index = resolve(dist, 'index.html')
const fallback = resolve(dist, '404.html')

try {
  await access(index)
} catch {
  console.error('spa-fallback: dist/index.html not found — run `vite build` first.')
  process.exit(1)
}

await copyFile(index, fallback)
console.log('spa-fallback: wrote dist/404.html')
