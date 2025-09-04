import styles from './MobileMenu.module.css'
import MobileMenuPanel from './MobileMenuPanel/MobileMenuPanel'

export default function MobileMenu() {
  return (
    <div className={styles.container}>
      <MobileMenuPanel headerTitle='genres' filterArray='genres' />
    </div>
  )
}
