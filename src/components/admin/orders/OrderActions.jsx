import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PopupMenu from '../ui/PopupMenu.jsx'
import useDismiss from '../../../hooks/useDismiss.js'
import menuIcon from '../../../assets/admin/menu.svg'
import sendIcon from '../../../assets/admin/send-fill.svg'
import { ORDER_STATUS } from '../../../data/ordersData.js'

// "Options" (menu) and "Resend invoice" buttons at the end of each order row
function OrderActions({ order, onMarkFulfilled, className = '' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const menuRef = useRef(null)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  useDismiss(menuRef, closeMenu, menuOpen)

  useEffect(() => {
    if (!sent) return undefined
    const timer = setTimeout(() => setSent(false), 2500)
    return () => clearTimeout(timer)
  }, [sent])

  const copyId = () => {
    navigator.clipboard?.writeText(order.id)
    setMenuOpen(false)
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div ref={menuRef} className="relative w-[80px]">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-[2px] text-[12px] leading-[28px] text-muted transition hover:text-cream"
          aria-haspopup="true"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <img src={menuIcon} alt="" width="24" height="24" />
          Options
        </button>
        {menuOpen && (
          <PopupMenu role="menu" className="top-[30px] right-[-60px] min-w-[180px]">
            <Link
              to={`/admin/orders/${order.id}`}
              role="menuitem"
              className="px-[16px] py-[8px] text-left text-[14px] tracking-[-0.154px] hover:bg-white/5"
            >
              View order
            </Link>
            {order.status !== ORDER_STATUS.fulfilled && (
              <button
                type="button"
                role="menuitem"
                className="cursor-pointer px-[16px] py-[8px] text-left text-[14px] tracking-[-0.154px] hover:bg-white/5"
                onClick={() => {
                  onMarkFulfilled(order.id)
                  setMenuOpen(false)
                }}
              >
                Mark as fulfilled
              </button>
            )}
            <button
              type="button"
              role="menuitem"
              className="cursor-pointer px-[16px] py-[8px] text-left text-[14px] tracking-[-0.154px] hover:bg-white/5"
              onClick={copyId}
            >
              Copy order ID
            </button>
          </PopupMenu>
        )}
      </div>

      <button
        type="button"
        className="flex cursor-pointer items-center text-left text-[12px] leading-[12px] text-muted transition hover:text-cream"
        onClick={() => setSent(true)}
        aria-live="polite"
      >
        <img src={sendIcon} alt="" width="24" height="24" className="shrink-0" />
        <span className={`w-[48px] ${sent ? 'text-primary' : ''}`}>{sent ? 'Invoice sent' : 'Resend invoice'}</span>
      </button>
    </div>
  )
}

export default OrderActions
