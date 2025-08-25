'use client'

import Link from 'next/link'
import SidebarSection from '../SidebarSection/SidebarSection'
import styles from './RelatedBooks.module.css'
import { useBookListContext } from '@/hooks/useBookListContext'
import Image from 'next/image'

export default function RelatedBooks({ slug }: { slug: string }) {
  const { bookList } = useBookListContext()
  const book = bookList.find((book) => book.slug === slug)
  const bookSeries = book?.series[0].name
  const allSeriesBooks = bookList.filter(
    (book) => book.series[0].name === bookSeries
  )
  const relatedBooks = allSeriesBooks.filter((book) => book.slug !== slug)

  if (!book) return null

  if (!bookSeries) return null

  if (relatedBooks.length === 0) return null

  console.log('relatedBooks:', relatedBooks)

  const relatedBooksList = relatedBooks.sort((a, b) =>
    a.bookNumber.localeCompare(b.bookNumber, undefined, { numeric: true })
  )

  return (
    <SidebarSection title='related books'>
      {relatedBooksList.map((book) => (
        <li className={styles.item} key={book.bookId}>
          <Link className={styles.imageContainer} href={`/book/${book.slug}`}>
            <Image src={book.image} alt={book.title} fill sizes='50px, 74px' />
          </Link>
          <div className={styles.info}>
            <Link href={`/book/${book.slug}`}>{book.title}</Link>
            <p className={styles.bookNumber}>book #: {book.bookNumber}</p>
          </div>
        </li>
      ))}
    </SidebarSection>
  )
}
