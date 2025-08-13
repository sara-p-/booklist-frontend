import { BookType } from '@/types/bookType'
import styles from './BookGrid.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'
import Book from '@/components/features/Book/Book'

export default function BookGrid() {
  const filteredBooks = useFilteredBooks()
  const { filterValues } = useFilterValuesContext()
  const viewClass =
    filterValues.view === 'grid' ? styles.bookGrid : styles.bookList

  return (
    <ul className={viewClass}>
      {filteredBooks.map((book: BookType) => (
        <Book key={book.bookId} book={book} />
      ))}
    </ul>
  )
}
