import DashboardCard from '../dashboard/DashboardCard.jsx'
import Donut from '../dashboard/Donut.jsx'
import cardIcon from '../../assets/user/credit-card-fill.svg'
import spentIcon from '../../assets/user/chart-alt-fill.svg'
import bonusIcon from '../../assets/user/discount-shape.svg'

const money = (n) => `$${n.toFixed(2)}`

// 249x255 card: balance, a donut of bonus / spent / balance, and the two totals underneath
// Dashboard: "Your wallet" with the title nudged down; Wallet page: "My Wallet" with the standard spacing
function WalletCard({ wallet, title = 'Your wallet', titleClassName = 'mt-[5px]', cardClassName = 'mt-[11px]', className = 'w-full xl:w-[249px] xl:shrink-0' }) {
  // Clockwise from the top as in the design: bonus (blue), spent (pink), balance (green)
  const segments = [
    { label: 'Bonus', value: wallet.bonus, color: '#007fff' },
    { label: 'Total Spent', value: wallet.spent, color: '#ff7eab' },
    { label: 'Balance', value: wallet.balance, color: '#00b795' },
  ]

  return (
    <DashboardCard title={title} className={className} titleClassName={titleClassName} cardClassName={cardClassName}>
      <div className="relative mx-auto h-[255px] w-[249px]">
        <img src={cardIcon} alt="" width="25" height="25" className="absolute top-[29px] left-[50px]" />
        <p className="absolute inset-x-0 top-[21px] text-center text-[22px] leading-[28px] font-bold">{money(wallet.balance)}</p>
        <p className="absolute inset-x-0 top-[41.47px] text-center text-[12px] leading-[28px] text-muted">Balance</p>

        <Donut segments={segments} size={104} className="absolute! top-[75px] left-[73px]" />

        {/* Totals: text columns centred at 70px and 171px, as in the design */}
        <img src={spentIcon} alt="" width="23" height="17.06" className="absolute top-[183px] left-[62px]" />
        <p className="absolute top-[202.6px] left-[12px] w-[116px] text-center text-[16px] leading-[28px] font-bold">{money(wallet.spent)}</p>
        <p className="absolute top-[218.8px] left-[14px] w-[116px] text-center text-[12px] leading-[28px] text-muted">Total Spent</p>
        <img src={bonusIcon} alt="" width="15.36" height="15.35" className="absolute top-[183px] left-[163px]" />
        <p className="absolute top-[202.6px] left-[125px] w-[92px] text-center text-[16px] leading-[28px] font-bold">{money(wallet.bonus)}</p>
        <p className="absolute top-[218.8px] left-[125px] w-[92px] text-center text-[12px] leading-[28px] text-muted">Bonus</p>
      </div>
    </DashboardCard>
  )
}

export default WalletCard
