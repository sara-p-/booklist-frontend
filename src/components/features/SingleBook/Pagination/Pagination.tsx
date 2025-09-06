'use client'

import Link from 'next/link'
import styles from './Pagination.module.css'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'
import { scrollToTop } from '@/lib/utils'

export default function Pagination({ slug }: { slug: string }) {
  const filteredBooks = useFilteredBooks()

  if (!filteredBooks) return null

  const currentBookIndex = filteredBooks.findIndex((book) => book.slug === slug)
  const previousBook =
    filteredBooks.length > 0 && currentBookIndex > 0
      ? filteredBooks[currentBookIndex - 1].slug
      : currentBookIndex === 0
      ? filteredBooks[filteredBooks.length - 1].slug
      : null
  const nextBook =
    filteredBooks.length > 0 && currentBookIndex < filteredBooks.length - 1
      ? filteredBooks[currentBookIndex + 1].slug
      : currentBookIndex === filteredBooks.length - 1
      ? filteredBooks[0].slug
      : null

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <div className={styles.buttonContainer}>
          {previousBook && (
            <Link
              onNavigate={scrollToTop}
              className={styles.button}
              href={`/book/${previousBook}`}
            >
              <FontAwesomeIcon icon={faArrowLeft} size='sm' /> {'prev'}
            </Link>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <Link onNavigate={scrollToTop} className={styles.button} href={`/`}>
            {'all books'}
          </Link>
        </div>
        <div className={styles.buttonContainer}>
          {nextBook && (
            <Link
              onNavigate={scrollToTop}
              className={styles.button}
              href={`/book/${nextBook}`}
            >
              {'next'} <FontAwesomeIcon icon={faArrowRight} size='sm' />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
