'use client'
import styles from './SearchResults.module.css'
import Link from 'next/link'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { useSearch } from '@/hooks/useSearch'
import { DEFAULT_FILTER_VALUES } from '@/lib/globals'

export default function SearchResults() {
  const { books, authors, series } = useSearch()
  const { setFilterValues } = useFilterValuesContext()

  const onTitleClick = () => {
    // setFilterValues({
    //   ...DEFAULT_FILTER_VALUES,
    // })
  }

  function handleLinkClick(linkType: string, linkText: string) {
    setFilterValues({
      ...DEFAULT_FILTER_VALUES,
      [linkType]: [linkText],
    })
  }

  return (
    <div className={styles.resultsContainer}>
      <div className={`${styles.resultsGroup} ${styles.bookResults}`}>
        <h2 className={styles.resultsTitle}>Books ({books.length})</h2>
        <ul className={styles.resultsList}>
          {books.map((book) => (
            <li key={book.id} className={styles.resultItem}>
              <Link
                className={styles.resultLink}
                onNavigate={onTitleClick}
                href={`/book/${book.slug}`}
              >
                {book.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.resultsGroup} ${styles.authorResults}`}>
        <h2 className={styles.resultsTitle}>Authors ({authors.length})</h2>
        <ul className={styles.resultsList}>
          {authors.map((author) => (
            <li key={author.id} className={styles.resultItem}>
              <Link
                className={styles.resultLink}
                href={`/`}
                onNavigate={() => handleLinkClick('authors', author.name)}
              >
                {author.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.resultsGroup} ${styles.seriesResults}`}>
        <h2 className={styles.resultsTitle}>Series ({series.length})</h2>
        <ul className={styles.resultsList}>
          {series.map((series) => (
            <li key={series.id} className={styles.resultItem}>
              <Link
                prefetch={false}
                className={styles.resultLink}
                href={`/`}
                onNavigate={() => handleLinkClick('series', series.name)}
              >
                {series.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
