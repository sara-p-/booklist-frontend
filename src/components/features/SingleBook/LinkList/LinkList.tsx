'use client'

import Link from 'next/link'
import styles from './LinkList.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'

export default function LinkList({
  items,
  itemLabel,
}: {
  items: { id: number; name: string; slug: string }[]
  itemLabel: string
}) {
  const { filterValues, setFilterValues } = useFilterValuesContext()

  // Function to set the filterValues based on the item clicked
  function handleNavigation(item: { id: number; name: string; slug: string }) {
    setFilterValues({
      ...filterValues,
      [itemLabel.toLowerCase()]: [item.name],
    })
  }

  return (
    <li className={styles.parentItem}>
      <p className={`${styles.label} h4`}>{itemLabel}:</p>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={item.id} className={styles.item}>
            <Link href='/' onNavigate={() => handleNavigation(item)}>
              {item.name}
            </Link>
            {items.length > 1 && index < items.length - 1 && ','}
          </li>
        ))}
      </ul>
    </li>
  )
}
