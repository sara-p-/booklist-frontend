import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import styles from './MobileMultiSelect.module.css'
import { useRef, useState } from 'react'
import { getAllFilterItems } from '@/lib/filtering-utils'
import useFilterStateContext from '@/hooks/useFilterStateContext'
import { useExcludeValuesContext } from '@/hooks/useExcludeValuesContext'
import { useBookListContext } from '@/hooks/useBookListContext'
import { FilterArrayType } from '@/types/filterType'

type MobileMultiSelectProps = {
  filter: FilterArrayType
}

export default function MobileMultiSelect({ filter }: MobileMultiSelectProps) {
  const { filterValues, setFilterValues } = useFilterValuesContext()
  const { bookList } = useBookListContext()
  const { filterState, setFilterState } = useFilterStateContext()
  const { excludeValues, setExcludeValues } = useExcludeValuesContext()
  const [exclude, setExclude] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const items = getAllFilterItems(bookList, filter)

  if (items.length === 0) return null

  return (
    <ul>
      {items.map((item) => (
        <li className={styles.item} key={item.id}>
          <label htmlFor={item.id}>
            <input type='checkbox' id={item.id} />
            {item.name}
          </label>
        </li>
      ))}
    </ul>
  )
}
