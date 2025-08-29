'use client'
import { faList, faTableCells } from '@fortawesome/free-solid-svg-icons'
import styles from './BookCountSection.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'

export default function BookCountSection() {
  const newBooks = useFilteredBooks()
  const { filterValues, setFilterValues } = useFilterValuesContext()

  function handleBookViewChange() {
    const newValues = { ...filterValues }
    if (newValues.view === 'list') {
      setFilterValues({ ...newValues, view: 'grid' })
    } else {
      setFilterValues({ ...newValues, view: 'list' })
    }
  }

  return (
    <div className={styles.container}>
      <h4 className={styles.bookCount}>{newBooks && newBooks.length} books</h4>
      <div className={styles.bookOrderContainer}>
        <button
          className={`${styles.bookOrderButton} ${styles.bookOrder}`}
          onClick={() => handleBookViewChange()}
        >
          {filterValues.view === 'list' ? (
            <FontAwesomeIcon className={styles.icon} icon={faTableCells} />
          ) : (
            <FontAwesomeIcon className={styles.icon} icon={faList} />
          )}
        </button>
      </div>
    </div>
  )
}
