import { Link } from 'react-router-dom'
import DashboardCard from '../dashboard/DashboardCard.jsx'
import Donut from '../dashboard/Donut.jsx'
import searchIcon from '../../assets/user/search-alt-fill.svg'

// 356x254 "My Tickets" card: 144px open/solved donut with the total in the middle, legend, FAQ link
function TicketsSummaryCard({ tickets, className = '' }) {
  const open = tickets.filter((t) => t.status === 'open').length
  const segments = [
    { label: 'Open', value: open, color: '#e3f6f1' },
    { label: 'Solved', value: tickets.length - open, color: '#00b795' },
  ]

  return (
    <DashboardCard
      title="My Tickets"
      className={className}
      cardClassName="mt-[16px] flex flex-col pt-[32px] pl-[34px] xl:h-[254px]"
    >
      <div className="flex items-start">
        <div className="relative">
          <Donut segments={segments} size={144} />
          <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-[26px] font-bold text-primary">
            {tickets.length}
          </p>
        </div>
        <ul className="mt-[8px] ml-[40px] flex flex-col gap-[10px]">
          {segments.map((s) => (
            <li key={s.label} className="flex items-start">
              <span className="mt-[11px] size-[9px]" style={{ backgroundColor: s.color }} />
              <div className="ml-[7px]">
                <p className="text-[14px] leading-[16px] font-bold">{s.value}</p>
                <p className="text-[12px] leading-[14px] text-muted">{s.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Link
        to="/dashboard/support/faq"
        className="mt-6 mb-[10px] -ml-[16px] flex w-fit items-center gap-[2px] rounded-[6px] text-[14px] underline underline-offset-2 outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-input-focus xl:mt-auto"
      >
        <img src={searchIcon} alt="" width="24" height="24" />
        View our FAQ
      </Link>
    </DashboardCard>
  )
}

export default TicketsSummaryCard
