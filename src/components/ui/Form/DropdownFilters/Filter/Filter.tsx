import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Filter.module.css'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { range } from '@/lib/utils'
import { useState } from 'react'

type FilterProps = {
  children?: React.ReactNode
  buttonText: string
}

export default function Filter({ children, buttonText }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const contentClasses = isOpen
    ? `${styles.content} ${styles.open}`
    : styles.content

  const buttonClasses = isOpen
    ? `${styles.button} ${styles.open}`
    : styles.button

  return (
    <div className={styles.container}>
      <button className={buttonClasses} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.buttonText}>{buttonText}</span>
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
