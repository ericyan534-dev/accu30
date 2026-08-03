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



## Routes


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
