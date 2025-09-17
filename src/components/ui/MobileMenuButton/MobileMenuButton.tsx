'use client'

import { useFilteredBooks } from '@/hooks/useFilteredBooks'
import styles from './MobileMenuButton.module.css'
import useMobileFilterStateContext from '@/hooks/useMobileFilterStateContext'
import {
  DEFAULT_FILTER_VALUES,
  DEFAULT_MOBILE_FILTER_STATE_VALUES,
} from '@/lib/globals'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'

type MobileMenuButtonProps = {
  type: 'closeFilters' | 'clearFilters'
  alt?: boolean
}

export default function MobileMenuButton({ type, alt }: MobileMenuButtonProps) {
  const filteredBooks = useFilteredBooks()
  const { filterValues, setFilterValues } = useFilterValuesContext()
  const { mobileFilterState, setMobileFilterState } =
    useMobileFilterStateContext()

  if (!filteredBooks) return null

  function handleCloseFiltersClick() {
    setMobileFilterState({
      ...mobileFilterState,
      ...DEFAULT_MOBILE_FILTER_STATE_VALUES,
    })
  }

  function handleClearFiltersClick() {
    handleCloseFiltersClick()
    setFilterValues({
      ...filterValues,
      ...DEFAULT_FILTER_VALUES,
    })
  }

  if (type === 'closeFilters') {
    return (
      <button
        className={`${styles.button} ${styles.closeFilters} ${
          alt ? styles.buttonAlt : ''
        }`}
        onClick={handleCloseFiltersClick}
      >
        <FontAwesomeIcon icon={faArrowLeft} /> view {filteredBooks.length} books
      </button>
    )
  }

  return (
    <button
      className={`${styles.button} ${styles.clearFilters} ${
        alt ? styles.buttonAlt : ''
      }`}
      onClick={handleClearFiltersClick}
    >
      reset filters
    </button>
  )
}
