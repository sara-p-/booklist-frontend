'use client'

import { useEffect, useState } from 'react'
import { useBookListContext } from './useBookListContext'
import parse from 'html-react-parser'
import { BookType } from '@/types/bookType'

export default function useParsedBookList() {
  const { bookList } = useBookListContext()
  const [parsedBookList, setParsedBookList] = useState<BookType[] | null>(null)

  useEffect(() => {
    if (!bookList) return

    setParsedBookList(
      bookList.map((book) => ({
        ...book,
        title: parse(book.title) as string,
        series: book.series.map((series) => ({
          name: parse(series.name) as string,
          id: series.id,
          slug: series.slug,
        })),
      }))
    )
  }, [bookList])

  return parsedBookList
}
