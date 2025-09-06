'use client'
import styles from './MobileMenuCloseButton.module.css'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'

export default function MobileMenuCloseButton() {
  const filteredBooks = useFilteredBooks()

  if (!filteredBooks) return null

  return (
    <div className={styles.container}>
      <button className={styles.button}>
        View {filteredBooks.length} books
      </button>
    </div>
  )
}
