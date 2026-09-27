import { useEffect } from 'react'

// Calls onDismiss when the user clicks outside `ref` or presses Escape, while `active` is true
function useDismiss(ref, onDismiss, active = true) {
  useEffect(() => {
    if (!active) return undefined

    const handlePointer = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onDismiss()
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') onDismiss()
    }

    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [ref, onDismiss, active])
}

export default useDismiss
