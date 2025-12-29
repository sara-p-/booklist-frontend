import { BookType } from '@/types/bookType'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Book.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { convertStringToDate, scrollToTop } from '@/lib/utils'
import { DEFAULT_FILTER_VALUES } from '@/lib/globals'
import { useState } from 'react'

export default function Book({
  book,
  priority = false,
}: {
  book: BookType
  priority?: boolean
}) {
  const { filterValues, setFilterValues } = useFilterValuesContext()
  const [preFetch, setPreFetch] = useState<boolean>(false)
  const isList = filterValues.view === 'list'
  const itemClass = isList ? styles.bookListItem : styles.bookGridItem

  // TODO: when the user clicks on the book, the filters should be reset. Because the reset is happening before the book is loaded, the screen flashes the book grid before the user is navigated away.
  function handleHomeNavigation() {
    scrollToTop()

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
        prefetch={preFetch}
        onMouseEnter={() => setPreFetch(true)}
      >
        <Image
          className={styles.bookImage}
          src={book.image}
          alt={`Book cover of ${book.title}`}
          fill={true}
          sizes='(max-width: 768px) 150px, 208px'
          quality={80}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
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
              <p className={styles.bookMobileRating}>
                <b>rating:</b> {book.rating}/5
              </p>
            </li>
            <li>
              <p className={styles.bookSpice}>
                <b>spice:</b> {book.spice}/5
              </p>
            </li>
          </ul>
          <div className={styles.bookRating}>
            <p className={`${styles.bookRatingValue} h3`}>{book.rating}/5</p>
          </div>
        </>
      )}
    </li>
  )
}
