'use client'

import { createContext } from 'react'

type SearchClickValueContextType = {
  searchClickValue: string
  setSearchClickValue: (searchClickValue: string) => void
}

export const SearchClickValueContext =
  createContext<SearchClickValueContextType>({
    searchClickValue: '',
    setSearchClickValue: () => {},
  })
