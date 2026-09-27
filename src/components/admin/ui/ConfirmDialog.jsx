import DialogShell from './DialogShell.jsx'
import PillButton from '../../ui/PillButton.jsx'

// Confirmation for destructive actions (deleting a user or a product)
function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', onConfirm, onCancel }) {
  return (
    <DialogShell open={open} onClose={onCancel} role="alertdialog" labelledBy="confirm-title" describedBy="confirm-message">
      <h2 id="confirm-title" className="text-[20px] leading-[28px] font-bold">
        {title}
      </h2>
      <p id="confirm-message" className="mt-2 text-[14px] text-muted">
        {message}
      </p>
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        {/* Cancel gets focus first so Enter doesn't delete by accident */}
        <button
          type="button"
          data-autofocus
          onClick={onCancel}
          className="h-[32px] cursor-pointer rounded-[8px] px-4 text-[14px] outline-none hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-input-focus"
        >
          Cancel
        </button>
        <PillButton variant="pink-sm" onClick={onConfirm}>
          {confirmLabel}
        </PillButton>
      </div>
    </DialogShell>
  )
}

export default ConfirmDialog
