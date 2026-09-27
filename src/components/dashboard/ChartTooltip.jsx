// Light bubble matching the design's chart tooltip; used by the donut charts
function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { name, value, payload: item } = payload[0]

  return (
    <div className="flex items-center gap-2 rounded-[10px] bg-[#f3f4ff] px-3 py-2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)]">
      <span className="size-[9px] shrink-0" style={{ backgroundColor: item.color }} />
      <p className="font-poppins text-[14px] leading-[18px] font-semibold whitespace-nowrap text-dot-active">
        {value} <span className="font-roboto text-[12px] font-normal text-muted">{name}</span>
      </p>
    </div>
  )
}

export default ChartTooltip
