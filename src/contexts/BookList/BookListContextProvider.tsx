'use client'

import { useMemo, useState } from 'react'
import { BookListContext } from './BookListContext'
import { BookType } from '@/types/bookType'
import parse from 'html-react-parser'

export default function BookListContextProvider({
  children,
  initialBookList,
}: {
  children: React.ReactNode
  initialBookList: BookType[]
}) {
  const [bookList, setBookList] = useState<BookType[]>(initialBookList)

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

  const contextValue = useMemo(() => {
    return {
      bookList: parsedBookList,
      setBookList,
    }
  }, [parsedBookList])

  return (
    <BookListContext.Provider value={contextValue}>
      {children}
    </BookListContext.Provider>
  )
}
