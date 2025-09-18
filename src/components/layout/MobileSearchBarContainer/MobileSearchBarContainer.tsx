'use client'

import Searchbar from '@/components/ui/Form/Searchbar/Searchbar'
import styles from './MobileSearchBarContainer.module.css'
import BookCountSection from '../BookCountSection/BookCountSection'

export default function MobileSearchBarContainer() {
  return (
    <div className={styles.container}>
      <div className={styles.searchbarContainer}>
        <Searchbar mobile={true} />
      </div>
      <BookCountSection />
    </div>
  )
}
