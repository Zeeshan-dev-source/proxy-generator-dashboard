import Donut from '../dashboard/Donut.jsx'
import TrendChart from '../dashboard/TrendChart.jsx'
import ScaleToFit from '../dashboard/ScaleToFit.jsx'
import { formatMoney } from './transactionUtils.js'
import { ordersChart, userOrdersSummary } from '../../data/userData.js'

// Small dark label shown above the hovered month
function OrdersTooltip({ month }) {
  return (
    <p className="flex h-full items-center justify-center rounded-[8px] border border-[#4a4a4a] bg-[#454545] text-[12px] whitespace-nowrap">
      {month.orders} orders · {month.month}
    </p>
  )
}

const statValue = 'text-[24px] leading-[28px] font-bold'
const statLabel = 'text-[12px] leading-[14px] text-muted'

// 998x160 summary: spent / balance, orders-per-month chart, pending vs completed donut.
// 1024px and up uses the design positions; smaller screens stack the three parts.
function OrdersOverviewCard({ wallet }) {
  const { total, pending, completed } = userOrdersSummary
  const segments = [
    { label: 'Pending', value: pending, color: '#becde4' },
    { label: 'Completed', value: completed, color: '#7d83ff' },
  ]

  return (
    <div className="relative flex flex-col gap-6 rounded-[15px] bg-surface p-5 shadow-card sm:flex-row sm:flex-wrap sm:justify-between sm:px-8 lg:block lg:h-[160px] lg:p-0 xl:w-[998px]">
      <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-col sm:gap-[22px] lg:absolute lg:top-[27px] lg:left-[35px]">
        <div>
          <p className={statValue}>{formatMoney(wallet.spent)}</p>
          <p className={statLabel}>Total Spent</p>
        </div>
        <div>
          <p className={statValue}>{formatMoney(wallet.balance)}</p>
          <p className={statLabel}>Current Balance</p>
        </div>
      </div>

      <ScaleToFit width={402} height={113} className="order-last mx-auto max-w-[402px] sm:w-full lg:absolute lg:top-[31px] lg:left-[243px] lg:w-[402px]">
        <TrendChart
          {...ordersChart}
          defaultMonth={null}
          resetOnLeave
          height={113}
          plotHeight={75}
          labelY={95.3}
          tooltip={{ width: 104, height: 24, offset: 34 }}
          label="Orders per month"
          renderTooltip={(month) => <OrdersTooltip month={month} />}
        />
      </ScaleToFit>

      <div className="flex items-start gap-6 sm:mr-4 lg:mr-0 lg:absolute lg:top-[16px] lg:left-[724px] lg:gap-0">
        <Donut segments={segments} className="mt-[5px]" />
        <div className="lg:ml-[30px]">
          <p className="text-[22px] leading-[28px] font-bold">{total} orders</p>
          <ul className="mt-[11px] flex flex-col gap-[3px] lg:-ml-[1px]">
            {segments.map((s) => (
              <li key={s.label} className="flex items-start">
                <span className="mt-[9px] size-[9px]" style={{ backgroundColor: s.color }} />
                <div className="ml-[7px]">
                  <p className="text-[14px] leading-[16px] font-bold">{s.value}</p>
                  <p className="-mt-[1px] text-[12px] leading-[14px] text-muted">{s.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default OrdersOverviewCard
