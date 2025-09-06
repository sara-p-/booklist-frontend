import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './MobileMenuHeader.module.css'
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons'
import useMobileFilterStateContext from '@/hooks/useMobileFilterStateContext'
import { MobileVisibleFilterType } from '@/types/filterType'

type MobileMenuHeaderProps = {
  title: MobileVisibleFilterType
}

export default function MobileMenuHeader({ title }: MobileMenuHeaderProps) {
  const { mobileFilterState, setMobileFilterState } =
    useMobileFilterStateContext()

  function handleCloseMenu() {
    setMobileFilterState({ ...mobileFilterState, [title]: false })
  }
  return (
    <div className={styles.header}>
      {title === 'filters' ? (
        <button className={styles.button} onClick={handleCloseMenu}>
          <span className='visually-hidden'>Close mobile menu</span>
          <FontAwesomeIcon className={styles.icon} icon={faTimes} />
        </button>
      ) : (
        <button className={styles.button} onClick={handleCloseMenu}>
          <span className='visually-hidden'>Back to filters</span>
          <FontAwesomeIcon className={styles.icon} icon={faChevronLeft} />
        </button>
      )}
      <h1 className={styles.title}>{title}</h1>
    </div>
  )
}
