import parse from 'html-react-parser'
import { fetchData } from '@/lib/fetch'
import { BookType, BookItem } from '@/types/bookType'
import BookPage from '@/components/features/SingleBook/BookPage/BookPage'
import { API_URL } from '@/lib/globals'

export default async function BookPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const bookResponse = await fetchData(`${API_URL}/book?slug=${slug}`)

  const book = bookResponse.data.items

  // Parsing the book data to remove the HTML from the title and series name.
  const parsedBook: BookType = {
    ...book,
    title: parse(book.title) as string,
    series: book.series.map((series: BookItem) => ({
      name: parse(series.name) as string,
      id: series.id,
      slug: series.slug,
    })),
    description: parse(book.description) as string,
    notes: parse(book.notes) as string,
    smell: parse(book.smell) as string,
  }

  return <BookPage parsedBook={parsedBook} slug={slug} />
}
