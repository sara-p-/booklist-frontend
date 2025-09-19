'use client'

import styles from './page.module.css'
import FiltersSection from '@/components/layout/FiltersSection/FiltersSection'
import Books from '@/components/layout/Books/Books'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import SearchResults from '@/components/layout/SearchResults/SearchResults'
import Loading from './loading'
import { useEffect } from 'react'
import MobileMenu from '@/components/layout/MobileMenu/MobileMenu'
import MobileSearchBarContainer from '@/components/layout/MobileSearchBarContainer/MobileSearchBarContainer'
import useMobileFilterStateContext from '@/hooks/useMobileFilterStateContext'
import MobileFiltersButton from '@/components/ui/MobileFiltersButton/MobileFiltersButton'

export default function Home() {
  const { filterValues } = useFilterValuesContext()
  const filteredBooks = useFilteredBooks()
  const { mobileFilterState } = useMobileFilterStateContext()

  // Do a few things when the mobile menu is open or closed
  useEffect(() => {
    const isAnyMobileFilterOpen = Object.values(mobileFilterState).some(
      (filter) => filter
    )
    if (isAnyMobileFilterOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [mobileFilterState])

  // If the book list is not loaded, show the loading component
  if (!filteredBooks) return <Loading />

  return (
    <>
      <div className={styles.container}>
        <FiltersSection />
        <MobileSearchBarContainer />
        {filteredBooks.length > 0 && filterValues.search === '' && <Books />}
        {filteredBooks.length > 0 && filterValues.search !== '' && (
          <SearchResults />
        )}
      </div>
      <MobileFiltersButton />
      <MobileMenu />
    </>
  )
}
