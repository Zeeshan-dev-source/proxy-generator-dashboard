import { useState } from 'react'
import DashboardCard from '../dashboard/DashboardCard.jsx'
import ScaleToFit from '../dashboard/ScaleToFit.jsx'
import DarkTooltip from './DarkTooltip.jsx'
import { topUpsChart } from '../../data/userData.js'

const CARD_WIDTH = 432
const CARD_HEIGHT = 255
const BAR_BOTTOM = 215
const BAR_HEIGHT = 177
const PITCH = 29

// 432x255 bar chart of top ups per month. Hovering (or focusing) a month shows its tooltip;
// leaving the chart goes back to December as in the design. Narrow screens scale the card down.
function TopUpsChartCard({ className = '' }) {
  const { months, ticks, max, defaultMonth } = topUpsChart
  const [activeIndex, setActiveIndex] = useState(defaultMonth)
  const active = months[activeIndex]
  const barHeight = (m) => (m.amount / max) * BAR_HEIGHT

  return (
    <DashboardCard title="Top Ups Per Month" className={className} cardClassName="mt-[16px] bg-transparent! shadow-none!">
      <ScaleToFit width={CARD_WIDTH} height={CARD_HEIGHT} className="max-w-[432px]">
        <div
          className="relative h-[255px] w-[432px] rounded-[15px] bg-surface shadow-card"
          onMouseLeave={() => setActiveIndex(defaultMonth)}
        >
          {ticks.map((t) => (
            <p
              key={t.label}
              className="absolute right-[380px] font-inter text-[9.746px] leading-[12.612px] font-semibold opacity-50"
              style={{ top: t.top }}
            >
              {t.label}
            </p>
          ))}

          <ul aria-label="Top ups per month">
            {months.map((m, i) => (
              <li key={m.short}>
                {/* Track, then the filled part from the bottom */}
                <span className="absolute rounded-full bg-cream/15" style={{ left: m.x, width: m.width, top: BAR_BOTTOM - BAR_HEIGHT, height: BAR_HEIGHT }} />
                <span className="absolute rounded-full bg-cream" style={{ left: m.x, width: m.width, top: BAR_BOTTOM - barHeight(m), height: barHeight(m) }} />
                <span className="absolute top-[220px] w-[24px] -translate-x-1/2 text-center text-[7px] font-medium text-[#e1e1e1]" style={{ left: m.labelX }}>
                  {m.short}
                </span>
                {/* Invisible hit area over the whole column */}
                <button
                  type="button"
                  aria-label={`${m.name}: $${m.amount}`}
                  aria-pressed={i === activeIndex}
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  className="absolute top-[30px] bottom-[20px] cursor-pointer rounded-[4px] focus-visible:outline-2 focus-visible:outline-input-focus"
                  style={{ left: m.x + m.width / 2 - PITCH / 2, width: PITCH }}
                />
              </li>
            ))}
          </ul>

          {/* Sits above the bar, but never higher than the design's December position */}
          <div
            className="pointer-events-none absolute h-[64px] w-[94px] transition-[left,top] duration-200"
            style={{ left: active.x + active.width / 2 - 48.5, top: Math.max(21, BAR_BOTTOM - barHeight(active) - 70) }}
            aria-hidden="true"
          >
            <DarkTooltip value={`$${active.amount}`} label={active.name} />
          </div>
        </div>
      </ScaleToFit>
    </DashboardCard>
  )
}

export default TopUpsChartCard
