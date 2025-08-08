'use client'

import { FilterValuesContext } from '@/contexts/FilterValues/FilterValuesContext'
import { useContext } from 'react'

export const useFilterValuesContext = () => {
  const context = useContext(FilterValuesContext)
  if (!context) {
    throw new Error(
      'useFilterValuesContext must be used within a FilterValuesContextProvider'
    )
  }
  return context
}
