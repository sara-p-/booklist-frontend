import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './ScrollToTop.module.css'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

export default function ScrollToTop() {
  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button className={styles.button} onClick={handleClick}>
      <span className={styles.visuallyHidden}>Scroll to top</span>
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  )
}
