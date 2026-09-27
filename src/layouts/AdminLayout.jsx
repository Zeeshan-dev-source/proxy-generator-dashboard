import { Outlet } from 'react-router-dom'
import DashboardLayout from './DashboardLayout.jsx'
import { OrdersProvider } from '../context/OrdersContext.jsx'
import { ProductsProvider } from '../context/ProductsContext.jsx'
import { adminNav, adminUser } from '../data/adminData.js'

const header = { homeTo: '/admin', homeLabel: 'Admin dashboard', settingsTo: '/admin/settings', user: adminUser }

function AdminLayout() {
  return (
    <DashboardLayout header={header} nav={adminNav} navLabel="Admin" rootPath="/admin">
      <OrdersProvider>
        <ProductsProvider>
          <Outlet />
        </ProductsProvider>
      </OrdersProvider>
    </DashboardLayout>
  )
}

export default AdminLayout
