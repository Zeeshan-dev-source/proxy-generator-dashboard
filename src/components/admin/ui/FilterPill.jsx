import chevronActive from '../../../assets/admin/chevron-down-sm.svg'
import chevronIdle from '../../../assets/admin/chevron-right-sm.svg'

// 125x27 column pill from the design (narrower ones, e.g. Price, pass `width`).
// active: full border + cream chevron (flips for ascending) · open: popup shown, chevron up · idle: faded border
function FilterPill({ label, state = 'idle', dir = 'desc', align = 'left', width = 125, className = '', ...props }) {
  const isActive = state === 'active'
  const chevronRotation = isActive ? (dir === 'asc' ? '-rotate-90' : 'rotate-90') : state === 'open' ? '-rotate-90' : 'rotate-90'

  return (
    <button
      type="button"
      className={`relative flex h-[27px] shrink-0 cursor-pointer items-center outline-none focus-visible:ring-2 focus-visible:ring-input-focus rounded-[7px] ${className}`}
      style={{ width }}
      {...props}
    >
      <span
        className={`absolute inset-0 rounded-[7px] border border-[#eff0f6] bg-surface transition-opacity ${isActive ? '' : 'opacity-50'}`}
      />
      <span
        className={`relative text-[12px] font-semibold tracking-[0.02px] whitespace-nowrap ${
          align === 'center' ? 'flex-1 pr-[10px] text-center' : 'pl-[9px]'
        }`}
      >
        {label}
      </span>
      <span className="absolute top-[6px] right-[5.5px] flex size-[15px] items-center justify-center">
        {isActive ? (
          <img src={chevronActive} alt="" width="4.79" height="8.34" className={`transition-transform ${chevronRotation}`} />
        ) : (
          <img src={chevronIdle} alt="" width="15" height="15" className={`transition-transform ${chevronRotation}`} />
        )}
      </span>
    </button>
  )
}

export default FilterPill
