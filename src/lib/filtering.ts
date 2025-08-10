import {
  BookType,
  BookAuthor,
  BookSeries,
  BookGenre,
  BookTrope,
  BookCreature,
  BookTag,
} from '@/types/bookType'

/**
 * Takes the bookList array and returns an array of the specific type of object
 * @param {BookType[]} bookList - The bookList array.
 * @param {string} type - The type of object to return.
 * @returns {BookAuthor[] | BookSeries[] | BookGenre[] | BookTrope[] | BookCreature[] | BookTag[]} An array of all the author objects.
 */
export const getFilterItems = (
  bookList: BookType[],
  type: string
):
  | BookAuthor[]
  | BookSeries[]
  | BookGenre[]
  | BookTrope[]
  | BookCreature[]
  | BookTag[] => {
  const authors = bookList.map((book) => book.author).flat()
  // remove the duplicate objects from the array by authorName
  const uniqueAuthors = authors.filter(
    (obj, index, self) => index === self.findIndex((t) => t.name === obj.name)
  )

  return uniqueAuthors
}
