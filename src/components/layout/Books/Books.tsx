import { BookType } from '@/types/bookType'
import styles from './Books.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import Book from '@/components/features/Book/Book'
import React, { Suspense } from 'react'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'
import Loading from '@/app/loading'

function Books() {
  const { filterValues } = useFilterValuesContext()
  const filteredBooks = useFilteredBooks()
  const viewClass =
    filterValues.view === 'grid' ? styles.bookGrid : styles.bookList

  return (
    <ul className={viewClass}>
      <Suspense fallback={<Loading />}>
        {filteredBooks &&
          filteredBooks.map((book: BookType) => (
            <Book key={book.bookId} book={book} />
          ))}
      </Suspense>
    </ul>
  )
}

export default React.memo(Books)

// function Books() {
//   const { filterValues } = useFilterValuesContext()
//   const filteredBooks = useFilteredBooks()
//   const viewClass =
//     filterValues.view === 'grid' ? styles.bookGrid : styles.bookList

//   let books: BookType[] | BookType[][] = filteredBooks

//   if (filterValues.sort === 'series') {
//     books = sortArrayGroupsForHeaders(filteredBooks, 'series')
//     const orderedBooks = orderBookList(
//       books,
//       filterValues.order
//     ) as BookType[][]
//     // books = orderedBooks
//     return (
//       <>
//         {orderedBooks.map((seriesArray) => {
//           return (
//             <div
//               className={styles.bookGroup}
//               key={seriesArray[0].series[0].name}
//             >
//               <h2>{seriesArray[0].series[0].name}</h2>
//               <ul className={`${viewClass} ${styles.bookArrayList}`}>
//                 {seriesArray.map((book: BookType) => (
//                   <Book key={book.bookId} book={book} />
//                 ))}
//               </ul>
//             </div>
//           )
//         })}
//       </>
//     )
//   }
//   if (filterValues.sort === 'rating') {
//     books = sortArrayGroupsForHeaders(filteredBooks, 'rating')
//     const orderedBooks = orderBookList(
//       books,
//       filterValues.order
//     ) as BookType[][]
//     // books = orderedBooks
//     return (
//       <>
//         {orderedBooks.map((array) => {
//           return (
//             <div className={styles.bookGroup} key={array[0].series[0].name}>
//               <h2>{array[0].rating}/10</h2>
//               <ul className={`${viewClass} ${styles.bookArrayList}`}>
//                 {array.map((book: BookType) => (
//                   <Book key={book.bookId} book={book} />
//                 ))}
//               </ul>
//             </div>
//           )
//         })}
//       </>
//     )
//   }
//   if (filterValues.sort === 'spice') {
//     books = sortArrayGroupsForHeaders(filteredBooks, 'spice')
//     const orderedBooks = orderBookList(
//       books,
//       filterValues.order
//     ) as BookType[][]
//     // books = orderedBooks
//     return (
//       <>
//         {orderedBooks.map((array) => {
//           return (
//             <div className={styles.bookGroup} key={array[0].series[0].name}>
//               <h2>{array[0].spice}/5</h2>
//               <ul className={`${viewClass} ${styles.bookArrayList}`}>
//                 {array.map((book: BookType) => (
//                   <Book key={book.bookId} book={book} />
//                 ))}
//               </ul>
//             </div>
//           )
//         })}
//       </>
//     )
//   }

//   const orderedBooks = orderBookList(
//     filteredBooks,
//     filterValues.order
//   ) as BookType[]
//   return (
//     <ul className={viewClass}>
//       {orderedBooks.map((book: BookType) => (
//         <Book key={book.bookId} book={book} />
//       ))}
//     </ul>
//   )
// }

// export default React.memo(Books)
