import styles from './Multiselect.module.css'
import { range } from '@/lib/utils'
import { FilterItems } from '@/types/filterItems'

type MultiselectProps = {
  items?: FilterItems[]
}

export default function Multiselect({ items }: MultiselectProps) {
  return (
    <div className={styles.filterContainer}>
      {range(1, 10).map((item, index) => (
        <div className={styles.filterItem} key={index}>
          <input type='checkbox' id={`filter-${index}`} />
          <label htmlFor={`filter-${index}`}>{`Filter ${index + 1}`}</label>
        </div>
      ))}
    </div>
  )
}
