'use client'
import styles from './BookInfo.module.css'
import Image from 'next/image'
import { BookType } from '@/types/bookType'
import { convertStringToDate } from '@/lib/utils'
import parse from 'html-react-parser'
import Link from 'next/link'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import { DEFAULT_FILTER_VALUES } from '@/lib/globals'

export default function BookInfo({ book }: { book: BookType }) {
  const { filterValues, setFilterValues } = useFilterValuesContext()
  // const bookTitle = parse(book.title) as string
  // const bookSeries = parse(book.series[0].name) as string

  function handleSeriesClick() {
    setFilterValues({
      ...filterValues,
      ...DEFAULT_FILTER_VALUES,
      series: [book.series[0].name],
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={book.image}
          alt={`Book cover of ${book.title}`}
          fill={true}
          sizes='400px, 600px'
        />
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{book.title}</h1>
          <h2 className={styles.author}>{book.authors[0].name}</h2>
        </div>
        <ul className={styles.list}>
          <li className={styles.item}>
            <p>
              <span className={`${styles.label} h4`}>series: </span>
              <Link onNavigate={handleSeriesClick} href='/'>
                {book.series[0].name}
              </Link>
            </p>
          </li>
          <li className={styles.item}>
            <p>
              <span className={`${styles.label} h4`}>book number:</span>{' '}
              {book.bookNumber}
            </p>
          </li>
          <li className={styles.item}>
            <p>
              <span className={`${styles.label} h4`}>published:</span>{' '}
              {convertStringToDate(book.publishDate)}
            </p>
          </li>
          <li className={styles.item}>
            <p>
              <span className={`${styles.label} h4`}>length:</span>{' '}
              {book.length} pages
            </p>
          </li>
          <li className={styles.item}>
            <p>
              <span className={`${styles.label} h4`}>rating:</span>{' '}
              {book.rating}/10
            </p>
          </li>
          <li className={styles.item}>
            <p>
              <span className={`${styles.label} h4`}>spice:</span> {book.spice}
              /5
            </p>
          </li>
          <li className={styles.item}>
            <p>
              <span className={`${styles.label} h4`}>amount completed:</span>{' '}
              {book.amountCompleted}%
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}
