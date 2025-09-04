import styles from './Multiselect.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { getAllFilterItems, getFilterType } from '@/lib/filtering-utils'
import { FilterArrayType } from '@/types/filterType'
import { useBookListContext } from '@/hooks/useBookListContext'
import React, { useRef, useState } from 'react'
import useHandleMultiSelectClear from '@/hooks/useHandleMultiSelectClear'
import useHandleExclude from '@/hooks/useHandleExclude'
import useHandleMultiSelectChange from '@/hooks/useHandleMultiSelectChange'

type MultiselectProps = {
  filter: FilterArrayType
  mobile?: boolean
}

function Multiselect({ filter, mobile }: MultiselectProps) {
  const { filterValues } = useFilterValuesContext()
  const { bookList } = useBookListContext()
  const [exclude, setExclude] = useState(false) // state for the exclude button
  const dropdownRef = useRef<HTMLUListElement>(null)
  const items = getAllFilterItems(bookList, filter)
  const { handleClear } = useHandleMultiSelectClear(filter)
  const { handleExclude } = useHandleExclude(filter, exclude)
  const { handleMultiselectChange } = useHandleMultiSelectChange()

  // get the length of the array if the filter is of type string[]
  const filterType = getFilterType(filter)
  const selectedItems =
    filterType === 'string[]' ? filterValues[filter].length : 0

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
