'use client'
import styles from './SearchResults.module.css'
import Link from 'next/link'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { useSearch } from '@/hooks/useSearch'
import { DEFAULT_FILTER_VALUES } from '@/lib/globals'

export default function SearchResults() {
  const { books, authors, series } = useSearch()
  const { filterValues, setFilterValues } = useFilterValuesContext()

  const onLinkClick = () => {
    setFilterValues({
      ...filterValues,
      ...DEFAULT_FILTER_VALUES,
    })
  }

  return (
    <div className={styles.resultsContainer}>
      <div className={`${styles.resultsGroup} ${styles.bookResults}`}>
        <h2 className={styles.resultsTitle}>Books ({books.length})</h2>
        <ul className={styles.resultsList}>
          {books.map((book) => (
            <li key={book.id}>
              <Link onNavigate={onLinkClick} href={`/book/${book.slug}`}>
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
            <li key={author.id}>
              <LinkButton linkType='authors' linkText={author.name} />
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.resultsGroup} ${styles.seriesResults}`}>
        <h2 className={styles.resultsTitle}>Series ({series.length})</h2>
        <ul className={styles.resultsList}>
          {series.map((series) => (
            <li key={series.id}>
              <LinkButton linkType='series' linkText={series.name} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function LinkButton({
  linkType,
  linkText,
}: {
  linkType: string
  linkText: string
}) {
  const { filterValues, setFilterValues } = useFilterValuesContext()

  const onLinkClick = () => {
    setFilterValues({
      ...filterValues,
      ...DEFAULT_FILTER_VALUES,
    })
  }

  return (
    <button className={styles.linkButton} onClick={onLinkClick}>
      {linkText}
    </button>
  )
}
