import styles from './page.module.css'
import Image from 'next/image'

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const data = await fetch(
    `https://readthatbooklist.com/wp-json/booklist/v1/book?slug=${slug}`
  )
  const book = await data.json()
  console.log(book)

  return (
    <div className={styles.container}>
      <h1>Book Page: {book.title}</h1>
      <p>{book.author[0].name}</p>
    </div>
  )
}
