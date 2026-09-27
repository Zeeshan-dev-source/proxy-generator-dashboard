import DialogShell from '../admin/ui/DialogShell.jsx'
import { formatMoney, formatTransactionDate } from './transactionUtils.js'

// "Details" for one transaction
function TransactionDialog({ transaction, onClose }) {
  const rows = transaction
    ? [
        ['Type', transaction.type === 'topup' ? 'Wallet top up' : 'Purchase'],
        ['Amount', formatMoney(transaction.amount)],
        ['Paid with', transaction.method],
        ['Date', formatTransactionDate(transaction.date)],
        ['Reference', transaction.id.toUpperCase()],
      ]
    : []

  return (
    <DialogShell open={Boolean(transaction)} onClose={onClose} labelledBy="transaction-title">
      {transaction && (
        <>
          <h2 id="transaction-title" className="font-poppins text-[18px] leading-[28px]">
            {transaction.title}
          </h2>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[14px]">
            {rows.map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-muted">{label}</dt>
                <dd className="text-right">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              data-autofocus
              onClick={onClose}
              className="h-[32px] cursor-pointer rounded-[8px] px-4 text-[14px] outline-none hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-input-focus"
            >
              Close
            </button>
          </div>
        </>
      )}
    </DialogShell>
  )
}

export default TransactionDialog
