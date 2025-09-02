import styles from './Multiselect.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { getAllFilterItems, getFilterType } from '@/lib/filtering-utils'
import { FilterArrayType, FilterType } from '@/types/filterType'
import { DEFAULT_EXCLUDE_VALUES, DEFAULT_FILTER_VALUES } from '@/lib/globals'
import { useBookListContext } from '@/hooks/useBookListContext'
import useFilterStateContext from '@/hooks/useFilterStateContext'
import React, { useEffect, useState } from 'react'
import { useExcludeValuesContext } from '@/hooks/useExcludeValuesContext'

type MultiselectProps = {
  filter: FilterArrayType
}

function Multiselect({ filter }: MultiselectProps) {
  const { filterValues, setFilterValues } = useFilterValuesContext()
  const { bookList } = useBookListContext()
  const { filterState, setFilterState } = useFilterStateContext()
  const { excludeValues, setExcludeValues } = useExcludeValuesContext()
  const [exclude, setExclude] = useState(false)
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

    // change the filter state to close the filter when the user selected an item
    // set the filter state to false to close the filter
    setFilterState({
      ...filterState,
      [filter]: false,
    })
  }

  // Handle the 'exclude' button click
  function handleExclude() {
    const newExcludeValues = { ...excludeValues }
    const newFilterValues = { ...filterValues }
    if (!exclude) {
      // newExcludeValues[filter] = [...filterValues[filter]]
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
    setExclude(!exclude)
  }

  useEffect(() => {
    console.log(excludeValues.authors)
  }, [excludeValues])

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

  return (
    <>
      <div className={styles.selectionContainer}>
        {/* <p className={styles.selectionText}>{selectedItems} selected</p> */}
        <button
          className={styles.button}
          onClick={() => handleExclude()}
          disabled={selectedItems === 0}
        >
          {exclude ? 'include selected' : 'exclude selected'}
        </button>
        <button
          className={styles.button}
          onClick={handleClear}
          disabled={selectedItems === 0}
        >
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
