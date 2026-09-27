import statBarGreen from '../assets/admin/stat-bar-green.svg'

export const PRODUCT_CATEGORIES = ['Residential', 'Datacenter', 'Mobile']

// Options in the "Category" column popup
export const categoryFilters = [{ value: 'all', label: 'All Categories' }, ...PRODUCT_CATEGORIES.map((c) => ({ value: c, label: c }))]

export const productsSummary = {
  purchases: { value: '800', label: 'Total Purchases', bar: statBarGreen },
  mostPopular: { value: 'Datacenter - 8 GB', label: 'Most Popular Product' },
}

// Sample products from the design until the API is connected
export const products = [
  {
    id: 'p-residential-5gb',
    name: 'Residential 5GB',
    category: 'Residential',
    payload: 'payload.example',
    endpoint: 'endpoint.example',
    price: 500,
    created: new Date(2023, 10, 29).toISOString(),
    description: '',
    published: true,
  },
  {
    id: 'p-datacenter-2gb',
    name: 'DataCenter 2GB',
    category: 'Datacenter',
    payload: 'payload.example',
    endpoint: 'endpoint.example',
    price: 500,
    created: new Date(2023, 10, 29).toISOString(),
    description: '',
    published: true,
  },
  {
    id: 'p-mobile-5gb',
    name: 'Mobile 5GB',
    category: 'Mobile',
    payload: 'payload.example',
    endpoint: 'endpoint.example',
    price: 500,
    created: new Date(2023, 10, 29).toISOString(),
    description: '',
    published: true,
  },
]
