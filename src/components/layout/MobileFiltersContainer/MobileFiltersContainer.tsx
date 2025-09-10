'use client'

import Searchbar from '@/components/ui/Form/Searchbar/Searchbar'
import styles from './MobileFiltersContainer.module.css'
import BookCountSection from '../BookCountSection/BookCountSection'
import useMobileFilterStateContext from '@/hooks/useMobileFilterStateContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { DEFAULT_FILTER_VALUES, MOBILE_FILTERS } from '@/lib/globals'
import { FilterType } from '@/types/filterType'
import { useEffect, useState } from 'react'

export default function MobileFiltersContainer() {
  const { mobileFilterState, setMobileFilterState } =
    useMobileFilterStateContext()
  const { filterValues } = useFilterValuesContext()
  const [activeFilters, setActiveFilters] = useState(0)

  function handleFiltersButton() {
    setMobileFilterState({ ...mobileFilterState, filters: true })
  }

  // function activeFiltersValue() {
  //   let activeFilters = 0
  //   for (const filter in MOBILE_FILTERS) {
  //     if (
  //       filterValues[filter as keyof FilterType] !==
  //       DEFAULT_FILTER_VALUES[filter as keyof FilterType]
  //     ) {
  //       activeFilters += 1
  //     }
  //   }
  //   return activeFilters
  // }

  useEffect(() => {
    let activeFilters = 0
    for (const filter in MOBILE_FILTERS) {
      if (
        filterValues[filter as keyof FilterType] !==
        DEFAULT_FILTER_VALUES[filter as keyof FilterType]
      ) {
        activeFilters += 1
      }
    }
    setActiveFilters(activeFilters)
  }, [filterValues])

  return (
    <div className={styles.container}>
      <div className={styles.searchbarContainer}>
        <Searchbar mobile={true} />
      </div>
      <button className={styles.filtersButton} onClick={handleFiltersButton}>
        filters{' '}
        <span className={styles.activeFiltersText}>
          ({activeFilters} active)
        </span>{' '}
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
      <BookCountSection />
    </div>
  )
}
