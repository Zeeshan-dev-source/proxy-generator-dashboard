import arrowDropDown from '../../assets/icons/arrow-drop-down.svg'

// Dropdown styled like TextField; the first option acts as the placeholder
function SelectField({ id, label, placeholder, options, value, className = '', ...props }) {
  return (
    <div className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={value}
        className={`h-[69px] w-full cursor-pointer appearance-none rounded-[10px] border border-input-border bg-surface pr-[50px] pl-[35px] text-[16px] outline-none transition-colors focus:border-input-focus ${value ? 'text-input-text' : 'text-input-placeholder'}`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-cream">
            {option.label}
          </option>
        ))}
      </select>
      <img
        src={arrowDropDown}
        alt=""
        width="33"
        height="33"
        className="pointer-events-none absolute top-[22px] right-[9px]"
      />
    </div>
  )
}

export default SelectField
