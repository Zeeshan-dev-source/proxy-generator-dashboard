import DashboardCard from '../dashboard/DashboardCard.jsx'
import circlePink from '../../assets/user/circle-pink.svg'
import circleBlue from '../../assets/user/circle-blue.svg'
import bagIcon from '../../assets/user/bag.svg'
import dollarIcon from '../../assets/user/dollar-circle.svg'
import detailsPink from '../../assets/user/btn-bg-details-pink.svg'
import detailsBlue from '../../assets/user/btn-bg-details-blue.svg'
import { formatMoney, formatTransactionDate } from './transactionUtils.js'

// Same dark card as DashboardCard, without a title
function PlainCard({ className, cardClassName, children }) {
  return (
    <section aria-label="Transactions" className={className}>
      <div className={`relative rounded-[15px] bg-surface shadow-card ${cardClassName}`}>{children}</div>
    </section>
  )
}

// Purchases are pink, top ups blue
const look = {
  purchase: { circle: circlePink, icon: bagIcon, button: detailsPink, text: 'text-spend' },
  topup: { circle: circleBlue, icon: dollarIcon, button: detailsBlue, text: 'text-income' },
}

// 1002px card of transactions; the rows that don't fit scroll inside it.
// Dashboard: "Recent transactions", 217px tall (3 rows). Orders page: no title, 351px tall (5 rows).
// Wallet page: "Recent Topups", 236px tall with slightly wider row spacing.
function TransactionsCard({
  transactions,
  onDetails,
  title,
  cardClassName = 'mt-[16px] h-[217px]',
  scrollClassName = 'top-[17px] bottom-[17px]',
  listClassName = 'gap-[15px]',
}) {
  const Wrapper = title ? DashboardCard : PlainCard
  return (
    <Wrapper title={title} className="w-full xl:w-[1002px]" cardClassName={`${cardClassName} overflow-hidden`}>
      <div className={`absolute right-[10px] left-0 scrollbar-panel overflow-y-auto [scrollbar-gutter:stable] ${scrollClassName}`}>
        {transactions.length === 0 ? (
          <p className="py-10 text-center text-[14px] text-muted">No transactions yet</p>
        ) : (
          <ul className={`flex flex-col pr-2 pl-3 sm:pr-[26px] sm:pl-[24px] ${listClassName}`} aria-label="Transactions">
            {transactions.map((t) => {
              const style = look[t.type]
              return (
                <li key={t.id} className="flex h-[52px] items-center">
                  <span className="relative flex size-[40px] shrink-0 items-center justify-center sm:size-[52px]">
                    <img src={style.circle} alt="" width="52" height="52" className="absolute inset-0 h-full w-full" />
                    <img src={style.icon} alt="" width="24" height="24" className="relative" />
                  </span>
                  <div className="ml-3 flex min-w-0 flex-1 flex-col gap-[2px] font-poppins sm:ml-[20px] sm:gap-[6px]">
                    <p className="truncate text-[14px] sm:text-[16px]">{t.title}</p>
                    <p className="truncate text-[12px] font-light sm:text-[14px]">
                      {/* On phones the amount moves under the title */}
                      <span className={`mr-2 font-medium sm:hidden ${style.text}`}>{formatMoney(t.amount)}</span>
                      <span className="opacity-50">{formatTransactionDate(t.date)}</span>
                    </p>
                  </div>
                  <p className={`ml-3 hidden shrink-0 text-right font-poppins text-[16px] font-medium sm:block ${style.text}`}>{formatMoney(t.amount)}</p>
                  <button
                    type="button"
                    onClick={() => onDetails(t)}
                    className={`relative ml-2 flex h-[36px] w-[72px] shrink-0 cursor-pointer items-center justify-center transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-input-focus focus-visible:outline-none sm:ml-[80px] sm:h-[44px] sm:w-[112px] ${style.text}`}
                    aria-label={`Details: ${t.title}, ${formatMoney(t.amount)}`}
                  >
                    <img src={style.button} alt="" width="112" height="44" className="absolute inset-0 h-full w-full" />
                    <span className="relative font-inter text-[14px] font-medium">Details</span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Wrapper>
  )
}

export default TransactionsCard
