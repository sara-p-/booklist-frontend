'use client'

import { FilterType } from '@/types/filterType'
import { FilterValuesContext } from './FilterValuesContext'
import { useState } from 'react'

interface FilterValuesContextProviderProps {
  children: React.ReactNode
  newFilterValues: FilterType
}

export default function FilterValuesContextProvider({
  children,
  newFilterValues,
}: FilterValuesContextProviderProps) {
  const [filterValues, setFilterValues] = useState<FilterType>(newFilterValues)

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
