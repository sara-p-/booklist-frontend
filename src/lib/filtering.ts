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
