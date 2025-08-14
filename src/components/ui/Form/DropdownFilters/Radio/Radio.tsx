import { FilterType } from '@/types/filterType'
import styles from './Radio.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'

type RadioProps = {
  items: string[]
  groupName: string
  onChange: (filter: string, value: string) => void
}

export default function Radio({ items, groupName, onChange }: RadioProps) {
  const { filterValues } = useFilterValuesContext()
  return (
    <fieldset className={styles.filterContainer}>
      {items.map((item, index) => {
        const isItemChecked =
          filterValues[groupName as keyof FilterType] === item
        return (
          <div className={styles.filterItem} key={`${item}-${index}`}>
            <label
              // className={isItemChecked ? styles.selected : ''}
              htmlFor={item}
            >
              <input
                type='radio'
                name={groupName}
                id={item}
                value={item}
                onChange={() => onChange(groupName, item)}
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
