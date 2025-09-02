'use client'

import { ExcludeValuesType } from '@/types/filterType'
import { createContext } from 'react'

type ExcludeValuesContextType = {
  excludeValues: ExcludeValuesType
  setExcludeValues: (excludeValues: ExcludeValuesType) => void
}

export const ExcludeValuesContext = createContext<ExcludeValuesContextType>({
  excludeValues: {
    authors: [],
    series: [],
    genres: [],
    tropes: [],
    creatures: [],
    booktags: [],
  },
  setExcludeValues: (excludeValues: ExcludeValuesType) => {},
})
