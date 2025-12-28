import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Filter.module.css'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import React, { useRef, useCallback } from 'react'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import useEscapeKey from '@/hooks/useEscapeKey'
import useClickOutside from '@/hooks/useClickOutside'
import {
  FilterArrayType,
  FilterType,
  VisibleFilterType,
} from '@/types/filterType'
import { areArraysEqual } from '@/lib/utils'
import useFilterStateContext from '@/hooks/useFilterStateContext'
import { getOrderLabel } from '@/lib/filtering-utils'
import { useExcludeValuesContext } from '@/hooks/useExcludeValuesContext'
import useSetFilterPosition from '@/hooks/useSetFilterPosition'

type FilterProps = {
  children?: React.ReactNode
  buttonText: VisibleFilterType
}
function Filter({ children, buttonText }: FilterProps) {
  // Context that defines the filter values
  const { filterValues } = useFilterValuesContext()
  // Context that defines whether the filter is open or not
  const { filterState, setFilterState } = useFilterStateContext()
  // Ref to the filter element
  const filterRef = useRef<HTMLDivElement>(null)
  // Custom hook to define whether the filter is too close to the side of the screen, and change the class accordingly
  const positionFromRight = useSetFilterPosition(filterRef)

  /* HANDLERS */
  // Close the filter dropdown for a variety of reasons
  const handleCloseFilter = useCallback(
    (filter: VisibleFilterType) => {
      const newFilterState = { ...filterState }
      setFilterState({ ...newFilterState, [filter]: false })
    },
    [filterState, setFilterState]
  )

  // handle the filter button click
  function handleButtonClick() {
    const newFilterState = { ...filterState }
    setFilterState({
      ...newFilterState,
      [buttonText]: !newFilterState[buttonText],
    })
  }

  // Create a stable callback for useClickOutside to close the filter
  const handleClickOutside = useCallback(() => {
    handleCloseFilter(buttonText)
  }, [handleCloseFilter, buttonText])

  // Close filter when clicking outside of filter
  useClickOutside({
    callback: handleClickOutside,
    elementRef: filterRef,
    buttonText,
  })

  // Close filter when escape key is pressed
  useEscapeKey({
    callback: handleClickOutside,
    buttonText,
  })

  /* DYNAMIC CSS CLASSES */
  // the content classes are based on whether the filter is open or not
  const contentClasses = filterState[buttonText]
    ? `${styles.content} ${styles.open}`
    : styles.content

  // change the button classes based on the filter values
  const buttonClasses = getFilterButtonClasses(buttonText, filterValues)
  // get the container classes based on the button text
  const containerClasses =
    buttonText === 'sort' || buttonText === 'order'
      ? `${styles.container} ${styles.radio}`
      : styles.container

  return (
    <div className={containerClasses} ref={filterRef}>
      <button className={buttonClasses} onClick={handleButtonClick}>
        <SelectionText buttonText={buttonText as FilterArrayType} />
        {filterState[buttonText] ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </button>
      <div
        className={`${contentClasses} ${
          positionFromRight ? styles.positionFromRight : ''
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default Filter

// SELECTION TEXT PROPS/COMPONENT
type SelectionTextProps = {
  buttonText: VisibleFilterType
}

const SelectionText = React.memo(function SelectionText({
  buttonText,
}: SelectionTextProps) {
  const { filterValues } = useFilterValuesContext()
  const { excludeValues } = useExcludeValuesContext()
  const orderLabel = getOrderLabel(filterValues.order, filterValues.sort)

  if (buttonText === 'sort') {
    return (
      <span className={styles.buttonTextContainer}>
        <span className={styles.buttonTextLabel}>{`${buttonText}: `}</span>
        <span className={styles.buttonTextValue}>{filterValues.sort}</span>
      </span>
    )
  } else if (buttonText === 'order') {
    return (
      <span className={styles.buttonTextContainer}>
        <span className={styles.buttonTextLabel}>{`${buttonText}: `}</span>
        <span className={styles.buttonTextValue}>{orderLabel}</span>
      </span>
    )
  } else if (buttonText === 'rating' || buttonText === 'spice') {
    return <span className={styles.buttonText}>{buttonText}</span>
  } else {
    return (
      <span className={styles.buttonText}>
        {buttonText}{' '}
        {/* if the exclude values are not empty, show the exclude count */}
        {excludeValues[buttonText].length > 0 ? (
          <span className={styles.buttonCount}>
            (-{excludeValues[buttonText].length})
          </span>
        ) : filterValues[buttonText].length > 0 ? (
          <span className={styles.buttonCount}>
            ({filterValues[buttonText].length})
          </span>
        ) : null}
      </span>
    )
  }
})

/**
 * Accepts a the type of button (buttonText) and the filter values, and returns the appropriate classes for the filter button
 *
 * This is used in the Filter component to determine the classes for the filter button.
 *
 * @param {string} buttonText - The button text.
 * @param {FilterType} filterValues - The filter values.
 * @returns {string} The button classes.
 */
function getFilterButtonClasses(
  buttonText: VisibleFilterType,
  filterValues: FilterType
) {
  let theButtonClasses = styles.button
  // get the 'rating' and 'spice' filter values as numbers
  const ratingValues = filterValues.rating.map((value) => {
    return parseInt(value)
  })
  const spiceValues = filterValues.spice.map((value) => {
    return parseInt(value)
  })
  // if the button text is 'rating' and the rating values are not the default, add the 'selected' class
  if (buttonText === 'rating' && !areArraysEqual(ratingValues, [0, 5])) {
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
  return theButtonClasses
}
