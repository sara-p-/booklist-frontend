import { BookType } from '@/types/bookType'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Book.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { convertStringToDate } from '@/lib/utils'

export default function Book({ book }: { book: BookType }) {
  const { filterValues } = useFilterValuesContext()
  const isList = filterValues.view === 'list'
  const itemClass = isList ? styles.bookListItem : styles.bookGridItem
  // const publishDate = convertStringToDate(book.publishDate)

  return (
    <li className={itemClass} key={book.bookId}>
      <Link href={`/book/${book.slug}`} className={styles.bookLink}>
        <div className={styles.bookImageContainer}>
          <Image
            className={styles.bookImage}
            src={book.image}
            alt={`Book cover of ${book.title}`}
            fill={true}
            sizes='208px, 310px'
          />
        </div>
        {isList && (
          <div className={styles.bookInfo}>
            <h2 className={styles.bookTitle}>{book.title}</h2>
            <p className={styles.bookAuthor}>{book.author[0].name}</p>
            <p className={styles.bookSeries}>
              <b>series:</b> {book.series[0].name}
            </p>
            <p className={styles.bookPublished}>
              <b>published:</b> {convertStringToDate(book.publishDate)}
            </p>
            <p className={styles.bookLength}>
              <b>length:</b> {book.length} pages
            </p>
            <p className={styles.bookRating}>
              <b>rating:</b> {book.rating}/10
            </p>
            <p className={styles.bookSpice}>
              <b>spice:</b> {book.spice}/5
            </p>
          </div>
        )}
      </Link>
    </li>
  )
}
