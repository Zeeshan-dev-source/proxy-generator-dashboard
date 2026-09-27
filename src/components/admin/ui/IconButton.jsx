import tooltipTip from '../../../assets/admin/tooltip-tip.svg'

// 24px icon button with the dark tooltip from the design, shown on hover and keyboard focus
function IconButton({ icon, label, className = '', ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`group relative size-[24px] shrink-0 cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-input-focus ${className}`}
      {...props}
    >
      {/* Fade only the icon: opacity on the button itself would trap the tooltip under the sticky table header */}
      <img src={icon} alt="" width="24" height="24" className="transition-opacity group-hover:opacity-80" />
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%-1px)] left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] group-hover:flex group-focus-visible:flex"
      >
        <span className="min-w-[32px] rounded-[8px] border border-[#4a4a4a] bg-[#454545] px-[12px] py-[8px] text-center font-inter text-[12px] leading-[16px] font-medium whitespace-nowrap">
          {label}
        </span>
        <img src={tooltipTip} alt="" width="10" height="6" className="-mt-[1px] rotate-180" />
      </span>
    </button>
  )
}

export default IconButton
