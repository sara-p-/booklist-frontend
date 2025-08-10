'use client'

import { BookListContext } from '@/contexts/BookList/BookListContext'
import { useContext } from 'react'

export const useBookListContext = () => {
  const context = useContext(BookListContext)
  if (!context) {
    throw new Error(
      'useBookListContext must be used within a BookListContextProvider'
    )
  }
  return context
}
