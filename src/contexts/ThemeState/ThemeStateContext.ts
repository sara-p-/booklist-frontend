'use client'

import React from 'react'

type ThemeStateContextType = {
  theme: string
  toggleTheme: () => void
}

export const ThemeStateContext = React.createContext<ThemeStateContextType>({
  theme: '',
  toggleTheme: () => {},
})
