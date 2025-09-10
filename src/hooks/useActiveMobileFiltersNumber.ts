import { useEffect, useState } from 'react'
import { useFilterValuesContext } from './useFilterValuesContext'
import { POSSIBLE_ACTIVE_MOBILE_FILTERS } from '@/lib/globals'
import { FilterType } from '@/types/filterType'
import { DEFAULT_FILTER_VALUES } from '@/lib/globals'

export default function useActiveMobileFiltersNumber() {
  const { filterValues } = useFilterValuesContext()
  const [activeFilters, setActiveFilters] = useState(0)

  useEffect(() => {
    let currentActiveFilters = 0
    const currentValues = { ...filterValues }
    for (const filterName of POSSIBLE_ACTIVE_MOBILE_FILTERS) {
      if (
        currentValues[filterName as keyof FilterType] !==
        DEFAULT_FILTER_VALUES[filterName as keyof FilterType]
      ) {
        console.log(`${filterName} is not the default value`)
        currentActiveFilters += 1
      }
    }
    setActiveFilters(currentActiveFilters)
  }, [filterValues])

  return { activeFilters }
}
