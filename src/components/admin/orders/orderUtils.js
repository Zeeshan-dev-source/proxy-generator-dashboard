import { ORDER_STATUS } from '../../../data/ordersData.js'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// "29 Aug 2023 - 10.20", the format used in the design
export function formatOrderDate(iso) {
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()} - ${pad(d.getHours())}.${pad(d.getMinutes())}`
}

export const formatPrice = (price) => `$${price.toFixed(2)}`

const byKey = {
  price: (o) => o.price,
  status: (o) => o.status,
  user: (o) => o.user.toLowerCase(),
  date: (o) => o.date,
}

export function sortOrders(list, { key, dir }) {
  const get = byKey[key]
  const sign = dir === 'asc' ? 1 : -1
  return [...list].sort((a, b) => {
    const va = get(a)
    const vb = get(b)
    if (va < vb) return -1 * sign
    if (va > vb) return 1 * sign
    return 0
  })
}

// Status popup options → which orders stay visible
export function filterByView(list, view) {
  switch (view) {
    case 'paid':
      return list.filter((o) => o.status === ORDER_STATUS.paid || o.status === ORDER_STATUS.fulfilled)
    case 'fulfilled':
      return list.filter((o) => o.status === ORDER_STATUS.fulfilled)
    case 'active':
      return list.filter((o) => o.status === ORDER_STATUS.active)
    case 'last-completed': {
      const latest = list
        .filter((o) => o.status === ORDER_STATUS.fulfilled)
        .sort((a, b) => (a.date < b.date ? 1 : -1))[0]
      return latest ? [latest] : []
    }
    default:
      return list
  }
}

// Keep orders within `days` of the newest order (sample data is from 2023)
export function filterByRange(list, days) {
  if (!days || !list.length) return list
  const newest = Math.max(...list.map((o) => new Date(o.date).getTime()))
  const from = newest - days * 24 * 60 * 60 * 1000
  return list.filter((o) => new Date(o.date).getTime() >= from)
}

export function matchesSearch(order, query) {
  if (!query) return true
  const q = query.trim().toLowerCase()
  return [`#${order.id}`, order.user, order.status, formatPrice(order.price), formatOrderDate(order.date)].some((field) =>
    field.toLowerCase().includes(q),
  )
}
