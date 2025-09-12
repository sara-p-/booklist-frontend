'use client'

import { useMemo, useState } from 'react'

import { ThemeStateContext } from './ThemeStateContext'

export default function ThemeStateContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const contextValue = useMemo(() => {
    return {
      theme,
      setTheme,
    }
  }, [theme])

  return (
    <ThemeStateContext.Provider value={contextValue}>
      {children}
    </ThemeStateContext.Provider>
  )
}
