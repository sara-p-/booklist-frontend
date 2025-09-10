import styles from './Multiselect.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { getAllFilterItems } from '@/lib/filtering-utils'
import { FilterArrayType } from '@/types/filterType'
import { useBookListContext } from '@/hooks/useBookListContext'
import React, { useEffect, useRef, useState } from 'react'
import useHandleMultiSelectClear from '@/hooks/useHandleMultiSelectClear'
import useHandleExclude from '@/hooks/useHandleExclude'
import useHandleMultiSelectChange from '@/hooks/useHandleMultiSelectChange'
import useMobileFilterStateContext from '@/hooks/useMobileFilterStateContext'
import useFilterStateContext from '@/hooks/useFilterStateContext'

type MultiselectProps = {
  filter: FilterArrayType
  mobile?: boolean
}

function Multiselect({ filter, mobile }: MultiselectProps) {
  const { filterValues } = useFilterValuesContext()
  const { mobileFilterState } = useMobileFilterStateContext()
  const { filterState } = useFilterStateContext()
  const { bookList } = useBookListContext()
  const [exclude, setExclude] = useState(false) // state for the exclude button
  const dropdownRef = useRef<HTMLUListElement>(null)
  const items = getAllFilterItems(bookList, filter)
  const { handleClear } = useHandleMultiSelectClear(filter)
  const { handleExclude } = useHandleExclude(filter, exclude)
  const { handleMultiselectChange } = useHandleMultiSelectChange()

  // get the length of the array
  const selectedItems = filterValues[filter].length

  // Handle the exclude button click
  function handleTheExcludeButton() {
    // call the function from the custom hook
    // this will set all of the Context Values to the default values
    handleExclude()
    // set the exclude state to the opposite of what it is
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

  // scroll to the top of the dropdown when the dropdown is opened
  useEffect(() => {
    if (mobileFilterState[filter] || filterState[filter]) {
      dropdownRef.current?.scrollTo(0, 0)
    }
  }, [mobileFilterState, filterState, filter])

  return (
    <>
      <div
        className={`${styles.selectionContainer} ${
          mobile ? styles.mobile : ''
        }`}
      >
        <button
          className={styles.button}
          onClick={() => handleTheExcludeButton()}
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
      <ul
        className={`${styles.filterContainer} ${mobile ? styles.mobile : ''}`}
        ref={dropdownRef as React.RefObject<HTMLUListElement>}
      >
        {items.map((item) => {
          // If the filter is selected, add the class name styles.selected and checked={true}
          const isItemChecked =
            filterValues[filter].includes(item.name) || false

          return (
            <li className={styles.filterItem} key={item.id}>
              <label
                className={isItemChecked ? styles.selected : ''}
                htmlFor={item.slug}
              >
                <input
                  type='checkbox'
                  id={item.slug}
                  onChange={() =>
                    handleMultiselectChange(filter, item.name, exclude)
                  }
                  checked={isItemChecked}
                />
                {item.name}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default React.memo(Multiselect)
