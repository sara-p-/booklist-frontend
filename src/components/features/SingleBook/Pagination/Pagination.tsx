'use client'

import Link from 'next/link'
import styles from './Pagination.module.css'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'

export default function Pagination({ slug }: { slug: string }) {
  const filteredBooks = useFilteredBooks()
  const currentBookIndex = filteredBooks.findIndex((book) => book.slug === slug)
  const previousBook = filteredBooks[currentBookIndex - 1].slug
  const nextBook = filteredBooks[currentBookIndex + 1].slug

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Link className={styles.button} href={`/book/${previousBook}`}>
          <FontAwesomeIcon icon={faChevronLeft} size='sm' /> {'previous book'}
        </Link>
        <Link className={styles.button} href={`/`}>
          {'all books'}
        </Link>
        <Link className={styles.button} href={`/book/${nextBook}`}>
          {'next book'} <FontAwesomeIcon icon={faChevronRight} size='sm' />
        </Link>
      </div>
    </div>
  )
}
