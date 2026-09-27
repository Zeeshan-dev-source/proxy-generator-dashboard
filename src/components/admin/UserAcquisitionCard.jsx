import DashboardCard from '../dashboard/DashboardCard.jsx'
import Donut from '../dashboard/Donut.jsx'
import { userAcquisition } from '../../data/adminData.js'

// In the design the lighter (returning) arc comes first clockwise, so the pie gets the reversed order
const pieSegments = [...userAcquisition.segments].reverse()

function UserAcquisitionCard() {
  return (
    <DashboardCard title="User Acquisition" className="w-full sm:w-[249px] sm:shrink-0" cardClassName="mt-[16px] h-[220px]">
      <ul className="flex flex-col gap-[2px] pt-[16px] pl-[14px]">
        {userAcquisition.segments.map((item) => (
          <li key={item.label} className="flex items-center leading-[28px]">
            <span className="size-[9px]" style={{ backgroundColor: item.color }} />
            <span className="w-[33px] text-right text-[14px] font-bold">{item.value}</span>
            <span className="ml-[11px] text-[12px] text-muted">{item.label}</span>
          </li>
        ))}
      </ul>
      <Donut segments={pieSegments} total={userAcquisition.total} totalClassName="text-[18px]" className="mt-[15px] ml-[67px]" />
    </DashboardCard>
  )
}

export default UserAcquisitionCard
