import { USER_ROLE } from '../../../data/usersData.js'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// "29 August 2023", the format used in the design
export function formatLongDate(iso) {
  const d = new Date(iso)
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export const roleColor = {
  [USER_ROLE.admin]: 'text-primary',
  [USER_ROLE.banned]: 'text-residential',
  [USER_ROLE.user]: 'text-cream',
}

const byKey = {
  username: (u) => u.username.toLowerCase(),
  role: (u) => u.role,
  joinDate: (u) => u.joinDate,
  lastLogin: (u) => u.lastLogin,
}

export function sortUsers(list, sort) {
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

export function matchesUserSearch(user, query) {
  if (!query) return true
  const q = query.trim().toLowerCase()
  return [user.username, user.email, user.role, formatLongDate(user.joinDate), formatLongDate(user.lastLogin)].some((f) =>
    f.toLowerCase().includes(q),
  )
}
