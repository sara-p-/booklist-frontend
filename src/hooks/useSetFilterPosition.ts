'use client'

import { useEffect, useState } from 'react'

export default function useSetFilterPosition(
  filterRef: React.RefObject<HTMLElement | null>
) {
  const [positionFromRight, setPositionFromRight] = useState<boolean>(false)

  /* FILTER CONTENT BOX POSITION */
  // If the filter is too close to the side of the screen, align it to the left instead of the right
  useEffect(() => {
    if (filterRef.current) {
      const tooCloseToRight =
        window.innerWidth - filterRef.current?.getBoundingClientRect().right <
        130
          ? true
          : false
      setPositionFromRight(tooCloseToRight)
      console.log('tooCloseToRight')
    }
  }, [filterRef])

  useEffect(() => {
    const handleResize = () => {
      console.log('handleResize')
      if (filterRef.current) {
        const tooCloseToRight =
          window.innerWidth - filterRef.current?.getBoundingClientRect().right <
          130
            ? true
            : false
        setPositionFromRight(tooCloseToRight)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return positionFromRight
}
