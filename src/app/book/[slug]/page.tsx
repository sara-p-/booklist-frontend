import parse from 'html-react-parser'
import { fetchData } from '@/lib/fetch'
import { BookType, BookItem } from '@/types/bookType'
import BookPage from '@/components/features/SingleBook/BookPage/BookPage'

export default async function BookPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const book = await fetchData(
    `https://readthatbooklist.com/wp-json/booklist/v1/book?slug=${slug}`
  )

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
