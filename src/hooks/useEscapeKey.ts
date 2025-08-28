import { VisibleFilterType } from '@/types/filterType'
import { useEffect } from 'react'
import useFilterStateContext from './useFilterStateContext'

type UseEscapeKeyProps = {
  callback: () => void
  buttonText: VisibleFilterType
}

export default function useEscapeKey({
  callback,
  buttonText,
}: UseEscapeKeyProps) {
  const { filterState } = useFilterStateContext()
  useEffect(() => {
    if (!filterState[buttonText]) return
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [callback, filterState, buttonText])
}
