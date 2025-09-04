import styles from './Multiselect.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { getAllFilterItems, getFilterType } from '@/lib/filtering-utils'
import { FilterArrayType, FilterType } from '@/types/filterType'
import { DEFAULT_EXCLUDE_VALUES, DEFAULT_FILTER_VALUES } from '@/lib/globals'
import { useBookListContext } from '@/hooks/useBookListContext'
import useFilterStateContext from '@/hooks/useFilterStateContext'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useExcludeValuesContext } from '@/hooks/useExcludeValuesContext'
import useHandleMultiSelectClear from '@/hooks/useHandleMultiSelectClear'

type MultiselectProps = {
  filter: FilterArrayType
}

function Multiselect({ filter }: MultiselectProps) {
  const { filterValues, setFilterValues } = useFilterValuesContext()
  const { bookList } = useBookListContext()
  const { filterState, setFilterState } = useFilterStateContext()
  const { excludeValues, setExcludeValues } = useExcludeValuesContext()
  const [exclude, setExclude] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const items = getAllFilterItems(bookList, filter)
  const { handleClear } = useHandleMultiSelectClear(filter)

  // get the length of the array if the filter is of type string[]
  const filterType = getFilterType(filter)
  const selectedItems =
    filterType === 'string[]' ? filterValues[filter].length : 0

  // Handle the item change
  function handleMultiselectChange(filter: FilterArrayType, value: string) {
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

  // Handle the clear button click
  function handleTheClearButton() {
    // call the function from the custom hook
    // this will set all of the Context Values to the default values
    handleClear()
    // set the exclude state to false
    setExclude(false)
    // scroll to the top of the dropdown when the clear button is clicked
    dropdownRef.current?.scrollTo(0, 0)
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
          onClick={handleTheClearButton}
          disabled={selectedItems === 0}
        >
          clear
        </button>
      </div>
      <div className={styles.filterContainer} ref={dropdownRef}>
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
