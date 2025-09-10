import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './BookText.module.css'
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'

export default function BookText({
  title,
  children,
  cname,
}: {
  title: string
  children: React.ReactNode
  cname?: string
}) {
  if (title === 'smell') {
    return (
      <div className={`${styles.container} ${styles.smell}`}>
        <h3 className={styles.title}>smell description:</h3>
        <div className={styles.text}>
          <p>&quot;{children}&quot;</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.container}`}>
      <h3 className={styles.title}>{title}</h3>
      <div className={`${styles.text} ${styles[cname || '']}`}>{children}</div>
    </div>
  )
}
