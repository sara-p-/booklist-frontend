'use client'

import { useBookListContext } from './useBookListContext'
import { sortBookList, filterBookList, orderBookList } from '@/lib/filtering'
import { useFilterValuesContext } from './useFilterValuesContext'
import { useEffect, useMemo, useState } from 'react'
import { BookType } from '@/types/bookType'
import parse from 'html-react-parser'
import { useExcludeValuesContext } from './useExcludeValuesContext'
// import { searchBookList } from '@/lib/searching'

export function useFilteredBooks() {
  const { bookList } = useBookListContext()
  const { filterValues } = useFilterValuesContext()
  const { excludeValues } = useExcludeValuesContext()
  const [newBooks, setNewBooks] = useState<BookType[] | null>(null)

  // Parsing the bookList to remove the HTML tags from the title and series name.
  const parsedBookList = useMemo(() => {
    if (!bookList) return []
    return bookList.map((book) => ({
      ...book,
      title: parse(book.title) as string,
      series: book.series.map((series) => ({
        name: parse(series.name) as string,
        id: series.id,
        slug: series.slug,
      })),
    }))
  }, [bookList])

  useEffect(() => {
    const filteredBooks = filterBookList(parsedBookList, filterValues)
    const sortedBooks = sortBookList(filteredBooks, filterValues.sort)
    const orderedBooks = orderBookList(sortedBooks, filterValues.order)
    setNewBooks(orderedBooks)
  }, [filterValues, parsedBookList])

  return newBooks
}
