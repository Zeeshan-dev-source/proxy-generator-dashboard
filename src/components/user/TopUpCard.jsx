import { useState } from 'react'
import DashboardCard from '../dashboard/DashboardCard.jsx'
import PillButton from '../ui/PillButton.jsx'
import { adminFieldClass } from '../admin/ui/fieldStyles.js'
import useFlash from '../../hooks/useFlash.js'
import { topUpMethods, vouchers } from '../../data/userData.js'

// Vertical positions inside the card: the dashboard card is 220px tall, the Wallet page one 255px
const layouts = {
  compact: { height: 220, amount: 25.8, voucher: 70, methods: 127, button: 165.4 },
  tall: { height: 255, amount: 34, voucher: 95, methods: 164.6, button: 203 },
}

// 249px card: amount, optional voucher, payment method and "Top Up Now"
function TopUpCard({ onTopUp, size = 'compact', className = 'w-full sm:w-[249px] sm:shrink-0' }) {
  const layout = layouts[size]
  const [amount, setAmount] = useState('')
  const [voucher, setVoucher] = useState('')
  const [method, setMethod] = useState(topUpMethods[0].id)
  const [message, setMessage] = useState(null)
  const [added, flashAdded] = useFlash()

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = Number(amount)
    if (!(value > 0)) {
      setMessage({ type: 'error', text: 'Enter an amount to top up.' })
      return
    }
    const code = voucher.trim().toUpperCase()
    if (code && !vouchers[code]) {
      setMessage({ type: 'error', text: 'That voucher code isn’t valid.' })
      return
    }
    const bonus = code ? vouchers[code] : 0
    onTopUp({ amount: value, bonus, method: topUpMethods.find((m) => m.id === method).name })
    setMessage({ type: 'success', text: bonus ? `Added $${value.toFixed(2)} + $${bonus.toFixed(2)} bonus.` : `Added $${value.toFixed(2)} to your wallet.` })
    setAmount('')
    setVoucher('')
    flashAdded()
  }

  return (
    <DashboardCard title="Top Up" className={className} cardClassName="mt-[16px]">
      <form onSubmit={handleSubmit} noValidate className="relative mx-auto w-[249px]" style={{ height: layout.height }}>
        <label htmlFor="topup-amount" className="sr-only">
          Amount in dollars
        </label>
        <input
          id="topup-amount"
          type="number"
          inputMode="decimal"
          min="1"
          step="0.01"
          placeholder="$0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          aria-invalid={message?.type === 'error' && !(Number(amount) > 0)}
          className={`${adminFieldClass} absolute left-[45px] h-[40px] w-[160px]! px-[10px] text-[16px] aria-invalid:border-residential`}
          style={{ top: layout.amount }}
        />
        <label htmlFor="topup-voucher" className="sr-only">
          Voucher code
        </label>
        <input
          id="topup-voucher"
          placeholder="Voucher Code"
          value={voucher}
          onChange={(e) => setVoucher(e.target.value)}
          autoComplete="off"
          className={`${adminFieldClass} absolute left-[45px] h-[40px] w-[160px]! px-[9px]`}
          style={{ top: layout.voucher }}
        />

        <div role="radiogroup" aria-label="Payment method">
          {topUpMethods.map((m) => {
            const selected = method === m.id
            return (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={m.disabled ? `${m.name} (not available yet)` : m.name}
                title={m.disabled ? 'Not available yet' : m.name}
                disabled={m.disabled}
                onClick={() => setMethod(m.id)}
                className={`absolute flex h-[24px] -translate-y-[4px] cursor-pointer items-center justify-center rounded-[6px] px-[2px] outline-offset-2 transition disabled:cursor-not-allowed ${
                  selected ? 'outline outline-1 outline-primary' : 'hover:bg-white/5'
                }`}
                style={{ left: m.left - 2, top: layout.methods }}
              >
                <img src={m.logo} alt="" width={m.width} height={m.height} />
              </button>
            )
          })}
        </div>

        <PillButton type="submit" className="absolute! left-[45px]" style={{ top: layout.button }}>
          {added ? 'Added ✓' : 'Top Up Now'}
        </PillButton>
      </form>
      {/* Below the card so the message never shifts the layout */}
      <p role="status" className={`absolute top-full left-0 mt-1 text-[12px] ${message?.type === 'error' ? 'text-residential' : 'text-primary'}`}>
        {message?.text}
      </p>
    </DashboardCard>
  )
}

export default TopUpCard
