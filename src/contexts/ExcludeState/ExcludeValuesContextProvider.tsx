'use client'

import { ExcludeValuesType } from '@/types/filterType'
import { ExcludeValuesContext } from './ExcludeValuesContext'
import { useMemo, useState } from 'react'

export default function ExcludeValuesContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [excludeValues, setExcludeValues] = useState<ExcludeValuesType>({
    authors: [],
    series: [],
    genres: [],
    tropes: [],
    creatures: [],
    booktags: [],
  })

  const contextValue = useMemo(() => {
    return {
      excludeValues,
      setExcludeValues,
    }
  }, [excludeValues])

  return (
    <ExcludeValuesContext.Provider value={contextValue}>
      {children}
    </ExcludeValuesContext.Provider>
  )
}
