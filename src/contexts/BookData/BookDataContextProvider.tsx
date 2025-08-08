'use client'

import React, { useState, ReactNode } from 'react'
import { BookType } from '@/types/bookType'
import {
  BookDataContext,
  BookDataContextType,
} from '@/contexts/BookData/BookDataContext'

interface BookDataProviderProps {
  children: ReactNode
  initialData: BookType[]
}

export const BookDataProvider: React.FC<BookDataProviderProps> = ({
  children,
  initialData,
}) => {
  const [data, setData] = useState<BookType[]>(initialData)

  const contextValue: BookDataContextType = { data, setData }

  return (
    <BookDataContext.Provider value={contextValue}>
      {children}
    </BookDataContext.Provider>
  )
}
