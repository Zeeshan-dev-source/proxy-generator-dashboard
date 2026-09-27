import { useState } from 'react'
import DashboardCard from '../dashboard/DashboardCard.jsx'
import TrendChart from '../dashboard/TrendChart.jsx'
import ScaleToFit from '../dashboard/ScaleToFit.jsx'
import tooltipBg from '../../assets/admin/tooltip.svg'
import RangeSelect from './RangeSelect.jsx'
import { dateRanges, overview, revenueChart } from '../../data/adminData.js'

// Light tooltip from the admin design: revenue and order count for the month
function RevenueTooltip({ month }) {
  return (
    <>
      <img src={tooltipBg} alt="" width="102" height="72.5" className="absolute top-0 left-[-4px] h-[72.5px] w-[102px] max-w-none" />
      <span className="absolute top-[13px] left-[11px] size-[9px] bg-datacenter" />
      <span className="absolute top-[32px] left-[11px] size-[9px] bg-tooltip-green" />
      <p className="absolute top-[6.75px] left-[28px] font-poppins text-[14.152px] font-semibold tracking-[0.0885px] whitespace-nowrap text-dot-active">
        ${month.revenue.toFixed(2)}
      </p>
      <p className="absolute top-[25.75px] left-[28px] font-poppins text-[14.152px] font-semibold tracking-[0.0885px] text-dot-active">
        {month.orders}
      </p>
      <p className="absolute top-[42px] left-[28px] text-[12px] leading-[14px] text-muted">Orders</p>
    </>
  )
}

function OverviewCard() {
  const [range, setRange] = useState(dateRanges[0].value)

  return (
    <DashboardCard title="Admin Dashboard" className="w-full xl:w-[728px] xl:shrink-0">
      {/* 1024px and up: the 728x255 design layout. Smaller: dropdown and stats on top, chart scaled to fit underneath. */}
      <div className="relative p-5 lg:h-[255px] lg:w-[728px] lg:p-0">
          <RangeSelect
            id="overview-range"
            label="Date range"
            value={range}
            onChange={setRange}
            options={dateRanges}
            className="lg:absolute! lg:top-[13px] lg:left-[19px]"
          />

          <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:absolute lg:top-[67px] lg:left-[26px] lg:mt-0 lg:flex lg:flex-col lg:gap-[22px]">
            {overview.map((item) => (
              <li key={item.label} className="flex items-center">
                <span className="flex w-[30px] justify-center">
                  <img src={item.icon} alt="" width={item.width} height={item.height} />
                </span>
                <div className="ml-[17px]">
                  <p className="text-[22px] leading-[26px] font-bold">{item.value}</p>
                  <p className="mt-[1px] text-[12px] leading-[14px] text-muted">{item.label}</p>
                </div>
              </li>
            ))}
          </ul>

          <ScaleToFit width={402} height={220} className="mx-auto mt-16 max-w-[402px] lg:absolute lg:top-[23px] lg:left-[280px] lg:mt-0 lg:w-[402px]">
            <TrendChart {...revenueChart} label="Revenue and orders by month" renderTooltip={(month) => <RevenueTooltip month={month} />} />
          </ScaleToFit>
      </div>
    </DashboardCard>
  )
}

export default OverviewCard
