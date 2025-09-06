'use client'

import Searchbar from '@/components/ui/Form/Searchbar/Searchbar'
import styles from './MobileFiltersContainer.module.css'
import BookCountSection from '../BookCountSection/BookCountSection'
import useMobileFilterStateContext from '@/hooks/useMobileFilterStateContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

export default function MobileFiltersContainer() {
  const { mobileFilterState, setMobileFilterState } =
    useMobileFilterStateContext()

  function handleFiltersButton() {
    setMobileFilterState({ ...mobileFilterState, filters: true })
  }

  useEffect(() => {
    console.log('mobileFilterState', mobileFilterState.filters)
  }, [mobileFilterState])

  return (
    <div className={styles.container}>
      <div className={styles.searchbarContainer}>
        <Searchbar mobile={true} />
      </div>
      <button className={styles.filtersButton} onClick={handleFiltersButton}>
        filters <FontAwesomeIcon icon={faArrowRight} />
      </button>
      <BookCountSection />
    </div>
  )
}
