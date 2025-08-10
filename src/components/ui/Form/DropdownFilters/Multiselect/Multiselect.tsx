import styles from './Multiselect.module.css'
import { range } from '@/lib/utils'
import { BookAuthor } from '@/types/bookType'
import { useState } from 'react'

type MultiselectProps = {
  items?: BookAuthor[]
}

export default function Multiselect({ items }: MultiselectProps) {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <>
      <div className={styles.selectionContainer}>
        <p className={styles.selectionText}>0 selected</p>
        <button className={styles.clearButton}>Clear</button>
      </div>
      <div className={styles.filterContainer}>
        {range(1, 10).map((item, index) => (
          <div className={styles.filterItem} key={index}>
            <label
              className={isChecked ? styles.selected : ''}
              htmlFor={`filter-${index}`}
            >
              <input
                type='checkbox'
                id={`filter-${index}`}
                onChange={() => setIsChecked(!isChecked)}
              />
              {`Filter ${index + 1}`}
            </label>
          </div>
        ))}
      </div>
    </>
  )
}
