'use client'

import { FilterStateType } from '@/types/filterType'
import { createContext } from 'react'

type FilterStateContextType = {
  filterState: FilterStateType
  setFilterState: (filterState: FilterStateType) => void
}

export const FilterStateContext = createContext<FilterStateContextType>({
  filterState: {
    sort: false,
    authors: false,
    series: false,
    genres: false,
    tropes: false,
    creatures: false,
    booktags: false,
    rating: false,
    spice: false,
  },
  setFilterState: () => {},
})
