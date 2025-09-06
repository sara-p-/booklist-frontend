import styles from './MobileMenu.module.css'
import MobileMenuPanel from './MobileMenuPanel/MobileMenuPanel'

export default function MobileMenu() {
  return (
    <div className={styles.container}>
      <MobileMenuPanel filterType='filters' />
      <MobileMenuPanel filterType='authors' filterArray='authors' />
      <MobileMenuPanel filterType='series' filterArray='series' />
      <MobileMenuPanel filterType='genres' filterArray='genres' />
      <MobileMenuPanel filterType='tropes' filterArray='tropes' />
      <MobileMenuPanel filterType='creatures' filterArray='creatures' />
      <MobileMenuPanel filterType='booktags' filterArray='booktags' />
    </div>
  )
}
