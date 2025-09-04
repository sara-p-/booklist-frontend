'use client'

import { FilterArrayType } from '@/types/filterType'
import { useExcludeValuesContext } from './useExcludeValuesContext'
import { useFilterValuesContext } from './useFilterValuesContext'

export default function useHandleMultiSelectChange() {
  const { filterValues, setFilterValues } = useFilterValuesContext()
  const { excludeValues, setExcludeValues } = useExcludeValuesContext()

  // When the user selects an item from the MultiSelect, add the new value to the filterValues or excludeValues
  // depending on the value of the exclude button
  function handleMultiselectChange(
    filter: FilterArrayType,
    value: string,
    exclude: boolean
  ) {
    const newFilterValues = { ...filterValues }
    const newExcludeValues = { ...excludeValues }
    const filterValue = newFilterValues[filter]

    // if the 'exclude' button is selected, add the new value to excludeValues:
    if (exclude) {
      if (newExcludeValues[filter].includes(value)) {
        setExcludeValues({
          ...newExcludeValues,
          [filter]: newExcludeValues[filter].filter((item) => item !== value),
        })
      } else {
        setExcludeValues({
          ...newExcludeValues,
          [filter]: [...newExcludeValues[filter], value],
        })
      }
    }
    // If the 'exclude' button is NOT selected, add the new value to filterValues:
    if (filterValue.includes(value)) {
      setFilterValues({
        ...newFilterValues,
        [filter]: filterValue.filter((item) => item !== value),
      })
    } else {
      setFilterValues({
        ...newFilterValues,
        [filter]: [...filterValue, value],
      })
    }
  }

  return { handleMultiselectChange }
}
