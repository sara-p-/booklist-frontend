'use client'

import BookGrid from '@/components/layout/BookGrid/BookGrid'
import styles from './page.module.css'
import { useBookDataContext } from '@/hooks/useBookDataContext'

export default function Home() {
  const { data } = useBookDataContext()

  return (
    <div className={styles.container}>
      <BookGrid books={data} />
    </div>
  )
}
