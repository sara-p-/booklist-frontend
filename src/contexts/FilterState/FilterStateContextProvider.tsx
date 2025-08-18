'use client'
import { FilterStateType } from '@/types/filterType'
import { FilterStateContext } from './FilterStateContext'
import { useState } from 'react'

export default function FilterStateContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [filterState, setFilterState] = useState<FilterStateType>({
    sort: false,
    authors: false,
    series: false,
    genres: false,
    tropes: false,
    creatures: false,
    booktags: false,
    rating: false,
    spice: false,
  })
  return (
    <FilterStateContext.Provider value={{ filterState, setFilterState }}>
      {children}
    </FilterStateContext.Provider>
  )
}
