import { BookType } from '@/types/bookType'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Book.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { convertStringToDate } from '@/lib/utils'

// TODO: Add links to the different book information that reset the filters

export default function Book({ book }: { book: BookType }) {
  const { filterValues } = useFilterValuesContext()
  const isList = filterValues.view === 'list'
  const itemClass = isList ? styles.bookListItem : styles.bookGridItem

  return (
    <li className={itemClass} key={book.bookId}>
      <Link href={`/book/${book.slug}`} className={styles.bookLink}>
        <Image
          className={styles.bookImage}
          src={book.image}
          alt={`Book cover of ${book.title}`}
          fill={true}
          sizes='208px, 310px'
        />
      </Link>
      {isList && (
        <>
          <div className={styles.bookInfo}>
            <Link href={`/book/${book.slug}`}>
              <h2 className={styles.bookTitle}>{book.title}</h2>
            </Link>
            <button className={styles.bookInfoButton}>
              <b>author:</b> <span>{book.author[0].name}</span>
            </button>
            <button className={styles.bookInfoButton}>
              <b>series:</b> <span>{book.series[0].name}</span>
            </button>
            <p className={styles.bookPublished}>
              <b>published:</b>{' '}
              <span>{convertStringToDate(book.publishDate)}</span>
            </p>
            <p className={styles.bookLength}>
              <b>length:</b> {book.length} pages
            </p>
            {/* <p className={styles.bookRating}>
              <b>rating:</b> {book.rating}/10
            </p> */}
            <p className={styles.bookSpice}>
              <b>spice:</b> {book.spice}/5
            </p>
          </div>
          <div className={styles.bookRating}>
            <p className={`${styles.bookRatingValue} h3`}>{book.rating}/10</p>
          </div>
        </>
      )}
    </li>
  )
}
