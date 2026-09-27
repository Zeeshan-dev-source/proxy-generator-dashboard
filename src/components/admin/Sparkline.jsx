import { useId } from 'react'
import { Area, ComposedChart, Line, XAxis, YAxis } from 'recharts'
import { sparklineTrend } from '../../data/adminData.js'

const WIDTH = 51.65
const HEIGHT = 13.75

// Figma draws the soft fill 1.37px below the line
const data = sparklineTrend.map((point) => ({ ...point, fill: point.value - 1.37 }))

// Tiny trend line with the design's blue→green gradient stroke and faint blue fill
function Sparkline({ className = '' }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')

  return (
    <ComposedChart
      width={WIDTH}
      height={HEIGHT}
      data={data}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-fill`} x1="9.97" y1="8.1" x2="9.97" y2="13.75" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0062ff" />
          <stop offset="1" stopColor="white" stopOpacity="0.01" />
        </linearGradient>
        <linearGradient id={`${id}-stroke`} x1="8.75" y1="9.31" x2="13.25" y2="-8.46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6461fc" />
          <stop offset="0.46" stopColor="#16c3f9" />
          <stop offset="1" stopColor="#00b795" />
        </linearGradient>
      </defs>
      <XAxis type="number" dataKey="x" domain={[0, WIDTH]} hide />
      <YAxis type="number" domain={[0, HEIGHT]} hide />
      <Area
        type="monotone"
        dataKey="fill"
        stroke="none"
        fill={`url(#${id}-fill)`}
        fillOpacity={0.1}
        baseValue={0}
        isAnimationActive={false}
      />
      <Line
        type="monotone"
        dataKey="value"
        stroke={`url(#${id}-stroke)`}
        strokeWidth={2}
        strokeLinecap="round"
        dot={false}
        activeDot={false}
        isAnimationActive={false}
      />
    </ComposedChart>
  )
}

export default Sparkline
