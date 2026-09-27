import { Cell, Pie, PieChart, Sector, Tooltip } from 'recharts'
import ChartTooltip from './ChartTooltip.jsx'
import { donutShadow } from './chartTheme.js'

// Hovered slice grows by 3px
const renderActiveSlice = (props) => <Sector {...props} outerRadius={props.outerRadius + 3} />

// Donut from the dashboard designs (106px: radius 32–53). The first segment starts 27° clockwise from the top.
// plain: no built-in tooltip or growing slice, for cards that show their own hover label
function Donut({ segments, total, size = 106, totalClassName = 'text-[22px]', className = '', plain = false }) {
  return (
    <div className={`relative [&_svg]:overflow-visible ${className}`} style={{ width: size, height: size }}>
      <PieChart width={size} height={size} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={segments}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          innerRadius={(size * 32) / 106}
          outerRadius={size / 2}
          startAngle={63}
          endAngle={-297}
          stroke="none"
          activeShape={plain ? undefined : renderActiveSlice}
          style={{ filter: donutShadow, outline: 'none' }}
        >
          {segments.map((segment) => (
            <Cell key={segment.label} fill={segment.color} />
          ))}
        </Pie>
        {!plain && (
          <Tooltip
            content={<ChartTooltip />}
            allowEscapeViewBox={{ x: true, y: true }}
            wrapperStyle={{ zIndex: 20, outline: 'none' }}
            isAnimationActive={false}
          />
        )}
      </PieChart>
      {total != null && (
      <p
        className={`pointer-events-none absolute inset-x-0 top-[42px] text-center leading-[28px] font-bold ${totalClassName}`}
      >
        {total}
      </p>
      )}
    </div>
  )
}

export default Donut
