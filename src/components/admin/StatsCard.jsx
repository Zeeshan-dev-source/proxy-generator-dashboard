import DashboardCard from '../dashboard/DashboardCard.jsx'
import { stats } from '../../data/adminData.js'

function StatsCard() {
  return (
    <DashboardCard
      title="Stats"
      className="w-full xl:w-[249px] xl:shrink-0"
      titleClassName="mt-[5px]"
      cardClassName="mt-[11px] h-[255px]"
    >
      <ul className="flex flex-col gap-[16px] pt-[21px] pl-[22px]">
        {stats.map((stat) => (
          <li key={stat.label} className="flex items-start">
            <img src={stat.bar} alt="" width="4" height="42" />
            <div className="-mt-[1px] ml-[13px]">
              <p className="text-[22px] leading-[26px] font-bold">{stat.value}</p>
              <p className="mt-[1px] text-[12px] leading-[14px] text-muted">{stat.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </DashboardCard>
  )
}

export default StatsCard
