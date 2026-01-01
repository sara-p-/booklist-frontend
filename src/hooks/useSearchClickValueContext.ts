'use client'

import { SearchClickValueContext } from '@/contexts/SearchClickValue/SearchClickValueContext'
import { useContext } from 'react'

export const useSearchClickValueContext = () => {
  const context = useContext(SearchClickValueContext)
  if (!context) {
    throw new Error(
      'useSearchClickValueContext must be used within a SearchClickValueContextProvider'
    )
  }
  return context
}
