import { FilterType } from '@/types/filterType'
import styles from './Radio.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import useFilterStateContext from '@/hooks/useFilterStateContext'
import { getOrderLabel, setOrderValue } from '@/lib/filtering-utils'

type RadioProps = {
  items: string[]
  groupName: string
  mobile?: boolean
}

export default function Radio({ items, groupName, mobile }: RadioProps) {
  const { filterValues, setFilterValues } = useFilterValuesContext()
  const { filterState, setFilterState } = useFilterStateContext()

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

    setFilterState({
      ...filterState,
      [groupName]: false,
    })
  }

  // If this is the 'order' filter, change the label based on the 'sort' filter value
  // All of this is to make the order options make more sense to the user
  const orderLabelAsc = getOrderLabel('asc', filterValues.sort)
  const orderLabelDesc = getOrderLabel('desc', filterValues.sort)

  return (
    <fieldset
      className={`${styles.filterContainer} ${mobile ? styles.mobile : ''}`}
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
                type='radio'
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
