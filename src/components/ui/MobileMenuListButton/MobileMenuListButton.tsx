'use client'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import styles from './MobileMenuListButton.module.css'
import { VisibleFilterType } from '@/types/filterType'
import { useExcludeValuesContext } from '@/hooks/useExcludeValuesContext'
import useMobileFilterStateContext from '@/hooks/useMobileFilterStateContext'
import { getOrderLabel } from '@/lib/filtering-utils'

type MobileMenuListButtonProps = {
  filterName: VisibleFilterType
}

export default function MobileMenuListButton({
  filterName,
}: MobileMenuListButtonProps) {
  const { mobileFilterState, setMobileFilterState } =
    useMobileFilterStateContext()

  function handleClick() {
    const newMobileFilterState = { ...mobileFilterState }
    setMobileFilterState({ ...newMobileFilterState, [filterName]: true })
  }

  return (
    <li>
      <button className={styles.mobileMenuButton} onClick={handleClick}>
        <span className={styles.filterName}>{filterName}</span>
        <FilterValue filterName={filterName} />
      </button>
    </li>
  )
}

function FilterValue({ filterName }: { filterName: VisibleFilterType }) {
  const { filterValues } = useFilterValuesContext()
  const { excludeValues } = useExcludeValuesContext()
  const filterValue = filterValues[filterName]
  const filterCount =
    filterValues[filterName].length > 0 ? filterValues[filterName].length : 0

  let excludedCount = 0
  if (
    filterName === 'authors' ||
    filterName === 'series' ||
    filterName === 'genres' ||
    filterName === 'tropes' ||
    filterName === 'creatures' ||
    filterName === 'booktags'
  ) {
    excludedCount =
      excludeValues[filterName].length > 0
        ? excludeValues[filterName].length
        : 0
  }

  // If this is the 'order' filter, change the label based on the 'sort' filter value
  // All of this is to make the order options make more sense to the user
  const orderLabelAsc = getOrderLabel('asc', filterValues.sort)
  const orderLabelDesc = getOrderLabel('desc', filterValues.sort)

  if (filterName === 'sort') {
    return <span className={styles.filterValue}>{filterValue}</span>
  }
  if (filterName === 'order') {
    return (
      <span className={styles.filterValue}>
        {filterValue === 'asc' ? orderLabelAsc : orderLabelDesc}
      </span>
    )
  }
  if (filterName === 'rating') {
    return (
      <span
        className={styles.filterValue}
      >{`${filterValue[0]}/5 - ${filterValue[1]}/5`}</span>
    )
  }
  if (filterName === 'spice') {
    return (
      <span
        className={styles.filterValue}
      >{`${filterValue[0]}/5 - ${filterValue[1]}/5`}</span>
    )
  }

  return (
    <span className={styles.filterValue}>
      {excludedCount === 0 && filterCount}
      {excludedCount > 0 && `-${excludedCount}`} selected
    </span>
  )
}
