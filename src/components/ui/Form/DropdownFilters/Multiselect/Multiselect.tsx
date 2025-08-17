import styles from './Multiselect.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { getAllFilterItems, getFilterType } from '@/lib/filtering-utils'
import { FilterArrayType, FilterType } from '@/types/filterType'
import { DEFAULT_FILTER_VALUES } from '@/lib/globals'
import { useBookListContext } from '@/hooks/useBookListContext'

type MultiselectProps = {
  onChange: (filter: FilterArrayType, value: string) => void
  filter: FilterArrayType
}

export default function Multiselect({ onChange, filter }: MultiselectProps) {
  const { filterValues, setFilterValues } = useFilterValuesContext()
  const { bookList } = useBookListContext()
  const items = getAllFilterItems(bookList, filter)

  // get the length of the array if the filter is of type string[]
  const filterType = getFilterType(filter)
  const selectedItems =
    filterType === 'string[]' ? filterValues[filter].length : 0

  // Handle the item change
  function handleChange(filter: FilterArrayType, value: string) {
    onChange(filter, value)
  }

  // Handle the clear button click
  function handleClear() {
    const newFilterValues = { ...filterValues }
    const defaultFilterValues =
      DEFAULT_FILTER_VALUES[filter as keyof FilterType]
    setFilterValues({
      ...newFilterValues,
      [filter]: defaultFilterValues,
    })
  }

  return (
    <>
      <div className={styles.selectionContainer}>
        <p className={styles.selectionText}>{selectedItems} selected</p>
        <button className={styles.clearButton} onClick={handleClear}>
          clear
        </button>
      </div>
      <div className={styles.filterContainer}>
        {items.map((item) => {
          // If the filter is selected, add the class name styles.selected and checked={true}
          const isItemChecked =
            filterValues[filter].includes(item.name) || false

          return (
            <div className={styles.filterItem} key={item.id}>
              <label
                className={isItemChecked ? styles.selected : ''}
                htmlFor={item.slug}
              >
                <input
                  type='checkbox'
                  id={item.slug}
                  onChange={() => handleChange(filter, item.name)}
                  checked={isItemChecked}
                />
                {item.name}
              </label>
            </div>
          )
        })}
      </div>
    </>
  )
}
