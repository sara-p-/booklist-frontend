import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Filters.module.css'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { range } from '@/lib/utils'
import { useState } from 'react'

type FiltersProps = {
  children?: React.ReactNode
  buttonText: string
}

export default function Filters({ children, buttonText }: FiltersProps) {
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
      <div className={contentClasses}>
        {children}
        {/* <div className={styles.selectionContainer}>
          <p className={styles.selectionText}>0 selected</p>
          <button className={styles.clearButton}>Clear</button>
        </div>
        <div className={styles.filterContainer}>
          {range(1, 10).map((item, index) => (
            <div className={styles.filterItem} key={index}>
              <input type='checkbox' id={`filter-${index}`} />
              <label htmlFor={`filter-${index}`}>{`Filter ${index + 1}`}</label>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  )
}
