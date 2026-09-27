import { useCallback, useRef, useState } from 'react'
import IconButton from '../ui/IconButton.jsx'
import PopupMenu from '../ui/PopupMenu.jsx'
import useDismiss from '../../../hooks/useDismiss.js'
import menuIcon from '../../../assets/admin/menu.svg'

const menuItemClass = 'cursor-pointer px-[16px] py-[8px] text-left text-[14px] tracking-[-0.154px] hover:bg-white/5'

// Row "Options" button with Edit / Delete
function ProductActions({ product, onEdit, onDelete }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  useDismiss(ref, close, open)

  const run = (action) => {
    setOpen(false)
    action(product)
  }

  return (
    <div ref={ref} className="relative">
      <IconButton icon={menuIcon} label="Options" aria-haspopup="true" aria-expanded={open} onClick={() => setOpen((o) => !o)} />
      {open && (
        <PopupMenu role="menu" className="top-[30px] right-0 min-w-[170px]">
          <button type="button" role="menuitem" className={menuItemClass} onClick={() => run(onEdit)}>
            Edit product
          </button>
          <button type="button" role="menuitem" className={`${menuItemClass} text-residential`} onClick={() => run(onDelete)}>
            Delete product
          </button>
        </PopupMenu>
      )}
    </div>
  )
}

export default ProductActions
