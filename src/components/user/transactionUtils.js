const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// "Today, 29 Aug at 10.20" (or without "Today," for other days), as in the design
export function formatTransactionDate(iso) {
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, '0')
  const isToday = d.toDateString() === new Date().toDateString()
  return `${isToday ? 'Today, ' : ''}${d.getDate()} ${MONTHS[d.getMonth()]} at ${pad(d.getHours())}.${pad(d.getMinutes())}`
}

export const formatMoney = (n) => `$${n.toFixed(2)}`
