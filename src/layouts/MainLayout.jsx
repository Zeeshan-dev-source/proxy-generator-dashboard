import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'
import PageBackground from '../components/layout/PageBackground.jsx'

function MainLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-page">
      <PageBackground />

      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>

      <ScrollRestoration />
    </div>
  )
}

export default MainLayout
