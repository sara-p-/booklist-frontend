'use client'

import Searchbar from '@/components/ui/Form/Searchbar/Searchbar'
import styles from './MobileSearchBarContainer.module.css'
import BookCountSection from '../BookCountSection/BookCountSection'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'

export default function MobileSearchBarContainer() {
  const { filterValues } = useFilterValuesContext()

  return (
    <div className={styles.container}>
      <div className={styles.searchbarContainer}>
        <Searchbar mobile={true} />
      </div>
      {filterValues.search === '' && <BookCountSection />}
    </div>
  )
}
