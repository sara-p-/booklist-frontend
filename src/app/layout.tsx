import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header/Header'

// FontAwesome Icons
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { fetchData } from '@/lib/fetch'
import BookListContextProvider from '@/contexts/BookList/BookListContextProvider'
import { DEFAULT_FILTER_VALUES } from '@/lib/globals'
import FilterValuesContextProvider from '@/contexts/FilterValues/FilterValuesContextProvider'
import Loading from './loading'
import { Suspense } from 'react'
config.autoAddCss = false

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'BookList',
  description: "A list of books I've read",
}

// TODO: Update the API endpoint

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
        <FilterValuesContextProvider newFilterValues={DEFAULT_FILTER_VALUES}>
          <BookListContextProvider initialBookList={data}>
            <Header />
            {children}
          </BookListContextProvider>
        </FilterValuesContextProvider>
      </body>
    </html>
  )
}
