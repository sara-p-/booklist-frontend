import styles from './BookInfo.module.css'
import Image from 'next/image'
import { BookType } from '@/types/bookType'
import { convertStringToDate } from '@/lib/utils'
import parse from 'html-react-parser'

export default function BookInfo({ book }: { book: BookType }) {
  const bookTitle = parse(book.title) as string
  const bookSeries = parse(book.series[0].name) as string

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={book.image}
          alt={bookTitle}
          fill={true}
          sizes='311px, 467px'
        />
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{bookTitle}</h1>
          <h2 className={styles.author}>{book.authors[0].name}</h2>
        </div>
        <ul className={styles.list}>
          <li className={styles.item}>
            <p>
              <span className={`${styles.label} h4`}>series:</span> {bookSeries}
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
