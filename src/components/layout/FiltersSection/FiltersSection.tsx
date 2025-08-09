import styles from './FiltersSection.module.css'

type FiltersSectionProps = {
  children?: React.ReactNode
}

export default function FiltersSection({ children }: FiltersSectionProps) {
  return (
    <div className={styles.container}>
      <div className={styles.filtersWrapper}>{children}</div>
    </div>
  )
}
