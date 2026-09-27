import { useCallback, useState } from 'react'
import UserOverviewCard from '../../components/user/UserOverviewCard.jsx'
import WalletCard from '../../components/user/WalletCard.jsx'
import OfferCard from '../../components/user/OfferCard.jsx'
import TopUpCard from '../../components/user/TopUpCard.jsx'
import TransactionsCard from '../../components/user/TransactionsCard.jsx'
import BuyOfferDialog from '../../components/user/BuyOfferDialog.jsx'
import TransactionDialog from '../../components/user/TransactionDialog.jsx'
import { offers } from '../../data/userData.js'
import { useAccount } from '../../context/AccountContext.jsx'

// Buying an offer or topping up updates the shared wallet and adds a transaction on the spot
function UserDashboard() {
  const { wallet, transactions, buyOffer: buy, topUp } = useAccount()
  const [buying, setBuying] = useState(null)
  const [viewing, setViewing] = useState(null)
  const closeBuy = useCallback(() => setBuying(null), [])
  const closeDetails = useCallback(() => setViewing(null), [])

  const buyOffer = (offer) => {
    buy(offer)
    setBuying(null)
  }

  return (
    <div className="max-w-[1002px] xl:pb-[39px]">
      <div className="flex flex-col gap-8 xl:flex-row xl:gap-[25px]">
        <UserOverviewCard />
        <WalletCard wallet={wallet} />
      </div>

      <div className="mt-8 flex flex-col gap-8 xl:mt-[26px] xl:flex-row xl:gap-[33px]">
        <section aria-labelledby="offers-title" className="min-w-0 xl:flex-1">
          <h2 id="offers-title" className="text-[20px] leading-[28px] font-bold">
            Your offers
          </h2>
          <div className="mt-[16px] grid grid-cols-1 justify-items-center gap-[33px] sm:grid-cols-2 sm:justify-items-start md:grid-cols-3">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} onBuy={setBuying} />
            ))}
          </div>
        </section>
        <TopUpCard onTopUp={topUp} />
      </div>

      <div className="mt-10 xl:mt-[31px]">
        <TransactionsCard title="Recent transactions" transactions={transactions} onDetails={setViewing} />
      </div>

      <BuyOfferDialog offer={buying} balance={wallet.balance} onConfirm={buyOffer} onClose={closeBuy} />
      <TransactionDialog transaction={viewing} onClose={closeDetails} />
    </div>
  )
}

export default UserDashboard
