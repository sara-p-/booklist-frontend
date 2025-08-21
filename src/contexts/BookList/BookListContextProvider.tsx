'use client'

import { useMemo, useState } from 'react'
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

  const contextValue = useMemo(() => {
    return {
      bookList,
      setBookList,
    }
  }, [bookList])

  return (
    <BookListContext.Provider value={contextValue}>
      {children}
    </BookListContext.Provider>
  )
}
