import styles from './page.module.css'
import { BookType } from '@/types/bookType'

export default async function Home() {
  let allBooks: BookType[] = []
  let page = 1
  let totalPages = 1

  while (page <= totalPages) {
    const data = await fetch(
      `https://readthatbooklist.com/wp-json/wp/v2/book?posts_per_page=100&page=${page}`
    )
    const books = await data.json()
    totalPages = data.headers.get('X-WP-TotalPages')
    allBooks = [...allBooks, ...books]
    page++
  }

  return (
    <ul>
      {allBooks.map((book: BookType) => (
        <li key={book.id}>{book.title.rendered}</li>
      ))}
    </ul>
  )
}
