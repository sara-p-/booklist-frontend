import { BookType } from '@/types/bookType'
import { sortArrayGroups } from './filtering-utils'

/**
 * Accepts the booklist and a sort value and returns a sorted booklist.
 *
 * This is the main sorting function.
 *
 * @param {BookType[]} bookList - The booklist.
 * @param {string} sort - The sort value.
 * @returns {BookType[]} The sorted booklist.
 */
export const sortBookList = (bookList: BookType[], sort: string) => {
  const books = [...bookList]
  let newBooks: BookType[] = []

  if (sort === 'series') {
    newBooks = sortArrayGroups(books, 'series')
  } else if (sort === 'title') {
    newBooks = books.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sort === 'published') {
    newBooks = books.sort((a, b) =>
      a.publishDate.localeCompare(b.publishDate, undefined, { numeric: true })
    )
  } else if (sort === 'reading order') {
    newBooks = books.sort((a, b) =>
      a.finishDate.localeCompare(b.finishDate, undefined, { numeric: true })
    )
  } else if (sort === 'rating') {
    newBooks = sortArrayGroups(books, 'rating')
  } else if (sort === 'spice') {
    newBooks = sortArrayGroups(books, 'spice')
  }
  return newBooks
}

/**
 * Accepts the list of books and an order value and returns an ordered list of books.
 * @param {BookType[]} bookList - The booklist.
 * @param {string} order - The order value.
 * @returns {BookType[]} The ordered booklist.
 */
export const orderBookList = (bookList: BookType[], order: string) => {
  const books = [...bookList]
  if (order === 'desc') {
    return books.reverse()
  }
  return books
}
