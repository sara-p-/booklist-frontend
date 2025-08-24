import { convertStringToDate } from '@/lib/utils'
import styles from './TimelineItem.module.css'

export default function TimelineItem({
  title,
  date,
}: {
  title: string
  date: string
}) {
  return (
    <li className={styles.item}>
      <p className={`${styles.label} h4`}>{title}:</p>
      <p className={styles.date}>{convertStringToDate(date)}</p>
    </li>
  )
}
