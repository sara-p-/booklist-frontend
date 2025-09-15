import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './ScrollToTop.module.css'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { scrollToTop } from '@/lib/utils'

export default function ScrollToTop({
  theRef,
}: {
  theRef: HTMLDivElement | null
}) {
  return (
    <button className={styles.button} onClick={() => scrollToTop(theRef)}>
      <span className={styles.visuallyHidden}>Scroll to top</span>
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  )
}
