'use client'
import {
  faArrowDownAZ,
  faArrowUpAZ,
  faArrowUp19,
  faArrowDown19,
  faList,
  faTableCells,
} from '@fortawesome/free-solid-svg-icons'
import styles from './BookCountSection.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { useState } from 'react'
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

  const sort = filterValues.sort

  let alphaIcons = true
  if (sort !== 'series' && sort !== 'title') {
    alphaIcons = false
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
            alphaIcons ? (
              <FontAwesomeIcon className={styles.icon} icon={faArrowUpAZ} />
            ) : (
              <FontAwesomeIcon className={styles.icon} icon={faArrowUp19} />
            )
          ) : alphaIcons ? (
            <FontAwesomeIcon className={styles.icon} icon={faArrowDownAZ} />
          ) : (
            <FontAwesomeIcon className={styles.icon} icon={faArrowDown19} />
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
