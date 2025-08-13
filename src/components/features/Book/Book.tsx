import { BookType } from '@/types/bookType'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Book.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'

export default function Book({ book }: { book: BookType }) {
  const { filterValues } = useFilterValuesContext()
  const isList = filterValues.view === 'list'
  const itemClass = isList ? styles.bookListItem : styles.bookGridItem

  return (
    <li className={itemClass} key={book.bookId}>
      <Link href={`/book/${book.slug}`} className={styles.bookLink}>
        <Image
          src={book.image}
          alt={`Book cover of ${book.title}`}
          fill={true}
          sizes='208px, 310px'
        />
        {isList && (
          <div className={styles.bookInfo}>
            <h2 className={styles.bookTitle}>{book.title}</h2>
            <p className={styles.bookAuthor}>{book.author[0].name}</p>
            <p className={styles.bookSeries}>{book.series[0].name}</p>
            <p className={styles.bookPublished}>{book.publishDate}</p>
            <p className={styles.bookLength}>{book.length} pages</p>
            <p className={styles.bookRating}>{book.rating}</p>
            <p className={styles.bookSpice}>{book.spice}</p>
          </div>
        )}
      </Link>
    </li>
  )
}
