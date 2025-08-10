import styles from './Multiselect.module.css'
import { BookItem } from '@/types/bookType'
import { useState } from 'react'

type MultiselectProps = {
  items: BookItem[]
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
        {items.map((item) => (
          <div className={styles.filterItem} key={item.id}>
            <label
              className={isChecked ? styles.selected : ''}
              htmlFor={item.slug}
            >
              <input
                type='checkbox'
                id={item.slug}
                onChange={() => setIsChecked(!isChecked)}
              />
              {item.name}
            </label>
          </div>
        ))}
      </div>
    </>
  )
}
