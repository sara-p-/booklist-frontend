'use client'

import { useBookListContext } from './useBookListContext'
import { sortBookList, orderBookList, filterBookList } from '@/lib/filtering'
import { useFilterValuesContext } from './useFilterValuesContext'
import { useEffect, useState } from 'react'

export function useFilteredBooks() {
  const { bookList } = useBookListContext()
  const { filterValues } = useFilterValuesContext()
  const [newBooks, setNewBooks] = useState(bookList)

  useEffect(() => {
    const filteredBooks = filterBookList(bookList, filterValues)
    const sortedBooks = sortBookList(filteredBooks, filterValues.sort)
    const orderedBooks = orderBookList(sortedBooks, filterValues.order)
    setNewBooks(orderedBooks)
    // console.log(bookList)
  }, [filterValues, bookList])

  return newBooks
}
