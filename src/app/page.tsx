import styles from './page.module.css'
import { BookType } from '@/types/bookType'
import Image from 'next/image'
import Link from 'next/link'
import { BookDataProvider } from '@/contexts/BookData/BookDataContextProvider'

export default async function Home() {
  const data = await fetch(
    `https://readthatbooklist.com/wp-json/booklist/v1/books`
  )
  const books = await data.json()

  const booklist = books.reverse()

  return (
    <div className={styles.container}>
      <ul className={styles.bookList}>
        {booklist.map((book: BookType) => (
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
    </div>
  )
}
