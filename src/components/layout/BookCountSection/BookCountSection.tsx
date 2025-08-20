'use client'
import {
  faArrowDownAZ,
  faArrowUpAZ,
  faList,
  faTableCells,
} from '@fortawesome/free-solid-svg-icons'
import styles from './BookCountSection.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { useEffect, useState } from 'react'
import { useBookListContext } from '@/hooks/useBookListContext'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'

export default function BookCountSection() {
  const newBooks = useFilteredBooks()
  const { filterValues, setFilterValues } = useFilterValuesContext()
  const [bookOrderAsc, setBookOrderAsc] = useState(false)
  const [bookViewList, setBookViewList] = useState(false)

  function handleBookOrderChange(bookOrderAsc: boolean) {
    setBookOrderAsc(bookOrderAsc)
    setFilterValues({ ...filterValues, order: bookOrderAsc ? 'asc' : 'desc' })
  }

  function handleBookViewChange(bookViewList: boolean) {
    setBookViewList(bookViewList)
    setFilterValues({ ...filterValues, view: bookViewList ? 'list' : 'grid' })
  }

  return (
    <div className={styles.container}>
      <h4 className={styles.bookCount}>{newBooks.length} books</h4>
      <div className={styles.bookOrderContainer}>
        <button
          className={`${styles.bookOrderButton} ${styles.bookView}`}
          onClick={() => handleBookOrderChange(!bookOrderAsc)}
        >
          {bookOrderAsc ? (
            <FontAwesomeIcon className={styles.icon} icon={faArrowUpAZ} />
          ) : (
            <FontAwesomeIcon className={styles.icon} icon={faArrowDownAZ} />
          )}
        </button>
        <button
          className={`${styles.bookOrderButton} ${styles.bookOrder}`}
          onClick={() => handleBookViewChange(!bookViewList)}
        >
          {bookViewList ? (
            <FontAwesomeIcon className={styles.icon} icon={faTableCells} />
          ) : (
            <FontAwesomeIcon className={styles.icon} icon={faList} />
          )}
        </button>
      </div>
    </div>
  )
}
