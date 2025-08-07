import styles from './page.module.css'
import Image from 'next/image'

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  try {
    const data = await fetch(
      // `https://readthatbooklist.com/wp-json/booklist/v1/book?slug=${slug}`
      `http://booklistwp.local/wp-json/booklist/v1/book?slug=${slug}`
    )

    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`)
    }

    const book = await data.json()
    console.log(book)

    return (
      <div className={styles.container}>
        <h1>Book Page: {book.title}</h1>
        <p>{book.author[0].name}</p>
      </div>
    )
  } catch (error) {
    console.error('Error fetching book data:', error)

    return (
      <div className={styles.container}>
        <h1>Error Loading Book</h1>
        <p>
          Sorry, we couldn&apos;t load the book information. Please try again
          later.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <details>
            <summary>Error Details (Development Only)</summary>
            <pre>
              {error instanceof Error ? error.message : 'Unknown error'}
            </pre>
          </details>
        )}
      </div>
    )
  }
}
