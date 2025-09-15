import { BookType } from '@/types/bookType'
import styles from './Books.module.css'
import Book from '@/components/features/Book/Book'
import React from 'react'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'

function Books() {
  const filteredBooks = useFilteredBooks()
  const { filterValues } = useFilterValuesContext()
  const view = filterValues.view
  const viewClass = view === 'grid' ? styles.bookGrid : styles.bookList
  // In Grid view, show the books in a grid without headers
  return (
    <ul className={viewClass}>
      {filteredBooks &&
        filteredBooks.map((book: BookType) => (
          <Book key={book.bookId} book={book} />
        ))}
    </ul>
  )
}

export default React.memo(Books)
