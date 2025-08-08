'use client'

import { createContext } from 'react'
import { FilterType } from '@/types/filterType'

export interface FilterValuesContextType {
  filterValues: FilterType
  setFilterValues: (filterValues: FilterType) => void
}

export const FilterValuesContext = createContext<FilterValuesContextType>({
  filterValues: {
    sort: 'series',
    order: 'desc',
    authors: [],
    series: [],
    genres: [],
    tropes: [],
    creatures: [],
    booktags: [],
    rating: [],
    spice: [],
    completed: true,
    search: '',
  },
  setFilterValues: () => {},
})
