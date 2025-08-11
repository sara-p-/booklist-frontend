import styles from './Multiselect.module.css'
import { BookItem } from '@/types/bookType'
import { useState } from 'react'

type MultiselectProps = {
  items: BookItem[]
  onChange: (filter: string, value: string) => void
  filter: string
}

export default function Multiselect({
  onChange,
  items,
  filter,
}: MultiselectProps) {
  const [isChecked, setIsChecked] = useState(false)

  function handleChange(filter: string, value: string) {
    onChange(filter, value)
    setIsChecked(!isChecked)
  }

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
                onChange={() => handleChange(filter, item.name)}
                checked={!isChecked}
              />
              {item.name}
            </label>
          </div>
        ))}
      </div>
    </>
  )
}
