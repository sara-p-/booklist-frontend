import { BookType } from '@/types/bookType'
import styles from './Books.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import Book from '@/components/features/Book/Book'

export default function Books({ bookList }: { bookList: BookType[] }) {
  const { filterValues } = useFilterValuesContext()
  const viewClass =
    filterValues.view === 'grid' ? styles.bookGrid : styles.bookList

  return (
    <ul className={viewClass}>
      {bookList.map((book: BookType) => (
        <Book key={book.bookId} book={book} />
      ))}
    </ul>
  )
}
