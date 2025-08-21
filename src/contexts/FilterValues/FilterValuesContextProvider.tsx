'use client'

import { FilterType } from '@/types/filterType'
import { FilterValuesContext } from './FilterValuesContext'
import { useMemo, useState } from 'react'

interface FilterValuesContextProviderProps {
  children: React.ReactNode
  newFilterValues: FilterType
}

export default function FilterValuesContextProvider({
  children,
  newFilterValues,
}: FilterValuesContextProviderProps) {
  const [filterValues, setFilterValues] = useState<FilterType>(newFilterValues)

  const contextValue = useMemo(() => {
    return {
      filterValues,
      setFilterValues,
    }
  }, [filterValues])

  return (
    <FilterValuesContext.Provider value={contextValue}>
      {children}
    </FilterValuesContext.Provider>
  )
}
