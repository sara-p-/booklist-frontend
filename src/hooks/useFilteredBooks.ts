'use client'

import { useBookListContext } from './useBookListContext'
import { sortBookList, orderBookList } from '@/lib/filtering'
import { useFilterValuesContext } from './useFilterValuesContext'
import { useEffect, useState } from 'react'

export function useFilteredBooks() {
  const { bookList } = useBookListContext()
  const { filterValues } = useFilterValuesContext()
  const [filteredBooks, setFilteredBooks] = useState(bookList)

  useEffect(() => {
    const sortedBooks = sortBookList(bookList, filterValues.sort)
    const orderedBooks = orderBookList(sortedBooks, filterValues.order)
    setFilteredBooks(orderedBooks)
  }, [filterValues, bookList])

  return filteredBooks
}
