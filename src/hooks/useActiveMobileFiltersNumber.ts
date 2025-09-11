'use client'

import { useEffect, useState } from 'react'
import { useFilterValuesContext } from './useFilterValuesContext'
import {
  POSSIBLE_ACTIVE_MOBILE_FILTERS,
  DEFAULT_FILTER_VALUES,
} from '@/lib/globals'
import { FilterType } from '@/types/filterType'

export default function useActiveMobileFiltersNumber() {
  const { filterValues } = useFilterValuesContext()
  const [activeFilters, setActiveFilters] = useState(0)
  // Compare the current filter values to the default filter values
  // If they are not the same, increment the active filters count
  useEffect(() => {
    let currentActiveFilters = 0
    for (const filterName of POSSIBLE_ACTIVE_MOBILE_FILTERS) {
      const currentValue = JSON.stringify(
        filterValues[filterName as keyof FilterType]
      )
      const defaultValue = JSON.stringify(
        DEFAULT_FILTER_VALUES[filterName as keyof FilterType]
      )
      if (currentValue !== defaultValue) {
        currentActiveFilters++
      }
    }
    setActiveFilters(currentActiveFilters)
  }, [filterValues])

  return { activeFilters }
}
