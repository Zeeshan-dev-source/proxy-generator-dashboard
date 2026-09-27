import DashboardCard from '../dashboard/DashboardCard.jsx'
import circlePink from '../../assets/user/circle-pink.svg'
import circleTeal from '../../assets/user/circle-teal.svg'
import mailIcon from '../../assets/user/mail-fill.svg'
import dollarIcon from '../../assets/user/dollar-circle-pink.svg'
import serverIcon from '../../assets/user/server-fill-pink.svg'
import viewBg from '../../assets/user/btn-bg-view-teal.svg'
import detailsBg from '../../assets/user/btn-bg-details-pink.svg'
import { formatTransactionDate } from './transactionUtils.js'
import { ticketStatus } from './ticketUtils.js'

// Tickets with a reply from support are teal with "View"; the rest are pink with "Details"
const replied = { circle: circleTeal, icon: mailIcon, button: viewBg, buttonLabel: 'View', buttonText: 'text-primary' }
const pending = { circle: circlePink, button: detailsBg, buttonLabel: 'Details', buttonText: 'text-spend' }
const teamIcon = { accounts: dollarIcon, technical: serverIcon, IT: serverIcon }

// 998x235 card of tickets; the rows that don't fit scroll inside it. Unread replies are bold.
function TicketHistoryCard({ tickets, onOpen }) {
  return (
    <DashboardCard
      title="Ticket History"
      className="w-full xl:w-[998px]"
      titleClassName="xl:ml-[7px]"
      cardClassName="mt-[9px] h-[340px] overflow-hidden sm:h-[235px]"
    >
      <div className="absolute top-[8px] right-[9px] bottom-[12px] left-0 scrollbar-panel overflow-y-auto [scrollbar-gutter:stable]">
        <ul className="flex flex-col gap-[17px] pt-[15px] pr-2 pb-2 pl-3 sm:pr-[20px] sm:pl-[27px]" aria-label="Tickets">
          {tickets.map((t) => {
            const status = ticketStatus(t)
            const look = t.reply ? replied : { ...pending, icon: teamIcon[status.team] }
            return (
              <li key={t.id} className="flex h-[52px] items-center">
                <span className="relative flex size-[40px] shrink-0 items-center justify-center sm:size-[52px]">
                  <img src={look.circle} alt="" width="52" height="52" className="absolute inset-0 h-full w-full" />
                  <img src={look.icon} alt="" width="24" height="24" className="relative" />
                </span>
                <div className={`ml-3 flex min-w-0 flex-1 flex-col gap-[2px] sm:ml-[20px] sm:gap-[6px] ${t.unread ? 'font-roboto font-bold' : 'font-poppins'}`}>
                  <p className="truncate text-[14px] sm:text-[16px]">
                    {t.unread && <span className="sr-only">New reply: </span>}
                    {t.title}
                  </p>
                  <p className={`truncate text-[12px] sm:text-[14px] ${t.unread ? '' : 'font-light'}`}>
                    {/* On phones the status moves under the title */}
                    <span className={`mr-2 font-medium sm:hidden ${status.className}`}>{status.label}</span>
                    <span className="opacity-50">{formatTransactionDate(t.date)}</span>
                  </p>
                </div>
                <p className={`ml-3 hidden shrink-0 text-right font-poppins text-[16px] font-medium sm:block ${status.className}`}>{status.label}</p>
                <button
                  type="button"
                  onClick={() => onOpen(t)}
                  className={`relative ml-2 flex h-[36px] w-[72px] shrink-0 cursor-pointer items-center justify-center transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-input-focus focus-visible:outline-none sm:ml-[80px] sm:h-[44px] sm:w-[112px] ${look.buttonText}`}
                  aria-label={`${look.buttonLabel}: ${t.title}`}
                >
                  <img src={look.button} alt="" width="112" height="44" className="absolute inset-0 h-full w-full" />
                  <span className="relative font-poppins text-[14px] sm:text-[16px]">{look.buttonLabel}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </DashboardCard>
  )
}

export default TicketHistoryCard
