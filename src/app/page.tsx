'use client'

import styles from './page.module.css'
import FiltersSection from '@/components/layout/FiltersSection/FiltersSection'
import Books from '@/components/layout/Books/Books'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import SearchResults from '@/components/layout/SearchResults/SearchResults'
import Loading from './loading'

export default function Home() {
  const { filterValues } = useFilterValuesContext()
  const filteredBooks = useFilteredBooks()

  if (!filteredBooks) return <Loading />

  return (
    // <Loading />
    <div className={styles.container}>
      <FiltersSection />
      <div className={styles.bookListContainer}>
        {filteredBooks.length > 0 && filterValues.search === '' && <Books />}
        {filteredBooks.length > 0 && filterValues.search !== '' && (
          <SearchResults />
        )}
      </div>
    </div>
  )
}
