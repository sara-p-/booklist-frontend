import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Filter.module.css'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import useEscapeKey from '@/hooks/useEscapeKey'
import useClickOutside from '@/hooks/useClickOutside'
import { FilterArrayType } from '@/types/filterType'

type FilterProps = {
  children?: React.ReactNode
  buttonText: FilterArrayType | 'sort' | 'rating' | 'spice'
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

  const buttonClasses =
    isOpen || filterValues[buttonText].length > 0
      ? `${styles.button} ${styles.selected}`
      : styles.button

  const containerClasses =
    buttonText === 'sort'
      ? `${styles.container} ${styles.sort}`
      : styles.container

  return (
    <div className={containerClasses} ref={filterRef}>
      <button className={buttonClasses} onClick={() => setIsOpen(!isOpen)}>
        <SelectionText buttonText={buttonText as FilterArrayType} />
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

// SELECTION TEXT PROPS/COMPONENT
type SelectionTextProps = {
  buttonText: FilterArrayType | 'sort' | 'rating' | 'spice'
}

export function SelectionText({ buttonText }: SelectionTextProps) {
  const { filterValues } = useFilterValuesContext()
  const ratingValues = filterValues.rating.map((value) => {
    return `${value}/10`
  })
  const spiceValues = filterValues.spice.map((value) => {
    return `${value}/5`
  })

  if (buttonText === 'sort') {
    return (
      <span className={styles.buttonText}>
        {`${buttonText}: ${filterValues.sort}`}
      </span>
    )
  } else if (buttonText === 'rating') {
    return <span className={styles.buttonText}>{buttonText}</span>
  } else if (buttonText === 'spice') {
    return <span className={styles.buttonText}>{buttonText}</span>
  } else {
    return (
      <span className={styles.buttonText}>
        {`${buttonText} `}
        {filterValues[buttonText].length > 0 && (
          <span className={styles.buttonCount}>
            ({filterValues[buttonText].length})
          </span>
        )}
      </span>
    )
  }
}
