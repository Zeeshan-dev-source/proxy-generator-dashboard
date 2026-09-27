import { useCallback, useMemo, useState } from 'react'
import WalletCard from '../../components/user/WalletCard.jsx'
import TopUpCard from '../../components/user/TopUpCard.jsx'
import TopUpsChartCard from '../../components/user/TopUpsChartCard.jsx'
import TransactionsCard from '../../components/user/TransactionsCard.jsx'
import TransactionDialog from '../../components/user/TransactionDialog.jsx'
import { useAccount } from '../../context/AccountContext.jsx'

// Wallet: balance, top up form, top ups per month and the list of recent top ups.
// A top up here updates the wallet card and the list straight away.
function UserWallet() {
  const { wallet, transactions, topUp } = useAccount()
  const [viewing, setViewing] = useState(null)
  const closeDetails = useCallback(() => setViewing(null), [])
  const topUps = useMemo(() => transactions.filter((t) => t.type === 'topup'), [transactions])

  return (
    <div className="max-w-[1002px] xl:pt-[15px] xl:pb-[21px]">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-[249px_249px] sm:justify-between md:justify-start md:gap-x-[34px] lg:grid-cols-[249px_249px_432px] lg:gap-x-[15px] xl:gap-x-[34px]">
        <WalletCard wallet={wallet} title="My Wallet" titleClassName="" cardClassName="mt-[16px]" className="w-full" />
        <TopUpCard onTopUp={topUp} size="tall" className="relative w-full" />
        <TopUpsChartCard className="min-w-0 sm:col-span-2 lg:col-span-1" />
      </div>

      <div className="mt-10 xl:mt-[17px]">
        <TransactionsCard
          title="Recent Topups"
          transactions={topUps}
          onDetails={setViewing}
          cardClassName="mt-[9px] h-[236px] xl:w-[998px]"
          scrollClassName="top-[8px] bottom-[12px]"
          listClassName="gap-[17px] pt-[15px] pb-2 sm:pr-[19px]!"
        />
      </div>

      <TransactionDialog transaction={viewing} onClose={closeDetails} />
    </div>
  )
}

export default UserWallet
