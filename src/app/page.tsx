'use client'

import styles from './page.module.css'
import FiltersSection from '@/components/layout/FiltersSection/FiltersSection'
import Books from '@/components/layout/Books/Books'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import SearchResults from '@/components/layout/SearchResults/SearchResults'
import Loading from './loading'
import ScrollToTop from '@/components/features/ScrollToTop/ScrollToTop'
import { useEffect, useState } from 'react'
import MobileMenu from '@/components/layout/MobileMenu/MobileMenu'

export default function Home() {
  const { filterValues } = useFilterValuesContext()
  const filteredBooks = useFilteredBooks()
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // If the book list is not loaded, show the loading component
  if (!filteredBooks) return <Loading />

  return (
    <>
      <div className={styles.container}>
        <FiltersSection />
        <div className={styles.bookListContainer}>
          {filteredBooks.length > 0 && filterValues.search === '' && <Books />}
          {filteredBooks.length > 0 && filterValues.search !== '' && (
            <SearchResults />
          )}
        </div>
        {showScrollToTop && <ScrollToTop />}
      </div>
      {/* <MobileMenu /> */}
    </>
  )
}
