import DashboardCard from '../dashboard/DashboardCard.jsx'
import Donut from '../dashboard/Donut.jsx'
import { ordersSummary } from '../../data/adminData.js'

function OrdersCard() {
  return (
    <DashboardCard title="Orders" className="w-full sm:w-[219px] sm:shrink-0" cardClassName="mt-[16px] h-[220px]">
      <div className="pt-[24px] pl-[41px]">
        <Donut segments={ordersSummary.segments} total={ordersSummary.total} />
      </div>
      <ul className="mt-[10px] ml-[33px] flex flex-col gap-[3px]">
        {ordersSummary.segments.map((item) => (
          <li key={item.label} className="flex items-start">
            <span className="mt-[9px] size-[9px]" style={{ backgroundColor: item.color }} />
            <div className="ml-[7px]">
              <p className="text-[14px] leading-[16px] font-bold">{item.value}</p>
              <p className="-mt-[1px] text-[12px] leading-[14px] text-muted">{item.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </DashboardCard>
  )
}

export default OrdersCard
