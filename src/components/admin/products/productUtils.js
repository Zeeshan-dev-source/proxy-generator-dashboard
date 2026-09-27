import { formatLongDate } from '../users/userUtils.js'

export { formatLongDate }

export const categoryColor = {
  Residential: 'text-residential',
  Datacenter: 'text-datacenter',
  Mobile: 'text-mobile',
}

// Whole dollars as "$500", cents only when needed ("$12.50")
export const formatProductPrice = (price) => `$${Number.isInteger(price) ? price : price.toFixed(2)}`

const byKey = {
  name: (p) => p.name.toLowerCase(),
  category: (p) => p.category,
  payload: (p) => p.payload.toLowerCase(),
  endpoint: (p) => p.endpoint.toLowerCase(),
  price: (p) => p.price,
  created: (p) => p.created,
}

export function sortProducts(list, sort) {
  if (!sort.key) return list
  const get = byKey[sort.key]
  const sign = sort.dir === 'asc' ? 1 : -1
  return [...list].sort((a, b) => {
    const va = get(a)
    const vb = get(b)
    if (va < vb) return -1 * sign
    if (va > vb) return 1 * sign
    return 0
  })
}

export function matchesProductSearch(product, query) {
  if (!query) return true
  const q = query.trim().toLowerCase()
  return [product.name, product.category, product.payload, product.endpoint, formatProductPrice(product.price)].some((f) =>
    f.toLowerCase().includes(q),
  )
}
