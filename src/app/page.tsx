'use client'

import styles from './page.module.css'
import FiltersSection from '@/components/layout/FiltersSection/FiltersSection'
import Books from '@/components/layout/Books/Books'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'

export default function Home() {
  const filteredBooks = useFilteredBooks()

  return (
    <div className={styles.container}>
      <FiltersSection />
      <div className={styles.bookListContainer}>
        {filteredBooks.length > 0 && <Books />}
      </div>
    </div>
  )
}
