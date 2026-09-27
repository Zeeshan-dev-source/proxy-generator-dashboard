import { useEffect, useRef } from 'react'

// Dark modal panel in the dashboard style: closes on Escape / backdrop click and focuses the first field
function DialogShell({ open, onClose, labelledBy, describedBy, role = 'dialog', className = 'max-w-[380px]', children }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    panelRef.current?.querySelector('input, select, button[data-autofocus], button')?.focus()
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onMouseDown={onClose}>
      <div
        ref={panelRef}
        role={role}
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        className={`max-h-[calc(100vh-2rem)] w-full animate-fade-in overflow-y-auto rounded-[15px] bg-surface p-6 shadow-cta ${className}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default DialogShell
