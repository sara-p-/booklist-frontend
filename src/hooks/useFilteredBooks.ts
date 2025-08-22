'use client'

import { useBookListContext } from './useBookListContext'
import { sortBookList, filterBookList, orderBookList } from '@/lib/filtering'
import { useFilterValuesContext } from './useFilterValuesContext'
import { useEffect, useState } from 'react'
import { BookType } from '@/types/bookType'

export function useFilteredBooks() {
  const { bookList } = useBookListContext()
  const { filterValues } = useFilterValuesContext()
  const [newBooks, setNewBooks] = useState<BookType[]>(bookList)

  useEffect(() => {
    const filteredBooks = filterBookList(bookList, filterValues)
    const sortedBooks = sortBookList(filteredBooks, filterValues.sort)
    const orderedBooks = orderBookList(sortedBooks, filterValues.order)
    setNewBooks(orderedBooks)
    // console.log(bookList)
  }, [filterValues, bookList])

  return newBooks
}
