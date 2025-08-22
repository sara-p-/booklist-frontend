'use client'

import { useBookListContext } from './useBookListContext'
import { sortBookList, filterBookList, orderBookList } from '@/lib/filtering'
import { useFilterValuesContext } from './useFilterValuesContext'
import { useEffect, useState } from 'react'
import { BookType } from '@/types/bookType'
import { searchBookList } from '@/lib/searching'

export function useFilteredBooks() {
  const { bookList } = useBookListContext()
  const { filterValues } = useFilterValuesContext()
  const [newBooks, setNewBooks] = useState<BookType[]>(bookList)

  useEffect(() => {
    const filteredBooks = filterBookList(bookList, filterValues)
    const searchedBooks = searchBookList(filteredBooks, filterValues.search)
    const sortedBooks = sortBookList(searchedBooks, filterValues.sort)
    const orderedBooks = orderBookList(sortedBooks, filterValues.order)
    setNewBooks(orderedBooks)
  }, [filterValues, bookList])

  return newBooks
}
