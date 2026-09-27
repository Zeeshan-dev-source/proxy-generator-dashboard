import DialogShell from '../admin/ui/DialogShell.jsx'
import PillButton from '../ui/PillButton.jsx'
import { formatMoney } from './transactionUtils.js'

// Confirms buying an offer for one day, paid from the wallet balance
function BuyOfferDialog({ offer, balance, onConfirm, onClose }) {
  const price = offer?.pricePerDay ?? 0
  const canAfford = balance >= price

  return (
    <DialogShell open={Boolean(offer)} onClose={onClose} labelledBy="buy-title" describedBy="buy-message">
      {offer && (
        <>
          <h2 id="buy-title" className="text-[20px] leading-[28px] font-bold">
            Buy {offer.title}?
          </h2>
          <p id="buy-message" className="mt-2 text-[14px] text-muted">
            {canAfford
              ? `${formatMoney(price)} for one day will be taken from your wallet (balance ${formatMoney(balance)}).`
              : `This costs ${formatMoney(price)} but your wallet only has ${formatMoney(balance)}. Top up first.`}
          </p>
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              data-autofocus
              onClick={onClose}
              className="h-[32px] cursor-pointer rounded-[8px] px-4 text-[14px] outline-none hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-input-focus"
            >
              Cancel
            </button>
            <PillButton variant="green" disabled={!canAfford} onClick={() => onConfirm(offer)} className="disabled:opacity-50">
              Buy for {formatMoney(price)}
            </PillButton>
          </div>
        </>
      )}
    </DialogShell>
  )
}

export default BuyOfferDialog
