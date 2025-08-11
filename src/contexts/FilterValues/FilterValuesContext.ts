'use client'

import { createContext } from 'react'
import { FilterType } from '@/types/filterType'
import { DEFAULT_FILTER_VALUES } from '@/lib/globals'

export interface FilterValuesContextType {
  filterValues: FilterType
  setFilterValues: (filterValues: FilterType) => void
}

export const FilterValuesContext = createContext<FilterValuesContextType>({
  filterValues: DEFAULT_FILTER_VALUES,
  setFilterValues: () => {},
})
