'use client'

import { FilterType } from '@/types/filterType'
import {
  FilterValuesContext,
  FilterValuesContextType,
} from './FilterValuesContext'
import { useState } from 'react'

interface FilterValuesContextProviderProps {
  children: React.ReactNode
  filterValuesContext: FilterValuesContextType
}

export default function FilterValuesContextProvider({
  children,
  filterValuesContext,
}: FilterValuesContextProviderProps) {
  const [filterValues, setFilterValues] = useState<FilterType>(
    filterValuesContext.filterValues
  )

  const contextValue = {
    filterValues,
    setFilterValues,
  }

  return (
    <FilterValuesContext.Provider value={contextValue}>
      {children}
    </FilterValuesContext.Provider>
  )
}
