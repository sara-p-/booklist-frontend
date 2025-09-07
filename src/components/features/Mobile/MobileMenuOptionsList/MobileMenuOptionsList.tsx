'use client'

import MobileMenuListButton from '@/components/ui/MobileMenuListButton/MobileMenuListButton'
import styles from './MobileMenuOptionsList.module.css'
import { DEFAULT_FILTER_VALUES, MOBILE_FILTERS } from '@/lib/globals'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import MobileMenuButton from '@/components/ui/MobileMenuButton/MobileMenuButton'

export default function MobileMenuOptionsList() {
  const { filterValues, setFilterValues } = useFilterValuesContext()

  const selectedItems =
    JSON.stringify(filterValues) === JSON.stringify(DEFAULT_FILTER_VALUES)
      ? true
      : false

  function handleTheClearButton() {
    setFilterValues({
      ...filterValues,
      ...DEFAULT_FILTER_VALUES,
    })
  }

  return (
    <>
      {/* <div className={styles.selectionContainer}>
        <button
          className={styles.button}
          onClick={handleTheClearButton}
          disabled={selectedItems}
        >
          reset filters
        </button>
      </div> */}
      <MobileMenuButton type='clearFilters' />
      <ul className={styles.list}>
        {MOBILE_FILTERS.map((filter) => (
          <MobileMenuListButton filterName={filter} key={filter} />
        ))}
      </ul>
    </>
  )
}
