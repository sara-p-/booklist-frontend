'use client'

import useMobileFilterStateContext from '@/hooks/useMobileFilterStateContext'
import styles from './MobileFiltersButton.module.css'
import useActiveMobileFiltersNumber from '@/hooks/useActiveMobileFiltersNumber'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function MobileFiltersButton() {
  const { mobileFilterState, setMobileFilterState } =
    useMobileFilterStateContext()
  const { activeFilters } = useActiveMobileFiltersNumber()

  function handleFiltersButton() {
    setMobileFilterState({ ...mobileFilterState, filters: true })
  }

  return (
    <button className={styles.button} onClick={handleFiltersButton}>
      filters{' '}
      {activeFilters > 0 && (
        <span className={styles.activeFiltersText}>
          ({activeFilters} active)
        </span>
      )}{' '}
      <FontAwesomeIcon icon={faArrowRight} />
    </button>
  )
}
