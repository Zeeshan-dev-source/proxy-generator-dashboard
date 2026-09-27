import { ScrollRestoration } from 'react-router-dom'
import DashboardHeader from '../components/dashboard/DashboardHeader.jsx'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
import Footer from '../components/layout/Footer.jsx'
import PageBackground from '../components/layout/PageBackground.jsx'

// Shell for the admin and user dashboards: header, sidebar, page content and the site footer
function DashboardLayout({ header, nav, navLabel, rootPath, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-page">
      <PageBackground />

      <div className="relative flex min-h-screen flex-col">
        <DashboardHeader {...header} />
        <div className="flex flex-1 flex-col xl:flex-row">
          <DashboardSidebar items={nav} label={navLabel} rootPath={rootPath} />
          <main className="min-w-0 flex-1 px-4 pt-6 pb-16 sm:px-6 xl:pt-[55px] xl:pr-4 xl:pb-0 xl:pl-[24px] wide:pr-6 wide:pl-[47px]">
            {children}
          </main>
        </div>
        <Footer />
      </div>

      <ScrollRestoration />
    </div>
  )
}

export default DashboardLayout
