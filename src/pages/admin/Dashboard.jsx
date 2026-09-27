import OverviewCard from '../../components/admin/OverviewCard.jsx'
import StatsCard from '../../components/admin/StatsCard.jsx'
import OrdersCard from '../../components/admin/OrdersCard.jsx'
import TopCountriesCard from '../../components/admin/TopCountriesCard.jsx'
import UserAcquisitionCard from '../../components/admin/UserAcquisitionCard.jsx'

function Dashboard() {
  return (
    <div className="max-w-[1002px] xl:pb-[137px]">
      <div className="flex flex-col gap-8 xl:flex-row xl:gap-[25px]">
        <OverviewCard />
        <StatsCard />
      </div>

      <div className="mt-8 flex flex-wrap gap-8 xl:mt-[26px] xl:flex-nowrap xl:gap-0">
        <OrdersCard />
        <div className="w-full xl:ml-[41px] xl:w-auto">
          <TopCountriesCard />
        </div>
        <div className="w-full sm:w-auto xl:ml-[25px]">
          <UserAcquisitionCard />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
