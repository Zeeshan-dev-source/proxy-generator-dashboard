import { useCallback, useEffect, useState } from 'react'

// Short-lived "done" state for feedback like "Saved" or "Invoice sent"
function useFlash(duration = 2000) {
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (!on) return undefined
    const timer = setTimeout(() => setOn(false), duration)
    return () => clearTimeout(timer)
  }, [on, duration])

  const flash = useCallback(() => setOn(true), [])
  return [on, flash]
}

export default useFlash
