import { BookType } from '@/types/bookType'
import { createContext } from 'react'

export interface BookDataContextType {
  data: BookType[]
  setData: (data: BookType[]) => void
}

// Create the context with a default value (can be null initially, but then handle null checks)
export const BookDataContext = createContext<BookDataContextType | null>(null)
