import styles from './Searchbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Searchbar() {
  return (
    <div className={styles.searchbar}>
      <label htmlFor='search' className={`visually-hidden`}>
        Search
      </label>
      <FontAwesomeIcon className={styles.icon} icon={faSearch} />
      <input
        type='text'
        id='search'
        placeholder='search'
        className={styles.input}
      />
    </div>
  )
}
