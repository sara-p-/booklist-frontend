import MobileMenuHeader from '../MobileMenuHeader/MobileMenuHeader'
import styles from './MobileMenuPanel.module.css'

type MobileMenuPanelProps = {
  headerTitle: string
  items?: string[]
}

export default function MobileMenuPanel({
  headerTitle,
  items,
}: MobileMenuPanelProps) {
  return (
    <div className={styles.panel}>
      <MobileMenuHeader title={headerTitle} />
      {items && (
        <ul className={styles.list}>
          {items.map((item) => {
            return <MobileMenuItem />
          })}
        </ul>
      )}
    </div>
  )
}
