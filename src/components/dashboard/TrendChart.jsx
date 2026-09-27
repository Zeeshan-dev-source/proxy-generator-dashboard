import { useState } from 'react'
import { Bar, ComposedChart, Line, ReferenceDot, ReferenceLine, XAxis, YAxis } from 'recharts'
import { chartColors } from './chartTheme.js'

const WIDTH = 402

// Value on the curve at a given x (straight-line interpolation between trend points)
function valueAt(trend, x) {
  const i = trend.findIndex((p) => p.x >= x)
  if (i <= 0) return trend[Math.max(i, 0)].value
  const a = trend[i - 1]
  const b = trend[i]
  return a.value + ((x - a.x) / (b.x - a.x)) * (b.value - a.value)
}

// 4px bar with 2px rounded ends, centred on the month (numeric axes give bars no width of their own)
function MonthBar({ x, width, y, height }) {
  if (!height) return null
  const r = Math.min(2, height / 2)
  return <rect x={x + width / 2 - 2} y={y} width={4} height={height} rx={r} ry={r} fill={chartColors.bar} />
}

function MonthTick({ x, payload, labels, labelY }) {
  return (
    <text x={x} y={labelY} textAnchor="middle" dominantBaseline="central" fill={chartColors.label} fontSize={12.383} letterSpacing={0.0885}>
      {labels[payload.value]}
    </text>
  )
}

/**
 * 402px-wide month chart from the dashboards: a smooth trend line, optional 4px bars per month,
 * a dot on the selected month and a tooltip drawn by `renderTooltip(month)`.
 * Hover or the arrow keys change the month. The scales map exactly onto the Figma geometry:
 * - trend: [{ x, value }], months: [{ x, month, bar? }] with x in plot pixels
 * - maxValue / maxBar: values at the top of the plot (bars and gridlines end `plotHeight` from the top)
 * - defaultMonth: selected month on load, or null for none (with resetOnLeave the selection clears again)
 * - tooltip: { width, height, offset } where offset is the distance from the tooltip's top to the dot
 */
function TrendChart({
  months,
  trend,
  maxValue,
  maxBar,
  defaultMonth = 0,
  resetOnLeave = false,
  height = 220,
  plotHeight = 182,
  labelY = 202.3,
  tooltip = { width: 94, height: 64, offset: 78.4 },
  renderTooltip,
  label,
  className = '',
}) {
  const [activeIndex, setActiveIndex] = useState(defaultMonth)
  const active = activeIndex == null ? null : months[activeIndex]
  const dotValue = active ? valueAt(trend, active.x) : 0
  const dotY = plotHeight - (dotValue / maxValue) * plotHeight
  const labels = Object.fromEntries(months.map((m) => [m.x, m.month]))
  const hasBars = months.some((m) => m.bar != null)

  const nearestMonth = (x) =>
    months.reduce((best, m, i) => (Math.abs(m.x - x) < Math.abs(months[best].x - x) ? i : best), 0)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    // rect is in screen pixels; the chart may be scaled down (ScaleToFit), so convert back to plot pixels
    setActiveIndex(nearestMonth(((e.clientX - rect.left) * WIDTH) / rect.width))
  }

  const handleKeyDown = (e) => {
    const last = months.length - 1
    if (e.key === 'ArrowLeft') setActiveIndex((i) => Math.max(0, (i ?? 1) - 1))
    if (e.key === 'ArrowRight') setActiveIndex((i) => Math.min(last, (i ?? -1) + 1))
  }

  const clear = resetOnLeave ? () => setActiveIndex(defaultMonth) : undefined

  return (
    <div
      className={`relative w-[402px] outline-none focus-visible:ring-2 focus-visible:ring-input-focus [&_svg]:overflow-visible ${className}`}
      style={{ height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={clear}
      onBlur={clear}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="group"
      aria-label={`${label}. Use the arrow keys to change month.`}
    >
      <ComposedChart width={WIDTH} height={height} data={months} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <XAxis
          type="number"
          dataKey="x"
          domain={[0, WIDTH]}
          ticks={months.map((m) => m.x)}
          interval={0}
          tick={<MonthTick labels={labels} labelY={labelY} />}
          axisLine={false}
          tickLine={false}
          height={height - plotHeight}
          allowDataOverflow
        />
        <YAxis yAxisId="value" type="number" domain={[0, maxValue]} hide allowDataOverflow />
        {hasBars && <YAxis yAxisId="bar" type="number" domain={[0, maxBar]} hide allowDataOverflow />}

        {months.map((m) => (
          <ReferenceLine key={m.month} x={m.x} yAxisId="value" stroke={chartColors.gridline} strokeWidth={1.02} />
        ))}

        {hasBars && <Bar yAxisId="bar" dataKey="bar" shape={<MonthBar />} isAnimationActive={false} />}
        <Line
          yAxisId="value"
          data={trend}
          dataKey="value"
          type="monotone"
          stroke={chartColors.line}
          strokeWidth={2.65}
          strokeLinecap="round"
          strokeLinejoin="round"
          dot={false}
          activeDot={false}
        />

        {active && (
          <ReferenceDot
            yAxisId="value"
            x={active.x}
            y={dotValue}
            r={6.2}
            fill={chartColors.line}
            stroke={chartColors.surface}
            strokeWidth={1.77}
            style={{ filter: 'drop-shadow(0px 1.77px 1.77px rgba(68, 68, 79, 0.15))' }}
          />
        )}
      </ComposedChart>

      {active && (
        <div
          className="pointer-events-none absolute overflow-hidden transition-[left,top] duration-200 ease-out"
          // Centred on the month, but kept from sticking out more than 20px past the right edge (June)
          style={{
            width: tooltip.width,
            height: tooltip.height,
            left: Math.max(-20, Math.min(active.x - tooltip.width / 2 - 0.5, WIDTH - tooltip.width + 20)),
            top: dotY - tooltip.offset,
          }}
          role="status"
        >
          {renderTooltip(active)}
        </div>
      )}
    </div>
  )
}

export default TrendChart
