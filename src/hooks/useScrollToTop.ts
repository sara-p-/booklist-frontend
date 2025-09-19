'use client'

import { useEffect, useState } from 'react'

export const useScrollToTop = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [theRef, setTheRef] = useState<HTMLDivElement | null>(null)

  const handleRef = (ref: HTMLDivElement) => {
    if (ref) {
      setTheRef(ref)
    }
  }

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    if (theRef) {
      const handleScroll = () => {
        setShowScrollToTop(theRef.scrollTop > 300)
      }

      theRef.addEventListener('scroll', handleScroll)
      return () => theRef.removeEventListener('scroll', handleScroll)
    }
  }, [theRef])

  return { showScrollToTop, handleRef, theRef }
}
