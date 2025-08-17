'use client'

import { FilterStateContext } from '@/contexts/FilterState/FilterStateContext'
import { useContext } from 'react'

export default function useFilterStateContext() {
  const context = useContext(FilterStateContext)
  if (!context) {
    throw new Error(
      'useFilterStateContext must be used within a FilterStateContextProvider'
    )
  }
  return context
}
