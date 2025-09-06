'use client'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import styles from './MobileMenuButton.module.css'
import { VisibleFilterType } from '@/types/filterType'
import { useExcludeValuesContext } from '@/hooks/useExcludeValuesContext'
import useMobileFilterStateContext from '@/hooks/useMobileFilterStateContext'

type MobileMenuButtonProps = {
  filterName: VisibleFilterType
}

export default function MobileMenuButton({
  filterName,
}: MobileMenuButtonProps) {
  const { mobileFilterState, setMobileFilterState } =
    useMobileFilterStateContext()

  function handleClick() {
    const newMobileFilterState = { ...mobileFilterState }
    setMobileFilterState({ ...newMobileFilterState, [filterName]: true })
  }

  return (
    <button className={styles.mobileMenuButton} onClick={handleClick}>
      <span className={styles.filterName}>{filterName}</span>
      <FilterValue filterName={filterName} />
    </button>
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

  if (filterName === 'sort' || filterName === 'order') {
    return <span className={styles.filterValue}>{filterValue}</span>
  }

  if (filterName === 'rating' || filterName === 'spice') {
    return <span className={styles.filterValue}>{filterValue}</span>
  }

  return (
    <span className={styles.filterValue}>
      {excludedCount === 0 && filterCount}
      {excludedCount > 0 && `-${excludedCount}`} selected
    </span>
  )
}
