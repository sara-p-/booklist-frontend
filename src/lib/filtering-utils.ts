import { BookItem, BookType } from '@/types/bookType'
import { FilterArrayType } from '@/types/filterType'

/**
 * Accepts a filter key and returns the typing of the filter.
 *
 * Used in the creation of the multiselect filter options.
 *
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
 * Takes the bookList array and returns an array of items/options for the multiselect filter.
 *
 * Used in the creation of the multiselect filter options.
 *
 * @param {BookType[]} bookList - The bookList array.
 * @param {string} type - The type of object to return.
 * @returns {BookItem[]} An array of all the author objects.
 */
export const getAllFilterItems = (
  bookList: BookType[],
  type: FilterArrayType
): BookItem[] => {
  if (!bookList) return []
  // Get a list of all of the current options (depending on the selected filters)
  // pull out the objects from the bookList array that match the type
  const items = bookList.map((book) => book[type]).flat()
  // remove the duplicate objects from the array by authorName
  const uniqueItems = items.filter(
    (obj, index, self) => index === self.findIndex((t) => t.name === obj.name)
  )
  // sort the array by name
  uniqueItems.sort((a, b) => a.name.localeCompare(b.name))

  return uniqueItems
}

// /**
//  * Takes the original bookList and the filtered bookList and returns an array of filter items with a new property 'disabled', which is true if the item is not in the filtered bookList.
//  *
//  * Used in the creation of the multiselect filter options.
//  *
//  * @param {BookType[]} bookList - The bookList array.
//  * @param {BookType[]} filteredBookList - The filtered bookList array.
//  * @param {FilterType} filterValues - The filter values.
//  * @returns {BookItem[]} An array of all the filter objects.
//  */
// export function getTheFilteredItems(
//   bookList: BookType[],
//   filteredBookList: BookType[],
//   type: FilterArrayType
// ) {
//   if (!bookList) return []
//   // Get a list of all of the current options (depending on the selected filters)
//   const allFilterItems = getAllFilterItems(bookList, type)
//   // Loop through each filter item and check if it is in the filtered bookList
//   // If the item is in the filtered bookList, set the disabled property to false
//   // If the item is not in the filtered bookList, set the disabled property to true
//   const itemsWithAmounts = allFilterItems.map((item) => {
//     return {
//       ...item,
//       disabled: !filteredBookList.some((book) =>
//         book[type].some((filter) => filter.name === item.name)
//       ),
//     }
//   })
//   return itemsWithAmounts
// }

// /**
//  * Takes the filter items and returns an array of filter items with a new property 'amount', which is the number of books that have the filter item.
//  *
//  * Used in the creation of the multiselect filter options.
//  *
//  * @param {BookType[]} bookList - The bookList array.
//  * @param {BookType[]} filteredBookList - The filtered bookList array.
//  * @param {FilterType} filterValues - The filter values.
//  * @returns {BookItem[]} An array of all the filter objects.
//  */
// export function getTheFilteredItemsWithAmount(
//   bookList: BookType[],
//   filteredBookList: BookType[],
//   type: FilterArrayType
// ) {
//   if (!bookList) return []
//   // Get a list of all of the current options (depending on the selected filters)
//   const allFilterItems = getAllFilterItems(bookList, type)
//   // Loop through each filter item and check if it is in the filtered bookList
//   // If the item is in the filtered bookList, set the disabled property to false
//   // If the item is not in the filtered bookList, set the disabled property to true
//   const itemsWithAmounts = allFilterItems.map((item) => {
//     return {
//       ...item,
//       amount: filteredBookList.filter((book) =>
//         book[type].some((filter) => filter.name === item.name)
//       ).length,
//     }
//   })
//   return itemsWithAmounts
// }

/**
 * Accepts the list of books the 'sort' setting/type and returns a sorted/ordered list of books.
 *
 * Used in the main sorting function.
 *
 * @param {BookType[]} books - The booklist.
 * @param {string} sortType - The sort type.
 * @returns {BookType[]} The ordered booklist.
 */
export function sortArrayGroups(
  books: BookType[],
  sortType: 'rating' | 'spice' | 'series'
) {
  if (!books) return []
  if (sortType === 'series') {
    const typeArray = books.map((book) => {
      return book.series[0].name
    })
    const uniqueTypeArray = [...new Set(typeArray)]
    const alphaTypeArray = uniqueTypeArray.sort((a, b) => a.localeCompare(b))
    // For each Series, make an array of the books in that Series
    const arrayOfType = alphaTypeArray
      .map((type) => {
        const newArray = books.filter((book) => book.series[0].name === type)
        newArray.sort((a, b) =>
          a.bookNumber.localeCompare(b.bookNumber, undefined, { numeric: true })
        )
        return newArray
      })
      .flat()
    return arrayOfType
  }

  // Rating or Spice
  const typeArray = books.map((book) => {
    return book[sortType]
  })
  const uniqueTypeArray = [...new Set(typeArray)]
  const alphaTypeArray = uniqueTypeArray.sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  )
  // For each Rating, make an array of the books in that Rating
  // TODO: when the 'order' is reversed on the front end, each group of ratings is also in reverse alphabetical order. I probably need to fix this? I dunno, I need to think on what I actually want to do here.
  const arrayOfType = alphaTypeArray
    .map((type) => {
      const newArray = books.filter((book) => book[sortType] === type)
      newArray.sort((a, b) => a.title.localeCompare(b.title)).reverse()
      return newArray
    })
    .flat()

  return arrayOfType
}

/**
 * Accepts the list of books the 'sort' setting/type and returns an array of arrays sorted by the setting/type..
 *
 * Used in the books component to sort books and add headers to the sort groups.
 *
 * @param {BookType[]} books - The booklist.
 * @param {string} sortType - The sort type.
 * @returns {BookType[]} The ordered booklist.
 */
export function sortArrayGroupsForHeaders(
  books: BookType[],
  sortType: 'rating' | 'spice' | 'series'
) {
  if (!books) return []
  if (sortType === 'series') {
    const typeArray = books.map((book) => {
      return book.series[0].name
    })
    const uniqueTypeArray = [...new Set(typeArray)]
    const alphaTypeArray = uniqueTypeArray.sort((a, b) => a.localeCompare(b))
    // For each Group, make an array of the books in that Group
    const arrayOfType = alphaTypeArray.map((type) => {
      const newArray = books.filter((book) => book.series[0].name === type)
      newArray.sort((a, b) =>
        a.bookNumber.localeCompare(b.bookNumber, undefined, { numeric: true })
      )
      return newArray
    })
    return arrayOfType
  }

  // Rating or Spice
  const typeArray = books.map((book) => {
    return book[sortType]
  })
  const uniqueTypeArray = [...new Set(typeArray)]
  const alphaTypeArray = uniqueTypeArray.sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  )
  // For each Group, make an array of the books in that Group
  const arrayOfType = alphaTypeArray.map((type) => {
    const newArray = books.filter((book) => book[sortType] === type)
    newArray.sort((a, b) => a.title.localeCompare(b.title)).reverse()
    return newArray
  })

  return arrayOfType
}

/**
 * Accepts the list of books and sorts them by length, then returns an array of objects. The first value is the header for that array group, and the second value is the array group itself.
 *
 * Used in the BooksList component.
 *
 * @param {BookType[]} books - The booklist.
 * @returns {Array<string, BookType[]>} The ordered booklist.
 */
export function sortArrayGroupsForHeadersByLength(books: BookType[]) {
  if (!books) return []

  // loop through the bookList and find the shortest and longest books
  const shortestBook = books.sort((a, b) =>
    a.length.localeCompare(b.length, undefined, { numeric: true })
  )[0]
  const longestBook = books.sort((a, b) =>
    b.length.localeCompare(a.length, undefined, { numeric: true })
  )[books.length - 1]

  const bookLengths = books.sort((a, b) =>
    a.length.localeCompare(b.length, undefined, { numeric: true })
  )

  const justLengths = bookLengths.map((book) => {
    return { book: book.title, length: book.length }
  })

  return justLengths
}

/**
 * Accepts a list of books and a series of filter values and returns a list of books that match the filter values.
 *
 * Used in the main filtering function.
 *
 * @param {BookType[]} books - The booklist.
 * @param {string[]} filterValuesArray - The filter values.
 * @param {string[]} excludeValuesArray - The exclude values.
 * @param {string} filterType - The filter type.
 * @returns {BookType[]} The filtered booklist.
 */
export function filterBooksByArray(
  books: BookType[],
  filterValuesArray: string[],
  filterType: 'genres' | 'tropes' | 'creatures' | 'booktags',
  excludeValuesArray: string[]
) {
  if (!books) return []
  // Create a new array to store the filtered books
  const newBooksArray: BookType[] = []
  // Loop through each book
  books.forEach((book) => {
    // Grab the book's category array and pull out the 'name' values
    const bookFilterCategoryArray = book[filterType].map((value) => value.name)
    // if the exclude values array is not empty, leave out the books that include the exclude values
    if (excludeValuesArray.length > 0) {
      if (
        !excludeValuesArray.some((value) =>
          bookFilterCategoryArray.includes(value)
        )
      ) {
        newBooksArray.push(book)
      }
    } else {
      if (
        filterValuesArray.some((value) =>
          bookFilterCategoryArray.includes(value)
        )
      ) {
        newBooksArray.push(book)
      }
      // // Check to see if the book's genres contain a Filter Value genre. If so, add that book to the new array
      // const allValuesPresent = filterValuesArray.every((value) => {
      //   return bookFilterCategoryArray.includes(value)
      // })
      // if (allValuesPresent) {
      //   newBooksArray.push(book)
      // }
    }
  })

  return newBooksArray
}

/**
 * Accepts a list of books and a range of values and returns a list of books that match the range.
 *
 * Used in the main filtering function.
 *
 * @param {BookType[]} books - The booklist.
 * @param {string[]} rangeValues - The range values.
 * @returns {BookType[]} The filtered booklist.
 */
export function filterBooksByRange(
  books: BookType[],
  filterValue: number[],
  filterType: 'rating' | 'spice'
) {
  if (!books) return []
  const newBooksArray: BookType[] = []
  books.forEach((book) => {
    const newBook = { ...book }
    const bookFilterNumber = parseInt(newBook[filterType])
    if (
      bookFilterNumber >= filterValue[0] &&
      bookFilterNumber <= filterValue[1]
    ) {
      newBooksArray.push(newBook)
    }
  })
  return newBooksArray
}

/**
 * Accepts the order value and the value of the sort filter and returns a string that will be used in the filter label (for the order setting)
 *
 * Used in the Filter component.
 *
 * @param {string} orderValue - The order value.
 * @param {string} sortValue - The sort value.
 * @returns {string} The order label.
 */
export function getOrderLabel(orderValue: string, sortValue: string) {
  if (orderValue === 'asc') {
    switch (sortValue) {
      case 'series':
        return 'A-Z'
      case 'title':
        return 'A-Z'
      case 'rating':
        return 'lowest to highest'
      case 'spice':
        return 'lowest to highest'
      case 'length':
        return 'shortest to longest'
      case 'published':
        return 'oldest to newest'
      case 'reading order':
        return 'oldest to newest'
      default:
        return 'A-Z'
    }
  } else {
    switch (sortValue) {
      case 'series':
        return 'Z-A'
      case 'title':
        return 'Z-A'
      case 'rating':
        return 'highest to lowest'
      case 'spice':
        return 'highest to lowest'
      case 'length':
        return 'longest to shortest'
      case 'published':
        return 'newest to oldest'
      case 'reading order':
        return 'newest to oldest'
      default:
        return 'Z-A'
    }
  }
}

/**
 * Sets the 'order' filter value based on the 'sort' filter value.
 *
 * Used in the Filter component .
 *
 * @param {string} sortValue - The sort value.
 * @returns {string} The order value.
 */
export function setOrderValue(sortValue: string) {
  switch (sortValue) {
    case 'series':
      return 'asc'
    case 'title':
      return 'asc'
    case 'rating':
      return 'desc'
    case 'spice':
      return 'desc'
    case 'length':
      return 'desc'
    case 'published':
      return 'desc'
    case 'reading order':
      return 'desc'
    default:
      return 'desc'
  }
}
