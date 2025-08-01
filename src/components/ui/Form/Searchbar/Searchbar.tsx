import styles from './Searchbar.module.css'

export default function Searchbar() {
  return (
    <div className={styles.searchbar}>
      <label htmlFor='search' className={styles.visuallyHidden}>
        Search
      </label>
      <input
        type='text'
        id='search'
        placeholder='search'
        className={styles.input}
      />
    </div>
  )
}
