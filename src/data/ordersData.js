import statBarPurple from '../assets/admin/stat-bar-purple.svg'
import statBarGreen from '../assets/admin/stat-bar-green.svg'

export const ordersSummary = [
  { value: '850', label: 'Total Orders', bar: statBarPurple },
  { value: '$500,000.00', label: 'Total Revenue', bar: statBarGreen },
  { value: '5:1', label: 'Ordered/Paid Ratio', bar: statBarGreen },
]

export const orderRanges = [
  { value: 'all', label: 'All Time' },
  { value: 'year', label: 'This year', days: 365 },
  { value: 'month', label: 'This month', days: 30 },
  { value: 'week', label: 'This week', days: 7 },
]

// Options in the "Order" column popup
export const orderViews = [
  { value: 'all', label: 'User ID' },
  { value: 'paid', label: 'Order Paid' },
  { value: 'fulfilled', label: 'Order Fulfilled' },
  { value: 'active', label: 'Active Order' },
  { value: 'last-completed', label: 'Last Completed Order' },
]

export const ORDER_STATUS = {
  fulfilled: 'Paid & Fulfilled',
  paid: 'Paid',
  active: 'Active',
}

// Tax on the order subtotal: $52.36 → $1.70, as on the order page design
export const TAX_RATE = 0.0325

// Sample customers and orders until the API is connected. Generated deterministically so the list is stable.
const customers = {
  CoolCoder: { name: 'John Cena', email: 'johncena@gmail.com', address: 'Pablo Alto, San Francisco, CA 92102, United States of America' },
  ProxyKing: { name: 'Maria Lopez', email: 'maria.lopez@proxyking.io', address: '221 King Street, Toronto, ON M5H 1K5, Canada' },
  DataMiner: { name: 'Ahmed Khan', email: 'ahmed@dataminer.dev', address: '14 Gulberg III, Lahore 54660, Pakistan' },
  NetRunner: { name: 'Lena Fischer', email: 'lena.fischer@netrunner.de', address: 'Torstraße 88, 10119 Berlin, Germany' },
  ByteSmith: { name: 'Oliver Grant', email: 'oliver@bytesmith.co.uk', address: '5 Baker Street, London NW1 6XE, United Kingdom' },
  CloudNinja: { name: 'Priya Sharma', email: 'priya@cloudninja.in', address: '42 MG Road, Bengaluru 560001, India' },
  ScrapeMaster: { name: 'Omar Haddad', email: 'omar@scrapemaster.ae', address: 'Sheikh Zayed Road, Dubai, United Arab Emirates' },
  PacketPro: { name: 'Chen Wei', email: 'chen.wei@packetpro.sg', address: '8 Marina Boulevard, Singapore 018981' },
}
const users = Object.keys(customers)
const prices = [52.36, 48.5, 120, 75.2, 52.36, 99.99, 34.75, 210.4, 52.36, 64.1, 150, 88.8]
const products = [
  { name: 'Mobile Proxy', size: '5GB' },
  { name: 'Residential Proxy', size: '10GB' },
  { name: 'Datacenter Proxy', size: '25GB' },
]

function buildOrders(count) {
  const latest = new Date(2023, 7, 29, 10, 20) // 29 Aug 2023 - 10.20, the date shown in the design
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(latest.getTime() - i * 26 * 60 * 60 * 1000 * 1.7).toISOString()
    // Newest order (#1253, the one on the order page design) is paid but not fulfilled.
    // Otherwise mostly fulfilled; every 7th is paid only and every 11th still active.
    const status =
      i === 0 || i % 7 === 6 ? ORDER_STATUS.paid : i % 11 === 10 ? ORDER_STATUS.active : ORDER_STATUS.fulfilled
    const user = users[(i * 5) % users.length]
    const price = prices[i % prices.length]
    return {
      id: String(1253 - i),
      price, // subtotal of the items
      status,
      user,
      customer: customers[user],
      date,
      items: [{ ...products[i % products.length], date, price }],
    }
  })
}

export const orders = buildOrders(65)
