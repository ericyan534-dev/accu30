# ACC-U30 — Asian Community Center, Under 30

Public site for **ACC-U30**, a nonprofit that incubates ventures started by its members and
is developing a community building in New York City.

React 19 · Vite 8 · Tailwind CSS v4 · React Router 7 · TypeScript.

---

## Quick start

```bash
pnpm install
pnpm dev        # dev server, bound to 0.0.0.0
pnpm build      # production build into dist/
pnpm preview    # serve the built dist/
pnpm format     # oxfmt
```

## Design

The direction contract for the site is an HTML comment at the top of `index.html` and is
expected to survive the production build. Read it before changing anything visual — it
states what this design is and what it refuses.

The full design system record (`DESIGN.md`) and the product record (`PRODUCT.md`) are kept
in the private working repository, along with the approval-round comps. The rules that
matter for anyone editing this code are restated under **Rules that are load-bearing**
below.

## Routes

Real URLs, deep-linkable and indexable. Navigation is presented as the directory board's
index tabs.

| Path | Page |
| --- | --- |
| `/` | Home — the stone facade, then the directory board |
| `/vision` | Seven pillars |
| `/ventures` | Index of the four incubated ventures |
| `/ventures/:slug` | `encountra`, `curtain`, `application-advisory`, `ring-ing` |
| `/building` | The ACC Office Building — eleven planned spaces |
| `/leadership` | The four founders |
| `/news` | News & Events |
| `/partners` | Partners & Supporters |
| `/membership` | Membership, by nomination |
| `/contact` | Enquiries |
| `*` | Not found, with the full directory |

## Structure

```
index.html                  Vite shell; Figma Make slots; the direction contract
.github/workflows/          Build and deploy to GitHub Pages
scripts/
  shoot.mjs                 Screenshot every route at 1440/834/390, fail on overflow
  spa-fallback.mjs          Copy index.html to 404.html so deep links boot on Pages
src/
  main.tsx                  Entry; imports index.css
  App.tsx                   Router, layout shell, per-route title
  config.ts                 Contact/press/postal addresses — EMPTY, fill to activate forms
  index.css                 @theme tokens + the material component layer
  content/
    types.ts                Content model
    en.ts                   All English copy
    index.tsx               CopyProvider + useCopy()
  components/               TabRail, Directory, PageHeader, Footer, Relief, Notice, EnquiryForm
  pages/                    One file per route
  assets/brand/             Logo set (transparent, mask, dragon, silhouette)
  assets/spaces/            Optimised WebP reference imagery
.impeccable/
  mocks/                    The three homepage comps from the approval round
  surfaces/                 Surface brief
```

## Rules that are load-bearing

These are not style preferences. Breaking them breaks the site's honesty or its identity.

1. **The building is planned.** Nothing may present it as an existing place. Reference
   imagery appears only inside a captioned `.plate` naming what the photograph actually is.
2. **Every venture keeps its own section list.** The source document gives each venture a
   different set of sections; the previous site forced a fixed template and silently dropped
   roughly 40% of the Curtain and Ring-ing copy. `Venture.sections` is deliberately variable.
3. **No stock photography** standing in for real people, events or places. An honest gap is
   designed for — see the empty portrait plates on `/leadership`.
4. **Bronze is a material, never a text colour.** It is used for plate edges and cut
   highlights only. This is the guard against reverting to the previous gold-on-black site.
5. **The logo is never filtered.** No inversion, no hue-rotation, no blend modes. Use the
   prepared assets in `src/assets/brand/`.
6. **No user-facing strings in components.** All copy lives in `src/content/`.

## Content still needed

| Item | Where it goes |
| --- | --- |
| Contact, press and postal addresses | `src/config.ts` — forms self-disable until set |
| Founder biographies and portraits | `src/content/en.ts` → `leadership.founders` |
| Partner names and logos (with permission) | `src/content/en.ts` → `partners` |
| Event records and your own photography | `src/content/en.ts` → `news` |
| 中文 copy | new `src/content/zh.ts`, then register it in `src/content/index.tsx` |

## Deployment

Live on GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.

Project sites serve from a subpath, so the build sets `PUBLIC_BASE_PATH=/<repo>/`, which
Vite uses for asset URLs and which the router reads back through `import.meta.env.BASE_URL`.
Pages has no rewrite rules, so `pnpm build` also copies `index.html` to `404.html`; that is
what makes a deep link like `/ventures/ring-ing` boot the app instead of showing GitHub's
404 page.

The site is host-agnostic otherwise — SPA fallbacks are also included for Netlify
(`public/_redirects`), Vercel (`vercel.json`) and Azure Static Web Apps
(`public/staticwebapp.config.json`). Any host must serve `index.html` for unknown paths.

To build for a different base:

```bash
PUBLIC_BASE_PATH=/ pnpm build     # root domain
pnpm shots                        # screenshot every route, fail on overflow
```
