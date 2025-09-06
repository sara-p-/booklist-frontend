'use client'

import { MobileFilterStateContext } from '@/contexts/MobileFilterState/MobileFilterStateContext'
import { useContext } from 'react'

export default function useMobileFilterStateContext() {
  const context = useContext(MobileFilterStateContext)
  if (!context) {
    throw new Error(
      'useMobileFilterStateContext must be used within a MobileFilterStateContextProvider'
    )
  }
  return context
}
