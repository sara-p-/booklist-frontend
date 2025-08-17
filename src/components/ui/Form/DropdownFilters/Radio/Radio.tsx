import { FilterType } from '@/types/filterType'
import styles from './Radio.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import useFilterStateContext from '@/hooks/useFilterStateContext'

type RadioProps = {
  items: string[]
  groupName: string
}

export default function Radio({ items, groupName }: RadioProps) {
  const { filterValues, setFilterValues } = useFilterValuesContext()
  const { filterState, setFilterState } = useFilterStateContext()
  function handleRadioChange(filter: string, value: string) {
    const newFilterValues = { ...filterValues }
    setFilterValues({
      ...newFilterValues,
      [filter]: value,
    })
    setFilterState({
      ...filterState,
      [groupName]: false,
    })
  }

  return (
    <fieldset className={styles.filterContainer}>
      {items.map((item, index) => {
        const isItemChecked =
          filterValues[groupName as keyof FilterType] === item
        return (
          <div className={styles.filterItem} key={`${item}-${index}`}>
            <label htmlFor={item}>
              <input
                type='radio'
                name={groupName}
                id={item}
                value={item}
                onChange={() => handleRadioChange(groupName, item)}
                checked={isItemChecked}
              />
              {item}
            </label>
          </div>
        )
      })}
    </fieldset>
  )
}
