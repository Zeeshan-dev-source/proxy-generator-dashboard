import DashboardCard from '../../dashboard/DashboardCard.jsx'
import RangeSelect from '../RangeSelect.jsx'
import { ordersSummary, orderRanges } from '../../../data/ordersData.js'

// Widths put each stat where the design has it (bars at 34, 288 and 565px)
const itemWidths = ['xl:w-[254px]', 'xl:w-[277px]', 'xl:w-[192px]']

function OrdersSummary({ range, onRangeChange }) {
  return (
    <DashboardCard
      title="Admin Orders"
      className="w-full xl:w-[998px]"
      cardClassName="mt-[16px] flex flex-col gap-5 p-5 sm:flex-row sm:flex-wrap sm:items-center xl:h-[79px] xl:flex-nowrap xl:gap-0 xl:py-0 xl:pr-0 xl:pl-[34px]"
    >
      {ordersSummary.map((stat, i) => (
        <div key={stat.label} className={`flex items-start sm:min-w-[180px] ${itemWidths[i]}`}>
          <img src={stat.bar} alt="" width="4" height="42" />
          <div className="-mt-[1px] ml-[15px]">
            <p className="text-[22px] leading-[26px] font-bold">{stat.value}</p>
            <p className="mt-[1px] text-[12px] leading-[14px] text-muted">{stat.label}</p>
          </div>
        </div>
      ))}
      <RangeSelect id="orders-range" label="Order date range" value={range} onChange={onRangeChange} options={orderRanges} />
    </DashboardCard>
  )
}

export default OrdersSummary
