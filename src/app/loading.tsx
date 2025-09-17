// import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import styles from './loading.module.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Loading() {
  // const filters = [
  //   'sort: reading order',
  //   'authors',
  //   'series',
  //   'genres',
  //   'tropes',
  //   'creatures',
  //   'booktags',
  //   'rating',
  //   'spice',
  // ]

  return (
    <div className={styles.textContainer}>
      <h1 className={styles.loadingText}>
        Loading
        <span className={styles.loadingTextSpan}>.</span>
        <span className={styles.loadingTextSpan}>.</span>
        <span className={styles.loadingTextSpan}>.</span>
      </h1>
    </div>
    // <div className={styles.container}>
    //   <div className={styles.filtersContainer}>
    //     <div className={styles.filtersWrapper}>
    //       {filters.map((filter) => (
    //         <div key={filter} className={styles.filter}>
    //           <p className={styles.filterText}>{filter}</p>
    //           <FontAwesomeIcon
    //             className={styles.filterIcon}
    //             icon={faChevronDown}
    //           />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <div className={styles.bookListContainer}>
    //     <ul className={styles.list}>
    //       {Array.from({ length: 20 }).map((_, i) => (
    //         <li key={i} className={styles.item}></li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
  )
}
