import { useCallback, useState } from 'react'
import TicketsSummaryCard from '../../components/user/TicketsSummaryCard.jsx'
import NewTicketCard from '../../components/user/NewTicketCard.jsx'
import TicketHistoryCard from '../../components/user/TicketHistoryCard.jsx'
import TicketDialog from '../../components/user/TicketDialog.jsx'
import { useAccount } from '../../context/AccountContext.jsx'

// Support: open/solved summary, new ticket form and the ticket history.
// A new ticket goes to the top of the history and the donut straight away; opening a reply marks it read.
function UserSupport() {
  const { tickets, submitTicket, readTicket, solveTicket } = useAccount()
  const [viewingId, setViewingId] = useState(null)
  const viewing = tickets.find((t) => t.id === viewingId) ?? null
  const closeDetails = useCallback(() => setViewingId(null), [])

  const openTicket = (ticket) => {
    if (ticket.unread) readTicket(ticket.id)
    setViewingId(ticket.id)
  }

  return (
    <div className="max-w-[1002px] xl:pt-[15px] xl:pb-[75px]">
      <div className="flex flex-col gap-8 xl:flex-row xl:gap-[47px]">
        <TicketsSummaryCard tickets={tickets} className="xl:w-[356px] xl:shrink-0" />
        <NewTicketCard onSubmit={submitTicket} className="xl:w-[595px] xl:shrink-0" />
      </div>

      <div className="mt-10 xl:mt-[14px]">
        <TicketHistoryCard tickets={tickets} onOpen={openTicket} />
      </div>

      <TicketDialog ticket={viewing} onClose={closeDetails} onSolve={solveTicket} />
    </div>
  )
}

export default UserSupport
