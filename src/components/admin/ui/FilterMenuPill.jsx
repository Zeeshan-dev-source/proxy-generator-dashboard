import { useCallback, useRef, useState } from 'react'
import FilterPill from './FilterPill.jsx'
import PopupMenu from './PopupMenu.jsx'
import useDismiss from '../../../hooks/useDismiss.js'
import radioIcon from '../../../assets/admin/radio.svg'
import radioDot from '../../../assets/admin/radio-dot.svg'

// Column pill that opens the radio list popup from the design ("Order", "Role Status")
function FilterMenuPill({ label, options, value, onChange, align = 'left', menuLabel = label, popupClassName = 'top-[25px] left-[-72px]' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  useDismiss(ref, close, open)

  return (
    <div ref={ref} className="relative">
      <FilterPill
        label={label}
        align={align}
        state={open ? 'open' : 'idle'}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      />
      {open && (
        <PopupMenu role="radiogroup" aria-label={menuLabel} className={popupClassName}>
          {options.map((option) => {
            const checked = value === option.value
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={checked}
                className="flex cursor-pointer items-start gap-[8px] px-[16px] py-[8px] text-left transition-colors hover:bg-white/5"
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
              >
                <span className="relative size-[20px] shrink-0">
                  <img src={radioIcon} alt="" width="20" height="20" className="absolute inset-0" />
                  {checked && <img src={radioDot} alt="" width="12" height="12" className="absolute top-[4px] left-[4px]" />}
                </span>
                <span className="text-[14px] tracking-[-0.154px] whitespace-nowrap">{option.label}</span>
              </button>
            )
          })}
        </PopupMenu>
      )}
    </div>
  )
}

export default FilterMenuPill
