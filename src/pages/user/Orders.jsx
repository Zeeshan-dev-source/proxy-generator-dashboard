import { useCallback, useState } from 'react'
import OrdersOverviewCard from '../../components/user/OrdersOverviewCard.jsx'
import TransactionsCard from '../../components/user/TransactionsCard.jsx'
import TransactionDialog from '../../components/user/TransactionDialog.jsx'
import { useAccount } from '../../context/AccountContext.jsx'

// Orders & transactions: summary card and the full transaction list (5 rows visible, the rest scroll)
function UserOrders() {
  const { wallet, transactions } = useAccount()
  const [viewing, setViewing] = useState(null)
  const closeDetails = useCallback(() => setViewing(null), [])

  return (
    <div className="max-w-[1002px] xl:pb-[38px]">
      <h2 className="text-[20px] leading-[28px] font-bold">Orders/Transactions</h2>
      <div className="mt-[16px]">
        <OrdersOverviewCard wallet={wallet} />
      </div>
      <div className="mt-8 xl:mt-[32px]">
        <TransactionsCard
          transactions={transactions}
          onDetails={setViewing}
          cardClassName="h-[351px]"
          scrollClassName="top-[12px] bottom-[14px]"
          listClassName="gap-[15px] pt-[8px] pb-2"
        />
      </div>
      <TransactionDialog transaction={viewing} onClose={closeDetails} />
    </div>
  )
}

export default UserOrders
