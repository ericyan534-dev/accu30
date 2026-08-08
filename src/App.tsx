import { useEffect } from 'react'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom'

import { CopyProvider, useCopy } from '@/content'
import TabRail from '@/components/TabRail'
import Footer from '@/components/Footer'
import FloorRail from '@/components/FloorRail'

import Home from '@/pages/Home'
import Vision from '@/pages/Vision'
import Ventures from '@/pages/Ventures'
import VentureDetail from '@/pages/VentureDetail'
import Building from '@/pages/Building'
import Team from '@/pages/Team'
import Ledger from '@/pages/Ledger'
import Membership from '@/pages/Membership'
import Apply from '@/pages/Apply'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'

/** Restores the reader to the top of a new page, and keeps the document title
 *  in step with the route so history entries and shared links are legible. */
function RouteEffects() {
  const { pathname } = useLocation()
  const copy = useCopy()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  useEffect(() => {
    const match = copy.nav.find(
      item => pathname === item.to || pathname.startsWith(`${item.to}/`),
    )
    document.title = match ? `${match.label} · ${copy.org.short}` : copy.org.name
  }, [pathname, copy])

  return null
}

function News() {
  const copy = useCopy()
  return (
    <Ledger
      floor="05"
      title={copy.news.title}
      standfirst={copy.news.standfirst}
      emptyHeading={copy.news.emptyHeading}
      emptyBody={copy.news.emptyBody}
    />
  )
}

function Partners() {
  const copy = useCopy()
  return (
    <Ledger
      floor="06"
      title={copy.partners.title}
      standfirst={copy.partners.standfirst}
      emptyHeading={copy.partners.emptyHeading}
      emptyBody={copy.partners.emptyBody}
    />
  )
}

/** The lobby itself: the frame that holds still while the floors change. */
function Lobby() {
  return (
    <>
      <RouteEffects />
      <div className="flex min-h-svh flex-col">
        <TabRail />
        <FloorRail />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

/** GitHub Pages project sites serve from /<repo>/. Vite exposes that as
 *  BASE_URL, so the router follows it automatically and dev stays at '/'. */
const ROUTER_BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

/* A data router rather than <BrowserRouter>. The floor-change transition is
   declared in index.css and every link already asks for it, but in declarative
   mode `viewTransition` is accepted and ignored — the animation had never once
   run. Only a data router calls document.startViewTransition. */
const router = createBrowserRouter(
  [
    {
      element: <Lobby />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/vision', element: <Vision /> },
        { path: '/ventures', element: <Ventures /> },
        { path: '/ventures/:slug', element: <VentureDetail /> },
        { path: '/building', element: <Building /> },
        { path: '/team', element: <Team /> },
        // The section was called Leadership until it grew past its four
        // founders. Shared links from that period still resolve.
        { path: '/leadership', element: <Navigate to="/team" replace /> },
        { path: '/news', element: <News /> },
        { path: '/partners', element: <Partners /> },
        { path: '/membership', element: <Membership /> },
        { path: '/membership/apply', element: <Apply /> },
        { path: '/contact', element: <Contact /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: ROUTER_BASE || undefined },
)

export default function App() {
  return (
    <CopyProvider>
      <RouterProvider router={router} />
    </CopyProvider>
  )
}
