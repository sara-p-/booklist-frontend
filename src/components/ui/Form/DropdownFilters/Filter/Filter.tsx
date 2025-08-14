import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Filter.module.css'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { range } from '@/lib/utils'
import { useRef, useState } from 'react'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import useEscapeKey from '@/hooks/useEscapeKey'
import useClickOutside from '@/hooks/useClickOutside'

type FilterProps = {
  children?: React.ReactNode
  buttonText: string
}

export default function Filter({ children, buttonText }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { filterValues } = useFilterValuesContext()
  const filterRef = useRef<HTMLDivElement>(null)
  // Close dropdown when escape key is pressed
  useEscapeKey(() => setIsOpen(false))
  // Close dropdown when clicking outside of dropdown
  function handleClickOutside() {
    setIsOpen(false)
  }
  useClickOutside({ callback: handleClickOutside, elementRef: filterRef })

  const contentClasses = isOpen
    ? `${styles.content} ${styles.open}`
    : styles.content

  const buttonClasses = isOpen
    ? `${styles.button} ${styles.open}`
    : styles.button

  const containerClasses =
    buttonText === 'sort'
      ? `${styles.container} ${styles.sort}`
      : styles.container

  return (
    <div className={containerClasses} ref={filterRef}>
      <button className={buttonClasses} onClick={() => setIsOpen(!isOpen)}>
        {buttonText === 'sort' ? (
          <span
            className={styles.buttonText}
          >{`${buttonText}: ${filterValues.sort}`}</span>
        ) : (
          <span className={styles.buttonText}>{buttonText}</span>
        )}
        {isOpen ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </button>
      <div className={contentClasses}>{children}</div>
    </div>
  )
}
