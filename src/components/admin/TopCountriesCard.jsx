import DashboardCard from '../dashboard/DashboardCard.jsx'
import Sparkline from './Sparkline.jsx'
import { topCountries } from '../../data/adminData.js'

function TopCountriesCard() {
  return (
    <DashboardCard
      title="Top Countries Users"
      className="w-full xl:w-[468px] xl:shrink-0"
      cardClassName="mt-[17px] h-[219px] overflow-x-auto"
    >
      <table className="mt-[30px] ml-[21px] text-[16px] leading-[25.92px] tracking-[-0.154px]">
        <thead className="sr-only">
          <tr>
            <th>Country</th>
            <th>Users</th>
            <th>Revenue</th>
            <th>Trend</th>
          </tr>
        </thead>
        <tbody>
          {topCountries.map((row) => (
            <tr key={row.country}>
              <td className="w-[150px] p-0 font-bold whitespace-nowrap">{row.country}</td>
              <td className="w-[53px] p-0 text-right">{row.users}</td>
              <td className="w-[115px] p-0 text-right">{row.revenue}</td>
              <td className="p-0 pl-[26px] align-top">
                <Sparkline className="mt-[2px]" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardCard>
  )
}

export default TopCountriesCard
