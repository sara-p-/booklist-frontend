'use client'

import Searchbar from '@/components/ui/Form/Searchbar/Searchbar'
import styles from './MobileFiltersContainer.module.css'
import BookCountSection from '../BookCountSection/BookCountSection'
import useMobileFilterStateContext from '@/hooks/useMobileFilterStateContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import {
  DEFAULT_FILTER_VALUES,
  MOBILE_FILTERS,
  POSSIBLE_ACTIVE_MOBILE_FILTERS,
} from '@/lib/globals'
import { FilterType } from '@/types/filterType'
import { useEffect, useState } from 'react'
import useActiveMobileFiltersNumber from '@/hooks/useActiveMobileFiltersNumber'

export default function MobileFiltersContainer() {
  const { mobileFilterState, setMobileFilterState } =
    useMobileFilterStateContext()
  const { filterValues } = useFilterValuesContext()
  const { activeFilters } = useActiveMobileFiltersNumber()
  // const [activeFilters, setActiveFilters] = useState(0)

  function handleFiltersButton() {
    setMobileFilterState({ ...mobileFilterState, filters: true })
  }

  // useEffect(() => {
  //   let currentActiveFilters = 0
  //   const currentValues = { ...filterValues }
  //   for (const filterName of POSSIBLE_ACTIVE_MOBILE_FILTERS) {
  //     if (
  //       currentValues[filterName as keyof FilterType] !==
  //       DEFAULT_FILTER_VALUES[filterName as keyof FilterType]
  //     ) {
  //       console.log(`${filterName} is not the default value`)
  //       currentActiveFilters += 1
  //     }
  //   }
  //   setActiveFilters(currentActiveFilters)
  // }, [filterValues])

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
