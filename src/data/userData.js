import dashboardIcon from '../assets/admin/dashboard-fill.svg'
import flagIcon from '../assets/admin/flag-fill.svg'
import walletIcon from '../assets/user/wallet-fill.svg'
import generatorIcon from '../assets/user/on-button-fill.svg'
import supportIcon from '../assets/user/question-fill.svg'
import timeIcon from '../assets/user/time-fill.svg'
import pipeIcon from '../assets/user/pipe-duotone.svg'
import layersIcon from '../assets/admin/layers-fill-sm.svg'
import homeIcon from '../assets/user/home-fill.svg'
import phoneIcon from '../assets/user/phone-fill.svg'
import datacenterButtonBg from '../assets/user/btn-bg-datacenter.svg'
import residentialButtonBg from '../assets/user/btn-bg-residential.svg'
import mobileButtonBg from '../assets/user/btn-bg-mobile.svg'
import stripeLogo from '../assets/user/logo-stripe.svg'
import cashAppLogo from '../assets/user/logo-cashapp.svg'
import bitcoinLogo from '../assets/user/logo-bitcoin.svg'
import avatar from '../assets/admin/admin-avatar.webp'
import { revenueChart } from './adminData.js'

export const currentUser = { name: 'Johnny Harris', firstName: 'Johnny', avatar }

export const userNav = [
  { label: 'Dashboard', to: '/dashboard', icon: dashboardIcon, width: 24, height: 24 },
  { label: 'Orders', to: '/dashboard/orders', icon: flagIcon, width: 30, height: 26 },
  { label: 'Wallet', to: '/dashboard/wallet', icon: walletIcon, width: 26, height: 26 },
  { label: 'Generator', to: '/dashboard/generator', icon: generatorIcon, width: 30, height: 30 },
  // Support sits a little closer to Generator in the design
  { label: 'Support', to: '/dashboard/support', icon: supportIcon, width: 29, height: 29, className: '-mt-[9px]' },
]

export const userOverview = [
  { value: '5', label: 'Active Plans', icon: timeIcon, width: 34, height: 34 },
  { value: '4.8GB', label: 'Total Data Remaining', icon: pipeIcon, width: 31, height: 31 },
  { value: '62', label: 'Total Orders', icon: flagIcon, width: 30, height: 26 },
]

// Spending chart. It uses the same curve as the admin revenue chart (the design reuses the shape),
// rescaled so the selected month (May) reads $2000.
const SPEND_SCALE = 2000 / 852.36
export const spendingChart = {
  months: [
    { month: 'Jan', x: 13, amount: 1200 },
    { month: 'Feb', x: 91, amount: 1650 },
    { month: 'Mar', x: 168.5, amount: 1480 },
    { month: 'Apr', x: 246.5, amount: 2300 },
    { month: 'May', x: 324.5, amount: 2000 },
    { month: 'June', x: 387.5, amount: 1750 },
  ],
  trend: revenueChart.trend.map((p) => ({ x: p.x, value: Math.round(p.value * SPEND_SCALE * 100) / 100 })),
  maxValue: revenueChart.maxValue * SPEND_SCALE,
  defaultMonth: 4,
}

export const initialWallet = { balance: 350, spent: 60, bonus: 40 }

// Offers from the design. Icon position is per card because the design places them differently.
const features = ['Super good', 'High monthly volumes', 'Lorem Ipsum', 'Value for money']
export const offers = [
  {
    id: 'datacenter',
    title: 'Datacenter',
    titleClass: 'text-datacenter',
    icon: { src: layersIcon, width: 27, height: 26, left: 14, top: 15 },
    features,
    pricePerDay: 10,
    buttonBg: datacenterButtonBg,
  },
  {
    id: 'residential',
    title: 'Residential',
    titleClass: 'text-residential',
    icon: { src: homeIcon, width: 26, height: 26, left: 15, top: 15 },
    features,
    pricePerDay: 5,
    buttonBg: residentialButtonBg,
  },
  {
    id: 'mobile',
    title: 'Mobile',
    titleClass: 'text-mobile',
    icon: { src: phoneIcon, width: 21, height: 21, left: 28, top: 18, flip: true },
    features,
    pricePerDay: 5,
    buttonBg: mobileButtonBg,
  },
]

// Top-up payment options; Bitcoin is greyed out in the design, so it is shown as unavailable
export const topUpMethods = [
  { id: 'stripe', name: 'Stripe', logo: stripeLogo, width: 38.8, height: 16.46, left: 28 },
  { id: 'cashapp', name: 'Cash App', logo: cashAppLogo, width: 57.5, height: 13.66, left: 93 },
  { id: 'bitcoin', name: 'Bitcoin', logo: bitcoinLogo, width: 47.45, height: 10.14, left: 171, disabled: true },
]

// Demo voucher until the API is connected
export const vouchers = { WELCOME10: 10 }

// Sample transactions (newest first), dated today so they read "Today, …" like the design
function todayAt(hours, minutes, daysAgo = 0) {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  d.setHours(hours, minutes, 0, 0)
  return d.toISOString()
}
export const initialTransactions = [
  { id: 't-6', type: 'purchase', title: 'Purchase - DataCenter', amount: 50, date: todayAt(10, 20), method: 'Wallet' },
  { id: 't-5', type: 'purchase', title: 'Purchase - Residential', amount: 25, date: todayAt(10, 20), method: 'Wallet' },
  { id: 't-4', type: 'topup', title: 'Wallet Top Up', amount: 150, date: todayAt(10, 20), method: 'Stripe' },
  { id: 't-3', type: 'purchase', title: 'Purchase - Mobile', amount: 15, date: todayAt(9, 5), method: 'Wallet' },
  { id: 't-2', type: 'topup', title: 'Wallet Top Up', amount: 100, date: todayAt(8, 40), method: 'Cash App' },
  { id: 't-1', type: 'purchase', title: 'Purchase - DataCenter', amount: 30, date: todayAt(8, 15), method: 'Wallet' },
  { id: 't-0b', type: 'topup', title: 'Wallet Top Up', amount: 75, date: todayAt(18, 30, 3), method: 'Stripe' },
  { id: 't-0a', type: 'topup', title: 'Wallet Top Up', amount: 50, date: todayAt(12, 5, 9), method: 'Cash App' },
]

// Orders page: order counts from the design and the small orders-per-month chart (402x113, plot 75px tall).
// The curve points come from the design's line; month counts add up to the 20 orders.
export const userOrdersSummary = { total: 20, pending: 12, completed: 8 }
export const ordersChart = {
  months: [
    { month: 'Jan', x: 13, orders: 2 },
    { month: 'Feb', x: 91, orders: 3 },
    { month: 'Mar', x: 168.5, orders: 4 },
    { month: 'Apr', x: 246.5, orders: 5 },
    { month: 'May', x: 324.5, orders: 4 },
    { month: 'June', x: 387.5, orders: 2 },
  ],
  trend: [
    { x: 14.02, value: 6.72 },
    { x: 38.09, value: 8.35 },
    { x: 61.69, value: 9.7 },
    { x: 82.06, value: 22.93 },
    { x: 116.78, value: 35.23 },
    { x: 148.02, value: 23.47 },
    { x: 179.73, value: 37.52 },
    { x: 205.65, value: 55.95 },
    { x: 238.05, value: 42.69 },
    { x: 262.81, value: 25.77 },
    { x: 297.29, value: 19.69 },
    { x: 321.13, value: 35.23 },
    { x: 338.95, value: 27.78 },
    { x: 357.93, value: 19.69 },
    { x: 374.83, value: 17.53 },
    { x: 388.02, value: 23.47 },
  ],
  maxValue: 75,
}

// Wallet page: top ups per month (bar chart, 432x255 card). Bars are 177px tall at $400;
// x / width / labelX are the design positions inside the card.
export const topUpsChart = {
  max: 400,
  ticks: [
    { label: '400$', top: 38 },
    { label: '300$', top: 78 },
    { label: '200$', top: 117.3 },
    { label: '100$', top: 157.4 },
    { label: '0', top: 197.3 },
  ],
  months: [
    { short: 'JAN', name: 'January', x: 68, width: 7, labelX: 70, amount: 120 },
    { short: 'FEB', name: 'February', x: 97, width: 8, labelX: 98.5, amount: 156 },
    { short: 'MAR', name: 'March', x: 126, width: 8, labelX: 127, amount: 156 },
    { short: 'APR', name: 'April', x: 155, width: 7, labelX: 157, amount: 246 },
    { short: 'MAY', name: 'May', x: 184, width: 7, labelX: 187, amount: 276 },
    { short: 'JUN', name: 'June', x: 215, width: 7, labelX: 216.5, amount: 212 },
    { short: 'JUL', name: 'July', x: 244, width: 7, labelX: 244, amount: 245 },
    { short: 'AUG', name: 'August', x: 273, width: 7, labelX: 274.5, amount: 120 },
    { short: 'SEP', name: 'September', x: 302, width: 7, labelX: 304, amount: 276 },
    { short: 'OCT', name: 'October', x: 331, width: 8, labelX: 334.5, amount: 332 },
    { short: 'NOV', name: 'November', x: 360, width: 8, labelX: 365, amount: 364 },
    { short: 'DEC', name: 'December', x: 390, width: 7, labelX: 394, amount: 400 },
  ],
  defaultMonth: 11,
}

// Generator page: the user's active proxy plans (the design shows Residential: 5GB, 1.8GB used, 14 days left).
// `light` is the "used" slice of the donut.
export const proxyPlans = [
  { id: 'residential', name: 'Residential', color: '#ff8686', light: '#ffdbdb', totalGB: 5, usedGB: 1.8, daysLeft: 14 },
  { id: 'datacenter', name: 'Datacenter', color: '#7d83ff', light: '#d9dbff', totalGB: 10, usedGB: 6.4, daysLeft: 21 },
  { id: 'mobile', name: 'Mobile', color: '#69c378', light: '#d3eed8', totalGB: 3, usedGB: 0.6, daysLeft: 6 },
]

// Targeting options: country -> gateway host, regions -> cities, and the ISPs available there
export const proxyLocations = [
  {
    id: 'us',
    name: 'United States',
    host: 'us-1m.proxies.land',
    regions: [
      { name: 'California', cities: ['Los Angeles', 'San Francisco', 'San Diego'] },
      { name: 'New York', cities: ['New York City', 'Buffalo'] },
      { name: 'Texas', cities: ['Houston', 'Austin', 'Dallas'] },
    ],
    isps: ['Comcast', 'AT&T', 'Verizon', 'Spectrum'],
  },
  {
    id: 'gb',
    name: 'United Kingdom',
    host: 'gb-1m.proxies.land',
    regions: [
      { name: 'England', cities: ['London', 'Manchester', 'Birmingham'] },
      { name: 'Scotland', cities: ['Edinburgh', 'Glasgow'] },
    ],
    isps: ['BT', 'Virgin Media', 'Sky'],
  },
  {
    id: 'de',
    name: 'Germany',
    host: 'de-1m.proxies.land',
    regions: [
      { name: 'Bavaria', cities: ['Munich', 'Nuremberg'] },
      { name: 'Berlin', cities: ['Berlin'] },
      { name: 'Hesse', cities: ['Frankfurt', 'Wiesbaden'] },
    ],
    isps: ['Deutsche Telekom', 'Vodafone', 'O2'],
  },
]

// Rotating proxies share one gateway port; sticky sessions get one port each
export const proxyPorts = { rotating: 8000, stickyStart: 8001 }
export const PROXY_COUNT = 5

// Support: ticket types route to a team. Tickets with a reply show "Received from Support";
// the rest show the team they were sent to. 5 open + 10 solved, as in the design.
export const ticketTypes = [
  { id: 'billing', label: 'Billing', team: 'accounts' },
  { id: 'account', label: 'Account', team: 'accounts' },
  { id: 'technical', label: 'Technical issue', team: 'technical' },
  { id: 'proxy', label: 'Proxy setup', team: 'technical' },
  { id: 'it', label: 'IT Questions', team: 'IT' },
]

const reply = 'Thanks for reaching out. We have checked your account and everything is set up correctly now. Let us know if anything else comes up.'
const ticket = (id, title, type, status, date, extra = {}) => ({
  id,
  title,
  type,
  status,
  date,
  description: `${title}: please see the details in the attached message.`,
  attachment: null,
  ...extra,
})

export const initialTickets = [
  ticket('tk-15', 'IT Questions', 'it', 'open', todayAt(10, 20), {
    description: 'Can I use the same proxy credentials on more than one server at a time?',
    reply: 'Yes, you can use the same credentials on as many servers as you like. Just add each server IP to your whitelist in the Generator.',
    unread: true,
  }),
  ticket('tk-14', 'My Billing Issue', 'billing', 'open', todayAt(10, 20), {
    description: 'I was charged twice for my Residential plan this morning.',
  }),
  ticket('tk-13', 'My Account Setup', 'account', 'open', todayAt(10, 20), {
    description: 'I would like to change the email address on my account.',
  }),
  ticket('tk-12', 'Proxy not rotating', 'proxy', 'open', todayAt(9, 5, 1)),
  ticket('tk-11', 'Slow connection in Germany', 'technical', 'open', todayAt(16, 40, 2)),
  ticket('tk-10', 'Invoice for March', 'billing', 'solved', todayAt(11, 15, 4), { reply }),
  ticket('tk-9', 'Voucher not applied', 'billing', 'solved', todayAt(14, 30, 6), { reply }),
  ticket('tk-8', 'Whitelist limit', 'proxy', 'solved', todayAt(10, 0, 8), { reply }),
  ticket('tk-7', 'Two factor login', 'account', 'solved', todayAt(8, 45, 11), { reply }),
  ticket('tk-6', 'Refund request', 'billing', 'solved', todayAt(17, 20, 13), { reply }),
  ticket('tk-5', 'Sticky session length', 'proxy', 'solved', todayAt(12, 10, 16), { reply }),
  ticket('tk-4', 'API access', 'it', 'solved', todayAt(9, 30, 20), { reply }),
  ticket('tk-3', 'Timeouts on mobile plan', 'technical', 'solved', todayAt(15, 5, 23), { reply }),
  ticket('tk-2', 'Change username', 'account', 'solved', todayAt(13, 50, 27), { reply }),
  ticket('tk-1', 'Top up with Bitcoin', 'billing', 'solved', todayAt(10, 25, 30), { reply }),
]
