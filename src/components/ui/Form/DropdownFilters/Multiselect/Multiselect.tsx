import styles from './Multiselect.module.css'
import { BookItem } from '@/types/bookType'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { getFilterType } from '@/lib/filtering'
import { FilterType } from '@/types/filterType'
import { DEFAULT_FILTER_VALUES } from '@/lib/globals'

type MultiselectProps = {
  items: BookItem[]
  onChange: (filter: string, value: string) => void
  filter: string
}

export default function Multiselect({
  onChange,
  items,
  filter,
}: MultiselectProps) {
  const { filterValues, setFilterValues } = useFilterValuesContext()

  // get the length of the array if the filter is of type string[]
  const filterType = getFilterType(filter)
  const selectedItems =
    filterType === 'string[]'
      ? (filterValues[filter as keyof FilterType] as string[]).length
      : 0

  // Handle the item change
  function handleChange(filter: string, value: string) {
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
            (filterValues[filter as keyof FilterType] as string[]).includes(
              item.name
            ) || false

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
