'use client'

import MobileMenuListButton from '@/components/ui/MobileMenuListButton/MobileMenuListButton'
import styles from './MobileMenuOptionsList.module.css'
import { MOBILE_FILTERS } from '@/lib/globals'
import MobileMenuButton from '@/components/ui/MobileMenuButton/MobileMenuButton'
import useMobileFilterStateContext from '@/hooks/useMobileFilterStateContext'
import { useEffect, useRef } from 'react'

export default function MobileMenuOptionsList() {
  const { mobileFilterState } = useMobileFilterStateContext()
  const listRef = useRef<HTMLUListElement>(null)

  // Make sure the list is scrolled to the top when the filters are opened
  useEffect(() => {
    if (mobileFilterState.filters) {
      listRef.current?.scrollTo(0, 0)
    }
  }, [mobileFilterState.filters])

  return (
    <>
      <MobileMenuButton type='clearFilters' />
      <ul className={styles.list} ref={listRef}>
        {MOBILE_FILTERS.map((filter) => (
          <MobileMenuListButton filterName={filter} key={filter} />
        ))}
      </ul>
    </>
  )
}
