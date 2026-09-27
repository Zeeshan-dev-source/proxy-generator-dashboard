import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import Faq from './pages/Faq.jsx'
import Terms from './pages/Terms.jsx'
import Privacy from './pages/Privacy.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/faq', element: <Faq /> },
      { path: '/terms', element: <Terms /> },
      { path: '/privacy', element: <Privacy /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  // User dashboard, loaded on demand like the admin area
  {
    path: '/dashboard',
    lazy: async () => ({ Component: (await import('./layouts/UserLayout.jsx')).default }),
    children: [
      { index: true, lazy: async () => ({ Component: (await import('./pages/user/Dashboard.jsx')).default }) },
      { path: 'orders', lazy: async () => ({ Component: (await import('./pages/user/Orders.jsx')).default }) },
      { path: 'wallet', lazy: async () => ({ Component: (await import('./pages/user/Wallet.jsx')).default }) },
      { path: 'generator', lazy: async () => ({ Component: (await import('./pages/user/Generator.jsx')).default }) },
      { path: 'support', lazy: async () => ({ Component: (await import('./pages/user/Support.jsx')).default }) },
      { path: 'support/faq', lazy: async () => ({ Component: (await import('./pages/user/SupportFaq.jsx')).default }) },
      { path: '*', element: <NotFound /> },
    ],
  },
  // Admin is loaded on demand so the charts library stays out of the public site's bundle
  {
    path: '/admin',
    lazy: async () => ({ Component: (await import('./layouts/AdminLayout.jsx')).default }),
    children: [
      { index: true, lazy: async () => ({ Component: (await import('./pages/admin/Dashboard.jsx')).default }) },
      { path: 'orders', lazy: async () => ({ Component: (await import('./pages/admin/Orders.jsx')).default }) },
      { path: 'users', lazy: async () => ({ Component: (await import('./pages/admin/Users.jsx')).default }) },
      { path: 'products', lazy: async () => ({ Component: (await import('./pages/admin/Products.jsx')).default }) },
      { path: 'products/new', lazy: async () => ({ Component: (await import('./pages/admin/ProductEditor.jsx')).default }) },
      { path: 'products/:productId/edit', lazy: async () => ({ Component: (await import('./pages/admin/ProductEditor.jsx')).default }) },
      { path: 'settings', lazy: async () => ({ Component: (await import('./pages/admin/Settings.jsx')).default }) },
      { path: 'orders/:orderId', lazy: async () => ({ Component: (await import('./pages/admin/OrderDetail.jsx')).default }) },
      { path: '*', element: <NotFound /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
