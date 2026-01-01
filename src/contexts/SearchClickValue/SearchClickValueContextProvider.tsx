'use client'

import { SearchClickValueContext } from './SearchClickValueContext'
import { useMemo, useState } from 'react'

export default function SearchClickValueContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [searchClickValue, setSearchClickValue] = useState<string>('')

  const contextValue = useMemo(() => {
    return {
      searchClickValue,
      setSearchClickValue,
    }
  }, [searchClickValue])

  return (
    <SearchClickValueContext.Provider value={contextValue}>
      {children}
    </SearchClickValueContext.Provider>
  )
}
