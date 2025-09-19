import { BookType } from '@/types/bookType'
import styles from './Books.module.css'
import Book from '@/components/features/Book/Book'
import React, { useEffect, useRef, useState } from 'react'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import ScrollToTop from '@/components/features/ScrollToTop/ScrollToTop'

function Books() {
  const filteredBooks = useFilteredBooks()
  const { filterValues } = useFilterValuesContext()
  const [theRef, setTheRef] = useState<HTMLDivElement | null>(null)
  const view = filterValues.view
  const viewClass = view === 'grid' ? styles.bookGrid : styles.bookList
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  const handleRef = (ref: HTMLDivElement) => {
    if (ref) {
      setTheRef(ref)
    }
  }

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    if (theRef) {
      const handleScroll = () => {
        setShowScrollToTop(theRef.scrollTop > 300)
      }

      theRef.addEventListener('scroll', handleScroll)
      return () => theRef.removeEventListener('scroll', handleScroll)
    }
  }, [theRef])

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
