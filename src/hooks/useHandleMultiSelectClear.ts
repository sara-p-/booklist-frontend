import { DEFAULT_EXCLUDE_VALUES, DEFAULT_FILTER_VALUES } from '@/lib/globals'
import { FilterArrayType, FilterType } from '@/types/filterType'
import { useFilterValuesContext } from './useFilterValuesContext'
import useFilterStateContext from './useFilterStateContext'
import { useExcludeValuesContext } from './useExcludeValuesContext'

export default function useHandleMultiSelectClear(filter: FilterArrayType) {
  const { filterValues, setFilterValues } = useFilterValuesContext()
  const { filterState, setFilterState } = useFilterStateContext()
  const { excludeValues, setExcludeValues } = useExcludeValuesContext()
  // Handle the clear button click
  function handleClear() {
    const defaultFilterValues =
      DEFAULT_FILTER_VALUES[filter as keyof FilterType]
    // set the filter values to the default values
    setFilterValues({
      ...filterValues,
      [filter]: defaultFilterValues,
    })
    // set the filter state to false to close the filter
    setFilterState({
      ...filterState,
      [filter]: false,
    })
    // set the exclude values to the default values
    setExcludeValues({
      ...excludeValues,
      [filter]: DEFAULT_EXCLUDE_VALUES[filter],
    })
  }

  return { handleClear }
}
