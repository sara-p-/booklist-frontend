'use client'

import styles from './page.module.css'
import FiltersSection from '@/components/layout/FiltersSection/FiltersSection'
import { useBookListContext } from '@/hooks/useBookListContext'
import Books from '@/components/layout/Books/Books'

export default function Home() {
  const { bookList } = useBookListContext()

  return (
    <div className={styles.container}>
      <FiltersSection />
      {bookList.length > 0 && <Books />}
    </div>
  )
}
