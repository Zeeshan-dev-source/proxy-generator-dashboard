import { useCallback, useRef, useState } from 'react'
import Donut from '../dashboard/Donut.jsx'
import ScaleToFit from '../dashboard/ScaleToFit.jsx'
import PopupMenu from '../admin/ui/PopupMenu.jsx'
import useDismiss from '../../hooks/useDismiss.js'
import arrowIcon from '../../assets/user/arrow-drop-down.svg'
import bubbleBg from '../../assets/user/legend-bubble.svg'
import { offers } from '../../data/userData.js'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// "25 December 2023"
function expiryDate(daysLeft) {
  const d = new Date()
  d.setDate(d.getDate() + daysLeft)
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

const gb = (n) => `${Number(n.toFixed(1))}GB`

// 320x321 card: the selected plan's data usage (donut + legend bubble) and time left.
// "Change Plan" switches between the user's active plans. Narrow phones scale the card down.
function PlanUsageCard({ plan, plans, onChangePlan }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  useDismiss(ref, close, open)

  const icon = offers.find((o) => o.id === plan.id).icon
  const remaining = plan.totalGB - plan.usedGB
  // Clockwise from the top right, as in the design: used (light) then remaining
  const segments = [
    { label: 'Used', value: plan.usedGB, color: plan.light },
    { label: 'Remaining', value: remaining, color: plan.color },
  ]

  return (
    <ScaleToFit width={320} height={321} className="xl:w-[320px] xl:shrink-0">
      <section aria-label={`${plan.name} plan usage`} className="relative h-[321px] w-[320px] rounded-[15px] bg-surface shadow-card">
        <span className="absolute top-[16px] left-[16px] flex size-[26px] items-center justify-center">
          <img src={icon.src} alt="" width={icon.width} height={icon.height} className={icon.flip ? '-scale-x-100' : ''} />
        </span>
        <p className="absolute top-[17px] left-[48px] text-[16px] leading-[28px] font-bold" style={{ color: plan.color }}>
          {plan.name}
        </p>

        <div ref={ref} className="absolute top-[13px] left-[207px] z-10">
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex cursor-pointer items-start rounded-[6px] outline-none hover:brightness-125 focus-visible:ring-2 focus-visible:ring-input-focus"
          >
            <span className="mt-[2px] w-[71px] text-left text-[12px] leading-[28px] text-muted">Change Plan</span>
            <img src={arrowIcon} alt="" width="33" height="33" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <PopupMenu role="menu" aria-label="Your plans" className="top-[36px] right-0 min-w-[170px]">
              {plans.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={p.id === plan.id}
                  onClick={() => {
                    onChangePlan(p.id)
                    setOpen(false)
                  }}
                  className="flex cursor-pointer items-center gap-[10px] px-[16px] py-[8px] text-left text-[14px] hover:bg-white/5 aria-checked:font-bold"
                >
                  <span className="size-[10px] shrink-0 rounded-full" style={{ backgroundColor: p.color }} />
                  {p.name}
                  <span className="ml-auto pl-3 text-[12px] font-normal text-muted">{gb(p.totalGB)}</span>
                </button>
              ))}
            </PopupMenu>
          )}
        </div>

        {/* Hovering (or focusing) the donut shows the design's legend bubble, the only label */}
        <div
          tabIndex={0}
          role="img"
          aria-label={`${gb(remaining)} remaining, ${gb(plan.usedGB)} used of ${gb(plan.totalGB)}`}
          className="group absolute top-[57px] left-[63px] size-[181px] rounded-full outline-none focus-visible:ring-2 focus-visible:ring-input-focus"
        >
          <Donut segments={segments} size={181} plain />
          <p className="pointer-events-none absolute top-[77px] left-[60px] w-[63px] text-center text-[24px] leading-[28px] font-bold" style={{ color: plan.color }}>
            {gb(plan.totalGB)}
          </p>
          <div className="pointer-events-none absolute top-[6px] left-[75px] h-[64px] w-[140px] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
            <img src={bubbleBg} alt="" width="148" height="72" className="absolute top-0 left-[-4px] h-[72px] w-[148px] max-w-none" />
            <span className="absolute top-[12px] left-[12px] size-[10px]" style={{ backgroundColor: plan.color }} />
            <p className="absolute top-[3px] left-[32px] text-[12px] leading-[28px] whitespace-nowrap">{gb(remaining)} Remaining</p>
            <span className="absolute top-[32px] left-[12px] size-[10px]" style={{ backgroundColor: plan.light }} />
            <p className="absolute top-[24px] left-[32px] text-[12px] leading-[28px] whitespace-nowrap">{gb(plan.usedGB)} Used</p>
          </div>
        </div>

        <p className="absolute top-[264px] left-[23px] text-[16px] leading-[28px]">{plan.daysLeft} days remaining</p>
        <p className="absolute top-[284px] left-[23px] text-[12px] leading-[28px] text-muted">Expires {expiryDate(plan.daysLeft)}</p>
      </section>
    </ScaleToFit>
  )
}

export default PlanUsageCard
