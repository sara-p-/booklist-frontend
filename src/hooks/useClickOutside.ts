import { useContext, useEffect, useRef } from 'react'
import useFilterStateContext from './useFilterStateContext'
import { FilterArrayType } from '@/types/filterType'

type UseClickOutsideProps = {
  callback: () => void
  elementRef: React.RefObject<HTMLElement | null>
  buttonText: FilterArrayType | 'sort' | 'rating' | 'spice'
}

export default function useClickOutside({
  callback,
  elementRef,
  buttonText,
}: UseClickOutsideProps) {
  // const callbackRef = useRef(callback)

  // // Update the callback ref when callback changes
  // useEffect(() => {
  //   callbackRef.current = callback
  // }, [callback])
  const { filterState } = useFilterStateContext()

  useEffect(() => {
    if (!filterState[buttonText]) return
    // console.log('isOpen', filterState[buttonText])
    const handleClickOutside = (event: MouseEvent) => {
      if (
        elementRef?.current &&
        !elementRef?.current.contains(event.target as Node)
      ) {
        callback()
      }
    }

    // Try both mousedown and click events
    // document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('click', handleClickOutside)

    return () => {
      // document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [elementRef, filterState, buttonText]) // Remove callback from dependencies
}
// import { useEffect, useRef } from 'react'

// type UseClickOutsideProps = {
//   callback: () => void
//   elementRef: React.RefObject<HTMLElement | null>
//   isOpen: boolean
// }

// export default function useClickOutside({
//   callback,
//   elementRef,
// }: UseClickOutsideProps) {
//   const callbackRef = useRef(callback)

//   // Update the callback ref when callback changes
//   useEffect(() => {
//     callbackRef.current = callback
//   }, [callback])

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         elementRef?.current &&
//         !elementRef?.current.contains(event.target as Node)
//       ) {
//         callbackRef.current()
//       }
//     }

//     // Try both mousedown and click events
//     // document.addEventListener('mousedown', handleClickOutside)
//     document.addEventListener('click', handleClickOutside)

//     return () => {
//       // document.removeEventListener('mousedown', handleClickOutside)
//       document.removeEventListener('click', handleClickOutside)
//     }
//   }, [elementRef]) // Remove callback from dependencies
// }
