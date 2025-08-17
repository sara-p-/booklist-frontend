import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Filter.module.css'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import useEscapeKey from '@/hooks/useEscapeKey'
import useClickOutside from '@/hooks/useClickOutside'
import { FilterArrayType } from '@/types/filterType'
import { areArraysEqual } from '@/lib/utils'
import useFilterStateContext from '@/hooks/useFilterStateContext'

type FilterProps = {
  children?: React.ReactNode
  buttonText: FilterArrayType | 'sort' | 'rating' | 'spice'
}

export default function Filter({ children, buttonText }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { filterValues } = useFilterValuesContext()
  // Context that defines whether the filter is open or not
  const { filterState, setFilterState } = useFilterStateContext()
  const filterRef = useRef<HTMLDivElement>(null)
  // Close dropdown when escape key is pressed
  useEscapeKey(() => setIsOpen(false))
  // Close dropdown when clicking outside of dropdown
  function handleClickOutside() {
    setIsOpen(false)
  }
  useClickOutside({ callback: handleClickOutside, elementRef: filterRef })
  // get the 'rating' and 'spice' filter values as numbers
  const ratingValues = filterValues.rating.map((value) => {
    return parseInt(value)
  })
  const spiceValues = filterValues.spice.map((value) => {
    return parseInt(value)
  })

  const contentClasses = filterState[buttonText]
    ? `${styles.content} ${styles.open}`
    : styles.content

  // figuring out the button classes - when the filter has a value other than the default, add the 'selected' class
  let theButtonClasses = styles.button
  if (buttonText === 'rating' && !areArraysEqual(ratingValues, [0, 10])) {
    theButtonClasses = `${styles.button} ${styles.selected}`
  }
  if (buttonText === 'spice' && !areArraysEqual(spiceValues, [0, 5])) {
    theButtonClasses = `${styles.button} ${styles.selected}`
  }
  if (
    buttonText !== 'rating' &&
    buttonText !== 'spice' &&
    filterValues[buttonText].length > 0
  ) {
    theButtonClasses = `${styles.button} ${styles.selected}`
  }

  const containerClasses =
    buttonText === 'sort'
      ? `${styles.container} ${styles.sort}`
      : styles.container

  function handleButtonClick() {
    setFilterState({
      ...filterState,
      [buttonText]: !filterState[buttonText],
    })
  }

  return (
    <div className={containerClasses} ref={filterRef}>
      <button className={theButtonClasses} onClick={handleButtonClick}>
        <SelectionText buttonText={buttonText as FilterArrayType} />
        {filterState[buttonText] ? (
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

  if (buttonText === 'sort') {
    return (
      <span className={styles.buttonText}>
        {`${buttonText}: ${filterValues.sort}`}
      </span>
    )
  } else if (buttonText === 'rating' || buttonText === 'spice') {
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
