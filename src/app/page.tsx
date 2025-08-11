'use client'

import BookGrid from '@/components/layout/BookGrid/BookGrid'
import styles from './page.module.css'
import FiltersSection from '@/components/layout/FiltersSection/FiltersSection'
import { useBookListContext } from '@/hooks/useBookListContext'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'

export default function Home() {
  const { bookList } = useBookListContext()
  const books = [...bookList].reverse()

  return (
    <div className={styles.container}>
      <FiltersSection />
      {books.length > 0 && <BookGrid books={books} />}
    </div>
  )
}
