import { BookType } from '@/types/bookType'
import styles from './Books.module.css'
import Book from '@/components/features/Book/Book'
import React, { useEffect, useRef } from 'react'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import ScrollToTop from '@/components/features/ScrollToTop/ScrollToTop'
import { useScrollToTop } from '@/hooks/useShowScrollToTop'

function Books() {
  const filteredBooks = useFilteredBooks()
  const { filterValues } = useFilterValuesContext()
  const containerRef = useRef<HTMLDivElement>(null)
  const view = filterValues.view
  const viewClass = view === 'grid' ? styles.bookGrid : styles.bookList
  const { showScrollToTop, handleRef, theRef } = useScrollToTop()

  // We need a ref for the ScrollToTop button, and the container
  function handleBothRefs(ref: HTMLDivElement) {
    handleRef(ref)
    containerRef.current = ref
  }

  // When the filterValues change, scroll to the top of the container
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [filterValues])

  return (
    <>
      <div
        className={styles.bookListContainer}
        ref={(ref) => {
          if (ref) {
            handleBothRefs(ref)
          }
        }}
      >
        <div className={styles.bookListWrapper}>
          <ul className={viewClass}>
            {filteredBooks &&
              filteredBooks.map((book: BookType) => (
                <Book key={book.bookId} book={book} />
              ))}
          </ul>
        </div>
      </div>
      {showScrollToTop && <ScrollToTop theRef={theRef} />}
    </>
  )
}

export default React.memo(Books)
