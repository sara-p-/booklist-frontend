import React, { useState, ReactNode } from 'react'
import { BookType } from '@/types/bookType'
import {
  BookDataContext,
  BookDataContextType,
} from '@/contexts/BookData/BookDataContext'

interface BookDataProviderProps {
  children: ReactNode
}

export const BookDataProvider: React.FC<BookDataProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<BookType[]>([])

  const contextValue: BookDataContextType = { data, setData }

  return (
    <BookDataContext.Provider value={contextValue}>
      {children}
    </BookDataContext.Provider>
  )
}
