import styles from './loading.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function Loading() {
  const filters = [
    'sort',
    'order',
    'authors',
    'series',
    'genres',
    'tropes',
    'creatures',
    'booktags',
    'rating',
    'spice',
  ]

  const loadingText = '...'
  const loadingTextArray = loadingText.split('')

  return (
    <>
      <div className={styles.textContainer}>
        <h1 className={styles.loadingText}>
          loading
          {loadingTextArray.map((letter, index) => (
            <span key={index} className={styles.loadingTextSpan}>
              {letter}
            </span>
          ))}
        </h1>
      </div>
      {/* <div className={styles.container}>
        <div className={styles.filtersContainer}>
          <div className={styles.filtersWrapper}>
            {filters.map((filter) => (
              <div key={filter} className={styles.filter}>
                <p className={styles.filterText}>{filter}</p>
                <FontAwesomeIcon
                  className={styles.filterIcon}
                  icon={faChevronDown}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.bookListContainer}>
          <ul className={styles.list}>
            {Array.from({ length: 20 }).map((_, i) => (
              <li key={i} className={styles.item}></li>
            ))}
          </ul>
        </div>
      </div> */}
    </>
  )
}
