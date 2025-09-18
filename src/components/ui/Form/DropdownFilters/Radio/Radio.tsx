import { FilterRadioType, FilterType } from '@/types/filterType'
import styles from './Radio.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import useFilterStateContext from '@/hooks/useFilterStateContext'
import { getOrderLabel, setOrderValue } from '@/lib/filtering-utils'
import { useEffect, useRef } from 'react'
import useMobileFilterStateContext from '@/hooks/useMobileFilterStateContext'

type RadioProps = {
  items: string[]
  groupName: FilterRadioType
  mobile?: boolean
}

export default function Radio({ items, groupName, mobile }: RadioProps) {
  const { filterValues, setFilterValues } = useFilterValuesContext()
  const { filterState, setFilterState } = useFilterStateContext()
  const { mobileFilterState } = useMobileFilterStateContext()
  const dropdownRef = useRef<HTMLFieldSetElement>(null)

  function handleRadioChange(filter: string, value: string) {
    const newFilterValues = { ...filterValues }
    // If the filter is 'sort', set the 'order filter based on the 'sort' value
    if (filter === 'sort') {
      setFilterValues({
        ...newFilterValues,
        sort: value as FilterType['sort'],
        order: setOrderValue(value),
      })
    } else {
      setFilterValues({
        ...newFilterValues,
        [filter]: value,
      })
    }
  }

  // scroll to the top of the dropdown when the dropdown is opened
  useEffect(() => {
    if (mobileFilterState[groupName] || filterState[groupName]) {
      dropdownRef.current?.scrollTo(0, 0)
    }
  }, [mobileFilterState, filterState, groupName])

  // If this is the 'order' filter, change the label based on the 'sort' filter value
  // All of this is to make the order options make more sense to the user
  const orderLabelAsc = getOrderLabel('asc', filterValues.sort)
  const orderLabelDesc = getOrderLabel('desc', filterValues.sort)

  return (
    <fieldset
      className={`${styles.filterContainer} ${mobile ? styles.mobile : ''}`}
      ref={dropdownRef}
    >
      {items.map((item, index) => {
        const isItemChecked =
          filterValues[groupName as keyof FilterType] === item
        return (
          <div
            className={`${styles.filterItem} ${mobile ? styles.mobile : ''}`}
            key={`${item}-${index}`}
          >
            <label htmlFor={item}>
              <input
                aria-label={item}
                aria-checked={isItemChecked}
                type='radio'
                role='radio'
                name={groupName}
                id={item}
                value={item}
                onChange={() => handleRadioChange(groupName, item)}
                checked={isItemChecked}
              />
              {groupName === 'order'
                ? item === 'asc'
                  ? orderLabelAsc
                  : orderLabelDesc
                : item}
            </label>
          </div>
        )
      })}
    </fieldset>
  )
}
