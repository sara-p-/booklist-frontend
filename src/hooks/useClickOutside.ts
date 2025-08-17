import { useEffect } from 'react'

type UseClickOutsideProps = {
  callback: () => void
  elementRef: React.RefObject<HTMLElement | null>
}

export default function useClickOutside({
  callback,
  elementRef,
}: UseClickOutsideProps) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        elementRef?.current &&
        !elementRef?.current.contains(event.target as Node)
      ) {
        callback()
        // console.log(elementRef.current)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [callback, elementRef])
}
