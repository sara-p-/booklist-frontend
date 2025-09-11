'use client'

import Searchbar from '@/components/ui/Form/Searchbar/Searchbar'
import styles from './MobileFiltersContainer.module.css'
import BookCountSection from '../BookCountSection/BookCountSection'
import useMobileFilterStateContext from '@/hooks/useMobileFilterStateContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import useActiveMobileFiltersNumber from '@/hooks/useActiveMobileFiltersNumber'

export default function MobileFiltersContainer() {
  const { mobileFilterState, setMobileFilterState } =
    useMobileFilterStateContext()
  const { activeFilters } = useActiveMobileFiltersNumber()

  function handleFiltersButton() {
    setMobileFilterState({ ...mobileFilterState, filters: true })
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchbarContainer}>
        <Searchbar mobile={true} />
      </div>
      <button className={styles.filtersButton} onClick={handleFiltersButton}>
        filters{' '}
        {activeFilters > 0 && (
          <span className={styles.activeFiltersText}>
            ({activeFilters} active)
          </span>
        )}{' '}
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
      <BookCountSection />
    </div>
  )
}
