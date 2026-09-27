import { useCallback, useRef, useState } from 'react'
import IconButton from '../ui/IconButton.jsx'
import PopupMenu from '../ui/PopupMenu.jsx'
import useDismiss from '../../../hooks/useDismiss.js'
import searchIcon from '../../../assets/admin/search.svg'

// The design only has the search icon in the header; clicking it opens a small search box
function ProductSearch({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  useDismiss(ref, close, open)

  return (
    <div ref={ref} className="relative">
      <IconButton
        icon={searchIcon}
        label={value ? `Search: ${value}` : 'Search'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={value ? 'ring-2 ring-primary/60' : ''}
      />
      {open && (
        <PopupMenu className="top-[30px] right-0 w-[240px] px-3">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <input
            id="product-search"
            type="search"
            autoFocus
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setOpen(false)}
            placeholder="Search products"
            className="h-[34px] w-full rounded-[7px] border border-[#eff0f6]/50 bg-surface px-3 text-[14px] outline-none placeholder:text-muted focus:border-input-focus"
          />
        </PopupMenu>
      )}
    </div>
  )
}

export default ProductSearch
