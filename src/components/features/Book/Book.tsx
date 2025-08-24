import { BookType } from '@/types/bookType'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Book.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { convertStringToDate } from '@/lib/utils'
import { DEFAULT_FILTER_VALUES } from '@/lib/globals'

// TODO: Add links to the different book information that reset the filters
// TODO: Add a link to the book page that resets the filters

export default function Book({ book }: { book: BookType }) {
  const { filterValues, setFilterValues } = useFilterValuesContext()
  const isList = filterValues.view === 'list'
  const itemClass = isList ? styles.bookListItem : styles.bookGridItem

  function handleHomeNavigation() {
    // setFilterValues({
    //   ...filterValues,
    //   ...DEFAULT_FILTER_VALUES,
    // })
  }

  function handleBookNavigation(filterName: string, filterValue: string) {
    setFilterValues({
      ...filterValues,
      ...DEFAULT_FILTER_VALUES,
      [filterName]: [filterValue],
    })
  }

  return (
    <li className={itemClass} key={book.bookId}>
      <Link
        href={`/book/${book.slug}`}
        className={styles.bookLink}
        onNavigate={handleHomeNavigation}
      >
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
          <ul className={styles.bookInfoList}>
            <li>
              <Link
                className={styles.bookTitleLink}
                href={`/book/${book.slug}`}
                onNavigate={handleHomeNavigation}
              >
                <h2 className={styles.bookTitle}>{book.title}</h2>
              </Link>
            </li>
            <li>
              <b>author:</b>{' '}
              <Link
                href='/'
                onNavigate={() =>
                  handleBookNavigation('authors', book.authors[0].name)
                }
              >
                <span>{book.authors[0].name}</span>
              </Link>
            </li>
            <li>
              <b>series:</b>{' '}
              <Link
                href='/'
                onNavigate={() =>
                  handleBookNavigation('series', book.series[0].name)
                }
              >
                <span>{book.series[0].name}</span>
              </Link>
            </li>
            <li>
              <p className={styles.bookPublished}>
                <b>published:</b>{' '}
                <span>{convertStringToDate(book.publishDate)}</span>
              </p>
            </li>
            <li>
              <p className={styles.bookLength}>
                <b>length:</b> {book.length} pages
              </p>
            </li>
            <li>
              <p className={styles.bookSpice}>
                <b>spice:</b> {book.spice}/5
              </p>
            </li>
          </ul>
          <div className={styles.bookRating}>
            <p className={`${styles.bookRatingValue} h3`}>{book.rating}/10</p>
          </div>
        </>
      )}
    </li>
  )
}
