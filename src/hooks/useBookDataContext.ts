'use client'

import { BookDataContext } from '@/contexts/BookData/BookDataContext'
import { useContext } from 'react'

export const useBookDataContext = () => {
  const context = useContext(BookDataContext)
  if (!context) {
    throw new Error('useBookDataContext must be used within a BookDataProvider')
  }
  return context
}
