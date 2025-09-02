'use client'

import { ExcludeValuesContext } from '@/contexts/ExcludeState/ExcludeValuesContext'
import { useContext } from 'react'

export const useExcludeValuesContext = () => {
  const context = useContext(ExcludeValuesContext)
  if (!context) {
    throw new Error(
      'useExcludeValuesContext must be used within a ExcludeValuesContextProvider'
    )
  }
  return context
}
