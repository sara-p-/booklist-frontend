'use client'

import React from 'react'

type ThemeStateContextType = {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export const ThemeStateContext = React.createContext<ThemeStateContextType>({
  theme: 'light',
  setTheme: (theme: 'light' | 'dark') => {},
})
