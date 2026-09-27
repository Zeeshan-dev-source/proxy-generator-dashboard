import dropdownBounds from '../../assets/admin/dropdown-bounds.svg'
import arrowDropDown from '../../assets/icons/arrow-drop-down.svg'

// 220x39 pill dropdown from the admin designs ("This week", "All Time")
function RangeSelect({ id, label, value, onChange, options, className = '' }) {
  return (
    <div className={`relative h-[39px] w-full max-w-[220px] ${className}`}>
      <img
        src={dropdownBounds}
        alt=""
        width="220"
        height="39"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="relative h-full w-full cursor-pointer appearance-none rounded-[20px] bg-transparent pr-10 pl-[20px] text-[16px] leading-[20px] font-medium tracking-[-0.3px] outline-none focus-visible:ring-2 focus-visible:ring-input-focus"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-surface">
            {option.label}
          </option>
        ))}
      </select>
      <img
        src={arrowDropDown}
        alt=""
        width="33"
        height="33"
        className="pointer-events-none absolute top-[3px] right-[3px]"
      />
    </div>
  )
}

export default RangeSelect
