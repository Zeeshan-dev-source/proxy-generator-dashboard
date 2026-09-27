import { createContext, useContext, useMemo, useState } from 'react'
import { initialTickets, initialTransactions, initialWallet } from '../data/userData.js'

// The signed-in user's wallet, transactions and support tickets, shared by the user dashboard pages
const AccountContext = createContext(null)

export function AccountProvider({ children }) {
  const [wallet, setWallet] = useState(initialWallet)
  const [transactions, setTransactions] = useState(initialTransactions)
  const [tickets, setTickets] = useState(initialTickets)

  const value = useMemo(() => {
    const updateTicket = (id, changes) => setTickets((list) => list.map((t) => (t.id === id ? { ...t, ...changes } : t)))

    const addTransaction = (t) =>
      setTransactions((list) => [{ ...t, id: `t-${Date.now()}`, date: new Date().toISOString() }, ...list])

    return {
      wallet,
      transactions,
      // One day of an offer, paid from the wallet
      buyOffer: (offer) => {
        const price = offer.pricePerDay
        setWallet((w) => ({ ...w, balance: w.balance - price, spent: w.spent + price }))
        addTransaction({ type: 'purchase', title: `Purchase - ${offer.title}`, amount: price, method: 'Wallet' })
      },
      topUp: ({ amount, bonus = 0, method }) => {
        setWallet((w) => ({ ...w, balance: w.balance + amount + bonus, bonus: w.bonus + bonus }))
        addTransaction({ type: 'topup', title: 'Wallet Top Up', amount, method })
      },
      tickets,
      submitTicket: (t) => setTickets((list) => [{ ...t, id: `tk-${Date.now()}`, status: 'open', date: new Date().toISOString() }, ...list]),
      readTicket: (id) => updateTicket(id, { unread: false }),
      solveTicket: (id) => updateTicket(id, { status: 'solved', unread: false }),
    }
  }, [wallet, transactions, tickets])

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAccount() {
  const context = useContext(AccountContext)
  if (!context) throw new Error('useAccount must be used inside <AccountProvider>')
  return context
}
