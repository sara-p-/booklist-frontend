import type { Metadata } from 'next'
import { Inter, Redacted_Script, Redacted } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header/Header'
// FontAwesome Icons
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { fetchData } from '@/lib/fetch'
import BookListContextProvider from '@/contexts/BookList/BookListContextProvider'
import { API_URL, DEFAULT_FILTER_VALUES } from '@/lib/globals'
import FilterValuesContextProvider from '@/contexts/FilterValues/FilterValuesContextProvider'
import ExcludeValuesContextProvider from '@/contexts/ExcludeState/ExcludeValuesContextProvider'
import MobileFilterStateContextProvider from '@/contexts/MobileFilterState/MobileFilterStateContextProvider'
import ThemeStateContextProvider from '@/contexts/ThemeState/ThemeStateContextProvider'
import { cookies } from 'next/headers'
// Vercel Speed Insights
import { SpeedInsights } from '@vercel/speed-insights/next'

config.autoAddCss = false

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

const redactedScript = Redacted_Script({
  variable: '--font-redacted-script',
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
})

const redacted = Redacted({
  variable: '--font-redacted',
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: 'BookList',
  description: "A list of books I've read",
  metadataBase: new URL('https://www.readthatbooklist.com'),
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  other: {
    'format-detection': 'telephone=no',
  },
}

// TODO: Update the API endpoint

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const response = await fetchData(`${API_URL}/books`)
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value
  const initialTheme = theme || ''

  return (
    <html lang='en'>
      <body
        className={`${inter.variable} ${redactedScript.variable} ${redacted.variable}`}
        data-theme={initialTheme}
      >
        <ThemeStateContextProvider initialTheme={initialTheme}>
          <ExcludeValuesContextProvider>
            <FilterValuesContextProvider
              newFilterValues={DEFAULT_FILTER_VALUES}
            >
              <BookListContextProvider initialBookList={response.data.items}>
                <Header />
                <MobileFilterStateContextProvider>
                  {children}
                  {/* Vercel Speed Insights */}
                  <SpeedInsights />
                </MobileFilterStateContextProvider>
              </BookListContextProvider>
            </FilterValuesContextProvider>
          </ExcludeValuesContextProvider>
        </ThemeStateContextProvider>
      </body>
    </html>
  )
}
