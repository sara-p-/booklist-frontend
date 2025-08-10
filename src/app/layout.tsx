import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header/Header'

// FontAwesome Icons
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { BookDataContextProvider } from '@/contexts/BookData/BookDataContextProvider'
import { fetchData } from '@/lib/fetch'
import BookListContextProvider from '@/contexts/BookList/BookListContextProvider'
import { globalFilterValues } from '@/lib/globals'
import { FilterType } from '@/types/filterType'
config.autoAddCss = false

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'BookList',
  description: "A list of books I've read",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const data = await fetchData(
    'https://readthatbooklist.com/wp-json/booklist/v1/books'
  )

  return (
    <html lang='en'>
      <body className={`${inter.variable}`}>
        {/* <BookDataContextProvider initialData={data}> */}
        <BookListContextProvider initialBookList={data}>
          <Header />
          {children}
        </BookListContextProvider>
        {/* </BookDataContextProvider> */}
      </body>
    </html>
  )
}
