import styles from './Multiselect.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { getAllFilterItems, getFilterType } from '@/lib/filtering-utils'
import { FilterArrayType, FilterType } from '@/types/filterType'
import { DEFAULT_FILTER_VALUES } from '@/lib/globals'
import { useBookListContext } from '@/hooks/useBookListContext'
import useFilterStateContext from '@/hooks/useFilterStateContext'
import React from 'react'

type MultiselectProps = {
  filter: FilterArrayType
}

function Multiselect({ filter }: MultiselectProps) {
  const { filterValues, setFilterValues } = useFilterValuesContext()
  const { bookList } = useBookListContext()
  const { filterState, setFilterState } = useFilterStateContext()
  const items = getAllFilterItems(bookList, filter)

  // get the length of the array if the filter is of type string[]
  const filterType = getFilterType(filter)
  const selectedItems =
    filterType === 'string[]' ? filterValues[filter].length : 0

  // Handle the item change
  function handleMultiselectChange(filter: FilterArrayType, value: string) {
    const newFilterValues = { ...filterValues }
    const filterValue = newFilterValues[filter]

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

  // Handle the clear button click
  function handleClear() {
    const newFilterValues = { ...filterValues }
    const defaultFilterValues =
      DEFAULT_FILTER_VALUES[filter as keyof FilterType]
    setFilterValues({
      ...newFilterValues,
      [filter]: defaultFilterValues,
    })
    setFilterState({
      ...filterState,
      [filter]: false,
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
                  onChange={() => handleMultiselectChange(filter, item.name)}
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

export default React.memo(Multiselect)
