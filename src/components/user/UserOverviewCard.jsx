import DashboardCard from '../dashboard/DashboardCard.jsx'
import TrendChart from '../dashboard/TrendChart.jsx'
import ScaleToFit from '../dashboard/ScaleToFit.jsx'
import DarkTooltip from './DarkTooltip.jsx'
import { currentUser, spendingChart, userOverview } from '../../data/userData.js'

function UserOverviewCard() {
  return (
    <DashboardCard title={`${currentUser.firstName}’s Overview`} className="w-full xl:w-[728px] xl:shrink-0">
      {/* 1024px and up: the 728x255 design layout. Smaller: stats on top, chart scaled to fit underneath. */}
      <div className="relative p-5 lg:h-[255px] lg:w-[728px] lg:p-0">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:absolute lg:top-[23px] lg:left-[26px] lg:flex lg:flex-col lg:gap-[32px]">
            {userOverview.map((item) => (
              <li key={item.label} className="flex items-center">
                <span className="flex w-[30px] justify-center">
                  <img src={item.icon} alt="" width={item.width} height={item.height} className="max-w-none" />
                </span>
                <div className="ml-[17px]">
                  <p className="text-[22px] leading-[26px] font-bold">{item.value}</p>
                  <p className="mt-[1px] text-[12px] leading-[14px] text-muted">{item.label}</p>
                </div>
              </li>
            ))}
          </ul>

          <ScaleToFit width={402} height={220} className="mx-auto mt-16 max-w-[402px] lg:absolute lg:top-[23px] lg:left-[280px] lg:mt-0 lg:w-[402px]">
            <TrendChart {...spendingChart} label="Spending by month" renderTooltip={(month) => <DarkTooltip value={`$${month.amount}`} label={month.month} />} />
          </ScaleToFit>
      </div>
    </DashboardCard>
  )
}

export default UserOverviewCard
