import { BookType } from '@/types/bookType'
import styles from './BookGrid.module.css'
import Link from 'next/link'
import Image from 'next/image'

interface BookGridProps {
  books: BookType[]
}

export default function BookGrid({ books }: BookGridProps) {
  return (
    <ul className={styles.bookList}>
      {books.map((book: BookType) => (
        <li className={styles.bookItem} key={book.bookId}>
          <Link href={`/book/${book.slug}`} className={styles.bookLink}>
            <Image
              src={book.image}
              alt={`Book cover of ${book.title}`}
              fill={true}
              sizes='208px, 310px'
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
