import { Outlet } from 'react-router-dom'
import DashboardLayout from './DashboardLayout.jsx'
import { AccountProvider } from '../context/AccountContext.jsx'
import { currentUser, userNav } from '../data/userData.js'

const header = { homeTo: '/dashboard', homeLabel: 'Dashboard', settingsTo: '/dashboard/settings', user: currentUser }

function UserLayout() {
  return (
    <DashboardLayout header={header} nav={userNav} navLabel="Account" rootPath="/dashboard">
      <AccountProvider>
        <Outlet />
      </AccountProvider>
    </DashboardLayout>
  )
}

export default UserLayout
