import styles from './Header.module.css'
import Searchbar from '@/components/ui/Form/Searchbar/Searchbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faMoon } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={`${styles.column} ${styles.leftColumn}`}>
          <div className={styles.titleContainer}>
            <FontAwesomeIcon className={styles.icon} icon={faBook} />
            <h1 className={styles.title}>BookList</h1>
          </div>
          <Searchbar />
        </div>
        <div className={styles.column}>
          <button className={styles.themeToggle}>
            <FontAwesomeIcon icon={faMoon} />
          </button>
        </div>
      </div>
    </header>
  )
}
