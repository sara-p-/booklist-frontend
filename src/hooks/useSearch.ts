import { useEffect, useState } from 'react'
import { useFilteredBooks } from './useFilteredBooks'
import { useFilterValuesContext } from './useFilterValuesContext'
import { uniqueArray } from '@/lib/utils'

export function useSearch() {
  const bookList = useFilteredBooks()
  const { filterValues } = useFilterValuesContext()

  const [searchResults, setSearchResults] = useState<{
    books: { slug: string; title: string; id: number }[]
    authors: { name: string; id: number }[]
    series: { name: string; id: number }[]
  }>({
    books: [],
    authors: [],
    series: [],
  })

  useEffect(() => {
    if (filterValues.search === '') {
      setSearchResults({
        books: [],
        authors: [],
        series: [],
      })
      return
    }
    // search through titles
    const bookResults: { slug: string; title: string; id: number }[] = bookList
      .filter((book) =>
        book.title.toLowerCase().includes(filterValues.search.toLowerCase())
      )
      .map((book) => {
        return {
          slug: book.slug,
          title: book.title,
          id: book.bookId,
        }
      })

    // search through authors
    const authorResults: { name: string; id: number }[] = bookList
      .filter((book) =>
        book.authors[0]?.name
          .toLowerCase()
          .includes(filterValues.search.toLowerCase())
      )
      .map((book) => {
        return {
          name: book.authors[0]?.name,
          id: book.bookId,
        }
      })

    // search through series
    const seriesResults: { name: string; id: number }[] = bookList
      .filter((book) =>
        book.series[0]?.name
          .toLowerCase()
          .includes(filterValues.search.toLowerCase())
      )
      .map((book) => {
        return {
          name: book.series[0]?.name,
          id: book.bookId,
        }
      })

    const uniqueBookResults = uniqueArray(bookResults, 'slug')
    const uniqueAuthorResults = uniqueArray(authorResults, 'name')
    const uniqueSeriesResults = uniqueArray(seriesResults, 'name')

    setSearchResults({
      books: uniqueBookResults,
      authors: uniqueAuthorResults,
      series: uniqueSeriesResults,
    })
  }, [filterValues.search, bookList])

  return searchResults
}
