import { BookType } from '@/types/bookType'
import styles from './Books.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import Book from '@/components/features/Book/Book'
import React from 'react'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'
import {
  sortArrayGroupsForHeaders,
  sortArrayGroupsForHeadersByLength,
} from '@/lib/filtering-utils'

function BooksList() {
  const { filterValues } = useFilterValuesContext()
  const sortValue = filterValues.sort
  const filteredBooks = useFilteredBooks()

  const seriesList = sortArrayGroupsForHeaders(filteredBooks || [], 'series')
  const ratingList = sortArrayGroupsForHeaders(filteredBooks || [], 'rating')
  const spiceList = sortArrayGroupsForHeaders(filteredBooks || [], 'spice')
  const lengthList = sortArrayGroupsForHeadersByLength(filteredBooks || [])
  // console.log(lengthList)

  // // In List View, the books will be split up into subArrays based on the sort value
  if (sortValue === 'series') {
    return (
      <ul className={styles.bookList}>
        {seriesList.map((arrayOfBooks: BookType[]) => {
          const value = arrayOfBooks[0].series[0].name
          return (
            <li key={arrayOfBooks[0].bookId}>
              <h2 className={`${styles.groupName} h1`}>{value}</h2>
              <ul className={`${styles.bookList} ${styles.bookArrayList}`}>
                {arrayOfBooks.map((book: BookType, index: number) => (
                  <Book key={book.bookId} book={book} priority={index < 4} />
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }
  if (sortValue === 'rating') {
    return (
      <ul className={styles.bookList}>
        {ratingList.map((arrayOfBooks: BookType[]) => {
          const value = arrayOfBooks[0].rating
          return (
            <li key={arrayOfBooks[0].bookId}>
              <h2 className={`${styles.groupName} h1`}>{value}/10</h2>
              <ul className={`${styles.bookList} ${styles.bookArrayList}`}>
                {arrayOfBooks.map((book: BookType, index: number) => (
                  <Book key={book.bookId} book={book} priority={index < 4} />
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }
  if (sortValue === 'spice') {
    return (
      <ul className={styles.bookList}>
        {spiceList.map((arrayOfBooks: BookType[]) => {
          const value = arrayOfBooks[0].spice
          return (
            <li key={arrayOfBooks[0].bookId}>
              <h2 className={`${styles.groupName} h1`}>{value}/5</h2>
              <ul className={`${styles.bookList} ${styles.bookArrayList}`}>
                {arrayOfBooks.map((book: BookType, index: number) => (
                  <Book key={book.bookId} book={book} priority={index < 4} />
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <ul className={styles.bookList}>
      {filteredBooks &&
        filteredBooks.map((book: BookType, index: number) => (
          <Book key={book.bookId} book={book} priority={index < 8} />
        ))}
    </ul>
  )
}

export default React.memo(BooksList)
