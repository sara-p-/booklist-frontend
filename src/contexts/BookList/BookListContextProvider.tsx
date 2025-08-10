'use client'

import { useState } from 'react'
import { BookListContext } from './BookListContext'
import { BookType } from '@/types/bookType'

export default function BookListContextProvider({
  children,
  initialBookList,
}: {
  children: React.ReactNode
  initialBookList: BookType[]
}) {
  const [bookList, setBookList] = useState<BookType[]>(initialBookList)

  return (
    <BookListContext.Provider
      value={{
        bookList,
        setBookList,
      }}
    >
      {children}
    </BookListContext.Provider>
  )
}
