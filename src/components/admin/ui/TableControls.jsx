import searchIcon from '../../../assets/admin/search.svg'
import sortArrows from '../../../assets/admin/sort-arrows.svg'
import checkRing from '../../../assets/admin/check-ring.svg'
import checkFill from '../../../assets/admin/check-fill.svg'

// Small building blocks shared by the desktop table and the mobile list

export function SortButton({ label, className = '', ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`relative flex h-[10px] w-[5px] shrink-0 cursor-pointer before:absolute before:-inset-2 before:content-[''] ${className}`}
      {...props}
    >
      <img src={sortArrows} alt="" width="5" height="10" />
    </button>
  )
}

export function SearchField({ value, onChange, className = '' }) {
  return (
    <label className={`flex items-center gap-[8px] ${className}`}>
      <img src={searchIcon} alt="" width="24" height="24" className="shrink-0" />
      <span className="sr-only">Search orders</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        className="w-full min-w-0 bg-transparent text-[14px] font-medium tracking-[-0.154px] outline-none placeholder:text-cream focus:placeholder:text-muted"
      />
    </label>
  )
}

export function SelectCheck({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      className="size-[24px] shrink-0 cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-input-focus"
      onClick={onChange}
    >
      <img src={checked ? checkFill : checkRing} alt="" width="24" height="24" />
    </button>
  )
}
