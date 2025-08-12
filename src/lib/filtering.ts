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
