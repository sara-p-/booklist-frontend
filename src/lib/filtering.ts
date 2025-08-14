import { BookType, BookItem } from '@/types/bookType'

/**
 * Takes the bookList array and returns an array of the specific type of object
 * @param {BookType[]} bookList - The bookList array.
 * @param {string} type - The type of object to return.
 * @returns {BookItem[]} An array of all the author objects.
 */
export const getFilterItems = (
  bookList: BookType[],
  type: 'author' | 'series' | 'genres' | 'tropes' | 'creatures' | 'booktags'
): BookItem[] => {
  const items = bookList.map((book) => book[type]).flat()
  // remove the duplicate objects from the array by authorName
  const uniqueItems = items.filter(
    (obj, index, self) => index === self.findIndex((t) => t.name === obj.name)
  )
  // sort the array by name
  uniqueItems.sort((a, b) => a.name.localeCompare(b.name))

  return uniqueItems
}

/**
 * Accepts a filter key and returns the typing of the filter.
 * @param {string} filterKey - The filter key.
 * @returns {string} The typing of the filter.
 */
export const getFilterType = (filterKey: string) => {
  switch (filterKey) {
    case 'sort':
      return 'string'
    case 'order':
      return 'string'
    case 'authors':
      return 'string[]'
    case 'series':
      return 'string[]'
    case 'genres':
      return 'string[]'
    case 'tropes':
      return 'string[]'
    case 'creatures':
      return 'string[]'
    case 'booktags':
      return 'string[]'
    case 'rating':
      return 'string[]'
    case 'spice':
      return 'string[]'
    case 'completed':
      return 'boolean'
    case 'search':
      return 'string'
  }
}

/**
 * Accepts the booklist and a sort value and returns a sorted booklist.
 * @param {BookType[]} bookList - The booklist.
 * @param {string} sort - The sort value.
 * @returns {BookType[]} The sorted booklist.
 */
export const sortBookList = (bookList: BookType[], sort: string) => {
  let books = [...bookList]

  if (sort === 'series') {
    const seriesArray = books.map((book) => {
      return book.series[0].name
    })
    const uniqueSeries = [...new Set(seriesArray)]
    const alphaSeries = uniqueSeries.sort((a, b) => a.localeCompare(b))
    // For each series, make an array of the books in that series
    const arrayOfSeries = alphaSeries
      .map((series) => {
        const newArray = books.filter((book) => book.series[0].name === series)
        newArray.sort((a, b) => a.bookNumber.localeCompare(b.bookNumber))
        return newArray
      })
      .flat()
    books = arrayOfSeries
  } else if (sort === 'title') {
    books.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sort === 'published') {
    books.sort((a, b) => a.publishDate.localeCompare(b.publishDate))
  } else if (sort === 'reading order') {
    books.sort((a, b) => a.finishDate.localeCompare(b.finishDate))
  } else if (sort === 'rating') {
    books.sort((a, b) => a.rating.localeCompare(b.rating))
  } else if (sort === 'spice') {
    books.sort((a, b) => a.spice.localeCompare(b.spice))
  }
  return books
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
