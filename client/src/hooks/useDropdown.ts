import { useState, useEffect } from 'react'

export default function useDropdown<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref])

  const toggle = () => setOpen(o => !o)
  const close = () => setOpen(false)

  return { open, toggle, close }
}