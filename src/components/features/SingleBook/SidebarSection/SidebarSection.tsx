import styles from './SidebarSection.module.css'

export default function SidebarSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className={styles.section}>
      <p className={`${styles.title} h3`}>{title}</p>
      <ul className={styles.list}>{children}</ul>
    </div>
  )
}
