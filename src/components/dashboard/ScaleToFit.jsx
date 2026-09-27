import { useLayoutEffect, useRef, useState } from 'react'

// Shrinks a fixed-size design block (e.g. the 402x220 chart) to fit narrower containers instead of scrolling
function ScaleToFit({ width, height, className = '', children }) {
  const ref = useRef(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const observer = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / width)))
    observer.observe(el)
    return () => observer.disconnect()
  }, [width])

  return (
    <div ref={ref} className={`w-full ${className}`} style={{ height: height * scale }}>
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left' }}>{children}</div>
    </div>
  )
}

export default ScaleToFit
