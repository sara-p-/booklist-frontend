'use client'

import { ThemeStateContext } from '@/contexts/ThemeState/ThemeStateContext'
import { useContext } from 'react'

export default function useThemeStateContext() {
  const context = useContext(ThemeStateContext)
  if (!context) {
    throw new Error(
      'useThemeStateContext must be used within a ThemeStateContextProvider'
    )
  }
  return context
}
