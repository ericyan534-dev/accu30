import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import { CopyProvider, useCopy } from '@/content'
import TabRail from '@/components/TabRail'
import Footer from '@/components/Footer'
import FloorRail from '@/components/FloorRail'

import Home from '@/pages/Home'
import Vision from '@/pages/Vision'
import Ventures from '@/pages/Ventures'
import VentureDetail from '@/pages/VentureDetail'
import Building from '@/pages/Building'
import Leadership from '@/pages/Leadership'
import Ledger from '@/pages/Ledger'
import Membership from '@/pages/Membership'
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

/** GitHub Pages project sites serve from /<repo>/. Vite exposes that as
 *  BASE_URL, so the router follows it automatically and dev stays at '/'. */
const ROUTER_BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <CopyProvider>
      <BrowserRouter basename={ROUTER_BASE}>
        <RouteEffects />
        <div className="flex min-h-svh flex-col">
          <TabRail />
          <FloorRail />
          <main id="main" className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/ventures" element={<Ventures />} />
              <Route path="/ventures/:slug" element={<VentureDetail />} />
              <Route path="/building" element={<Building />} />
              <Route path="/leadership" element={<Leadership />} />
              <Route path="/news" element={<News />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CopyProvider>
  )
}
