import { BookType } from '@/types/bookType'
import { filterBooksByArray, sortArrayGroups } from './filtering-utils'
import { FilterType } from '@/types/filterType'

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
 *
 * This is the main ordering function.
 *
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

/**
 * Accepts the list of books and the filter values and returns a filtered list of books.
 *
 * This is the main filtering function.
 *
 * @param {BookType[]} bookList - The booklist.
 * @param {FilterType} filterValues - The filter values.
 * @returns {BookType[]} The filtered booklist.
 */
export const filterBookList = (
  bookList: BookType[],
  filterValues: FilterType
) => {
  const books = [...bookList]
  let newBooks: BookType[] = books

  const authors = filterValues.authors
  const series = filterValues.series
  const genres = filterValues.genres
  const tropes = filterValues.tropes
  const creatures = filterValues.creatures
  const booktags = filterValues.booktags

  if (authors.length > 0) {
    const authorsArray = authors.map((author) => {
      return newBooks.filter((book) => book.author[0].name === author)
    })
    newBooks = authorsArray.flat()
  }

  // Series
  if (series.length > 0) {
    const seriesArray = series.map((series) => {
      return newBooks.filter((book) => book.series[0].name === series)
    })
    newBooks = seriesArray.flat()
  }

  // Genres
  if (genres.length > 0) {
    newBooks = filterBooksByArray(newBooks, genres, 'genres')
  }

  // Tropes
  if (tropes.length > 0) {
    newBooks = filterBooksByArray(newBooks, tropes, 'tropes')
  }

  // Creatures
  if (creatures.length > 0) {
    newBooks = filterBooksByArray(newBooks, creatures, 'creatures')
  }

  // Booktags
  if (booktags.length > 0) {
    newBooks = filterBooksByArray(newBooks, booktags, 'booktags')
  }

  return newBooks
}
