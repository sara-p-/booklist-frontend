import styles from './BookText.module.css'

export default function BookText({
  title,
  children,
  cname,
}: {
  title: string
  children: React.ReactNode
  cname?: string
}) {
  return (
    <div className={`${styles.container}`}>
      <h3 className={styles.title}>{title}</h3>
      <div className={`${styles.text} ${styles[cname || '']}`}>{children}</div>
    </div>
  )
}
