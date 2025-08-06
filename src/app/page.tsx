import styles from './page.module.css'
import { BookType } from '@/types/bookType'
import Image from 'next/image'

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
            {/* <h2>{book.title}</h2> */}
            <Image
              src={book.image}
              alt={`Book cover of ${book.title}`}
              fill={true}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
