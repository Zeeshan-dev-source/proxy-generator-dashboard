import DialogShell from '../admin/ui/DialogShell.jsx'
import PillButton from '../ui/PillButton.jsx'
import { formatTransactionDate } from './transactionUtils.js'
import { ticketStatus, ticketTypeLabel } from './ticketUtils.js'

// "View" / "Details" for one support ticket: the request, the reply if there is one, and "Mark as solved"
function TicketDialog({ ticket, onClose, onSolve }) {
  const status = ticket ? ticketStatus(ticket) : null
  const rows = ticket
    ? [
        ['Type', ticketTypeLabel(ticket.type)],
        ['Date', formatTransactionDate(ticket.date)],
        ['Status', status.label],
        ...(ticket.attachment ? [['Attachment', ticket.attachment]] : []),
        ['Reference', ticket.id.toUpperCase()],
      ]
    : []

  return (
    <DialogShell open={Boolean(ticket)} onClose={onClose} labelledBy="ticket-dialog-title" className="max-w-[440px]">
      {ticket && (
        <>
          <h2 id="ticket-dialog-title" className="font-poppins text-[18px] leading-[28px]">
            {ticket.title}
          </h2>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[14px]">
            {rows.map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-muted">{label}</dt>
                <dd className={`truncate text-right ${label === 'Status' ? status.className : ''}`}>{value}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-5 text-[14px] font-bold">Your message</h3>
          <p className="mt-1 text-[14px] leading-[20px] break-words whitespace-pre-line opacity-80">{ticket.description}</p>

          {ticket.reply && (
            <div className="mt-4 rounded-[8px] border-l-2 border-primary bg-white/5 px-3 py-2">
              <h3 className="text-[14px] font-bold text-primary">Support</h3>
              <p className="mt-1 text-[14px] leading-[20px]">{ticket.reply}</p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              data-autofocus
              onClick={onClose}
              className="h-[32px] cursor-pointer rounded-[8px] px-4 text-[14px] outline-none hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-input-focus"
            >
              Close
            </button>
            {ticket.status === 'open' && (
              <PillButton variant="teal" onClick={() => onSolve(ticket.id)}>
                Mark as solved
              </PillButton>
            )}
          </div>
        </>
      )}
    </DialogShell>
  )
}

export default TicketDialog
