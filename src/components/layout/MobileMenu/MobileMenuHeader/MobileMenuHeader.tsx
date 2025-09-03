import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './MobileMenuHeader.module.css'
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons'

type MobileMenuHeaderProps = {
  title: string
}

export default function MobileMenuHeader({ title }: MobileMenuHeaderProps) {
  return (
    <div className={styles.header}>
      {title === 'options' ? (
        <button className={styles.button}>
          <span className='visually-hidden'>Close mobile menu</span>
          <FontAwesomeIcon className={styles.icon} icon={faTimes} />
        </button>
      ) : (
        <button className={styles.button}>
          <span className='visually-hidden'>Back to filters</span>
          <FontAwesomeIcon className={styles.icon} icon={faChevronLeft} />
        </button>
      )}
      <h1 className={styles.title}>{title}</h1>
    </div>
  )
}
