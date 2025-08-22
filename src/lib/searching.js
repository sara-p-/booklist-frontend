export function searchBookList(bookList, searchValue) {
  let newBookList = [...bookList]
  if (searchValue === '') {
    return newBookList
  }
  // search through titles
  newBookList = newBookList.filter((book) => {
    return book.title.toLowerCase().includes(searchValue.toLowerCase())
  })
  // // search through authors
  // newBookList = newBookList.filter((book) => {
  //   return book.author[0].name.toLowerCase().includes(searchValue.toLowerCase())
  // })
  // // search through series
  // newBookList = newBookList.filter((book) => {
  //   return book.series.toLowerCase().includes(searchValue.toLowerCase())
  // })

  return newBookList
}
