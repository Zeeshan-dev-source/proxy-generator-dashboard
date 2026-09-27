// Coloured 4x42 bar + big value + small caption, used in the admin summary cards
function SummaryStat({ bar, value, label, className = '' }) {
  return (
    <div className={`flex items-start ${className}`}>
      <img src={bar} alt="" width="4" height="42" />
      <div className="-mt-[1px] ml-[15px]">
        <p className="text-[22px] leading-[26px] font-bold">{value}</p>
        <p className="mt-[1px] text-[12px] leading-[14px] text-muted">{label}</p>
      </div>
    </div>
  )
}

// 998x79 card holding three stats at 21 / 283 / 553px, as on the order and users pages (widths set on the children)
export function SummaryCard({ children, className = '' }) {
  return (
    <div
      className={`flex flex-col gap-5 rounded-[15px] bg-surface p-5 shadow-card sm:flex-row sm:flex-wrap sm:items-center xl:h-[79px] xl:w-[998px] xl:flex-nowrap xl:gap-0 xl:py-0 xl:pl-[21px] sm:[&>*:not(:last-child)]:min-w-[160px] xl:[&>*:nth-child(1)]:w-[262px] xl:[&>*:nth-child(2)]:w-[270px] ${className}`}
    >
      {children}
    </div>
  )
}

export default SummaryStat
