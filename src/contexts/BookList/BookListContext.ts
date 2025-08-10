'use client'

import { createContext } from 'react'
import { BookType } from '@/types/bookType'

export interface BookListContextType {
  bookList: BookType[]
  setBookList: (bookList: BookType[]) => void
}

export const BookListContext = createContext<BookListContextType | null>(null)
