'use client'

import { useEffect, useMemo, useState } from 'react'

import { ThemeStateContext } from './ThemeStateContext'

export default function ThemeStateContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Initialize theme based on system preference or stored preference
  const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = localStorage.getItem('theme')
      if (storedTheme) return storedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  const [theme, setTheme] = useState<string>(getInitialTheme())

  // Apply theme class to the body or root element
  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if the user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const contextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    }
  }, [theme])

  return (
    <ThemeStateContext.Provider value={contextValue}>
      {children}
    </ThemeStateContext.Provider>
  )
}
