import { FilterArrayType } from '@/types/filterType'
import { useExcludeValuesContext } from '@/hooks/useExcludeValuesContext'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { DEFAULT_EXCLUDE_VALUES } from '@/lib/globals'

export default function useHandleExclude(
  filter: FilterArrayType,
  exclude: boolean
) {
  const { excludeValues, setExcludeValues } = useExcludeValuesContext()
  const { filterValues } = useFilterValuesContext()

  // When the exclude button on the MultiSelect is clicked:
  // If the exclude button is not selected, add the selected items to the excludeValues
  // If the exclude button is selected, remove the selected items from the excludeValues

  function handleExclude() {
    const newExcludeValues = { ...excludeValues }
    const newFilterValues = { ...filterValues }
    if (!exclude) {
      setExcludeValues({
        ...newExcludeValues,
        [filter]: newFilterValues[filter],
      })
    } else {
      setExcludeValues({
        ...newExcludeValues,
        [filter]: DEFAULT_EXCLUDE_VALUES[filter],
      })
    }
  }

  return { handleExclude }
}
