import dashboardIcon from '../assets/admin/dashboard-fill.svg'
import flagIcon from '../assets/admin/flag-fill.svg'
import userIcon from '../assets/admin/user-fill.svg'
import boxIcon from '../assets/admin/box-fill.svg'
import settingIcon from '../assets/admin/setting-alt-fill.svg'
import chartIcon from '../assets/admin/chart-fill.svg'
import statBarPurple from '../assets/admin/stat-bar-purple.svg'
import statBarGreen from '../assets/admin/stat-bar-green.svg'
import avatar from '../assets/admin/admin-avatar.webp'

export const adminUser = { name: 'Johnny Harris', avatar }

export const adminNav = [
  { label: 'Dashboard', to: '/admin', icon: dashboardIcon, width: 24, height: 24 },
  { label: 'Orders', to: '/admin/orders', icon: flagIcon, width: 30, height: 26 },
  { label: 'Users', to: '/admin/users', icon: userIcon, width: 30, height: 30 },
  { label: 'Products', to: '/admin/products', icon: boxIcon, width: 29, height: 29 },
  { label: 'Settings', to: '/admin/settings', icon: settingIcon, width: 24, height: 24, className: 'mt-[8px]' },
]

export const dateRanges = [
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
  { value: 'year', label: 'This year' },
]

export const overview = [
  { value: '$552', label: 'Total Revenue', icon: chartIcon, width: 26, height: 26 },
  { value: '512', label: 'Total Users', icon: userIcon, width: 30, height: 30 },
  { value: '62', label: 'Total Orders', icon: flagIcon, width: 30, height: 26 },
]

// Revenue chart geometry comes from the Figma design (402x220 plot, bars end 182px from the top).
// `x` is the horizontal position in that plot; revenue/orders are the real values.
export const revenueChart = {
  // Monthly totals shown in the tooltip; bars (bar) are the order counts
  months: [
    { month: 'Jan', x: 13, bar: 69, orders: 69, revenue: 612.4 },
    { month: 'Feb', x: 91, bar: 104, orders: 104, revenue: 734.1 },
    { month: 'Mar', x: 168.5, bar: 104, orders: 104, revenue: 698.25 },
    { month: 'Apr', x: 246.5, bar: 64, orders: 64, revenue: 905.8 },
    { month: 'May', x: 324.5, bar: 80, orders: 80, revenue: 852.36 },
    { month: 'June', x: 387.5, bar: 96, orders: 96, revenue: 780.15 },
  ],
  // Revenue trend drawn as the purple curve (value = revenue)
  trend: [
    { x: 14.02, value: 518.77 },
    { x: 38.09, value: 536.68 },
    { x: 61.69, value: 551.53 },
    { x: 82.06, value: 697.43 },
    { x: 116.77, value: 833.06 },
    { x: 148.02, value: 703.4 },
    { x: 179.72, value: 858.25 },
    { x: 205.65, value: 1061.42 },
    { x: 238.05, value: 915.31 },
    { x: 262.81, value: 728.74 },
    { x: 297.29, value: 661.69 },
    { x: 321.13, value: 833.06 },
    { x: 338.95, value: 750.88 },
    { x: 357.93, value: 661.69 },
    { x: 374.82, value: 637.88 },
    { x: 388.02, value: 703.4 },
  ],
  maxValue: 1263.26, // revenue at the top of the plot
  maxBar: 227.5, // orders at the top of the plot
  defaultMonth: 4, // May is selected in the design
}

export const stats = [
  { value: '$50', label: 'Revenue per order', bar: statBarPurple },
  { value: '3.5', label: 'Orders per customer', bar: statBarGreen },
  { value: '$25', label: 'Revenue per customer', bar: statBarPurple },
  { value: '9', label: 'Lifetime total orders', bar: statBarGreen },
]

export const ordersSummary = {
  total: 58,
  segments: [
    { label: 'Pending', value: 35, color: '#becde4' },
    { label: 'Completed', value: 23, color: '#7d83ff' },
  ],
}

// Same trend shape for every row, as in the design (sparkline plot is 51.65x13.75)
export const sparklineTrend = [
  { x: 1, value: 5.59 },
  { x: 5.18, value: 5.17 },
  { x: 11.22, value: 7.5 },
  { x: 15.45, value: 6.59 },
  { x: 20.12, value: 4.19 },
  { x: 25.16, value: 6.89 },
  { x: 30.46, value: 6.59 },
  { x: 36.49, value: 10.16 },
  { x: 42.92, value: 12.75 },
  { x: 47.71, value: 10.16 },
  { x: 50.65, value: 10.16 },
]

export const topCountries = [
  { country: 'United Kingdom', users: '139', revenue: '$50' },
  { country: 'United Emirates', users: '283', revenue: '$25' },
  { country: 'USA', users: '782', revenue: '$35' },
  { country: 'Germany', users: '1,9', revenue: '$54' },
  { country: 'India', users: '103', revenue: '$100' },
  { country: 'Singapore', users: '477', revenue: '$66' },
]

export const userAcquisition = {
  total: 170,
  segments: [
    { label: 'New Users', value: 120, color: '#00b795' },
    { label: 'Returning Users', value: 50, color: '#8bf9e4' },
  ],
}
