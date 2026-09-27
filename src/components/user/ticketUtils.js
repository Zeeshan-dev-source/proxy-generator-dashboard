import { ticketTypes } from '../../data/userData.js'

// Status line shown for a ticket: solved, a reply from support, or the team it went to
export function ticketStatus(ticket) {
  const type = ticketTypes.find((t) => t.id === ticket.type)
  const team = type?.team ?? 'support'
  if (ticket.status === 'solved') return { team, label: 'Solved', className: 'text-muted' }
  if (ticket.reply) return { team, label: 'Received from Support', className: 'text-primary' }
  return { team, label: `Sent to ${team} team`, className: 'text-cream' }
}

export const ticketTypeLabel = (id) => ticketTypes.find((t) => t.id === id)?.label ?? id
