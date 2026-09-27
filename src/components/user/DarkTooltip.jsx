import tooltipBg from '../../assets/user/tooltip-dark.svg'

// 94x64 dark tooltip from the user designs: value on top, month underneath.
// The parent positions it; the background image carries a 4px shadow margin on each side.
function DarkTooltip({ value, label }) {
  return (
    <>
      <img src={tooltipBg} alt="" width="102" height="72.5" className="absolute top-0 left-[-4px] h-[72.5px] w-[102px] max-w-none" />
      <p className="absolute inset-x-0 top-[6.66px] text-center font-poppins text-[14.152px] font-semibold tracking-[0.0885px] text-input-border">
        {value}
      </p>
      <p className="absolute inset-x-0 top-[29.66px] text-center font-poppins text-[12.383px] font-light tracking-[0.0885px] text-[#696974]">
        {label}
      </p>
    </>
  )
}

export default DarkTooltip
