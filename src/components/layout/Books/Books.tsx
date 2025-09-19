import { BookType } from '@/types/bookType'
import styles from './Books.module.css'
import Book from '@/components/features/Book/Book'
import React from 'react'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import ScrollToTop from '@/components/features/ScrollToTop/ScrollToTop'
import { useScrollToTop } from '@/hooks/useScrollToTop'

function Books() {
  const filteredBooks = useFilteredBooks()
  const { filterValues } = useFilterValuesContext()
  const view = filterValues.view
  const viewClass = view === 'grid' ? styles.bookGrid : styles.bookList
  const { showScrollToTop, handleRef, theRef } = useScrollToTop()

  return (
    <>
      <div className={styles.bookListContainer} ref={handleRef}>
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
